/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');
const moment = require('moment');

const ccpPath = path.resolve(__dirname, '..', '..', 'network-raft', 'connection-org1.json');

async function main() {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('user1');
        if (!userExists) {
            console.log('User identity does not exist, run the registerUser.js ');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('evchannel');

        // Get the contract from the network.
        const contract = network.getContract('evprotocol');

        // Evaluate the specified transaction.
        console.log("==============    " + moment.utc(moment.now()).format("HH:mm:ss.SSS") +"    ==============");
        const result = await contract.evaluateTransaction('queryEV', 'EV4');
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

main();

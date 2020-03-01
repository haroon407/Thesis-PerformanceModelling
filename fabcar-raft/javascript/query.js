/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');
const moment = require('moment');

const ccpPath = path.resolve(__dirname, '..', '..', 'first-network-raft', 'connection-org1.json');

async function main() {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('user1');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');

        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        // const result = await contract.evaluateTransaction('queryAllCars', '10', '1');
        console.log("==============    " + moment.utc(moment.now()).format("HH:mm:ss.SSS") +"    ==============");
        // const result = await contract.evaluateTransaction('queryCar', 'CAR8');
        // const result = await contract.evaluateTransaction('queryCar3LD');
        // await contract.submitTransaction('changeCarOwner', 'CAR30', 'Jerry');
        // await contract.submitTransaction('deleteCarCD', 'CAR28');
        // const result = await contract.evaluateTransaction('queryCar','CAR28');

        // 10
        // const result = await contract.evaluateTransaction('queryAllCars', '10', '1');
        // const result2 = await contract.evaluateTransaction('queryAllCars', '10', '1');
        // const result3 = await contract.evaluateTransaction('queryAllCars', '10', '1');
        // const result4 = await contract.evaluateTransaction('queryAllCars', '10', '1');
        // const result5 = await contract.evaluateTransaction('queryAllCars', '10', '1');
        // const result6 = await contract.evaluateTransaction('queryAllCars', '10', '1');
        // const result7 = await contract.evaluateTransaction('queryAllCars', '10', '1');

        // // 100
        // const result = await contract.evaluateTransaction('queryAllCars', '100', '1');
        // const result2 = await contract.evaluateTransaction('queryAllCars', '100', '1');
        // const result3 = await contract.evaluateTransaction('queryAllCars', '100', '1');
        // const result4 = await contract.evaluateTransaction('queryAllCars', '100', '1');
        // const result5 = await contract.evaluateTransaction('queryAllCars', '100', '1');
        // const result6 = await contract.evaluateTransaction('queryAllCars', '100', '1');
        // const result7 = await contract.evaluateTransaction('queryAllCars', '100', '1');
        

        // 200
        // const result = await contract.evaluateTransaction('queryAllCars', '200', '1');
        // const result2 = await contract.evaluateTransaction('queryAllCars', '200', '1');
        // const result3 = await contract.evaluateTransaction('queryAllCars', '200', '1');
        // const result4 = await contract.evaluateTransaction('queryAllCars', '200', '1');
        // const result5 = await contract.evaluateTransaction('queryAllCars', '200', '1');
        // const result6 = await contract.evaluateTransaction('queryAllCars', '200', '1');
        // const result7 = await contract.evaluateTransaction('queryAllCars', '200', '1');

        // // 500
        // const result = await contract.evaluateTransaction('queryAllCars', '500', '1');
        // const result2 = await contract.evaluateTransaction('queryAllCars', '500', '1');
        // const result3 = await contract.evaluateTransaction('queryAllCars', '500', '1');
        // const result4 = await contract.evaluateTransaction('queryAllCars', '500', '1');
        // const result5 = await contract.evaluateTransaction('queryAllCars', '500', '1');
        // const result6 = await contract.evaluateTransaction('queryAllCars', '500', '1');
        // const result7 = await contract.evaluateTransaction('queryAllCars', '500', '1');

        // // 1000
        // const result = await contract.evaluateTransaction('queryAllCars', '1000', '1');
        // const result2 = await contract.evaluateTransaction('queryAllCars', '1000', '1');
        // const result3 = await contract.evaluateTransaction('queryAllCars', '1000', '1');
        // const result4 = await contract.evaluateTransaction('queryAllCars', '1000', '1');
        // const result5 = await contract.evaluateTransaction('queryAllCars', '1000', '1');
        // const result6 = await contract.evaluateTransaction('queryAllCars', '1000', '1');
        // const result7 = await contract.evaluateTransaction('queryAllCars', '1000', '1');

        // // 2500
        // const result = await contract.evaluateTransaction('queryAllCars', '2500', '1');
        // const result2 = await contract.evaluateTransaction('queryAllCars', '2500', '1');
        // const result3 = await contract.evaluateTransaction('queryAllCars', '2500', '1');
        // const result4 = await contract.evaluateTransaction('queryAllCars', '2500', '1');
        // const result5 = await contract.evaluateTransaction('queryAllCars', '2500', '1');
        // const result6 = await contract.evaluateTransaction('queryAllCars', '2500', '1');
        // const result7 = await contract.evaluateTransaction('queryAllCars', '2500', '1');

        // const result = await contract.evaluateTransaction('queryCar', 'CAR12');
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

main();

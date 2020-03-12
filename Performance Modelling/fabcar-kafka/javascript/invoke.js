/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');
const moment = require('moment');

const ccpPath = path.resolve(__dirname, '..', '..', 'fabric-kafka', 'first-network', 'connection-org1.json');

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

        // Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')

        console.log("==============    " + moment.utc(moment.now()).format("HH:mm:ss.SSS") + "    ==============");

        let colorArray = [
            'green',
            'blue',
            'yellow',
            'red',
            'white',
            'black',
            'silver',
            'gold',
            'grey',
            'brown',
            'maroon',
        ];
        let carArray = [
            'Toyota',
            'Honda',
            'Chevrolet',
            'Suzuki',
            'BMW',
            'Audi',
            'GMC',
            'Opel',
            'Mercedes'
        ];
        let ownerArray = [
            'Paul',
            'Tom',
            'Jerry',
            'Henry',
            'Micheal',
            'Trevor',
            'Philip'
        ]

        let randomColor;
        let randomCar;
        let randomOwner;
        for (let i = 10; i < 20; i++) {
            randomColor = Math.floor(Math.random() * colorArray.length);
            randomCar = Math.floor(Math.random() * carArray.length);
            randomOwner = Math.floor(Math.random() * ownerArray.length);
            await contract.submitTransaction('createCar', 'CAR' + i, carArray[randomCar], 'SubModel'+i, colorArray[randomColor], ownerArray[randomOwner]);
        }


        // await contract.submitTransaction('changeCarOwner', 'CAR12', 'Jerry');
        console.log('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();

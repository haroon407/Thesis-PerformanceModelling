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

        // Submit a specific transaction, For now submitting complexity testing function

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
        let postalCodes = [
            81340,
            81341,
            81342,
            81343,
            81344,
            81345,
            81346,
            81347,
            81348,
            81349,
            81350,
            81351,
            81352,
            81353,
            81354,
            81355
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
        let modelArray = [
            'i3',
            'i8'
        ]
        let connectorTypesArray = [
            'Type-F-(Schuko)',
            'Type-2',
            'Combo-CCS'
        ]
        let chargingLevelsArray = [
            '1',
            '2',
            '3'
        ]

        let randomColor;
        let randomModel;
        let randomOwner;
        let randomPostalCode;
        let chargingLevel;
        let connectorType;
        let city = 'Munich';
        let manufacturer = 'BMW';

        // Since first 10 cars are already created using chaincode init, creating 10 more cars
        for (let i = 10; i < 20; i++) {
            randomColor = Math.floor(Math.random() * colorArray.length);
            randomOwner = Math.floor(Math.random() * ownerArray.length);
            randomModel = Math.floor(Math.random() * modelArray.length);
            randomPostalCode = Math.floor(Math.random() * postalCodes.length);
            chargingLevel = Math.floor(Math.random() * chargingLevelsArray.length);
            connectorType = Math.floor(Math.random() * connectorTypesArray.length);
            await contract.submitTransaction('createEVComplexity', 'EV' + i, manufacturer, modelArray[randomModel], colorArray[randomColor],chargingLevelsArray[chargingLevel], connectorTypesArray[connectorType], ownerArray[randomOwner], postalCodes[randomPostalCode].toString(), city, "10", "1");
        }
        console.log('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();

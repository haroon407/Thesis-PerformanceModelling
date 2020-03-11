## Muhammad Haroon Arshad (Master's Thesis), Technical University of Munich

## Hyperledger Fabric v1.4.4

## Environment setup

The hyperledger Fabric v1.4.4 was downloaded using the following command:
' curl -sSL http://bit.ly/2ysbOFE | bash -s -- 1.4.4 1.4.4 0.4.18 '

For further instructions please follow the installation guide at http://hyperledger-fabric.readthedocs.io/en/latest/install.html

## Folder structure
### Performance Modelling: 
This folder contains the networks and clients based on which the performance modelling was performed.

### Prototype: 
This folder contains the EV-Protocol prototype to verify performance model

### Note: 
The network setup was built be reusing and extending the Fabric samples under:

#### https://github.com/hyperledger/fabric-samples

#### https://github.com/keenkit/fabric-sample-with-kafka


### Performance Modelling (Folder Structure):

### Prototype (Folder Structure):
Under Prototype/EV-Protocol/chaincode/evprotocol folder contains chaincode in two languages, GoLang and Javascript

## How to run the prototype (OSX)

### Step 1: Start network (OSX)
1. First of all make sure Hyperledger Fabric v1.4.4 environment is setup 
2. In order to run the network, open cmd and navigate to Prototype/EV-Protocol/evprotocol/
3. In order to start the network using GoLang chaincode use command `./startFabric.sh go`
4. In order to start the network using Javascript chaincode use command `./startFabric.sh javascript`

### Step 2: Using Javascript client to interact with the network (OSX)
1. Once the network is up, there are two ways to interact with the network, using JS client or through scripts. This section will focus on using JS client
2. In order to execute javascript client, open cmd and navigate to Prototype/EV-Protocol/evprotocol/javascript
3. Execute `rm -rf wallet` to remove any previous user keys stored in wallet
4. Execute `node enrollAdmin.js` to enroll the admin on the network
5. Execute `node registerUser.js` to register the user on the network
6. Execute `node query.js` to query the chaincode 'queryEV' function with argument 'EV4'
7. Execute `node invoke.js` to create 10 random EVs.
8. The chaincode function and arguments details can be seen in the Prototype/EV-Protocol/evprotocol_documentation.md and therefore the query.js or invoke.js can be updated accordingly to execute required chaincode function with respective parameters.

### Step 2 (Alternate): Using scripts to load test the network (OSX)
1. Once the network is up, there are two ways to interact with the network, using JS client or through scripts. This section will focus on using scripts
2. In order to execute a script, open cmd and navigate to Prototype/EV-Protocol/scripts
3. Execute `./many-creates.sh` to create 100 EVs
4. Execute `./create-complexity.sh` to create 10 EVs along with executing complexity function
5. Execute `./get-ev-location.sh` obtain EVs for Munich with a random postalCode with offset of 2
6. Execute `./update-location.sh` to update the location and postal code of 'EV0'
7. Execute `node invoke.js` to create 10 random cars.
8. The chaincode function and arguments details can be seen in the Prototype/EV-Protocol/evprotocol_documentation.md and therefore the scripts can be updated accordingly to execute required chaincode function with respective parameters.

## Prototype Setup 1:
Golang Chaincode, Raft ordering service with 7 peers, couchDB, endorsement policy (AND with 2 endorsers), MaxMessageCount: 100, BatchTimeout: 20s

## Prototype Setup 2:
Javascript Chaincode, Raft ordering service with 5 peers, levelDB, endorsement policy (nOutOf with 2 endorsers), MaxMessageCount: 100, BatchTimeout: 20s

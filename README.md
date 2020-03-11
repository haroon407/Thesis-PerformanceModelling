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


### Prototype (Folder Structure):
- 'Prototype/EV-Protocol/chaincode/evprotocol' folder contains chaincode in two languages, GoLang and Javascript
- 'Prototype/EV-Protocol/bin' folder contains binaries used for the network
- 'Prototype/EV-Protocol/evprotocol/' folder contains script to start the network
- 'Prototype/EV-Protocol/evprotocol/javascript/' folder contains NodeJS client to interact with the network
- 'Prototype/EV-Protocol/network-raft/' folder contains the Hyperledger Fabric network code
- 'Prototype/EV-Protocol/scripts/' folder contains the scripts files for running load test

## How to run the prototype (OSX)

### Step 1: Start network (OSX)
1. First of all make sure Hyperledger Fabric v1.4.4 environment is setup 
2. In order to run the network, open cmd and navigate to 'Prototype/EV-Protocol/evprotocol/'
3. In order to start the network using GoLang chaincode use command `./startFabric.sh go`
4. In order to start the network using Javascript chaincode use command `./startFabric.sh javascript`

### Step 2: Using Javascript client to interact with the network (OSX)
1. Once the network is up, there are two ways to interact with the network, using JS client or through scripts. This section will focus on using JS client
2. In order to execute javascript client, open cmd and navigate to 'Prototype/EV-Protocol/evprotocol/javascript'
3. Execute `rm -rf wallet` to remove any previous user keys stored in wallet
4. Execute `node enrollAdmin.js` to enroll the admin on the network
5. Execute `node registerUser.js` to register the user on the network
6. Execute `node query.js` to query the chaincode 'queryEV' function with argument 'EV4'
7. Execute `node invoke.js` to create 10 random EVs.
8. The chaincode function and arguments details can be seen in the 'Prototype/EV-Protocol/evprotocol_documentation.md' and therefore the query.js or invoke.js can be updated accordingly to execute required chaincode function with respective parameters.

### Step 2 (Alternate): Using scripts to load test the network (OSX)
1. Once the network is up, there are two ways to interact with the network, using JS client or through scripts. This section will focus on using scripts
2. In order to execute a script, open cmd and navigate to 'Prototype/EV-Protocol/scripts'
3. Execute `./many-creates.sh` to create 100 EVs
4. Execute `./create-complexity.sh` to create 10 EVs along with executing complexity function
5. Execute `./get-ev-location.sh` obtain EVs for Munich with a random postalCode with offset of 2
6. Execute `./update-location.sh` to update the location and postal code of 'EV0' 
7. The chaincode function and arguments details can be seen in the 'Prototype/EV-Protocol/evprotocol_documentation.md' and therefore the scripts can be updated accordingly to execute required chaincode function with respective parameters.

## Prototype Setup 1 to execute tests:
Golang Chaincode, Raft ordering service with 7 peers, couchDB, endorsement policy (AND with 2 endorsers), MaxMessageCount: 100, BatchTimeout: 20s

## Prototype Setup 2 to execute tests:
Javascript Chaincode, Raft ordering service with 5 peers, levelDB, endorsement policy (nOutOf with 2 endorsers), MaxMessageCount: 100, BatchTimeout: 20s

## Switching between prototype setups:
1. In order to change the chaincode, as mentioned in step 1, use `./startFabric.sh go` for Golang where as `./startFabric.sh javascript` for JS.
2. To change MaxMessageCount count or BatchTimeout, go to 'Prototype/EV-Protocol/network-raft/configtx.yaml' and change the respective parameter in the 'configtx.yaml' file.
3. To run the network using couchDB or levelDB, go to 'Prototype/EV-Protocol/evprotocol/startFabric.sh' and on line 35, type 'echo y | ./byfn.sh up -a -n -s couchdb' for couchDB or 'echo y | ./byfn.sh up -a -n -s leveldb' for leveldb
4. To Reduce number of ordering peers from 7 to 5, once the network is up, execute command 'docker kill orderer3.example.com' and 'docker kill orderer4.example.com' to kill orderer 3 and 4 respectively.
5. To change endorsement policy for AND/OR expression go to 'Prototype/EV-Protocol/evprotocol/startFabric.sh'. and type '"AND('Org1MSP.member','Org2MSP.member')"' as an argument for '-P' flag on line 85.
To change endorsement policy for nOutOf expression, within the same file and lines, type '"OutOf(2, 'Org1.member', 'Org2.member')"' as an argument for '-P' flag on line 85.


### Performance Modelling (Folder Structure):
- This folder contains the code used to model the performance. The folders not mentioned in thes section, but existing in the repository are the ones which were either not used in the thesis or are only for supporting the networks implementations.
- '/Performance Modelling/bin/' folder contains binaries used for the all networks
- '/Performance Modelling/chaincode/fabcar' folder contains chaincode in 4 languages, Java, GoLang, Javascript and Typescript. There is another additional folder for 'javascript-low-level' which was not used at all during the thesis.
- '/Performance Modelling/Backup Implementations/' folder contains some networks and clients developed for the thesis but could not run due to limited hardware constraints such as RAM.
- There are 2 folders for each network type, a network folder to run Hyperledger Fabric network and a client folder to interact with the client. Following are the networks and clients discussed in detail.

- ' /Performance Modelling/8-peer-fabcar' consists of client for 10 peer network(8 peers for org1 + 2 peers for org2)/ '/Performance Modelling/8-peers-network/' consists of the network code for respective architecture.
- '/Performance Modelling/fabcar/' consists of client for 2 organizations with solo orderer with 2 peers each. /Performance Modelling/first-network/' consists of the network code for respective architecture.
- '/Performance Modelling/fabcar-four-org/' consists of client for 4 organizations with solo orderer with 2 peers each for org 1 and 2, where as 1 orderer for org 3 and 4. /Performance Modelling/four-org-network/' consists of the network code for respective architecture.
- '/Performance Modelling/fabcar-kafka/' consists of client for 2 organizations with 2 peers each and with Kafka orderering service with one orderer. '/Performance Modelling/fabric-kafka/' consists of the network code for respective architecture.
- '/Performance Modelling/fabcar-raft/' consists of client for 2 organizations with 2 peers each and with Raft orderering service with seven orderer. '/Performance Modelling/first-network-raft/' consists of the network code for respective architecture.
- '/Performance Modelling/fabcar-three-org/' consists of client for 3 organizations with 2 peers each and with solo orderer. '/Performance Modelling/three-org-network/' consists of the network code for respective architecture.
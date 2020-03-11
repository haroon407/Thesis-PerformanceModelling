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

## How to run the prototype

1. First of all make sure Hyperledger Fabric v1.4.4 environment is setup 
2. 

## Prototype Setup 1:
Golang Chaincode, Raft ordering service with 7 peers, couchDB, endorsement policy (AND with 2 endorsers), MaxMessageCount: 100, BatchTimeout: 20s

## Prototype Setup 2:
Javascript Chaincode, Raft ordering service with 5 peers, levelDB, endorsement policy (nOutOf with 2 endorsers), MaxMessageCount: 100, BatchTimeout: 20s

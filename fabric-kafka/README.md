[![Build Status](https://travis-ci.org/keenkit/fabric-sample-with-kafka.svg?branch=master)]
# fabric-kafka
This is an extension of Fabcar with first network implementation by:
https://github.com/keenkit/fabric-sample-with-kafka/

## Description

This repository supports `5 zookeepers and 4 kakfas`.

## Fabric Version
1.4.4

## Bianary files version
1.4.4

## How to run it?

#### 1. Get binaries & docker images (Dont follow if already have hyperledger and kafka installed)
Download binaries and docker images (Follow Hyperledger fabric first network tutorial). 

Go to root folder,
```shell
curl -sSL http://bit.ly/2ysbOFE | bash -s -- 1.4.4 1.4.4 0.4.18
```
After everything done you will have folder structure like:

```
fabric-sample-with-kafka$ tree
.
├── bin
│   ├── configtxgen
│   ├── configtxlator
│   ├── cryptogen
│   ├── discover
│   ├── fabric-ca-client
│   ├── idemixgen
│   ├── orderer
│   └── peer
├── chaincode
│   └── chaincode_example02
├── first-network
│   ├── base
...
```

Install the following (for mac):
brew cask install java
brew install kafka

#### 3. Run E2E test.

```shell
cd first-network
./byfn.sh generate

# Start Kafka services
brew services start kafka

# Start up network
./byfn.sh -m up -o kafka
```

#### 4. Bring down the network

```shell
./byfn.sh -m down -o kafka
```
## What's behind the code change?

#### 1. Change first-network/configtx.yaml

Make sure change the SampleDevModeKafka content...

```yaml
    SampleDevModeKafka:
        <<: *ChannelDefaults
        Capabilities:
            <<: *ChannelCapabilities
        Orderer:
            <<: *OrdererDefaults
            OrdererType: kafka
            Kafka:
                Brokers:
                - kafka0.example.com:9092
                - kafka1.example.com:9092
                - kafka2.example.com:9092
                - kafka3.example.com:9092   
```

#### 2. Add first-network/base/kafka-base.yaml

It is just a kafka/zookeeper base yaml files to be referenced.

#### 3. Change first-network/docker-compose-kafka.yaml

Modify and add more zookeepers & kafka nodes if required

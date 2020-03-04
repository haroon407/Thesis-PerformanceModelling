for (( i = 0; i < 1000; ++i ))
do
	peer chaincode invoke -o orderer.example.com:7050  --tls $CORE_PEER_TLS_ENABLED --cafile $CA_FILE -C $CHANNEL_NAME -n $CC_NAME --peerAddresses $PEER_1 --peerAddresses $PEER_2 --tlsRootCertFiles $PEER_1_CA --tlsRootCertFiles $PEER_2_CA -c '{"Args":["createCar", "CAR12", "Honda", "Accord", "black", "Tom"]}' &
done

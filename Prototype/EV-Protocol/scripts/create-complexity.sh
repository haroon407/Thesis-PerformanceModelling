# createEV with complexity functions arguments
# evNumber, manufacturer, model, color, chargingLevel, connector, owner, postalCode, city, n, option
# n is the length of input array and can be 1, 3, 5, 7, 11
# option is the complexity function to execute, can be '1' for O(2^n) and '2' for (n!)
postalCodes=('81340' '81341' '81342' '81343' '81344' '81345' '81346' '81347' '81348' '81349' '81350' '81351' '81352' '81353' '81354' '81355' '81356' '81357' '81358' '81359' '81360' '81361' '81362' '81363' '81364' '81365' '81366' '81367' '81368' '81369' '81370' '81371' '81372' '81373' '81374' '81375' '81376' '81377' '81378' '81379' '81380');
colors=('blue' 'green' 'silver' 'white' 'black' 'gold' 'red' 'grey');
owner=('Jay' 'Jack' 'Roony' 'Josef' 'Valerie' 'Mike' 'Anna' 'Johannas');
connectorTypes=('Type-F-(Schuko)' 'Type-2' 'Combo-CCS');
chargingLevels=('1' '2' '3');
model=('i3' 'i8');
echo $(date)
for (( i = 0; i < 10; ++i ));
do
	evNumber="EV$RANDOM";
	manufacturer="BMW";
	model=${model[$[$RANDOM % ${#model[@]}]]};
	color=${colors[$[$RANDOM % ${#colors[@]}]]};
	chargingLevel=${chargingLevels[$[$RANDOM % ${#chargingLevels[@]}]]};
	connectorType=${connectorTypes[$[$RANDOM % ${#connectorTypes[@]}]]};
	owner=${owner[$[$RANDOM % ${#owner[@]}]]};
	postalCode=${postalCodes[$[$RANDOM % ${#postalCodes[@]}]]};
	city="Munich";
	docker exec cli peer chaincode invoke -o orderer.example.com:7050  --tls $CORE_PEER_TLS_ENABLED --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C evchannel -n evprotocol --peerAddresses peer0.org1.example.com:7051 --peerAddresses peer0.org2.example.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt -c '{"Args":["createEVComplexity", "'$evNumber'", "BMW", "'$model'", "'$color'", "'$chargingLevel'","'$connectorType'", "'$owner'","'$postalCode'","Munich", "3", "1"]}';
done
echo $(date)
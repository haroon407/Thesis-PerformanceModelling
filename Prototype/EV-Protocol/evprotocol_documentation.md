## Muhammad Haroon Arshad (Master's Thesis), Technical University of Munich

## Hyperledger Fabric v1.4.4

## This is the documentation for evprotocol chaincode

1. Function Name: queryEV(evNumber)
Function Argument: evNumber: string
Description: This function takes the index of an ev to be fetched from database. The evNumber is of type string with keyword 'EV' followed by a number, for e.g. 'EV6'.

2. Function Name: queryEVWithLocation(postalCode, range, city, cpNumberFrom, cpNumberTo)
Function Argument: postalCode: number, range: number, city: string, cpNumberFrom: string, cpNumberTo: string
Description: This function takes a postal code, a range to look around the provided postalcode, a city and the id of charge proider and an id of ev owner. For e.g for postalCode 81375, city 'Munich' and range 2, the EVs in Munich for postal code 81375+-2 shall be returned. index of an ev owner and charge provider both start with 'CP' followed by a number, for e.g. 'CP0'. These parameters are used to transfer funds from charge provider to ev owner.

3. Function Name: queryEVWithLocationForLD(postalCode, range, city, cpNumberFrom, cpNumberTo)
Function Argument: postalCode: number, range: number, city: string, cpNumberFrom: string, cpNumberTo: string
Description: This function is exact same as mentioned above under description of 'queryEVWithLocation'. The difference is it is used for LevelDB since levelDb doesnot support queries so in this function all evs are fetched an then looped through to get the ones lying in the postalCode range and city.

4. Function Name: createEV(evNumber, manufacturer, model, color, chargingLevel, connector, owner, postalCode, city)
Function Argument: evNumber: string, manufacturer: string, model: string, color: string, chargingLevel: string, connector: string, owner: string, postalCode: number, city: string
Description: This function takes the index and remaining data to create an ev.

5. Function Name: queryAllEVs()
Function Argument: N/A
Description: This function returns all EVs in the ledger.

6. Function Name: changeEVLocation(EVNumber, newPostalCode, newCity)
Function Argument: EVNumber: string, newPostalCode: number, newCity: string
Description: This function takes index of ev along with new postal code and city to update the ev having the provided index.

7. Function Name: deleteEV(EVNumber)
Function Argument: EVNumber: string
Description: This function takes index of ev and deletes it.

8. Function Name: queryCP(cpNumber)
Function Argument: cpNumber: string
Description: This function takes the index of a cp to be fetched from database. The cpNumber is of type string with keyword 'CP' followed by a number, for e.g. 'CP0'.

9. Function Name: createCP(cpNumber, name, balance)
Function Argument: cpNumber: string, name: string, balance: number
Description: This function takes the index of a cp to be created along with its name and balance to put in its account. This balance is used to buy ev data from ev manufacturers.

10. Function Name: queryAllCPs()
Function Argument: N/A
Description: This function returns all CPs in the ledger.

11. Function Name: changeCPName(CPNumber, newCPName)
Function Argument: CPNumber: string, newCPName: string
Description: This function takes the index of cp whose name is to be changed along with the new name. for e.g changeCPName('CP1', 'Bavarian chargers').

12. Function Name: addCPBalance(CPNumber, balance)
Function Argument: CPNumber: string, balance: number
Description: This function takes the index of cp and an amount to be added in its account. for e.g changeCPName('CP1', 500), it will add 500 to the balance of CP1.

13. Function Name: subtractCPBalance(CPNumber, balance)
Function Argument: CPNumber: string, balance: number
Description: This function takes the index of cp and an amount to be subtracted in its account. for e.g changeCPName('CP1', 500), it will subtract 500 from the balance of CP1.

14. Function Name: createEVComplexity(evNumber, manufacturer, model, color, chargingLevel, connector, owner, postalCode, city, n, option)
Function Argument: evNumber: string, manufacturer: string, model: string, color: string, chargingLevel: string, connector: string, owner: string, postalCode: number, city: string,
n: string, option: string
Description: This function takes the index and remaining data to create an ev. In addition it takes 2 more arguments, n and option. It is to execute the complexity function. the value of n denotes the length of the array and can be any one from [1,2,5,8,10,11]. option can be either 1 or 2. if option is 1, it will execute the time complexity O(2^n), if option is 2, it will calculate time complexity O(n!).
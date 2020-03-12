## Muhammad Haroon Arshad (Master's Thesis), Technical University of Munich

## Hyperledger Fabric v1.4.4

## This is the documentation for evprotocol chaincode

1. Function Name: queryCar(carNumber)
Function Argument: carNumber: string
Description: This function takes the index of a car to be fetched from database. The carNumber is of type string with keyword 'CAR' followed by a number, for e.g. 'CAR6'.

2. Function Name: queryCar1CD()
Function Argument: N/A
Description: This function is to test the query for couchDB with one column where clause. The function has a hard coded query to fetch car whose owner is 'Valeria'

3. Function Name: queryCar2CD()
Function Argument: N/A
Description: This function is to test the query for couchDB with two columns where clause. The function has a hard coded query to fetch car whose owner is 'Tom' and has model 'FJ Cruiser'

4. Function Name: queryCar3CD()
Function Argument: N/A
Description: This function is to test the query for couchDB with three columns where clause. The function has a hard coded query to fetch car whose make is 'Toyota', model is 'Hilux' and color is 'black'.

5. Function Name: queryCar1LD()
Function Argument: N/A
Description: This function is to test the query for levelDB with one column where clause. In order to achieve this, we fetch all data and loop through it to find the required values.  The function has a hard coded query to fetch car whose owner is 'Valeria'

6. Function Name: queryCar2LD()
Function Argument: N/A
Description: This function is to test the query for levelDB with two columns where clause. In order to achieve this, we fetch all data and loop through it to find the required values. The function has a hard coded query to fetch car whose owner is 'Tom' and has model 'FJ Cruiser'

7. Function Name: queryCar3LD()
Function Argument: N/A
Description: This function is to test the query for levelDB with three columns where clause.  In order to achieve this, we fetch all data and loop through it to find the required values. The function has a hard coded query to fetch car whose make is 'Toyota', model is 'Hilux' and color is 'black'.

8. Function Name: createCar(carNumber, make, model, color, owner)
Function Argument: carNumber: string, make: string, model: string, color: string, owner: string
Description: This function takes the index and remaining data to create an car.

5. Function Name: queryAllCars(n, option)
Function Argument: n: number, option: number
Description: This function returns all EVs in the ledger if the complexity code is commented, if not commented then it will not just get the cars but will also execute the complexity function based on the values of n and option. n can belong to the set [10, 100, 200, 500, 1000, 2500] or [1, 3, 5, 8, 10, 11]. Option can be belong to set [1,2,3,4,5,6,7]. n decides the length of array where as the option decides which complexity funciton to execute. O(1), O(n), O(n^2), O(log(n)), O(nlog(n)), O(2^n), O(n!). The value of n for first 4 options belong to set [10, 100, 200, 500, 1000, 2500], where as for option 5, 6 and 7 it belongs to [1, 3, 5, 8, 10, 11].

6. Function Name: changeCarOwner(carNumber, newOwner)
Function Argument: carNumber: string, newOwner: string
Description: This function takes index of the car along with new owner name to update the owner of the car having provided index.

7. Function Name: deleteCarCD(carNumber)
Function Argument: carNumber: string
Description: This function takes index of car and deletes it. it is for couchDB

8. Function Name: deleteCarLD(carNumber)
Function Argument: carNumber: string
Description: This function takes index of car and deletes it. it is for levelDB

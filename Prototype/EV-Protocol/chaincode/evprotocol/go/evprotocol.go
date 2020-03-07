/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/*
 * The sample smart contract for documentation topic:
 * Writing Your First Blockchain Application
 */

package main

/* Imports
 * 4 utility libraries for formatting, handling bytes, reading and writing JSON, and string manipulation
 * 2 specific Hyperledger Fabric specific libraries for Smart Contracts
 */
import (
	"bytes"
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	sc "github.com/hyperledger/fabric/protos/peer"
)

// Define the Smart Contract structure
type SmartContract struct {
}

// Define the car structure, with 4 properties.  Structure tags are used by encoding/json library
type EV struct {
	Manufacturer   string `json:"manufacturer"`
	ChargingLevel   string `json:"chargingLevel"`
	Connector   string `json:"connector"`
	PostalCode   int `json:"postalCode"`
	City   string `json:"city"`
	Model  string `json:"model"`
	Color string `json:"color"`
	Owner  string `json:"owner"`
}

type CP struct {
	Name   string `json:"name"`
	Balance   int `json:"balance"`
}

/*
 * The Init method is called when the Smart Contract "EVProtocol" is instantiated by the blockchain network
 * Best practice is to have any Ledger initialization in separate function -- see initLedger()
 */
func (s *SmartContract) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

/*
 * The Invoke method is called as a result of an application request to run the Smart Contract "EVProtocol"
 * The calling application program has also specified the particular smart contract function to be called, with arguments
 */
func (s *SmartContract) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {

	// Retrieve requested Chaincode functions
	function, args := APIstub.GetFunctionAndParameters()
	// Route to specified chaincode function
	
	// query EV - arg: evNumber: string
	// query queryEVWithLocation - arg: postalCode int, offset string, city string, cpNumberFrom string, cpNumberTo string 
	// query createEV - arg: evNumber: string, Manufacturer: string, Model: string, Color: string, ChargingLevel: string, Connector: string, Owner: string, postalCode: int, city: string 
	// query createEVComplexity - arg: evNumber: string, Manufacturer: string, Model: string, Color: string, ChargingLevel: string, Connector: string, Owner: string, postalCode: int, city: string, n: string, option: string 
	// query queryAllEVs - arg: n string, option string
	// query changeEVLocation - arg: evNumber: string, newPostalCode: string, newCity: string
	// query createCP - arg: CPNumber: string, name: string, balance: string
	// query addCPBalance - arg: CPNumber: string, amount: int
	// query subtractCPBalance - arg: CPNumber: string, amount: string
	if function == "queryEV" {
		return s.queryEV(APIstub, args)
	} else if function == "queryEVWithLocation" { 
		postalCode, _ := strconv.Atoi(args[0])
		return s.queryEVWithLocation(APIstub, postalCode, args[1], args[2], args[3], args[4])
	} else if function == "initLedger" {
		return s.initLedger(APIstub)
	} else if function == "createEV" {
		return s.createEV(APIstub, args)
	} else if function == "createEVComplexity" {
		return s.createEVComplexity(APIstub, args)
	} else if function == "queryAllEVs" {
		return s.queryAllEVs(APIstub, args[0], args[1])
	} else if function == "changeEVLocation" {
		return s.changeEVLocation(APIstub, args)
	} else if function == "createCP" {
		return s.createCP(APIstub, args)
	} else if function == "addCPBalance" {
		return s.addCPBalance(APIstub, args)
	} else if function == "subtractCPBalance" {
		return s.subtractCPBalance(APIstub, args)
	}

	return shim.Error("Invalid Smart Contract function name.")
}

func (s *SmartContract) queryEV(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Expecting only 1 argument")
	}

	evAsBytes, _ := APIstub.GetState(args[0])
	return shim.Success(evAsBytes)
}

func (s *SmartContract) initLedger(APIstub shim.ChaincodeStubInterface) sc.Response {
	evs := []EV{
		EV{Color: "blue", Manufacturer: "BMW", Model: "i3", ChargingLevel: "1", Connector: "Type-F-(Schuko)", Owner: "John", PostalCode: 81375, City: "Munich"},
		EV{Color: "red", Manufacturer: "BMW", Model: "i3", ChargingLevel: "2", Connector: "Type-2", Owner: "Tom", PostalCode: 81377, City: "Munich"},
		EV{Color: "green", Manufacturer: "BMW", Model: "i8", ChargingLevel: "3", Connector: "Combo-CCS", Owner: "Jerry", PostalCode: 81374, City: "Munich"},
		EV{Color: "yellow", Manufacturer: "BMW", Model: "i8", ChargingLevel: "3", Connector: "Combo-CCS", Owner: "Phillip", PostalCode: 81379, City: "Munich"},
		EV{Color: "black", Manufacturer: "BMW", Model: "i3", ChargingLevel: "2", Connector: "Type-2", Owner: "Carlos", PostalCode: 81372, City: "Munich"},
		EV{Color: "white", Manufacturer: "BMW", Model: "i3", ChargingLevel: "1", Connector: "Type-F-(Schuko)", Owner: "Bernard", PostalCode: 81369, City: "Munich"},
		EV{Color: "grey", Manufacturer: "BMW", Model: "i3", ChargingLevel: "2", Connector: "Type-2", Owner: "Max", PostalCode: 81381, City: "Munich"},
		EV{Color: "orange", Manufacturer: "BMW", Model: "i3", ChargingLevel: "1", Connector: "Type-F-(Schuko)", Owner: "Markus", PostalCode: 81374, City: "Munich"},
		EV{Color: "white", Manufacturer: "BMW", Model: "i8", ChargingLevel: "1", Connector: "Type-F-(Schuko)", Owner: "Sammy", PostalCode: 81382, City: "Munich"},
		EV{Color: "brown", Manufacturer: "BMW", Model: "i8", ChargingLevel: "3", Connector: "Combo-CCS", Owner: "Darren", PostalCode: 81375, City: "Munich"},
	}

	cps := []CP{
		CP{Name: "BavariaChargers", Balance: 1000000},
		CP{Name: "GeneralChargers", Balance: 3000000},
		CP{Name: "BMW", Balance: 0},
	}

	i := 0
	for i < len(evs) {
		evAsBytes, _ := json.Marshal(evs[i])
		APIstub.PutState("EV"+strconv.Itoa(i), evAsBytes)
		fmt.Println("Added", evs[i])
		i = i + 1
	}

	j := 0
	for j < len(cps) {
		cpAsBytes, _ := json.Marshal(cps[j])
		APIstub.PutState("CP"+strconv.Itoa(j), cpAsBytes)
		fmt.Println("Added", cps[j])
		j = j + 1
	}

	return shim.Success(nil)
}

func (s *SmartContract) createEV(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 9 {
		return shim.Error("Expecting 9 arguments")
	}
	postalCode, _:= strconv.Atoi(args[7])
	var ev = EV{Manufacturer: args[1], Model: args[2], Color: args[3], ChargingLevel: args[4], Connector: args[5], Owner: args[6], PostalCode: postalCode, City: args[8]}

	evAsBytes, _ := json.Marshal(ev)
	APIstub.PutState(args[0], evAsBytes)

	return shim.Success(nil)
}

func (s *SmartContract) queryAllEVs(APIstub shim.ChaincodeStubInterface, n string, option string) sc.Response {

	keyStart := "EV0"
	keyEnd := "EV9999"

	resultsIterator, err := APIstub.GetStateByRange(keyStart, keyEnd)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()
	// Executing the complexity function
	// GetComplexityFunctionExecuted(n, option)
	// buffer is a JSON array containing QueryResults
	var buffer bytes.Buffer
	buffer.WriteString("[")

	memberAlreadyWritten := false
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		// Adding comma after each member
		if memberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"Key\":")
		buffer.WriteString("\"")
		buffer.WriteString(queryResponse.Key)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Record\":")
		// Record format is Json, so no need to convert
		buffer.WriteString(string(queryResponse.Value))
		buffer.WriteString("}")
		memberAlreadyWritten = true
	}
	buffer.WriteString("]")

	fmt.Printf("- queryAllEVs:\n%s\n", buffer.String())

	return shim.Success(buffer.Bytes())
}

func (s *SmartContract) queryEVWithLocation(APIstub shim.ChaincodeStubInterface, postalCode int, offset string, city string, cpNumberFrom string, cpNumberTo string) sc.Response {
	
	offsetInt, _:= strconv.Atoi(offset)
	lowerRange := postalCode - offsetInt
	upperRange := postalCode + offsetInt

	// Transferring fee and updating CPs
	success := transferFee(APIstub, cpNumberFrom, cpNumberTo, feeAmount)

	if success == 0 {
		return shim.Error("Error while trasferring funds for transaction, Make sure there is enough balance to execute this transaction")
	}

	// Preparing query
	stringQuery := `{
		"selector": {
		   "postalCode": {
			"$gte": ` + strconv.Itoa(lowerRange) + `,
			"$lte": ` + strconv.Itoa(upperRange) + `
		   	},
			"city": {
				"$eq": "` + city + `"` + `
			}
		}
	 }`

	resultsIterator, err := APIstub.GetQueryResult(stringQuery)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()
	// Executing the complexity function
	// fmt.Println("GOT n", n)
	// fmt.Println("GOT option", option)
	// GetComplexityFunctionExecuted("100", "2")
	// buffer is a JSON array containing QueryResults
	var buffer bytes.Buffer
	buffer.WriteString("[")

	memberAlreadyWritten := false
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		// Adding comma after each member
		if memberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"Key\":")
		buffer.WriteString("\"")
		buffer.WriteString(queryResponse.Key)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Record\":")
		// Record format is Json, so no need to convert
		buffer.WriteString(string(queryResponse.Value))
		buffer.WriteString("}")
		memberAlreadyWritten = true
	}
	buffer.WriteString("]")

	fmt.Printf("- queryAllCars:\n%s\n", buffer.String())

	return shim.Success(buffer.Bytes())
}

func (s *SmartContract) changeEVLocation(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 3 {
		return shim.Error("Expecting 3 arguments")
	}

	evAsBytes, _ := APIstub.GetState(args[0])
	ev := EV{}

	json.Unmarshal(evAsBytes, &ev)
	ev.PostalCode = args[1]
	ev.City = args[2]

	evAsBytes, _ = json.Marshal(ev)
	APIstub.PutState(args[0], evAsBytes)

	return shim.Success(nil)
}

func (s *SmartContract) createCP(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 2 {
		return shim.Error("Expecting 2 arguments")
	}
	
	balanceInt, _:= strconv.Atoi(args[2])
	var cp = CP{Name: args[1], Balance: balanceInt}

	cpAsBytes, _ := json.Marshal(cp)
	APIstub.PutState(args[0], cpAsBytes)

	return shim.Success(nil)
}

// Arguments: 0. CPNumber, 1. Amount
func (s *SmartContract) addCPBalance(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 2 {
		return shim.Error("Expecting 2 arguments")
	}

	cpAsBytes, _ := APIstub.GetState(args[0])
	cp := CP{}

	json.Unmarshal(cpAsBytes, &cp)
	amount, _ := strconv.Atoi(args[1])
	cp.Balance = cp.Balance + amount

	cpAsBytes, _ = json.Marshal(cp)
	APIstub.PutState(args[0], cpAsBytes)

	return shim.Success(nil)
}

func (s *SmartContract) subtractCPBalance(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 2 {
		return shim.Error("Expecting 2 arguments")
	}

	cpAsBytes, _ := APIstub.GetState(args[0])
	cp := CP{}

	json.Unmarshal(cpAsBytes, &cp)
	
	amount, _:= strconv.Atoi(args[1])

	if cp.Balance - amount < 0 {
		return shim.Error(args[0] + "does not have enough balance")
	}
	cp.Balance = cp.Balance - amount

	cpAsBytes, _ = json.Marshal(cp)
	APIstub.PutState(args[0], cpAsBytes)

	return shim.Success(nil)
}

func transferFee(APIstub shim.ChaincodeStubInterface, cpNumberFrom string, cpNumberTo string, feeAmount int) int {
	// cpNumberFrom := []byte(transferFrom)
	// cpNumberTo := []byte(transferTo)
	
	cpAsBytesFrom, _ := APIstub.GetState(cpNumberFrom)
	cpAsBytesTo, _ := APIstub.GetState(cpNumberTo)
	cpFrom := CP{}
	cpTo := CP{}
	json.Unmarshal(cpAsBytesFrom, &cpFrom)
	json.Unmarshal(cpAsBytesTo, &cpTo)
	
	if cpFrom.Balance - feeAmount < 0 {
		return 0
	}

	cpFrom.Balance = cpFrom.Balance - feeAmount
	cpTo.Balance = cpTo.Balance + feeAmount

	cpAsBytesFrom, _ = json.Marshal(cpFrom)
	cpAsBytesTo, _ = json.Marshal(cpTo)
	APIstub.PutState(cpNumberFrom, cpAsBytesFrom)
	APIstub.PutState(cpNumberTo, cpAsBytesTo)

	return 1
}

// For executing latency test with complexity function
func (s *SmartContract) createEVComplexity(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 11 {
		return shim.Error("Expecting 11 arguments")
	}
	n:= args[9]
	option:= args[10]

	// Executing the complexity function
	GetComplexityFunctionExecuted(n, option)

	postalCode, _:= strconv.Atoi(args[7])
	var ev = EV{Manufacturer: args[1], Model: args[2], Color: args[3], ChargingLevel: args[4], Connector: args[5], Owner: args[6], PostalCode: postalCode, City: args[8]}

	evAsBytes, _ := json.Marshal(ev)
	APIstub.PutState(args[0], evAsBytes)

	return shim.Success(nil)
}

func main() {

	// Creating Chaincode
	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Error while creating the chaincode: %s", err)
	}
}

func GetComplexityFunctionExecuted(n string, option string) {
	switch n {
	case "1":
		fmt.Println("got n: 1")
		ExecuteFunction(option, String1, String1Arr)
	case "2":
		fmt.Println("got n: 2")
		ExecuteFunction(option, String3, String3Arr)
	case "5":
		fmt.Println("got n: 5")
		ExecuteFunction(option, String5, String5Arr)
	case "8":
		fmt.Println("got n: 8")
		ExecuteFunction(option, String8, String8Arr)
	case "10":
		fmt.Println("got n: 10")
		ExecuteFunction(option, String10, String10Arr)
	case "11":
		fmt.Println("got n: 11")
		ExecuteFunction(option, String11, String11Arr)
	}
}

func ExecuteFunction(option string, set string, setArr []string) {
	switch option {
	case "1":
		fmt.Println("got option: O(2^n)")
		PowerSet(setArr)
		fmt.Println("O(2^n)")
	case "2":
		fmt.Println("got option: O(n!)")
		permutations(set)
		fmt.Println("O(n!)")
	}
}

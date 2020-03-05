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
	manufacturer   string `json:"manufacturer"`
	chargingLevel   string `json:"chargingLevel"`
	connector   string `json:"connector"`
	postalCode   int `json:"postalCode"`
	city   string `json:"City"`
	model  string `json:"model"`
	color string `json:"color"`
	owner  string `json:"owner"`
}

type CP struct {
	name   string `json:"name"`
	balance   int `json:"balance"`
}

/*
 * The Init method is called when the Smart Contract "fabcar" is instantiated by the blockchain network
 * Best practice is to have any Ledger initialization in separate function -- see initLedger()
 */
func (s *SmartContract) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

/*
 * The Invoke method is called as a result of an application request to run the Smart Contract "fabcar"
 * The calling application program has also specified the particular smart contract function to be called, with arguments
 */
func (s *SmartContract) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {

	// Retrieve the requested Smart Contract function and arguments
	function, args := APIstub.GetFunctionAndParameters()
	// Route to the appropriate handler function to interact with the ledger appropriately
	if function == "queryEV" {
		return s.queryEV(APIstub, args)
	} else if function == "queryEVWithLocation" {
		postalCode, _ := strconv.Atoi(args[0])
		return s.queryEVWithLocation(APIstub, postalCode, args[1], args[2], args[3])
	} else if function == "initLedger" {
		return s.initLedger(APIstub)
	} else if function == "createEV" {
		return s.createEV(APIstub, args)
	} else if function == "queryAllEVs" {
		return s.queryAllEVs(APIstub, args[0], args[1])
	} else if function == "changeEVOwner" {
		return s.changeEVOwner(APIstub, args)
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
		EV{color: "blue", manufacturer: "BMW", model: "i3", chargingLevel: "1", connector: "Type-F-(Schuko)", owner: "John", postalCode: 81375, city: "Munich"},
		EV{color: "red", manufacturer: "BMW", model: "i3", chargingLevel: "2", connector: "Type-2", owner: "Tom", postalCode: 81377, city: "Munich"},
		EV{color: "green", manufacturer: "BMW", model: "i8", chargingLevel: "3", connector: "Combo-CCS", owner: "Jerry", postalCode: 81374, city: "Munich"},
		EV{color: "yellow", manufacturer: "BMW", model: "i8", chargingLevel: "3", connector: "Combo-CCS", owner: "Phillip", postalCode: 81379, city: "Munich"},
		EV{color: "black", manufacturer: "BMW", model: "i3", chargingLevel: "2", connector: "Type-2", owner: "Carlos", postalCode: 81372, city: "Munich"},
		EV{color: "white", manufacturer: "BMW", model: "i3", chargingLevel: "1", connector: "Type-F-(Schuko)", owner: "Bernard", postalCode: 81369, city: "Munich"},
		EV{color: "grey", manufacturer: "BMW", model: "i3", chargingLevel: "2", connector: "Type-2", owner: "Max", postalCode: 81381, city: "Munich"},
		EV{color: "orange", manufacturer: "BMW", model: "i3", chargingLevel: "1", connector: "Type-F-(Schuko)", owner: "Markus", postalCode: 81374, city: "Munich"},
		EV{color: "white", manufacturer: "BMW", model: "i8", chargingLevel: "1", connector: "Type-F-(Schuko)", owner: "Sammy", postalCode: 81382, city: "Munich"},
		EV{color: "brown", manufacturer: "BMW", model: "i8", chargingLevel: "3", connector: "Combo-CCS", owner: "Darren", postalCode: 81375, city: "Munich"},
	}

	cps := []CP{
		CP{name: "BavariaChargers", balance: 1000000},
		CP{name: "GeneralChargers", balance: 3000000},
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
	var ev = EV{manufacturer: args[1], model: args[2], color: args[3], chargingLevel: args[4], connector: args[5], owner: args[6], postalCode: postalCode, city: args[8]}

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

func (s *SmartContract) queryEVWithLocation(APIstub shim.ChaincodeStubInterface, postalCode int, offset string, city string, cpNumber string) sc.Response {
	
	offsetInt, _:= strconv.Atoi(offset)
	lowerRange := postalCode - offsetInt
	upperRange := postalCode + offsetInt
	feeAmount := 500000

	// Deducting fee and updating CP
	cpAsBytes, _ := APIstub.GetState(cpNumber)
	cp := CP{}
	json.Unmarshal(cpAsBytes, &cp)
	
	if cp.balance - feeAmount < 0 {
		return shim.Error(cpNumber + " does not have enough balance for this transaction")
	}

	cp.balance = cp.balance - feeAmount

	cpAsBytes, _ = json.Marshal(cp)
	APIstub.PutState(args[0], cpAsBytes)

	// Preparing query
	stringQuery := `{
		"selector": {
		   "postalCode": {
			  "$gte": ` + strconv.Itoa(upperRange) + `
		   },
		   "postalCode": {
			"$lte": ` + strconv.Itoa(lowerRange) + `
		},
		"city": {
			"$eq": ` + city + `
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

func (s *SmartContract) changeEVOwner(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 2 {
		return shim.Error("Expecting 2 arguments")
	}

	evAsBytes, _ := APIstub.GetState(args[0])
	ev := EV{}

	json.Unmarshal(evAsBytes, &ev)
	ev.owner = args[1]

	evAsBytes, _ = json.Marshal(ev)
	APIstub.PutState(args[0], evAsBytes)

	return shim.Success(nil)
}

func (s *SmartContract) createCP(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 2 {
		return shim.Error("Expecting 2 arguments")
	}
	
	balanceInt, _:= strconv.Atoi(args[2])
	var cp = CP{name: args[1], balance: balanceInt}

	cpAsBytes, _ := json.Marshal(cp)
	APIstub.PutState(args[0], cpAsBytes)

	return shim.Success(nil)
}

func (s *SmartContract) addCPBalance(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 2 {
		return shim.Error("Expecting 2 arguments")
	}

	cpAsBytes, _ := APIstub.GetState(args[0])
	cp := CP{}

	json.Unmarshal(cpAsBytes, &cp)
	amount, _ := strconv.Atoi(args[1])
	cp.balance = cp.balance + amount

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

	if cp.balance - amount < 0 {
		return shim.Error(args[0] + "does not have enough balance")
	}
	cp.balance = cp.balance - amount

	cpAsBytes, _ = json.Marshal(cp)
	APIstub.PutState(args[0], cpAsBytes)

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

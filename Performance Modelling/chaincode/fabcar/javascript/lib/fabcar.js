/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
const DummyData = require('./dummy-data');
const ComplexityFunctions = require('./complexityFunctions');

class FabCar extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const cars = DummyData.cars;

        for (let i = 0; i < cars.length; i++) {
            cars[i].docType = 'car';
            await ctx.stub.putState('CAR' + i, Buffer.from(JSON.stringify(cars[i])));
            console.info('Added <--> ', cars[i]);
        }
        console.info('============= END : Initialize Ledger ===========');

    }

    async queryCar(ctx, carNumber) {
        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        console.log(carAsBytes.toString());
        return carAsBytes.toString();
    }

    async queryCar1CD(ctx) {
        const stringQuery = `{
            "selector": {
               "owner": {
                  "$eq": "Valeria"
               }
            }
         }`
        const iterator = await ctx.stub.getQueryResult(stringQuery);
        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                // console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                // console.log('end of data');
                await iterator.close();
                // console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

    async queryCar2CD(ctx) {
        const stringQuery = `{
            "selector": {
               "model": {
                  "$eq": "FJ Cruiser"
               },
               "owner": {
                  "$eq": "Tom"
               }
            }
         }`
        const iterator = await ctx.stub.getQueryResult(stringQuery);
        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                // console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                // console.log('end of data');
                await iterator.close();
                // console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

    async queryCar3CD(ctx) {
        const stringQuery = `{
            "selector": {
               "make": {
                  "$eq": "Toyota"
               },
               "model": {
                  "$eq": "Hilux"
               },
               "color": {
                  "$eq": "black"
               }
            }
         }`
        const iterator = await ctx.stub.getQueryResult(stringQuery);
        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                // console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                // console.log('end of data');
                await iterator.close();
                // console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

    async queryCar1LD(ctx) {
        const stringQuery = "Valeria";
        const startKey = 'CAR0';
        const endKey = 'CAR999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);
        let result = {};
        let Key;
        let Record;
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {

                Key = res.value.key;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
            }
            if (Record.owner === stringQuery) {
                result = { Key, Record };
                await iterator.close();
                return JSON.stringify(result);
            } else if (res.done) {
                await iterator.close();
                return JSON.stringify({ message: "Not found" });
            }
        }
    }

    async queryCar2LD(ctx) {
        const model = "FJ Cruiser";
        const owner = "Tom";
        const startKey = 'CAR0';
        const endKey = 'CAR999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);
        let result = {};
        let Key;
        let Record;
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                Key = res.value.key;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
            }
            if (Record.owner === owner && Record.model === model) {
                result = { Key, Record };
                await iterator.close();
                return JSON.stringify(result);
            } 
            // else if (res.done) {
            //     await iterator.close();
            //     return JSON.stringify({ message: "Not found" });
            // }
        }
    }

    async queryCar3LD(ctx) {
        const model = "Hilux";
        const make = "Toyota";
        const color = "black";
        const startKey = 'CAR0';
        const endKey = 'CAR999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);
        let result = {};
        let Key;
        let Record;
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {

                Key = res.value.key;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
            }
            if (Record.make === make && Record.model === model && Record.color === color) {
                result = { Key, Record };
                await iterator.close();
                return JSON.stringify(result);
            } 
            // else if (res.done) {
            //     await iterator.close();
            //     return JSON.stringify({ message: "Not found" });
            // }
        }
    }

    async createCar(ctx, carNumber, make, model, color, owner) {
        console.info('============= START : Create Car ===========');
        console.log('got:' + carNumber + ' - ' + make  + ' - ' + model + ' - ' + color + ' - ' + owner);
        const car = {
            color,
            docType: 'car',
            make,
            model,
            owner,
        };

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : Create Car ===========');
    }

    async queryAllCars(ctx, n, option) {
        const startKey = 'CAR0';
        const endKey = 'CAR999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        // Execute complexity function
        // this.getComplexityFunctionExecuted(n, option);
        // let result = ComplexityFunctions.getLastElement(DummyData.numbers10);
        // let result2 = ComplexityFunctions.findIndex(DummyData.numbers10, 1503);
        // console.log("O(1) - ", result);
        // console.log("O(n) - ", result2);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                // console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                // console.log('end of data');
                await iterator.close();
                // console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

    async changeCarOwner(ctx, carNumber, newOwner) {
        console.info('============= START : changeCarOwner ===========');
        console.log('got:' + carNumber + ' - ' + newOwner);

        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.owner = newOwner;
        console.log('updated owner:' + car.owner + ' - ' + car.model);
        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarOwner ===========');
    }

    async deleteCarCD(ctx, carNumber) {
        console.info('============= START : deleteCarCD ===========');
        await ctx.stub.deleteState(carNumber); // get the car from chaincode state
        console.info('============= END : deleteCarCD ===========');
    }

    async deleteCarLD(ctx, carNumber) {
        console.info('============= START : deleteCarCD ===========');
        await ctx.stub.deleteState(carNumber); // get the car from chaincode state
        console.info('============= END : deleteCarCD ===========');
    }


    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async getComplexityFunctionExecuted(n, option) {
        let arr;
        let stringArr;
        if (n === "10") {
            console.log("got n: 10 / 1");
            arr = DummyData.numbers10;
            stringArr = DummyData.string1;
            await this.executeFunction(option, arr, stringArr);
        } else if (n === "100") {
            console.log("got n: 100 / 2");
            arr = DummyData.numbers100;
            stringArr = DummyData.string3;
            await this.executeFunction(option, arr, stringArr);
        } else if (n === "200") {
            console.log("got n: 200 / 5");
            arr = DummyData.numbers200;
            stringArr = DummyData.string5;
            await this.executeFunction(option, arr, stringArr);
        } else if (n === "500") {
            console.log("got n: 500 / 8");
            arr = DummyData.numbers500;
            stringArr = DummyData.string8;
            await this.executeFunction(option, arr, stringArr);
        } else if (n === "1000") {
            console.log("got n: 1000 / 10");
            arr = DummyData.numbers1000;
            stringArr = DummyData.string10;
            await this.executeFunction(option, arr, stringArr);
        } else if (n === "2500") {
            console.log("got n: 2500 / 11");
            arr = DummyData.numbers2500;
            stringArr = DummyData.string11;
            await this.executeFunction(option, arr, stringArr);
        }
    }
    async executeFunction(option, arr, set) {
        if (option === "1") {
            console.log("execiting");
            let result = await ComplexityFunctions.getLastElement(arr);
            console.log("O(1) - ", result);
        } else if (option === "2") {
            let result2 = await ComplexityFunctions.findIndex(arr, 1503);
            console.log("O(n) - ", result2)
        } else if (option === "3") {
            await ComplexityFunctions.buildSquareMatrix(arr);
            console.log("O(n^2)")
        }
        else if (option === "4") {
            let result4 = await ComplexityFunctions.binarySearch(arr.sort(function (a, b) { return a - b }), 1503, 0, arr.length - 1);
            console.log("O(Log(n)) - ", result4);
        }
        else if (option === "5") {
            await ComplexityFunctions.mergeSort(arr);
            console.log("O(nLog(n))")
        }
        else if (option === "6") {
            await ComplexityFunctions.powerset(set);
            console.log("O(2^n)");
        }
        else if (option === "7") {
            await ComplexityFunctions.getPermutations(set);
            console.log("O(n!)")
        }
    }

}

module.exports = FabCar;

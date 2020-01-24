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

    async createCar(ctx, carNumber, make, model, color, owner) {
        console.info('============= START : Create Car ===========');
        // console.info('findIndex start');
        // let x = await ComplexityFunctions.findIndex();
        // console.info('findIndex end: ' + x);
        // console.info('mergeSort start');
        // let j = await ComplexityFunctions.mergeSort(DummyData.numbers100);
        // console.info('mergeSort end: ' + JSON.stringify(j));
        // console.info('binary search start');
        // let k = await ComplexityFunctions.binarySearch(DummyData.numbers100.sort(function (a, b) { return a - b }), 5614);
        // console.info('binary search end: ' + JSON.stringify(k));
        // console.info('powerset start');
        // let r = await ComplexityFunctions.powerset('abcdefg');
        // console.info('powerset end: ' + JSON.stringify(r));
        console.info('getPermutations start');
        let g = await ComplexityFunctions.getPermutations('abcde');
        console.info('getPermutations end: ' + JSON.stringify(g));

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
        this.getComplexityFunctionExecuted(n, option);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

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
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

    async changeCarOwner(ctx, carNumber, newOwner) {
        console.info('============= START : changeCarOwner ===========');

        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.owner = newOwner;

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarOwner ===========');
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    getComplexityFunctionExecuted(n, option) {
        let arr;
        let stringArr;
        switch (n) {
            case "10":
                console.log("got n: 10 / 1");
                arr = DummyData.numbers10;
                stringArr = DummyData.string1;
                this.executeFunction(option, arr, stringArr);
            case "100":
                console.log("got n: 100 / 2");
                arr = DummyData.numbers100;
                stringArr = DummyData.string3;
                this.executeFunction(option, arr, stringArr);
                break;
            case "200":
                console.log("got n: 200 / 5");
                arr = DummyData.numbers200;
                stringArr = DummyData.string5;
                this.executeFunction(option, arr, stringArr);
                break;
            case "500":
                console.log("got n: 500 / 8");
                arr = DummyData.numbers500;
                stringArr = DummyData.string8;
                this.executeFunction(option, arr, stringArr);
                break;
            case "1000":
                console.log("got n: 1000 / 10");
                arr = DummyData.numbers1000;
                stringArr = DummyData.string10;
                this.executeFunction(option, arr, stringArr);
                break;
            case "2500":
                console.log("got n: 2500 / 11");
                arr = DummyData.numbers2500;
                stringArr = DummyData.string11;
                this.executeFunction(option, arr, stringArr);
                break;
            default:
                break;
        }
    }

    executeFunction(option, arr, set) {
        switch (option) {
            case "1":
                let result = ComplexityFunctions.getLastElement(arr);
                console.log("O(1) - ", result);
            case "2":
                let result2 = ComplexityFunctions.findIndex(arr, 1503);
                console.log("O(n) - ", result2)
            case "3":
                ComplexityFunctions.buildSquareMatrix(arr);
                console.log("O(n^2)")
            case "4":
                let result4 = ComplexityFunctions.binarySearch(arr, 1503);
                console.log("O(Log(n)) - ", result4);
            case "5":
                ComplexityFunctions.mergeSort(arr);
                console.log("O(nLog(n))")
            case "6":
                ComplexityFunctions.powerset(set);
                console.log("O(2^n)");
            case "7":
                ComplexityFunctions.getPermutations(set);
                console.log("O(n!)")
        }
    }

}

module.exports = FabCar;

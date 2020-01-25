/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context, Contract } from 'fabric-contract-api';
import { Car } from './car';
import { DummyData } from './dummy-data';
import { ComplexityFunctions } from './complexityFunctions';

export class FabCar extends Contract {
    public dummyData = new DummyData();
    public complexityFunctions = new ComplexityFunctions();

    public async initLedger(ctx: Context) {
        console.info('============= START : Initialize Ledger ===========');
        const cars: Car[] = [
            {
                color: 'blue',
                make: 'Toyota',
                model: 'Prius',
                owner: 'Tomoko',
            },
            {
                color: 'red',
                make: 'Ford',
                model: 'Mustang',
                owner: 'Brad',
            },
            {
                color: 'green',
                make: 'Hyundai',
                model: 'Tucson',
                owner: 'Jin Soo',
            },
            {
                color: 'yellow',
                make: 'Volkswagen',
                model: 'Passat',
                owner: 'Max',
            },
            {
                color: 'black',
                make: 'Tesla',
                model: 'S',
                owner: 'Adriana',
            },
            {
                color: 'purple',
                make: 'Peugeot',
                model: '205',
                owner: 'Michel',
            },
            {
                color: 'white',
                make: 'Chery',
                model: 'S22L',
                owner: 'Aarav',
            },
            {
                color: 'violet',
                make: 'Fiat',
                model: 'Punto',
                owner: 'Pari',
            },
            {
                color: 'indigo',
                make: 'Tata',
                model: 'Nano',
                owner: 'Valeria',
            },
            {
                color: 'brown',
                make: 'Holden',
                model: 'Barina',
                owner: 'Shotaro',
            },
        ];

        for (let i = 0; i < cars.length; i++) {
            cars[i].docType = 'car';
            await ctx.stub.putState('CAR' + i, Buffer.from(JSON.stringify(cars[i])));
            console.info('Added <--> ', cars[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    public async queryCar(ctx: Context, carNumber: string): Promise<string> {
        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        console.log(carAsBytes.toString());
        return carAsBytes.toString();
    }

    public async createCar(ctx: Context, carNumber: string, make: string, model: string, color: string, owner: string) {
        console.info('============= START : Create Car ===========');

        const car: Car = {
            color,
            docType: 'car',
            make,
            model,
            owner,
        };

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : Create Car ===========');
    }

    public async queryAllCars(ctx: Context, n: string, option: string): Promise<string> {
        const startKey = 'CAR0';
        const endKey = 'CAR999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);
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

    public async changeCarOwner(ctx: Context, carNumber: string, newOwner: string) {
        console.info('============= START : changeCarOwner ===========');

        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car: Car = JSON.parse(carAsBytes.toString());
        car.owner = newOwner;

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarOwner ===========');
    }

    public getComplexityFunctionExecuted(n, option) {
        let arr;
        let stringArr;
        switch (n) {
            case "10":
                console.log("got n: 10 / 1");
                arr = this.dummyData.numbers10;
                stringArr = this.dummyData.string1;
                this.executeFunction(option, arr, stringArr);
            case "100":
                console.log("got n: 100 / 2");
                arr = this.dummyData.numbers100;
                stringArr = this.dummyData.string3;
                this.executeFunction(option, arr, stringArr);
                break;
            case "200":
                console.log("got n: 200 / 5");
                arr = this.dummyData.numbers200;
                stringArr = this.dummyData.string5;
                this.executeFunction(option, arr, stringArr);
                break;
            case "500":
                console.log("got n: 500 / 8");
                arr = this.dummyData.numbers500;
                stringArr = this.dummyData.string8;
                this.executeFunction(option, arr, stringArr);
                break;
            case "1000":
                console.log("got n: 1000 / 10");
                arr = this.dummyData.numbers1000;
                stringArr = this.dummyData.string10;
                this.executeFunction(option, arr, stringArr);
                break;
            case "2500":
                console.log("got n: 2500 / 11");
                arr = this.dummyData.numbers2500;
                stringArr = this.dummyData.string11;
                this.executeFunction(option, arr, stringArr);
                break;
            default:
                break;
        }
    }

    public executeFunction(option, arr, set) {
        switch (option) {
            case "1":
                let result = this.complexityFunctions.getLastElement(arr);
                console.log("O(1) - ", result);
            case "2":
                let result2 = this.complexityFunctions.findIndex(arr, 1503);
                console.log("O(n) - ", result2)
            case "3":
                this.complexityFunctions.buildSquareMatrix(arr);
                console.log("O(n^2)")
            case "4":
                let result4 = this.complexityFunctions.binarySearch(arr, 1503);
                console.log("O(Log(n)) - ", result4);
            case "5":
                this.complexityFunctions.mergeSort(arr);
                console.log("O(nLog(n))")
            case "6":
                this.complexityFunctions.powerset(set);
                console.log("O(2^n)");
            case "7":
                this.complexityFunctions.getPermutations(set);
                console.log("O(n!)")
        }
    }

}

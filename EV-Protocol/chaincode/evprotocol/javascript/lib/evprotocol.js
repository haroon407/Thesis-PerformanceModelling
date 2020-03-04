'use strict';

const { Contract } = require('fabric-contract-api');
const DummyData = require('./dummy-data');
const ComplexityFunctions = require('./complexityFunctions');

class EVProtocol extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const evehicles = DummyData.electricVehicles;

        for (let i = 0; i < evehicles.length; i++) {
            evehicles[i].docType = 'E-Vehicle';
            await ctx.stub.putState('EV' + i, Buffer.from(JSON.stringify(evehicles[i])));
            console.info('Added: ', evehicles[i]);
        }
        console.info('============= END : Initialize Ledger ===========');

    }

    async queryEV(ctx, evNumber) {
        const evAsBytes = await ctx.stub.getState(evNumber);
        if (!evAsBytes || evAsBytes.length === 0) {
            throw new Error(`${evNumber} does not exist`);
        }
        console.log(evAsBytes.toString());
        return evAsBytes.toString();
    }

    // Postal code is the central area and range decides the +-factor to obtain EVs related to that area
    async queryEVWithLocation(ctx, postalCode, range, city) {
        const upperRange = postalCode + range;
        const lowerRange = postalCode - range;
        const stringQuery = `{
            "selector": {
               "postalCode": {
                  "$gte": `+ upperRange + `
               },
               "postalCode": {
                "$lte": `+ lowerRange + `
            },
            "city": {
                "$eq": `+ city + `
            }
            }
         }`
        const iterator = await ctx.stub.getQueryResult(stringQuery);
        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
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
                await iterator.close();
                return JSON.stringify(allResults);
            }
        }
    }

    // For LevelDB
    async queryEVWithLocationForLD(ctx, postalCode, range, city) {
        const upperRange = postalCode + range;
        const lowerRange = postalCode - range;
        const startKey = 'EV0';
        const endKey = 'EV9999';

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
            if (Record.postalCode >= lowerRange && Record.postalCode <= upperRange && Record.city === city) {
                result = { Key, Record };
                await iterator.close();
                return JSON.stringify(result);
            } else if (res.done) {
                await iterator.close();
                return JSON.stringify({ message: "Not found" });
            }
        }
    }

    async createEV(ctx, evNumber, manufacturer, model, color, chargingLevel, connector, owner, postalCode, city) {
        console.info('============= START : Create EV ===========');
        const EV = {
            color,
            manufacturer,
            chargingLevel,
            connector,
            postalCode,
            city,
            docType: 'E-Vehicle',
            model,
            owner
        };

        await ctx.stub.putState(evNumber, Buffer.from(JSON.stringify(EV)));
        console.info('============= END : Create EV ===========');
    }

    // for complexity functions add arguments n, option
    async queryAllEVs(ctx) {
        const startKey = 'EV0';
        const endKey = 'EV9999';

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
                await iterator.close();
                return JSON.stringify(allResults);
            }
        }
    }

    async changeEVOwner(ctx, EVNumber, newOwner) {
        console.info('============= START : changeEVOwner ===========');
        console.log('got:' + EVNumber + ' - ' + newOwner);

        const evAsBytes = await ctx.stub.getState(EVNumber);
        if (!evAsBytes || evAsBytes.length === 0) {
            throw new Error(`${EVNumber} does not exist`);
        }
        const ev = JSON.parse(evAsBytes.toString());
        ev.owner = newOwner;
        console.log('updated owner:' + ev.owner + ' - ' + ev.model);
        await ctx.stub.putState(EVNumber, Buffer.from(JSON.stringify(ev)));
        console.info('============= END : changeEVOwner ===========');
    }

    // Delete function for CouchDB
    async deleteEVCD(ctx, EVNumber) {
        console.info('============= START : deleteEVCD ===========');
        await ctx.stub.deleteState(EVNumber);
        console.info('============= END : deleteEVCD ===========');
    }

    // Delete function for LevelDB
    async deleteEVLD(ctx, EVNumber) {
        console.info('============= START : deleteEVLD ===========');
        await ctx.stub.deleteState(EVNumber);
        console.info('============= END : deleteEVLD ===========');
    }

    async getComplexityFunctionExecuted(n, option) {
        let stringArr;
        if (n === "10") {
            console.log("got n: 1");
            stringArr = DummyData.string1;
            await this.executeFunction(option, stringArr);
        } else if (n === "2") {
            console.log("got n: 2");
            stringArr = DummyData.string3;
            await this.executeFunction(option, stringArr);
        } else if (n === "5") {
            console.log("got n: 5");
            stringArr = DummyData.string5;
            await this.executeFunction(option, stringArr);
        } else if (n === "8") {
            console.log("got n: 8");
            stringArr = DummyData.string8;
            await this.executeFunction(option, stringArr);
        } else if (n === "10") {
            console.log("got n: 10");
            stringArr = DummyData.string10;
            await this.executeFunction(option, stringArr);
        } else if (n === "11") {
            console.log("got n: 11");
            stringArr = DummyData.string11;
            await this.executeFunction(option, stringArr);
        }
    }
    async executeFunction(option, set) {
        if (option === "1") {
            await ComplexityFunctions.powerset(set);
            console.log("O(2^n)");
        }
        else if (option === "2") {
            await ComplexityFunctions.getPermutations(set);
            console.log("O(n!)")
        }
    }

}

module.exports = EVProtocol;

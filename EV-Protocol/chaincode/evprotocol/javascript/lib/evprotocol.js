'use strict';

const { Contract } = require('fabric-contract-api');
const DummyData = require('./dummy-data');
const ComplexityFunctions = require('./complexityFunctions');

class EVProtocol extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const evehicles = DummyData.electricVehicles;
        const chargeProviders = DummyData.chargeProviders;

        for (let i = 0; i < evehicles.length; i++) {
            evehicles[i].docType = 'E-Vehicle';
            await ctx.stub.putState('EV' + i, Buffer.from(JSON.stringify(evehicles[i])));
            console.info('Added: ', evehicles[i]);
        }

        for (let i = 0; i < chargeProviders.length; i++) {
            chargeProviders[i].docType = 'ChargeProvider';
            await ctx.stub.putState('CP' + i, Buffer.from(JSON.stringify(chargeProviders[i])));
            console.info('Added: ', chargeProviders[i]);
        }
        console.info('============= END : Initialize Ledger ===========');

    }


    // Function for Electric Vehicles

    // Query Electric vehicle using ev-number
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
                  "$gte": `+ lowerRange + `,
                  "$lte": `+ upperRange + `
               }
               "city": {
                   "$eq": "`+ city + `"` + `
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
        const keyStart = 'EV0';
        const keyEnd = 'EV9999';

        const iterator = await ctx.stub.getStateByRange(keyStart, keyEnd);
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

    // Create EV
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
    async queryAllEVs(ctx, n, option) {
        const keyStart = 'EV0';
        const keyEnd = 'EV9999';

        const iterator = await ctx.stub.getStateByRange(keyStart, keyEnd);

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


    // ChargeProvider Functions
    async queryCP(ctx, cpNumber) {
        const cpAsBytes = await ctx.stub.getState(cpNumber);
        if (!cpAsBytes || cpAsBytes.length === 0) {
            throw new Error(`${cpNumber} does not exist`);
        }
        console.log(evAsBytes.toString());
        return evAsBytes.toString();
    }

    // Create a charge provider
    async createCP(ctx, cpNumber, name, balance) {
        console.info('============= START : Create CP ===========');
        const CP = {
            name,
            balance
        };

        await ctx.stub.putState(cpNumber, Buffer.from(JSON.stringify(CP)));
        console.info('============= END : Create CP ===========');
    }

    // Query all charge provider
    async queryAllCPs(ctx) {
        const startKey = 'CP0';
        const endKey = 'CP9999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

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

    // Change charge provider name
    async changeCPName(ctx, CPNumber, newCPName) {
        console.info('============= START : changeCPName ===========');

        const cpAsBytes = await ctx.stub.getState(CPNumber);
        if (!cpAsBytes || cpAsBytes.length === 0) {
            throw new Error(`${CPNumber} does not exist`);
        }
        const cp = JSON.parse(cpAsBytes.toString());
        cp.name = newCPName;
        console.log('updated name:' + cp.name + ' - ' + cp.balance);
        await ctx.stub.putState(CPNumber, Buffer.from(JSON.stringify(cp)));
        console.info('============= END : changeCPName ===========');
    }

    // Add charge provider balance
    async addCPBalance(ctx, CPNumber, amount) {
        console.info('============= START : changeCPName ===========');

        const cpAsBytes = await ctx.stub.getState(CPNumber);
        if (!cpAsBytes || cpAsBytes.length === 0) {
            throw new Error(`${CPNumber} does not exist`);
        }
        const cp = JSON.parse(cpAsBytes.toString());
        console.log('before: ' + cp.balance);
        cp.balance += amount;
        console.log('after: ' + cp.balance);
        console.log('updated balance:' + cp.name + ' - ' + cp.balance);
        await ctx.stub.putState(CPNumber, Buffer.from(JSON.stringify(cp)));
        console.info('============= END : changeCPName ===========');
    }

    // Reduce charge provider balance
    async subtractCPBalance(ctx, CPNumber, amount) {
        console.info('============= START : changeCPName ===========');

        const cpAsBytes = await ctx.stub.getState(CPNumber);
        if (!cpAsBytes || cpAsBytes.length === 0) {
            throw new Error(`${CPNumber} does not exist`);
        }

        if(cp.balance - amount > 0){
            console.log('before: ' + cp.balance);
            cp.balance -= amount;
            console.log('after: ' + cp.balance);
        } else {
            throw new Error(`${CPNumber} does not have enough balance`);
        }

        const cp = JSON.parse(cpAsBytes.toString());
        cp.name = newCPName;
        console.log('updated name:' + cp.name + ' - ' + cp.balance);
        await ctx.stub.putState(CPNumber, Buffer.from(JSON.stringify(cp)));
        console.info('============= END : changeCPName ===========');
    }

    // Delete function
    async deleteCP(ctx, CPNumber) {
        console.info('============= START : deleteCP ===========');
        await ctx.stub.deleteState(CPNumber);
        console.info('============= END : deleteCP ===========');
    }

    async getComplexityFunctionExecuted(n, option) {
        let stringArr;
        if (n === "1") {
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

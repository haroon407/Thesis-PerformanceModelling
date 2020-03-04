'use strict';

const { Contract } = require('fabric-contract-api');
const DummyData = require('./dummy-data');

class ChargeProvider extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const chargeProviders = DummyData.chargeProviders;

        for (let i = 0; i < chargeProviders.length; i++) {
            chargeProviders[i].docType = 'ChargeProvider';
            await ctx.stub.putState('CP' + i, Buffer.from(JSON.stringify(chargeProviders[i])));
            console.info('Added: ', chargeProviders[i]);
        }
        console.info('============= END : Initialize Ledger ===========');

    }

    async queryCP(ctx, cpNumber) {
        const cpAsBytes = await ctx.stub.getState(cpNumber);
        if (!cpAsBytes || cpAsBytes.length === 0) {
            throw new Error(`${cpNumber} does not exist`);
        }
        console.log(evAsBytes.toString());
        return evAsBytes.toString();
    }

    async createCP(ctx, cpNumber, name, credit) {
        console.info('============= START : Create CP ===========');
        const CP = {
            name,
            credit
        };

        await ctx.stub.putState(cpNumber, Buffer.from(JSON.stringify(CP)));
        console.info('============= END : Create CP ===========');
    }

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

    async changeCPName(ctx, CPNumber, newCPName) {
        console.info('============= START : changeCPName ===========');

        const cpAsBytes = await ctx.stub.getState(CPNumber);
        if (!cpAsBytes || cpAsBytes.length === 0) {
            throw new Error(`${CPNumber} does not exist`);
        }
        const cp = JSON.parse(cpAsBytes.toString());
        cp.owner = newOwner;
        console.log('updated name:' + cp.name + ' - ' + cp.credit);
        await ctx.stub.putState(CPNumber, Buffer.from(JSON.stringify(cp)));
        console.info('============= END : changeCPName ===========');
    }

    // Delete function
    async deleteCP(ctx, CPNumber) {
        console.info('============= START : deleteCP ===========');
        await ctx.stub.deleteState(CPNumber);
        console.info('============= END : deleteCP ===========');
    }

}

module.exports = ChargeProvider;

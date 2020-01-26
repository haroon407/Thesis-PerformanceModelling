/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const ComplexityFunctions = require('./complexityFunctions');

async function main() {
    try {

        // 10
        // const result = await ComplexityFunctions.getComplexityFunctionExecuted('10', '1');
        // const result2 = await ComplexityFunctions.getComplexityFunctionExecuted('10', '1');
        // const result3 = await ComplexityFunctions.getComplexityFunctionExecuted('10', '1');
        // const result4 = await ComplexityFunctions.getComplexityFunctionExecuted('10', '1');
        // const result5 = await ComplexityFunctions.getComplexityFunctionExecuted('10', '1');
        // const result6 = await ComplexityFunctions.getComplexityFunctionExecuted('10', '1');
        // const result7 = await ComplexityFunctions.getComplexityFunctionExecuted('10', '1');

        // // 100
        // const result = await ComplexityFunctions.getComplexityFunctionExecuted('100', '1');
        // const result2 = await ComplexityFunctions.getComplexityFunctionExecuted('100', '1');
        // const result3 = await ComplexityFunctions.getComplexityFunctionExecuted('100', '1');
        // const result4 = await ComplexityFunctions.getComplexityFunctionExecuted('100', '1');
        // const result5 = await ComplexityFunctions.getComplexityFunctionExecuted('100', '1');
        // const result6 = await ComplexityFunctions.getComplexityFunctionExecuted('100', '1');
        // const result7 = await ComplexityFunctions.getComplexityFunctionExecuted('100', '1');
        

        // 200
        // const result = await ComplexityFunctions.getComplexityFunctionExecuted('200', '1');
        // const result2 = await ComplexityFunctions.getComplexityFunctionExecuted('200', '1');
        // const result3 = await ComplexityFunctions.getComplexityFunctionExecuted('200', '1');
        // const result4 = await ComplexityFunctions.getComplexityFunctionExecuted('200', '1');
        // const result5 = await ComplexityFunctions.getComplexityFunctionExecuted('200', '1');
        // const result6 = await ComplexityFunctions.getComplexityFunctionExecuted('200', '1');
        // const result7 = await ComplexityFunctions.getComplexityFunctionExecuted('200', '1');

        // // 500
        // const result = await ComplexityFunctions.getComplexityFunctionExecuted('500', '1');
        // const result2 = await ComplexityFunctions.getComplexityFunctionExecuted('500', '1');
        // const result3 = await ComplexityFunctions.getComplexityFunctionExecuted('500', '1');
        // const result4 = await ComplexityFunctions.getComplexityFunctionExecuted('500', '1');
        // const result5 = await ComplexityFunctions.getComplexityFunctionExecuted('500', '1');
        // const result6 = await ComplexityFunctions.getComplexityFunctionExecuted('500', '1');
        // const result7 = await ComplexityFunctions.getComplexityFunctionExecuted('500', '1');

        // // 1000
        // const result = await ComplexityFunctions.getComplexityFunctionExecuted('1000', '1');
        // const result2 = await ComplexityFunctions.getComplexityFunctionExecuted('1000', '1');
        // const result3 = await ComplexityFunctions.getComplexityFunctionExecuted('1000', '1');
        // const result4 = await ComplexityFunctions.getComplexityFunctionExecuted('1000', '1');
        // const result5 = await ComplexityFunctions.getComplexityFunctionExecuted('1000', '1');
        // const result6 = await ComplexityFunctions.getComplexityFunctionExecuted('1000', '1');
        // const result7 = await ComplexityFunctions.getComplexityFunctionExecuted('1000', '1');

        // // 2500
        const result = await ComplexityFunctions.getComplexityFunctionExecuted('2500', '7');
        // const result2 = await ComplexityFunctions.getComplexityFunctionExecuted('2500', '1');
        // const result3 = await ComplexityFunctions.getComplexityFunctionExecuted('2500', '1');
        // const result4 = await ComplexityFunctions.getComplexityFunctionExecuted('2500', '1');
        // const result5 = await ComplexityFunctions.getComplexityFunctionExecuted('2500', '1');
        // const result6 = await ComplexityFunctions.getComplexityFunctionExecuted('2500', '1');
        // const result7 = await ComplexityFunctions.getComplexityFunctionExecuted('2500', '1');

    } catch (error) {
        console.error(`Failed to execute function: ` + error);
        process.exit(1);
    }
}

main();

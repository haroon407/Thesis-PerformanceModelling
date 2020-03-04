/*
 * Dummy Data (random generated arrays by : Array.from({length: 40}, () => Math.floor(Math.random() * 40));)
 * Algorithms: https://adrianmejia.com/most-popular-algorithms-time-complexity-every-programmer-should-know-free-online-tutorial-course/#O-n-Factorial-time
 * and
 * https://medium.com/cesars-tech-insights/big-o-notation-javascript-25c79f50b19b
 */

'use strict';

const DummyData = require('./dummy-data');

class ComplexityFunctions {

    // Function with O(2^n) complexity
    async powerset(n = '') {
        const array = Array.from(n);
        const base = [''];

        const results = array.reduce((previous, element) => {
            const previousPlusElement = previous.map(el => {
                return `${el}${element}`;
            });
            return previous.concat(previousPlusElement);
        }, base);

        return results;
    }

    // Function with O(n!) complexity
    getPermutations(string, prefix = '') {
        if (string.length <= 1) {
            return [prefix + string];
        }

        return Array.from(string).reduce((result, char, index) => {
            const reminder = string.slice(0, index) + string.slice(index + 1);
            result = result.concat(this.getPermutations(reminder, prefix + char));
            return result;
        }, []);
    }
}

module.exports = new ComplexityFunctions();

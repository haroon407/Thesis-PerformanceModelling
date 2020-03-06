/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const DummyData = require('./dummy-data');

class ComplexityFunctions {

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Function with O(1) complexity (indent=shift+opt+F)
    async getLastElement(list) {
        return list[list.length - 1];
    }

    // Function with O(n) complexity
    async findIndex(list, match) {
        // let match = Math.floor(Math.random() * 9999);
        // console.log('searching: ' + match);
        for (let i = 0, total = list.length; i < total; i++) {
            if (list[i] === match)
                return i;
        }
        return -1;
    }

    // Function with O(n^2) complexity
    async buildSquareMatrix(list) {
        let matrix = [];
        // console.log('building: ' + matrix);
        for (let i = 0, total = list.length; i < total; i++) {
            matrix[i] = [];
            for (let j = 0, total = list.length; j < total; j++)
                matrix[i].push(list[j]);
        }
        return matrix;
    }

    // Function with O(Log(n)) need to send in sorted arrays DummyData.numbers100.sort(function(a, b){return a - b})
    binarySearch(arr, x, start, end) {
        // Base Condition 
        if (start > end) {
            return false
        };

        // Find the middle index 
        let mid = Math.floor((start + end) / 2);

        // Compare mid with given key x 
        if (arr[mid] === x) {
            return true
        };

        // If element at mid is greater than x, 
        // search in the left half of mid 
        if (arr[mid] > x) {
            return this.binarySearch(arr, x, start, mid - 1);
        }
        else {
            // If element at mid is smaller than x, 
            // search in the right half of mid 
            return this.binarySearch(arr, x, mid + 1, end);
        }

    }

    // Function with O(nLog(n)) complexity
    async merge(a, b) {
        let i = 0
        let j = 0
        let temp = []
        while (i < a.length && j < b.length) {
            if (a[i] > b[j]) {
                temp.push(b[j])
                j++
            } else {
                temp.push(a[i])
                i++
            }
        }
        temp = [...temp, ...a.slice(i), ...b.slice(j)]
        return temp
    }
    async mergeSort(arr) {
        if (arr.length === 1) {
            return arr
        }
        let middle = Math.floor(arr.length / 2)
        let left = arr.slice(0, middle)
        let right = arr.slice(middle)
        // console.log("lef, right, middle", left, right, middle);
        let result = await this.merge(await this.mergeSort(left), await this.mergeSort(right))
        return result
    }

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

    // To initialize data and execute complexity functions
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

    // Execute complexity function
    async executeFunction(option, arr, set) {
        if (option === "1") {
            console.log("executing");
            let result = await this.getLastElement(arr);
            console.log("O(1) - ", result);
        } else if (option === "2") {
            let result2 = await this.findIndex(arr, 1503);
            console.log("O(n) - ", result2)
        } else if (option === "3") {
            await this.buildSquareMatrix(arr);
            console.log("O(n^2)")
        }
        else if (option === "4") {
            let result4 = await this.binarySearch(arr.sort(function (a, b) { return a - b }), 1503, 0, arr.length - 1);
            console.log("O(Log(n)) - ", result4);
        }
        else if (option === "5") {
            await this.mergeSort(arr);
            console.log("O(nLog(n))")
        }
        else if (option === "6") {
            await this.powerset(set);
            console.log("O(2^n)");
        }
        else if (option === "7") {
            await this.getPermutations(set);
            console.log("O(n!)")
        }
    }
}

module.exports = new ComplexityFunctions();

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
    async getLastElement() {
        let list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        return list[list.length - 1];
    }

    // Function with O(n) complexity
    async findIndex() {
        const list = DummyData.numbers100;
        let match = Math.floor(Math.random() * 9999);
        console.log('searching: ' + match);
        for (let i = 0, total = list.length; i < total; i++) {
            if (list[i] === match)
                return i;
        }
        return -1;
    }

    // Function with O(n^2) complexity
    async buildSquareMatrix() {
        const list = DummyData.numbers100;
        let matrix = [];
        console.log('building: ' + matrix);
        for (let i = 0, total = list.length; i < total; i++) {
            matrix[i] = [];
            for (let j = 0, total = list.length; j < total; j++)
                matrix[i].push(list[j]);
        }
        return matrix;
    }

    // Function with O(Log(n)) need to send in sorted arrays DummyData.numbers100.sort(function(a, b){return a - b})
    async binarySearch(array, element, offset = 0) {
        // split array in half
        const half = parseInt(array.length / 2);
        const current = array[half];

        if (current === element) {
            return offset + half;
        } else if (element > current) {
            const right = array.slice(half);
            return await binarySearch(right, element, offset + half);
        } else {
            const left = array.slice(0, half)
            return await binarySearch(left, element, offset);
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
        console.log("lef, right, middle", left, right, middle);
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
}

module.exports = new ComplexityFunctions();

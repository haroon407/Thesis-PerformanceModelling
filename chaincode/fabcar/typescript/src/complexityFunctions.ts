/*
 * SPDX-License-Identifier: Apache-2.0
 */

export class ComplexityFunctions {

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Function with O(1) complexity (indent=shift+opt+F)
    async getLastElement(list: Array<any>) {
        return list[list.length - 1];
    }

    // Function with O(n) complexity
    async findIndex(list: Array<any>, match: number) {
        // let match = Math.floor(Math.random() * 9999);
        // console.log('searching: ' + match);
        for (let i = 0, total = list.length; i < total; i++) {
            if (list[i] === match)
                return i;
        }
        return -1;
    }

    // Function with O(n^2) complexity
    async buildSquareMatrix(list: Array<any>) {
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
    async merge(a: Array<any>, b: Array<any>) {
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
    async mergeSort(arr: Array<any>) {
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
    async powerset(n: string = '') {
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
    getPermutations(string: string, prefix: string = '') {
        if (string.length <= 1) {
            return [prefix + string];
        }

        return Array.from(string).reduce((result: Array<any>, char: string, index: number) => {
            const reminder = string.slice(0, index) + string.slice(index + 1);
            result = result.concat(this.getPermutations(reminder, prefix + char));
            return result;
        }, []);
    }
}

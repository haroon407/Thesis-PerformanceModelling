/*
 * Complexity functions
 */

package main

/* Imports
 * 4 utility libraries for formatting, handling bytes, reading and writing JSON, and string manipulation
 * 2 specific Hyperledger Fabric specific libraries for Smart Contracts
 */
import (
	// "bytes"
	// "encoding/json"
	"fmt"
	// "strconv"
)

/*
 * Complexity O(1)
 */
func GetLastElement(a []int) int {
	return a[len(a)-1]
}

/*
 * Complexity O(n)
 * add array size in argument
 */
func FindIndex(a []int, x int) int {
	for i, n := range a {
		if x == n {
			return i
		}
	}
	return len(a)
}

/*
 * Complexity O(n^2)
 */
func BuildSquareMatrix(dim int) [][]int {
	// dim := 12
	matrix := make([][]int, dim) // dim*dim matrix
	for i := range matrix {
		matrix[i] = make([]int, dim)
		vector := make([]int, dim)
		for j := range matrix[i] {
			vector[j] = i*dim + j
			matrix[i][j] = vector[j]
		}
	}
	return matrix
}

/**
 * complexity O(Log(n))
 */
func BinarySearch(target_map []int, value int) int {

	start_index := 0
	end_index := len(target_map) - 1

	for start_index <= end_index {

		median := (start_index + end_index) / 2

		if target_map[median] < value {
			start_index = median + 1
		} else {
			end_index = median - 1
		}

	}

	if start_index == len(target_map) || target_map[start_index] != value {
		return -1
	} else {
		return start_index
	}

}

/**
 * complexity O(nLog(n))
 * Runs MergeSort algorithm on a slice single
 */
func MergeSort(slice []int) []int {

	if len(slice) < 2 {
		return slice
	}
	mid := (len(slice)) / 2
	return Merge(MergeSort(slice[:mid]), MergeSort(slice[mid:]))
}

// Merges left and right slice into newly created slice
func Merge(left, right []int) []int {

	size, i, j := len(left)+len(right), 0, 0
	slice := make([]int, size, size)

	for k := 0; k < size; k++ {
		if i > len(left)-1 && j <= len(right)-1 {
			slice[k] = right[j]
			j++
		} else if j > len(right)-1 && i <= len(left)-1 {
			slice[k] = left[i]
			i++
		} else if left[i] < right[j] {
			slice[k] = left[i]
			i++
		} else {
			slice[k] = right[j]
			j++
		}
	}
	return slice
}

/**
 * complexity O(2^n)
 */
func PowerSet(s []string) [][]string {
	if s == nil {
		return nil
	}
	r := [][]string{[]string{}}
	for _, es := range s {
		var u [][]string
		for _, er := range r {
			u = append(u, append(er, es))
		}
		r = append(r, u...)
	}
	return r
}

/**
 * complexity O(n!)
 * method required for task
 */
func join(ins []rune, c rune) (result []string) {
	for i := 0; i <= len(ins); i++ {
		result = append(result, string(ins[:i])+string(c)+string(ins[i:]))
	}
	return
}

func permutations(testStr string) []string {
	var n func(testStr []rune, p []string) []string
	n = func(testStr []rune, p []string) []string {
		if len(testStr) == 0 {
			return p
		} else {
			result := []string{}
			for _, e := range p {
				result = append(result, join([]rune(e), testStr[0])...)
			}
			return n(testStr[1:], result)
		}
	}

	output := []rune(testStr)
	return n(output[1:], []string{string(output[0])})
}

/*
 * Runs all complexity functions
 */
func TestAllFunctions() {
	var result int = GetLastElement(Numbers15)
	var result2 int = FindIndex(Numbers15, 1927)
	var result3 [][]int = BuildSquareMatrix(12)
	var result4 int = BinarySearch(Numbers15, 9130)
	var result5 []int = MergeSort(Numbers100)
	var result6 = PowerSet([]string{"one", "two", "three", "four", "five"})
	var result7 = permutations("ABCD")
	fmt.Println("O(1) - ", result)
	fmt.Println("O(n) - ", result2)
	fmt.Println("O(n^2) - ", result3)
	fmt.Println("O(Log(n)) - ", result4)
	fmt.Println("O(nLog(n)) - ", result5)
	fmt.Println("O(2^n)", result6)
	fmt.Println("O(n!)", result7)
}

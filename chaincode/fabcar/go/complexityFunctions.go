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
func GetLastElement() string {
	return AlphabetList[len(AlphabetList)-1]
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
func BuildSquareMatrix() [][]int {
	dim := 12
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
 * complexity O(Log(n))
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

/*
 * Runs all complexity functions
 */
func TestAllFunctions() {
	var result string = GetLastElement()
	var result2 int = FindIndex(Numbers15, 1927)
	var result3 [][]int = BuildSquareMatrix()
	var result4 int = BinarySearch(Numbers15, 9130)
	var result5 []int = MergeSort(Numbers100)
	fmt.Println("O(1) - ", result)
	fmt.Println("O(n) - ", result2)
	fmt.Println("O(n^2) - ", result3)
	fmt.Println("O(Log(n)) - ", result4)
	fmt.Println("O(nLog(n)) - ", result5)
}

/*
 * Complexity functions
 */

package main

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

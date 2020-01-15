
/*
 * Complexity functions
 */

package org.hyperledger.fabric.samples.fabcar;
// import java.util.Objects;

public final class ComplexityFunctions {

    private DummyData dummyData;

    public ComplexityFunctions() {
        this.dummyData = new DummyData();
    }

    /**
     * complexity O(1)
     */
    public char getLastElement() {
        char[] list = this.dummyData.getAlphabetList();
        return list[list.length - 1];
    }

    /**
     * complexity O(n)
     */
    public int findIndex() {
        int[] list = this.dummyData.getNumbers15();
        int max = 31;
        int min = 9130;
        int match = (int) ((Math.random() * ((max - min) + 1)) + min);
        System.out.println("Searching: " + match);
        for (int i = 0, total = list.length; i < total; i++) {
            if (list[i] == match) {
                return i;
            }
        }
        return -1;
    }

    /**
     * complexity O(n^2)
     */
    public int[][] buildSquareMatrix() {
        // to test
        // int[][] x = buildSquareMatrix();
        // for(int i = 0 ; i < x.length ; i++){
        // for (int j = 0 ; j < x.length ; j++){
        // System.out.println(x[i][j]);
        // }
        // }
        int[] list = this.dummyData.getNumbers15();
        int[][] matrix = new int[15][15];
        for (int i = 0, total = list.length; i < total; i++) {
            for (int j = 0, total2 = list.length; j < total2; j++)
                matrix[i][j] = list[j];
        }
        return matrix;
    };

    /**
     * complexity O(log(n))
     */
    public int binarySearch(int arr[], int x) {
        // to test (sorted)
        // int arr[] =
        // {31,695,708,802,894,1326,1616,1927,2278,3821,4290,4681,5746,7828,9130};
        // int n = arr.length;
        // int x = 4681;
        // int result = binarySearch(arr, x);
        // System.out.println("got: " + result);
        int l = 0, r = arr.length - 1;
        while (l <= r) {
            int m = l + (r - l) / 2;

            // Check if x is present at mid
            if (arr[m] == x)
                return m;

            // If x greater, ignore left half
            if (arr[m] < x)
                l = m + 1;

            // If x is smaller, ignore right half
            else
                r = m - 1;
        }
        return -1;
    }

    /**
     * complexity O(nlog(n))
     */
    public void merge(int arr[], int l, int m, int r) {
        // Find sizes of two subarrays to be merged
        int n1 = m - l + 1;
        int n2 = r - m;

        /* Create temp arrays */
        int L[] = new int[n1];
        int R[] = new int[n2];

        /* Copy data to temp arrays */
        for (int i = 0; i < n1; ++i)
            L[i] = arr[l + i];
        for (int j = 0; j < n2; ++j)
            R[j] = arr[m + 1 + j];

        /* Merge the temp arrays */

        // Initial indexes of first and second subarrays
        int i = 0, j = 0;

        // Initial index of merged subarry array
        int k = l;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
            }
            k++;
        }

        /* Copy remaining elements of L[] if any */
        while (i < n1) {
            arr[k] = L[i];
            i++;
            k++;
        }

        /* Copy remaining elements of R[] if any */
        while (j < n2) {
            arr[k] = R[j];
            j++;
            k++;
        }
    }

    // Main function that sorts arr[l..r] using merge()
    public void sort(int[] arr, int l, int r) {
        // to test
        // int[] arr = {802, 894, 4681, 2278, 695, 5746, 9130, 1326, 708, 1927, 31,
        // 4290, 1616, 7828, 3821};
        // sort(arr, 0, arr.length-1);

        // System.out.println("\nSorted array");
        // printArray(arr);

        if (l < r) {
            // Find the middle point
            int m = (l + r) / 2;

            // Sort first and second halves
            sort(arr, l, m);
            sort(arr, m + 1, r);

            // Merge the sorted halves
            merge(arr, l, m, r);
        }
    }

    /**
     * Helper function to print array
     */
    public void printArray(int arr[]) {
        int n = arr.length;
        for (int i = 0; i < n; ++i)
            System.out.print(arr[i] + " ");
        System.out.println();
    }

    /**
     * complexity O(2^n)
     */
    public void powerset(String input) {
        // For test
        // powerset("abcdef");
        for (int i = 1; i < (int) Math.pow(2, input.length()); i++) {

            String element = "";
            int arrayindex = 0;

            for (int k = input.length() - 1; k >= 0; k--) {

                String index = ((i >> k) & 1) == 1 ? "1" : "0";

                if (index == "1") {
                    element += input.charAt(arrayindex);
                }
                arrayindex++;
            }
            System.out.println(element);
        }
    }

    /**
     * complexity O(n!)
     */
    public void getPermutation(String prefix, String str) {
        // For test
        // permutation("", str);

        int n = str.length();
        if (n == 0) {
            // Printing results
            System.out.println(prefix);
        } else {
            for (int i = 0; i < n; i++) {
                getPermutation(prefix + str.charAt(i), str.substring(0, i) + str.substring(i + 1, n));
            }
        }
    }

}

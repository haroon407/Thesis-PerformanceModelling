
/*
 * Complexity functions
 */

package offchainfabcar;
// import java.util.Objects;

public final class ComplexityFunctions {

    private DummyData dummyData;

    public ComplexityFunctions() {
        this.dummyData = new DummyData();
    }

    /**
     * complexity O(1)
     */
    public int getLastElement(int[] list) {
        return list[list.length - 1];
    }

    /**
     * complexity O(n)
     */
    public int findIndex(int[] list) {
        int min = 0;
        int max = 1000;
        // int match = (int) ((Math.random() * ((max - min) + 1)) + min);
        int match = 1503;
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
    public int[][] buildSquareMatrix(int[] list) {
        int length = list.length;
        int[][] matrix = new int[length][length];
        for (int i = 0, total = list.length; i < total; i++) {
            for (int j = 0, total2 = list.length; j < total2; j++) {
                matrix[i][j] = list[j];
            }
        }
        return matrix;
    };

    /**
     * complexity O(log(n))
     */
    public int binarySearch(final int[] arr) {
        final int x = 1503;
        int l = 0;
        int r = arr.length - 1;
        while (l <= r) {
            int m = l + (r - l) / 2;

            // Check if x is present at mid
            if (arr[m] == x) {
                return m; 
            }

            // If x greater, ignore left half
            if (arr[m] < x) {
                l = m + 1; 
            }

            // If x is smaller, ignore right half
            else {
                r = m - 1; 
            }
        }
        return -1;
    }

    /**
     * complexity O(nlog(n))
     */
    public void merge(final int[] arr, final int l, final int m, final int r) {
        // Find sizes of two subarrays to be merged
        int n1 = m - l + 1;
        int n2 = r - m;

        /* Create temp arrays */
        int[] arrLeft = new int[n1];
        int[] arrRight = new int[n2];

        /* Copy data to temp arrays */
        for (int i = 0; i < n1; ++i) {
            arrLeft[i] = arr[l + i];
        }
        for (int j = 0; j < n2; ++j) {
            arrRight[j] = arr[m + 1 + j];
        }

        /* Merge the temp arrays */

        // Initial indexes of first and second subarrays
        int i = 0;
        int j = 0;

        // Initial index of merged subarry array
        int k = l;
        while (i < n1 && j < n2) {
            if (arrLeft[i] <= arrRight[j]) {
                arr[k] = arrLeft[i];
                i++;
            } else {
                arr[k] = arrRight[j];
                j++;
            }
            k++;
        }

        /* Copy remaining elements of L[] if any */
        while (i < n1) {
            arr[k] = arrLeft[i];
            i++;
            k++;
        }

        /* Copy remaining elements of R[] if any */
        while (j < n2) {
            arr[k] = arrRight[j];
            j++;
            k++;
        }
    }

    // Main function that sorts arr[l..r] using merge()
    public void sort(final int[] arr, final int l, final int r) {

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
    public void printArray(final int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n; ++i) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }

    /**
     * complexity O(2^n)
     */
    public void powerset(final String input) {
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
            // System.out.println(element);
        }
    }

    /**
     * complexity O(n!)
     */
    public void getPermutation(final String prefix, final String str) {
        // For test
        int n = str.length();
        if (n == 0) {
            // Printing results
        } else {
            for (int i = 0; i < n; i++) {
                getPermutation(prefix + str.charAt(i), str.substring(0, i) + str.substring(i + 1, n));
            }
        }
    }
    
    public void getComplexityFunctionExecuted(int n, int option) {
        int[] arr;
        String set;
        // arr = this.generateArray(n);
        System.out.println("got actual n: " + n);
        switch (n) {
        case 10:
            arr = this.dummyData.getNumbers10();
            set = this.dummyData.getString1();
            System.out.println("got n: 10");
            this.executeFunction(option, arr, set);
            break;
        case 100:
            arr = this.dummyData.getNumbers100();
            set = this.dummyData.getString3();
            System.out.println("got n: 100");
            this.executeFunction(option, arr, set);
            break;
        case 200:
            arr = this.dummyData.getNumbers200();
            set = this.dummyData.getString5();
            System.out.println("got n: 200");
            this.executeFunction(option, arr, set);
            break;
        case 500:
            arr = this.dummyData.getNumbers500();
            set = this.dummyData.getString8();
            System.out.println("got n: 500");
            this.executeFunction(option, arr, set);
            break;
        case 1000:
            arr = this.dummyData.getNumbers1000();
            set = this.dummyData.getString10();
            System.out.println("got n: 1000");
            this.executeFunction(option, arr, set);
            break;
        case 2500:
            arr = this.dummyData.getNumbers2500();
            set = this.dummyData.getString11();
            System.out.println("got n: 2500");
            this.executeFunction(option, arr, set);
            break;
        default:
            break;
        }
    }

    public void executeFunction(int option, int[] arr, String set) {
        switch (option) {
        case 1:
            this.getLastElement(arr);
            System.out.println("got option: O(1)");
            break;
        case 2:
            this.findIndex(arr);
            System.out.println("got option: O(n)");
            break;
        case 3:
            this.buildSquareMatrix(arr);
            System.out.println("got option: O(n^2)");
            break;
        case 4:
            long startTime = System.currentTimeMillis();
            this.sort(arr, 0, arr.length - 1);
            long endTime = System.currentTimeMillis();
            System.out.println("Sorting took " + (endTime - startTime) + " milliseconds");
            this.binarySearch(arr);
            System.out.println("got option: O(log(n))");
            break;
        case 5:
            this.sort(arr, 0, arr.length - 1);
            System.out.println("got option: O(nlog(n))");
            break;
        case 6:
            long startTime2 = System.currentTimeMillis();
            this.powerset(set);
            long endTime2 = System.currentTimeMillis();
            System.out.println("Powerset took " + (endTime2 - startTime2) + " milliseconds");
            System.out.println("got option: O(2^n)");
            break;
        case 7:
            this.getPermutation("", set);
            System.out.println("got option: O(n!)");
            break;
        default:
            break;
        }
    }

}

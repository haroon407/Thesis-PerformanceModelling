
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
            if (list[i] == match)
                return i;
        }
        return -1;
    }
}
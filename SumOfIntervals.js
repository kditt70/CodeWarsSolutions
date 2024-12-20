function simplifyIntervals(intervals) {
    for (let i = 0; i < intervals.length; i++) {
        let currentLowerRange = intervals[i][0];
        let currentUpperRange = intervals[i][1];

        for (let j = 0; j < intervals.length; j++) {
            if (i === j) {
                continue
            }
            let checkLowerRange = intervals[j][0];
            let checkUpperRange = intervals[j][1];

            // if checkLower is between the current lower and current upper range
            if (currentLowerRange <= checkLowerRange && checkLowerRange <= currentUpperRange) {
                // Only update if the check upper range is larger
                if (currentUpperRange < checkUpperRange) {
                    intervals[i][1] = checkUpperRange;
                    currentUpperRange = checkUpperRange;
                }
                // Get rid of check range
                intervals.splice(j, 1);

                // If it removes something behind i move i back 1
                if (i > j && i > 0) {
                    i -= 1;
                }
                j = -1;
            }

            // if checkUpper is between the current lower and current upper
            else if (currentLowerRange <= checkUpperRange && checkUpperRange <= currentUpperRange) {
                // Only update if the check lower is smaller than current lower
                if (checkLowerRange < currentLowerRange) {
                    intervals[i][0] = checkLowerRange;
                    currentLowerRange = checkLowerRange;
                }
                // Get rid of check range (j)
                intervals.splice(j, 1);

                // If it removes something behind i move i back 1
                if (i > j && i > 0) {
                    i -= 1;
                }
                j = -1;
            }

            // else if (checkLowerRange <= currentLowerRange && currentLowerRange <= checkUpperRange) {
            //     intervals[j][1] = currentUpperRange;
            //     currentLowerRange = checkLowerRange;
            //     // Get rid of current range
            //     intervals.splice(i, 1);
            //     i -= 1;
            //}
        }
    }
    return intervals;
}

function sumIntervals(intervals) {
    intervals = simplifyIntervals(intervals);
    let sum = 0;

    for (let i = 0; i < intervals.length; i++) {
        let lowerRange = intervals[i][0];
        let upperRange = intervals[i][1];
        sum += upperRange - lowerRange;
    }
    return sum;
}

function main()
{
    console.log(sumIntervals([
        [1, 4],
        [7, 10],
        [3, 5]
    ])) // Expect 7

    console.log(sumIntervals([
        [1, 2],
        [6, 10],
        [11, 15]
    ])) // Expect 9

    console.log(sumIntervals([
        [1, 5],
        [10, 20],
        [1, 6],
        [16, 19],
        [5, 11]
    ])) // Expect 19

    console.log(sumIntervals([
        [0, 20],
        [-100000000, 10],
        [30, 40]
    ])) // Expect 100000030

    console.log(sumIntervals([
        [ 1, 5 ],
        [ 1, 10 ],
        [ 1, 6 ],
        [ 5, 10 ],
        [ 9, 12 ]])) // Expect 11

    console.log(sumIntervals([
        [ 9, 13 ],
        [ -11, -2 ],
        [ 2, 6 ],
        [ 3, 13 ] // [2, 13] [-11, -2]
    ])) // Expect 29

    console.log(sumIntervals([
        [ 4, 7 ],
        [ 7, 17 ],
        [ 18, 20 ],
        [ 13, 22 ],
        [ -5, -1 ],
        [ -9, -3 ],
        [ 16, 20 ],
        [ -6, -1 ],
        [ 1, 11 ],
        [ -12, -4 ]
    ])) // Expect 32 [1,22], [-12,-1]
}

main();

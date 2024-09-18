from collections import Counter


def getDigitArray(number):
    array = []
    while number > 0:
        digit = number % 10
        array.append(digit)
        number = int(number / 10)
    array.reverse()
    return array


def allSameDigit(digitArray):
    # Returns True or false
    x = Counter(digitArray)
    return len(x) == 1


def closeSameDigit(digitArray):
    # Returns True or false
    firstDigit = digitArray[0]
    lastDigit = digitArray[-1]

    # Looks at all except the last two digits in case last digit is a zero or one
    # Example: 11109 needs to read as close to 11111
    if allSameDigit(digitArray[:-2]):
        if firstDigit < 2 and lastDigit != 0:
            return (firstDigit + 10) - lastDigit <= 2
        else:
            return firstDigit - lastDigit <= 2


def sequentiallyIncreasing(digitArray):
    for i in range(len(digitArray) - 1):
        if digitArray[i] + 1 != digitArray[i+1]:
            # Since zero follows nine and zero is the end of the chain we can return true
            if digitArray[i] == 9 and digitArray[i+1] == 0:
                return True
            else:
                return False
    return True


def closeSequentiallyIncreasing(digitArray):
    # Returns True or false
    if sequentiallyIncreasing(digitArray[:-2]):
        expectedValue = digitArray[-2] + 1
        if 0 < expectedValue - digitArray[-1] <= 2:
            return True
    return False



# -----Driver Function-----
def is_interesting(number, awesome_phrases):
    digitArray = getDigitArray(number)

    # Less than 100 miles
    if number < 100:
        return 0

    # Followed by all zeros
    if number % 100 == 0:
        return 2

    # Implement is close to all zero or big number

    # All the same number
    if allSameDigit(digitArray):
        return 2
    if closeSameDigit(digitArray):
        return 1

    # Sequentially Increasing
    if sequentiallyIncreasing(digitArray):
        return 2

    if closeSequentiallyIncreasing(digitArray):
        return 1

    return 0



def main():
    # -----Tests-----
    #Less than 100 miles
    print(is_interesting(12, []))  # expect 0
    print()

    # Followed by all zeros
    print(is_interesting(500, []))  # Expect 2
    print(is_interesting(499, []))  # Expect 1
    print(is_interesting(00000, []))  # Expect 0
    print()

    # Every digit the same & awesome phrase not breaking program
    print(is_interesting(1111, [370]))  # Expect 2
    print(is_interesting(1112, []))  # Expect 0
    print(is_interesting(1110, []))  # Expect 1
    print()

    # sequentially increasing
    print(is_interesting(12345, []))  # Expect 2
    print(is_interesting(12346, []))  # Expect 0
    print(is_interesting(12343, []))  # Expect 1
    print(is_interesting(7890, []))  # Expect 2
    print()

    # # sequentially decreasing
    # is_interesting(54321, [])  # Expect 2
    # is_interesting(54319, [])  # Expect 1
    # is_interesting(54231, [])  # Expect 0
    #
    # # palindrome
    # is_interesting(12344321, [])  # Expect 2
    # is_interesting(12331, [])  # Expect 0
    # is_interesting(12344319, [])  # Expect 1
    #
    # # awesome phrase
    # is_interesting(370, [370])  # Expect 2
    # is_interesting(368, [370])  # Expect 1
    # is_interesting(386, [])  # Expect 0

    # Testing get digitArray function
    #print(is_interesting(111109,[]))


main()

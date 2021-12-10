print('***************************************');
print('* Advent of Code - 07 - 2021 - Python *');
print('***************************************\n');

import numpy as np

submarines = np.genfromtxt('input.txt', delimiter=',', dtype='int64', autostrip=True)
submarines = np.sort(submarines)

# cache-idea stolen from fibonacci-seq https://realpython.com/fibonacci-sequence-python/
cache = {0: 0, 1: 1}
def factorial_plus(num):
    if num in cache:
        return cache[num]
    cache[num] = num + factorial_plus(num-1)
    return cache[num]

def run(accountExtraDistance):
    pointer = np.min(submarines)
    subCopy = submarines.copy()
    submarinesMeanDiff = subCopy = abs(pointer - subCopy)

    if accountExtraDistance == True:
        for idx, x in enumerate(submarinesMeanDiff):
            submarinesMeanDiff[idx] = factorial_plus(x)

    minimumSum = submarinesMeanDiff.sum()

    for pointer in range(np.min(submarines),np.max(submarines)):
        subCopy = submarines.copy()
        submarinesMeanDiff = subCopy = abs(pointer - subCopy)
        if accountExtraDistance == True:
            for idx, x in enumerate(submarinesMeanDiff):
                submarinesMeanDiff[idx] = factorial_plus(x)

        submarinesMeanDiff = submarinesMeanDiff.sum()

        if submarinesMeanDiff <= minimumSum:
            minimumSum = submarinesMeanDiff

    return minimumSum

print('part 1', run(False))
print('part 2', run(True))

print('***************************************');
print('* Advent of Code - 06 - 2021 - Python *');
print('***************************************\n');

import numpy as np

fishes = np.genfromtxt('input.txt', delimiter=',', dtype='int8', autostrip=True)

# Mark 1: Uses numpys ndArrays-each element in the array represents a fish... :doh:
def simulate(school, cutoff):
    gen = 0
    while gen < cutoff:
        gen+=1
        school -= 1
        respawn = school[school == -1].size
        school[school == -1] = 6
        if respawn > 0:
            school = np.append(school, [8] * respawn)
    return school.size

# Since Mark 1 would take forever - we simplyfy the array,
# each element represents days until respawn
def simulateMkII(school, cutoff):
    # also had to boost the type to int64 for this one
    newScoolByDaysTillRespawn = np.zeros(9, dtype='int64')
    for i in range(9):
        newScoolByDaysTillRespawn[i] = school[school == i].size
    gen = 0
    while gen < cutoff:
        gen+=1
        # Roll shifts all indexes -1, 0 becomes the last i.e 8
        newScoolByDaysTillRespawn = np.roll(newScoolByDaysTillRespawn, -1)
        # Also add every number of new hatchlings to 6 day cooldown
        newScoolByDaysTillRespawn[6] += newScoolByDaysTillRespawn[8]
    return newScoolByDaysTillRespawn.sum()

print('part 1:',simulate(fishes.copy(), 80))
# We do mark.2 here - mark.1 would not cut it for this
print('part 2:',simulateMkII(fishes.copy(), 256))

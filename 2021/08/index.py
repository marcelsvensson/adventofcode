print('***************************************');
print('* Advent of Code - 08 - 2021 - Python *');
print('***************************************\n');

f=open("input.txt", "r")
l=f.read().split('\n')

total = 0
combinedMultiDerp = 0

# This code looks like shit, so let me try to explain
# first of I'm mapping each diod in the digital clock into a list as following:

#   0000
#  5    1
#  5    1
#   6666
#  4    2
#  4    2
#   3333

# each number here represents an index, each index will hold every possible letter-combination
# as we proceed, we can deduct those until we only have one in each array at every index

for r in l:
    codedDigits = r.split(' | ')
    mapping = ['','','','','','','']
    codedInput = codedDigits[0].split(' ')
    codedOutput = codedDigits[1].split(' ')
    # This part is a super mess and could/should probably be rewritten in a smarter way
    # start with the simple numbers we can easily identify
    mapping[1] = (sorted([x for x in codedInput if len(x) == 2][0]))
    mapping[2] = mapping[1]
    mapping[0] = list(set(sorted([x for x in codedInput if len(x) == 3][0])) - set(mapping[1]))
    mapping[5] = list(set(sorted([x for x in codedInput if len(x) == 4][0])) - set(mapping[1]))
    mapping[6] = mapping[5]
    mapping[3] = list(set(sorted([x for x in codedInput if len(x) == 7][0])) - set(mapping[1] + mapping[0] + mapping[5]))
    mapping[4] = mapping[3]
    # next up, get every number with 6-diods (0, 6, 9)
    potential6sidedMappings = set(sorted([x for x in codedInput if len(x) == 6]))
    # prepare some sanity checks
    has3_4 = has1_2 = has5_6 =False
    # keep going until we solve everything
    while sum(len(row) for row in mapping) != 7:
        for potential6sidedMapping in potential6sidedMappings:
            potential6sidedMapping = set(sorted(potential6sidedMapping))
            # start by trying to solve 3 and 4 (reference in comment above) - by looking for number 9 (by combining known letters)
            do3_4 = set(mapping[1] + mapping[0] + mapping[5]).issubset(potential6sidedMapping)
            if do3_4 and has3_4 == False:
                potential3_4 = list(potential6sidedMapping - set(mapping[1] + mapping[0] + mapping[5]))
                if potential3_4[0] in mapping[3]:
                    mapping[3] = potential3_4
                    mapping[4].remove(potential3_4[0])
                    has3_4 = True
            # continue by trying to solve 1 and 2 (reference in comment above) - by looking for number 6
            do1_2 = set(mapping[0] +mapping[3] + mapping[4] + mapping[5]).issubset(potential6sidedMapping)
            if do1_2 and has3_4 == True and has1_2 == False:
                potential1_2 = list(potential6sidedMapping - set(mapping[0] + mapping[3] + mapping[4] + mapping[5]))
                if potential1_2[0] in mapping[2]:
                    mapping[2] = potential1_2
                    mapping[1].remove(potential1_2[0])
                    has1_2 = True
            # finish of by solving 5 and 6 - by looking for 0
            do5_6 = set(mapping[0] +mapping[1] + mapping[2] + mapping[3] + mapping[4]).issubset(potential6sidedMapping)
            if do5_6 and has3_4 == True and has1_2 == True  and has5_6 == False:
                potential5_6 = list(potential6sidedMapping - set(mapping[0] + mapping[1] + mapping[2] + mapping[3] + mapping[4]))
                if potential5_6[0] in mapping[5]:
                    mapping[5] = potential5_6
                    mapping[6].remove(potential5_6[0])
                    has5_6 = True
            # once we solve a pair then those are flagged to not repeat

    # This is also dumb, but this is the full diod-number, each index holds every letter associated with its position
    translatedNumbers = [
        set(mapping[0] + mapping[1] + mapping[2] + mapping[3] + mapping[4] + mapping[5]),
        set(mapping[1] + mapping[2]),
        set(mapping[0] + mapping[1] + mapping[6] + mapping[4] + mapping[3]),
        set(mapping[0] + mapping[1] + mapping[2] + mapping[3] + mapping[6]),
        set(mapping[1] + mapping[2] + mapping[5] + mapping[6]),
        set(mapping[0] + mapping[5] + mapping[6] + mapping[2] + mapping[3]),
        set(mapping[0] + mapping[5] + mapping[6] + mapping[2] + mapping[3] + mapping[4]),
        set(mapping[0] + mapping[1] + mapping[2]),
        set(mapping[0] + mapping[1] + mapping[2] + mapping[3] + mapping[4] + mapping[5] + mapping[6]),
        set(mapping[0] + mapping[1] + mapping[2] + mapping[3] + mapping[5] + mapping[6]),
    ]
    derpString = ''
    for cOp in codedOutput:
        # this line alone is part 1
        if len(cOp) in [2,3,4,7]:
            total += 1
        # go through the four output strings and match to translatedNumbers
        for index, translatedNbr in enumerate(translatedNumbers):
            cOpASlist = set(sorted(cOp))
            if sorted(cOpASlist) == sorted(translatedNbr):
                derpString += str(index)
                break
    combinedMultiDerp += int(derpString)

print('part 1', total)
print('part 2', combinedMultiDerp)
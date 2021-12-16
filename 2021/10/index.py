print('***************************************');
print('* Advent of Code - 10 - 2021 - Python *');
print('***************************************\n');

f=open("input.txt", "r")
l=f.read().split('\n')

containers = { '(': ')', '[': ']', '{': '}', '<': '>' }
expectedClosingQueue = []

pointTable = { ')': 3, ']': 57, '}': 1197, '>': 25137 }
points = 0

pointAutocompleteTable = { ')': 1, ']': 2, '}': 3, '>': 4 }
pointAutocomplete = 0
pointsAutocompleteList = []

for r in l:
    expectedClosingQueue = []
    pointAutocomplete = 0
    corrupted = False
    for c in r:
        if c in containers:
            expectedClosingQueue.append(containers[c])
        else:
            if len(expectedClosingQueue) and expectedClosingQueue[-1] == c:
                expectedClosingQueue.pop()
            elif len(expectedClosingQueue):
                # print(r, '- Expected ' + expectedClosingQueue[-1] + ', but found ' + c + ' insted.')
                points += pointTable[c]
                corrupted = True
                break
    if corrupted == False:
        expectedClosingQueue.reverse()
        for remaining in expectedClosingQueue:
            pointAutocomplete *= 5
            pointAutocomplete += pointAutocompleteTable[remaining]
        pointsAutocompleteList.append(pointAutocomplete)
pointsAutocompleteList.sort()

print('part 1', points)
print('part 2', pointsAutocompleteList[int((len(pointsAutocompleteList)-1)/2)])
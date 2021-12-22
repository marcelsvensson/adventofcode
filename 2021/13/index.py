print('***************************************');
print('* Advent of Code - 13 - 2021 - Python *');
print('***************************************\n');

import numpy as np

f=open("input.txt", "r")
l=f.read().split('\n')

maxX = maxY = 0
coords = []
readFoldInstructions = False
foldInstructions = []

for r in l:
    if r == '':
        readFoldInstructions = True
    elif readFoldInstructions:
        foldSentence = r.split(' ')
        axel, num = foldSentence.pop().split('=')
        num = int(num)
        # First assumption on the size of the board was wrong (used largest occurance of x/y)
        # That caused the folds to be uneven - which led me to believe two possible solutions:
        #  1. You could over- or underfold thous needing to reshape
        #  2. Odd folds would consume a row/col, even just fold between
        # Luckily neither of those solutions was explored and instead basing the size of the board
        # on the actual fold-instructions
        if axel == 'x' and maxX == 0:
            maxX = num * 2 + 1
        if axel == 'y' and maxY == 0:
            maxY = num * 2 + 1
        foldInstructions.append([axel, num])
    else:
        x,y = list(map(int, r.split(',')))
        coords.append([x, y])

board = np.ones((maxY, maxX), dtype='int8')

for coord in coords:
    x, y = coord
    board[y, x] = 0

partOneIsDone = False

for instructions in foldInstructions:
    axel, num = instructions
    oY, oX = board.shape
    if axel == 'y':
        foldBoard = np.flipud(board[num+1:])
        board = board[:num]
        board *= foldBoard
    elif axel == 'x':
        foldBoard = np.fliplr(board[:,num+1:])
        board = board[:,:num]
        board *= foldBoard
    if partOneIsDone == False:
        print('part 1', len(board[board == 0]))
        partOneIsDone = True

print('part 2\n')
for row in board:
    a_str = ''.join(str(x) for x in row)
    print(a_str.replace('0', '#').replace('1', ' '))
print('\n')

# LRFJBJEH

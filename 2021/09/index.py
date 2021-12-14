print('***************************************');
print('* Advent of Code - 09 - 2021 - Python *');
print('***************************************\n');

import numpy as np
from io import StringIO

# Had to do some extra stuff I couldn't get genfromtxt to split after each char
f=open("input.txt", "r")
l=f.read().split('\n')

derp = ''

for r in l:
    derp += ' '.join(list(r)) + '\n'

board = np.genfromtxt(StringIO(derp), delimiter=' ', dtype='int8', autostrip=True)

# get the size
rows, cols = board.shape

# prepare and extra row and an extra col, later on - we'll need some extra digits to diff against
tenRow = np.ones((1,cols), dtype='int8')
tenRow *= 10

tenCol = np.ones((rows,1), dtype='int8')
tenCol *= 10

# apply extra row and col
boardExtraRow = np.concatenate((board, tenRow), axis=0)
boardExtraCol = np.concatenate((board, tenCol), axis=1)

# get positive diffs on x (lr) and y (td)
diffAxis0 = np.diff(boardExtraRow, axis=0) >= 1
diffAxis1 = np.diff(boardExtraCol, axis=1) >= 1

# now flip the board in both x and y
boardFlipped = np.flipud(np.fliplr(board))

# reapply extra row and col
boardFlippedExtraRow = np.concatenate((boardFlipped, tenRow), axis=0)
boardFlippedExtraCol = np.concatenate((boardFlipped, tenCol), axis=1)

# get the diff
diffAxis0Flipped = np.diff(boardFlippedExtraRow, axis=0) >= 1
diffAxis1Flipped = np.diff(boardFlippedExtraCol, axis=1) >= 1

# flip back the result
diffAxis0Flipped = np.flipud(np.fliplr(diffAxis0Flipped))
diffAxis1Flipped = np.flipud(np.fliplr(diffAxis1Flipped))

# we can now stack each mask, since they're booleans we should only get the values where each mask is True
mask = diffAxis0 & diffAxis1 & diffAxis0Flipped & diffAxis1Flipped
maskedBoard = board[mask]
# apply extra point
maskedBoard += 1
# profit
print('part 1', maskedBoard.sum())


print('***************************************');
print('* Advent of Code - 09 - 2021 - Python *');
print('***************************************\n');

import numpy as np
from io import StringIO

# Had to do some extra stuff I couldn't get genfromtxt to split after each char
f=open("input.txt", "r")
l=f.read().split('\n')

inputTxt = ''

for r in l:
    inputTxt += ' '.join(list(r)) + '\n'

board = np.genfromtxt(StringIO(inputTxt), delimiter=' ', dtype='int8', autostrip=True)

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

# Get all the coords from the solution in part 1
divotCoords = np.argwhere(mask == True)

# Make a copy of the board and set every 9 (highest points to -1)
boardMkII = board.copy()
boardMkII[boardMkII == 9] = -1

# Helper function to check if coord is not already checked or already in queue
def shouldCheckForFuture(x, y, checkedCoord, controlQueue):
    return boardMkII[x, y] != -1 and (str(x)+':'+str(y)) not in checkedCoord and (str(x)+':'+str(y)) not in controlQueue

# This function adds surrounding coords (cross-shape) for > -1 (inside the bounds of the board) already not in control-queue or checked-list into control-queue for future checking
def countCluster(x, y, checkedCoord, controlQueue):
    xM=x-1
    xP=x+1
    yM=y-1
    yP=y+1
    if xM >= 0 and shouldCheckForFuture(xM, y, checkedCoord, controlQueue):
        controlQueue.append((str(xM)+':'+str(y)))
    if xP < rows and shouldCheckForFuture(xP, y, checkedCoord, controlQueue):
        controlQueue.append((str(xP)+':'+str(y)))
    if yM >= 0 and shouldCheckForFuture(x, yM, checkedCoord, controlQueue):
        controlQueue.append((str(x)+':'+str(yM)))
    if yP < cols and shouldCheckForFuture(x, yP, checkedCoord, controlQueue):
        controlQueue.append((str(x)+':'+str(yP)))
    return controlQueue

# Placeholder for points in each cluster
clusterPoints = []

# Go through every coord from part 1
for x, y in divotCoords:
    point = 0
    checkedCoord = []
    # add initial coord to control-queue
    controlQueue = [str(x)+':'+str(y)]
    # keep going while there's stuff in the control-queue
    while len(controlQueue):
        # Pop the last coord and map int into separate int values
        coords = controlQueue.pop()
        x, y = list(map(int, coords.split(':')))
        # send those coords to the function to queue up future control
        controlQueue = countCluster(x, y, checkedCoord, controlQueue)
        # add point
        point += 1
        # mark coord as checked
        checkedCoord.append(str(x)+':'+str(y))
    # add all the points from the initial point into the placeholder
    clusterPoints.append(point)

# sort the array, highest values at the end after this
clusterPoints.sort()

# Sum the value of a tripple pop - profit?
print('part 2', clusterPoints.pop() * clusterPoints.pop() * clusterPoints.pop())
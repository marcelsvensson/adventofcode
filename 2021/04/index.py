
print('***************************************');
print('* Advent of Code - 04 - 2021 - Python *');
print('***************************************\n');

import numpy as np

# My first attempt att numpy... took a bit too long to wrap my head around

f=open("input.txt", "r")
l=f.read().split('\n')

steps = l[0].split(',')

# Generate 2d-array from text
boards = np.genfromtxt('input.txt', dtype='int8', autostrip=True, skip_header=1)
# Calculate number of boards (this will be our third dimension)
axis1, axis2 = boards.shape
axis3D = int(axis1 / axis2)
# Reshape into 3d-array
boards = boards.reshape(axis3D,5,5)

winner = False
matchingMatrix = False
numStep = []
# Keep going while there are boards in play
while boards.size > 0:
    step = int(steps.pop(0))
    numStep.append(step)
    # Keep adding steps into a list, we then generate a bool-mask when we match values on each board 
    isinVar = np.isin(boards, numStep)
    # We then check this mask in both x- and y-axis to find complete rows
    matchingMatrisAxis2 = np.any(np.all(isinVar, axis=2), axis=1)
    matchingMatrisAxis1 = np.any(np.all(isinVar, axis=1), axis=1)
    # Set the propper Axis
    if True in matchingMatrisAxis2:
        matchingMatrix = matchingMatrisAxis2
    elif True in matchingMatrisAxis1:
        matchingMatrix = matchingMatrisAxis1

    if type(matchingMatrix) != bool:
        if winner == False:
            # Use the mask to get the winning board and flatten to 1d
            winningBoard = boards[matchingMatrix,:].flatten()
            # (overkill) - reapply the mask but invert, then get the sum and multiply with the last step
            print('Winner (part 1):', np.sum(winningBoard[np.isin(winningBoard, numStep, invert=True)]) * step)
            # We have a winner
            winner = True
        elif boards.size == 25:
            loosingBoard = boards[matchingMatrix,:].flatten()
            # We have a looser
            print('Last place (part 2):', np.sum(loosingBoard[np.isin(loosingBoard, numStep, invert=True)]) * step)
        # Keep the boards that was not affected by the mask
        boards = boards[~matchingMatrix,:]
        # Reset matchingMatrix
        matchingMatrix = False

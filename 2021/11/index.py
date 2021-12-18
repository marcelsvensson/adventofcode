print('***************************************');
print('* Advent of Code - 11 - 2021 - Python *');
print('***************************************\n');

import numpy as np
from io import StringIO

f=open("input.txt", "r")
l=f.read().split('\n')

inputTxt = ''

for r in l:
    inputTxt += ' '.join(list(r)) + '\n'

octopi = np.genfromtxt(StringIO(inputTxt), delimiter=' ', dtype='int8', autostrip=True)

rows, cols = octopi.shape
flashCooldown = futureFlashQueue = []

# Helper function to check if coord is not already checked or already in queue
def shouldCheckForFuture(x, y):
    perhapsOctopus = str(x)+':'+str(y)
    if perhapsOctopus not in flashCooldown and perhapsOctopus not in futureFlashQueue:
        octopi[x, y] += 1
        if octopi[x, y] >= 10:
            futureFlashQueue.append(perhapsOctopus)

# This function adds surrounding coords (cross-shape) for > -1 (inside the bounds of the board) already not in control-queue or checked-list into control-queue for future checking
def flash(octopus):
    x, y = list(map(int, octopus.split(':')))
    xM=x-1
    xP=x+1
    yM=y-1
    yP=y+1
    if xM >= 0:
        if yM >= 0:
            shouldCheckForFuture(xM, yM)
        if yP < cols:
            shouldCheckForFuture(xM, yP)
        shouldCheckForFuture(xM, y)

    if xP < rows:
        if yM >= 0:
            shouldCheckForFuture(xP, yM)
        if yP < cols:
            shouldCheckForFuture(xP, yP)
        shouldCheckForFuture(xP, y)
        
    if yM >= 0:
            shouldCheckForFuture(x, yM)
    if yP < cols:
        shouldCheckForFuture(x, yP)

flashes = 0
i = 0
while octopi.sum() > 0:
    octopi += 1
    flashCooldown = []
    futureFlashQueue = []
    for octopus in np.argwhere(octopi == 10):
        x, y = octopus
        futureFlashQueue.append(str(x)+':'+str(y))
    while len(futureFlashQueue):
        # Get an octopus from the flashQueue and make it flash
        octopus = futureFlashQueue.pop()
        flash(octopus)
        flashes += 1
        # set octopus as on flash-cooldown
        x, y = list(map(int, octopus.split(':')))
        flashCooldown.append(octopus)
        octopi[x, y] = 0
    i+=1
    if i == 100:
        print('part 1', flashes)

print('part 2', i)
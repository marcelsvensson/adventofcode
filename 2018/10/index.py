print('***************************************');
print('* Advent of Code - 10 - 2018 - Python *');
print('***************************************\n');

import re

f=open("input.txt", "r")
l=f.read().split('\n')

coordVelocity = []

for row in l:  
    coordVelocity.append(list(map(int, re.findall("-?\d+", row))))

cdmmX = 0
cdmmY = 0

dmmX = 0
dmmY = 0

i = 1
"""
this is sketchy and assumption may be incorrect
but we itterate aslong as deltas for x/y is at its smallest.
Once we see that the delta for X is larger than the previous
itteration we stop and that should give us the bounds and the
total number needed to reach alignment
"""
while cdmmX == 0 or cdmmX >= dmmX:
    cdmmX = dmmX
    cdmmY = dmmY
    maxX = 0
    minX = 1000
    maxY = 0
    minY = 1000
    for cv in coordVelocity:
        [x, y, vx, vy] = cv
        dx = x + (vx * i)
        dy = y + (vy * i)
        # Figure out min/max values for current itteration
        if minX > dx:
            minX = dx
        if maxX < dx:
            maxX = dx
        if minY > dy:
            minY = dy
        if maxY < dy:
            maxY = dy
    # Figure out x/y delta for this itteration
    dmmX = maxX-minX
    dmmY = maxY-minY
    i += 1

di = i-2

dxa = []
dya = []

for cv in coordVelocity:
    [x, y, vx, vy] = cv
    dx = x + (vx * di)
    dy = y + (vy * di)
    dxa.append(dx)
    dya.append(dy)

# we also figure out the offset to rebound starting position to 0,0
maxdx = max(dxa)
mindx = min(dxa)
maxdy = max(dya)
mindy = min(dya)

offsetX = mindx
offsetY = mindy

p = []

# create the base canvas
for x in range(0,(maxdx-offsetX) + 1):
    p.append([])
    for y in range(0,(maxdy-offsetY) + 1):
        p[x].append(".")

# fill in the positions
for i, val in enumerate(dxa):
    x = val - offsetX
    y = dya[i] - offsetY
    p[x][y] = "#"

# paint the canvas (A)
for y in range(0,(maxdy-offsetY) + 1):
    for x in range(0,(maxdx-offsetX) + 1):
        print(p[x][y], end="")
    print("")

# total number of itterations needed (B)
print("\n\n" + str(di))
print('***************************************');
print('* Advent of Code - 06 - 2018 - Python *');
print('***************************************\n');

maxTotal = 10000
f=open("input.txt", "r")
l=f.read().split('\n')

mxX = 0
mnX = 0
offsetX = 1000
mxY = 0
mnY = 0
offsetY = 1000

coords = []
grid = []
unlimited = set()
count = {}
region = 0

for r in l:
    [x, y] = map(int, r.split(', '))
    mxX = x if x > mxX else mxX
    offsetX = x if x < offsetX else offsetX
    mxY = y if y > mxY else mxY
    offsetY = y if y < offsetY else offsetY
    coords.append([x,y])

# print(mnX, mnY, mxX, mxY)

# fix offset so min val for x and y always is 0,0
mxX = mxX - offsetX + 1
mxY = mxY - offsetY + 1

# print(mnX, mnY, mxX, mxY)

# prepopulate the grid
for x in range(mnX, mxX):
    grid.append([])
    for y in range(mnY, mxY):
        # o =  owner, d = distance, t = total
        grid[x].append({ 'o': '.', 'd': mxX + mxY, 't': 0 })

# using debug on row 50 to recreate visualt debug for example only
# debug = { '0_0': 'a', '0_5': 'b', '7_2': 'c', '2_3': 'd', '4_4': 'e', '7_8': 'f' }

for [cX,cY] in coords:
    for y in range(mnY, mxY):
        for x in range(mnX, mxX):
            d = abs(x - (cX - offsetX)) + abs(y - (cY - offsetY))
            if d < grid[x][y]['d']:
                grid[x][y]['d'] = d
                grid[x][y]['o'] = str(cX - offsetX) + '_' + str(cY - offsetY) # debug[str(cX - offsetX) + '_' + str(cY - offsetY)]
            elif d == grid[x][y]['d']:
                grid[x][y]['o'] = '.'
            grid[x][y]['t'] += d

# all prints below are for debug purpose and should only be used for the example
"""
print()
for y in range(mnY, mxY):
    for x in range(mnX, mxX):
        print(grid[x][y]['o'], end='')
    print()
print()

top = ''
bottom = ''
left = ''
right = ''
"""

# go around the borders of the grid to decide which areas are unlimited
for x in range(mnX, mxX):
    unlimited.add(grid[x][mnY]['o'])
    unlimited.add(grid[x][mxY-1]['o'])
    # top += grid[x][mnY]['o']
    # bottom += grid[x][mxY -1]['o']
        
# print(top)
for y in range(mnY + 1, mxY - 1):
    unlimited.add(grid[mnX][y]['o'])
    unlimited.add(grid[mxX - 1][y]['o'])
    # print(grid[mnX][y]['o'] + '      ' + grid[mxX - 1][y]['o'])
    
# print(bottom)

# print(unlimited)

for x in range(mnX, mxX):
    for y in range(mnY, mxY):
        o = grid[x][y]['o']
        if (grid[x][y]['o'] not in unlimited):
            if o in count:
                count[o] += 1
            else:
                count[o] = 1
        if grid[x][y]['t'] < maxTotal:
            region += 1

print(max(count.values()))
print(region)
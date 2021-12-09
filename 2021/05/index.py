
print('***************************************');
print('* Advent of Code - 05 - 2021 - Python *');
print('***************************************\n');

import numpy as np

f=open("input.txt", "r")
l=f.read().split('\n')

def board(includeDiagonal):
    min = max = 0
    points = []

    for r in l:
        start, stop = r.split(' -> ')
        start = list(map(int, start.split(',')))
        stop = list(map(int, stop.split(',')))
        if start[0] > min:
            min = start[0]
        if stop[0] > min:
            min = stop[0]
        if start[1] > max:
            max = start[1]
        if stop[1] > max:
            max = stop[1]
        points.append([start, stop])

    board = np.zeros((min+1, max+1), dtype='int8')

    for coords in points:
        if coords[0][0] == coords[1][0]:
            if coords[0][1] < coords[1][1]:
                board[coords[0][1]:coords[1][1]+1,coords[0][0]] += 1
            else:
                board[coords[1][1]:coords[0][1]+1,coords[0][0]] += 1
        elif coords[0][1] == coords[1][1]:
            if coords[0][0] < coords[1][0]:
                board[coords[0][1],coords[0][0]:coords[1][0]+1] += 1
            else:
                board[coords[0][1],coords[1][0]:coords[0][0]+1] += 1
        elif includeDiagonal:
            min0 = coords[0][1]
            max0 = coords[1][1]
            min1 = coords[0][0]
            max1 = coords[1][0]

            diagonal0 = []
            diagonal1 = []
            if min0 < max0:
                while min0 <= max0:
                    diagonal0.append(min0)
                    min0+=1
            else:
                while min0 >= max0:
                    diagonal0.append(min0)
                    min0-=1

            if min1 < max1:
                while min1 <= max1:
                    diagonal1.append(min1)
                    min1+=1
            else:
                while min1 >= max1:
                    diagonal1.append(min1)
                    min1-=1

            board[diagonal0,diagonal1]+=1

    return len(board[board > 1])

print('part 1:', board(False))
print('part 2:', board(True))

print('***************************************');
print('* Advent of Code - 02 - 2021 - Python *');
print('***************************************\n');

f=open("input.txt", "r")
l=f.read().split('\n')

#hp = horizonal position
#d1 = depth, assignment 1
#d2 = depth, assignment 2
#a = angle
hp = d1 = d2 = a = 0

for r in l:
    dir, v = r.split(' ')
    v = int(v)
    if dir == 'forward': hp+=v; d2+=a*v
    elif dir == 'up': d1-=v; a-=v
    elif dir == 'down': d1+=v; a+=v

print('part 1:', hp*d1)
print('part 2:', hp*d2)
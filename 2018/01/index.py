
print('***************************************');
print('* Advent of Code - 01 - 2018 - Python *');
print('***************************************\n');

f = open("input.txt", "r")
l = list(map(int, f.read().split('\n')))

s = set(); i = 0; t = 0

while i == len(s):
    for n in l:
        t += n;s.add(t);i += 1
        if i > len(s): print(t); break
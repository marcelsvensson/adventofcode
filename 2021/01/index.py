
print('***************************************');
print('* Advent of Code - 01 - 2021 - Python *');
print('***************************************\n');

f = open("input.txt", "r")
l = list(map(int, f.read().split('\n')))

s = set(); p = l[0]; i = 0; ps = sum(l[0:3]);

for n in l:
    if n>p:
        i += 1
    p = n

print(i)

i = 0; i2 = 0
while i + 3 <= len(l):
    cs = sum(l[i:i+3])
    if cs > ps:
        i2 += 1
    ps = cs
    i+=1


print(i2)
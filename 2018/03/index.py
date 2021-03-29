
print('***************************************');
print('* Advent of Code - 03 - 2018 - Python *');
print('***************************************\n');

f=open("input.txt", "r")
l=f.read().split('\n')

fabric = {}
overlaping = 0
claims = set()
overlapingClaims = set()

for r in l:
    num = int(r[1:r.find('@')-1])
    claims.add(num)
    x, y = [int(i) for i in r[r.find('@')+2:r.find(':')].split(',')]
    w, h = [int(i) for i in r[r.find(':')+2:].split('x')]

    for dx in range(w):
        for dy in range(h):
            try:
                fabric[str(x+dx)+':'+str(y+dy)][0] += 1
                fabric[str(x+dx)+':'+str(y+dy)][1].append(num)
            except KeyError:
                fabric[str(x+dx)+':'+str(y+dy)] = [1, [num]]

for (k, v) in fabric.items():
    if (v[0] > 1):
        overlaping += 1
        overlapingClaims.update(v[1])

print(overlaping)

claims.difference_update(overlapingClaims)
print(len(claims), claims)

for godpatch in claims:
  print(godpatch)
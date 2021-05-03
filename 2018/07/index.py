print('***************************************');
print('* Advent of Code - 07 - 2018 - Python *');
print('***************************************\n');

f=open("input.txt", "r")
l=f.read().split('\n')

# global queue
gq = {}

# ready global
rg = []

# individual queue
iq = {}

# ordered string
os = ''

p = []

for r in l:
    x = consider = r[5]
    if x not in p:
        p.append(x) 

for r in l:
    consider = r[5]
    before = r[-12]
    if consider not in gq:
        gq[consider] = []
    gq[consider].append(before)
    if before not in iq:
        iq[before] = []
    iq[before].append(consider)
    if before in p:
        p.remove(before)

p.sort()
current = p.pop(0)
iq[current] = []
for x in p:
    iq[x] = []
    rg.append(x)

while len(gq):
    os += current
    if current not in gq: break
    tmp = gq.pop(current)
    for x in tmp:
        if x not in rg:
            rg.append(x)
    rg.sort()
    newcurrent = False
    clear = []
    clearRG = False

    for i, n in enumerate(rg):
        if n in iq and current in iq[n]:
            clear.append([n, current])
        if ((current in iq[n] and len(iq[n]) <= 1) or len(iq[n]) == 0) and newcurrent == False:
            newcurrent = rg[i]
            clearRG = i

    if len(clear):
        for x in clear:
            if x[1] in iq[x[0]]:
                iq[x[0]].remove(x[1])

    if type(clearRG) != bool:
        rg.pop(clearRG)

    current = newcurrent

os += current

print(os)


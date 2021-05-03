print('***************************************');
print('* Advent of Code - 08 - 2018 - Python *');
print('***************************************\n');

f=open("input.txt", "r")
l=f.read().split('\n')

ilist = tuple(int(i) for i in l[0].split(" "))
s = 0

def x(i):
    global s
    # node-sum
    ns = []
    # child-nodes
    c = ilist[i]
    i += 1
    # modifiers
    m = ilist[i]
    i += 1

    for y in range(0, c):
        [i, cs] = x(i)
        # prepare node-sum with indexed child-sums
        ns.append(cs)

    # local valus
    lv = ilist[i:i+m]
    # local sum
    ls = sum(lv)
    s += ls
    i += m

    # if there are child-nodes reset the local sum since its now index-based
    if (c != 0):
        ls = 0
        # itterate throuh the local values and add up where index exists
        for z in lv:
            if ((z-1) >= 0 and (z-1) < len(ns)):
                ls += ns[z-1]

    return [i, ls]

[i, gs] = x(0)

print(s)
print(gs)

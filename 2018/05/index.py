
print('***************************************');
print('* Advent of Code - 05 - 2018 - Python *');
print('***************************************\n');

f=open("input.txt", "r")
l=f.read().split('\n')

minPolymer = 1000000000
polymerFilters = set()
polymerFilterNumbers = {}

def polymers(createFilter, useFilter):
    for r in l:
        crnt = 0
        if useFilter != False:
            r = r.replace(useFilter, '')
            r = r.replace(useFilter.swapcase(), '')
        while crnt < len(r) - 1:
            c = r[crnt]
            csc = c.swapcase()
            if createFilter == True:
                polymerFilters.add(c.upper())
            if csc == r[crnt + 1]:
                r = r[:crnt] + r[crnt+2:]
                if crnt > 0:
                    crnt -= 1
            else:
                crnt += 1
        return len(r)

# part 1
print(polymers(True, False))

# part 2
for c in polymerFilters:
    filterdPolymer = polymers(False, c)
    minPolymer = minPolymer if minPolymer <= filterdPolymer else filterdPolymer

print(minPolymer)
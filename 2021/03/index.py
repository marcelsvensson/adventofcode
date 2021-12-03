
print('***************************************');
print('* Advent of Code - 03 - 2021 - Python *');
print('***************************************\n');

f=open("input.txt", "r")
l=f.read().split('\n')


sumOne = []
for _x in l[0]:
    sumOne.append(0)

epsilon = ''
gamma = ''

for r in l:
    for idx, c in enumerate(list(r)):
        c = int(c)
        sumOne[idx] += c

for c in sumOne:
    if c > len(l)/2:
        epsilon += '1'
        gamma += '0'
    else:
        epsilon += '0'
        gamma += '1'
    
print('epsilon', epsilon, int(epsilon, 2))
print('gamma', gamma, int(gamma, 2), '\n')

print('Power consumption (part 1)', int(epsilon, 2)*int(gamma, 2), '\n\n')

def oxygenCO2Scrubber(type, list):
    idx = 0
    while len(list) > 1:
        delta = 0
        keep = '0'
        tmpList = []
        for r in list:
            delta += int(r[idx])
        if delta >= len(list)/2:
            keep = '1'
        for r in list:
            if (type == 'oxygen' and r[idx] == keep) or (type == 'co2' and r[idx] != keep):
                tmpList.append(r)
        list = tmpList
        idx+=1
    return list[0]

oxygen = oxygenCO2Scrubber('oxygen', l)
co2 = oxygenCO2Scrubber('co2', l)

print('oxygen', oxygen, int(oxygen, 2))
print('co2', co2, int(co2, 2), '\n')

print('Life support rating (part 2)', int(oxygen, 2)*int(co2, 2))

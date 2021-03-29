
print('***************************************');
print('* Advent of Code - 02 - 2018 - Python *');
print('***************************************\n');

f=open("input.txt", "r")
l=f.read().split('\n')
tt=[0,0]

# f = file, l = lines, tt = two/three, r = row, 
# i = index, rc = row.count, m = modifier
# p = pointer, s = set
for r in l:
    p=[0,0]
    add = lambda i,rc,m:True if p[i]==0 and rc==m else False
    for s in set(r):
        if add(0,r.count(s),2):tt[0]+=1;p[0]=1
        elif add(1,r.count(s),3):tt[1]+=1;p[1]=1
print(tt[0]*tt[1])

uncommon = 'nah'

# r = row, l = lines, r2 = secondRow, ci = characterIndex
for index,r in enumerate(l[0:-1]):
    for r2 in l[index+1:]:
        for ci in range(len(r)):
            if r[ci]!=r2[ci]:
                uncommon = ci if uncommon=='nah' else 'nah'
                if uncommon == 'nah': break
        if uncommon!='nah':
            print(r[0:uncommon:]+r[uncommon+1::])
            break
    else:
        continue
    break
    
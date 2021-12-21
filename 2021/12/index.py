print('***************************************');
print('* Advent of Code - 12 - 2021 - Python *');
print('***************************************\n');

import copy

f=open("input.txt", "r")
l=f.read().split('\n')

routeMapper = dict()

for r in l:
    x, y = r.split('-')
    if x == 'start':
        if x in routeMapper.keys():
            routeMapper[x].append(y)
        else:
            routeMapper[x] = [y]
    elif y == 'start':
        if y in routeMapper.keys():
            routeMapper[y].append(x)
        else:
            routeMapper[y] = [x]
    elif y == 'end':
        if x in routeMapper.keys():
            routeMapper[x].append(y)
        else:
            routeMapper[x] = [y]
    elif x == 'end':
        if y in routeMapper.keys():
            routeMapper[y].append(x)
        else:
            routeMapper[y] = [x]
    else:
        if x in routeMapper.keys():
            routeMapper[x].append(y)
        else:
            routeMapper[x] = [y]
        if y in routeMapper.keys():
            routeMapper[y].append(x)
        else:
            routeMapper[y] = [x]

for x in routeMapper:
    routeMapper[x].sort()

completedRoutes = 0
debug = []

def checkPath(alternatives, visited, point, trace, isPart2):
    global completedRoutes
    global debug
    for next in alternatives[point]:
        if next in alternatives and len(alternatives[next]):
            if next == next.lower():
                # we copy the alternatives and purge the "next" from future choices
                nextAlternatives = copy.deepcopy(alternatives)
                for nextA in nextAlternatives:
                    nextChoices = [x for x in nextAlternatives[nextA] if x!=next]
                    nextAlternatives[nextA] = nextChoices
                checkPath(nextAlternatives, visited, next, trace + [next], isPart2)
                # so if visited is an empty string we use the standard alternatives
                # but send "next" to be set as visited in the next itteration
                if visited == '' and isPart2:
                    checkPath(alternatives, next, next, trace + [next], isPart2)
            elif next == next.upper():
                checkPath(alternatives, visited, next, trace + [next], isPart2)
        elif next == 'end':
            completedRoutes += 1
            # print(','.join(trace + ['end']))
            debug.append(','.join(trace + ['end']))

checkPath(routeMapper, [], 'start', ['start'], False)
print('Part 1', completedRoutes)
completedRoutes = 0
checkPath(routeMapper, '', 'start', ['start'], True)
debug = set(debug)

# Why debug? Well, something is off in the code to make the completedRoute increment correct
# so we cheat and add every route to a list... we then convert that into a tuple to get rid of
# duplicates and simple check its length

print('Part 2', len(debug))
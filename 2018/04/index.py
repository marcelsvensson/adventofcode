
print('***************************************');
print('* Advent of Code - 04 - 2018 - Python *');
print('***************************************\n');

f=open("input.txt", "r")
l=f.read().split('\n')
l.sort()

schedule = {}
total = {}

for r in l:
    guard = r.find('Guard')
    if guard > -1:
        g = 'g' + r[guard+7:r.find(' ', guard+7)]
        awoke = False
    date, time = r[1:17].split(' ')
    _,minute = time.split(':')
    if 'falls asleep' in r:
        asleepFrom = minute
    if 'wakes up' in r:
        awoke = True
    if time<='00:59':
        if awoke:
            # print('Sleept from ' + asleepFrom + ' until ' + str(int(minute)))
            awoke = False
            # print(int(asleepFrom),int(minute))
            for i in range(int(asleepFrom),int(minute)):
                try:
                    schedule[g][i] += 1
                except KeyError:
                    try:
                        schedule[g][i] = 1
                    except KeyError:
                        schedule[g] = {}
                        schedule[g][i] = 1
                try:
                    total[g] += 1
                except KeyError:
                    total[g] = 1


sleepyGuard = max(total, key=total.get) # schedule[max(total, key=total.get)]
totalMinutesAsleep = total[sleepyGuard]
sleepyMinute = max(schedule[sleepyGuard], key=schedule[sleepyGuard].get)
print(sleepyMinute*int(sleepyGuard[1:]))

# sg = scheduledGuard, sgv = scheduledGuardValues
sleepiestMinuteOfThemAll = -1
howSleepyWasThatMinuteCurrently = -1
whichGuardSleeptThatCrazyAmount = ''
for sg, sgv in schedule.items():
    sleepMinuteContender = max(sgv, key=sgv.get)
    lengthContender = sgv[sleepMinuteContender]
    if (int(lengthContender)>howSleepyWasThatMinuteCurrently):
        sleepiestMinuteOfThemAll = int(sleepMinuteContender)
        howSleepyWasThatMinuteCurrently = int(lengthContender)
        whichGuardSleeptThatCrazyAmount = sg

print(int(whichGuardSleeptThatCrazyAmount[1:])*sleepiestMinuteOfThemAll)
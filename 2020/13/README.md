# Day 13... part 2

_Got stuck on part 2 for the longest of time - at first trying incraments
of only the first buss, until I realized that could be speed up alot by
increasing the factor by the lowest common multiplyer.
Every example given checks out and very quickly!_
 
Enter input-run in great anticipation!
waiting:
```
.
..
...
....
*
......................
```
Nope... this is probably not working - taking forever, I tried logging at larger increaments
and reached levels way higher than supposed reasonable numbers.
I even tried BigInt-wrapping every number (haven't removed thos in this solution)
 
Got pissed off and decided to peak at reddit for hints. Seems like most users
opted for a solution based on the CRT - but I stubbornly didn't want to do that
as it feelt I was close. The one I did [find one](https://www.reddit.com/r/adventofcode/comments/kcb3bb/2020_day_13_part_2_can_anyone_tell_my_why_this/) confirmed my theory and in a cleaner way.
I tried updating to be more in line with that, but I still couldn't get past my forth buss from my 
input. Tried a couple of different conditions before throwing
in the towel for almost 2 days. 
  
... then took a peak at my colleague Per.
Althou written in go - I could clearly see that [his condition](https://github.com/perlw/advent_of_code/blob/master/2020/13/main.go#L50) was way cleaner
than my attempts so I shamelessly took it and translated it into JS - and that solution
ran at me faster than I could dream of!
 
... it was my god damn condition that screwed me over... Thanks!

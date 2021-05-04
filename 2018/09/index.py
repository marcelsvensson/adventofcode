print('***************************************');
print('* Advent of Code - 09 - 2018 - Python *');
print('***************************************\n');

import re

f=open("input.txt", "r")
l=f.read()

[players, balls] = re.findall(r'\d+', l)

balls = int(balls)

# Examples
# players = 9;balls=25
# players = 10;balls=1618
# players = 13;balls=7999
# players = 17;balls=1104
# players = 21;balls=6111
# players = 30;balls=5807

""" 
opted for a circular double linked list and based it upon: 
https://stackabuse.com/doubly-linked-list-with-python-examples/

However I did change a few things in order to simplify (it made more sense to me at least)
the prev/next parts when adding/removing.

Also made that operation be able to travers in both directions from head/start_node by stating
a direction and how many steps to take.
"""

class Node:
    def __init__(self, data):
        self.item = data
        self.nref = None
        self.pref = None

class CircularDoubleLinkedList:
    def __init__(self):
        self.head = None

    def insert_at_start(self, data):
        if self.head is None:
            new_node = Node(data)
            self.head = new_node
            return
        new_node = Node(data)
        new_node.nref = self.head
        new_node.pref = self.head
        self.head.pref = new_node
        self.head.nref = new_node
        self.head = new_node

    def insert_at(self, x, dir, data):
        if self.head is None:
            print("List is empty")
            return
        else:
            n = self.head
            i = 0
            while i < x-1:
                if dir == 'cw':
                    n = n.nref
                elif dir == 'ccw':
                    n = n.pref
                i += 1
            new_node = Node(data)
            new_node.pref = n
            new_node.nref = n.nref
            self.head = new_node
            p = n.nref
            p.pref = new_node
            n.nref = new_node

    def remove_at(self, x, dir):
        if self.head is None:
            print("List is empty")
            return
        else:
            n = self.head
            i = 0
            while i < x:
                if dir == 'cw':
                    n = n.nref
                elif dir == 'ccw':
                    n = n.pref
                i += 1
            v = n.item
            nr = n.nref
            pr = n.pref
            nr.pref = pr
            pr.nref = nr
            self.head = nr

            return v
            
def startGame(playerScoreboard, balls):
    playfield = CircularDoubleLinkedList()
    playfield.insert_at_start(0)

    crntPlayer = 0

    def nextPlayer(crnt):
        crnt += 1
        if crnt >= len(playerScoreboard):
            crnt = 0

        return crnt

    for x in range(1, (int(balls)+1)):
        if x == 1:
            playfield.insert_at_start(1)
        elif x%23 == 0:
            playerScoreboard[crntPlayer] += x
            playerScoreboard[crntPlayer] += playfield.remove_at(7, 'ccw')
        else:
            playfield.insert_at(2, 'cw', x)
        crntPlayer = nextPlayer(crntPlayer)

    print(max(playerScoreboard))

# part 1
playerScoreboard = [0 for x in range(0, int(players))]
startGame(playerScoreboard, balls)

# part 2 - do not forget to reset the scoreboard :doh: - still takes ~20s to complete
playerScoreboard = [0 for x in range(0, int(players))]
startGame(playerScoreboard, balls*100)
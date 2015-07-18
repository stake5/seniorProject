#!/usr/bin/python

import sys

print 'Number of arguments:', len(sys.argv), 'arguments.'

file = open(str(sys.argv[1]), 'r')
# print file.read()

vertices = []
locations = []
loc = []
final = []

with file as f:
	for line in f:
		if (line[:2] == 'v '):
			temp = line.split()
			temp.remove('v')
			vertices = vertices + temp
		if (line[:2] == 'f '):
			temp = line.split()
			temp.remove('f')
			locations = locations + temp
		if 'str' in line:
	  		break

print 'vertices: ' + str(len(vertices))
print vertices

print 'locations:'
print locations

print 'mod locations: '
for element in locations:
	temp = element.split('//')
	print 'temp: '
	print temp[0]
	loc.append(temp[0])

print 'loc: '
print loc

for element in loc:
	final.append(vertices[int(element) - 1])
	print 'index: '
	print int(element) - 1

print 'final: '
print len(final)

i = 1

with open('results.txt', 'w') as f:
	for s in final:
		i = i + 1
		if ((i - 1) % 9 == 0):
			f.write(s + ',\n\n')
		elif ((i - 1) % 3 == 0):
			f.write(s + ',\n')
		elif ((i - 1) == len(final)):
			print 'wow'
			f.write(s)
		else:
			f.write(s + ',')
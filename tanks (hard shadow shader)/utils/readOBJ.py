#!/usr/bin/python

import sys

print 'Number of arguments:', len(sys.argv), 'arguments.'

file = open(str(sys.argv[1]), 'r')
# print file.read()

with file as f:
	for line in f:
	if (line[:1] == 'v')
		print 'yeah'
	if 'str' in line:
  		break
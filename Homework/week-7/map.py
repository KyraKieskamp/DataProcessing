# Dashboard
# week 7
# Name: Kyra Kieskamp
# stnr: 10099727
# Language: python
# scriptname: map.py
# Content: Inputs the csv data from the World Development website and transforms it to json

import csv
import json

# Opens the input file
file = open('data.csv', 'r')
rows = file.read().split("\n")


data = []
for row in rows:
	row = row.rstrip()
	col = row.split(",")
	print col
	data.append(col)


with open('data.json', 'wb') as f:
     json.dump(data, f, indent=4)
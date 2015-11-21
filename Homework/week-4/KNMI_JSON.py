# Javascript:
# week 4
# Name: Kyra Kieskamp
# stnr: 10099727
# Language: python
# scriptname: KNMI_JSON.py
# Content: Inputs the csv data from the KNMI website and transforms it to json

import csv
import json

# Opens the input file
file = open('theBilt_date_maxtemp2.csv', 'r')
rows = file.read().split("\n")


data = []
for row in rows:
    print row
    col = row.split(",")
    data.append(col)

with open('KNMIdatamaxtemp.json', 'wb') as f:
     json.dump(data, f, indent=4)

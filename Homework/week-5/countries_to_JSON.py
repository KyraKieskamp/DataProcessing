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
file = open('Data_country_density_list.csv', 'r')
rows = file.read().split("\n")


data = []
for row in rows:
    print row
    col = row.split(",")
    data.append(col)

with open('countries_density.json', 'wb') as f:
     json.dump(data, f, indent=4)

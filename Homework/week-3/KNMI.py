# Javascript: line-graph exercise
# Name: Kyra Kieskamp
# stnr: 10099727
# Language: python
# scriptname: KNMI.py
# Content: Inputs "/" as seperator in the dates in the file of the KNMI data.

import csv

# Opens the input file
Afile1 = open('theBilt_date_maxtemp.csv', 'rb')
input_file = csv.reader(Afile1)
rows = []
new_row = []

# inputs the "/" after the year and month in the data
for row in input_file:
    new_row = [row[0][0:4]+ "/" + row[0][4:6] + "/" + row[0][6:] "," + row[1]]
    print new_row
    rows.append(new_row)
Afile1.close()

# Opens the output file and writes the transformed data into this file
Afile2 = open('theBilt_date_maxtemp2.csv', 'wb')
output_file = csv.writer(Afile2)
output_file.writerows(rows)
Afile2.close()

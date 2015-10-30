#!/usr/bin/env python
# Name: Kyra Kieskamp
# Student number: 10099727
'''
This script scrapes IMDB and outputs a CSV file with highest ranking tv series.
'''
# IF YOU WANT TO TEST YOUR ATTEMPT, RUN THE test-tvscraper.py SCRIPT.
import csv

from pattern.web import URL, DOM

TARGET_URL = "http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series"
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'


def extract_tvseries(dom):
    '''
    Extract a list of highest ranking TV series from DOM (of IMDB page).

    Each TV series entry should contain the following fields:
    - TV Title
    - Ranking
    - Genres (comma separated if more than one)
    - Actors/actresses (comma separated if more than one)
    - Runtime (only a number!)
    '''

    # ADD YOUR CODE HERE TO EXTRACT THE ABOVE INFORMATION ABOUT THE
    # HIGHEST RANKING TV-SERIES
    # NOTE: FOR THIS EXERCISE YOU ARE ALLOWED (BUT NOT REQUIRED) TO IGNORE
    # UNICODE CHARACTERS AND SIMPLY LEAVE THEM OUT OF THE OUTPUT.

    url = TARGET_URL
    dom = dom
    tvseries = []
    serie = []
    #print dom.body.content
    for i in range (0, 10):
        print dom.body.by_class("title")[i].by_tag("a")[0].content
        print dom.body.by_class("value")[i].content
        for n in range (0, 3):
            print dom.body.by_class("genre")[i].by_tag("a")[n].content
        for m in range (0, 5):
            print dom.body.by_class("credit")[i].by_tag("a")[m].content
        print dom.body.by_class("runtime")[i].content

    for e in dom.body.by_class("title")[:3]:
        for a in e.by_tag("a")[:1]:
            print a.content
        for i in dom.body.by_class("value")[:1]:
            print i.content
        #for a in dom.body.by_class("genre")[:1]:

    print dom.body.by_class("title")[0].by_tag("a")[0].content
    print dom.body.by_class("value")[0].content
    print dom.body.by_class("genre")[0].by_tag("a")[0].content
    print dom.body.by_class("genre")




    #for e in dom.by_tag("div.entry")[:5]: # Top 5 reddit entries.
    #    for a in e.by_tag("a.title")[:1]: # First <a class="title"> in entry.
    #        print plaintext(a.content)
    #        print a.attrs["href"]
    #        print

    return tvseries  # replace this line as well as appropriate


def save_csv(f, tvseries):
    '''
    Output a CSV file containing highest ranking TV-series.
    '''
    writer = csv.writer(f)
    writer.writerow(['Title', 'Ranking', 'Genre', 'Actors', 'Runtime'])

#    3for e in elements:
##    title =
#        ranking =
#        genre =
#        actors =
#        runtime =

#        writer.writerow(['title', 'ranking', 'genre', 'actors', 'runtime'])

    # ADD SOME CODE OF YOURSELF HERE TO WRITE THE TV-SERIES TO DISK

if __name__ == '__main__':
    # Download the HTML file
    url = URL(TARGET_URL)
    html = url.download()

    # Save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in testing / grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation
    dom = DOM(html)

    # Extract the tv series (using the function you implemented)
    tvseries = extract_tvseries(dom)

    # Write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, tvseries)

# web-crawler

Basic web-crawler created with nodeJS. 
It allows to enter a url and automatically downloads all the images from that url and all the subsequent links encountered. 
Using Cheerio it first gathers a list of all the links inside the host (only internal links). Then it gathers all the <img> tags and extracts the sources to save them locally using fs.

## Dependencies:
'node-fetch', 'cheerio', 'fs' and 'path'.

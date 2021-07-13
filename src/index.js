const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs=require('fs');
const path = require('path');

const seenUrls = {};

// helper func to provide full URL
// We need full url to pass to crawl func
const getUrl = (link, host, protocol) => {
    if (link.includes("http")) {
      return link;
    } else if (link.startsWith("/")) {
      return `${protocol}//${host}${link}`;
    } else {
      return `${protocol}//${host}/${link}`;
    }
};

const crawl = async(url, ignore) => {
    if(seenUrls[url]) return;
    console.log('Crawling', url);
    seenUrls[url] = true;

    const { host, protocol } = new URL(url);

    const response = await fetch(url);
    const data = await response.text();
    const $ = cheerio.load(data);
    const links = $('a')
        .map((i, link) => link.attribs.href)
        .get();

    const imageUrls = $('img')
        .map((i, image) => image.attribs.src)
        .get();

    imageUrls.forEach(imageUrl => {
        fetch(getUrl(imageUrl, host, protocol)).then(response => {
            const fileName = path.basename(imageUrl);
            const dest = fs.createWriteStream(`images/${fileName}`);
            response.body.pipe(dest);
        })
    })

    links
        .filter(link => link.includes(host) && !link.includes(ignore))
        .forEach( link => {
            crawl(getUrl(link, host, protocol), ignore);
    })
}

crawl('https://cookieandkate.com/');


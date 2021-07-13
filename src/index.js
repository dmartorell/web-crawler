const fetch = require('node-fetch');

fetch('https://stevescooking.blogspot.com/2018/11/wild-alaskan-sockeye-salmon-with.html')
    .then(response => response.text())
    .then(html => console.log(html));

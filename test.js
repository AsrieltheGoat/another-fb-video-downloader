const { facebook } = require('./index.js');

facebook('https://www.facebook.com/100008639590618/videos/266077793027023/')
    .then(videoUrl => console.log(videoUrl))
    .catch(error => console.error(error));
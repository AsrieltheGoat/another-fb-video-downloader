const { facebook } = require('./index.js');

facebook('https://www.facebook.com/reel/893927162160106')
    .then(videoUrl => console.log(videoUrl))
    .catch(error => console.error(error));
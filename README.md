# Facebook Downloader

A Node.js module using the Facebook Graph API to quickly extract direct video URLs from Facebook links for easy downloading.


## Installation

Use the package manager [npm](https://www.npmjs.com/) to install.

```bash
npm install another-fb-video-downloader
```

## Usage

```javascript
const { facebook } = require('another-fb-video-downloader');

// ? facebook(url, lq = true||false)
// ? url: string
// ? lq: boolean (true for low quality) (optional)

facebook('https://www.facebook.com/100008639590618/videos/266077793027023/' false)
    .then(videoUrl => console.log(videoUrl))
    .catch(error => console.error(error));
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.


## Special thanks to
@monokaijs for the original code
## License

[MIT](https://choosealicense.com/licenses/mit/)
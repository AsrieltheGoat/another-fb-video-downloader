const { facebook } = require("another-fb-video-downloader");

// ? facebook(url, lq = true||false)
// ? url: string
// ? lq: boolean (true for low quality) (optional)

// Public
(async () => {
    console.log("Public");
    try {
        const videoUrl1 = await facebook(
            "https://www.facebook.com/100008639590618/videos/266077793027023/",
            false
        );
        console.log(videoUrl1);
    } catch (error) {
        console.error(error);
    }

    // Private
    console.log("Private");
    try {
        const videoUrl2 = await facebook(
            "https://www.facebook.com/61550995123378/videos/3139821322821360",
            false
        );
        console.log(videoUrl2);
    } catch (error) {
        console.error(error);
    }
})();
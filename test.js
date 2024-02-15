const { facebook } = require("./index.js");

// Public
(async () => {
    console.log("Public");
    try {
        const videoUrl1 = await facebook(
            "https://www.facebook.com/100008639590618/videos/266077793027023/"
        );
        console.log(videoUrl1);
    } catch (error) {
        console.error(error);
    }

    // Private
    console.log("Private");
    try {
        const videoUrl2 = await facebook(
            "https://www.facebook.com/61550995123378/videos/3139821322821360"
        );
        console.log(videoUrl2);
    } catch (error) {
        console.error(error);
    }
})();

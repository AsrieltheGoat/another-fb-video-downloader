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

    // Error test
    console.log("Error test");
    try {
        const videoUrl3 = await facebook(
            "https://www.facebook.com/photo/?fbid=726350166339523&set=gm.916158123339104&idorvanity=880640216890895",
            false
        );
        console.log(videoUrl3);
    } catch (error) {
        console.error(error);
    }

        // fb.watch
        console.log("fb.watch test");
        try {
            const videoUrl4 = await facebook(
                "https://fb.watch/rru5r2WJ5N/",
                false
            );
            console.log(videoUrl4);
        } catch (error) {
            console.error(error);
        }
})();
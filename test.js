const { facebook } = require('./index.js');

async function runTestCases() {
    // User link (public video)
    const userVideoUrl = "https://www.facebook.com/gdprofreefire/videos/3529051220729199";
    const userResult = await facebook(userVideoUrl);
    console.log("User link");
    console.log(userResult);

    // Public video URL
    const publicVideoUrl = "https://www.facebook.com/watch?v=2040559343071046";
    const publicResult = await facebook(publicVideoUrl);
    console.log("Public");
    console.log(publicResult);

    // Private video from a group URL
    const privateGroupVideoUrl = "https://www.facebook.com/hue.nguyenthihue.1675/videos/1356166348710541/?idorvanity=445598535599027";
    const privateGroupResult = await facebook(privateGroupVideoUrl);
    console.log("Private, from a group");
    console.log(privateGroupResult);

    // Private fb.watch video URL
    const privateWatchVideoUrl = "https://fb.watch/wYK9mqsjYR/";
    const privateWatchResult = await facebook(privateWatchVideoUrl);
    console.log("Private, fb.watch link");
    console.log(privateWatchResult);

    // Share link public video URL
    const shareLinkVideoUrl = "https://www.facebook.com/share/v/18c4VaXDbY/";
    const shareLinkResult = await facebook(shareLinkVideoUrl);
    console.log("Share link public");
    console.log(shareLinkResult);
}

// Run the test cases
runTestCases();

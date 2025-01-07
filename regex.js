const regex = /(?:facebook|fb).*?(?:\/videos\/|\/reel|\/watch\?v=|\/share\/v\/)(\w+)/i;

const testUrls = [
    "https://www.facebook.com/gdprofreefire/videos/3529051220729199",
    "https://www.facebook.com/watch?v=606204218511964",
    "https://www.facebook.com/share/v/18c4VaXDbY/",
    "https://fb.watch/wYK9mqsjYR/"
];

testUrls.forEach(url => {
    console.log("Testing:", url);  // For better debugging
    const match = url.match(regex);
    console.log(match ? `Matched ID: ${match[1]}` : "No match");
});

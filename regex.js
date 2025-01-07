const regex = /(?:facebook|fb).*?(?:\/videos\/|\/reel|\/watch\?v=|\/share\/v\/)(\w+)/i;


const testUrls = [
    "https://www.facebook.com/gdprofreefire/videos/3529051220729199",
    "https://www.facebook.com/watch?v=606204218511964",
    "https://www.facebook.com/share/v/18c4VaXDbY/",
];

testUrls.forEach(url => {
    const match = url.match(regex);
    console.log(match ? `Matched ID: ${match[1]}` : "No match");
});

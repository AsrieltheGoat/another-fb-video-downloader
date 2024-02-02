const fetch = require("node-fetch");
const dotenv = require("dotenv").config();

function facebook(link) {
    // ? How to get it:
    // const dtsg = require("DTSGInitialData").token; console.log(dtsg);
    const dtsgInitialData = process.env.DTSG_INITIAL_DATA;

    let videoId = extractVideoId(link);
    if (!videoId) {
        console.log("Invalid link!");
        return;
    }

    function extractVideoId(link) {
        let match = link.match(/\/(?:videos|reel|watch)(?:\/?)(?:\?v=)?(\d+)/);
        return match && match.length >= 2 ? match[1] : null;
    }

    // Request body parameters
    let requestBody = {
        doc_id: "5279476072161634",
        variables: JSON.stringify({
            UFI2CommentsProvider_commentsKey: "CometTahoeSidePaneQuery",
            caller: "CHANNEL_VIEW_FROM_PAGE_TIMELINE",
            displayCommentsContextEnableComment: null,
            displayCommentsContextIsAdPreview: null,
            displayCommentsContextIsAggregatedShare: null,
            displayCommentsContextIsStorySet: null,
            displayCommentsFeedbackContext: null,
            feedbackSource: 41,
            feedLocation: "TAHOE",
            focusCommentID: null,
            privacySelectorRenderLocation: "COMET_STREAM",
            renderLocation: "video_channel",
            scale: 1,
            streamChainingSection: false,
            useDefaultActor: false,
            videoChainingContext: null,
            videoID: videoId,
        }),
        fb_dtsg: dtsgInitialData, // ! I don't know how to get it automatically, so I just copied it from the browser
        server_timestamps: true,
    };

    // Fetch request
    fetch("https://www.facebook.com/api/graphql/", {
        method: "POST",
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0",

            // ! Without this header, the request will fail
            "Sec-Fetch-Site": "same-origin",
        },
        body: encodeRequestBody(requestBody),
    })
        .then((response) => {
            // * Raw response before JSON
            // console.log("Response:", response);

            // * Response status
            // console.log(
            //     "Response status:",
            //     response.status,
            //     response.statusText
            // );
            return response.text();
        })
        .then((text) => {
            let json = JSON.parse(text.split("\n")[0]);
            // * JSON respond
            // console.log("Response JSON:", json);
            let out =
                json.data.video.playable_url || json.data.video.playable_url_hd;
            console.log("Result:", out);
        });
}

// Encode request body
function encodeRequestBody(requestBody) {
    let encodedParams = [];
    for (let key in requestBody) {
        if (requestBody.hasOwnProperty(key)) {
            let value = requestBody[key];
            let encodedValue =
                encodeURIComponent(key) + "=" + encodeURIComponent(value);
            encodedParams.push(encodedValue);
        }
    }
    return encodedParams.join("&");
}

module.exports = facebook;

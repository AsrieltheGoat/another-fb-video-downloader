const fetch = require("node-fetch");

function extractVideoId(link) {
    let match = link.match(
        /(?:facebook|fb).*\/(?:videos|reel|watch)(?:\/?)(?:\?v=)?(\d+)/i
    );
    return match && match.length >= 2 ? match[1] : null;
}

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

function facebook(link) {
    let videoId = extractVideoId(link);
    if (!videoId) {
        console.log("Invalid link!");
        return Promise.reject(new Error("Invalid link!"));
    }

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
        server_timestamps: true,
    };

    return fetch("https://www.facebook.com/api/graphql/", {
        method: "POST",
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0",
            "Sec-Fetch-Site": "same-origin",
        },
        body: encodeRequestBody(requestBody),
    })
        .then((response) => response.text())
        .then((text) => {
            let json = JSON.parse(text.split("\n")[0]);
            let out =
                json.data.video.playable_url || json.data.video.playable_url_hd;
            return out;
        });
}

module.exports = {
    facebook,
};

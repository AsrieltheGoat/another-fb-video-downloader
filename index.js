const fetch = require("node-fetch");

function extractVideoId(link) {
    const match = link.match(
        /(?:facebook|fb).*\/(?:videos|reel|watch)(?:\/?)(?:\?v=)?(\d+)/i
    );
    return match && match.length >= 2 ? match[1] : null;
}

function encodeRequestBody(requestBody) {
    return Object.entries(requestBody)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join("&");
}

function facebook(link, lq = false) {
    const videoId = extractVideoId(link);
    if (!videoId) {
        return Promise.resolve(JSON.stringify({ error: "Invalid URL!" }));
    }

    const requestBody = {
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
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then((text) => {
            try {
                const json = JSON.parse(text.split("\n")[0]);
                if (!json || !json.data) {
                    return JSON.stringify({ error: "Invalid response from the server!" });
                }
                if (json.data.video == null) {
                    return JSON.stringify({ error: "Video not found or private video!" });
                }

                if (!json.data.video.playable_url_quality_hd || lq === true) {
                    return `${json.data.video.playable_url}&sd_quality`;
                }

                return json.data.video.playable_url_quality_hd;
            } catch (e) {
                return JSON.stringify({ error: "Error parsing server response!" });
            }
        })
        .catch((error) => JSON.stringify({ error: error.message }));
}

module.exports = {
    facebook,
};
const fetch = require("node-fetch");

function extractVideoId(link) {
    const match = link.match(
        /(?:facebook|fb).*?(?:\/videos\/|\/reel|\/watch\?v=|\/share\/v\/)(\w+)/i
    );
    return match && match[1] ? match[1] : null;
}

function encodeRequestBody(requestBody) {
    return Object.entries(requestBody)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join("&");
}

async function facebook(link, lq = false) {
    const videoId = extractVideoId(link);
    if (!videoId) {
        return JSON.stringify({ error: "Invalid URL!" });
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

    try {
        const response = await fetch("https://www.facebook.com/api/graphql/", {
            method: "POST",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0",
                "Sec-Fetch-Site": "same-origin",
            },
            body: encodeRequestBody(requestBody),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        const json = JSON.parse(text.split("\n")[0]);

        if (!json || !json.data || !json.data.video) {
            return JSON.stringify({ error: "Video not found or invalid response!" });
        }

        const { playable_url, playable_url_quality_hd } = json.data.video;

        if (!playable_url_quality_hd || lq === true) {
            return playable_url ? `${playable_url}&sd_quality` : JSON.stringify({ error: "SD video not available!" });
        }

        return playable_url_quality_hd;
    } catch (error) {
        return JSON.stringify({ error: error.message });
    }
}

module.exports = {
    facebook,
};

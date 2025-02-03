const defaultSpeed = 1
const interval = setInterval(setDefaultSpeed, 1000)

function isVideoPlaying(video) {
    return video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2
}

function setDefaultSpeed() {
    const v = getRunningVideo()
    if(v != null) {
        v.playbackRate = defaultSpeed
        clearInterval(interval)
    }
}

function getRunningVideo() {
    var runningVideo = null
    document.querySelectorAll("video").forEach(v => {
        if(isVideoPlaying(v)) {
            runningVideo = v
        }
    })

    return runningVideo
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type === "vs.speed") {
        const v = getRunningVideo()
        if(v != null) {
            v.playbackRate = message.value
        }
    }
})

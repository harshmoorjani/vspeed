export const speeds = {
    '0.25': '0.25x',
    '0.50': '0.50x',
    '0.75': '0.75x',
    '1.00': 'Normal',
    '1.25': '1.25x',
    '1.50': '1.5x',
    '1.75': '1.75x',
    '2.00': 'Double',
    '3.00': 'Triple'
}

chrome.runtime.onInstalled.addListener(async () => {
    for (const [factor, text] of Object.entries(speeds)) {
        chrome.contextMenus.create({
            id: factor,
            title: text,
            contexts: ['all']
        })
    }
})

chrome.contextMenus.onClicked.addListener((item, tab) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "vs.speed", value: parseFloat(item.menuItemId) })
    })
})

let points = 0;
let lastCheckedTime = Date.now();

// Initialize default settings if not exists
const defaultSettings = {
    allowedSites: ['leetcode.com', 'atcoder.jp', 'geeksforgeeks.com', 'interviewbit.com', 'hackerearth.com', 'programiz.com'],
    distractionSites: ['reddit.com', 'facebook.com', 'instagram.com', 'youtube.com', 'divicast.com', 'fmovies.com'],
    redirectUrl: 'https://leetcode.com',
    points: 0
};

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.local.get(defaultSettings, function(result) {
        chrome.storage.local.set(result);
    });
});

chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.create({
        url: 'homepage.html'
    });
});

function updatePoints() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0]) {
            const currentTime = Date.now();
            const timeSpent = (currentTime - lastCheckedTime) / 10000;
            lastCheckedTime = currentTime;

            chrome.storage.local.get(defaultSettings, function(settings) {
                const url = tabs[0].url;
                points = settings.points || 0;
                
                for (let site of settings.allowedSites) {
                    if (url.includes(site)) {
                        points += timeSpent;
                        break;
                    }
                }

                let amount = 5;
                for (let site of settings.distractionSites) {
                    if (url.includes(site)) {
                        points -= amount * timeSpent;
                        break;
                    }
                }

                if (points < 0) {
                    points = 0;
                    chrome.tabs.update({url: settings.redirectUrl});
                }

                chrome.storage.local.set({points: Math.round(points)});
            });
        }
    });
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        updatePoints();
    }
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
    updatePoints();
});

setInterval(updatePoints, 10000);
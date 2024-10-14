let points = 0;
let lastCheckedTime = Date.now();

function updatePoints() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs[0]) {
      const currentTime = Date.now();
      const timeSpent = (currentTime - lastCheckedTime) / 10000; // Converts 1 minute to 1 point gained
      lastCheckedTime = currentTime;

      const allowed = ['leetcode.com', 'atcoder.jp', 'geeksforgeeks.com', 'interviewbit.com', 'hackerearth.com', 'programiz.com']
      const distractions = ['reddit.com', 'facebook.com', 'instagram.com', 'youtube.com', 'divicast.com', 'fmovies.com']
      let allowed_len = allowed.length;
      let distractions_len = distractions.length;

      const url = tabs[0].url;
      
      for (let i = 0; i < allowed_len; i++){
        if (url.includes(allowed[i])){
          points += timeSpent;
        }
      }

      let amount = 5;   // allow user to set this parameter as well

      for (let i = 0; i < distractions_len; i++){
        if (url.includes(distractions[i])){
          points -= amount * timeSpent;
        }
      }

      if (points < 0) {
        points = 0;
        chrome.tabs.update({url: 'https://leetcode.com'});
      }

      chrome.storage.local.set({points: Math.round(points)});
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

setInterval(updatePoints, 10000); // Update points every minute

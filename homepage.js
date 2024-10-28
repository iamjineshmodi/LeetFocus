// homepage.js
document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.getElementById('save-settings');
    const statusDiv = document.getElementById('status');
    
    // Initialize with default values
    const defaultSettings = {
        allowedSites: ['leetcode.com', 'atcoder.jp', 'geeksforgeeks.com', 'hackerearth.com', 'programiz.com'],
        distractionSites: ['reddit.com', 'facebook.com', 'instagram.com', 'youtube.com'],
        redirectUrl: 'https://leetcode.com',
        points: 0
    };
    
    // First, set default values if not already set
    chrome.storage.local.get(defaultSettings, function(result) {
        chrome.storage.local.set(result);
        loadSettings();
    });
    
    saveButton.addEventListener('click', saveSettings);
    
    // Update points display periodically
    updatePointsDisplay();
    setInterval(updatePointsDisplay, 1000);

    function loadSettings() {
        chrome.storage.local.get(['points', 'allowedSites', 'distractionSites', 'redirectUrl'], function(result) {
            document.getElementById('points').textContent = result.points || 0;
            
            if (result.allowedSites) {
                document.getElementById('allowed-sites').value = result.allowedSites.join(', ');
            }
            if (result.distractionSites) {
                document.getElementById('distraction-sites').value = result.distractionSites.join(', ');
            }
            if (result.redirectUrl) {
                document.getElementById('redirect-url').value = result.redirectUrl;
            }
        });
    }

    function updatePointsDisplay() {
        chrome.storage.local.get(['points'], function(result) {
            document.getElementById('points').textContent = result.points || 0;
        });
    }

    function saveSettings() {
        const allowedSites = document.getElementById('allowed-sites').value
            .split(',')
            .map(site => site.trim())
            .filter(site => site.length > 0);

        const distractionSites = document.getElementById('distraction-sites').value
            .split(',')
            .map(site => site.trim())
            .filter(site => site.length > 0);

        const redirectUrl = document.getElementById('redirect-url').value.trim() || 'https://www.leetcode.com';

        const settings = {
            allowedSites: allowedSites,
            distractionSites: distractionSites,
            redirectUrl: redirectUrl
        };

        chrome.storage.local.set(settings, function() {
            // Show save confirmation
            statusDiv.style.display = 'block';
            saveButton.textContent = 'Saved!';
            saveButton.disabled = true;
            
            setTimeout(() => {
                statusDiv.style.display = 'none';
                saveButton.textContent = 'Save Settings';
                saveButton.disabled = false;
            }, 2000);
            
            console.log('Settings saved:', settings);
        });
    }
});

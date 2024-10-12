function updatePointsDisplay() {
    chrome.storage.local.get(['points'], function(result) {
      document.getElementById('points').textContent = result.points || 0;
    });
  }
  
  updatePointsDisplay();
  setInterval(updatePointsDisplay, 1000); // Update display every second
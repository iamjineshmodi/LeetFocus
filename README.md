<h1>LeetFocus</h1>

**A Chrome extension that keeps you focused on LeetCode by rewarding time spent productively and redirecting you when distractions take over!**

LeetFocus tracks your time spent on LeetCode, rewards productive time with points, and deducts points when you spend time on sites like Reddit. Once your points hit zero, LeetFocus redirects you back to LeetCode to keep you on track!

<h2>Features</h2>

1. **Time Tracking**: Monitors the time you spend on LeetCode and gives you 1 point per minute.
2. **Distraction Control**: Deducts 5 points per minute spent on distracting sites like Reddit, Instagram, and Facebook.
3. **Auto-Redirect**: When points drop to zero, you're automatically redirected back to LeetCode to stay focused.
4. **Customizable Settings** (Bonus):
   - Choose the websites where you can earn points.
   - Select the sites where points are deducted for distraction.
   - Customize the point deduction-to-earn ratio to fit your needs.
5. **User Interface**:
   - Clean, simple interface with images for an enhanced experience.
   - Tracks only the active tab to ensure accurate time recording (ignores multiple tabs).

<h2>How to load this extension in your browser?</h2>
<ul>
<li>Download the code as a ZIP file and extract it.</li>
<li>Navigate to <code>chrome://extensions/</code> in your browser.</li>
<li>Enable <code>Developer mode</code> in the top right corner.</li>
<li>Click on the <code>Load Unpacked</code> button in the top left corner.</li>
<li>Select the folder where you extracted the ZIP file.</li>
</ul>

<h2>Usage</h2>

1. **Stay Focused**: Just keep LeetFocus active while studying on LeetCode. Track your progress and watch your points add up.
2. **Set Your Limits**: Tailor the websites for productive points or distractions to your liking.
3. **Enjoy Your Progress**: Keep an eye on your points, and let LeetFocus guide you back to productive study when needed!

Give LeetFocus a try and transform your coding practice into an uninterrupted, focused journey!






















#(Old)

Planning:LeetFocus
1. I will take note of amount of time spent on www.leetcode.com/*
2. I will give user 1 point for every 1 minute spent on LeetCode
3. I will deduct 5 points for every 1 minute spent on Reddit (+ Instagram + Facebook)
4. When the total number of points reduces to 0, then the user will be shown/redirected to leetcode.com
5. All set

Bonus
1. User can set from which websites they can gain points from
2. User can set from which websites they can spend their points on
3. User can decide on the parameter (5). The ratio of spend:earn
4. Have images to enchance user interface
5. Must include ONLY the tab currently using (Eg: if multiple leetcode tabs open, should not count it multiple times)

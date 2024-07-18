# Power Tabs

This is a chromium extension to prevent getting lost in tab hell. My goal was to have a minimum amount of tabs organized in a clear way and being able to move quickly to the tab I need. Currently the extension has four features. By clicking on the extension icon, you can enable or disable each feature however you want.

## 1. Order Tabs by URL

This feature keeps identical tabs close to each other by automatically sort tabs alphabetically by URL.

## 2. Display Tab Number in Tab Title

This feature shows tab numbers in square brackets (e.g., [1], [2], etc.) next to tab titles. This is useful for using `Ctrl + Number` shortcuts to switch between tabs. The extension updates tab numbers when tabs are created, moved, updated, or closed. Numbers 1 to 8 are displayed for the first eight tabs. The number 9 is displayed only on the last tab. 

## 3. Prevent Duplicate Tabs

This feature prevents the creation of duplicate tabs. If a url (without the url fragment) is already present in another tab, it closes the tab and switches to the tab with the asked url. Pinned tabs are privileged and always stay alive. Tab duplication detection applies to each browser window individually. So if you really want to duplicate a tab, just open it in a new window.

## 4. Lock Pinned Tabs Hostname

This feature prevents pinned tabs from changing the domain. Unfortunately it is not possible to block a url change so instead if a hostname change is detected, the new url opens in a new tab and the pinned Tab url is restored. 

# Installation

1. **Download the Extension Files**
   - Download or clone the extension files to your local machine.

2. **Open Chrome Extensions Page**
   - Go to `chrome://extensions/` in Google Chrome (or `brave://extensions/` in Brave).

3. **Enable Developer Mode**
   - Toggle "Developer mode" on in the top right corner.

4. **Load the Unpacked Extension**
   - Click "Load unpacked" and select the cloned folder.
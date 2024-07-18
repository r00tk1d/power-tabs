export function applyPinnedTab(tabId, updateInfo, tab) {
    chrome.storage.sync.get('pinTabsHard', function (data) {
        if (data.pinTabsHard && updateInfo.url && tab.pinned) {
            handlePinnedTabUrlChange(tabId, updateInfo);
        }
    });
  }

export function handlePinnedTabUrlChange(tabId, updateInfo) {

    const currentHostname = new URL(updateInfo.url).hostname;
    chrome.storage.sync.get('previousHostname', function (data) {
        if (currentHostname !== data.previousHostname) {
            chrome.tabs.goBack(tabId);
            chrome.tabs.create({ url: updateInfo.url, pinned: false });
        }
    });

}

export function saveHostname() {
    chrome.tabs.query({ active: true, currentWindow: true, pinned: true }, function (tabs) {
        const previousHostname = new URL(tabs[0].url).hostname;
        var previousHostnameObj = {};
        previousHostnameObj['previousHostname'] = previousHostname;
        chrome.storage.sync.set(previousHostnameObj);
    });
}
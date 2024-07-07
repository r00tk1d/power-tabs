export function applyPinnedTab() {
    chrome.storage.sync.get('pinTabsHard', function (data) {
        if (data.pinTabsHard && updateInfo.url && tab.pinned) {
            handlePinnedTabUrlChange();
        }
    });
  }

export function handlePinnedTabUrlChange(tabId, updateInfo, tab) {

    const currentHostname = new URL(updateInfo.url).hostname;
    const previousHostname = new URL(tab.url).hostname;
    // TODO currently the previousHostname is the currentHostname. It seems like I need to store the previous hostname in a variable
    // https://stackoverflow.com/questions/33770825/get-previous-url-from-chrome-tabs-onupdated
    if (currentHostname !== previousHostname) {
        chrome.tabs.create({ url: updateInfo.url, pinned: true });
        chrome.tabs.remove(tabId);
    }
}
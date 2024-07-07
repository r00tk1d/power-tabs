export function handleTabDuplication(currentTab, currentTabUrl, currentWindowId) {
    chrome.storage.sync.get('duplicateTabs', function (data) {
        if (data.duplicateTabs && currentTabUrl) {
            preventTabDuplication(currentTab, currentTabUrl, currentWindowId);
        }
    });
}

function preventTabDuplication(currentTab, currentTabUrl, currentWindowId) {
    const currentTabUrlWithoutFragment = removeFragment(currentTabUrl);
    chrome.tabs.query({ windowId: currentWindowId }, tabs => {
        const duplicateTab = tabs.find(tab => tab.id !== currentTab.id && removeFragment(tab.url) === currentTabUrlWithoutFragment);
        if (duplicateTab) {
            // pinned tabs privilege
            if (currentTab.pinned) {
                chrome.tabs.update(currentTab.id, { active: true });
                chrome.tabs.remove(duplicateTab.id);
            } else {
                chrome.tabs.update(duplicateTab.id, { active: true });
                chrome.tabs.reload(duplicateTab.id); // TODO is this always the best way to reload it? Maybe use a settings switch?
                chrome.tabs.remove(currentTab.id);
            }
        }
    });
}

function removeFragment(url) {
    const fragmentIndex = url.indexOf('#');
    if (fragmentIndex !== -1) {
        return url.slice(0, fragmentIndex);
    }
    return url;
}
// TODO refactor!

export function applyTabTitle() {
    chrome.storage.sync.get('showTabNumberInTabTitle', function (data) {
        if (data.showTabNumberInTabTitle) {
            addTabNumbersToAllTabs();
        }
    });
}

export function removeTabTitleMods() {
    chrome.storage.sync.get('showTabNumberInTabTitle', function (data) {
        if (!data.showTabNumberInTabTitle) {
            removeTabNumbersFromAllTabs();
        }
    });
}

function addTabNumbersToAllTabs() {
    chrome.windows.getAll({ populate: true }, (windows) => {
        windows.forEach((win) => {
            const tabs = win.tabs;
            const tabCount = tabs.length;
            tabs.forEach((tab, index) => {
                let tabNumber;
                if (index < 8) {
                    tabNumber = index + 1;
                } else if (index === tabCount - 1) {
                    tabNumber = 9;
                } else {
                    tabNumber = null;
                }

                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: addTabNumberToTab,
                    args: [tabNumber]
                });
            });
        });
    });
}


function addTabNumberToTab(tabNumber) {
    const tabTitle = document.title;
    const regex = /\[\d\] /;
    if (tabNumber !== null) {
        document.title = `[${tabNumber}] ` + tabTitle.replace(regex, '');
    } else {
        document.title = tabTitle.replace(regex, '');
    }
}

function removeTabNumbersFromAllTabs(){
    chrome.windows.getAll({ populate: true }, (windows) => {
        windows.forEach((win) => {
            const tabs = win.tabs;
            tabs.forEach((tab, index) => {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: removeTabNumberFromTab
                });
            });
        });
    });
}

function removeTabNumberFromTab() {
    const tabTitle = document.title;
    const regex = /\[\d\] /;
    document.title = tabTitle.replace(regex, '');
}
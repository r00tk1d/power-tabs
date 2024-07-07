// TODO refactor

export function applyTabOrder() {
  chrome.storage.sync.get('sortTabs', function (data) {
      if (data.sortTabs) {
        sortTabsByUrl();
      }
  });
}

function sortTabsByUrl() {
  chrome.tabs.query({}, (tabs) => {
    const unpinnedTabs = tabs.filter(tab => !tab.pinned);
    const sortedTabs = unpinnedTabs.sort((a, b) => a.url.localeCompare(b.url));

    sortedTabs.forEach((tab, index) => {
      chrome.tabs.move(tab.id, { index });
    });
  });
}
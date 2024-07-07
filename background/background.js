import { applyTabTitle } from './tabTitle.js';
import { handleTabDuplication } from './tabDuplicate.js';
import { applyTabOrder } from './tabOrder.js';
import { applyPinnedTab } from './tabPin.js';
import { applySettings } from './settings.js';


chrome.storage.onChanged.addListener(function(changes, namespace) {
  applySettings(changes, namespace);
});

chrome.tabs.onCreated.addListener(async newTab => {
  handleTabDuplication(newTab, newTab.url, newTab.windowId);
  applyTabOrder();
  applyTabTitle();
});

chrome.tabs.onUpdated.addListener((tabId, updateInfo, tab) => {
  applyPinnedTab(tabId, updateInfo, tab);
  handleTabDuplication(tab, updateInfo.url, tab.windowId); // tab.url instead?
  applyTabOrder();
  applyTabTitle();
});

chrome.tabs.onRemoved.addListener(applyTabTitle);
chrome.tabs.onMoved.addListener(applyTabTitle);
chrome.tabs.onDetached.addListener(applyTabTitle);
chrome.tabs.onAttached.addListener(applyTabTitle);
chrome.tabs.onActivated.addListener(applyTabTitle);
chrome.runtime.onInstalled.addListener(applyTabTitle);
chrome.windows.onFocusChanged.addListener(applyTabTitle);
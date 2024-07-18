import { applyTabTitle } from './tabTitle.js';
import { handleTabDuplication } from './tabDuplicate.js';
import { applyTabOrder } from './tabOrder.js';
import { applyPinnedTab, saveHostname } from './tabPin.js';
import { applySettings, activateAllFeatures } from './settings.js';


chrome.storage.onChanged.addListener(function(changes, namespace) {
  applySettings(changes, namespace);
});

chrome.tabs.onCreated.addListener(newTab => {
  handleTabDuplication(newTab, newTab.url, newTab.windowId);
  applyTabOrder();
  applyTabTitle();
});

chrome.tabs.onUpdated.addListener((tabId, updateInfo, tab) => {
  handleTabDuplication(tab, updateInfo.url, tab.windowId); // tab.url instead?
  applyTabOrder();
  applyTabTitle();
  applyPinnedTab(tabId, updateInfo, tab);
});

chrome.tabs.onRemoved.addListener(applyTabTitle);
chrome.tabs.onMoved.addListener(applyTabTitle);
chrome.tabs.onDetached.addListener(applyTabTitle);
chrome.tabs.onAttached.addListener(applyTabTitle);
chrome.tabs.onActivated.addListener(function() {
  applyTabTitle();
  saveHostname();
});
chrome.runtime.onInstalled.addListener(function() { 
  applyTabTitle(); 
  activateAllFeatures();
});
chrome.windows.onFocusChanged.addListener(applyTabTitle);
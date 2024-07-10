import { applyTabOrder } from "./tabOrder.js";
import { applyPinnedTab } from "./tabPin.js";
import { applyTabTitle } from "./tabTitle.js";
import { removeTabTitleMods } from "./tabTitle.js";

const features = ["showTabNumberInTabTitle", "sortTabs", "pinTabsHard", "duplicateTabs"];

export function applySettings(changes, namespace) {
    console.log("Power Tabs Settings changed: " + Object.keys(changes)[0] + ": " + Object.values(changes)[0].newValue);
    if (changes.sortTabs?.newValue) {
        applyTabOrder();
    }
    // if (changes.pinnedTabs?.newValue) {
    //     applyPinnedTab();
    // }
    if (changes.showTabNumberInTabTitle?.newValue) {
        applyTabTitle();
    }
    if (!changes.showTabNumberInTabTitle?.newValue) {
        removeTabTitleMods();
    }
}

export function activateAllFeatures() {
    features.forEach(feature => {
        var settingObj = {};
        settingObj[feature] = true;
        chrome.storage.sync.set(settingObj);
    });
}
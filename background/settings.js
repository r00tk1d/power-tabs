import { applyTabOrder } from "./tabOrder.js";
import { applyTabTitle, removeTabTitleMods } from "./tabTitle.js";

const features = ["showTabNumberInTabTitle", "sortTabs", "pinTabsHard", "duplicateTabs"];

export function applySettings(changes, namespace) {
    console.log("Power Tabs Variables changed: " + Object.keys(changes)[0] + ": " + Object.values(changes)[0].newValue);
    if (changes.sortTabs?.newValue) {
        applyTabOrder();
    }
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
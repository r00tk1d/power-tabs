import { removeTabNumberFromTabTitles } from "./tabTitle.js";
import { applyTabOrder } from "./tabOrder.js";
import { applyPinnedTab } from "./tabPin.js";
import { applyTabTitle } from "./tabTitle.js";

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
        removeTabNumberFromTabTitles();
    }
}
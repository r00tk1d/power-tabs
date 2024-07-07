import { removeTabNumberFromTabTitles } from "./tabTitle";
import { applyTabOrder } from "./tabOrder";
import { applyPinnedTab } from "./tabPin";
import { applyTabTitle } from "./tabTitle";

export function applySettings(changes, namespace) {
    console.log("Power Tabs Settings changed: " + Object.keys(changes)[0] + ": " + Object.values(changes)[0].newValue);
    if (changes.sortTabs?.newValue) {
        applyTabOrder();
    }
    if (changes.pinnedTabs?.newValue) {
        applyPinnedTab();
    }
    if (changes.showTabNumberInTabTitle?.newValue) {
        applyTabTitle();
    }
    if (!changes.showTabNumberInTabTitle?.newValue) {
        removeTabNumberFromTabTitles();
    }
}
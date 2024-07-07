document.addEventListener('DOMContentLoaded', function() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        // Initialize checkbox from chrome.storage
        chrome.storage.sync.get(checkbox.id, function(data) {
            checkbox.checked = !!data[checkbox.id];
        });

        // Save checkbox state to chrome.storage on change
        checkbox.addEventListener('change', function() {
            var setting = {};
            setting[checkbox.id] = checkbox.checked;
            chrome.storage.sync.set(setting);
        });
    });
});
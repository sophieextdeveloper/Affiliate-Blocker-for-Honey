let isTabRemovalDisabled = false;
let disableTimeout;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "disableTabRemoval") {
    const duration = message.duration || 1;
    isTabRemovalDisabled = true;

    clearTimeout(disableTimeout);
    disableTimeout = setTimeout(() => {
      isTabRemovalDisabled = false;
    }, duration * 60000);
  } else if (message.action == "check_state") {
    if (isTabRemovalDisabled) {
      sendResponse({ message: "disabled" });
    } else {
      sendResponse({ message: "enabled" });
    }
  }
});

chrome.webNavigation.onBeforeNavigate.addListener(
  function (details) {
    const blockedDomain = /o\.honey\.io/;

    if (isTabRemovalDisabled) {
      return;
    }

    if (blockedDomain.test(details.url)) {
      chrome.tabs.remove(details.tabId, function () {
      });
    }
  },
  { url: [{ urlMatches: "http://*/*" }, { urlMatches: "https://*/*" }] }
);

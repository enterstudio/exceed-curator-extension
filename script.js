// onClicked callback function.
function onClickHandler(info, tab) {
  if (info.menuItemId == "page") {
    createPopup(encodeURIComponent(info.pageUrl), tab.incognito)
  }
  if (info.menuItemId == "link") {
    createPopup(encodeURIComponent(info.linkUrl), tab.incognito)
  }
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

// for toolbar button
chrome.browserAction.onClicked.addListener(function(tab) {
  createPopup(encodeURIComponent(tab.url), tab.incognito)
});

function createPopup(url, incognito) {
  var fullUrl
  chrome.storage.sync.get('subdomain', function(items) {
    subdomain = items.subdomain || 'public';
    fullUrl = "https://" + subdomain + ".exceedlms.com/public_courses/new?chrome_extension=true&url=" + url;
    chrome.windows.create({"url":fullUrl, "type":"popup", "focused": true, "height":350,"width":800, "top": 100, "left": 400, incognito: incognito});
  })
}

chrome.runtime.onInstalled.addListener( function(details) {
  // Setting up context menu items.
  var contexts = ["page","link"];
  for (var i = 0; i < contexts.length; i++) {
    var context = contexts[i];
    var title = "Add " + context + " to Exceed curation list";
    var id = chrome.contextMenus.create({"title": title, "contexts":[context], "id": context});
  }

  if(details.reason == "install"){
    chrome.tabs.create({url: "https://public.exceedlms.com"});
  }
});

chrome.runtime.setUninstallURL("");
// onClicked callback function.
function onClickHandler(info, tab) {
  if (info.menuItemId == "page") {
    var postUrl = "https://coursestore.exceedlms.com/public_courses/new?chrome_extension=true&url="+encodeURIComponent(info.pageUrl);
    chrome.windows.create({"url":postUrl, "type":"popup", "focused": true, "height":350,"width":800, "top": 100, "left": 400, incognito: tab.incognito});
  }
  if (info.menuItemId == "link") {
    var postUrl = "https://coursestore.exceedlms.com/course_scraped_urls/new?chrome_extension=true&url="+encodeURIComponent(info.linkUrl);
    chrome.windows.create({"url":postUrl, "type":"popup", "focused": true, "height":350,"width":800, "top": 100, "left": 400, incognito: tab.incognito});
  }
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

// for toolbar button
chrome.browserAction.onClicked.addListener(function(tab) {
  var postUrl = "https://coursestore.exceedlms.com/public_courses/new?chrome_extension=true&url="+encodeURIComponent(tab.url);
  chrome.windows.create({"url":postUrl, "type":"popup", "focused": true, "height":350,"width":800, "top": 100, "left": 400, incognito: tab.incognito});
});


chrome.runtime.onInstalled.addListener( function(details) {

  // Setting up context menu items.
  var contexts = ["page","link"];
  for (var i = 0; i < contexts.length; i++) {
    var context = contexts[i];
    var title = "Add " + context + " to Exceed curation list";
    var id = chrome.contextMenus.create({"title": title, "contexts":[context], "id": context});
  }

  if(details.reason == "install"){
    chrome.tabs.create({url: ""});
  }
});

chrome.runtime.setUninstallURL("");

  var dictionary;
  var tabid;

  function initDictionary(){
    fetch("words2.json")
    .then(results=>results.text())
    .then(data=>{
      dictionary = data;
    })
  }
  
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    var words = []
    console.log(request.letters)
    var regex = /\w+(at)\w+/g
    var regex = new RegExp("\\w+("+request.letters.toLowerCase()+")\\w+","i")
    console.log(typeof(dictionary))
    if (typeof(dictionary) == "undefined"){
      initDictionary()
    }
    information = regex.exec(dictionary)
    words.push(information[0])
    console.log(words)
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      console.log(tabid)
      if (tabs[0]){
        tabid = tabs[0].id
      }
      chrome.tabs.sendMessage(parseInt(tabid),{package:"word", word: words[0]})
    });
})

  chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({start: false})
    initDictionary();
    chrome.alarms.create("Start", {delayInMinutes: .1});
  });


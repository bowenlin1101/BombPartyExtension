var letters;
var check;

chrome.runtime.onMessage.addListener(async(response, sender, sendResponse) => {
    if (document.querySelector(".roomName")){
        document.querySelector(".roomName").textContent = response.word;
    }
})

function returnLetters(){ 
    chrome.storage.sync.get(["start"], function(result){
        if (document.querySelector(".syllable") && result.start == true){
            letters = document.querySelector(".syllable").innerText;   
        }
    })
}

setInterval(() => {
    returnLetters()
}, 100);

setInterval(() => {
    if (letters != check){
        check = letters
        console.log("sending")
        chrome.runtime.sendMessage({letters:letters})
    }
}, 100);


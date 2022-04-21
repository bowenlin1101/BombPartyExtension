window.onload = () => {
    chrome.storage.sync.get(["start"], (result) => {
        if (result.start){
            document.querySelector("#on").checked = true;
        } else {
            document.querySelector("#off").checked = true;
        }
    })
}
    document.querySelector("#on").addEventListener("click", function(){
        if (document.querySelector("#on").checked == true){
            chrome.storage.sync.set({start: true}, function() {
                document.querySelector("p").innerHTML = "ON"
              });
        }
    })

    document.querySelector("#off").addEventListener("click", function(){
        if (document.querySelector("#off").checked == true){
            chrome.storage.sync.set({start: false}, function() {
                document.querySelector("p").innerHTML = "OFF"
              });
        }
    })

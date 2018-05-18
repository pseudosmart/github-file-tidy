document.getElementById("test").addEventListener('click', () => {
  console.log("Popup DOM fully loaded and parsed");

  function modifyDOM() {
    //You can play with your DOM here or check URL against your regex
    console.log('Tab script:');
    console.log(document.body);
    // console.log('Checking files:', document.querySelectorAll("div.file-header"))
    let files = document.querySelectorAll("div.file-header")
    files.forEach((file) => {
      console.log('file', file)
      if (file.dataset.path.includes('.hbs')) {
        console.log('less file', file)
        file.parentNode.setAttribute("hidden", true)
      }
    })
    return document.body.innerHTML;
  }

  //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
  chrome.tabs.executeScript({
    code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
  }, (results) => {
    //Here we have just the innerHTML and not DOM structure
    console.log('Popup script:')
    console.log(results[0]);
  });
});
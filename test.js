let hiddenValues = ''

function modifyDOM(selector, action) {
  let files = document.querySelectorAll("div.file-header")
  files.forEach((file) => {
    if (file.dataset.path.match(`${selector}$`)) {
      file.parentNode.style.display = action === 'hide' ? 'none' : 'block'
    }
  })
  return document.body.innerHTML;
}

function showAll() {
  let files = document.querySelectorAll("div.file-header")
  files.forEach((file) => {
    if (file.parentNode.style.display === 'none') {
      file.parentNode.style.display = 'block'
    }
  })
  return document.body.innerHTML;
}

function run () {
  chrome.storage.sync.get(['regex'], function (result) {
    document.getElementById('show_hide_regex_form').value = result.regex
  });
  let buttons = document.getElementsByClassName("show_hide_buttons")
  Array.prototype.filter.call(buttons, function (button) {
     button.addEventListener('click', () => {
       let selector = button.id.split('_')[0]
      let action = button.id.split('_')[1]

      chrome.tabs.executeScript({
        code: `(${modifyDOM})('.*\.${selector}', '${action}');`
      });
    });
  });
};

window.onload = function () {
  this.run();
}

document.getElementById("regex_form").addEventListener('submit', (e) => {
  e.preventDefault();
  chrome.tabs.executeScript({
    code: `(${showAll})();`
  });

  let regexValue = document.getElementById('show_hide_regex_form').value
  if (!regexValue) return;
  
  chrome.storage.sync.set({ regex: regexValue });
  chrome.tabs.executeScript({
    code: `(${modifyDOM})('${regexValue}', 'hide');`
  });
})

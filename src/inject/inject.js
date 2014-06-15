(function () {
  "use strict";

  var strip = function (s) { return s.replace(/^\s+|\s+$/g, ''); };

  var deshittify = function () {
    console.log("Not So Shitty 999 loaded.");

    var map = {}, $entries = $('.ads-list-table tr');

    $entries.each(function () {
      var $el = $(this),
          title = strip($el.find('h3 a').text()),
          price = strip($el.find('.ads-list-table-price').text())

      console.log(title, price)
    })
  }

  chrome.extension.sendMessage({}, function(response) {
    var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);
      deshittify();
    }
    }, 10);
  });
})();

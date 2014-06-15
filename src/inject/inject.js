(function () {
  "use strict";

  var strip = function (s) { return s.replace(/^\s+|\s+$/g, ''); };

  var deshittify = function () {
    console.log("Not So Shitty 999 loaded.");

    var map = {},
        $entries = $('.ads-list-table tr'),
        duplicates = 0;

    $entries.each(function () {
      var $el = $(this),
          title = strip($el.find('h3 a').text()),
          price = strip($el.find('.ads-list-table-price').text()),
          key = title + "-" + price;

      if (map[key]) {
        $el.remove();
        duplicates++;
      } else {
        map[key] = true;
      }
    })

    if ($entries.length) {
      console.log("NSS: " + duplicates.toString() + " duplicates removed");
    }
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

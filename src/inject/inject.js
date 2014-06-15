(function () {
  "use strict";

  var strip = function (s) { return s.replace(/^\s+|\s+$/g, ''); };
  var nslog = function (s) { console.log("NSS: " + s); }

  var deshittify = function () {
    console.log("Not So Shitty 999 loaded.");

    var map = {},
        $entries = $('.ads-list-table tr'),
        duplicates = 0,
        withoutPrice = 0;

    $entries.each(function () {
      var $el = $(this),
          title = strip($el.find('h3 a').text()),
          price = strip($el.find('.ads-list-table-price').text()),
          key = title + "-" + price;

      if (price.length === 0) {
        nslog(title + " - no price");
        withoutPrice++;
        return $el.remove();
      }

      if (map[key]) {
        $el.remove();
        duplicates++;
      } else {
        map[key] = true;
      }
    })

    if ($entries.length) {
      nslog(duplicates.toString() + " duplicates removed");
      nslog(withoutPrice.toString() + " without price removed");
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
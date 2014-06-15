(function () {
  "use strict";

  var strip = function (s) { return s.replace(/^\s+|\s+$/g, ''); };
  var nslog = function (s) { console.log("NSS: " + s); }

  var deshittify = function () {
    var map = {},
        $entries = $('.ads-list-table tr'),
        $objects = $('object'),
        duplicates = 0,
        withoutPrice = 0,
        floatingAds = 0;

    $objects.each(function () {
      var $el = $(this)

      if ($el.parent().css('z-index') === '10000') {
        $el.parent().remove()
        floatingAds++
      }
    })

    if ($objects.length) {
      nslog(floatingAds.toString() + " floating ads removed")
    }

    $entries.each(function () {
      var $el = $(this),
          title = strip($el.find('h3 a').text()),
          price = strip($el.find('.ads-list-table-price').text()),
          key = title + "-" + price;

      if (price.length === 0) {
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

  $(document).ready(deshittify)
  $(window).on('pjax:success', function () {
    deshittify();
  })
})();

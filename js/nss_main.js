(function () {
  "use strict";

  var strip = function (s) { return s.replace(/^\s+|\s+$/g, ''); };
  var nslog = function (s) { console.log("NSS: " + s); }

  var dedupe = function ($list, titleSelector, priceSelector) {
    var map = {}, duplicates = 0, withoutPrice = 0

    $list.each(function () {
      var $el = $(this),
          title = strip($el.find(titleSelector).text()),
          price = strip($el.find(priceSelector).text()),
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

    return duplicates
  }

  var deshittify = function () {
    var $entries = $('.ads-list-table tr'),
        $detailedEntries = $('ul.ads-list-detail li'),
        $photoEntries = $('ul.ads-list-photo li'),
        $objects = $('object'),
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

    console.log(dedupe($entries, 'h3 a', '.ads-list-table-price'))
    console.log(dedupe($detailedEntries, '.ads-list-detail-item-title a', '.ads-list-detail-item-price'))
    console.log(dedupe($photoEntries, '.ads-list-photo-item-title a', '.ads-list-photo-item-price'))
  }

  $(document).ready(deshittify)
  $(window).on('pjax:success', function () {
    deshittify();
  })
})();

(function () {
  "use strict";

  var strip = function (s) { return s.replace(/^\s+|\s+$/g, ''); };
  var nslog = function (s) { console.log("NSS: " + s); }

  var dedupe = function ($list, titleSelector, priceSelector) {
    var map = {}, duplicates = 0, withoutPrice = [];

    $list.each(function () {
      var $el = $(this),
          title = strip($el.find(titleSelector).text()),
          price = strip($el.find(priceSelector).text()),
          key = title + "-" + price;

      if (price.length === 0) {
        withoutPrice.push($el);
      }

      if (map[key]) {
        $el.remove();
        duplicates++;
      } else {
        map[key] = true;
      }
    })

    var withoutPriceRemoved = 0
    if (withoutPrice.length < $list.length) {
      while (withoutPrice.length) {
        withoutPriceRemoved++;
        withoutPrice.pop().remove();
      }
    }
    return duplicates + withoutPriceRemoved;
  }

  var cleanup = function () {
    var $entries = $('.ads-list-table tr'),
        $detailedEntries = $('ul.ads-list-detail li'),
        $photoEntries = $('ul.ads-list-photo li'),
        $objects = $('object'),
        $ads = $('.numbers-placeholder'),
        floatingAds = 0;

    $objects.each(function () {
      var $el = $(this)

      if ($el.parent().css('z-index') === '10000') {
        $el.parent().remove()
        floatingAds++
      }
    })

    $ads.remove();
    nslog($ads.length.toString() + " ads removed");

    if ($objects.length) {
      nslog(floatingAds.toString() + " floating ads removed")
    }

    var table = dedupe($entries, 'h3 a', '.ads-list-table-price'),
        detailed = dedupe($detailedEntries, '.ads-list-detail-item-title a', '.ads-list-detail-item-price'),
        photo = dedupe($photoEntries, '.ads-list-photo-item-title a', '.ads-list-photo-item-price')

    nslog("table view: " + table  + " entries removed")
    nslog("detailed view: " + detailed  + " entries removed")
    nslog("photo view: " + photo  + " entries removed")
  }

  $(document).ready(cleanup)
  $(window).on('pjax:success', function () { cleanup(); })
})();

/*! zAppz - v0.1.0 - 2016-11-04
* https://github.com/5oulz/zAppz
* Copyright (c) 2016 Rafael Venâncio; Licensed MIT */
(function($) {

  // Collection method.
  $.fn.y = function() {
    return this.each(function(i) {
      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

  // Static method.
  $.y = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.y.options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.y.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].y = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));

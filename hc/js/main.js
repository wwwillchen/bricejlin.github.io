$(document).ready(function () {
  setTimeout(function () {
    $('a').click(function (e) {
      e.preventDefault();
      $(this).trigger('hover');
    });
  }, 1000);
});

var refTagger = {
  settings: {
    bibleVersion: "ESV",
    dropShadow: false,
    socialSharing: ["twitter","facebook"]
  }
};

(function(d, t) {
  var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
  g.src = "http://api.reftagger.com/v2/RefTagger.js";
  s.parentNode.insertBefore(g, s);
}(document, "script"));
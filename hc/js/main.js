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

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sWorker.js')
    .then(function (reg) {
      console.log(':D', reg);
    }).catch(function (err) {
      console.log(':(', err);
    });
}

// The address is assembled here so that it is not in the page source as plain text.
(function () {
  var address = ["daniel.hakansson.privat", "gmail.com"].join("@");
  document.querySelectorAll(".email").forEach(function (el) {
    var link = document.createElement("a");
    link.href = "mailto:" + address;
    link.textContent = address;
    el.replaceWith(link);
  });
  document.querySelectorAll(".email-link").forEach(function (el) {
    el.href = "mailto:" + address;
  });
})();

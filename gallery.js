// Image series with arrow buttons. The track is a horizontal scroll-snap strip,
// so swiping works on touch screens without any extra code; the buttons, the
// arrow keys and the counter are layered on top of it.
document.querySelectorAll(".gallery").forEach(function (gallery) {
  var track = gallery.querySelector(".gallery-track");
  var slides = track.querySelectorAll(".slide");
  var prev = gallery.querySelector(".gallery-prev");
  var next = gallery.querySelector(".gallery-next");
  var count = gallery.querySelector(".gallery-count");

  function current() {
    return Math.round(track.scrollLeft / track.clientWidth);
  }

  function go(i) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
  }

  function update() {
    var i = current();
    count.textContent = (i + 1) + " / " + slides.length;
    prev.disabled = i === 0;
    next.disabled = i === slides.length - 1;
    slides.forEach(function (s, k) { s.setAttribute("aria-hidden", k === i ? "false" : "true"); });
  }

  prev.addEventListener("click", function () { go(current() - 1); });
  next.addEventListener("click", function () { go(current() + 1); });
  gallery.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") { go(current() - 1); e.preventDefault(); }
    if (e.key === "ArrowRight") { go(current() + 1); e.preventDefault(); }
  });
  var timer;
  track.addEventListener("scroll", function () {
    clearTimeout(timer);
    timer = setTimeout(update, 60);
  });
  window.addEventListener("resize", update);
  update();
});

document.addEventListener("DOMContentLoaded", function () {
  var overlay = document.createElement("div");
  overlay.id = "img-lightbox";
  overlay.style.cssText = [
    "display:none", "position:fixed", "inset:0", "z-index:9999",
    "background:rgba(0,0,0,0.85)", "cursor:zoom-out",
    "align-items:center", "justify-content:center", "padding:24px",
  ].join(";");
  var img = document.createElement("img");
  img.style.cssText = "max-width:96vw;max-height:96vh;box-shadow:0 4px 32px rgba(0,0,0,0.6);border-radius:4px;";
  overlay.appendChild(img);
  document.body.appendChild(overlay);

  function close() { overlay.style.display = "none"; img.src = ""; }
  overlay.addEventListener("click", close);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });

  document.querySelectorAll(".main-content img, article img, body img").forEach(function (el) {
    if (el.closest("#img-lightbox")) return;
    el.style.cursor = "zoom-in";
    el.addEventListener("click", function () {
      img.src = el.src;
      overlay.style.display = "flex";
    });
  });
});

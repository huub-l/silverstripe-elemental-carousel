'use strict';

document.addEventListener('DOMContentLoaded', function () {
  Array.prototype.slice.call(document.querySelectorAll('[data-element-carousel]')).forEach(function (element) {
    var options = {
      infinite: 1,
      enableMouseEvents: true,
      classNameFrame: "element-carousel-frame",
      classNameSlideContainer: "element-carousel-slides",
      classNamePrevCtrl: "element-carousel-prev",
      classNameNextCtrl: "element-carousel-next"
    }

    var dots = element.querySelector(".element-carousel-dots");

    function stopCurrentVideo(e) {
      if (e.type === "before.lory.slide") {
        var current = element.querySelector(".element-carousel-slide.active");
        var container = current.querySelector(".youtube-embed__container");
        var iframe = current.querySelector("iframe");

        if (container) {
          // Container with custom button
          if (container.classList.contains("is-active")) {
            container.classList.remove("is-active");
            iframe.setAttribute("src", "");
            // Just an iframe
          } else {
            iframe.setAttribute("src", iframe.getAttribute("src"));
          }
        }
      }
    }

    if (dots) {
      function handleDotEvent(e) {
        if (e.type === "after.lory.init") {
          dots.querySelectorAll("li").forEach(function(li) {
            li.addEventListener("click", function(e) {
              carousel.slideTo(Array.prototype.indexOf.call(dots.querySelectorAll("li"), e.target));
            });
          });
        }

        if (e.type === "after.lory.slide") {
          dots.querySelectorAll("li").forEach(function(li) { li.classList.remove("active") });
          dots.querySelectorAll("li")[e.detail.currentSlide - 1].classList.add("active");
        }
      }

      element.addEventListener("after.lory.init", handleDotEvent);
      element.addEventListener("after.lory.slide", handleDotEvent);
      element.addEventListener("before.lory.slide", stopCurrentVideo);
    }

    var carousel = lory(element, options);
  });
});

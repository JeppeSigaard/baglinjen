export default class Lazyload {
  scrollEvent(e) {
    const elems = document.querySelectorAll("[data-bg]");
    elems.forEach((item, i) => {
      const src = item.getAttribute("data-bg");
      const rect = item.getBoundingClientRect();

      if (
        rect.x + rect.width > 0 &&
        rect.x < window.innerWidth &&
        rect.y + rect.height > 0 &&
        rect.y < window.innerHeight
      ) {
        item.removeAttribute("data-bg");
        const placeholder = new Image();

        placeholder.onload = function() {
          item.style.backgroundImage = `url(${src})`;
        };

        placeholder.src = src;
      }
    });
  }
  constructor() {
    setInterval(() => {
      this.scrollEvent();
    }, 250);

    window.addEventListener("scroll", () => {
      requestAnimationFrame(this.scrollEvent.bind(this));
    });
  }
}

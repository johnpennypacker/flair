/******/ (() => { // webpackBootstrap
/*!*********************************!*\
  !*** ./src/blocks/card/card.js ***!
  \*********************************/
/** props: https://inclusive-components.design/cards/ **/

(function () {
  const cards = document.querySelectorAll('.flair-card');
  Array.prototype.forEach.call(cards, card => {
    let down,
      up,
      link = card.querySelector('.title a');
    card.style.cursor = 'pointer';
    card.onmousedown = () => down = +new Date();
    card.onmouseup = () => {
      up = +new Date();
      if (up - down < 200) {
        link.click();
      }
    };
  });
})();
/******/ })()
;
//# sourceMappingURL=card.js.map
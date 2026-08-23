/******/ (() => { // webpackBootstrap
/*!**********************************!*\
  !*** ./src/blocks/alert/view.js ***!
  \**********************************/
/**
 * Front-end behavior for dismissible alerts: clicking the close button hides
 * the alert and stores a cookie so render.php can suppress it on future visits.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */
(function () {
  window.addEventListener('DOMContentLoaded', initAlerts);
  function initAlerts() {
    document.querySelectorAll('.flair-alert-wrapper.is-dismissible[data-flair-alert-cookie]').forEach(bindAlert);
  }
  function bindAlert(wrapper) {
    var closeButton = wrapper.querySelector('.flair-alert-close');
    if (!closeButton) {
      return;
    }
    closeButton.addEventListener('click', function () {
      dismiss(wrapper);
    });
  }
  function dismiss(wrapper) {
    var name = wrapper.dataset.flairAlertCookie;
    var days = parseInt(wrapper.dataset.flairAlertDays, 10) || 60;
    var maxAge = days * 24 * 60 * 60;
    document.cookie = name + '=1; max-age=' + maxAge + '; path=/; SameSite=Lax';
    wrapper.remove();
  }
})();
/******/ })()
;
//# sourceMappingURL=view.js.map
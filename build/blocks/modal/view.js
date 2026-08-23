/******/ (() => { // webpackBootstrap
/*!**********************************!*\
  !*** ./src/blocks/modal/view.js ***!
  \**********************************/
/**
 * Progressively enhances flair/modal blocks into native <dialog> elements, and
 * turns any link whose href points at one into a trigger that opens it.
 *
 * The contract between a trigger and a modal is nothing more than the fragment
 * href — `<a href="#contact">` opens `<div class="flair-modal" id="contact">`.
 * That means core/button, an inline link in a paragraph, and flair's own
 * link-bearing blocks (overlay, card, metric, multibutton-button) are all
 * triggers for free, with no marker class or extra attribute to keep in sync.
 * It also means a trigger can point at a modal rendered anywhere in the
 * document, including one coming from a template part or a synced pattern.
 *
 * Without javascript none of this runs, and `.flair-modal:target` in style.scss
 * reveals the content in place instead.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */
(function () {
  document.addEventListener('DOMContentLoaded', initModals);
  function initModals() {
    var modals = document.querySelectorAll('.flair-modal');
    if (!modals.length) {
      return;
    }
    modals.forEach(enhance);
    document.addEventListener('click', onClick);
    window.addEventListener('hashchange', openFromHash);

    // honours /page/#modal-id as a deep link, the same way the tabs block
    // reveals the panel matching the URL fragment
    openFromHash();
  }

  /**
   * Moves a modal into a <dialog> appended to the end of <body>.
   *
   * The native element is doing the heavy lifting here: focus trapping, Esc to
   * close, marking the rest of the page inert, restoring focus to the trigger
   * on close, and painting in the top layer — which is what keeps the modal
   * clear of z-index fights with layer/overlay/sidler and of any `overflow:
   * hidden` or transformed ancestor it happened to be authored inside.
   *
   * appendChild moves the node rather than copying it, so listeners and the
   * IntersectionObserver registration flair.js makes both survive the move.
   */
  function enhance(modal) {
    var dialog = document.createElement('dialog');
    dialog.className = 'flair-modal-dialog';
    document.body.appendChild(dialog);
    dialog.appendChild(modal);

    // a click landing on the dialog itself is a click on the backdrop —
    // the content is all in descendants
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) {
        close(dialog);
      }
    });
    modal.classList.add('is-enhanced');
  }
  function onClick(e) {
    var link = e.target.closest ? e.target.closest('a[href]') : null;
    if (!link) {
      return;
    }

    // the close control inside an open modal
    if (link.classList.contains('flair-modal-close')) {
      var openDialog = link.closest('dialog');
      if (openDialog) {
        e.preventDefault();
        close(openDialog);
      }
      return;
    }
    var modal = modalFor(link);
    if (!modal) {
      return;
    }

    // deliberately does not update location.hash: leaving the URL alone
    // avoids a scroll jump behind the dialog and keeps the back button
    // meaning "previous page" rather than "close the modal"
    e.preventDefault();
    open(modal);
  }

  /**
   * Resolves the modal a link points at, or null if it isn't a modal trigger.
   * Reads the resolved href so a full same-page URL works as well as a bare
   * fragment — the editor writes `#id`, but an author may well paste the long
   * form in by hand.
   */
  function modalFor(link) {
    var url;
    try {
      url = new URL(link.href, window.location.href);
    } catch (err) {
      return null;
    }
    if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) {
      return null;
    }
    return modalById(url.hash.slice(1));
  }

  /**
   * The modal with this ID, or the one containing the element with this ID so
   * that links pointing at something *inside* a modal open it too.
   */
  function modalById(id) {
    if (!id) {
      return null;
    }
    var target = document.getElementById(id);
    if (!target) {
      return null;
    }
    return target.classList.contains('flair-modal') ? target : target.closest('.flair-modal');
  }
  function open(modal) {
    var dialog = modal.closest('dialog');
    if (!dialog || dialog.open) {
      return;
    }
    dialog.showModal();
  }
  function close(dialog) {
    dialog.close();
  }
  function openFromHash() {
    var modal = modalById(window.location.hash.slice(1));
    if (modal) {
      open(modal);
    }
  }
})();
/******/ })()
;
//# sourceMappingURL=view.js.map
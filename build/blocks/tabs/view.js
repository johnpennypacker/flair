/******/ (() => { // webpackBootstrap
/*!*********************************!*\
  !*** ./src/blocks/tabs/view.js ***!
  \*********************************/
/**
 * Progressively enhances the tabs block from its table-of-contents
 * fallback markup into an accessible tabbed interface.
 *
 * @see https://inclusive-components.design/tabbed-interfaces/
 */
(function () {
  var uid = 0;
  document.addEventListener("DOMContentLoaded", initTabs);
  function initTabs() {
    var containers = document.querySelectorAll(".flair-tabs");
    containers.forEach(enhance);
    switchToHash();
    window.addEventListener("hashchange", switchToHash);
  }
  function enhance(container) {
    var tablist = container.querySelector(".flair-tabs-list");
    if (!tablist) {
      return;
    }
    var tabs = tablist.querySelectorAll("a");
    var panels = container.querySelectorAll(":scope > .flair-tab");
    if (!tabs.length || tabs.length !== panels.length) {
      return;
    }
    tablist.setAttribute("role", "tablist");
    tabs.forEach(function (tab, i) {
      var panel = panels[i];

      // panels without a label or anchor arrive without an ID
      if (!panel.id) {
        uid++;
        panel.id = "flair-tab-" + uid;
        tab.setAttribute("href", "#" + panel.id);
      }
      tab.id = "tab-" + panel.id;
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-selected", "false");
      tab.setAttribute("tabindex", "-1");
      tab.parentNode.setAttribute("role", "presentation");
      tab.addEventListener("click", function (e) {
        e.preventDefault();
        switchTab(container, tab, true);
      });
      tab.addEventListener("keydown", function (e) {
        keydown(e, container, tabs, panels, i);
      });
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("tabindex", "-1");
      panel.setAttribute("aria-labelledby", tab.id);
      panel.hidden = true;

      // the tab labels the panel now, the fallback heading is redundant
      var label = panel.querySelector(".flair-tab-label");
      if (label) {
        label.hidden = true;
      }
    });
    tabs[0].removeAttribute("tabindex");
    tabs[0].setAttribute("aria-selected", "true");
    panels[0].hidden = false;
    container.classList.add("is-enhanced");
  }
  function keydown(e, container, tabs, panels, i) {
    var target = null;
    switch (e.key) {
      case "ArrowLeft":
        target = tabs[i - 1];
        break;
      case "ArrowRight":
        target = tabs[i + 1];
        break;
      case "Home":
        target = tabs[0];
        break;
      case "End":
        target = tabs[tabs.length - 1];
        break;
      case "ArrowDown":
        e.preventDefault();
        panels[i].focus();
        return;
    }
    if (target) {
      e.preventDefault();
      switchTab(container, target, true);
    }
  }
  function panelFor(tab) {
    return document.getElementById(tab.getAttribute("href").substring(1));
  }
  function switchTab(container, newTab, setFocus) {
    var tablist = container.querySelector('[role="tablist"]');
    var oldTab = tablist.querySelector('[aria-selected="true"]');
    if (oldTab && oldTab !== newTab) {
      oldTab.setAttribute("aria-selected", "false");
      oldTab.setAttribute("tabindex", "-1");
      panelFor(oldTab).hidden = true;
    }
    newTab.setAttribute("aria-selected", "true");
    newTab.removeAttribute("tabindex");
    panelFor(newTab).hidden = false;
    if (setFocus) {
      newTab.focus();
    }
  }

  // reveals & focuses the tab matching the URL fragment, so links
  // like <a href="#panel-id"> work from anywhere — including links
  // to elements inside a hidden panel
  function switchToHash() {
    var hash = window.location.hash.substring(1);
    if (!hash) {
      return;
    }
    var target = document.getElementById(hash);
    if (!target) {
      return;
    }
    var tab = null;
    if ("tab" === target.getAttribute("role")) {
      tab = target;
    } else {
      var panel = target.closest(".flair-tab");
      if (panel) {
        tab = document.getElementById("tab-" + panel.id);
      }
    }
    if (!tab) {
      return;
    }
    switchTab(tab.closest(".flair-tabs"), tab, true);
  }
})();
/******/ })()
;
//# sourceMappingURL=view.js.map
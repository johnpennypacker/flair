/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!********************************!*\
  !*** ./src/fadie/variation.js ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

/**
 *
 */

const {
  registerBlockVariation
} = wp.blocks;
const {
  __
} = wp.i18n;
registerBlockVariation('core/cover',
// Original block name
{
  name: 'fadie',
  title: __('Fadie', 'flair'),
  description: __('A fullscreen segment with blurring background on scroll.', 'flair'),
  isDefault: false,
  category: 'flair',
  attributes: {
    className: 'flair-fadie',
    minHeight: 100,
    minHeightUnit: "vh"
  },
  innerBlocks: [['core/group', {
    "style": {
      "dimensions": {
        "minHeight": "150vh"
      }
    },
    "layout": {
      "type": "flex",
      "orientation": "vertical",
      "verticalAlignment": "center"
    }
  }, [['core/paragraph', {
    "align": "center",
    "placeholder": "Write title…"
  }]]]],
  scope: ['inserter'],
  icon: {
    src: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
        fill: "currentColor",
        d: "M21,2H3c-.55,0-1,.45-1,1v18c0,.55.45,1,1,1h18c.55,0,1-.45,1-1V3c0-.55-.45-1-1-1Z"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
        fill: "#fff",
        d: "M3.5,3.5v11l1.5-.35v-5.15c1.45,0,2.75,2.78,3.02,4.44l.18-.04c.29-1.13,1.2-3.47,3.8-3.47,2.08,0,3.07.91,3.56,1.73l.59-.14c.39-2.35,1.52-5.53,2.86-5.53v4.85l1.5-.35V3.5H3.5ZM8.8,8.76c-.96,0-1.74-.78-1.74-1.74s.78-1.74,1.74-1.74,1.74.78,1.74,1.74-.78,1.74-1.74,1.74Z"
      })]
    })
  },
  isActive: blockAttributes => {
    // check that the value exists; otherwise default covers break
    if (!blockAttributes || !blockAttributes.className) {
      return;
    }
    return blockAttributes.className.includes('flair-fadie');
  }
});
})();

/******/ })()
;
//# sourceMappingURL=variation.js.map
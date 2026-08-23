/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/modal/edit.js"
/*!**********************************!*\
  !*** ./src/blocks/modal/edit.js ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit),
/* harmony export */   sanitizeModalId: () => (/* binding */ sanitizeModalId)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./editor.scss */ "./src/blocks/modal/editor.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */





/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Keeps an author-typed ID to what is legal in an `id` attribute and a URL
 * fragment. Mirrors flair_modal_id() in render.php — the two have to agree, or a
 * trigger written in the editor won't match the ID rendered on the front end.
 */

const sanitizeModalId = value => value.replace(/[^A-Za-z0-9_-]/g, '');

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
function Edit(props) {
  const {
    attributes,
    setAttributes,
    clientId
  } = props;
  const {
    modalId,
    label
  } = attributes;

  // Triggers address this modal by ID, so it is assigned once, on insert, and
  // then lives in saved post content — unlike clientId, which is re-generated
  // every time the editor loads and can't be relied on to stay stable.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!modalId) {
      setAttributes({
        modalId: `modal-${clientId.slice(0, 8)}`
      });
    }
  }, [modalId, clientId, setAttributes]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Modal properties', 'flair'),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Label', 'flair'),
            help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Names the dialog for screen readers, and identifies this modal when picking one from a button.', 'flair'),
            value: label || '',
            onChange: value => {
              setAttributes({
                label: value
              });
            },
            __next40pxDefaultSize: true,
            __nextHasNoMarginBottom: true
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Modal ID', 'flair'),
            help: modalId ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)(/* translators: %s: the URL fragment that opens this modal, e.g. #contact */
            (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Any link pointing at %s opens this modal. Changing it breaks links that already point here.', 'flair'), `#${modalId}`) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Any link pointing at this ID opens this modal.', 'flair'),
            value: modalId || '',
            onChange: value => {
              setAttributes({
                modalId: sanitizeModalId(value)
              });
            },
            __next40pxDefaultSize: true,
            __nextHasNoMarginBottom: true
          })
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
        className: 'flair-modal'
      }),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "flair-modal-content",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks, {
          defaultBlock: {
            name: 'core/paragraph',
            attributes: {
              placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Modal content…', 'flair')
            }
          },
          directInsert: true
        })
      })
    })]
  });
}

/***/ },

/***/ "./src/blocks/modal/index.js"
/*!***********************************!*\
  !*** ./src/blocks/modal/index.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/blocks/modal/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/blocks/modal/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/blocks/modal/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/blocks/modal/block.json");
/* harmony import */ var _trigger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./trigger */ "./src/blocks/modal/trigger.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */




/**
 * Adds the "Opens a modal" control to core/button. It lives here, rather than in
 * its own module under src/, because a block's editorScript is loaded in the
 * editor whenever the block type is registered — which keeps all of the modal
 * code in one directory and needs no webpack entry or PHP of its own.
 */


const icon = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: "24",
  height: "24",
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("path", {
    fill: "currentColor",
    d: "M3,4H21A1,1,0,0,1,22,5V19a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V5A1,1,0,0,1,3,4ZM4,6V18H20V6Z"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("rect", {
    fill: "currentColor",
    x: "6",
    y: "9",
    width: "12",
    height: "2"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("rect", {
    fill: "currentColor",
    x: "6",
    y: "13",
    width: "7",
    height: "2"
  })]
});

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  icon,
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ },

/***/ "./src/blocks/modal/save.js"
/*!**********************************!*\
  !*** ./src/blocks/modal/save.js ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * The block is rendered dynamically on the server (see render.php) so the theme
 * can override its markup through flair_use_template(), but its content still
 * needs to be persisted to post content in the normal way so it can be parsed
 * and passed to render.php as `$content`. `InnerBlocks.Content` does that.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 */


function save() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InnerBlocks.Content, {});
}

/***/ },

/***/ "./src/blocks/modal/trigger.js"
/*!*************************************!*\
  !*** ./src/blocks/modal/trigger.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./edit */ "./src/blocks/modal/edit.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__);
/**
 * Adds an "Opens a modal" control to core/button.
 *
 * This is an authoring convenience and nothing more: all it does is write a
 * fragment href (`#contact`) into the button's own `url` attribute, which is the
 * whole trigger contract (see view.js). Nothing downstream depends on this file
 * having run — a hand-typed fragment works identically — so there is no custom
 * attribute on core/button and therefore no block-validation risk.
 *
 * Scope: the dropdown lists modals in the post currently being edited.
 * getBlocksByName() reads the current editor's block tree, so a modal living in
 * a template part or a synced pattern is invisible to it even though it works
 * perfectly well at runtime. The free-text field below covers those cases.
 */










const CUSTOM = 'flair-custom-modal-id';
function ModalTriggerPanel({
  attributes,
  setAttributes
}) {
  const {
    url
  } = attributes;
  const modals = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    const {
      getBlocksByName,
      getBlock
    } = select(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.store);
    if (!getBlocksByName) {
      return [];
    }
    return getBlocksByName('flair/modal').map(clientId => {
      const {
        modalId,
        label
      } = getBlock(clientId)?.attributes ?? {};
      return {
        id: modalId ?? '',
        label: label || modalId || ''
      };
    }).filter(modal => modal.id);
  }, []);

  // A button is a modal trigger when its URL is a bare fragment.
  const currentId = url && url.startsWith('#') ? url.slice(1) : '';
  const isKnown = modals.some(modal => modal.id === currentId);

  // Whether the free-text field is showing. It can't be derived from the URL
  // alone, because choosing the option is itself the thing that reveals the
  // field to type an ID into, and until then there is no URL to read.
  const [isCustom, setIsCustom] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useState)(false);

  // An ID that no modal in this post accounts for was typed by hand, or points
  // at a template part — either way the free-text field is the one that fits it.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useEffect)(() => {
    if (currentId && !isKnown) {
      setIsCustom(true);
    }
  }, [currentId, isKnown]);
  const setModal = id => {
    setAttributes({
      url: id ? `#${id}` : undefined
    });
  };
  const options = [{
    value: '',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('— None —', 'flair')
  }, ...modals.map(modal => ({
    value: modal.id,
    label: modal.label
  })), {
    value: CUSTOM,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('A modal elsewhere on the page…', 'flair')
  }];
  const selected = isCustom ? CUSTOM : currentId;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Modal', 'flair'),
      initialOpen: !!currentId,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Opens a modal', 'flair'),
          help: modals.length ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Modals in this post. Clicking the button opens the one you pick instead of following its link.', 'flair') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('No modal blocks in this post yet. Add one, or point this button at a modal elsewhere on the page.', 'flair'),
          value: selected,
          options: options,
          onChange: value => {
            if (CUSTOM === value) {
              setIsCustom(true);
              return;
            }
            setIsCustom(false);
            setModal(value);
          },
          __next40pxDefaultSize: true,
          __nextHasNoMarginBottom: true
        })
      }), isCustom && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Modal ID', 'flair'),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('For a modal that lives in a template part or a synced pattern, type its ID here.', 'flair'),
          value: currentId,
          onChange: value => {
            setModal((0,_edit__WEBPACK_IMPORTED_MODULE_8__.sanitizeModalId)(value));
          },
          __next40pxDefaultSize: true,
          __nextHasNoMarginBottom: true
        })
      })]
    })
  });
}
const withModalTrigger = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__.createHigherOrderComponent)(BlockEdit => props => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.Fragment, {
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(BlockEdit, {
    ...props
  }), 'core/button' === props.name && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(ModalTriggerPanel, {
    ...props
  })]
}), 'withModalTrigger');
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('editor.BlockEdit', 'flair/modal-trigger', withModalTrigger);

/**
 * Puts the post's modals into the link picker's suggestions.
 *
 * The inspector control above is only reachable once you already know to look
 * for it. The link popover — the chain icon on a button, or Cmd-K on a
 * selection — is where an author actually goes to point something somewhere, so
 * modals need to turn up there, listed alongside pages and posts.
 *
 * Core builds those suggestions from the `__experimentalFetchLinkSuggestions`
 * editor setting and exposes no filter for it, so the only way in is to wrap the
 * function the editor installed and prepend our own results. Being experimental,
 * it is treated as optional throughout: if the setting ever disappears or is
 * renamed, nothing here runs and the fragment-href contract is unaffected.
 *
 * This benefits every link UI at once, not just core/button — inline links in a
 * paragraph, and flair's own link-bearing blocks, all read the same setting.
 */

const WRAPPED = '__flairModalSuggestions';

/**
 * The modals in this post that match what the author has typed so far, shaped
 * the way LinkControl expects a suggestion to look.
 */
function modalSuggestions(search) {
  const {
    getBlocksByName,
    getBlock
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.select)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.store);
  if (!getBlocksByName) {
    return [];
  }

  // Someone typing a URL is not looking for a modal.
  if (/^(https?:)?\/\//i.test(search)) {
    return [];
  }

  // An author looking for a modal may well type the leading # of the fragment.
  const term = (search || '').replace(/^#/, '').toLowerCase();
  return getBlocksByName('flair/modal').map(clientId => getBlock(clientId)?.attributes ?? {}).filter(({
    modalId
  }) => modalId).filter(({
    modalId,
    label
  }) => !term || modalId.toLowerCase().includes(term) || (label || '').toLowerCase().includes(term)).map(({
    modalId,
    label
  }) => ({
    id: `flair-modal-${modalId}`,
    url: `#${modalId}`,
    title: label || modalId,
    type: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Modal', 'flair'),
    kind: 'flair-modal'
  }));
}
function wrapFetchLinkSuggestions(original) {
  const wrapped = async (search, ...rest) => {
    let suggestions = [];

    // Core's own results still matter — a failure fetching them shouldn't
    // take the modal suggestions down with it.
    try {
      suggestions = (await original(search, ...rest)) || [];
    } catch (error) {
      suggestions = [];
    }
    return [...modalSuggestions(search), ...suggestions];
  };
  wrapped[WRAPPED] = true;
  return wrapped;
}
function installLinkSuggestions() {
  const {
    __experimentalFetchLinkSuggestions: current
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.select)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.store).getSettings();

  // Nothing to wrap, or ours is already in place. The second case is what stops
  // the updateSettings() below from re-triggering this subscriber forever.
  if ('function' !== typeof current || current[WRAPPED]) {
    return;
  }
  (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.dispatch)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.store).updateSettings({
    __experimentalFetchLinkSuggestions: wrapFetchLinkSuggestions(current)
  });
}
_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_5___default()(() => {
  installLinkSuggestions();

  // The editor replaces its settings wholesale in some flows (switching to a
  // template, opening a synced pattern), which would drop the wrapper.
  (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.subscribe)(installLinkSuggestions, _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.store);
});

/***/ },

/***/ "./src/blocks/modal/editor.scss"
/*!**************************************!*\
  !*** ./src/blocks/modal/editor.scss ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/blocks/modal/style.scss"
/*!*************************************!*\
  !*** ./src/blocks/modal/style.scss ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ },

/***/ "@wordpress/block-editor"
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
(module) {

module.exports = window["wp"]["blockEditor"];

/***/ },

/***/ "@wordpress/blocks"
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
(module) {

module.exports = window["wp"]["blocks"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/compose"
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["compose"];

/***/ },

/***/ "@wordpress/data"
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["data"];

/***/ },

/***/ "@wordpress/dom-ready"
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
(module) {

module.exports = window["wp"]["domReady"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "@wordpress/hooks"
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
(module) {

module.exports = window["wp"]["hooks"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ },

/***/ "./src/blocks/modal/block.json"
/*!*************************************!*\
  !*** ./src/blocks/modal/block.json ***!
  \*************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"flair/modal","version":"0.1.0","title":"Modal","category":"flair","description":"Content that opens in a dialog when a link or button pointing at it is clicked.","keywords":["modal","dialog","lightbox","popup"],"textdomain":"flair","attributes":{"modalId":{"type":"string","default":""},"label":{"type":"string","default":""}},"supports":{"align":false,"anchor":false,"color":{"text":true,"background":true,"gradients":true,"link":true},"html":false,"shadow":true,"spacing":{"margin":false,"padding":true,"blockGap":true},"typography":{"fontSize":true,"lineHeight":true}},"example":{"attributes":{"label":"More information"},"innerBlocks":[{"name":"core/paragraph","attributes":{"content":"The content of the dialog would go here."}}]},"editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php","viewScript":"file:./view.js"}');

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"blocks/modal/index": 0,
/******/ 			"blocks/modal/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkflair"] = globalThis["webpackChunkflair"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["blocks/modal/style-index"], () => (__webpack_require__("./src/blocks/modal/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map
# Changelog

All notable changes to the **Flair** plugin are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- The `carousel` block previews its arrows and dots in the editor, and they
  follow the "Show Arrow Buttons" and "Show Dots" toggles. On the front end
  `view.js` builds those controls at runtime, and a `viewScript` never runs in
  the editor, so until now both toggles changed nothing an author could see.
  `edit.js` now writes the same wrapper markup and the same classes the template
  does, which also lets `style.scss` dress the preview — the arrows and dots are
  drawn by the shipping stylesheet, not an editor-only copy of it.
  The preview is inert (`aria-hidden`, not focusable, no pointer events) so a
  click on an arrow still selects the block.
- The `carousel` block previews "Slides per page" in the editor. `edit.js` never
  emitted the `single`/`double`/`triple` class the setting maps to, and the
  `editor.scss` rules meant to size the slides were keyed on
  `var( --carousel_gap )`, which nothing in the plugin or a theme defines — so
  every carousel previewed one slide per screen whatever the toggle said.
- The `alert` block supports layout, so it carries the "Inner blocks use content
  width" toggle and defaults to constrained. A full-width alert now keeps its
  text on the page's content column instead of running edge to edge.

### Fixed
- Font family is selectable on the `eyebrow` block. It declared
  `typography.fontFamily`, but core still reads the support as
  `typography.__experimentalFontFamily`, so nothing was registered — no
  attribute, no control, no serialization. Added `__experimentalDefaultControls`
  alongside it so Size and Font show in the Typography panel rather than only
  under its ⋮ menu.

## [0.4.0] - 2026-08-21

### Added
- New `modal` block: InnerBlocks content that opens in a native `<dialog>`.
  A modal is opened by any link whose href is a fragment pointing at its ID
  (`<a href="#contact">`), which makes `core/button`, inline links, and flair's
  own link-bearing blocks (overlay, card, metric, multibutton-button) triggers
  without any extra attribute — including for a modal living in a template part
  or a synced pattern.
- Modals are offered as suggestions in the link popover, badged "Modal" and
  listed above pages, so pointing a button or an inline link at one is the same
  gesture as linking to a page. Matching accepts the modal's label or its ID,
  with or without a leading `#`, and is suppressed once what you've typed looks
  like a URL. The suggestion is drawn with the modal block's own icon and the
  same row height as a page, since core only draws icons for its own five post
  types and gives no way to supply one — see `editor.scss`.
- An "Opens a modal" control on `core/button`, listing the modals in the post
  being edited plus a free-text field for one defined elsewhere — the way to
  reach a modal that lives in a template part, which the suggestions can't see.
  Both only write the fragment href, so a hand-typed one behaves identically.

### Notes
- The block renders in the flow of the document and `view.js` promotes it into a
  `<dialog>` on load, so without javascript a trigger's fragment still resolves
  and `.flair-modal:target` reveals the content in place. Using the native
  element brings focus trapping, Esc, inertness, focus restoration, and top-layer
  painting (no z-index conflicts with layer/overlay/sidler/fixie) for free.
- Scrolling behind an open modal is locked by `html:has( .flair-modal-dialog[open] )`
  rather than a class toggled from javascript, so every close path unlocks it and
  a missed event can't strand the page unscrollable.
- `template-parts/modal.php` echoes its inner content unfiltered, unlike other
  flair templates — `wp_kses_post()` strips iframes and form controls, which are
  most of what modals contain. See CLAUDE.md.

## [0.3.0] - 2026-07-22

### Added
- `CLAUDE.md` with build, architecture, and convention notes.
- This changelog.
- New `alert` block: a color/typography-enabled notice with InnerBlocks content
  and an optional dismissible close button. Dismissal is remembered via a
  60-day cookie, checked server-side so a dismissed alert isn't rendered at all
  on subsequent visits.

### Changed
- iconic styles now register as a proper stylesheet and are enqueued only when a
  block uses the `iconic` class, instead of being inlined on every front-end request.
- Cleaned up `readme.txt` (removed Create-Block boilerplate, synced changelog/versions).

### Fixed
- Editor-only enqueue callbacks for iconic and kinetic are now gated with `is_admin()`,
  preventing their CSS from being added twice on the front end.
- Hardened the overlay block: `overlayColor` is validated against a CSS color
  allow-list and `overlayOpacity` is cast to a float before being emitted as an
  inline custom property, preventing CSS-value injection.
- Removed dead `NaN`-producing code in `flair.js`.
- Fixed `tab-index` → `tabindex` typo in the multibutton template.
- Guarded unguarded attribute reads (metric, card, overlay, carousel templates)
  to avoid PHP warnings on missing attributes.
- Overlay block: only the title text was clickable even though the whole card
  showed a pointer cursor. Added `overlay.js` (mirroring the `card.js`
  inclusive-card click-delegation pattern) so a click anywhere on the card
  activates the title link, without blocking text selection or nested links
  the way a CSS stretched-link overlay would.

## [0.2.0] - 2026-06-25

> Backfilled entry. Versions prior to a maintained changelog are approximate.

### Added
- Custom blocks: card, carousel, carousel-slide, tabs, tab, metric, milestone,
  boxout, eyebrow, layer, multibutton, multibutton-button, overlay, sidler, stack.
- Core-block enhancements/variations: fadie (cover), fixie, iconic, kinetic, zoomer (image).
- Theme template override system via `flair_use_template()`.
- `core/columns` "List" style and a columns-to-list render filter.

## [0.1.0]

### Added
- Initial release.

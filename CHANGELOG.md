# Changelog

All notable changes to the **Flair** plugin are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0]

### Added
- Entrance animations are configurable. Every block has an "Entrance animation"
  panel (Site default / None / a preset), written onto the block's outer element
  as `data-flair-animate` at render time, so saved markup doesn't change. *None*
  turns the animation off for the block and everything inside it. Themes choose
  what animates by default with the `flair_animation_defaults` filter, set timing
  in `theme.json` under `settings.custom.flair.animation`, and add presets with
  `flair_animation_presets` plus a `@keyframes flair-entrance-<name>`. See
  THEMING.md §5. The defaults pick out the same elements the old code did.
- Three more entrance presets: `zoom` (fades in while scaling up from 0.95),
  `wipe` (clips open from the inline-start edge, reverses in RTL, and follows
  the scroll rather than playing once, with a play-once fallback) and `blur`
  (fades in from an 8px blur). `theme.json` can tune them with `scale` and
  `blur`.
- `prefers-reduced-motion: reduce` turns every entrance into a plain fade.
- Content already on screen when the page loads no longer animates in. It used
  to be hidden as soon as `flair.js` ran and then revealed, which delayed the
  first screen. Some visitors also saw it appear, vanish and come back. If the
  browser restores a scroll position after `flair.js` has measured (back
  button, reload), content at that position still animates in.

### Changed
- The entrance animation no longer sets `transform` or `transition` on the
  element. It plays a keyframes animation that moves with `translate` and
  `rotate` and pins nothing once it has played. `rise` reproduces the old reveal:
  the same 4rem/1° climb over 400ms, with opacity stepped through the old
  ease-in curve (fully opaque at 300ms). An element's own transform
  (`.slant`, say) and transitions survive, and revealed elements are no longer
  left with an identity transform. That transform made each of them a stacking
  context and a containing block for `position: fixed` descendants. The
  `overflow-x: clip` the old reveal added to every element is gone too.
- Stagger is no longer capped at three. Siblings that come into view together
  are delayed one after another, and the count starts over at each visual row,
  so a grid ripples row by row and a row that scrolls in later starts fresh.
- The scroll-position observer in `flair.js` now watches only elements that opt
  in with `.flair-io`, which are fixie, metric and sidler. It used to watch every
  cover, figure, section, footer and column on the page, writing nine values on
  each of 101 steps, and it forced a layout for each element it updated. It now
  writes three, and the data attributes only when they change. A theme that wants
  the data on an element of its own adds `.flair-io`.
- Fixie opts in with `.flair-io` like the others. New fixies save it in their
  class list. Older ones get it added as the page renders, until they're
  re-saved (see `todo.txt`).

- The committed `build/` is now a production build: minified, with no source
  maps, about 800 KB instead of 1.8 MB. The deploy check rebuilds with
  `npm run build` to match.

### Removed
- `data-was-visible`, `--was-visible`, `--from-top`, `--pct-from-top`,
  `--height`, `--vh` and `--intersecting`. Nothing in Flair or its themes read
  them. `data-intersection`, `data-is-intersecting` and `--intersection-ratio`
  remain, on `.flair-io` elements only.

### Fixed
- `flair-editor.js` no longer loads on public pages. It was enqueued on
  `enqueue_block_assets`, which fires on the front end as well as in the editor,
  and it now uses `enqueue_block_editor_assets`. The front-end stylesheet still
  reaches the editor canvas through `enqueue_block_assets`.
- Each script is versioned by its own asset file. `flair.js` was using
  `flair-editor.js`'s, so its `?ver=` didn't change when it did, which let
  browsers keep a stale copy. It also pulled `wp-hooks` and `wp-i18n` onto every
  public page. `flair-editor.js` and `kinetic.js` had the same mix-up. The
  `flair` and `iconic` stylesheets have no asset file and are versioned by
  modification time.
- Group blocks offer every alignment again. The filter that enables them waited
  for window `load`, by which time core/group was already registered, so it
  never applied.

## [2.0.0]

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
- The `multibutton` block paints a background. It always declared
  `color.background` and `color.text`, and `THEMING.md` already promised
  `--flair-color-secondary` as "multibutton background", but the value was
  assigned to a `--bg` custom property that nothing read — so the block rendered
  as bare text over the page, and an open dropdown was unreadable because the
  options overlay whatever is beneath them. The default now lives in
  `--flair-multibutton-background` and is painted; `.dropdown` and `.options`
  inherit it, so setting that one property recolours the whole control, and an
  author's Background choice still wins over it.
- The `multibutton-button` block has Background and Text colour controls, so an
  individual option can be styled — a destructive choice in red, say. Both
  default to nothing: a transparent option over the multibutton's own surface,
  with the multibutton's text colour inherited. Related: the option's hover tint
  is now an inset shadow rather than a `backdrop-filter`, which only ever
  reached what was painted *behind* the option and so would have been hidden by
  any background colour set on it.

- The `overlay` block has a focal point picker, in the settings panel below the
  aspect ratio it exists to serve. The overlay's image is always cropped —
  `object-fit: cover` inside an absolutely positioned `.media` — so before this
  the crop was fixed at the centre and an author whose subject sat off-centre
  had to re-crop the file. The picker writes `--flair-focal-point` onto the
  block wrapper and `style.scss` reads it as `object-position`, defaulting to
  `50% 50%`, so an overlay that never had a focal point picked carries no style
  attribute of its own and a theme can still override the crop with one class.
  `flair_focal_point_position()` in `flair.php` does the clamping and formatting
  so a theme's template override gets it for free.

### Fixed
- The `overlay` block's eyebrow and inner blocks can be clicked in the editor.
  The stretched link (`.title a::after`, `inset: 0`) covered the whole overlay,
  so every click landed on the title's RichText; both were reachable by keyboard,
  which made it look like a focus bug rather than a stacking one. The front end
  rescues the inner blocks with `.misc { z-index: 2 }`, but `edit.js` renders
  `InnerBlocks` straight into `.text` with no `.misc` wrapper, and nothing ever
  rescued the eyebrow. `editor.scss` now stands the layer down, the same way
  `card`'s already did — nothing in the editor navigates, so no overlay-wide
  link is lost. The `::before` shadow layer and the colour wash are taken out of
  hit testing there too.
- The `multibutton` looks the same in the editor as it does on the front end.
  `edit.js` rendered a different tree from `template-parts/multibutton.php`: a
  visible "Other options" label where the template has a screen-reader-only one,
  which stretched the toggle across the block instead of leaving it square; a
  `<span>` where the template has the action `<a>`, which missed the padding
  keyed on `.dropdown a`; and no `has-js`, so the options sat in the flow and
  the closed block was several times its rendered height. The editor now emits
  the template's markup and classes, selecting the block opens the dropdown the
  way clicking the toggle does, and `editor.scss` is down to the block
  appender and the wrappers the block list inserts.
- `multibutton-button` supports reach the front end. Its template wrote its own
  `class` attribute and never called `get_block_wrapper_attributes()`, so the
  block's text alignment — and now its colours — were serialized into the post
  and then dropped at render time.
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

## [0.3.1]

### Fixed
- Fixed scroll-reveal effect (`[data-was-visible]`) applying its `transform` to `header`/`nav` elements, which created a new CSS containing block and broke `position: fixed` overlays nested inside them — most visibly, WP core Navigation block's mobile hamburger menu would toggle open but render collapsed to the icon's own size instead of filling the screen. Removed `header`/`nav` from the scroll-reveal observer's selector.

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

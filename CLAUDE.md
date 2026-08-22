# CLAUDE.md

Guidance for Claude Code (and humans) working in this repository.

## What this is

**Flair** is a WordPress plugin ("Fanciful add-ons. Take two.") that ships a
collection of custom Gutenberg blocks plus several block *variations* and
*enhancements* that decorate WordPress core blocks. Author: John Pennypacker.
Current version: `0.2.0`. Requires WP 6.7+, PHP 7.4+.

## Build & tooling

This is a `@wordpress/scripts` project. Source lives in `src/`, compiled output
in `build/`. **`build/` is committed** because it is what the plugin actually
loads at runtime (`flair.php` includes from `build/`).

```bash
npm install
npm run start    # watch/dev build (--blocks-manifest --webpack-copy-php)
npm run build    # production build
npm run lint:js  # eslint via wp-scripts
npm run lint:css # stylelint via wp-scripts
npm run format   # prettier via wp-scripts
```

After editing anything under `src/`, you **must** run a build so the matching
file in `build/` is regenerated — editing `build/` directly will be overwritten.

## Architecture

`flair.php` is the entry point. It:
- defines `FLAIR_PATH` / `FLAIR_URL`,
- `include`s the standalone modules under `build/{fadie,fixie,iconic,kinetic,zoomer}`,
- registers all blocks from `build/blocks-manifest.php` (WP 6.7/6.8 metadata-collection API),
- enqueues the shared `flair-core` script + stylesheet,
- adds a "Flair" block category,
- adds extra `core/columns` / `core/image` / `core/cover` behaviors.

### Two kinds of feature
1. **Custom blocks** — `src/blocks/<name>/` with `block.json`, `edit.js`,
   `render.php` (dynamic, server-rendered), styles. Examples: `card`, `carousel`,
   `carousel-slide`, `tabs`, `tab`, `metric`, `milestone`, `boxout`, `eyebrow`,
   `layer`, `modal`, `multibutton`, `multibutton-button`, `overlay`, `sidler`,
   `stack`.
2. **Variations / enhancements of core blocks** — `src/{fadie,fixie,iconic,kinetic,zoomer}/`.
   These attach to core blocks via `render_block_core/*` filters or
   `get_block_type_variations` and are toggled by a CSS class (e.g. `ok-zoomer`,
   `flair-fadie`).

### Theming / template override system
Block `render.php` files are intentionally thin — they delegate to
`flair_use_template( $template_name, $attributes, $block, $content )` in
`flair.php`, which lets a **theme override** the markup by providing
`flair/<name>.php` (or `template-parts/flair/<name>.php`). The plugin's own
fallback markup lives in top-level `template-parts/<name>.php`. Inside those
templates, variables arrive as `$args['attributes']`, `$args['content']`,
`$args['block']`.

When adding a new server-rendered block, follow the existing pattern: a thin
`render.php` calling `flair_use_template`, plus a `template-parts/<name>.php`.

**`THEMING.md` is the contract with themes** — the custom properties a theme is
expected to define, which of Flair's structure is load-bearing (the `::before`
layers, the stretched link, and the z-index layering that keeps card text
selectable), and when a template override beats fighting the cascade. Read it
before changing a block's markup or its z-index/positioning, because several of
those are holding up behaviour rather than appearance. `THEMING-FRICTION.md`
records the findings it came from.

## Conventions

- **Escaping**: text → `esc_html`, URLs → `esc_url`, attributes → `esc_attr`,
  inner block content → `wp_kses_post`. Keep this up in every template.
  **One deliberate exception**: `template-parts/modal.php` echoes `$args['content']`
  unfiltered. `wp_kses_post()` strips `<iframe>`, `<form>`, `<input>` and `<select>`,
  which is every video embed and every form — i.e. most of what a modal is *for*.
  (Measured: it reduces a YouTube iframe plus a subscribe form to the single
  character `a`.) The content is inner-block HTML WordPress has already rendered,
  and post content was kses-filtered *on save* for any user without
  `unfiltered_html`, so re-filtering at render time adds no protection. Core's own
  dynamic blocks echo `$content` directly for the same reason. Don't "fix" this.
- **Dynamic HTML tag names** (headings, wrapper elements) are validated against
  an allow-list before being echoed — preserve that (`in_array($x, ['h1'..'h6'], true)`).
- Wrapper attributes come from `get_block_wrapper_attributes([...])`.
- Text domain is `flair`.

## Gotchas

- **Modal triggers are just fragment links.** A `flair/modal` is opened by any
  `<a href="#its-id">` — there is no trigger attribute, marker class, or
  registration to grep for, so nothing links a button to a modal except the URL.
  `src/blocks/modal/trigger.js` only writes that href for the author — via an
  `editor.BlockEdit` filter adding a picker to `core/button`, and by wrapping the
  `__experimentalFetchLinkSuggestions` editor setting so modals are offered in
  every link popover. Both are convenience; the feature works identically without
  them. That setting is experimental and core exposes no filter for it, so the
  wrapper is written to no-op if it ever disappears — check there first if link
  suggestions stop showing modals after a WordPress upgrade.
  A consequence worth knowing: `core/button`, inline links, and flair's own
  link-bearing blocks (overlay, card, metric, multibutton-button) are all
  triggers for free, including for a modal that lives in a template part.
- The modal block renders in the flow of the document, hidden, and `view.js`
  moves it into a `<dialog>` on load. Both states are styled in the one
  `style.scss` — `.flair-modal:target` is the no-JS fallback, and everything
  under `.flair-modal-dialog` is the enhanced state. `flair_modal_id()` and
  `sanitizeModalId()` in `edit.js` must agree, or editor-written triggers won't
  match rendered IDs.

- `enqueue_block_assets` fires on **both** front end and editor; some modules
  (iconic, kinetic) hook it as their "editor" callback, so their inline CSS can
  be added on the front end as well. Be deliberate about which hook you use.
- Several templates read block attributes without `isset`/`??` guards and rely
  on `block.json` defaults being present. Prefer null-coalescing when adding new
  attribute reads.
- Keep `flair.php` version, `package.json` version, and `readme.txt` "Stable tag"
  in sync, and add a `CHANGELOG.md` entry.

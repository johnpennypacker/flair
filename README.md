# Flair

Fanciful add-ons for the block editor: a set of custom blocks plus enhancements
for core blocks.

- **Version:** 2.3.0
- **Requires:** WordPress 6.7+, PHP 7.4+
- **Changelog:** [CHANGELOG.md](CHANGELOG.md)

Flair lives on GitHub and isn't distributed through the WordPress.org plugin
directory.

## What's included

**Custom blocks:** alert, boxout, card, carousel (with carousel slide), eyebrow,
layer, metric, milestone, modal, multibutton (with multibutton button), overlay,
sidler, stack, and tabs (with tab).

**Core-block enhancements and variations:** fadie, fixie, iconic, kinetic, and
zoomer, which decorate WordPress's own blocks.

The custom blocks are server-rendered, and your theme can override their markup
(see [Theming](#theming)).

**Cards and overlays in a Query Loop:** turn on **Use the current post** in the
block settings and the block shows the title, link and featured image of the
post it's in, so one card in a Query Loop's post template becomes a card per
post. The block's own image is used for posts without a featured image. The
body of a card or overlay is ordinary blocks, so what else each one shows is up
to you: add Post Excerpt, Post Date or Post Terms and they show the same post,
or leave them out. Everything else, such as the layout or the eyebrow, is
shared by every post.

## Installation

1. Download or clone this repository into `/wp-content/plugins/flair`.
2. Activate **Flair** on the **Plugins** screen.

## Theming

Copy a template from `template-parts/` into your theme, for example
`template-parts/flair/card.php`, and edit it to taste. Flair uses your theme's
copy when there is one and falls back to its bundled template otherwise.

For styling — the custom properties to define and the structure not to remove —
see [THEMING.md](THEMING.md).

## Development

```bash
npm install
npm run start     # watch build
```

The committed `build/` is a **production** build (minified, no source maps).
After changing anything in `src/`, run `npm run build` and commit the result;
the deploy fails if `build/` doesn't match a fresh build. `npm run start` writes
a development build into the same folder, so finish with `npm run build` before
committing.

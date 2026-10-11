# Flair

Fanciful add-ons for the block editor: a set of custom blocks plus enhancements
for core blocks.

- **Version:** 2.0.0
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

The committed `build/` is a **development** build (unminified, with source
maps). `npm run build` makes a production build instead and rewrites every file
in `build/`, so for a one-off rebuild that matches what's committed use:

```bash
NODE_ENV=development npx wp-scripts build --blocks-manifest --webpack-copy-php --mode=development
```

Pushing `main` deploys to Kinsta through `.github/workflows/deploy.yml`.

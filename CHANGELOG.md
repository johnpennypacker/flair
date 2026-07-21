# Changelog

All notable changes to the **Flair** plugin are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

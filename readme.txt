=== Flair ===
Contributors:      johnpennypacker
Tags:              blocks, gutenberg, block editor, animation
Requires at least: 6.7
Requires PHP:      7.4
Tested up to:      6.9
Stable tag:        0.3.1

Fanciful add-ons for the block editor: a set of custom blocks plus enhancements for core blocks.

== Description ==

Flair adds a collection of custom blocks (card, carousel, tabs, metric, milestone,
boxout, overlay, multibutton, and more) along with several enhancements and
variations that decorate WordPress core blocks (fadie, fixie, iconic, kinetic, zoomer).

The custom blocks are server-rendered and their markup can be overridden by your
theme (see Theming below).

== Theming ==

Copy the template files found in `template-parts` into your theme, for example
`template-parts/flair/card.php`, and edit to taste. Flair will use your theme's
copy when present and fall back to the bundled template otherwise.

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/flair` directory, or install
   the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress.

== Changelog ==

= 0.3.1 =
* Fixed scroll-reveal effect (`[data-was-visible]`) applying its `transform` to `header`/`nav` elements, which created a new CSS containing block and broke `position: fixed` overlays nested inside them — most visibly, WP core Navigation block's mobile hamburger menu would toggle open but render collapsed to the icon's own size instead of filling the screen. Removed `header`/`nav` from the scroll-reveal observer's selector.

= 0.3.0 =
* New `alert` block: color/typography-enabled notice with InnerBlocks content and an optional dismissible close button (60-day cookie, checked server-side).
* iconic styles now register as a proper stylesheet, enqueued only on pages that use them.
* Editor-only enqueue callbacks for iconic and kinetic gated with `is_admin()`, fixing duplicate front-end CSS.
* Hardened the overlay block's inline custom-property output against CSS-value injection.
* Guarded unguarded attribute reads in metric, card, overlay, and carousel templates.
* Fixed `tab-index` typo in the multibutton template.
* Overlay block: clicking anywhere on the card (not just the title) now activates its link, matching the card block's behavior.

= 0.2.0 =
* Custom blocks: card, carousel, carousel-slide, tabs, tab, metric, milestone, boxout, eyebrow, layer, multibutton, multibutton-button, overlay, sidler, stack.
* Core-block enhancements/variations: fadie, fixie, iconic, kinetic, zoomer.
* Theme template override system via flair_use_template().
* core/columns "List" style.
* iconic styles now load only on pages that use them.
* Hardened the overlay block's inline custom-property output.

= 0.1.0 =
* Initial release.

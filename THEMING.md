# Theming Flair

How to style Flair's blocks from a theme without fighting them.

Two things are worth knowing before anything else:

1. **Set Flair's custom properties.** Flair defines a handful and reads them
   everywhere. If your theme doesn't define them, they fall through to defaults
   that were picked for a theme you probably aren't using.
2. **Some of Flair's structure is load-bearing.** Most of what Flair sets is
   decorative and one class beats it. A short list of things are holding the
   block up, and removing them breaks behaviour rather than appearance.

---

## 1. Define the custom properties Flair defines

Flair's own defaults resolve against **Twenty Twenty-Four's palette slugs**:

```scss
--flair-color-primary:   var( --wp--preset--color--contrast, #000 );
--flair-color-secondary: var( --wp--preset--color--accent-1, #9a7500 );
```

`contrast` and `accent-1` are core default-theme slugs. If your palette is named
anything else — and most are — both fall through to the hardcoded values, and
Flair's components quietly render in black and a mustard yellow. Nothing errors.
You just get colours from a theme you aren't running.

**So define them.** These are plain custom properties, so set them in your
stylesheet or in `theme.json`'s `styles.css`. They cannot be declared through
`settings.custom`, which would namespace them as `--wp--custom--*`:

```css
:root {
	--flair-color-primary: var( --wp--preset--color--ink );
	--flair-color-secondary: var( --wp--preset--color--cyan );
}
```

### The contract

Site-wide, set on `:root`:

| Property | Default | What actually reads it |
|---|---|---|
| `--flair-color-primary` | `var(--wp--preset--color--contrast, #000)` | Boxout background, alert background |
| `--flair-color-secondary` | `var(--wp--preset--color--accent-1, #9a7500)` | Hollow milestone marker, multibutton background (through `--flair-multibutton-background`) |
| `--type__size` | `1.1rem` | Metric — the number's size, and the block's bottom margin |
| `--flair-font-size` | `1.1rem` | Milestone spacing, via `--space_buffer` |

Per-block, set on the block:

| Property | Block | Default | What it does |
|---|---|---|---|
| `--flair-multibutton-background` | multibutton | `color-mix(in oklab, var(--flair-color-secondary), white 30%)` | The whole control's surface. `.dropdown` and `.options` inherit it |
| `--flair-toggle-glyph` | multibutton | `1.25rem` | Size of the dropdown arrow. Set on `.dropdown-toggle` |
| `--space_buffer` | milestone | `var(--flair-font-size, 1em)` | Gap between rail and entry, and the marker's size |
| `--timeline_width` | milestone | `.125em` | Thickness of the timeline rail |

**These reach less far than you might assume.** Each colour property has two
live readers, not the dozen the raw source suggests — much of what looks like
usage is commented out. So setting them fixes boxout, alert, milestone markers
and the multibutton, and does nothing at all for card or overlay, which take
their colour from block supports and from your own CSS. Style those directly.

Note the direction of the multibutton's: `--flair-multibutton-background` is the
*default*, and an author's Background choice in the editor beats it, because
block supports emit an inline style or a preset class carrying `!important`.
Setting it from a theme changes what a multibutton looks like when nobody has
picked a colour; it does not overrule anyone who has.

There is no property for the card's drop shadow, because there is no default
shadow — Flair used to ship one and it was removed. Add your own on
`.flair-card::before` (see below).

---

## 2. What one class overrides

**If Flair sets it for looks, one class beats it.** Presentational defaults are
wrapped in `:where()`, which contributes no specificity, so:

```css
.flair-card .text { padding: 24px; }        /* wins */
.flair-milestone .timeline::before { … }    /* wins */
```

You should never need `!important` to restyle a Flair block. If you do, that's a
bug — please report it.

The exceptions are deliberate and structural, not decorative:

- `.flair-milestone-wrapper:has( + .flair-milestone-wrapper)` collapses the
  margin between consecutive milestones. Without it a theme's block rhythm
  breaks the timeline rail into segments.
- `.flair-card .text > .button` carries negative side margins so the card footer
  runs full-bleed.

---

## 3. Structure that is load-bearing

These look decorative. They are not. Removing them breaks behaviour.

### `.flair-card::before`, `.flair-overlay::before`, `.cardish-title a::before`

A positioned layer covering the whole block. It paints nothing by default, and
exists as the surface a theme hangs a shadow on:

```css
.flair-card::before { box-shadow: 0 2px 8px rgb(0 0 0 / 0.15); }
```

**Do not use `content: none`.** That removes the layer itself. Clear whatever
you don't want instead — `box-shadow: none`, `background: none`. Its transition
is named `box-shadow`, so a shadow you add still animates.

### `.title a::after` — the stretched link

The heading is the link semantically; the whole block is the link visually. That
is done by extending the anchor's own box over the block:

```scss
:where(.title) a::after { content: ''; position: absolute; inset: 0; z-index: 1; }
```

This is what gives the URL in the status bar, ⌘/middle-click to a new tab, the
context menu and keyboard access. Remove it and the block stops being a link
anywhere but on the heading text.

The block is `position: relative` for it to resolve against. Keep that.

### The z-index layering — this is what keeps text selectable

The stretched link sits at `z-index: 1`, **below** the prose:

| Layer | z-index | Why |
|---|---:|---|
| `.excerpt`, `.attribution`, `.misc` | `2` | Above the link, so the text is the hit target and stays selectable |
| `.title a::after` | `1` | The stretched link |
| `.flair-card::before` | `0` | The decoration layer |

A point on screen hit-tests to exactly one element, so a surface cannot both
report a link URL and be selectable text. Flair splits the difference: the prose
is selectable, everything else reports the link.

**If you flatten this, text selection breaks.** Giving `.excerpt` a lower
`z-index`, or `pointer-events: none`, puts the link back on top and a drag across
the card selects nothing.

Clicks that land on the prose are picked up by a delegated handler in
`flair-core/flair.js`, which stands aside for real controls, for an active
selection, and for modifier clicks.

### The multibutton toggle

Three things are coupled, and it is not obvious:

```scss
.dropdown-toggle {
	min-width: 3rem;
	aspect-ratio: 1;
	&::after { position: absolute; inset: 0; mask-size: var( --flair-toggle-glyph ); }
}
```

The glyph is a mask on a pseudo-element pinned to all four edges, centred by
`mask-position`. **Size it with `--flair-toggle-glyph`, not `width`/`height`** —
a definite width resolves against `left`, which pins the arrow to the control's
left edge and looks like a `justify-content` problem when it isn't.

The button's `<span>` is its only content and is visually hidden, using the
shared `.flair-sr-only` utility. Keep it out of flow and in the accessibility
tree — `display: none` leaves the button with no accessible name at all.

### `.flair-sr-only`

Flair's visually-hidden utility, used wherever a control's only label is hidden
— the multibutton toggle and the carousel's previous/next arrows. It is the one
piece of Flair's CSS deliberately **not** wrapped in `:where()`: a stray
`span { position: static }` should not be able to drop a hidden label back into
the layout.

Use it for your own hidden labels rather than inventing a technique, and don't
override it to `display: none` or `visibility: hidden` — both strip the
accessible name.

### The card image's `aspect-ratio`

A card whose image is an attachment renders it with `wp_get_attachment_image()`,
so it carries `width`/`height` attributes and a `srcset`. When WordPress lazy-loads
it, it also gets `sizes="auto"`, and the browser puts any `sizes="auto"` image
under size containment — its own pixels no longer give it a shape. The only thing
holding its proportions is the ratio the browser derives from the `width`/`height`
attributes.

Any author `aspect-ratio` on `.flair-card .media img` replaces that ratio. A real
ratio (`16 / 9`) is fine. `aspect-ratio: auto` is not: the image falls back to
WordPress's `contain-intrinsic-size` of `3000px 1500px` and renders 1500px tall,
but only once it's far enough down the page to be lazy-loaded, so it's easy to
miss. To give uncropped (`aspect-none`) cards their natural shape, leave
`aspect-ratio` unset on them rather than resetting it:

```css
.flair-card-wrapper:not(.aspect-none) .media img { aspect-ratio: 3 / 2; } /* yes */
.flair-card-wrapper.aspect-none .media img { aspect-ratio: auto; }       /* no */
```

---

## 4. When to override the template instead

Every block renders through `flair_use_template()`, so a theme can replace the
markup wholesale by providing `flair/<name>.php` or
`template-parts/flair/<name>.php`. The plugin's own markup in
`template-parts/<name>.php` is the reference to copy from.

Reach for this when you're fighting the markup rather than the styling —
different element order, extra wrappers, markup Flair doesn't emit. Owning the
markup and dropping out of the cascade fight is often cheaper than it looks, and
the CSS route looks cheaper right up until it isn't.

Note that a replaced template opts out of the structure documented above. If you
copy `card.php`, you own the stretched link and the layering with it.

---

## 5. Entrance animations

Elements fade or rise in as they scroll into view. An element animates when it
carries `data-flair-animate="<preset>"`, and only then.

**Per block.** Every block has an *Entrance animation* panel: *Site default*,
*None*, or a preset. The built-in presets are:

| Preset | What it does | Best on |
|---|---|---|
| `fade` | Opacity only | Anything |
| `rise` | Fades in while climbing 4rem with a 1° tilt (Flair's original reveal) | Sections, columns, cards |
| `zoom` | Fades in while scaling up from 0.95 | Cards, image tiles |
| `wipe` | Clips open from the inline-start edge, with no fade, and **follows the scroll** (see below) | Images, covers. Avoid on text |
| `blur` | Fades in from an 8px blur | Images, headings. Expensive to draw on full-width covers |

The choice is written onto the block's outer element at
render time. Saved markup doesn't change, so it never invalidates a block.
*None* also switches off the site default for everything inside the block. A
block inside it that picked a preset of its own still gets it.

**Per site: what animates.** Anything matching the default selectors gets the
default preset unless it, or something around it, says otherwise. The defaults
cover covers, figures, columns, `section`, `footer`, overlays, and anything
with `.flair-io`. Change them in the theme:

```php
add_filter( 'flair_animation_defaults', function ( $defaults ) {
	$defaults['selectors'] = [ '.wp-block-cover', '.wp-block-column' ];
	$defaults['preset']    = 'fade';
	return $defaults;
} );
```

Return `[]` for `selectors` to make entrance animation entirely opt-in. The
selectors are matched in the browser, so they reach theme markup too, not only
blocks.

**Per site: how it feels.** Set these in `theme.json`, and WordPress turns them
into the `--wp--custom--flair--animation--*` properties Flair reads:

```json
{ "settings": { "custom": { "flair": { "animation": {
	"duration": "600ms",
	"delay": "0ms",
	"stagger": "80ms",
	"easing": "cubic-bezier(.2,.7,.2,1)",
	"distance": "2rem",
	"rotate": "0deg",
	"scale": "0.9",
	"blur": "12px"
} } } } }
```

`distance` and `rotate` shape `rise`, `scale` shapes `zoom`, and `blur` shapes `blur`.

Each one can also be set as `--flair-animation-<name>` on any element, which
beats `theme.json` for that element and everything inside it. Siblings that
come into view together are staggered by `stagger`, counting from the first
one, so an item scrolled to on its own never waits out the items before it. The
count starts over at each visual row, so a grid ripples across each row rather
than down the whole grid, and a row that scrolls in later starts fresh. A block
that's the only animated thing in its wrapper counts by the wrapper's position,
so an image alone in each column still staggers across the row of columns. For wide
rows, shorten `stagger`. Something like 50ms keeps a six-across row under a
third of a second.

**Wipe follows the scroll.** Instead of playing once, a wipe is tied to the
element's position on screen. It starts as the element's top edge comes into
view and is fully open once 40% of the element's pass across the screen is
behind it. Scrolling back up closes it again. Items side by side in a row start
a little later each, 5% further into their pass across the screen per item. This uses CSS scroll-driven
animations (`animation-timeline: view()`). Where the browser lacks them, or the
visitor prefers reduced motion, wipe plays once like the other presets. To have
it finish sooner or later, set `scroll-end` in `theme.json` (any
`animation-range` end, e.g. `"cover 25%"` or `"entry 100%"`).

A preset of your own can follow the scroll the same way. Set this on its
elements:

```css
[data-flair-animate="drop"] { --flair-entrance-scroll: 1; }
```

**Your own preset.** Add the name, then define `@keyframes flair-entrance-<name>`:

```php
add_filter( 'flair_animation_presets', function ( $presets ) {
	$presets['drop'] = __( 'Drop', 'my-theme' );
	return $presets;
} );
```

```css
@keyframes flair-entrance-drop { from { opacity: 0; translate: 0 -2rem; } }
```

Give only a `from` if you can. The animation then ends on the element's own
styles, and nothing is held once it has played. (`rise` adds mid-way opacity
steps to match Flair's original fade curve. That holds opacity at 1 briefly
before it settles, which shows only on an element a theme has made
semi-transparent.) Animate `translate`, `rotate` and `scale`
rather than `transform`, because those add to a transform the element already
has, where `transform` replaces it.

**What's built in.** Whatever is already on screen when the page loads doesn't
animate. It's never hidden, so the first screen paints straight away and
nothing blinks out and back in. Anything overlapping the viewport at that moment
counts. Nothing is hidden until `flair.js` is running (it adds
`html.flair-js`). Under `prefers-reduced-motion: reduce`, every preset plays as
a plain fade. A preset that changes `clip-path`, `scale` or `filter` owns that
property while it plays, so an element's own value comes back only once the
animation ends.

---

## Reporting friction

If styling a Flair block needs `!important`, or an override behaves differently
from how it reads, that's worth an issue. `THEMING-FRICTION.md` records the ten
findings that produced most of this document, including two where the original
diagnosis turned out to be wrong.

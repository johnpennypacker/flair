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

## Reporting friction

If styling a Flair block needs `!important`, or an override behaves differently
from how it reads, that's worth an issue. `THEMING-FRICTION.md` records the ten
findings that produced most of this document, including two where the original
diagnosis turned out to be wrong.

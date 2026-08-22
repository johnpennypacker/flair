# Theming friction

Findings from building the **Così Digital** theme (`cosi-digital` 0.1.1) against
**Flair 0.3.1**. Ten places where the theme had to work against the plugin
rather than with it, with the mechanism and a suggested fix for each.

Severity is measured in **what it cost to escape**, not in how wrong it is:

| | |
|---|---|
| **Blocker** | Only answerable with `!important`, or required discovering an undocumented coupling |
| **Friction** | Overridable, but only once you know the mechanism |
| **Papercut** | One-line override once you've spotted it |

Line numbers refer to `src/`, not the committed `build/` output.

**Status.** #1, #2, #3, #4, #5, #6 and #7 are fixed on the `theming-friction`
branch, and #8 is documented; each is
annotated below with what the fix actually turned out to be, including the two
places this writeup had the mechanism wrong. Every change is measured against
both sites with `tools/theming-probe` -- see that directory's `probe.mjs`
header for how to capture and diff a run.

**Caveat worth keeping in view:** these come from one theme whose design
deliberately strips Flair's defaults — square corners instead of radius,
hairline rules instead of shadows. A theme closer to Flair's own aesthetic
would hit far fewer of them.

---

## Cascade & specificity

### 1. Layout classes hand-stamped into template markup

- **Severity:** Blocker
- **Where:** `template-parts/card.php:21`, `template-parts/boxout.php:21`
- **Suggested issue title:** *Let `supports.layout` emit `is-layout-constrained` instead of hardcoding it*

Both templates write `is-layout-constrained` directly into the markup. That
class is not decorative — it is core's contract, and core answers it with:

```css
.is-layout-constrained > :where(:not(.alignleft):not(.alignright):not(.alignfull)) {
  max-width: var(--wp--style--global--content-size);
  margin-left: auto !important;
  margin-right: auto !important;
}
```

So every child of a card's `.text` is silently capped at the theme's content
size (680px here) and horizontally auto-margined *with `!important`*. The card
footer is supposed to run full-bleed via negative side margins; those margins
were being cancelled, and nothing in Flair explains why.

This cost the most time by a wide margin — the symptom (a footer stopping 64px
short of the card edge) points nowhere near the cause.

**Suggested fix.** `flair/card` already declares `supports.layout`, so
`wp_render_layout_support_flag` will emit the class itself when the block
actually has a layout. Let it, and drop the literal. `flair/boxout` declares no
layout support at all yet stamps the class anyway — that one is simply
removable. If the intent is just "constrain this inner area", a plugin-owned
class avoids inheriting core's `!important`.

> **Fixed** — but not quite as described above.
>
> Core is *already* emitting for the card: the wrapper carries `is-layout-flow`
> in the rendered markup. The hand-stamped class was a second, different layout
> on an inner element core never asked about. And the card has no `InnerBlocks`
> at all, so it was constraining nothing but Flair's own markup. Deleted.
>
> "Simply removable" was wrong for boxout. A boxout *does* hold author blocks,
> and the class was load-bearing: both blocks were leaning on whatever the
> active theme does with `.is-layout-constrained` for their internal rhythm. On
> the `cosi` site that was the theme's block-gap, and removing the class
> dropped card and boxout children onto UA defaults — headings, paragraphs and
> separators all shifted, and boxouts grew 34px. Each block now sets its own
> spacing, in margins rather than a flex gap: a gap *adds* to whatever margins
> a theme sets on the same parts, a margin is simply replaced by one.
>
> Removing the cap also exposed a second half to this finding. `width: 100%`
> resolves against the padding box, so with the negative side margins restored
> the footer reached the left card edge and stopped 72px short of the right. It
> is stretched by the flex container now.

---

### 2. `!important` on a plugin default

- **Severity:** Blocker
- **Where:** `src/blocks/card/style.scss:69`
- **Suggested issue title:** *Drop `!important` from the card footer's negative margin*

```scss
margin-block-end: calc( var( --wp--style--block-gap, 1rem ) * -1.5 ) !important;
```

At the theme's 16px block gap this pulls the card footer 24px *below* the card,
overhanging its own border. Because it is `!important`, the only available
answer is another `!important` — the theme now carries
`margin-block-end: 0 !important` purely to undo a default.

Worth separating from the five `!important` declarations in
`carousel/style.scss`, which are annotated *"because WP default styles use
important"*. Those are legitimate — answering core in kind. This one is the
plugin overriding itself.

**Suggested fix.** Reserve `!important` for answering core. For the plugin's own
defaults it removes the theme's only lever.

> **Fixed — and the diagnosis above is wrong.** This was not Flair overriding a
> theme. It was Flair overriding *itself*: three lines up, `.text > :last-child`
> sits at (0,2,0), `.button` at (0,1,0), and `.button` is always the last child.
> The flag was fighting its own reset. Dropping it as suggested would have
> silently killed the negative margin — the symptom the finding is about.
>
> The reset excludes `.button` instead. The `:not()` is wrapped in `:where()`:
> bare, it reads (0,3,0) and quietly out-specifies a theme styling
> `.flair-card .title`, which on a title-only card takes that theme's margin
> back off again. The general lesson is the sharper one — a plugin's
> `!important` is worth reading twice before removing, because it may be
> holding off the plugin rather than the theme.

---

### 3. `:where()` is used in some files and not others

- **Severity:** Friction
- **Where:** `src/blocks/milestone/style.scss:63–93`, `src/blocks/multibutton/style.scss:59–97`
- **Suggested issue title:** *Wrap all presentational defaults in `:where()` for consistent override weight*

Flair clearly knows the pattern — `tabs` wraps ten selectors in `:where()`,
`card` and `milestone` four each. But the rules that actually needed overriding
weren't among them:

```scss
.flair-milestone-wrapper[class*='marker-'] .timeline::before { … }   /* (0,3,1) */
```

An attribute selector counts the same as a class, so this needs a four-level
chain to beat. Timeline markers ended up positioned beside the rail instead of
on it, and the hollow variants read as a "C" where the rail showed through — all
because the theme's `.flair-milestone .timeline::before` at (0,2,1) quietly
lost.

Current `:where()` coverage:

| Block | `:where()` uses |
|---|---:|
| tabs | 10 |
| card, milestone | 4 |
| alert, carousel, multibutton, overlay | 2 |
| boxout, eyebrow, metric, sidler | 1 |
| carousel-slide, layer, multibutton-button, stack | 0 |

The inconsistency is the real cost. When some defaults are zero-specificity and
others are (0,3,1), a theme author cannot predict what a given override needs
and ends up escalating everything defensively.

**Suggested fix.** Wrap every purely presentational default in `:where()`. A
theme then overrides any of them with one class, and the rule becomes
learnable: *if Flair sets it for looks, one class beats it.*

> **Fixed.** A pseudo-element cannot go inside `:where()`, so the marker rules
> are wrapped up to `.timeline` with `::before` left outside — (0,0,1). The five
> marker rules now share a weight and are ordered by source order instead.
>
> Three corrections to the table above. Carousel's root was `:is()`, which takes
> the weight of its argument — (0,1,0), not the zero it resembles. And the two
> blocks listed at zero coverage, `layer` and `multibutton-button`, are untouched
> `create-block` scaffolding targeting a `wp-block-create-block-*` class that is
> never emitted; there is nothing there to wrap and both files want deleting.
>
> Not everything should be wrapped.
> `.flair-milestone-wrapper:has( + .flair-milestone-wrapper)` keeps its weight:
> consecutive milestones have to butt together or the rail breaks into segments,
> which is structural rather than decorative. Wrapping it let a theme's block
> rhythm back in and split the timeline. It did lose its `!important` — at
> (0,2,0) it clears a theme's generic rhythm unaided, which is what the flag was
> for.
>
> `flair-core/flair-front.scss` is left for its own pass. Most of it styles the
> site and core blocks rather than Flair's blocks, which is a different question.
>
> The rule this finding asks for is now executable rather than aspirational:
> `tools/theming-probe/override-test.mjs` disables the theme's stylesheets,
> injects the plainest single-class rule a theme would write against each
> default, and checks it lands. 14 defaults, all beatable; it fails on the
> pre-fix build.

---

## Structure carrying two jobs

### 4. A pseudo-element that is both decoration and structure

- **Severity:** Friction
- **Where:** `src/blocks/card/style.scss:99–104`
- **Suggested issue title:** *Separate the card's drop shadow from its structural `::before` layer*

`.flair-card::before` carries the drop shadow. It is also a positioned layer
covering the whole card. A theme replacing the shadow with a hairline rule
reaches for the obvious `content: none` — which silently removes the layer and
takes the card's whole-surface click behaviour with it. That regression shipped
here and had to be caught in review.

**Suggested fix.** Split them: let the shadow live on the element and keep the
pseudo purely structural, or document the pseudo as load-bearing. A theme should
be able to remove decoration without reading the stylesheet to find out what
else it was holding up.

> **Partly resolved:** the shadow is gone, so the pseudo is now purely
> structural and there is nothing decorative left to conflict with.
>
> Removing it beat parameterising it. The colour came from
> `--flair-color-primary` — the plugin's *general* primary, used 11 times for
> backgrounds, borders and text, so the shadow could not be retuned without
> moving all of them. And `color-mix(…, white 85%)` capped the result at 15% of
> whatever that was, so on any light ground it was invisible whatever a theme
> set. A shadow is a decision for a theme to make, and themes were already
> making it: cosi-digital cleared it, and clarebourne supplies its own from the
> site's Global Styles.
>
> The `::before` layer stays — it is load-bearing, and unpainted it is a clean
> place for a theme to hang a shadow. Its `transition` is named `box-shadow`
> rather than `all` (#9) so a theme-supplied shadow still animates.
>
> **Now resolved.** `THEMING.md` §3 documents the pseudo as load-bearing, with
> the warning that `content: none` removes the layer rather than the decoration,
> and shows the supported way to put a shadow back. It covers the two structures
> added since — the stretched link, and the z-index layering that keeps card
> text selectable — on the same grounds: they read as decorative and are not.

---

### 5. Three coupled constraints on one control

- **Severity:** Blocker
- **Where:** `src/blocks/multibutton/style.scss:59–91`
- **Suggested issue title:** *Expose multibutton toggle glyph size; drop the hard `width: 3rem`*

The dropdown toggle sets `width: 3rem` and `aspect-ratio: 1`, and fills itself
with an absolutely-positioned `::after` painting the glyph as a mask at `40%`.
Nothing signals that these three are load-bearing together. Sizing the glyph the
way you'd size any icon —

```css
.dropdown-toggle::after { width: 15px; height: 15px; }
```

— pins it to the control's **left edge**, because `left` and `right` are both
`0` and a definite width resolves against `left`. It reads as an off-centre icon
and sends you looking at `justify-content`, which is already correct. Three
separate attempts went at the wrong layer before the mechanism was visible.

`mask-size: 40%` also scales the glyph with the control, so the triangle grows
whenever the action button beside it gets taller.

**Suggested fix.** Expose the glyph size as a custom property
(`--flair-toggle-glyph: 15px`) and size the mask from it, so themes change
artwork and scale without touching positioning. Drop the hard `width`, or make
it a `min-width`, so padding can size the control.

---

## Behaviour

### 6. Whole-card linking implemented in JavaScript

- **Severity:** Friction
- **Where:** `src/blocks/card/card.js`
- **Suggested issue title:** *Replace card.js click timing with the CSS stretched-link pattern*

The card measures the gap between `mousedown` and `mouseup` and calls
`link.click()` under 200ms. It works, but it isn't a link: no middle-click, no
⌘-click to a new tab, no URL in the status bar on hover, no context menu,
nothing for a keyboard user beyond the title. It also sets
`card.style.cursor = 'pointer'` inline, which a theme cannot override without
`!important`.

**Suggested fix.** The stretched-link pattern does all of this in CSS and keeps
real link semantics:

```scss
:where(.flair-card) .title a::after {
  content: "";
  position: absolute;
  inset: 0;
}
```

The card is already `position: relative`, and `.excerpt` already carries the
`pointer-events` handling this pattern expects — the groundwork is there. It
would also retire `card.js` entirely.

> **Fixed**, and applied to `overlay` at the same time — the two blocks are the
> same component in different clothes, and their linking is kept in step.
> `card.js` and `overlay.js` are both gone.
>
> The suggested fix as written costs you selectable text, which is not
> acceptable. A point on screen hit-tests to exactly one element, so a surface
> cannot both report a link URL and be selectable prose — an overlay laid over
> the card takes the words with it, and a drag across the excerpt grabs the link
> instead of selecting.
>
> So the overlay is layered rather than stacked: the stretched anchor covers the
> block *beneath* the prose, and `.excerpt` / `.attribution` / `.misc` sit above
> it. That leaves roughly half a card's surface — padding, media, footer,
> heading — reporting the link URL and behaving natively, with the prose staying
> selectable. The clicks that land on prose are the part CSS cannot reach, and a
> single delegated handler in `flair-core/flair.js` picks those up for both
> blocks.
>
> That handler is not the old timing trick. It bails on any real control, bails
> when text is selected, forwards modifier and middle clicks to a new tab, and
> waits out the double-click interval before navigating — without that last
> part, double-clicking to select a word navigates away, because the first click
> of a double-click arrives before any selection exists.
>
> `.excerpt`'s `pointer-events: none` is gone. It was there so clicks would fall
> through to `card.js`; it was also the reason the prose could not be selected
> even with no overlay above it.
>
> `tools/theming-probe/link-behaviour-test.mjs` checks all of it on both blocks:
> drag-selects prose, double-click selects a word, click on prose navigates,
> the anchor covers the block, clicks off the prose navigate natively,
> cmd-click opens a new tab, and the heading is still a real link.

---

### 7. Hover transform applied to the hover target itself

- **Severity:** Friction
- **Where:** `src/blocks/card/style.scss:105–112`
- **Suggested issue title:** *Trigger the card hover lift from the wrapper*

```scss
&:focus-within, &:hover { transform: translateY(-2px); }
```

Moving the element that owns `:hover` means that near its bottom edge the
pointer falls outside as it rises, hover drops, it falls back, and it
oscillates. The wrapper is right there and never moves.

**Suggested fix.**

```scss
:where(.flair-card-wrapper):hover .flair-card { transform: translateY(-2px); }
```

Same effect, stable hit area.

---

## Defaults that assume a particular theme

### 8. Colour defaults resolve against Twenty Twenty-Four's palette

- **Severity:** Friction
- **Where:** `src/flair-core/flair-front.scss:14–15`
- **Suggested issue title:** *Don't fall back to another theme's palette slugs; document the colour contract*

```scss
--flair-color-primary: var( --wp--preset--color--contrast, #000 );
--flair-color-secondary: var( --wp--preset--color--accent-1, #9a7500 );
```

`contrast` and `accent-1` are core default-theme slugs. Così Digital's palette is
`ink / paper / cyan / deep-cyan / …`, so both fall through to the hardcoded
values and every Flair component silently defaults to black and a mustard
yellow. Nothing errors; you just get colours from a theme you aren't using.

These two properties are the plugin's whole colour contract — 12 and 4 usages
respectively — but they aren't mentioned in `CLAUDE.md` or `readme.txt`.

**Suggested fix.** Fall back to `currentColor` and a neutral rather than another
theme's palette, and document the two properties as the first thing a theme
should set.

> **Documented** (`THEMING.md` §1), which was the half that mattered. The
> fallbacks are left alone deliberately: changing them recolours every site
> that is currently, if accidentally, relying on them, and the fix a theme
> actually needs is to define the properties rather than to inherit a better
> guess.
>
> Two corrections. The writeup calls these "the plugin's whole colour contract —
> 12 and 4 usages"; that counted commented-out lines. Live, it is **two readers
> each** — boxout and alert backgrounds for primary, the hollow milestone marker
> and the multibutton background for secondary. Removing the drop shadow took
> out six more. So setting these does less than the finding implies, and card
> and overlay in particular take no colour from them at all — worth saying
> plainly in the docs rather than letting a theme author discover it.
>
> The contract is also wider than two properties: `--type__size`,
> `--flair-font-size`, `--flair-toggle-glyph`, `--space_buffer` and
> `--timeline_width` are all read too, and all are now listed.

---

## Papercuts

### 9. `transition: all`

- **Severity:** Papercut
- **Suggested issue title:** *Name transition properties instead of `all`*

| File | Lines | Count |
|---|---|---:|
| `card/style.scss` | 26, 71, 102, 118 | 4 |
| `overlay/style.scss` | 54, 95 | 2 |
| `carousel/style.scss` | 54 | 1 |
| `multibutton/style.scss` | 147 | 1 |

With `all`, any incidental geometry change during a state change animates too,
so elements settle into place instead of snapping and every frame between is one
the compositor has to paint. It's also the one thing the Così guide's motion
section rules out by name.

**Suggested fix.** Name the properties. It's usually two: a colour and a
transform.

---

### 10. Ad-hoc visually-hidden technique

- **Severity:** Papercut
- **Where:** `src/blocks/multibutton/style.scss:71–75`
- **Suggested issue title:** *Add a shared `.flair-sr-only` utility*

```scss
span { clip-path: rect(0 100% 0 0); width: 20ch; display: block; }
```

It works, but it's unusual enough that the theme's first instinct was
`display: none` — which strips the accessible name from a button whose only
visible content is a masked triangle. A recognisable shared utility would have
made the intent obvious.

**Suggested fix.** A single `.flair-sr-only` in `flair-core`, used everywhere a
label is hidden.

---

## Already resolved

### Per-page count measured once at init — `src/blocks/carousel/view.js`

The carousel read its width once on `DOMContentLoaded` and, if narrow,
destructively rewrote `triple` to `double` — losing the author's setting
permanently. A theme that animates sections into view on scroll made it measure
narrow every time, so a three-up carousel rendered two-up with no way back.

Now reads through `effectiveXer()` with a resize listener, and the author's
class is left intact.

---

## What worked

### The template override system — `flair_use_template()`

Thin `render.php` files delegating to `flair_use_template()`, with themes able
to supply `flair/<name>.php`, is a genuinely good seam — and it never got in the
way.

It's also underused as an escape hatch. At least three findings above (#1 the
hand-stamped layout class, #6 the JS-driven card link, #10 the hidden-label
technique) could have been sidestepped by overriding `card.php` wholesale rather
than fighting the stylesheet. That trade — own the markup, stop fighting the
cascade — deserves to be spelled out in the docs, because the CSS route looks
cheaper right up until it isn't.

**Worth adding.** A short "theming Flair" note covering the two colour custom
properties, which classes are structural versus decorative, and when to reach
for a template override instead of CSS.

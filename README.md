# ERK, Enjinia Resolved Krafts

The official website for ERK, an engineering and manufacturing company that designs and builds
custom machines, automation and manufactured parts, from the problem statement to the finished
system.

Live at **[enjiniaresolvedkrafts.com](https://enjiniaresolvedkrafts.com)**, served by GitHub Pages
from the `master` branch (see `CNAME`).

## Running it

There is no build step. Open `index.html` in a browser, or serve the folder with any static file
server, for example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Files

| Path | Purpose |
| --- | --- |
| `index.html` | The whole page. Five sections: hero, philosophy and process, capabilities, engineering work, contact. |
| `styles/styles.css` | The complete design system and layout. |
| `scripts/main.js` | Renders the engineering work section, plus the lightbox, scroll reveals and mobile menu. |
| `assets/images/` | Web-ready renders used by the site. |
| `CNAME` | Custom domain for GitHub Pages. Do not delete. |

## Adding a new engineering render

Renders are driven by data in `scripts/main.js`, so adding one is a single entry. Each needs its
own measured aspect ratio and background colour, which is what keeps the machine from ever being
cropped or sitting on a visible plate edge:

```js
{
  title: "Machine Name",
  tag: "Category",
  image: "assets/images/machine-name.jpg",
  ar: 0.62,          // image width divided by height
  plate: "#ededed",  // colour sampled from the image's own background
  blurb: "One sentence on what it does."
}
```

Add it to the `row` array to place it in the pair, or set it as `feature` or `closer` for a full
width band. Before adding, crop the image tightly to the machine so there is no wasted margin,
then read off its width/height ratio and sample a corner pixel for `plate`.

## Notes

- `assets/designs/`, `assets/videos/` and the older photos in `assets/images/` are from the
  previous version of the site. They are no longer referenced by any page, and are kept only as
  source material.
- The previous version of the site is preserved in git under the tag `pre-redesign-2026-08-10`.

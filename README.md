# ERK - Enjinia Resolved Krafts

This workspace contains the official ERK website. ERK is an engineering and manufacturing partner that
turns a customer's idea, requirement, or shop-floor problem into a manufactured solution, across CNC
machining, 3D printing, injection moulding, sheet metal fabrication, industrial automation, and custom
engineering builds.

## Website Focus

- Positioning: "Your Ideas. Engineered." An engineering-first partner, not tied to one manufacturing process.
- Capabilities: CNC machining, 3D printing, injection moulding, sheet metal fabrication, industrial
  automation, engineering design, prototyping, and custom engineering solutions.
- Engineering showcase: real ERK photos and video alongside 3D engineering design concepts, organised into
  a filterable, data-driven portfolio with a dedicated page for every project.

## Features

- Single-page site with client-side routing to a dedicated detail page per showcase item (`?page=<slug>`)
- Data-driven showcase: one array in `scripts/showcase-data.js` drives the filters, stats, featured strip,
  category grid, and every detail page, so adding a new project is a single new entry
- Responsive layout, from desktop down to mobile, with a collapsible nav
- Direct quote-request and WhatsApp contact links

## Run

1. Open `index.html` in a browser or with Live Server (or serve the folder with any static file server)
2. Review the sections: Hero, About, Capabilities, Work (Engineering Showcase), Why ERK, How It Works,
   Industries, and the closing quote request panel

## Main Files

- `index.html`: Single-page site structure and section content
- `styles/styles.css`: The full design system and responsive styling (black + amber-yellow accent)
- `scripts/showcase-data.js`: Structured showcase data — every project's name, category, description, and
  media path. Add a new object here to add a new project to the site
- `scripts/showcase.js`: Rendering logic for the showcase grid, filters, featured strip, and detail pages
- `assets/images`: Web-optimised image assets used by the website
- `assets/videos`: Video assets used by the website
- `assets/designs`: Original, unoptimised source files for the images in `assets/images`

## Adding A New Showcase Item

Add a new object to the `window.showcaseItems` array in `scripts/showcase-data.js` with a unique `slug`,
a `category` (existing categories: Engineering Design, Projects, Machines, Automation, Manufacturing
Process, Fabrication), a `type` of `"image"` or `"video"`, and a `path` to the asset in `assets/images` or
`assets/videos`. No other file needs to change — the new item picks up filtering, stats, and its own detail
page automatically.

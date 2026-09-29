(function () {
  /* ILLUSTRATIVE FIGURES, NOT MEASURED RESULTS.
     Every number in an `impact` block is an engineering estimate for a
     representative operating scenario. None of it was timed on a shop floor.
     The section carries one plain caveat saying so, and that caveat is wired to
     this flag: turn the flag off and the numbers and the caveat go together.

     If a customer ever releases a measured figure it replaces an estimate here.
     Never widen an estimate into a claim. */
  var SHOW_FIGURES = true;

  /* Each render carries its own measured aspect ratio and background colour.
     The plate uses both, so the machine is never cropped and the plate edge
     is never visible. To add a machine later, add an entry here.

     Three shapes of entry, and an item takes the lightest one that fits:

       `before` + `impact`  a case study. The manual method, what we built, one
                            headline change and at most two supporting figures.
       `before` alone       a change worth stating, with no number behind it.
       `detail`             fabrication evidence. A short specification and no
                            impact claim, because none was made.

     `before` is written in the present tense as a description of the manual
     method itself. It must never describe what a particular customer used to
     do, because we were not there and cannot show it. `blurb` is the "after"
     line, so nothing is written twice. */

  var feature = {
    title: "Vertical Product Lifter",
    tag: "Material Handling",
    image: "assets/images/product-lifter-celkon.jpg",
    ar: 0.75,
    plate: "#f2f2f2",
    before: "Moving parts between levels by hand slows production and risks damage.",
    blurb: "This chain-driven lifter carries components between levels on a guided frame, so material keeps moving without anyone lifting it.",
    impact: {
      key: { label: "Transfer time per part", before: "45 s", after: "20 s", note: "The transfer runs without anyone attending it." },
      support: [
        { label: "Parts moved per hour", before: "about 60", after: "about 180" },
        { label: "Manual lifts per part", before: "1", after: "0" }
      ]
    }
  };

  var benchWeldingStation = {
    title: "Bench Welding Station",
    tag: "Fabrication",
    image: "assets/images/bench-welding-station-1.jpg",
    ar: 0.75,
    plate: "#f2f2f2",
    before: "Small parts positioned by hand sit a little differently each time, so alignment and weld position follow the operator rather than the drawing.",
    blurb: "A motorised axis and indexing head hold small parts in the same position every cycle, so weld quality stops depending on the operator.",
    impact: {
      key: { label: "Setup and alignment per part", before: "90 s", after: "20 s", note: "Headcount is unchanged here. What this station buys is repeatability." },
      support: [
        { label: "Parts welded per hour", before: "about 24", after: "about 45" },
        { label: "Operator positioning", before: "Manual", after: "Indexed" }
      ]
    }
  };

  var machineTendingLine = {
    title: "Machine Tending Line",
    tag: "Industrial Automation",
    image: "assets/images/machine-tending-line.jpg",
    ar: 1.3333,
    plate: "#eeeeee",
    before: "Loading and unloading a machine by hand ties up an operator for the whole cycle.",
    blurb: "This line feeds parts in on a cleated conveyor, moves them across on a linear axis and presents them to the machine, so the cycle runs without anyone standing at it.",
    impact: {
      key: { label: "Operators for three machines", before: "3", after: "1", note: "One operator supervises the line instead of standing at one machine." },
      support: [
        { label: "Time per part, including load", before: "55 s", after: "43 s" },
        { label: "Operator interventions per part", before: "2", after: "0" }
      ]
    }
  };

  /* The infeed end of the line above, so it is shown as a closer look at that
     machine and carries no impact of its own. Counting one result twice is how
     a portfolio starts to feel padded. */
  var machineTendingStation = {
    title: "Transfer Station Detail",
    tag: "Industrial Automation",
    image: "assets/images/machine-tending-station.jpg",
    ar: 1.0,
    plate: "#eeeeee",
    blurb: "The infeed end of the same line. The cleated belt sets part spacing, and the slide below carries each part into the pick position on a repeatable stroke.",
    detail: {
      title: "Part of the Machine Tending Line",
      items: ["Cleated belt sets part spacing", "Linear slide runs on twin rails"]
    }
  };

  var inclineBeltLifter = {
    title: "Incline Belt Lifter",
    tag: "Material Handling",
    image: "assets/images/incline-belt-lifter-kcm.jpg",
    ar: 0.75,
    plate: "#f2f2f2",
    before: "Feeding the next station by hand means someone lifts every piece between levels.",
    blurb: "Raises product to the next station on a continuous run, so feeding stays steady and operators are not lifting between levels."
  };

  /* The one project with a motion study attached. The video is the same
     mechanism as the still, so they are shown together rather than apart. */
  var retrofitJobHandling = {
    title: "Retrofit Job Handling",
    tag: "Custom Engineering",
    image: "assets/images/retrofit-job-handling.jpg",
    ar: 1.0,
    plate: "#f0f0f0",
    before: "Taking the finished part out by hand needs an operator free at the end of every cycle, and the machine waits until one is.",
    blurb: "Added to a machine already running on the floor. A gripper lifts the finished part clear and releases it onto a chute, so unloading no longer needs a hand in the machine between cycles.",
    impact: {
      key: { label: "Unload time per cycle", before: "18 s", after: "5 s", note: "The machine you already own stays in service. The automation is built around it." },
      support: [
        { label: "Manual unloading", before: "1", after: "0" },
        { label: "Existing machine", before: "Retained", after: "Automated" }
      ]
    },
    video: "assets/video/retrofit-job-handling.mp4",
    videoPoster: "assets/images/retrofit-job-handling-poster.jpg",
    videoLabel: "Motion study"
  };

  /* Described only from what the render shows: an enclosed cabinet, an opening
     in the top, hinged access doors and braked castors. What it decomposes, how
     much and for whom are not stated, because none of that is visible and none
     of it has been confirmed. It carries the light `detail` treatment for the
     same reason: there is no known before to set it against. */
  var decomposer = {
    title: "Mobile Decomposer",
    tag: "Custom Machines",
    image: "assets/images/decomposer.jpg",
    ar: 1.0,
    plate: "#dbdbde",
    blurb: "A decomposer built as one enclosed sheet metal cabinet. Material goes in through the opening in the top, hinged doors open the chamber up for access, and it stands on braked castors so it can be moved into place.",
    detail: {
      title: "Sheet metal construction",
      items: ["Loading opening in the top panel", "Hinged doors for access to the chamber", "Mobile on braked castors"]
    }
  };

  var operatorTestBench = {
    title: "Operator Test Bench",
    tag: "Fabrication",
    image: "assets/images/operator-test-bench.jpg",
    ar: 0.8,
    plate: "#f1f1f1",
    blurb: "A test and inspection station built to working height, with the instrument shelf, worktop and keyboard tray set where an operator actually reaches during a shift.",
    detail: {
      title: "Built around the operator",
      items: ["Instrument shelf above the worktop", "Keyboard tray below the worktop"]
    }
  };

  var workTable = {
    title: "Shop Floor Work Table",
    tag: "Fabrication",
    image: "assets/images/shop-floor-work-table.jpg",
    ar: 1.0,
    plate: "#f1f1f1",
    blurb: "A fabricated table with seating for four, built as one welded frame so it stays square and steady under daily shop floor use.",
    detail: {
      title: "Fabrication work",
      items: ["Seating for four on swing-out arms", "Single welded frame"]
    }
  };

  /* Design work, so it carries no production figures. What changes here is when
     a problem is found, not how fast a part moves. */
  var motionStudy = {
    title: "Mechanism Motion Study",
    tag: "Engineering Design",
    image: "assets/images/mechanism-motion-study-poster.jpg",
    ar: 1.7778,
    plate: "#eef0f2",
    before: "Clearance and interference found after the parts are cut means cutting them again.",
    blurb: "Before a mechanism is built, we simulate its travel in 3D. Here a platen is raised and lowered on guide pillars by pneumatic actuation, so stroke, clearance and interference are checked while changes are still cheap.",
    results: [
      { dir: "down", text: "Physical trial and error" },
      { dir: "up", text: "Design confidence" }
    ],
    video: "assets/video/mechanism-motion-study.mp4",
    videoPoster: "assets/images/mechanism-motion-study-poster.jpg",
    videoLabel: "Motion study"
  };

  /* Engineering Notes. One is shown per page load. A first-time visitor always
     gets note 0, the fixture one, because it is the note that connects the idea
     to what ERK actually builds; after that it is random, so a refresh or a
     shared link shows something else. No daily framing and no carousel: this is
     a discovery element, not a content commitment.

     Every claim here is verified. Do not add one that is not. */
  var notes = [
    {
      title: "A good fixture does arithmetic.",
      body: "A weld shrinks as it cools and drags the metal with it. So fabricators set the parts deliberately out of square, and the joint pulls itself straight as it cools. The fixture is not just holding the work, it is predicting where the work will move.",
      href: "#work",
      link: "See how ERK approaches fabrication"
    },
    {
      title: "You cannot make one flat surface. You can make three.",
      body: "Rub two plates together and they settle into a matching dome and hollow. Take three, lap each against the other two in turn, and the only shape all three can share is flat. Precision was bootstrapped out of nothing this way.",
      href: "#what-we-do",
      link: "How we work"
    },
    {
      title: "Flat is sticky.",
      body: "Two steel gauge blocks, lapped flat enough and slid together, hold against roughly 300 N of pull. There is no magnetism and no glue. It is mostly molecular attraction and surface tension in a film too thin to see.",
      href: "#capabilities",
      link: "What we can make"
    },
    {
      title: "Robots came before microprocessors.",
      body: "The first industrial robot started work in 1961, unloading a die casting press at a General Motors plant in New Jersey. Two tonnes, hydraulic, and it stored its program on a spinning magnetic drum. The microprocessor was still a decade away.",
      href: "#work",
      link: "See the machines we build"
    },
    {
      title: "The Royal Navy mass-produced pulleys in 1808.",
      body: "A workshop at Portsmouth ran 45 purpose-built machines, of 22 types, turning out 130,000 pulley blocks a year. Ten unskilled men did the work of 110 skilled blockmakers. The machine, not the craftsman, now held the skill.",
      href: "#work",
      link: "See the machines we build"
    },
    {
      title: "Some gears work by bending.",
      body: "A strain wave gear transmits torque by flexing a thin steel cup out of round as it turns. That gives reduction ratios in the hundreds from one compact stage, with almost no backlash. Many robot joints move precisely by deforming metal on purpose.",
      href: "#work",
      link: "See the machines we build"
    },
    {
      title: "A tight bolt is a stretched spring.",
      body: "Clamping force comes from elastic stretch in the bolt, not from friction on the threads. Torque is only an indirect guess at how far you have stretched it. On critical joints, engineers measure the stretch rather than trust the wrench.",
      href: "#what-we-do",
      link: "How we work"
    },
    {
      title: "Sharp corners are stress concentrators.",
      body: "A sharp internal corner concentrates stress far above the average across the section. Add a generous radius and the same part, in the same material, carries loads that would crack it at a sharp corner. It is one of the cheapest strength improvements available in machine design.",
      href: "#what-we-do",
      link: "How we work"
    },
    {
      title: "A drill can cut a square hole.",
      body: "A Reuleaux triangle measures the same width in every direction, so it can rotate inside a square while touching all four sides. Mounted correctly it cuts a square hole with very slightly rounded corners. The rest is genuinely square.",
      href: "#capabilities",
      link: "What we can make"
    },
    {
      title: "The chip carries the heat away.",
      body: "In metal cutting, roughly 80 percent of the heat leaves with the chip, about 10 percent goes into the tool and 10 percent into the part. That is why chips come off blue while the component stays comparatively cool. Chip colour is a temperature reading a machinist can see.",
      href: "#capabilities",
      link: "What we can make"
    },
    {
      title: "Interchangeable was an invention.",
      body: "Until 1841 there was no standard screw thread. Every workshop cut its own, so a broken bolt often meant going back to the firm that built the machine. Joseph Whitworth measured a range of existing screws, proposed one uniform system, and by 1858 it was in general use.",
      href: "#capabilities",
      link: "What we can make"
    },
    {
      title: "Machine beds were left out in the rain.",
      body: "Old machine tool builders stood cast iron beds outdoors for a year or more before machining them. Weather and time relieved the internal stresses left by casting, so the finished machine would not slowly twist out of true. Some things could not be hurried.",
      href: "#what-we-do",
      link: "How we work"
    }
  ];

  /* Composition. The five case studies each take a feature band, alternating
     sides, so the machine stays the largest thing on screen and the reading
     order runs machine, problem, what we built, what changed. The lighter items
     pair off between them, which keeps the section from becoming seven
     identical full width blocks. */
  var bands = [
    { type: "feature", item: feature },
    { type: "feature", item: benchWeldingStation, reversed: true },
    { type: "feature", item: machineTendingLine },
    { type: "row", items: [machineTendingStation, inclineBeltLifter] },
    { type: "feature", item: retrofitJobHandling, reversed: true },
    { type: "feature", item: decomposer },
    { type: "row", items: [operatorTestBench, workTable] },
    { type: "feature", item: motionStudy, reversed: true }
  ];

  /* Team. Anyone marked `pinned` leads the row; everyone else follows in
     alphabetical order. Sorting happens at render time, so the order holds
     even if entries are added out of order.

     To add a photo later, set `photo` to its path, e.g. "assets/team/rathna.jpg".
     Until then each card falls back to the person's initials, so the layout is
     identical with or without photos. Square images work best; they are
     centre-cropped to a square. */
  var team = [
    { name: "Agathiyan", title: "Lead Strategic Engineer", photo: null },
    { name: "Bala", title: "Lead Operations Engineer", photo: null },
    { name: "Bharathi", title: "Lead Solutions Engineer", photo: null },
    { name: "Chandrukash", title: "Lead Business Engineer", photo: null },
    { name: "Rathna", title: "Lead Project Engineer", photo: null, pinned: true }
  ];

  function el(tag, cls) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    return n;
  }

  function plate(item, maxHeight) {
    var p = el("div", "plate");
    p.style.setProperty("--ar", String(item.ar));
    p.style.setProperty("--plate", item.plate);
    if (maxHeight) p.style.setProperty("--maxh", maxHeight);

    var img = el("img");
    img.src = item.image;
    img.alt = item.alt || (item.title + " designed by ERK");
    img.loading = "lazy";
    img.decoding = "async";
    p.appendChild(img);
    return p;
  }

  /* Video plate. Nothing downloads until the visitor presses play: the poster
     carries the still, preload is off, and the <video> is only created on
     demand. That keeps the page weight the same whether or not videos are
     watched, and means two clips can never start playing at once. */
  function videoPlate(item) {
    var p = el("div", "plate plate-video");
    p.style.setProperty("--ar", String(item.ar));
    p.style.setProperty("--plate", item.plate);

    /* Use the item's own still here, not the video poster, so the picture
       matches the plate's declared aspect ratio and nothing is letterboxed
       before playback. The poster is still handed to the <video> itself. */
    var img = el("img");
    img.src = item.image;
    img.alt = item.alt || (item.title + " designed by ERK");
    img.loading = "lazy";
    img.decoding = "async";

    var btn = el("button", "video-play");
    btn.type = "button";
    btn.setAttribute("aria-label", "Play " + item.title + " motion study");
    btn.innerHTML = '<span class="video-play-icon" aria-hidden="true"></span><span class="video-play-text">' + (item.videoLabel || "Play") + "</span>";

    btn.addEventListener("click", function () {
      if (p.querySelector("video")) return;

      // Stop any clip already running elsewhere on the page
      Array.prototype.forEach.call(document.querySelectorAll("video"), function (v) {
        v.pause();
      });

      var v = document.createElement("video");
      v.src = item.video;
      v.poster = item.videoPoster;
      v.controls = true;
      v.muted = true;          // clips are silent, so this is honest and lets it start
      v.loop = true;
      v.playsInline = true;
      v.setAttribute("playsinline", "");
      v.preload = "auto";
      v.className = "plate-video-el";
      p.appendChild(v);
      p.classList.add("is-playing");
      var playing = v.play();
      if (playing && playing.catch) playing.catch(function () { /* leave controls for the user */ });
    });

    p.append(img, btn);
    return p;
  }

  function media(item) {
    return item.video ? videoPlate(item) : plate(item);
  }

  function step(label, text, isAfter) {
    var s = el("div", "impact-step");
    var l = el("span", "impact-label" + (isAfter ? " is-after" : ""));
    l.textContent = label;
    var p = el("p");
    p.textContent = text;
    s.append(l, p);
    return s;
  }

  /* A before to after pair of values, used at both sizes. The improved value
     is the only part that changes colour, so the eye lands on it without any
     surrounding box being needed. */
  function pair(prefix, before, after) {
    var wrap = el("span", prefix + "-value");
    var b = el("span", prefix + "-before");
    b.textContent = before;
    var arrow = el("span", prefix + "-arrow");
    arrow.textContent = "\u2192";
    arrow.setAttribute("aria-hidden", "true");
    var a = el("span", prefix + "-after");
    a.textContent = after;
    wrap.append(b, arrow, a);
    return wrap;
  }

  /* The headline change, set large. One per project, and it is chosen to be the
     thing that actually changed about the operation rather than whichever
     number happens to look biggest. */
  function keyMetric(k) {
    var box = el("div", "impact-key");

    var label = el("span", "km-label");
    label.textContent = k.label;
    box.append(label, pair("km", k.before, k.after));

    if (k.note) {
      var note = el("p", "km-note");
      note.textContent = k.note;
      box.appendChild(note);
    }
    return box;
  }

  /* Supporting figures. Quiet on purpose: no rules between rows, no colour, no
     box. They are evidence under the headline, not competing headlines. */
  function supportMetrics(rows) {
    var ul = el("ul", "impact-support");
    rows.forEach(function (r) {
      var li = el("li");
      var label = el("span", "sm-label");
      label.textContent = r.label;
      li.append(label, pair("sm", r.before, r.after));
      ul.appendChild(li);
    });
    return ul;
  }

  function resultsBlock(rows) {
    var ul = el("ul", "impact-results");
    rows.forEach(function (r) {
      var li = el("li", r.dir === "up" ? "is-up" : "is-down");
      li.textContent = r.text;
      ul.appendChild(li);
    });
    return ul;
  }

  /* A short specification, for the items that are fabrication evidence rather
     than a change story. No impact is claimed, because none was made. */
  function detailBlock(d) {
    var box = el("div", "impact-detail");
    var t = el("span", "impact-label");
    t.textContent = d.title;
    var ul = el("ul", "detail-list");
    d.items.forEach(function (text) {
      var li = el("li");
      li.textContent = text;
      ul.appendChild(li);
    });
    box.append(t, ul);
    return box;
  }

  /* The case study panel: the manual method, what we built, then what changed.
     An item with no `impact` simply stops after the two paragraphs, which is
     what keeps the lighter projects light. */
  function impact(item) {
    var box = el("div", "impact");
    box.append(step("Before", item.before, false), step("After", item.blurb, true));

    if (SHOW_FIGURES && item.impact) {
      var fig = el("div", "impact-figures");
      fig.appendChild(keyMetric(item.impact.key));
      if (item.impact.support && item.impact.support.length) {
        fig.appendChild(supportMetrics(item.impact.support));
      }
      box.appendChild(fig);
    } else if (item.results && item.results.length) {
      box.appendChild(resultsBlock(item.results));
    }
    return box;
  }

  /* Body copy for an item: the panel if it has one, otherwise the plain blurb. */
  function body(item) {
    if (item.before) return impact(item);

    var p = el("p");
    p.textContent = item.blurb;
    if (!item.detail) return p;

    var wrap = el("div", "work-body");
    wrap.append(p, detailBlock(item.detail));
    return wrap;
  }

  function meta(item) {
    var m = el("div", "work-meta");
    var tag = el("span", "label");
    tag.textContent = item.tag;
    var h = el("h3");
    h.textContent = item.title;
    m.append(tag, h, body(item));
    return m;
  }

  function featureBand(item, reversed) {
    var band = el("div", "work-feature reveal" + (reversed ? " is-reversed" : ""));

    var copy = el("div", "work-feature-copy");
    var tag = el("span", "label");
    tag.textContent = item.tag;
    var h3 = el("h3");
    h3.textContent = item.title;
    copy.append(tag, h3, body(item));

    /* A video band opens on its own play control, so it does not also offer a
       "view larger" that would fight with it. */
    if (!item.video) {
      var link = el("button", "link-arrow");
      link.type = "button";
      link.textContent = "View larger →";
      link.addEventListener("click", function () { open(item); });
      copy.appendChild(link);
    }

    var visual = el("div", "work-feature-visual");
    /* Height cap comes from CSS so it stays responsive. Passing it here would
       set an inline custom property that overrides the stylesheet. */
    var pl = media(item);
    if (!item.video) {
      pl.style.cursor = "pointer";
      pl.addEventListener("click", function () { open(item); });
    }
    visual.appendChild(pl);

    band.append(copy, visual);
    return band;
  }

  function rowBand(items) {
    var r = el("div", "work-row reveal");
    items.forEach(function (item) {
      var cell = el("div", "work-item");
      cell.style.setProperty("--ar", String(item.ar));
      cell.appendChild(media(item));
      cell.appendChild(meta(item));
      if (!item.video) {
        cell.addEventListener("click", function () { open(item); });
      }
      r.appendChild(cell);
    });
    return r;
  }

  function renderWork() {
    var root = document.getElementById("work-root");
    if (!root) return;

    bands.forEach(function (band) {
      if (band.type === "row") {
        root.appendChild(rowBand(band.items));
      } else {
        root.appendChild(featureBand(band.item, band.reversed));
      }
    });
  }

  function open(item) {
    var lb = document.getElementById("lightbox");
    var img = document.getElementById("lightbox-image");
    var tag = document.getElementById("lightbox-tag");
    var title = document.getElementById("lightbox-title");
    var desc = document.getElementById("lightbox-desc");
    if (!lb || !img) return;

    img.src = item.image;
    img.alt = item.title + " designed by ERK";
    img.style.background = item.plate;
    tag.textContent = item.tag;
    title.textContent = item.title;

    /* An item with a panel shows the panel here instead of the plain blurb,
       since the blurb is the panel's "after" line and would otherwise appear
       twice in the same caption. */
    var slot = document.getElementById("lightbox-impact");
    if (slot) slot.innerHTML = "";
    if (item.before && slot) {
      desc.textContent = "";
      desc.hidden = true;
      slot.appendChild(impact(item));
    } else {
      desc.hidden = false;
      desc.textContent = item.blurb;
    }

    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function close() {
    var lb = document.getElementById("lightbox");
    if (!lb) return;
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function lightboxControls() {
    var lb = document.getElementById("lightbox");
    var btn = document.getElementById("lightbox-close");
    if (!lb || !btn) return;

    btn.addEventListener("click", close);
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  function initials(name) {
    return name.trim().split(/\s+/).map(function (w) { return w.charAt(0); }).join("").slice(0, 2).toUpperCase();
  }

  function renderTeam() {
    var root = document.getElementById("team-root");
    if (!root) return;

    var grid = el("div", "team-grid");

    team.slice().sort(function (a, b) {
      var ap = a.pinned ? 0 : 1;
      var bp = b.pinned ? 0 : 1;
      if (ap !== bp) return ap - bp;
      return a.name.localeCompare(b.name);
    }).forEach(function (person) {
      var card = el("div", "team-card");

      var avatar = el("div", "team-avatar");
      if (person.photo) {
        var img = el("img");
        img.src = person.photo;
        img.alt = person.name + ", " + person.title + " at ERK";
        img.loading = "lazy";
        img.decoding = "async";
        avatar.appendChild(img);
      } else {
        var ini = el("span", "team-initials");
        ini.textContent = initials(person.name);
        ini.setAttribute("aria-hidden", "true");
        avatar.appendChild(ini);
      }

      var name = el("h3");
      name.textContent = person.name;
      var title = el("p");
      title.textContent = person.title;

      card.append(avatar, name, title);
      grid.appendChild(card);
    });

    root.appendChild(grid);
  }

  function reveals() {
    var nodes = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    if (!nodes.length) return;

    if (!("IntersectionObserver" in window)) {
      nodes.forEach(function (n) { n.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    nodes.forEach(function (n) { io.observe(n); });

    /* Safety net: content must never stay invisible if the observer misses. */
    window.setTimeout(function () {
      nodes.forEach(function (n) { n.classList.add("is-visible"); });
    }, 2500);
  }

  function mobileNav() {
    var header = document.querySelector("header");
    var toggle = document.getElementById("nav-toggle");
    if (!header || !toggle) return;

    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    document.querySelectorAll("#nav-links a").forEach(function (a) {
      a.addEventListener("click", function () {
        header.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* The hero render is static markup so it paints immediately, but it opens in
     the same lightbox as the work items. No video is wired here: neither clip
     shows this machine, and an unrelated animation would misrepresent it. */
  function enableHeroPlate() {
    var plate = document.getElementById("hero-plate");
    if (!plate) return;

    var img = plate.querySelector("img");
    plate.addEventListener("click", function () {
      open({
        title: "Robotic Welding System",
        tag: "Industrial Automation",
        image: img.getAttribute("src"),
        plate: "#eeeeee",
        before: "Welding a joint like this by hand keeps the operator at the arc for the whole run, and the part has to be repositioned between passes.",
        blurb: "A six-axis arm welds a cylindrical part held on a rotary positioner, so the joint runs at a steady speed instead of depending on a welder's hand.",
        impact: {
          key: { label: "Welders at the arc", before: "1", after: "0", note: "The operator loads and unloads instead of standing at the arc for the whole run." },
          support: [
            { label: "Cycle time per joint", before: "5 min", after: "3 min" },
            { label: "Repositioning stops per joint", before: "4", after: "0" }
          ]
        }
      });
    });
  }

  function renderNote() {
    var root = document.getElementById("note");
    if (!root || !notes.length) return;

    /* First visit gets the fixture note, later visits are random. If storage is
       unavailable, fall back to the fixture note rather than failing. */
    var index = 0;
    try {
      if (window.localStorage.getItem("erk-note-seen")) {
        index = Math.floor(Math.random() * notes.length);
      }
      window.localStorage.setItem("erk-note-seen", "1");
    } catch (e) {
      index = 0;
    }

    var n = notes[index];
    root.querySelector(".note-title").textContent = n.title;
    root.querySelector(".note-body").textContent = n.body;
    var a = root.querySelector(".note-link");
    a.textContent = n.link + " →";
    a.setAttribute("href", n.href);
  }

  /* The caveat belongs to the figures, so it appears and disappears with them. */
  function renderCaveat() {
    var c = document.getElementById("work-caveat");
    if (!c || !SHOW_FIGURES) return;
    c.textContent = "Illustrative impact. Figures shown are based on a representative operating scenario, not measured results from a specific installation. Actual performance varies with part, cycle, volume and plant conditions.";
    c.hidden = false;
  }

  renderWork();
  renderCaveat();
  renderTeam();
  renderNote();
  enableHeroPlate();
  lightboxControls();
  reveals();
  mobileNav();
})();

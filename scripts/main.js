(function () {
  /* Each render carries its own measured aspect ratio and background colour.
     The plate uses both, so the machine is never cropped and the plate edge
     is never visible. To add a machine later, add an entry here. */
  var feature = {
    title: "Vertical Product Lifter",
    tag: "Material Handling",
    image: "assets/images/product-lifter-celkon.jpg",
    ar: 0.75,
    plate: "#f2f2f2",
    blurb: "Moving parts between levels by hand slows production and risks damage. This chain-driven lifter carries components between levels on a guided frame, so material keeps moving without anyone lifting it."
  };

  var inclineBeltLifter = {
    title: "Incline Belt Lifter",
    tag: "Material Handling",
    image: "assets/images/incline-belt-lifter-kcm.jpg",
    ar: 0.75,
    plate: "#f2f2f2",
    blurb: "Raises product to the next station on a continuous run, so feeding stays steady and operators are not lifting between levels."
  };

  var benchWeldingStation = {
    title: "Bench Welding Station",
    tag: "Fabrication",
    image: "assets/images/bench-welding-station-1.jpg",
    ar: 0.75,
    plate: "#f2f2f2",
    blurb: "A motorised axis and indexing head hold small parts in the same position every cycle, so weld quality stops depending on the operator."
  };

  var machineTendingLine = {
    title: "Machine Tending Line",
    tag: "Industrial Automation",
    image: "assets/images/machine-tending-line.jpg",
    ar: 1.3333,
    plate: "#eeeeee",
    blurb: "Loading and unloading a machine by hand ties up an operator for the whole cycle. This line feeds parts in on a cleated conveyor, moves them across on a linear axis and presents them to the machine, so the cycle runs without anyone standing at it."
  };

  var machineTendingStation = {
    title: "Transfer Station Detail",
    tag: "Industrial Automation",
    image: "assets/images/machine-tending-station.jpg",
    ar: 1.0,
    plate: "#eeeeee",
    blurb: "The infeed end of the same line. The cleated belt sets part spacing, and the slide below carries each part into the pick position on a repeatable stroke."
  };

  /* The one project with a motion study attached. The video is the same
     mechanism as the still, so they are shown together rather than apart. */
  var retrofitJobHandling = {
    title: "Retrofit Job Handling",
    tag: "Custom Engineering",
    image: "assets/images/retrofit-job-handling.jpg",
    ar: 1.0,
    plate: "#f0f0f0",
    blurb: "Added to a machine already running on the floor. A gripper lifts the finished part clear and releases it onto a chute, so unloading no longer needs a hand in the machine between cycles.",
    video: "assets/video/retrofit-job-handling.mp4",
    videoPoster: "assets/images/retrofit-job-handling-poster.jpg",
    videoLabel: "Motion study"
  };

  var operatorTestBench = {
    title: "Operator Test Bench",
    tag: "Fabrication",
    image: "assets/images/operator-test-bench.jpg",
    ar: 0.8,
    plate: "#f1f1f1",
    blurb: "A test and inspection station built to working height, with the instrument shelf, worktop and keyboard tray set where an operator actually reaches during a shift."
  };

  var workTable = {
    title: "Shop Floor Work Table",
    tag: "Fabrication",
    image: "assets/images/shop-floor-work-table.jpg",
    ar: 1.0,
    plate: "#f1f1f1",
    blurb: "A fabricated table with seating for four, built as one welded frame so it stays square and steady under daily shop floor use."
  };

  /* A mechanism motion study. The specific machine it belongs to is not
     confirmed, so it is presented as engineering motion work rather than
     being attached to a named project. */
  var motionStudy = {
    title: "Mechanism Motion Study",
    tag: "Engineering Design",
    image: "assets/images/mechanism-motion-study-poster.jpg",
    ar: 1.7778,
    plate: "#eef0f2",
    blurb: "Before a mechanism is built, we simulate its travel in 3D. Here a platen is raised and lowered on guide pillars by pneumatic actuation, so stroke, clearance and interference are checked while changes are still cheap.",
    video: "assets/video/mechanism-motion-study.mp4",
    videoPoster: "assets/images/mechanism-motion-study-poster.jpg",
    videoLabel: "Motion study"
  };

  /* Section order. Feature bands alternate sides so the page keeps a rhythm,
     and each pair row holds two machines on a shared baseline. */
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

  var bands = [
    { type: "feature", item: feature },
    { type: "row", items: [inclineBeltLifter, benchWeldingStation] },
    { type: "feature", item: machineTendingLine },
    { type: "feature", item: machineTendingStation, reversed: true },
    { type: "feature", item: retrofitJobHandling },
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

  function meta(item) {
    var m = el("div", "work-meta");
    var tag = el("span", "label");
    tag.textContent = item.tag;
    var h = el("h3");
    h.textContent = item.title;
    var p = el("p");
    p.textContent = item.blurb;
    m.append(tag, h, p);
    return m;
  }

  function featureBand(item, reversed) {
    var band = el("div", "work-feature reveal" + (reversed ? " is-reversed" : ""));

    var copy = el("div", "work-feature-copy");
    var tag = el("span", "label");
    tag.textContent = item.tag;
    var h3 = el("h3");
    h3.textContent = item.title;
    var p = el("p");
    p.textContent = item.blurb;
    copy.append(tag, h3, p);

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
    desc.textContent = item.blurb;

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
        blurb: "A six-axis arm welds a cylindrical part held on a rotary positioner, so the joint runs at a steady speed instead of depending on a welder's hand."
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

  renderWork();
  renderTeam();
  renderNote();
  enableHeroPlate();
  lightboxControls();
  reveals();
  mobileNav();
})();

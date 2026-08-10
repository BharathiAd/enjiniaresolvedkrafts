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
    blurb: "Moving product between levels by hand slows a line and risks damage. This chain-driven lifter transfers components between production levels on a guided frame, removing the manual step and keeping material flowing at line pace."
  };

  var row = [
    {
      title: "Incline Belt Lifter",
      tag: "Material Handling",
      image: "assets/images/incline-belt-lifter-kcm.jpg",
      ar: 0.75,
      plate: "#f2f2f2",
      blurb: "Raises product to the next station on a continuous run, so feeding stays steady and operators are not lifting between levels."
    },
    {
      title: "Bench Welding Station",
      tag: "Fabrication",
      image: "assets/images/bench-welding-station-1.jpg",
      ar: 0.75,
      plate: "#f2f2f2",
      blurb: "A motorised axis and indexing head hold small parts in the same position every cycle, so weld quality stops depending on the operator."
    }
  ];

  /* Second view of the same bench station. Shown as its own reversed band so
     it reads as a detail of that project, not a duplicate tile in the grid. */
  var closer = {
    title: "Gantry and Fixture Detail",
    tag: "Fabrication",
    image: "assets/images/bench-welding-station-2.jpg",
    ar: 0.75,
    plate: "#f2f2f2",
    blurb: "The same station from another angle. The gantry frame, pneumatic cylinder and fixture hold the part square through the weld, which is what makes the result repeatable rather than skill-dependent."
  };

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
    img.alt = item.title + " designed by ERK";
    img.loading = "lazy";
    img.decoding = "async";
    p.appendChild(img);
    return p;
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
    var link = el("button", "link-arrow");
    link.type = "button";
    link.textContent = "View larger →";
    link.addEventListener("click", function () { open(item); });
    copy.append(tag, h3, p, link);

    var visual = el("div", "work-feature-visual");
    /* Height cap comes from CSS so it stays responsive. Passing it here would
       set an inline custom property that overrides the stylesheet. */
    var pl = plate(item);
    pl.style.cursor = "pointer";
    pl.addEventListener("click", function () { open(item); });
    visual.appendChild(pl);

    band.append(copy, visual);
    return band;
  }

  function renderWork() {
    var root = document.getElementById("work-root");
    if (!root) return;

    /* Tallest, most graphic machine leads the section */
    root.appendChild(featureBand(feature, false));

    /* Pair: two machines sharing a baseline, like equipment on a floor */
    var r = el("div", "work-row reveal");
    row.forEach(function (item) {
      var cell = el("div", "work-item");
      cell.style.setProperty("--ar", String(item.ar));
      cell.appendChild(plate(item));
      cell.appendChild(meta(item));
      cell.addEventListener("click", function () { open(item); });
      r.appendChild(cell);
    });
    root.appendChild(r);

    /* Closing band, mirrored so the section does not repeat its own rhythm */
    root.appendChild(featureBand(closer, true));
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

  renderWork();
  lightboxControls();
  reveals();
  mobileNav();
})();

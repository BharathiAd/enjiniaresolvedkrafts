(function () {
  const items = Array.isArray(window.showcaseItems) ? window.showcaseItems : [];
  const showcaseRoot = document.getElementById("showcase-root");
  const storyGridRoot = document.getElementById("story-grid-root");
  const experienceStage = document.getElementById("experience-stage");
  const experienceSteps = document.getElementById("experience-steps");
  const videoRoot = document.getElementById("video-showcase-root");
  const categoryRoot = document.getElementById("category-showcase-root");
  const statsRoot = document.getElementById("showcase-stats");
  const filterRoot = document.getElementById("showcase-filters");
  const detailPage = document.getElementById("detail-page");
  const detailRoot = document.getElementById("detail-root");
  const heroSection = document.querySelector(".hero-motion");
  const navbar = document.querySelector(".navbar");
  const logoLink = document.querySelector(".logo");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll(".nav-links a");
  const homeSections = Array.from(document.querySelectorAll("[data-page='home']"));
  const pageLoader = document.getElementById("page-loader");
  const routeOverlay = document.getElementById("route-overlay");
  const scrollProgress = document.getElementById("scroll-progress");
  const themeToggle = document.getElementById("theme-toggle");
  const cursorHalo = document.getElementById("cursor-halo");
  const cursorDot = document.getElementById("cursor-dot");

  if (
    !items.length ||
    !showcaseRoot ||
    !storyGridRoot ||
    !experienceStage ||
    !experienceSteps ||
    !videoRoot ||
    !categoryRoot ||
    !statsRoot ||
    !filterRoot ||
    !detailPage ||
    !detailRoot
  ) {
    enableThemeToggle();
    enableScrollProgress();
    enableCursorEffects();
    finishLoading();
    return;
  }

  const categoryOrder = ["Projects", "Machines", "Automation", "Manufacturing Process", "Fabrication", "Tools", "Others"];
  const themes = {
    Projects: { tone: "Integrated Build Story", glow: "#f7941d", gradient: "linear-gradient(135deg, rgba(247, 148, 29, 0.42), rgba(18, 61, 106, 0.85))" },
    Machines: { tone: "Purpose-Built Machinery", glow: "#ff8f4c", gradient: "linear-gradient(135deg, rgba(255, 122, 24, 0.4), rgba(92, 25, 8, 0.88))" },
    Automation: { tone: "Motion And Line Control", glow: "#26d0ce", gradient: "linear-gradient(135deg, rgba(38, 208, 206, 0.42), rgba(17, 40, 86, 0.9))" },
    "Manufacturing Process": { tone: "Process Engineering", glow: "#ffb800", gradient: "linear-gradient(135deg, rgba(255, 184, 0, 0.38), rgba(89, 42, 0, 0.9))" },
    Fabrication: { tone: "Fabrication Precision", glow: "#fb923c", gradient: "linear-gradient(135deg, rgba(234, 88, 12, 0.4), rgba(66, 16, 12, 0.92))" },
    Others: { tone: "Engineering Showcase", glow: "#7c8cff", gradient: "linear-gradient(135deg, rgba(116, 129, 255, 0.34), rgba(17, 28, 51, 0.9))" }
  };
  let currentFilter = "All";

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) {
      node.className = className;
    }
    if (typeof text === "string") {
      node.textContent = text;
    }
    return node;
  }

  function finishLoading() {
    const markLoaded = () => {
      document.body.classList.add("is-loaded");
      if (pageLoader) {
        pageLoader.setAttribute("aria-hidden", "true");
      }
    };

    if (document.readyState === "complete") {
      window.requestAnimationFrame(markLoaded);
      return;
    }

    window.addEventListener("load", () => {
      window.requestAnimationFrame(markLoaded);
    }, { once: true });

    window.setTimeout(markLoaded, 1200);
  }

  function triggerRouteOverlay() {
    if (!routeOverlay) {
      return;
    }

    document.body.classList.add("is-routing");
    window.setTimeout(() => {
      document.body.classList.remove("is-routing");
    }, 320);
  }

  function enableThemeToggle() {
    if (!themeToggle) {
      return;
    }

    const storageKey = "erk-theme";
    const root = document.documentElement;
    const savedTheme = window.localStorage.getItem(storageKey);
    if (savedTheme === "light" || savedTheme === "dark") {
      root.setAttribute("data-theme", savedTheme);
      themeToggle.setAttribute("aria-pressed", String(savedTheme === "light"));
    }

    themeToggle.addEventListener("click", () => {
      const nextTheme = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", nextTheme);
      themeToggle.setAttribute("aria-pressed", String(nextTheme === "light"));
      window.localStorage.setItem(storageKey, nextTheme);
    });
  }

  function enableScrollProgress() {
    if (!scrollProgress) {
      return;
    }

    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 0;
      scrollProgress.style.transform = `scaleX(${ratio.toFixed(3)})`;
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  function enableCursorEffects() {
    if (!cursorHalo || !cursorDot) {
      return;
    }

    const supportsFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!supportsFinePointer || prefersReducedMotion) {
      return;
    }

    const moveCursor = (event) => {
      cursorHalo.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      cursorDot.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      document.body.classList.add("cursor-active");
    };

    document.addEventListener("pointermove", moveCursor, { passive: true });
    document.addEventListener("pointerleave", () => {
      document.body.classList.remove("cursor-active", "cursor-linking");
    });
    document.addEventListener("pointerover", (event) => {
      const interactive = event.target.closest("a, button, .tilt-surface");
      document.body.classList.toggle("cursor-linking", Boolean(interactive));
    });
  }

  function themeFor(item) {
    return themes[item.category] || themes.Others;
  }

  function detailModel(item) {
    const theme = themeFor(item);
    const categoryLower = item.category.toLowerCase();
    return {
      ...item,
      theme,
      summary: `${item.name} reflects ERK's ${categoryLower} capability with a production-first approach to machine behavior, build quality, and floor-level practicality.`,
      impact: `This reference helps position ERK as a partner for teams that need custom ${categoryLower}, stronger execution clarity, and equipment shaped around real manufacturing requirements.`,
      metrics: [
        item.type === "video" ? "Operational proof" : "Build clarity",
        item.category === "Automation" ? "Flow control" : "Execution confidence",
        item.category === "Manufacturing Process" ? "Process consistency" : "Production readiness"
      ],
      capabilities: [
        item.category,
        item.type === "video" ? "Machine operation" : "Delivered build",
        "Custom engineering"
      ]
    };
  }

  function mediaVisual(item) {
    const wrap = el("div", "media-card-visual");
    wrap.style.setProperty("--story-gradient", themeFor(item).gradient);

    if (item.type === "video") {
      const video = el("video", "video-player");
      video.controls = true;
      video.preload = "none";
      video.playsInline = true;
      video.setAttribute("data-src", item.path);
      video.setAttribute("title", item.name);
      wrap.appendChild(video);
      return wrap;
    }

    const image = el("img");
    image.src = item.path;
    image.alt = item.name;
    image.loading = "lazy";
    image.decoding = "async";
    wrap.appendChild(image);
    return wrap;
  }

  function card(item, variant) {
    const article = el("article", "media-card");
    article.setAttribute("data-category", item.category);
    if (variant) {
      article.classList.add(`${variant}-card`);
    }
    if (variant === "story") {
      article.classList.add("story-card");
    }

    const body = el("div", "media-card-body");
    body.append(
      el("span", "media-category-pill", item.category),
      el("h3", "", item.name),
      el("p", "", variant === "story" ? detailModel(item).summary : item.description)
    );

    if (variant === "story") {
      const footer = el("div", "story-card-footer");
      const link = el("a", "story-link", "Open Story Page");
      link.href = `?page=${encodeURIComponent(item.slug)}`;
      link.setAttribute("data-route", item.slug);
      footer.append(el("span", "story-tone", themeFor(item).tone), link);
      body.appendChild(footer);
    }

    article.append(mediaVisual(item), body);
    return article;
  }

  function categorySection(category, entries) {
    const section = el("section", "category-section");
    section.id = category.toLowerCase().replace(/\s+/g, "-");
    section.setAttribute("data-category", category);

    const head = el("div", "category-section-head");
    head.append(el("h3", "", category), el("span", "category-count", `${entries.length} item${entries.length === 1 ? "" : "s"}`));

    const grid = el("div", entries.every((entry) => entry.type === "video") ? "video-grid" : "media-grid");
    entries.forEach((entry) => grid.appendChild(card(entry)));
    section.append(head, grid);
    return section;
  }

  function groupByCategory(collection, skipCategories) {
    const skip = new Set(skipCategories || []);
    const groups = new Map();

    collection.forEach((item) => {
      if (skip.has(item.category)) {
        return;
      }
      if (!groups.has(item.category)) {
        groups.set(item.category, []);
      }
      groups.get(item.category).push(item);
    });

    return Array.from(groups.entries()).sort((a, b) => categoryOrder.indexOf(a[0]) - categoryOrder.indexOf(b[0]));
  }

  function loadVideo(video) {
    const src = video.getAttribute("data-src");
    if (!src || video.querySelector("source")) {
      return;
    }
    const source = el("source");
    source.src = src;
    source.type = "video/mp4";
    video.appendChild(source);
    video.load();
  }

  function enableLazyVideos() {
    const videos = Array.from(document.querySelectorAll("video[data-src]"));
    if (!("IntersectionObserver" in window)) {
      videos.forEach(loadVideo);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadVideo(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "200px 0px" });

    videos.forEach((video) => observer.observe(video));
  }

  function applyFilter(filterValue) {
    currentFilter = filterValue;
    const cards = Array.from(document.querySelectorAll(".media-card"));
    const sections = Array.from(document.querySelectorAll(".category-section"));
    const blocks = Array.from(document.querySelectorAll(".showcase-block"));
    const chips = Array.from(document.querySelectorAll(".filter-chip"));

    chips.forEach((chip) => chip.classList.toggle("is-active", chip.getAttribute("data-filter") === filterValue));
    cards.forEach((entry) => {
      const visible = filterValue === "All" || entry.getAttribute("data-category") === filterValue;
      entry.classList.toggle("is-hidden", !visible);
    });
    sections.forEach((section) => {
      section.classList.toggle("is-hidden", section.querySelectorAll(".media-card:not(.is-hidden)").length === 0);
    });
    blocks.forEach((block) => {
      block.classList.toggle("is-hidden", block.querySelectorAll(".media-card:not(.is-hidden)").length === 0);
    });
  }

  function renderStats() {
    const stats = [
      { value: items.length, label: "structured media assets" },
      { value: items.filter((item) => item.type === "image").length, label: "image references" },
      { value: items.filter((item) => item.type === "video").length, label: "process videos" },
      { value: new Set(items.map((item) => item.category)).size, label: "portfolio categories" }
    ];

    stats.forEach((stat) => {
      const block = el("div", "showcase-stat");
      block.append(el("strong", "", String(stat.value)), el("span", "", stat.label));
      statsRoot.appendChild(block);
    });
  }

  function renderFilters() {
    const categories = Array.from(new Set(items.map((item) => item.category))).sort((a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b));
    ["All", ...categories].forEach((value, index) => {
      const button = el("button", "filter-chip", value);
      button.type = "button";
      button.setAttribute("data-filter", value);
      if (index === 0) {
        button.classList.add("is-active");
      }
      button.addEventListener("click", () => applyFilter(value));
      filterRoot.appendChild(button);
    });
  }

  function renderHomeCollections() {
    const featuredGrid = el("div", "project-grid");
    items.filter((item) => item.featured).forEach((item) => featuredGrid.appendChild(card(item, "project")));
    showcaseRoot.appendChild(featuredGrid);

    const storyGrid = el("div", "story-grid");
    items.forEach((item) => storyGrid.appendChild(card(item, "story")));
    storyGridRoot.appendChild(storyGrid);

    groupByCategory(items.filter((item) => item.type === "video")).forEach(([category, entries]) => {
      videoRoot.appendChild(categorySection(category, entries));
    });

    const imageItems = items.filter((item) => item.type === "image");
    groupByCategory(imageItems, ["Projects"]).forEach(([category, entries]) => {
      if (entries.length) {
        categoryRoot.appendChild(categorySection(category, entries));
      }
    });
  }

  function renderExperienceStrip() {
    const stripItems = items.filter((item) => item.featured).slice(0, 4);
    if (!stripItems.length) {
      return;
    }

    stripItems.forEach((item, index) => {
      const panel = el("article", "experience-panel");
      panel.setAttribute("data-experience-panel", item.slug);
      if (index === 0) {
        panel.classList.add("is-active");
      }

      const visual = mediaVisual(item);
      visual.classList.add("experience-panel-visual");

      const overlay = el("div", "experience-panel-copy");
      overlay.append(
        el("span", "media-category-pill", item.category),
        el("h3", "", item.name),
        el("p", "", detailModel(item).summary)
      );

      panel.append(visual, overlay);
      experienceStage.appendChild(panel);

      const step = el("article", "experience-step reveal reveal-right");
      step.setAttribute("data-experience-step", item.slug);
      if (index === 0) {
        step.classList.add("is-active");
      }

      const stepIndex = el("span", "experience-index", `0${index + 1}`);
      const body = el("div", "experience-step-body");
      const openLink = el("a", "story-link", "View Project Story");
      openLink.href = `?page=${encodeURIComponent(item.slug)}`;
      openLink.setAttribute("data-route", item.slug);
      body.append(
        el("span", "story-tone", themeFor(item).tone),
        el("h3", "", item.name),
        el("p", "", item.description),
        openLink
      );

      step.append(stepIndex, body);
      experienceSteps.appendChild(step);
    });
  }

  function setExperienceActive(slug) {
    const panels = Array.from(document.querySelectorAll("[data-experience-panel]"));
    const steps = Array.from(document.querySelectorAll("[data-experience-step]"));

    panels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.getAttribute("data-experience-panel") === slug);
    });

    steps.forEach((step) => {
      step.classList.toggle("is-active", step.getAttribute("data-experience-step") === slug);
    });
  }

  function enableExperienceScroll() {
    const steps = Array.from(document.querySelectorAll("[data-experience-step]"));
    if (!steps.length) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      const first = steps[0].getAttribute("data-experience-step");
      if (first) {
        setExperienceActive(first);
      }
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((left, right) => right.intersectionRatio - left.intersectionRatio);

      if (!visibleEntries.length) {
        return;
      }

      const activeSlug = visibleEntries[0].target.getAttribute("data-experience-step");
      if (activeSlug) {
        setExperienceActive(activeSlug);
      }
    }, {
      threshold: [0.35, 0.55, 0.75],
      rootMargin: "-15% 0px -25% 0px"
    });

    steps.forEach((step) => observer.observe(step));
  }

  function enableRevealEffects() {
    const revealNodes = Array.from(document.querySelectorAll(".reveal"));
    if (!revealNodes.length) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      revealNodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.18,
      rootMargin: "0px 0px -10% 0px"
    });

    revealNodes.forEach((node) => observer.observe(node));
  }

  function enableHeroMotion() {
    if (!heroSection) {
      return;
    }

    const layers = Array.from(heroSection.querySelectorAll("[data-hero-depth]"));
    const content = heroSection.querySelector(".hero-depth-copy");
    const visual = heroSection.querySelector(".hero-depth-visual");
    let ticking = false;

    function updateHeroMotion() {
      ticking = false;
      const rect = heroSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const progress = Math.min(Math.max((viewportHeight - rect.top) / (viewportHeight + rect.height), 0), 1);
      const translateBase = Math.max(window.scrollY * 0.06, 0);

      heroSection.style.setProperty("--hero-progress", progress.toFixed(3));

      if (content) {
        content.style.transform = `translate3d(0, ${translateBase * -0.2}px, 0)`;
      }

      if (visual) {
        visual.style.transform = `translate3d(0, ${translateBase * 0.12}px, 0)`;
      }

      layers.forEach((layer) => {
        const depth = Number(layer.getAttribute("data-hero-depth")) || 0.2;
        const y = translateBase * depth * -1;
        const rotate = (progress - 0.5) * depth * 8;
        layer.style.transform = `translate3d(0, ${y}px, 0) rotate(${rotate}deg)`;
      });
    }

    function requestTick() {
      if (ticking) {
        return;
      }
      ticking = true;
      window.requestAnimationFrame(updateHeroMotion);
    }

    updateHeroMotion();
    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);
  }

  function enableTiltSurfaces(scope) {
    const root = scope || document;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const supportsHoverTilt = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const selector = [
      ".stat",
      ".card",
      ".capability-panel",
      ".spotlight-panel",
      ".experience-stage",
      ".experience-step",
      ".showcase-block",
      ".media-card",
      ".story-launchpad-copy",
      ".story-launchpad-panel",
      ".cta-panel",
      ".detail-copy",
      ".detail-visual",
      ".detail-metric-card",
      ".detail-narrative",
      ".detail-progression",
      ".detail-nav-link"
    ].join(", ");

    const surfaces = Array.from(root.querySelectorAll(selector));
    surfaces.forEach((surface) => {
      surface.classList.add("tilt-surface");
      if (surface.dataset.tiltBound === "true") {
        return;
      }

      surface.dataset.tiltBound = "true";
      if (prefersReducedMotion || !supportsHoverTilt) {
        return;
      }

      const applyTilt = (event) => {
        if (event.pointerType === "touch") {
          return;
        }

        const rect = surface.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        const rotateY = (x - 0.5) * 14;
        const rotateX = (0.5 - y) * 12;
        const translateX = surface.classList.contains("experience-step") && surface.classList.contains("is-active") ? 10 : 0;
        const translateY = surface.classList.contains("experience-step") ? -2 : -8;
        const translateZ = surface.classList.contains("experience-stage") ? 12 : 20;

        surface.style.transform = `perspective(1400px) translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
      };

      const resetTilt = () => {
        surface.style.transform = "";
      };

      surface.addEventListener("pointermove", applyTilt);
      surface.addEventListener("pointerleave", resetTilt);
      surface.addEventListener("pointercancel", resetTilt);
    });
  }

  function setPageMode(mode) {
    const detailMode = mode === "detail";
    homeSections.forEach((section) => section.classList.toggle("is-hidden", detailMode));
    detailPage.classList.toggle("is-hidden", !detailMode);
    document.body.classList.toggle("detail-mode", detailMode);
  }

  function renderDetailPage(slug) {
    const index = items.findIndex((item) => item.slug === slug);
    if (index < 0) {
      showHomePage();
      return;
    }

    const item = detailModel(items[index]);
    const prev = items[(index - 1 + items.length) % items.length];
    const next = items[(index + 1) % items.length];
    const related = items.filter((entry) => entry.slug !== item.slug).slice(0, 3);

    detailRoot.innerHTML = "";
    document.documentElement.style.setProperty("--detail-glow", item.theme.glow);

    const shell = el("div", "detail-shell");
    shell.style.setProperty("--detail-gradient", item.theme.gradient);

    const masthead = el("section", "detail-masthead");
    const copy = el("div", "detail-copy");
    const back = el("a", "detail-back-link", "Back To Overview");
    back.href = "index.html#dynamic-pages";
    back.addEventListener("click", (event) => {
      event.preventDefault();
      navigateHome("#dynamic-pages");
    });

    const caps = el("div", "detail-capabilities");
    item.capabilities.forEach((entry) => caps.appendChild(el("span", "detail-capability-pill", entry)));

    copy.append(
      back,
      el("span", "detail-kicker", item.theme.tone),
      el("h1", "", item.name),
      el("p", "detail-summary", item.summary),
      caps
    );

    const visual = el("div", "detail-visual");
    visual.appendChild(mediaVisual(item).firstChild);
    masthead.append(copy, visual);

    const metrics = el("div", "detail-metric-grid");
    item.metrics.forEach((entry, metricIndex) => {
      const cardNode = el("article", "detail-metric-card");
      cardNode.append(el("span", "detail-metric-index", `0${metricIndex + 1}`), el("p", "", entry));
      metrics.appendChild(cardNode);
    });

    const insights = el("section", "detail-insights");
    const left = el("article", "detail-narrative");
    left.append(el("span", "detail-section-label", item.category), el("h2", "", "Why this ERK page matters"), el("p", "", item.impact));
    const right = el("article", "detail-progression");
    right.append(
      el("span", "detail-section-label", "Engineering Signal"),
      el("h3", "", "What this project communicates"),
      el("p", "", `${item.name} gives buyers a clearer view into ERK's ability to turn application-led requirements into practical machine outcomes.`)
    );
    insights.append(left, right);

    const rail = el("div", "detail-nav-rail");
    const prevLink = el("a", "detail-nav-link", `Previous: ${prev.name}`);
    prevLink.href = `?page=${encodeURIComponent(prev.slug)}`;
    prevLink.setAttribute("data-route", prev.slug);
    const nextLink = el("a", "detail-nav-link", `Next: ${next.name}`);
    nextLink.href = `?page=${encodeURIComponent(next.slug)}`;
    nextLink.setAttribute("data-route", next.slug);
    rail.append(prevLink, nextLink);

    const relatedSection = el("section", "detail-related");
    const relatedHead = el("div", "detail-section-head");
    relatedHead.append(el("span", "detail-section-label", "Related ERK Pages"), el("h3", "", "Explore similar systems and adjacent references"));
    const relatedGrid = el("div", "detail-related-grid");
    related.forEach((entry) => relatedGrid.appendChild(card(entry, "story")));
    relatedSection.append(relatedHead, relatedGrid);

    shell.append(masthead, metrics, insights, rail, relatedSection);
    detailRoot.appendChild(shell);
    enableTiltSurfaces(detailRoot);
    setPageMode("detail");
    document.title = `${item.name} | ERK`;
    enableLazyVideos();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showHomePage() {
    setPageMode("home");
    document.title = "ERK | Enjinia Resolved Krafts";
    applyFilter(currentFilter);
  }

  function getRoute() {
    return new URLSearchParams(window.location.search).get("page");
  }

  function navigateToDetail(slug) {
    triggerRouteOverlay();
    history.pushState({ page: slug }, "", `?page=${encodeURIComponent(slug)}`);
    renderDetailPage(slug);
  }

  function navigateHome(hash) {
    triggerRouteOverlay();
    const suffix = hash || "";
    history.pushState({ page: null }, "", `${window.location.pathname}${suffix}`);
    showHomePage();
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
      }
    }
  }

  function bindRoutes() {
    document.addEventListener("click", (event) => {
      const link = event.target.closest("[data-route]");
      if (!link) {
        return;
      }
      event.preventDefault();
      navigateToDetail(link.getAttribute("data-route"));
    });

    window.addEventListener("popstate", () => {
      const slug = getRoute();
      if (slug) {
        renderDetailPage(slug);
        return;
      }
      showHomePage();
    });
  }

  function enableMobileNav() {
    if (!navbar || !navToggle) {
      return;
    }

    if (logoLink) {
      logoLink.addEventListener("click", (event) => {
        if (!getRoute()) {
          return;
        }
        event.preventDefault();
        navigateHome();
      });
    }

    navToggle.addEventListener("click", () => {
      const open = navbar.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navbar.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
        if (getRoute() && link.getAttribute("href").startsWith("#")) {
          navigateHome(link.getAttribute("href"));
        }
      });
    });
  }

  renderStats();
  renderFilters();
  renderHomeCollections();
  renderExperienceStrip();
  enableThemeToggle();
  enableScrollProgress();
  enableCursorEffects();
  applyFilter("All");
  enableLazyVideos();
  enableExperienceScroll();
  enableRevealEffects();
  enableHeroMotion();
  enableTiltSurfaces();
  bindRoutes();
  enableMobileNav();

  const initialRoute = getRoute();
  if (initialRoute) {
    renderDetailPage(initialRoute);
  }

  finishLoading();
})();

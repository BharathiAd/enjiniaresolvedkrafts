(function () {
  const items = Array.isArray(window.showcaseItems) ? window.showcaseItems : [];
  const showcaseGridRoot = document.getElementById("showcase-grid-root");
  const experienceStage = document.getElementById("experience-stage");
  const experienceSteps = document.getElementById("experience-steps");
  const statsRoot = document.getElementById("showcase-stats");
  const filterRoot = document.getElementById("showcase-filters");
  const detailPage = document.getElementById("detail-page");
  const detailRoot = document.getElementById("detail-root");
  const navbar = document.querySelector(".navbar");
  const logoLink = document.querySelector(".logo");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll(".nav-links a");
  const homeSections = Array.from(document.querySelectorAll("[data-page='home']"));
  const pageLoader = document.getElementById("page-loader");
  const routeOverlay = document.getElementById("route-overlay");
  const scrollProgress = document.getElementById("scroll-progress");

  if (
    !items.length ||
    !showcaseGridRoot ||
    !experienceStage ||
    !experienceSteps ||
    !statsRoot ||
    !filterRoot ||
    !detailPage ||
    !detailRoot
  ) {
    enableScrollProgress();
    finishLoading();
    return;
  }

  const categoryOrder = ["Engineering Design", "Projects", "Machines", "Automation", "Manufacturing Process", "Fabrication", "Tools", "Others"];
  const themes = {
    "Engineering Design": { tone: "3D Engineering Concept", glow: "#ffd347", gradient: "linear-gradient(135deg, rgba(255, 211, 71, 0.4), rgba(20, 16, 0, 0.9))" },
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

  function themeFor(item) {
    return themes[item.category] || themes.Others;
  }

  function detailModel(item) {
    const theme = themeFor(item);
    const categoryLower = item.category.toLowerCase();
    const isConcept = item.category === "Engineering Design";
    return {
      ...item,
      theme,
      summary: isConcept
        ? `${item.name} is a 3D engineering concept, showing how ERK works out a machine's structure and motion before any metal is cut.`
        : `${item.name} reflects ERK's ${categoryLower} capability, with a production-first approach to machine behaviour, build quality, and floor-level practicality.`,
      impact: isConcept
        ? "This concept shows how ERK plans a build: mechanism, motion, and structure worked out in 3D before fabrication starts."
        : `This reference helps show ERK as a partner for teams that need custom ${categoryLower}, clear execution, and equipment shaped around real manufacturing needs.`,
      metrics: [
        isConcept ? "Design clarity" : item.type === "video" ? "Operational proof" : "Build clarity",
        item.category === "Automation" ? "Flow control" : "Execution confidence",
        item.category === "Manufacturing Process" ? "Process consistency" : "Production readiness"
      ],
      capabilities: [
        item.category,
        isConcept ? "3D engineering" : item.type === "video" ? "Machine operation" : "Delivered build",
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

  function card(item) {
    const article = el("article", "media-card story-card");
    article.setAttribute("data-category", item.category);

    const body = el("div", "media-card-body");
    body.append(
      el("span", "media-category-pill", item.category),
      el("h3", "", item.name),
      el("p", "", item.description)
    );

    const footer = el("div", "story-card-footer");
    const link = el("a", "story-link", "View Project Page");
    link.href = `?page=${encodeURIComponent(item.slug)}`;
    link.setAttribute("data-route", item.slug);
    footer.append(el("span", "story-tone", themeFor(item).tone), link);
    body.appendChild(footer);

    article.append(mediaVisual(item), body);
    return article;
  }

  function categorySection(category, entries) {
    const section = el("section", "category-section");
    section.id = category.toLowerCase().replace(/\s+/g, "-");
    section.setAttribute("data-category", category);

    const head = el("div", "category-section-head");
    head.append(el("h3", "", category), el("span", "category-count", `${entries.length} item${entries.length === 1 ? "" : "s"}`));

    const grid = el("div", "media-grid");
    entries.forEach((entry) => grid.appendChild(card(entry)));
    section.append(head, grid);
    return section;
  }

  function groupByCategory(collection) {
    const groups = new Map();

    collection.forEach((item) => {
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
    const chips = Array.from(document.querySelectorAll(".filter-chip"));

    chips.forEach((chip) => chip.classList.toggle("is-active", chip.getAttribute("data-filter") === filterValue));
    cards.forEach((entry) => {
      const visible = filterValue === "All" || entry.getAttribute("data-category") === filterValue;
      entry.classList.toggle("is-hidden", !visible);
    });
    sections.forEach((section) => {
      section.classList.toggle("is-hidden", section.querySelectorAll(".media-card:not(.is-hidden)").length === 0);
    });
  }

  function renderStats() {
    const stats = [
      { value: items.length, label: "catalogued ERK references" },
      { value: items.filter((item) => item.category === "Engineering Design").length, label: "engineering design concepts" },
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

  function renderShowcaseGrid() {
    groupByCategory(items).forEach(([category, entries]) => {
      showcaseGridRoot.appendChild(categorySection(category, entries));
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

      const step = el("article", "experience-step reveal reveal-up");
      step.setAttribute("data-experience-step", item.slug);
      if (index === 0) {
        step.classList.add("is-active");
      }

      const stepIndex = el("span", "experience-index", `0${index + 1}`);
      const body = el("div", "experience-step-body");
      const openLink = el("a", "story-link", "View Project Page");
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
    back.href = "index.html#work";
    back.addEventListener("click", (event) => {
      event.preventDefault();
      navigateHome("#work");
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
    left.append(el("span", "detail-section-label", item.category), el("h2", "", "Why this page matters"), el("p", "", item.impact));
    const right = el("article", "detail-progression");
    right.append(
      el("span", "detail-section-label", "Engineering Signal"),
      el("h3", "", "What this shows about ERK"),
      el("p", "", `${item.name} gives you a clearer view into how ERK turns a requirement into a practical, working machine.`)
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
    relatedHead.append(el("span", "detail-section-label", "Related ERK Pages"), el("h3", "", "Explore similar systems and nearby references"));
    const relatedGrid = el("div", "detail-related-grid");
    related.forEach((entry) => relatedGrid.appendChild(card(entry)));
    relatedSection.append(relatedHead, relatedGrid);

    shell.append(masthead, metrics, insights, rail, relatedSection);
    detailRoot.appendChild(shell);
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
  renderShowcaseGrid();
  renderExperienceStrip();
  enableScrollProgress();
  applyFilter("All");
  enableLazyVideos();
  enableExperienceScroll();
  enableRevealEffects();
  bindRoutes();
  enableMobileNav();

  const initialRoute = getRoute();
  if (initialRoute) {
    renderDetailPage(initialRoute);
  }

  finishLoading();
})();

(function () {
  const items = Array.isArray(window.showcaseItems) ? window.showcaseItems : [];
  const showcaseRoot = document.getElementById("showcase-root");
  const videoRoot = document.getElementById("video-showcase-root");
  const categoryRoot = document.getElementById("category-showcase-root");
  const statsRoot = document.getElementById("showcase-stats");
  const filterRoot = document.getElementById("showcase-filters");
  const navbar = document.querySelector(".navbar");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll(".nav-links a");

  if (!showcaseRoot || !videoRoot || !categoryRoot || !statsRoot || !filterRoot || !items.length) {
    return;
  }

  const featuredItems = items.filter((item) => item.featured);
  const videoItems = items.filter((item) => item.type === "video");
  const categoryOrder = ["Projects", "Machines", "Automation", "Manufacturing Process", "Fabrication", "Tools", "Others"];

  function MediaCard(item, variant) {
    const article = document.createElement("article");
    article.className = "media-card";
    article.setAttribute("data-category", item.category);

    if (variant === "project") {
      article.classList.add("project-card");
    }

    const mediaWrap = document.createElement("div");
    mediaWrap.className = "media-card-visual";

    if (item.type === "video") {
      mediaWrap.appendChild(VideoPlayer(item));
    } else {
      const image = document.createElement("img");
      image.src = item.path;
      image.alt = item.name;
      image.loading = "lazy";
      image.decoding = "async";
      mediaWrap.appendChild(image);
    }

    const body = document.createElement("div");
    body.className = "media-card-body";

    const category = document.createElement("span");
    category.className = "media-category-pill";
    category.textContent = item.category;

    const heading = document.createElement("h3");
    heading.textContent = item.name;

    const copy = document.createElement("p");
    copy.textContent = item.description;

    body.append(category, heading, copy);
    article.append(mediaWrap, body);
    return article;
  }

  function VideoPlayer(item) {
    const video = document.createElement("video");
    video.className = "video-player";
    video.controls = true;
    video.preload = "none";
    video.playsInline = true;
    video.setAttribute("data-src", item.path);
    video.setAttribute("title", item.name);
    return video;
  }

  function CategorySection(category, entries) {
    const section = document.createElement("section");
    section.className = "category-section";
    section.id = category.toLowerCase().replace(/\s+/g, "-");
    section.setAttribute("data-category", category);

    const header = document.createElement("div");
    header.className = "category-section-head";

    const title = document.createElement("h3");
    title.textContent = category;

    const meta = document.createElement("span");
    meta.className = "category-count";
    meta.textContent = `${entries.length} item${entries.length === 1 ? "" : "s"}`;

    header.append(title, meta);

    const grid = document.createElement("div");
    grid.className = entries.every((entry) => entry.type === "video") ? "video-grid" : "media-grid";

    entries.forEach((entry) => {
      grid.appendChild(MediaCard(entry));
    });

    section.append(header, grid);
    return section;
  }

  function renderStats() {
    const imageCount = items.filter((item) => item.type === "image").length;
    const videoCount = items.filter((item) => item.type === "video").length;
    const activeCategories = new Set(items.map((item) => item.category)).size;
    const stats = [
      { value: items.length, label: "structured media assets" },
      { value: imageCount, label: "image references" },
      { value: videoCount, label: "process videos" },
      { value: activeCategories, label: "portfolio categories" }
    ];

    stats.forEach((stat) => {
      const block = document.createElement("div");
      block.className = "showcase-stat";

      const value = document.createElement("strong");
      value.textContent = stat.value;

      const label = document.createElement("span");
      label.textContent = stat.label;

      block.append(value, label);
      statsRoot.appendChild(block);
    });
  }

  function renderFilters() {
    const categories = Array.from(new Set(items.map((item) => item.category))).sort((left, right) => {
      return categoryOrder.indexOf(left) - categoryOrder.indexOf(right);
    });

    const filterValues = ["All", ...categories];

    filterValues.forEach((value, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "filter-chip";
      button.textContent = value;
      button.setAttribute("data-filter", value);

      if (index === 0) {
        button.classList.add("is-active");
      }

      button.addEventListener("click", () => applyFilter(value));
      filterRoot.appendChild(button);
    });
  }

  function renderFeaturedProjects() {
    const grid = document.createElement("div");
    grid.className = "project-grid";
    featuredItems.forEach((item) => {
      grid.appendChild(MediaCard(item, "project"));
    });
    showcaseRoot.appendChild(grid);
  }

  function renderVideos() {
    const groupedVideos = groupByCategory(videoItems);
    groupedVideos.forEach(([category, entries]) => {
      videoRoot.appendChild(CategorySection(category, entries));
    });
  }

  function renderCategories() {
    const imageItems = items.filter((item) => item.type === "image" && !item.featured);
    const featuredButNotProjects = featuredItems.filter((item) => item.type === "image");
    const remainingItems = [...featuredButNotProjects, ...imageItems];
    const grouped = groupByCategory(remainingItems, ["Projects"]);

    grouped.forEach(([category, entries]) => {
      if (!entries.length) {
        return;
      }

      categoryRoot.appendChild(CategorySection(category, entries));
    });
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

    return Array.from(groups.entries()).sort((left, right) => {
      return categoryOrder.indexOf(left[0]) - categoryOrder.indexOf(right[0]);
    });
  }

  function enableLazyVideos() {
    const videos = Array.from(document.querySelectorAll("video[data-src]"));

    if (!("IntersectionObserver" in window)) {
      videos.forEach(loadVideo);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          loadVideo(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "200px 0px" }
    );

    videos.forEach((video) => observer.observe(video));
  }

  function loadVideo(video) {
    const src = video.getAttribute("data-src");
    if (!src || video.querySelector("source")) {
      return;
    }

    const source = document.createElement("source");
    source.src = src;
    source.type = "video/mp4";
    video.appendChild(source);
    video.load();
  }

  function applyFilter(filterValue) {
    const cards = Array.from(document.querySelectorAll(".media-card"));
    const categorySections = Array.from(document.querySelectorAll(".category-section"));
    const blocks = Array.from(document.querySelectorAll(".showcase-block"));
    const chips = Array.from(document.querySelectorAll(".filter-chip"));

    chips.forEach((chip) => {
      chip.classList.toggle("is-active", chip.getAttribute("data-filter") === filterValue);
    });

    cards.forEach((card) => {
      const matches = filterValue === "All" || card.getAttribute("data-category") === filterValue;
      card.classList.toggle("is-hidden", !matches);
    });

    categorySections.forEach((section) => {
      const visibleCards = section.querySelectorAll(".media-card:not(.is-hidden)");
      section.classList.toggle("is-hidden", visibleCards.length === 0);
    });

    blocks.forEach((block) => {
      const visibleCards = block.querySelectorAll(".media-card:not(.is-hidden)");
      block.classList.toggle("is-hidden", visibleCards.length === 0);
    });
  }

  function enableMobileNav() {
    if (!navbar || !navToggle) {
      return;
    }

    navToggle.addEventListener("click", () => {
      const isOpen = navbar.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navbar.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  renderStats();
  renderFilters();
  renderFeaturedProjects();
  renderVideos();
  renderCategories();
  enableLazyVideos();
  enableMobileNav();
})();

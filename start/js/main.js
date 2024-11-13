function dateTime() {
  const date = new Date();
  let today = date.toDateString();
  let time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  document.getElementById("date-time").innerHTML =
    '<p id="date">' + today + '</p><p id="time">' + time + "</p>";
  setTimeout(dateTime, 1000);
}

function weatherBalloon(cityID) {
  var apiKey = "f82538e6b682e99f920385241e7a079f"; //OpenWeather API key
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?id=" +
      cityID +
      "&appid=" +
      apiKey,
  )
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      let weatherIcon = data.weather[0].icon;
      let tempK = parseFloat(data.main.temp);
      let tempC = Math.round(tempK - 273.15);
      let tempF = Math.round((tempK - 273.15) * 1.8) + 32;
      document.getElementById("weather").innerHTML =
        '<a href="https://openweathermap.org/city/5368361" target="_blank" class="weather-link">' +
        '<p id="location">' +
        data.name +
        "</p>" +
        '<p id="details" title="' +
        tempC +
        '&deg;C">' +
        '<img src="https://openweathermap.org/img/wn/' +
        weatherIcon +
        '.png">' +
        data.weather[0].description +
        '<span class="separator">|</span>' +
        tempF +
        "&deg;F</p>" +
        "</a>";
    });
}

function traichu() {
  dateTime();
  weatherBalloon(5368361); //OpenWeather city ID
}

document.addEventListener("DOMContentLoaded", () => {
  // Search Bar Integrations
  const searchInput = document.getElementById("q");
  const dropdown = document.getElementById("dropdown");
  const searchOptions = [
    {
      key: "d",
      label: "Search with SearXNG",
      prefix: "https://search.onionhost.space:8443/search?q=",
    },
    {
      key: "k",
      label: "Search with Kagi",
      prefix: "https://kagi.com/search?q=", // Kagi search URL
    },
    {
      key: "c",
      label: "Ask ChatGPT",
      prefix: "https://chatgpt.com/?q=",
    },
    {
      key: "ls",
      label: "问中文老师",
      prefix: "https://chatgpt.com/g/g-rXpCt4KNz-zhong-wen-lao-shi/?q=",
    },
    {
      key: "lg",
      label: "Search with LibGen",
      prefix: "http://libgen.rs/search.php?req=",
    },
    {
      key: "ar",
      label: "Search with Internet Archive",
      prefix: "https://archive.org/search.php?query=",
    },
    {
      key: "g",
      label: "Search with Google",
      prefix: "https://www.google.com/search?q=",
    },
    {
      key: "wp",
      label: "Search with Wikipedia",
      prefix: "https://en.wikipedia.org/w/index.php?search=",
    },
    {
      key: "b",
      label: "Search with Baidu",
      prefix: "https://www.baidu.com/s?wd=",
    },
  ];

  let currentMode = "";
  let prefix = "";
  let selectedIndex = -1;

  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      event.preventDefault(); // Prevent default tab behavior
      selectedIndex = (selectedIndex + 1) % searchOptions.length;
      updateDropdown();
    }
  });

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    const matchedOption = searchOptions.find((option) =>
      query.startsWith(option.key),
    );
    if (matchedOption) {
      currentMode = matchedOption.key;
      prefix = matchedOption.prefix;
      selectedIndex = searchOptions.indexOf(matchedOption);
      updateDropdown();
    } else {
      currentMode = "";
      prefix = "";
      selectedIndex = -1;
      updateDropdown();
    }
  });

  searchInput.addEventListener("focus", updateDropdown);

  function updateDropdown() {
    if (searchInput.value.trim()) {
      dropdown.innerHTML = searchOptions
        .map(
          (option, index) => `
                <div class="${index === selectedIndex ? "selected" : ""}" data-index="${index}">${option.label}</div>
            `,
        )
        .join("");
      dropdown.classList.remove("hidden");
    } else {
      dropdown.classList.add("hidden");
    }
  }

  document.addEventListener("click", (event) => {
    if (
      !searchInput.contains(event.target) &&
      !dropdown.contains(event.target)
    ) {
      dropdown.classList.add("hidden");
    }
  });

  document.getElementById("search-form").addEventListener("submit", (event) => {
    event.preventDefault();
    let query = searchInput.value.trim();
    if (selectedIndex !== -1) {
      window.location.href =
        searchOptions[selectedIndex].prefix + encodeURIComponent(query);
    } else {
      window.location.href =
        "https://search.onionhost.space:8443/search?q=" +
        encodeURIComponent(query);
    }
  });

  // Add click event to dropdown items
  dropdown.addEventListener("click", (event) => {
    const clickedItem = event.target;
    const index = clickedItem.getAttribute("data-index");
    if (index !== null) {
      selectedIndex = parseInt(index, 10);
      const selectedOption = searchOptions[selectedIndex];
      currentMode = selectedOption.key;
      prefix = selectedOption.prefix;
      searchInput.focus();
      updateDropdown();
    }
  });

  // Highlight on hover
  dropdown.addEventListener("mouseover", (event) => {
    const hoveredItem = event.target;
    const index = hoveredItem.getAttribute("data-index");
    if (index !== null) {
      selectedIndex = parseInt(index, 10);
      updateDropdown();
    }
  });
  // Time Zone Clock Update
  function updateTime() {
    const timeZones = {
      "clock-china": "Asia/Shanghai",
      "clock-ny": "America/New_York",
      "clock-london": "Europe/London",
      "clock-hawaii": "Pacific/Honolulu",
    };

    for (const [id, timeZone] of Object.entries(timeZones)) {
      const date = new Date().toLocaleString("en-US", {
        timeZone,
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      });
      document.getElementById(`time-${id.split("-")[1]}`).textContent = date;
    }
  }

  setInterval(updateTime, 1000);
  updateTime();

  // Theme Switching
  const themeSwitcher = document.getElementById("theme-switcher");
  const themeIcon = document.getElementById("theme-icon");
  const rssFeedContainer = document.getElementById("rss-feed");
  const currentTheme = localStorage.getItem("theme") || "light-mode";

  document.body.classList.add(currentTheme);
  themeIcon.textContent = currentTheme === "light-mode" ? "☀" : "☽";
  rssFeedContainer.classList.add(
    currentTheme === "light-mode" ? "rss-feed-light" : "rss-feed-dark",
  );

  themeSwitcher.addEventListener("click", () => {
    const isLightMode = document.body.classList.contains("light-mode");
    const newTheme = isLightMode ? "dark-mode" : "light-mode";
    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
    themeIcon.textContent = newTheme === "light-mode" ? "☀" : "☽";
    rssFeedContainer.classList.toggle("rss-feed-light");
    rssFeedContainer.classList.toggle("rss-feed-dark");
  });

  // RSS Feed
  const rssFeedUrl = "https://rss2json.com/api.json?rss_url=";
  const feedUrl =
    "https://old.reddit.com/r/FoodLosAngeles+LosAngeles+SoCalGardening+askphilosophy+capsulewardrobe+digitalminimalism+digitalnomad+dumbphones+eink+geography+minimalism+musichoarder+onebag+pasadena+privacy+selfhosted+simpleliving+socalhiking+startpages+unixporn.rss"; // Replace with your RSS feed URL
  let feedItems = [];
  let currentFeedIndex = 0;
  const itemsPerPage = 50;

  function loadRSSFeed() {
    fetch(rssFeedUrl + encodeURIComponent(feedUrl))
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== "ok") {
          throw new Error("Error fetching RSS feed");
        }
        feedItems = data.items;
        currentFeedIndex = 0; // Reset index
        displayRSSFeed();
        setupIntersectionObserver();
      })
      .catch((error) => console.error("Error loading RSS feed:", error));
  }

  function displayRSSFeed() {
    const rssContent = document.getElementById("rss-content");
    const itemsToDisplay = feedItems.slice(
      currentFeedIndex,
      currentFeedIndex + itemsPerPage,
    );
    rssContent.innerHTML += itemsToDisplay
      .map(
        (item) => `
                    <div class="rss-item">
                        <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
                        <p>${item.description}</p>
                    </div>
                `,
      )
      .join("");
    currentFeedIndex += itemsPerPage;
  }

  function setupIntersectionObserver() {
    const rssContent = document.getElementById("rss-content");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            if (currentFeedIndex < feedItems.length) {
              displayRSSFeed();
              observer.observe(rssContent.lastElementChild);
            }
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 1.0 },
    );

    if (rssContent.lastElementChild) {
      observer.observe(rssContent.lastElementChild);
    }
  }

  // Toggle RSS feed visibility and load content
  document.getElementById("toggle-rss").addEventListener("click", () => {
    toggleVisibility("rss-feed");
    loadRSSFeed();
  });

  // Function to toggle visibility
  function toggleVisibility(elementId) {
    const element = document.getElementById(elementId);
    element.classList.toggle("hidden");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // All folders and subfolders start closed
  const folders = document.querySelectorAll(".folder-content");
  folders.forEach((folder) => {
    folder.style.display = "none";
  });

  const subfolders = document.querySelectorAll(".subfolder-content");
  subfolders.forEach((subfolder) => {
    subfolder.style.display = "none";
  });

  // Add click event to each main folder header
  const folderHeaders = document.querySelectorAll(".folder-header");
  folderHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const folderId = this.getAttribute("data-folder");
      const folderContent = document.getElementById(folderId);
      folderContent.style.display =
        folderContent.style.display === "block" ? "none" : "block";
    });
  });

  // Add click event to each subfolder header
  const subfolderHeaders = document.querySelectorAll(".subfolder-header");
  subfolderHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const subfolderId = this.getAttribute("data-subfolder");
      const subfolderContent = document.getElementById(subfolderId);
      subfolderContent.style.display =
        subfolderContent.style.display === "block" ? "none" : "block";
    });
  });
});

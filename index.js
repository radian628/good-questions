// Add links to all the headers
const headers = document.querySelectorAll("#content :is(h1,h2,h3,h4,h5,h6)");

// Replace the contents of each header with an <a> containing the old content
headers.forEach((header) => {
  const innerHTML = header.innerHTML;
  const a = document.createElement("a");
  a.href = `#${header.id}`;
  a.innerHTML = innerHTML;
  header.innerHTML = "";
  a.classList = "contrast"; // Make the link contrast (Pico style)
  header.appendChild(a);
});

// Highlight a linked header
let lastSelectedSection;

const hashchange = () => {
  const hash = window.location.hash;

  if (hash) {
    const selectedSection = document.querySelector(hash)?.parentElement;

    lastSelectedSection?.classList.toggle("selected-section", false);
    lastSelectedSection = selectedSection;
    selectedSection.classList.toggle("selected-section", true);
  }
};

// Listen for hash changes and run on startup
window.addEventListener("hashchange", hashchange);
hashchange();

// Theme related
function getTheme() {
  if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
    return localStorage.getItem("theme");
  }
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  window.localStorage.setItem("theme", theme);
}

function updateButtonStyles() {
  if (getTheme() == "dark") {
    themeToggle.classList.add("theme-toggle--toggled");
  } else {
    themeToggle.classList.remove("theme-toggle--toggled");
  }
}

// Theme toggle
function handleClick() {
  getTheme() === "light" ? setTheme("dark") : setTheme("light");
  updateButtonStyles();
}
const themeToggle = document.querySelector(".theme-toggle");
themeToggle.addEventListener("click", handleClick);

// Set initial button style
updateButtonStyles();

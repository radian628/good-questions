// Add links to all the headers
const headers = document.querySelectorAll("#content :is(h1,h2,h3,h4,h5,h6)");

for (const header of headers) {
  const innerHTML = header.innerHTML;
  const a = document.createElement("a");
  a.href = `#${header.id}`;
  a.innerHTML = innerHTML;
  a.classList = "contrast";
  const children = Array.from(header.children);
  header.innerHTML = "";
  header.appendChild(a);
}

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

// Theme toggle
const themeToggle = document.querySelector(".theme-toggle");

function initialTheme() {
  let theme = window.localStorage.getItem("theme");
  if (theme !== null) {
    setTheme(theme);
  }
  updateButtonStyles();
}

function updateButtonStyles() {
  if (getTheme() == "dark") {
    themeToggle.classList.add("theme-toggle--toggled");
  } else {
    themeToggle.classList.remove("theme-toggle--toggled");
  }
}

function getTheme() {
  return document.documentElement.getAttribute("data-theme");
}

function setTheme(mode) {
  if (mode === null) return;
  document.documentElement.setAttribute("data-theme", mode);
  window.localStorage.setItem("theme", mode);
}

function handleClick() {
  let theme = getTheme();
  if (theme === null) {
    console.log("No theme. Setting to Dark");
    setTheme("dark");
    return;
  }
  theme === "light" ? setTheme("dark") : setTheme("light");
  updateButtonStyles();
}

// Attach click handler
themeToggle.addEventListener("click", handleClick);

initialTheme();

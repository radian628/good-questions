const headers = document.querySelectorAll("h1, h2, h3, h4, h5, h6");

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

window.addEventListener("hashchange", hashchange);

hashchange();

let searchInput = document.getElementById("inp-search");
let searchButton = document.getElementById("search-bttn");
let searchContainerTitle = document.querySelector(".search-title");
let gifContainer = document.querySelector(".gif-search-container");

searchButton.addEventListener("click", () => {
  searchContainerTitle.style.display = "block";
  searchContainerTitle.innerText = `Resultados de "${searchInput.value}"`;
  gifContainer.style.visibility = "visible";
  searchElement(searchInput.value);
  searchInput.value = "";
  searchInput.click();
});

searchInput.addEventListener("click", () => {
  document
    .querySelector(".search-options")
    .classList.toggle("search-options-active");
});

searchInput.addEventListener("keyup", () => {
  if (event.keyCode === 13) {
    searchButton.click();
  }
});

let searchInput = document.getElementById("inp-search");
let searchButton = document.getElementById("search-bttn");
let searchContainerTitle = document.querySelector(".sug-title");
let gifContainer = document.querySelector(".gif-search-container");
check_search = true;

searchButton.addEventListener("click", () => {
  searchContainerTitle.style.display = "block";
  searchContainerTitle.innerHTML = `Resultados de "${searchInput.value}"`;
  gifContainer.style.visibility = "visible";
  searchElement(searchInput.value);
  searchInput.value = "";
  searchInput.click();
});

searchInput.addEventListener("click", () => {
  if (check_search) {
    document.querySelector(".search-options").style.visibility = "visible";
    document.querySelector(".search-options").style.top = "97px";
    check_search = false;
  } else {
    document.querySelector(".search-options").removeAttribute("style");
    check_search = true;
  }
});

searchInput.addEventListener("keyup", () => {
  if (event.keyCode === 13) {
    searchButton.click();
  }
});

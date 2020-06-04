const searchInput = document.getElementById("inp-search");
const searchButton = document.getElementById("search-bttn");
const searchContainerTitle = document.querySelector(".search-title");
const gifContainer = document.querySelector(".gif-search-container");
const searchOption = document.querySelectorAll('.search-option');

function printSearchContainer(value) {
  searchContainerTitle.style.display = "block";
  searchContainerTitle.innerText = `Resultados de: "${value}"`;
  gifContainer.style.visibility = "visible";
  searchButton.disabled = true;
  if (gifContainer.querySelectorAll('div').length > 0) {
    gifContainer.querySelectorAll('div').forEach(element => element.remove())
  }
}

function addTagListeners() {
  document.querySelectorAll('.gif-search-tag').forEach(element => {
    element.addEventListener('click', () => {
      searchGifs(element.innerText);
      printSearchContainer(element.innerText);
      searchSuggestions(element.innerText, addTagListeners);
    })
  })
}

searchInput.addEventListener("keyup", () => {
  if (event.keyCode === 13) {
    searchButton.click();
  } else if (searchInput.value.length > 2) {
    searchButton.disabled = false;
    getData(endpoints.autoComplete, searchInput.value)
      .then(data => {
        document.querySelector(".search-options").classList.add("search-options-active");
        data.forEach((element, index) => {
          searchOption[index].innerText = element.name;
        })
      })
  } else if (event.keyCode === 8 && searchInput.value.length <= 3) {
    searchButton.disabled = true;
    document.querySelector(".search-options").classList.remove("search-options-active");
  }

});


searchButton.addEventListener("click", () => {
  printSearchContainer(searchInput.value)

  searchGifs(searchInput.value);
  searchSuggestions(searchInput.value, addTagListeners);

  document.querySelector(".search-options").classList.remove("search-options-active");
  searchInput.value = "";
});



searchOption.forEach(element => {
  element.addEventListener('click', () => {
    printSearchContainer(element.innerText)

    searchGifs(element.innerText);
    searchSuggestions(element.innerText, addTagListeners);

    document.querySelector(".search-options").classList.remove("search-options-active");
    searchInput.value = "";
  })
})
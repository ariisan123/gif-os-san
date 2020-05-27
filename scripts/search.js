const searchInput = document.getElementById("inp-search");
const searchButton = document.getElementById("search-bttn");
const searchContainerTitle = document.querySelector(".search-title");
const gifContainer = document.querySelector(".gif-search-container");
const searchOption = document.querySelectorAll('.search-option');

searchButton.addEventListener("click", () => {
  searchContainerTitle.style.display = "block";
  searchContainerTitle.innerText = `Resultados de: "${searchInput.value}"`;
  gifContainer.style.visibility = "visible";
  searchInput.click();

  if (gifContainer.querySelectorAll('div').length > 0) {
    gifContainer.querySelectorAll('div').forEach(element => element.remove())
  }

  getData(endpoints.search, searchInput.value)
    .then(data => {
      console.log(data);
      data.forEach((element, index) => {
        newElement(".gif-search-container", 'div', 'search-gif');
        newElement('.search-gif', 'img', 'search-img');
        newElement('.search-gif', 'span', 'search-tags');

        document.querySelectorAll('.search-img')[index].src = element.images.fixed_height.url;
        document.querySelectorAll('.search-tags')[index].innerText = addHashtag(capitalize(removeGifBy(element.title)));
      })
    })


  searchInput.value = "";
});

searchInput.addEventListener("click", () => {
  document.querySelector(".search-options").classList.toggle("search-options-active");
});

searchInput.addEventListener("keyup", () => {
  if (event.keyCode === 13) {
    searchButton.click();
  }

  if (searchInput.value.length >= 3) {
    fetch(`https://api.giphy.com/v1/gifs/search/tags?api_key=SHG6tML92fdVMBeKXAMm4NhdLs0qCXyS&q=${searchInput.value}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        data.data.forEach((element, index) => {
          searchOption[index].innerText = element.name;
        })
      })
  }
});

searchOption.forEach(element => {
  element.addEventListener('click', () => {
    console.log(element.innerText);
    searchButton.click()
    /* searchElement(element.innerText)
    searchContainerTitle.style.display = "block";
    searchContainerTitle.innerText = `Resultados de "${searchInput.value}"`;
    gifContainer.style.visibility = "visible"; */
  })
})
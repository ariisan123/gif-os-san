function newElement(mainElementClass, newElementName, newElementClass) {
  let container = document.querySelectorAll(mainElementClass);
  let element = document.createElement(newElementName);
  element.className = newElementClass;

  if (container.length >= 1) {
    container[container.length - 1].appendChild(element);
  } else {
    alert("No se encuentra el elemento con atributo: " + mainElementClass);
  }
}

function capitalize(string) {
  if (string.indexOf(" ") >= 0) {
    var element = string.toLowerCase().split(" ");
    for (let i = 0; i < element.length; i++) {
      element[i] = element[i].charAt(0).toUpperCase() + element[i].slice(1);
    }
    element = element.join(" ");
  } else if (string.length >= 2) {
    var element = string.charAt(0).toUpperCase() + string.slice(1);
  } else {
    var element = "String vacia";
  }
  return element;
}

function removeGifBy(title) {
  let tag = title.toLowerCase().split(" ");

  let gifIndex = tag.indexOf("gif");

  while (gifIndex >= 0) {
    tag.splice(gifIndex, 1);
    gifIndex = tag.indexOf("gif");
  }

  let byIndex = tag.indexOf("by");

  while (byIndex >= 0) {
    tag.splice(byIndex, 1);
    byIndex = tag.indexOf("by");
  }

  tag = tag.join(" ");
  return tag;
}

function addHashtag(string) {
  let stringArray = string.split(" ");

  for (let i = 0; i < stringArray.length; i++) {
    stringArray[i] = `#${stringArray[i]}`;
  }

  stringArray = stringArray.join(" ");
  return stringArray;
}

function addBefore(parent, child, newChild, newChildClass) {
  let parentNode = document.querySelector(parent);
  let parentChild = document.querySelector(child);
  let newChildTag = document.createElement(newChild);
  newChildTag.className = newChildClass;
  parentNode.insertBefore(newChildTag, parentChild);
}

function searchElement(element) {
  const apiKey = "SHG6tML92fdVMBeKXAMm4NhdLs0qCXyS";

  let searchGif = document.querySelectorAll(".search-gif");
  let searchImg = document.querySelectorAll(".search-img");
  let searchTag = document.querySelectorAll(".search-tag");
  if (searchGif.length > 0) {
    searchImg.forEach((element) => {
      element.parentNode.removeChild(element);
    });

    searchTag.forEach((element) => {
      element.parentNode.removeChild(element);
    });

    searchGif.forEach((element) => {
      element.parentNode.removeChild(element);
    });
  }

  fetch(
    "http://api.giphy.com/v1/gifs/search?q=" +
      element +
      "&limit=25&api_key=" +
      apiKey +
      "&rating=G"
  )
    .then((response) => response.json())

    .then((data) => {
      console.log(data);
      let gifData = {
        src: [],
        tag: [],
      };

      for (let i = 0; i < 25; i++) {
        gifData.src.push(data.data[i].images.fixed_height.url);
        gifData.tag.push(capitalize(removeGifBy(data.data[i].title)));

        newElement(".gif-search-container", "div", "search-gif");
        newElement(".search-gif", "img", "search-img");
        newElement(".search-gif", "span", "search-tag");
      }

      searchImg = document.querySelectorAll(".search-img");
      searchTag = document.querySelectorAll(".search-tag");

      for (let i = 0; i < 25; i++) {
        searchImg[i].src = gifData.src[i];
        searchTag[i].innerText = addHashtag(gifData.tag[i]);
      }
    })
    .catch((error) => {
      return error;
    });
}

/* function sugTagSearch(value, tagsReturned) {
    fetch(
      `https://api.giphy.com/v1/tags/related/{${value}}?api_key=SHG6tML92fdVMBeKXAMm4NhdLs0qCXyS`
    )
      .then((response) => response.json())
  
      .then((data) => {
        data.data.forEach((element) => {
          tagsReturned.push(element.name);
        });
        return tagsReturned;
      })
  
      .catch((error) => {
        console.log(error);
      });
  } */

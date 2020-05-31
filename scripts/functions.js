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
  let stringReturn;
  if (string.indexOf(" ") >= 0) {
    stringReturn = string.toLowerCase().split(" ");
    stringReturn.forEach((element, index) => {
      stringReturn[index] = element.charAt(0).toUpperCase() + element.slice(1);
    })
    /* for (let i = 0; i < element.length; i++) {
      element[i] = element[i].charAt(0).toUpperCase() + element[i].slice(1);
    } */
    stringReturn = stringReturn.join(" ");
  } else if (string.length >= 2) {
    stringReturn = string.charAt(0).toUpperCase() + string.slice(1);
  } else {
    stringReturn = "String vacia";
  }
  return stringReturn;
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

  stringArray.forEach((element, index) => {
    stringArray[index] = `#${element}`;
  })

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

function getLocalStorage(key) {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key))
  }
}

function setLocalStorage(key, variable) {
  localStorage.setItem(key, JSON.stringify(variable))
}

function getStorageGifs(key) {
  let gifs = []
  if (getLocalStorage(key)) {
    gifs = getLocalStorage(key);
    console.log(gifs);
    return gifs;
  } else {
    return gifs
  }
}

function setStorageGif(array, object) {
  let gifsArray = array;
  object.id = gifId;
  object.url = getGifUrl(gifId);
  object.embed = getEmbedGif(gifId);
  gifsArray.push(object)
  localStorage.setItem('gifs', JSON.stringify(gifsArray));
}

function verifyTheme() {
  if (getLocalStorage('theme') == true) {
    document.querySelector('body').className = 'dark';
    console.log('tema oscuro');
    return true
  } else {
    setLocalStorage('theme', false)
    console.log('tema claro');
    document.querySelector('body').className = 'light';
    return false
  }
}

function changeTheme(bool, newTheme, oldTheme) {
  if (getLocalStorage('theme') == bool) {
    newTheme.classList.add('theme-enabled');
    oldTheme.classList.remove('theme-enabled');
    setLocalStorage('theme', !bool)
  }
}


function twoDigits(number) {
  if (number < 10) {
    return `0${number}`;
  } else {
    return number;
  }
}

function getGifUrl(id) {
  let url = `https://giphy.com/gifs/${id}`;
  return url;
}

function getEmbedGif(id) {
  let url = `https://media.giphy.com/media/${id}/giphy.gif`;
  return url;
}

function uploadBarAnimation(counter) {
  return setInterval(() => {
    if (counter <= 22) {
      uploadProgress[counter].classList.add('progress-fill')
      counter++;
    } else {
      uploadProgress.forEach(element => {
        element.classList.remove('progress-fill')
      })
      counter = 0;
    }
  }, 70);
}

function stopBarAnimation(id) {
  clearInterval(id)
}

function newDate(array) {
  let date = new Date();
  array.push(date.getTime())
}

function calculateWidthGif(object, tagClass) {
  let ascpect = object.width / object.height;
  if (ascpect.toFixed(2) >= 1.78) {
    let element = document.querySelectorAll(tagClass);
    element[element.length - 1].classList.add('large-gif')
  }
}
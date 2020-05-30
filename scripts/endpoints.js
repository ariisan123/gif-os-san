let uploadBarCount = 0;
const apiKey = "SHG6tML92fdVMBeKXAMm4NhdLs0qCXyS";
let abortSignal = new AbortController();
const endpoints = {
  search: `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=`,
  trending: `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`,
  autoComplete: `https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&q=`,
  upload: `https://upload.giphy.com/v1/gifs?api_key=${apiKey}`,
  random: `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`,
  suggestions: tag => { return `https://api.giphy.com/v1/tags/related/{${tag}?api_key=${apiKey}` },
}

async function uploadGif(endpoint, gif, cancelBar, cancelID) {
  try {
    const upload = await fetch(endpoint, { method: 'POST', body: gif, signal: abortSignal.signal })
    const resolve = await upload.json();
    let data = await resolve;
    data = data.data;
    console.log(data);
    return data;
  } catch (err) {
    if (err.name == 'AbortError') {
      alert('Subida Cancelada');
      cancelBar(cancelID)
      uploadProgress.forEach(element => {
        element.classList.remove('progress-fill')
      })
    } else {
      console.log(err);
    }
  }
}

async function getData(endpoint, string = null) {
  if (string != null) {
    try {
      let search = await fetch(endpoint + string);
      let data = await search.json();
      data = data.data;
      console.log(data);
      return data

    } catch (err) {
      console.log(err);
    }

  } else {
    try {
      let search = await fetch(endpoint);
      let data = await search.json();
      data = data.data;
      console.log(data);
      return data

    } catch (err) {
      console.log(err);
    }
  }
}

function searchGifs(searchValue) {
  getData(endpoints.search, searchValue)
    .then(data => {
      data.forEach((element, index) => {
        newElement(".gif-search-container", 'div', 'search-gif');
        newElement('.search-gif', 'img', 'search-img');
        newElement('.search-gif', 'span', 'search-tags');

        document.querySelectorAll('.search-img')[index].src = element.images.fixed_height.url;
        document.querySelectorAll('.search-tags')[index].innerText = addHashtag(capitalize(removeGifBy(element.title)));
      })
    })
    .catch(err => console.log(err));
}

function searchSuggestions(searchValue, callback) {
  getData(endpoints.suggestions(searchValue))
    .then(data => {
      if (document.querySelectorAll('.gif-search-tag').length > 0) {
        document.querySelectorAll('.gif-search-tag').forEach(element => element.remove())
      }

      data.forEach((element, index) => {
        addBefore('.search-section', '.search-title', 'span', 'gif-search-tag gif-link')
        document.querySelectorAll('.gif-search-tag')[index].innerText = element.name;
      })

      callback()

    })
    .catch(err => console.log(err));
}


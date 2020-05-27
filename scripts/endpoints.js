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
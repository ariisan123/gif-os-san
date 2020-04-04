let gifData = {
    url: [],
    title: [],
    src: []
}

for (let i = 0; i < 4; i++) {
    fetch('https://api.giphy.com/v1/gifs/random?api_key=SHG6tML92fdVMBeKXAMm4NhdLs0qCXyS&rating=G')

        .then(response => response.json())

        .then(data => {

            gifData.url.push(data.data.url);
            gifData.title.push(capitalize(data.data.username));
            gifData.src.push(data.data.images.downsized_medium.url);

            newElement('.suggested-container', 'div', 'sug-gif');
            newElement('.sug-gif', 'span', 'sug-gif-title');
            newElement('.sug-gif', 'img', 'sug-img');
            newElement('.sug-gif', 'a', 'sug-link');
        })

        .then(() => {

            setTimeout(() => {
                let sugGifTitle = document.querySelectorAll('.sug-gif-title');
                sugGifTitle[i].innerHTML = '#' + gifData.title[i];

                let sugImg = document.querySelectorAll('.sug-img');
                sugImg[i].setAttribute('loading', 'lazy')
                sugImg[i].src = gifData.src[i];

                let sugGifButton = document.querySelectorAll('.sug-link');
                sugGifButton[i].innerHTML = 'Ver mas...';
                sugGifButton[i].target = '_blank';
                sugGifButton[i].href = gifData.url[i];
            }, 50)
        })

        .catch(error => {
            console.log(error)
        });

}
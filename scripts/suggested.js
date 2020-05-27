
for (let i = 0; i < 4; i++) {
    getData(endpoints.random)
        .then(data => {
            newElement('.suggested-container', 'div', 'sug-gif');
            newElement('.sug-gif', 'span', 'sug-gif-title');
            newElement('.sug-gif', 'img', 'sug-img');
            newElement('.sug-gif', 'a', 'sug-link');

            let title = document.querySelectorAll('.sug-gif-title');
            let img = document.querySelectorAll('.sug-img');
            let link = document.querySelectorAll('.sug-link');

            title[title.length - 1].innerText = addHashtag(capitalize((removeGifBy(data.title))));
            //img[img.length - 1].src = data.images.downsized_medium.url;
            img[img.length - 1].src = data.fixed_height_small_url;
            link[link.length - 1].href = data.url;
            link[link.length - 1].target = '_blank';
            link[link.length - 1].innerText = 'Ver mas...';
        })
        .catch(err => console.log(err))
}
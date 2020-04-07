function search_element(element, limit = '25') {
    apiKey = 'SHG6tML92fdVMBeKXAMm4NhdLs0qCXyS';

    let searchGif = document.querySelectorAll('.search-gif');
    let searchImg = document.querySelectorAll('.search-img');
    let searchTag = document.querySelectorAll('.search-tag');
    if (searchGif.length > 0) {
        searchImg.forEach(element => {
            element.parentNode.removeChild(element);
        })

        searchTag.forEach(element => {
            element.parentNode.removeChild(element);
        })

        searchGif.forEach(element => {
            element.parentNode.removeChild(element);
        })
    }

    fetch('http://api.giphy.com/v1/gifs/search?q=' + element + '&limit=' + limit + '&api_key=' + apiKey + '&rating=G')

        .then(response => response.json())

        .then(data => {
            console.log(data);
            let gifData = {
                src: [],
                tag: []
            }

            for (let i = 0; i < limit; i++) {
                gifData.src.push(data.data[i].images.fixed_height.url);
                gifData.tag.push(capitalize(removeGifBy(data.data[i].title)))

                newElement('.gif-search-container', 'div', 'search-gif');
                newElement('.search-gif', 'img', 'search-img');
                newElement('.search-gif', 'span', 'search-tag');
            }

            searchImg = document.querySelectorAll('.search-img');
            searchTag = document.querySelectorAll('.search-tag');

            for (let i = 0; i < limit; i++) {
                searchImg[i].src = gifData.src[i];
                searchTag[i].innerHTML = addHashtag(gifData.tag[i]);

            }
        })
        .catch(error => {
            return error;
        });
}

let searchInput = document.getElementById('inp-search');
let searchButton = document.getElementById('search-bttn');
let searchContainerTitle = document.querySelector('.sug-title');
let gifContainer = document.querySelector('.gif-search-container');
check_search = true;

searchButton.addEventListener('click', () => {
    searchContainerTitle.style.display = 'block';
    searchContainerTitle.innerHTML = `Resultados de "${searchInput.value}"`;
    gifContainer.style.visibility = 'visible';
    search_element(searchInput.value);
    searchInput.value = '';
    searchInput.click();
});

searchInput.addEventListener('click', () => {
    if (check_search) {
        document.querySelector('.search-options').style.visibility = 'visible';
        document.querySelector('.search-options').style.top = '97px';
        check_search = false;
    } else {
        document.querySelector('.search-options').removeAttribute('style');
        check_search = true;
    }

});

searchInput.addEventListener('keyup', () => {
    if (event.keyCode === 13) {
        searchButton.click();
    }
});
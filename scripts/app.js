apiKey = 'SHG6tML92fdVMBeKXAMm4NhdLs0qCXyS';

function create_element(className, new_tag, tagClass, i = 0) {
    let element = document.getElementsByClassName(className)
    const newTag = document.createElement(new_tag)
    newTag.setAttribute('class', tagClass)
    element[i].appendChild(newTag)
}

function search_element(element, limit = '25') {
    fetch('http://api.giphy.com/v1/gifs/search?q=' + element + '&limit=' + limit + '&api_key=' + apiKey)

        .then(response => response.json())

        .then(data => {
            console.log(data.data);
            for (let i = 0; i < data.data.length; i++) {
                console.log('aslkdfjlsf');
                create_element('gif-container', 'div', 'gif-item')
                create_element('gif-item', 'img', 'gif-img', i)
                document.getElementsByClassName('gif-img')[i].src = data.data[i].images.downsized.url
                document.getElementsByClassName('gif-img')[i].setAttribute('loading', 'lazy')
            }
        })
        .catch(error => {
            return error;
        });
}

/* function newElement(mainElementClass, newElementName, newElementClass) {
    let container = document.querySelectorAll(mainElementClass);

    if (container.length == 1) {
        let element = document.createElement(newElementName);
        element.className = newElementClass;
        container[0].appendChild(element);
    }
    else {
        for (let i = (container.length - 1); i < container.length; i++) {
            let element = document.createElement(newElementName);
            element.className = newElementClass;
            container[i].appendChild(element)
        }
    }
} */

function newElement(mainElementClass, newElementName, newElementClass) {
    let container = document.querySelectorAll(mainElementClass);
    let element = document.createElement(newElementName);
    element.className = newElementClass

    if (container.length >= 1) {
        container[container.length - 1].appendChild(element);
    }
    else {
        alert('No se encuentra el elemento con atributo: ' + mainElementClass)
    }
}

function capitalize(stringVar) {
    result = stringVar.charAt(0).toUpperCase() + stringVar.slice(1);
    return result;
}

let gifData = {
    url: [],
    title: [],
    src: []
}

for (let i = 0; i < 4; i++) {
    fetch('https://api.giphy.com/v1/gifs/random?api_key=SHG6tML92fdVMBeKXAMm4NhdLs0qCXyS')

        .then(response => response.json())

        .then(data => {

            console.log(data.data);

            gifData.url.push(data.data.url);
            gifData.title.push(data.data.username);
            gifData.src.push(data.data.images.downsized_medium.url);

            newElement('.suggested-container', 'div', 'sug-gif');
            newElement('.sug-gif', 'span', 'sug-gif-title');
            newElement('.sug-gif', 'img', 'sug-img');
            newElement('.sug-gif', 'a', 'sug-gif-bttn');

            setTimeout(() => {

                let sugGifTitle = document.querySelectorAll('.sug-gif-title');
                sugGifTitle[i].innerHTML = '#' + capitalize(gifData.title[i]);

                let sugImg = document.querySelectorAll('.sug-img');
                sugImg[i].setAttribute('loading', 'lazy')
                sugImg[i].src = gifData.src[i];

                let sugGifButton = document.querySelectorAll('.sug-gif-bttn');
                sugGifButton[i].innerHTML = 'Ver mas...';
                sugGifButton[i].target = '_blank';
                sugGifButton[i].href = gifData.url[i];

            }, 100);

        })


        .catch(error => {
            console.log(error)
        });

}

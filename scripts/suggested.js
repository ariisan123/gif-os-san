
function newElement(mainElementClass, newElementName, newElementClass) {
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

}

let srcArray = [];

let gifData = {
    title: [],
    src: []
}

for (let i = 0; i < 15; i++) {

    setTimeout(() => {



        fetch('https://api.giphy.com/v1/gifs/random?api_key=SHG6tML92fdVMBeKXAMm4NhdLs0qCXyS')

            .then(response => response.json())

            .then(data => {
                srcArray.push(data.data.images.fixed_height.url);

                gifData.title.push(data.data.title)
                gifData.src.push(data.data.images.fixed_height.url);
                /* console.log(srcArray); */

                if (data.meta.status == 200) {

                    newElement('.suggested-container', 'div', 'sug-gif');
                    newElement('.sug-gif', 'span', 'sug-gif-title');
                    newElement('.sug-gif', 'img', 'sug-img');
                    newElement('.sug-gif', 'button', 'sug-gif-bttn');

                    setTimeout(() => {
                        let sugGifTitle = document.querySelectorAll('.sug-gif-title');
                        sugGifTitle[i].innerHTML = gifData.title[i];

                        let sugImg = document.querySelectorAll('.sug-img');
                        sugImg[i].setAttribute('loading', 'lazy')
                        sugImg[i].src = gifData.src[i];

                        let sugGifButton = document.querySelectorAll('.sug-gif-bttn');
                        sugGifButton[i].innerHTML = 'Ver mas...';
                    }, 200);


                }

            })

            .catch(error => {
                console.log(error)
            });

    }, 200);

}
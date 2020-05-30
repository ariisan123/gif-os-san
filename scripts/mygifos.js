const myGifsData = getLocalStorage('gifs')

if (myGifsData != undefined && myGifsData.length >= 1) {
  myGifsData.forEach((element, index) => {
    newElement('.mygif-container', 'div', 'my-gif')
    newElement('.my-gif', 'img', 'mygif-img')

    myGifs = document.querySelectorAll('.mygif-img');
    myGifs[index].src = element.embed;
  });
}
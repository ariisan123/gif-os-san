getData(endpoints.trending)
  .then(data => {
    //console.log(data);

    data.forEach((element, index) => {
      newElement('.trends-container', 'div', 'trend-gif');
      newElement('.trend-gif', 'img', 'trend-img');
      newElement('.trend-gif', 'span', 'trend-tags');

      document.querySelectorAll('.trend-img')[index].src = element.images.fixed_height.url;
      document.querySelectorAll('.trend-tags')[index].innerText = addHashtag(capitalize(removeGifBy(element.title)));

      calculateWidthGif(element.images.fixed_height, '.trend-gif')

    });
  })
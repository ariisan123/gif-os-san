let limit = 25;

fetch('https://api.giphy.com/v1/gifs/trending?api_key=SHG6tML92fdVMBeKXAMm4NhdLs0qCXyS&rating=G&limit=' + limit)

    .then(response => response.json())

    .then(data => {
        console.log(data.data);

        let trendData = {
            src: [],
            tag: []
        }


        for (let i = 0; i < limit; i++) {
            newElement('.trends-container', 'div', 'trend-gif');
            newElement('.trend-gif', 'img', 'trend-img');
            newElement('.trend-gif', 'span', 'trend-tags');
            trendData.src.push(data.data[i].images.fixed_height.url)
            trendData.tag.push(capitalize(removeGifBy(data.data[i].title)))
        }

        console.log(trendData.tag);

        let trendImg = document.querySelectorAll('.trend-img');
        let trendTag = document.querySelectorAll('.trend-tags');

        for (let i = 0; i < limit; i++) {
            trendImg[i].src = trendData.src[i];
            trendTag[i].innerHTML = addHashtag(trendData.tag[i]);

        }

    })
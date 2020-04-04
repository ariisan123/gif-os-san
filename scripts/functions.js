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

function capitalize(string) {
    if (string.indexOf(' ') >= 0) {
        var element = string.toLowerCase().split(' ');
        for (let i = 0; i < element.length; i++) {
            element[i] = element[i].charAt(0).toUpperCase() + element[i].slice(1);
        }
        element = element.join(' ');
    }
    else if (string.length >= 2) {
        var element = string.charAt(0).toUpperCase() + string.slice(1);
    }
    else {
        var element = 'String vacia'
    }
    return element
}

function removeGifBy(title) {
    let tag = title.toLowerCase().split(' ');

    let gifIndex = tag.indexOf('gif');

    while (gifIndex >= 0) {
        tag.splice(gifIndex, 1);
        gifIndex = tag.indexOf('gif');
        console.log(tag.indexOf('gif'));
        console.log(tag);
    }

    let byIndex = tag.indexOf('by');

    while (byIndex >= 0) {
        tag.splice(byIndex, 1);
        byIndex = tag.indexOf('by');
        console.log(tag);
    }

    tag = tag.join(' ');
    return tag
}

function addHashtag(string) {
    let stringArray = string.split(' ');

    for (let i = 0; i < stringArray.length; i++) {
        stringArray[i] = `#${stringArray[i]}`;
    }

    stringArray = stringArray.join(' ');
    return stringArray
}
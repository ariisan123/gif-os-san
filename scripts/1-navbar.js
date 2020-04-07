let theme_menu = document.querySelectorAll('.drop-js');
let link_outline = document.querySelectorAll('.out-js');
let theme_select = document.querySelector('.theme-select').style;
let search_input = document.querySelector('#inp-search');
function open_close() {
    if (check_menu == true) {
        theme_select.visibility = 'visible';
        theme_select.top = '38px';

        theme_menu.forEach(element => {
            element.style.background = '#E6BBE2';
        });

        link_outline.forEach(element => {
            element.style.outline = '1px dotted #110038';
        });
        check_menu = false;

    } else {
        theme_select.visibility = 'hidden';
        theme_select.top = '15px';

        theme_menu.forEach(element => {
            element.removeAttribute('style');
        });

        link_outline.forEach(element => {
            element.removeAttribute('style');
        });
        check_menu = true;
    }
}

theme_menu.forEach(element => {
    element.addEventListener('click', () => {
        open_close()
    })
});
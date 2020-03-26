let theme_menu = document.querySelectorAll('.drop-js');
let theme_select = document.querySelector('.theme-select').style;

var check_menu = true;



function open_close() {
    if (check_menu == true) {
        theme_select.visibility = 'visible';
        theme_select.top = '38px';
        check_menu = false;

    } else {
        theme_select.visibility = 'hidden';
        theme_select.top = '15px';
        check_menu = true;
    }
}


theme_menu.forEach(element => {
    element.addEventListener('click', () => {
        open_close()
    })
});
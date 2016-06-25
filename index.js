var sidenav = new SideNavigation(document.querySelector('.side-nav'));

document
    .querySelector('.header__show-menu')
    .addEventListener('click', sidenav.show);

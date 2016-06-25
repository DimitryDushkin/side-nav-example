/**
 * SideNavigation widget
 * @param {Element} el
 */
function SideNavigation(el) {

    var container = el,
        sidenav = el.querySelector('.side-nav__content'),
        close = el.querySelector('.side-nav__close');

    this.show = function() {
        container.classList.remove('side-nav_hidden');
        sidenav.classList.remove('side-nav__content_hidden');
    }

    this.hide = function() {
        container.classList.add('side-nav_hidden');
        sidenav.classList.add('side-nav__content_hidden');
    }

    close.addEventListener('click', this.hide);
    container.addEventListener('click', function(e) {
        // Close only on non content click
        if (e.target === container) {
            this.hide();
        }
    }.bind(this));
}

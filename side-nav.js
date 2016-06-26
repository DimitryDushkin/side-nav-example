/**
 * SideNavigation widget
 * @param {Element} el
 */
function SideNavigation(el) {

    var container = el,
        sidenav = el.querySelector('.side-nav__content'),
        close = el.querySelector('.side-nav__close'),
        startPosition = 0,
        currentPosition = 0,
        isMoving = false;

    this.hide = hide;
    this.show = show;

    close.addEventListener('click', this.hide);
    container.addEventListener('click', function(e) {
        // Close only on non content click
        if (e.target === container) {
            this.hide();
        }
    }.bind(this));

    sidenav.addEventListener('pointerdown', onPointerDown);
    sidenav.addEventListener('pointermove', onPointerMove);
    sidenav.addEventListener('pointerup', onPointerUp);
    sidenav.addEventListener('pointercancel', onPointerUp);
    sidenav.addEventListener('pointerout', onPointerUp);

    /**
     * Start drag
     * @param {PointerEvent} e
     */
    function onPointerDown(e) {
        currentPosition = startPosition = e.pageX;
        isMoving = true;

        disableTransition();
        updatePosition();
    }

    /**
     * Move draggable element
     * @param {PointerEvent} e
     */
    function onPointerMove(e) {
        if (!isMoving) {
            return;
        }

        currentPosition = e.pageX;
        updatePosition();
    }

    /**
     * Stop drag
     * @param {PointerEvent} e
     */
    function onPointerUp(e) {
        currentPosition = e.pageX;
        isMoving = false;

        enableTransition();
        resetPosition();

        if (currentPosition - startPosition < -50) {
            hide();
        } else {
            show();
        }
    }

    /**
     * Update sidenav translateX value
     */
    function updatePosition() {
        requestAnimationFrame(function() {
            var diff = Math.min(10, currentPosition - startPosition);
            sidenav.style.transform = 'translateX(' + diff + 'px)';
        });
    }

    function resetPosition() {
        requestAnimationFrame(function() {
            sidenav.style.transform = '';
        });
    }

    function disableTransition() {
        sidenav.style.transition = 'none';
    }

    function enableTransition() {
        sidenav.style.transition = '';
    }
}

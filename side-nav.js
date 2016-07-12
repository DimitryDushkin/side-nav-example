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
        isGestureStarted = false;

    this.hide = hide;
    this.show = show;

    close.addEventListener('click', this.hide);
    container.addEventListener('click', onContainerClick);

    sidenav.addEventListener('pointerdown', onPointerDown);
    sidenav.addEventListener('pointermove', onPointerMove);
    sidenav.addEventListener('pointerup', onPointerUp);
    sidenav.addEventListener('pointercancel', onPointerUp);
    sidenav.addEventListener('pointerleave', onPointerUp);

    function show() {
        container.classList.remove('side-nav_hidden');
        sidenav.classList.remove('side-nav__content_hidden');
    }

    function hide() {
        container.classList.add('side-nav_hidden');
        sidenav.classList.add('side-nav__content_hidden');
    }

    function onContainerClick(e) {
        // Close only on non content click
        if (e.target === container) {
            hide();
        }
    }

    /**
     * Start drag
     * @param {PointerEvent} e
     */
    function onPointerDown(e) {
        currentPosition = startPosition = e.pageX;
        isGestureStarted = true;

        // Необязательно https://w3c.github.io/pointerevents/#h-implicit-pointer-capture
        sidenav.setPointerCapture(e.pointerId);

        disableTransition();
    }

    /**
     * Move draggable element
     * @param {PointerEvent} e
     */
    function onPointerMove(e) {
        if (!isGestureStarted) {
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
        isGestureStarted = false;

        sidenav.releasePointerCapture(e.pointerId);

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

'use strict'

class sideNav extends HTMLElement {
    constructor() {
    }

    bindEvents() {
        this.showSideNav = this.showSideNav.bind(this);
        this.hideSideNav = this.hideSideNav.bind(this);
        this.update = this.update.bind(this);
    }

    setElements() {
        this._menuButton = document.getElementById('menu-button');
        this._sideNav = document.getElementById('side-nav');
        this._sideNavContainer = document.getElementsByClassName('side-nav__container')[0];
        this.touchingSideNav = false;
        this.startTouchX = 0;
        this.currentTouchX = 0;
    }

    addEventListeners() {
        this._menuButton.addEventListener('click', this.showSideNav);
        this._sideNav.addEventListener('click', this.hideSideNav);
        document.getElementById('side-nav-close-icon').addEventListener('click', this.hideSideNav);
        this._sideNavContainer.addEventListener('click', this.blockClicks);

        this._sideNav.addEventListener('touchstart', this.onTouchStart, App.getPassiveEvs());
        this._sideNav.addEventListener('touchmove', this.onTouchMove, App.getPassiveEvs());
        this._sideNav.addEventListener('touchend', this.onTouchEnd);
    }

    createdCallback() {
        this.setElements();
        this.bindEvents();
        this.addEventListeners();
    }

    detachedCallback() {
        this._menuButton.removeEventListener('click', this.showSideNav);
        this._sideNav.removeEventListener('click', this.hideSideNav);
        document.getElementById('side-nav-close-icon').removeEventListener('click', this.hideSideNav);
        this._sideNavContainer.removeEventListener('click', this.blockClicks);

        this._sideNav.removeEventListener('touchstart', this.onTouchStart, App.passiveEvs);
        this._sideNav.removeEventListener('touchmove', this.onTouchMove, App.passiveEvs);
        this._sideNav.removeEventListener('touchend', this.onTouchEnd);
    }

    /**
     * touch events
     **/

    onTouchStart(evt) {
        if( !this._sideNav.classList.contains('visible') ) return;

        this.startTouchX = evt.touches[0].pageX;
        this.currentTouchX = this.startTouchX;
        this.touchingSideNav = true;

        requestAnimationFrame(this.update);
    }

    onTouchEnd(evt) {
        this.touchingSideNav = false;
        this._sideNavContainer.style.transform = '';

        if( (this.currentTouchX - this.startTouchX) < -100 ) {
            this.hideSideNav();
        }
    }

    onTouchMove(evt) {
        if( !this.touchingSideNav ) return;

        this.currentTouchX = evt.touches[0].pageX;
    }

    update() {
        if( !this.touchingSideNav ) return;

        requestAnimationFrame(this.update);

        const translateX = this.currentTouchX - this.startTouchX;

        if( translateX <= 0 ) {
            this._sideNavContainer.style.transform = 'translateX(' + translateX + 'px)';
        } else {
            this._sideNavContainer.style.transform = '';
        }

    }

    /**
     * Show/Hide sideNav
     **/

    showSideNav() {
        this._sideNav.classList.remove('animatable');
        this._sideNav.classList.add('visible');
    }

    hideSideNav() {
        this._sideNav.classList.add('animatable');
        this._sideNav.classList.remove('visible');
    }

    blockClicks(evt) {
        evt.stopPropagation();
    }
};

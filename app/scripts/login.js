'use strict';

class loginView extends HTMLElement {
    constructor() {
        super();
        this._createInnerHtml();
    }

    attributeChangedCallback() {}

    createdCallback() {
        this._setArgs();
        this.bindEvents();
        this.addEventListeners();
        window.lol = this;
    }

    bindEvents () {
        this.loginAnimation = this.loginAnimation.bind(this);
        this.approachTransition = this.approachTransition.bind(this);
    }

    detachedCallback () {
        this._loginBox.removeEventListener('click', this.loginAnimation);
    }

    addEventListeners () {
        this._loginBox.addEventListener('click', this.loginAnimation);
    }

    loginAnimation () {
        if( this.animating === true ) return;

        this._approachingZ = 0;
        this._rotatingX = 0;
        this._transY = 0;
        this.animating = true;
        requestAnimationFrame(this.approachTransition);
    }

    approachTransition () {
        this._approachingZ += 10;
        this._rotatingX -= 4;
        this.style.transform = `translateZ(${this._approachingZ}px)`;
        this._loginBox.style.transform = 'rotate3d(1, 0, 0, ' + this._rotatingX + 'deg)';

        if( this._approachingZ < 500) {
            requestAnimationFrame(this.approachTransition);
        } else {
            this.removeLogin();
        }
    }

    removeLogin () {
        document.getElementsByClassName('login-anchor')[0].style.display = 'none';
        this.parentNode.removeChild(this);
    }

    /**
     * custom fns
     */
    _createInnerHtml () {
        this.innerHTML = '<div class="login-box"></div>';
    }

    _setArgs () {
        this._loginBox = this.getElementsByTagName('section')[0];
    }
};

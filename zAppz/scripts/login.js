'use strict';

class loginView extends HTMLElement {
    constructor() {
        super();
    }

    detachedCallback() {}

    createdCallback() {
        this.createInnerHtml();
    }

    attributeChangedCallback() {}

    /**
     * custom fns
     */
    createInnerHtml () {
        this.innerHTML = '<div class="login-box"></div>';
    }
}

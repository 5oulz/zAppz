'use strict';

class AppFn {

    // define template paths here
    _setTemplates () {
        this._templates = {
            cubeTemplate: 'templates/cube.html'
        };
    }

    constructor () {
        this._setArgs();
    }

    initLogin () {
        document.registerElement('login-view', loginView);
    }

    initSideNav() {
        document.registerElement('side-nav', sideNav);
    }

    initCube() {
        document.registerElement('polygon-cube', Cube);
        this._cubeTemplate().render();
    }

    /**
     * methods
     */

    _passiveEvSupported () {
        let passiveEvs = false;
        try {
            document.addEventListener('test', null, {get passive () {
                passiveEvs = { passive: true };
            }});
        } catch (e) {}

        return passiveEvs;
    }

    displayLoginView () {
        let anchorLog = document.getElementsByClassName('login-anchor')[0];
        anchorLog.innerHTML = this.getLoginHtml();
        anchorLog.style.display = 'block';
    }

    /**
     * setters (not the god, though this one is spelled with an h)
     **/

     _setArgs () {
         this._setTemplates();
         this._passiveEvs = this._passiveEvSupported();
         this._loginHtml = '<login-view id="login-view" class="login-wrapper"><div class="login-wrapper__left-section"></div><div class="login-wrapper__middle-section"><div id="top-middle-login" class="login-wrapper__middle-section__not-box"></div><section class="login-wrapper__middle-section__login-box"></section><div class="login-wrapper__middle-section__login-box-shadow"></div><div id="bot-middle-login" class="login-wrapper__middle-section__not-box"></div></div><div class="login-wrapper__right-section"></div></login-view>';
         this._appContent = document.getElementById('app-content');
     }

     _cubeTemplate(template, elem, obj) {
         let cube = new loadHtml(
             this._templates.cubeTemplate,
             this._appContent,
             {
                 test1: '<p style="text-align:center;line-height:150px;color:#fff;">spin me</p>',
                 testsomemore: 'play'
             }
         );

         return cube;
     }

     /**
      * getters
      */

     getPassiveEvs () {
         return this._passiveEvs;
     }

     getLoginHtml () {
         return this._loginHtml;
     }
};

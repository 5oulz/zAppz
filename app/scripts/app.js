'use strict';


/**
 * class app should initialize everything the app needs for it's shell. here's a list
 * - sideNav
 */
class AppFn {
    _setRequests () {
        this._requests = {
            sideNav: 'scripts/sideNav.js'
        };
    }

    /* define template paths here */
    _setTemplates () {
        //cubeTemplate: 'templates/cube.html',
        initTemplates({
            sideNavTemplate: 'templates/sideNav.html'
        }, this);
    }

    constructor () {
        this._setArgs();
        this._initAppDependencies();
    }

    _initSideNav() {
        getMeThatJS(this._requests.sideNav)
            .then(_ => {
                document.registerElement('side-nav', sideNav);
                return renderElements(
                    this.sideNavTemplate(),
                    document.getElementById('body-anchor')
                );
            })
            .catch(console.log.bind(console));
    }

    initCube(elem) {
        document.registerElement('polygon-cube', Cube);
        renderElements(
            this.cubeTemplate( /* i want this params */
                {
                    test1: '<p style="text-align:center;line-height:150px;color:#fff;">spin me</p>',
                    testsomemore: 'play'
                }
            ),
            elem /* and i want it rendered here */
        );
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
        this._setRequests();
        this._passiveEvs = this._passiveEvSupported();
        this._appContent = document.getElementById('app-content');
    }

    _initAppDependencies () {
        this._initSideNav();
    }

    /**
    * getters
    */

    getPassiveEvs () {
        return this._passiveEvs;
    }
}

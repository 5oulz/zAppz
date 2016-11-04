'use strict';
var App = {
    passiveEvs: false
};


let passiveEvSupported = _ => {
    try {
        document.addEventListener('test', null, {get passive () {
            App.passiveEvs = { passive: true };
        }});
    } catch (e) {}

    return;
}

let initLogin = _ => {
    document.registerElement('login-view', loginView);
}

let displayLoginView = _ => {
    let anchorLog = document.getElementsByClassName('login-anchor')[0];
    anchorLog.innerHTML = '<login-view id="login-view" class="login-wrapper"></login-view>';
    anchorLog.style.display = 'block';
};


let initSideNav = _ => {
    document.registerElement('side-nav', sideNav);
};

(_ => {
    // further down the road we want to check when we need to append login
    initLogin();
    //displayLoginView();
    initSideNav();
    passiveEvSupported();
})();

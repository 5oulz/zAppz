'use strict';

( _ => {
    window.App = new AppFn();
    App.initSideNav();
    App.initLogin();
    App.initCube();

    // we're creating it here now but further down the road it'll be tested where to apply it
    //App.displayLoginView();
    /*for( let i = 0; i < 10; setTimeout( _ => {
        console.log(i++);
    }, 10));*/
} )();

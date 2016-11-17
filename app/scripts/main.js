'use strict';

let initRouter = resolve => {
    let router = new Router();

    return new Promise(resolve => {
        return router ? resolve() : Error('Couldn\t start router');
    });
};

let initLoadHtml = resolve => {
    let templating = new loadHtml();

    return new Promise(resolve => {
        return templating ? resolve() : Error('Couldn\'t load templating');
    });
};

let initApp = resolve => {
    window.App = new AppFn();

    return new Promise(resolve => {
        return App ? resolve() : Error('Couldn\'t start App');
    });
};

(_=>{
    let requests = [
        getMeThatJS('scripts/router.js'),
        getMeThatJS('scripts/loadHtml.js'),
        getMeThatJS('scripts/app.js')
    ];

    /**
     * router and loadHtml are the first things to render, since they're essential to running our app
     */
    Promise.all(requests)
        .then(initRouter)
        .then(initLoadHtml)
        .then(initApp)
        .catch(console.log.bind(console));
})();

class Router {
    constructor() {
        this._setArgs();
        this._bindEvents();
    }

    _checkHistState () {
        if( window.history.state === null ) {
            window.history.state = location.href;
        }
    }

    _onChange (ev) {
        //this._checkHistState();
        console.log('oh look ' + window.location.href);
    }

    _setArgs () {
    }

    _bindEvents () {
        this._onChange = this._onChange.bind(this);
        window.onpopstate = this._onChange;
        window.addEventListener('popstate', this._onChange);
        window.addEventListener('pushstate', this._onChange);
        this._onChange();
    }

    detachedCallback () {
        window.removeEventListener('popstate', this._onChange);
        window.addEventListener('pushstate', this._onChange);
    }
};

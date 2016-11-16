'use strict';

class loadHtml {
    constructor(path, params) {
        this._path = path;
        if( params ) this._params = params;
        this._bindTThis();
    }

    _bindTThis () {
        this._fetchHtml = this._fetchHtml.bind(this);
        this._buildHTMLElement = this._buildHTMLElement.bind(this);
        this._replaceStrings = this._replaceStrings.bind(this);
        this._getHtml = this._getHtml.bind(this);
        this.render = this.render.bind(this);
    }

    _fetchHtml (resolve) {
        let xhr = new XMLHttpRequest(),
            _this = this;

        xhr.open('GET', this._path, true);
        xhr.onreadystatechange = function() {
            if ( this.readyState !== 4 ) return;
            if ( this.status !== 200 ) {
                throw('HTML File not found...WELL DONE!');
                return;
            }

            resolve(this.responseText);
        };

        xhr.send();
    }

    _buildHTMLElement (htmlcont) {
        if( !this._params ) return htmlcont;

        this._htmlContent = this._replaceStrings(htmlcont);

        return this._getHtml();
    }

    _fillString (stringToFill) {
        let replaced = stringToFill;

        if( stringToFill.split('{{')[1].length === 0 ) {
            // case there's nothing written between {{}}
            throw('Maybe you should fill your {{}}\'s with something...WELL DONE! (yes, we\'re throwing!)');
        } else if( !this._params[stringToFill.split('{{')[1]] ) {
            // case there's no param with the same key as what was typed between {{}}
            throw('Maybe you should use the same names as your obj key values...WELL DONE! (yes, there\'s a throw here as well...)');
        } else {
            replaced = stringToFill.replace(
                stringToFill.split('{{')[1],
                this._params[stringToFill.split('{{')[1]]
            );
        }

        return replaced.replace('{{', '');
    }

    _replaceStrings(htmlcont) {
        let parsedString = htmlcont.split('}}');

        if( parsedString.length === 1 ) return parsedString[0];

        return this._fillString(parsedString[0]) + this._replaceStrings(htmlcont.replace(htmlcont.split('}}')[0], '').replace('}}', ''));
    }

    _getHtml () {
        return this._htmlContent;
    }

    render () {
        return new Promise(this._fetchHtml).then(this._buildHTMLElement).catch(console.log.bind(console));
    }
};



/**
 * templating functions
 */


/**
 * generates a function to load the template and returns it
 * @param {string} - template url
 */
let generateBindFn = (url) => {
    let fn = (params) => {
        let template = new loadHtml(
            url,
            params ? params : false
        );

        return template;
    };

    return fn;
};


/**
 * retuns an obj with obj keys
 * @param {object} - in this case containing urls
 */
let getTemplateKeys = (urls) => {
    return Object.keys(urls);
};

/**
 * loops through an array of keys from urls object and binds a function
 * with each key name to the scopeBind object
 * @param {object} - object of urls
 * @param {scopeBind} - object where to bind each function
 */
let initTemplates = (urls, scopeBind) => {
    let keys = getTemplateKeys(urls);

    keys.forEach((elem) => {
        scopeBind[elem] = generateBindFn(urls[elem]);
    });
};

/**
 * renders a template (type loadHtml) into an element
 * @param {elem} - dom element
 * @param {template} - promise returned by loadHtml
 */
let renderElements = (template, elem) => {
    return template.render().then((result)=> {
        elem.innerHTML = result;
        return result;
    });
}

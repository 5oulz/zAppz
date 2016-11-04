'use strict';

class loadHtml {
    constructor(path, element, params) {
        this._path = path;
        this._element = element;
        if( params ) this._params = params;

        this._bindTThis();
    }

    _bindTThis () {
        this._setHTML = this._setHTML.bind(this);
        this._fetchHtml = this._fetchHtml.bind(this);
        this._buildHTMLElement = this._buildHTMLElement.bind(this);
        this._replaceStrings = this._replaceStrings.bind(this);
    }

    _fetchHtml (resolve, reject) {
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

    _setHTML (htmlcont) {
        this._element.innerHTML = this._htmlContent;
    }

    render () {
        let request = new Promise(this._fetchHtml);
        request.then(this._buildHTMLElement, _ => {}).then(this._setHTML);
    }
}

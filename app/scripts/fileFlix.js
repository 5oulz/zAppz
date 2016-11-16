'use strict';

let scriptAnchorForRequests = document.getElementsByTagName("head")[0];

/**
 * gets a js file and loads it into the dom. can't use imports without babel yet...
 */
let getMeThatJS = (url, resolve) => {
    return new Promise((resolve, reject) => {
        let script = document.createElement('script'),
            justLoaded = (args) => {
                resolve();
            };
        script.setAttribute('src', url);
        script.setAttribute('type', 'text/javascript');

        script.onload = justLoaded;
        script.onreadystatechange = justLoaded;
        scriptAnchorForRequests.appendChild(script);
    });
};

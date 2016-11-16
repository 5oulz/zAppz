let getMeThatFile = new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if ( this.readyState !== 4 ) return;
        if ( this.status !== 200 ) {
            throw('HTML File not found...WELL DONE!');
            return;
        }
debugger;
        resolve();
    };

    xhr.send();
});

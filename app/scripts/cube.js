'use strict';

class Cube extends HTMLElement {
    constructor () {
    }

    attachedCallback () {
        this._setArgs();
        this._bindEvents();
        this._addEventListeners();
    }

    detachedCallback () {
        this.removeEventListener('touchstart', this._onTouchStart);
        this.removeEventListener('touchmove', this._onTouchMove);
        this.removeEventListener('touchend', this._onTouchEnd);
        this.removeEventListener('dragstart', this._onTouchStart);
        this.removeEventListener('dragover', this._onDragMove);
        this.removeEventListener('dragend', this._onTouchEnd);
    }

    _setArgs () {
        this._cube = document.getElementById('polygon-cube');
        this._transparentDrag = document.getElementById('cube-transparency');
        this._transformCubeX = 0;
        this._transformCubeY = 0;
        this._XModifier = 0;
        this._YModifier = 0;
    }

    _bindEvents () {
        this._onTouchStart = this._onTouchStart.bind(this);
        this._onTouchMove = this._onTouchMove.bind(this);
        this._onDragMove = this._onDragMove.bind(this);
        this._onTouchEnd = this._onTouchEnd.bind(this);

        this._updateCube = this._updateCube.bind(this);
        this._movingCube = false;
    }

    _addEventListeners () {
        this.addEventListener('touchstart', this._onTouchStart, App.getPassiveEvs());
        this.addEventListener('touchmove', this._onTouchMove, App.getPassiveEvs());
        this.addEventListener('touchend', this._onTouchEnd, App.getPassiveEvs());
        this.addEventListener('dragstart', this._onDragStart);
        this.addEventListener('dragover', this._onDragMove);
        this.addEventListener('dragend', this._onTouchEnd);
    }

    _onTouchStart (evt) {
        this._movingCube = true;
        this._calcModifiers(evt.touches[0].pageX, evt.touches[0].pageY);
        requestAnimationFrame(this._updateCube);
    }

    _onDragStart (evt) {
        evt.dataTransfer.setDragImage(this._transparentDrag, 0, 0);
        this._movingCube = true;
        this._calcModifiers(evt.x, evt.y);
        requestAnimationFrame(this._updateCube);
    }

    _onTouchMove (evt) {
        if( !this._movingCube ) return;
        this._updatePositions(
            evt.touches[0].pageX,
            evt.touches[0].pageY
        );
    }

    _onDragMove(evt) {
        if( !this._movingCube ) return;
        this._updatePositions(
            evt.x,
            evt.y
        );
    }

    _onTouchEnd () {
        this._movingCube = false;
        requestAnimationFrame(this._updateCube);
    }

    /**
     * calculates transform diferences so we can pick the cube where we left it
     */
    _calcModifiers (x, y) {
        this._transformCubeX === 0 ? this._XModifier = 0 : this._XModifier = this._transformCubeX - x;
        this._transformCubeY === 0 ? this._YModifier = 0 : this._YModifier = this._transformCubeY - y;
    }

    /**
     * updates transform values to be used by requestAnimationFrame
     */
    _updatePositions (x, y) {
        this._transformCubeX = x + this._XModifier;
        this._transformCubeY = y + this._YModifier;
    }

    /**
     * loop inside requestAnimationFrame. applies transform to the cube
     */
    _updateCube () {
        this._cube.style.transform = `rotateY(${this._transformCubeX}deg) rotateX(${this._transformCubeY}deg)`;
        if( this._movingCube ) requestAnimationFrame(this._updateCube);
    }
}

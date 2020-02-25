import { Component, ElementRef, Renderer2, HostBinding, Input, Output, ViewChild, HostListener, EventEmitter, Directive, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { assign, debounce } from 'lodash';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * @fileoverview added by tsickle
 * Generated from: components/ngx-image-gallery/ngx-image-gallery.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// key codes to react
/** @type {?} */
var KEY_CODES = {
    37: 'LEFT',
    39: 'RIGHT',
    27: 'ESC'
};
// default gallery configuration
/** @type {?} */
var DEFAULT_CONF = {
    imageBorderRadius: '3px',
    imageOffset: '20px',
    imagePointer: false,
    showDeleteControl: false,
    showCloseControl: true,
    showExtUrlControl: true,
    showImageTitle: true,
    showThumbnails: true,
    closeOnEsc: true,
    reactToKeyboard: true,
    reactToMouseWheel: true,
    reactToRightClick: false,
    thumbnailSize: 30,
    backdropColor: 'rgba(13,13,14,0.85)',
    inline: false,
    showArrows: true
};
var NgxImageGalleryComponent = /** @class */ (function () {
    /***************************************************/
    function NgxImageGalleryComponent(galleryElem, sanitizer, renderer) {
        var _this = this;
        this.galleryElem = galleryElem;
        this.sanitizer = sanitizer;
        this.renderer = renderer;
        // gallery opened memory
        this.opened = false;
        // gallery configuration
        this.conf = {};
        // gallery images
        this.images = [];
        // event emmiters
        this.onOpen = new EventEmitter();
        this.onClose = new EventEmitter();
        this.onDelete = new EventEmitter();
        this.onImageChange = new EventEmitter();
        this.onImageClicked = new EventEmitter();
        /**
         * ***********************************************
         */
        // loading animation memory
        this.loading = false;
        // current active image index
        this.activeImageIndex = null;
        // thumbnail margin and scroll position
        this.thumbnailMargin = '0px 8px';
        this.thumbnailsScrollerLeftMargin = '0px';
        // adjust thumbnail margin to perfectly fit viewport
        this.fitThumbnails = debounce((/**
         * @return {?}
         */
        function () {
            // if thumbnails not visible, return false
            if (_this.conf.showThumbnails == false)
                return false;
            /** @type {?} */
            var thumbnailParams = _this.thumbnailsRenderParams;
            _this.thumbnailMargin = '0 ' + (thumbnailParams.newThumbnailMargin / 2) + 'px';
        }), 300);
        // debounced prev
        this.debouncedPrev = debounce((/**
         * @return {?}
         */
        function () { return _this.prev(); }), 100, { 'leading': true, 'trailing': false });
        // debounced next
        this.debouncedNext = debounce((/**
         * @return {?}
         */
        function () { return _this.next(); }), 100, { 'leading': true, 'trailing': false });
    }
    Object.defineProperty(NgxImageGalleryComponent.prototype, "activeImage", {
        // active image
        get: 
        // active image
        /**
         * @return {?}
         */
        function () {
            return this.images[this.activeImageIndex];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxImageGalleryComponent.prototype, "onFirstImage", {
        // if gallery is on : first image
        get: 
        // if gallery is on : first image
        /**
         * @return {?}
         */
        function () {
            return this.activeImageIndex == 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxImageGalleryComponent.prototype, "onLastImage", {
        // if gallery is on : last image
        get: 
        // if gallery is on : last image
        /**
         * @return {?}
         */
        function () {
            return this.activeImageIndex == (this.images.length - 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxImageGalleryComponent.prototype, "thumbnailsRenderParams", {
        // get thumbnails viewport rendering parameters
        get: 
        // get thumbnails viewport rendering parameters
        /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var thumbnailsContainerWidth = this.thumbnailsElem.nativeElement.offsetWidth;
            /** @type {?} */
            var thumbnailMargin = 16;
            /** @type {?} */
            var thumbnailSize = thumbnailMargin + this.conf.thumbnailSize;
            /** @type {?} */
            var thumbnailsInView = Math.floor(thumbnailsContainerWidth / thumbnailSize);
            /** @type {?} */
            var extraSpaceInThumbnailsContainer = thumbnailsContainerWidth - (thumbnailsInView * thumbnailSize);
            /** @type {?} */
            var extraMargin = extraSpaceInThumbnailsContainer / thumbnailsInView;
            /** @type {?} */
            var newThumbnailMargin = thumbnailMargin + extraMargin;
            /** @type {?} */
            var newThumbnailSize = newThumbnailMargin + this.conf.thumbnailSize;
            /** @type {?} */
            var relativePositionOfActiveImageThumbnailToScroller = thumbnailsInView - (thumbnailsInView - this.activeImageIndex);
            /** @type {?} */
            var thumbnailsScrollerLeftMargin;
            if (relativePositionOfActiveImageThumbnailToScroller > thumbnailsInView - 2) {
                /** @type {?} */
                var outThumbnails = ((this.activeImageIndex + 1) - thumbnailsInView) + 1;
                if (this.activeImageIndex != (this.images.length - 1)) {
                    thumbnailsScrollerLeftMargin = '-' + (newThumbnailSize * outThumbnails) + 'px';
                }
                else {
                    thumbnailsScrollerLeftMargin = '-' + (newThumbnailSize * (outThumbnails - 1)) + 'px';
                }
            }
            else {
                thumbnailsScrollerLeftMargin = '0px';
            }
            return {
                thumbnailsInView: thumbnailsInView,
                newThumbnailMargin: newThumbnailMargin,
                newThumbnailSize: newThumbnailSize,
                thumbnailsScrollerLeftMargin: thumbnailsScrollerLeftMargin
            };
        },
        enumerable: true,
        configurable: true
    });
    // set gallery configuration
    // set gallery configuration
    /**
     * @private
     * @param {?} conf
     * @return {?}
     */
    NgxImageGalleryComponent.prototype.setGalleryConf = 
    // set gallery configuration
    /**
     * @private
     * @param {?} conf
     * @return {?}
     */
    function (conf) {
        this.conf = assign(DEFAULT_CONF, conf);
    };
    // load image and return promise
    // load image and return promise
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    NgxImageGalleryComponent.prototype.loadImage = 
    // load image and return promise
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    function (index) {
        var _this = this;
        /** @type {?} */
        var galleryImage = this.images[index];
        // check if image is cached
        if (galleryImage._cached) {
            return Promise.resolve(index);
        }
        else {
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            function (resolve, reject) {
                _this.loading = true;
                /** @type {?} */
                var image = new Image();
                image.src = galleryImage.url;
                image.onload = (/**
                 * @return {?}
                 */
                function () {
                    _this.loading = false;
                    galleryImage._cached = true;
                    resolve(index);
                });
                image.onerror = (/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    _this.loading = false;
                    reject(error);
                });
            }));
        }
    };
    // activate image (set active image)
    // activate image (set active image)
    /**
     * @private
     * @param {?} imageIndex
     * @return {?}
     */
    NgxImageGalleryComponent.prototype.activateImage = 
    // activate image (set active image)
    /**
     * @private
     * @param {?} imageIndex
     * @return {?}
     */
    function (imageIndex) {
        var _this = this;
        // prevent loading if already loading
        if (this.loading)
            return false;
        // emit event
        this.onImageChange.emit(imageIndex);
        this.loadImage(imageIndex)
            .then((/**
         * @param {?} _imageIndex
         * @return {?}
         */
        function (_imageIndex) {
            _this.activeImageIndex = _imageIndex;
            // scroll thumbnails
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.fitThumbnails();
                setTimeout((/**
                 * @return {?}
                 */
                function () { return _this.scrollThumbnails(); }), 300);
            }));
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return console.warn(error); }));
    };
    // scroll thumbnails to perfectly position active image thumbnail in viewport
    // scroll thumbnails to perfectly position active image thumbnail in viewport
    /**
     * @private
     * @return {?}
     */
    NgxImageGalleryComponent.prototype.scrollThumbnails = 
    // scroll thumbnails to perfectly position active image thumbnail in viewport
    /**
     * @private
     * @return {?}
     */
    function () {
        // if thumbnails not visible, return false
        if (this.conf.showThumbnails == false)
            return false;
        /** @type {?} */
        var thumbnailParams = this.thumbnailsRenderParams;
        this.thumbnailsScrollerLeftMargin = thumbnailParams.thumbnailsScrollerLeftMargin;
    };
    /**
     * @return {?}
     */
    NgxImageGalleryComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // create final gallery configuration
        this.setGalleryConf(this.conf);
        // apply backdrop color
        this.renderer.setStyle(this.galleryElem.nativeElement, 'background-color', this.conf.backdropColor);
        // gallery inline class and auto open
        if (this.conf.inline) {
            this.renderer.addClass(this.galleryElem.nativeElement, 'inline');
            this.open(0);
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgxImageGalleryComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        // when gallery configuration changes
        if (changes.conf && changes.conf.firstChange == false) {
            this.setGalleryConf(changes.conf.currentValue);
            // apply backdrop color
            this.renderer.setStyle(this.galleryElem.nativeElement, 'background-color', this.conf.backdropColor);
            // gallery inline class and auto open
            if ((changes.conf.previousValue.inline != true) && this.conf.inline) {
                this.renderer.addClass(this.galleryElem.nativeElement, 'inline');
                this.open(0);
            }
        }
        // when gallery images changes
        if (changes.images && changes.images.firstChange == false) {
            this.images = changes.images.currentValue;
            if (this.images.length) {
                this.activateImage(0);
            }
        }
    };
    // keyboard event
    // keyboard event
    /**
     * @param {?} event
     * @return {?}
     */
    NgxImageGalleryComponent.prototype.onKeyboardInput = 
    // keyboard event
    /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.conf.reactToKeyboard && this.opened && !this.loading) {
            if (KEY_CODES[event.keyCode] == 'RIGHT') {
                this.next();
            }
            else if (KEY_CODES[event.keyCode] == 'LEFT') {
                this.prev();
            }
            else if ((KEY_CODES[event.keyCode] == 'ESC') && this.conf.closeOnEsc) {
                this.close();
            }
        }
    };
    // window resize event
    // window resize event
    /**
     * @param {?} event
     * @return {?}
     */
    NgxImageGalleryComponent.prototype.onWindowResize = 
    // window resize event
    /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (this.opened && !this.loading) {
            this.fitThumbnails();
            setTimeout((/**
             * @return {?}
             */
            function () { return _this.scrollThumbnails(); }), 300);
        }
    };
    /***************************************************/
    // open gallery
    /**
     * ***********************************************
     * @param {?=} index
     * @return {?}
     */
    // open gallery
    NgxImageGalleryComponent.prototype.open = /**
     * ***********************************************
     * @param {?=} index
     * @return {?}
     */
    // open gallery
    function (index) {
        if (index === void 0) { index = 0; }
        if (this.images.length) {
            this.opened = true;
            // emit event
            this.onOpen.emit(index);
            // activate image at given index
            this.activateImage(index);
        }
        else {
            console.warn('No images provided to ngx-image-gallery!');
        }
    };
    // close gallery
    // close gallery
    /**
     * @return {?}
     */
    NgxImageGalleryComponent.prototype.close = 
    // close gallery
    /**
     * @return {?}
     */
    function () {
        this.opened = false;
        this.activeImageIndex = 0;
        // emit event
        this.onClose.emit();
    };
    // change prev image
    // change prev image
    /**
     * @return {?}
     */
    NgxImageGalleryComponent.prototype.prev = 
    // change prev image
    /**
     * @return {?}
     */
    function () {
        if (this.onFirstImage == false) {
            this.activateImage(this.activeImageIndex - 1);
        }
    };
    // change next image
    // change next image
    /**
     * @return {?}
     */
    NgxImageGalleryComponent.prototype.next = 
    // change next image
    /**
     * @return {?}
     */
    function () {
        if (this.onLastImage == false) {
            this.activateImage(this.activeImageIndex + 1);
        }
    };
    // set image (activate)
    // set image (activate)
    /**
     * @param {?} index
     * @return {?}
     */
    NgxImageGalleryComponent.prototype.setActiveImage = 
    // set image (activate)
    /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.activateImage(index);
    };
    // delete image
    // delete image
    /**
     * @param {?} index
     * @return {?}
     */
    NgxImageGalleryComponent.prototype.deleteImage = 
    // delete image
    /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.onDelete.emit(index);
    };
    // mouse wheel up (prev image)
    // mouse wheel up (prev image)
    /**
     * @return {?}
     */
    NgxImageGalleryComponent.prototype.mouseWheelUp = 
    // mouse wheel up (prev image)
    /**
     * @return {?}
     */
    function () {
        if (this.conf.reactToMouseWheel) {
            this.debouncedNext();
        }
    };
    // mouse wheel down (next image)
    // mouse wheel down (next image)
    /**
     * @return {?}
     */
    NgxImageGalleryComponent.prototype.mouseWheelDown = 
    // mouse wheel down (next image)
    /**
     * @return {?}
     */
    function () {
        if (this.conf.reactToMouseWheel) {
            this.debouncedPrev();
        }
    };
    // click on image
    // click on image
    /**
     * @param {?} index
     * @return {?}
     */
    NgxImageGalleryComponent.prototype.clickOnImage = 
    // click on image
    /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.onImageClicked.emit(index);
    };
    // right click on image
    // right click on image
    /**
     * @param {?} event
     * @return {?}
     */
    NgxImageGalleryComponent.prototype.rightClickOnImage = 
    // right click on image
    /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        return this.conf.reactToRightClick;
    };
    NgxImageGalleryComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-image-gallery',
                    template: "<!-- images and image information container --> <div class=\"galleria\" mouseWheel (mouseWheelDown)=\"mouseWheelDown()\" (mouseWheelUp)=\"mouseWheelUp()\" (contextmenu)=\"rightClickOnImage($event)\"> <!-- images --> <div class=\"images-container\" (swiperight)=\"prev()\" (swipeleft)=\"next()\"> <!-- images array --> <div class=\"image\" *ngFor=\"let image of images; let i = index;\" [class.active]=\"!loading && (i == activeImageIndex)\" [ngStyle]=\"{top: conf.imageOffset, bottom: conf.imageOffset}\"> <img *ngIf=\"i == activeImageIndex\" [src]=\"sanitizer.bypassSecurityTrustUrl(image.url)\" [alt]=\"image.altText || ''\" [style.cursor]=\"conf.imagePointer?  'pointer':'default'\" [style.borderRadius]=\"conf.imageBorderRadius\" (click)=\"clickOnImage(activeImageIndex)\"/> </div> <!-- loading animation --> <div class=\"loading-animation\" *ngIf=\"(images.length == 0) || loading\"> <svg  version=\"1.1\" id=\"L3\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 100 100\" enable-background=\"new 0 0 0 0\" xml:space=\"preserve\"> <circle fill=\"none\" stroke=\"#fff\" stroke-width=\"4\" cx=\"50\" cy=\"50\" r=\"44\" style=\"opacity:0.5;\"/> <circle fill=\"#4caf50\" stroke=\"#eee\" stroke-width=\"3\" cx=\"8\" cy=\"54\" r=\"6\"> <animateTransform attributeName=\"transform\" dur=\"2s\" type=\"rotate\" from=\"0 50 48\" to=\"360 50 52\" repeatCount=\"indefinite\" /> <animate  attributeName=\"fill\"  begin=\"1s\"  dur=\"16s\"  values=\"#4caf50; #cddc39; #ff9800; #f44336; #e91e63; #ff5722; #ffeb3b; #4caf50\" repeatCount=\"indefinite\" />  </circle> </svg> </div> </div> <!-- info and thumbnails --> <div class=\"info-container\"> <div class=\"title\" *ngIf=\"conf.showImageTitle && !loading && activeImage && activeImage.title\" [style.paddingBottom]=\"conf.showThumbnails ? '0px' : '30px'\" [class.dark]=\"conf.inline\" >{{ activeImage.title }} </div> <div #thumbnails class=\"thumbnails\" *ngIf=\"conf.showThumbnails\"> <div class=\"thumbnails-scroller\" [style.marginLeft]=\"thumbnailsScrollerLeftMargin\"> <div class=\"thumbnail\" *ngFor=\"let image of images; let i = index;\" [class.active]=\"i == activeImageIndex\" [style.backgroundImage]=\"sanitizer.bypassSecurityTrustStyle('url(' + (image.thumbnailUrl || image.url) + ')')\" [style.margin]=\"thumbnailMargin\" [style.width]=\"conf.thumbnailSize + 'px'\" [style.height]=\"conf.thumbnailSize + 'px'\" (click)=\"setActiveImage(i)\"> <div class=\"feedback\"></div> </div> </div> </div> </div> </div> <!-- gallery controls --> <div class=\"control arrow left\" *ngIf=\"conf.showArrows && (images.length > 1) && !loading\" [class.dark]=\"conf.inline\" [class.disabled]=\"onFirstImage\" (click)=\"prev()\"></div> <div class=\"control arrow right\" *ngIf=\"conf.showArrows && (images.length > 1) && !loading\" [class.dark]=\"conf.inline\" [class.disabled]=\"onLastImage\" (click)=\"next()\"></div> <div class=\"control right-top\"> <a class=\"ext-url\" [class.dark]=\"conf.inline\" *ngIf=\"conf.showExtUrlControl && activeImage && activeImage.extUrl && !loading\" [href]=\"activeImage.extUrl\" [target]=\"activeImage.extUrlTarget || '_blank'\"> <div class=\"feedback\"></div> </a> <div class=\"close\" [class.dark]=\"conf.inline\" *ngIf=\"conf.showCloseControl\" (click)=\"close()\"> <div class=\"feedback\"></div> </div> </div> <div class=\"control left-top\"> <div class=\"delete-img\" [class.dark]=\"conf.inline\" *ngIf=\"conf.showDeleteControl && !loading\" (click)=\"deleteImage(activeImageIndex)\"> <div class=\"feedback\"></div> </div> </div> ",
                    styles: ["@keyframes zoomScaleIn { 0% { transform: scale(0.99); opacity: 0; } 100% { transform: scale(1); opacity: 1; } } @keyframes thumbShadowAnimation { 0% { box-shadow: 0 0 3px 2px rgba(255, 255, 255, 0.05); } 100% { box-shadow: 0 0 3px 2px rgba(255, 255, 255, 0.2); } } @keyframes clickFeedback1 { 0% { opacity: 1; transform: scale3d(0.5, 0.5, 1); } 100% { opacity: 0; transform: scale3d(1.1, 1.1, 1); } } @keyframes clickFeedback2 { 0% { opacity: 1; transform: scale3d(0.5, 0.5, 1); } 50% { opacity: 0; transform: scale3d(1.2, 1.2, 1); } 100% { opacity: 0; transform: scale3d(1.2, 1.2, 1); } } .feedback { position: absolute; z-index: 1; left: 0; top: 0; right: 0; bottom: 0; } .feedback:before, .feedback:after { position: absolute; top: 50%; left: 50%; margin: -30px 0 0 -30px; width: 60px; height: 60px; border-radius: 50%; content: ''; opacity: 0; pointer-events: none; box-shadow: 0 0 0 2px rgba(111, 148, 182, 0.5); } .feedback:active:before { animation: clickFeedback1 0.5s forwards; } .feedback:active:after { animation: clickFeedback2 0.5s forwards; } /**************************************************/ :host { display: none; position: fixed; z-index: 10000; left: 0; top: 0; right: 0; bottom: 0; } :host.inline { display: block; position: relative; width: 100%; height: 500px; } :host.active { display: block; } :host > .galleria { position: absolute; left: 80px; right: 80px; top: 0; bottom: 0; z-index: 1; display: flex; flex-direction: column; animation: zoomScaleIn 0.2s 1 forwards; } :host > .galleria > .images-container { flex: 1; width: 100%; position: relative; } :host > .galleria > .images-container > .image { position: absolute; left: 0; right: 0; top: 0; bottom: 0; display: none; } :host > .galleria > .images-container > .image.active { display: block; } :host > .galleria > .images-container > .image > img { position: absolute; left: 0; right: 0; top: 0; bottom: 0; margin: auto; max-width: 100%; max-height: 100%; animation: zoomScaleIn 0.2s 1 forwards; backface-visibility: hidden; -webkit-backface-visibility: hidden; -webkit-touch-callout: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; user-drag: none; -webkit-user-drag: none; } :host > .galleria > .images-container > .loading-animation { position: absolute; left: 0; top: 0; right: 0; bottom: 0; z-index: 100; display: flex; justify-content: center; align-items: center; } :host > .galleria > .images-container > .loading-animation > svg { flex: none; width: 100px; height: 100px; } :host > .galleria > .info-container { flex: none; width: 100%; display: flex; flex-direction: column; align-items: center; } :host > .galleria > .info-container > .title { padding-top: 30px; line-height: 1.4; font-size: 13px; color: #fff; text-align: center; font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; } :host > .galleria > .info-container > .title.dark { color: #222; } :host > .galleria > .info-container > .thumbnails { padding-top: 20px; padding-bottom: 20px; overflow: hidden; white-space: nowrap; width: auto; margin: 0 auto; max-width: 100%; } :host > .galleria > .info-container > .thumbnails .thumbnails-scroller { white-space: nowrap; transition: all 0.3s ease; } :host > .galleria > .info-container > .thumbnails .thumbnails-scroller > .thumbnail { display: inline-block; border-radius: 100%; vertical-align: middle; background-color: #999; opacity: 0.5; filter: grayscale(100%); background-size: cover; background-position: center top; cursor: pointer; position: relative; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); outline: none; transition: all 0.3s ease; backface-visibility: hidden; -webkit-backface-visibility: hidden; -webkit-touch-callout: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; user-drag: none; -webkit-user-drag: none; } :host > .galleria > .info-container > .thumbnails .thumbnails-scroller > .thumbnail.active, :host > .galleria > .info-container > .thumbnails .thumbnails-scroller > .thumbnail:hover { filter: grayscale(30%); } :host > .galleria > .info-container > .thumbnails .thumbnails-scroller > .thumbnail.active:after, :host > .galleria > .info-container > .thumbnails .thumbnails-scroller > .thumbnail:hover:after { content: \"\"; display: block; position: absolute; left: -3px; top: -3px; right: -3px; bottom: -3px; border-radius: 100%; overflow: hidden; animation: thumbShadowAnimation 1s infinite alternate; } :host > .galleria > .info-container > .thumbnails .thumbnails-scroller > .thumbnail.active { opacity: 1; filter: grayscale(0%); } :host > .control { z-index: 20; backface-visibility: hidden; -webkit-backface-visibility: hidden; -webkit-touch-callout: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; user-drag: none; -webkit-user-drag: none; } :host > .control.arrow { position: absolute; top: 50%; margin-top: -60px; width: 50px; height: 50px; background-size: 100% 100%; background-repeat: no-repeat; overflow: hidden; cursor: pointer; transition: all 100ms ease; } :host > .control.arrow.disabled { opacity: 0.3; } :host > .control.arrow:not(.disabled):active { width: 60px; } :host > .control.arrow.left { left: 0; background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDc3LjE3NSA0NzcuMTc1IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NzcuMTc1IDQ3Ny4xNzU7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPg0KPGc+DQoJPHBhdGggZD0iTTE0NS4xODgsMjM4LjU3NWwyMTUuNS0yMTUuNWM1LjMtNS4zLDUuMy0xMy44LDAtMTkuMXMtMTMuOC01LjMtMTkuMSwwbC0yMjUuMSwyMjUuMWMtNS4zLDUuMy01LjMsMTMuOCwwLDE5LjFsMjI1LjEsMjI1ICAgYzIuNiwyLjYsNi4xLDQsOS41LDRzNi45LTEuMyw5LjUtNGM1LjMtNS4zLDUuMy0xMy44LDAtMTkuMUwxNDUuMTg4LDIzOC41NzV6IiBmaWxsPSIjRkZGRkZGIi8+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==\"); } :host > .control.arrow.left.dark { background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkNhcGFfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZmlsbD0iIzk5OTk5OSIgZD0iTTE1NS43ODQsMjU1Ljk4NkwzODcuMDEyLDI0Ljc1OWM1LjY4Ny01LjY4Nyw1LjY4Ny0xNC44MDcsMC0yMC40OTRjLTUuNjg4LTUuNjg3LTE0LjgwNy01LjY4Ny0yMC40OTQsMA0KCQlMMTI0Ljk4OSwyNDUuNzkzYy01LjY4Nyw1LjY4Ny01LjY4NywxNC44MDcsMCwyMC40OTRsMjQxLjUyOCwyNDEuNDIxYzIuNzksMi43OSw2LjU0NSw0LjI5MiwxMC4xOTMsNC4yOTINCgkJczcuNDAzLTEuMzk1LDEwLjE5My00LjI5MmM1LjY4Ny01LjY4Nyw1LjY4Ny0xNC44MDcsMC0yMC40OTRMMTU1Ljc4NCwyNTUuOTg2eiIvPg0KPC9nPg0KPC9zdmc+DQo=\"); } :host > .control.arrow.right { right: 0; background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDc3LjE3NSA0NzcuMTc1IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NzcuMTc1IDQ3Ny4xNzU7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPg0KPGc+DQoJPHBhdGggZD0iTTM2MC43MzEsMjI5LjA3NWwtMjI1LjEtMjI1LjFjLTUuMy01LjMtMTMuOC01LjMtMTkuMSwwcy01LjMsMTMuOCwwLDE5LjFsMjE1LjUsMjE1LjVsLTIxNS41LDIxNS41ICAgYy01LjMsNS4zLTUuMywxMy44LDAsMTkuMWMyLjYsMi42LDYuMSw0LDkuNSw0YzMuNCwwLDYuOS0xLjMsOS41LTRsMjI1LjEtMjI1LjFDMzY1LjkzMSwyNDIuODc1LDM2NS45MzEsMjM0LjI3NSwzNjAuNzMxLDIyOS4wNzV6ICAgIiBmaWxsPSIjRkZGRkZGIi8+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==\"); } :host > .control.arrow.right.dark { background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkNhcGFfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZmlsbD0iIzk5OTk5OSIgZD0iTTM4Ny4wNTgsMjQ1Ljc5M0wxNDUuNTMsNC4yNjVjLTUuNjg3LTUuNjg3LTE0LjgwNy01LjY4Ny0yMC40OTQsMHMtNS42ODcsMTQuODA3LDAsMjAuNDk0bDIzMS4yMjgsMjMxLjIyOA0KCQlMMTI1LjAzNiw0ODcuMjE0Yy01LjY4Nyw1LjY4OC01LjY4NywxNC44MDgsMCwyMC40OTRjMi43OSwyLjc5LDYuNTQ1LDQuMjkyLDEwLjE5Myw0LjI5MmMzLjY0OCwwLDcuNDAzLTEuMzk1LDEwLjE5My00LjI5Mg0KCQlMMzg2Ljk1LDI2Ni4xOEMzOTIuNjM3LDI2MC42MDEsMzkyLjYzNywyNTEuMzczLDM4Ny4wNTgsMjQ1Ljc5M3oiLz4NCjwvZz4NCjwvc3ZnPg0K\"); } :host > .control.left-top, :host > .control.right-top { position: absolute; top: 20px; } :host > .control.left-top.left-top, :host > .control.right-top.left-top { left: 10px; } :host > .control.left-top.right-top, :host > .control.right-top.right-top { right: 10px; } :host > .control.left-top > .delete-img, :host > .control.left-top > .ext-url, :host > .control.left-top > .close, :host > .control.right-top > .delete-img, :host > .control.right-top > .ext-url, :host > .control.right-top > .close { position: relative; display: inline-block; width: 30px; height: 30px; cursor: pointer; text-decoration: none; color: #fff; vertical-align: bottom; transition: background-color .3s ease-in-out; } :host > .control.left-top > .delete-img:hover, :host > .control.left-top > .ext-url:hover, :host > .control.left-top > .close:hover, :host > .control.right-top > .delete-img:hover, :host > .control.right-top > .ext-url:hover, :host > .control.right-top > .close:hover { background-color: rgba(255, 255, 255, 0.1); } :host > .control.left-top > .delete-img:before, :host > .control.left-top > .ext-url:before, :host > .control.left-top > .close:before, :host > .control.right-top > .delete-img:before, :host > .control.right-top > .ext-url:before, :host > .control.right-top > .close:before { content: \"\"; display: block; position: absolute; top: 5px; right: 5px; bottom: 5px; left: 5px; background-size: 100% 100%; background-repeat: no-repeat; } :host > .control.left-top > .delete-img.delete-img:before, :host > .control.left-top > .ext-url.delete-img:before, :host > .control.left-top > .close.delete-img:before, :host > .control.right-top > .delete-img.delete-img:before, :host > .control.right-top > .ext-url.delete-img:before, :host > .control.right-top > .close.delete-img:before { background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU5IDU5IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1OSA1OTsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxwYXRoIGQ9Ik01Mi41LDZIMzguNDU2Yy0wLjExLTEuMjUtMC40OTUtMy4zNTgtMS44MTMtNC43MTFDMzUuODA5LDAuNDM0LDM0Ljc1MSwwLDMzLjQ5OSwwSDIzLjVjLTEuMjUyLDAtMi4zMSwwLjQzNC0zLjE0NCwxLjI4OSAgQzE5LjAzOCwyLjY0MiwxOC42NTMsNC43NSwxOC41NDMsNkg2LjVjLTAuNTUyLDAtMSwwLjQ0Ny0xLDFzMC40NDgsMSwxLDFoMi4wNDFsMS45MTUsNDYuMDIxQzEwLjQ5Myw1NS43NDMsMTEuNTY1LDU5LDE1LjM2NCw1OSAgaDI4LjI3MmMzLjc5OSwwLDQuODcxLTMuMjU3LDQuOTA3LTQuOTU4TDUwLjQ1OSw4SDUyLjVjMC41NTIsMCwxLTAuNDQ3LDEtMVM1My4wNTIsNiw1Mi41LDZ6IE0yMC41LDUwYzAsMC41NTMtMC40NDgsMS0xLDEgIHMtMS0wLjQ0Ny0xLTFWMTdjMC0wLjU1MywwLjQ0OC0xLDEtMXMxLDAuNDQ3LDEsMVY1MHogTTMwLjUsNTBjMCwwLjU1My0wLjQ0OCwxLTEsMXMtMS0wLjQ0Ny0xLTFWMTdjMC0wLjU1MywwLjQ0OC0xLDEtMSAgczEsMC40NDcsMSwxVjUweiBNNDAuNSw1MGMwLDAuNTUzLTAuNDQ4LDEtMSwxcy0xLTAuNDQ3LTEtMVYxN2MwLTAuNTUzLDAuNDQ4LTEsMS0xczEsMC40NDcsMSwxVjUweiBNMjEuNzkyLDIuNjgxICBDMjIuMjQsMi4yMjMsMjIuNzk5LDIsMjMuNSwyaDkuOTk5YzAuNzAxLDAsMS4yNiwwLjIyMywxLjcwOCwwLjY4MWMwLjgwNSwwLjgyMywxLjEyOCwyLjI3MSwxLjI0LDMuMzE5SDIwLjU1MyAgQzIwLjY2NSw0Ljk1MiwyMC45ODgsMy41MDQsMjEuNzkyLDIuNjgxeiIgZmlsbD0iI0ZGRkZGRiIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K\"); } :host > .control.left-top > .delete-img.delete-img.dark:before, :host > .control.left-top > .ext-url.delete-img.dark:before, :host > .control.left-top > .close.delete-img.dark:before, :host > .control.right-top > .delete-img.delete-img.dark:before, :host > .control.right-top > .ext-url.delete-img.dark:before, :host > .control.right-top > .close.delete-img.dark:before { background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU5IDU5IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1OSA1OTsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxwYXRoIGQ9Ik01Mi41LDZIMzguNDU2Yy0wLjExLTEuMjUtMC40OTUtMy4zNTgtMS44MTMtNC43MTFDMzUuODA5LDAuNDM0LDM0Ljc1MSwwLDMzLjQ5OSwwSDIzLjVjLTEuMjUyLDAtMi4zMSwwLjQzNC0zLjE0NCwxLjI4OSAgQzE5LjAzOCwyLjY0MiwxOC42NTMsNC43NSwxOC41NDMsNkg2LjVjLTAuNTUyLDAtMSwwLjQ0Ny0xLDFzMC40NDgsMSwxLDFoMi4wNDFsMS45MTUsNDYuMDIxQzEwLjQ5Myw1NS43NDMsMTEuNTY1LDU5LDE1LjM2NCw1OSAgaDI4LjI3MmMzLjc5OSwwLDQuODcxLTMuMjU3LDQuOTA3LTQuOTU4TDUwLjQ1OSw4SDUyLjVjMC41NTIsMCwxLTAuNDQ3LDEtMVM1My4wNTIsNiw1Mi41LDZ6IE0yMC41LDUwYzAsMC41NTMtMC40NDgsMS0xLDEgIHMtMS0wLjQ0Ny0xLTFWMTdjMC0wLjU1MywwLjQ0OC0xLDEtMXMxLDAuNDQ3LDEsMVY1MHogTTMwLjUsNTBjMCwwLjU1My0wLjQ0OCwxLTEsMXMtMS0wLjQ0Ny0xLTFWMTdjMC0wLjU1MywwLjQ0OC0xLDEtMSAgczEsMC40NDcsMSwxVjUweiBNNDAuNSw1MGMwLDAuNTUzLTAuNDQ4LDEtMSwxcy0xLTAuNDQ3LTEtMVYxN2MwLTAuNTUzLDAuNDQ4LTEsMS0xczEsMC40NDcsMSwxVjUweiBNMjEuNzkyLDIuNjgxICBDMjIuMjQsMi4yMjMsMjIuNzk5LDIsMjMuNSwyaDkuOTk5YzAuNzAxLDAsMS4yNiwwLjIyMywxLjcwOCwwLjY4MWMwLjgwNSwwLjgyMywxLjEyOCwyLjI3MSwxLjI0LDMuMzE5SDIwLjU1MyAgQzIwLjY2NSw0Ljk1MiwyMC45ODgsMy41MDQsMjEuNzkyLDIuNjgxeiIgZmlsbD0iIzk5OTk5OSIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K\"); } :host > .control.left-top > .delete-img.close:before, :host > .control.left-top > .ext-url.close:before, :host > .control.left-top > .close.close:before, :host > .control.right-top > .delete-img.close:before, :host > .control.right-top > .ext-url.close:before, :host > .control.right-top > .close.close:before { background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI1MTJweCIgdmVyc2lvbj0iMS4xIiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNjQgNjQiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDY0IDY0Ij4NCiAgPGc+DQogICAgPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTI4Ljk0MSwzMS43ODZMMC42MTMsNjAuMTE0Yy0wLjc4NywwLjc4Ny0wLjc4NywyLjA2MiwwLDIuODQ5YzAuMzkzLDAuMzk0LDAuOTA5LDAuNTksMS40MjQsMC41OSAgIGMwLjUxNiwwLDEuMDMxLTAuMTk2LDEuNDI0LTAuNTlsMjguNTQxLTI4LjU0MWwyOC41NDEsMjguNTQxYzAuMzk0LDAuMzk0LDAuOTA5LDAuNTksMS40MjQsMC41OWMwLjUxNSwwLDEuMDMxLTAuMTk2LDEuNDI0LTAuNTkgICBjMC43ODctMC43ODcsMC43ODctMi4wNjIsMC0yLjg0OUwzNS4wNjQsMzEuNzg2TDYzLjQxLDMuNDM4YzAuNzg3LTAuNzg3LDAuNzg3LTIuMDYyLDAtMi44NDljLTAuNzg3LTAuNzg2LTIuMDYyLTAuNzg2LTIuODQ4LDAgICBMMzIuMDAzLDI5LjE1TDMuNDQxLDAuNTljLTAuNzg3LTAuNzg2LTIuMDYxLTAuNzg2LTIuODQ4LDBjLTAuNzg3LDAuNzg3LTAuNzg3LDIuMDYyLDAsMi44NDlMMjguOTQxLDMxLjc4NnoiLz4NCiAgPC9nPg0KPC9zdmc+DQo=\"); } :host > .control.left-top > .delete-img.close.dark:before, :host > .control.left-top > .ext-url.close.dark:before, :host > .control.left-top > .close.close.dark:before, :host > .control.right-top > .delete-img.close.dark:before, :host > .control.right-top > .ext-url.close.dark:before, :host > .control.right-top > .close.close.dark:before { background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGZpbGw9IiM5OTk5OTkiIGQ9Ik0yMzEuNTI4LDI1NC4yODhMNC45MDQsNDgwLjkxMmMtNi4yOTYsNi4yOTYtNi4yOTYsMTYuNDk2LDAsMjIuNzkyYzMuMTQ0LDMuMTUyLDcuMjcyLDQuNzIsMTEuMzkyLDQuNzINCgkJYzQuMTI4LDAsOC4yNDgtMS41NjcsMTEuMzkyLTQuNzJsMjI4LjMyOC0yMjguMzI4bDIyOC4zMjgsMjI4LjMyOGMzLjE1MiwzLjE1Miw3LjI3Miw0LjcyLDExLjM5Myw0LjcyDQoJCWM0LjExOSwwLDguMjQ4LTEuNTY3LDExLjM5Mi00LjcyYzYuMjk2LTYuMjk2LDYuMjk2LTE2LjQ5NiwwLTIyLjc5MkwyODAuNTEyLDI1NC4yODhMNTA3LjI4LDI3LjUwNA0KCQljNi4yOTYtNi4yOTYsNi4yOTYtMTYuNDk2LDAtMjIuNzkyYy02LjI5Ni02LjI4OC0xNi40OTYtNi4yODgtMjIuNzg0LDBMMjU2LjAyNCwyMzMuMkwyNy41MjgsNC43Mg0KCQljLTYuMjk2LTYuMjg4LTE2LjQ4OC02LjI4OC0yMi43ODQsMGMtNi4yOTYsNi4yOTYtNi4yOTYsMTYuNDk2LDAsMjIuNzkyTDIzMS41MjgsMjU0LjI4OHoiLz4NCjwvZz4NCjwvc3ZnPg0K\"); } :host > .control.left-top > .delete-img.ext-url:before, :host > .control.left-top > .ext-url.ext-url:before, :host > .control.left-top > .close.ext-url:before, :host > .control.right-top > .delete-img.ext-url:before, :host > .control.right-top > .ext-url.ext-url:before, :host > .control.right-top > .close.ext-url:before { background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE4LjEuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNTkxLjYgNTkxLjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU5MS42IDU5MS42OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNNTgxLjQsMjA0Yy01LjcxMiwwLTEwLjIsNC40ODgtMTAuMiwxMC4ydjMyNi40YzAsMTYuOTMyLTEzLjY2OCwzMC42LTMwLjYsMzAuNkg1MWMtMTYuOTMyLDAtMzAuNi0xMy42NjgtMzAuNi0zMC42VjUxICAgIGMwLTE2LjkzMiwxMy42NjgtMzAuNiwzMC42LTMwLjZoMzI2LjRjNS43MTIsMCwxMC4yLTQuNDg4LDEwLjItMTAuMlMzODMuMTEyLDAsMzc3LjQsMEg1MUMyMi44NDgsMCwwLDIyLjg0OCwwLDUxdjQ4OS42ICAgIGMwLDI4LjE1MiwyMi44NDgsNTEsNTEsNTFoNDg5LjZjMjguMTUyLDAsNTEtMjIuODQ4LDUxLTUxVjIxNC4yQzU5MS42LDIwOC42OTIsNTg2LjkwOCwyMDQsNTgxLjQsMjA0eiIgZmlsbD0iI0ZGRkZGRiIvPg0KCQk8cGF0aCBkPSJNNTkxLjM5Niw4LjE2YzAtMC4yMDQtMC4yMDQtMC42MTItMC4yMDQtMC44MTZjMC0wLjQwOC0wLjIwNC0wLjYxMi0wLjQwOC0xLjAyYy0wLjIwNC0wLjQwOC0wLjQwOC0wLjYxMi0wLjYxMi0xLjAyICAgIGMtMC4yMDQtMC4yMDQtMC4yMDQtMC42MTItMC40MDgtMC44MTZjLTAuODE2LTEuMDItMS42MzItMi4wNC0yLjg1Ni0yLjg1NmMtMC4yMDQtMC4yMDQtMC42MTItMC4yMDQtMC44MTYtMC40MDggICAgYy0wLjQwOC0wLjIwNC0wLjYxMi0wLjQwOC0xLjAyLTAuNjEyYy0wLjQwOC0wLjIwNC0wLjYxMi0wLjIwNC0xLjAyLTAuNDA4Yy0wLjIwNCwwLTAuNjEyLTAuMjA0LTAuODE2LTAuMjA0ICAgIGMtMC42MTIsMC4yMDQtMS4yMjQsMC0xLjgzNiwwbDAsMEg0MzguNmMtNS43MTIsMC0xMC4yLDQuNDg4LTEwLjIsMTAuMnM0LjQ4OCwxMC4yLDEwLjIsMTAuMmgxMTguMTE2bC0zNzAuMjYsMzcwLjI2ICAgIGMtNC4wOCw0LjA4LTQuMDgsMTAuNDA0LDAsMTQuNDg0YzIuMDQsMi4wNCw0LjY5MiwzLjA2LDcuMTQsMy4wNmMyLjQ0OCwwLDUuMzA0LTEuMDIsNy4xNC0zLjA2TDU3MS4yLDM0Ljg4NFYxNTMgICAgYzAsNS43MTIsNC40ODgsMTAuMiwxMC4yLDEwLjJzMTAuMi00LjQ4OCwxMC4yLTEwLjJWMTAuMkM1OTEuNiw5LjU4OCw1OTEuMzk2LDguOTc2LDU5MS4zOTYsOC4xNnoiIGZpbGw9IiNGRkZGRkYiLz4NCgkJPHBhdGggZD0iTTUxLDQ1LjljLTIuODU2LDAtNS4xLDIuMjQ0LTUuMSw1LjF2MTQyLjhjMCwyLjg1NiwyLjI0NCw1LjEsNS4xLDUuMXM1LjEtMi4yNDQsNS4xLTUuMVY1Ni4xaDEzNy43ICAgIGMyLjg1NiwwLDUuMS0yLjI0NCw1LjEtNS4xcy0yLjI0NC01LjEtNS4xLTUuMUg1MXoiIGZpbGw9IiNGRkZGRkYiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==\"); } :host > .control.left-top > .delete-img.ext-url.dark:before, :host > .control.left-top > .ext-url.ext-url.dark:before, :host > .control.left-top > .close.ext-url.dark:before, :host > .control.right-top > .delete-img.ext-url.dark:before, :host > .control.right-top > .ext-url.ext-url.dark:before, :host > .control.right-top > .close.ext-url.dark:before { background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkNhcGFfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGZpbGw9IiM5OTk5OTkiIGQ9Ik01MDMuMTczLDE3Ni41NTJjLTQuOTQ0LDAtOC44MjgsMy44ODQtOC44MjgsOC44Mjh2MjgyLjQ4M2MwLDE0LjY1My0xMS44MjksMjYuNDgyLTI2LjQ4MiwyNi40ODJINDQuMTM4DQoJCQljLTE0LjY1MywwLTI2LjQ4Mi0xMS44MjktMjYuNDgyLTI2LjQ4MlY0NC4xMzhjMC0xNC42NTMsMTEuODI5LTI2LjQ4MiwyNi40ODItMjYuNDgyaDI4Mi40ODNjNC45NDMsMCw4LjgyNy0zLjg4NCw4LjgyNy04LjgyOA0KCQkJUzMzMS41NjQsMCwzMjYuNjIxLDBINDQuMTM4QzE5Ljc3NCwwLDAsMTkuNzc0LDAsNDQuMTM4djQyMy43MjVDMCw0OTIuMjI3LDE5Ljc3NCw1MTIsNDQuMTM4LDUxMmg0MjMuNzI1DQoJCQlDNDkyLjIyNyw1MTIsNTEyLDQ5Mi4yMjcsNTEyLDQ2Ny44NjJWMTg1LjM3OUM1MTIsMTgwLjYxMiw1MDcuOTM5LDE3Ni41NTIsNTAzLjE3MywxNzYuNTUyeiIvPg0KCQk8cGF0aCBmaWxsPSIjOTk5OTk5IiBkPSJNNTExLjgyMyw3LjA2MmMwLTAuMTc2LTAuMTc3LTAuNTMtMC4xNzctMC43MDZjMC0wLjM1My0wLjE3Ni0wLjUzLTAuMzUzLTAuODgzcy0wLjM1NC0wLjUzLTAuNTMtMC44ODMNCgkJCWMtMC4xNzYtMC4xNzYtMC4xNzYtMC41My0wLjM1My0wLjcwNmMtMC43MDYtMC44ODMtMS40MTItMS43NjYtMi40NzItMi40NzJjLTAuMTc3LTAuMTc3LTAuNTI5LTAuMTc3LTAuNzA2LTAuMzUzDQoJCQljLTAuMzU0LTAuMTc3LTAuNTMtMC4zNTQtMC44ODMtMC41M2MtMC4zNTQtMC4xNzctMC41My0wLjE3Ny0wLjg4My0wLjM1M2MtMC4xNzcsMC0wLjUzLTAuMTc3LTAuNzA2LTAuMTc3DQoJCQljLTAuNTMsMC4xNzctMS4wNiwwLTEuNTksMGwwLDBIMzc5LjU4NmMtNC45NDMsMC04LjgyNywzLjg4NC04LjgyNyw4LjgyOHMzLjg4NCw4LjgyOCw4LjgyNyw4LjgyOEg0ODEuODFMMTYxLjM2OCwzMzguMDk3DQoJCQljLTMuNTMxLDMuNTMxLTMuNTMxLDkuMDA0LDAsMTIuNTM1YzEuNzY2LDEuNzY2LDQuMDYxLDIuNjQ4LDYuMTc5LDIuNjQ4YzIuMTE5LDAsNC41OS0wLjg4Myw2LjE4LTIuNjQ4TDQ5NC4zNDUsMzAuMTl2MTAyLjIyNA0KCQkJYzAsNC45NDMsMy44ODQsOC44MjcsOC44MjgsOC44MjdjNC45NDMsMCw4LjgyNy0zLjg4NCw4LjgyNy04LjgyN1Y4LjgyOEM1MTIsOC4yOTgsNTExLjgyMyw3Ljc2OCw1MTEuODIzLDcuMDYyeiIvPg0KCQk8cGF0aCBmaWxsPSIjOTk5OTk5IiBkPSJNNDQuMTM4LDM5LjcyNGMtMi40NzIsMC00LjQxNCwxLjk0Mi00LjQxNCw0LjQxNHYxMjMuNTg2YzAsMi40NzIsMS45NDIsNC40MTQsNC40MTQsNC40MTQNCgkJCWMyLjQ3MiwwLDQuNDE0LTEuOTQyLDQuNDE0LTQuNDE0VjQ4LjU1MmgxMTkuMTcyYzIuNDcyLDAsNC40MTQtMS45NDIsNC40MTQtNC40MTRjMC0yLjQ3Mi0xLjk0Mi00LjQxNC00LjQxNC00LjQxNEg0NC4xMzh6Ii8+DQoJPC9nPg0KPC9nPg0KPC9zdmc+DQo=\"); } "]
                },] },
    ];
    /** @nocollapse */
    NgxImageGalleryComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DomSanitizer },
        { type: Renderer2 }
    ]; };
    NgxImageGalleryComponent.propDecorators = {
        opened: [{ type: HostBinding, args: ['class.active',] }],
        conf: [{ type: Input }],
        images: [{ type: Input }],
        onOpen: [{ type: Output }],
        onClose: [{ type: Output }],
        onDelete: [{ type: Output }],
        onImageChange: [{ type: Output }],
        onImageClicked: [{ type: Output }],
        thumbnailsElem: [{ type: ViewChild, args: ['thumbnails',] }],
        onKeyboardInput: [{ type: HostListener, args: ['window:keydown', ['$event'],] }],
        onWindowResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
    };
    return NgxImageGalleryComponent;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: directives/click-outside.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClickOutsideDirective = /** @class */ (function () {
    function ClickOutsideDirective(_elementRef) {
        this._elementRef = _elementRef;
        this.clickOutside = new EventEmitter();
    }
    /**
     * @param {?} $event
     * @param {?} targetElement
     * @return {?}
     */
    ClickOutsideDirective.prototype.onClick = /**
     * @param {?} $event
     * @param {?} targetElement
     * @return {?}
     */
    function ($event, targetElement) {
        /** @type {?} */
        var isClickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!isClickedInside) {
            this.clickOutside.emit($event);
        }
    };
    ClickOutsideDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[clickOutside]'
                },] },
    ];
    /** @nocollapse */
    ClickOutsideDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    ClickOutsideDirective.propDecorators = {
        clickOutside: [{ type: Output }],
        onClick: [{ type: HostListener, args: ['document:click', ['$event', '$event.target'],] }]
    };
    return ClickOutsideDirective;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: directives/mousewheel.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MouseWheelDirective = /** @class */ (function () {
    function MouseWheelDirective() {
        this.mouseWheelUp = new EventEmitter();
        this.mouseWheelDown = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    MouseWheelDirective.prototype.onMouseWheelChrome = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.mouseWheelFunc(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MouseWheelDirective.prototype.onMouseWheelFirefox = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.mouseWheelFunc(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MouseWheelDirective.prototype.onMouseWheelIE = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.mouseWheelFunc(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MouseWheelDirective.prototype.mouseWheelFunc = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var event = window.event || event;
        // old IE support
        /** @type {?} */
        var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
        if (delta > 0) {
            this.mouseWheelUp.emit(event);
        }
        else if (delta < 0) {
            this.mouseWheelDown.emit(event);
        }
        // for IE
        event.returnValue = false;
        // for Chrome and Firefox
        if (event.preventDefault) {
            event.preventDefault();
        }
    };
    MouseWheelDirective.decorators = [
        { type: Directive, args: [{ selector: '[mouseWheel]' },] },
    ];
    MouseWheelDirective.propDecorators = {
        mouseWheelUp: [{ type: Output }],
        mouseWheelDown: [{ type: Output }],
        onMouseWheelChrome: [{ type: HostListener, args: ['mousewheel', ['$event'],] }],
        onMouseWheelFirefox: [{ type: HostListener, args: ['DOMMouseScroll', ['$event'],] }],
        onMouseWheelIE: [{ type: HostListener, args: ['onmousewheel', ['$event'],] }]
    };
    return MouseWheelDirective;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: ngx-image-gallery.conf.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxImageGalleryModule = /** @class */ (function () {
    function NgxImageGalleryModule() {
    }
    NgxImageGalleryModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [
                        NgxImageGalleryComponent,
                        MouseWheelDirective,
                        ClickOutsideDirective
                    ],
                    exports: [
                        NgxImageGalleryComponent,
                        MouseWheelDirective,
                        ClickOutsideDirective
                    ]
                },] },
    ];
    return NgxImageGalleryModule;
}());

export { NgxImageGalleryModule, NgxImageGalleryComponent, ClickOutsideDirective, MouseWheelDirective };

import { __decorate } from "tslib";
import { Component, OnInit, HostBinding, Input, HostListener, ElementRef, Renderer2, EventEmitter, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { assign, debounce } from 'lodash';
import { DomSanitizer } from '@angular/platform-browser';
// key codes to react
var KEY_CODES = {
    37: 'LEFT',
    39: 'RIGHT',
    27: 'ESC'
};
// default gallery configuration
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
    function NgxImageGalleryComponent(sanitizer, galleryElem, renderer) {
        var _this = this;
        this.sanitizer = sanitizer;
        this.galleryElem = galleryElem;
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
        this.onError = new EventEmitter();
        /***************************************************/
        // loading animation memory
        this.loading = false;
        // current active image index
        this.activeImageIndex = null;
        // thumbnail margin and scroll position
        this.thumbnailMargin = '0px 8px';
        this.thumbnailsScrollerLeftMargin = '0px';
        // adjust thumbnail margin to perfectly fit viewport
        this.fitThumbnails = debounce(function () {
            // if thumbnails not visible, return false
            if (_this.conf.showThumbnails == false)
                return false;
            var thumbnailParams = _this.thumbnailsRenderParams;
            _this.thumbnailMargin = '0 ' + (thumbnailParams.newThumbnailMargin / 2) + 'px';
        }, 300);
        // debounced prev
        this.debouncedPrev = debounce(function () { return _this.prev(); }, 100, { 'leading': true, 'trailing': false });
        // debounced next
        this.debouncedNext = debounce(function () { return _this.next(); }, 100, { 'leading': true, 'trailing': false });
    }
    Object.defineProperty(NgxImageGalleryComponent.prototype, "activeImage", {
        // active image
        get: function () {
            return this.images[this.activeImageIndex];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxImageGalleryComponent.prototype, "onFirstImage", {
        // if gallery is on : first image
        get: function () {
            return this.activeImageIndex == 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxImageGalleryComponent.prototype, "onLastImage", {
        // if gallery is on : last image
        get: function () {
            return this.activeImageIndex == (this.images.length - 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxImageGalleryComponent.prototype, "thumbnailsRenderParams", {
        // get thumbnails viewport rendering parameters
        get: function () {
            var thumbnailsContainerWidth = this.thumbnailsElem.nativeElement.offsetWidth;
            var thumbnailMargin = 16;
            var thumbnailSize = thumbnailMargin + this.conf.thumbnailSize;
            var thumbnailsInView = Math.floor(thumbnailsContainerWidth / thumbnailSize);
            var extraSpaceInThumbnailsContainer = thumbnailsContainerWidth - (thumbnailsInView * thumbnailSize);
            var extraMargin = extraSpaceInThumbnailsContainer / thumbnailsInView;
            var newThumbnailMargin = thumbnailMargin + extraMargin;
            var newThumbnailSize = newThumbnailMargin + this.conf.thumbnailSize;
            var relativePositionOfActiveImageThumbnailToScroller = thumbnailsInView - (thumbnailsInView - this.activeImageIndex);
            var thumbnailsScrollerLeftMargin;
            if (relativePositionOfActiveImageThumbnailToScroller > thumbnailsInView - 2) {
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
    NgxImageGalleryComponent.prototype.setGalleryConf = function (conf) {
        this.conf = assign(DEFAULT_CONF, conf);
    };
    // load image and return promise
    NgxImageGalleryComponent.prototype.loadImage = function (index) {
        var _this = this;
        var galleryImage = this.images[index];
        // check if image is cached
        if (galleryImage._cached) {
            return Promise.resolve(index);
        }
        else {
            return new Promise(function (resolve, reject) {
                _this.loading = true;
                var image = new Image();
                image.src = galleryImage.url;
                image.onload = function () {
                    _this.loading = false;
                    galleryImage._cached = true;
                    resolve(index);
                };
                image.onerror = function (error) {
                    _this.loading = false;
                    reject(error);
                };
            });
        }
    };
    // activate image (set active image)
    NgxImageGalleryComponent.prototype.activateImage = function (imageIndex) {
        var _this = this;
        // prevent loading if already loading
        if (this.loading)
            return false;
        // emit event
        this.onImageChange.emit(imageIndex);
        this.loadImage(imageIndex)
            .then(function (_imageIndex) {
            _this.activeImageIndex = _imageIndex;
            // scroll thumbnails
            setTimeout(function () {
                _this.fitThumbnails();
                setTimeout(function () { return _this.scrollThumbnails(); }, 300);
            });
        })
            .catch(function (error) {
            console.warn(error);
            _this.onError.next(error);
        });
    };
    // scroll thumbnails to perfectly position active image thumbnail in viewport
    NgxImageGalleryComponent.prototype.scrollThumbnails = function () {
        // if thumbnails not visible, return false
        if (this.conf.showThumbnails == false)
            return false;
        var thumbnailParams = this.thumbnailsRenderParams;
        this.thumbnailsScrollerLeftMargin = thumbnailParams.thumbnailsScrollerLeftMargin;
    };
    NgxImageGalleryComponent.prototype.ngOnInit = function () {
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
    NgxImageGalleryComponent.prototype.ngOnChanges = function (changes) {
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
    NgxImageGalleryComponent.prototype.onKeyboardInput = function (event) {
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
    NgxImageGalleryComponent.prototype.onWindowResize = function (event) {
        var _this = this;
        if (this.opened && !this.loading) {
            this.fitThumbnails();
            setTimeout(function () { return _this.scrollThumbnails(); }, 300);
        }
    };
    /***************************************************/
    // open gallery
    NgxImageGalleryComponent.prototype.open = function (index) {
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
    NgxImageGalleryComponent.prototype.close = function () {
        this.opened = false;
        this.activeImageIndex = 0;
        // emit event
        this.onClose.emit();
    };
    // change prev image
    NgxImageGalleryComponent.prototype.prev = function () {
        if (this.onFirstImage == false) {
            this.activateImage(this.activeImageIndex - 1);
        }
    };
    // change next image
    NgxImageGalleryComponent.prototype.next = function () {
        if (this.onLastImage == false) {
            this.activateImage(this.activeImageIndex + 1);
        }
    };
    // set image (activate)
    NgxImageGalleryComponent.prototype.setActiveImage = function (index) {
        this.activateImage(index);
    };
    // delete image
    NgxImageGalleryComponent.prototype.deleteImage = function (index) {
        this.onDelete.emit(index);
    };
    // mouse wheel up (prev image)
    NgxImageGalleryComponent.prototype.mouseWheelUp = function () {
        if (this.conf.reactToMouseWheel) {
            this.debouncedNext();
        }
    };
    // mouse wheel down (next image)
    NgxImageGalleryComponent.prototype.mouseWheelDown = function () {
        if (this.conf.reactToMouseWheel) {
            this.debouncedPrev();
        }
    };
    // click on image
    NgxImageGalleryComponent.prototype.clickOnImage = function (index) {
        this.onImageClicked.emit(index);
    };
    // right click on image
    NgxImageGalleryComponent.prototype.rightClickOnImage = function (event) {
        event.stopPropagation();
        return this.conf.reactToRightClick;
    };
    NgxImageGalleryComponent.ctorParameters = function () { return [
        { type: DomSanitizer },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    __decorate([
        HostBinding('class.active')
    ], NgxImageGalleryComponent.prototype, "opened", void 0);
    __decorate([
        Input()
    ], NgxImageGalleryComponent.prototype, "conf", void 0);
    __decorate([
        Input()
    ], NgxImageGalleryComponent.prototype, "images", void 0);
    __decorate([
        Output()
    ], NgxImageGalleryComponent.prototype, "onOpen", void 0);
    __decorate([
        Output()
    ], NgxImageGalleryComponent.prototype, "onClose", void 0);
    __decorate([
        Output()
    ], NgxImageGalleryComponent.prototype, "onDelete", void 0);
    __decorate([
        Output()
    ], NgxImageGalleryComponent.prototype, "onImageChange", void 0);
    __decorate([
        Output()
    ], NgxImageGalleryComponent.prototype, "onImageClicked", void 0);
    __decorate([
        Output()
    ], NgxImageGalleryComponent.prototype, "onError", void 0);
    __decorate([
        ViewChild('thumbnails')
    ], NgxImageGalleryComponent.prototype, "thumbnailsElem", void 0);
    __decorate([
        HostListener('window:keydown', ['$event'])
    ], NgxImageGalleryComponent.prototype, "onKeyboardInput", null);
    __decorate([
        HostListener('window:resize', ['$event'])
    ], NgxImageGalleryComponent.prototype, "onWindowResize", null);
    NgxImageGalleryComponent = __decorate([
        Component({
            selector: 'ngx-image-gallery',
            template: "<!-- images and image information container -->\n<div class=\"galleria\" mouseWheel (mouseWheelDown)=\"mouseWheelDown()\" (mouseWheelUp)=\"mouseWheelUp()\"\n     (contextmenu)=\"rightClickOnImage($event)\">\n    <!-- images -->\n    <div class=\"images-container\" (swiperight)=\"prev()\" (swipeleft)=\"next()\">\n        <!-- images array -->\n        <div class=\"image\" *ngFor=\"let image of images; let i = index;\"\n             [class.active]=\"!loading && (i == activeImageIndex)\"\n             [ngStyle]=\"{top: conf.imageOffset, bottom: conf.imageOffset}\">\n            <img *ngIf=\"i == activeImageIndex\" [src]=\"sanitizer.bypassSecurityTrustUrl(image.url)\" [alt]=\"image.altText || ''\"\n                 [style.cursor]=\"conf.imagePointer?  'pointer':'default'\"\n                 [style.borderRadius]=\"conf.imageBorderRadius\" (click)=\"clickOnImage(activeImageIndex)\"/>\n        </div>\n\n        <!-- loading animation -->\n        <div class=\"loading-animation\" *ngIf=\"(images.length == 0) || loading\">\n            <svg  version=\"1.1\" id=\"L3\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 100 100\" enable-background=\"new 0 0 0 0\" xml:space=\"preserve\">\n        <circle fill=\"none\" stroke=\"#fff\" stroke-width=\"4\" cx=\"50\" cy=\"50\" r=\"44\" style=\"opacity:0.5;\"/>\n        <circle fill=\"#4caf50\" stroke=\"#eee\" stroke-width=\"3\" cx=\"8\" cy=\"54\" r=\"6\">\n          <animateTransform\n          attributeName=\"transform\"\n          dur=\"2s\"\n          type=\"rotate\"\n          from=\"0 50 48\"\n          to=\"360 50 52\"\n          repeatCount=\"indefinite\" />\n\n          <animate \n          attributeName=\"fill\" \n          begin=\"1s\" \n          dur=\"16s\" \n          values=\"#4caf50; #cddc39; #ff9800; #f44336; #e91e63; #ff5722; #ffeb3b; #4caf50\"\n          repeatCount=\"indefinite\" /> \n        </circle>\n      </svg>\n        </div>\n    </div>\n\n    <!-- info and thumbnails -->\n    <div class=\"info-container\">\n        <div class=\"title\"\n             *ngIf=\"conf.showImageTitle && !loading && activeImage && activeImage.title\"\n             [style.paddingBottom]=\"conf.showThumbnails ? '0px' : '30px'\"\n             [class.dark]=\"conf.inline\"\n        >{{ activeImage.title }}\n        </div>\n\n        <div #thumbnails class=\"thumbnails\" *ngIf=\"conf.showThumbnails\">\n            <div class=\"thumbnails-scroller\" [style.marginLeft]=\"thumbnailsScrollerLeftMargin\">\n                <div class=\"thumbnail\"\n                     *ngFor=\"let image of images; let i = index;\"\n                     [class.active]=\"i == activeImageIndex\"\n\n                     [style.backgroundImage]=\"sanitizer.bypassSecurityTrustStyle('url(' + (image.thumbnailUrl || image.url) + ')')\"\n\n                     [style.margin]=\"thumbnailMargin\"\n                     [style.width]=\"conf.thumbnailSize + 'px'\"\n                     [style.height]=\"conf.thumbnailSize + 'px'\"\n                     (click)=\"setActiveImage(i)\">\n                    <div class=\"feedback\"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n<!-- gallery controls -->\n<div class=\"control arrow left\" *ngIf=\"conf.showArrows && (images.length > 1) && !loading\" [class.dark]=\"conf.inline\"\n     [class.disabled]=\"onFirstImage\" (click)=\"prev()\"></div>\n<div class=\"control arrow right\" *ngIf=\"conf.showArrows && (images.length > 1) && !loading\" [class.dark]=\"conf.inline\"\n     [class.disabled]=\"onLastImage\" (click)=\"next()\"></div>\n\n<div class=\"control right-top\">\n    <a class=\"ext-url\" [class.dark]=\"conf.inline\"\n       *ngIf=\"conf.showExtUrlControl && activeImage && activeImage.extUrl && !loading\" [href]=\"activeImage.extUrl\"\n       [target]=\"activeImage.extUrlTarget || '_blank'\">\n        <div class=\"feedback\"></div>\n    </a>\n    <div class=\"close\" [class.dark]=\"conf.inline\" *ngIf=\"conf.showCloseControl\" (click)=\"close()\">\n        <div class=\"feedback\"></div>\n    </div>\n</div>\n\n<div class=\"control left-top\">\n    <div class=\"delete-img\" [class.dark]=\"conf.inline\" *ngIf=\"conf.showDeleteControl && !loading\"\n         (click)=\"deleteImage(activeImageIndex)\">\n        <div class=\"feedback\"></div>\n    </div>\n</div>\n",
            styles: ["@-webkit-keyframes zoomScaleIn{0%{transform:scale(.99);opacity:0}100%{transform:scale(1);opacity:1}}@keyframes zoomScaleIn{0%{transform:scale(.99);opacity:0}100%{transform:scale(1);opacity:1}}@-webkit-keyframes thumbShadowAnimation{0%{box-shadow:0 0 3px 2px rgba(255,255,255,.05)}100%{box-shadow:0 0 3px 2px rgba(255,255,255,.2)}}@keyframes thumbShadowAnimation{0%{box-shadow:0 0 3px 2px rgba(255,255,255,.05)}100%{box-shadow:0 0 3px 2px rgba(255,255,255,.2)}}@-webkit-keyframes clickFeedback1{0%{opacity:1;transform:scale3d(.5,.5,1)}100%{opacity:0;transform:scale3d(1.1,1.1,1)}}@keyframes clickFeedback1{0%{opacity:1;transform:scale3d(.5,.5,1)}100%{opacity:0;transform:scale3d(1.1,1.1,1)}}@-webkit-keyframes clickFeedback2{0%{opacity:1;transform:scale3d(.5,.5,1)}100%,50%{opacity:0;transform:scale3d(1.2,1.2,1)}}@keyframes clickFeedback2{0%{opacity:1;transform:scale3d(.5,.5,1)}100%,50%{opacity:0;transform:scale3d(1.2,1.2,1)}}.feedback{position:absolute;z-index:1;left:0;top:0;right:0;bottom:0}.feedback:after,.feedback:before{position:absolute;top:50%;left:50%;margin:-30px 0 0 -30px;width:60px;height:60px;border-radius:50%;content:\"\";opacity:0;pointer-events:none;box-shadow:0 0 0 2px rgba(111,148,182,.5)}.feedback:active:before{-webkit-animation:.5s forwards clickFeedback1;animation:.5s forwards clickFeedback1}.feedback:active:after{-webkit-animation:.5s forwards clickFeedback2;animation:.5s forwards clickFeedback2}:host{display:none;position:fixed;z-index:10000;left:0;top:0;right:0;bottom:0}:host.inline{display:block;position:relative;width:100%;height:500px}:host.active{display:block}:host>.galleria{position:absolute;left:80px;right:80px;top:0;bottom:0;z-index:1;display:flex;flex-direction:column;-webkit-animation:.2s forwards zoomScaleIn;animation:.2s forwards zoomScaleIn}:host>.galleria>.images-container{flex:1;width:100%;position:relative}:host>.galleria>.images-container>.image{position:absolute;left:0;right:0;top:0;bottom:0;display:none}:host>.galleria>.images-container>.image.active{display:block}:host>.galleria>.images-container>.image>img{position:absolute;left:0;right:0;top:0;bottom:0;margin:auto;max-width:100%;max-height:100%;-webkit-animation:.2s forwards zoomScaleIn;animation:.2s forwards zoomScaleIn;backface-visibility:hidden;-webkit-backface-visibility:hidden;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;user-drag:none;-webkit-user-drag:none}:host>.galleria>.images-container>.loading-animation{position:absolute;left:0;top:0;right:0;bottom:0;z-index:100;display:flex;justify-content:center;align-items:center}:host>.galleria>.images-container>.loading-animation>svg{flex:none;width:100px;height:100px}:host>.galleria>.info-container{flex:none;width:100%;display:flex;flex-direction:column;align-items:center}:host>.galleria>.info-container>.title{padding-top:30px;line-height:1.4;font-size:13px;color:#fff;text-align:center;font-family:\"Lucida Sans\",\"Lucida Sans Regular\",\"Lucida Grande\",\"Lucida Sans Unicode\",Geneva,Verdana,sans-serif}:host>.galleria>.info-container>.title.dark{color:#222}:host>.galleria>.info-container>.thumbnails{padding-top:20px;padding-bottom:20px;overflow:hidden;white-space:nowrap;width:auto;margin:0 auto;max-width:100%}:host>.galleria>.info-container>.thumbnails .thumbnails-scroller{white-space:nowrap;transition:.3s}:host>.galleria>.info-container>.thumbnails .thumbnails-scroller>.thumbnail{display:inline-block;border-radius:100%;vertical-align:middle;background-color:#999;opacity:.5;-webkit-filter:grayscale(100%);filter:grayscale(100%);background-size:cover;background-position:center top;cursor:pointer;position:relative;-webkit-tap-highlight-color:transparent;outline:0;transition:.3s;backface-visibility:hidden;-webkit-backface-visibility:hidden;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;user-drag:none;-webkit-user-drag:none}:host>.galleria>.info-container>.thumbnails .thumbnails-scroller>.thumbnail.active,:host>.galleria>.info-container>.thumbnails .thumbnails-scroller>.thumbnail:hover{-webkit-filter:grayscale(30%);filter:grayscale(30%)}:host>.galleria>.info-container>.thumbnails .thumbnails-scroller>.thumbnail.active:after,:host>.galleria>.info-container>.thumbnails .thumbnails-scroller>.thumbnail:hover:after{content:\"\";display:block;position:absolute;left:-3px;top:-3px;right:-3px;bottom:-3px;border-radius:100%;overflow:hidden;-webkit-animation:1s infinite alternate thumbShadowAnimation;animation:1s infinite alternate thumbShadowAnimation}:host>.galleria>.info-container>.thumbnails .thumbnails-scroller>.thumbnail.active{opacity:1;-webkit-filter:grayscale(0);filter:grayscale(0)}:host>.control{z-index:20;backface-visibility:hidden;-webkit-backface-visibility:hidden;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;user-drag:none;-webkit-user-drag:none}:host>.control.arrow{position:absolute;top:50%;margin-top:-60px;width:50px;height:50px;background-size:100% 100%;background-repeat:no-repeat;overflow:hidden;cursor:pointer;transition:.1s}:host>.control.arrow.disabled{opacity:.3}:host>.control.arrow:not(.disabled):active{width:60px}:host>.control.arrow.left{left:0;background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDc3LjE3NSA0NzcuMTc1IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NzcuMTc1IDQ3Ny4xNzU7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPg0KPGc+DQoJPHBhdGggZD0iTTE0NS4xODgsMjM4LjU3NWwyMTUuNS0yMTUuNWM1LjMtNS4zLDUuMy0xMy44LDAtMTkuMXMtMTMuOC01LjMtMTkuMSwwbC0yMjUuMSwyMjUuMWMtNS4zLDUuMy01LjMsMTMuOCwwLDE5LjFsMjI1LjEsMjI1ICAgYzIuNiwyLjYsNi4xLDQsOS41LDRzNi45LTEuMyw5LjUtNGM1LjMtNS4zLDUuMy0xMy44LDAtMTkuMUwxNDUuMTg4LDIzOC41NzV6IiBmaWxsPSIjRkZGRkZGIi8+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==)}:host>.control.arrow.left.dark{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkNhcGFfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZmlsbD0iIzk5OTk5OSIgZD0iTTE1NS43ODQsMjU1Ljk4NkwzODcuMDEyLDI0Ljc1OWM1LjY4Ny01LjY4Nyw1LjY4Ny0xNC44MDcsMC0yMC40OTRjLTUuNjg4LTUuNjg3LTE0LjgwNy01LjY4Ny0yMC40OTQsMA0KCQlMMTI0Ljk4OSwyNDUuNzkzYy01LjY4Nyw1LjY4Ny01LjY4NywxNC44MDcsMCwyMC40OTRsMjQxLjUyOCwyNDEuNDIxYzIuNzksMi43OSw2LjU0NSw0LjI5MiwxMC4xOTMsNC4yOTINCgkJczcuNDAzLTEuMzk1LDEwLjE5My00LjI5MmM1LjY4Ny01LjY4Nyw1LjY4Ny0xNC44MDcsMC0yMC40OTRMMTU1Ljc4NCwyNTUuOTg2eiIvPg0KPC9nPg0KPC9zdmc+DQo=)}:host>.control.arrow.right{right:0;background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDc3LjE3NSA0NzcuMTc1IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NzcuMTc1IDQ3Ny4xNzU7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPg0KPGc+DQoJPHBhdGggZD0iTTM2MC43MzEsMjI5LjA3NWwtMjI1LjEtMjI1LjFjLTUuMy01LjMtMTMuOC01LjMtMTkuMSwwcy01LjMsMTMuOCwwLDE5LjFsMjE1LjUsMjE1LjVsLTIxNS41LDIxNS41ICAgYy01LjMsNS4zLTUuMywxMy44LDAsMTkuMWMyLjYsMi42LDYuMSw0LDkuNSw0YzMuNCwwLDYuOS0xLjMsOS41LTRsMjI1LjEtMjI1LjFDMzY1LjkzMSwyNDIuODc1LDM2NS45MzEsMjM0LjI3NSwzNjAuNzMxLDIyOS4wNzV6ICAgIiBmaWxsPSIjRkZGRkZGIi8+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==)}:host>.control.arrow.right.dark{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkNhcGFfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZmlsbD0iIzk5OTk5OSIgZD0iTTM4Ny4wNTgsMjQ1Ljc5M0wxNDUuNTMsNC4yNjVjLTUuNjg3LTUuNjg3LTE0LjgwNy01LjY4Ny0yMC40OTQsMHMtNS42ODcsMTQuODA3LDAsMjAuNDk0bDIzMS4yMjgsMjMxLjIyOA0KCQlMMTI1LjAzNiw0ODcuMjE0Yy01LjY4Nyw1LjY4OC01LjY4NywxNC44MDgsMCwyMC40OTRjMi43OSwyLjc5LDYuNTQ1LDQuMjkyLDEwLjE5Myw0LjI5MmMzLjY0OCwwLDcuNDAzLTEuMzk1LDEwLjE5My00LjI5Mg0KCQlMMzg2Ljk1LDI2Ni4xOEMzOTIuNjM3LDI2MC42MDEsMzkyLjYzNywyNTEuMzczLDM4Ny4wNTgsMjQ1Ljc5M3oiLz4NCjwvZz4NCjwvc3ZnPg0K)}:host>.control.left-top,:host>.control.right-top{position:absolute;top:20px}:host>.control.left-top.left-top,:host>.control.right-top.left-top{left:10px}:host>.control.left-top.right-top,:host>.control.right-top.right-top{right:10px}:host>.control.left-top>.close,:host>.control.left-top>.delete-img,:host>.control.left-top>.ext-url,:host>.control.right-top>.close,:host>.control.right-top>.delete-img,:host>.control.right-top>.ext-url{position:relative;display:inline-block;width:30px;height:30px;cursor:pointer;text-decoration:none;color:#fff;vertical-align:bottom;transition:background-color .3s ease-in-out}:host>.control.left-top>.close:hover,:host>.control.left-top>.delete-img:hover,:host>.control.left-top>.ext-url:hover,:host>.control.right-top>.close:hover,:host>.control.right-top>.delete-img:hover,:host>.control.right-top>.ext-url:hover{background-color:rgba(255,255,255,.1)}:host>.control.left-top>.close:before,:host>.control.left-top>.delete-img:before,:host>.control.left-top>.ext-url:before,:host>.control.right-top>.close:before,:host>.control.right-top>.delete-img:before,:host>.control.right-top>.ext-url:before{content:\"\";display:block;position:absolute;top:5px;right:5px;bottom:5px;left:5px;background-size:100% 100%;background-repeat:no-repeat}:host>.control.left-top>.close.delete-img:before,:host>.control.left-top>.delete-img.delete-img:before,:host>.control.left-top>.ext-url.delete-img:before,:host>.control.right-top>.close.delete-img:before,:host>.control.right-top>.delete-img.delete-img:before,:host>.control.right-top>.ext-url.delete-img:before{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU5IDU5IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1OSA1OTsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxwYXRoIGQ9Ik01Mi41LDZIMzguNDU2Yy0wLjExLTEuMjUtMC40OTUtMy4zNTgtMS44MTMtNC43MTFDMzUuODA5LDAuNDM0LDM0Ljc1MSwwLDMzLjQ5OSwwSDIzLjVjLTEuMjUyLDAtMi4zMSwwLjQzNC0zLjE0NCwxLjI4OSAgQzE5LjAzOCwyLjY0MiwxOC42NTMsNC43NSwxOC41NDMsNkg2LjVjLTAuNTUyLDAtMSwwLjQ0Ny0xLDFzMC40NDgsMSwxLDFoMi4wNDFsMS45MTUsNDYuMDIxQzEwLjQ5Myw1NS43NDMsMTEuNTY1LDU5LDE1LjM2NCw1OSAgaDI4LjI3MmMzLjc5OSwwLDQuODcxLTMuMjU3LDQuOTA3LTQuOTU4TDUwLjQ1OSw4SDUyLjVjMC41NTIsMCwxLTAuNDQ3LDEtMVM1My4wNTIsNiw1Mi41LDZ6IE0yMC41LDUwYzAsMC41NTMtMC40NDgsMS0xLDEgIHMtMS0wLjQ0Ny0xLTFWMTdjMC0wLjU1MywwLjQ0OC0xLDEtMXMxLDAuNDQ3LDEsMVY1MHogTTMwLjUsNTBjMCwwLjU1My0wLjQ0OCwxLTEsMXMtMS0wLjQ0Ny0xLTFWMTdjMC0wLjU1MywwLjQ0OC0xLDEtMSAgczEsMC40NDcsMSwxVjUweiBNNDAuNSw1MGMwLDAuNTUzLTAuNDQ4LDEtMSwxcy0xLTAuNDQ3LTEtMVYxN2MwLTAuNTUzLDAuNDQ4LTEsMS0xczEsMC40NDcsMSwxVjUweiBNMjEuNzkyLDIuNjgxICBDMjIuMjQsMi4yMjMsMjIuNzk5LDIsMjMuNSwyaDkuOTk5YzAuNzAxLDAsMS4yNiwwLjIyMywxLjcwOCwwLjY4MWMwLjgwNSwwLjgyMywxLjEyOCwyLjI3MSwxLjI0LDMuMzE5SDIwLjU1MyAgQzIwLjY2NSw0Ljk1MiwyMC45ODgsMy41MDQsMjEuNzkyLDIuNjgxeiIgZmlsbD0iI0ZGRkZGRiIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K)}:host>.control.left-top>.close.delete-img.dark:before,:host>.control.left-top>.delete-img.delete-img.dark:before,:host>.control.left-top>.ext-url.delete-img.dark:before,:host>.control.right-top>.close.delete-img.dark:before,:host>.control.right-top>.delete-img.delete-img.dark:before,:host>.control.right-top>.ext-url.delete-img.dark:before{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU5IDU5IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1OSA1OTsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxwYXRoIGQ9Ik01Mi41LDZIMzguNDU2Yy0wLjExLTEuMjUtMC40OTUtMy4zNTgtMS44MTMtNC43MTFDMzUuODA5LDAuNDM0LDM0Ljc1MSwwLDMzLjQ5OSwwSDIzLjVjLTEuMjUyLDAtMi4zMSwwLjQzNC0zLjE0NCwxLjI4OSAgQzE5LjAzOCwyLjY0MiwxOC42NTMsNC43NSwxOC41NDMsNkg2LjVjLTAuNTUyLDAtMSwwLjQ0Ny0xLDFzMC40NDgsMSwxLDFoMi4wNDFsMS45MTUsNDYuMDIxQzEwLjQ5Myw1NS43NDMsMTEuNTY1LDU5LDE1LjM2NCw1OSAgaDI4LjI3MmMzLjc5OSwwLDQuODcxLTMuMjU3LDQuOTA3LTQuOTU4TDUwLjQ1OSw4SDUyLjVjMC41NTIsMCwxLTAuNDQ3LDEtMVM1My4wNTIsNiw1Mi41LDZ6IE0yMC41LDUwYzAsMC41NTMtMC40NDgsMS0xLDEgIHMtMS0wLjQ0Ny0xLTFWMTdjMC0wLjU1MywwLjQ0OC0xLDEtMXMxLDAuNDQ3LDEsMVY1MHogTTMwLjUsNTBjMCwwLjU1My0wLjQ0OCwxLTEsMXMtMS0wLjQ0Ny0xLTFWMTdjMC0wLjU1MywwLjQ0OC0xLDEtMSAgczEsMC40NDcsMSwxVjUweiBNNDAuNSw1MGMwLDAuNTUzLTAuNDQ4LDEtMSwxcy0xLTAuNDQ3LTEtMVYxN2MwLTAuNTUzLDAuNDQ4LTEsMS0xczEsMC40NDcsMSwxVjUweiBNMjEuNzkyLDIuNjgxICBDMjIuMjQsMi4yMjMsMjIuNzk5LDIsMjMuNSwyaDkuOTk5YzAuNzAxLDAsMS4yNiwwLjIyMywxLjcwOCwwLjY4MWMwLjgwNSwwLjgyMywxLjEyOCwyLjI3MSwxLjI0LDMuMzE5SDIwLjU1MyAgQzIwLjY2NSw0Ljk1MiwyMC45ODgsMy41MDQsMjEuNzkyLDIuNjgxeiIgZmlsbD0iIzk5OTk5OSIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K)}:host>.control.left-top>.close.close:before,:host>.control.left-top>.delete-img.close:before,:host>.control.left-top>.ext-url.close:before,:host>.control.right-top>.close.close:before,:host>.control.right-top>.delete-img.close:before,:host>.control.right-top>.ext-url.close:before{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI1MTJweCIgdmVyc2lvbj0iMS4xIiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNjQgNjQiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDY0IDY0Ij4NCiAgPGc+DQogICAgPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTI4Ljk0MSwzMS43ODZMMC42MTMsNjAuMTE0Yy0wLjc4NywwLjc4Ny0wLjc4NywyLjA2MiwwLDIuODQ5YzAuMzkzLDAuMzk0LDAuOTA5LDAuNTksMS40MjQsMC41OSAgIGMwLjUxNiwwLDEuMDMxLTAuMTk2LDEuNDI0LTAuNTlsMjguNTQxLTI4LjU0MWwyOC41NDEsMjguNTQxYzAuMzk0LDAuMzk0LDAuOTA5LDAuNTksMS40MjQsMC41OWMwLjUxNSwwLDEuMDMxLTAuMTk2LDEuNDI0LTAuNTkgICBjMC43ODctMC43ODcsMC43ODctMi4wNjIsMC0yLjg0OUwzNS4wNjQsMzEuNzg2TDYzLjQxLDMuNDM4YzAuNzg3LTAuNzg3LDAuNzg3LTIuMDYyLDAtMi44NDljLTAuNzg3LTAuNzg2LTIuMDYyLTAuNzg2LTIuODQ4LDAgICBMMzIuMDAzLDI5LjE1TDMuNDQxLDAuNTljLTAuNzg3LTAuNzg2LTIuMDYxLTAuNzg2LTIuODQ4LDBjLTAuNzg3LDAuNzg3LTAuNzg3LDIuMDYyLDAsMi44NDlMMjguOTQxLDMxLjc4NnoiLz4NCiAgPC9nPg0KPC9zdmc+DQo=)}:host>.control.left-top>.close.close.dark:before,:host>.control.left-top>.delete-img.close.dark:before,:host>.control.left-top>.ext-url.close.dark:before,:host>.control.right-top>.close.close.dark:before,:host>.control.right-top>.delete-img.close.dark:before,:host>.control.right-top>.ext-url.close.dark:before{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGZpbGw9IiM5OTk5OTkiIGQ9Ik0yMzEuNTI4LDI1NC4yODhMNC45MDQsNDgwLjkxMmMtNi4yOTYsNi4yOTYtNi4yOTYsMTYuNDk2LDAsMjIuNzkyYzMuMTQ0LDMuMTUyLDcuMjcyLDQuNzIsMTEuMzkyLDQuNzINCgkJYzQuMTI4LDAsOC4yNDgtMS41NjcsMTEuMzkyLTQuNzJsMjI4LjMyOC0yMjguMzI4bDIyOC4zMjgsMjI4LjMyOGMzLjE1MiwzLjE1Miw3LjI3Miw0LjcyLDExLjM5Myw0LjcyDQoJCWM0LjExOSwwLDguMjQ4LTEuNTY3LDExLjM5Mi00LjcyYzYuMjk2LTYuMjk2LDYuMjk2LTE2LjQ5NiwwLTIyLjc5MkwyODAuNTEyLDI1NC4yODhMNTA3LjI4LDI3LjUwNA0KCQljNi4yOTYtNi4yOTYsNi4yOTYtMTYuNDk2LDAtMjIuNzkyYy02LjI5Ni02LjI4OC0xNi40OTYtNi4yODgtMjIuNzg0LDBMMjU2LjAyNCwyMzMuMkwyNy41MjgsNC43Mg0KCQljLTYuMjk2LTYuMjg4LTE2LjQ4OC02LjI4OC0yMi43ODQsMGMtNi4yOTYsNi4yOTYtNi4yOTYsMTYuNDk2LDAsMjIuNzkyTDIzMS41MjgsMjU0LjI4OHoiLz4NCjwvZz4NCjwvc3ZnPg0K)}:host>.control.left-top>.close.ext-url:before,:host>.control.left-top>.delete-img.ext-url:before,:host>.control.left-top>.ext-url.ext-url:before,:host>.control.right-top>.close.ext-url:before,:host>.control.right-top>.delete-img.ext-url:before,:host>.control.right-top>.ext-url.ext-url:before{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE4LjEuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNTkxLjYgNTkxLjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU5MS42IDU5MS42OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNNTgxLjQsMjA0Yy01LjcxMiwwLTEwLjIsNC40ODgtMTAuMiwxMC4ydjMyNi40YzAsMTYuOTMyLTEzLjY2OCwzMC42LTMwLjYsMzAuNkg1MWMtMTYuOTMyLDAtMzAuNi0xMy42NjgtMzAuNi0zMC42VjUxICAgIGMwLTE2LjkzMiwxMy42NjgtMzAuNiwzMC42LTMwLjZoMzI2LjRjNS43MTIsMCwxMC4yLTQuNDg4LDEwLjItMTAuMlMzODMuMTEyLDAsMzc3LjQsMEg1MUMyMi44NDgsMCwwLDIyLjg0OCwwLDUxdjQ4OS42ICAgIGMwLDI4LjE1MiwyMi44NDgsNTEsNTEsNTFoNDg5LjZjMjguMTUyLDAsNTEtMjIuODQ4LDUxLTUxVjIxNC4yQzU5MS42LDIwOC42OTIsNTg2LjkwOCwyMDQsNTgxLjQsMjA0eiIgZmlsbD0iI0ZGRkZGRiIvPg0KCQk8cGF0aCBkPSJNNTkxLjM5Niw4LjE2YzAtMC4yMDQtMC4yMDQtMC42MTItMC4yMDQtMC44MTZjMC0wLjQwOC0wLjIwNC0wLjYxMi0wLjQwOC0xLjAyYy0wLjIwNC0wLjQwOC0wLjQwOC0wLjYxMi0wLjYxMi0xLjAyICAgIGMtMC4yMDQtMC4yMDQtMC4yMDQtMC42MTItMC40MDgtMC44MTZjLTAuODE2LTEuMDItMS42MzItMi4wNC0yLjg1Ni0yLjg1NmMtMC4yMDQtMC4yMDQtMC42MTItMC4yMDQtMC44MTYtMC40MDggICAgYy0wLjQwOC0wLjIwNC0wLjYxMi0wLjQwOC0xLjAyLTAuNjEyYy0wLjQwOC0wLjIwNC0wLjYxMi0wLjIwNC0xLjAyLTAuNDA4Yy0wLjIwNCwwLTAuNjEyLTAuMjA0LTAuODE2LTAuMjA0ICAgIGMtMC42MTIsMC4yMDQtMS4yMjQsMC0xLjgzNiwwbDAsMEg0MzguNmMtNS43MTIsMC0xMC4yLDQuNDg4LTEwLjIsMTAuMnM0LjQ4OCwxMC4yLDEwLjIsMTAuMmgxMTguMTE2bC0zNzAuMjYsMzcwLjI2ICAgIGMtNC4wOCw0LjA4LTQuMDgsMTAuNDA0LDAsMTQuNDg0YzIuMDQsMi4wNCw0LjY5MiwzLjA2LDcuMTQsMy4wNmMyLjQ0OCwwLDUuMzA0LTEuMDIsNy4xNC0zLjA2TDU3MS4yLDM0Ljg4NFYxNTMgICAgYzAsNS43MTIsNC40ODgsMTAuMiwxMC4yLDEwLjJzMTAuMi00LjQ4OCwxMC4yLTEwLjJWMTAuMkM1OTEuNiw5LjU4OCw1OTEuMzk2LDguOTc2LDU5MS4zOTYsOC4xNnoiIGZpbGw9IiNGRkZGRkYiLz4NCgkJPHBhdGggZD0iTTUxLDQ1LjljLTIuODU2LDAtNS4xLDIuMjQ0LTUuMSw1LjF2MTQyLjhjMCwyLjg1NiwyLjI0NCw1LjEsNS4xLDUuMXM1LjEtMi4yNDQsNS4xLTUuMVY1Ni4xaDEzNy43ICAgIGMyLjg1NiwwLDUuMS0yLjI0NCw1LjEtNS4xcy0yLjI0NC01LjEtNS4xLTUuMUg1MXoiIGZpbGw9IiNGRkZGRkYiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==)}:host>.control.left-top>.close.ext-url.dark:before,:host>.control.left-top>.delete-img.ext-url.dark:before,:host>.control.left-top>.ext-url.ext-url.dark:before,:host>.control.right-top>.close.ext-url.dark:before,:host>.control.right-top>.delete-img.ext-url.dark:before,:host>.control.right-top>.ext-url.ext-url.dark:before{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkNhcGFfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGZpbGw9IiM5OTk5OTkiIGQ9Ik01MDMuMTczLDE3Ni41NTJjLTQuOTQ0LDAtOC44MjgsMy44ODQtOC44MjgsOC44Mjh2MjgyLjQ4M2MwLDE0LjY1My0xMS44MjksMjYuNDgyLTI2LjQ4MiwyNi40ODJINDQuMTM4DQoJCQljLTE0LjY1MywwLTI2LjQ4Mi0xMS44MjktMjYuNDgyLTI2LjQ4MlY0NC4xMzhjMC0xNC42NTMsMTEuODI5LTI2LjQ4MiwyNi40ODItMjYuNDgyaDI4Mi40ODNjNC45NDMsMCw4LjgyNy0zLjg4NCw4LjgyNy04LjgyOA0KCQkJUzMzMS41NjQsMCwzMjYuNjIxLDBINDQuMTM4QzE5Ljc3NCwwLDAsMTkuNzc0LDAsNDQuMTM4djQyMy43MjVDMCw0OTIuMjI3LDE5Ljc3NCw1MTIsNDQuMTM4LDUxMmg0MjMuNzI1DQoJCQlDNDkyLjIyNyw1MTIsNTEyLDQ5Mi4yMjcsNTEyLDQ2Ny44NjJWMTg1LjM3OUM1MTIsMTgwLjYxMiw1MDcuOTM5LDE3Ni41NTIsNTAzLjE3MywxNzYuNTUyeiIvPg0KCQk8cGF0aCBmaWxsPSIjOTk5OTk5IiBkPSJNNTExLjgyMyw3LjA2MmMwLTAuMTc2LTAuMTc3LTAuNTMtMC4xNzctMC43MDZjMC0wLjM1My0wLjE3Ni0wLjUzLTAuMzUzLTAuODgzcy0wLjM1NC0wLjUzLTAuNTMtMC44ODMNCgkJCWMtMC4xNzYtMC4xNzYtMC4xNzYtMC41My0wLjM1My0wLjcwNmMtMC43MDYtMC44ODMtMS40MTItMS43NjYtMi40NzItMi40NzJjLTAuMTc3LTAuMTc3LTAuNTI5LTAuMTc3LTAuNzA2LTAuMzUzDQoJCQljLTAuMzU0LTAuMTc3LTAuNTMtMC4zNTQtMC44ODMtMC41M2MtMC4zNTQtMC4xNzctMC41My0wLjE3Ny0wLjg4My0wLjM1M2MtMC4xNzcsMC0wLjUzLTAuMTc3LTAuNzA2LTAuMTc3DQoJCQljLTAuNTMsMC4xNzctMS4wNiwwLTEuNTksMGwwLDBIMzc5LjU4NmMtNC45NDMsMC04LjgyNywzLjg4NC04LjgyNyw4LjgyOHMzLjg4NCw4LjgyOCw4LjgyNyw4LjgyOEg0ODEuODFMMTYxLjM2OCwzMzguMDk3DQoJCQljLTMuNTMxLDMuNTMxLTMuNTMxLDkuMDA0LDAsMTIuNTM1YzEuNzY2LDEuNzY2LDQuMDYxLDIuNjQ4LDYuMTc5LDIuNjQ4YzIuMTE5LDAsNC41OS0wLjg4Myw2LjE4LTIuNjQ4TDQ5NC4zNDUsMzAuMTl2MTAyLjIyNA0KCQkJYzAsNC45NDMsMy44ODQsOC44MjcsOC44MjgsOC44MjdjNC45NDMsMCw4LjgyNy0zLjg4NCw4LjgyNy04LjgyN1Y4LjgyOEM1MTIsOC4yOTgsNTExLjgyMyw3Ljc2OCw1MTEuODIzLDcuMDYyeiIvPg0KCQk8cGF0aCBmaWxsPSIjOTk5OTk5IiBkPSJNNDQuMTM4LDM5LjcyNGMtMi40NzIsMC00LjQxNCwxLjk0Mi00LjQxNCw0LjQxNHYxMjMuNTg2YzAsMi40NzIsMS45NDIsNC40MTQsNC40MTQsNC40MTQNCgkJCWMyLjQ3MiwwLDQuNDE0LTEuOTQyLDQuNDE0LTQuNDE0VjQ4LjU1MmgxMTkuMTcyYzIuNDcyLDAsNC40MTQtMS45NDIsNC40MTQtNC40MTRjMC0yLjQ3Mi0xLjk0Mi00LjQxNC00LjQxNC00LjQxNEg0NC4xMzh6Ii8+DQoJPC9nPg0KPC9nPg0KPC9zdmc+DQo=)}"]
        })
    ], NgxImageGalleryComponent);
    return NgxImageGalleryComponent;
}());
export { NgxImageGalleryComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWltYWdlLWdhbGxlcnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWltYWdlLWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9uZ3gtaW1hZ2UtZ2FsbGVyeS9uZ3gtaW1hZ2UtZ2FsbGVyeS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsTUFBTSxFQUNOLFdBQVcsRUFDWCxLQUFLLEVBQ0wsWUFBWSxFQUNaLFVBQVUsRUFDVixTQUFTLEVBQ1QsWUFBWSxFQUNaLE1BQU0sRUFDTixTQUFTLEVBQ1QsYUFBYSxFQUNiLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUd4QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFekQscUJBQXFCO0FBQ3JCLElBQU0sU0FBUyxHQUFHO0lBQ2QsRUFBRSxFQUFFLE1BQU07SUFDVixFQUFFLEVBQUUsT0FBTztJQUNYLEVBQUUsRUFBRSxLQUFLO0NBQ1osQ0FBQztBQUVGLGdDQUFnQztBQUNoQyxJQUFNLFlBQVksR0FBaUI7SUFDL0IsaUJBQWlCLEVBQUUsS0FBSztJQUN4QixXQUFXLEVBQUUsTUFBTTtJQUNuQixZQUFZLEVBQUUsS0FBSztJQUNuQixpQkFBaUIsRUFBRSxLQUFLO0lBQ3hCLGdCQUFnQixFQUFFLElBQUk7SUFDdEIsaUJBQWlCLEVBQUUsSUFBSTtJQUN2QixjQUFjLEVBQUUsSUFBSTtJQUNwQixjQUFjLEVBQUUsSUFBSTtJQUNwQixVQUFVLEVBQUUsSUFBSTtJQUNoQixlQUFlLEVBQUUsSUFBSTtJQUNyQixpQkFBaUIsRUFBRSxJQUFJO0lBQ3ZCLGlCQUFpQixFQUFFLEtBQUs7SUFDeEIsYUFBYSxFQUFFLEVBQUU7SUFDakIsYUFBYSxFQUFFLHFCQUFxQjtJQUNwQyxNQUFNLEVBQUUs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USxDQUFDLENBQUM7bUVBYTFDO0lBSUQ7UUFEQyxZQUFZLENBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7a0VBTXpDO0lBL09RLHdCQUF3QjtRQUxwQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLDJ5SUFBaUQ7O1NBRXBELENBQUM7T0FDVyx3QkFBd0IsQ0E2VHBDO0lBQUQsK0JBQUM7Q0FBQSxBQTdURCxJQTZUQztTQTdUWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBPbkluaXQsXG4gICAgSG9zdEJpbmRpbmcsXG4gICAgSW5wdXQsXG4gICAgSG9zdExpc3RlbmVyLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgUmVuZGVyZXIyLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBPdXRwdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge2Fzc2lnbiwgZGVib3VuY2V9IGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7R0FMTEVSWV9DT05GLCBHQUxMRVJZX0lNQUdFfSBmcm9tICcuLi8uLi9uZ3gtaW1hZ2UtZ2FsbGVyeS5jb25mJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG4vLyBrZXkgY29kZXMgdG8gcmVhY3RcbmNvbnN0IEtFWV9DT0RFUyA9IHtcbiAgICAzNzogJ0xFRlQnLFxuICAgIDM5OiAnUklHSFQnLFxuICAgIDI3OiAnRVNDJ1xufTtcblxuLy8gZGVmYXVsdCBnYWxsZXJ5IGNvbmZpZ3VyYXRpb25cbmNvbnN0IERFRkFVTFRfQ09ORjogR0FMTEVSWV9DT05GID0ge1xuICAgIGltYWdlQm9yZGVyUmFkaXVzOiAnM3B4JyxcbiAgICBpbWFnZU9mZnNldDogJzIwcHgnLFxuICAgIGltYWdlUG9pbnRlcjogZmFsc2UsXG4gICAgc2hvd0RlbGV0ZUNvbnRyb2w6IGZhbHNlLFxuICAgIHNob3dDbG9zZUNvbnRyb2w6IHRydWUsXG4gICAgc2hvd0V4dFVybENvbnRyb2w6IHRydWUsXG4gICAgc2hvd0ltYWdlVGl0bGU6IHRydWUsXG4gICAgc2hvd1RodW1ibmFpbHM6IHRydWUsXG4gICAgY2xvc2VPbkVzYzogdHJ1ZSxcbiAgICByZWFjdFRvS2V5Ym9hcmQ6IHRydWUsXG4gICAgcmVhY3RUb01vdXNlV2hlZWw6IHRydWUsXG4gICAgcmVhY3RUb1JpZ2h0Q2xpY2s6IGZhbHNlLFxuICAgIHRodW1ibmFpbFNpemU6IDMwLFxuICAgIGJhY2tkcm9wQ29sb3I6ICdyZ2JhKDEzLDEzLDE0LDAuODUpJyxcbiAgICBpbmxpbmU6IGZhbHNlLFxuICAgIHNob3dBcnJvd3M6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbmd4LWltYWdlLWdhbGxlcnknLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9uZ3gtaW1hZ2UtZ2FsbGVyeS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vbmd4LWltYWdlLWdhbGxlcnkuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hJbWFnZUdhbGxlcnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cbiAgICAvLyBnYWxsZXJ5IG9wZW5lZCBtZW1vcnlcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFjdGl2ZScpIG9wZW5lZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLy8gZ2FsbGVyeSBjb25maWd1cmF0aW9uXG4gICAgQElucHV0KCkgY29uZjogR0FMTEVSWV9DT05GID0ge307XG5cbiAgICAvLyBnYWxsZXJ5IGltYWdlc1xuICAgIEBJbnB1dCgpIGltYWdlczogR0FMTEVSWV9JTUFHRVtdID0gW107XG5cbiAgICAvLyBldmVudCBlbW1pdGVyc1xuICAgIEBPdXRwdXQoKSBvbk9wZW4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIG9uQ2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIG9uRGVsZXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBvbkltYWdlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBvbkltYWdlQ2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgb25FcnJvciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8vIHRodW1ibmFpbHMgY29udGFpbmVyXG4gICAgQFZpZXdDaGlsZCgndGh1bWJuYWlscycpIHRodW1ibmFpbHNFbGVtOiBFbGVtZW50UmVmO1xuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIC8vIGxvYWRpbmcgYW5pbWF0aW9uIG1lbW9yeVxuICAgIGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8vIGN1cnJlbnQgYWN0aXZlIGltYWdlIGluZGV4XG4gICAgYWN0aXZlSW1hZ2VJbmRleDogbnVtYmVyID0gbnVsbDtcblxuICAgIC8vIHRodW1ibmFpbCBtYXJnaW4gYW5kIHNjcm9sbCBwb3NpdGlvblxuICAgIHRodW1ibmFpbE1hcmdpbjogc3RyaW5nID0gJzBweCA4cHgnO1xuICAgIHRodW1ibmFpbHNTY3JvbGxlckxlZnRNYXJnaW46IHN0cmluZyA9ICcwcHgnO1xuXG4gICAgLy8gYWN0aXZlIGltYWdlXG4gICAgZ2V0IGFjdGl2ZUltYWdlKCk6IEdBTExFUllfSU1BR0Uge1xuICAgICAgICByZXR1cm4gdGhpcy5pbWFnZXNbdGhpcy5hY3RpdmVJbWFnZUluZGV4XTtcbiAgICB9XG5cbiAgICAvLyBpZiBnYWxsZXJ5IGlzIG9uIDogZmlyc3QgaW1hZ2VcbiAgICBnZXQgb25GaXJzdEltYWdlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmVJbWFnZUluZGV4ID09IDA7XG4gICAgfVxuXG4gICAgLy8gaWYgZ2FsbGVyeSBpcyBvbiA6IGxhc3QgaW1hZ2VcbiAgICBnZXQgb25MYXN0SW1hZ2UoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZUltYWdlSW5kZXggPT0gKHRoaXMuaW1hZ2VzLmxlbmd0aCAtIDEpO1xuICAgIH1cblxuICAgIC8vIGdldCB0aHVtYm5haWxzIHZpZXdwb3J0IHJlbmRlcmluZyBwYXJhbWV0ZXJzXG4gICAgZ2V0IHRodW1ibmFpbHNSZW5kZXJQYXJhbXMoKTogeyB0aHVtYm5haWxzSW5WaWV3OiBudW1iZXIsIG5ld1RodW1ibmFpbE1hcmdpbjogbnVtYmVyLCBuZXdUaHVtYm5haWxTaXplOiBudW1iZXIsIHRodW1ibmFpbHNTY3JvbGxlckxlZnRNYXJnaW46IGFueSB9IHtcbiAgICAgICAgbGV0IHRodW1ibmFpbHNDb250YWluZXJXaWR0aCA9IHRoaXMudGh1bWJuYWlsc0VsZW0ubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcblxuICAgICAgICBsZXQgdGh1bWJuYWlsTWFyZ2luID0gMTY7XG4gICAgICAgIGxldCB0aHVtYm5haWxTaXplID0gdGh1bWJuYWlsTWFyZ2luICsgdGhpcy5jb25mLnRodW1ibmFpbFNpemU7XG4gICAgICAgIGxldCB0aHVtYm5haWxzSW5WaWV3ID0gTWF0aC5mbG9vcih0aHVtYm5haWxzQ29udGFpbmVyV2lkdGggLyB0aHVtYm5haWxTaXplKTtcbiAgICAgICAgbGV0IGV4dHJhU3BhY2VJblRodW1ibmFpbHNDb250YWluZXIgPSB0aHVtYm5haWxzQ29udGFpbmVyV2lkdGggLSAodGh1bWJuYWlsc0luVmlldyAqIHRodW1ibmFpbFNpemUpO1xuICAgICAgICBsZXQgZXh0cmFNYXJnaW4gPSBleHRyYVNwYWNlSW5UaHVtYm5haWxzQ29udGFpbmVyIC8gdGh1bWJuYWlsc0luVmlldztcblxuICAgICAgICBsZXQgbmV3VGh1bWJuYWlsTWFyZ2luID0gdGh1bWJuYWlsTWFyZ2luICsgZXh0cmFNYXJnaW47XG4gICAgICAgIGxldCBuZXdUaHVtYm5haWxTaXplID0gbmV3VGh1bWJuYWlsTWFyZ2luICsgdGhpcy5jb25mLnRodW1ibmFpbFNpemU7XG5cbiAgICAgICAgbGV0IHJlbGF0aXZlUG9zaXRpb25PZkFjdGl2ZUltYWdlVGh1bWJuYWlsVG9TY3JvbGxlciA9IHRodW1ibmFpbHNJblZpZXcgLSAodGh1bWJuYWlsc0luVmlldyAtIHRoaXMuYWN0aXZlSW1hZ2VJbmRleCk7XG4gICAgICAgIGxldCB0aHVtYm5haWxzU2Nyb2xsZXJMZWZ0TWFyZ2luOiBhbnk7XG5cbiAgICAgICAgaWYgKHJlbGF0aXZlUG9zaXRpb25PZkFjdGl2ZUltYWdlVGh1bWJuYWlsVG9TY3JvbGxlciA+IHRodW1ibmFpbHNJblZpZXcgLSAyKSB7XG4gICAgICAgICAgICB2YXIgb3V0VGh1bWJuYWlscyA9ICgodGhpcy5hY3RpdmVJbWFnZUluZGV4ICsgMSkgLSB0aHVtYm5haWxzSW5WaWV3KSArIDE7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2ZUltYWdlSW5kZXggIT0gKHRoaXMuaW1hZ2VzLmxlbmd0aCAtIDEpKSB7XG4gICAgICAgICAgICAgICAgdGh1bWJuYWlsc1Njcm9sbGVyTGVmdE1hcmdpbiA9ICctJyArIChuZXdUaHVtYm5haWxTaXplICogb3V0VGh1bWJuYWlscykgKyAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGh1bWJuYWlsc1Njcm9sbGVyTGVmdE1hcmdpbiA9ICctJyArIChuZXdUaHVtYm5haWxTaXplICogKG91dFRodW1ibmFpbHMgLSAxKSkgKyAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGh1bWJuYWlsc1Njcm9sbGVyTGVmdE1hcmdpbiA9ICcwcHgnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRodW1ibmFpbHNJblZpZXcsXG4gICAgICAgICAgICBuZXdUaHVtYm5haWxNYXJnaW4sXG4gICAgICAgICAgICBuZXdUaHVtYm5haWxTaXplLFxuICAgICAgICAgICAgdGh1bWJuYWlsc1Njcm9sbGVyTGVmdE1hcmdpblxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIHNldCBnYWxsZXJ5IGNvbmZpZ3VyYXRpb25cbiAgICBwcml2YXRlIHNldEdhbGxlcnlDb25mKGNvbmY6IEdBTExFUllfQ09ORikge1xuICAgICAgICB0aGlzLmNvbmYgPSBhc3NpZ24oREVGQVVMVF9DT05GLCBjb25mKTtcbiAgICB9XG5cbiAgICAvLyBsb2FkIGltYWdlIGFuZCByZXR1cm4gcHJvbWlzZVxuICAgIHByaXZhdGUgbG9hZEltYWdlKGluZGV4OiBudW1iZXIpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBjb25zdCBnYWxsZXJ5SW1hZ2U6IEdBTExFUllfSU1BR0UgPSB0aGlzLmltYWdlc1tpbmRleF07XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgaW1hZ2UgaXMgY2FjaGVkXG4gICAgICAgIGlmIChnYWxsZXJ5SW1hZ2UuX2NhY2hlZCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShpbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICBsZXQgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICBpbWFnZS5zcmMgPSBnYWxsZXJ5SW1hZ2UudXJsO1xuXG4gICAgICAgICAgICAgICAgaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgZ2FsbGVyeUltYWdlLl9jYWNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGluZGV4KTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaW1hZ2Uub25lcnJvciA9IChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBhY3RpdmF0ZSBpbWFnZSAoc2V0IGFjdGl2ZSBpbWFnZSlcbiAgICBwcml2YXRlIGFjdGl2YXRlSW1hZ2UoaW1hZ2VJbmRleDogbnVtYmVyKSB7XG4gICAgICAgIC8vIHByZXZlbnQgbG9hZGluZyBpZiBhbHJlYWR5IGxvYWRpbmdcbiAgICAgICAgaWYgKHRoaXMubG9hZGluZykgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIC8vIGVtaXQgZXZlbnRcbiAgICAgICAgdGhpcy5vbkltYWdlQ2hhbmdlLmVtaXQoaW1hZ2VJbmRleCk7XG5cbiAgICAgICAgdGhpcy5sb2FkSW1hZ2UoaW1hZ2VJbmRleClcbiAgICAgICAgICAgIC50aGVuKF9pbWFnZUluZGV4ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUltYWdlSW5kZXggPSBfaW1hZ2VJbmRleDtcblxuICAgICAgICAgICAgICAgIC8vIHNjcm9sbCB0aHVtYm5haWxzXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZml0VGh1bWJuYWlscygpO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2Nyb2xsVGh1bWJuYWlscygpLCAzMDApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7IFxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihlcnJvcilcbiAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IubmV4dChlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBhZGp1c3QgdGh1bWJuYWlsIG1hcmdpbiB0byBwZXJmZWN0bHkgZml0IHZpZXdwb3J0XG4gICAgcHJpdmF0ZSBmaXRUaHVtYm5haWxzID0gZGVib3VuY2UoKCkgPT4ge1xuICAgICAgICAvLyBpZiB0aHVtYm5haWxzIG5vdCB2aXNpYmxlLCByZXR1cm4gZmFsc2VcbiAgICAgICAgaWYgKHRoaXMuY29uZi5zaG93VGh1bWJuYWlscyA9PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGxldCB0aHVtYm5haWxQYXJhbXMgPSB0aGlzLnRodW1ibmFpbHNSZW5kZXJQYXJhbXM7XG4gICAgICAgIHRoaXMudGh1bWJuYWlsTWFyZ2luID0gJzAgJyArICh0aHVtYm5haWxQYXJhbXMubmV3VGh1bWJuYWlsTWFyZ2luIC8gMikgKyAncHgnO1xuICAgIH0sIDMwMCk7XG5cbiAgICAvLyBzY3JvbGwgdGh1bWJuYWlscyB0byBwZXJmZWN0bHkgcG9zaXRpb24gYWN0aXZlIGltYWdlIHRodW1ibmFpbCBpbiB2aWV3cG9ydFxuICAgIHByaXZhdGUgc2Nyb2xsVGh1bWJuYWlscygpIHtcbiAgICAgICAgLy8gaWYgdGh1bWJuYWlscyBub3QgdmlzaWJsZSwgcmV0dXJuIGZhbHNlXG4gICAgICAgIGlmICh0aGlzLmNvbmYuc2hvd1RodW1ibmFpbHMgPT0gZmFsc2UpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBsZXQgdGh1bWJuYWlsUGFyYW1zID0gdGhpcy50aHVtYm5haWxzUmVuZGVyUGFyYW1zO1xuICAgICAgICB0aGlzLnRodW1ibmFpbHNTY3JvbGxlckxlZnRNYXJnaW4gPSB0aHVtYm5haWxQYXJhbXMudGh1bWJuYWlsc1Njcm9sbGVyTGVmdE1hcmdpbjtcbiAgICB9XG5cbiAgICAvLyBkZWJvdW5jZWQgcHJldlxuICAgIHByaXZhdGUgZGVib3VuY2VkUHJldiA9IGRlYm91bmNlKCgpID0+IHRoaXMucHJldigpLCAxMDAsIHsnbGVhZGluZyc6IHRydWUsICd0cmFpbGluZyc6IGZhbHNlfSk7XG5cbiAgICAvLyBkZWJvdW5jZWQgbmV4dFxuICAgIHByaXZhdGUgZGVib3VuY2VkTmV4dCA9IGRlYm91bmNlKCgpID0+IHRoaXMubmV4dCgpLCAxMDAsIHsnbGVhZGluZyc6IHRydWUsICd0cmFpbGluZyc6IGZhbHNlfSk7XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBzYW5pdGl6ZXI6IERvbVNhbml0aXplcixcbiAgICAgICAgcHJpdmF0ZSBnYWxsZXJ5RWxlbTogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXG4gICAgKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIC8vIGNyZWF0ZSBmaW5hbCBnYWxsZXJ5IGNvbmZpZ3VyYXRpb25cbiAgICAgICAgdGhpcy5zZXRHYWxsZXJ5Q29uZih0aGlzLmNvbmYpO1xuXG4gICAgICAgIC8vIGFwcGx5IGJhY2tkcm9wIGNvbG9yXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5nYWxsZXJ5RWxlbS5uYXRpdmVFbGVtZW50LCAnYmFja2dyb3VuZC1jb2xvcicsIHRoaXMuY29uZi5iYWNrZHJvcENvbG9yKTtcblxuICAgICAgICAvLyBnYWxsZXJ5IGlubGluZSBjbGFzcyBhbmQgYXV0byBvcGVuXG4gICAgICAgIGlmICh0aGlzLmNvbmYuaW5saW5lKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZ2FsbGVyeUVsZW0ubmF0aXZlRWxlbWVudCwgJ2lubGluZScpO1xuICAgICAgICAgICAgdGhpcy5vcGVuKDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICAvLyB3aGVuIGdhbGxlcnkgY29uZmlndXJhdGlvbiBjaGFuZ2VzXG4gICAgICAgIGlmIChjaGFuZ2VzLmNvbmYgJiYgY2hhbmdlcy5jb25mLmZpcnN0Q2hhbmdlID09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLnNldEdhbGxlcnlDb25mKGNoYW5nZXMuY29uZi5jdXJyZW50VmFsdWUpO1xuXG4gICAgICAgICAgICAvLyBhcHBseSBiYWNrZHJvcCBjb2xvclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmdhbGxlcnlFbGVtLm5hdGl2ZUVsZW1lbnQsICdiYWNrZ3JvdW5kLWNvbG9yJywgdGhpcy5jb25mLmJhY2tkcm9wQ29sb3IpO1xuXG4gICAgICAgICAgICAvLyBnYWxsZXJ5IGlubGluZSBjbGFzcyBhbmQgYXV0byBvcGVuXG4gICAgICAgICAgICBpZiAoKGNoYW5nZXMuY29uZi5wcmV2aW91c1ZhbHVlLmlubGluZSAhPSB0cnVlKSAmJiB0aGlzLmNvbmYuaW5saW5lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmdhbGxlcnlFbGVtLm5hdGl2ZUVsZW1lbnQsICdpbmxpbmUnKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW4oMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyB3aGVuIGdhbGxlcnkgaW1hZ2VzIGNoYW5nZXNcbiAgICAgICAgaWYgKGNoYW5nZXMuaW1hZ2VzICYmIGNoYW5nZXMuaW1hZ2VzLmZpcnN0Q2hhbmdlID09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLmltYWdlcyA9IGNoYW5nZXMuaW1hZ2VzLmN1cnJlbnRWYWx1ZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaW1hZ2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZhdGVJbWFnZSgwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuICAgIFxuICAgIC8vIGtleWJvYXJkIGV2ZW50XG4gICAgQEhvc3RMaXN0ZW5lcignd2luZG93OmtleWRvd24nLCBbJyRldmVudCddKVxuICAgIHB1YmxpYyBvbktleWJvYXJkSW5wdXQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuY29uZi5yZWFjdFRvS2V5Ym9hcmQgJiYgdGhpcy5vcGVuZWQgJiYgIXRoaXMubG9hZGluZykge1xuICAgICAgICAgICAgaWYgKEtFWV9DT0RFU1tldmVudC5rZXlDb2RlXSA9PSAnUklHSFQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChLRVlfQ09ERVNbZXZlbnQua2V5Q29kZV0gPT0gJ0xFRlQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgoS0VZX0NPREVTW2V2ZW50LmtleUNvZGVdID09ICdFU0MnKSAmJiB0aGlzLmNvbmYuY2xvc2VPbkVzYykge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHdpbmRvdyByZXNpemUgZXZlbnRcbiAgICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcbiAgICBwdWJsaWMgb25XaW5kb3dSZXNpemUoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLm9wZW5lZCAmJiAhdGhpcy5sb2FkaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmZpdFRodW1ibmFpbHMoKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zY3JvbGxUaHVtYm5haWxzKCksIDMwMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgLy8gb3BlbiBnYWxsZXJ5XG4gICAgb3BlbihpbmRleDogbnVtYmVyID0gMCkge1xuICAgICAgICBpZiAodGhpcy5pbWFnZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5lZCA9IHRydWU7XG5cbiAgICAgICAgICAgIC8vIGVtaXQgZXZlbnRcbiAgICAgICAgICAgIHRoaXMub25PcGVuLmVtaXQoaW5kZXgpO1xuXG4gICAgICAgICAgICAvLyBhY3RpdmF0ZSBpbWFnZSBhdCBnaXZlbiBpbmRleFxuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZUltYWdlKGluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignTm8gaW1hZ2VzIHByb3ZpZGVkIHRvIG5neC1pbWFnZS1nYWxsZXJ5IScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gY2xvc2UgZ2FsbGVyeVxuICAgIGNsb3NlKCkge1xuICAgICAgICB0aGlzLm9wZW5lZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFjdGl2ZUltYWdlSW5kZXggPSAwO1xuXG4gICAgICAgIC8vIGVtaXQgZXZlbnRcbiAgICAgICAgdGhpcy5vbkNsb3NlLmVtaXQoKTtcbiAgICB9XG5cbiAgICAvLyBjaGFuZ2UgcHJldiBpbWFnZVxuICAgIHByZXYoKSB7XG4gICAgICAgIGlmICh0aGlzLm9uRmlyc3RJbWFnZSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZUltYWdlKHRoaXMuYWN0aXZlSW1hZ2VJbmRleCAtIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gY2hhbmdlIG5leHQgaW1hZ2VcbiAgICBuZXh0KCkge1xuICAgICAgICBpZiAodGhpcy5vbkxhc3RJbWFnZSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZUltYWdlKHRoaXMuYWN0aXZlSW1hZ2VJbmRleCArIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gc2V0IGltYWdlIChhY3RpdmF0ZSlcbiAgICBzZXRBY3RpdmVJbWFnZShpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuYWN0aXZhdGVJbWFnZShpbmRleCk7XG4gICAgfVxuXG4gICAgLy8gZGVsZXRlIGltYWdlXG4gICAgZGVsZXRlSW1hZ2UoaW5kZXg6IG51bWJlcikge1xuICAgICAgICB0aGlzLm9uRGVsZXRlLmVtaXQoaW5kZXgpO1xuICAgIH1cblxuICAgIC8vIG1vdXNlIHdoZWVsIHVwIChwcmV2IGltYWdlKVxuICAgIG1vdXNlV2hlZWxVcCgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29uZi5yZWFjdFRvTW91c2VXaGVlbCkge1xuICAgICAgICAgICAgdGhpcy5kZWJvdW5jZWROZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBtb3VzZSB3aGVlbCBkb3duIChuZXh0IGltYWdlKVxuICAgIG1vdXNlV2hlZWxEb3duKCkge1xuICAgICAgICBpZiAodGhpcy5jb25mLnJlYWN0VG9Nb3VzZVdoZWVsKSB7XG4gICAgICAgICAgICB0aGlzLmRlYm91bmNlZFByZXYoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNsaWNrIG9uIGltYWdlXG4gICAgY2xpY2tPbkltYWdlKGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5vbkltYWdlQ2xpY2tlZC5lbWl0KGluZGV4KTtcbiAgICB9XG5cbiAgICAvLyByaWdodCBjbGljayBvbiBpbWFnZVxuICAgIHJpZ2h0Q2xpY2tPbkltYWdlKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZi5yZWFjdFRvUmlnaHRDbGljaztcbiAgICB9XG5cbn1cbiJdfQ==
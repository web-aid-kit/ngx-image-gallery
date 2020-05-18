import { __decorate } from "tslib";
import { Component, OnInit, HostBinding, Input, HostListener, ElementRef, Renderer2, EventEmitter, Output, OnChanges, SimpleChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
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
    function NgxImageGalleryComponent(sanitizer, galleryElem, renderer, cdRef) {
        var _this = this;
        this.sanitizer = sanitizer;
        this.galleryElem = galleryElem;
        this.renderer = renderer;
        this.cdRef = cdRef;
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
            // Trigger change detection manually to support ChangeDetectionStrategy.OnPush
            _this.cdRef.detectChanges();
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
        { type: Renderer2 },
        { type: ChangeDetectorRef }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWltYWdlLWdhbGxlcnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWltYWdlLWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9uZ3gtaW1hZ2UtZ2FsbGVyeS9uZ3gtaW1hZ2UtZ2FsbGVyeS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsTUFBTSxFQUNOLFdBQVcsRUFDWCxLQUFLLEVBQ0wsWUFBWSxFQUNaLFVBQVUsRUFDVixTQUFTLEVBQ1QsWUFBWSxFQUNaLE1BQU0sRUFDTixTQUFTLEVBQ1QsYUFBYSxFQUNiLFNBQVMsRUFDVCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFHeEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXpELHFCQUFxQjtBQUNyQixJQUFNLFNBQVMsR0FBRztJQUNkLEVBQUUsRUFBRSxNQUFNO0lBQ1YsRUFBRSxFQUFFLE9BQU87SUFDWCxFQUFFLEVBQUUsS0FBSztDQUNaLENBQUM7QUFFRixnQ0FBZ0M7QUFDaEMsSUFBTSxZQUFZLEdBQWlCO0lBQy9CLGlCQUFpQixFQUFFLEtBQUs7SUFDeEIsV0FBVyxFQUFFLE1BQU07SUFDbkIsWUFBWSxFQUFFLEtBQUs7SUFDbkIsaUJBQWlCLEVBQUUsS0FBSztJQUN4QixnQkFBZ0IsRUFBRSxJQUFJO0lBQ3RCLGlCQUFpQixFQUFFLElBQUk7SUFDdkIsY0FBYyxFQUFFLElBQUk7SUFDcEIsY0FBYyxFQUFFLElBQUk7SUFDcEIsVUFBVSxFQUFFLElBQUk7SUFDaEIsZUFBZSxFQUFFLElBQUk7SUFDckIsaUJBQWlCLEVBQUUsSUFBSTtJQUN2QixpQkFBaUIsRUFBRSxLQUFLO0lBQ3hCLGFBQWEsRUFBRSxFQUFFO0lBQ2pCLGFBQWEsRUFBRSxxQkFBcUI7SUFD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QUFFO29FQUFxQztJQUNwQztRQUFULE1BQU0sRUFBRTs2REFBOEI7SUFHZDtRQUF4QixTQUFTLENBQUMsWUFBWSxDQUFDO29FQUE0QjtJQXlNcEQ7UUFEQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzttRUFhMUM7SUFJRDtRQURDLFlBQVksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztrRUFNekM7SUFsUFEsd0JBQXdCO1FBTHBDLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsMnlJQUFpRDs7U0FFcEQsQ0FBQztPQUNXLHdCQUF3QixDQWdVcEM7SUFBRCwrQkFBQztDQUFBLEFBaFVELElBZ1VDO1NBaFVZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIE9uSW5pdCxcbiAgICBIb3N0QmluZGluZyxcbiAgICBJbnB1dCxcbiAgICBIb3N0TGlzdGVuZXIsXG4gICAgRWxlbWVudFJlZixcbiAgICBSZW5kZXJlcjIsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIE91dHB1dCxcbiAgICBPbkNoYW5nZXMsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBWaWV3Q2hpbGQsXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7YXNzaWduLCBkZWJvdW5jZX0gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHtHQUxMRVJZX0NPTkYsIEdBTExFUllfSU1BR0V9IGZyb20gJy4uLy4uL25neC1pbWFnZS1nYWxsZXJ5LmNvbmYnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbi8vIGtleSBjb2RlcyB0byByZWFjdFxuY29uc3QgS0VZX0NPREVTID0ge1xuICAgIDM3OiAnTEVGVCcsXG4gICAgMzk6ICdSSUdIVCcsXG4gICAgMjc6ICdFU0MnXG59O1xuXG4vLyBkZWZhdWx0IGdhbGxlcnkgY29uZmlndXJhdGlvblxuY29uc3QgREVGQVVMVF9DT05GOiBHQUxMRVJZX0NPTkYgPSB7XG4gICAgaW1hZ2VCb3JkZXJSYWRpdXM6ICczcHgnLFxuICAgIGltYWdlT2Zmc2V0OiAnMjBweCcsXG4gICAgaW1hZ2VQb2ludGVyOiBmYWxzZSxcbiAgICBzaG93RGVsZXRlQ29udHJvbDogZmFsc2UsXG4gICAgc2hvd0Nsb3NlQ29udHJvbDogdHJ1ZSxcbiAgICBzaG93RXh0VXJsQ29udHJvbDogdHJ1ZSxcbiAgICBzaG93SW1hZ2VUaXRsZTogdHJ1ZSxcbiAgICBzaG93VGh1bWJuYWlsczogdHJ1ZSxcbiAgICBjbG9zZU9uRXNjOiB0cnVlLFxuICAgIHJlYWN0VG9LZXlib2FyZDogdHJ1ZSxcbiAgICByZWFjdFRvTW91c2VXaGVlbDogdHJ1ZSxcbiAgICByZWFjdFRvUmlnaHRDbGljazogZmFsc2UsXG4gICAgdGh1bWJuYWlsU2l6ZTogMzAsXG4gICAgYmFja2Ryb3BDb2xvcjogJ3JnYmEoMTMsMTMsMTQsMC44NSknLFxuICAgIGlubGluZTogZmFsc2UsXG4gICAgc2hvd0Fycm93czogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduZ3gtaW1hZ2UtZ2FsbGVyeScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL25neC1pbWFnZS1nYWxsZXJ5LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9uZ3gtaW1hZ2UtZ2FsbGVyeS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE5neEltYWdlR2FsbGVyeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcblxuICAgIC8vIGdhbGxlcnkgb3BlbmVkIG1lbW9yeVxuICAgIEBIb3N0QmluZGluZygnY2xhc3MuYWN0aXZlJykgb3BlbmVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvLyBnYWxsZXJ5IGNvbmZpZ3VyYXRpb25cbiAgICBASW5wdXQoKSBjb25mOiBHQUxMRVJZX0NPTkYgPSB7fTtcblxuICAgIC8vIGdhbGxlcnkgaW1hZ2VzXG4gICAgQElucHV0KCkgaW1hZ2VzOiBHQUxMRVJZX0lNQUdFW10gPSBbXTtcblxuICAgIC8vIGV2ZW50IGVtbWl0ZXJzXG4gICAgQE91dHB1dCgpIG9uT3BlbiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgb25DbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgb25EZWxldGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIG9uSW1hZ2VDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIG9uSW1hZ2VDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBvbkVycm9yID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLy8gdGh1bWJuYWlscyBjb250YWluZXJcbiAgICBAVmlld0NoaWxkKCd0aHVtYm5haWxzJykgdGh1bWJuYWlsc0VsZW06IEVsZW1lbnRSZWY7XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgLy8gbG9hZGluZyBhbmltYXRpb24gbWVtb3J5XG4gICAgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLy8gY3VycmVudCBhY3RpdmUgaW1hZ2UgaW5kZXhcbiAgICBhY3RpdmVJbWFnZUluZGV4OiBudW1iZXIgPSBudWxsO1xuXG4gICAgLy8gdGh1bWJuYWlsIG1hcmdpbiBhbmQgc2Nyb2xsIHBvc2l0aW9uXG4gICAgdGh1bWJuYWlsTWFyZ2luOiBzdHJpbmcgPSAnMHB4IDhweCc7XG4gICAgdGh1bWJuYWlsc1Njcm9sbGVyTGVmdE1hcmdpbjogc3RyaW5nID0gJzBweCc7XG5cbiAgICAvLyBhY3RpdmUgaW1hZ2VcbiAgICBnZXQgYWN0aXZlSW1hZ2UoKTogR0FMTEVSWV9JTUFHRSB7XG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlc1t0aGlzLmFjdGl2ZUltYWdlSW5kZXhdO1xuICAgIH1cblxuICAgIC8vIGlmIGdhbGxlcnkgaXMgb24gOiBmaXJzdCBpbWFnZVxuICAgIGdldCBvbkZpcnN0SW1hZ2UoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZUltYWdlSW5kZXggPT0gMDtcbiAgICB9XG5cbiAgICAvLyBpZiBnYWxsZXJ5IGlzIG9uIDogbGFzdCBpbWFnZVxuICAgIGdldCBvbkxhc3RJbWFnZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlSW1hZ2VJbmRleCA9PSAodGhpcy5pbWFnZXMubGVuZ3RoIC0gMSk7XG4gICAgfVxuXG4gICAgLy8gZ2V0IHRodW1ibmFpbHMgdmlld3BvcnQgcmVuZGVyaW5nIHBhcmFtZXRlcnNcbiAgICBnZXQgdGh1bWJuYWlsc1JlbmRlclBhcmFtcygpOiB7IHRodW1ibmFpbHNJblZpZXc6IG51bWJlciwgbmV3VGh1bWJuYWlsTWFyZ2luOiBudW1iZXIsIG5ld1RodW1ibmFpbFNpemU6IG51bWJlciwgdGh1bWJuYWlsc1Njcm9sbGVyTGVmdE1hcmdpbjogYW55IH0ge1xuICAgICAgICBsZXQgdGh1bWJuYWlsc0NvbnRhaW5lcldpZHRoID0gdGhpcy50aHVtYm5haWxzRWxlbS5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuXG4gICAgICAgIGxldCB0aHVtYm5haWxNYXJnaW4gPSAxNjtcbiAgICAgICAgbGV0IHRodW1ibmFpbFNpemUgPSB0aHVtYm5haWxNYXJnaW4gKyB0aGlzLmNvbmYudGh1bWJuYWlsU2l6ZTtcbiAgICAgICAgbGV0IHRodW1ibmFpbHNJblZpZXcgPSBNYXRoLmZsb29yKHRodW1ibmFpbHNDb250YWluZXJXaWR0aCAvIHRodW1ibmFpbFNpemUpO1xuICAgICAgICBsZXQgZXh0cmFTcGFjZUluVGh1bWJuYWlsc0NvbnRhaW5lciA9IHRodW1ibmFpbHNDb250YWluZXJXaWR0aCAtICh0aHVtYm5haWxzSW5WaWV3ICogdGh1bWJuYWlsU2l6ZSk7XG4gICAgICAgIGxldCBleHRyYU1hcmdpbiA9IGV4dHJhU3BhY2VJblRodW1ibmFpbHNDb250YWluZXIgLyB0aHVtYm5haWxzSW5WaWV3O1xuXG4gICAgICAgIGxldCBuZXdUaHVtYm5haWxNYXJnaW4gPSB0aHVtYm5haWxNYXJnaW4gKyBleHRyYU1hcmdpbjtcbiAgICAgICAgbGV0IG5ld1RodW1ibmFpbFNpemUgPSBuZXdUaHVtYm5haWxNYXJnaW4gKyB0aGlzLmNvbmYudGh1bWJuYWlsU2l6ZTtcblxuICAgICAgICBsZXQgcmVsYXRpdmVQb3NpdGlvbk9mQWN0aXZlSW1hZ2VUaHVtYm5haWxUb1Njcm9sbGVyID0gdGh1bWJuYWlsc0luVmlldyAtICh0aHVtYm5haWxzSW5WaWV3IC0gdGhpcy5hY3RpdmVJbWFnZUluZGV4KTtcbiAgICAgICAgbGV0IHRodW1ibmFpbHNTY3JvbGxlckxlZnRNYXJnaW46IGFueTtcblxuICAgICAgICBpZiAocmVsYXRpdmVQb3NpdGlvbk9mQWN0aXZlSW1hZ2VUaHVtYm5haWxUb1Njcm9sbGVyID4gdGh1bWJuYWlsc0luVmlldyAtIDIpIHtcbiAgICAgICAgICAgIHZhciBvdXRUaHVtYm5haWxzID0gKCh0aGlzLmFjdGl2ZUltYWdlSW5kZXggKyAxKSAtIHRodW1ibmFpbHNJblZpZXcpICsgMTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZlSW1hZ2VJbmRleCAhPSAodGhpcy5pbWFnZXMubGVuZ3RoIC0gMSkpIHtcbiAgICAgICAgICAgICAgICB0aHVtYm5haWxzU2Nyb2xsZXJMZWZ0TWFyZ2luID0gJy0nICsgKG5ld1RodW1ibmFpbFNpemUgKiBvdXRUaHVtYm5haWxzKSArICdweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHVtYm5haWxzU2Nyb2xsZXJMZWZ0TWFyZ2luID0gJy0nICsgKG5ld1RodW1ibmFpbFNpemUgKiAob3V0VGh1bWJuYWlscyAtIDEpKSArICdweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHVtYm5haWxzU2Nyb2xsZXJMZWZ0TWFyZ2luID0gJzBweCc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGh1bWJuYWlsc0luVmlldyxcbiAgICAgICAgICAgIG5ld1RodW1ibmFpbE1hcmdpbixcbiAgICAgICAgICAgIG5ld1RodW1ibmFpbFNpemUsXG4gICAgICAgICAgICB0aHVtYm5haWxzU2Nyb2xsZXJMZWZ0TWFyZ2luXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gc2V0IGdhbGxlcnkgY29uZmlndXJhdGlvblxuICAgIHByaXZhdGUgc2V0R2FsbGVyeUNvbmYoY29uZjogR0FMTEVSWV9DT05GKSB7XG4gICAgICAgIHRoaXMuY29uZiA9IGFzc2lnbihERUZBVUxUX0NPTkYsIGNvbmYpO1xuICAgIH1cblxuICAgIC8vIGxvYWQgaW1hZ2UgYW5kIHJldHVybiBwcm9taXNlXG4gICAgcHJpdmF0ZSBsb2FkSW1hZ2UoaW5kZXg6IG51bWJlcik6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGNvbnN0IGdhbGxlcnlJbWFnZTogR0FMTEVSWV9JTUFHRSA9IHRoaXMuaW1hZ2VzW2luZGV4XTtcblxuICAgICAgICAvLyBjaGVjayBpZiBpbWFnZSBpcyBjYWNoZWRcbiAgICAgICAgaWYgKGdhbGxlcnlJbWFnZS5fY2FjaGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIGxldCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgICAgIGltYWdlLnNyYyA9IGdhbGxlcnlJbWFnZS51cmw7XG5cbiAgICAgICAgICAgICAgICBpbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBnYWxsZXJ5SW1hZ2UuX2NhY2hlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoaW5kZXgpO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpbWFnZS5vbmVycm9yID0gKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGFjdGl2YXRlIGltYWdlIChzZXQgYWN0aXZlIGltYWdlKVxuICAgIHByaXZhdGUgYWN0aXZhdGVJbWFnZShpbWFnZUluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgLy8gcHJldmVudCBsb2FkaW5nIGlmIGFscmVhZHkgbG9hZGluZ1xuICAgICAgICBpZiAodGhpcy5sb2FkaW5nKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgLy8gZW1pdCBldmVudFxuICAgICAgICB0aGlzLm9uSW1hZ2VDaGFuZ2UuZW1pdChpbWFnZUluZGV4KTtcblxuICAgICAgICB0aGlzLmxvYWRJbWFnZShpbWFnZUluZGV4KVxuICAgICAgICAgICAgLnRoZW4oX2ltYWdlSW5kZXggPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlSW1hZ2VJbmRleCA9IF9pbWFnZUluZGV4O1xuICAgICAgICAgICAgICAgIC8vIFRyaWdnZXIgY2hhbmdlIGRldGVjdGlvbiBtYW51YWxseSB0byBzdXBwb3J0IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxuICAgICAgICAgICAgICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuXG4gICAgICAgICAgICAgICAgLy8gc2Nyb2xsIHRodW1ibmFpbHNcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maXRUaHVtYm5haWxzKCk7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zY3JvbGxUaHVtYm5haWxzKCksIDMwMCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oZXJyb3IpXG4gICAgICAgICAgICAgICAgdGhpcy5vbkVycm9yLm5leHQoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gYWRqdXN0IHRodW1ibmFpbCBtYXJnaW4gdG8gcGVyZmVjdGx5IGZpdCB2aWV3cG9ydFxuICAgIHByaXZhdGUgZml0VGh1bWJuYWlscyA9IGRlYm91bmNlKCgpID0+IHtcbiAgICAgICAgLy8gaWYgdGh1bWJuYWlscyBub3QgdmlzaWJsZSwgcmV0dXJuIGZhbHNlXG4gICAgICAgIGlmICh0aGlzLmNvbmYuc2hvd1RodW1ibmFpbHMgPT0gZmFsc2UpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBsZXQgdGh1bWJuYWlsUGFyYW1zID0gdGhpcy50aHVtYm5haWxzUmVuZGVyUGFyYW1zO1xuICAgICAgICB0aGlzLnRodW1ibmFpbE1hcmdpbiA9ICcwICcgKyAodGh1bWJuYWlsUGFyYW1zLm5ld1RodW1ibmFpbE1hcmdpbiAvIDIpICsgJ3B4JztcbiAgICB9LCAzMDApO1xuXG4gICAgLy8gc2Nyb2xsIHRodW1ibmFpbHMgdG8gcGVyZmVjdGx5IHBvc2l0aW9uIGFjdGl2ZSBpbWFnZSB0aHVtYm5haWwgaW4gdmlld3BvcnRcbiAgICBwcml2YXRlIHNjcm9sbFRodW1ibmFpbHMoKSB7XG4gICAgICAgIC8vIGlmIHRodW1ibmFpbHMgbm90IHZpc2libGUsIHJldHVybiBmYWxzZVxuICAgICAgICBpZiAodGhpcy5jb25mLnNob3dUaHVtYm5haWxzID09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgbGV0IHRodW1ibmFpbFBhcmFtcyA9IHRoaXMudGh1bWJuYWlsc1JlbmRlclBhcmFtcztcbiAgICAgICAgdGhpcy50aHVtYm5haWxzU2Nyb2xsZXJMZWZ0TWFyZ2luID0gdGh1bWJuYWlsUGFyYW1zLnRodW1ibmFpbHNTY3JvbGxlckxlZnRNYXJnaW47XG4gICAgfVxuXG4gICAgLy8gZGVib3VuY2VkIHByZXZcbiAgICBwcml2YXRlIGRlYm91bmNlZFByZXYgPSBkZWJvdW5jZSgoKSA9PiB0aGlzLnByZXYoKSwgMTAwLCB7J2xlYWRpbmcnOiB0cnVlLCAndHJhaWxpbmcnOiBmYWxzZX0pO1xuXG4gICAgLy8gZGVib3VuY2VkIG5leHRcbiAgICBwcml2YXRlIGRlYm91bmNlZE5leHQgPSBkZWJvdW5jZSgoKSA9PiB0aGlzLm5leHQoKSwgMTAwLCB7J2xlYWRpbmcnOiB0cnVlLCAndHJhaWxpbmcnOiBmYWxzZX0pO1xuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsXG4gICAgICAgIHByaXZhdGUgZ2FsbGVyeUVsZW06IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgICApIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgLy8gY3JlYXRlIGZpbmFsIGdhbGxlcnkgY29uZmlndXJhdGlvblxuICAgICAgICB0aGlzLnNldEdhbGxlcnlDb25mKHRoaXMuY29uZik7XG5cbiAgICAgICAgLy8gYXBwbHkgYmFja2Ryb3AgY29sb3JcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmdhbGxlcnlFbGVtLm5hdGl2ZUVsZW1lbnQsICdiYWNrZ3JvdW5kLWNvbG9yJywgdGhpcy5jb25mLmJhY2tkcm9wQ29sb3IpO1xuXG4gICAgICAgIC8vIGdhbGxlcnkgaW5saW5lIGNsYXNzIGFuZCBhdXRvIG9wZW5cbiAgICAgICAgaWYgKHRoaXMuY29uZi5pbmxpbmUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5nYWxsZXJ5RWxlbS5uYXRpdmVFbGVtZW50LCAnaW5saW5lJyk7XG4gICAgICAgICAgICB0aGlzLm9wZW4oMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIC8vIHdoZW4gZ2FsbGVyeSBjb25maWd1cmF0aW9uIGNoYW5nZXNcbiAgICAgICAgaWYgKGNoYW5nZXMuY29uZiAmJiBjaGFuZ2VzLmNvbmYuZmlyc3RDaGFuZ2UgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0R2FsbGVyeUNvbmYoY2hhbmdlcy5jb25mLmN1cnJlbnRWYWx1ZSk7XG5cbiAgICAgICAgICAgIC8vIGFwcGx5IGJhY2tkcm9wIGNvbG9yXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZ2FsbGVyeUVsZW0ubmF0aXZlRWxlbWVudCwgJ2JhY2tncm91bmQtY29sb3InLCB0aGlzLmNvbmYuYmFja2Ryb3BDb2xvcik7XG5cbiAgICAgICAgICAgIC8vIGdhbGxlcnkgaW5saW5lIGNsYXNzIGFuZCBhdXRvIG9wZW5cbiAgICAgICAgICAgIGlmICgoY2hhbmdlcy5jb25mLnByZXZpb3VzVmFsdWUuaW5saW5lICE9IHRydWUpICYmIHRoaXMuY29uZi5pbmxpbmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZ2FsbGVyeUVsZW0ubmF0aXZlRWxlbWVudCwgJ2lubGluZScpO1xuICAgICAgICAgICAgICAgIHRoaXMub3BlbigwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHdoZW4gZ2FsbGVyeSBpbWFnZXMgY2hhbmdlc1xuICAgICAgICBpZiAoY2hhbmdlcy5pbWFnZXMgJiYgY2hhbmdlcy5pbWFnZXMuZmlyc3RDaGFuZ2UgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzID0gY2hhbmdlcy5pbWFnZXMuY3VycmVudFZhbHVlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pbWFnZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZUltYWdlKDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvLyBrZXlib2FyZCBldmVudFxuICAgIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzprZXlkb3duJywgWyckZXZlbnQnXSlcbiAgICBwdWJsaWMgb25LZXlib2FyZElucHV0KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmNvbmYucmVhY3RUb0tleWJvYXJkICYmIHRoaXMub3BlbmVkICYmICF0aGlzLmxvYWRpbmcpIHtcbiAgICAgICAgICAgIGlmIChLRVlfQ09ERVNbZXZlbnQua2V5Q29kZV0gPT0gJ1JJR0hUJykge1xuICAgICAgICAgICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoS0VZX0NPREVTW2V2ZW50LmtleUNvZGVdID09ICdMRUZUJykge1xuICAgICAgICAgICAgICAgIHRoaXMucHJldigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoKEtFWV9DT0RFU1tldmVudC5rZXlDb2RlXSA9PSAnRVNDJykgJiYgdGhpcy5jb25mLmNsb3NlT25Fc2MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB3aW5kb3cgcmVzaXplIGV2ZW50XG4gICAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG4gICAgcHVibGljIG9uV2luZG93UmVzaXplKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5vcGVuZWQgJiYgIXRoaXMubG9hZGluZykge1xuICAgICAgICAgICAgdGhpcy5maXRUaHVtYm5haWxzKCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2Nyb2xsVGh1bWJuYWlscygpLCAzMDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIC8vIG9wZW4gZ2FsbGVyeVxuICAgIG9wZW4oaW5kZXg6IG51bWJlciA9IDApIHtcbiAgICAgICAgaWYgKHRoaXMuaW1hZ2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5vcGVuZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAvLyBlbWl0IGV2ZW50XG4gICAgICAgICAgICB0aGlzLm9uT3Blbi5lbWl0KGluZGV4KTtcblxuICAgICAgICAgICAgLy8gYWN0aXZhdGUgaW1hZ2UgYXQgZ2l2ZW4gaW5kZXhcbiAgICAgICAgICAgIHRoaXMuYWN0aXZhdGVJbWFnZShpbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ05vIGltYWdlcyBwcm92aWRlZCB0byBuZ3gtaW1hZ2UtZ2FsbGVyeSEnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNsb3NlIGdhbGxlcnlcbiAgICBjbG9zZSgpIHtcbiAgICAgICAgdGhpcy5vcGVuZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hY3RpdmVJbWFnZUluZGV4ID0gMDtcblxuICAgICAgICAvLyBlbWl0IGV2ZW50XG4gICAgICAgIHRoaXMub25DbG9zZS5lbWl0KCk7XG4gICAgfVxuXG4gICAgLy8gY2hhbmdlIHByZXYgaW1hZ2VcbiAgICBwcmV2KCkge1xuICAgICAgICBpZiAodGhpcy5vbkZpcnN0SW1hZ2UgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZhdGVJbWFnZSh0aGlzLmFjdGl2ZUltYWdlSW5kZXggLSAxKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNoYW5nZSBuZXh0IGltYWdlXG4gICAgbmV4dCgpIHtcbiAgICAgICAgaWYgKHRoaXMub25MYXN0SW1hZ2UgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZhdGVJbWFnZSh0aGlzLmFjdGl2ZUltYWdlSW5kZXggKyAxKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHNldCBpbWFnZSAoYWN0aXZhdGUpXG4gICAgc2V0QWN0aXZlSW1hZ2UoaW5kZXg6IG51bWJlcikge1xuICAgICAgICB0aGlzLmFjdGl2YXRlSW1hZ2UoaW5kZXgpO1xuICAgIH1cblxuICAgIC8vIGRlbGV0ZSBpbWFnZVxuICAgIGRlbGV0ZUltYWdlKGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5vbkRlbGV0ZS5lbWl0KGluZGV4KTtcbiAgICB9XG5cbiAgICAvLyBtb3VzZSB3aGVlbCB1cCAocHJldiBpbWFnZSlcbiAgICBtb3VzZVdoZWVsVXAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbmYucmVhY3RUb01vdXNlV2hlZWwpIHtcbiAgICAgICAgICAgIHRoaXMuZGVib3VuY2VkTmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gbW91c2Ugd2hlZWwgZG93biAobmV4dCBpbWFnZSlcbiAgICBtb3VzZVdoZWVsRG93bigpIHtcbiAgICAgICAgaWYgKHRoaXMuY29uZi5yZWFjdFRvTW91c2VXaGVlbCkge1xuICAgICAgICAgICAgdGhpcy5kZWJvdW5jZWRQcmV2KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjbGljayBvbiBpbWFnZVxuICAgIGNsaWNrT25JbWFnZShpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMub25JbWFnZUNsaWNrZWQuZW1pdChpbmRleCk7XG4gICAgfVxuXG4gICAgLy8gcmlnaHQgY2xpY2sgb24gaW1hZ2VcbiAgICByaWdodENsaWNrT25JbWFnZShldmVudDogRXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmYucmVhY3RUb1JpZ2h0Q2xpY2s7XG4gICAgfVxuXG59XG4iXX0=
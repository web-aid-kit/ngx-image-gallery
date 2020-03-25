"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var lodash_1 = require("lodash");
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
var NgxImageGalleryComponent = (function () {
    /***************************************************/
    function NgxImageGalleryComponent(galleryElem, renderer) {
        var _this = this;
        this.galleryElem = galleryElem;
        this.renderer = renderer;
        // gallery opened memory
        this.opened = false;
        // gallery configuration
        this.conf = {};
        // gallery images
        this.images = [];
        // event emmiters
        this.onOpen = new core_1.EventEmitter();
        this.onClose = new core_1.EventEmitter();
        this.onDelete = new core_1.EventEmitter();
        this.onImageChange = new core_1.EventEmitter();
        this.onImageClicked = new core_1.EventEmitter();
        /***************************************************/
        // loading animation memory
        this.loading = false;
        // current active image index
        this.activeImageIndex = null;
        // thumbnail margin and scroll position
        this.thumbnailMargin = '0px 8px';
        this.thumbnailsScrollerLeftMargin = '0px';
        // adjust thumbnail margin to perfectly fit viewport
        this.fitThumbnails = lodash_1.debounce(function () {
            // if thumbnails not visible, return false
            if (_this.conf.showThumbnails == false)
                return false;
            var thumbnailParams = _this.thumbnailsRenderParams;
            _this.thumbnailMargin = '0 ' + (thumbnailParams.newThumbnailMargin / 2) + 'px';
        }, 300);
        // debounced prev
        this.debouncedPrev = lodash_1.debounce(function () { return _this.prev(); }, 100, { 'leading': true, 'trailing': false });
        // debounced next
        this.debouncedNext = lodash_1.debounce(function () { return _this.next(); }, 100, { 'leading': true, 'trailing': false });
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
        this.conf = lodash_1.assign(DEFAULT_CONF, conf);
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
        })["catch"](function (error) { return console.warn(error); });
    };
    // scroll thumbnails to perfectly position active image thumbnail in viewport
    NgxImageGalleryComponent.prototype.scrollThumbnails = function () {
        // if thumbnails not visible, return false
        if (this.conf.showThumbnails == false)
            return false;
        var thumbnailParams = this.thumbnailsRenderParams;
        this.thumbnailsScrollerLeftMargin = thumbnailParams.thumbnailsScrollerLeftMargin;
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
    return NgxImageGalleryComponent;
}());
__decorate([
    core_1.HostBinding('class.active')
], NgxImageGalleryComponent.prototype, "opened");
__decorate([
    core_1.Input()
], NgxImageGalleryComponent.prototype, "conf");
__decorate([
    core_1.Input()
], NgxImageGalleryComponent.prototype, "images");
__decorate([
    core_1.Output()
], NgxImageGalleryComponent.prototype, "onOpen");
__decorate([
    core_1.Output()
], NgxImageGalleryComponent.prototype, "onClose");
__decorate([
    core_1.Output()
], NgxImageGalleryComponent.prototype, "onDelete");
__decorate([
    core_1.Output()
], NgxImageGalleryComponent.prototype, "onImageChange");
__decorate([
    core_1.Output()
], NgxImageGalleryComponent.prototype, "onImageClicked");
__decorate([
    core_1.ViewChild('thumbnails')
], NgxImageGalleryComponent.prototype, "thumbnailsElem");
__decorate([
    core_1.HostListener('window:keydown', ['$event'])
], NgxImageGalleryComponent.prototype, "onKeyboardInput");
__decorate([
    core_1.HostListener('window:resize', ['$event'])
], NgxImageGalleryComponent.prototype, "onWindowResize");
NgxImageGalleryComponent = __decorate([
    core_1.Component({
        selector: 'ngx-image-gallery',
        templateUrl: './ngx-image-gallery.component.html',
        styleUrls: ['./ngx-image-gallery.component.scss']
    })
], NgxImageGalleryComponent);
exports.NgxImageGalleryComponent = NgxImageGalleryComponent;

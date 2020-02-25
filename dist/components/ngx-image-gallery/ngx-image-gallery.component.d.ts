import { OnInit, ElementRef, Renderer2, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { GALLERY_CONF, GALLERY_IMAGE } from '../../ngx-image-gallery.conf';
import { DomSanitizer } from '@angular/platform-browser';
import * as ɵngcc0 from '@angular/core';
export declare class NgxImageGalleryComponent implements OnInit, OnChanges {
    private galleryElem;
    private sanitizer;
    private renderer;
    opened: boolean;
    conf: GALLERY_CONF;
    images: GALLERY_IMAGE[];
    onOpen: EventEmitter<any>;
    onClose: EventEmitter<any>;
    onDelete: EventEmitter<any>;
    onImageChange: EventEmitter<any>;
    onImageClicked: EventEmitter<any>;
    thumbnailsElem: ElementRef;
    /***************************************************/
    loading: boolean;
    activeImageIndex: number;
    thumbnailMargin: string;
    thumbnailsScrollerLeftMargin: string;
    get activeImage(): GALLERY_IMAGE;
    get onFirstImage(): boolean;
    get onLastImage(): boolean;
    get thumbnailsRenderParams(): {
        thumbnailsInView: number;
        newThumbnailMargin: number;
        newThumbnailSize: number;
        thumbnailsScrollerLeftMargin: any;
    };
    private setGalleryConf;
    private loadImage;
    private activateImage;
    private fitThumbnails;
    private scrollThumbnails;
    private debouncedPrev;
    private debouncedNext;
    /***************************************************/
    constructor(galleryElem: ElementRef, sanitizer: DomSanitizer, renderer: Renderer2);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    onKeyboardInput(event: KeyboardEvent): void;
    onWindowResize(event: Event): void;
    /***************************************************/
    open(index?: number): void;
    close(): void;
    prev(): void;
    next(): void;
    setActiveImage(index: number): void;
    deleteImage(index: number): void;
    mouseWheelUp(): void;
    mouseWheelDown(): void;
    clickOnImage(index: number): void;
    rightClickOnImage(event: Event): boolean;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NgxImageGalleryComponent>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NgxImageGalleryComponent, "ngx-image-gallery", never, {
    "conf": "conf";
    "images": "images";
}, {
    "onOpen": "onOpen";
    "onClose": "onClose";
    "onDelete": "onDelete";
    "onImageChange": "onImageChange";
    "onImageClicked": "onImageClicked";
}, never>;
}

//# sourceMappingURL=ngx-image-gallery.component.d.ts.map
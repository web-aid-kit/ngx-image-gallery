import { OnInit, ElementRef, Renderer2, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { GALLERY_CONF, GALLERY_IMAGE } from '../../ngx-image-gallery.conf';
import { DomSanitizer } from '@angular/platform-browser';
export declare class NgxImageGalleryComponent implements OnInit, OnChanges {
    private galleryElem;
    private sanitizer;
    private renderer;
    opened: boolean;
    conf: GALLERY_CONF;
    images: GALLERY_IMAGE[];
    onOpen: EventEmitter<{}>;
    onClose: EventEmitter<{}>;
    onDelete: EventEmitter<{}>;
    onImageChange: EventEmitter<{}>;
    onImageClicked: EventEmitter<{}>;
    thumbnailsElem: ElementRef;
    /***************************************************/
    loading: boolean;
    activeImageIndex: number;
    thumbnailMargin: string;
    thumbnailsScrollerLeftMargin: string;
    readonly activeImage: GALLERY_IMAGE;
    readonly onFirstImage: boolean;
    readonly onLastImage: boolean;
    readonly thumbnailsRenderParams: {
        thumbnailsInView: number;
        newThumbnailMargin: number;
        newThumbnailSize: number;
        thumbnailsScrollerLeftMargin: any;
    };
    private setGalleryConf(conf);
    private loadImage(index);
    private activateImage(imageIndex);
    private fitThumbnails;
    private scrollThumbnails();
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
}

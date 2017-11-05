import { Component, OnInit, HostBinding, Input, HostListener, ElementRef, Renderer2, EventEmitter, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { assign, findIndex, debounce } from 'lodash';

import { GALLERY_CONF, GALLERY_IMAGE } from './../../ngx-image-gallery.conf';

// key codes to react
const KEY_CODES = {
  37: 'LEFT',
  39: 'RIGHT',
  27: 'ESC'
};

// default gallery configuration
const DEFAULT_CONF: GALLERY_CONF = {
  imageBorderRadius: '3px',
	imageOffset: '20px',
	showDeleteControl: false,
	showCloseControl: true,
	showExtUrlControl: true,
	showImageTitle: true,
	showThumbnails: true,
  thumbnailsLength: 6
};

@Component({
  selector: 'ngx-image-gallery',
  templateUrl: './ngx-image-gallery.component.html',
  styleUrls: ['./ngx-image-gallery.component.scss']
})
export class NgxImageGalleryComponent implements OnInit, OnChanges {

  // gallery opened memory
  @HostBinding('class.active') opened: boolean = false;

  // gallery configuration
  @Input() conf: GALLERY_CONF = {};

  // gallery images
  @Input() images: GALLERY_IMAGE[] = [];

  // event emmiters
  @Output() onOpen = new EventEmitter();
  @Output() onClose = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  @Output() onImageChange = new EventEmitter();

  // thumbnails container
  @ViewChild('thumbnails') thumbnailsElem: ElementRef;

  /***************************************************/
  
  // loading animation memory
  loading: boolean = false;

  // current active image index
  activeImageIndex: number = null;

  // thumbnail margin and scroll position
  thumbnailMargin: string = '0px 8px';
  thumbnailsScrollerLeftMargin: string = '0px';

  // set gallery configuration
  setGalleryConf(conf: GALLERY_CONF) {
    this.conf = assign(DEFAULT_CONF, conf);
  }

  // active image
  get activeImage(): GALLERY_IMAGE {
    return this.images[this.activeImageIndex];
  }

  // if gallery is on : first image
  get onFirstImage(): boolean {
    return this.activeImageIndex == 0;
  }

  // if gallery is on : last image
  get onLastImage(): boolean {
    return this.activeImageIndex == (this.images.length - 1);
  }

  // get thumbnails viewport rendering parameters
  get thumbnailsRenderParams(): {thumbnailsInView: number, newThumbnailMargin: number, newThumbnailSize: number, thumbnailsScrollerLeftMargin: any} {
    let thumbnailsContainerWidth = this.thumbnailsElem.nativeElement.offsetWidth;

    let thumbnailMargin = 16;
    let thumbnailSize = thumbnailMargin + 30; // 30px thumbnail size
    let thumbnailsInView = Math.floor(thumbnailsContainerWidth / thumbnailSize);
    let extraSpaceInThumbnailsContainer = thumbnailsContainerWidth - (thumbnailsInView * thumbnailSize);
    let extraMargin = extraSpaceInThumbnailsContainer / thumbnailsInView;

    let newThumbnailMargin = thumbnailMargin + extraMargin;
    let newThumbnailSize = newThumbnailMargin + 30;

    let relativePositionOfActiveImageThumbnailToScroller = thumbnailsInView - (thumbnailsInView - this.activeImageIndex);
    let thumbnailsScrollerLeftMargin: any;

    if(relativePositionOfActiveImageThumbnailToScroller > thumbnailsInView - 2){
      var outThumbnails = ((this.activeImageIndex + 1) - thumbnailsInView) + 1;

      if(this.activeImageIndex != (this.images.length - 1)){
        thumbnailsScrollerLeftMargin = '-' + (newThumbnailSize * outThumbnails) + 'px';
      }
      else{
        thumbnailsScrollerLeftMargin = '-' + (newThumbnailSize * (outThumbnails - 1)) + 'px';
      }
    }
    else{
      thumbnailsScrollerLeftMargin = '0px';
    }

    return {
      thumbnailsInView,
      newThumbnailMargin,
      newThumbnailSize,
      thumbnailsScrollerLeftMargin
    };
  }

  // load image and return promise
  private loadImage(index: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.loading = true;

      const galleryImage: GALLERY_IMAGE = this.images[index];
      let image = new Image();
      image.src = galleryImage.url;

      image.onload = () => {
        this.loading = false;
        resolve(index);
      };

      image.onerror = (error) => {
        this.loading = false;
        reject(error);
      };
    });
  }

  // activate image (set active image)
  private activateImage(imageIndex: number) {
    // emit event
    this.onImageChange.emit(imageIndex);

    this.loadImage(imageIndex)
    .then(_imageIndex => {
      this.activeImageIndex = _imageIndex;

      // scroll thumbnails
      setTimeout(() => {
        this.resizeThumbnails();
        this.scrollThumbnails();
      });
    })
    .catch(error => console.warn(error));
  }

  // resize thumbnails to perfectly fit viewport
  private resizeThumbnails = debounce(() => {
    let thumbnailParams = this.thumbnailsRenderParams;
    this.thumbnailMargin = '0 ' + (thumbnailParams.newThumbnailMargin/2) + 'px';
  }, 300);

  // scroll thumbnails to perfectly position active image thumbnail in viewport
  private scrollThumbnails() {
    let thumbnailParams = this.thumbnailsRenderParams;
    this.thumbnailsScrollerLeftMargin = thumbnailParams.thumbnailsScrollerLeftMargin;
  }

  // keyboard event
  @HostListener('window:keydown', ['$event'])
  private onKeyboardInput(event: KeyboardEvent) {
    if(this.opened && !this.loading) {
      if(KEY_CODES[event.keyCode] == 'RIGHT'){
        this.next();
      }
      else if(KEY_CODES[event.keyCode] == 'LEFT'){
        this.prev();
      }
      else if(KEY_CODES[event.keyCode] == 'ESC'){
        this.close();
      }
    }
  }

  // window resize event
  @HostListener('window:resize', ['$event'])
  private onWindowResize(event: Event) {
    if(this.opened && !this.loading) {
      this.resizeThumbnails();
      this.scrollThumbnails();
    }
  }

  /***************************************************/

  constructor(
    private galleryElem: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    // create final gallery configuration
    this.setGalleryConf(this.conf);
  }

  ngOnChanges(changes: SimpleChanges) {

    // when gallery configuration changes
    if(changes.conf && changes.conf.firstChange == false) {
      this.setGalleryConf(changes.conf.currentValue);
    }

    // when gallery images changes
    if(changes.images && changes.images.firstChange == false) {
      this.images = changes.images.currentValue;
      this.activateImage(0);
    }
    
  }

  /***************************************************/

  // open gallery
  open(index: number = 0) {
    if(this.images.length) {
      this.opened = true;

      // emit event
      this.onOpen.emit(index);

      // activate image at given index
      this.activateImage(index);
    }
    else{
      console.warn('No images provided to ngx-image-gallery!');
    }
  }

  // close gallery
  close() {
    this.opened = false;
    this.activeImageIndex = 0;

    // emit event
    this.onClose.emit();
  }

  // change prev image
  prev() {
    if(this.onFirstImage == false){
      this.activateImage(this.activeImageIndex - 1);
    }
  }

  // change next image
  next() {
    if(this.onLastImage == false){
      this.activateImage(this.activeImageIndex + 1);
    }
  }

  // set image (activate)
  setActiveImage(index: number) {
    this.activateImage(index);
  }

  // delete image
  deleteImage(index: number) {
    this.onDelete.emit(index);
  }

}

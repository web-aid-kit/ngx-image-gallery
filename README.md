# Need maintainers
Due to my hectic schedule, it is getting hard to maintain this repository. If anybody is interested to work on this project, please give a pull request to fix some critical issues and enhancements.

---

# ngx-image-gallery
Probably the best Angular 4+ modal and inline image gallery. Angular upgrade for ng-image-gallery.

[![preview](https://i.imgur.com/1gGxBLd.jpg)](https://thatisuday.github.io)

[![npm](https://img.shields.io/npm/dt/ngx-image-gallery.svg?style=flat-square)](https://www.npmjs.com/package/ngx-image-gallery)
[![npm](https://img.shields.io/npm/v/ngx-image-gallery.svg?style=flat-square)](https://www.npmjs.com/package/ngx-image-gallery)
[![David](https://img.shields.io/david/thatisuday/ngx-image-gallery.svg?style=flat-square)](https://www.npmjs.com/package/ngx-image-gallery)
[![preview](https://img.shields.io/badge/preview-click_here-green.svg?style=flat-square)](https://thatisuday.github.io/ngx-image-gallery)

## Prerequisites

- Hammerjs (required for swipe) 
```
npm i -s hammerjs
```

Then import hammerjs into your project (tip: in you main.ts file), e.g:
```
import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
    platformBrowserDynamic().bootstrapModule(AppModule)
        .catch(err => console.log(err));
});

```


## Install
```bash
npm install --save ngx-image-gallery
```

## Import
```typescript
import { NgxImageGalleryModule } from 'ngx-image-gallery';

@NgModule({
  ...,
  imports: [
    NgxImageGalleryModule,
    ...
  ]
})
export class AppModule { }
```

## Use

```html
// app.component.html

<ngx-image-gallery 
[images]="images" 
[conf]="conf"
(onOpen)="galleryOpened($event)"
(onClose)="galleryClosed()"
(onImageClicked)="galleryImageClicked($event)"
(onImageChange)="galleryImageChanged($event)"
(onDelete)="deleteImage($event)"
></ngx-image-gallery>
```

## Configure
```ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxImageGalleryComponent, GALLERY_IMAGE, GALLERY_CONF } from "ngx-image-gallery";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // get reference to gallery component
  @ViewChild(NgxImageGalleryComponent) ngxImageGallery: NgxImageGalleryComponent;
  
  // gallery configuration
  conf: GALLERY_CONF = {
    imageOffset: '0px',
    showDeleteControl: false,
    showImageTitle: false,
  };
	
  // gallery images
  images: GALLERY_IMAGE[] = [
    {
      url: "https://images.pexels.com/photos/669013/pexels-photo-669013.jpeg?w=1260", 
      altText: 'woman-in-black-blazer-holding-blue-cup', 
      title: 'woman-in-black-blazer-holding-blue-cup',
      thumbnailUrl: "https://images.pexels.com/photos/669013/pexels-photo-669013.jpeg?w=60"
    },
    {
      url: "https://images.pexels.com/photos/669006/pexels-photo-669006.jpeg?w=1260", 
      altText: 'two-woman-standing-on-the-ground-and-staring-at-the-mountain', 
      extUrl: 'https://www.pexels.com/photo/two-woman-standing-on-the-ground-and-staring-at-the-mountain-669006/',
      thumbnailUrl: "https://images.pexels.com/photos/669006/pexels-photo-669006.jpeg?w=60"
    },
  ];

  constructor(){}

  ngOnInit() {}
	
  // METHODS
  // open gallery
  openGallery(index: number = 0) {
    this.ngxImageGallery.open(index);
  }
	
  // close gallery
  closeGallery() {
    this.ngxImageGallery.close();
  }
	
  // set new active(visible) image in gallery
  newImage(index: number = 0) {
    this.ngxImageGallery.setActiveImage(index);
  }
	
  // next image in gallery
  nextImage(index: number = 0) {
    this.ngxImageGallery.next();
  }
	
  // prev image in gallery
  prevImage(index: number = 0) {
    this.ngxImageGallery.prev();
  }
	
  /**************************************************/
	
  // EVENTS
  // callback on gallery opened
  galleryOpened(index) {
    console.info('Gallery opened at index ', index);
  }

  // callback on gallery closed
  galleryClosed() {
    console.info('Gallery closed.');
  }

  // callback on gallery image clicked
  galleryImageClicked(index) {
    console.info('Gallery image clicked with index ', index);
  }
  
  // callback on gallery image changed
  galleryImageChanged(index) {
    console.info('Gallery image changed to index ', index);
  }

  // callback on user clicked delete button
  deleteImage(index) {
    console.info('Delete image at index ', index);
  }
}
```

### Interfaces
```ts
// gallery configuration
export interface GALLERY_CONF {
  imageBorderRadius?: string; // css border radius of image (default 3px)
  imageOffset?: string; // add gap between image and it's container (default 20px)
  imagePointer? :boolean; // show a pointer on image, should be true when handling onImageClick event (default false)
  showDeleteControl?: boolean; // show image delete icon (default false)
  showCloseControl?: boolean; // show gallery close icon (default true)
  showExtUrlControl?: boolean; // show image external url icon (default true)
  showImageTitle?: boolean; // show image title text (default true)
  showThumbnails?: boolean; // show thumbnails (default true)
  closeOnEsc?: boolean; // close gallery on `Esc` button press (default true)
  reactToKeyboard?: boolean; // change image on keyboard arrow press (default true)
  reactToMouseWheel?: boolean; // change image on mouse wheel scroll (default true)
  reactToRightClick?: boolean; // disable right click on gallery (default false)
  thumbnailSize?: number; // thumbnail size (default 30)
  backdropColor?: string; // gallery backdrop (background) color (default rgba(13,13,14,0.85))
  inline?: boolean; // make gallery inline (default false)
  showArrows?: boolean; // show prev / next arrows (default true)
}

// gallery image
export interface GALLERY_IMAGE {
  url: string; // url of the image
  thumbnailUrl?: string; // thumbnail url (recommended), if not present, gallery will use `url` property to get thumbnail image.
  altText?: string; // alt text for image
  title?: string; // title of the image
  extUrl?: string; // external url of image
  extUrlTarget?: string; // external url target e.g. '_blank', '_self' etc.
}
```

> All properties ending with `?` are optional.

# Make gallery inline
You can make gallery **inline** like a carousel by setting `conf.inline` to `true` but make sure to change `conf.backdropColor` as well if you need white backdrop color. Also `width` and `height` of the gallery can be adjusted by manually applying css styles with `!important` flag on gallery element.

# Dynamic Update
You can update gallery images `images` and gallery configuration `conf` anytime you want even when gallery is opened but due to Angular's change detection restrictions you must assign these variable to new value instead of changing internal properties as mentioned below. 

```ts
// change images
this.images = this.images.concat([...]);

// change conf
this.conf = {...};
```

# Demo App
![Demo App's Screenshot](./assets/screenshot_demo_app.png)
+ clone or fork this repo
+ run the demo app by running `npm run demo`
+ Finally, navigate to `http://localhost:4200/`

# Copyrights
Integrate or build upon it for free in your personal or commercial projects. Don't republish, redistribute or sell "as-is". We would appreciate if you contact us at `thatisuday@gmail.com` (if you are a business, institution or organization) so that we can mention your name in **users list** on this page.

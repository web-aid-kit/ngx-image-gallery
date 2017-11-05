import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'hammerjs';

import { NgxImageGalleryComponent } from './components/ngx-image-gallery/ngx-image-gallery.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgxImageGalleryComponent
  ],
  exports: [
    NgxImageGalleryComponent
  ]
})
export class NgxImageGalleryModule { }

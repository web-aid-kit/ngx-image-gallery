import { ClickOutsideDirective } from './directives/click-outside.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'hammerjs';

import { NgxImageGalleryComponent } from './components/ngx-image-gallery/ngx-image-gallery.component';
import { MouseWheelDirective } from './directives/mousewheel.directive';

@NgModule({
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
})
export class NgxImageGalleryModule { }

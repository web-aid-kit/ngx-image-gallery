import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// import 'hammerjs';

import {NgxImageGalleryComponent} from './components/ngx-image-gallery/ngx-image-gallery.component';
import {ClickOutsideDirective} from './directives/click-outside.directive';
import {MouseWheelDirective} from './directives/mousewheel.directive';

export * from './components/ngx-image-gallery/ngx-image-gallery.component';
export * from './directives/click-outside.directive';
export * from './directives/mousewheel.directive';
export * from './ngx-image-gallery.conf';


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
export class NgxImageGalleryModule {
}

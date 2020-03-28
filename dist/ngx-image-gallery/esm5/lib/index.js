import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxImageGalleryComponent } from './components/ngx-image-gallery/ngx-image-gallery.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { MouseWheelDirective } from './directives/mousewheel.directive';
export * from './components/ngx-image-gallery/ngx-image-gallery.component';
export * from './directives/click-outside.directive';
export * from './directives/mousewheel.directive';
var NgxImageGalleryModule = /** @class */ (function () {
    function NgxImageGalleryModule() {
    }
    NgxImageGalleryModule = __decorate([
        NgModule({
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
    ], NgxImageGalleryModule);
    return NgxImageGalleryModule;
}());
export { NgxImageGalleryModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtaW1hZ2UtZ2FsbGVyeS8iLCJzb3VyY2VzIjpbImxpYi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFN0MsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sNERBQTRELENBQUM7QUFDcEcsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDM0UsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFFdEUsY0FBYyw0REFBNEQsQ0FBQztBQUMzRSxjQUFjLHNDQUFzQyxDQUFDO0FBQ3JELGNBQWMsbUNBQW1DLENBQUM7QUFrQmxEO0lBQUE7SUFDQSxDQUFDO0lBRFkscUJBQXFCO1FBZmpDLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRTtnQkFDTCxZQUFZO2FBQ2Y7WUFDRCxZQUFZLEVBQUU7Z0JBQ1Ysd0JBQXdCO2dCQUN4QixtQkFBbUI7Z0JBQ25CLHFCQUFxQjthQUN4QjtZQUNELE9BQU8sRUFBRTtnQkFDTCx3QkFBd0I7Z0JBQ3hCLG1CQUFtQjtnQkFDbkIscUJBQXFCO2FBQ3hCO1NBQ0osQ0FBQztPQUNXLHFCQUFxQixDQUNqQztJQUFELDRCQUFDO0NBQUEsQUFERCxJQUNDO1NBRFkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHtOZ3hJbWFnZUdhbGxlcnlDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9uZ3gtaW1hZ2UtZ2FsbGVyeS9uZ3gtaW1hZ2UtZ2FsbGVyeS5jb21wb25lbnQnO1xuaW1wb3J0IHtDbGlja091dHNpZGVEaXJlY3RpdmV9IGZyb20gJy4vZGlyZWN0aXZlcy9jbGljay1vdXRzaWRlLmRpcmVjdGl2ZSc7XG5pbXBvcnQge01vdXNlV2hlZWxEaXJlY3RpdmV9IGZyb20gJy4vZGlyZWN0aXZlcy9tb3VzZXdoZWVsLmRpcmVjdGl2ZSc7XG5cbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9uZ3gtaW1hZ2UtZ2FsbGVyeS9uZ3gtaW1hZ2UtZ2FsbGVyeS5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9kaXJlY3RpdmVzL2NsaWNrLW91dHNpZGUuZGlyZWN0aXZlJztcbmV4cG9ydCAqIGZyb20gJy4vZGlyZWN0aXZlcy9tb3VzZXdoZWVsLmRpcmVjdGl2ZSc7XG5leHBvcnQgKiBmcm9tICcuL25neC1pbWFnZS1nYWxsZXJ5LmNvbmYnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgTmd4SW1hZ2VHYWxsZXJ5Q29tcG9uZW50LFxuICAgICAgICBNb3VzZVdoZWVsRGlyZWN0aXZlLFxuICAgICAgICBDbGlja091dHNpZGVEaXJlY3RpdmVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgTmd4SW1hZ2VHYWxsZXJ5Q29tcG9uZW50LFxuICAgICAgICBNb3VzZVdoZWVsRGlyZWN0aXZlLFxuICAgICAgICBDbGlja091dHNpZGVEaXJlY3RpdmVcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE5neEltYWdlR2FsbGVyeU1vZHVsZSB7XG59XG4iXX0=
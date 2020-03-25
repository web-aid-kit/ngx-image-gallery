import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'hammerjs';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtaW1hZ2UtZ2FsbGVyeS8iLCJzb3VyY2VzIjpbImxpYi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxVQUFVLENBQUM7QUFFbEIsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sNERBQTRELENBQUM7QUFDcEcsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDM0UsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFFdEUsY0FBYyw0REFBNEQsQ0FBQztBQUMzRSxjQUFjLHNDQUFzQyxDQUFDO0FBQ3JELGNBQWMsbUNBQW1DLENBQUM7QUFrQmxEO0lBQUE7SUFDQSxDQUFDO0lBRFkscUJBQXFCO1FBZmpDLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRTtnQkFDTCxZQUFZO2FBQ2Y7WUFDRCxZQUFZLEVBQUU7Z0JBQ1Ysd0JBQXdCO2dCQUN4QixtQkFBbUI7Z0JBQ25CLHFCQUFxQjthQUN4QjtZQUNELE9BQU8sRUFBRTtnQkFDTCx3QkFBd0I7Z0JBQ3hCLG1CQUFtQjtnQkFDbkIscUJBQXFCO2FBQ3hCO1NBQ0osQ0FBQztPQUNXLHFCQUFxQixDQUNqQztJQUFELDRCQUFDO0NBQUEsQUFERCxJQUNDO1NBRFkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCAnaGFtbWVyanMnO1xuXG5pbXBvcnQge05neEltYWdlR2FsbGVyeUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL25neC1pbWFnZS1nYWxsZXJ5L25neC1pbWFnZS1nYWxsZXJ5LmNvbXBvbmVudCc7XG5pbXBvcnQge0NsaWNrT3V0c2lkZURpcmVjdGl2ZX0gZnJvbSAnLi9kaXJlY3RpdmVzL2NsaWNrLW91dHNpZGUuZGlyZWN0aXZlJztcbmltcG9ydCB7TW91c2VXaGVlbERpcmVjdGl2ZX0gZnJvbSAnLi9kaXJlY3RpdmVzL21vdXNld2hlZWwuZGlyZWN0aXZlJztcblxuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL25neC1pbWFnZS1nYWxsZXJ5L25neC1pbWFnZS1nYWxsZXJ5LmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2RpcmVjdGl2ZXMvY2xpY2stb3V0c2lkZS5kaXJlY3RpdmUnO1xuZXhwb3J0ICogZnJvbSAnLi9kaXJlY3RpdmVzL21vdXNld2hlZWwuZGlyZWN0aXZlJztcbmV4cG9ydCAqIGZyb20gJy4vbmd4LWltYWdlLWdhbGxlcnkuY29uZic7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBOZ3hJbWFnZUdhbGxlcnlDb21wb25lbnQsXG4gICAgICAgIE1vdXNlV2hlZWxEaXJlY3RpdmUsXG4gICAgICAgIENsaWNrT3V0c2lkZURpcmVjdGl2ZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBOZ3hJbWFnZUdhbGxlcnlDb21wb25lbnQsXG4gICAgICAgIE1vdXNlV2hlZWxEaXJlY3RpdmUsXG4gICAgICAgIENsaWNrT3V0c2lkZURpcmVjdGl2ZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4SW1hZ2VHYWxsZXJ5TW9kdWxlIHtcbn1cbiJdfQ==
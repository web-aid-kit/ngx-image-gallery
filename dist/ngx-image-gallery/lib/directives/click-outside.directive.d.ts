import { ElementRef, EventEmitter } from '@angular/core';
export declare class ClickOutsideDirective {
    private _elementRef;
    clickOutside: EventEmitter<any>;
    constructor(_elementRef: ElementRef);
    onClick($event: any, targetElement: any): void;
}

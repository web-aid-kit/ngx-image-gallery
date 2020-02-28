import { EventEmitter } from '@angular/core';
export declare class MouseWheelDirective {
    mouseWheelUp: EventEmitter<any>;
    mouseWheelDown: EventEmitter<any>;
    onMouseWheelChrome(event: any): void;
    onMouseWheelFirefox(event: any): void;
    onMouseWheelIE(event: any): void;
    mouseWheelFunc(event: any): void;
}

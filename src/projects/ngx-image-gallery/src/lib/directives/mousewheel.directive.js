"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var MouseWheelDirective = (function () {
    function MouseWheelDirective() {
        this.mouseWheelUp = new core_1.EventEmitter();
        this.mouseWheelDown = new core_1.EventEmitter();
    }
    MouseWheelDirective.prototype.onMouseWheelChrome = function (event) {
        this.mouseWheelFunc(event);
    };
    MouseWheelDirective.prototype.onMouseWheelFirefox = function (event) {
        this.mouseWheelFunc(event);
    };
    MouseWheelDirective.prototype.onMouseWheelIE = function (event) {
        this.mouseWheelFunc(event);
    };
    MouseWheelDirective.prototype.mouseWheelFunc = function (event) {
        var event = window.event || event; // old IE support
        var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
        if (delta > 0) {
            this.mouseWheelUp.emit(event);
        }
        else if (delta < 0) {
            this.mouseWheelDown.emit(event);
        }
        // for IE
        event.returnValue = false;
        // for Chrome and Firefox
        if (event.preventDefault) {
            event.preventDefault();
        }
    };
    return MouseWheelDirective;
}());
__decorate([
    core_1.Output()
], MouseWheelDirective.prototype, "mouseWheelUp");
__decorate([
    core_1.Output()
], MouseWheelDirective.prototype, "mouseWheelDown");
__decorate([
    core_1.HostListener('mousewheel', ['$event'])
], MouseWheelDirective.prototype, "onMouseWheelChrome");
__decorate([
    core_1.HostListener('DOMMouseScroll', ['$event'])
], MouseWheelDirective.prototype, "onMouseWheelFirefox");
__decorate([
    core_1.HostListener('onmousewheel', ['$event'])
], MouseWheelDirective.prototype, "onMouseWheelIE");
MouseWheelDirective = __decorate([
    core_1.Directive({ selector: '[mouseWheel]' })
], MouseWheelDirective);
exports.MouseWheelDirective = MouseWheelDirective;

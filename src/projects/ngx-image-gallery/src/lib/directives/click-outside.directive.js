"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var ClickOutsideDirective = (function () {
    function ClickOutsideDirective(_elementRef) {
        this._elementRef = _elementRef;
        this.clickOutside = new core_1.EventEmitter();
    }
    ClickOutsideDirective.prototype.onClick = function ($event, targetElement) {
        var isClickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!isClickedInside) {
            this.clickOutside.emit($event);
        }
    };
    return ClickOutsideDirective;
}());
__decorate([
    core_1.Output()
], ClickOutsideDirective.prototype, "clickOutside");
__decorate([
    core_1.HostListener('document:click', ['$event', '$event.target'])
], ClickOutsideDirective.prototype, "onClick");
ClickOutsideDirective = __decorate([
    core_1.Directive({
        selector: '[clickOutside]'
    })
], ClickOutsideDirective);
exports.ClickOutsideDirective = ClickOutsideDirective;

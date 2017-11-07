webpackJsonp([1,4],{

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(24)(false);
// imports


// module
exports.push([module.i, "@-webkit-keyframes zoomScaleIn {\n  0% {\n    -webkit-transform: scale(0.99);\n            transform: scale(0.99);\n    opacity: 0; }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1; } }\n\n@keyframes zoomScaleIn {\n  0% {\n    -webkit-transform: scale(0.99);\n            transform: scale(0.99);\n    opacity: 0; }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1; } }\n\n@-webkit-keyframes thumbShadowAnimation {\n  0% {\n    box-shadow: 0 0 3px 2px rgba(255, 255, 255, 0.05); }\n  100% {\n    box-shadow: 0 0 3px 2px rgba(255, 255, 255, 0.2); } }\n\n@keyframes thumbShadowAnimation {\n  0% {\n    box-shadow: 0 0 3px 2px rgba(255, 255, 255, 0.05); }\n  100% {\n    box-shadow: 0 0 3px 2px rgba(255, 255, 255, 0.2); } }\n\n@-webkit-keyframes clickFeedback1 {\n  0% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.5, 0.5, 1);\n            transform: scale3d(0.5, 0.5, 1); }\n  100% {\n    opacity: 0;\n    -webkit-transform: scale3d(1.1, 1.1, 1);\n            transform: scale3d(1.1, 1.1, 1); } }\n\n@keyframes clickFeedback1 {\n  0% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.5, 0.5, 1);\n            transform: scale3d(0.5, 0.5, 1); }\n  100% {\n    opacity: 0;\n    -webkit-transform: scale3d(1.1, 1.1, 1);\n            transform: scale3d(1.1, 1.1, 1); } }\n\n@-webkit-keyframes clickFeedback2 {\n  0% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.5, 0.5, 1);\n            transform: scale3d(0.5, 0.5, 1); }\n  50% {\n    opacity: 0;\n    -webkit-transform: scale3d(1.2, 1.2, 1);\n            transform: scale3d(1.2, 1.2, 1); }\n  100% {\n    opacity: 0;\n    -webkit-transform: scale3d(1.2, 1.2, 1);\n            transform: scale3d(1.2, 1.2, 1); } }\n\n@keyframes clickFeedback2 {\n  0% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.5, 0.5, 1);\n            transform: scale3d(0.5, 0.5, 1); }\n  50% {\n    opacity: 0;\n    -webkit-transform: scale3d(1.2, 1.2, 1);\n            transform: scale3d(1.2, 1.2, 1); }\n  100% {\n    opacity: 0;\n    -webkit-transform: scale3d(1.2, 1.2, 1);\n            transform: scale3d(1.2, 1.2, 1); } }\n\n.feedback {\n  position: absolute;\n  z-index: 1;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0; }\n  .feedback:before, .feedback:after {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    margin: -30px 0 0 -30px;\n    width: 60px;\n    height: 60px;\n    border-radius: 50%;\n    content: '';\n    opacity: 0;\n    pointer-events: none;\n    box-shadow: 0 0 0 2px rgba(111, 148, 182, 0.5); }\n  .feedback:active:before {\n    -webkit-animation: clickFeedback1 0.5s forwards;\n            animation: clickFeedback1 0.5s forwards; }\n  .feedback:active:after {\n    -webkit-animation: clickFeedback2 0.5s forwards;\n            animation: clickFeedback2 0.5s forwards; }\n\n/**************************************************/\n:host {\n  display: none;\n  position: fixed;\n  z-index: 10000;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0; }\n  :host.inline {\n    display: block;\n    position: relative;\n    width: 100%;\n    height: 500px; }\n  :host.active {\n    display: block; }\n  :host > .galleria {\n    position: absolute;\n    left: 80px;\n    right: 80px;\n    top: 0;\n    bottom: 0;\n    z-index: 1;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-animation: zoomScaleIn 0.2s 1 forwards;\n            animation: zoomScaleIn 0.2s 1 forwards; }\n    :host > .galleria > .images-container {\n      -webkit-box-flex: 1;\n          -ms-flex: 1;\n              flex: 1;\n      width: 100%;\n      position: relative; }\n      :host > .galleria > .images-container > .image {\n        position: absolute;\n        left: 0;\n        right: 0;\n        top: 0;\n        bottom: 0;\n        display: none; }\n        :host > .galleria > .images-container > .image.active {\n          display: block; }\n        :host > .galleria > .images-container > .image > img {\n          position: absolute;\n          left: 0;\n          right: 0;\n          top: 0;\n          bottom: 0;\n          margin: auto;\n          max-width: 100%;\n          max-height: 100%;\n          -webkit-animation: zoomScaleIn 0.2s 1 forwards;\n                  animation: zoomScaleIn 0.2s 1 forwards;\n          backface-visibility: hidden;\n          -webkit-backface-visibility: hidden;\n          -webkit-touch-callout: none;\n          -webkit-user-select: none;\n          -moz-user-select: none;\n          -ms-user-select: none;\n          user-select: none;\n          user-drag: none;\n          -webkit-user-drag: none; }\n      :host > .galleria > .images-container > .loading-animation {\n        position: absolute;\n        left: 0;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        z-index: 100;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-pack: center;\n            -ms-flex-pack: center;\n                justify-content: center;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center; }\n        :host > .galleria > .images-container > .loading-animation > svg {\n          -webkit-box-flex: 0;\n              -ms-flex: none;\n                  flex: none;\n          width: 100px;\n          height: 100px; }\n    :host > .galleria > .info-container {\n      -webkit-box-flex: 0;\n          -ms-flex: none;\n              flex: none;\n      width: 100%;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: column;\n              flex-direction: column;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n      :host > .galleria > .info-container > .title {\n        padding-top: 30px;\n        line-height: 1.4;\n        font-size: 13px;\n        color: #fff;\n        text-align: center;\n        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; }\n      :host > .galleria > .info-container > .thumbnails {\n        padding-top: 20px;\n        padding-bottom: 20px;\n        overflow: hidden;\n        white-space: nowrap;\n        width: auto;\n        margin: 0 auto;\n        max-width: 100%; }\n        :host > .galleria > .info-container > .thumbnails .thumbnails-scroller {\n          white-space: nowrap;\n          transition: all 0.3s ease; }\n          :host > .galleria > .info-container > .thumbnails .thumbnails-scroller > .thumbnail {\n            display: inline-block;\n            border-radius: 100%;\n            vertical-align: middle;\n            background-color: #999;\n            opacity: 0.5;\n            -webkit-filter: grayscale(100%);\n                    filter: grayscale(100%);\n            background-size: cover;\n            background-position: center top;\n            cursor: pointer;\n            position: relative;\n            -webkit-tap-highlight-color: transparent;\n            outline: none;\n            transition: all 0.3s ease;\n            backface-visibility: hidden;\n            -webkit-backface-visibility: hidden;\n            -webkit-touch-callout: none;\n            -webkit-user-select: none;\n            -moz-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n            user-drag: none;\n            -webkit-user-drag: none; }\n            :host > .galleria > .info-container > .thumbnails .thumbnails-scroller > .thumbnail.active, :host > .galleria > .info-container > .thumbnails .thumbnails-scroller > .thumbnail:hover {\n              -webkit-filter: grayscale(30%);\n                      filter: grayscale(30%); }\n              :host > .galleria > .info-container > .thumbnails .thumbnails-scroller > .thumbnail.active:after, :host > .galleria > .info-container > .thumbnails .thumbnails-scroller > .thumbnail:hover:after {\n                content: \"\";\n                display: block;\n                position: absolute;\n                left: -3px;\n                top: -3px;\n                right: -3px;\n                bottom: -3px;\n                border-radius: 100%;\n                overflow: hidden;\n                -webkit-animation: thumbShadowAnimation 1s infinite alternate;\n                        animation: thumbShadowAnimation 1s infinite alternate; }\n            :host > .galleria > .info-container > .thumbnails .thumbnails-scroller > .thumbnail.active {\n              opacity: 1;\n              -webkit-filter: grayscale(0%);\n                      filter: grayscale(0%); }\n  :host > .control {\n    z-index: 20;\n    backface-visibility: hidden;\n    -webkit-backface-visibility: hidden;\n    -webkit-touch-callout: none;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n    user-drag: none;\n    -webkit-user-drag: none; }\n    :host > .control.arrow {\n      position: absolute;\n      top: 50%;\n      margin-top: -25px;\n      width: 50px;\n      height: 50px;\n      background-size: 100% 100%;\n      background-repeat: no-repeat;\n      overflow: hidden;\n      cursor: pointer;\n      transition: all 100ms ease; }\n      :host > .control.arrow.disabled {\n        opacity: 0.3; }\n      :host > .control.arrow:not(.disabled):active {\n        width: 60px; }\n      :host > .control.arrow.left {\n        left: 0;\n        background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDc3LjE3NSA0NzcuMTc1IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NzcuMTc1IDQ3Ny4xNzU7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPg0KPGc+DQoJPHBhdGggZD0iTTE0NS4xODgsMjM4LjU3NWwyMTUuNS0yMTUuNWM1LjMtNS4zLDUuMy0xMy44LDAtMTkuMXMtMTMuOC01LjMtMTkuMSwwbC0yMjUuMSwyMjUuMWMtNS4zLDUuMy01LjMsMTMuOCwwLDE5LjFsMjI1LjEsMjI1ICAgYzIuNiwyLjYsNi4xLDQsOS41LDRzNi45LTEuMyw5LjUtNGM1LjMtNS4zLDUuMy0xMy44LDAtMTkuMUwxNDUuMTg4LDIzOC41NzV6IiBmaWxsPSIjRkZGRkZGIi8+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==\"); }\n        :host > .control.arrow.left.dark {\n          background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkNhcGFfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZmlsbD0iIzk5OTk5OSIgZD0iTTE1NS43ODQsMjU1Ljk4NkwzODcuMDEyLDI0Ljc1OWM1LjY4Ny01LjY4Nyw1LjY4Ny0xNC44MDcsMC0yMC40OTRjLTUuNjg4LTUuNjg3LTE0LjgwNy01LjY4Ny0yMC40OTQsMA0KCQlMMTI0Ljk4OSwyNDUuNzkzYy01LjY4Nyw1LjY4Ny01LjY4NywxNC44MDcsMCwyMC40OTRsMjQxLjUyOCwyNDEuNDIxYzIuNzksMi43OSw2LjU0NSw0LjI5MiwxMC4xOTMsNC4yOTINCgkJczcuNDAzLTEuMzk1LDEwLjE5My00LjI5MmM1LjY4Ny01LjY4Nyw1LjY4Ny0xNC44MDcsMC0yMC40OTRMMTU1Ljc4NCwyNTUuOTg2eiIvPg0KPC9nPg0KPC9zdmc+DQo=\"); }\n      :host > .control.arrow.right {\n        right: 0;\n        background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDc3LjE3NSA0NzcuMTc1IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NzcuMTc1IDQ3Ny4xNzU7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPg0KPGc+DQoJPHBhdGggZD0iTTM2MC43MzEsMjI5LjA3NWwtMjI1LjEtMjI1LjFjLTUuMy01LjMtMTMuOC01LjMtMTkuMSwwcy01LjMsMTMuOCwwLDE5LjFsMjE1LjUsMjE1LjVsLTIxNS41LDIxNS41ICAgYy01LjMsNS4zLTUuMywxMy44LDAsMTkuMWMyLjYsMi42LDYuMSw0LDkuNSw0YzMuNCwwLDYuOS0xLjMsOS41LTRsMjI1LjEtMjI1LjFDMzY1LjkzMSwyNDIuODc1LDM2NS45MzEsMjM0LjI3NSwzNjAuNzMxLDIyOS4wNzV6ICAgIiBmaWxsPSIjRkZGRkZGIi8+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==\"); }\n        :host > .control.arrow.right.dark {\n          background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkNhcGFfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZmlsbD0iIzk5OTk5OSIgZD0iTTM4Ny4wNTgsMjQ1Ljc5M0wxNDUuNTMsNC4yNjVjLTUuNjg3LTUuNjg3LTE0LjgwNy01LjY4Ny0yMC40OTQsMHMtNS42ODcsMTQuODA3LDAsMjAuNDk0bDIzMS4yMjgsMjMxLjIyOA0KCQlMMTI1LjAzNiw0ODcuMjE0Yy01LjY4Nyw1LjY4OC01LjY4NywxNC44MDgsMCwyMC40OTRjMi43OSwyLjc5LDYuNTQ1LDQuMjkyLDEwLjE5Myw0LjI5MmMzLjY0OCwwLDcuNDAzLTEuMzk1LDEwLjE5My00LjI5Mg0KCQlMMzg2Ljk1LDI2Ni4xOEMzOTIuNjM3LDI2MC42MDEsMzkyLjYzNywyNTEuMzczLDM4Ny4wNTgsMjQ1Ljc5M3oiLz4NCjwvZz4NCjwvc3ZnPg0K\"); }\n    :host > .control.left-top, :host > .control.right-top {\n      position: absolute;\n      top: 20px; }\n      :host > .control.left-top.left-top, :host > .control.right-top.left-top {\n        left: 10px; }\n      :host > .control.left-top.right-top, :host > .control.right-top.right-top {\n        right: 10px; }\n      :host > .control.left-top > .delete-img,\n      :host > .control.left-top > .ext-url,\n      :host > .control.left-top > .close, :host > .control.right-top > .delete-img,\n      :host > .control.right-top > .ext-url,\n      :host > .control.right-top > .close {\n        position: relative;\n        display: inline-block;\n        width: 30px;\n        height: 30px;\n        cursor: pointer;\n        text-decoration: none;\n        color: #fff;\n        vertical-align: bottom;\n        transition: background-color .3s ease-in-out; }\n        :host > .control.left-top > .delete-img:hover,\n        :host > .control.left-top > .ext-url:hover,\n        :host > .control.left-top > .close:hover, :host > .control.right-top > .delete-img:hover,\n        :host > .control.right-top > .ext-url:hover,\n        :host > .control.right-top > .close:hover {\n          background-color: rgba(255, 255, 255, 0.1); }\n        :host > .control.left-top > .delete-img:before,\n        :host > .control.left-top > .ext-url:before,\n        :host > .control.left-top > .close:before, :host > .control.right-top > .delete-img:before,\n        :host > .control.right-top > .ext-url:before,\n        :host > .control.right-top > .close:before {\n          content: \"\";\n          display: block;\n          position: absolute;\n          top: 5px;\n          right: 5px;\n          bottom: 5px;\n          left: 5px;\n          background-size: 100% 100%;\n          background-repeat: no-repeat; }\n        :host > .control.left-top > .delete-img.delete-img:before,\n        :host > .control.left-top > .ext-url.delete-img:before,\n        :host > .control.left-top > .close.delete-img:before, :host > .control.right-top > .delete-img.delete-img:before,\n        :host > .control.right-top > .ext-url.delete-img:before,\n        :host > .control.right-top > .close.delete-img:before {\n          background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU5IDU5IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1OSA1OTsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxwYXRoIGQ9Ik01Mi41LDZIMzguNDU2Yy0wLjExLTEuMjUtMC40OTUtMy4zNTgtMS44MTMtNC43MTFDMzUuODA5LDAuNDM0LDM0Ljc1MSwwLDMzLjQ5OSwwSDIzLjVjLTEuMjUyLDAtMi4zMSwwLjQzNC0zLjE0NCwxLjI4OSAgQzE5LjAzOCwyLjY0MiwxOC42NTMsNC43NSwxOC41NDMsNkg2LjVjLTAuNTUyLDAtMSwwLjQ0Ny0xLDFzMC40NDgsMSwxLDFoMi4wNDFsMS45MTUsNDYuMDIxQzEwLjQ5Myw1NS43NDMsMTEuNTY1LDU5LDE1LjM2NCw1OSAgaDI4LjI3MmMzLjc5OSwwLDQuODcxLTMuMjU3LDQuOTA3LTQuOTU4TDUwLjQ1OSw4SDUyLjVjMC41NTIsMCwxLTAuNDQ3LDEtMVM1My4wNTIsNiw1Mi41LDZ6IE0yMC41LDUwYzAsMC41NTMtMC40NDgsMS0xLDEgIHMtMS0wLjQ0Ny0xLTFWMTdjMC0wLjU1MywwLjQ0OC0xLDEtMXMxLDAuNDQ3LDEsMVY1MHogTTMwLjUsNTBjMCwwLjU1My0wLjQ0OCwxLTEsMXMtMS0wLjQ0Ny0xLTFWMTdjMC0wLjU1MywwLjQ0OC0xLDEtMSAgczEsMC40NDcsMSwxVjUweiBNNDAuNSw1MGMwLDAuNTUzLTAuNDQ4LDEtMSwxcy0xLTAuNDQ3LTEtMVYxN2MwLTAuNTUzLDAuNDQ4LTEsMS0xczEsMC40NDcsMSwxVjUweiBNMjEuNzkyLDIuNjgxICBDMjIuMjQsMi4yMjMsMjIuNzk5LDIsMjMuNSwyaDkuOTk5YzAuNzAxLDAsMS4yNiwwLjIyMywxLjcwOCwwLjY4MWMwLjgwNSwwLjgyMywxLjEyOCwyLjI3MSwxLjI0LDMuMzE5SDIwLjU1MyAgQzIwLjY2NSw0Ljk1MiwyMC45ODgsMy41MDQsMjEuNzkyLDIuNjgxeiIgZmlsbD0iI0ZGRkZGRiIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K\"); }\n        :host > .control.left-top > .delete-img.delete-img.dark:before,\n        :host > .control.left-top > .ext-url.delete-img.dark:before,\n        :host > .control.left-top > .close.delete-img.dark:before, :host > .control.right-top > .delete-img.delete-img.dark:before,\n        :host > .control.right-top > .ext-url.delete-img.dark:before,\n        :host > .control.right-top > .close.delete-img.dark:before {\n          background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU5IDU5IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1OSA1OTsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxwYXRoIGQ9Ik01Mi41LDZIMzguNDU2Yy0wLjExLTEuMjUtMC40OTUtMy4zNTgtMS44MTMtNC43MTFDMzUuODA5LDAuNDM0LDM0Ljc1MSwwLDMzLjQ5OSwwSDIzLjVjLTEuMjUyLDAtMi4zMSwwLjQzNC0zLjE0NCwxLjI4OSAgQzE5LjAzOCwyLjY0MiwxOC42NTMsNC43NSwxOC41NDMsNkg2LjVjLTAuNTUyLDAtMSwwLjQ0Ny0xLDFzMC40NDgsMSwxLDFoMi4wNDFsMS45MTUsNDYuMDIxQzEwLjQ5Myw1NS43NDMsMTEuNTY1LDU5LDE1LjM2NCw1OSAgaDI4LjI3MmMzLjc5OSwwLDQuODcxLTMuMjU3LDQuOTA3LTQuOTU4TDUwLjQ1OSw4SDUyLjVjMC41NTIsMCwxLTAuNDQ3LDEtMVM1My4wNTIsNiw1Mi41LDZ6IE0yMC41LDUwYzAsMC41NTMtMC40NDgsMS0xLDEgIHMtMS0wLjQ0Ny0xLTFWMTdjMC0wLjU1MywwLjQ0OC0xLDEtMXMxLDAuNDQ3LDEsMVY1MHogTTMwLjUsNTBjMCwwLjU1My0wLjQ0OCwxLTEsMXMtMS0wLjQ0Ny0xLTFWMTdjMC0wLjU1MywwLjQ0OC0xLDEtMSAgczEsMC40NDcsMSwxVjUweiBNNDAuNSw1MGMwLDAuNTUzLTAuNDQ4LDEtMSwxcy0xLTAuNDQ3LTEtMVYxN2MwLTAuNTUzLDAuNDQ4LTEsMS0xczEsMC40NDcsMSwxVjUweiBNMjEuNzkyLDIuNjgxICBDMjIuMjQsMi4yMjMsMjIuNzk5LDIsMjMuNSwyaDkuOTk5YzAuNzAxLDAsMS4yNiwwLjIyMywxLjcwOCwwLjY4MWMwLjgwNSwwLjgyMywxLjEyOCwyLjI3MSwxLjI0LDMuMzE5SDIwLjU1MyAgQzIwLjY2NSw0Ljk1MiwyMC45ODgsMy41MDQsMjEuNzkyLDIuNjgxeiIgZmlsbD0iIzk5OTk5OSIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K\"); }\n        :host > .control.left-top > .delete-img.close:before,\n        :host > .control.left-top > .ext-url.close:before,\n        :host > .control.left-top > .close.close:before, :host > .control.right-top > .delete-img.close:before,\n        :host > .control.right-top > .ext-url.close:before,\n        :host > .control.right-top > .close.close:before {\n          background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI1MTJweCIgdmVyc2lvbj0iMS4xIiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNjQgNjQiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDY0IDY0Ij4NCiAgPGc+DQogICAgPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTI4Ljk0MSwzMS43ODZMMC42MTMsNjAuMTE0Yy0wLjc4NywwLjc4Ny0wLjc4NywyLjA2MiwwLDIuODQ5YzAuMzkzLDAuMzk0LDAuOTA5LDAuNTksMS40MjQsMC41OSAgIGMwLjUxNiwwLDEuMDMxLTAuMTk2LDEuNDI0LTAuNTlsMjguNTQxLTI4LjU0MWwyOC41NDEsMjguNTQxYzAuMzk0LDAuMzk0LDAuOTA5LDAuNTksMS40MjQsMC41OWMwLjUxNSwwLDEuMDMxLTAuMTk2LDEuNDI0LTAuNTkgICBjMC43ODctMC43ODcsMC43ODctMi4wNjIsMC0yLjg0OUwzNS4wNjQsMzEuNzg2TDYzLjQxLDMuNDM4YzAuNzg3LTAuNzg3LDAuNzg3LTIuMDYyLDAtMi44NDljLTAuNzg3LTAuNzg2LTIuMDYyLTAuNzg2LTIuODQ4LDAgICBMMzIuMDAzLDI5LjE1TDMuNDQxLDAuNTljLTAuNzg3LTAuNzg2LTIuMDYxLTAuNzg2LTIuODQ4LDBjLTAuNzg3LDAuNzg3LTAuNzg3LDIuMDYyLDAsMi44NDlMMjguOTQxLDMxLjc4NnoiLz4NCiAgPC9nPg0KPC9zdmc+DQo=\"); }\n        :host > .control.left-top > .delete-img.close.dark:before,\n        :host > .control.left-top > .ext-url.close.dark:before,\n        :host > .control.left-top > .close.close.dark:before, :host > .control.right-top > .delete-img.close.dark:before,\n        :host > .control.right-top > .ext-url.close.dark:before,\n        :host > .control.right-top > .close.close.dark:before {\n          background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGZpbGw9IiM5OTk5OTkiIGQ9Ik0yMzEuNTI4LDI1NC4yODhMNC45MDQsNDgwLjkxMmMtNi4yOTYsNi4yOTYtNi4yOTYsMTYuNDk2LDAsMjIuNzkyYzMuMTQ0LDMuMTUyLDcuMjcyLDQuNzIsMTEuMzkyLDQuNzINCgkJYzQuMTI4LDAsOC4yNDgtMS41NjcsMTEuMzkyLTQuNzJsMjI4LjMyOC0yMjguMzI4bDIyOC4zMjgsMjI4LjMyOGMzLjE1MiwzLjE1Miw3LjI3Miw0LjcyLDExLjM5Myw0LjcyDQoJCWM0LjExOSwwLDguMjQ4LTEuNTY3LDExLjM5Mi00LjcyYzYuMjk2LTYuMjk2LDYuMjk2LTE2LjQ5NiwwLTIyLjc5MkwyODAuNTEyLDI1NC4yODhMNTA3LjI4LDI3LjUwNA0KCQljNi4yOTYtNi4yOTYsNi4yOTYtMTYuNDk2LDAtMjIuNzkyYy02LjI5Ni02LjI4OC0xNi40OTYtNi4yODgtMjIuNzg0LDBMMjU2LjAyNCwyMzMuMkwyNy41MjgsNC43Mg0KCQljLTYuMjk2LTYuMjg4LTE2LjQ4OC02LjI4OC0yMi43ODQsMGMtNi4yOTYsNi4yOTYtNi4yOTYsMTYuNDk2LDAsMjIuNzkyTDIzMS41MjgsMjU0LjI4OHoiLz4NCjwvZz4NCjwvc3ZnPg0K\"); }\n        :host > .control.left-top > .delete-img.ext-url:before,\n        :host > .control.left-top > .ext-url.ext-url:before,\n        :host > .control.left-top > .close.ext-url:before, :host > .control.right-top > .delete-img.ext-url:before,\n        :host > .control.right-top > .ext-url.ext-url:before,\n        :host > .control.right-top > .close.ext-url:before {\n          background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE4LjEuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNTkxLjYgNTkxLjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU5MS42IDU5MS42OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNNTgxLjQsMjA0Yy01LjcxMiwwLTEwLjIsNC40ODgtMTAuMiwxMC4ydjMyNi40YzAsMTYuOTMyLTEzLjY2OCwzMC42LTMwLjYsMzAuNkg1MWMtMTYuOTMyLDAtMzAuNi0xMy42NjgtMzAuNi0zMC42VjUxICAgIGMwLTE2LjkzMiwxMy42NjgtMzAuNiwzMC42LTMwLjZoMzI2LjRjNS43MTIsMCwxMC4yLTQuNDg4LDEwLjItMTAuMlMzODMuMTEyLDAsMzc3LjQsMEg1MUMyMi44NDgsMCwwLDIyLjg0OCwwLDUxdjQ4OS42ICAgIGMwLDI4LjE1MiwyMi44NDgsNTEsNTEsNTFoNDg5LjZjMjguMTUyLDAsNTEtMjIuODQ4LDUxLTUxVjIxNC4yQzU5MS42LDIwOC42OTIsNTg2LjkwOCwyMDQsNTgxLjQsMjA0eiIgZmlsbD0iI0ZGRkZGRiIvPg0KCQk8cGF0aCBkPSJNNTkxLjM5Niw4LjE2YzAtMC4yMDQtMC4yMDQtMC42MTItMC4yMDQtMC44MTZjMC0wLjQwOC0wLjIwNC0wLjYxMi0wLjQwOC0xLjAyYy0wLjIwNC0wLjQwOC0wLjQwOC0wLjYxMi0wLjYxMi0xLjAyICAgIGMtMC4yMDQtMC4yMDQtMC4yMDQtMC42MTItMC40MDgtMC44MTZjLTAuODE2LTEuMDItMS42MzItMi4wNC0yLjg1Ni0yLjg1NmMtMC4yMDQtMC4yMDQtMC42MTItMC4yMDQtMC44MTYtMC40MDggICAgYy0wLjQwOC0wLjIwNC0wLjYxMi0wLjQwOC0xLjAyLTAuNjEyYy0wLjQwOC0wLjIwNC0wLjYxMi0wLjIwNC0xLjAyLTAuNDA4Yy0wLjIwNCwwLTAuNjEyLTAuMjA0LTAuODE2LTAuMjA0ICAgIGMtMC42MTIsMC4yMDQtMS4yMjQsMC0xLjgzNiwwbDAsMEg0MzguNmMtNS43MTIsMC0xMC4yLDQuNDg4LTEwLjIsMTAuMnM0LjQ4OCwxMC4yLDEwLjIsMTAuMmgxMTguMTE2bC0zNzAuMjYsMzcwLjI2ICAgIGMtNC4wOCw0LjA4LTQuMDgsMTAuNDA0LDAsMTQuNDg0YzIuMDQsMi4wNCw0LjY5MiwzLjA2LDcuMTQsMy4wNmMyLjQ0OCwwLDUuMzA0LTEuMDIsNy4xNC0zLjA2TDU3MS4yLDM0Ljg4NFYxNTMgICAgYzAsNS43MTIsNC40ODgsMTAuMiwxMC4yLDEwLjJzMTAuMi00LjQ4OCwxMC4yLTEwLjJWMTAuMkM1OTEuNiw5LjU4OCw1OTEuMzk2LDguOTc2LDU5MS4zOTYsOC4xNnoiIGZpbGw9IiNGRkZGRkYiLz4NCgkJPHBhdGggZD0iTTUxLDQ1LjljLTIuODU2LDAtNS4xLDIuMjQ0LTUuMSw1LjF2MTQyLjhjMCwyLjg1NiwyLjI0NCw1LjEsNS4xLDUuMXM1LjEtMi4yNDQsNS4xLTUuMVY1Ni4xaDEzNy43ICAgIGMyLjg1NiwwLDUuMS0yLjI0NCw1LjEtNS4xcy0yLjI0NC01LjEtNS4xLTUuMUg1MXoiIGZpbGw9IiNGRkZGRkYiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==\"); }\n        :host > .control.left-top > .delete-img.ext-url.dark:before,\n        :host > .control.left-top > .ext-url.ext-url.dark:before,\n        :host > .control.left-top > .close.ext-url.dark:before, :host > .control.right-top > .delete-img.ext-url.dark:before,\n        :host > .control.right-top > .ext-url.ext-url.dark:before,\n        :host > .control.right-top > .close.ext-url.dark:before {\n          background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkNhcGFfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGZpbGw9IiM5OTk5OTkiIGQ9Ik01MDMuMTczLDE3Ni41NTJjLTQuOTQ0LDAtOC44MjgsMy44ODQtOC44MjgsOC44Mjh2MjgyLjQ4M2MwLDE0LjY1My0xMS44MjksMjYuNDgyLTI2LjQ4MiwyNi40ODJINDQuMTM4DQoJCQljLTE0LjY1MywwLTI2LjQ4Mi0xMS44MjktMjYuNDgyLTI2LjQ4MlY0NC4xMzhjMC0xNC42NTMsMTEuODI5LTI2LjQ4MiwyNi40ODItMjYuNDgyaDI4Mi40ODNjNC45NDMsMCw4LjgyNy0zLjg4NCw4LjgyNy04LjgyOA0KCQkJUzMzMS41NjQsMCwzMjYuNjIxLDBINDQuMTM4QzE5Ljc3NCwwLDAsMTkuNzc0LDAsNDQuMTM4djQyMy43MjVDMCw0OTIuMjI3LDE5Ljc3NCw1MTIsNDQuMTM4LDUxMmg0MjMuNzI1DQoJCQlDNDkyLjIyNyw1MTIsNTEyLDQ5Mi4yMjcsNTEyLDQ2Ny44NjJWMTg1LjM3OUM1MTIsMTgwLjYxMiw1MDcuOTM5LDE3Ni41NTIsNTAzLjE3MywxNzYuNTUyeiIvPg0KCQk8cGF0aCBmaWxsPSIjOTk5OTk5IiBkPSJNNTExLjgyMyw3LjA2MmMwLTAuMTc2LTAuMTc3LTAuNTMtMC4xNzctMC43MDZjMC0wLjM1My0wLjE3Ni0wLjUzLTAuMzUzLTAuODgzcy0wLjM1NC0wLjUzLTAuNTMtMC44ODMNCgkJCWMtMC4xNzYtMC4xNzYtMC4xNzYtMC41My0wLjM1My0wLjcwNmMtMC43MDYtMC44ODMtMS40MTItMS43NjYtMi40NzItMi40NzJjLTAuMTc3LTAuMTc3LTAuNTI5LTAuMTc3LTAuNzA2LTAuMzUzDQoJCQljLTAuMzU0LTAuMTc3LTAuNTMtMC4zNTQtMC44ODMtMC41M2MtMC4zNTQtMC4xNzctMC41My0wLjE3Ny0wLjg4My0wLjM1M2MtMC4xNzcsMC0wLjUzLTAuMTc3LTAuNzA2LTAuMTc3DQoJCQljLTAuNTMsMC4xNzctMS4wNiwwLTEuNTksMGwwLDBIMzc5LjU4NmMtNC45NDMsMC04LjgyNywzLjg4NC04LjgyNyw4LjgyOHMzLjg4NCw4LjgyOCw4LjgyNyw4LjgyOEg0ODEuODFMMTYxLjM2OCwzMzguMDk3DQoJCQljLTMuNTMxLDMuNTMxLTMuNTMxLDkuMDA0LDAsMTIuNTM1YzEuNzY2LDEuNzY2LDQuMDYxLDIuNjQ4LDYuMTc5LDIuNjQ4YzIuMTE5LDAsNC41OS0wLjg4Myw2LjE4LTIuNjQ4TDQ5NC4zNDUsMzAuMTl2MTAyLjIyNA0KCQkJYzAsNC45NDMsMy44ODQsOC44MjcsOC44MjgsOC44MjdjNC45NDMsMCw4LjgyNy0zLjg4NCw4LjgyNy04LjgyN1Y4LjgyOEM1MTIsOC4yOTgsNTExLjgyMyw3Ljc2OCw1MTEuODIzLDcuMDYyeiIvPg0KCQk8cGF0aCBmaWxsPSIjOTk5OTk5IiBkPSJNNDQuMTM4LDM5LjcyNGMtMi40NzIsMC00LjQxNCwxLjk0Mi00LjQxNCw0LjQxNHYxMjMuNTg2YzAsMi40NzIsMS45NDIsNC40MTQsNC40MTQsNC40MTQNCgkJCWMyLjQ3MiwwLDQuNDE0LTEuOTQyLDQuNDE0LTQuNDE0VjQ4LjU1MmgxMTkuMTcyYzIuNDcyLDAsNC40MTQtMS45NDIsNC40MTQtNC40MTRjMC0yLjQ3Mi0xLjk0Mi00LjQxNC00LjQxNC00LjQxNEg0NC4xMzh6Ii8+DQoJPC9nPg0KPC9nPg0KPC9zdmc+DQo=\"); }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(24)(false);
// imports


// module
exports.push([module.i, ":host {\n  display: block;\n  position: relative;\n  padding: 30px; }\n  :host > h1 > a {\n    color: #333 !important;\n    text-decoration: none; }\n  :host > .form input,\n  :host > .form select {\n    border-radius: 0px !important; }\n  :host > .form > .field > .inline {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n    :host > .form > .field > .inline > label {\n      margin-right: 20px;\n      cursor: pointer; }\n  :host > .form > .button-container {\n    margin-top: 20px; }\n    :host > .form > .button-container > .button {\n      border-radius: 0px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 127:
/***/ (function(module, exports) {

module.exports = "<!-- images and image information container -->\n<div class=\"galleria\" mouseWheel (mouseWheelDown)=\"mouseWheelDown()\" (mouseWheelUp)=\"mouseWheelUp()\" (contextmenu)=\"rightClickOnImage($event)\">\n  <!-- images -->\n  <div class=\"images-container\" (swiperight)=\"prev()\" (swipeleft)=\"next()\">\n    <!-- images array -->\n    <div class=\"image\" *ngFor=\"let image of images; let i = index;\" [class.active]=\"!loading && (i == activeImageIndex)\" \n    [ngStyle]=\"{top: conf.imageOffset, bottom: conf.imageOffset}\">\n      <img *ngIf=\"i == activeImageIndex\" [src]=\"image.url\" [alt]=\"image.altText || ''\" [style.borderRadius]=\"conf.imageBorderRadius\"/>\n    </div>\n\n    <!-- loading animation -->\n    <div class=\"loading-animation\" *ngIf=\"(images.length == 0) || loading\">\n      <svg  version=\"1.1\" id=\"L3\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 100 100\" enable-background=\"new 0 0 0 0\" xml:space=\"preserve\">\n        <circle fill=\"none\" stroke=\"#fff\" stroke-width=\"4\" cx=\"50\" cy=\"50\" r=\"44\" style=\"opacity:0.5;\"/>\n        <circle fill=\"#4caf50\" stroke=\"#eee\" stroke-width=\"3\" cx=\"8\" cy=\"54\" r=\"6\">\n          <animateTransform\n          attributeName=\"transform\"\n          dur=\"2s\"\n          type=\"rotate\"\n          from=\"0 50 48\"\n          to=\"360 50 52\"\n          repeatCount=\"indefinite\" />\n\n          <animate \n          attributeName=\"fill\" \n          begin=\"1s\" \n          dur=\"16s\" \n          values =\"#4caf50; #cddc39; #ff9800; #f44336; #e91e63; #ff5722; #ffeb3b; #4caf50\"\n          repeatCount=\"indefinite\" /> \n        </circle>\n      </svg>\n    </div>\n  </div>\n\n  <!-- info and thumbnails -->\n  <div class=\"info-container\">\n    <div class=\"title\" \n    *ngIf=\"conf.showImageTitle && !loading && activeImage && activeImage.title\"\n    [style.paddingBottom]=\"conf.showThumbnails ? '0px' : '30px'\"\n    >{{ activeImage.title }}</div>\n\n    <div #thumbnails class=\"thumbnails\" *ngIf=\"conf.showThumbnails\">\n      <div class=\"thumbnails-scroller\" [style.marginLeft]=\"thumbnailsScrollerLeftMargin\">\n        <div class=\"thumbnail\" \n        *ngFor=\"let image of images; let i = index;\" \n        [class.active]=\"i == activeImageIndex\" \n        [style.backgroundImage]=\"'url(' + (image.thumbnailUrl || image.url) + ')'\"\n        [style.margin]=\"thumbnailMargin\"\n        [style.width]=\"conf.thumbnailSize + 'px'\"\n        [style.height]=\"conf.thumbnailSize + 'px'\"\n        (click)=\"setActiveImage(i)\">\n          <div class=\"feedback\"></div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n\n<!-- gallery controls -->\n<div class=\"control arrow left\" *ngIf=\"(images.length > 1) && !loading\" [class.dark]=\"conf.inline\" [class.disabled]=\"onFirstImage\" (click)=\"prev()\"></div>\n<div class=\"control arrow right\" *ngIf=\"(images.length > 1) && !loading\" [class.dark]=\"conf.inline\" [class.disabled]=\"onLastImage\" (click)=\"next()\"></div>\n\n<div class=\"control right-top\">\n  <a class=\"ext-url\" [class.dark]=\"conf.inline\" *ngIf=\"conf.showExtUrlControl && activeImage && activeImage.extUrl && !loading\" [href]=\"activeImage.extUrl\" [target]=\"activeImage.extUrlTarget || '_blank'\">\n    <div class=\"feedback\"></div>\n  </a>\n  <div class=\"close\" [class.dark]=\"conf.inline\" *ngIf=\"conf.showCloseControl\" (click)=\"close()\">\n    <div class=\"feedback\"></div>\n  </div>\n</div>\n\n<div class=\"control left-top\">\n  <div class=\"delete-img\" [class.dark]=\"conf.inline\" *ngIf=\"conf.showDeleteControl && !loading\" (click)=\"deleteImage(activeImageIndex)\">\n    <div class=\"feedback\"></div>\n  </div>\n</div>\n"

/***/ }),

/***/ 128:
/***/ (function(module, exports) {

module.exports = "<h1><a href=\"https://github.com/thatisuday/ngx-image-gallery\">ngx-image-gallery</a></h1>\n\n<form class=\"ui form\" (ngSubmit)=\"openGallery(f)\" #f=\"ngForm\">\n\t<!-- imageBorderRadius -->\n\t<div class=\"field\">\n\t\t<label for=\"\">conf.imageBorderRadius (css border radius of image)</label>\n\t\t<select type=\"text\" name=\"imageBorderRadius\" [ngModel]=\"conf.imageBorderRadius\">\n\t\t\t<option *ngFor=\"let i of range(0,50)\" [value]=\"i + 'px'\">{{ i + 'px' }}</option>\n\t\t</select>\n\t</div>\n\n\t<!-- imageOffset -->\n\t<div class=\"field\">\n\t\t<label for=\"\">conf.imageOffset (add gap between image and it's container)</label>\n\t\t<select type=\"text\" >\n\t\t\t<option *ngFor=\"let i of range(0,50)\" [value]=\"i + 'px'\">{{ i + 'px' }}</option>\n\t\t</select>\n\t</div>\n\n\t<!-- thumbnailSize -->\n\t<div class=\"field\">\n\t\t<label for=\"\">conf.thumbnailSize (thumbnail size)</label>\n\t\t<select type=\"text\" name=\"thumbnailSize\" [ngModel]=\"conf.thumbnailSize\">\n\t\t\t<option *ngFor=\"let i of range(10,100)\" [value]=\"i\">{{ i }}</option>\n\t\t</select>\n\t</div>\n\n\t<!-- backdropColor -->\n\t<div class=\"field\">\n\t\t<label for=\"\">conf.backdropColor (gallery backdrop (background) color)</label>\n\t\t<input type=\"text\" name=\"backdropColor\" [ngModel]=\"conf.backdropColor\">\n\t</div>\n\n\t<!-- showDeleteControl -->\n\t<div class=\"field\">\n\t\t<label for=\"\">conf.showDeleteControl (show delete image icon)</label>\n\n\t\t<div class=\"inline\">\n\t\t\t<label><input type=\"radio\" name=\"showDeleteControl\" [ngModel]=\"conf.showDeleteControl\" [value]=\"true\"> true</label>\n\t\t\t<label><input type=\"radio\" name=\"showDeleteControl\" [ngModel]=\"conf.showDeleteControl\" [value]=\"false\"> false</label>\n\t\t</div>\n\t</div>\n\n\t<!-- showCloseControl -->\n\t<div class=\"field\">\n\t\t<label for=\"\">conf.showCloseControl (show close gallery icon)</label>\n\n\t\t<div class=\"inline\">\n\t\t\t<label><input type=\"radio\" name=\"showCloseControl\" [ngModel]=\"conf.showCloseControl\" [value]=\"true\"> true</label>\n\t\t\t<label><input type=\"radio\" name=\"showCloseControl\" [ngModel]=\"conf.showCloseControl\" [value]=\"false\"> false</label>\n\t\t</div>\n\t</div>\n\n\t<!-- showExtUrlControl -->\n\t<div class=\"field\">\n\t\t<label for=\"\">conf.showExtUrlControl (show external url icon)</label>\n\n\t\t<div class=\"inline\">\n\t\t\t<label><input type=\"radio\" name=\"showExtUrlControl\" [ngModel]=\"conf.showExtUrlControl\" [value]=\"true\"> true</label>\n\t\t\t<label><input type=\"radio\" name=\"showExtUrlControl\" [ngModel]=\"conf.showExtUrlControl\" [value]=\"false\"> false</label>\n\t\t</div>\n\t</div>\n\n\t<!-- showImageTitle -->\n\t<div class=\"field\">\n\t\t<label for=\"\">conf.showImageTitle (show image title text)</label>\n\n\t\t<div class=\"inline\">\n\t\t\t<label><input type=\"radio\" name=\"showImageTitle\" [ngModel]=\"conf.showImageTitle\" [value]=\"true\"> true</label>\n\t\t\t<label><input type=\"radio\" name=\"showImageTitle\" [ngModel]=\"conf.showImageTitle\" [value]=\"false\"> false</label>\n\t\t</div>\n\t</div>\n\n\t<!-- showThumbnails -->\n\t<div class=\"field\">\n\t\t<label for=\"\">conf.showThumbnails (show thumbnails)</label>\n\n\t\t<div class=\"inline\">\n\t\t\t<label><input type=\"radio\" name=\"showThumbnails\" [ngModel]=\"conf.showThumbnails\" [value]=\"true\"> true</label>\n\t\t\t<label><input type=\"radio\" name=\"showThumbnails\" [ngModel]=\"conf.showThumbnails\" [value]=\"false\"> false</label>\n\t\t</div>\n\t</div>\n\n\t<!-- closeOnEsc -->\n\t<div class=\"field\">\n\t\t<label for=\"\">conf.closeOnEsc (close gallery on `Esc` button press)</label>\n\n\t\t<div class=\"inline\">\n\t\t\t<label><input type=\"radio\" name=\"closeOnEsc\" [ngModel]=\"conf.closeOnEsc\" [value]=\"true\"> true</label>\n\t\t\t<label><input type=\"radio\" name=\"closeOnEsc\" [ngModel]=\"conf.closeOnEsc\" [value]=\"false\"> false</label>\n\t\t</div>\n\t</div>\n\n\t<!-- reactToKeyboard -->\n\t<div class=\"field\">\n\t\t<label for=\"\">conf.reactToKeyboard (change image on keyboard arrow press)</label>\n\n\t\t<div class=\"inline\">\n\t\t\t<label><input type=\"radio\" name=\"reactToKeyboard\" [ngModel]=\"conf.reactToKeyboard\" [value]=\"true\"> true</label>\n\t\t\t<label><input type=\"radio\" name=\"reactToKeyboard\" [ngModel]=\"conf.reactToKeyboard\" [value]=\"false\"> false</label>\n\t\t</div>\n\t</div>\n\n\t<!-- reactToMouseWheel -->\n\t<div class=\"field\">\n\t\t<label for=\"\">conf.reactToMouseWheel (change image on mouse wheel scroll)</label>\n\n\t\t<div class=\"inline\">\n\t\t\t<label><input type=\"radio\" name=\"reactToMouseWheel\" [ngModel]=\"conf.reactToMouseWheel\" [value]=\"true\"> true</label>\n\t\t\t<label><input type=\"radio\" name=\"reactToMouseWheel\" [ngModel]=\"conf.reactToMouseWheel\" [value]=\"false\"> false</label>\n\t\t</div>\n\t</div>\n\n\t<!-- reactToRightClick -->\n\t<div class=\"field\">\n\t\t<label for=\"\">conf.reactToRightClick (disable right click on gallery)</label>\n\n\t\t<div class=\"inline\">\n\t\t\t<label><input type=\"radio\" name=\"reactToRightClick\" [ngModel]=\"conf.reactToRightClick\" [value]=\"true\"> true</label>\n\t\t\t<label><input type=\"radio\" name=\"reactToRightClick\" [ngModel]=\"conf.reactToRightClick\" [value]=\"false\"> false</label>\n\t\t</div>\n\t</div>\n\n\t<!-- inline -->\n\t<div class=\"field\">\n\t\t<label for=\"\">conf.inline (make gallery inline)</label>\n\n\t\t<div class=\"inline\">\n\t\t\t<label><input type=\"radio\" name=\"inline\" [ngModel]=\"conf.inline\" [value]=\"true\"> true</label>\n\t\t\t<label><input type=\"radio\" name=\"inline\" [ngModel]=\"conf.inline\" [value]=\"false\"> false</label>\n\t\t</div>\n\t</div>\n\n\t<!-- ===================================================================================== -->\n\t<div class=\"button-container\">\n\t\t<button type=\"submit\" class=\"ui small green button\">Launch Gallery</button>\n\t</div>\n</form>\n\n\n<div class=\"ui divider\"></div>\n\n\n<!-- Gallery component -->\n<ngx-image-gallery \n[images]=\"images\" \n[conf]=\"conf\"\n(onOpen)=\"galleryOpened($event)\"\n(onClose)=\"galleryClosed()\"\n(onImageChange)=\"galleryImageChanged($event)\"\n(onDelete)=\"deleteImage($event)\"\n></ngx-image-gallery>\n"

/***/ }),

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(73);


/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__module_ngx_image_gallery_conf__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__module_ngx_image_gallery_conf___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__module_ngx_image_gallery_conf__);
/* unused harmony reexport GALLERY_CONF */
/* unused harmony reexport GALLERY_IMAGE */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__module_ngx_image_gallery_module__ = __webpack_require__(81);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__module_ngx_image_gallery_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__module_components_ngx_image_gallery_ngx_image_gallery_component__ = __webpack_require__(45);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__module_components_ngx_image_gallery_ngx_image_gallery_component__["a"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_image_gallery_conf__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_image_gallery_conf___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ngx_image_gallery_conf__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgxImageGalleryComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// key codes to react
var KEY_CODES = {
    37: 'LEFT',
    39: 'RIGHT',
    27: 'ESC'
};
// default gallery configuration
var DEFAULT_CONF = {
    imageBorderRadius: '3px',
    imageOffset: '20px',
    showDeleteControl: false,
    showCloseControl: true,
    showExtUrlControl: true,
    showImageTitle: true,
    showThumbnails: true,
    closeOnEsc: true,
    reactToKeyboard: true,
    reactToMouseWheel: true,
    reactToRightClick: false,
    thumbnailSize: 30,
    backdropColor: 'rgba(13,13,14,0.85)',
    inline: false
};
var NgxImageGalleryComponent = (function () {
    /***************************************************/
    function NgxImageGalleryComponent(galleryElem, renderer) {
        var _this = this;
        this.galleryElem = galleryElem;
        this.renderer = renderer;
        // gallery opened memory
        this.opened = false;
        // gallery configuration
        this.conf = {};
        // gallery images
        this.images = [];
        // event emmiters
        this.onOpen = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* EventEmitter */]();
        this.onClose = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* EventEmitter */]();
        this.onDelete = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* EventEmitter */]();
        this.onImageChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* EventEmitter */]();
        /***************************************************/
        // loading animation memory
        this.loading = false;
        // current active image index
        this.activeImageIndex = null;
        // thumbnail margin and scroll position
        this.thumbnailMargin = '0px 8px';
        this.thumbnailsScrollerLeftMargin = '0px';
        // adjust thumbnail margin to perfectly fit viewport
        this.fitThumbnails = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_lodash__["debounce"])(function () {
            // if thumbnails not visible, return false
            if (_this.conf.showThumbnails == false)
                return false;
            var thumbnailParams = _this.thumbnailsRenderParams;
            _this.thumbnailMargin = '0 ' + (thumbnailParams.newThumbnailMargin / 2) + 'px';
        }, 300);
        // debounced prev
        this.debouncedPrev = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_lodash__["debounce"])(function () { return _this.prev(); }, 300, { 'leading': true, 'trailing': false });
        // debounced next
        this.debouncedNext = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_lodash__["debounce"])(function () { return _this.next(); }, 300, { 'leading': true, 'trailing': false });
    }
    Object.defineProperty(NgxImageGalleryComponent.prototype, "activeImage", {
        // active image
        get: function () {
            return this.images[this.activeImageIndex];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxImageGalleryComponent.prototype, "onFirstImage", {
        // if gallery is on : first image
        get: function () {
            return this.activeImageIndex == 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxImageGalleryComponent.prototype, "onLastImage", {
        // if gallery is on : last image
        get: function () {
            return this.activeImageIndex == (this.images.length - 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxImageGalleryComponent.prototype, "thumbnailsRenderParams", {
        // get thumbnails viewport rendering parameters
        get: function () {
            var thumbnailsContainerWidth = this.thumbnailsElem.nativeElement.offsetWidth;
            var thumbnailMargin = 16;
            var thumbnailSize = thumbnailMargin + this.conf.thumbnailSize;
            var thumbnailsInView = Math.floor(thumbnailsContainerWidth / thumbnailSize);
            var extraSpaceInThumbnailsContainer = thumbnailsContainerWidth - (thumbnailsInView * thumbnailSize);
            var extraMargin = extraSpaceInThumbnailsContainer / thumbnailsInView;
            var newThumbnailMargin = thumbnailMargin + extraMargin;
            var newThumbnailSize = newThumbnailMargin + this.conf.thumbnailSize;
            var relativePositionOfActiveImageThumbnailToScroller = thumbnailsInView - (thumbnailsInView - this.activeImageIndex);
            var thumbnailsScrollerLeftMargin;
            if (relativePositionOfActiveImageThumbnailToScroller > thumbnailsInView - 2) {
                var outThumbnails = ((this.activeImageIndex + 1) - thumbnailsInView) + 1;
                if (this.activeImageIndex != (this.images.length - 1)) {
                    thumbnailsScrollerLeftMargin = '-' + (newThumbnailSize * outThumbnails) + 'px';
                }
                else {
                    thumbnailsScrollerLeftMargin = '-' + (newThumbnailSize * (outThumbnails - 1)) + 'px';
                }
            }
            else {
                thumbnailsScrollerLeftMargin = '0px';
            }
            return {
                thumbnailsInView: thumbnailsInView,
                newThumbnailMargin: newThumbnailMargin,
                newThumbnailSize: newThumbnailSize,
                thumbnailsScrollerLeftMargin: thumbnailsScrollerLeftMargin
            };
        },
        enumerable: true,
        configurable: true
    });
    // set gallery configuration
    NgxImageGalleryComponent.prototype.setGalleryConf = function (conf) {
        this.conf = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_lodash__["assign"])(DEFAULT_CONF, conf);
    };
    // load image and return promise
    NgxImageGalleryComponent.prototype.loadImage = function (index) {
        var _this = this;
        var galleryImage = this.images[index];
        // check if image is cached
        if (galleryImage._cached) {
            return Promise.resolve(index);
        }
        else {
            return new Promise(function (resolve, reject) {
                _this.loading = true;
                var image = new Image();
                image.src = galleryImage.url;
                image.onload = function () {
                    _this.loading = false;
                    galleryImage._cached = true;
                    resolve(index);
                };
                image.onerror = function (error) {
                    _this.loading = false;
                    reject(error);
                };
            });
        }
    };
    // activate image (set active image)
    NgxImageGalleryComponent.prototype.activateImage = function (imageIndex) {
        var _this = this;
        // prevent loading if already loading
        if (this.loading)
            return false;
        // emit event
        this.onImageChange.emit(imageIndex);
        this.loadImage(imageIndex)
            .then(function (_imageIndex) {
            _this.activeImageIndex = _imageIndex;
            // scroll thumbnails
            setTimeout(function () {
                _this.fitThumbnails();
                setTimeout(function () { return _this.scrollThumbnails(); }, 600);
            });
        })
            .catch(function (error) { return console.warn(error); });
    };
    // scroll thumbnails to perfectly position active image thumbnail in viewport
    NgxImageGalleryComponent.prototype.scrollThumbnails = function () {
        // if thumbnails not visible, return false
        if (this.conf.showThumbnails == false)
            return false;
        var thumbnailParams = this.thumbnailsRenderParams;
        this.thumbnailsScrollerLeftMargin = thumbnailParams.thumbnailsScrollerLeftMargin;
    };
    // keyboard event
    NgxImageGalleryComponent.prototype.onKeyboardInput = function (event) {
        if (this.conf.reactToKeyboard && this.opened && !this.loading) {
            if (KEY_CODES[event.keyCode] == 'RIGHT') {
                this.next();
            }
            else if (KEY_CODES[event.keyCode] == 'LEFT') {
                this.prev();
            }
            else if ((KEY_CODES[event.keyCode] == 'ESC') && this.conf.closeOnEsc) {
                this.close();
            }
        }
    };
    // window resize event
    NgxImageGalleryComponent.prototype.onWindowResize = function (event) {
        var _this = this;
        if (this.opened && !this.loading) {
            this.fitThumbnails();
            setTimeout(function () { return _this.scrollThumbnails(); }, 600);
        }
    };
    NgxImageGalleryComponent.prototype.ngOnInit = function () {
        // create final gallery configuration
        this.setGalleryConf(this.conf);
        // apply backdrop color
        this.renderer.setStyle(this.galleryElem.nativeElement, 'background-color', this.conf.backdropColor);
        // gallery inline class and auto open
        if (this.conf.inline) {
            this.renderer.addClass(this.galleryElem.nativeElement, 'inline');
            this.open(0);
        }
    };
    NgxImageGalleryComponent.prototype.ngOnChanges = function (changes) {
        // when gallery configuration changes
        if (changes.conf && changes.conf.firstChange == false) {
            this.setGalleryConf(changes.conf.currentValue);
            // apply backdrop color
            this.renderer.setStyle(this.galleryElem.nativeElement, 'background-color', this.conf.backdropColor);
            // gallery inline class and auto open
            if ((changes.conf.previousValue.inline != true) && this.conf.inline) {
                this.renderer.addClass(this.galleryElem.nativeElement, 'inline');
                this.open(0);
            }
        }
        // when gallery images changes
        if (changes.images && changes.images.firstChange == false) {
            this.images = changes.images.currentValue;
            if (this.images.length) {
                this.activateImage(0);
            }
        }
    };
    /***************************************************/
    // open gallery
    NgxImageGalleryComponent.prototype.open = function (index) {
        if (index === void 0) { index = 0; }
        if (this.images.length) {
            this.opened = true;
            // emit event
            this.onOpen.emit(index);
            // activate image at given index
            this.activateImage(index);
        }
        else {
            console.warn('No images provided to ngx-image-gallery!');
        }
    };
    // close gallery
    NgxImageGalleryComponent.prototype.close = function () {
        this.opened = false;
        this.activeImageIndex = 0;
        // emit event
        this.onClose.emit();
    };
    // change prev image
    NgxImageGalleryComponent.prototype.prev = function () {
        if (this.onFirstImage == false) {
            this.activateImage(this.activeImageIndex - 1);
        }
    };
    // change next image
    NgxImageGalleryComponent.prototype.next = function () {
        if (this.onLastImage == false) {
            this.activateImage(this.activeImageIndex + 1);
        }
    };
    // set image (activate)
    NgxImageGalleryComponent.prototype.setActiveImage = function (index) {
        this.activateImage(index);
    };
    // delete image
    NgxImageGalleryComponent.prototype.deleteImage = function (index) {
        this.onDelete.emit(index);
    };
    // mouse wheel up (prev image)
    NgxImageGalleryComponent.prototype.mouseWheelUp = function () {
        if (this.conf.reactToMouseWheel) {
            this.debouncedPrev();
        }
    };
    // mouse wheel down (next image)
    NgxImageGalleryComponent.prototype.mouseWheelDown = function () {
        if (this.conf.reactToMouseWheel) {
            this.debouncedNext();
        }
    };
    // right click on image
    NgxImageGalleryComponent.prototype.rightClickOnImage = function (event) {
        event.stopPropagation();
        return this.conf.reactToRightClick;
    };
    return NgxImageGalleryComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* HostBinding */])('class.active'),
    __metadata("design:type", Boolean)
], NgxImageGalleryComponent.prototype, "opened", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__ngx_image_gallery_conf__["GALLERY_CONF"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ngx_image_gallery_conf__["GALLERY_CONF"]) === "function" && _a || Object)
], NgxImageGalleryComponent.prototype, "conf", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Input */])(),
    __metadata("design:type", Array)
], NgxImageGalleryComponent.prototype, "images", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Output */])(),
    __metadata("design:type", Object)
], NgxImageGalleryComponent.prototype, "onOpen", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Output */])(),
    __metadata("design:type", Object)
], NgxImageGalleryComponent.prototype, "onClose", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Output */])(),
    __metadata("design:type", Object)
], NgxImageGalleryComponent.prototype, "onDelete", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Output */])(),
    __metadata("design:type", Object)
], NgxImageGalleryComponent.prototype, "onImageChange", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ViewChild */])('thumbnails'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* ElementRef */]) === "function" && _b || Object)
], NgxImageGalleryComponent.prototype, "thumbnailsElem", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* HostListener */])('window:keydown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NgxImageGalleryComponent.prototype, "onKeyboardInput", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* HostListener */])('window:resize', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NgxImageGalleryComponent.prototype, "onWindowResize", null);
NgxImageGalleryComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Component */])({
        selector: 'ngx-image-gallery',
        template: __webpack_require__(127),
        styles: [__webpack_require__(124)]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* ElementRef */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* Renderer2 */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* Renderer2 */]) === "function" && _d || Object])
], NgxImageGalleryComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=ngx-image-gallery.component.js.map

/***/ }),

/***/ 46:
/***/ (function(module, exports) {

//# sourceMappingURL=ngx-image-gallery.conf.js.map

/***/ }),

/***/ 72:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 72;


/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(84);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClickOutsideDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ClickOutsideDirective = (function () {
    function ClickOutsideDirective(_elementRef) {
        this._elementRef = _elementRef;
        this.clickOutside = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* EventEmitter */]();
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* EventEmitter */]) === "function" && _a || Object)
], ClickOutsideDirective.prototype, "clickOutside", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* HostListener */])('document:click', ['$event', '$event.target']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ClickOutsideDirective.prototype, "onClick", null);
ClickOutsideDirective = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["l" /* Directive */])({
        selector: '[clickOutside]'
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* ElementRef */]) === "function" && _b || Object])
], ClickOutsideDirective);

var _a, _b;
//# sourceMappingURL=click-outside.directive.js.map

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MouseWheelDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MouseWheelDirective = (function () {
    function MouseWheelDirective() {
        this.mouseWheelUp = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* EventEmitter */]();
        this.mouseWheelDown = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* EventEmitter */]();
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Output */])(),
    __metadata("design:type", Object)
], MouseWheelDirective.prototype, "mouseWheelUp", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Output */])(),
    __metadata("design:type", Object)
], MouseWheelDirective.prototype, "mouseWheelDown", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* HostListener */])('mousewheel', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MouseWheelDirective.prototype, "onMouseWheelChrome", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* HostListener */])('DOMMouseScroll', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MouseWheelDirective.prototype, "onMouseWheelFirefox", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* HostListener */])('onmousewheel', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MouseWheelDirective.prototype, "onMouseWheelIE", null);
MouseWheelDirective = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["l" /* Directive */])({ selector: '[mouseWheel]' })
], MouseWheelDirective);

//# sourceMappingURL=mousewheel.directive.js.map

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directives_click_outside_directive__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_hammerjs__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_ngx_image_gallery_ngx_image_gallery_component__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directives_mousewheel_directive__ = __webpack_require__(80);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgxImageGalleryModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var NgxImageGalleryModule = (function () {
    function NgxImageGalleryModule() {
    }
    return NgxImageGalleryModule;
}());
NgxImageGalleryModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["a" /* CommonModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__components_ngx_image_gallery_ngx_image_gallery_component__["a" /* NgxImageGalleryComponent */],
            __WEBPACK_IMPORTED_MODULE_5__directives_mousewheel_directive__["a" /* MouseWheelDirective */],
            __WEBPACK_IMPORTED_MODULE_0__directives_click_outside_directive__["a" /* ClickOutsideDirective */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_4__components_ngx_image_gallery_ngx_image_gallery_component__["a" /* NgxImageGalleryComponent */],
            __WEBPACK_IMPORTED_MODULE_5__directives_mousewheel_directive__["a" /* MouseWheelDirective */],
            __WEBPACK_IMPORTED_MODULE_0__directives_click_outside_directive__["a" /* ClickOutsideDirective */]
        ]
    })
], NgxImageGalleryModule);

//# sourceMappingURL=ngx-image-gallery.module.js.map

/***/ }),

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent() {
        this.images = [
            {
                url: "https://images.pexels.com/photos/669006/pexels-photo-669006.jpeg?w=1260",
                altText: 'two-woman-standing-on-the-ground-and-staring-at-the-mountain',
                extUrl: 'https://www.pexels.com/photo/two-woman-standing-on-the-ground-and-staring-at-the-mountain-669006/',
                title: 'two-woman-standing-on-the-ground-and-staring-at-the-mountain',
                thumbnailUrl: "https://images.pexels.com/photos/669006/pexels-photo-669006.jpeg?w=60"
            },
            {
                url: "https://images.pexels.com/photos/669013/pexels-photo-669013.jpeg?w=1260",
                altText: 'woman-in-black-blazer-holding-blue-cup',
                title: 'woman-in-black-blazer-holding-blue-cup',
                thumbnailUrl: "https://images.pexels.com/photos/669013/pexels-photo-669013.jpeg?w=60"
            },
            {
                url: "https://images.pexels.com/photos/630833/pexels-photo-630833.jpeg?w=1260",
                altText: 'adventure-enjoyment-explore-girl',
                thumbnailUrl: "https://images.pexels.com/photos/630833/pexels-photo-630833.jpeg?w=60"
            },
            {
                url: "https://images.pexels.com/photos/618542/pexels-photo-618542.jpeg?w=1260",
                extUrl: 'https://www.pexels.com/photo/adventure-beautiful-enjoyment-freedom-618542/',
                extUrlTarget: '_self',
                title: 'adventure-beautiful-enjoyment-freedom',
                thumbnailUrl: "https://images.pexels.com/photos/618542/pexels-photo-618542.jpeg?w=60"
            },
            {
                url: "https://images.pexels.com/photos/597329/pexels-photo-597329.jpeg?w=1260",
                altText: 'art-materials-arts-and-crafts-bloom-blooming',
                extUrl: 'https://www.pexels.com/photo/art-materials-arts-and-crafts-bloom-blooming-597329/',
                title: 'art-materials-arts-and-crafts-bloom-blooming',
                thumbnailUrl: "https://images.pexels.com/photos/597329/pexels-photo-597329.jpeg?w=60"
            },
            {
                url: "https://images.pexels.com/photos/618547/pexels-photo-618547.jpeg?w=1260",
                altText: 'adult-beard-blur-business',
                extUrl: 'https://www.pexels.com/photo/adult-beard-blur-business-618547/',
                title: 'adult-beard-blur-business',
                thumbnailUrl: "https://images.pexels.com/photos/618547/pexels-photo-618547.jpeg?w=60"
            },
            {
                url: "https://images.pexels.com/photos/597331/pexels-photo-597331.jpeg?w=1260",
                thumbnailUrl: "https://images.pexels.com/photos/597331/pexels-photo-597331.jpeg?w=60"
            },
            {
                url: "https://images.pexels.com/photos/590516/pexels-photo-590516.jpeg?w=1260",
                altText: '',
                extUrl: 'https://www.pexels.com/photo/adult-beard-beverage-blur-590516/',
                title: 'Beards are the men thing. We always feel proud of our beards. My love towards Beard, made to collect some awesome quotes and sayings on beard.',
                thumbnailUrl: "https://images.pexels.com/photos/590516/pexels-photo-590516.jpeg?w=60"
            },
            {
                url: "https://images.pexels.com/photos/586335/pexels-photo-586335.jpeg?w=1260",
                altText: 'beverage-cafe-coffee-cup',
                title: 'beverage-cafe-coffee-cup',
                thumbnailUrl: "https://images.pexels.com/photos/586335/pexels-photo-586335.jpeg?w=60"
            },
            {
                url: "https://images.pexels.com/photos/586333/pexels-photo-586333.jpeg?w=1260",
                altText: 'chair-deck-chair-guitar-musical-instrument',
                extUrl: 'https://www.pexels.com/photo/chair-deck-chair-guitar-musical-instrument-586333/',
                title: 'chair-deck-chair-guitar-musical-instrument',
                thumbnailUrl: "https://images.pexels.com/photos/586333/pexels-photo-586333.jpeg?w=60"
            },
            {
                url: "https://images.pexels.com/photos/582433/pexels-photo-582433.jpeg?w=1260",
                altText: 'blur-cellphone-close-up-focus',
                title: 'blur-cellphone-close-up-focus',
                thumbnailUrl: "https://images.pexels.com/photos/582433/pexels-photo-582433.jpeg?w=60"
            },
            {
                url: "https://images.pexels.com/photos/573563/pexels-photo-573563.jpeg?w=1260",
                altText: 'beard-business-businessman-businesswoman',
                extUrl: 'https://www.pexels.com/photo/beard-business-businessman-businesswoman-573563/',
                title: 'beard-business-businessman-businesswoman',
                thumbnailUrl: "https://images.pexels.com/photos/573563/pexels-photo-573563.jpeg?w=60"
            },
        ];
        this.conf = {
            imageBorderRadius: '3px',
            imageOffset: '20px',
            showDeleteControl: true,
            showCloseControl: true,
            showExtUrlControl: true,
            showImageTitle: true,
            showThumbnails: true,
            closeOnEsc: true,
            reactToKeyboard: true,
            reactToMouseWheel: true,
            reactToRightClick: false,
            thumbnailSize: 30,
            backdropColor: 'rgba(13,13,14,0.85)',
            inline: false
        };
        this.range = __WEBPACK_IMPORTED_MODULE_2_lodash___default.a.range;
    }
    AppComponent.prototype.ngOnInit = function () { };
    // open gallery
    AppComponent.prototype.openGallery = function (form) {
        this.conf = form.value;
        this.ngxImageGallery.open(0);
    };
    // callback on gallery opened
    AppComponent.prototype.galleryOpened = function (index) {
        console.info('Gallery opened at index ', index);
    };
    // callback on gallery closed
    AppComponent.prototype.galleryClosed = function () {
        console.info('Gallery closed.');
    };
    // callback on gallery image changed
    AppComponent.prototype.galleryImageChanged = function (index) {
        console.info('Gallery image changed to index ', index);
    };
    // callback on user clicked delete button
    AppComponent.prototype.deleteImage = function (index) {
        console.info('Delete image at index ', index);
    };
    return AppComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1__index__["b" /* NgxImageGalleryComponent */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__index__["b" /* NgxImageGalleryComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__index__["b" /* NgxImageGalleryComponent */]) === "function" && _a || Object)
], AppComponent.prototype, "ngxImageGallery", void 0);
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(128),
        styles: [__webpack_require__(125)]
    }),
    __metadata("design:paramtypes", [])
], AppComponent);

var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__index__ = __webpack_require__(44);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__index__["a" /* NgxImageGalleryModule */]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ })

},[160]);
//# sourceMappingURL=main.bundle.js.map
webpackJsonp(["popover-tooltip.module"],{

/***/ "./src/app/pages/component/popover-tooltip/popover-tooltip.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col-md-6\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <h3 class=\"card-title\">Quick and easy popovers</h3>\r\n                <h6 class=\"card-subtitle\">This is basic popovers</h6>\r\n                <div class=\"button-box\">\r\n                    <button type=\"button\" class=\"btn btn-secondary\" placement=\"top\"\r\n                            ngbPopover=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\" popoverTitle=\"Popover on top\">\r\n                      Popover on top\r\n                    </button>\r\n\r\n                    <button type=\"button\" class=\"btn btn-secondary\" placement=\"right\"\r\n                            ngbPopover=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\" popoverTitle=\"Popover on right\">\r\n                      Popover on right\r\n                    </button>\r\n\r\n                    <button type=\"button\" class=\"btn btn-secondary\" placement=\"bottom\"\r\n                            ngbPopover=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\" popoverTitle=\"Popover on bottom\">\r\n                      Popover on bottom\r\n                    </button>\r\n\r\n                    <button type=\"button\" class=\"btn btn-secondary\" placement=\"left\"\r\n                            ngbPopover=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\" popoverTitle=\"Popover on left\">\r\n                      Popover on left\r\n                    </button>\r\n                </div>\r\n  \t\t\t</div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-md-6\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <h3 class=\"card-title\">HTML and bindings in popovers</h3>\r\n                <h6 class=\"card-subtitle\">Popovers can contain any arbitrary HTML, Angular bindings and even directives!\r\n  Simply enclose desired content in a <code>&lt;ng-template&gt;</code> element.</h6>\r\n                <ng-template #popContent>Hello, <b>{{name}}</b>!</ng-template>\r\n                <button type=\"button\" class=\"btn btn-secondary\" [ngbPopover]=\"popContent\" popoverTitle=\"Fancy content\">\r\n                  I've got markup and bindings in my popover!\r\n                </button>\r\n                \r\n  \t\t\t</div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-md-6\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <h3 class=\"card-title\">Custom and manual triggers</h3>\r\n                <h6 class=\"card-subtitle\">You can easily override open and close triggers by specifying event names (separated by <code>:</code>) in the <code>triggers</code> property.</h6>\r\n                <button type=\"button\" class=\"btn btn-secondary\" ngbPopover=\"You see, I show up on hover!\" triggers=\"mouseenter:mouseleave\" popoverTitle=\"Pop title\">  Hover over me!</button>\r\n                \r\n  \t\t\t</div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-md-6\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <h3 class=\"card-title\">Popover visibility events</h3>\r\n                <h6 class=\"card-subtitle\">This is popover event</h6>\r\n                <button type=\"button\" class=\"btn btn-secondary\" placement=\"top\" ngbPopover=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\" popoverTitle=\"Popover on top\" #popover=\"ngbPopover\"> Open Popover</button>\r\n                Popover is currently: <code>{{ popover.isOpen() ? 'open' : 'closed' }}</code>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-md-6\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <h3 class=\"card-title\">Quick and easy tooltips</h3>\r\n                <h6 class=\"card-subtitle\">This is Quick and easy tooltips</h6>\r\n                <div class=\"button-box\">\r\n                <button type=\"button\" class=\"btn btn-secondary\" placement=\"top\" ngbTooltip=\"Tooltip on top\">\r\n                  Tooltip on top\r\n                </button>\r\n                <button type=\"button\" class=\"btn btn-secondary\" placement=\"right\" ngbTooltip=\"Tooltip on right\">\r\n                  Tooltip on right\r\n                </button>\r\n                <button type=\"button\" class=\"btn btn-secondary\" placement=\"bottom\" ngbTooltip=\"Tooltip on bottom\">\r\n                  Tooltip on bottom\r\n                </button>\r\n                <button type=\"button\" class=\"btn btn-secondary\" placement=\"left\" ngbTooltip=\"Tooltip on left\">\r\n                  Tooltip on left\r\n                </button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-md-6\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <h3 class=\"card-title\">HTML and bindings in tooltips</h3>\r\n                <h6 class=\"card-subtitle\">Tooltips can contain any arbitrary HTML, Angular bindings and even directives! Simply enclose desired content in a <code>ng-template</code> element.</h6>\r\n                <ng-template #tipContent>Hello, <b>{{name}}</b>!</ng-template>\r\n                <button type=\"button\" class=\"btn btn-secondary\" [ngbTooltip]=\"tipContent\">\r\n                  I've got markup and bindings in my tooltip!\r\n                </button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-md-6\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <h3 class=\"card-title\">Custom and manual triggers</h3>\r\n                <h6 class=\"card-subtitle\">You can easily override open and close triggers by specifying event names (separated by :) in the triggers property.</h6>\r\n                <button type=\"button\" class=\"btn btn-secondary\" ngbTooltip=\"You see, I show up on click!\" triggers=\"click:blur\"> Click me!</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-md-6\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <h3 class=\"card-title\">Popover visibility events</h3>\r\n                <h6 class=\"card-subtitle\">This is Disabled pagination</h6>\r\n                <div class=\"button-box\">\r\n                <button type=\"button\" class=\"btn btn-secondary\" ngbTooltip=\"What a great tip!\" triggers=\"manual\" #t=\"ngbTooltip\" (click)=\"t.open()\">\r\n                  Click me to open a tooltip\r\n                </button>\r\n                <button type=\"button\" class=\"btn btn-secondary\" (click)=\"t.close()\">\r\n                  Click me to close a tooltip\r\n                </button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/pages/component/popover-tooltip/popover-tooltip.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgbdPopTooltip; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var NgbdPopTooltip = /** @class */ (function () {
    function NgbdPopTooltip() {
        this.name = 'World';
    }
    NgbdPopTooltip = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'ngbd-pagination',
            template: __webpack_require__("./src/app/pages/component/popover-tooltip/popover-tooltip.component.html")
        })
    ], NgbdPopTooltip);
    return NgbdPopTooltip;
}());



/***/ }),

/***/ "./src/app/pages/component/popover-tooltip/popover-tooltip.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopoverTooltipModule", function() { return PopoverTooltipModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__popover_tooltip_component__ = __webpack_require__("./src/app/pages/component/popover-tooltip/popover-tooltip.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var routes = [{
        path: '',
        data: {
            title: 'Popover Tooltip page',
            urls: [{ title: 'Dashboard', url: '/' }, { title: 'Angular Component' }, { title: 'Popover Tooltip page' }]
        },
        component: __WEBPACK_IMPORTED_MODULE_4__popover_tooltip_component__["a" /* NgbdPopTooltip */]
    }];
var PopoverTooltipModule = /** @class */ (function () {
    function PopoverTooltipModule() {
    }
    PopoverTooltipModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__["e" /* NgbModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* RouterModule */].forChild(routes)
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_4__popover_tooltip_component__["a" /* NgbdPopTooltip */]]
        })
    ], PopoverTooltipModule);
    return PopoverTooltipModule;
}());



/***/ })

});
//# sourceMappingURL=popover-tooltip.module.chunk.js.map
webpackJsonp(["progressbar.module"],{

/***/ "./src/app/pages/component/progressbar/progressbar.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    \n    <div class=\"col-md-6\">\n        <div class=\"card\">\n            <div class=\"card-body\">\n                <h3 class=\"card-title\">Basic Progressbar</h3>\n                <h6 class=\"card-subtitle\">This is Basic Progressbar</h6>\n                <p><ngb-progressbar type=\"success\" [value]=\"25\"></ngb-progressbar></p>\n                <p><ngb-progressbar type=\"info\" [value]=\"50\"></ngb-progressbar></p>\n                <p><ngb-progressbar type=\"primary\" [value]=\"150\" [max]=\"200\"></ngb-progressbar></p>\n                <p><ngb-progressbar type=\"inverse\" [value]=\"150\" [max]=\"150\"></ngb-progressbar></p>\n                <p><ngb-progressbar type=\"warning\" [value]=\"75\"></ngb-progressbar></p>\n                <p><ngb-progressbar type=\"danger\" [value]=\"100\"></ngb-progressbar></p>\n                  \n  \t\t\t</div>\n        </div>\n    </div>\n    <div class=\"col-md-6\">\n        <div class=\"card\">\n            <div class=\"card-body\">\n                <h3 class=\"card-title\">Progress bars with current value labels</h3>\n                <h6 class=\"card-subtitle\">This is Progress bars with current value labels</h6>\n                <p><ngb-progressbar showValue=\"true\" type=\"success\" [value]=\"25\"></ngb-progressbar></p>\n                <p><ngb-progressbar [showValue]=\"true\" type=\"info\" [value]=\"50\"></ngb-progressbar></p>\n                <p><ngb-progressbar showValue=\"true\" type=\"primary\" [value]=\"150\" [max]=\"200\"></ngb-progressbar></p>\n                <p><ngb-progressbar [showValue]=\"true\" type=\"inverse\" [value]=\"150\" [max]=\"150\"></ngb-progressbar></p>\n                <p><ngb-progressbar showValue=\"true\" type=\"warning\" [value]=\"150\" [max]=\"200\"></ngb-progressbar></p>\n                <p><ngb-progressbar [showValue]=\"true\" type=\"danger\" [value]=\"150\" [max]=\"150\"></ngb-progressbar></p>\n  \t\t\t</div>\n        </div>\n    </div>\n    <div class=\"col-md-6\">\n        <div class=\"card\">\n            <div class=\"card-body\">\n                <h3 class=\"card-title\">Striped progress bars</h3>\n                <h6 class=\"card-subtitle\">This is Striped progress</h6>\n                <p><ngb-progressbar type=\"success\" [value]=\"25\" [striped]=\"true\"></ngb-progressbar></p>\n                <p><ngb-progressbar type=\"info\" [value]=\"50\" [striped]=\"true\"></ngb-progressbar></p>\n                <p><ngb-progressbar type=\"warning\" [value]=\"75\" [striped]=\"true\"></ngb-progressbar></p>\n                <p><ngb-progressbar type=\"danger\" [value]=\"100\" [striped]=\"true\"></ngb-progressbar></p>\n  \t\t\t</div>\n        </div>\n    </div>\n    <div class=\"col-md-6\">\n        <div class=\"card\">\n            <div class=\"card-body\">\n                <h3 class=\"card-title\">Progress bars with custom labels</h3>\n                <h6 class=\"card-subtitle\">This is basic Default pagination</h6>\n                <p><ngb-progressbar type=\"success\" [value]=\"25\">25</ngb-progressbar></p>\n                <p><ngb-progressbar type=\"info\" [value]=\"50\">Copying file <b>2 of 4</b>...</ngb-progressbar></p>\n                <p><ngb-progressbar type=\"warning\" [value]=\"75\" [striped]=\"true\" [animated]=\"true\"><i>50%</i></ngb-progressbar></p>\n                <p><ngb-progressbar type=\"danger\" [value]=\"100\" [striped]=\"true\">Completed!</ngb-progressbar></p>\n            </div>\n        </div>\n    </div>\n    <div class=\"col-md-12\">\n        <div class=\"card\">\n            <div class=\"card-body\">\n                <h3 class=\"card-title\">Global configuration of progress bars</h3>\n                <h6 class=\"card-subtitle\">This is Global configuration of progress bars</h6>\n                <p>This progress bar uses the customized default values.</p>\n                <p><ngb-progressbar value=\"250\"></ngb-progressbar></p>\n\n                <p>This progress bar uses the customized default values, but changes the type using an input.</p>\n                <p><ngb-progressbar value=\"500\" type=\"info\"></ngb-progressbar></p>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/pages/component/progressbar/progressbar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgbdpregressbarBasic; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NgbdpregressbarBasic = /** @class */ (function () {
    function NgbdpregressbarBasic(config) {
        // customize default values of progress bars used by this component tree
        config.max = 1000;
        config.striped = true;
        config.animated = true;
        config.type = 'success';
    }
    NgbdpregressbarBasic = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'ngbd-pagination',
            template: __webpack_require__("./src/app/pages/component/progressbar/progressbar.component.html"),
            providers: [__WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["f" /* NgbProgressbarConfig */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["f" /* NgbProgressbarConfig */]])
    ], NgbdpregressbarBasic);
    return NgbdpregressbarBasic;
}());



/***/ }),

/***/ "./src/app/pages/component/progressbar/progressbar.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "progressbarModule", function() { return progressbarModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__progressbar_component__ = __webpack_require__("./src/app/pages/component/progressbar/progressbar.component.ts");
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
            title: 'Progressbar page',
            urls: [{ title: 'Dashboard', url: '/' }, { title: 'Angular Component' }, { title: 'Progressbar page' }]
        },
        component: __WEBPACK_IMPORTED_MODULE_4__progressbar_component__["a" /* NgbdpregressbarBasic */]
    }];
var progressbarModule = /** @class */ (function () {
    function progressbarModule() {
    }
    progressbarModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__["e" /* NgbModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* RouterModule */].forChild(routes)
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_4__progressbar_component__["a" /* NgbdpregressbarBasic */]]
        })
    ], progressbarModule);
    return progressbarModule;
}());



/***/ })

});
//# sourceMappingURL=progressbar.module.chunk.js.map
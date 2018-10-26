webpackJsonp(["carousel.module"],{

/***/ "./src/app/pages/component/carousel/carousel.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col-md-6 col-xlg-5\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <h3 class=\"card-title\">Carousel</h3>\r\n                <h6 class=\"card-subtitle\">This is basic Carousel</h6>\r\n                <ngb-carousel>\r\n\t\t\t\t  <ng-template ngbSlide>\r\n\t\t\t\t    <img src=\"assets/images/big/img1.jpg\" alt=\"Random first slide\">\r\n\t\t\t\t    <div class=\"carousel-caption\">\r\n\t\t\t\t      <h3 class=\"text-white font-bold\">First slide label</h3>\r\n\t\t\t\t      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>\r\n\t\t\t\t    </div>\r\n\t\t\t\t  </ng-template>\r\n\t\t\t\t  <ng-template ngbSlide>\r\n\t\t\t\t    <img src=\"assets/images/big/img2.jpg\" alt=\"Random second slide\">\r\n\t\t\t\t    <div class=\"carousel-caption\">\r\n\t\t\t\t      <h3 class=\"text-white font-bold\">Second slide label</h3>\r\n\t\t\t\t      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>\r\n\t\t\t\t    </div>\r\n\t\t\t\t  </ng-template>\r\n\t\t\t\t  <ng-template ngbSlide>\r\n\t\t\t\t    <img src=\"assets/images/big/img3.jpg\" alt=\"Random third slide\">\r\n\t\t\t\t    <div class=\"carousel-caption\">\r\n\t\t\t\t      <h3 class=\"text-white font-bold\">Third slide label</h3>\r\n\t\t\t\t      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>\r\n\t\t\t\t    </div>\r\n\t\t\t\t  </ng-template>\r\n\t\t\t\t</ngb-carousel>\r\n  \t\t\t</div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-md-6 col-xlg-5\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <h3 class=\"card-title\">Carousel</h3>\r\n                <h6 class=\"card-subtitle\">This is basic Carousel</h6>\r\n                <ngb-carousel>\r\n\t\t\t\t\t  <ng-template ngbSlide>\r\n\t\t\t\t\t    <img src=\"assets/images/big/img4.jpg\" alt=\"Random first slide\">\r\n\t\t\t\t\t    <div class=\"carousel-caption\">\r\n\t\t\t\t\t      <h3 class=\"text-white font-bold\">10 seconds between slides...</h3>\r\n\t\t\t\t\t      <p>This carousel uses customized default values.</p>\r\n\t\t\t\t\t    </div>\r\n\t\t\t\t\t  </ng-template>\r\n\t\t\t\t\t  <ng-template ngbSlide>\r\n\t\t\t\t\t    <img src=\"assets/images/big/img5.jpg\"  alt=\"Random second slide\">\r\n\t\t\t\t\t    <div class=\"carousel-caption\">\r\n\t\t\t\t\t      <h3 class=\"text-white font-bold\">No keyboard...</h3>\r\n\t\t\t\t\t      <p>This carousel uses customized default values.</p>\r\n\t\t\t\t\t    </div>\r\n\t\t\t\t\t  </ng-template>\r\n\t\t\t\t\t  <ng-template ngbSlide>\r\n\t\t\t\t\t    <img src=\"assets/images/big/img6.jpg\" alt=\"Random third slide\">\r\n\t\t\t\t\t    <div class=\"carousel-caption\">\r\n\t\t\t\t\t      <h3 class=\"text-white font-bold\">And no wrap after last slide.</h3>\r\n\t\t\t\t\t      <p>This carousel uses customized default values.</p>\r\n\t\t\t\t\t    </div>\r\n\t\t\t\t\t  </ng-template>\r\n\t\t\t\t\t</ngb-carousel>\r\n  \t\t\t</div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/pages/component/carousel/carousel.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgbdCarouselBasic; });
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


var NgbdCarouselBasic = /** @class */ (function () {
    function NgbdCarouselBasic(config) {
        // customize default values of carousels used by this component tree
        config.interval = 10000;
        config.wrap = false;
        config.keyboard = false;
    }
    NgbdCarouselBasic = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'ngbd-buttons-radio',
            template: __webpack_require__("./src/app/pages/component/carousel/carousel.component.html"),
            providers: [__WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbCarouselConfig */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbCarouselConfig */]])
    ], NgbdCarouselBasic);
    return NgbdCarouselBasic;
}());



/***/ }),

/***/ "./src/app/pages/component/carousel/carousel.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonsModule", function() { return ButtonsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__carousel_component__ = __webpack_require__("./src/app/pages/component/carousel/carousel.component.ts");
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
            title: 'Carousel page',
            urls: [{ title: 'Dashboard', url: '/' }, { title: 'Angular Component' }, { title: 'Carousel page' }]
        },
        component: __WEBPACK_IMPORTED_MODULE_4__carousel_component__["a" /* NgbdCarouselBasic */]
    }];
var ButtonsModule = /** @class */ (function () {
    function ButtonsModule() {
    }
    ButtonsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__["e" /* NgbModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* RouterModule */].forChild(routes)
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_4__carousel_component__["a" /* NgbdCarouselBasic */]]
        })
    ], ButtonsModule);
    return ButtonsModule;
}());



/***/ })

});
//# sourceMappingURL=carousel.module.chunk.js.map
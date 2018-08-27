webpackJsonp(["starter.module"],{

/***/ "./src/app/pages/starter/starter.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-12\">\n        <div class=\"card\">\n            <div class=\"card-body\">\n                <h3 class=\"card-title\">{{title}}</h3>\n                <h6 class=\"card-subtitle\">{{subtitle}}</h6>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/pages/starter/starter.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StarterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_header_navigation_navigation_service__ = __webpack_require__("./src/app/shared/header-navigation/navigation.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var StarterComponent = /** @class */ (function () {
    function StarterComponent(navService) {
        this.navService = navService;
        this.title = "Starter Page";
        this.subtitle = "This is some text within a card block.";
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
        this.navService.setEditField(false);
        this.navService.setEditButton(false);
        this.navService.setPrintButton(false);
        this.navService.setDeleteButton(false);
        this.navService.setSaveButton(false);
        this.navService.setCancelButton(false);
    }
    StarterComponent.prototype.ngAfterViewInit = function () { };
    StarterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'ea-starter',
            template: __webpack_require__("./src/app/pages/starter/starter.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__shared_header_navigation_navigation_service__["a" /* NavigationService */]])
    ], StarterComponent);
    return StarterComponent;
}());



/***/ }),

/***/ "./src/app/pages/starter/starter.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StarterModule", function() { return StarterModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__starter_component__ = __webpack_require__("./src/app/pages/starter/starter.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var routes = [{
        path: '',
        data: {
            title: 'Starter page',
            urls: [{ title: 'Dashboard', url: '/' }, { title: 'Starter page' }]
        },
        component: __WEBPACK_IMPORTED_MODULE_4__starter_component__["a" /* StarterComponent */]
    }];
var StarterModule = /** @class */ (function () {
    function StarterModule() {
    }
    StarterModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* RouterModule */].forChild(routes)
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_4__starter_component__["a" /* StarterComponent */]]
        })
    ], StarterModule);
    return StarterModule;
}());



/***/ })

});
//# sourceMappingURL=starter.module.chunk.js.map
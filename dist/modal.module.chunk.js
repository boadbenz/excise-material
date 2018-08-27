webpackJsonp(["modal.module"],{

/***/ "./src/app/pages/component/modal/modal.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n\t<div class=\"col-md-6\">\n\t\t<div class=\"card\">\n\t\t\t<div class=\"card-body\">\n\t\t\t\t<h3 class=\"card-title\">Modal with default options</h3>\n\t\t\t\t<h6 class=\"card-subtitle\">This is basic toggletype accordion</h6>\n\t\t\t\t<ng-template #content let-c=\"close\" let-d=\"dismiss\">\n\t\t\t\t\t<div class=\"modal-header\">\n\t\t\t\t\t\t<h4 class=\"modal-title\">Modal title</h4>\n\t\t\t\t\t\t<button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\n\t\t\t\t\t\t\t<span aria-hidden=\"true\">&times;</span>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"modal-body\">\n\t\t\t\t\t\t<p>One fine body&hellip;</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"modal-footer\">\n\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-secondary\" (click)=\"c('Close click')\">Close</button>\n\t\t\t\t\t</div>\n\t\t\t\t</ng-template>\n\n\t\t\t\t<button class=\"btn btn-lg btn-outline-primary\" (click)=\"open2(content)\">Launch demo modal</button>\n\t\t\t\t<div class=\"m-t-20\">{{closeResult}}</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class=\"col-md-6\">\n\t\t<div class=\"card\">\n\t\t\t<div class=\"card-body\">\n\t\t\t\t<h3 class=\"card-title\">Modal with custom class</h3>\n\t\t\t\t<h6 class=\"card-subtitle\">You can pass extra class to the model</h6>\n\t\t\t\t<ng-template #content2 let-c=\"close\" let-d=\"dismiss\">\n\t\t\t\t\t<div class=\"modal-header\">\n\t\t\t\t\t\t<h4 class=\"modal-title text-white\">Modal title</h4>\n\t\t\t\t\t\t<button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\n\t\t\t\t\t\t\t<span aria-hidden=\"true\">&times;</span>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"modal-body\">\n\t\t\t\t\t\t<p>One fine body&hellip;</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"modal-footer\">\n\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-inverse\" (click)=\"c('Close click')\">Close</button>\n\t\t\t\t\t</div>\n\t\t\t\t</ng-template>\n\n\t\t\t\t<button class=\"btn btn-lg btn-outline-primary\" (click)=\"open(content2)\">Launch demo modal</button>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>"

/***/ }),

/***/ "./src/app/pages/component/modal/modal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgbdModalBasic; });
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


var NgbdModalBasic = /** @class */ (function () {
    function NgbdModalBasic(modalService, modalService2) {
        this.modalService = modalService;
        this.modalService2 = modalService2;
    }
    NgbdModalBasic.prototype.open2 = function (content) {
        var _this = this;
        this.modalService.open(content).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    NgbdModalBasic.prototype.open = function (content) {
        this.modalService2.open(content, { windowClass: 'dark-modal' });
    };
    NgbdModalBasic.prototype.getDismissReason = function (reason) {
        if (reason === __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["a" /* ModalDismissReasons */].ESC) {
            return 'by pressing ESC';
        }
        else if (reason === __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["a" /* ModalDismissReasons */].BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return "with: " + reason;
        }
    };
    NgbdModalBasic = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'ngbd-modal',
            template: __webpack_require__("./src/app/pages/component/modal/modal.component.html"),
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* ViewEncapsulation */].None,
            styles: ["\n    .dark-modal .modal-content {\n      background-color: #009efb;\n      color: white;\n    }\n    .dark-modal .close {\n      color: white;   \n    }\n  "]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["d" /* NgbModal */], __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["d" /* NgbModal */]])
    ], NgbdModalBasic);
    return NgbdModalBasic;
}());



/***/ }),

/***/ "./src/app/pages/component/modal/modal.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalModule", function() { return ModalModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modal_component__ = __webpack_require__("./src/app/pages/component/modal/modal.component.ts");
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
            title: 'Modal page',
            urls: [{ title: 'Dashboard', url: '/' }, { title: 'Angular Component' }, { title: 'Modal page' }]
        },
        component: __WEBPACK_IMPORTED_MODULE_4__modal_component__["a" /* NgbdModalBasic */]
    }];
var ModalModule = /** @class */ (function () {
    function ModalModule() {
    }
    ModalModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["k" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__["e" /* NgbModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* RouterModule */].forChild(routes)
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_4__modal_component__["a" /* NgbdModalBasic */]]
        })
    ], ModalModule);
    return ModalModule;
}());



/***/ })

});
//# sourceMappingURL=modal.module.chunk.js.map
webpackJsonp(["list.module.2"],{

/***/ "./src/app/pages/investigation/list/list.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"advSearch | async\" class=\"card card-outline-bluish unset-radius\">\r\n    <div class=\"card-header unset-radius\">\r\n        <app-card-actions-close></app-card-actions-close>\r\n        <h4 class=\"card-title m-b-0\">ค้นหา</h4>\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <form class=\"form-horizontal\" #advForm=\"ngForm\" (ngSubmit)=\"onAdvSearch(advForm)\">\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-3\">เลขที่สืบสวน :</label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-9\">\r\n                    <div class=\"form-group\">\r\n                        <input type=\"text\" id=\"\" name=\"InvestigateCode\" ngModel class=\"form-control form-control-sm\" placeholder=\"\">\r\n                    </div>\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-3\">คดีสืบสวนที่ :</label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-9\">\r\n                    <div class=\"form-group\">\r\n                        <input type=\"text\" id=\"\" name=\"InvestigateNo\" ngModel class=\"form-control form-control-sm\" placeholder=\"\">\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-3\">หัวข้อการสืบสวน :</label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-9\">\r\n                    <div class=\"form-group\">\r\n                        <input type=\"text\" id=\"\" name=\"Subject\" ngModel class=\"form-control form-control-sm\" placeholder=\"\">\r\n                    </div>\r\n                </div>\r\n\r\n                <label for=\"\" class=\"col-lg-2 col-sm-3\">วันที่เริ่มสืบสวน :</label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-9\">\r\n                    <div class=\"form-group input-group\">\r\n                        <input type=\"date\" id=\"\" name=\"DateStartFrom\" ngModel class=\"form-control form-control-sm\" placeholder=\"วว/ดด/ปปปป\">\r\n\r\n                        <label for=\"\">&nbsp; ถึง &nbsp;</label>\r\n\r\n                        <input type=\"date\" id=\"\" name=\"DateStartTo\" ngModel class=\"form-control form-control-sm\" placeholder=\"วว/ดด/ปปปป\">\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"row form-group\">\r\n                <div class=\"col-lg-10 col-8\"></div>\r\n                <div class=\"col-lg-2 col-4\">\r\n                    <button type=\"submit\" class=\"btn btn-block btn-themecolor\">ค้นข้อมูล</button>\r\n                </div>\r\n            </div>\r\n        </form>\r\n    </div>\r\n\r\n</div>\r\n\r\n<div class=\"card unset-radius\">\r\n    <div class=\"card-body p-0\">\r\n        <div class=\"table-responsive\">\r\n            <table #invesTable class=\"table table-sm table-striped\">\r\n                <thead>\r\n                    <tr>\r\n                        <th class=\"text-center\">ลำดับ</th>\r\n                        <th>เลขที่สืบสวน</th>\r\n                        <th>คดีสืบสวนที่</th>\r\n                        <th>หัวข้อการสืบสวน</th>\r\n                        <th>วันที่เริ่มสืบสวน</th>\r\n                        <th>วันที่สิ้นสุดสืบสวน</th>\r\n                        <th>ครั้งที่สืบสวนล่าสุด</th>\r\n                        <th></th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr *ngFor=\"let item of invesList; let i=index;\">\r\n                        <td class=\"text-center\">{{i + 1}}</td>\r\n                        <td>{{item.InvestigateCode}}</td>\r\n                        <td>{{item.InvestigateNo}}</td>\r\n                        <td>{{item.Subject}}</td>\r\n                        <td>{{item.DateStart | date:'dd-MM-yyyy'}}</td>\r\n                        <td>{{item.DateEnd | date:'dd-MM-yyyy'}}</td>\r\n                        <td>{{item.InvestigateDetail?.length}}</td>\r\n                        <td class=\"text-center\">\r\n                            <a href=\"javaScript:void(0);\" class=\"text-secondary\" (click)=\"clickView(item.InvestigateCode)\">\r\n                                <i class=\"fa fa-eye fa-lg\"></i>\r\n                            </a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n    <div class=\"card-footer card-footer-unset\">\r\n        <app-pagination-table \r\n            [TotalItems]=\"paginage.TotalItems\" \r\n            [CurrentPage]=\"paginage.CurrentPage\" \r\n            [PageSize]=\"paginage.PageSize\"\r\n            [RowsPerPageOptions]=\"paginage.RowsPerPageOptions\" \r\n            (onPageChange)=\"pageChanges($event)\">\r\n        </app-pagination-table>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/pages/investigation/list/list.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/investigation/list/list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_header_navigation_navigation_service__ = __webpack_require__("./src/app/shared/header-navigation/navigation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__investigate_service__ = __webpack_require__("./src/app/pages/investigation/investigate.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config_pagination__ = __webpack_require__("./src/app/config/pagination.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config_message__ = __webpack_require__("./src/app/config/message.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_sidebar_sidebar_component__ = __webpack_require__("./src/app/shared/sidebar/sidebar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_preloader_preloader_component__ = __webpack_require__("./src/app/shared/preloader/preloader.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};








var ListComponent = /** @class */ (function () {
    function ListComponent(navService, invesService, router, sidebarService, preLoader) {
        this.navService = navService;
        this.invesService = invesService;
        this.router = router;
        this.sidebarService = sidebarService;
        this.preLoader = preLoader;
        this.investigate = new Array();
        this.invesList = new Array();
        this.paginage = __WEBPACK_IMPORTED_MODULE_4__config_pagination__["a" /* pagination */];
        // set false
        this.navService.setEditButton(false);
        this.navService.setDeleteButton(false);
        this.navService.setPrintButton(false);
        this.navService.setSaveButton(false);
        this.navService.setCancelButton(false);
        this.navService.setNextPageButton(false);
        // set true
        this.navService.setSearchBar(true);
        this.navService.setNewButton(true);
        this.advSearch = this.navService.showAdvSearch;
    }
    ListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sidebarService.setVersion('1.02');
        this.onSearch('');
        this.subOnSearch = this.navService.searchByKeyword.subscribe(function (Textsearch) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!Textsearch) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.navService.setOnSearch('')];
                    case 1:
                        _a.sent();
                        this.onSearch(Textsearch);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
        this.subSetNextPage = this.navService.onNextPage.subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!status) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.navService.setOnNextPage(false)];
                    case 1:
                        _a.sent();
                        this.router.navigate(["/investigation/manage/C/NEW"]);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    };
    ListComponent.prototype.ngOnDestroy = function () {
        this.subOnSearch.unsubscribe();
    };
    ListComponent.prototype.onSearch = function (Textsearch) {
        this.paginage.TotalItems = 0;
        this.preLoader.setShowPreloader(true);
        // this.invesService.getByKeyword(Textsearch).subscribe(list => {
        //     this.onSearchComplete(list);
        //     this.preLoader.setShowPreloader(false);
        // }, (err: HttpErrorResponse) => {
        //     alert(err.message);
        // });
    };
    ListComponent.prototype.onAdvSearch = function (form) {
        var _this = this;
        var sDateCompare = new Date(form.value.DateStartFrom);
        var eDateCompare = new Date(form.value.DateStartTo);
        if (sDateCompare.getTime() > eDateCompare.getTime()) {
            alert(__WEBPACK_IMPORTED_MODULE_5__config_message__["a" /* Message */].checkDate);
        }
        else {
            form.value.DateStartFrom = sDateCompare.getTime();
            form.value.DateStartTo = eDateCompare.getTime();
            this.invesService.getByConAdv(form.value).subscribe(function (list) {
                _this.onSearchComplete(list);
            }, function (err) {
                alert(err.message);
            });
        }
    };
    ListComponent.prototype.onSearchComplete = function (list) {
        this.investigate = [];
        if (!list) {
            alert(__WEBPACK_IMPORTED_MODULE_5__config_message__["a" /* Message */].noRecord);
            return false;
        }
        if (Array.isArray(list)) {
            this.investigate = list;
        }
        else {
            this.investigate.push(list);
        }
        if (!this.investigate.length) {
            alert(__WEBPACK_IMPORTED_MODULE_5__config_message__["a" /* Message */].noRecord);
        }
        // set total record
        this.paginage.TotalItems = this.investigate.length;
    };
    ListComponent.prototype.clickView = function (invesCode) {
        this.router.navigate(["/investigation/manage/R/" + invesCode]);
    };
    ListComponent.prototype.pageChanges = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.investigate.slice(event.startIndex - 1, event.endIndex)];
                    case 1:
                        _a.invesList = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('invesTable'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], ListComponent.prototype, "invesTable", void 0);
    ListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-list',
            template: __webpack_require__("./src/app/pages/investigation/list/list.component.html"),
            styles: [__webpack_require__("./src/app/pages/investigation/list/list.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__shared_header_navigation_navigation_service__["a" /* NavigationService */],
            __WEBPACK_IMPORTED_MODULE_3__investigate_service__["a" /* InvestigateService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */],
            __WEBPACK_IMPORTED_MODULE_6__shared_sidebar_sidebar_component__["b" /* SidebarService */],
            __WEBPACK_IMPORTED_MODULE_7__shared_preloader_preloader_component__["b" /* PreloaderService */]])
    ], ListComponent);
    return ListComponent;
}());



/***/ }),

/***/ "./src/app/pages/investigation/list/list.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListModule", function() { return ListModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__list_component__ = __webpack_require__("./src/app/pages/investigation/list/list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__component_card_actions_card_actions_module__ = __webpack_require__("./src/app/pages/component/card-actions/card-actions.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__investigate_service__ = __webpack_require__("./src/app/pages/investigation/investigate.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__component_pagination_table_pagination_table_module__ = __webpack_require__("./src/app/pages/component/pagination-table/pagination-table.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var routes = [
    {
        path: '',
        data: {
            // title: 'ค้นหาข้อมูล',
            urls: [{ title: 'หน้าหลัก', url: '/' }, { title: 'ค้นหาข้อมูลสืบสวน' }],
            codePage: 'XCS60-01-01-00',
            nextPage: { title: 'รายงานสืบสวน', url: '/investigation/manage' }
        },
        component: __WEBPACK_IMPORTED_MODULE_2__list_component__["a" /* ListComponent */]
    }
];
var ListModule = /** @class */ (function () {
    function ListModule() {
    }
    ListModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_forms__["f" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* RouterModule */].forChild(routes),
                __WEBPACK_IMPORTED_MODULE_4__component_card_actions_card_actions_module__["a" /* CardActionsModule */],
                __WEBPACK_IMPORTED_MODULE_8__component_pagination_table_pagination_table_module__["a" /* PaginationTableModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__list_component__["a" /* ListComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_5__investigate_service__["a" /* InvestigateService */]]
        })
    ], ListModule);
    return ListModule;
}());



/***/ })

});
//# sourceMappingURL=list.module.2.chunk.js.map
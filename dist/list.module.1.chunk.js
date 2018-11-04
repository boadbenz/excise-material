webpackJsonp(["list.module.1"],{

/***/ "./src/app/pages/lawsuit/list/list.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row m-t-10\">\r\n  <div class=\"col-12\">\r\n    <div class=\"card card-outline-bluish unset-radius\" *ngIf=\"advSearch | async\">\r\n      <div class=\"card-header unset-radius\">\r\n        ค้นหาขั้นสูง\r\n        <div class=\"card-actions\">\r\n          <a (click)=\"closeAdvSearch()\">\r\n            <i class=\"ti-close\"></i>\r\n          </a>\r\n        </div>\r\n      </div>\r\n      <div class=\"card-body\">\r\n        <form class=\"form-horizontal\" #advForm=\"ngForm\" (ngSubmit)=\"onAdvSearch(advForm)\">\r\n          <div class=\"form-body\">\r\n            <div class=\"row\">\r\n              <div class=\"col-md-6\">\r\n                <div class=\"form-group row\">\r\n                  <label class=\"col-form-label text-right col-md-3\">เลขที่ใบงาน : </label>\r\n                  <div class=\"col-md-9\">\r\n                    <input class=\"form-control\" type=\"text\" ngModel name=\"ArrestCode\">\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-6\">\r\n                <div class=\"form-group has-danger row\">\r\n                  <label class=\"col-form-label text-right col-md-4\">เลขที่คดีรับคำกล่าวโทษ : </label>\r\n                  <div class=\"col-md-8\">\r\n                    <input class=\"form-control\" type=\"text\" ngModel name=\"LawsuitNo\">\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"col-md-6\">\r\n                <div class=\"form-group row\">\r\n                  <label class=\"col-form-label text-right col-md-3\">วันที่รับคดี : </label>\r\n                  <div class=\"col-md-4\">\r\n                    <input class=\"form-control\" type=\"date\" ngModel name=\"LawsuitDateFrom\">\r\n                  </div>\r\n                  <label class=\"col-form-label text-right col-md-1 px-0\">ถึง : </label>\r\n                  <div class=\"col-md-4\">\r\n                    <input class=\"form-control\" type=\"date\" ngModel name=\"LawsuitDateTo\">\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-6\">\r\n                <div class=\"form-group row\">\r\n                  <label class=\"col-form-label text-right col-md-4\">ชื่อผู้รับคดี : </label>\r\n                  <div class=\"col-md-8\">\r\n                    <input class=\"form-control\" type=\"text\" ngModel name=\"StaffName\">\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"col-md-6\">\r\n                <div class=\"form-group row\">\r\n                  <label class=\"col-form-label text-right col-md-3\">หน่วยงาน : </label>\r\n                  <div class=\"col-md-9\">\r\n                    <input class=\"form-control\" type=\"text\" ngModel name=\"OfficeName\">\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"text-right\">\r\n            <button type=\"submit\" class=\"btn waves-effect waves-light text-white btn-themecolor\">ค้นข้อมูล</button>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n    <div class=\"card\">\r\n      <div class=\"card-body\">\r\n        <div class=\"table-responsive table-striped\">\r\n          <table class=\"table\">\r\n            <thead>\r\n              <tr>\r\n                <th class=\"footable-sortable text-center\">ลำดับ</th>\r\n                <th class=\"footable-sortable\">เลขที่ใบงาน</th>\r\n                <th class=\"footable-sortable\">เลขที่คดีรับคำกล่าวโทษ</th>\r\n                <th class=\"footable-sortable\">วันที่รับคดี</th>\r\n                <th class=\"footable-sortable\">ชื่อผู้รับคดี</th>\r\n                <th class=\"footable-sortable\">หน่วยงาน</th>\r\n                <th class=\"footable-sortable\"></th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr class=\"footable\" *ngFor=\"let item of resultsPerPage; let i = index;\">\r\n                <td class=\"text-center\">{{ item.RowsId || '' }}</td>\r\n                <td>{{ item.ArrestCode || '-' }}</td>\r\n                <td>{{ item.LawsuitNo || '-' }}</td>\r\n                <td>{{ item.LawsuitDate || '-' }}</td>\r\n                <td>\r\n                  <div *ngFor=\"let staff of item.LawsuiteStaff;\">\r\n                    {{ (staff.TitleName || '') + (staff.FullName || '') + ' ' + (staff.LastName || '')}}\r\n                  </div>\r\n                </td>\r\n                <td>\r\n                  <div *ngFor=\"let staff of item.LawsuiteStaff;\">\r\n                    {{ (staff.DepartmentName || '-') }}\r\n                  </div>\r\n                </td>\r\n                <td>\r\n                  <a href=\"javaScript:void(0);\" class=\"text-secondary\" (click)=\"viewData(item)\">\r\n                    <i class=\"mdi mdi-eye fa-lg\"></i>\r\n                  </a>\r\n                </td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n        <div class=\"card-footer card-footer-unset\">\r\n          <app-pagination-table [TotalItems]=\"paginage.TotalItems\" [CurrentPage]=\"paginage.CurrentPage\" [PageSize]=\"paginage.PageSize\"\r\n            [RowsPerPageOptions]=\"paginage.RowsPerPageOptions\" (onPageChange)=\"pageChanges($event)\">\r\n          </app-pagination-table>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/lawsuit/list/list.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/lawsuit/list/list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_pagination__ = __webpack_require__("./src/app/config/pagination.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_message__ = __webpack_require__("./src/app/config/message.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lawsuit_service__ = __webpack_require__("./src/app/pages/lawsuit/lawsuit.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_header_navigation_navigation_service__ = __webpack_require__("./src/app/shared/header-navigation/navigation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__config_dateFormat__ = __webpack_require__("./src/app/config/dateFormat.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_preloader_preloader_component__ = __webpack_require__("./src/app/shared/preloader/preloader.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_sidebar_sidebar_component__ = __webpack_require__("./src/app/shared/sidebar/sidebar.component.ts");
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
    function ListComponent(router, navService, preLoaderService, lawsuitService, sidebarService) {
        this.router = router;
        this.navService = navService;
        this.preLoaderService = preLoaderService;
        this.lawsuitService = lawsuitService;
        this.sidebarService = sidebarService;
        this.results = [];
        this.resultsPerPage = [];
        // advSearchSub: any;
        this.paginage = __WEBPACK_IMPORTED_MODULE_0__config_pagination__["a" /* pagination */];
        this.setShowButton();
        this.advSearch = this.navService.showAdvSearch;
    }
    ListComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.sidebarService.setVersion('0.0.0.3');
                        this.paginage.TotalItems = 0;
                        this.preLoaderService.setShowPreloader(true);
                        return [4 /*yield*/, this.lawsuitService.getByKeywordOnInt().then(function (list) { return _this.onSearchComplete(list); })];
                    case 1:
                        _a.sent();
                        this.subOnSearchByKeyword = this.navService.searchByKeyword.subscribe(function (Textsearch) { return __awaiter(_this, void 0, void 0, function () {
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
                                        this.router.navigate(['/notice/manage', 'C', 'NEW']);
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); });
                        this.preLoaderService.setShowPreloader(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    ListComponent.prototype.ngOnDestroy = function () {
        this.subOnSearchByKeyword.unsubscribe();
        this.subSetNextPage.unsubscribe();
    };
    ListComponent.prototype.onSearch = function (Textsearch) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.preLoaderService.setShowPreloader(true);
                        return [4 /*yield*/, this.lawsuitService.getByKeyword(Textsearch).then(function (list) { return _this.onSearchComplete(list); })];
                    case 1:
                        _a.sent();
                        this.preLoaderService.setShowPreloader(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    ListComponent.prototype.onAdvSearch = function (form) {
        return __awaiter(this, void 0, void 0, function () {
            var sDateCompare, eDateCompare;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (form.value.LawsuitDateFrom && form.value.LawsuitDateTo) {
                            sDateCompare = new Date(form.value.LawsuitDateFrom);
                            eDateCompare = new Date(form.value.LawsuitDateTo);
                            if (sDateCompare.valueOf() > eDateCompare.valueOf()) {
                                alert(__WEBPACK_IMPORTED_MODULE_1__config_message__["a" /* Message */].checkDate);
                                return [2 /*return*/, false];
                            }
                            form.value.LawsuitDateFrom = sDateCompare.toISOString();
                            form.value.LawsuitDateTo = eDateCompare.toISOString();
                        }
                        this.preLoaderService.setShowPreloader(true);
                        return [4 /*yield*/, this.lawsuitService.LawsuitgetByConAdv(form.value).then(function (list) { return _this.onSearchComplete(list); })];
                    case 1:
                        _a.sent();
                        this.preLoaderService.setShowPreloader(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    ListComponent.prototype.setShowButton = function () {
        this.navService.setSearchBar(true);
        this.navService.setPrintButton(false);
        this.navService.setDeleteButton(false);
        this.navService.setCancelButton(false);
        this.navService.setEditButton(false);
        this.navService.setSaveButton(false);
    };
    ListComponent.prototype.onSearchComplete = function (list) {
        /* Alert When No Data To Show */
        if (!list.length) {
            alert(__WEBPACK_IMPORTED_MODULE_1__config_message__["a" /* Message */].noRecord);
            return false;
        }
        /* Adjust Another Column */
        this.results = list.map(function (item, i) {
            item.RowsId = i + 1;
            item.LawsuitDate = Object(__WEBPACK_IMPORTED_MODULE_6__config_dateFormat__["j" /* toLocalShort */])(item.LawsuitDate);
            return item;
        });
        /* Set Total Record */
        this.paginage.TotalItems = this.results.length;
    };
    ListComponent.prototype.viewData = function (item) {
        this.router.navigate(['/lawsuit/manage', 'R'], {
            queryParams: { id: item.LawsuitID, code: item.ArrestCode }
        });
    };
    ListComponent.prototype.closeAdvSearch = function () {
        this.navService.showAdvSearch.next(false);
    };
    ListComponent.prototype.pageChanges = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.results.slice(event.startIndex - 1, event.endIndex)];
                    case 1:
                        _a.resultsPerPage = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["n" /* Component */])({
            selector: "app-list",
            template: __webpack_require__("./src/app/pages/lawsuit/list/list.component.html"),
            styles: [__webpack_require__("./src/app/pages/lawsuit/list/list.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_router__["c" /* Router */], __WEBPACK_IMPORTED_MODULE_3__shared_header_navigation_navigation_service__["a" /* NavigationService */], __WEBPACK_IMPORTED_MODULE_7__shared_preloader_preloader_component__["b" /* PreloaderService */],
            __WEBPACK_IMPORTED_MODULE_2__lawsuit_service__["a" /* LawsuitService */], __WEBPACK_IMPORTED_MODULE_8__shared_sidebar_sidebar_component__["b" /* SidebarService */]])
    ], ListComponent);
    return ListComponent;
}());



/***/ }),

/***/ "./src/app/pages/lawsuit/list/list.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListModule", function() { return ListModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_header_navigation_navigation_component__ = __webpack_require__("./src/app/shared/header-navigation/navigation.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__list_component__ = __webpack_require__("./src/app/pages/lawsuit/list/list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lawsuit_service__ = __webpack_require__("./src/app/pages/lawsuit/lawsuit.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__component_pagination_table_pagination_table_module__ = __webpack_require__("./src/app/pages/component/pagination-table/pagination-table.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__component_card_actions_card_actions_module__ = __webpack_require__("./src/app/pages/component/card-actions/card-actions.module.ts");
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
            urls: [{ title: 'หน้าหลัก', url: '/' }, { title: 'ค้นหาบันทึกรับคำกล่าวโทษ' }],
            codePage: 'XCS60-04-01-00-00',
            pageType: 'list',
            nextPage: { title: 'จัดการข้อมูลบันทึกรับคำกล่าวโทษ', url: '/lawsuit/manage' }
        },
        component: __WEBPACK_IMPORTED_MODULE_3__list_component__["a" /* ListComponent */]
    }
];
var ListModule = /** @class */ (function () {
    function ListModule() {
    }
    ListModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["d" /* RouterModule */].forChild(routes),
                __WEBPACK_IMPORTED_MODULE_10__component_card_actions_card_actions_module__["a" /* CardActionsModule */],
                __WEBPACK_IMPORTED_MODULE_7__component_pagination_table_pagination_table_module__["a" /* PaginationTableModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__list_component__["a" /* ListComponent */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_0__shared_header_navigation_navigation_component__["a" /* NavigationComponent */], __WEBPACK_IMPORTED_MODULE_6__lawsuit_service__["a" /* LawsuitService */]
            ]
        })
    ], ListModule);
    return ListModule;
}());



/***/ })

});
//# sourceMappingURL=list.module.1.chunk.js.map
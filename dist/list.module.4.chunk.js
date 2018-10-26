webpackJsonp(["list.module.4"],{

/***/ "./src/app/pages/notices/list/list.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"advSearch | async\" class=\"card card-outline-bluish unset-radius\">\r\n    <div class=\"card-header unset-radius\">\r\n        <app-card-actions-close></app-card-actions-close>\r\n        <h4 class=\"card-title m-b-0\">ค้นหา</h4>\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <form class=\"form-horizontal\" autocomplete=\"off\" #advForm=\"ngForm\" (ngSubmit)=\"onAdvSearch(advForm)\">\r\n            <div>\r\n                <div class=\"row\">\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-3\">เลขที่ใบแจ้งความ :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-9\">\r\n                        <div class=\"form-group\">\r\n                            <input type=\"text\" name=\"NoticeCode\" ngModel class=\"form-control form-control-sm\">\r\n                        </div>\r\n                    </div>\r\n\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-3\">วันที่รับแจ้งความ :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-9\">\r\n                        <div class=\"form-group input-group\">\r\n                            <my-date-picker-th class=\"form-control form-control-sm unset-form-control\" \r\n                            name=\"DateStartFrom\" [options]=\"myDatePickerOptions\"\r\n                            (dateChanged)=\"onSDateChange($event)\" [(ngModel)]=\"dateStartFrom\"></my-date-picker-th>\r\n                            <label for=\"\">&nbsp;ถึง&nbsp;</label>\r\n                            <my-date-picker-th class=\"form-control form-control-sm unset-form-control\"\r\n                            name=\"DateStartTo\" [options]=\"myDatePickerOptions\"\r\n                            (dateChanged)=\"onEDateChange($event)\" [(ngModel)]=\"dateStartTo\"></my-date-picker-th>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"row\">\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-3\">ชื่อผู้รับแจ้ง :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-9\">\r\n                        <div class=\"form-group\">\r\n                            <input type=\"text\" name=\"StaffName\" ngModel class=\"form-control form-control-sm\">\r\n                        </div>\r\n                    </div>\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-3\">หน่วยงาน :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-9\">\r\n                        <div class=\"form-group\">\r\n                            <input type=\"text\" name=\"DepartmentName\" ngModel class=\"form-control form-control-sm\">\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"row\">\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-3\">ผู้ต้องสงสัย :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-9\">\r\n                        <div class=\"form-group\">\r\n                            <input type=\"text\" name=\"SuspectName\" ngModel class=\"form-control form-control-sm\">\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"row form-group\">\r\n                    <div class=\"col-lg-10 col-8\"></div>\r\n                    <div class=\"col-lg-2 col-4\">\r\n                        <button type=\"submit\" class=\"btn btn-block btn-themecolor\">ค้นข้อมูล</button>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </form>\r\n    </div>\r\n\r\n</div>\r\n\r\n<div class=\"card unset-radius\">\r\n    <div class=\"card-body p-0\">\r\n        <div class=\"table-responsive table-sm table-striped\">\r\n            <table class=\"table\">\r\n                <thead>\r\n                    <tr>\r\n                        <th class=\"text-center\">ลำดับ</th>\r\n                        <th>เลขที่ใบแจ้งความ</th>\r\n                        <th>วันที่แจ้งความ</th>\r\n                        <th>ผู้รับแจ้ง</th>\r\n                        <th>หน่วยงาน</th>\r\n                        <th>ผู้ต้องสงสัย</th>\r\n                        <th></th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr *ngFor=\"let item of noticeList; let i=index;\">\r\n                        <td class=\"text-center\">{{item.RowId}}</td>\r\n                        <td>{{item.NoticeCode}}</td>\r\n                        <td>{{item.NoticeDate}}</td>\r\n                        <td>\r\n                            <div *ngFor=\"let staff of item.NoticeStaff;\">{{staff.StaffFullName}}</div>\r\n                        </td>\r\n                        <td>\r\n                            <div *ngFor=\"let staff of item.NoticeStaff;\">{{staff.DepartmentName}}</div>\r\n                        </td>\r\n                        <td>\r\n                            <div *ngFor=\"let suspect of item.NoticeSuspect;\">{{suspect.SuspectFullName}}</div>\r\n                        </td>\r\n                        <td class=\"text-center\">\r\n                            <a href=\"javaScript:void(0);\" class=\"text-secondary\" (click)=\"view(item.NoticeCode)\">\r\n                                <i class=\"fa fa-eye fa-lg\"></i>\r\n                            </a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n    <div class=\"card-footer card-footer-unset\">\r\n        <app-pagination-table [TotalItems]=\"paginage.TotalItems\" [CurrentPage]=\"paginage.CurrentPage\" [PageSize]=\"paginage.PageSize\"\r\n            [RowsPerPageOptions]=\"paginage.RowsPerPageOptions\" (onPageChange)=\"pageChanges($event)\">\r\n        </app-pagination-table>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/pages/notices/list/list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_header_navigation_navigation_service__ = __webpack_require__("./src/app/shared/header-navigation/navigation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__notice_service__ = __webpack_require__("./src/app/pages/notices/notice.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config_message__ = __webpack_require__("./src/app/config/message.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config_pagination__ = __webpack_require__("./src/app/config/pagination.ts");
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
    function ListComponent(_router, navservice, noticeService, preLoaderService, sidebarService) {
        this._router = _router;
        this.navservice = navservice;
        this.noticeService = noticeService;
        this.preLoaderService = preLoaderService;
        this.sidebarService = sidebarService;
        this.isRequired = false;
        this.paginage = __WEBPACK_IMPORTED_MODULE_5__config_pagination__["a" /* pagination */];
        this.notice = new Array();
        this.noticeList = new Array();
        this.myDatePickerOptions = {
            dateFormat: 'dd mmm yyyy',
            showClearDateBtn: false,
            height: '30px'
        };
        // set false
        this.navservice.setEditButton(false);
        this.navservice.setDeleteButton(false);
        this.navservice.setPrintButton(false);
        this.navservice.setSaveButton(false);
        this.navservice.setCancelButton(false);
        this.navservice.setNextPageButton(false);
        // set true
        this.navservice.setSearchBar(true);
        this.navservice.setNewButton(true);
        this.advSearch = this.navservice.showAdvSearch;
    }
    ListComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.sidebarService.setVersion('0.0.2.12');
                        this.paginage.TotalItems = 0;
                        this.preLoaderService.setShowPreloader(true);
                        return [4 /*yield*/, this.noticeService.getByKeywordOnInt().then(function (list) { return _this.onSearchComplete(list); })];
                    case 1:
                        _a.sent();
                        this.subOnsearchByKeyword = this.navservice.searchByKeyword.subscribe(function (Textsearch) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!Textsearch) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.navservice.setOnSearch('')];
                                    case 1:
                                        _a.sent();
                                        this.onSearch(Textsearch);
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); });
                        this.subSetNextPage = this.navservice.onNextPage.subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!status) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.navservice.setOnNextPage(false)];
                                    case 1:
                                        _a.sent();
                                        this._router.navigate(['/notice/manage', 'C', 'NEW']);
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
        if (this.subOnsearchByKeyword)
            this.subOnsearchByKeyword.unsubscribe();
        if (this.subSetNextPage)
            this.subSetNextPage.unsubscribe();
    };
    ListComponent.prototype.onSearch = function (Textsearch) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.preLoaderService.setShowPreloader(true);
                        return [4 /*yield*/, this.noticeService.getByKeyword(Textsearch).then(function (list) { return _this.onSearchComplete(list); })];
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
            var sdate, edate;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (form.value.DateStartFrom && form.value.DateStartTo) {
                            sdate = Object(__WEBPACK_IMPORTED_MODULE_6__config_dateFormat__["d" /* getDateMyDatepicker */])(form.value.dateStartFrom);
                            edate = Object(__WEBPACK_IMPORTED_MODULE_6__config_dateFormat__["d" /* getDateMyDatepicker */])(form.value.dateStartTo);
                            if (!Object(__WEBPACK_IMPORTED_MODULE_6__config_dateFormat__["b" /* compareDate */])(sdate, edate)) {
                                alert(__WEBPACK_IMPORTED_MODULE_4__config_message__["a" /* Message */].checkDate);
                                return [2 /*return*/, false];
                            }
                            form.value.DateStartFrom = Object(__WEBPACK_IMPORTED_MODULE_6__config_dateFormat__["h" /* setZeroHours */])(sdate);
                            form.value.DateStartTo = Object(__WEBPACK_IMPORTED_MODULE_6__config_dateFormat__["h" /* setZeroHours */])(edate);
                        }
                        this.preLoaderService.setShowPreloader(true);
                        return [4 /*yield*/, this.noticeService.getByConAdv(form.value).then(function (list) { return _this.onSearchComplete(list); })];
                    case 1:
                        _a.sent();
                        this.preLoaderService.setShowPreloader(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    ListComponent.prototype.onSearchComplete = function (list) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!list.length) {
                            alert(__WEBPACK_IMPORTED_MODULE_4__config_message__["a" /* Message */].noRecord);
                            return [2 /*return*/, false];
                        }
                        this.notice = [];
                        return [4 /*yield*/, list
                                .filter(function (item) { return item.IsActive == 1; })
                                .map(function (item, i) {
                                item.RowId = i + 1;
                                item.NoticeDate = Object(__WEBPACK_IMPORTED_MODULE_6__config_dateFormat__["j" /* toLocalShort */])(item.NoticeDate);
                                item.NoticeStaff
                                    .filter(function (_s) { return _s.IsActive == 1; })
                                    .map(function (s) {
                                    s.StaffFullName = s.TitleName + " " + s.FirstName + " " + s.LastName;
                                });
                                item.NoticeSuspect
                                    .filter(function (_s) { return _s.IsActive == 1; })
                                    .map(function (s) {
                                    s.SuspectFullName = s.SuspectTitleName + " " + s.SuspectFirstName + " " + s.SuspectLastName;
                                });
                            })];
                    case 1:
                        _a.sent();
                        this.notice = list;
                        // set total record
                        this.paginage.TotalItems = this.notice.length;
                        return [2 /*return*/];
                }
            });
        });
    };
    ListComponent.prototype.onSDateChange = function (event) {
        this.dateStartFrom = event;
        this.checkDate();
    };
    ListComponent.prototype.onEDateChange = function (event) {
        this.dateStartTo = event;
        this.checkDate();
    };
    ListComponent.prototype.checkDate = function () {
        var _this = this;
        if (this.dateStartFrom && this.dateStartTo) {
            var _sdate_1 = this.dateStartFrom;
            var sdate = Object(__WEBPACK_IMPORTED_MODULE_6__config_dateFormat__["d" /* getDateMyDatepicker */])(this.dateStartFrom);
            var edate = Object(__WEBPACK_IMPORTED_MODULE_6__config_dateFormat__["d" /* getDateMyDatepicker */])(this.dateStartTo);
            if (!Object(__WEBPACK_IMPORTED_MODULE_6__config_dateFormat__["b" /* compareDate */])(sdate, edate)) {
                alert(__WEBPACK_IMPORTED_MODULE_4__config_message__["a" /* Message */].checkDate);
                setTimeout(function () {
                    _this.dateStartTo = { date: _sdate_1.date };
                }, 0);
            }
        }
    };
    ListComponent.prototype.view = function (noticeCode) {
        this._router.navigate(["/notice/manage/R/" + noticeCode]);
    };
    ListComponent.prototype.pageChanges = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.notice.slice(event.startIndex - 1, event.endIndex)];
                    case 1:
                        _a.noticeList = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-list',
            template: __webpack_require__("./src/app/pages/notices/list/list.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */],
            __WEBPACK_IMPORTED_MODULE_2__shared_header_navigation_navigation_service__["a" /* NavigationService */],
            __WEBPACK_IMPORTED_MODULE_3__notice_service__["a" /* NoticeService */],
            __WEBPACK_IMPORTED_MODULE_7__shared_preloader_preloader_component__["b" /* PreloaderService */],
            __WEBPACK_IMPORTED_MODULE_8__shared_sidebar_sidebar_component__["b" /* SidebarService */]])
    ], ListComponent);
    return ListComponent;
}());



/***/ }),

/***/ "./src/app/pages/notices/list/list.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListModule", function() { return ListModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__list_component__ = __webpack_require__("./src/app/pages/notices/list/list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__component_card_actions_card_actions_module__ = __webpack_require__("./src/app/pages/component/card-actions/card-actions.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__notice_service__ = __webpack_require__("./src/app/pages/notices/notice.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__component_pagination_table_pagination_table_module__ = __webpack_require__("./src/app/pages/component/pagination-table/pagination-table.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_mydatepicker_th__ = __webpack_require__("./node_modules/mydatepicker-th/index.js");
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
            urls: [
                { title: 'หน้าหลัก', url: '/' },
                { title: 'ค้นหาใบแจ้งความนำจับ' }
            ],
            codePage: 'XCS60-02-01-00'
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
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* RouterModule */].forChild(routes),
                __WEBPACK_IMPORTED_MODULE_5__component_card_actions_card_actions_module__["a" /* CardActionsModule */],
                __WEBPACK_IMPORTED_MODULE_9__component_pagination_table_pagination_table_module__["a" /* PaginationTableModule */],
                __WEBPACK_IMPORTED_MODULE_10_mydatepicker_th__["a" /* MyDatePickerTHModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__list_component__["a" /* ListComponent */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__notice_service__["a" /* NoticeService */]
            ]
        })
    ], ListModule);
    return ListModule;
}());



/***/ })

});
//# sourceMappingURL=list.module.4.chunk.js.map
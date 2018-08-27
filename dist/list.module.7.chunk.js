webpackJsonp(["list.module.7"],{

/***/ "./src/app/pages/arrests/list/list.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <app-horizontal-timeline></app-horizontal-timeline> -->\n\n<div *ngIf=\"advSearch | async\" class=\"card card-outline-bluish unset-radius\">\n    <div class=\"card-header unset-radius\">\n        <app-card-actions-close></app-card-actions-close>\n        <h4 class=\"card-title m-b-0\">ค้นหา</h4>\n    </div>\n    <div class=\"card-body\">\n        <form class=\"form-horizontal\" autocomplete=\"off\" #advForm=\"ngForm\" (ngSubmit)=\"onAdvSearch(advForm)\">\n            <div>\n                <div class=\"row\">\n                    <label for=\"\" class=\"col-lg-2 col-sm-3\">ใบรับแจ้งความนำจับ :</label>\n                    <div class=\"col-lg-4 col-md-7 col-sm-9\">\n                        <div class=\"form-group\">\n                            <input type=\"text\" name=\"NoticeCode\" ngModel class=\"form-control form-control-sm\" placeholder=\"\">\n                        </div>\n                    </div>\n\n                    <label for=\"\" class=\"col-lg-2 col-sm-3\">เลขที่ใบงาน :</label>\n                    <div class=\"col-lg-4 col-md-7 col-sm-9\">\n                        <div class=\"form-group\">\n                            <input type=\"text\" name=\"ArrestCode\" ngModel class=\"form-control form-control-sm\" placeholder=\"\">\n                        </div>\n                    </div>\n\n                </div>\n\n                <div class=\"row\">\n                    <label for=\"\" class=\"col-lg-2 col-sm-3\">วันที่รับแจ้งความ :</label>\n                    <div class=\"col-lg-4 col-md-7 col-sm-9\">\n                        <div class=\"form-group input-group\">\n                            <my-date-picker-th name=\"OccurrenceDateFrom\" [options]=\"myDatePickerOptions\"\n                            (dateChanged)=\"onSDateChange($event)\" ngModel></my-date-picker-th>\n\n                            <label for=\"OccurrenceDateTo\">&nbsp;ถึง&nbsp;</label>\n\n                            <my-date-picker-th id=\"OccurrenceDateTo\" name=\"OccurrenceDateTo\" [options]=\"myDatePickerOptions\"\n                            (dateChanged)=\"onEDateChange($event)\" [(ngModel)]=\"OccurrenceDateTo\"\n                            ></my-date-picker-th>\n                        </div>\n                    </div>\n                    <label for=\"\" class=\"col-lg-2 col-sm-3\">ชื่อผู้กล่าวหา :</label>\n                    <div class=\"col-lg-4 col-md-7 col-sm-9\">\n                        <div class=\"form-group\">\n                            <input type=\"text\" name=\"StaffName\" ngModel class=\"form-control form-control-sm\" placeholder=\"\">\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"row\">\n                    <label for=\"\" class=\"col-lg-2 col-sm-3\">หน่วยงาน :</label>\n                    <div class=\"col-lg-4 col-md-7 col-sm-9\">\n                        <div class=\"form-group\">\n                            <input type=\"text\" name=\"OfficeName\" ngModel class=\"form-control form-control-sm\" placeholder=\"\">\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"row form-group\">\n                    <div class=\"col-10\"></div>\n                    <div class=\"col-2\">\n                        <button type=\"submit\" class=\"btn btn-block btn-themecolor\">ค้นข้อมูล</button>\n                    </div>\n                </div>\n            </div>\n        </form>\n    </div>\n\n</div>\n\n<div class=\"card unset-radius\">\n    <div class=\"card-body p-0\">\n\n        <div class=\"table-responsive\">\n            <table #arrestTable class=\"table table-sm table-striped\">\n                <thead>\n                    <tr>\n                        <th class=\"text-center\">ลำดับ</th>\n                        <th>เลขที่ใบแจ้งความ</th>\n                        <th>เลขที่ใบงาน</th>\n                        <th>วันที่จับกุม</th>\n                        <th>ชื่อผู้กล่าวหา</th>\n                        <th>หน่วยงาน</th>\n                        <th></th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr *ngFor=\"let item of arrestList; let i=index\">\n                        <td class=\"text-center\">{{item.RowsId}}</td>\n                        <td>{{item.NoticeCode}}</td>\n                        <td>{{item.ArrestCode}}</td>\n                        <td class=\"text-center\">{{item.OccurrenceDate}}</td>\n                        <td>\n                            <div *ngFor=\"let staff of item.ArrestStaff;\">{{staff.FullName}}</div>\n                        </td>\n                        <td>\n                            <div *ngFor=\"let staff of item.ArrestStaff;\">{{staff.DepartmentName}}</div>\n                        </td>\n                        <td class=\"text-center\">\n                            <a href=\"javaScript:void(0);\" class=\"text-secondary\" (click)=\"clickView(item.ArrestCode)\">\n                                <i class=\"fa fa-eye fa-lg\"></i>\n                            </a>\n                        </td>\n                    </tr>\n\n                </tbody>\n            </table>\n        </div>\n    </div>\n    <div class=\"card-footer card-footer-unset\">\n        <app-pagination-table [TotalItems]=\"paginage.TotalItems\" [CurrentPage]=\"paginage.CurrentPage\" [PageSize]=\"paginage.PageSize\"\n            [RowsPerPageOptions]=\"paginage.RowsPerPageOptions\" (onPageChange)=\"pageChanges($event)\">\n        </app-pagination-table>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/pages/arrests/list/list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_header_navigation_navigation_service__ = __webpack_require__("./src/app/shared/header-navigation/navigation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__arrests_service__ = __webpack_require__("./src/app/pages/arrests/arrests.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config_message__ = __webpack_require__("./src/app/config/message.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config_dateFormat__ = __webpack_require__("./src/app/config/dateFormat.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__config_pagination__ = __webpack_require__("./src/app/config/pagination.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_sidebar_sidebar_component__ = __webpack_require__("./src/app/shared/sidebar/sidebar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_preloader_preloader_component__ = __webpack_require__("./src/app/shared/preloader/preloader.component.ts");
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
    function ListComponent(navService, arrestService, router, sidebarService, preLoader, chRef) {
        this.navService = navService;
        this.arrestService = arrestService;
        this.router = router;
        this.sidebarService = sidebarService;
        this.preLoader = preLoader;
        this.chRef = chRef;
        this.paginage = __WEBPACK_IMPORTED_MODULE_6__config_pagination__["a" /* pagination */];
        this.arrestList = new Array();
        this.arrest = new Array();
        this.myDatePickerOptions = {
            dateFormat: 'dd mmm yyyy',
            showClearDateBtn: false,
            height: '30px'
        };
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
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.sidebarService.setVersion('0.0.0.9');
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
                                this.router.navigate(['/arrest/manage', 'C', 'NEW']);
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    ListComponent.prototype.onSearch = function (Textsearch) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.paginage.TotalItems = 0;
                        this.preLoader.setShowPreloader(true);
                        return [4 /*yield*/, this.arrestService.getByKeyword(Textsearch).then(function (res) { return _this.onSearchComplete(res); })];
                    case 1:
                        _a.sent();
                        this.preLoader.setShowPreloader(false);
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
                        if (form.value.OccurrenceDateFrom && form.value.OccurrenceDateTo) {
                            sdate = Object(__WEBPACK_IMPORTED_MODULE_5__config_dateFormat__["c" /* getDateMyDatepicker */])(form.value.OccurrenceDateFrom);
                            edate = Object(__WEBPACK_IMPORTED_MODULE_5__config_dateFormat__["c" /* getDateMyDatepicker */])(form.value.OccurrenceDateTo);
                            if (!Object(__WEBPACK_IMPORTED_MODULE_5__config_dateFormat__["b" /* compareDate */])(sdate, edate)) {
                                alert(__WEBPACK_IMPORTED_MODULE_4__config_message__["a" /* Message */].checkDate);
                                return [2 /*return*/];
                            }
                            form.value.OccurrenceDateFrom = Object(__WEBPACK_IMPORTED_MODULE_5__config_dateFormat__["g" /* setZeroHours */])(sdate);
                            form.value.OccurrenceDateTo = Object(__WEBPACK_IMPORTED_MODULE_5__config_dateFormat__["g" /* setZeroHours */])(edate);
                        }
                        this.paginage.TotalItems = 0;
                        this.preLoader.setShowPreloader(true);
                        console.log('===================');
                        console.log(JSON.stringify(form.value));
                        console.log('===================');
                        return [4 /*yield*/, this.arrestService.getByConAdv(form.value).then(function (res) { return _this.onSearchComplete(res); })];
                    case 1:
                        _a.sent();
                        this.preLoader.setShowPreloader(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    ListComponent.prototype.onSearchComplete = function (list) {
        if (!list.length) {
            alert(__WEBPACK_IMPORTED_MODULE_4__config_message__["a" /* Message */].noRecord);
            return false;
        }
        this.arrest = [];
        list.map(function (p, i) {
            p.RowsId = i + 1;
            p.OccurrenceDate = Object(__WEBPACK_IMPORTED_MODULE_5__config_dateFormat__["i" /* toLocalShort */])(p.OccurrenceDate);
            p.ArrestStaff.map(function (staff) {
                staff.FullName = staff.TitleName + " " + staff.FirstName + " " + staff.LastName;
            });
        });
        this.arrest = list;
        // set total record
        this.paginage.TotalItems = this.arrest.length;
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
            var sdate = Object(__WEBPACK_IMPORTED_MODULE_5__config_dateFormat__["c" /* getDateMyDatepicker */])(this.dateStartFrom);
            var edate = Object(__WEBPACK_IMPORTED_MODULE_5__config_dateFormat__["c" /* getDateMyDatepicker */])(this.dateStartTo);
            if (!Object(__WEBPACK_IMPORTED_MODULE_5__config_dateFormat__["b" /* compareDate */])(sdate, edate)) {
                alert(__WEBPACK_IMPORTED_MODULE_4__config_message__["a" /* Message */].checkDate);
                setTimeout(function () {
                    _this.OccurrenceDateTo = { date: _this.dateStartFrom.date };
                }, 0);
            }
        }
    };
    ListComponent.prototype.clickView = function (code) {
        this.router.navigate(["/arrest/manage/R/" + code]);
    };
    ListComponent.prototype.pageChanges = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.arrest.slice(event.startIndex - 1, event.endIndex)];
                    case 1:
                        _a.arrestList = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ListComponent.prototype.ngOnDestroy = function () {
        this.subOnSearch.unsubscribe();
        this.subSetNextPage.unsubscribe();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('arrestTable'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], ListComponent.prototype, "arrestTable", void 0);
    ListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-list',
            template: __webpack_require__("./src/app/pages/arrests/list/list.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__shared_header_navigation_navigation_service__["a" /* NavigationService */],
            __WEBPACK_IMPORTED_MODULE_3__arrests_service__["a" /* ArrestsService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */],
            __WEBPACK_IMPORTED_MODULE_7__shared_sidebar_sidebar_component__["b" /* SidebarService */],
            __WEBPACK_IMPORTED_MODULE_8__shared_preloader_preloader_component__["b" /* PreloaderService */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */]])
    ], ListComponent);
    return ListComponent;
}());



/***/ }),

/***/ "./src/app/pages/arrests/list/list.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListModule", function() { return ListModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__list_component__ = __webpack_require__("./src/app/pages/arrests/list/list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__component_card_actions_card_actions_module__ = __webpack_require__("./src/app/pages/component/card-actions/card-actions.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__arrests_service__ = __webpack_require__("./src/app/pages/arrests/arrests.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
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
            // title: 'ค้นหาข้อมูล',
            urls: [{ title: 'หน้าหลัก', url: '/' }, { title: 'ค้นหางานจับกุม' }],
            codePage: 'XCS60-03-01-00-00'
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
                __WEBPACK_IMPORTED_MODULE_8__angular_forms__["f" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_forms__["k" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* RouterModule */].forChild(routes),
                __WEBPACK_IMPORTED_MODULE_4__component_card_actions_card_actions_module__["a" /* CardActionsModule */],
                __WEBPACK_IMPORTED_MODULE_9__component_pagination_table_pagination_table_module__["a" /* PaginationTableModule */],
                __WEBPACK_IMPORTED_MODULE_10_mydatepicker_th__["a" /* MyDatePickerTHModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__list_component__["a" /* ListComponent */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_5__arrests_service__["a" /* ArrestsService */]]
        })
    ], ListModule);
    return ListModule;
}());



/***/ })

});
//# sourceMappingURL=list.module.7.chunk.js.map
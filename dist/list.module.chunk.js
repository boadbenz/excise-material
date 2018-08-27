webpackJsonp(["list.module"],{

/***/ "./src/app/pages/reward/list/list.component.html":
/***/ (function(module, exports) {

module.exports = "<div  class=\"card\" *ngIf=\"advSearch | async\">\n  <div class=\"card-header unset-radius\">\n    ค้นหาขั้นสูง\n    <div class=\"card-actions\">\n      <a (click)=\"closeAdvSearch()\">\n        <i class=\"ti-close\"></i>\n      </a>\n    </div>\n  </div>\n  <div class=\"card-body\">\n    <form class=\"form-horizontal\" #avdSearchForm=\"ngForm\" (ngSubmit)=\"onAdvSearch(avdSearchForm)\">\n      <div>\n        <div class=\"row\">\n          <label for=\"\" class=\"col-md-2 control-label \">เลขที่ใบงาน :</label>\n          <div class=\"col-md-4 padding-input-adv-search\">\n            <div class=\"form-group\">\n              <div class=\"form-line\">\n                <input type=\"text\" id=\"\" ngModel name=\"ArrestCode\" class=\"form-control\" placeholder=\"\">\n              </div>\n            </div>\n          </div>\n          <label for=\"\" class=\"col-md-2 control-label padding-adv-search\">เลขที่คดีรับคำกล่าวโทษ :</label>\n          <div class=\"col-md-4 padding-input-adv-search\">\n            <div class=\"form-group\">\n              <div class=\"form-line\">\n                <input type=\"text\" id=\"\" ngModel name=\"LawsuitID\" class=\"form-control \" placeholder=\"\">\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"row\">\n          <label for=\"\" class=\"col-md-2 control-label \">วันที่จับกุม :</label>\n          <div class=\"col-md-4 padding-input-adv-search\">\n            <div class=\"form-group input-group form-line\">\n              <input type=\"date\" id=\"\" ngModel name=\"sArrestDate\" class=\"form-control \" placeholder=\"วว/ดด/ปปปป\">\n              <label class=\"col-2 control-label text-center padding-adv-search\">ถึง</label>\n              <input type=\"date\" id=\"\" ngModel name=\"eArrestDate\" class=\"form-control \" placeholder=\"วว/ดด/ปปปป\">\n            </div>\n          </div>\n          <label for=\"\" class=\"col-md-2 control-label padding-adv-search\">วันที่รับคดี :</label>\n          <div class=\"col-md-4 padding-input-adv-search\">\n            <div class=\"form-group input-group form-line\">\n              <input type=\"date\" id=\"\" ngModel name=\"sLawsuitDate\" class=\"form-control \" placeholder=\"วว/ดด/ปปปป\">\n              <label class=\"col-2 control-label text-center padding-adv-search\">ถึง</label>\n              <input type=\"date\" id=\"\" ngModel name=\"eLawsuitDate\" class=\"form-control \" placeholder=\"วว/ดด/ปปปป\">\n            </div>\n          </div>\n        </div>\n\n        <div class=\"row\">\n          <label for=\"\" class=\"col-md-2 control-label \">ผู้กล่าวหา :</label>\n          <div class=\"col-md-4 padding-input-adv-search\">\n            <div class=\"form-group\">\n              <div class=\"form-line\">\n                <input type=\"text\" id=\"\" name=\"MasStaff\" ngModel class=\"form-control \" placeholder=\"\" [ngbTypeahead]=\"onAutoCompleteStaff\">\n              </div>\n            </div>\n          </div>\n          <label for=\"\" class=\"col-md-2 control-label padding-adv-search\">หน่วยงาน :</label>\n          <div class=\"col-md-4 padding-input-adv-search\">\n            <div class=\"form-group\">\n              <div class=\"form-line\">\n                <input type=\"text\" id=\"\" ngModel name=\"DepartmentName\" class=\"form-control \" placeholder=\"\" [ngbTypeahead]=\"onAutoCompleteDepartment\">\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\" text-right\">\n          <button class=\"btn waves-effect waves-light btn-navy\">ค้นข้อมูล</button>\n        </div>\n      </div>\n    </form>\n  </div>\n</div>\n\n\n<div class=\"row\">\n  <div class=\"col-12\">\n    <div class=\"card\">\n      <div>\n        <div class=\"card-body\">\n          <div class=\"table-responsive\">\n            <table #rewardTable class=\"dataTable table table-sm table-striped table-hover\">\n              <thead>\n              <tr>\n                <th class=\"text-center\">ลำดับ</th>\n                <th>เลขที่ใบงาน</th>\n                <th>เลขที่คดีรับคำกล่าวโทษ</th>\n                <th>วันที่จับกุม</th>\n                <th>วันที่รับคดี</th>\n                <th>ชื่อผู้กล่าวหา</th>\n                <th>หน่วยงาน</th>\n                <th></th>\n              </tr>\n              </thead>\n              <tbody>\n              <tr *ngFor=\"let item of resultsPerPage; let i = index;\">\n                <td class=\"text-center\">{{ item.RowsId || '-' }}</td>\n                <td>{{ item.ArrestCode || '-' }}</td>\n                <td>{{ item.LawsuitID || '-' }}</td>\n                <td>{{ item.ArrestDate || '-' }}</td>\n                <td>{{ item.LawsuitDate || '-' }}</td>\n                <td>{{ item.Lawbreaker || '-' }}</td>\n                <td>{{ item.DepartmentName || '-' }}</td>\n                <td>\n                  <a href=\"javaScript:void(0);\" class=\"text-secondary\" (click)=\"viewData(item.ArrestCode)\">\n                    <i class=\"mdi mdi-eye fa-lg\"></i>\n                  </a>\n                </td>\n              </tr>\n              </tbody>\n            </table>\n          </div>\n\n        </div>\n        <div class=\"card-footer card-footer-unset\">\n          <app-pagination-table\n            [TotalItems]=\"paginage.TotalItems\"\n            [CurrentPage]=\"paginage.CurrentPage\"\n            [PageSize]=\"paginage.PageSize\"\n            [RowsPerPageOptions]=\"paginage.RowsPerPageOptions\"\n            (onPageChange)=\"pageChanges($event)\">\n          </app-pagination-table>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/pages/reward/list/list.component.scss":
/***/ (function(module, exports) {

module.exports = ".pages {\n  padding: 10px; }\n\n.pages a {\n  color: #67757c; }\n\n.padding-adv-search {\n  padding-right: 0;\n  padding-left: 0px; }\n\n.padding-input-adv-search {\n  padding-left: 5px; }\n\n.pages {\n  padding: 10px; }\n\n.border-navy {\n  border-color: #005C97; }\n\n.table-striped tbody tr:nth-of-type(2n+1) {\n  background: #e5eef4; }\n\n.card-navy {\n  background: #ccdeea; }\n\n.btn-navy {\n  background: #005e8d;\n  color: white; }\n\n.icn-collapse {\n  color: black;\n  font-size: 18px; }\n\n.top-navbar {\n  background: linear-gradient(45deg, #005e8d, #353993); }\n\n.btn-action {\n  color: red;\n  font-size: 20px;\n  cursor: pointer; }\n\n#btn-browse {\n  opacity: 0; }\n\n.modal-lg {\n  max-width: 1200px;\n  margin-left: 170px; }\n\n.modal-content {\n  max-height: 650px; }\n\n.card-popup {\n  max-height: 300px; }\n\n.card-overflow {\n  overflow: auto; }\n\n.form-popup {\n  margin-bottom: 0; }\n\n.col-form-label {\n  color: black;\n  font-weight: 400; }\n\n.close-popup {\n  cursor: pointer; }\n"

/***/ }),

/***/ "./src/app/pages/reward/list/list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_header_navigation_navigation_service__ = __webpack_require__("./src/app/shared/header-navigation/navigation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_debounceTime__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/debounceTime.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/distinctUntilChanged.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_of__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_do__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/do.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__reward_service__ = __webpack_require__("./src/app/pages/reward/reward.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__config_pagination__ = __webpack_require__("./src/app/config/pagination.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__config_message__ = __webpack_require__("./src/app/config/message.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__config_dateFormat__ = __webpack_require__("./src/app/config/dateFormat.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__shared_preloader_preloader_component__ = __webpack_require__("./src/app/shared/preloader/preloader.component.ts");
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
    function ListComponent(router, activeRoute, navService, preLoaderService, rewardService) {
        var _this = this;
        this.router = router;
        this.activeRoute = activeRoute;
        this.navService = navService;
        this.preLoaderService = preLoaderService;
        this.rewardService = rewardService;
        this.results = [];
        this.resultsPerPage = [];
        this.staffs = [];
        this.departments = [];
        this.paginage = __WEBPACK_IMPORTED_MODULE_11__config_pagination__["a" /* pagination */];
        this.onAutoCompleteStaff = function (text$) {
            return text$.debounceTime(200).distinctUntilChanged().do(function (term) {
                if (term.length > 2) {
                    _this.autoCompleteStaff(term);
                }
            }).map(function (term) { return term.length < 2 ? []
                : _this.staffs.map(function (value, index, array) { return value.TitleName + value.FirstName + ' ' + value.LastName; }); });
        };
        this.onAutoCompleteDepartment = function (text$) {
            return text$.debounceTime(200).distinctUntilChanged().do(function (term) {
                if (term.length > 2) {
                    _this.autoCompleteDepartment(term);
                }
            }).map(function (term) { return term.length < 2 ? []
                : _this.departments.map(function (value, index, array) { return value.DepartmentNameTH; }); });
        };
        /* Initial Adv.Search */
        this.advSearch = this.navService.showAdvSearch;
        this.advSearchSub = this.navService.searchByKeyword.subscribe(function (filterValue) {
            if (filterValue) {
                _this.rewardService.getByKeyword(filterValue)
                    .then(function (res) { return _this.onSearchComplete(res); });
            }
        });
    }
    ListComponent.prototype.setShowButton = function () {
        this.navService.setEditButton(false);
        this.navService.setDeleteButton(false);
        this.navService.setPrintButton(false);
        this.navService.setSaveButton(false);
        this.navService.setCancelButton(false);
        this.navService.setNextPageButton(false);
        this.navService.setNewButton(true);
        this.navService.setSearchBar(true);
    };
    ListComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /* Display Button */
                        this.setShowButton();
                        /* Load Data*/
                        this.preLoaderService.setShowPreloader(true);
                        return [4 /*yield*/, this.rewardService.getByKeywordOnInt().then(function (list) { return _this.onSearchComplete(list); })];
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
                /* Alert When No Data To Show */
                if (!list.length) {
                    alert(__WEBPACK_IMPORTED_MODULE_12__config_message__["a" /* Message */].noRecord);
                    return [2 /*return*/, false];
                }
                /* Adjust Another Column */
                this.results = list.map(function (item, i) {
                    item.RowsId = i + 1;
                    item.ArrestDate = Object(__WEBPACK_IMPORTED_MODULE_13__config_dateFormat__["i" /* toLocalShort */])(item.ArrestDate);
                    item.LawsuitDate = Object(__WEBPACK_IMPORTED_MODULE_13__config_dateFormat__["i" /* toLocalShort */])(item.LawsuitDate);
                    item.Lawbreaker = (item.ArrestLawbreaker || []).length > 0 ? (item.ArrestLawbreaker[0].LawbreakerTitleName +
                        item.ArrestLawbreaker[0].LawbreakerFirstName + ' ' + item.ArrestLawbreaker[0].LawbreakerLastName) : '';
                    return item;
                });
                /* Set Total Record */
                this.paginage.TotalItems = this.results.length;
                return [2 /*return*/];
            });
        });
    };
    ListComponent.prototype.onAdvSearch = function (form) {
        return __awaiter(this, void 0, void 0, function () {
            var sDateCompare, eDateCompare, sDateCompare, eDateCompare;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (form.value.sArrestDate && form.value.eArrestDate) {
                            sDateCompare = new Date(form.value.sArrestDate);
                            eDateCompare = new Date(form.value.eArrestDate);
                            if (sDateCompare.valueOf() > eDateCompare.valueOf()) {
                                alert(__WEBPACK_IMPORTED_MODULE_12__config_message__["a" /* Message */].checkDate);
                                return [2 /*return*/, false];
                            }
                            form.value.sArrestDate = sDateCompare.toISOString();
                            form.value.eArrestDate = eDateCompare.toISOString();
                        }
                        else if (form.value.sLawsuitDate && form.value.eLawsuitDate) {
                            sDateCompare = new Date(form.value.sLawsuitDate);
                            eDateCompare = new Date(form.value.eLawsuitDate);
                            if (sDateCompare.valueOf() > eDateCompare.valueOf()) {
                                alert(__WEBPACK_IMPORTED_MODULE_12__config_message__["a" /* Message */].checkDate);
                                return [2 /*return*/, false];
                            }
                            form.value.sLawsuitDate = sDateCompare.toISOString();
                            form.value.eLawsuitDate = eDateCompare.toISOString();
                        }
                        this.preLoaderService.setShowPreloader(true);
                        return [4 /*yield*/, this.rewardService.getByConAdv(form.value).then(function (list) { return _this.onSearchComplete(list); })];
                    case 1:
                        _a.sent();
                        this.preLoaderService.setShowPreloader(false);
                        return [2 /*return*/];
                }
            });
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
    ListComponent.prototype.ngOnDestroy = function () {
        this.advSearchSub.unsubscribe();
    };
    ListComponent.prototype.autoCompleteStaff = function (term) {
        var _this = this;
        this.rewardService.getMasStaffRequestGetByKeyword(term).then(function (response) {
            _this.staffs = response;
        });
    };
    ListComponent.prototype.autoCompleteDepartment = function (term) {
        var _this = this;
        return this.rewardService.getMasDepartmentRequestGetByKeyword(term).then(function (response) {
            console.log(response);
            _this.departments = response;
        });
    };
    ListComponent.prototype.viewData = function (arrestCode) {
        this.router.navigate(['/reward/manage', 'R', 'v'], { queryParams: { ArrestCode: arrestCode } });
    };
    ListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-list',
            template: __webpack_require__("./src/app/pages/reward/list/list.component.html"),
            styles: [__webpack_require__("./src/app/pages/reward/list/list.component.scss")],
            providers: [__WEBPACK_IMPORTED_MODULE_10__reward_service__["a" /* RewardService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_2__shared_header_navigation_navigation_service__["a" /* NavigationService */],
            __WEBPACK_IMPORTED_MODULE_14__shared_preloader_preloader_component__["b" /* PreloaderService */],
            __WEBPACK_IMPORTED_MODULE_10__reward_service__["a" /* RewardService */]])
    ], ListComponent);
    return ListComponent;
}());



/***/ }),

/***/ "./src/app/pages/reward/list/list.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListModule", function() { return ListModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__list_component__ = __webpack_require__("./src/app/pages/reward/list/list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__component_pagination_table_pagination_table_module__ = __webpack_require__("./src/app/pages/component/pagination-table/pagination-table.module.ts");
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
            urls: [{ title: 'หน้าหลัก', url: '/' }, { title: 'ค้นหาคำร้องขอรับเงินสินบนรางวัล' }],
            pageType: 'list',
            nextPage: { title: 'จัดการข้อมูลคำร้องขอรับเงินสินบนรางวัล', url: '/reward/manage' }
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
                __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__["e" /* NgbModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["k" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_7__component_pagination_table_pagination_table_module__["a" /* PaginationTableModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* RouterModule */].forChild(routes)
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__list_component__["a" /* ListComponent */]]
        })
    ], ListModule);
    return ListModule;
}());



/***/ })

});
//# sourceMappingURL=list.module.chunk.js.map
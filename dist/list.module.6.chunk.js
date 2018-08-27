webpackJsonp(["list.module.6"],{

/***/ "./src/app/pages/fine/list/list.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"advSearch | async\" class=\"card card-outline-bluish unset-radius\">\n  <div class=\"card-header unset-radius\">\n    <app-card-actions-close></app-card-actions-close>\n    <h4 class=\"card-title m-b-0\">ค้นหาขั้นสูง</h4>\n  </div>\n\n  <div class=\"card-body\">\n    <form class=\"form-horizontal\" #advForm=\"ngForm\" (ngSubmit)=\"onAdvSearch(advForm)\">\n      <div>\n        <div class=\"row\">\n          <label for=\"\" class=\"col-md-2 control-label padding-adv-search\">เลขที่ใบงาน :</label>\n          <div class=\"col-md-4 padding-input-adv-search\">\n            <div class=\"form-group\">\n              <div class=\"form-line\">\n                <input type=\"text\" name=\"ArrestCode\" ngModel class=\"form-control \" placeholder=\"\">\n              </div>\n            </div>\n          </div>\n          <label for=\"\" class=\"col-md-2 control-label padding-adv-search\">เลขที่คดีรับคำกล่าวโทษ :</label>\n          <div class=\"col-md-4 padding-input-adv-search\">\n            <div class=\"form-group\">\n              <div class=\"form-line\">\n                <input type=\"text\" name=\"LawsuitCode\" ngModel class=\"form-control \" placeholder=\"\">\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"row\">\n          <label for=\"\" class=\"col-md-2 control-label padding-adv-search\">ทะเบียนตรวจพิสูจน์ :</label>\n          <div class=\"col-md-4 padding-input-adv-search\">\n            <div class=\"form-group\">\n              <div class=\"form-line\">\n                <input type=\"text\" name=\"ProveReportNo\" ngModel class=\"form-control \" placeholder=\"\">\n              </div>\n            </div>\n          </div>\n          <label for=\"\" class=\"col-md-2 control-label padding-adv-search\">เลขที่เปรียบเทียบคดี :</label>\n          <div class=\"col-md-4 padding-input-adv-search\">\n            <div class=\"form-group\">\n              <div class=\"form-line\">\n                <input type=\"text\" name=\"CompareCode\" ngModel class=\"form-control \" placeholder=\"\">\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"row\">\n          <label for=\"\" class=\"col-md-2 control-label padding-adv-search\">วันที่เปรียบเทียบคดี :</label>\n          <div class=\"col-md-4 padding-input-adv-search\">\n            <div class=\"form-group input-group form-line\">\n              <input type=\"date\" name=\"CompareDateFrom\" ngModel class=\"form-control \" placeholder=\"วว/ดด/ปปปป\">\n              <label class=\"col-2 control-label text-center padding-adv-search\">ถึง</label>\n              <input type=\"date\" name=\"CompareDateTo\" ngModel class=\"form-control \" placeholder=\"วว/ดด/ปปปป\">\n            </div>\n          </div>\n\n          <input type=\"hidden\" name=\"ProgramCode\" ngModel>\n          <input type=\"hidden\" name=\"ProcessCode\" ngModel>\n\n          <label for=\"\" class=\"col-md-2 control-label padding-adv-search\">ผู้เปรียบเทียบคดี :</label>\n          <div class=\"col-md-4 padding-input-adv-search\">\n            <div class=\"form-group\">\n              <div class=\"form-line\">\n                <input type=\"text\" name=\"Staff\" ngModel class=\"form-control \" placeholder=\"\">\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"row\">\n          <label for=\"\" class=\"col-md-2 control-label padding-adv-search\">หน่วยงาน :</label>\n          <div class=\"col-md-4 padding-input-adv-search\">\n            <div class=\"form-group\">\n              <div class=\"form-line\">\n                <input type=\"text\" name=\"Department\" ngModel  class=\"form-control \" placeholder=\"\">\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"row form-group\">\n          \n            <div class=\"col-10\"></div>\n            <div class=\"col-2\">\n                <button type=\"submit\" class=\"btn btn-block btn-themecolor\">ค้นข้อมูล</button>\n            </div>\n        </div>\n      </div>\n    </form>\n  </div>\n</div>\n\n<div class=\"card\">\n  <div class=\"card-body\">\n\n    <div class=\"table-responsive table-striped \">\n      <table #fineTable class=\"table\">\n        <thead>\n          <tr>\n            <th class=\"text-center\">ลำดับ</th>\n            <th>เลขที่ใบงาน</th>\n            <th style=\"text-align: center\">เลขที่คดีรับคำกล่าว</th>\n            <th>ทะเบียนตรวจพิสูจน์</th>\n            <th style=\"text-align: center\">เลขที่เปรียบเทียบคดี</th>\n            <th>ผู้เปรียบเทียบคดี</th>\n            <th style=\"text-align: center\">วันที่เปรียบเทียบคดี</th>\n            <th>หน่วยงาน</th>\n            <th></th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let item of CompareList; let i=index;\">\n            <td style=\"text-align: center\">{{i + 1}}</td>\n            <td>{{item.ArrestCode}}</td>\n            <td style=\"text-align: center\">\n              <div *ngIf=\"item.IsOutside == 1\">น {{item.Lawsuilt}}</div>\n              <div *ngIf=\"item.IsOutside != 1\">{{item.Lawsuilt}}</div>\n            </td>\n            <td>{{item.ProveReportNo}}</td>\n            <td style=\"text-align: center\">\n              <div *ngIf=\"item.IsOutside == 1\">น {{item.CompareCode}}</div>\n              <div *ngIf=\"item.IsOutside != 1\">{{item.CompareCode}}</div>\n            </td>\n            <td>\n                <div *ngFor=\"let staff of item.CompareStaff | ContributorPipe:18;\">{{staff.TitleName}}{{staff.FirstName}} {{staff.LastName}}</div>\n            </td>\n            <td style=\"text-align: center\">{{item.CompareDate | date:'dd-MM-yyyy'}}</td>\n            <td>\n                <div *ngFor=\"let staff of item.CompareStaff | ContributorPipe:18;\">{{staff.DepartmentName}}</div>\n            </td>\n            <td class=\"text-center\">\n              <a href=\"javaScript:void(0);\" class=\"text-secondary\" (click)=\"clickView(item.LawsuitID,item.ArrestCode,item.CompareID)\">\n                <i class=\"mdi mdi-eye fa-lg\"></i>\n              </a>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n\n    <div class=\"card-footer card-footer-unset\">\n      <app-pagination-table [TotalItems]=\"paginage.TotalItems\" [CurrentPage]=\"paginage.CurrentPage\" [PageSize]=\"paginage.PageSize\"\n        [RowsPerPageOptions]=\"paginage.RowsPerPageOptions\" (onPageChange)=\"pageChanges($event)\">\n      </app-pagination-table>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/pages/fine/list/list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_header_navigation_navigation_service__ = __webpack_require__("./src/app/shared/header-navigation/navigation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__fine_service__ = __webpack_require__("./src/app/pages/fine/fine.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config_pagination__ = __webpack_require__("./src/app/config/pagination.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config_message__ = __webpack_require__("./src/app/config/message.ts");
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
    function ListComponent(_router, navService, fineService) {
        this._router = _router;
        this.navService = navService;
        this.fineService = fineService;
        this.Compare = new Array();
        this.CompareList = new Array();
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
        this.navService.setNewButton(false);
        this.advSearch = this.navService.showAdvSearch;
    }
    ListComponent.prototype.ngOnInit = function () {
        var _this = this;
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
    };
    ListComponent.prototype.ngOnDestroy = function () {
        this.subOnSearch.unsubscribe();
    };
    ListComponent.prototype.onSearch = function (Textsearch) {
        var _this = this;
        this.fineService.getByKeyword(Textsearch).subscribe(function (list) {
            debugger;
            _this.onSearchComplete(list);
        }, function (err) {
            alert(err.message);
        });
    };
    ListComponent.prototype.onAdvSearch = function (form) {
        var _this = this;
        var sDateCompare = new Date(form.value.CompareDateFrom);
        var eDateCompare = new Date(form.value.CompareDateTo);
        if (sDateCompare.getTime() > eDateCompare.getTime()) {
            alert(__WEBPACK_IMPORTED_MODULE_5__config_message__["a" /* Message */].checkRevenueDate);
        }
        else {
            form.value.CompareDateFrom = sDateCompare.getTime();
            form.value.CompareDateTo = eDateCompare.getTime();
            form.value.ProgramCode = "XCS06";
            form.value.ProcessCode = "01";
            this.fineService.getByConAdv(form.value).then(function (list) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    debugger;
                    this.onSearchComplete(list);
                    return [2 /*return*/];
                });
            }); }, function (err) {
                alert(err.message);
            });
        }
    };
    ListComponent.prototype.onSearchComplete = function (list) {
        this.Compare = [];
        debugger;
        if (!list.length) {
            alert(__WEBPACK_IMPORTED_MODULE_5__config_message__["a" /* Message */].noRecord);
            return false;
        }
        if (Array.isArray(list)) {
            this.Compare = list;
        }
        else {
            this.Compare.push(list);
        }
        // set total record
        this.paginage.TotalItems = this.Compare.length;
    };
    ListComponent.prototype.clickView = function (LawsuitID, ArrestCode, CompareID) {
        if (CompareID == null || CompareID == "")
            CompareID = "0";
        this._router.navigate(["/fine/manage/R/" + LawsuitID + "/" + ArrestCode + "/" + CompareID]);
    };
    ListComponent.prototype.pageChanges = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.Compare.slice(event.startIndex - 1, event.endIndex)];
                    case 1:
                        _a.CompareList = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('fineTable'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], ListComponent.prototype, "fineTable", void 0);
    ListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-list',
            template: __webpack_require__("./src/app/pages/fine/list/list.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */],
            __WEBPACK_IMPORTED_MODULE_2__shared_header_navigation_navigation_service__["a" /* NavigationService */],
            __WEBPACK_IMPORTED_MODULE_3__fine_service__["a" /* FineService */]])
    ], ListComponent);
    return ListComponent;
}());



/***/ }),

/***/ "./src/app/pages/fine/list/list.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListModule", function() { return ListModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__list_component__ = __webpack_require__("./src/app/pages/fine/list/list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__component_card_actions_card_actions_module__ = __webpack_require__("./src/app/pages/component/card-actions/card-actions.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__fine_service__ = __webpack_require__("./src/app/pages/fine/fine.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__component_pagination_table_pagination_table_module__ = __webpack_require__("./src/app/pages/component/pagination-table/pagination-table.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared_pipe_ContributorPipe__ = __webpack_require__("./src/app/shared/pipe/ContributorPipe.ts");
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
            urls: [{ title: 'หน้าหลัก', url: '/' }, { title: 'ค้นหางานเปรียบเทียบและชำระค่าปรับ' }],
            pageType: 'list',
            nextPage: { title: 'แจ้งความ', url: '/fine/manage' }
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
                __WEBPACK_IMPORTED_MODULE_7__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* RouterModule */].forChild(routes),
                __WEBPACK_IMPORTED_MODULE_5__component_card_actions_card_actions_module__["a" /* CardActionsModule */],
                __WEBPACK_IMPORTED_MODULE_9__component_pagination_table_pagination_table_module__["a" /* PaginationTableModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__list_component__["a" /* ListComponent */], __WEBPACK_IMPORTED_MODULE_10__shared_pipe_ContributorPipe__["a" /* ContributorPipe */]],
            providers: [__WEBPACK_IMPORTED_MODULE_6__fine_service__["a" /* FineService */]]
        })
    ], ListModule);
    return ListModule;
}());



/***/ })

});
//# sourceMappingURL=list.module.6.chunk.js.map
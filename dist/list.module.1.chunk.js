webpackJsonp(["list.module.1"],{

/***/ "./src/app/pages/lawsuit/list/list.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row m-t-10\">\n  <div class=\"col-12\">\n    <div class=\"card card-outline-bluish unset-radius\" *ngIf=\"advSearch | async\">\n      <div class=\"card-header unset-radius\">\n        ค้นหาขั้นสูง\n        <div class=\"card-actions\">\n          <a (click)=\"closeAdvSearch()\">\n            <i class=\"ti-close\"></i>\n          </a>\n        </div>\n      </div>\n      <div class=\"card-body\">\n        <form class=\"form-horizontal\" #advForm=\"ngForm\" (ngSubmit)=\"onAdvSearch(advForm)\">\n          <div class=\"form-body\">\n            <div class=\"row\">\n              <div class=\"col-md-6\">\n                <div class=\"form-group row\">\n                  <label class=\"col-form-label text-right col-md-3\">เลขที่ใบงาน : </label>\n                  <div class=\"col-md-9\">\n                    <input class=\"form-control\" type=\"text\" ngModel name=\"ArrestCode\">\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-md-6\">\n                <div class=\"form-group has-danger row\">\n                  <label class=\"col-form-label text-right col-md-4\">เลขที่คดีรับคำกล่าวโทษ : </label>\n                  <div class=\"col-md-8\">\n                    <input class=\"form-control\" type=\"text\" ngModel name=\"LawsuitNo\">\n                  </div>\n                </div>\n              </div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-md-6\">\n                <div class=\"form-group row\">\n                  <label class=\"col-form-label text-right col-md-3\">วันที่รับคดี : </label>\n                  <div class=\"col-md-4\">\n                    <input class=\"form-control\" type=\"date\" ngModel name=\"LawsuitDateFrom\">\n                  </div>\n                  <label class=\"col-form-label text-right col-md-1 px-0\">ถึง : </label>\n                  <div class=\"col-md-4\">\n                    <input class=\"form-control\" type=\"date\" ngModel name=\"LawsuitDateTo\">\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-md-6\">\n                <div class=\"form-group row\">\n                  <label class=\"col-form-label text-right col-md-4\">ชื่อผู้รับคดี : </label>\n                  <div class=\"col-md-8\">\n                    <input class=\"form-control\" type=\"text\" ngModel name=\"StaffName\">\n                  </div>\n                </div>\n              </div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-md-6\">\n                <div class=\"form-group row\">\n                  <label class=\"col-form-label text-right col-md-3\">หน่วยงาน : </label>\n                  <div class=\"col-md-9\">\n                    <input class=\"form-control\" type=\"text\" ngModel name=\"OfficeName\">\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div class=\"text-right\">\n            <button type=\"submit\" class=\"btn waves-effect waves-light text-white btn-themecolor\">ค้นข้อมูล</button>\n          </div>\n        </form>\n      </div>\n    </div>\n    <div class=\"card\">\n      <div class=\"card-body\">\n        <div class=\"table-responsive table-striped\">\n          <table class=\"table\">\n            <thead>\n              <tr>\n                <th class=\"footable-sortable text-center\">ลำดับ</th>\n                <th class=\"footable-sortable\">เลขที่ใบงาน</th>\n                <th class=\"footable-sortable\">เลขที่คดีรับคำกล่าวโทษ</th>\n                <th class=\"footable-sortable\">วันที่รับคดี</th>\n                <th class=\"footable-sortable\">ชื่อผู้รับคดี</th>\n                <th class=\"footable-sortable\">หน่วยงาน</th>\n                <th class=\"footable-sortable\"></th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr class=\"footable\" *ngFor=\"let item of resultsPerPage; let i = index;\">\n                <td class=\"text-center\">{{ item.RowsId || '' }}</td>\n                <td>{{ item.ArrestCode || '-' }}</td>\n                <td>{{ item.LawsuitNo || '-' }}</td>\n                <td>{{ item.LawsuitDate || '-' }}</td>\n                <td>\n                  <div *ngFor=\"let staff of item.LawsuiteStaff;\">{{ (staff.TitleName || '') + (staff.FullName || '') + ' ' + (staff.LastName || '')}}</div>\n                </td>\n                <td>\n                  <div *ngFor=\"let staff of item.LawsuiteStaff;\">{{ (staff.DepartmentName || '-') }}</div>\n                </td>\n                <td>\n                  <a href=\"javaScript:void(0);\" class=\"text-secondary\" (click)=\"viewData(item)\">\n                    <i class=\"mdi mdi-eye fa-lg\"></i>\n                  </a>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n        <div class=\"card-footer card-footer-unset\">\n          <app-pagination-table [TotalItems]=\"paginage.TotalItems\" [CurrentPage]=\"paginage.CurrentPage\" [PageSize]=\"paginage.PageSize\"\n            [RowsPerPageOptions]=\"paginage.RowsPerPageOptions\" (onPageChange)=\"pageChanges($event)\">\n          </app-pagination-table>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

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









var ListComponent = /** @class */ (function () {
    function ListComponent(router, navService, preLoaderService, lawsuitService, sidebarService) {
        var _this = this;
        this.router = router;
        this.navService = navService;
        this.preLoaderService = preLoaderService;
        this.lawsuitService = lawsuitService;
        this.sidebarService = sidebarService;
        this.results = [];
        this.resultsPerPage = [];
        this.paginage = __WEBPACK_IMPORTED_MODULE_0__config_pagination__["a" /* pagination */];
        this.advSearch = this.navService.showAdvSearch;
        this.advSearchSub = this.navService.searchByKeyword.subscribe(function (filterValue) {
            if (filterValue) {
                _this.lawsuitService.getByKeyword(filterValue)
                    .then(function (res) { return _this.onSearchComplete(res); });
            }
        });
    }
    ListComponent.prototype.ngOnInit = function () {
        this.sidebarService.setVersion('0.0.0.2');
        this.setShowButton();
        this.loadPage();
    };
    ListComponent.prototype.loadPage = function () {
        var _this = this;
        this.preLoaderService.setShowPreloader(true);
        this.lawsuitService.getByKeywordOnInt().then(function (list) { return _this.onSearchComplete(list); });
        this.preLoaderService.setShowPreloader(false);
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
            item.LawsuitDate = Object(__WEBPACK_IMPORTED_MODULE_6__config_dateFormat__["i" /* toLocalShort */])(item.LawsuitDate);
            return item;
        });
        /* Set Total Record */
        this.paginage.TotalItems = this.results.length;
    };
    ListComponent.prototype.onAdvSearch = function (form) {
        var _this = this;
        if (form.value.LawsuitDateFrom && form.value.LawsuitDateTo) {
            var sDateCompare = new Date(form.value.LawsuitDateFrom);
            var eDateCompare = new Date(form.value.LawsuitDateTo);
            if (sDateCompare.valueOf() > eDateCompare.valueOf()) {
                alert(__WEBPACK_IMPORTED_MODULE_1__config_message__["a" /* Message */].checkDate);
                return false;
            }
            form.value.LawsuitDateFrom = sDateCompare.toISOString();
            form.value.LawsuitDateTo = eDateCompare.toISOString();
        }
        this.preLoaderService.setShowPreloader(true);
        this.lawsuitService.LawsuitgetByConAdv(form.value).then(function (list) { return _this.onSearchComplete(list); });
        this.preLoaderService.setShowPreloader(false);
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
        this.resultsPerPage = this.results.slice(event.startIndex - 1, event.endIndex);
    };
    ListComponent.prototype.ngOnDestroy = function () {
        this.advSearchSub.unsubscribe();
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
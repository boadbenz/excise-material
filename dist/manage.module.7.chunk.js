webpackJsonp(["manage.module.7"],{

/***/ "./src/app/pages/lawsuit/manage/manage.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wizard-content\">\n  <div class=\"wizard-circle wizard clearfix clearfix\">\n    <div class=\"steps tab-wizard\">\n      <ul role=\"tablist\">\n        <li role=\"tab\" class=\"current\" aria-disabled=\"false\" aria-selected=\"true\">\n          <a>\n            <span class=\"current-info audible\">current step: </span>\n            <span class=\"step\"></span> 1. ใบแจ้งความนำจับ</a>\n        </li>\n        <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\n          <a>\n            <span class=\"step\"></span> 2. งานจับกุม </a>\n        </li>\n        <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\n          <a>\n            <span class=\"step\"></span> 3. รับคำกล่าวโทษ </a>\n        </li>\n        <li role=\"tab\" class=\"disabled last\" aria-disabled=\"true\">\n          <a>\n            <span class=\"step\"></span> 4. งานตรวจรับและพิสูจน์ของกลาง </a>\n        </li>\n        <li role=\"tab\" class=\"disabled last\" aria-disabled=\"true\">\n          <a>\n            <span class=\"step\"></span> 5. งานเปรียบเทียบและชำระค่าปรับ </a>\n        </li>\n        <li role=\"tab\" class=\"disabled last\" aria-disabled=\"true\">\n          <a>\n            <span class=\"step\"></span> 6. นำส่งเงินรายได้ </a>\n        </li>\n        <li role=\"tab\" class=\"disabled last\" aria-disabled=\"true\">\n          <a>\n            <span class=\"step\"></span> 7. คำร้องขอรับเงินสินบนรางวัล </a>\n        </li>\n      </ul>\n    </div>\n  </div>\n</div>\n<div class=\"card card-outline-bluish unset-radius\">\n  <div class=\"card-header unset-radius\">\n    <app-card-actions-collapse></app-card-actions-collapse>\n    <h5 class=\"card-title m-b-0\">ข้อมูลการจับกุม</h5>\n  </div>\n  <div class=\"card-body\" *ngIf=\"arrestList\">\n    <div class=\"form-body\" *ngFor=\"let item of arrestList\">\n      <div class=\"row\">\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label text-right col-md-3\">เลขที่ใบงาน : </label>\n            <div class=\"col-md-9\">\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"item.ArrestCode\" name=\"ArrestCode\" disabled>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label text-right col-md-3\">วันที่จับกุม : </label>\n            <div class=\"col-md-4\">\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"item.OccurrenceDate\" name=\"OccurrenceDate\" disabled>\n            </div>\n            <label class=\"col-form-label text-center col-md-2\">เวลา</label>\n            <div class=\"col-md-3\">\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"item.OccurrenceTime\" name=\"OccurrenceTime\" disabled>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label text-right col-md-3\">เขียนที่ : </label>\n            <div class=\"col-md-9\">\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"item.ArrestStation\" name=\"ArrestStation\" disabled>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label text-right col-md-3\">ผู้กล่าวหา : </label>\n            <div class=\"col-md-9\">\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"(item.ArrestStaff[0] || {FullName: null}).FullName\" name=\"fullName\" disabled>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label text-right col-md-3\">ตำแหน่ง : </label>\n            <div class=\"col-md-9\">\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"(item.ArrestStaff[0] || {PositionName: null}).PositionName\" name=\"PositionName\" disabled>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label text-right col-md-3\">หน่วยงาน : </label>\n            <div class=\"col-md-9\">\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"(item.ArrestStaff[0] || {DepartmentName: null}).DepartmentName\" name=\"DepartmentName\" disabled>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n<div class=\"card card-outline-bluish unset-radius\">\n  <div class=\"card-header unset-radius\">\n    <app-card-actions-collapse></app-card-actions-collapse>\n    <h5 class=\"card-title m-b-0\">ข้อมูลคดีรับคำกล่าวโทษ</h5>\n  </div>\n  <div class=\"card-body\">\n    <div class=\"table-responsive table-striped\">\n      <table class=\"table\" *ngIf=\"!errorShow\">\n        <thead>\n          <tr>\n            <th class=\"footable-sortable text-center\">ลำดับ</th>\n            <th class=\"footable-sortable\">เลขที่คดีรับคำกล่าวโทษ</th>\n            <th class=\"footable-sortable\">ฐานความผิดมาตรา</th>\n            <th class=\"footable-sortable\">ข้อกล่าวหา</th>\n            <th class=\"footable-sortable\">สถานะรับคดี</th>\n            <th class=\"footable-sortable\"></th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr class=\"footable\" *ngFor=\"let item of lawsuitList; let i = index;\">\n            <td class=\"text-center\">{{item.RowsId}}</td>\n            <td>{{item.LawsuitNo}}</td>\n            <td>\n              <div *ngFor=\"let section of masLawGroupSectionList;\">{{section.SectionNo}}</div>\n            </td>\n            <td>\n              <div *ngFor=\"let guilt of masLawGuitBaseList;\">{{guilt.GuiltBaseName}}</div>\n            </td>\n            <td>{{item.IsLawsuitStatus}}</td>\n            <td>\n              <a href=\"javaScript:void(0);\" class=\"text-secondary\" (click)=\"viewData(item)\">\n                <i class=\"mdi mdi-eye fa-lg\"></i>\n              </a>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/pages/lawsuit/manage/manage.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_dateFormat__ = __webpack_require__("./src/app/config/dateFormat.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lawsuit_service__ = __webpack_require__("./src/app/pages/lawsuit/lawsuit.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_header_navigation_navigation_service__ = __webpack_require__("./src/app/shared/header-navigation/navigation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_preloader_preloader_component__ = __webpack_require__("./src/app/shared/preloader/preloader.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_sidebar_sidebar_component__ = __webpack_require__("./src/app/shared/sidebar/sidebar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__arrests_arrests_service__ = __webpack_require__("./src/app/pages/arrests/arrests.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__prove_prove_service__ = __webpack_require__("./src/app/pages/prove/prove.service.ts");
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











var ManageComponent = /** @class */ (function () {
    function ManageComponent(activeRoute, suspectModalService, router, fb, navService, ngbModel, sidebarService, arrestService, proveService, preLoaderService, lawsuitService) {
        this.activeRoute = activeRoute;
        this.suspectModalService = suspectModalService;
        this.router = router;
        this.fb = fb;
        this.navService = navService;
        this.ngbModel = ngbModel;
        this.sidebarService = sidebarService;
        this.arrestService = arrestService;
        this.proveService = proveService;
        this.preLoaderService = preLoaderService;
        this.lawsuitService = lawsuitService;
        this.lawsuitList = [];
        this.masLawGroupSectionList = [];
        this.masLawGuitBaseList = [];
        this.arrestList = [];
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
        // this.navService.setInnerTextNextPageButton('งานจับกุม')
    }
    ManageComponent.prototype.ngOnInit = function () {
        this.sidebarService.setVersion('0.0.0.2');
        this.setShowButton();
        this.getParamFromActiveRoute();
    };
    ManageComponent.prototype.setShowButton = function () {
        this.navService.setPrintButton(true);
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
        this.navService.setDeleteButton(false);
        this.navService.setCancelButton(false);
        this.navService.setEditButton(false);
        this.navService.setSaveButton(false);
    };
    ManageComponent.prototype.getParamFromActiveRoute = function () {
        var _this = this;
        this.getDataFromListPage = this.activeRoute.queryParams.subscribe(function (params) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.preLoaderService.setShowPreloader(true);
                        // ArrestgetByCon
                        return [4 /*yield*/, this.lawsuitService.ArrestgetByCon(params.code).then(function (res) {
                                _this.arrestList.push(res);
                                _this.arrestList.map(function (p) {
                                    p.OccurrenceDate = Object(__WEBPACK_IMPORTED_MODULE_0__config_dateFormat__["i" /* toLocalShort */])(p.OccurrenceDate);
                                    p.OccurrenceTime = Object(__WEBPACK_IMPORTED_MODULE_0__config_dateFormat__["j" /* toTimeShort */])(p.OccurrenceTime);
                                    p.ArrestStaff.map(function (staff) {
                                        staff.FullName = "" + staff.TitleName + staff.FirstName + " " + staff.LastName;
                                    });
                                });
                            })];
                    case 1:
                        // ArrestgetByCon
                        _a.sent();
                        // LawsuitgetByCon
                        return [4 /*yield*/, this.lawsuitService.LawsuitgetByCon(params.id).then(function (res) {
                                _this.lawsuitList.push(res);
                                _this.lawsuitList.map(function (data, index) {
                                    data.RowsId = index + 1;
                                });
                                // Check IsOutSide
                                if (res.IsOutside == 1 &&
                                    res.LawsuitNo != null) {
                                    _this.lawsuitList.map(function (law) {
                                        law.LawsuitNo = "\u0E19 " + law.LawsuitNo;
                                    });
                                }
                                // Check status IsLawsuit
                                if (res.IsLawsuit == 0) {
                                    _this.lawsuitList.map(function (law) {
                                        law.IsLawsuitStatus = "ไม่รับคดี";
                                    });
                                }
                                else if (res.IsLawsuit == 1) {
                                    _this.lawsuitList.map(function (law) {
                                        law.IsLawsuitStatus = "ดำเนินการรับคดีแล้ว";
                                    });
                                }
                                else {
                                    _this.lawsuitList.map(function (law) {
                                        law.IsLawsuitStatus = "ยังไม่ดำเนินกำรรับคดี";
                                    });
                                }
                            })];
                    case 2:
                        // LawsuitgetByCon
                        _a.sent();
                        // Find guiltbaseID with IndictmentID from Lawsuit
                        return [4 /*yield*/, this.arrestList[0].ArrestIndictment.forEach(function (value) {
                                if (value.IndictmentID == _this.lawsuitList[0].IndictmentID) {
                                    _this.lawsuitService.CompareMasLawgetByCon(value.GuiltBaseID).then(function (res) {
                                        if (res) {
                                            for (var key in res) {
                                                if (key == "CompareMasLawSection") {
                                                    _this.masLawGroupSectionList.push(res[key]);
                                                }
                                                if (key == "CompareMasLawGuiltBase") {
                                                    _this.masLawGuitBaseList.push(res[key]);
                                                }
                                            }
                                        }
                                    });
                                }
                            })];
                    case 3:
                        // Find guiltbaseID with IndictmentID from Lawsuit
                        _a.sent();
                        this.preLoaderService.setShowPreloader(false);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    ManageComponent.prototype.viewData = function (item) {
        if (item.LawsuitNo) {
            this.router.navigate(["/lawsuit/detail", "R"], {
                queryParams: {
                    ArrestCode: this.arrestList[0].ArrestCode,
                    IndictmentID: item.IndictmentID,
                    LawsuitID: item.LawsuitID
                }
            });
        }
    };
    ManageComponent.prototype.ngOnDestroy = function () {
        this.getDataFromListPage.unsubscribe();
    };
    ManageComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["n" /* Component */])({
            selector: "app-manage",
            template: __webpack_require__("./src/app/pages/lawsuit/manage/manage.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__["d" /* NgbModal */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */],
            __WEBPACK_IMPORTED_MODULE_6__angular_forms__["b" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_4__shared_header_navigation_navigation_service__["a" /* NavigationService */],
            __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__["d" /* NgbModal */],
            __WEBPACK_IMPORTED_MODULE_8__shared_sidebar_sidebar_component__["b" /* SidebarService */],
            __WEBPACK_IMPORTED_MODULE_9__arrests_arrests_service__["a" /* ArrestsService */],
            __WEBPACK_IMPORTED_MODULE_10__prove_prove_service__["a" /* ProveService */],
            __WEBPACK_IMPORTED_MODULE_7__shared_preloader_preloader_component__["b" /* PreloaderService */],
            __WEBPACK_IMPORTED_MODULE_1__lawsuit_service__["a" /* LawsuitService */]])
    ], ManageComponent);
    return ManageComponent;
}());



/***/ }),

/***/ "./src/app/pages/lawsuit/manage/manage.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageModule", function() { return ManageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lawsuit_service__ = __webpack_require__("./src/app/pages/lawsuit/lawsuit.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component_card_actions_card_actions_module__ = __webpack_require__("./src/app/pages/component/card-actions/card-actions.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__manage_component__ = __webpack_require__("./src/app/pages/lawsuit/manage/manage.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__component_suspect_modal_suspect_modal_module__ = __webpack_require__("./src/app/pages/component/suspect-modal/suspect-modal.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__component_modal_lawbreaker_modal_lawbreaker_module__ = __webpack_require__("./src/app/pages/component/modal-lawbreaker/modal-lawbreaker.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__notices_print_doc_modal_print_doc_modal_module__ = __webpack_require__("./src/app/pages/notices/print-doc-modal/print-doc-modal.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_datepicker_i18n_service__ = __webpack_require__("./src/app/services/datepicker-i18n.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__arrests_arrests_service__ = __webpack_require__("./src/app/pages/arrests/arrests.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__prove_prove_service__ = __webpack_require__("./src/app/pages/prove/prove.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var routes = [
    {
        path: "",
        data: {
            urls: [
                { title: "หน้าหลัก", url: "/" },
                { title: "ค้นหาบันทึกรับคำกล่าวโทษ", url: "/lawsuit/list" },
                { title: "จัดการข้อมูลบันทึกรับคำกล่าวโทษ" }
            ],
            pageType: "manage",
            codePage: "XCS60-04-02-00-00",
            nextPage: {
                title: "จัดการข้อมูลรายละเอียดบันทึกรับคำกล่าวโทษ",
                url: "/lawsuit/detail/"
            }
        },
        component: __WEBPACK_IMPORTED_MODULE_6__manage_component__["a" /* ManageComponent */]
    }
];
var ManageModule = /** @class */ (function () {
    function ManageModule() {
    }
    ManageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["L" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["k" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_9__ng_bootstrap_ng_bootstrap__["e" /* NgbModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["d" /* RouterModule */].forChild(routes),
                __WEBPACK_IMPORTED_MODULE_1__component_card_actions_card_actions_module__["a" /* CardActionsModule */],
                __WEBPACK_IMPORTED_MODULE_10__component_suspect_modal_suspect_modal_module__["a" /* SuspectModalModule */],
                __WEBPACK_IMPORTED_MODULE_11__component_modal_lawbreaker_modal_lawbreaker_module__["a" /* ModalLawbreakerModule */],
                __WEBPACK_IMPORTED_MODULE_12__notices_print_doc_modal_print_doc_modal_module__["a" /* PrintDocModalModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__manage_component__["a" /* ManageComponent */]
            ], providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_9__ng_bootstrap_ng_bootstrap__["c" /* NgbDatepickerI18n */], useClass: __WEBPACK_IMPORTED_MODULE_13__services_datepicker_i18n_service__["a" /* DatepickerI18nService */] },
                __WEBPACK_IMPORTED_MODULE_0__lawsuit_service__["a" /* LawsuitService */],
                __WEBPACK_IMPORTED_MODULE_14__arrests_arrests_service__["a" /* ArrestsService */],
                __WEBPACK_IMPORTED_MODULE_15__prove_prove_service__["a" /* ProveService */]
            ]
        })
    ], ManageModule);
    return ManageModule;
}());



/***/ })

});
//# sourceMappingURL=manage.module.7.chunk.js.map
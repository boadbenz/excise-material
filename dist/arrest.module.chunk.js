webpackJsonp(["arrest.module"],{

/***/ "./src/app/pages/arrests/arrest.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArrestModule", function() { return ArrestModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components__ = __webpack_require__("./src/app/pages/arrests/components/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services__ = __webpack_require__("./src/app/pages/arrests/services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_mydatepicker_th__ = __webpack_require__("./node_modules/mydatepicker-th/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__component_pagination_table_pagination_table_module__ = __webpack_require__("./src/app/pages/component/pagination-table/pagination-table.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__component_card_actions_card_actions_module__ = __webpack_require__("./src/app/pages/component/card-actions/card-actions.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__component_step_wizard_step_wizard_module__ = __webpack_require__("./src/app/pages/component/step-wizard/step-wizard.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__component_modal_offense_modal_offense_module__ = __webpack_require__("./src/app/pages/component/modal-offense/modal-offense.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__arrest_routing__ = __webpack_require__("./src/app/pages/arrests/arrest.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__arrests_service__ = __webpack_require__("./src/app/pages/arrests/arrests.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_app_shared_preloader_preloader_module__ = __webpack_require__("./src/app/shared/preloader/preloader.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





// Components

// Services










var ArrestModule = /** @class */ (function () {
    function ArrestModule() {
    }
    ArrestModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["l" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["d" /* RouterModule */].forChild(__WEBPACK_IMPORTED_MODULE_13__arrest_routing__["a" /* ROUTES */]),
                __WEBPACK_IMPORTED_MODULE_11__ng_bootstrap_ng_bootstrap__["e" /* NgbModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_9__component_card_actions_card_actions_module__["a" /* CardActionsModule */],
                __WEBPACK_IMPORTED_MODULE_8__component_pagination_table_pagination_table_module__["a" /* PaginationTableModule */],
                __WEBPACK_IMPORTED_MODULE_7_mydatepicker_th__["a" /* MyDatePickerTHModule */],
                __WEBPACK_IMPORTED_MODULE_10__component_step_wizard_step_wizard_module__["a" /* StepWizardModule */],
                __WEBPACK_IMPORTED_MODULE_12__component_modal_offense_modal_offense_module__["a" /* ModalOffenseModule */],
                __WEBPACK_IMPORTED_MODULE_15_app_shared_preloader_preloader_module__["a" /* PreloaderModule */]
            ],
            declarations: __WEBPACK_IMPORTED_MODULE_5__components__["e" /* components */].slice(),
            exports: __WEBPACK_IMPORTED_MODULE_5__components__["e" /* components */].slice(),
            providers: __WEBPACK_IMPORTED_MODULE_6__services__["l" /* services */].concat([__WEBPACK_IMPORTED_MODULE_14__arrests_service__["a" /* ArrestsService */]])
        })
    ], ArrestModule);
    return ArrestModule;
}());



/***/ }),

/***/ "./src/app/pages/arrests/arrest.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ROUTES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components__ = __webpack_require__("./src/app/pages/arrests/components/index.ts");
// Components

var ROUTES = [
    {
        path: 'list',
        data: {
            urls: [{ title: 'หน้าหลัก', url: '/' }, { title: 'ค้นหางานจับกุม' }],
            codePage: 'ILG60-03-01-00-00'
        },
        component: __WEBPACK_IMPORTED_MODULE_0__components__["c" /* ListComponent */]
    },
    {
        path: 'manage/:mode/:code',
        data: {
            urls: [
                { title: 'หน้าหลัก', url: '/' },
                { title: 'ค้นหางานจับกุม', url: '/arrest/list' },
                { title: 'จัดการข้อมูลบันทึกจับกุม' }
            ],
            codePage: 'ILG60-03-02-00-00',
            nextPage: { title: 'รับคำกล่าวโทษ', url: '/accusations/manage' }
        },
        component: __WEBPACK_IMPORTED_MODULE_0__components__["d" /* ManageComponent */]
    },
    {
        path: 'lawbreaker/:mode/:code',
        data: {
            urls: [
                { title: 'หน้าหลัก', url: '/' },
                { title: 'ค้นหางานจับกุม', url: '/arrest/list' },
                { title: 'จัดการข้อมูลงานจับกุม', url: '/arrest/manage/C/NEW' },
                { title: 'จัดการข้อมูลผู้ต้องหา' }
            ],
            codePage: 'ILG60-03-03-00-00',
            nextPage: { title: 'งานจับกุม', url: '/' }
        },
        component: __WEBPACK_IMPORTED_MODULE_0__components__["b" /* LawbreakerComponent */]
    },
    {
        path: 'allegation/:mode',
        data: {
            urls: [
                { title: 'หน้าหลัก', url: '/' },
                { title: 'ค้นหางานจับกุม', url: '/arrest/list' },
                { title: 'จัดการข้อมูลงานจับกุม', url: '/arrest/manage/C/NEW' },
                { title: 'จัดการข้อมูลข้อกล่าวหา' }
            ],
            codePage: 'ILG60-03-03-00-00',
            nextPage: { title: 'รับคำกล่าวโทษ', url: '/accusations/manage' }
        },
        component: __WEBPACK_IMPORTED_MODULE_0__components__["a" /* AllegationComponent */]
    },
];


/***/ }),

/***/ "./src/app/pages/arrests/components/allegation-detail-modal/allegation-detail-modal.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header bg-theme\">\r\n  <div class=\"row\">\r\n    <div class=\"col-lg-5\">\r\n      <!-- <h4 class=\"modal-title text-white\">รายละเอียดข้อกล่าวหา</h4> -->\r\n      <h4 class=\"modal-title text-white\">เพิ่มผู้ต้องหา\r\n        <a class=\"btn btn-ghost\" [routerLink]=\"['/arrest/lawbreaker', 'C', 'NEW']\" target=\"_blank\">\r\n          <i class=\"ti-plus\"></i>\r\n          สร้างข้อมูล\r\n        </a>\r\n      </h4>\r\n    </div>\r\n    <div class=\"col-lg-5 col-8\">\r\n      <form autocomplete=\"off\" class=\"app-search\" #searchFrom=\"ngForm\" (ngSubmit)=\"onSearchByKey(searchFrom.value)\">\r\n        <input type=\"search\" name=\"Textsearch\" ngModel class=\"form-control form-control-sm\">\r\n        <a class=\"srh-btn\" (click)=\"onSearchByKey(searchFrom.value)\" href=\"javaScript:void(0)\">\r\n          <i class=\"ti-search\"></i>\r\n        </a>\r\n      </form>\r\n    </div>\r\n    <div class=\"col-lg-2 col-4 p-0\">\r\n      <a href=\"javaScript:void(0);\" class=\"text-white\" (click)=\"advSearch = !advSearch\">ค้นหาขั้นสูง</a>\r\n    </div>\r\n\r\n    <a href=\"javaScript:void(0);\" class=\"close text-white font-14\" aria-label=\"Close\" (click)=\"dismiss('Cross click')\">\r\n      <span aria-hidden=\"true\">\r\n        <i class=\" ti-close\"></i>\r\n      </span>\r\n    </a>\r\n  </div>\r\n</div>\r\n<h5 class=\"text-right mt-3 pr-3\">ILG60-03-03-02-00</h5>\r\n<div class=\"modal-body font-14\">\r\n  <div *ngIf=\"advSearch\">\r\n    <div class=\"card card-outline-bluish unset-radius m-b-15\">\r\n      <div class=\"card-header unset-radius\">\r\n        <div class=\"card-actions\">\r\n          <a class=\"\" (click)=\"advSearch = false\">\r\n            <i class=\"fa fa-times\"></i>\r\n          </a>\r\n        </div>\r\n        <h4 class=\"card-title m-b-0\">ค้นหาขั้นสูง</h4>\r\n      </div>\r\n      <div class=\"card-body\">\r\n        <form class=\"form-horizontal\" #advForm=\"ngForm\" (ngSubmit)=\"onSearchAdv(advForm.value)\">\r\n          <div class=\"row\">\r\n            <label for=\"\" class=\"col-lg-2 col-sm-4\">ประเภทผู้ต้องหา :</label>\r\n            <div class=\"col-lg-4 col-sm-8 form-group\">\r\n              <select name=\"EntityType\" ngModel class=\"form-control form-control-sm\">\r\n                <option value=\"\" selected disabled></option>\r\n                <option *ngFor=\"let item of entityType\" [value]=\"item.value\">{{item.text}}</option>\r\n              </select>\r\n            </div>\r\n\r\n            <label for=\"\" class=\"col-lg-2 col-sm-4\">ประเภทบุคคล :</label>\r\n            <div class=\"col-lg-4 col-sm-8 form-group\">\r\n              <select name=\"LawbreakerType\" ngModel class=\"form-control form-control-sm\">\r\n                <option value=\"\" selected disabled></option>\r\n                <option *ngFor=\"let item of lawbreakerType\" [value]=\"item.value\">{{item.text}}</option>\r\n              </select>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <label for=\"\" class=\"col-lg-2 col-sm-4\">เลขบัตรประชาชน :</label>\r\n            <div class=\"col-lg-4 col-sm-8 form-group\">\r\n              <input type=\"text\" name=\"IDCard\" ngModel class=\"form-control form-control-sm\">\r\n            </div>\r\n            <label for=\"\" class=\"col-lg-2 col-sm-4\">เลขหนังสือเดินทาง :</label>\r\n            <div class=\"col-lg-4 col-sm-8 form-group\">\r\n              <input type=\"text\" name=\"PassportNo\" ngModel class=\"form-control form-control-sm\">\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <label for=\"\" class=\"col-lg-2 col-sm-4\">เลขนิติบุคคล :</label>\r\n            <div class=\"col-lg-4 col-sm-8 form-group\">\r\n              <input type=\"text\" name=\"CompanyRegistrationNo\" ngModel class=\"form-control form-control-sm\">\r\n            </div>\r\n            <label for=\"\" class=\"col-lg-2 col-sm-4\">ชื่อผู้ต้องสงสัย :</label>\r\n            <div class=\"col-lg-4 col-sm-8 form-group\">\r\n              <input #fname type=\"text\" name=\"LawbreakerFirstName\" class=\"form-control form-control-sm\">\r\n              <input type=\"hidden\" name=\"LawbreakerTitleName\" [value]=\"fname\">\r\n              <input type=\"hidden\" name=\"LawbreakerLastName\" [value]=\"fname\">\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-lg-10 col-sm-8\"></div>\r\n            <div class=\"col-lg-2 col-sm-4\">\r\n              <button type=\"submit\" class=\"btn btn-block btn-themecolor\">ค้นข้อมูล</button>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div [formGroup]=\"allegationFG\">\r\n    <div class=\"card unset-radius m-b-15\">\r\n      <div class=\"card-body p-0\">\r\n        <div class=\"table-responsive\">\r\n          <table id=\"suspectModal\" #suspectModal class=\"table table-sm table-striped\">\r\n            <thead>\r\n              <tr>\r\n                <th></th>\r\n                <th class=\"text-center\">ลำดับ</th>\r\n                <th>ประเภทผู้ต้องหา</th>\r\n                <th>ประเภทบุคคล</th>\r\n                <th>หมายเลขอ้างอิง</th>\r\n                <th>ชื่อ</th>\r\n                <th class=\"text-center\">จำนวนครั้งการกระทำผิด</th>\r\n                <th></th>\r\n              </tr>\r\n            </thead>\r\n            <tbody formArrayName=\"Lawbreaker\">\r\n              <tr *ngFor=\"let item of Lawbreaker.controls; let i=index;\" [formGroupName]=\"i\">\r\n                <td class=\"text-center\">\r\n                  <input name=\"IsChecked\" formControlName=\"IsChecked\" type=\"radio\" id=\"td{{i}}\" [checked]=\"!item.get('IsChecked').value\"\r\n                    class=\"with-gap radio-col-indigo\" (change)=\"setIsChecked(i)\">\r\n                  <label for=\"td{{i}}\" class=\"m-0\"></label>\r\n                </td>\r\n                <td class=\"text-center\">{{item.get('RowId').value}}</td>\r\n                <td>{{item.get('LawbreakerTypeName').value}}</td>\r\n                <td>{{item.get('EntityTypeName').value}}</td>\r\n                <td>{{item.get('ReferenceID').value}}</td>\r\n                <td>{{item.get('LawbreakerFullName').value}}</td>\r\n                <td class=\"text-center\">{{item.get('ResultCount').value | async}}</td>\r\n                <td class=\"text-center\">\r\n                  <a class=\"text-center text-secondary\" \r\n                    [routerLink]=\"['/arrest/lawbreaker', 'R', item.value.LawbreakerID]\" target=\"_blank\">\r\n                    <i class=\"fa fa-eye fa-lg\"></i>\r\n                  </a>\r\n                </td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      </div>\r\n      <div class=\"card-footer card-footer-unset\">\r\n        <app-pagination-table [TotalItems]=\"paginage.TotalItems\" [CurrentPage]=\"paginage.CurrentPage\" [PageSize]=\"paginage.PageSize\"\r\n          [RowsPerPageOptions]=\"paginage.RowsPerPageOptions\" (onPageChange)=\"pageChanges($event)\">\r\n        </app-pagination-table>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"modal-footer\">\r\n  <div class=\"col-lg-2 col-4\">\r\n    <button type=\"button\" class=\"btn btn-block btn-themecolor\" (click)=\"close('Save click')\">เลือก</button>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/pages/arrests/components/allegation-detail-modal/allegation-detail-modal.component.scss":
/***/ (function(module, exports) {

module.exports = ".lawbreaker-detail {\n  padding: .4rem;\n  border: 1px solid #d4dfe3; }\n  .lawbreaker-detail .lawbreaker-detail-head .action {\n    float: right; }\n  .lawbreaker-detail .lawbreaker-detail-head .action a {\n    cursor: pointer;\n    opacity: 0.7;\n    padding-left: 7px; }\n  .lawbreaker-detail .lawbreaker-detail-head .title {\n    text-decoration: underline; }\n"

/***/ }),

/***/ "./src/app/pages/arrests/components/allegation-detail-modal/allegation-detail-modal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AllegationDetailModalComponent; });
/* harmony export (immutable) */ __webpack_exports__["b"] = setViewLawbreaker;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_config_pagination__ = __webpack_require__("./src/app/config/pagination.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_models_drop_downs_model__ = __webpack_require__("./src/app/models/drop-downs.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_config_message__ = __webpack_require__("./src/app/config/message.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngrx_store__ = __webpack_require__("./node_modules/@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services__ = __webpack_require__("./src/app/pages/arrests/services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_acceptability__ = __webpack_require__("./src/app/pages/arrests/models/acceptability.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_takeUntil__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/takeUntil.js");
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











var AllegationDetailModalComponent = /** @class */ (function () {
    function AllegationDetailModalComponent(fb, router, store, activeRoute, s_masLawbreaker) {
        this.fb = fb;
        this.router = router;
        this.store = store;
        this.activeRoute = activeRoute;
        this.s_masLawbreaker = s_masLawbreaker;
        this.destroy$ = new __WEBPACK_IMPORTED_MODULE_9_rxjs_Subject__["b" /* Subject */]();
        this.ACCEPTABILITY = __WEBPACK_IMPORTED_MODULE_8__models_acceptability__["a" /* Acceptability */];
        this.runningTable = 'ops_arrest';
        this.runningOfficeCode = '90501';
        this.runningPrefix = 'TN';
        this.paginage = __WEBPACK_IMPORTED_MODULE_2_app_config_pagination__["a" /* pagination */];
        this.lawbreakerType = __WEBPACK_IMPORTED_MODULE_4_app_models_drop_downs_model__["g" /* LawbreakerTypes */];
        this.entityType = __WEBPACK_IMPORTED_MODULE_4_app_models_drop_downs_model__["e" /* EntityTypes */];
        this.lawbreaker = new Array();
        this.card1 = true;
        this.d = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.c = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.OutputLawbreaker = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
    }
    Object.defineProperty(AllegationDetailModalComponent.prototype, "Lawbreaker", {
        get: function () {
            return this.allegationFG.get('Lawbreaker');
        },
        enumerable: true,
        configurable: true
    });
    AllegationDetailModalComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.allegationFG = this.fb.group({
                    Lawbreaker: this.fb.array([])
                });
                return [2 /*return*/];
            });
        });
    };
    AllegationDetailModalComponent.prototype.ngOnDestroy = function () {
        this.paginage.TotalItems = 0;
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    };
    AllegationDetailModalComponent.prototype.dismiss = function (e) {
        this.d.emit(e);
    };
    AllegationDetailModalComponent.prototype.onClickNewLawbreaker = function () {
        window.open(location.origin + "/#/arrest/lawbreaker/C/NEW");
    };
    AllegationDetailModalComponent.prototype.view = function (id) {
        window.open(location.origin + "/#/arrest/lawbreaker/R/" + id);
    };
    AllegationDetailModalComponent.prototype.onSearchAdv = function (f) {
        var _this = this;
        this.s_masLawbreaker.ArrestMasLawbreakergetByConAdv(f).subscribe(function (x) { return _this.onSearchComplete(x); });
    };
    AllegationDetailModalComponent.prototype.onSearchByKey = function (f) {
        var _this = this;
        this.s_masLawbreaker.ArrestMasLawbreakergetByKeyword(f).subscribe(function (x) { return _this.onSearchComplete(x); });
    };
    AllegationDetailModalComponent.prototype.onSearchComplete = function (list) {
        return __awaiter(this, void 0, void 0, function () {
            var law;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!list.length) {
                            alert(__WEBPACK_IMPORTED_MODULE_5_app_config_message__["a" /* Message */].noRecord);
                            return [2 /*return*/];
                        }
                        law = [];
                        return [4 /*yield*/, list.filter(function (item) { return item.IsActive == 1; })
                                .map(function (item, i) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    item.RowId = i + 1;
                                    item.ResultCount = this.s_masLawbreaker.ArrestLawsuitResultCountgetByLawbreakerID(item.LawbreakerID.toString());
                                    item.IsChecked = __WEBPACK_IMPORTED_MODULE_8__models_acceptability__["a" /* Acceptability */].INACCEPTABLE;
                                    law.push(setViewLawbreaker(item));
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        this.lawbreaker = law;
                        // set total record
                        this.paginage.TotalItems = law.length;
                        return [2 /*return*/];
                }
            });
        });
    };
    AllegationDetailModalComponent.prototype.setIsChecked = function (i) {
        var law = this.Lawbreaker;
        law.value.map(function (item, index) {
            item.IsChecked = (i == index) ? __WEBPACK_IMPORTED_MODULE_8__models_acceptability__["a" /* Acceptability */].ACCEPTABLE : __WEBPACK_IMPORTED_MODULE_8__models_acceptability__["a" /* Acceptability */].INACCEPTABLE;
        });
    };
    AllegationDetailModalComponent.prototype.setItemFormArray = function (array, formControl) {
        var _this = this;
        if (array !== undefined && array.length) {
            var itemFGs = array.map(function (item) { return _this.fb.group(item); });
            var itemFormArray = this.fb.array(itemFGs);
            this.allegationFG.setControl(formControl, itemFormArray);
        }
    };
    AllegationDetailModalComponent.prototype.pageChanges = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.lawbreaker.slice(event.startIndex - 1, event.endIndex)];
                    case 1:
                        list = _a.sent();
                        this.setItemFormArray(list, 'Lawbreaker');
                        return [2 /*return*/];
                }
            });
        });
    };
    AllegationDetailModalComponent.prototype.closeLawbreakerDetail = function () {
        var law = this.Lawbreaker;
        law.value.map(function (item) { return item.IsChecked = __WEBPACK_IMPORTED_MODULE_8__models_acceptability__["a" /* Acceptability */].INACCEPTABLE; });
        law.patchValue(law.value);
    };
    AllegationDetailModalComponent.prototype.close = function (e) {
        var _a;
        // let law = this.Lawbreaker;
        var law = this.Lawbreaker.value
            .filter(function (x) { return x.IsChecked == __WEBPACK_IMPORTED_MODULE_8__models_acceptability__["a" /* Acceptability */].ACCEPTABLE; });
        // .map(x => {
        //   x.IsModify = 'c';
        //   return x;
        // })
        if (!law)
            return;
        (_a = this.OutputLawbreaker).emit.apply(_a, law);
        this.c.emit(e);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
        __metadata("design:type", Object)
    ], AllegationDetailModalComponent.prototype, "d", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
        __metadata("design:type", Object)
    ], AllegationDetailModalComponent.prototype, "c", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
        __metadata("design:type", Object)
    ], AllegationDetailModalComponent.prototype, "OutputLawbreaker", void 0);
    AllegationDetailModalComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-allegation-detail-modal',
            template: __webpack_require__("./src/app/pages/arrests/components/allegation-detail-modal/allegation-detail-modal.component.html"),
            styles: [__webpack_require__("./src/app/pages/arrests/components/allegation-detail-modal/allegation-detail-modal.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */],
            __WEBPACK_IMPORTED_MODULE_6__ngrx_store__["a" /* Store */],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_7__services__["f" /* ArrestMasLawbreakerService */]])
    ], AllegationDetailModalComponent);
    return AllegationDetailModalComponent;
}());

function setViewLawbreaker(item) {
    item.LawbreakerTypeName = __WEBPACK_IMPORTED_MODULE_4_app_models_drop_downs_model__["g" /* LawbreakerTypes */].find(function (key) { return parseInt(key.value) == item.LawbreakerType; }).text;
    item.EntityType = item.EntityType;
    item.EntityTypeName = __WEBPACK_IMPORTED_MODULE_4_app_models_drop_downs_model__["e" /* EntityTypes */].find(function (key) { return parseInt(key.value) == item.EntityType; }).text;
    item.LawbreakerRefID = item.LawbreakerID;
    item.LawbreakerFullName = "" + (item.LawbreakerTitleName || '');
    item.LawbreakerFullName += " " + (item.LawbreakerFirstName || '');
    item.LawbreakerFullName += " " + (item.LawbreakerLastName || '');
    switch (item.EntityType) {
        case 1: // บุคคลธรรมดา
            switch (item.LawbreakerType) {
                case 0: // ต่างชาติ
                    item.ReferenceID = item.PassportNo;
                    break;
                case 1: // ชาวไทย
                    item.ReferenceID = item.IDCard;
                    break;
            }
        case 2: // นิติบุคคล
            item.ReferenceID = item.CompanyRegistrationNo;
            break;
    }
    return item;
}


/***/ }),

/***/ "./src/app/pages/arrests/components/allegation-modal/allegation-modal.component.html":
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"modal-header bg-theme\">\r\n    <div class=\"row\">\r\n        <div class=\"col-lg-5\">\r\n            <h4 class=\"modal-title text-white\">เลือกข้อกล่าวหา</h4>\r\n        </div>\r\n        <div class=\"col-lg-6 col-md-5 col-8\">\r\n            <form autocomplete=\"off\" class=\"app-search\" #searchFrom=\"ngForm\" (ngSubmit)=\"onSearchByKey(searchFrom.value)\">\r\n                <input type=\"search\" name=\"Textsearch\" ngModel class=\"form-control form-control-sm\" placeholder=\"ค้นหาฐานความผิดมาตรา/ฐานความผิด\">\r\n                <a class=\"srh-btn\" (click)=\"onSearchByKey(searchFrom.value)\" href=\"javaScript:void(0)\">\r\n                    <i class=\"ti-search\"></i>\r\n                </a>\r\n            </form>\r\n        </div>\r\n\r\n        <a href=\"javaScript:void(0);\" class=\"close text-white font-14\" aria-label=\"Close\" (click)=\"dismiss('Cross click')\">\r\n            <span aria-hidden=\"true\">\r\n                <i class=\" ti-close\"></i>\r\n            </span>\r\n        </a>\r\n    </div>\r\n</div>\r\n<h5 class=\"text-right mt-3 pr-3\">ILG60-03-03-01-00</h5>\r\n<div class=\"modal-body font-14\" [formGroup]=\"lawGroupFG\">\r\n    <div class=\"card unset-radius\">\r\n        <div class=\"card-body p-0\">\r\n            <table id=\"allegation\" class=\"table table-striped table-sm\">\r\n                <thead>\r\n                    <tr>\r\n                        <th class=\"text-center\"></th>\r\n                        <th class=\"text-center\">ลำดับ</th>\r\n                        <th>ฐานความผิดมาตรา</th>\r\n                        <th>ฐานความผิด</th>\r\n                        <th>บทกำหนดโทษ</th>\r\n                        <th>อัตราโทษ</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody formArrayName=\"LawGuiltbase\">\r\n                    <tr *ngFor=\"let item of LawGuiltbase.controls; let i=index;\" [formGroupName]=\"i\">\r\n                        <td class=\"text-center\">\r\n                            <input name=\"noticeRadio\" name=\"IsChecked\" formControlName=\"IsChecked\" type=\"radio\" id=\"td{{i}}\"\r\n                                (change)=\"setIsChecked(i)\" class=\"with-gap radio-col-indigo\">\r\n                            <label for=\"td{{i}}\" class=\"m-0\"></label>\r\n                        </td>\r\n                        <td class=\"text-center\">{{item.get('RowId').value}}</td>\r\n                        <td class=\"text-center\">\r\n                            <div *ngFor=\"let subSectionRule of getArrestLawSubSectionRule(item);\">\r\n                                <span *ngFor=\"let subSection of getArrestLawSubSection(subSectionRule)\">\r\n                                    {{subSection.get('SubSectionType').value}}\r\n                                </span>\r\n                            </div>\r\n                        </td>\r\n                        <td style=\"max-width: 200px;\">{{item.get('GuiltBaseName').value}}</td>\r\n                        <td class=\"text-center\">\r\n                            <div *ngFor=\"let subSectionRule of getArrestLawSubSectionRule(item);\">\r\n                                {{subSectionRule.get('SectionNo').value}}\r\n                            </div>\r\n                        </td>\r\n                        <td style=\"max-width: 200px;\">\r\n                            <div *ngFor=\"let subSectionRule of getArrestLawSubSectionRule(item);\">\r\n                                <span *ngFor=\"let section of getArrestLawSection(subSectionRule)\">\r\n                                    <span *ngFor=\"let penalty of getArrestLawPenalty(section)\">\r\n                                        {{penalty.get('PenaltyDesc').value}}\r\n                                    </span>\r\n                                </span>\r\n                            </div>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <div class=\"card-footer card-footer-unset\">\r\n            <app-pagination-table [TotalItems]=\"paginage.TotalItems\" [CurrentPage]=\"paginage.CurrentPage\" [PageSize]=\"paginage.PageSize\"\r\n                [RowsPerPageOptions]=\"paginage.RowsPerPageOptions\" (onPageChange)=\"pageChanges($event)\">\r\n            </app-pagination-table>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"modal-footer\">\r\n    <div class=\"col-lg-2 col-4\">\r\n        <button type=\"button\" class=\"btn btn-block btn-themecolor\" (click)=\"close('Save click')\">เลือก</button>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/pages/arrests/components/allegation-modal/allegation-modal.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/arrests/components/allegation-modal/allegation-modal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AllegationModalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_config_pagination__ = __webpack_require__("./src/app/config/pagination.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_config_message__ = __webpack_require__("./src/app/config/message.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services__ = __webpack_require__("./src/app/pages/arrests/services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/_esm5/Subject.js");
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

// import { ArrestsService } from '../arrests.service';





var AllegationModalComponent = /** @class */ (function () {
    function AllegationModalComponent(fb, s_lawGuiltbase) {
        var _this = this;
        this.fb = fb;
        this.s_lawGuiltbase = s_lawGuiltbase;
        this.isOpen = false;
        this.isCheckAll = false;
        this.isCheck = false;
        this.paginage = __WEBPACK_IMPORTED_MODULE_2_app_config_pagination__["a" /* pagination */];
        this.arrestLawGuitbase = new Array();
        this.destroy$ = new __WEBPACK_IMPORTED_MODULE_5_rxjs_Subject__["b" /* Subject */]();
        this.d = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.c = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.outputArrestLawGuiltbase = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        // --- 1
        this.setArrestLawGuitbase = function (o) {
            var arr = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormArray */]([]);
            o.map(function (x, index) {
                arr.push(_this.fb.group({
                    RowId: ++index,
                    IsChecked: false,
                    GuiltBaseID: x.GuiltBaseID,
                    GuiltBaseName: x.GuiltBaseName,
                    IsCompare: x.IsCompare,
                    IsActive: x.IsActive,
                    IsProve: x.IsProve,
                    SubSectionRuleID: x.SubSectionRuleID,
                    ArrestLawSubSectionRule: _this.setArrestLawSubSectionRule(x.ArrestLawSubSectionRule)
                }));
            });
            return arr;
        };
        // --- --- 1.1
        this.setArrestLawSubSectionRule = function (o) {
            var arr = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormArray */]([]);
            o.map(function (x) {
                arr.push(_this.fb.group({
                    SubSectionRuleID: x.SubSectionRuleID,
                    SubSectionID: x.SubSectionID,
                    SectionNo: x.SectionNo,
                    IsActive: x.IsActive,
                    ArrestLawSubSection: _this.setArrestLawSubSection(x.ArrestLawSubSection),
                    ArrestLawSection: _this.setArrestLawSection(x.ArrestLawSection)
                }));
            });
            return arr;
        };
        // --- --- --- 1.1.1
        this.setArrestLawSubSection = function (o) {
            var arr = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormArray */]([]);
            o.map(function (x) {
                arr.push(_this.fb.group({
                    SubSectionID: x.SubSectionID,
                    SubSectionNo: x.SubSectionNo,
                    SubSectionType: x.SubSectionType,
                    SubSectionDesc: x.SubSectionDesc,
                    SectionNo: x.SectionNo
                }));
            });
            return arr;
        };
        // --- --- --- 1.1.2
        this.setArrestLawSection = function (o) {
            var arr = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormArray */]([]);
            o.map(function (x) {
                arr.push(_this.fb.group({
                    SectionNo: x.SectionNo,
                    SectionName: x.SectionName,
                    SectionDesc1: x.SectionDesc1,
                    SectionDesc2: x.SectionDesc2,
                    SectionDesc3: x.SectionDesc3,
                    LawGroupID: x.LawGroupID,
                    ArrestLawPenalty: _this.setArrestLawPenalty(x.ArrestLawPenalty)
                }));
            });
            return arr;
        };
        // --- --- --- --- 1.1.2.1
        this.setArrestLawPenalty = function (o) {
            var arr = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormArray */]([]);
            o.map(function (x) {
                arr.push(_this.fb.group({
                    PenaltyID: x.PenaltyID,
                    SectionNo: x.SectionNo,
                    PenaltyDesc: x.PenaltyDesc,
                    FineMin: x.FineMin,
                    FineMax: x.FineMax,
                    IsFinePrison: x.IsFinePrison,
                    IsTaxPaid: x.IsTaxPaid
                }));
            });
            return arr;
        };
    }
    Object.defineProperty(AllegationModalComponent.prototype, "LawGuiltbase", {
        get: function () {
            return this.lawGroupFG.get('LawGuiltbase');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AllegationModalComponent.prototype, "IndictmentLawbreaker", {
        get: function () {
            return this.lawGroupFG.get('IndictmentLawbreaker');
        },
        enumerable: true,
        configurable: true
    });
    // --- 1
    AllegationModalComponent.prototype.getArrestLawSubSectionRule = function (form) {
        return form.controls.ArrestLawSubSectionRule.controls;
    };
    // --- --- 1.1
    AllegationModalComponent.prototype.getArrestLawSubSection = function (form) {
        return form.controls.ArrestLawSubSection.controls;
    };
    // --- --- 1.2
    AllegationModalComponent.prototype.getArrestLawSection = function (form) {
        return form.controls.ArrestLawSection.controls;
    };
    // --- --- --- 1.2.1
    AllegationModalComponent.prototype.getArrestLawPenalty = function (form) {
        return form.controls.ArrestLawPenalty.controls;
    };
    AllegationModalComponent.prototype.ngOnInit = function () {
        this.lawGroupFG = this.fb.group({
            LawGuiltbase: this.fb.array([]),
            IndictmentLawbreaker: this.fb.array([])
        });
    };
    AllegationModalComponent.prototype.ngOnDestroy = function () {
        this.paginage.TotalItems = 0;
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    };
    AllegationModalComponent.prototype.onSearchByKey = function (f) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.s_lawGuiltbase.ArrestLawGuiltbasegetByKeyword(f)
                    .takeUntil(this.destroy$)
                    .subscribe(function (res) { return _this.onSearchComplete(res); });
                return [2 /*return*/];
            });
        });
    };
    AllegationModalComponent.prototype.onSearchComplete = function (list) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!list.length) {
                    alert(__WEBPACK_IMPORTED_MODULE_3_app_config_message__["a" /* Message */].noRecord);
                    return [2 /*return*/];
                }
                this.arrestLawGuitbase = list;
                this.paginage.TotalItems = list.length;
                return [2 /*return*/];
            });
        });
    };
    AllegationModalComponent.prototype.setIsChecked = function (i) {
        this.LawGuiltbase.value.map(function (item, index) {
            item.IsChecked = i == index ? true : false;
        });
    };
    AllegationModalComponent.prototype.dismiss = function (e) {
        this.d.emit(e);
    };
    AllegationModalComponent.prototype.close = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, lawGuitbase;
            return __generator(this, function (_b) {
                lawGuitbase = this.LawGuiltbase.value.filter(function (x) { return x.IsChecked; });
                if (!lawGuitbase.length) {
                    alert(__WEBPACK_IMPORTED_MODULE_3_app_config_message__["a" /* Message */].alertSelectGuiltbase);
                    return [2 /*return*/];
                }
                (_a = this.outputArrestLawGuiltbase).emit.apply(_a, lawGuitbase);
                this.c.emit(e);
                return [2 /*return*/];
            });
        });
    };
    AllegationModalComponent.prototype.pageChanges = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var list, lawGuitbase;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.arrestLawGuitbase.slice(event.startIndex - 1, event.endIndex)];
                    case 1:
                        list = _a.sent();
                        return [4 /*yield*/, this.setArrestLawGuitbase(list)];
                    case 2:
                        lawGuitbase = _a.sent();
                        this.lawGroupFG.setControl('LawGuiltbase', lawGuitbase);
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
        __metadata("design:type", Object)
    ], AllegationModalComponent.prototype, "d", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
        __metadata("design:type", Object)
    ], AllegationModalComponent.prototype, "c", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
        __metadata("design:type", Object)
    ], AllegationModalComponent.prototype, "outputArrestLawGuiltbase", void 0);
    AllegationModalComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-allegation-modal',
            template: __webpack_require__("./src/app/pages/arrests/components/allegation-modal/allegation-modal.component.html"),
            styles: [__webpack_require__("./src/app/pages/arrests/components/allegation-modal/allegation-modal.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_4__services__["c" /* ArrestLawGuiltbaseService */]])
    ], AllegationModalComponent);
    return AllegationModalComponent;
}());



/***/ }),

/***/ "./src/app/pages/arrests/components/allegation/allegation.component.html":
/***/ (function(module, exports) {

module.exports = "<app-step-wizard [sectionId]=\"2\"></app-step-wizard>\r\n<form action=\"\" [formGroup]=\"arrestIndictmentFG\">\r\n  <div class=\"card card-outline-bluish unset-radius\">\r\n    <div class=\"card-header unset-radius\">\r\n      <div class=\"card-actions\">\r\n        <a class=\"\" (click)=\"card1 = !card1\">\r\n          <i class=\"fa\" [ngClass]=\"{'fa-chevron-down': card1, 'fa-chevron-up': !card1}\"></i>\r\n        </a>\r\n      </div>\r\n      <h4 class=\"card-title m-b-0\">ฐานความผิด</h4>\r\n    </div>\r\n    <div *ngIf=\"card1\" class=\"card-body\">\r\n      <div class=\"row\">\r\n        <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ฐานความผิดมาตรา :</label>\r\n        <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n          <input formControlName=\"SubSectionType\" type=\"text\" class=\"form-control form-control-sm\" required [readOnly]=\"showEditField\">\r\n          <a href=\"javaScript:void(0);\" class=\"more text-secondary\" (click)=\"!showEditField && openModal(allegation)\">\r\n            <i class=\"ti-more-alt\" aria-hidden=\"true\"></i>\r\n          </a>\r\n          <ng-template #allegation let-c=\"close\" let-d=\"dismiss\">\r\n            <app-allegation-modal (c)=\"modal.close()\" (d)=\"modal.dismiss()\" (outputArrestLawGuiltbase)=\"setArrestLawGuiltbase($event)\"></app-allegation-modal>\r\n          </ng-template>\r\n        </div>\r\n\r\n        <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ฐานความผิด :</label>\r\n        <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n          <input formControlName=\"GuiltBaseName\" type=\"text\" class=\"form-control form-control-sm\" required readonly>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">บทกำหนดโทษ :</label>\r\n        <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n          <input formControlName=\"SectionNo\" type=\"text\" class=\"form-control form-control-sm\" required readonly>\r\n        </div>\r\n\r\n        <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">อัตราโทษ :</label>\r\n        <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n          <input formControlName=\"PenaltyDesc\" type=\"text\" class=\"form-control form-control-sm\" required readonly>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"card card-outline-bluish unset-radius\">\r\n    <div class=\"card-header unset-radius\">\r\n      <div class=\"card-actions\">\r\n        <a class=\"\" (click)=\"cardProduct = !cardProduct\">\r\n          <i class=\"fa\" [ngClass]=\"{'fa-chevron-down': cardProduct, 'fa-chevron-up': !cardProduct}\"></i>\r\n        </a>\r\n      </div>\r\n      <h4 class=\"card-title m-b-0\">ของกลาง</h4>\r\n    </div>\r\n    <div *ngIf=\"cardProduct\" class=\"card-body\">\r\n\r\n      <div class=\"table-responsive\">\r\n        <table class=\"table table-sm table-striped table-set-border\">\r\n          <thead>\r\n            <tr>\r\n              <th class=\"text-center\">\r\n                <input type=\"checkbox\" id=\"productTh\" class=\"filled-in chk-col-indigo\" (change)=\"productCheckAll()\"\r\n                  [checked]=\"isCheckAll\">\r\n                <label for=\"productTh\" class=\"m-t-10 m-b-0\"></label>\r\n              </th>\r\n              <th class=\"text-center\">ลำดับ</th>\r\n              <th>ของกลาง</th>\r\n              <th>จำนวน</th>\r\n              <th>หน่วย</th>\r\n              <th>ปริมาณสุทธิ</th>\r\n              <th>หน่วย</th>\r\n              <th></th>\r\n            </tr>\r\n          </thead>\r\n          <tbody formArrayName=\"ArrestProduct\">\r\n            <tr *ngFor=\"let item of ArrestProduct.controls; let i=index;\" [formGroupName]=\"i\">\r\n              <td *ngIf=\"item.get('IsModify').value != 'd'\" class=\"text-center\">\r\n                <input type=\"checkbox\" formControlName=\"IsChecked\" [id]=\"'productTd'+i\" class=\"filled-in chk-col-indigo\"\r\n                  (change)=\"isCheckAll && isCheckAll = false\">\r\n                <label [for]=\"'productTd'+i\" class=\"m-0\"></label>\r\n              </td>\r\n              <td *ngIf=\"item.get('IsModify').value != 'd'\" class=\"text-center\">{{item.get('RowId').value}}</td>\r\n              <td *ngIf=\"item.get('IsModify').value != 'd'\" style=\"max-width: 200px;\">\r\n                {{item.get('ProductDesc').value}}\r\n              </td>\r\n              <td *ngIf=\"item.get('IsModify').value != 'd'\" style=\"max-width: 50px;\">\r\n                <input type=\"number\" min=\"0\" formControlName=\"Qty\" class=\"form-control form-control-sm\" required\r\n                  [attr.disabled]=\"showEditField ? '' : null\">\r\n              </td>\r\n              <td *ngIf=\"item.get('IsModify').value != 'd'\" style=\"max-width: 60px;\">\r\n                <ng-template #qtyUnit let-r=\"result\" let-t=\"term\">\r\n                  {{ r.DutyCode }}\r\n                </ng-template>\r\n                <input type=\"text\" class=\"form-control form-control-sm\" [ngbTypeahead]=\"searchUnit\" [resultTemplate]=\"qtyUnit\"\r\n                  [readonly]=\"showEditField\" [inputFormatter]=\"formatterUnit\" (selectItem)=\"selectItemQtyUnit($event, i)\"\r\n                  [value]=\"item.value.QtyUnit\" />\r\n              </td>\r\n              <td *ngIf=\"item.get('IsModify').value != 'd'\" style=\"max-width: 50px;\">\r\n                <input type=\"number\" min=\"0\" formControlName=\"NetVolume\" class=\"form-control form-control-sm\"\r\n                  [attr.disabled]=\"showEditField ? '' : null\">\r\n              </td>\r\n              <td *ngIf=\"item.get('IsModify').value != 'd'\" style=\"max-width: 60px;\">\r\n                <ng-template #netVolumeUnit let-r=\"result\" let-t=\"term\">\r\n                  {{ r.DutyCode }}\r\n                </ng-template>\r\n                <input type=\"text\" class=\"form-control form-control-sm\" [ngbTypeahead]=\"searchUnit\" [resultTemplate]=\"netVolumeUnit\"\r\n                  [readonly]=\"showEditField\" [inputFormatter]=\"formatterUnit\" (selectItem)=\"selectItemNetVolumeUnit($event, i)\"\r\n                  [value]=\"item.value.NetVolumeUnit\" />\r\n              </td>\r\n              <td *ngIf=\"item.get('IsModify').value != 'd'\">\r\n                <a href=\"javaScript:void(0)\" class=\"text-warning\" *ngIf=\"!showEditField\" (click)=\"deleteProduct(i)\">\r\n                  <i class=\"fa fa-trash-o fa-lg\"></i>\r\n                </a>\r\n              </td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"card card-outline-bluish unset-radius\">\r\n    <div class=\"card-header unset-radius\">\r\n      <div class=\"card-actions\">\r\n        <a class=\"\" (click)=\"card2 = !card2\">\r\n          <i class=\"fa\" [ngClass]=\"{'fa-chevron-down': card2, 'fa-chevron-up': !card2}\"></i>\r\n        </a>\r\n      </div>\r\n      <h4 class=\"card-title m-b-0\">ผู้ต้องหา</h4>\r\n    </div>\r\n    <div *ngIf=\"card2\" class=\"card-body\">\r\n      <div class=\"row form-group\">\r\n        <div class=\"col-lg-10 col-md-9 col-sm-8\"></div>\r\n        <div class=\"col-lg-2 col-md-3 col-sm-4\">\r\n          <button type=\"button\" class=\"btn btn-block btn-themecolor\" (click)=\"openModal(allegationDetail)\" [disabled]=\"showEditField\">เพิ่มรายการ</button>\r\n\r\n          <ng-template #allegationDetail let-c=\"close\" let-d=\"dismiss\">\r\n            <app-allegation-detail-modal (c)=\"modal.close()\" (d)=\"modal.dismiss()\" \r\n            (OutputLawbreaker)=\"addArrestLawbreaker($event)\"\r\n            ></app-allegation-detail-modal>\r\n          </ng-template>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"table-responsive\">\r\n        <table class=\"table table-sm table-striped table-set-border\">\r\n          <thead>\r\n            <tr>\r\n              <th class=\"text-center\">ลำดับ</th>\r\n              <th>ประเภทผู้ต้องสงสัย</th>\r\n              <th>ประเภทบุคคล</th>\r\n              <th>หมายเลขอ้างอิง</th>\r\n              <th>ชื่อ</th>\r\n              <th></th>\r\n            </tr>\r\n          </thead>\r\n          <tbody formArrayName=\"ArrestLawbreaker\">\r\n            <tr *ngFor=\"let item of ArrestLawbreaker.controls; let i=index;\" [formGroupName]=\"i\">\r\n              <td *ngIf=\"item.get('IsModify').value != 'd'\" class=\"text-center\">{{item.get('RowId').value}}</td>\r\n              <td *ngIf=\"item.get('IsModify').value != 'd'\">{{item.get('LawbreakerTypeName').value}}</td>\r\n              <td *ngIf=\"item.get('IsModify').value != 'd'\">{{item.get('EntityTypeName').value}}</td>\r\n              <td *ngIf=\"item.get('IsModify').value != 'd'\">{{item.get('ReferenceID').value}}</td>\r\n              <td *ngIf=\"item.get('IsModify').value != 'd'\">{{item.get('LawbreakerFullName').value}}</td>\r\n              <td *ngIf=\"item.get('IsModify').value != 'd'\" class=\"text-center\">\r\n                <a href=\"javaScript:void(0);\" class=\"text-warning text-secondary\" (click)=\"deleteLawbreaker(i)\">\r\n                  <i class=\"fa fa-trash-o fa-lg\"></i>\r\n                </a>\r\n              </td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n</form>"

/***/ }),

/***/ "./src/app/pages/arrests/components/allegation/allegation.component.scss":
/***/ (function(module, exports) {

module.exports = ".more {\n  position: absolute;\n  right: 20px;\n  bottom: -4px; }\n"

/***/ }),

/***/ "./src/app/pages/arrests/components/allegation/allegation.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AllegationComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__("./node_modules/rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_takeUntil__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/takeUntil.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_shared_header_navigation_navigation_service__ = __webpack_require__("./src/app/shared/header-navigation/navigation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_observable_combineLatest__ = __webpack_require__("./node_modules/rxjs/_esm5/observable/combineLatest.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models__ = __webpack_require__("./src/app/pages/arrests/models/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__store__ = __webpack_require__("./src/app/pages/arrests/store/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services__ = __webpack_require__("./src/app/pages/arrests/services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ngrx_store__ = __webpack_require__("./node_modules/@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_app_shared_sidebar_sidebar_component__ = __webpack_require__("./src/app/shared/sidebar/sidebar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_app_services_main_master_service__ = __webpack_require__("./src/app/services/main-master.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_app_config_message__ = __webpack_require__("./src/app/config/message.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_app_services_transaction_running_service__ = __webpack_require__("./src/app/services/transaction-running.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_app_config_dateFormat__ = __webpack_require__("./src/app/config/dateFormat.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_app_core_loader_loader_service__ = __webpack_require__("./src/app/core/loader/loader.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__allegation_detail_modal_allegation_detail_modal_component__ = __webpack_require__("./src/app/pages/arrests/components/allegation-detail-modal/allegation-detail-modal.component.ts");
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




















var AllegationComponent = /** @class */ (function () {
    function AllegationComponent(modelService, activeRoute, navService, router, fb, store, sidebarService, s_mainMaster, s_notice, s_productService, s_indictment, s_indictmentDetail, s_productDetail, s_lawbreaker, s_transactionRunning, s_arrest, s_lawsuit, loaderService) {
        var _this = this;
        this.modelService = modelService;
        this.activeRoute = activeRoute;
        this.navService = navService;
        this.router = router;
        this.fb = fb;
        this.store = store;
        this.sidebarService = sidebarService;
        this.s_mainMaster = s_mainMaster;
        this.s_notice = s_notice;
        this.s_productService = s_productService;
        this.s_indictment = s_indictment;
        this.s_indictmentDetail = s_indictmentDetail;
        this.s_productDetail = s_productDetail;
        this.s_lawbreaker = s_lawbreaker;
        this.s_transactionRunning = s_transactionRunning;
        this.s_arrest = s_arrest;
        this.s_lawsuit = s_lawsuit;
        this.loaderService = loaderService;
        this.ACCEPTABILITY = __WEBPACK_IMPORTED_MODULE_8__models__["a" /* Acceptability */];
        this.typeheadQtyUnit = new Array();
        this.destroy$ = new __WEBPACK_IMPORTED_MODULE_3_rxjs__["Subject"]();
        this.card1 = true;
        this.card2 = true;
        this.cardProduct = true;
        this.isCheckAll = false;
        this.runningTable = 'ops_arrest';
        this.runningOfficeCode = '901112';
        this.runningPrefix = 'TN';
        this._isSuccess = false;
        this.searchUnit = function (text$) {
            return text$.debounceTime(200).distinctUntilChanged()
                .map(function (term) { return term == '' ? []
                : _this.typeheadQtyUnit
                    .filter(function (v) { return v.DutyCode.toLowerCase().indexOf(term.toLowerCase()) > -1; })
                    .slice(0, 10); });
        };
        this.formatterUnit = function (DutyCode) { return DutyCode; };
        // --- 1
        this.setArrestLawGuitbase = function (o) {
            var arr = new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["b" /* FormArray */]([]);
            o.map(function (x, index) {
                arr.push(_this.fb.group({
                    RowId: ++index,
                    IsChecked: false,
                    GuiltBaseID: x.GuiltBaseID,
                    GuiltBaseName: x.GuiltBaseName,
                    IsCompare: x.IsCompare,
                    IsActive: x.IsActive,
                    IsProve: x.IsProve,
                    SubSectionRuleID: x.SubSectionRuleID,
                    ArrestLawSubSectionRule: _this.setArrestLawSubSectionRule(x.ArrestLawSubSectionRule)
                }));
            });
            return arr;
        };
        // --- --- 1.1
        this.setArrestLawSubSectionRule = function (o) {
            var arr = new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["b" /* FormArray */]([]);
            o.map(function (x) {
                arr.push(_this.fb.group({
                    SubSectionRuleID: x.SubSectionRuleID,
                    SubSectionID: x.SubSectionID,
                    SectionNo: x.SectionNo,
                    IsActive: x.IsActive,
                    ArrestLawSubSection: _this.setArrestLawSubSection(x.ArrestLawSubSection),
                    ArrestLawSection: _this.setArrestLawSection(x.ArrestLawSection)
                }));
            });
            return arr;
        };
        // --- --- --- 1.1.1
        this.setArrestLawSubSection = function (o) {
            var arr = new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["b" /* FormArray */]([]);
            o.map(function (x) {
                arr.push(_this.fb.group({
                    SubSectionID: x.SubSectionID,
                    SubSectionNo: x.SubSectionNo,
                    SubSectionType: x.SubSectionType,
                    SubSectionDesc: x.SubSectionDesc,
                    SectionNo: x.SectionNo
                }));
            });
            return arr;
        };
        // --- --- --- 1.1.2
        this.setArrestLawSection = function (o) {
            var arr = new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["b" /* FormArray */]([]);
            o.map(function (x) {
                arr.push(_this.fb.group({
                    SectionNo: x.SectionNo,
                    SectionName: x.SectionName,
                    SectionDesc1: x.SectionDesc1,
                    SectionDesc2: x.SectionDesc2,
                    SectionDesc3: x.SectionDesc3,
                    LawGroupID: x.LawGroupID,
                    ArrestLawPenalty: _this.setArrestLawPenalty(x.ArrestLawPenalty)
                }));
            });
            return arr;
        };
        // --- --- --- --- 1.1.2.1
        this.setArrestLawPenalty = function (o) {
            var arr = new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["b" /* FormArray */]([]);
            o.map(function (x) {
                arr.push(_this.fb.group({
                    PenaltyID: x.PenaltyID,
                    SectionNo: x.SectionNo,
                    PenaltyDesc: x.PenaltyDesc,
                    FineMin: x.FineMin,
                    FineMax: x.FineMax,
                    IsFinePrison: x.IsFinePrison,
                    IsTaxPaid: x.IsTaxPaid
                }));
            });
            return arr;
        };
        this.clearFormArray = function (formArray) {
            while (formArray.length !== 0) {
                formArray.removeAt(0);
            }
        };
        this.isObject = function (obj) { return obj === Object(obj); };
        this.endLoader = function () { return _this.loaderService.hide(); };
        this.obArrest = store.select(function (s) { return s.arrest; });
        this.obArrest
            .takeUntil(this.destroy$)
            .subscribe(function (x) {
            _this.ArrestStore = x;
        });
        this.navService.setPrintButton(false);
        this.navService.setInnerTextPrevPageButton('งานจับกุม');
        this.navService.setInnerTextNextPageButton('รับคำกล่าวโทษ');
    }
    Object.defineProperty(AllegationComponent.prototype, "ArrestLawbreaker", {
        get: function () {
            return this.arrestIndictmentFG.get('ArrestLawbreaker');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AllegationComponent.prototype, "ArrestProduct", {
        get: function () {
            return this.arrestIndictmentFG.get('ArrestProduct');
        },
        enumerable: true,
        configurable: true
    });
    AllegationComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.sidebarService.setVersion(this.s_arrest.version);
                        this.arrestIndictmentFG = this.fb.group({
                            IndictmentID: [''],
                            ArrestCode: [''],
                            GuiltBaseID: ['', __WEBPACK_IMPORTED_MODULE_6__angular_forms__["m" /* Validators */].required],
                            IsProve: ['1', __WEBPACK_IMPORTED_MODULE_6__angular_forms__["m" /* Validators */].required],
                            IsActive: ['1', __WEBPACK_IMPORTED_MODULE_6__angular_forms__["m" /* Validators */].required],
                            IsLawsuitComplete: ['0', __WEBPACK_IMPORTED_MODULE_6__angular_forms__["m" /* Validators */].required],
                            ArrestIndictmentDetail: [[]],
                            ArrestLawGuitbase: [[]],
                            ArrestProduct: this.fb.array([]),
                            ArrestLawbreaker: this.fb.array([]),
                            IsModify: ['', __WEBPACK_IMPORTED_MODULE_6__angular_forms__["m" /* Validators */].required],
                            SubSectionType: ['', __WEBPACK_IMPORTED_MODULE_6__angular_forms__["m" /* Validators */].required],
                            GuiltBaseName: ['', __WEBPACK_IMPORTED_MODULE_6__angular_forms__["m" /* Validators */].required],
                            SectionNo: ['', __WEBPACK_IMPORTED_MODULE_6__angular_forms__["m" /* Validators */].required],
                            PenaltyDesc: ['', __WEBPACK_IMPORTED_MODULE_6__angular_forms__["m" /* Validators */].required],
                        });
                        return [4 /*yield*/, this.setProductUnitStore()];
                    case 1:
                        _a.sent();
                        this.navService.showFieldEdit.takeUntil(this.destroy$).subscribe(function (p) { return _this.showEditField = p.valueOf(); });
                        Object(__WEBPACK_IMPORTED_MODULE_7_rxjs_observable_combineLatest__["a" /* combineLatest */])(this.activeRoute.params, this.activeRoute.queryParams)
                            .map(function (results) { return ({ params: results[0], queryParams: results[1] }); })
                            .takeUntil(this.destroy$)
                            .subscribe(function (results) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _prod;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        this.mode = results.params.mode;
                                        this.arrestMode = results.queryParams.arrestMode;
                                        this.arrestCode = results.queryParams.arrestCode;
                                        this.indictmentId = results.queryParams.indictmentId;
                                        this.guiltbaseId = results.queryParams.guiltbaseId;
                                        _a = results.params.mode;
                                        switch (_a) {
                                            case 'C': return [3 /*break*/, 1];
                                            case 'R': return [3 /*break*/, 2];
                                        }
                                        return [3 /*break*/, 5];
                                    case 1:
                                        this.enableBtnModeC();
                                        if (this.arrestCode != 'NEW') {
                                            this.getArrestProductByArrest(this.arrestCode);
                                        }
                                        else {
                                            if (this.ArrestStore) {
                                                _prod = this.filterProductIsModify(this.ArrestStore.ArrestProduct);
                                                this.setItemFormArray(_prod, 'ArrestProduct');
                                            }
                                            // this.setArrestIndictFromStore();
                                        }
                                        return [3 /*break*/, 5];
                                    case 2:
                                        this.enableBtnModeR();
                                        this.loaderService.show();
                                        return [4 /*yield*/, this.getArrestIndictment(this.indictmentId)];
                                    case 3:
                                        _b.sent();
                                        return [4 /*yield*/, this.getArrestIndictmentProduct(this.indictmentId, this.arrestCode)];
                                    case 4:
                                        _b.sent();
                                        this.loaderService.hide();
                                        return [3 /*break*/, 5];
                                    case 5:
                                        this.resetConfig();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        this.navService.onSave.takeUntil(this.destroy$).subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!status) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.navService.setOnSave(false)];
                                    case 1:
                                        _a.sent();
                                        this.onSave();
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); });
                        this.navService.onEdit.takeUntil(this.destroy$).subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!status) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.navService.setOnEdit(false)];
                                    case 1:
                                        _a.sent();
                                        this.onEdit();
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); });
                        this.navService.onDelete.takeUntil(this.destroy$).subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!status) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.navService.setOnDelete(false)];
                                    case 1:
                                        _a.sent();
                                        this.onDelete();
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); });
                        this.navService.onCancel.takeUntil(this.destroy$).subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!status) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.navService.setOnCancel(false)];
                                    case 1:
                                        _a.sent();
                                        this.router.navigate(['/arrest/manage', this.arrestMode, this.arrestCode]);
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); });
                        this.navService.onNextPage.takeUntil(this.destroy$).subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!status) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.navService.setOnNextPage(false)];
                                    case 1:
                                        _a.sent();
                                        this.router.navigate(['/lawsuit/manage', 'C']);
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); });
                        this.navService.onPrevPage.takeUntil(this.destroy$).subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!status) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.navService.setOnPrevPage(false)];
                                    case 1:
                                        _a.sent();
                                        this.router.navigate(['/arrest/manage', this.arrestMode, this.newArrestCode || this.arrestCode]);
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    AllegationComponent.prototype.resetConfig = function () {
        var _this = this;
        var routerConfig = this.router['config'];
        routerConfig
            .find(function (x) { return x.path == 'arrest'; })['_loadedConfig'].routes
            .filter(function (x) { return x.path.indexOf('allegation') >= 0; })
            .map(function (x) {
            x.data.urls
                .find(function (y) { return y.url.indexOf('/arrest/manage') >= 0; }).url = "/arrest/manage/" + _this.arrestMode + "/" + _this.arrestCode;
            return x;
        });
        this.router.resetConfig(routerConfig);
    };
    AllegationComponent.prototype.enableBtnModeC = function () {
        // set false
        this.navService.setEditButton(false);
        this.navService.setDeleteButton(false);
        this.navService.setEditField(false);
        this.navService.setPrevPageButton(false);
        this.navService.setNextPageButton(false);
        // set true
        this.navService.setSaveButton(true);
        this.navService.setCancelButton(true);
    };
    AllegationComponent.prototype.enableBtnModeR = function () {
        // set false
        this.navService.setSaveButton(false);
        this.navService.setCancelButton(false);
        // set true
        this.navService.setEditButton(true);
        this.navService.setDeleteButton(true);
        this.navService.setEditField(true);
        this.navService.setPrevPageButton(true);
        this.navService.setNextPageButton(true);
    };
    AllegationComponent.prototype.selectItemQtyUnit = function (e, i) {
        this.ArrestProduct.at(i).patchValue({
            QtyUnit: e.item.DutyCode,
        });
    };
    AllegationComponent.prototype.selectItemNetVolumeUnit = function (e, i) {
        this.ArrestProduct.at(i).patchValue({
            NetVolumeUnit: e.item.DutyCode,
        });
    };
    AllegationComponent.prototype.getArrestIndictment = function (indictmentId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.s_indictment.ArrestIndictmentgetByCon(indictmentId)
                            .then(function (x) {
                            if (_this.checkResponse(x)) {
                                var indict = x[0];
                                var guiltbase = indict.ArrestLawGuitbase.find(function (x) { return x.GuiltBaseID == _this.guiltbaseId; });
                                _this.setArrestLawGuiltbase(guiltbase);
                                indict.ArrestIndicmentDetail.map(function (d) {
                                    var law = d.ArrestLawbreaker.find(function (l) { return l.LawbreakerID == d.LawbreakerID; });
                                    _this.addArrestLawbreaker(Object(__WEBPACK_IMPORTED_MODULE_18__allegation_detail_modal_allegation_detail_modal_component__["b" /* setViewLawbreaker */])(law));
                                });
                                // indictDetail.ArrestLawbreaker.map(law => {
                                //   this.addArrestLawbreaker(setViewLawbreaker(law));
                                // })
                            }
                        })
                            .catch(function (error) { return _this.catchError(error); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AllegationComponent.prototype.getArrestIndictmentProduct = function (indictmentId, arrestCode) {
        return __awaiter(this, void 0, void 0, function () {
            var _product;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _product = new Array();
                        if (this.ArrestStore) {
                            _product = this.filterProductIsModify(this.ArrestStore.ArrestProduct);
                        }
                        ;
                        return [4 /*yield*/, this.s_productService.ArrestProductgetByArrestCode(arrestCode)
                                .then(function (y) { return __awaiter(_this, void 0, void 0, function () {
                                var p;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!this.checkResponse(y))
                                                return [2 /*return*/];
                                            p = y.map(function (y1, index) {
                                                y1.IsChecked = false;
                                                y1.RowId = index + 1;
                                                y1.IsModify = 'r';
                                                return y1;
                                            });
                                            _product = _product.concat(p);
                                            return [4 /*yield*/, this.s_indictment.ArrestIndictmentProductgetByIndictmentID(indictmentId)
                                                    .then(function (x) { return __awaiter(_this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        if (!this.checkResponse(x))
                                                            return [2 /*return*/];
                                                        x.filter(function (x1) { return _product.find(function (p) { return parseInt(p.ProductID) == x1.ProductID; }).IsChecked = true; });
                                                        return [2 /*return*/];
                                                    });
                                                }); }).catch(function (error) { return _this.catchError(error); })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }).catch(function (error) { return _this.catchError(error); })];
                    case 1:
                        _a.sent();
                        this.setItemFormArray(_product, 'ArrestProduct');
                        return [2 /*return*/];
                }
            });
        });
    };
    AllegationComponent.prototype.setArrestIndictFromStore = function () {
        if (this.ArrestStore) {
            if (this.ArrestStore.ArrestIndictment) {
                this.setArrestIndictment(this.ArrestStore.ArrestIndictment);
            }
            var _prod = this.filterProductIsModify(this.ArrestStore.ArrestProduct);
            this.setItemFormArray(_prod, 'ArrestProduct');
        }
    };
    AllegationComponent.prototype.getArrestProductByArrest = function (arrestCode) {
        var _this = this;
        this.s_productService.ArrestProductgetByArrestCode(arrestCode)
            .then(function (x) {
            var _product = new Array();
            if (_this.checkResponse(x)) {
                _product = x.map(function (y, index) {
                    y.IsChecked = false;
                    y.RowId = index + 1;
                    y.IsModify = 'r';
                    return y;
                });
            }
            if (_this.ArrestStore) {
                var product = _this.filterProductIsModify(_this.ArrestStore.ArrestProduct);
                _product = _product.concat(product);
            }
            _this.setItemFormArray(_product, 'ArrestProduct');
        });
    };
    // set FormArray ArrestIndictment
    AllegationComponent.prototype.setArrestIndictment = function (o) {
        var _indict = this.arrestIndictmentFG;
        if (!o.length)
            return;
        _indict.patchValue({
            IndictmentID: o[0].IndictmentID,
            GuiltBaseID: o[0].GuiltBaseID,
            ArrestLawGuitbase: this.setArrestLawGuitbase(o[0].ArrestLawGuitbase),
            IsProve: o[0].IsProve,
            IsActive: o[0].IsActive,
            IsLawsuitComplete: o[0].IsLawsuitComplete,
        });
    };
    AllegationComponent.prototype.addArrestLawbreaker = function (lawbreaker) {
        var _this = this;
        lawbreaker.RowId = 1;
        lawbreaker.IsModify = 'c';
        this.ArrestLawbreaker.push(this.fb.group(lawbreaker));
        var sort = this.sortFormArray(this.ArrestLawbreaker.value);
        sort.then(function (x) { return _this.setItemFormArray(x, 'ArrestLawbreaker'); })
            .catch(function (error) { return _this.catchError(error); });
    };
    AllegationComponent.prototype.productCheckAll = function () {
        var _this = this;
        this.isCheckAll = !this.isCheckAll;
        var product = this.ArrestProduct.value.map(function (item) {
            item.IsChecked = _this.isCheckAll;
            return item;
        });
        this.ArrestProduct.patchValue(product);
    };
    AllegationComponent.prototype.sortFormArray = function (arr) {
        return __awaiter(this, void 0, void 0, function () {
            var a, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, arr.sort(function (a, b) {
                            if (a.RowId < b.RowId)
                                return -1; // asc
                            if (a.RowId > b.RowId)
                                return 1; // desc
                            return 0;
                        })];
                    case 1:
                        a = _a.sent();
                        i = 0;
                        a.map(function (x) { if (x.RowId != 0)
                            x.RowId = ++i; });
                        return [2 /*return*/, a];
                }
            });
        });
    };
    AllegationComponent.prototype.deleteFormArray = function (o, i, controls) {
        var _this = this;
        o.at(i).patchValue({ IsModify: 'd', RowId: 0 });
        var sort = this.sortFormArray(o.value);
        o.value.map(function () { return o.removeAt(0); });
        sort.then(function (x) { return _this.setItemFormArray(x, controls); })
            .catch(function (error) { return _this.catchError(error); });
    };
    AllegationComponent.prototype.deleteProduct = function (i) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.deleteFormArray(this.ArrestProduct, i, 'ArrestProduct')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AllegationComponent.prototype.deleteLawbreaker = function (i) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.deleteFormArray(this.ArrestLawbreaker, i, 'ArrestLawbreaker')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AllegationComponent.prototype.setProductUnitStore = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.s_mainMaster.MasDutyUnitMaingetAll()
                            .then(function (res) { return _this.typeheadQtyUnit = res; })
                            .catch(function (error) { return _this.catchError(error); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AllegationComponent.prototype.filterProductIsModify = function (p) {
        return p.filter(function (y) { return y.IsModify == 'c'; });
    };
    AllegationComponent.prototype.filterLawbreakerIsModify = function (o) {
        return o.filter(function (x) { return x.IsModify != 'd'; });
    };
    AllegationComponent.prototype.setItemFormArray = function (array, formControl) {
        var _this = this;
        if (array !== undefined && array.length) {
            var itemFGs = array.map(function (item) { return _this.fb.group(item); });
            var itemFormArray = this.fb.array(itemFGs);
            this.arrestIndictmentFG.setControl(formControl, itemFormArray);
        }
    };
    AllegationComponent.prototype.setArrestLawGuiltbase = function (e) {
        if (!e)
            return;
        var ArrestLawSubSectionRule = e.ArrestLawSubSectionRule
            .find(function (x) { return x.SubSectionRuleID == e.SubSectionRuleID; });
        var ArrestLawSubSection = ArrestLawSubSectionRule
            .ArrestLawSubSection
            .find(function (x) { return x.SubSectionID == ArrestLawSubSectionRule.SubSectionID; });
        var ArrestLawSection = ArrestLawSubSectionRule
            .ArrestLawSection
            .find(function (x) { return x.SectionNo == ArrestLawSubSectionRule.SectionNo; });
        var ArrestLawPenalty = ArrestLawSection.ArrestLawPenalty[0];
        this.arrestIndictmentFG.patchValue({
            GuiltBaseID: e.GuiltBaseID,
            ArrestLawGuitbase: e,
            IsModify: this.mode == 'C' ? 'c' : 'r',
            SubSectionType: ArrestLawSubSection.SubSectionType,
            GuiltBaseName: e.GuiltBaseName,
            SectionNo: ArrestLawSubSectionRule.SectionNo,
            PenaltyDesc: ArrestLawPenalty.PenaltyDesc,
        });
    };
    AllegationComponent.prototype.onSave = function () {
        this.arrestIndictmentFG.value;
        var lawbreaker = this.filterLawbreakerIsModify(this.ArrestLawbreaker.value);
        var product = this.ArrestProduct.value.filter(function (x) { return x.IsModify != 'd'; });
        if (this.arrestIndictmentFG.invalid) {
            alert(__WEBPACK_IMPORTED_MODULE_14_app_config_message__["a" /* Message */].checkData);
            return;
        }
        if (!lawbreaker.length && !product.length) {
            alert(__WEBPACK_IMPORTED_MODULE_14_app_config_message__["a" /* Message */].checkData);
            return;
        }
        if (this.ArrestStore) {
            var staff = this.ArrestStore.ArrestStaff.filter(function (x) { return x.IsModify != 'd'; });
            if (staff.length) {
                if (staff.length <= 0) {
                    alert('ต้องมีรายการผู้ร่วมจับกุมอย่างน้อย 1 รายการ');
                    return;
                }
                if (staff.filter(function (x) { return x.ContributorID == ''; }).length > 0) {
                    alert('กรุณาเลือกฐานะของผู้จับกุม');
                    return;
                }
                if (staff.filter(function (x) { return x.ContributorID == '6'; }).length <= 0) {
                    alert('ต้องมีผู้จับกุมที่มีฐานะเป็น “ผู้กล่าวหา” อย่างน้อย 1 รายการ');
                    return;
                }
            }
        }
        if (this.arrestCode != 'NEW' && this.mode == 'C') {
            this.createWithArrestCode();
        }
        else if (this.arrestCode == 'NEW' && this.mode == 'C') {
            this.createWithOutArrestCode();
        }
        else if (this.mode == 'R') {
            this.revised();
        }
    };
    AllegationComponent.prototype.onDelete = function () {
        var _this = this;
        this.s_lawsuit.ArrestLawsuitgetByIndictmentID(this.indictmentId)
            .then(function (x) {
            if (_this.checkResponse(x)) {
                alert(__WEBPACK_IMPORTED_MODULE_14_app_config_message__["a" /* Message */].cannotDeleteRec);
                return;
            }
            if (confirm(__WEBPACK_IMPORTED_MODULE_14_app_config_message__["a" /* Message */].confirmAction)) {
                _this.s_indictment.ArrestIndictmentupdDelete(_this.indictmentId)
                    .then(function (x) {
                    if (_this.checkResponse(x)) {
                        alert(__WEBPACK_IMPORTED_MODULE_14_app_config_message__["a" /* Message */].delComplete);
                        _this.router.navigate(['/arrest/manage', _this.arrestMode, _this.arrestCode]);
                    }
                }).catch(function (error) { return _this.catchError(error); });
            }
        }).catch(function (error) { return _this.catchError(error); });
    };
    AllegationComponent.prototype.onEdit = function () {
        this.enableBtnModeC();
    };
    AllegationComponent.prototype.createWithArrestCode = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loaderService.show();
                        return [4 /*yield*/, this.insertArrestIndictment(this.arrestCode)];
                    case 1:
                        _a.sent();
                        this.onComplete();
                        this.loaderService.hide();
                        return [2 /*return*/];
                }
            });
        });
    };
    AllegationComponent.prototype.createWithOutArrestCode = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loaderService.show();
                        return [4 /*yield*/, this.getTransactionRunning()];
                    case 1:
                        _a.sent();
                        this.onComplete();
                        this.loaderService.hide();
                        return [2 /*return*/];
                }
            });
        });
    };
    AllegationComponent.prototype.revised = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loaderService.show();
                        return [4 /*yield*/, this.s_indictment.ArrestIndictmentupdDelete(this.indictmentId)
                                .then(function (y) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!this.checkIsSuccess(y))
                                                return [2 /*return*/];
                                            return [4 /*yield*/, this.insertArrestIndictment(this.arrestCode)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })
                                .catch(function (error) { return _this.catchError(error); })];
                    case 1:
                        _a.sent();
                        this.onComplete();
                        this.loaderService.hide();
                        return [2 /*return*/];
                }
            });
        });
    };
    AllegationComponent.prototype.onComplete = function () {
        var _this = this;
        if (this._isSuccess) {
            setTimeout(function () {
                _this.isCheckAll = false;
                _this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_9__store__["b" /* RemoveArrest */]);
                _this.arrestIndictmentFG.reset();
                _this.clearFormArray(_this.ArrestProduct);
                _this.clearFormArray(_this.ArrestLawbreaker);
            }, 300);
            alert(__WEBPACK_IMPORTED_MODULE_14_app_config_message__["a" /* Message */].saveComplete);
            this.router.navigate(["arrest/allegation", 'R'], {
                queryParams: {
                    arrestMode: this.arrestMode,
                    arrestCode: this.arrestCode,
                    indictmentId: this.indictmentId,
                    guiltbaseId: this.guiltbaseId
                }
            });
        }
        else {
            alert(__WEBPACK_IMPORTED_MODULE_14_app_config_message__["a" /* Message */].saveFail);
        }
    };
    AllegationComponent.prototype.getTransactionRunning = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resRunning, tr, str, pad, ans;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.s_transactionRunning
                            .TransactionRunninggetByCon(this.runningTable, this.runningOfficeCode)
                            .then(function (x) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, x];
                        }); }); })];
                    case 1:
                        resRunning = _a.sent();
                        if (!resRunning.length) return [3 /*break*/, 3];
                        tr = resRunning.sort(function (a, b) { return b.RunningNo - a.RunningNo; })[0] // sort desc
                        ;
                        str = '' + (tr.RunningNo + 1);
                        pad = '00000';
                        ans = pad.substring(0, pad.length - str.length) + str;
                        this.arrestCode = "" + tr.RunningPrefix + tr.RunningOfficeCode + tr.RunningYear + ans;
                        return [4 /*yield*/, this.s_transactionRunning.
                                TransactionRunningupdByCon(tr.RunningID.toString())
                                .then(function (y) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (!this.checkIsSuccess(y))
                                        return [2 /*return*/];
                                    return [2 /*return*/, true];
                                });
                            }); }, function () { _this.saveFail(); return; })
                                .catch(function (error) { return _this.catchError(error); })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.s_transactionRunning
                            .TransactionRunninginsAll(this.runningOfficeCode, this.runningTable, this.runningPrefix)
                            .then(function (y) { return __awaiter(_this, void 0, void 0, function () {
                            var ans, year;
                            return __generator(this, function (_a) {
                                if (!this.checkIsSuccess(y))
                                    return [2 /*return*/];
                                ans = '00001';
                                year = ((new Date).getFullYear() + 543).toString();
                                year = year.substring(2, 4);
                                this.arrestCode = "" + this.runningPrefix + this.runningOfficeCode + year + ans;
                                return [2 /*return*/, true];
                            });
                        }); }, function () { _this.saveFail(); return; })
                            .catch(function (error) { return _this.catchError(error); })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        if (!this.arrestCode) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.insertArrest(this.arrestCode)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AllegationComponent.prototype.insertArrest = function (arrestCode) {
        return __awaiter(this, void 0, void 0, function () {
            var a, arrestDate, occurrenceDate, newArrest;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!arrestCode) {
                            this.saveFail();
                            return [2 /*return*/];
                        }
                        ;
                        a = this.ArrestStore;
                        a.ArrestCode = arrestCode;
                        if (this.isObject(a.ArrestDate)) {
                            arrestDate = Object(__WEBPACK_IMPORTED_MODULE_16_app_config_dateFormat__["d" /* getDateMyDatepicker */])(a.ArrestDate);
                            a.ArrestDate = Object(__WEBPACK_IMPORTED_MODULE_16_app_config_dateFormat__["c" /* convertDateForSave */])(arrestDate);
                        }
                        if (this.isObject(a.OccurrenceDate)) {
                            occurrenceDate = Object(__WEBPACK_IMPORTED_MODULE_16_app_config_dateFormat__["d" /* getDateMyDatepicker */])(a.OccurrenceDate);
                            a.OccurrenceDate = Object(__WEBPACK_IMPORTED_MODULE_16_app_config_dateFormat__["c" /* convertDateForSave */])(occurrenceDate);
                        }
                        newArrest = {
                            ArrestCode: a.ArrestCode,
                            ArrestDate: a.ArrestDate,
                            ArrestTime: a.ArrestTime,
                            OccurrenceDate: a.OccurrenceDate,
                            OccurrenceTime: a.OccurrenceTime,
                            ArrestStationCode: a.ArrestStationCode,
                            ArrestStation: a.ArrestStation,
                            HaveCulprit: a.HaveCulprit,
                            Behaviour: a.Behaviour,
                            Testimony: a.Testimony,
                            Prompt: a.Prompt,
                            IsMatchNotice: a.IsMatchNotice,
                            ArrestDesc: a.ArrestDesc,
                            NoticeCode: a.NoticeCode,
                            InvestigationSurveyDocument: a.InvestigationSurveyDocument,
                            InvestigationCode: a.InvestigationCode,
                            IsActive: a.IsActive,
                            ArrestLocale: a.ArrestLocale
                                .map(function (x) {
                                x.ArrestCode = a.ArrestCode;
                                return x;
                            }),
                            ArrestStaff: a.ArrestStaff
                                .filter(function (x) { return x.IsModify != 'd'; })
                                .map(function (x) {
                                x.ArrestCode = a.ArrestCode;
                                return x;
                            })
                        };
                        console.log('Arrest : ', JSON.stringify(newArrest));
                        return [4 /*yield*/, this.s_arrest.ArrestinsAll(newArrest)
                                .then(function (x) { return __awaiter(_this, void 0, void 0, function () {
                                var newNotice;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!this.checkIsSuccess(x))
                                                return [2 /*return*/];
                                            newNotice = a.ArrestNotice.filter(function (x) { return x.IsModify != 'd'; })
                                                .map(function (x) {
                                                x.ArrestCode = a.ArrestCode;
                                                return x;
                                            });
                                            return [4 /*yield*/, this.updateArrestNotice(newNotice)];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, this.insertArrestIndictment(arrestCode)];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, function () { _this.saveFail(); return; })
                                .catch(function (error) { return _this.catchError(error); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AllegationComponent.prototype.updateArrestNotice = function (arrestNotice) {
        return __awaiter(this, void 0, void 0, function () {
            var n;
            var _this = this;
            return __generator(this, function (_a) {
                n = arrestNotice.map(function (x) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log('ArrestNotice : ', JSON.stringify({ ArrestCode: x.ArrestCode, NoticeCode: x.NoticeCode }));
                                return [4 /*yield*/, this.s_notice.ArrestNoticeupdByCon(x.ArrestCode, x.NoticeCode)
                                        .then(function (x) {
                                        if (!_this.checkIsSuccess(x))
                                            return;
                                    }, function () { _this.saveFail(); return; })
                                        .catch(function (error) { return _this.catchError(error); })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/, Promise.all(n)];
            });
        });
    };
    AllegationComponent.prototype.insertArrestIndictment = function (arrestCode) {
        return __awaiter(this, void 0, void 0, function () {
            var i, newIndictment;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = this.arrestIndictmentFG.value;
                        newIndictment = new __WEBPACK_IMPORTED_MODULE_8__models__["b" /* ArrestIndictment */];
                        newIndictment.ArrestCode = arrestCode;
                        newIndictment.GuiltBaseID = i.GuiltBaseID;
                        newIndictment.IsProve = i.IsProve || 1;
                        newIndictment.IsActive = i.IsActive || 1;
                        newIndictment.IsLawsuitComplete = i.IsLawsuitComplete || 0;
                        console.log('ArrestIndictment : ', JSON.stringify(newIndictment));
                        return [4 /*yield*/, this.s_indictment.ArrestIndictmentinsAll(newIndictment)
                                .then(function (x) { return __awaiter(_this, void 0, void 0, function () {
                                var product, lawbreaker;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!this.checkIsSuccess(x))
                                                return [2 /*return*/];
                                            this.indictmentId = x.IndictmentID;
                                            this.guiltbaseId = i.GuiltBaseID;
                                            return [4 /*yield*/, this.insertArrestProduct(arrestCode, x.IndictmentID).then(function (product) { return product; })];
                                        case 1:
                                            product = _a.sent();
                                            return [4 /*yield*/, this.insertArrestLawbreaker(arrestCode, x.IndictmentID, product)];
                                        case 2:
                                            lawbreaker = _a.sent();
                                            return [2 /*return*/, Promise.all([product, lawbreaker])];
                                    }
                                });
                            }); }, function () { _this.saveFail(); return false; })
                                .catch(function (error) { return _this.catchError(error); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AllegationComponent.prototype.insertArrestLawbreaker = function (arrestCode, indictmentId, productArr) {
        return __awaiter(this, void 0, void 0, function () {
            var lawbreaker, lawb;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lawbreaker = this.ArrestLawbreaker.value;
                        if (!lawbreaker.length) return [3 /*break*/, 2];
                        return [4 /*yield*/, lawbreaker
                                .filter(function (e) { return e.IsModify == 'c'; })
                                .map(function (e) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            e.ResultCount = "";
                                            e.ArrestCode = arrestCode;
                                            e.LawbreakerRefID = e.LawbreakerID;
                                            console.log('Lawbreaker : ', JSON.stringify(e));
                                            return [4 /*yield*/, this.s_lawbreaker
                                                    .ArrestLawbreakerinsAll(e)
                                                    .then(function (y) { return __awaiter(_this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                if (!this.checkIsSuccess(y))
                                                                    return [2 /*return*/];
                                                                return [4 /*yield*/, this.insertArrestIndictmentDetail(indictmentId, y.LawbreakerID, productArr)];
                                                            case 1:
                                                                _a.sent();
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); }, function () { _this.saveFail(); return; })
                                                    .catch(function (error) { return _this.catchError(error); })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        lawb = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.insertArrestIndictmentDetail(indictmentId, null, productArr)];
                    case 3:
                        lawb = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, Promise.all(lawb)];
                }
            });
        });
    };
    AllegationComponent.prototype.insertArrestIndictmentDetail = function (indictmentID, lawbreakerId, productArr) {
        return __awaiter(this, void 0, void 0, function () {
            var indictmentDetail;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        indictmentDetail = new __WEBPACK_IMPORTED_MODULE_8__models__["c" /* ArrestIndictmentDetail */]();
                        indictmentDetail.IndictmentID = indictmentID;
                        indictmentDetail.LawbreakerID = lawbreakerId;
                        indictmentDetail.IsActive = 1;
                        console.log('ArrestIndictmentDetail : ', JSON.stringify(indictmentDetail));
                        return [4 /*yield*/, this.s_indictmentDetail
                                .ArrestIndicmentDetailinsAll(indictmentDetail)
                                .then(function (x) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!this.checkIsSuccess(x))
                                                return [2 /*return*/];
                                            return [4 /*yield*/, this.insertArrestProductDetail(x.IndictmentDetailID, productArr)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, function () { _this.saveFail(); return; })
                                .catch(function (error) { return _this.catchError(error); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AllegationComponent.prototype.insertArrestProduct = function (arrestCode, indictmentId) {
        return __awaiter(this, void 0, void 0, function () {
            var product;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        product = this.ArrestProduct.value;
                        // let product: fromModels.ArrestProduct[] = this.filterProductIsModify(this.ArrestProduct.value);
                        return [4 /*yield*/, product.map(function (w) { return __awaiter(_this, void 0, void 0, function () {
                                var _a, indictProd;
                                var _this = this;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            w.ArrestCode = arrestCode;
                                            w.GroupCode = w.GroupCode || '1';
                                            w.IsDomestic = w.IsDomestic || '1';
                                            w.ProductDesc = this.isObject(w.ProductDesc) ? w.ProductDesc['ProductDesc'] : w.ProductDesc;
                                            _a = w.IsModify;
                                            switch (_a) {
                                                case 'c': return [3 /*break*/, 1];
                                                case 'r': return [3 /*break*/, 3];
                                            }
                                            return [3 /*break*/, 6];
                                        case 1:
                                            console.log('ArrestProduct "c" : ', JSON.stringify(w));
                                            return [4 /*yield*/, this.s_productService.ArrestProductinsAll(w)
                                                    .then(function (x) { return __awaiter(_this, void 0, void 0, function () {
                                                    var indictProd;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                if (!this.checkIsSuccess(x))
                                                                    return [2 /*return*/];
                                                                if (!w.IsChecked) return [3 /*break*/, 2];
                                                                console.log('ArrestIndictmentProduct "c" : ', JSON.stringify(w));
                                                                // let prod = await this.insertArrestProductDetail(indictmentDetailID, x.ProductID, w);
                                                                w.ProductID = x.ProductID;
                                                                return [4 /*yield*/, this.insertArrestIndictmentProduct(indictmentId, x.ProductID, w)];
                                                            case 1:
                                                                indictProd = _a.sent();
                                                                return [2 /*return*/, Promise.all([indictProd])];
                                                            case 2: return [2 /*return*/];
                                                        }
                                                    });
                                                }); }, function () { _this.saveFail(); return; })
                                                    .catch(function (error) { return _this.catchError(error); })];
                                        case 2:
                                            _b.sent();
                                            return [3 /*break*/, 6];
                                        case 3:
                                            if (!w.IsChecked) return [3 /*break*/, 5];
                                            console.log('ArrestIndictmentProduct "r" : ', JSON.stringify(w));
                                            return [4 /*yield*/, this.insertArrestIndictmentProduct(indictmentId, parseInt(w.ProductID), w)];
                                        case 4:
                                            indictProd = _b.sent();
                                            return [2 /*return*/, Promise.all([indictProd])];
                                        case 5: return [3 /*break*/, 6];
                                        case 6: return [2 /*return*/, w];
                                    }
                                });
                            }); })];
                    case 1:
                        // let product: fromModels.ArrestProduct[] = this.filterProductIsModify(this.ArrestProduct.value);
                        _a.sent();
                        return [2 /*return*/, product];
                }
            });
        });
    };
    AllegationComponent.prototype.insertArrestProductDetail = function (indictmentDetailID, productArr) {
        return __awaiter(this, void 0, void 0, function () {
            var pd;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productArr
                            .filter(function (p) { return p.IsChecked; })
                            .map(function (p) { return __awaiter(_this, void 0, void 0, function () {
                            var pd, _pd;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        pd = new __WEBPACK_IMPORTED_MODULE_8__models__["f" /* ArrestProductDetail */]();
                                        pd.ProductID = parseInt(p.ProductID);
                                        pd.IsProdcutCo = '1';
                                        pd.Qty = p.Qty || '0';
                                        pd.QtyUnit = p.QtyUnit || '-';
                                        pd.Size = p.Size || '0';
                                        pd.SizeUnit = p.SizeUnitName || '-';
                                        pd.Volume = p.NetVolume || '0';
                                        pd.VolumeUnit = p.NetVolumeUnit || '-';
                                        pd.MistreatRate = '';
                                        pd.Fine = '';
                                        pd.IndictmentDetailID = indictmentDetailID;
                                        pd.ProductDesc = p.ProductDesc;
                                        pd.IsActive = 1;
                                        console.log('ProductDetail : ', JSON.stringify(pd));
                                        return [4 /*yield*/, this.s_productDetail.ArrestProductDetailinsAll(pd)
                                                .then(function (y) {
                                                if (!_this.checkIsSuccess(y))
                                                    return;
                                            }, function () { _this.saveFail(); return; })
                                                .catch(function (error) { return _this.catchError(error); })];
                                    case 1:
                                        _pd = _a.sent();
                                        return [2 /*return*/, Promise.all([_pd])];
                                }
                            });
                        }); })];
                    case 1:
                        pd = _a.sent();
                        return [2 /*return*/, Promise.all([pd])];
                }
            });
        });
    };
    AllegationComponent.prototype.insertArrestIndictmentProduct = function (indictmentId, productId, product) {
        return __awaiter(this, void 0, void 0, function () {
            var p;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        p = new __WEBPACK_IMPORTED_MODULE_8__models__["d" /* ArrestIndictmentProduct */]();
                        p.IndictmentID = indictmentId;
                        p.ProductID = productId;
                        p.IsProdcutCo = '1';
                        p.IndictmentProductQty = product.Qty || '0';
                        p.IndictmentProductQtyUnit = product.QtyUnit || '-';
                        p.IndictmentProductSize = product.Size || '0';
                        p.IndictmentProductSizeUnit = product.SizeUnitName || '-';
                        p.IndictmentProductVolume = product.NetVolume || '0';
                        p.IndictmentProductVolumeUnit = product.NetVolumeUnit || '-';
                        p.IndictmentProductMistreatRate = '';
                        p.IndictmentProductFine = '';
                        p.IndictmentProductIsActive = 1;
                        console.log('IndictmentProduct : ', JSON.stringify(p));
                        return [4 /*yield*/, this.s_indictment.ArrestIndictmentProductinsAll(p)
                                .then(function (y) {
                                if (!_this.checkIsSuccess(y))
                                    return;
                            }).catch(function (error) { return _this.catchError(error); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AllegationComponent.prototype.saveFail = function () {
        this._isSuccess = false;
        return false;
    };
    AllegationComponent.prototype.checkResponse = function (res) {
        switch (res.IsSuccess) {
            case 'False':
            case false:
                return false;
            default:
                return true;
        }
    };
    AllegationComponent.prototype.checkIsSuccess = function (res) {
        switch (res.IsSuccess) {
            case 'True':
            case true:
                this._isSuccess = true;
                return true;
            default:
                this._isSuccess = false;
                return false;
        }
    };
    AllegationComponent.prototype.catchError = function (error) {
        console.log(error);
        this.endLoader();
    };
    AllegationComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    };
    AllegationComponent.prototype.openModal = function (e) {
        this.modal = this.modelService.open(e, { size: 'lg', centered: true });
    };
    AllegationComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-allegation',
            template: __webpack_require__("./src/app/pages/arrests/components/allegation/allegation.component.html"),
            styles: [__webpack_require__("./src/app/pages/arrests/components/allegation/allegation.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["d" /* NgbModal */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_5_app_shared_header_navigation_navigation_service__["a" /* NavigationService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */],
            __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_11__ngrx_store__["a" /* Store */],
            __WEBPACK_IMPORTED_MODULE_12_app_shared_sidebar_sidebar_component__["b" /* SidebarService */],
            __WEBPACK_IMPORTED_MODULE_13_app_services_main_master_service__["a" /* MainMasterService */], __WEBPACK_IMPORTED_MODULE_10__services__["g" /* ArrestNoticeService */], __WEBPACK_IMPORTED_MODULE_10__services__["i" /* ArrestProductService */], __WEBPACK_IMPORTED_MODULE_10__services__["b" /* ArrestIndictmentService */], __WEBPACK_IMPORTED_MODULE_10__services__["a" /* ArrestIndictmentDetailService */], __WEBPACK_IMPORTED_MODULE_10__services__["h" /* ArrestProductDetailService */], __WEBPACK_IMPORTED_MODULE_10__services__["e" /* ArrestLawbreakerService */], __WEBPACK_IMPORTED_MODULE_15_app_services_transaction_running_service__["a" /* TransactionRunningService */], __WEBPACK_IMPORTED_MODULE_10__services__["j" /* ArrestService */], __WEBPACK_IMPORTED_MODULE_10__services__["d" /* ArrestLawSuitService */], __WEBPACK_IMPORTED_MODULE_17_app_core_loader_loader_service__["a" /* LoaderService */]])
    ], AllegationComponent);
    return AllegationComponent;
}());



/***/ }),

/***/ "./src/app/pages/arrests/components/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return components; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__manage_manage_component__ = __webpack_require__("./src/app/pages/arrests/components/manage/manage.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__list_list_component__ = __webpack_require__("./src/app/pages/arrests/components/list/list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__allegation_allegation_component__ = __webpack_require__("./src/app/pages/arrests/components/allegation/allegation.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__allegation_detail_modal_allegation_detail_modal_component__ = __webpack_require__("./src/app/pages/arrests/components/allegation-detail-modal/allegation-detail-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__allegation_modal_allegation_modal_component__ = __webpack_require__("./src/app/pages/arrests/components/allegation-modal/allegation-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lawbreaker_lawbreaker_component__ = __webpack_require__("./src/app/pages/arrests/components/lawbreaker/lawbreaker.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modal_notice_modal_notice_component__ = __webpack_require__("./src/app/pages/arrests/components/modal-notice/modal-notice.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__offense_modal_offense_modal_component__ = __webpack_require__("./src/app/pages/arrests/components/offense-modal/offense-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__print_doc_modal_print_doc_modal_component__ = __webpack_require__("./src/app/pages/arrests/components/print-doc-modal/print-doc-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__lawbreaker_model_lawbreaker_model_component__ = __webpack_require__("./src/app/pages/arrests/components/lawbreaker-model/lawbreaker-model.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__manage_manage_component__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__list_list_component__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__allegation_allegation_component__["a"]; });
/* unused harmony namespace reexport */
/* unused harmony namespace reexport */
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_5__lawbreaker_lawbreaker_component__["a"]; });
/* unused harmony namespace reexport */
/* unused harmony namespace reexport */
/* unused harmony namespace reexport */
/* unused harmony namespace reexport */










var components = [
    __WEBPACK_IMPORTED_MODULE_1__list_list_component__["a" /* ListComponent */],
    __WEBPACK_IMPORTED_MODULE_0__manage_manage_component__["a" /* ManageComponent */],
    __WEBPACK_IMPORTED_MODULE_2__allegation_allegation_component__["a" /* AllegationComponent */],
    __WEBPACK_IMPORTED_MODULE_4__allegation_modal_allegation_modal_component__["a" /* AllegationModalComponent */],
    __WEBPACK_IMPORTED_MODULE_3__allegation_detail_modal_allegation_detail_modal_component__["a" /* AllegationDetailModalComponent */],
    __WEBPACK_IMPORTED_MODULE_5__lawbreaker_lawbreaker_component__["a" /* LawbreakerComponent */],
    __WEBPACK_IMPORTED_MODULE_6__modal_notice_modal_notice_component__["a" /* ModalNoticeComponent */],
    __WEBPACK_IMPORTED_MODULE_7__offense_modal_offense_modal_component__["a" /* OffenseModalComponent */],
    __WEBPACK_IMPORTED_MODULE_8__print_doc_modal_print_doc_modal_component__["a" /* PrintDocModalComponent */],
    __WEBPACK_IMPORTED_MODULE_9__lawbreaker_model_lawbreaker_model_component__["a" /* LawbreakerModelComponent */]
];












/***/ }),

/***/ "./src/app/pages/arrests/components/lawbreaker-model/lawbreaker-model.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\r\n  lawbreaker-model works!\r\n</p>\r\n"

/***/ }),

/***/ "./src/app/pages/arrests/components/lawbreaker-model/lawbreaker-model.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/arrests/components/lawbreaker-model/lawbreaker-model.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LawbreakerModelComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LawbreakerModelComponent = /** @class */ (function () {
    function LawbreakerModelComponent() {
    }
    LawbreakerModelComponent.prototype.ngOnInit = function () {
    };
    LawbreakerModelComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-lawbreaker-model',
            template: __webpack_require__("./src/app/pages/arrests/components/lawbreaker-model/lawbreaker-model.component.html"),
            styles: [__webpack_require__("./src/app/pages/arrests/components/lawbreaker-model/lawbreaker-model.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], LawbreakerModelComponent);
    return LawbreakerModelComponent;
}());



/***/ }),

/***/ "./src/app/pages/arrests/components/lawbreaker/lawbreaker.component.html":
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"LawbreakerFG\">\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header unset-radius\">\r\n            <div class=\"card-actions\">\r\n                <a class=\"\" (click)=\"card1 = !card1\">\r\n                    <i class=\"fa\" [ngClass]=\"{'fa-chevron-down': card1, 'fa-chevron-up': !card1}\"></i>\r\n                </a>\r\n            </div>\r\n            <h4 class=\"card-title m-b-0\">ข้อมูลส่วนต้ว</h4>\r\n        </div>\r\n        <div class=\"card-body\" *ngIf=\"card1\">\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ประเภทผู้ต้องสงสัย :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <select formControlName=\"LawbreakerType\" class=\"form-control form-control-sm\"\r\n                        [ngClass]=\"{'ng-touched':isRequired}\" [attr.disabled]=\"showEditField ? '' : null\" required\r\n                        (change)=\"toggleCard()\">\r\n                        <option value=\"\" selected disabled></option>\r\n                        <option *ngFor=\"let item of LawbreakerTypes; let i=index;\" [value]=\"item.value\">{{item.text}}</option>\r\n                    </select>\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ประเภทบุคคล :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <select formControlName=\"EntityType\" class=\"form-control form-control-sm\" [ngClass]=\"{'ng-touched':isRequired}\"\r\n                        [attr.disabled]=\"showEditField ? '' : null\" required (change)=\"toggleCard()\">\r\n                        <option value=\"\" selected disabled></option>\r\n                        <option *ngFor=\"let item of entityTypes; let i=index;\" [value]=\"item.value\">{{item.text}}</option>\r\n                    </select>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">เลขบัตรประชาชน :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"IDCard\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">คำนำหน้าชื่อ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <select formControlName=\"LawbreakerTitleCode\" class=\"form-control form-control-sm\" [attr.disabled]=\"showEditField ? '' : null\">\r\n                        <option value=\"\" selected disabled></option>\r\n                        <option *ngFor=\"let item of typeheadTitleNames; let i=index;\" [value]=\"item.TitleCode\">{{item.TitleNameTH}}</option>\r\n                    </select>\r\n                    <!-- <ng-template #rt let-r=\"result\" let-t=\"term\">\r\n                        {{ r.TitleNameTH }}\r\n                    </ng-template>\r\n\r\n                    <input type=\"text\" class=\"form-control form-control-sm\" [ngbTypeahead]=\"searchTitleName\"\r\n                        [resultTemplate]=\"rt\" [readOnly]=\"showEditField\" [inputFormatter]=\"formatterTitleName\"\r\n                        (selectItem)=\"selectItemTitleName($event)\" [value]=\"LawbreakerFG.get('LawbreakerTitleName').value\" /> -->\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ชื่อจริง :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"LawbreakerFirstName\" class=\"form-control form-control-sm\"\r\n                        [readonly]=\"showEditField\">\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">นามสกุล :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"LawbreakerLastName\" class=\"form-control form-control-sm\"\r\n                        [readonly]=\"showEditField\">\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ชื่ออื่น :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"LawbreakerOtherName\" class=\"form-control form-control-sm\"\r\n                        [readonly]=\"showEditField\">\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">วันเกิด :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <my-date-picker-th formControlName=\"BirthDate\" [options]=\"myDatePickerOptions\" [disabled]=\"showEditField\"></my-date-picker-th>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">กรุ๊ปเลือด :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <select formControlName=\"BloodType\" class=\"form-control form-control-sm\" [attr.disabled]=\"showEditField ? '' : null\">\r\n                        <option value=\"\" selected disabled></option>\r\n                        <option *ngFor=\"let item of bloodTypes; let i=index;\" [value]=\"item.value\">{{item.text}}</option>\r\n                    </select>\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">สัญชาติ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <select formControlName=\"NationalityCode\" class=\"form-control form-control-sm\" [attr.disabled]=\"showEditField ? '' : null\">\r\n                        <option value=\"\" selected disabled></option>\r\n                        <option *ngFor=\"let item of typeheadNationality; let i=index;\" [value]=\"item.NationalityCode\">{{item.NationalityNameTh}}</option>\r\n                    </select>\r\n                    <!-- <ng-template #rt let-r=\"result\" let-t=\"term\">\r\n                        {{ r.TitleNameTH }}\r\n                    </ng-template>\r\n\r\n                    <input type=\"text\" class=\"form-control form-control-sm\" [ngbTypeahead]=\"searchNationality\"\r\n                        [resultTemplate]=\"rt\" [readOnly]=\"showEditField\" [inputFormatter]=\"formatterNationality\"\r\n                        (selectItem)=\"selectItemNationality($event)\" [value]=\"LawbreakerFG.get('NationalityNameTH').value\" /> -->\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">เชื่อชาติ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <select #race formControlName=\"RaceCode\" class=\"form-control form-control-sm\" [attr.disabled]=\"showEditField ? '' : null\">\r\n                        <option value=\"\" selected disabled></option>\r\n                        <option *ngFor=\"let item of typeheadRaces; let i=index;\" [value]=\"item.RaceCode\">{{item.RaceNameTH}}</option>\r\n                    </select>\r\n                    <!-- <ng-template #rt let-r=\"result\" let-t=\"term\">\r\n                        {{ r.TitleNameTH }}\r\n                    </ng-template>\r\n\r\n                    <input type=\"text\" class=\"form-control form-control-sm\" [ngbTypeahead]=\"searchRace\"\r\n                        [resultTemplate]=\"rt\" [readOnly]=\"showEditField\" [inputFormatter]=\"formatterRace\" (selectItem)=\"selectItemRace($event)\"\r\n                        [value]=\"LawbreakerFG.get('RaceName').value\" /> -->\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ศาสนา :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <select formControlName=\"ReligionCode\" class=\"form-control form-control-sm\" [attr.disabled]=\"showEditField ? '' : null\">\r\n                        <option value=\"\" selected disabled></option>\r\n                        <option *ngFor=\"let item of typeheadReligions; let i=index;\" [value]=\"item.ReligionCode\">{{item.ReligionNameTH}}</option>\r\n                    </select>\r\n                    <!-- <ng-template #rt let-r=\"result\" let-t=\"term\">\r\n                        {{ r.TitleNameTH }}\r\n                    </ng-template>\r\n\r\n                    <input type=\"text\" class=\"form-control form-control-sm\" [ngbTypeahead]=\"searchRace\"\r\n                        [resultTemplate]=\"rt\" [readOnly]=\"showEditField\" [inputFormatter]=\"formatterRace\" (selectItem)=\"selectItemRace($event)\"\r\n                        [value]=\"LawbreakerFG.get('RaceName').value\" /> -->\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">สถานะภาพ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <select formControlName=\"MaritalStatus\" class=\"form-control form-control-sm\" [attr.disabled]=\"showEditField ? '' : null\">\r\n                        <option value=\"\" selected disabled></option>\r\n                        <option *ngFor=\"let item of materialStatus; let i=index;\" [value]=\"item.value\">{{item.text}}</option>\r\n                    </select>\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">อาชีพ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"Career\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ชื่อบิดา :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"FatherName\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ชื่อมารดา :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"MotherName\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">เบอร์โทรศัพท์ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"TelephoneNo\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">อีเมล์ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"Email\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">รูปถ่ายผู้ต้องสงสัย :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <label for=\"fileImg\" class=\"find-img\">\r\n                        <img #imgNobody src=\"assets/images/users/nobody.jpg\" alt=\"\" height=\"180px\" width=\"180px\">\r\n                        <span>เลือกรูปภาพ</span>\r\n                    </label>\r\n                    <input id='fileImg' (change)=\"changeImage($event, imgNobody)\" type=\"file\" hidden [attr.disabled]=\"showEditField ? '' : null\">\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">จำนวนครั้งกระทำผิด :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" class=\"form-control form-control-sm\" readonly>\r\n                    <!-- <a class=\"viewOffense text-secondary\" href=\"javaScript:void(0);\" (click)=\"!showEditField && openOffenseDetailModal(offens)\">\r\n                        <i class=\"fa fa-eye fa-lg\"></i>\r\n                    </a> -->\r\n\r\n                    <!-- <ng-template #offens let-c=\"close\" let-d=\"dismiss\">\r\n                        <app-modal-offense (c)=\"modal.close()\" (d)=\"modal.dismiss()\"></app-modal-offense>\r\n                    </ng-template> -->\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header unset-radius\">\r\n            <div class=\"card-actions\">\r\n                <a class=\"\" (click)=\"card2 = !card2\">\r\n                    <i class=\"fa\" [ngClass]=\"{'fa-chevron-down': card2, 'fa-chevron-up': !card2}\"></i>\r\n                </a>\r\n            </div>\r\n            <h4 class=\"card-title m-b-0\">ที่อยู่/สถานที่ทำการ</h4>\r\n        </div>\r\n        <div *ngIf=\"card2\" class=\"card-body\">\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ละติจูด :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input #latitude (change)=\"onChangeGps()\" type=\"text\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ลองจิจูด :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input #longitude (change)=\"onChangeGps()\" type=\"text\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n\r\n                <input type=\"text\" formControlName=\"GPS\" style=\"display: none;\">\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">บ้านเลขที่ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"Address\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">หมู่ที่ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"Village\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">อาคาร/สถานที่ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"Building\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ห้อง :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"Room\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ชั้น :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"Floor\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ตรอก/ซอย :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"Alley\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ถนน :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"Road\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ต./อ./จ. :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <ng-template #rt let-r=\"result\" let-t=\"term\">\r\n                        {{ r.SubdistrictNameTH }} {{r.DistrictNameTH}} {{r.ProvinceNameTH}}\r\n                    </ng-template>\r\n\r\n                    <input type=\"text\" class=\"form-control form-control-sm\" [ngbTypeahead]=\"searchRegion\"\r\n                        [resultTemplate]=\"rt\" [readOnly]=\"showEditField\" [inputFormatter]=\"formatterRegion\"\r\n                        (selectItem)=\"selectItemRegion($event)\" \r\n                        [value]=\"LawbreakerFG.get('Region').value\"/>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">รหัสไปรษณีย์ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"ZipCode\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header unset-radius\">\r\n            <div class=\"card-actions\">\r\n                <a class=\"\" (click)=\"card3 = !card3\">\r\n                    <i class=\"fa\" [ngClass]=\"{'fa-chevron-down': card3, 'fa-chevron-up': !card3}\"></i>\r\n                </a>\r\n            </div>\r\n            <h4 class=\"card-title m-b-0\">ข้อมูลชาวต่างชาติ</h4>\r\n        </div>\r\n        <div *ngIf=\"card3\" class=\"card-body\">\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">เลขหนังสือเดินทาง :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <!-- <div *ngIf=\"requiredPassport; else notShow\"> -->\r\n                    <input type=\"text\" formControlName=\"PassportNo\" class=\"form-control form-control-sm\" [ngClass]=\"{'ng-touched':isRequired}\"\r\n                        [required]=\"requiredPassport\" [readonly]=\"showEditField\">\r\n                    <!-- </div>\r\n                    <ng-template #notShow>\r\n                        <input type=\"text\" formControlName=\"PassportNo\" class=\"form-control form-control-sm\"\r\n                            [readonly]=\"showEditField\">\r\n                    </ng-template> -->\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ประเทศที่ออกหนังสือเดินทาง :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <ng-template #rt let-r=\"result\" let-t=\"term\">\r\n                        {{ r.CountryNameEN }}\r\n                    </ng-template>\r\n\r\n                    <input type=\"text\" class=\"form-control form-control-sm\" [ngbTypeahead]=\"searchCountry\"\r\n                        [resultTemplate]=\"rt\" [readOnly]=\"showEditField\" [inputFormatter]=\"formatterCountry\"\r\n                        (selectItem)=\"selectItemCountry($event)\" [value]=\"LawbreakerFG.get('PassportCountryName').value\" />\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">วันที่เข้าประเทศ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <my-date-picker-th formControlName=\"PassportDateIn\" [options]=\"myDatePickerOptions\" [disabled]=\"showEditField\"></my-date-picker-th>\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">วันที่ออกประเทศ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <my-date-picker-th formControlName=\"PassportDateOut\" [options]=\"myDatePickerOptions\" [disabled]=\"showEditField\"></my-date-picker-th>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ประเภทวีซ่า :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <select formControlName=\"VISAType\" class=\"form-control form-control-sm\" [attr.disabled]=\"showEditField ? '' : null\">\r\n                        <option value=\"\" selected disabled></option>\r\n                        <option *ngFor=\"let item of visaTypes; let i=index;\" [value]=\"item.value\">{{item.text}}</option>\r\n                    </select>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header unset-radius\">\r\n            <div class=\"card-actions\">\r\n                <a class=\"\" (click)=\"card4 = !card4\">\r\n                    <i class=\"fa\" [ngClass]=\"{'fa-chevron-down': card4, 'fa-chevron-up': !card4}\"></i>\r\n                </a>\r\n            </div>\r\n            <h4 class=\"card-title m-b-0\">ข้อมูลผู้ประกอบการ</h4>\r\n        </div>\r\n        <div *ngIf=\"card4\" class=\"card-body\">\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">เลขทะเบียนนิติบุคคล :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <!-- <div *ngIf=\"requiredCompanyRegister; else notShow\"> -->\r\n                    <input type=\"text\" formControlName=\"CompanyRegistrationNo\" class=\"form-control form-control-sm\"\r\n                        [ngClass]=\"{'ng-touched':isRequired}\" [required]=\"requiredCompanyRegister\" [readonly]=\"showEditField\">\r\n                    <!-- </div> -->\r\n                    <!-- <ng-template #notShow>\r\n                        <input type=\"text\" formControlName=\"CompanyRegistrationNo\" class=\"form-control form-control-sm\"\r\n                            [readonly]=\"showEditField\">\r\n                    </ng-template> -->\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">เลขทะเบียนสรรพสามิต :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"ExciseRegNo\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ชื่อสถานที่ประกอบการ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"CompanyName\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</form>"

/***/ }),

/***/ "./src/app/pages/arrests/components/lawbreaker/lawbreaker.component.scss":
/***/ (function(module, exports) {

module.exports = ".viewOffense {\n  position: absolute;\n  right: 20px;\n  top: 2px; }\n\nlabel.find-img {\n  cursor: pointer; }\n\nlabel.find-img span {\n    position: absolute;\n    left: 65px;\n    bottom: 5px;\n    z-index: 2;\n    color: #fff; }\n\nlabel.find-img::after {\n  content: '';\n  position: absolute;\n  width: 180px;\n  height: 35px;\n  background-color: #0d5397;\n  left: 15px;\n  bottom: 0px; }\n"

/***/ }),

/***/ "./src/app/pages/arrests/components/lawbreaker/lawbreaker.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LawbreakerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models__ = __webpack_require__("./src/app/models/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_debounceTime__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/debounceTime.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/distinctUntilChanged.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_of__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_catch__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_do__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/do.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_switchMap__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_app_config_message__ = __webpack_require__("./src/app/config/message.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_app_shared_header_navigation_navigation_service__ = __webpack_require__("./src/app/shared/header-navigation/navigation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_app_config_dateFormat__ = __webpack_require__("./src/app/config/dateFormat.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_app_config_imageType__ = __webpack_require__("./src/app/config/imageType.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__models_arrest_lawbreaker__ = __webpack_require__("./src/app/pages/arrests/models/arrest-lawbreaker.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_app_services_main_master_service__ = __webpack_require__("./src/app/services/main-master.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_app_core_loader_loader_service__ = __webpack_require__("./src/app/core/loader/loader.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__services__ = __webpack_require__("./src/app/pages/arrests/services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_app_shared_sidebar_sidebar_component__ = __webpack_require__("./src/app/shared/sidebar/sidebar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_rxjs_add_operator_takeUntil__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/takeUntil.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_rxjs_observable_combineLatest__ = __webpack_require__("./node_modules/rxjs/_esm5/observable/combineLatest.js");
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
























var LawbreakerComponent = /** @class */ (function () {
    function LawbreakerComponent(ngModalService, router, s_mainMaster, s_lawbreaker, s_masLawbreaker, s_arrest, activatedRoute, navService, fb, sidebarService, loaderService) {
        var _this = this;
        this.ngModalService = ngModalService;
        this.router = router;
        this.s_mainMaster = s_mainMaster;
        this.s_lawbreaker = s_lawbreaker;
        this.s_masLawbreaker = s_masLawbreaker;
        this.s_arrest = s_arrest;
        this.activatedRoute = activatedRoute;
        this.navService = navService;
        this.fb = fb;
        this.sidebarService = sidebarService;
        this.loaderService = loaderService;
        this.card1 = true;
        this.card2 = true;
        this.card3 = false;
        this.card4 = false;
        this.requiredPassport = false;
        this.requiredCompanyRegister = false;
        this.destroy$ = new __WEBPACK_IMPORTED_MODULE_20_rxjs_Subject__["b" /* Subject */]();
        this.myDatePickerOptions = __WEBPACK_IMPORTED_MODULE_14_app_config_dateFormat__["a" /* MyDatePickerOptions */];
        this.isRequired = false;
        this.visaTypes = __WEBPACK_IMPORTED_MODULE_3__models__["j" /* VISATypes */];
        this.bloodTypes = __WEBPACK_IMPORTED_MODULE_3__models__["a" /* BloodTypes */];
        this.entityTypes = __WEBPACK_IMPORTED_MODULE_3__models__["e" /* EntityTypes */];
        this.genderTypes = __WEBPACK_IMPORTED_MODULE_3__models__["f" /* GenderTypes */];
        this.LawbreakerTypes = __WEBPACK_IMPORTED_MODULE_3__models__["g" /* LawbreakerTypes */];
        this.materialStatus = __WEBPACK_IMPORTED_MODULE_3__models__["h" /* MaritalStatuType */];
        this.typeheadTitleNames = new Array();
        this.typeheadRaces = new Array();
        this.typeheadReligions = new Array();
        this.typeheadRegion = new Array();
        this.typeheadCountry = new Array();
        this.typeheadNationality = new Array();
        this.searchRegion = function (text3$) {
            return text3$
                .debounceTime(300)
                .distinctUntilChanged()
                .map(function (term) { return term === '' ? []
                : _this.typeheadRegion
                    .filter(function (v) {
                    return (v.SubdistrictNameTH + " " + v.DistrictNameTH + " " + v.ProvinceNameTH)
                        .toLowerCase()
                        .indexOf(term.toLowerCase()) > -1;
                }).slice(0, 10); });
        };
        this.searchTitleName = function (text$) {
            return text$
                .debounceTime(300)
                .distinctUntilChanged()
                .map(function (term) { return term == '' ? []
                : _this.typeheadTitleNames
                    .filter(function (v) {
                    return v.TitleShortNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                        v.TitleNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1;
                }).slice(0, 10); });
        };
        this.searchNationality = function (text$) {
            return text$
                .debounceTime(300)
                .distinctUntilChanged()
                .map(function (term) { return term == '' ? []
                : _this.typeheadNationality.filter(function (v) { return v.NationalityNameTh.indexOf(term) > -1; }).slice(0, 10); });
        };
        this.searchRace = function (text$) {
            return text$
                .debounceTime(300)
                .distinctUntilChanged()
                .map(function (term) { return term == '' ? []
                : _this.typeheadRaces.filter(function (v) { return v.RaceNameTH.indexOf(term) > -1; }).slice(0, 10); });
        };
        this.searchReligion = function (text$) {
            return text$
                .debounceTime(300)
                .distinctUntilChanged()
                .map(function (term) { return term == '' ? []
                : _this.typeheadReligions.filter(function (v) { return v.ReligionNameTH.indexOf(term) > -1; }).slice(0, 10); });
        };
        this.searchCountry = function (text$) {
            return text$
                .debounceTime(300)
                .distinctUntilChanged()
                .map(function (term) { return term == '' ? []
                : _this.typeheadCountry.filter(function (v) { return v.CountryNameEN.toLowerCase().indexOf(term.toLowerCase()) > -1; }).slice(0, 10); });
        };
        this.formatterRegion = function (x) {
            return x.SubdistrictNameTH + " " + x.DistrictNameTH + " " + x.ProvinceNameTH;
        };
        this.formatterTitleName = function (x) { return x.TitleNameTH; };
        this.formatterNationality = function (x) { return x.NationalityNameTh; };
        this.formatterRace = function (x) { return x.RaceNameTH; };
        this.formatterReligion = function (x) { return x.ReligionNameTH; };
        this.formatterCountry = function (CountryNameTH) { return CountryNameTH; };
        this.selectItemTitleName = function (e) { return _this.LawbreakerFG.patchValue({
            LawbreakerTitleCode: e.item.TitleCode,
            LawbreakerTitleName: e.item.TitleNameTH
        }); };
        this.selectItemNationality = function (e) { return _this.LawbreakerFG.patchValue({
            NationalityCode: e.item.NationalityCode,
            NationalityNameTH: e.item.NationalityNameTh
        }); };
        this.selectItemRace = function (e) { return _this.LawbreakerFG.patchValue({
            RaceCode: e.item.RaceCode,
            RaceName: e.item.RaceNameTH
        }); };
        this.selectItemReligion = function (e) { return _this.LawbreakerFG.patchValue({
            ReligionCode: e.item.ReligionCode,
            ReligionName: e.item.ReligionNameTH
        }); };
        this.selectItemCountry = function (e) { return _this.LawbreakerFG.patchValue({
            PassportCountryCode: e.item.CountryCode,
            PassportCountryName: e.item.CountryNameEN
        }); };
        this.endLoader = function () { return _this.loaderService.hide(); };
        this.isObject = function (obj) { return obj === Object(obj); };
        this.navService.setPrintButton(false);
        this.navService.setDeleteButton(false);
        this.navService.setPrevPageButton(false);
        this.navService.setInnerTextNextPageButton('ข้อกล่าวหา');
    }
    LawbreakerComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.LawbreakerFG = this.createForm();
                        this.sidebarService.setVersion(this.s_arrest.version);
                        return [4 /*yield*/, this.active_route()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.navigate_service()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LawbreakerComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
        this.LawbreakerFG.reset();
    };
    LawbreakerComponent.prototype.createForm = function () {
        __WEBPACK_IMPORTED_MODULE_16__models_arrest_lawbreaker__["b" /* ArrestLawbreakerFormControl */].LinkPhoto = new __WEBPACK_IMPORTED_MODULE_11__angular_forms__["d" /* FormControl */]("C:\\Image");
        __WEBPACK_IMPORTED_MODULE_16__models_arrest_lawbreaker__["b" /* ArrestLawbreakerFormControl */].IsActive = new __WEBPACK_IMPORTED_MODULE_11__angular_forms__["d" /* FormControl */](1);
        return new __WEBPACK_IMPORTED_MODULE_11__angular_forms__["e" /* FormGroup */](__WEBPACK_IMPORTED_MODULE_16__models_arrest_lawbreaker__["b" /* ArrestLawbreakerFormControl */]);
    };
    LawbreakerComponent.prototype.active_route = function () {
        var _this = this;
        Object(__WEBPACK_IMPORTED_MODULE_23_rxjs_observable_combineLatest__["a" /* combineLatest */])(this.activatedRoute.params, this.activatedRoute.queryParams)
            .map(function (results) { return ({ params: results[0], queryParams: results[1] }); })
            .takeUntil(this.destroy$)
            .subscribe(function (results) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.mode = results.params.mode;
                this.lawbreakerId = results.params.code;
                this.arrestMode = results.queryParams.arrestMode;
                this.arrestCode = results.queryParams.arrestCode;
                this.indictmentId = results.queryParams.indictmentId;
                this.guiltbaseId = results.queryParams.guiltbaseId;
                this.allegationMode = results.queryParams.allegationMode;
                switch (this.mode) {
                    case 'C':
                        this.enableBtnModeC();
                        break;
                    case 'R':
                        this.enableBtnModeR();
                        break;
                }
                this.pageLoad();
                return [2 /*return*/];
            });
        }); });
    };
    LawbreakerComponent.prototype.enableBtnModeC = function () {
        // set false
        this.navService.setEditButton(false);
        this.navService.setEditField(false);
        this.navService.setNextPageButton(false);
        // set true
        this.navService.setSaveButton(true);
        this.navService.setCancelButton(true);
    };
    LawbreakerComponent.prototype.enableBtnModeR = function () {
        // set false
        this.navService.setSaveButton(false);
        this.navService.setCancelButton(false);
        this.navService.setNextPageButton(false);
        // set true
        this.navService.setEditButton(true);
        this.navService.setEditField(true);
    };
    LawbreakerComponent.prototype.pageLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promises, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.loaderService.show();
                        return [4 /*yield*/, this.s_mainMaster.MasTitleMaingetAll()];
                    case 1:
                        _a = [
                            _b.sent()
                        ];
                        return [4 /*yield*/, this.s_mainMaster.MasNationalityMaingetAll()];
                    case 2:
                        _a = _a.concat([
                            _b.sent()
                        ]);
                        return [4 /*yield*/, this.s_mainMaster.MasRaceMaingetAll()];
                    case 3:
                        _a = _a.concat([
                            _b.sent()
                        ]);
                        return [4 /*yield*/, this.s_mainMaster.MasReligionMaingetAll()];
                    case 4:
                        _a = _a.concat([
                            _b.sent()
                        ]);
                        return [4 /*yield*/, this.s_mainMaster.MasCountryMaingetAll()];
                    case 5:
                        _a = _a.concat([
                            _b.sent()
                        ]);
                        return [4 /*yield*/, this.s_mainMaster.MasDistrictMaingetAll()];
                    case 6:
                        promises = _a.concat([
                            _b.sent()
                        ]);
                        Promise.all(promises)
                            .then(function (x) {
                            _this.typeheadTitleNames = x[0];
                            _this.typeheadNationality = x[1];
                            _this.typeheadRaces = x[2];
                            _this.typeheadReligions = x[3];
                            _this.typeheadCountry = x[4];
                            x[5].map(function (prov) {
                                return prov.MasDistrict.map(function (dis) {
                                    return dis.MasSubDistrict.map(function (subdis) {
                                        _this.typeheadRegion.push({
                                            SubdistrictCode: subdis.SubdistrictCode,
                                            SubdistrictNameTH: subdis.SubdistrictNameTH,
                                            DistrictCode: dis.DistrictCode,
                                            DistrictNameTH: dis.DistrictNameTH,
                                            ProvinceCode: prov.ProvinceCode,
                                            ProvinceNameTH: prov.ProvinceNameTH,
                                            ZipCode: null
                                        });
                                    });
                                });
                            });
                        });
                        this.loaderService.hide();
                        switch (this.mode) {
                            case 'C':
                                break;
                            case 'R':
                                this.loaderService.show();
                                this.ArrestLawbreakerGetByCon(this.lawbreakerId);
                                this.loaderService.hide();
                                break;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LawbreakerComponent.prototype.navigate_service = function () {
        var _this = this;
        this.navService.showFieldEdit.takeUntil(this.destroy$).subscribe(function (p) {
            _this.showEditField = p.valueOf();
        });
        this.navService.onSave.takeUntil(this.destroy$).subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
            var _Lfg_1, birthDay, passportDateIn, passportDateOut;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!status) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.navService.setOnSave(false)];
                    case 1:
                        _a.sent();
                        if (this.LawbreakerFG.invalid) {
                            this.isRequired = true;
                            if (this.LawbreakerFG.controls.PassportNo.invalid) {
                                alert('กรุณาระบุ เลขหนังสือเดินทาง');
                            }
                            else if (this.LawbreakerFG.controls.CompanyRegistrationNo.invalid) {
                                alert('กรุณาระบุ เลขทะเบียนนิติบุคคล');
                            }
                            else {
                                alert(__WEBPACK_IMPORTED_MODULE_12_app_config_message__["a" /* Message */].checkData);
                            }
                            return [2 /*return*/];
                        }
                        _Lfg_1 = this.LawbreakerFG.value;
                        birthDay = this.isObject(_Lfg_1.BirthDate)
                            && Object(__WEBPACK_IMPORTED_MODULE_14_app_config_dateFormat__["d" /* getDateMyDatepicker */])(_Lfg_1.BirthDate);
                        passportDateIn = this.isObject(_Lfg_1.PassportDateIn)
                            && Object(__WEBPACK_IMPORTED_MODULE_14_app_config_dateFormat__["d" /* getDateMyDatepicker */])(_Lfg_1.PassportDateIn);
                        passportDateOut = this.isObject(_Lfg_1.PassportDateOut)
                            && Object(__WEBPACK_IMPORTED_MODULE_14_app_config_dateFormat__["d" /* getDateMyDatepicker */])(_Lfg_1.PassportDateOut);
                        _Lfg_1.BirthDate = Object(__WEBPACK_IMPORTED_MODULE_14_app_config_dateFormat__["c" /* convertDateForSave */])(birthDay) || '';
                        _Lfg_1.PassportDateIn = Object(__WEBPACK_IMPORTED_MODULE_14_app_config_dateFormat__["c" /* convertDateForSave */])(passportDateIn) || '';
                        _Lfg_1.PassportDateOut = Object(__WEBPACK_IMPORTED_MODULE_14_app_config_dateFormat__["c" /* convertDateForSave */])(passportDateOut) || '';
                        _Lfg_1.LawbreakerTitleName = _Lfg_1.LawbreakerTitleCode &&
                            this.typeheadTitleNames
                                .find(function (x) { return x.TitleCode == _Lfg_1.LawbreakerTitleCode; }).TitleShortNameTH;
                        _Lfg_1.NationalityNameTH = _Lfg_1.ReligionCode &&
                            this.typeheadNationality
                                .find(function (x) { return x.NationalityCode == _Lfg_1.NationalityCode; }).NationalityNameTh;
                        _Lfg_1.ReligionName = _Lfg_1.ReligionCode &&
                            this.typeheadReligions
                                .find(function (x) { return x.ReligionCode == _Lfg_1.ReligionCode; }).ReligionNameTH;
                        _Lfg_1.RaceName = _Lfg_1.RaceCode &&
                            this.typeheadRaces
                                .find(function (x) { return x.RaceCode == _Lfg_1.RaceCode; }).RaceNameTH;
                        console.log(JSON.stringify(_Lfg_1));
                        switch (this.mode) {
                            case 'C':
                                this.OnCreate(_Lfg_1);
                                break;
                            case 'R':
                                this.OnRevice(_Lfg_1);
                                break;
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
        this.navService.onCancel.takeUntil(this.destroy$).subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!status) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.navService.setOnCancel(false)];
                    case 1:
                        _a.sent();
                        this.onCancel();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
        this.navService.onNextPage.takeUntil(this.destroy$).subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!status) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.navService.setOnNextPage(false)];
                    case 1:
                        _a.sent();
                        this.router.navigate(["arrest/allegation", this.allegationMode], {
                            queryParams: {
                                arrestCode: this.arrestCode,
                                indictmentId: this.indictmentId,
                                guiltbaseId: this.guiltbaseId
                            }
                        });
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    };
    LawbreakerComponent.prototype.ArrestLawbreakerGetByCon = function (LawbreakerID) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.s_lawbreaker.ArrestMasLawbreakergetByCon(LawbreakerID)
                            .then(function (x) {
                            var law = x[0];
                            law.BirthDate = law.BirthDate && Object(__WEBPACK_IMPORTED_MODULE_14_app_config_dateFormat__["e" /* setDateMyDatepicker */])(law.BirthDate);
                            law.PassportDateIn = law.PassportDateIn && Object(__WEBPACK_IMPORTED_MODULE_14_app_config_dateFormat__["e" /* setDateMyDatepicker */])(law.PassportDateIn);
                            law.PassportDateOut = law.PassportDateOut && Object(__WEBPACK_IMPORTED_MODULE_14_app_config_dateFormat__["e" /* setDateMyDatepicker */])(law.PassportDateOut);
                            _this.latitude.nativeElement.value = law.GPS && law.GPS.split(',')[0];
                            _this.longitude.nativeElement.value = law.GPS && law.GPS.split(',')[1];
                            if (law.SubDistrictCode && law.DistrictCode && law.ProvinceCode) {
                                law.Region = law.SubDistrict + " " + law.District + " " + law.Province;
                            }
                            _this.LawbreakerFG.patchValue(law);
                            if (law.LinkPhoto) {
                                // this.imgNobody.nativeElement.src = law.LinkPhoto;
                            }
                            if (law.EntityType == 1 && law.LawbreakerType == 1) {
                                // บุคคลธรรมดา
                                _this.card3 = false;
                                _this.card4 = false;
                            }
                            else if (law.EntityType == 1 && law.LawbreakerType == 0) {
                                // ชาวต่างชาติ
                                _this.card3 = true;
                            }
                            else if (law.EntityType == 0) {
                                // นิติบุคคล
                                _this.card4 = true;
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LawbreakerComponent.prototype.onChangeGps = function () {
        var t = this.latitude.nativeElement.value;
        var g = this.longitude.nativeElement.value;
        this.LawbreakerFG.patchValue({
            GPS: t + "," + g
        });
    };
    LawbreakerComponent.prototype.toggleCard = function () {
        var e = this.LawbreakerFG.value.EntityType;
        var l = this.LawbreakerFG.value.LawbreakerType;
        this.requiredCompanyRegister = false;
        this.requiredPassport = false;
        if (e == '1' && l == '0') {
            this.requiredPassport = true;
            this.card3 = true;
        }
        else if (e == '2') {
            this.requiredCompanyRegister = true;
            this.card4 = true;
        }
    };
    LawbreakerComponent.prototype.openOffenseDetailModal = function (e) {
        this.modal = this.ngModalService.open(e, { size: 'lg', centered: true });
    };
    LawbreakerComponent.prototype.selectItemRegion = function (ele) {
        this.LawbreakerFG.patchValue({
            SubDistrictCode: ele.item.SubdistrictCode,
            SubDistrict: ele.item.SubdistrictNameTH,
            DistrictCode: ele.item.DistrictCode,
            District: ele.item.DistrictNameTH,
            ProvinceCode: ele.item.ProvinceCode,
            Province: ele.item.ProvinceNameTH
        });
    };
    LawbreakerComponent.prototype.changeImage = function (e, img) {
        var _this = this;
        var file = e.target.files[0];
        var isMatch;
        __WEBPACK_IMPORTED_MODULE_15_app_config_imageType__["a" /* ImageType */].filter(function (item) { return file.type == item.type; }).map(function () { return isMatch = true; });
        if (!isMatch) {
            alert(__WEBPACK_IMPORTED_MODULE_12_app_config_message__["a" /* Message */].checkImageType);
            return;
        }
        var reader = new FileReader();
        reader.onload = function () {
            img.src = reader.result;
            _this.LawbreakerFG.patchValue({
                LinkPhoto: reader.result,
                PhotoDesc: file.name
            });
        };
        reader.readAsDataURL(file);
    };
    LawbreakerComponent.prototype.catchError = function (error) {
        console.log(error);
        this.endLoader();
    };
    LawbreakerComponent.prototype.checkResponse = function (res) {
        switch (res.IsSuccess) {
            case 'False':
            case false:
                return false;
            default:
                return true;
        }
    };
    LawbreakerComponent.prototype.OnCreate = function (lawbreaker) {
        var _this = this;
        this.s_masLawbreaker.ArrestMasLawbreakerinsAll(lawbreaker)
            .takeUntil(this.destroy$)
            .subscribe(function (res) {
            if (!_this.checkResponse(res)) {
                alert(__WEBPACK_IMPORTED_MODULE_12_app_config_message__["a" /* Message */].saveFail);
                return;
            }
            alert(__WEBPACK_IMPORTED_MODULE_12_app_config_message__["a" /* Message */].saveComplete);
            _this.router.navigate(["/arrest/lawbreaker/R/" + res.LawbreakerID]);
        });
    };
    LawbreakerComponent.prototype.OnRevice = function (lawbreaker) {
        var _this = this;
        this.s_masLawbreaker.ArrestMasLawbreakerupdByCon(lawbreaker)
            .takeUntil(this.destroy$)
            .subscribe(function (res) {
            if (!_this.checkResponse(res)) {
                alert(__WEBPACK_IMPORTED_MODULE_12_app_config_message__["a" /* Message */].saveFail);
                return;
            }
            alert(__WEBPACK_IMPORTED_MODULE_12_app_config_message__["a" /* Message */].saveComplete);
            _this.enableBtnModeR();
        });
    };
    LawbreakerComponent.prototype.onCancel = function () {
        if (!confirm(__WEBPACK_IMPORTED_MODULE_12_app_config_message__["a" /* Message */].confirmAction))
            return;
        switch (this.mode) {
            case 'C':
                this.router.navigate(["arrest/allegation", 'C'], {
                    queryParams: {
                        arrestMode: this.arrestMode,
                        arrestCode: this.arrestCode,
                        indictmentId: this.indictmentId,
                        guiltbaseId: this.guiltbaseId
                    }
                });
                break;
            case 'R':
                this.enableBtnModeR();
                break;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('imgNobody'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], LawbreakerComponent.prototype, "imgNobody", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('latitude'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], LawbreakerComponent.prototype, "latitude", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('longitude'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], LawbreakerComponent.prototype, "longitude", void 0);
    LawbreakerComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-lawbreaker',
            template: __webpack_require__("./src/app/pages/arrests/components/lawbreaker/lawbreaker.component.html"),
            styles: [__webpack_require__("./src/app/pages/arrests/components/lawbreaker/lawbreaker.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["d" /* NgbModal */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */],
            __WEBPACK_IMPORTED_MODULE_17_app_services_main_master_service__["a" /* MainMasterService */], __WEBPACK_IMPORTED_MODULE_19__services__["e" /* ArrestLawbreakerService */], __WEBPACK_IMPORTED_MODULE_19__services__["f" /* ArrestMasLawbreakerService */], __WEBPACK_IMPORTED_MODULE_19__services__["j" /* ArrestService */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_13_app_shared_header_navigation_navigation_service__["a" /* NavigationService */],
            __WEBPACK_IMPORTED_MODULE_11__angular_forms__["c" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_21_app_shared_sidebar_sidebar_component__["b" /* SidebarService */],
            __WEBPACK_IMPORTED_MODULE_18_app_core_loader_loader_service__["a" /* LoaderService */]])
    ], LawbreakerComponent);
    return LawbreakerComponent;
}());



/***/ }),

/***/ "./src/app/pages/arrests/components/list/list.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <app-horizontal-timeline></app-horizontal-timeline> -->\r\n\r\n<div *ngIf=\"advSearch | async\" class=\"card card-outline-bluish unset-radius\">\r\n    <div class=\"card-header unset-radius\">\r\n        <app-card-actions-close></app-card-actions-close>\r\n        <h4 class=\"card-title m-b-0\">ค้นหาขั้นสูง</h4>\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <form class=\"form-horizontal\" autocomplete=\"off\" #advForm=\"ngForm\" (ngSubmit)=\"onAdvSearch(advForm.value)\">\r\n            <div>\r\n                <div class=\"row\">\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-3\">เลขที่ใบงาน :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-9\">\r\n                        <div class=\"form-group\">\r\n                            <input type=\"text\" name=\"ArrestCode\" ngModel class=\"form-control form-control-sm\" placeholder=\"\">\r\n                        </div>\r\n                    </div>\r\n\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-3\">วันที่รับแจ้งความ :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-9\">\r\n                        <div class=\"form-group input-group\">\r\n                            <my-date-picker-th class=\"form-control form-control-sm unset-form-control\" name=\"OccurrenceDateFrom\" \r\n                            [options]=\"myDatePickerOptions\" (dateChanged)=\"onSDateChange($event)\" ngModel></my-date-picker-th>\r\n\r\n                            <label for=\"OccurrenceDateTo\">&nbsp;ถึง&nbsp;</label>\r\n\r\n                            <my-date-picker-th class=\"form-control form-control-sm unset-form-control\" id=\"OccurrenceDateTo\" \r\n                            name=\"OccurrenceDateTo\" [options]=\"myDatePickerOptions\"\r\n                            (dateChanged)=\"onEDateChange($event)\" [(ngModel)]=\"OccurrenceDateTo\"></my-date-picker-th>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"row\">\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-3\">ชื่อผู้กล่าวหา :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-9\">\r\n                        <div class=\"form-group\">\r\n                            <input type=\"text\" name=\"StaffName\" ngModel class=\"form-control form-control-sm\" placeholder=\"\">\r\n                        </div>\r\n                    </div>\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-3\">หน่วยงาน :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-9\">\r\n                        <div class=\"form-group\">\r\n                            <input type=\"text\" name=\"OfficeName\" ngModel class=\"form-control form-control-sm\" placeholder=\"\">\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"row\">\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-3\">เขียนที่ :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-9\">\r\n                        <div class=\"form-group\">\r\n                            <input type=\"text\" name=\"ArrestStation\" ngModel class=\"form-control form-control-sm\" placeholder=\"\">\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"row form-group\">\r\n                    <div class=\"col-10\"></div>\r\n                    <div class=\"col-2\">\r\n                        <button type=\"submit\" class=\"btn btn-block btn-themecolor\">ค้นข้อมูล</button>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </form>\r\n    </div>\r\n\r\n</div>\r\n\r\n<div class=\"card unset-radius\">\r\n    <div class=\"card-body p-0\">\r\n\r\n        <div class=\"table-responsive\">\r\n            <table #arrestTable class=\"table table-sm table-striped\">\r\n                <thead>\r\n                    <tr>\r\n                        <th class=\"text-center\">ลำดับ</th>\r\n                        <th>เลขที่ใบงาน</th>\r\n                        <th>วันที่จับกุม</th>\r\n                        <th>ชื่อผู้กล่าวหา</th>\r\n                        <th>หน่วยงาน</th>\r\n                        <th>เขียนที่</th>\r\n                        <th></th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr *ngFor=\"let item of arrestList; let i=index\">\r\n                        <td class=\"text-center\">{{item.RowsId}}</td>\r\n                        <td>{{item.ArrestCode}}</td>\r\n                        <td class=\"text-center\">{{item.OccurrenceDate}}</td>\r\n                        <td>\r\n                            <div *ngFor=\"let staff of item.ArrestStaff;\">{{staff.FullName}}</div>\r\n                        </td>\r\n                        <td>\r\n                            <div *ngFor=\"let staff of item.ArrestStaff;\">{{staff.OfficeShortName}}</div>\r\n                        </td>\r\n                        <td>{{item.ArrestStation}}</td>\r\n                        <td class=\"text-center\">\r\n                            <a href=\"javaScript:void(0);\" class=\"text-secondary\" (click)=\"clickView(item.ArrestCode)\">\r\n                                <i class=\"fa fa-eye fa-lg\"></i>\r\n                            </a>\r\n                        </td>\r\n                    </tr>\r\n\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n    <div class=\"card-footer card-footer-unset\">\r\n        <app-pagination-table [TotalItems]=\"paginage.TotalItems\" [CurrentPage]=\"paginage.CurrentPage\" [PageSize]=\"paginage.PageSize\"\r\n            [RowsPerPageOptions]=\"paginage.RowsPerPageOptions\" (onPageChange)=\"pageChanges($event)\">\r\n        </app-pagination-table>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/pages/arrests/components/list/list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_config_pagination__ = __webpack_require__("./src/app/config/pagination.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_shared_header_navigation_navigation_service__ = __webpack_require__("./src/app/shared/header-navigation/navigation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_shared_sidebar_sidebar_component__ = __webpack_require__("./src/app/shared/sidebar/sidebar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_config_dateFormat__ = __webpack_require__("./src/app/config/dateFormat.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_config_message__ = __webpack_require__("./src/app/config/message.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services__ = __webpack_require__("./src/app/pages/arrests/services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs__ = __webpack_require__("./node_modules/rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_takeUntil__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/takeUntil.js");
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
    function ListComponent(navService, arrestService, router, sidebarService, chRef) {
        this.navService = navService;
        this.arrestService = arrestService;
        this.router = router;
        this.sidebarService = sidebarService;
        this.chRef = chRef;
        // private subOnSearch: Subscription;
        // private subSetNextPage: Subscription;
        this.destroy$ = new __WEBPACK_IMPORTED_MODULE_8_rxjs__["Subject"]();
        this.paginage = __WEBPACK_IMPORTED_MODULE_2_app_config_pagination__["a" /* pagination */];
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
        this.navService.setPrevPageButton(false);
        // set true
        this.navService.setSearchBar(true);
        this.navService.setNewButton(true);
        this.advSearch = this.navService.showAdvSearch;
    }
    ListComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.sidebarService.setVersion(this.arrestService.version);
                this.navService.searchByKeyword
                    .takeUntil(this.destroy$)
                    .subscribe(function (Textsearch) { return __awaiter(_this, void 0, void 0, function () {
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
                this.navService.onNextPage
                    .takeUntil(this.destroy$)
                    .subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
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
        var _this = this;
        this.arrestService
            .ArrestgetByKeyword(Textsearch)
            .takeUntil(this.destroy$)
            .subscribe(function (x) { return _this.onSearchComplete(x); });
    };
    ListComponent.prototype.onAdvSearch = function (form) {
        var _this = this;
        var sdate = Object(__WEBPACK_IMPORTED_MODULE_5_app_config_dateFormat__["d" /* getDateMyDatepicker */])(form.OccurrenceDateFrom);
        var edate = Object(__WEBPACK_IMPORTED_MODULE_5_app_config_dateFormat__["d" /* getDateMyDatepicker */])(form.OccurrenceDateTo);
        if (sdate && edate) {
            if (!Object(__WEBPACK_IMPORTED_MODULE_5_app_config_dateFormat__["b" /* compareDate */])(sdate, edate)) {
                alert(__WEBPACK_IMPORTED_MODULE_6_app_config_message__["a" /* Message */].checkDate);
                return;
            }
        }
        form.OccurrenceDateFrom = Object(__WEBPACK_IMPORTED_MODULE_5_app_config_dateFormat__["c" /* convertDateForSave */])(sdate) || '';
        form.OccurrenceDateTo = Object(__WEBPACK_IMPORTED_MODULE_5_app_config_dateFormat__["c" /* convertDateForSave */])(edate) || '';
        this.arrestService
            .ArrestgetByConAdv(form)
            .takeUntil(this.destroy$)
            .subscribe(function (x) { return _this.onSearchComplete(x); });
    };
    ListComponent.prototype.onSearchComplete = function (list) {
        if (!list.length) {
            alert(__WEBPACK_IMPORTED_MODULE_6_app_config_message__["a" /* Message */].noRecord);
            return false;
        }
        this.arrest = [];
        var rows = list.map(function (p, i) {
            p.RowsId = i + 1;
            p.OccurrenceDate = Object(__WEBPACK_IMPORTED_MODULE_5_app_config_dateFormat__["i" /* toLocalShort */])(p.OccurrenceDate);
            var staff = p.ArrestStaff
                .filter(function (staff) { return staff.ContributorID == '6' || staff.ContributorCode == '6'; })
                .map(function (staff) {
                staff.FullName = staff.TitleName + " " + staff.FirstName + " " + staff.LastName;
                return staff;
            });
            p.ArrestStaff = staff;
            return p;
        });
        this.arrest = rows;
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
            var sdate = Object(__WEBPACK_IMPORTED_MODULE_5_app_config_dateFormat__["d" /* getDateMyDatepicker */])(this.dateStartFrom);
            var edate = Object(__WEBPACK_IMPORTED_MODULE_5_app_config_dateFormat__["d" /* getDateMyDatepicker */])(this.dateStartTo);
            if (!Object(__WEBPACK_IMPORTED_MODULE_5_app_config_dateFormat__["b" /* compareDate */])(sdate, edate)) {
                alert(__WEBPACK_IMPORTED_MODULE_6_app_config_message__["a" /* Message */].checkDate);
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
        this.paginage.TotalItems = 0;
        // this.subOnSearch.unsubscribe();
        // this.subSetNextPage.unsubscribe();
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
        this.advSearch = false;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('arrestTable'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], ListComponent.prototype, "arrestTable", void 0);
    ListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-list',
            template: __webpack_require__("./src/app/pages/arrests/components/list/list.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_app_shared_header_navigation_navigation_service__["a" /* NavigationService */],
            __WEBPACK_IMPORTED_MODULE_7__services__["j" /* ArrestService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */],
            __WEBPACK_IMPORTED_MODULE_4_app_shared_sidebar_sidebar_component__["b" /* SidebarService */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */]])
    ], ListComponent);
    return ListComponent;
}());



/***/ }),

/***/ "./src/app/pages/arrests/components/manage/manage.component.html":
/***/ (function(module, exports) {

module.exports = "<app-step-wizard [sectionId]=\"2\"></app-step-wizard>\r\n\r\n<ng-template #printDocModal let-c=\"close\" let-d=\"dismiss\">\r\n    <app-print-doc-modal [ArrestCode]=\"arrestCode\" (c)=\"modal.close()\" (d)=\"modal.dismiss()\"></app-print-doc-modal>\r\n</ng-template>\r\n\r\n<form action=\"\" [formGroup]=\"arrestFG\">\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header unset-radius\">\r\n            <div class=\"card-actions\">\r\n                <a class=\"\" (click)=\"onCollapse(ILG60_03_02_00_00_E08)\">\r\n                    <i class=\"fa\" [ngClass]=\"{'fa-chevron-down': (ILG60_03_02_00_00_E08 | async), 'fa-chevron-up': !(ILG60_03_02_00_00_E08 | async)}\"></i>\r\n                </a>\r\n            </div>\r\n            <h4 class=\"card-title m-b-0\">ข้อมูลการจับกุม</h4>\r\n        </div>\r\n        <div *ngIf=\"ILG60_03_02_00_00_E08 | async\" class=\"card-body\">\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ส.ส.2/27 :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"InvestigationCode\" class=\"form-control form-control-sm\"\r\n                        readonly>\r\n                    <a href=\"javaScript:void(0);\" class=\"more text-secondary\">\r\n                        <i class=\"ti-more-alt\" aria-hidden=\"true\"></i>\r\n                    </a>\r\n                </div>\r\n\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">หมายค้น :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"InvestigationSurveyDocument\" class=\"form-control form-control-sm\"\r\n                        readonly>\r\n                    <a href=\"javaScript:void(0);\" class=\"more text-secondary\">\r\n                        <i class=\"ti-more-alt\" aria-hidden=\"true\"></i>\r\n                    </a>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">เลขที่ใบงาน :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"ArrestCode\" class=\"form-control form-control-sm\" readonly\r\n                        [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                </div>\r\n\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">เขียนที่ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <ng-template #rt let-r=\"result\" let-t=\"term\">\r\n                        {{ r.OfficeName }}\r\n                    </ng-template>\r\n\r\n                    <input type=\"text\" class=\"form-control form-control-sm \" [ngClass]=\"{'ng-touched':isRequired}\"\r\n                        required [ngbTypeahead]=\"serachOffice\" [resultTemplate]=\"rt\" [readOnly]=\"showEditField\"\r\n                        [inputFormatter]=\"formatterOffice\" (selectItem)=\"selectItemOffice($event)\" [value]=\"arrestFG.get('ArrestStation').value\"\r\n                        (change)=\"onChangeArrestStation($event)\" />\r\n\r\n                    <input type=\"text\" style=\"display: none;\" formControlName=\"ArrestStation\">\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">วันที่เขียน :</label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\r\n                    <div class=\"form-group input-group\">\r\n                        <my-date-picker-th class=\"form-control form-control-sm unset-form-control\" [options]=\"myDatePickerOptions\"\r\n                            [disabled]=\"showEditField\" [ngClass]=\"{'ng-touched':isRequired}\" required formControlName=\"ArrestDate\"\r\n                            (dateChanged)=\"onSDateChange($event)\"></my-date-picker-th>\r\n                        <label for=\"\">&nbsp;&nbsp;เวลา&nbsp;&nbsp;</label>\r\n                        <input type=\"text\" formControlName=\"ArrestTime\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\"\r\n                            [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                    </div>\r\n                </div>\r\n\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">วันที่จับกุม :</label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\r\n                    <div class=\"form-group input-group\" style=\"z-index: 1;\">\r\n                        <my-date-picker-th class=\"form-control form-control-sm unset-form-control\" [options]=\"myDatePickerOptions\"\r\n                            [disabled]=\"showEditField\" [ngClass]=\"{'ng-touched':isRequired}\" required formControlName=\"OccurrenceDate\"\r\n                            (dateChanged)=\"onEDateChange($event)\"></my-date-picker-th>\r\n                        <label for=\"\">&nbsp;&nbsp;เวลา&nbsp;&nbsp;</label>\r\n                        <input type=\"text\" formControlName=\"OccurrenceTime\" class=\"form-control form-control-sm\"\r\n                            [readonly]=\"showEditField\" [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header unset-radius\">\r\n            <div class=\"card-actions\">\r\n                <a class=\"\" (click)=\"onCollapse(ILG60_03_02_00_00_E10)\">\r\n                    <i class=\"fa\" [ngClass]=\"{'fa-chevron-down': (ILG60_03_02_00_00_E10 | async), 'fa-chevron-up': !(ILG60_03_02_00_00_E10 | async)}\"></i>\r\n                </a>\r\n            </div>\r\n            <h4 class=\"card-title m-b-0\">ใบแจ้งความนำจับ</h4>\r\n        </div>\r\n        <div *ngIf=\"ILG60_03_02_00_00_E10 | async\" class=\"card-body\">\r\n            <div class=\"row form-group\">\r\n                <div class=\"col-lg-10 col-md-9 col-sm-8\"></div>\r\n                <div class=\"col-lg-2 col-md-3 col-sm-4\">\r\n                    <button type=\"button\" class=\"btn btn-block btn-themecolor\" [disabled]=\"showEditField\" (click)=\"openModal(noticelist)\">เพิ่มใบแจ้งความ</button>\r\n                    <ng-template #noticelist let-c=\"close\" let-d=\"dismiss\">\r\n                        <app-modal-notice (c)=\"modal.close()\" (d)=\"modal.dismiss()\" (outputNotice)=\"setNoticeForm($event)\"></app-modal-notice>\r\n                    </ng-template>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"table-responsive\">\r\n                <table class=\"table table-sm table-striped table-set-border\">\r\n                    <thead>\r\n                        <tr>\r\n                            <th class=\"text-center\">ลำดับ</th>\r\n                            <th>เลขที่ใบแจ้งความนำจับ</th>\r\n                            <th>วันที่แจ้งความ</th>\r\n                            <th>ผู้รับแจ้งความ</th>\r\n                            <th>หน่วยงาน</th>\r\n                            <th>ผู้ต้องสงสัย</th>\r\n                            <th></th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody formArrayName=\"ArrestNotice\">\r\n                        <tr *ngFor=\"let item of ArrestNotice.controls; let i=index\" [formGroupName]=\"i\">\r\n                            <td *ngIf=\"item.get('IsModify').value != 'd'\" class=\"text-center\">{{item.get('RowId').value}}</td>\r\n                            <td *ngIf=\"item.get('IsModify').value != 'd'\">{{item.get('NoticeCode').value}}</td>\r\n                            <td *ngIf=\"item.get('IsModify').value != 'd'\">{{item.get('NoticeDateString').value}}</td>\r\n                            <td *ngIf=\"item.get('IsModify').value != 'd'\">\r\n                                <div *ngFor=\"let staff of item.value.ArrestNoticeStaff;\">{{staff.FullName}}</div>\r\n                            </td>\r\n                            <td *ngIf=\"item.get('IsModify').value != 'd'\">\r\n                                <div *ngFor=\"let staff of item.value.ArrestNoticeStaff;\">{{staff.OfficeName}}</div>\r\n                            </td>\r\n                            <td *ngIf=\"item.get('IsModify').value != 'd'\">\r\n                                <div *ngFor=\"let staff of item.value.ArrestNoticeSuspect;\">{{staff.FullName}}</div>\r\n                            </td>\r\n                            <td *ngIf=\"item.get('IsModify').value != 'd'\" class=\"text-center\">\r\n                                <a *ngIf=\"!showEditField\" href=\"javaScript:void(0);\" class=\"text-warning\" (click)=\"deleteNotice(i)\">\r\n                                    <i class=\"fa fa-trash-o fa-lg\"></i>\r\n                                </a>\r\n                            </td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n\r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header unset-radius\">\r\n            <div class=\"card-actions\">\r\n                <a class=\"\" (click)=\"onCollapse(ILG60_03_02_00_00_E13)\">\r\n                    <i class=\"fa\" [ngClass]=\"{'fa-chevron-down': (ILG60_03_02_00_00_E13 | async), 'fa-chevron-up': !(ILG60_03_02_00_00_E13 | async)}\"></i>\r\n                </a>\r\n            </div>\r\n            <h4 class=\"card-title m-b-0\">ผู้จับกุม</h4>\r\n        </div>\r\n        <div *ngIf=\"ILG60_03_02_00_00_E13 | async\" class=\"card-body\">\r\n            <div class=\"row form-group\">\r\n                <div class=\"col-lg-10 col-md-9 col-sm-8\"></div>\r\n                <div class=\"col-lg-2 col-md-3 col-sm-4\">\r\n                    <button type=\"button\" class=\"btn btn-block btn-themecolor\" [disabled]=\"showEditField\" (click)=\"addStaff()\">เพิ่มผู้ร่วมจับกุม</button>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"table-responsive\">\r\n                <table class=\"table table-sm table-striped table-set-border\">\r\n                    <thead>\r\n                        <tr>\r\n                            <th class=\"text-center\">ลำดับ</th>\r\n                            <th>ชื่อผู้จับกุม</th>\r\n                            <th>ตำแหน่ง</th>\r\n                            <th>หน่วยงาน</th>\r\n                            <th>ฐานะ</th>\r\n                            <th></th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody formArrayName=\"ArrestStaff\">\r\n                        <tr *ngFor=\"let item of ArrestStaff.controls; let i = index;\" [formGroupName]=\"i\">\r\n                            <td *ngIf=\"item.get('IsModify').value != 'd'\" class=\"text-center\">\r\n                                {{item.get('RowId').value}}\r\n                            </td>\r\n                            <td *ngIf=\"item.get('IsModify').value != 'd'\">\r\n                                <ng-template #rt let-r=\"result\" let-t=\"term\">\r\n                                    {{ r.TitleName == null ? '' : r.TitleName }}\r\n                                    {{r.FirstName == null ? '' : r.FirstName}}\r\n                                    {{r.LastName == null ? '' : r.LastName}}\r\n                                </ng-template>\r\n\r\n                                <input type=\"text\" class=\"form-control form-control-sm\" [ngbTypeahead]=\"searchStaff\"\r\n                                    [resultTemplate]=\"rt\" [readOnly]=\"showEditField\" [inputFormatter]=\"formatterStaff\"\r\n                                    (selectItem)=\"selectItemStaff($event, i)\" value=\"{{item.value.FullName}}\" />\r\n                            </td>\r\n                            <td *ngIf=\"item.get('IsModify').value != 'd'\">\r\n                                <input type=\"text\" formControlName=\"PositionName\" class=\"form-control form-control-sm\"\r\n                                    readonly>\r\n                            </td>\r\n                            <td *ngIf=\"item.get('IsModify').value != 'd'\">\r\n                                <input type=\"text\" formControlName=\"OfficeName\" class=\"form-control form-control-sm\"\r\n                                    readonly>\r\n                            </td>\r\n                            <td *ngIf=\"item.get('IsModify').value != 'd'\">\r\n                                <select (change)=\"onChangeContributer($event, i)\" formControlName=\"ContributorID\" class=\"form-control form-control-sm\"\r\n                                    [attr.disabled]=\"showEditField ? '' : null\">\r\n                                    <option value=\"\" disabled selected></option>\r\n                                    <option *ngFor=\"let c of contributerType;\" [value]=\"c.value\">{{c.text}}</option>\r\n                                </select>\r\n                            </td>\r\n                            <td *ngIf=\"item.get('IsModify').value != 'd'\">\r\n                                <a class=\"text-warning\" href=\"javaScript:void(0);\" *ngIf=\"!showEditField\" (click)=\"deleteStaff(i)\">\r\n                                    <i class=\"fa fa-trash-o fa-lg\"></i>\r\n                                </a>\r\n                            </td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header unset-radius\">\r\n            <div class=\"card-actions\">\r\n                <a class=\"\" (click)=\"onCollapse(ILG60_03_02_00_00_E18)\">\r\n                    <i class=\"fa\" [ngClass]=\"{'fa-chevron-down': (ILG60_03_02_00_00_E18 | async), 'fa-chevron-up': !(ILG60_03_02_00_00_E18 | async)}\"></i>\r\n                </a>\r\n            </div>\r\n            <h4 class=\"card-title m-b-0\">สถานที่เกิดเหตุ</h4>\r\n        </div>\r\n        <div *ngIf=\"ILG60_03_02_00_00_E18 | async\" class=\"card-body\" formArrayName=\"ArrestLocale\">\r\n            <div *ngFor=\"let item of ArrestLocale.controls; let i = index;\" [formGroupName]=\"i\">\r\n                <!-- <input type=\"text\" formControlName=\"LocaleID\" class=\"hidden\"> -->\r\n                <div class=\"row\">\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">บ้านเลขที่ :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-8 form-group\">\r\n                        <input type=\"text\" formControlName=\"Address\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                    </div>\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">หมู่ที่ :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-8 form-group\">\r\n                        <input type=\"text\" formControlName=\"Village\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                    </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">อาคาร/สถานที่ :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-8 form-group\">\r\n                        <input type=\"text\" formControlName=\"Building\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                    </div>\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ห้อง :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-8 form-group\">\r\n                        <input type=\"text\" formControlName=\"Room\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                    </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ชั้น :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-8 form-group\">\r\n                        <input type=\"text\" formControlName=\"Floor\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                    </div>\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ตรอก/ซอย :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-8 form-group\">\r\n                        <input type=\"text\" formControlName=\"Alley\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                    </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ถนน :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-8 form-group\">\r\n                        <input type=\"text\" formControlName=\"Road\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                    </div>\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ตำบล/อำเภอ/จังหวัด :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-8 form-group\">\r\n                        <ng-template #rt let-r=\"result\" let-t=\"term\">\r\n                            {{ r.SubdistrictNameTH }} {{r.DistrictNameTH}} {{r.ProvinceNameTH}}\r\n                        </ng-template>\r\n\r\n                        <input type=\"text\" class=\"form-control form-control-sm\" [ngbTypeahead]=\"searchRegion\"\r\n                            [resultTemplate]=\"rt\" [readOnly]=\"showEditField\" [inputFormatter]=\"formatterRegion\"\r\n                            (selectItem)=\"selectItemLocaleRegion($event)\" value=\"{{item.value.Region}}\" />\r\n                    </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">รหัสไปรษณีย์ :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-8 form-group\">\r\n                        <input type=\"text\" formControlName=\"ZipCode\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                    </div>\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">สน.ท้องที่เกิดเหตุ :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-8 form-group\">\r\n                        <input type=\"text\" formControlName=\"Policestation\" class=\"form-control form-control-sm\"\r\n                            [readonly]=\"showEditField\">\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header unset-radius\">\r\n            <div class=\"card-actions\">\r\n                <a class=\"\" (click)=\"onCollapse(ILG60_03_02_00_00_E20)\">\r\n                    <i class=\"fa\" [ngClass]=\"{'fa-chevron-down': (ILG60_03_02_00_00_E20 | async), 'fa-chevron-up': !(ILG60_03_02_00_00_E20 | async)}\"></i>\r\n                </a>\r\n            </div>\r\n            <h4 class=\"card-title m-b-0\">รายละเอียดการจับกุม</h4>\r\n        </div>\r\n        <div *ngIf=\"ILG60_03_02_00_00_E20 | async\" class=\"card-body\">\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">พฤติกรรมในการจับ :</label>\r\n                <div class=\"col-lg-10 col-sm-8 form-group \">\r\n                    <textarea formControlName=\"Behaviour\" cols=\"\" rows=\"3\" class=\"form-control form-control-sm\"\r\n                        [readonly]=\"showEditField\" [ngClass]=\"{'ng-touched':isRequired}\" required></textarea>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">คำให้การของผู้ต้องหา :</label>\r\n                <div class=\"col-lg-10 col-sm-8 form-group \">\r\n                    <textarea formControlName=\"Testimony\" cols=\"\" rows=\"3\" class=\"form-control form-control-sm\"\r\n                        [readonly]=\"showEditField\" [ngClass]=\"{'ng-touched':isRequired}\" required></textarea>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">การแจ้งสิทธิ :</label>\r\n                <div class=\"col-lg-10 col-sm-8 form-group \">\r\n                    <textarea formControlName=\"Prompt\" cols=\"\" rows=\"3\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\"\r\n                        [ngClass]=\"{'ng-touched':isRequired}\" required></textarea>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header unset-radius\">\r\n            <div class=\"card-actions\">\r\n                <a class=\"\" (click)=\"onCollapse(ILG60_03_02_00_00_E21)\">\r\n                    <i class=\"fa\" [ngClass]=\"{'fa-chevron-down': (ILG60_03_02_00_00_E21 | async), 'fa-chevron-up': !(ILG60_03_02_00_00_E21 | async)}\"></i>\r\n                </a>\r\n            </div>\r\n            <h4 class=\"card-title m-b-0\">ของกลาง</h4>\r\n        </div>\r\n        <div *ngIf=\"ILG60_03_02_00_00_E21 | async\" class=\"card-body\">\r\n            <div class=\"row form-group\">\r\n                <div class=\"col-lg-10 col-md-9 col-sm-8\"></div>\r\n                <div class=\"col-lg-2 col-md-3 col-sm-4\">\r\n                    <button type=\"button\" class=\"btn btn-block btn-themecolor\" [disabled]=\"showEditField\" (click)=\"addProduct()\">เพิ่มของกลาง</button>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"table-responsive\">\r\n                <table class=\"table table-sm table-striped table-set-border\">\r\n                    <thead>\r\n                        <tr>\r\n                            <th class=\"text-center\">ลำดับ</th>\r\n                            <th>ของกลาง</th>\r\n                            <th>จำนวน</th>\r\n                            <th>หน่วย</th>\r\n                            <th>ปริมาณสุทธิ</th>\r\n                            <th>หน่วย</th>\r\n                            <th></th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody formArrayName=\"ArrestProduct\">\r\n                        <tr *ngFor=\"let item of ArrestProduct.controls; let i=index;\" [formGroupName]=\"i\">\r\n                            <td *ngIf=\"item.get('IsModify').value != 'd'\" class=\"text-center\">{{item.get('RowId').value}}</td>\r\n                            <td *ngIf=\"item.get('IsModify').value != 'd'\" style=\"max-width: 200px;\">\r\n                                <ng-template #rt let-r=\"result\" let-t=\"term\">\r\n                                    {{ r.ProductDesc }}\r\n                                </ng-template>\r\n                                <input type=\"text\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\"\r\n                                    [ngbTypeahead]=\"searchProduct\" [resultTemplate]=\"rt\" [inputFormatter]=\"formatterProduct\"\r\n                                    (selectItem)=\"selectItemProductItem($event, i)\" [value]=\"item.value.ProductDesc\"\r\n                                    (change)=\"onChangeProductDesc($event, i)\" />\r\n                                <input style=\"display: none\" type=\"text\" formControlName=\"ProductDesc\">\r\n                            </td>\r\n                            <td *ngIf=\"item.get('IsModify').value != 'd'\" style=\"max-width: 30px;\">\r\n                                <input type=\"number\" min=\"0\" formControlName=\"Qty\" class=\"form-control form-control-sm\"\r\n                                    [readonly]=\"showEditField\">\r\n                            </td>\r\n                            <td *ngIf=\"item.get('IsModify').value != 'd'\" style=\"max-width: 60px;\">\r\n                                <ng-template #qtyUnit let-r=\"result\" let-t=\"term\">\r\n                                    {{ r.DutyCode }}\r\n                                </ng-template>\r\n                                <input type=\"text\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\"\r\n                                    [ngbTypeahead]=\"searchUnit\" [resultTemplate]=\"qtyUnit\" [inputFormatter]=\"formatterUnit\"\r\n                                    (selectItem)=\"selectItemQtyUnit($event, i)\" [value]=\"item.value.QtyUnit\" />\r\n                            </td>\r\n                            <td *ngIf=\"item.get('IsModify').value != 'd'\" style=\"max-width: 30px;\">\r\n                                <input type=\"number\" min=\"0\" formControlName=\"NetVolume\" class=\"form-control form-control-sm\"\r\n                                    [readonly]=\"showEditField\">\r\n                            </td>\r\n                            <td *ngIf=\"item.get('IsModify').value != 'd'\" style=\"max-width: 60px;\">\r\n                                <ng-template #netVolumeUnit let-r=\"result\" let-t=\"term\">\r\n                                    {{ r.DutyCode }}\r\n                                </ng-template>\r\n                                <input type=\"text\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\"\r\n                                    [ngbTypeahead]=\"searchUnit\" [resultTemplate]=\"netVolumeUnit\" [inputFormatter]=\"formatterUnit\"\r\n                                    (selectItem)=\"selectItemNetVolumeUnit($event, i)\" [value]=\"item.value.NetVolumeUnit\" />\r\n                            </td>\r\n                            <td *ngIf=\"item.get('IsModify').value != 'd'\">\r\n                                <a href=\"javaScript:void(0)\" class=\"text-warning\" *ngIf=\"!showEditField\" (click)=\"deleteProduct(i)\">\r\n                                    <i class=\"fa fa-trash-o fa-lg\"></i>\r\n                                </a>\r\n                            </td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header unset-radius\">\r\n            <div class=\"card-actions\">\r\n                <a class=\"\" (click)=\"onCollapse(ILG60_03_02_00_00_E25)\">\r\n                    <i class=\"fa\" [ngClass]=\"{'fa-chevron-down': (ILG60_03_02_00_00_E25 | async), 'fa-chevron-up': !(ILG60_03_02_00_00_E25 | async)}\"></i>\r\n                </a>\r\n            </div>\r\n            <h4 class=\"card-title m-b-0\">ข้อกล่าวหา</h4>\r\n        </div>\r\n        <div *ngIf=\"ILG60_03_02_00_00_E25 | async\" class=\"card-body\">\r\n            <div class=\"row form-group\">\r\n                <div class=\"col-lg-10 col-md-9 col-sm-8\"></div>\r\n                <div class=\"col-lg-2 col-md-3 col-sm-4\">\r\n                    <button type=\"button\" class=\"btn btn-block btn-themecolor\" [disabled]=\"showEditField\" (click)=\"addAllegation()\">เพิ่มข้อกล่าวหา</button>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"table-responsive\">\r\n                <table id=\"allegation\" class=\"table table-sm table-striped table-set-border\" formArrayName=\"ArrestIndictment\">\r\n                    <thead>\r\n                        <tr>\r\n                            <th class=\"text-center\">ลำดับ</th>\r\n                            <th class=\"text-center\">ฐานความผิดมาตรา</th>\r\n                            <th>ฐานความผิด</th>\r\n                            <th class=\"text-center\">บทกำหนดโทษ</th>\r\n                            <th>อัตราโทษ</th>\r\n                            <th></th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <tr *ngFor=\"let indict of ArrestIndictment.controls; let j=index;\" [formGroupName]=\"j\">\r\n                            <ng-template ngFor let-item [ngForOf]=\"getArrestLawGuitbase(indict)\" let-i=\"index\">\r\n                                <td class=\"text-center\">{{indict.get('RowId').value}}</td>\r\n                                <td class=\"text-center\">\r\n                                    <div *ngFor=\"let subSectionRule of getArrestLawSubSectionRule(item);\">\r\n                                        <span *ngFor=\"let subSection of getArrestLawSubSection(subSectionRule)\">\r\n                                            {{subSection.get('SubSectionType').value}}\r\n                                        </span>\r\n                                    </div>\r\n                                </td>\r\n                                <td style=\"max-width: 200px;\">{{item.get('GuiltBaseName').value}}</td>\r\n                                <td class=\"text-center\">\r\n                                    <div *ngFor=\"let subSectionRule of getArrestLawSubSectionRule(item);\">\r\n                                        {{subSectionRule.get('SectionNo').value}}\r\n                                    </div>\r\n                                </td>\r\n                                <td style=\"max-width: 200px;\">\r\n                                    <div *ngFor=\"let subSectionRule of getArrestLawSubSectionRule(item);\">\r\n                                        <span *ngFor=\"let section of getArrestLawSection(subSectionRule)\">\r\n                                            <span *ngFor=\"let penalty of getArrestLawPenalty(section)\">\r\n                                                {{penalty.get('PenaltyDesc').value}}\r\n                                            </span>\r\n                                        </span>\r\n                                    </div>\r\n                                </td>\r\n                                <td class=\"text-center\">\r\n                                    <a href=\"javaScript:void(0);\" class=\"text-secondary\" (click)=\"viewAllegation(indict.get('IndictmentID').value, item.get('GuiltBaseID').value)\">\r\n                                        <i class=\"fa fa-eye fa-lg\"></i>\r\n                                    </a>\r\n                                </td>\r\n                            </ng-template>\r\n                        </tr>\r\n\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header unset-radius\">\r\n            <div class=\"card-actions\">\r\n                <a class=\"\" (click)=\"onCollapse(ILG60_03_02_00_00_E28)\">\r\n                    <i class=\"fa\" [ngClass]=\"{'fa-chevron-down': (ILG60_03_02_00_00_E28 | async), 'fa-chevron-up': !(ILG60_03_02_00_00_E28 | async)}\"></i>\r\n                </a>\r\n            </div>\r\n            <h4 class=\"card-title m-b-0\">เอกสารแนบภายใน</h4>\r\n        </div>\r\n        <div *ngIf=\"ILG60_03_02_00_00_E28 | async\" class=\"card-body\">\r\n            <div class=\"row form-group\">\r\n                <div class=\"col-lg-10 col-md-9 col-sm-8\"></div>\r\n                <div class=\"col-lg-2 col-md-3 col-sm-4\">\r\n                    <button type=\"button\" class=\"btn btn-block btn-themecolor\" [disabled]=\"showEditField\" (click)=\"addDocument()\">เพิ่มเอกสารแนบ</button>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"table-responsive\">\r\n                <table class=\"table table-sm table-striped table-set-border\">\r\n                    <thead>\r\n                        <tr>\r\n                            <th class=\"text-center\">ลำดับ</th>\r\n                            <th>ชื่อเอกสารแนบ</th>\r\n                            <th>ที่อยู่เอกสารแนบ</th>\r\n                            <th></th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody formArrayName=\"ArrestDocument\">\r\n                        <tr *ngFor=\"let item of ArrestDocument.controls; let i=index;\" [formGroupName]=\"i\">\r\n                            <td *ngIf=\"item.get('IsModify').value != 'd'\" class=\"text-center\">{{item.get('RowId').value}}</td>\r\n                            <td *ngIf=\"item.get('IsModify').value != 'd'\">\r\n                                <input type=\"text\" formControlName=\"DataSource\" class=\"form-control form-control-sm\"\r\n                                    [readonly]=\"showEditField\">\r\n                            </td>\r\n                            <td *ngIf=\"item.get('IsModify').value != 'd'\">\r\n                                <div class=\"input-group\">\r\n                                    <input type=\"text\" class=\"form-control form-control-sm\" formControlName=\"FilePath\"\r\n                                        style=\"border-right: 0;\" [readonly]=\"showEditField\">\r\n                                    <div class=\"input-group-append\">\r\n                                        <input [id]=\"'arrestAttach'+i\" type=\"file\" (change)=\"changeArrestDoc($event, i)\"\r\n                                            hidden [attr.disabled]=\"showEditField ? '' : null\">\r\n                                        <label [for]=\"'arrestAttach'+i\" class=\"input-group-text custom-file-upload text-secondary\">\r\n                                            <i class=\"ti-more-alt\"></i>\r\n                                        </label>\r\n                                    </div>\r\n                                </div>\r\n                            </td>\r\n                            <td *ngIf=\"item.get('IsModify').value != 'd'\">\r\n                                <a href=\"javaScript:void(0)\" class=\"text-warning\" *ngIf=\"!showEditField\" (click)=\"deleteDocument(i)\">\r\n                                    <i class=\"fa fa-trash-o fa-lg\"></i>\r\n                                </a>\r\n                            </td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</form>"

/***/ }),

/***/ "./src/app/pages/arrests/components/manage/manage.component.scss":
/***/ (function(module, exports) {

module.exports = ".more {\n  position: absolute;\n  right: 20px;\n  bottom: -4px; }\n"

/***/ }),

/***/ "./src/app/pages/arrests/components/manage/manage.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs__ = __webpack_require__("./node_modules/rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_debounceTime__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/debounceTime.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/distinctUntilChanged.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_of__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_catch__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_do__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/do.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_switchMap__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_takeUntil__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/takeUntil.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_app_models__ = __webpack_require__("./src/app/models/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_app_config_dateFormat__ = __webpack_require__("./src/app/config/dateFormat.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__models_arrest_product__ = __webpack_require__("./src/app/pages/arrests/models/arrest-product.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_app_shared_header_navigation_navigation_service__ = __webpack_require__("./src/app/shared/header-navigation/navigation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_app_shared_sidebar_sidebar_component__ = __webpack_require__("./src/app/shared/sidebar/sidebar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_app_services_main_master_service__ = __webpack_require__("./src/app/services/main-master.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_app_config_message__ = __webpack_require__("./src/app/config/message.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__models_arrest_staff__ = __webpack_require__("./src/app/pages/arrests/models/arrest-staff.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__models_arrest_document__ = __webpack_require__("./src/app/pages/arrests/models/arrest-document.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_app_config_dataString__ = __webpack_require__("./src/app/config/dataString.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ngrx_store__ = __webpack_require__("./node_modules/@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__store__ = __webpack_require__("./src/app/pages/arrests/store/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__models__ = __webpack_require__("./src/app/pages/arrests/models/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__services__ = __webpack_require__("./src/app/pages/arrests/services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__arrests_service__ = __webpack_require__("./src/app/pages/arrests/arrests.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_app_core_loader_loader_service__ = __webpack_require__("./src/app/core/loader/loader.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29_app_services_mas_document_main_service__ = __webpack_require__("./src/app/services/mas-document-main.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__manage_config__ = __webpack_require__("./src/app/pages/arrests/components/manage/manage.config.ts");
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
    function ManageComponent(fb, activeRoute, modelService, navService, ngbModel, router, sidebarService, mainMasterService, s_document, store, arrestService, s_arrest, s_product, s_indictment, s_notice, s_staff, s_lawsuit, loaderService, manageConfig) {
        var _this = this;
        this.fb = fb;
        this.activeRoute = activeRoute;
        this.modelService = modelService;
        this.navService = navService;
        this.ngbModel = ngbModel;
        this.router = router;
        this.sidebarService = sidebarService;
        this.mainMasterService = mainMasterService;
        this.s_document = s_document;
        this.store = store;
        this.arrestService = arrestService;
        this.s_arrest = s_arrest;
        this.s_product = s_product;
        this.s_indictment = s_indictment;
        this.s_notice = s_notice;
        this.s_staff = s_staff;
        this.s_lawsuit = s_lawsuit;
        this.loaderService = loaderService;
        this.manageConfig = manageConfig;
        // FormGroup ตรวจสอบสถานะในการบันทึก TN905016100058
        // C: ข้อมูลใหม่
        // R: อัพเดทข้อมูล
        // FormArray ตรวจสอบสถานะด้วย
        // c: รายการใหม่
        // r: รายการแสดง
        // u: รายการอัพเดท
        // d: รายการที่ถูกลบ
        // card1: boolean = true;
        this.noticeCard = false;
        this.card2 = false;
        this.card3 = false;
        this.card4 = false;
        this.card5 = false;
        this.card6 = false;
        this.card7 = false;
        this.card8 = false;
        // ILG60_03_02_00_00_E08: any;
        // ILG60_03_02_00_00_E10: any;
        // ILG60_03_02_00_00_E13: any;
        // ILG60_03_02_00_00_E18: any;
        // ILG60_03_02_00_00_E20: any;
        // ILG60_03_02_00_00_E21: any;
        // ILG60_03_02_00_00_E25: any;
        // ILG60_03_02_00_00_E28: any;
        this.myDatePickerOptions = __WEBPACK_IMPORTED_MODULE_14_app_config_dateFormat__["a" /* MyDatePickerOptions */];
        this._isSuccess = false;
        this.typeheadOffice = new Array();
        this.typeheadStaff = new Array();
        this.typeheadRegion = new Array();
        this.typeheadProduct = new Array();
        this.typeheadQtyUnit = new Array();
        this.typeheadNetVolumeUnit = new Array();
        this.documentType = '3';
        this.lawbreakerType = __WEBPACK_IMPORTED_MODULE_13_app_models__["g" /* LawbreakerTypes */];
        this.entityType = __WEBPACK_IMPORTED_MODULE_13_app_models__["e" /* EntityTypes */];
        this.contributerType = __WEBPACK_IMPORTED_MODULE_13_app_models__["c" /* ContributorType */];
        this.destroy$ = new __WEBPACK_IMPORTED_MODULE_4_rxjs__["Subject"]();
        this.onCollapse = this.manageConfig.onCollapse;
        this.ILG60_03_02_00_00_E08 = this.manageConfig.ILG60_03_02_00_00_E08;
        this.ILG60_03_02_00_00_E10 = this.manageConfig.ILG60_03_02_00_00_E10;
        this.ILG60_03_02_00_00_E13 = this.manageConfig.ILG60_03_02_00_00_E13;
        this.ILG60_03_02_00_00_E18 = this.manageConfig.ILG60_03_02_00_00_E18;
        this.ILG60_03_02_00_00_E20 = this.manageConfig.ILG60_03_02_00_00_E20;
        this.ILG60_03_02_00_00_E21 = this.manageConfig.ILG60_03_02_00_00_E21;
        this.ILG60_03_02_00_00_E25 = this.manageConfig.ILG60_03_02_00_00_E25;
        this.ILG60_03_02_00_00_E28 = this.manageConfig.ILG60_03_02_00_00_E28;
        // --- 1
        this.setArrestLawGuitbase = function (o) {
            var arr = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormArray */]([]);
            o.map(function (x, index) {
                arr.push(_this.fb.group({
                    // RowId: index + 1,
                    IsChecked: false,
                    GuiltBaseID: x.GuiltBaseID,
                    GuiltBaseName: x.GuiltBaseName,
                    IsCompare: x.IsCompare,
                    IsActive: x.IsActive,
                    IsProve: x.IsProve,
                    SubSectionRuleID: x.SubSectionRuleID,
                    ArrestLawSubSectionRule: _this.setArrestLawSubSectionRule(x.ArrestLawSubSectionRule)
                }));
            });
            return arr;
        };
        // --- --- 1.1
        this.setArrestLawSubSectionRule = function (o) {
            var arr = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormArray */]([]);
            o.map(function (x) {
                arr.push(_this.fb.group({
                    SubSectionRuleID: x.SubSectionRuleID,
                    SubSectionID: x.SubSectionID,
                    SectionNo: x.SectionNo,
                    IsActive: x.IsActive,
                    ArrestLawSubSection: _this.setArrestLawSubSection(x.ArrestLawSubSection),
                    ArrestLawSection: _this.setArrestLawSection(x.ArrestLawSection)
                }));
            });
            return arr;
        };
        // --- --- --- 1.1.1
        this.setArrestLawSubSection = function (o) {
            var arr = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormArray */]([]);
            o.map(function (x) {
                arr.push(_this.fb.group({
                    SubSectionID: x.SubSectionID,
                    SubSectionNo: x.SubSectionNo,
                    SubSectionType: x.SubSectionType,
                    SubSectionDesc: x.SubSectionDesc,
                    SectionNo: x.SectionNo
                }));
            });
            return arr;
        };
        // --- --- --- 1.1.2
        this.setArrestLawSection = function (o) {
            var arr = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormArray */]([]);
            o.map(function (x) {
                arr.push(_this.fb.group({
                    SectionNo: x.SectionNo,
                    SectionName: x.SectionName,
                    SectionDesc1: x.SectionDesc1,
                    SectionDesc2: x.SectionDesc2,
                    SectionDesc3: x.SectionDesc3,
                    LawGroupID: x.LawGroupID,
                    ArrestLawPenalty: _this.setArrestLawPenalty(x.ArrestLawPenalty)
                }));
            });
            return arr;
        };
        // --- --- --- --- 1.1.2.1
        this.setArrestLawPenalty = function (o) {
            var arr = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormArray */]([]);
            o.map(function (x) {
                arr.push(_this.fb.group({
                    PenaltyID: x.PenaltyID,
                    SectionNo: x.SectionNo,
                    PenaltyDesc: x.PenaltyDesc,
                    FineMin: x.FineMin,
                    FineMax: x.FineMax,
                    IsFinePrison: x.IsFinePrison,
                    IsTaxPaid: x.IsTaxPaid
                }));
            });
            return arr;
        };
        this.searchProduct = function (text$) {
            return text$.debounceTime(200).distinctUntilChanged()
                .map(function (term) { return term === '' ? []
                : _this.typeheadProduct
                    .filter(function (v) {
                    return (v.SubBrandNameTH + " " + v.BrandNameTH + " " + v.ModelName)
                        .toLowerCase()
                        .indexOf(term.toLowerCase()) > -1;
                }).slice(0, 10); });
        };
        this.searchRegion = function (text3$) {
            return text3$.debounceTime(200).distinctUntilChanged()
                .map(function (term) { return term === '' ? []
                : _this.typeheadRegion
                    .filter(function (v) {
                    return (v.SubdistrictNameTH + " " + v.DistrictNameTH + " " + v.ProvinceNameTH)
                        .toLowerCase()
                        .indexOf(term.toLowerCase()) > -1;
                }).slice(0, 10); });
        };
        this.searchStaff = function (text3$) {
            return text3$.debounceTime(200).distinctUntilChanged()
                .map(function (term) { return term === '' ? []
                : _this.typeheadStaff
                    .filter(function (v) {
                    return (v.TitleName + " " + v.FirstName + " " + v.LastName)
                        .toLowerCase()
                        .indexOf(term.toLowerCase()) > -1;
                }).slice(0, 10); });
        };
        this.serachOffice = function (text3$) {
            return text3$.debounceTime(200).distinctUntilChanged()
                .map(function (term) { return term === '' ? []
                : _this.typeheadOffice
                    .filter(function (v) { return (v.OfficeName && v.OfficeName.toLowerCase().indexOf(term.toLowerCase()) > -1); })
                    .slice(0, 10); });
        };
        this.searchUnit = function (text$) {
            return text$.debounceTime(200).distinctUntilChanged()
                .map(function (term) { return term == '' ? []
                : _this.typeheadQtyUnit
                    .filter(function (v) { return v.DutyCode.toLowerCase().indexOf(term.toLowerCase()) > -1; })
                    .slice(0, 10); });
        };
        this.formatterRegion = function (x) {
            return (x.SubdistrictNameTH || '') + " " + (x.DistrictNameTH || '') + " " + (x.ProvinceNameTH || '');
        };
        this.formatterProduct = function (x) { return x.ProductDesc; };
        this.formatterStaff = function (x) {
            return (x.TitleName || '') + " " + (x.FirstName || '') + " " + (x.LastName || '');
        };
        this.formatterOffice = function (x) { return x.OfficeName; };
        this.formatterUnit = function (DutyCode) { return DutyCode; };
        this.endLoader = function () { return _this.loaderService.hide(); };
        this.isObject = function (obj) { return obj === Object(obj); };
        // set false
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
        this.navService.setPrevPageButton(false);
        this.navService.setNextPageButton(false);
        this.obArrest = store.select(function (s) { return s.arrest; });
        this.obArrest
            .takeUntil(this.destroy$)
            .subscribe(function (x) { return _this.stateArrest = x; });
    }
    Object.defineProperty(ManageComponent.prototype, "ArrestNotice", {
        // --- ArresNotice --- //
        get: function () {
            return this.arrestFG.get('ArrestNotice');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManageComponent.prototype, "ArrestStaff", {
        // --- ArrestStaff --- //
        get: function () {
            return this.arrestFG.get('ArrestStaff');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManageComponent.prototype, "ArrestLocale", {
        get: function () {
            return this.arrestFG.get('ArrestLocale');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManageComponent.prototype, "ArrestLawbreaker", {
        get: function () {
            return this.arrestFG.get('ArrestLawbreaker');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManageComponent.prototype, "ArrestProduct", {
        get: function () {
            return this.arrestFG.get('ArrestProduct');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManageComponent.prototype, "ArrestIndictment", {
        get: function () {
            return this.arrestFG.get('ArrestIndictment');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManageComponent.prototype, "ArrestDocument", {
        get: function () {
            return this.arrestFG.get('ArrestDocument');
        },
        enumerable: true,
        configurable: true
    });
    ManageComponent.prototype.getArrestLawGuitbase = function (form) {
        return form.controls.ArrestLawGuitbase.controls;
    };
    // --- 1
    ManageComponent.prototype.getArrestLawSubSectionRule = function (form) {
        return form.controls.ArrestLawSubSectionRule.controls;
    };
    // --- --- 1.1
    ManageComponent.prototype.getArrestLawSubSection = function (form) {
        return form.controls.ArrestLawSubSection.controls;
    };
    // --- --- 1.2
    ManageComponent.prototype.getArrestLawSection = function (form) {
        return form.controls.ArrestLawSection.controls;
    };
    // --- --- --- 1.2.1
    ManageComponent.prototype.getArrestLawPenalty = function (form) {
        return form.controls.ArrestLawPenalty.controls;
    };
    ManageComponent.prototype.getArrestNoticeSuspect = function (form) {
        return form.controls.ArrestNoticeSuspect.controls;
    };
    ManageComponent.prototype.getArrestNoticeStaff = function (form) {
        return form.controls.ArrestNoticeStaff.controls;
    };
    ManageComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.sidebarService.setVersion(this.s_arrest.version);
                this.active_route();
                if (this.arrestFG) {
                    setTimeout(function () {
                        _this.arrestFG.reset();
                    }, 300);
                }
                this.arrestFG = this.createForm();
                this.navigate_Service();
                return [2 /*return*/];
            });
        });
    };
    ManageComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
        this.arrestFG.reset();
    };
    ManageComponent.prototype.createForm = function () {
        var ArrestDate = Object(__WEBPACK_IMPORTED_MODULE_14_app_config_dateFormat__["e" /* setDateMyDatepicker */])(new Date());
        var ArrestTime = Object(__WEBPACK_IMPORTED_MODULE_14_app_config_dateFormat__["f" /* setZero */])((new Date).getHours()) + "." + Object(__WEBPACK_IMPORTED_MODULE_14_app_config_dateFormat__["f" /* setZero */])((new Date).getMinutes()) + " \u0E19.";
        return new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* FormGroup */]({
            ArrestCode: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormControl */](this.arrestCode, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["m" /* Validators */].required),
            ArrestDate: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormControl */](ArrestDate, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["m" /* Validators */].required),
            ArrestTime: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormControl */](ArrestTime, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["m" /* Validators */].required),
            OccurrenceDate: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormControl */](ArrestDate, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["m" /* Validators */].required),
            OccurrenceTime: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormControl */](ArrestTime, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["m" /* Validators */].required),
            ArrestStationCode: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormControl */](null),
            ArrestStation: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["m" /* Validators */].required),
            HaveCulprit: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormControl */](0),
            Behaviour: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormControl */]('รับสารภาพตลอดข้อกล่าวหา'),
            Testimony: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormControl */]('รับสารภาพตลอดข้อกล่าวหา'),
            Prompt: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormControl */]('แจ้งให้ญาติทราบ'),
            IsMatchNotice: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormControl */](null),
            ArrestDesc: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormControl */]('N/A'),
            NoticeCode: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormControl */](null),
            InvestigationSurveyDocument: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormControl */](null),
            InvestigationCode: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormControl */](null),
            IsActive: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormControl */](1),
            ArrestNotice: this.fb.array([]),
            ArrestStaff: this.fb.array([]),
            ArrestLocale: this.fb.array([this.createLocalForm()]),
            ArrestLawbreaker: this.fb.array([]),
            ArrestProduct: this.fb.array([]),
            ArrestIndictment: this.fb.array([]),
            ArrestDocument: this.fb.array([])
        });
    };
    ManageComponent.prototype.createLocalForm = function () {
        __WEBPACK_IMPORTED_MODULE_25__models__["e" /* ArrestLocaleFormControl */].ArrestCode = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormControl */](this.arrestCode);
        return this.fb.group(__WEBPACK_IMPORTED_MODULE_25__models__["e" /* ArrestLocaleFormControl */]);
    };
    ManageComponent.prototype.setItemFormArray = function (array, formControl) {
        var _this = this;
        if (array !== undefined && array.length) {
            var itemFGs = array.map(function (item) { return _this.fb.group(item); });
            var itemFormArray = this.fb.array(itemFGs);
            this.arrestFG.setControl(formControl, itemFormArray);
        }
    };
    ManageComponent.prototype.active_route = function () {
        var _this = this;
        this.activeRoute.params.takeUntil(this.destroy$).subscribe(function (p) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.mode = p['mode'];
                this.arrestCode = p['code'];
                this.pageLoad(this.arrestCode);
                return [2 /*return*/];
            });
        }); });
    };
    ManageComponent.prototype.navigate_Service = function () {
        var _this = this;
        this.navService.showFieldEdit.subscribe(function (p) {
            _this.showEditField = p.valueOf();
        });
        this.navService.onSave.takeUntil(this.destroy$).subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
            var sDateCompare, eDateCompare, staff;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!status) return [3 /*break*/, 2];
                        // set action save = false
                        return [4 /*yield*/, this.navService.setOnSave(false)];
                    case 1:
                        // set action save = false
                        _a.sent();
                        if (!this.arrestFG.valid) {
                            this.isRequired = true;
                            alert(__WEBPACK_IMPORTED_MODULE_19_app_config_message__["a" /* Message */].checkData);
                            return [2 /*return*/, false];
                        }
                        sDateCompare = Object(__WEBPACK_IMPORTED_MODULE_14_app_config_dateFormat__["d" /* getDateMyDatepicker */])(this.arrestFG.value.ArrestDate);
                        eDateCompare = Object(__WEBPACK_IMPORTED_MODULE_14_app_config_dateFormat__["d" /* getDateMyDatepicker */])(this.arrestFG.value.OccurrenceDate);
                        this.arrestFG.value.ArrestDate = Object(__WEBPACK_IMPORTED_MODULE_14_app_config_dateFormat__["c" /* convertDateForSave */])(sDateCompare);
                        this.arrestFG.value.OccurrenceDate = Object(__WEBPACK_IMPORTED_MODULE_14_app_config_dateFormat__["c" /* convertDateForSave */])(eDateCompare);
                        if (this.arrestFG.invalid)
                            return [2 /*return*/];
                        staff = this.ArrestStaff.value.filter(function (x) { return x.IsModify != 'd'; });
                        if (staff.length <= 0) {
                            alert('ต้องมีรายการผู้ร่วมจับกุมอย่างน้อย 1 รายการ');
                            return [2 /*return*/];
                        }
                        if (staff.filter(function (x) { return x.ContributorID == ''; }).length > 0) {
                            alert('กรุณาเลือกฐานะของผู้จับกุม');
                            return [2 /*return*/];
                        }
                        if (staff.filter(function (x) { return x.ContributorID == '6'; }).length <= 0) {
                            alert('ต้องมีผู้จับกุมที่มีฐานะเป็น “ผู้กล่าวหา” อย่างน้อย 1 รายการ');
                            return [2 /*return*/];
                        }
                        if (!this.ArrestIndictment.value.length) {
                            alert('“ฐานความผิดมาตรา” ในส่วนข้อกล่าวหาต้องมีอย่างน้อย 1 รายการ');
                            return [2 /*return*/];
                        }
                        this.onSave();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
        this.navService.onEdit.takeUntil(this.destroy$).subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!status) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.navService.setOnEdit(false)];
                    case 1:
                        _a.sent();
                        this.onEdit();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
        this.navService.onDelete.takeUntil(this.destroy$).subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!status) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.navService.setOnDelete(false)];
                    case 1:
                        _a.sent();
                        this.onDelete();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
        this.navService.onCancel.takeUntil(this.destroy$).subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!status) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.navService.setOnCancel(false)];
                    case 1:
                        _a.sent();
                        if (confirm(__WEBPACK_IMPORTED_MODULE_19_app_config_message__["a" /* Message */].confirmAction)) {
                            this.onCancel();
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
        this.navService.onPrint.takeUntil(this.destroy$).subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!status) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.navService.setOnPrint(false)];
                    case 1:
                        _a.sent();
                        this.modal = this.ngbModel.open(this.printDocModel, { size: 'lg', centered: true });
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
        this.navService.onNextPage.takeUntil(this.destroy$).subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!status) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.navService.setOnNextPage(false)];
                    case 1:
                        _a.sent();
                        this.router.navigate(['/lawsuit/manage', 'C']);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    };
    ManageComponent.prototype.pageLoad = function (arrestCode) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.mode;
                        switch (_a) {
                            case 'C': return [3 /*break*/, 1];
                            case 'R': return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 5];
                    case 1:
                        this.enableBtnModeC();
                        return [4 /*yield*/, this.loadMasterData()];
                    case 2:
                        _b.sent();
                        this.showEditField = false;
                        if (this.stateArrest) {
                            if (this.arrestCode != this.stateArrest.ArrestCode)
                                this.stateArrest = null;
                        }
                        return [4 /*yield*/, this.pageRefresh(this.arrestCode)];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        this.enableBthModeR();
                        this.pageRefresh(arrestCode);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.enableBtnModeC = function () {
        // set false
        this.navService.setPrintButton(false);
        this.navService.setEditButton(false);
        this.navService.setDeleteButton(false);
        this.navService.setEditField(false);
        // set true 
        this.navService.setSaveButton(true);
        this.navService.setCancelButton(true);
    };
    ManageComponent.prototype.enableBthModeR = function () {
        // set false
        this.navService.setSaveButton(false);
        this.navService.setCancelButton(false);
        // set true
        this.navService.setPrintButton(true);
        this.navService.setEditButton(true);
        this.navService.setDeleteButton(true);
        this.navService.setEditField(true);
    };
    ManageComponent.prototype.pageRefresh = function (arrestCode) {
        return __awaiter(this, void 0, void 0, function () {
            var arr, _arr;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loaderService.show();
                        arr = new Array();
                        if (!(arrestCode != 'NEW')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.s_arrest.ArrestgetByCon(arrestCode)
                                .then(function (a) {
                                if (_this.checkResponse(a))
                                    arr = a;
                            }).catch(function (error) { return _this.catchError(error); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        arr = this.stateArrest ? [this.stateArrest] : [];
                        _a.label = 3;
                    case 3:
                        if (!arr.length) return [3 /*break*/, 7];
                        _arr = arr[0];
                        this.pageRefreshArrest(_arr);
                        return [4 /*yield*/, this.pageRefreshProduct(_arr.ArrestProduct, arrestCode)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.pageRefreshIndictment(_arr.ArrestIndictment, arrestCode)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.pageRefreshDocument(_arr.ArrestDocument, arrestCode)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        ;
                        this.loaderService.hide();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.pageRefreshArrest = function (_arr) {
        var arrestForm = this.arrestFG;
        _arr.ArrestDate = this.isObject(_arr.ArrestDate)
            ? _arr.ArrestDate
            : Object(__WEBPACK_IMPORTED_MODULE_14_app_config_dateFormat__["e" /* setDateMyDatepicker */])(_arr.ArrestDate);
        _arr.OccurrenceDate = this.isObject(_arr.OccurrenceDate)
            ? _arr.OccurrenceDate
            : Object(__WEBPACK_IMPORTED_MODULE_14_app_config_dateFormat__["e" /* setDateMyDatepicker */])(_arr.OccurrenceDate);
        _arr.ArrestNotice.map(function (x, index) {
            x.RowId = index + 1;
            x.IsModify = x.IsModify || 'r';
            x.NoticeDateString = Object(__WEBPACK_IMPORTED_MODULE_14_app_config_dateFormat__["i" /* toLocalShort */])(x.NoticeDate);
            x.ArrestNoticeStaff.map(function (s) { return s.FullName = s.TitleName + " " + s.FirstName + " " + s.LastName; });
            x.ArrestNoticeSuspect.map(function (s) { return s.FullName = s.SuspectTitleName + " " + s.SuspectFirstName + " " + s.SuspectLastName; });
        });
        this.setNoticeForm(_arr.ArrestNotice);
        _arr.ArrestStaff.map(function (x, index) {
            x.RowId = index + 1;
            x.IsModify = x.IsModify || 'r';
            x.ContributorID = x.ContributorID || x.ContributorCode;
            x.FullName = x.TitleName + " " + x.FirstName + " " + x.LastName;
        });
        this.setItemFormArray(_arr.ArrestStaff, 'ArrestStaff');
        _arr.ArrestLocale.map(function (x) {
            if (x.SubDistrictCode && x.DistrictCode && x.ProvinceCode) {
                x.Region = x.SubDistrict + " " + x.District + " " + x.Province;
            }
        });
        arrestForm.patchValue(_arr);
    };
    ManageComponent.prototype.pageRefreshProduct = function (_arrProd, arrestCode) {
        return __awaiter(this, void 0, void 0, function () {
            var _prod;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _prod = new Array();
                        if (!(arrestCode != 'NEW')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.s_product.ArrestProductgetByArrestCode(arrestCode)
                                .then(function (pro) {
                                if (_this.checkResponse(pro)) {
                                    _prod = pro.map(function (x) {
                                        x.IsModify = 'r';
                                        return x;
                                    });
                                }
                                ;
                            }).catch(function (error) { return _this.catchError(error); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _prod = _arrProd;
                        _a.label = 3;
                    case 3:
                        if (!_prod.length)
                            return [2 /*return*/];
                        _prod.map(function (x, index) { return x.RowId = index + 1; });
                        this.setItemFormArray(_prod, 'ArrestProduct');
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.pageRefreshIndictment = function (_arrIndict, arrestCode) {
        return __awaiter(this, void 0, void 0, function () {
            var _indict;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _indict = new Array();
                        if (!(arrestCode != 'NEW')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.s_indictment.ArrestIndictmentgetByArrestCode(arrestCode)
                                .then(function (ind) {
                                if (_this.checkResponse(ind))
                                    _indict = ind;
                            }).catch(function (error) { return _this.catchError(error); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _indict = _arrIndict;
                        _a.label = 3;
                    case 3:
                        if (!_indict.length)
                            return [2 /*return*/];
                        this.setArrestIndictment(_indict);
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.pageRefreshDocument = function (_arrDoc, arrestCode) {
        return __awaiter(this, void 0, void 0, function () {
            var _doc;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _doc = new Array();
                        if (!(arrestCode != 'NEW')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.s_document.MasDocumentMaingetAll(this.documentType, arrestCode)
                                .then(function (x) {
                                if (_this.checkResponse(x)) {
                                    _doc = x.map(function (y) {
                                        y.IsModify = 'r';
                                        return y;
                                    });
                                }
                                ;
                            }).catch(function (error) { return _this.catchError(error); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _doc = _arrDoc;
                        _a.label = 3;
                    case 3:
                        if (!_doc.length)
                            return [2 /*return*/];
                        _doc.map(function (y, index) { return y.RowId = index + 1; });
                        this.setItemFormArray(_doc, 'ArrestDocument');
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.loadMasterData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promises, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.loaderService.show();
                        return [4 /*yield*/, this.mainMasterService.MasStaffMaingetAll()];
                    case 1:
                        _a = [
                            _b.sent()
                        ];
                        return [4 /*yield*/, this.mainMasterService.MasOfficeMaingetAll()];
                    case 2:
                        _a = _a.concat([
                            _b.sent()
                        ]);
                        return [4 /*yield*/, this.mainMasterService.MasProductMaingetAll()];
                    case 3:
                        _a = _a.concat([
                            _b.sent()
                        ]);
                        return [4 /*yield*/, this.mainMasterService.MasDutyUnitMaingetAll()];
                    case 4:
                        _a = _a.concat([
                            _b.sent()
                        ]);
                        return [4 /*yield*/, this.mainMasterService.MasDistrictMaingetAll()];
                    case 5:
                        promises = _a.concat([
                            _b.sent()
                        ]);
                        Promise.all(promises)
                            .then(function (x) {
                            _this.typeheadStaff = x[0];
                            _this.typeheadOffice = x[1];
                            _this.typeheadProduct = x[2];
                            _this.typeheadQtyUnit = x[3];
                            _this.typeheadNetVolumeUnit = x[3];
                            x[4].map(function (prov) {
                                return prov.MasDistrict.map(function (dis) {
                                    return dis.MasSubDistrict.map(function (subdis) {
                                        _this.typeheadRegion.push({
                                            SubdistrictCode: subdis.SubdistrictCode,
                                            SubdistrictNameTH: subdis.SubdistrictNameTH,
                                            DistrictCode: dis.DistrictCode,
                                            DistrictNameTH: dis.DistrictNameTH,
                                            ProvinceCode: prov.ProvinceCode,
                                            ProvinceNameTH: prov.ProvinceNameTH,
                                            ZipCode: null
                                        });
                                    });
                                });
                            });
                        }).catch(function (error) { return _this.catchError(error); });
                        this.loaderService.hide();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.onSDateChange = function (event) {
        this.dateStartFrom = event;
        this.dateStartTo = this.dateStartTo || this.arrestFG.value.OccurrenceDate;
        this.checkDate();
    };
    ManageComponent.prototype.onEDateChange = function (event) {
        this.dateStartFrom = this.dateStartFrom || this.arrestFG.value.ArrestDate;
        this.dateStartTo = event;
        this.checkDate();
    };
    ManageComponent.prototype.checkDate = function () {
        var _this = this;
        if (this.dateStartFrom && this.dateStartTo) {
            var sdate = this.isObject(this.dateStartFrom)
                ? Object(__WEBPACK_IMPORTED_MODULE_14_app_config_dateFormat__["d" /* getDateMyDatepicker */])(this.dateStartFrom)
                : new Date(this.dateStartFrom);
            var edate = this.isObject(this.dateStartTo)
                ? Object(__WEBPACK_IMPORTED_MODULE_14_app_config_dateFormat__["d" /* getDateMyDatepicker */])(this.dateStartTo)
                : new Date(this.dateStartTo);
            if (!Object(__WEBPACK_IMPORTED_MODULE_14_app_config_dateFormat__["b" /* compareDate */])(sdate, edate)) {
                alert(__WEBPACK_IMPORTED_MODULE_19_app_config_message__["a" /* Message */].checkDate);
                setTimeout(function () {
                    _this.arrestFG.patchValue({
                        OccurrenceDate: _this.isObject(_this.dateStartFrom)
                            ? { date: _this.dateStartFrom.date }
                            : Object(__WEBPACK_IMPORTED_MODULE_14_app_config_dateFormat__["e" /* setDateMyDatepicker */])(_this.dateStartFrom)
                    });
                }, 0);
            }
        }
    };
    // Set Array ArrestNoticeForm
    // 1
    ManageComponent.prototype.setNoticeForm = function (n) {
        var _this = this;
        var arrestNotice = this.ArrestNotice;
        var i = 0;
        n.map(function (x) {
            var modify = arrestNotice.value.filter(function (x) { return x.IsModify != 'd'; });
            i = (modify.length) && modify[modify.length - 1].RowId;
            arrestNotice.push(_this.fb.group({
                ArrestCode: _this.arrestCode,
                NoticeCode: x.NoticeCode,
                NoticeDateString: x.NoticeDateString,
                NoticeDate: x.NoticeDate,
                IsModify: x.IsModify || 'c',
                RowId: x.IsModify != 'd' && ++i,
                ArrestNoticeStaff: _this.setArrestNoticeStaff(x.ArrestNoticeStaff),
                ArrestNoticeSuspect: _this.setArrestNoticeSuspect(x.ArrestNoticeSuspect)
            }));
        });
        this.arrestFG.setControl('ArrestNotice', arrestNotice);
    };
    // 2
    ManageComponent.prototype.setArrestNoticeStaff = function (o) {
        var _this = this;
        var arr = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormArray */]([]);
        o.map(function (x) {
            arr.push(_this.fb.group({ FullName: x.FullName, OfficeName: x.OfficeName }));
        });
        return arr;
    };
    // 3
    ManageComponent.prototype.setArrestNoticeSuspect = function (o) {
        var _this = this;
        var arr = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormArray */]([]);
        o.map(function (x) {
            arr.push(_this.fb.group({ FullName: x.FullName }));
        });
        return arr;
    };
    // set FormArray ArrestIndictment
    ManageComponent.prototype.setArrestIndictment = function (o) {
        var _this = this;
        var arr = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormArray */]([]);
        o.map(function (x, index) {
            arr.push(_this.fb.group({
                RowId: index + 1,
                IsModify: x.IsModify || 'r',
                IndictmentID: x.IndictmentID,
                GuiltBaseID: x.GuiltBaseID,
                ArrestLawGuitbase: _this.setArrestLawGuitbase(x.ArrestLawGuitbase)
            }));
        });
        this.arrestFG.setControl('ArrestIndictment', arr);
    };
    ManageComponent.prototype.openModal = function (e) {
        this.modal = this.modelService.open(e, { size: 'lg', centered: true });
    };
    ManageComponent.prototype.addStaff = function () {
        var lastIndex = this.ArrestStaff.length - 1;
        var item = new __WEBPACK_IMPORTED_MODULE_20__models_arrest_staff__["a" /* ArrestStaff */]();
        item.ArrestCode = this.arrestCode;
        item.IsModify = 'c';
        if (lastIndex < 0) {
            item.RowId = 1;
            this.ArrestStaff.push(this.fb.group(item));
            return;
        }
        var lastDoc = this.ArrestStaff.at(lastIndex).value;
        if (lastDoc.ContributorID) {
            item.RowId = lastDoc.RowId + 1;
            this.ArrestStaff.push(this.fb.group(item));
        }
        else if (lastDoc.IsModify == 'd') {
            item.RowId = 1;
            this.ArrestStaff.push(this.fb.group(item));
        }
    };
    ManageComponent.prototype.addProduct = function () {
        var lastIndex = this.ArrestProduct.length - 1;
        var item = new __WEBPACK_IMPORTED_MODULE_15__models_arrest_product__["a" /* ArrestProduct */]();
        item.ArrestCode = this.arrestCode;
        item.ProductID = '';
        item.IsModify = 'c';
        item.IsChecked = false;
        item.GroupCode = '1';
        item.IsDomestic = '1';
        if (lastIndex < 0) {
            item.RowId = 1;
            this.ArrestProduct.push(this.fb.group(item));
            return;
        }
        var lastDoc = this.ArrestProduct.at(lastIndex).value;
        if (lastDoc.ProductDesc) {
            item.RowId = lastDoc.RowId + 1;
            this.ArrestProduct.push(this.fb.group(item));
        }
        else if (lastDoc.IsModify == 'd') {
            item.RowId = 1;
            this.ArrestProduct.push(this.fb.group(item));
        }
    };
    ManageComponent.prototype.addAllegation = function () {
        var arrest = this.arrestFG.value;
        this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_24__store__["a" /* CreateArrest */](arrest));
        this.router.navigate(["arrest/allegation", 'C'], {
            queryParams: {
                arrestMode: this.mode,
                arrestCode: this.arrestCode,
                indictmentId: '',
                guiltbaseId: ''
            }
        });
    };
    ManageComponent.prototype.viewAllegation = function (indictmentId, guiltbaseId) {
        var arrest = this.arrestFG.value;
        this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_24__store__["a" /* CreateArrest */](arrest));
        this.router.navigate(["arrest/allegation", 'R'], {
            queryParams: {
                arrestMode: this.mode,
                arrestCode: this.arrestCode,
                indictmentId: indictmentId,
                guiltbaseId: guiltbaseId
            }
        });
    };
    ManageComponent.prototype.addDocument = function () {
        var lastIndex = this.ArrestDocument.length - 1;
        var item = new __WEBPACK_IMPORTED_MODULE_21__models_arrest_document__["a" /* ArrestDocument */]();
        item.DocumentType = '3';
        item.ReferenceCode = this.arrestCode;
        item.IsModify = 'c';
        if (lastIndex < 0) {
            item.RowId = 1;
            this.ArrestDocument.push(this.fb.group(item));
            return;
        }
        var lastItem = this.ArrestDocument.at(lastIndex).value;
        if (lastItem.DataSource && lastItem.FilePath) {
            item.RowId = lastItem.RowId + 1;
            this.ArrestDocument.push(this.fb.group(item));
        }
        else if (lastItem.IsModify == 'd') {
            item.RowId = 1;
            this.ArrestDocument.push(this.fb.group(item));
        }
    };
    ManageComponent.prototype.sortFormArray = function (arr) {
        return __awaiter(this, void 0, void 0, function () {
            var a, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, arr.sort(function (a, b) {
                            if (a.RowId < b.RowId)
                                return -1; // asc
                            if (a.RowId > b.RowId)
                                return 1; // desc
                            return 0;
                        })];
                    case 1:
                        a = _a.sent();
                        i = 0;
                        a.map(function (x) { if (x.RowId != 0)
                            x.RowId = ++i; });
                        return [2 /*return*/, a];
                }
            });
        });
    };
    ManageComponent.prototype.deleteFormArray = function (o, i, controls) {
        var _this = this;
        o.at(i).patchValue({ IsModify: 'd', RowId: 0 });
        var sort = this.sortFormArray(o.value);
        o.value.map(function () { return o.removeAt(0); });
        sort.then(function (x) { return _this.setItemFormArray(x, controls); })
            .catch(function (error) { return _this.catchError(error); });
        ;
    };
    ManageComponent.prototype.deleteStaff = function (i) {
        this.deleteFormArray(this.ArrestStaff, i, 'ArrestStaff');
    };
    ManageComponent.prototype.deleteProduct = function (i) {
        this.deleteFormArray(this.ArrestProduct, i, 'ArrestProduct');
    };
    ManageComponent.prototype.deleteDocument = function (i) {
        this.deleteFormArray(this.ArrestDocument, i, 'ArrestDocument');
    };
    ManageComponent.prototype.deleteNotice = function (i) {
        var _this = this;
        this.ArrestNotice.at(i).patchValue({ IsModify: 'd', RowId: 0 });
        var notice = this.sortFormArray(this.ArrestNotice.value);
        this.ArrestNotice.value.map(function () { return _this.ArrestNotice.removeAt(0); });
        notice.then(function (x) { return _this.setNoticeForm(x); })
            .catch(function (error) { return _this.catchError(error); });
    };
    ManageComponent.prototype.deleteIndicment = function (i) {
        var _this = this;
        this.ArrestIndictment.at(i).patchValue({ IsModify: 'd', RowId: 0 });
        var indictment = this.sortFormArray(this.ArrestIndictment.value);
        this.ArrestIndictment.value.map(function () { return _this.ArrestIndictment.removeAt(0); });
        // indictment.then((x) => this.setArrestIndictmentForm(x));
    };
    ManageComponent.prototype.selectItemLocaleRegion = function (e) {
        this.ArrestLocale.at(0).patchValue({
            SubDistrictCode: e.item.SubdistrictCode,
            SubDistrict: e.item.SubdistrictNameTH,
            DistrictCode: e.item.DistrictCode,
            District: e.item.DistrictNameTH,
            ProvinceCode: e.item.ProvinceCode,
            Province: e.item.ProvinceNameTH,
        });
    };
    ManageComponent.prototype.selectItemProductItem = function (e, i) {
        var product = this.ArrestProduct.at(i).value;
        this.ArrestProduct.at(i).reset(e.item);
        this.ArrestProduct.at(i).patchValue({
            ProductType: e.item.ProductID ? '1' : '2',
            ProductID: product.ProductID || e.item.ProductID,
            IsModify: product.IsModify == 'r' ? 'u' : product.IsModify,
            RowId: product.RowId,
            ArrestCode: this.arrestCode,
            GroupCode: e.item.GroupCode || product.GroupCode,
            IsDomestic: e.item.IsDomestic || product.IsDomestic,
        });
    };
    ManageComponent.prototype.onChangeProductDesc = function (e, i) {
        this.ArrestProduct.at(i).patchValue({
            ProductDesc: e.target.value
        });
    };
    ManageComponent.prototype.selectItemStaff = function (e, i) {
        var staff = this.ArrestStaff.at(i).value;
        this.ArrestStaff.at(i).reset(e.item);
        this.ArrestStaff.at(i).patchValue({
            IsModify: staff.IsModify == 'r' ? 'u' : staff.IsModify,
            RowId: staff.RowId,
            FullName: e.item.TitleName + " " + e.item.FirstName + " " + e.item.LastName,
            ProgramCode: 'ILG60-03-02-00-00',
            ProcessCode: '02',
            ArrestCode: this.arrestCode,
            PositionCode: e.item.OperationPosCode,
            PositionName: e.item.OperationPosName,
            DepartmentCode: e.item.OfficeCode,
            DepartmentName: e.item.OfficeName,
            DepartmentLevel: e.item.DeptLevel,
            ContributorID: e.item.ContributorID
        });
    };
    ManageComponent.prototype.onChangeContributer = function (e, i) {
        var contributerId = e.target.value;
        var staff = this.ArrestStaff.at(i).value;
        this.ArrestStaff.at(i).patchValue({
            ContributorCode: contributerId,
            IsModify: staff.IsModify == 'r' ? 'u' : staff.IsModify
        });
    };
    ManageComponent.prototype.selectItemOffice = function (e) {
        this.arrestFG.patchValue({
            ArrestStationCode: e.item.OfficeCode,
            ArrestStation: e.item.OfficeName
        });
    };
    ManageComponent.prototype.onChangeArrestStation = function (e) {
        this.arrestFG.patchValue({
            ArrestStation: e.target.value
        });
    };
    ManageComponent.prototype.selectItemQtyUnit = function (e, i) {
        this.ArrestProduct.at(i).patchValue({
            QtyUnit: e.item.DutyCode,
        });
    };
    ManageComponent.prototype.selectItemNetVolumeUnit = function (e, i) {
        this.ArrestProduct.at(i).patchValue({
            NetVolumeUnit: e.item.DutyCode,
        });
    };
    ManageComponent.prototype.changeArrestDoc = function (e, index) {
        // let file = e.target.files[0];
        this.ArrestDocument.at(index).patchValue({
            ReferenceCode: this.arrestCode,
            FilePath: Object(__WEBPACK_IMPORTED_MODULE_22_app_config_dataString__["a" /* replaceFakePath */])(e.target.value),
            IsActive: 1
        });
    };
    ManageComponent.prototype.catchError = function (error) {
        console.log(error);
        this.endLoader();
    };
    ManageComponent.prototype.saveFail = function () {
        alert(__WEBPACK_IMPORTED_MODULE_19_app_config_message__["a" /* Message */].saveFail);
        this._isSuccess = false;
        return false;
    };
    ManageComponent.prototype.checkResponse = function (res) {
        switch (res.IsSuccess) {
            case 'False':
            case false:
                return false;
            default:
                return true;
        }
    };
    ManageComponent.prototype.checkIsSuccess = function (res) {
        switch (res.IsSuccess) {
            case 'True':
            case true:
                this._isSuccess = true;
                return true;
            default:
                this._isSuccess = false;
                return false;
        }
    };
    ManageComponent.prototype.onSave = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loaderService.show();
                        return [4 /*yield*/, this.upateArrest()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.updateNotice()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.updateStaff()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.updateProduct()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.updateDocument()];
                    case 5:
                        _a.sent();
                        if (this._isSuccess) {
                            alert(__WEBPACK_IMPORTED_MODULE_19_app_config_message__["a" /* Message */].saveComplete);
                            this.onComplete();
                        }
                        else {
                            alert(__WEBPACK_IMPORTED_MODULE_19_app_config_message__["a" /* Message */].saveFail);
                        }
                        this.loaderService.hide();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.onCancel = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (this.mode) {
                    case 'C':
                        if (this.arrestCode != 'NEW') {
                            this.deleteArrest();
                        }
                        else {
                            this.router.navigate(["arrest/list"]);
                        }
                        break;
                    case 'R':
                        this.arrestFG.reset();
                        this.pageLoad(this.arrestCode);
                        break;
                }
                return [2 /*return*/];
            });
        });
    };
    ManageComponent.prototype.onEdit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isCheck, indict;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loaderService.show();
                        return [4 /*yield*/, this.ArrestIndictment.value
                                .map(function (x) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.s_lawsuit
                                                .ArrestLawsuitgetByIndictmentID(x.IndictmentID.toString())
                                                .then(function (y) { return isCheck = _this.checkResponse(y); })
                                                .catch(function (error) { return _this.catchError(error); })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        indict = _a.sent();
                        this.loaderService.hide();
                        Promise.all(indict).then(function () {
                            if (isCheck) {
                                alert(__WEBPACK_IMPORTED_MODULE_19_app_config_message__["a" /* Message */].cannotModify);
                                _this.enableBthModeR();
                            }
                            else {
                                _this.loadMasterData();
                            }
                        }).catch(function (error) { return _this.catchError(error); });
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.onDelete = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isCheck, indict;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loaderService.show();
                        return [4 /*yield*/, this.ArrestIndictment.value
                                .map(function (x) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.s_lawsuit
                                                .ArrestLawsuitgetByIndictmentID(x.IndictmentID.toString())
                                                .then(function (y) { return isCheck = _this.checkResponse(y); })
                                                .catch(function (error) { return _this.catchError(error); })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        indict = _a.sent();
                        Promise.all(indict).then(function () {
                            _this.loaderService.hide();
                            if (isCheck) {
                                alert(__WEBPACK_IMPORTED_MODULE_19_app_config_message__["a" /* Message */].cannotDeleteRec);
                            }
                            else {
                                if (confirm(__WEBPACK_IMPORTED_MODULE_19_app_config_message__["a" /* Message */].confirmAction)) {
                                    _this.deleteArrest();
                                }
                            }
                        }).catch(function (error) { return _this.catchError(error); });
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.onComplete = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.router.navigate(['/arrest/manage', 'R', this.arrestCode]);
                return [2 /*return*/];
            });
        });
    };
    ManageComponent.prototype.upateArrest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var a, newArrest;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        a = this.arrestFG.value;
                        newArrest = {
                            ArrestCode: a.ArrestCode,
                            ArrestDate: a.ArrestDate,
                            ArrestTime: a.ArrestTime,
                            OccurrenceDate: a.OccurrenceDate,
                            OccurrenceTime: a.OccurrenceTime,
                            ArrestStationCode: a.ArrestStationCode,
                            ArrestStation: a.ArrestStation,
                            HaveCulprit: a.HaveCulprit,
                            Behaviour: a.Behaviour,
                            Testimony: a.Testimony,
                            Prompt: a.Prompt,
                            IsMatchNotice: a.IsMatchNotice,
                            ArrestDesc: a.ArrestDesc,
                            NoticeCode: a.NoticeCode,
                            InvestigationSurveyDocument: a.InvestigationSurveyDocument,
                            InvestigationCode: a.InvestigationCode,
                            IsActive: a.IsActive,
                            ArrestLocale: a.ArrestLocale
                                .map(function (x) {
                                x.ArrestCode = a.ArrestCode;
                                return x;
                            })
                        };
                        return [4 /*yield*/, this.s_arrest.ArrestupdByCon(newArrest)
                                .then(function (x) {
                                if (!_this.checkIsSuccess(x))
                                    return;
                            }, function () { _this.saveFail(); return; })
                                .catch(function (error) { return _this.catchError(error); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.deleteArrest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loaderService.show();
                        return [4 /*yield*/, this.s_arrest.ArrestupdDelete(this.arrestCode)
                                .then(function (x) {
                                if (_this.checkResponse(x)) {
                                    alert(__WEBPACK_IMPORTED_MODULE_19_app_config_message__["a" /* Message */].delComplete);
                                    _this.arrestFG.reset();
                                    _this.router.navigate(["arrest/list"]);
                                }
                                else {
                                    alert(__WEBPACK_IMPORTED_MODULE_19_app_config_message__["a" /* Message */].delFail);
                                }
                            }, function () { alert(__WEBPACK_IMPORTED_MODULE_19_app_config_message__["a" /* Message */].delFail); return; })
                                .catch(function (error) { return _this.catchError(error); })];
                    case 1:
                        _a.sent();
                        this.loaderService.hide();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.updateNotice = function () {
        return __awaiter(this, void 0, void 0, function () {
            var noticePromise;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ArrestNotice.value
                            .map(function (x) { return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            var _this = this;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _a = x.IsModify;
                                        switch (_a) {
                                            case 'd': return [3 /*break*/, 1];
                                            case 'c': return [3 /*break*/, 3];
                                        }
                                        return [3 /*break*/, 5];
                                    case 1: return [4 /*yield*/, this.s_notice.ArrestNoticeupdDelete(x.NoticeCode)
                                            .then(function (x) {
                                            if (!_this.checkIsSuccess(x))
                                                return;
                                        }, function () { _this.saveFail(); return; })
                                            .catch(function (error) { return _this.catchError(error); })];
                                    case 2:
                                        _b.sent();
                                        return [3 /*break*/, 5];
                                    case 3: return [4 /*yield*/, this.s_notice.ArrestNoticeupdByCon(x.ArrestCode, x.NoticeCode)
                                            .then(function (x) {
                                            if (!_this.checkIsSuccess(x))
                                                return;
                                        }, function () { _this.saveFail(); return; })
                                            .catch(function (error) { return _this.catchError(error); })];
                                    case 4:
                                        _b.sent();
                                        return [3 /*break*/, 5];
                                    case 5: return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        noticePromise = _a.sent();
                        return [2 /*return*/, Promise.all(noticePromise)];
                }
            });
        });
    };
    ManageComponent.prototype.updateStaff = function () {
        return __awaiter(this, void 0, void 0, function () {
            var staffPromise;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ArrestStaff.value
                            .map(function (x) { return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            var _this = this;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _a = x.IsModify;
                                        switch (_a) {
                                            case 'd': return [3 /*break*/, 1];
                                            case 'c': return [3 /*break*/, 3];
                                            case 'u': return [3 /*break*/, 5];
                                        }
                                        return [3 /*break*/, 7];
                                    case 1: return [4 /*yield*/, this.s_staff.ArrestStaffupdDelete(x.StaffID)
                                            .then(function (y) {
                                            if (!_this.checkIsSuccess(y))
                                                return;
                                        }, function () { _this.saveFail(); return; })
                                            .catch(function (error) { return _this.catchError(error); })];
                                    case 2:
                                        _b.sent();
                                        return [3 /*break*/, 7];
                                    case 3: return [4 /*yield*/, this.s_staff.ArrestStaffinsAll(x)
                                            .then(function (y) {
                                            if (!_this.checkIsSuccess(y))
                                                return;
                                        }, function () { _this.saveFail(); return; })
                                            .catch(function (error) { return _this.catchError(error); })];
                                    case 4:
                                        _b.sent();
                                        return [3 /*break*/, 7];
                                    case 5: return [4 /*yield*/, this.s_staff.ArrestStaffupdByCon(x)
                                            .then(function (y) {
                                            if (!_this.checkIsSuccess(y))
                                                return;
                                        }, function () { _this.saveFail(); return; })
                                            .catch(function (error) { return _this.catchError(error); })];
                                    case 6:
                                        _b.sent();
                                        return [3 /*break*/, 7];
                                    case 7: return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        staffPromise = _a.sent();
                        return [2 /*return*/, Promise.all(staffPromise)];
                }
            });
        });
    };
    ManageComponent.prototype.updateProduct = function () {
        return __awaiter(this, void 0, void 0, function () {
            var productPromise;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ArrestProduct.value
                            .map(function (x) { return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            var _this = this;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        x.ProductDesc = this.isObject(x.ProductDesc) ? x.ProductDesc['ProductDesc'] : x.ProductDesc;
                                        _a = x.IsModify;
                                        switch (_a) {
                                            case 'd': return [3 /*break*/, 1];
                                            case 'c': return [3 /*break*/, 3];
                                            case 'u': return [3 /*break*/, 5];
                                        }
                                        return [3 /*break*/, 7];
                                    case 1: return [4 /*yield*/, this.s_product.ArrestProductupdDelete(x.ProductID)
                                            .then(function (y) {
                                            if (!_this.checkIsSuccess(y))
                                                return;
                                        }, function () { _this.saveFail(); return; })
                                            .catch(function (error) { return _this.catchError(error); })];
                                    case 2:
                                        _b.sent();
                                        return [3 /*break*/, 7];
                                    case 3: return [4 /*yield*/, this.s_product.ArrestProductinsAll(x)
                                            .then(function (y) {
                                            if (!_this.checkIsSuccess(y))
                                                return;
                                        }, function () { _this.saveFail(); return; })
                                            .catch(function (error) { return _this.catchError(error); })];
                                    case 4:
                                        _b.sent();
                                        return [3 /*break*/, 7];
                                    case 5: return [4 /*yield*/, this.s_product.ArrestProductupdByCon(x)
                                            .then(function (y) {
                                            if (!_this.checkIsSuccess(y))
                                                return;
                                        }, function () { _this.saveFail(); return; })
                                            .catch(function (error) { return _this.catchError(error); })];
                                    case 6:
                                        _b.sent();
                                        return [3 /*break*/, 7];
                                    case 7: return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        productPromise = _a.sent();
                        return [2 /*return*/, Promise.all(productPromise)];
                }
            });
        });
    };
    ManageComponent.prototype.updateDocument = function () {
        return __awaiter(this, void 0, void 0, function () {
            var docPromise;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ArrestDocument.value
                            .map(function (x) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (x.IsModify) {
                                    case 'd':
                                        this.s_document.MasDocumentMainupdDelete(x.DocumentID)
                                            .then(function (y) {
                                            if (!_this.checkIsSuccess(y))
                                                return;
                                        }, function () { _this.saveFail(); return; })
                                            .catch(function (error) { return _this.catchError(error); });
                                        break;
                                    case 'c':
                                        this.s_document.MasDocumentMaininsAll(x)
                                            .then(function (y) {
                                            if (!_this.checkIsSuccess(y))
                                                return;
                                        }, function () { _this.saveFail(); return; })
                                            .catch(function (error) { return _this.catchError(error); });
                                        break;
                                    case 'u':
                                        this.s_document.MasDocumentMainupdByCon(x)
                                            .then(function (y) {
                                            if (!_this.checkIsSuccess(y))
                                                return;
                                        }, function () { _this.saveFail(); return; })
                                            .catch(function (error) { return _this.catchError(error); });
                                        break;
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        docPromise = _a.sent();
                        return [2 /*return*/, Promise.all(docPromise)];
                }
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('printDocModal'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], ManageComponent.prototype, "printDocModel", void 0);
    ManageComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-manage',
            template: __webpack_require__("./src/app/pages/arrests/components/manage/manage.component.html"),
            styles: [__webpack_require__("./src/app/pages/arrests/components/manage/manage.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["d" /* NgbModal */],
            __WEBPACK_IMPORTED_MODULE_16_app_shared_header_navigation_navigation_service__["a" /* NavigationService */],
            __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["d" /* NgbModal */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */],
            __WEBPACK_IMPORTED_MODULE_17_app_shared_sidebar_sidebar_component__["b" /* SidebarService */],
            __WEBPACK_IMPORTED_MODULE_18_app_services_main_master_service__["a" /* MainMasterService */],
            __WEBPACK_IMPORTED_MODULE_29_app_services_mas_document_main_service__["a" /* MasDocumentMainService */],
            __WEBPACK_IMPORTED_MODULE_23__ngrx_store__["a" /* Store */],
            __WEBPACK_IMPORTED_MODULE_27__arrests_service__["a" /* ArrestsService */], __WEBPACK_IMPORTED_MODULE_26__services__["j" /* ArrestService */], __WEBPACK_IMPORTED_MODULE_26__services__["i" /* ArrestProductService */], __WEBPACK_IMPORTED_MODULE_26__services__["b" /* ArrestIndictmentService */], __WEBPACK_IMPORTED_MODULE_26__services__["g" /* ArrestNoticeService */], __WEBPACK_IMPORTED_MODULE_26__services__["k" /* ArrestStaffService */], __WEBPACK_IMPORTED_MODULE_26__services__["d" /* ArrestLawSuitService */], __WEBPACK_IMPORTED_MODULE_28_app_core_loader_loader_service__["a" /* LoaderService */],
            __WEBPACK_IMPORTED_MODULE_30__manage_config__["a" /* ManageConfig */]])
    ], ManageComponent);
    return ManageComponent;
}());



/***/ }),

/***/ "./src/app/pages/arrests/components/modal-notice/modal-notice.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header bg-theme\">\r\n    <div class=\"row\">\r\n        <div class=\"col-lg-5\">\r\n            <h4 class=\"modal-title text-white\">อ้างอิงใบแจ้งความนำจับ</h4>\r\n        </div>\r\n        <div class=\"col-lg-5 col-sm-8\">\r\n            <form autocomplete=\"off\" class=\"app-search\" #searchFrom=\"ngForm\" (ngSubmit)=\"onSearch(searchFrom.value)\">\r\n                <input type=\"search\" name=\"Textsearch\" ngModel class=\"form-control form-control-sm\">\r\n                <a href=\"javaScript:void(0);\" class=\"srh-btn\" (click)=\"onSearch(searchFrom.value)\">\r\n                    <i class=\"ti-search\"></i>\r\n                </a>\r\n            </form>\r\n        </div>\r\n        <div class=\"col-lg-2 col-sm-4 p-0\">\r\n            <a href=\"javaScript:void(0);\" (click)=\"toggle()\" class=\"text-white\">ค้นหาขั้นสูง</a>\r\n        </div>\r\n\r\n        <a href=\"javaScript:void(0);\" class=\"close text-white font-14\" aria-label=\"Close\" (click)=\"dismiss('Cross click')\">\r\n            <span aria-hidden=\"true\">\r\n                <i class=\" ti-close\"></i>\r\n            </span>\r\n        </a>\r\n    </div>\r\n</div>\r\n<h5 class=\"text-right mt-3 pr-3\">ILG60-03-02-02-00</h5>\r\n<div class=\"modal-body font-14\">\r\n    <div *ngIf=\"advSearch\" class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header unset-radius\">\r\n            <div class=\"card-actions\">\r\n                <a class=\"\" (click)=\"toggle()\">\r\n                    <i class=\"fa fa-times\"></i>\r\n                </a>\r\n            </div>\r\n            <h4 class=\"card-title m-b-0\">ค้นหาขั้นสูง</h4>\r\n        </div>\r\n        <div class=\"card-body\">\r\n            <form class=\"form-horizontal\" *ngIf=\"advSearch\" #advForm=\"ngForm\" (ngSubmit)=\"onAdvSearch(advForm.value)\">\r\n                <div>\r\n                    <div class=\"row\">\r\n                        <label for=\"\" class=\"col-lg-2 col-sm-3\">เลขที่ใบแจ้งความ :</label>\r\n                        <div class=\"col-lg-4 col-md-7 col-sm-9\">\r\n                            <div class=\"form-group\">\r\n                                <input type=\"text\" name=\"NoticeCode\" ngModel class=\"form-control form-control-sm\">\r\n                            </div>\r\n                        </div>\r\n\r\n                        <label for=\"\" class=\"col-lg-2 col-sm-3\">วันที่แจ้งความ :</label>\r\n                        <div class=\"col-lg-4 col-md-7 col-sm-9\">\r\n                            <div class=\"form-group input-group\">\r\n                                <my-date-picker-th class=\"form-control form-control-sm unset-form-control\" name=\"DateStartFrom\"\r\n                                    [options]=\"myDatePickerOptions\" (dateChanged)=\"onSDateChange($event)\" [(ngModel)]=\"dateStartFrom\"></my-date-picker-th>\r\n                                <label for=\"\">&nbsp;ถึง&nbsp;</label>\r\n                                <my-date-picker-th class=\"form-control form-control-sm unset-form-control\" name=\"DateStartTo\"\r\n                                    [options]=\"myDatePickerOptions\" (dateChanged)=\"onEDateChange($event)\" [(ngModel)]=\"dateStartTo\"></my-date-picker-th>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                        <label for=\"\" class=\"col-lg-2 col-sm-3\">ผู้รับแจ้งความ :</label>\r\n                        <div class=\"col-lg-4 col-md-7 col-sm-9\">\r\n                            <div class=\"form-group\">\r\n                                <input type=\"text\" name=\"StaffName\" ngModel class=\"form-control form-control-sm\">\r\n                            </div>\r\n                        </div>\r\n                        <label for=\"\" class=\"col-lg-2 col-sm-3\">หน่วยงาน :</label>\r\n                        <div class=\"col-lg-4 col-md-7 col-sm-9\">\r\n                            <div class=\"form-group\">\r\n                                <input type=\"text\" name=\"DepartmentName\" ngModel class=\"form-control form-control-sm\">\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                        <label for=\"\" class=\"col-lg-2 col-sm-3\">ผู้ต้องสงสัย :</label>\r\n                        <div class=\"col-lg-4 col-md-7 col-sm-9\">\r\n                            <div class=\"form-group\">\r\n                                <input type=\"text\" name=\"SuspectName\" ngModel class=\"form-control form-control-sm\">\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"row form-group\">\r\n                        <div class=\"col-lg-10 col-8\"></div>\r\n                        <div class=\"col-lg-2 col-4\">\r\n                            <button type=\"submit\" class=\"btn btn-block btn-themecolor\">ค้นข้อมูล</button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n    <div class=\"card  unset-radius\">\r\n        <div class=\"card-body p-0\">\r\n            <div class=\"table-responsive table-sm table-striped\">\r\n                <table #noticeTable class=\"table\" [formGroup]=\"noticeFG\">\r\n                    <thead>\r\n                        <tr>\r\n                            <th class=\"text-center\"></th>\r\n                            <th class=\"text-center\">ลำดับ</th>\r\n                            <th>เลขที่ใบแจ้งความ</th>\r\n                            <th>วันที่แจ้งความ</th>\r\n                            <th>ผู้รับแจ้งความ</th>\r\n                            <th>หน่วยงาน</th>\r\n                            <th>ผู้ต้องสงสัย</th>\r\n                            <!-- <th></th> -->\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody formArrayName=\"ArrestNotice\">\r\n                        <tr *ngFor=\"let item of ArrestNotice.controls; let i=index;\" [formGroupName]=\"i\">\r\n                            <td class=\"text-center\">\r\n                                <input type=\"checkbox\" formControlName=\"IsChecked\" [id]=\"'lb' + i\" [checked]=\"isCheckAll\"\r\n                                    class=\"filled-in chk-col-indigo\">\r\n                                <label [for]=\"'lb' + i\" class=\"m-0\"></label>\r\n                            </td>\r\n                            <td class=\"text-center\">{{item.get('RowId').value}}</td>\r\n                            <td>{{item.get('NoticeCode').value}}</td>\r\n                            <td>{{item.get('NoticeDateString').value}}</td>\r\n                            <td>\r\n                                <div *ngFor=\"let staff of item.value.ArrestNoticeStaff;\">{{staff.FullName}}</div>\r\n                            </td>\r\n                            <td>\r\n                                <div *ngFor=\"let staff of item.value.ArrestNoticeStaff;\">{{staff.OfficeName}}</div>\r\n                            </td>\r\n                            <td>\r\n                                <div *ngFor=\"let suspect of item.value.ArrestNoticeSuspect;\">{{suspect.FullName}}</div>\r\n                            </td>\r\n                            <!-- <td class=\"text-center\">\r\n                                <a href=\"javaScript:void(0);\" class=\"text-secondary\" (click)=\"view(item.value.NoticeCode)\">\r\n                                    <i class=\"fa fa-eye fa-lg\"></i>\r\n                                </a>\r\n                            </td> -->\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n        <div class=\"card-footer card-footer-unset\">\r\n            <app-pagination-table [TotalItems]=\"paginage.TotalItems\" [CurrentPage]=\"paginage.CurrentPage\" [PageSize]=\"paginage.PageSize\"\r\n                [RowsPerPageOptions]=\"paginage.RowsPerPageOptions\" (onPageChange)=\"pageChanges($event)\">\r\n            </app-pagination-table>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"modal-footer\">\r\n    <div class=\"col-lg-2 col-4\">\r\n        <button type=\"button\" class=\"btn btn-block btn-themecolor\" (click)=\"close('Save click')\">เลือก</button>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/pages/arrests/components/modal-notice/modal-notice.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalNoticeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_config_dateFormat__ = __webpack_require__("./src/app/config/dateFormat.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_config_pagination__ = __webpack_require__("./src/app/config/pagination.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_config_message__ = __webpack_require__("./src/app/config/message.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services__ = __webpack_require__("./src/app/pages/arrests/services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/_esm5/Subject.js");
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








var ModalNoticeComponent = /** @class */ (function () {
    function ModalNoticeComponent(
    // private arrestService: ArrestsService,
    _router, 
    // private preLoaderService: PreloaderService,
    fb, s_arrestNotice) {
        this._router = _router;
        this.fb = fb;
        this.s_arrestNotice = s_arrestNotice;
        this.isCheckAll = false;
        this.advSearch = false;
        this.notice = new Array();
        this.myDatePickerOptions = __WEBPACK_IMPORTED_MODULE_3_app_config_dateFormat__["a" /* MyDatePickerOptions */];
        this.paginage = __WEBPACK_IMPORTED_MODULE_4_app_config_pagination__["a" /* pagination */];
        this.destroy$ = new __WEBPACK_IMPORTED_MODULE_7_rxjs_Subject__["b" /* Subject */]();
        this.d = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.c = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.outputNotice = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
    }
    Object.defineProperty(ModalNoticeComponent.prototype, "ArrestNotice", {
        get: function () {
            return this.noticeFG.get('ArrestNotice');
        },
        enumerable: true,
        configurable: true
    });
    ModalNoticeComponent.prototype.ngOnInit = function () {
        this.paginage.TotalItems = 0;
        this.noticeFG = this.fb.group({
            ArrestNotice: this.fb.array([])
        });
    };
    ModalNoticeComponent.prototype.ngOnDestroy = function () {
        this.paginage.TotalItems = 0;
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    };
    ModalNoticeComponent.prototype.onSearch = function (Textsearch) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.s_arrestNotice.ArrestNoticegetByKeyword(Textsearch)
                    .takeUntil(this.destroy$)
                    .subscribe(function (x) { return _this.onSearchComplete(x); });
                return [2 /*return*/];
            });
        });
    };
    ModalNoticeComponent.prototype.onAdvSearch = function (form) {
        return __awaiter(this, void 0, void 0, function () {
            var sdate, edate;
            var _this = this;
            return __generator(this, function (_a) {
                sdate = Object(__WEBPACK_IMPORTED_MODULE_3_app_config_dateFormat__["d" /* getDateMyDatepicker */])(form.dateStartFrom);
                edate = Object(__WEBPACK_IMPORTED_MODULE_3_app_config_dateFormat__["d" /* getDateMyDatepicker */])(form.dateStartTo);
                if (sdate && edate) {
                    if (!Object(__WEBPACK_IMPORTED_MODULE_3_app_config_dateFormat__["b" /* compareDate */])(sdate, edate)) {
                        alert(__WEBPACK_IMPORTED_MODULE_5_app_config_message__["a" /* Message */].checkDate);
                        return [2 /*return*/, false];
                    }
                }
                form.DateStartFrom = Object(__WEBPACK_IMPORTED_MODULE_3_app_config_dateFormat__["c" /* convertDateForSave */])(sdate) || '';
                form.DateStartTo = Object(__WEBPACK_IMPORTED_MODULE_3_app_config_dateFormat__["c" /* convertDateForSave */])(edate) || '';
                this.s_arrestNotice.ArrestNoticegetByConAdv(form)
                    .takeUntil(this.destroy$)
                    .subscribe(function (x) { return _this.onSearchComplete(x); });
                return [2 /*return*/];
            });
        });
    };
    ModalNoticeComponent.prototype.onSearchComplete = function (list) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!list.length) {
                            alert(__WEBPACK_IMPORTED_MODULE_5_app_config_message__["a" /* Message */].noRecord);
                            return [2 /*return*/];
                        }
                        this.notice = new Array();
                        return [4 /*yield*/, list.filter(function (item) { return item.IsActive == 1; }).map(function (item, i) {
                                item.RowId = i + 1;
                                item.IsChecked = false;
                                item.NoticeDateString = Object(__WEBPACK_IMPORTED_MODULE_3_app_config_dateFormat__["i" /* toLocalShort */])(item.NoticeDate);
                                item.NoticeDate = item.NoticeDate;
                                item.ArrestNoticeStaff.map(function (s) { return s.FullName = s.TitleName + " " + s.FirstName + " " + s.LastName; });
                                item.ArrestNoticeSuspect.map(function (s) { return s.FullName = s.SuspectTitleName + " " + s.SuspectFirstName + " " + s.SuspectLastName; });
                            })];
                    case 1:
                        _a.sent();
                        this.notice = list;
                        // set total record
                        this.paginage.TotalItems = list.length;
                        return [2 /*return*/];
                }
            });
        });
    };
    ModalNoticeComponent.prototype.onSDateChange = function (event) {
        this.dateStartFrom = event;
        this.checkDate();
    };
    ModalNoticeComponent.prototype.onEDateChange = function (event) {
        this.dateStartTo = event;
        this.checkDate();
    };
    ModalNoticeComponent.prototype.checkDate = function () {
        var _this = this;
        if (this.dateStartFrom && this.dateStartTo) {
            var _sdate_1 = this.dateStartFrom;
            var sdate = Object(__WEBPACK_IMPORTED_MODULE_3_app_config_dateFormat__["d" /* getDateMyDatepicker */])(this.dateStartFrom);
            var edate = Object(__WEBPACK_IMPORTED_MODULE_3_app_config_dateFormat__["d" /* getDateMyDatepicker */])(this.dateStartTo);
            if (!Object(__WEBPACK_IMPORTED_MODULE_3_app_config_dateFormat__["b" /* compareDate */])(sdate, edate)) {
                alert(__WEBPACK_IMPORTED_MODULE_5_app_config_message__["a" /* Message */].checkDate);
                setTimeout(function () {
                    _this.dateStartTo = { date: _sdate_1.date };
                }, 0);
            }
        }
    };
    // setIsChecked(i: number) {
    //     this.ArrestNotice.value.map((item, index) => {
    //         item.IsChecked = i == index ? true : false;
    //     })
    // }
    ModalNoticeComponent.prototype.view = function (code) {
        this.dismiss('Cross click');
        this._router.navigate(["/notice/manage/R/" + code]);
    };
    ModalNoticeComponent.prototype.checkAll = function () {
        this.isCheckAll = !this.isCheckAll;
    };
    ModalNoticeComponent.prototype.toggle = function () {
        this.advSearch = !this.advSearch;
    };
    ModalNoticeComponent.prototype.dismiss = function (e) {
        this.d.emit(e);
    };
    ModalNoticeComponent.prototype.close = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var n;
            return __generator(this, function (_a) {
                n = this.ArrestNotice.value.filter(function (item) { return item.IsChecked; });
                if (n.length) {
                    this.outputNotice.emit(n);
                    this.c.emit(e);
                }
                return [2 /*return*/];
            });
        });
    };
    ModalNoticeComponent.prototype.pageChanges = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var list, _noticeList, itemFormArray;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.notice.slice(event.startIndex - 1, event.endIndex)];
                    case 1:
                        list = _a.sent();
                        _noticeList = [];
                        return [4 /*yield*/, list.map(function (item) {
                                var FG = _this.fb.group({
                                    IsChecked: item.IsChecked,
                                    RowId: item.RowId,
                                    NoticeCode: item.NoticeCode,
                                    NoticeDateString: item.NoticeDateString,
                                    NoticeDate: item.NoticeDate,
                                    ArrestNoticeStaff: _this.fb.array(item.ArrestNoticeStaff),
                                    ArrestNoticeSuspect: _this.fb.array(item.ArrestNoticeSuspect)
                                });
                                _noticeList.push(FG);
                            })];
                    case 2:
                        _a.sent();
                        itemFormArray = this.fb.array(_noticeList);
                        this.noticeFG.setControl('ArrestNotice', itemFormArray);
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
        __metadata("design:type", Object)
    ], ModalNoticeComponent.prototype, "d", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
        __metadata("design:type", Object)
    ], ModalNoticeComponent.prototype, "c", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
        __metadata("design:type", Object)
    ], ModalNoticeComponent.prototype, "outputNotice", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('noticeTable'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], ModalNoticeComponent.prototype, "noticeTable", void 0);
    ModalNoticeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-modal-notice',
            template: __webpack_require__("./src/app/pages/arrests/components/modal-notice/modal-notice.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_6__services__["g" /* ArrestNoticeService */]])
    ], ModalNoticeComponent);
    return ModalNoticeComponent;
}());



/***/ }),

/***/ "./src/app/pages/arrests/components/offense-modal/offense-modal.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header bg-theme\">\r\n    <h4 class=\"modal-title text-white\">รายละเอียดการกระทำผิด</h4>\r\n    <a href=\"javaScript:void(0);\" class=\"close text-white font-14\" aria-label=\"Close\" (click)=\"dismiss('Cross click')\">\r\n        <span aria-hidden=\"true\">\r\n            <i class=\" ti-close\"></i>\r\n        </span>\r\n    </a>\r\n</div>\r\n<h5 class=\"text-right mt-3 pr-3\">XCS60-03-02-00-00</h5>\r\n<div class=\"modal-body font-14\">\r\n    <div class=\"card p-0 unset-radius\">\r\n        <div class=\"card-body p-0\">\r\n\r\n            <table class=\"table table-sm table-striped\">\r\n                <thead>\r\n                    <tr>\r\n                        <th class=\"text-center\">ลำดับ</th>\r\n                        <th>เลขที่รับ</th>\r\n                        <th>มาตรา</th>\r\n                        <th>ข้อ</th>\r\n                        <th>ข้อกล่าวหา</th>\r\n                        <th>สถานที่จับกุม</th>\r\n                        <th>หน่วยงาน</th>\r\n                        <th>วันที่จับกุม</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr>\r\n                        <td class=\"text-center\"></td>\r\n                        <td>1</td>\r\n                        <td>1</td>\r\n                        <td>1</td>\r\n                        <td>1</td>\r\n                        <td>1</td>\r\n                        <td>1</td>\r\n                        <td>1</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <div class=\"card-footer card-footer-unset\">\r\n            <div class=\"row justify-content-between m-l-5\">\r\n                <div clas=\"col\">\r\n                    <a class=\"icn-pagination\"> |<< </a>\r\n                            <label> หน้าที่\r\n                                <select>\r\n                                    <option value=\"1\">1</option>\r\n                                    <option value=\"2\">2</option>\r\n                                </select> จาก 2 หน้า</label>\r\n                            <a class=\"icn-pagination m-r-10\"> >>| </a>\r\n                            รายการที่ 1 - 5 จาก 5 รายการ\r\n                </div>\r\n                <div class=\"col col-lg-3 text-right\">\r\n                    <label>แสดง\r\n                        <select>\r\n                            <option>5</option>\r\n                            <option>10</option>\r\n                            <option>15</option>\r\n                            <option>20</option>\r\n                        </select> รายการ</label>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/pages/arrests/components/offense-modal/offense-modal.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/arrests/components/offense-modal/offense-modal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OffenseModalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var OffenseModalComponent = /** @class */ (function () {
    function OffenseModalComponent(_chRef) {
        this._chRef = _chRef;
        this.d = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.c = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
    }
    OffenseModalComponent.prototype.ngOnInit = function () {
        this.onDetactTable();
    };
    OffenseModalComponent.prototype.onDetactTable = function () {
        // const table: any = $('table');
        // if ($.fn.dataTable.isDataTable('table')) {
        //   this.dataTable = table.DataTable();
        //   this.dataTable.destroy();
        // }
        // this._chRef.detectChanges();
        // this.dataTable = table.DataTable(dataTableOptions);
    };
    OffenseModalComponent.prototype.dismiss = function (e) {
        this.d.emit(e);
    };
    OffenseModalComponent.prototype.close = function (e) {
        this.c.emit(e);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
        __metadata("design:type", Object)
    ], OffenseModalComponent.prototype, "d", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
        __metadata("design:type", Object)
    ], OffenseModalComponent.prototype, "c", void 0);
    OffenseModalComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-offense-modal',
            template: __webpack_require__("./src/app/pages/arrests/components/offense-modal/offense-modal.component.html"),
            styles: [__webpack_require__("./src/app/pages/arrests/components/offense-modal/offense-modal.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */]])
    ], OffenseModalComponent);
    return OffenseModalComponent;
}());



/***/ }),

/***/ "./src/app/pages/arrests/components/print-doc-modal/print-doc-modal.component.html":
/***/ (function(module, exports) {

module.exports = "<form action=\"\">\r\n    <div class=\"modal-header bg-theme\">\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-5\">\r\n                <h4 class=\"modal-title text-white\">พิมพ์เอกสาร</h4>\r\n            </div>\r\n            <a href=\"javaScript:void(0);\" class=\"close text-white font-14\" aria-label=\"Close\" (click)=\"dismiss('Cross click')\">\r\n                <span aria-hidden=\"true\">\r\n                    <i class=\" ti-close\"></i>\r\n                </span>\r\n            </a>\r\n        </div>\r\n    </div>\r\n    <h5 class=\"text-right mt-3 pr-3\">ILG60-03-02-01-00</h5>\r\n    <div class=\"modal-body font-14\" [formGroup]=\"FG\">\r\n\r\n        <div class=\"table-responsive\">\r\n            <table class=\"table table-sm table-striped table-set-border\">\r\n                <thead>\r\n                    <tr>\r\n                        <th></th>\r\n                        <th class=\"text-center\">ลำดับ</th>\r\n                        <th>ชื่อเอกสาร</th>\r\n                        <th [ngSwitch]=\"sort\" style=\"cursor: pointer;\">\r\n                            <div (click)=\"sortPrintDoc()\">\r\n                                ประเภทเอกสาร\r\n                                <i *ngSwitchCase=\"'desc'\" class=\"fa fa-sort-amount-desc\"></i>\r\n                                <i *ngSwitchCase=\"'asc'\" class=\"fa fa-sort-amount-asc\"></i>\r\n                            </div>\r\n                        </th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody formArrayName=\"PrintDoc\">\r\n                    <tr *ngFor=\"let item of PrintDoc.controls; let i=index;\" [formGroupName]=\"i\">\r\n                        <td class=\"text-center\">\r\n                            <input type=\"checkbox\" formControlName=\"IsChecked\" [id]=\"'td'+i\" class=\"filled-in chk-col-indigo\">\r\n                            <label [for]=\"'td'+i\" class=\"m-0\"></label>\r\n                        </td>\r\n                        <td class=\"text-center\">{{i+1}}</td>\r\n                        <td>{{item.get('DocName').value}}</td>\r\n                        <td>{{item.get('DocTypeName').value}}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <div class=\"col-lg-2 col-4\">\r\n            <button type=\"button\" class=\"btn btn-block btn-themecolor\" (click)=\"onPrint()\">พิมพ์</button>\r\n        </div>\r\n    </div>\r\n</form>"

/***/ }),

/***/ "./src/app/pages/arrests/components/print-doc-modal/print-doc-modal.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/arrests/components/print-doc-modal/print-doc-modal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrintDocModalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_services_main_master_service__ = __webpack_require__("./src/app/services/main-master.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services__ = __webpack_require__("./src/app/pages/arrests/services/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PrintDocModalComponent = /** @class */ (function () {
    function PrintDocModalComponent(s_masmain, s_arrest, fb) {
        this.s_masmain = s_masmain;
        this.s_arrest = s_arrest;
        this.fb = fb;
        this.sort = 'asc';
        this.d = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.c = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
    }
    Object.defineProperty(PrintDocModalComponent.prototype, "PrintDoc", {
        get: function () {
            return this.FG.get('PrintDoc');
        },
        enumerable: true,
        configurable: true
    });
    PrintDocModalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.FG = this.fb.group({
            PrintDoc: this.fb.array([
                this.fb.group({
                    IsChecked: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormControl */](false),
                    DocName: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormControl */]('บันทึกจับกุม (ส.ส. 2/39)'),
                    DocType: 0,
                    DocTypeName: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormControl */]('แบบฟอร์ม')
                })
            ])
        });
        this.s_masmain.MasDocumentMaingetAll('3', this.ArrestCode).then(function (x) {
            x.filter(function (y) { return y.IsActive == 1; })
                .map(function (y) {
                _this.PrintDoc.push(_this.fb.group({
                    IsChecked: false,
                    DocName: y.DataSource,
                    DocType: 3,
                    DocTypeName: 'เอกสารแนบภายใน'
                }));
            });
        });
    };
    PrintDocModalComponent.prototype.sortPrintDoc = function () {
        this.sort = (this.sort == 'asc' ? 'desc' : 'asc');
        this.PrintDoc.value.sort(function (a, b) {
            return -1; // asc
        });
    };
    PrintDocModalComponent.prototype.onPrint = function () {
        var _this = this;
        var _print = this.PrintDoc.value.filter(function (x) { return x.IsChecked == true && x.DocType == 0; });
        if (_print.length) {
            this.s_arrest.ArrestReportgetByCon(this.ArrestCode)
                .subscribe(function (x) {
                var blob = new Blob([x], { type: "application/pdf" });
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = _this.ArrestCode + ".pdf";
                link.click();
            });
        }
    };
    PrintDocModalComponent.prototype.dismiss = function (e) {
        this.d.emit(e);
    };
    PrintDocModalComponent.prototype.close = function (e) {
        this.c.emit(e);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", String)
    ], PrintDocModalComponent.prototype, "ArrestCode", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
        __metadata("design:type", Object)
    ], PrintDocModalComponent.prototype, "d", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
        __metadata("design:type", Object)
    ], PrintDocModalComponent.prototype, "c", void 0);
    PrintDocModalComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-print-doc-modal',
            template: __webpack_require__("./src/app/pages/arrests/components/print-doc-modal/print-doc-modal.component.html"),
            styles: [__webpack_require__("./src/app/pages/arrests/components/print-doc-modal/print-doc-modal.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_services_main_master_service__["a" /* MainMasterService */],
            __WEBPACK_IMPORTED_MODULE_3__services__["j" /* ArrestService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormBuilder */]])
    ], PrintDocModalComponent);
    return PrintDocModalComponent;
}());



/***/ }),

/***/ "./src/app/pages/arrests/services/arrest-indictment-detail.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArrestIndictmentDetailService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_app_config__ = __webpack_require__("./src/app/app.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_core_http_service__ = __webpack_require__("./src/app/core/http.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ArrestIndictmentDetailService = /** @class */ (function () {
    function ArrestIndictmentDetailService(http, httpClient) {
        this.http = http;
        this.httpClient = httpClient;
        this.httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpHeaders */]({
                'Content-Type': 'application/json'
            })
        };
    }
    ArrestIndictmentDetailService.prototype.ArrestIndicmentDetailgetByIndictmentID = function (IndictmentID) {
        var params = { IndictmentID: IndictmentID };
        var url = __WEBPACK_IMPORTED_MODULE_1_app_app_config__["a" /* appConfig */].api7788 + "/ArrestIndicmentDetailgetByIndictmentID";
        return this.httpClient.post(url, params, this.httpOptions).toPromise();
    };
    ArrestIndictmentDetailService.prototype.ArrestIndicmentDetailgetByCon = function (IndictmentDetailID) {
        var params = { IndictmentDetailID: IndictmentDetailID };
        var url = __WEBPACK_IMPORTED_MODULE_1_app_app_config__["a" /* appConfig */].api7788 + "/ArrestIndicmentDetailgetByCon";
        return this.http.post(url, params).map(function (x) { return x.json(); });
    };
    ArrestIndictmentDetailService.prototype.ArrestIndicmentDetailinsAll = function (IndictmentDetail) {
        var params = IndictmentDetail;
        var url = __WEBPACK_IMPORTED_MODULE_1_app_app_config__["a" /* appConfig */].api7788 + "/ArrestIndicmentDetailinsAll";
        return this.httpClient.post(url, params, this.httpOptions).toPromise();
    };
    ArrestIndictmentDetailService.prototype.ArrestIndicmentDetailupdByCon = function (IndictmentDetail) {
        var params = IndictmentDetail;
        var url = __WEBPACK_IMPORTED_MODULE_1_app_app_config__["a" /* appConfig */].api7788 + "/ArrestIndicmentDetailupdByCon";
        return this.http.post(url, params).map(function (x) { return x.json(); });
    };
    ArrestIndictmentDetailService.prototype.ArrestIndicmentDetailupdDelete = function (IndictmentDetailID) {
        var params = { IndictmentDetailID: IndictmentDetailID };
        var url = __WEBPACK_IMPORTED_MODULE_1_app_app_config__["a" /* appConfig */].api7788 + "/ArrestIndicmentDetailupdDelete";
        return this.http.post(url, params).map(function (x) { return x.json(); });
    };
    ArrestIndictmentDetailService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_app_core_http_service__["a" /* HttpService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClient */]])
    ], ArrestIndictmentDetailService);
    return ArrestIndictmentDetailService;
}());



/***/ }),

/***/ "./src/app/pages/arrests/services/arrest-indictment.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArrestIndictmentService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_core_http_service__ = __webpack_require__("./src/app/core/http.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_app_config__ = __webpack_require__("./src/app/app.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
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




var ArrestIndictmentService = /** @class */ (function () {
    function ArrestIndictmentService(http, httpClient) {
        this.http = http;
        this.httpClient = httpClient;
        this.httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpHeaders */]({
                'Content-Type': 'application/json'
            })
        };
    }
    ArrestIndictmentService.prototype.resposePromisGetList = function (params, url) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1:
                        res = _a.sent();
                        if (!res.length || res.IsSuccess == 'False') {
                            return [2 /*return*/, []];
                        }
                        return [2 /*return*/, res];
                }
            });
        });
    };
    ArrestIndictmentService.prototype.ArrestIndictmentgetByArrestCode = function (ArrestCode) {
        var params = { ArrestCode: ArrestCode };
        var url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api7788 + "/ArrestIndictmentgetByArrestCode";
        return this.httpClient.post(url, params, this.httpOptions).toPromise();
    };
    ArrestIndictmentService.prototype.ArrestIndictmentgetByCon = function (IndictmentID) {
        var params = { IndictmentID: IndictmentID };
        var url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api7788 + "/ArrestIndictmentgetByCon";
        return this.resposePromisGetList(JSON.stringify(params), url);
    };
    ArrestIndictmentService.prototype.ArrestIndictmentinsAll = function (Indictment) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = Indictment;
                        url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api7788 + "/ArrestIndictmentinsAll";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ArrestIndictmentService.prototype.ArrestIndictmentProductinsAll = function (indictment) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = indictment;
                        url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api7788 + "/ArrestIndictmentProductinsAll";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ArrestIndictmentService.prototype.ArrestIndictmentProductgetByIndictmentID = function (IndictmentID) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = { IndictmentID: IndictmentID };
                        url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api7788 + "/ArrestIndictmentProductgetByIndictmentID";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ArrestIndictmentService.prototype.ArrestIndictmentupdByCon = function (Indictment) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = Indictment;
                        url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api7788 + "/ArrestIndictmentupdByCon";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ArrestIndictmentService.prototype.ArrestIndictmentupdDelete = function (IndictmentID) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = { IndictmentID: IndictmentID };
                        url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api7788 + "/ArrestIndictmentupdDelete";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ArrestIndictmentService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_core_http_service__["a" /* HttpService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClient */]])
    ], ArrestIndictmentService);
    return ArrestIndictmentService;
}());



/***/ }),

/***/ "./src/app/pages/arrests/services/arrest-law-guiltbase.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArrestLawGuiltbaseService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_core_http_service__ = __webpack_require__("./src/app/core/http.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_app_config__ = __webpack_require__("./src/app/app.config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ArrestLawGuiltbaseService = /** @class */ (function () {
    function ArrestLawGuiltbaseService(http) {
        this.http = http;
    }
    ArrestLawGuiltbaseService.prototype.ArrestLawGuiltbasegetByKeyword = function (Textsearch) {
        var params = Textsearch === '' ? { 'Textsearch': '' } : Textsearch;
        var url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api7788 + "/ArrestLawGuiltbasegetByKeyword";
        return this.http.post(url, params).map(function (x) { return x.json(); });
    };
    ArrestLawGuiltbaseService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_core_http_service__["a" /* HttpService */]])
    ], ArrestLawGuiltbaseService);
    return ArrestLawGuiltbaseService;
}());



/***/ }),

/***/ "./src/app/pages/arrests/services/arrest-law-suit.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArrestLawSuitService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_app_config__ = __webpack_require__("./src/app/app.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_core_http_service__ = __webpack_require__("./src/app/core/http.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ArrestLawSuitService = /** @class */ (function () {
    function ArrestLawSuitService(http, httpClient) {
        this.http = http;
        this.httpClient = httpClient;
        this.httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpHeaders */]({
                'Content-Type': 'application/json'
            })
        };
    }
    ArrestLawSuitService.prototype.ArrestLawsuitgetByLawbreakerID = function (LawbreakerID) {
        var params = { LawbreakerID: LawbreakerID };
        var url = __WEBPACK_IMPORTED_MODULE_1_app_app_config__["a" /* appConfig */].api7788 + "/ArrestLawsuitgetByLawbreakerID";
        return this.httpClient.post(url, params, this.httpOptions).toPromise();
    };
    ArrestLawSuitService.prototype.ArrestLawsuitgetByIndictmentID = function (IndictmentID) {
        var params = { IndictmentID: IndictmentID };
        var url = __WEBPACK_IMPORTED_MODULE_1_app_app_config__["a" /* appConfig */].api7788 + "/ArrestLawsuitgetByIndictmentID";
        return this.httpClient.post(url, params, this.httpOptions).toPromise();
    };
    ArrestLawSuitService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_app_core_http_service__["a" /* HttpService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClient */]])
    ], ArrestLawSuitService);
    return ArrestLawSuitService;
}());



/***/ }),

/***/ "./src/app/pages/arrests/services/arrest-law.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArrestLawService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ArrestLawService = /** @class */ (function () {
    function ArrestLawService() {
    }
    ArrestLawService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])()
    ], ArrestLawService);
    return ArrestLawService;
}());



/***/ }),

/***/ "./src/app/pages/arrests/services/arrest-lawbreaker.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArrestLawbreakerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_core_http_service__ = __webpack_require__("./src/app/core/http.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_app_config__ = __webpack_require__("./src/app/app.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ArrestLawbreakerService = /** @class */ (function () {
    function ArrestLawbreakerService(http, httpClient) {
        this.http = http;
        this.httpClient = httpClient;
        this.httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpHeaders */]({
                'Content-Type': 'application/json'
            })
        };
    }
    ArrestLawbreakerService.prototype.ArrestLawbreakerinsAll = function (ArrestLawbreaker) {
        var params = ArrestLawbreaker;
        var url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api7788 + "/ArrestLawbreakerinsAll";
        return this.httpClient.post(url, params, this.httpOptions).toPromise();
    };
    ArrestLawbreakerService.prototype.ArrestLawbreakerupdByCon = function (ArrestLawbreaker) {
        var params = ArrestLawbreaker;
        var url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api7788 + "/ArrestLawbreakerupdByCon";
        return this.http.post(url, params).map(function (x) { return x.json(); });
    };
    ArrestLawbreakerService.prototype.ArrestLawbreakerupdDelete = function (LawbreakerID) {
        var params = { LawbreakerID: LawbreakerID };
        var url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api7788 + "/ArrestLawbreakerupdDelete";
        return this.http.post(url, params).map(function (x) { return x.json(); });
    };
    ArrestLawbreakerService.prototype.ArrestMasLawbreakergetByCon = function (LawbreakerID) {
        var params = { LawbreakerID: LawbreakerID };
        var url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api7788 + "/ArrestMasLawbreakergetByCon";
        return this.httpClient.post(url, params, this.httpOptions).toPromise();
    };
    ArrestLawbreakerService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_core_http_service__["a" /* HttpService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClient */]])
    ], ArrestLawbreakerService);
    return ArrestLawbreakerService;
}());



/***/ }),

/***/ "./src/app/pages/arrests/services/arrest-mas-lawbreaker.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArrestMasLawbreakerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_core_http_service__ = __webpack_require__("./src/app/core/http.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_app_config__ = __webpack_require__("./src/app/app.config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ArrestMasLawbreakerService = /** @class */ (function () {
    function ArrestMasLawbreakerService(http) {
        this.http = http;
    }
    ArrestMasLawbreakerService.prototype.ArrestMasLawbreakergetByKeyword = function (Textsearch) {
        var params = Textsearch === '' ? { 'Textsearch': '' } : Textsearch;
        var url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api7788 + "/ArrestMasLawbreakergetByKeyword";
        return this.http.post(url, params).map(function (x) { return x.json(); });
    };
    ArrestMasLawbreakerService.prototype.ArrestMasLawbreakergetByConAdv = function (form) {
        var params = form;
        var url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api7788 + "/ArrestMasLawbreakergetByConAdv";
        return this.http.post(url, params).map(function (x) { return x.json(); });
    };
    ArrestMasLawbreakerService.prototype.ArrestMasLawbreakergetByCon = function (LawbreakerID) {
        var params = { LawbreakerID: LawbreakerID };
        var url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api7788 + "/ArrestMasLawbreakergetByCon";
        return this.http.post(url, params).map(function (x) { return x.json(); });
    };
    ArrestMasLawbreakerService.prototype.ArrestMasLawbreakerinsAll = function (Lawbreaker) {
        var params = Lawbreaker;
        var url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api7788 + "/ArrestMasLawbreakerinsAll";
        return this.http.post(url, params).map(function (x) { return x.json(); });
    };
    ArrestMasLawbreakerService.prototype.ArrestMasLawbreakerupdByCon = function (Lawbreaker) {
        var params = Lawbreaker;
        var url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api7788 + "/ArrestMasLawbreakerupdByCon";
        return this.http.post(url, params).map(function (x) { return x.json(); });
    };
    ArrestMasLawbreakerService.prototype.ArrestLawsuitResultCountgetByLawbreakerID = function (LawbreakerID) {
        var params = { LawbreakerID: LawbreakerID };
        var url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api7788 + "/ArrestLawsuitResultCountgetByLawbreakerID";
        return this.http.post(url, params).map(function (x) { return x.json()[0].ResultCount; });
    };
    ArrestMasLawbreakerService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_core_http_service__["a" /* HttpService */]])
    ], ArrestMasLawbreakerService);
    return ArrestMasLawbreakerService;
}());



/***/ }),

/***/ "./src/app/pages/arrests/services/arrest-notice.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArrestNoticeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_app_config__ = __webpack_require__("./src/app/app.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_core_http_service__ = __webpack_require__("./src/app/core/http.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
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




var ArrestNoticeService = /** @class */ (function () {
    function ArrestNoticeService(http, httpClient) {
        this.http = http;
        this.httpClient = httpClient;
        this.httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpHeaders */]({
                'Content-Type': 'application/json'
            })
        };
    }
    ArrestNoticeService.prototype.ArrestNoticegetByKeyword = function (Textsearch) {
        var params = Textsearch === '' ? { 'Textsearch': '' } : Textsearch;
        var url = __WEBPACK_IMPORTED_MODULE_1_app_app_config__["a" /* appConfig */].api7788 + "/ArrestNoticegetByKeyword";
        return this.http.post(url, params).map(function (x) { return x.json(); });
    };
    ArrestNoticeService.prototype.ArrestNoticegetByConAdv = function (form) {
        debugger;
        var params = form;
        var url = __WEBPACK_IMPORTED_MODULE_1_app_app_config__["a" /* appConfig */].api7788 + "/ArrestNoticegetByConAdv";
        return this.http.post(url, params).map(function (x) { return x.json() || []; });
    };
    ArrestNoticeService.prototype.ArrestNoticeupdByCon = function (ArrestCode, NoticeCode) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = { NoticeCode: NoticeCode, ArrestCode: ArrestCode };
                        url = __WEBPACK_IMPORTED_MODULE_1_app_app_config__["a" /* appConfig */].api7788 + "/ArrestNoticeupdByCon";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ArrestNoticeService.prototype.ArrestNoticeupdDelete = function (NoticeCode) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = { NoticeCode: NoticeCode };
                        url = __WEBPACK_IMPORTED_MODULE_1_app_app_config__["a" /* appConfig */].api7788 + "/ArrestNoticeupdDelete";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ArrestNoticeService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_app_core_http_service__["a" /* HttpService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClient */]])
    ], ArrestNoticeService);
    return ArrestNoticeService;
}());



/***/ }),

/***/ "./src/app/pages/arrests/services/arrest-product-detail.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArrestProductDetailService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_app_config__ = __webpack_require__("./src/app/app.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_core_http_service__ = __webpack_require__("./src/app/core/http.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ArrestProductDetailService = /** @class */ (function () {
    function ArrestProductDetailService(http, httpClient) {
        this.http = http;
        this.httpClient = httpClient;
        this.httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpHeaders */]({
                'Content-Type': 'application/json'
            })
        };
    }
    ArrestProductDetailService.prototype.ArrestProductDetailinsAll = function (ArrestProductDetail) {
        var params = ArrestProductDetail;
        var url = __WEBPACK_IMPORTED_MODULE_1_app_app_config__["a" /* appConfig */].api7788 + "/ArrestProductDetailinsAll";
        return this.httpClient.post(url, params, this.httpOptions).toPromise();
    };
    ArrestProductDetailService.prototype.ArrestProductDetailupdByCon = function (ArrestProductDetail) {
        var params = ArrestProductDetail;
        var url = __WEBPACK_IMPORTED_MODULE_1_app_app_config__["a" /* appConfig */].api7788 + "/ArrestProductDetailupdByCon";
        return this.http.post(url, params).map(function (x) { return x.json(); });
    };
    ArrestProductDetailService.prototype.ArrestProductDetailupdDelete = function (ProductDetailID) {
        var params = { ProductDetailID: ProductDetailID };
        var url = __WEBPACK_IMPORTED_MODULE_1_app_app_config__["a" /* appConfig */].api7788 + "/ArrestProductDetailupdDelete";
        return this.http.post(url, params).map(function (x) { return x.json(); });
    };
    ArrestProductDetailService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_app_core_http_service__["a" /* HttpService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClient */]])
    ], ArrestProductDetailService);
    return ArrestProductDetailService;
}());



/***/ }),

/***/ "./src/app/pages/arrests/services/arrest-product.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArrestProductService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_core_http_service__ = __webpack_require__("./src/app/core/http.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_app_config__ = __webpack_require__("./src/app/app.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ArrestProductService = /** @class */ (function () {
    function ArrestProductService(http, httpClient) {
        this.http = http;
        this.httpClient = httpClient;
        this.httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpHeaders */]({
                'Content-Type': 'application/json'
            })
        };
    }
    ArrestProductService.prototype.ArrestProductgetByArrestCode = function (ArrestCode) {
        var params = { ArrestCode: ArrestCode };
        var url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api7788 + "/ArrestProductgetByArrestCode";
        return this.httpClient.post(url, params, this.httpOptions).toPromise();
    };
    ArrestProductService.prototype.ArrestProductinsAll = function (ArrestProduct) {
        var params = ArrestProduct;
        var url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api7788 + "/ArrestProductinsAll";
        return this.httpClient.post(url, params, this.httpOptions).toPromise();
    };
    ArrestProductService.prototype.ArrestProductupdByCon = function (ArrestProduct) {
        var params = ArrestProduct;
        var url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api7788 + "/ArrestProductupdByCon";
        return this.httpClient.post(url, params, this.httpOptions).toPromise();
    };
    ArrestProductService.prototype.ArrestProductupdDelete = function (ProductID) {
        var params = { ProductID: ProductID };
        var url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api7788 + "/ArrestProductupdDelete";
        return this.httpClient.post(url, params, this.httpOptions).toPromise();
    };
    ArrestProductService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_core_http_service__["a" /* HttpService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClient */]])
    ], ArrestProductService);
    return ArrestProductService;
}());



/***/ }),

/***/ "./src/app/pages/arrests/services/arrest-staff.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArrestStaffService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_app_config__ = __webpack_require__("./src/app/app.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_core_http_service__ = __webpack_require__("./src/app/core/http.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
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




var ArrestStaffService = /** @class */ (function () {
    function ArrestStaffService(http, httpClient) {
        this.http = http;
        this.httpClient = httpClient;
        this.httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpHeaders */]({
                'Content-Type': 'application/json'
            })
        };
    }
    ArrestStaffService.prototype.ArrestStaffinsAll = function (ArrestStaff) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = ArrestStaff;
                        url = __WEBPACK_IMPORTED_MODULE_1_app_app_config__["a" /* appConfig */].api7788 + "/ArrestStaffinsAll";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ArrestStaffService.prototype.ArrestStaffupdByCon = function (ArrestStaff) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = ArrestStaff;
                        url = __WEBPACK_IMPORTED_MODULE_1_app_app_config__["a" /* appConfig */].api7788 + "/ArrestStaffupdByCon";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ArrestStaffService.prototype.ArrestStaffupdDelete = function (StaffID) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = { StaffID: StaffID };
                        url = __WEBPACK_IMPORTED_MODULE_1_app_app_config__["a" /* appConfig */].api7788 + "/ArrestStaffupdDelete";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ArrestStaffService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_app_core_http_service__["a" /* HttpService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClient */]])
    ], ArrestStaffService);
    return ArrestStaffService;
}());



/***/ }),

/***/ "./src/app/pages/arrests/services/arrest.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArrestService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_app_config__ = __webpack_require__("./src/app/app.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_core_http_service__ = __webpack_require__("./src/app/core/http.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_core_loader_loader_service__ = __webpack_require__("./src/app/core/loader/loader.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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






var ArrestService = /** @class */ (function () {
    function ArrestService(http, httpClient, loaderService) {
        this.http = http;
        this.httpClient = httpClient;
        this.loaderService = loaderService;
        this.version = '0.0.0.38';
        this.httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["d" /* HttpHeaders */]({ 'Content-Type': 'application/json' })
        };
    }
    ArrestService.prototype.onEnd = function () {
        this.hideLoader();
    };
    ArrestService.prototype.showLoader = function () {
        this.loaderService.show();
    };
    ArrestService.prototype.hideLoader = function () {
        this.loaderService.hide();
    };
    ArrestService.prototype.onSuccess = function (res) {
        console.log('Request successful');
    };
    ArrestService.prototype.onError = function (res) {
        console.log('Error, status code: ' + res.status);
    };
    ArrestService.prototype.onCatch = function (error, caught) {
        return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["a" /* Observable */].throw(error);
    };
    ArrestService.prototype.ArrestReportgetByCon = function (ArrestCode) {
        var _this = this;
        var params = { ArrestCode: ArrestCode };
        var url = __WEBPACK_IMPORTED_MODULE_1_app_app_config__["a" /* appConfig */].apiReport + "/ArrestgetByCon.aspx";
        this.showLoader();
        return this.httpClient.post(url, params, __assign({}, this.httpOptions, { responseType: 'blob' }))
            .catch(this.onCatch)
            .do(function (res) {
            _this.onSuccess(res);
        }, function (error) {
            _this.onError(error);
        })
            .map(function (x) { return x; })
            .finally(function () { return _this.onEnd(); });
    };
    ArrestService.prototype.ArrestgetByKeyword = function (Textsearch) {
        var params = Textsearch === '' ? { 'Textsearch': '' } : Textsearch;
        var url = __WEBPACK_IMPORTED_MODULE_1_app_app_config__["a" /* appConfig */].api7788 + "/ArrestgetByKeyword";
        return this.http.post(url, params).map(function (x) { return x.json(); });
    };
    ArrestService.prototype.ArrestgetByCon = function (ArrestCode) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = { ArrestCode: ArrestCode };
                        url = __WEBPACK_IMPORTED_MODULE_1_app_app_config__["a" /* appConfig */].api7788 + "/ArrestgetByCon";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ArrestService.prototype.ArrestgetByConAdv = function (form) {
        var params = form;
        var url = __WEBPACK_IMPORTED_MODULE_1_app_app_config__["a" /* appConfig */].api7788 + "/ArrestgetByConAdv";
        return this.http.post(url, params).map(function (x) { return x.json(); });
    };
    ArrestService.prototype.ArrestinsAll = function (Arrest) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = Arrest;
                        url = __WEBPACK_IMPORTED_MODULE_1_app_app_config__["a" /* appConfig */].api7788 + "/ArrestinsAll";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ArrestService.prototype.ArrestupdByCon = function (Arrest) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = Arrest;
                        url = __WEBPACK_IMPORTED_MODULE_1_app_app_config__["a" /* appConfig */].api7788 + "/ArrestupdByCon";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ArrestService.prototype.ArrestupdDelete = function (ArrestCode) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = { ArrestCode: ArrestCode };
                        url = __WEBPACK_IMPORTED_MODULE_1_app_app_config__["a" /* appConfig */].api7788 + "/ArrestupdDelete";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ArrestService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_app_core_http_service__["a" /* HttpService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_4_app_core_loader_loader_service__["a" /* LoaderService */]])
    ], ArrestService);
    return ArrestService;
}());



/***/ }),

/***/ "./src/app/pages/arrests/services/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return services; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__arrest_service__ = __webpack_require__("./src/app/pages/arrests/services/arrest.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__arrest_staff_service__ = __webpack_require__("./src/app/pages/arrests/services/arrest-staff.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__arrest_product_service__ = __webpack_require__("./src/app/pages/arrests/services/arrest-product.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__arrest_product_detail_service__ = __webpack_require__("./src/app/pages/arrests/services/arrest-product-detail.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__arrest_notice_service__ = __webpack_require__("./src/app/pages/arrests/services/arrest-notice.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__arrest_mas_lawbreaker_service__ = __webpack_require__("./src/app/pages/arrests/services/arrest-mas-lawbreaker.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__arrest_law_service__ = __webpack_require__("./src/app/pages/arrests/services/arrest-law.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__arrest_lawbreaker_service__ = __webpack_require__("./src/app/pages/arrests/services/arrest-lawbreaker.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__arrest_law_suit_service__ = __webpack_require__("./src/app/pages/arrests/services/arrest-law-suit.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__arrest_law_guiltbase_service__ = __webpack_require__("./src/app/pages/arrests/services/arrest-law-guiltbase.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__arrest_indictment_service__ = __webpack_require__("./src/app/pages/arrests/services/arrest-indictment.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__arrest_indictment_detail_service__ = __webpack_require__("./src/app/pages/arrests/services/arrest-indictment-detail.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_0__arrest_service__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_1__arrest_staff_service__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_2__arrest_product_service__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_3__arrest_product_detail_service__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_4__arrest_notice_service__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_5__arrest_mas_lawbreaker_service__["a"]; });
/* unused harmony namespace reexport */
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_7__arrest_lawbreaker_service__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_8__arrest_law_suit_service__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_9__arrest_law_guiltbase_service__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_10__arrest_indictment_service__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_11__arrest_indictment_detail_service__["a"]; });












var services = [
    __WEBPACK_IMPORTED_MODULE_0__arrest_service__["a" /* ArrestService */],
    __WEBPACK_IMPORTED_MODULE_1__arrest_staff_service__["a" /* ArrestStaffService */],
    __WEBPACK_IMPORTED_MODULE_2__arrest_product_service__["a" /* ArrestProductService */],
    __WEBPACK_IMPORTED_MODULE_3__arrest_product_detail_service__["a" /* ArrestProductDetailService */],
    __WEBPACK_IMPORTED_MODULE_4__arrest_notice_service__["a" /* ArrestNoticeService */],
    __WEBPACK_IMPORTED_MODULE_5__arrest_mas_lawbreaker_service__["a" /* ArrestMasLawbreakerService */],
    __WEBPACK_IMPORTED_MODULE_7__arrest_lawbreaker_service__["a" /* ArrestLawbreakerService */],
    __WEBPACK_IMPORTED_MODULE_6__arrest_law_service__["a" /* ArrestLawService */],
    __WEBPACK_IMPORTED_MODULE_8__arrest_law_suit_service__["a" /* ArrestLawSuitService */],
    __WEBPACK_IMPORTED_MODULE_9__arrest_law_guiltbase_service__["a" /* ArrestLawGuiltbaseService */],
    __WEBPACK_IMPORTED_MODULE_10__arrest_indictment_service__["a" /* ArrestIndictmentService */],
    __WEBPACK_IMPORTED_MODULE_11__arrest_indictment_detail_service__["a" /* ArrestIndictmentDetailService */]
];














/***/ }),

/***/ "./src/app/pages/arrests/store/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions__ = __webpack_require__("./src/app/pages/arrests/store/actions/index.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__actions__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__actions__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__reducers__ = __webpack_require__("./src/app/pages/arrests/store/reducers/index.ts");
/* unused harmony namespace reexport */




/***/ }),

/***/ "./src/app/pages/component/modal-offense/modal-offense.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header bg-theme\">\r\n  <h4 class=\"modal-title text-white\">รายละเอียดการกระทำผิด</h4>\r\n  <a href=\"javaScript:void(0);\" class=\"close text-white font-14\" aria-label=\"Close\" (click)=\"dismiss('Cross click')\">\r\n      <span aria-hidden=\"true\">\r\n          <i class=\" ti-close\"></i>\r\n      </span>\r\n  </a>\r\n</div>\r\n<div class=\"modal-body font-14\">\r\n  <div class=\"card p-0 unset-radius\">\r\n      <div class=\"card-body p-0\">\r\n\r\n          <table class=\"table table-sm table-striped\">\r\n              <thead>\r\n                  <tr>\r\n                      <th class=\"text-center\">ลำดับ</th>\r\n                      <th>เลขที่รับ</th>\r\n                      <th>มาตรา</th>\r\n                      <th>ข้อ</th>\r\n                      <th>ข้อกล่าวหา</th>\r\n                      <th>สถานที่จับกุม</th>\r\n                      <th>หน่วยงาน</th>\r\n                      <th>วันที่จับกุม</th>\r\n                  </tr>\r\n              </thead>\r\n              <tbody>\r\n                  <tr>\r\n                      <td class=\"text-center\"></td>\r\n                      <td>1</td>\r\n                      <td>1</td>\r\n                      <td>1</td>\r\n                      <td>1</td>\r\n                      <td>1</td>\r\n                      <td>1</td>\r\n                      <td>1</td>\r\n                  </tr>\r\n              </tbody>\r\n          </table>\r\n      </div>\r\n      <div class=\"card-footer card-footer-unset\">\r\n          <div class=\"row justify-content-between m-l-5\">\r\n              <div clas=\"col\">\r\n                  <a class=\"icn-pagination\"> |<< </a>\r\n                          <label> หน้าที่\r\n                              <select>\r\n                                  <option value=\"1\">1</option>\r\n                                  <option value=\"2\">2</option>\r\n                              </select> จาก 2 หน้า</label>\r\n                          <a class=\"icn-pagination m-r-10\"> >>| </a>\r\n                          รายการที่ 1 - 5 จาก 5 รายการ\r\n              </div>\r\n              <div class=\"col col-lg-3 text-right\">\r\n                  <label>แสดง\r\n                      <select>\r\n                          <option>5</option>\r\n                          <option>10</option>\r\n                          <option>15</option>\r\n                          <option>20</option>\r\n                      </select> รายการ</label>\r\n              </div>\r\n          </div>\r\n      </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/pages/component/modal-offense/modal-offense.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/component/modal-offense/modal-offense.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalOffenseComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ModalOffenseComponent = /** @class */ (function () {
    function ModalOffenseComponent() {
        this.d = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.c = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
    }
    ModalOffenseComponent.prototype.ngOnInit = function () {
    };
    ModalOffenseComponent.prototype.dismiss = function (e) {
        this.d.emit(e);
    };
    ModalOffenseComponent.prototype.close = function (e) {
        this.c.emit(e);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
        __metadata("design:type", Object)
    ], ModalOffenseComponent.prototype, "d", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
        __metadata("design:type", Object)
    ], ModalOffenseComponent.prototype, "c", void 0);
    ModalOffenseComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-modal-offense',
            template: __webpack_require__("./src/app/pages/component/modal-offense/modal-offense.component.html"),
            styles: [__webpack_require__("./src/app/pages/component/modal-offense/modal-offense.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ModalOffenseComponent);
    return ModalOffenseComponent;
}());



/***/ }),

/***/ "./src/app/pages/component/modal-offense/modal-offense.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalOffenseModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modal_offense_component__ = __webpack_require__("./src/app/pages/component/modal-offense/modal-offense.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ModalOffenseModule = /** @class */ (function () {
    function ModalOffenseModule() {
    }
    ModalOffenseModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__modal_offense_component__["a" /* ModalOffenseComponent */]],
            exports: [__WEBPACK_IMPORTED_MODULE_2__modal_offense_component__["a" /* ModalOffenseComponent */]]
        })
    ], ModalOffenseModule);
    return ModalOffenseModule;
}());



/***/ })

});
//# sourceMappingURL=arrest.module.chunk.js.map
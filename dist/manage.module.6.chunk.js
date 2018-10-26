webpackJsonp(["manage.module.6"],{

/***/ "./src/app/pages/lawsuit/manage/manage.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-template #printDocModal let-c=\"close\" let-d=\"dismiss\">\r\n    <app-print-lawsuit-modal (c)=\"modal.close()\" (d)=\"modal.dismiss()\"></app-print-lawsuit-modal>\r\n  </ng-template>\r\n  \r\n  <div class=\"wizard-content\">\r\n    <div class=\"wizard-circle wizard clearfix clearfix\">\r\n      <div class=\"steps tab-wizard\">\r\n        <ul role=\"tablist\">\r\n          <li role=\"tab\" class=\"current\" aria-disabled=\"false\" aria-selected=\"true\">\r\n            <a>\r\n              <span class=\"current-info audible\">current step: </span>\r\n              <span class=\"step\"></span> 1. ใบแจ้งความนำจับ</a>\r\n          </li>\r\n          <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n            <a>\r\n              <span class=\"step\"></span> 2. งานจับกุม </a>\r\n          </li>\r\n          <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n            <a>\r\n              <span class=\"step\"></span> 3. รับคำกล่าวโทษ </a>\r\n          </li>\r\n          <li role=\"tab\" class=\"disabled last\" aria-disabled=\"true\">\r\n            <a>\r\n              <span class=\"step\"></span> 4. งานตรวจรับและพิสูจน์ของกลาง </a>\r\n          </li>\r\n          <li role=\"tab\" class=\"disabled last\" aria-disabled=\"true\">\r\n            <a>\r\n              <span class=\"step\"></span> 5. งานเปรียบเทียบและชำระค่าปรับ </a>\r\n          </li>\r\n          <li role=\"tab\" class=\"disabled last\" aria-disabled=\"true\">\r\n            <a>\r\n              <span class=\"step\"></span> 6. นำส่งเงินรายได้ </a>\r\n          </li>\r\n          <li role=\"tab\" class=\"disabled last\" aria-disabled=\"true\">\r\n            <a>\r\n              <span class=\"step\"></span> 7. คำร้องขอรับเงินสินบนรางวัล </a>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"card card-outline-bluish unset-radius\">\r\n    <div class=\"card-header unset-radius\">\r\n      <app-card-actions-collapse></app-card-actions-collapse>\r\n      <h5 class=\"card-title m-b-0\">ข้อมูลการจับกุม</h5>\r\n    </div>\r\n    <div class=\"card-body\" *ngIf=\"lawsuitList\">\r\n      <div class=\"form-body\" *ngFor=\"let item of lawsuitList\">\r\n        <div class=\"row\">\r\n          <div class=\"col-md-6\">\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-form-label text-right col-md-3\">เลขที่ใบงาน : </label>\r\n              <div class=\"col-md-9\">\r\n                <input class=\"form-control\" type=\"text\" [(ngModel)]=\"item.ArrestCode\" name=\"ArrestCode\" disabled>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-6\">\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-form-label text-right col-md-3\">วันที่จับกุม : </label>\r\n              <div class=\"col-md-4\">\r\n                <input class=\"form-control\" type=\"text\" [(ngModel)]=\"item.OccurrenceDate\" name=\"OccurrenceDate\" disabled>\r\n              </div>\r\n              <label class=\"col-form-label text-center col-md-2\">เวลา</label>\r\n              <div class=\"col-md-3\">\r\n                <input class=\"form-control\" type=\"text\" [(ngModel)]=\"item.OccurrenceTime\" name=\"OccurrenceTime\" disabled>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"row\">\r\n          <div class=\"col-md-6\">\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-form-label text-right col-md-3\">เขียนที่ : </label>\r\n              <div class=\"col-md-9\">\r\n                <input class=\"form-control\" type=\"text\" [(ngModel)]=\"item.ArrestStation\" name=\"ArrestStation\" disabled>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-6\">\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-form-label text-right col-md-3\">ผู้กล่าวหา : </label>\r\n              <div class=\"col-md-9\">\r\n                <input class=\"form-control\" type=\"text\" [(ngModel)]=\"(item.LawsuitArrestStaff[0] || {FullName: null}).FullName\" name=\"fullName\" disabled>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"row\">\r\n          <div class=\"col-md-6\">\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-form-label text-right col-md-3\">ตำแหน่ง : </label>\r\n              <div class=\"col-md-9\">\r\n                <input class=\"form-control\" type=\"text\" [(ngModel)]=\"(item.LawsuitArrestStaff[0] || {PositionName: null}).PositionName\" name=\"PositionName\" disabled>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-6\">\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-form-label text-right col-md-3\">หน่วยงาน : </label>\r\n              <div class=\"col-md-9\">\r\n                <input class=\"form-control\" type=\"text\" [(ngModel)]=\"(item.LawsuitArrestStaff[0] || {DepartmentName: null}).DepartmentName\" name=\"DepartmentName\" disabled>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"row\">\r\n          <div class=\"col-md-6\">\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-form-label text-right col-md-3\">ฐานความผิดมาตรา : </label>\r\n              <div class=\"col-md-9\">\r\n                <input class=\"form-control\" type=\"text\" [(ngModel)]=\"item.SubSectionType\" name=\"SubSectionType\" disabled>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-6\">\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-form-label text-right col-md-3\">ฐานความผิด : </label>\r\n              <div class=\"col-md-9\">\r\n                <input class=\"form-control\" type=\"text\" [(ngModel)]=\"item.GuiltBaseName\" name=\"GuiltBaseName\" disabled>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"row\">\r\n          <div class=\"col-md-6\">\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-form-label text-right col-md-3\">บทกำหนดโทษ : </label>\r\n              <div class=\"col-md-9\">\r\n                <input class=\"form-control\" type=\"text\" [(ngModel)]=\"item.SectionNo\" name=\"SectionNo\" disabled>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-6\">\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-form-label text-right col-md-3\">อัตราโทษ : </label>\r\n              <div class=\"col-md-9\">\r\n                <input class=\"form-control\" type=\"text\" [(ngModel)]=\"item.PenaltyDesc\" name=\"PenaltyDesc\" disabled>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"card card-outline-bluish unset-radius\">\r\n    <div class=\"card-header unset-radius\">\r\n      <app-card-actions-collapse></app-card-actions-collapse>\r\n      <h5 class=\"card-title m-b-0\">รับคำกล่าวโทษ</h5>\r\n    </div>\r\n    <div class=\"card-body\" *ngIf=\"lawsuitList\">\r\n        <div class=\"form-body\" *ngFor=\"let item of lawsuitList\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-12\">\r\n                  \r\n                  <div class=\"form-group row\" >\r\n                    <div class=\"col-md-2\">\r\n                      <input class=\"form-check-input\" type=\"checkbox\" id=\"IsLawsuit\" name=\"IsLawsuit\" >\r\n                      <label class=\"col-form-label text-right\" for=\"defaultCheck1\">\r\n                          ไม่รับคดีเป็นเพราะ\r\n                      </label>\r\n                    </div>\r\n                    \r\n                    <div class=\"form-group col-md-10\">\r\n                        <input class=\"form-control\" type=\"text\" [(ngModel)]=\"item.ReasonDontLawsuit\" name=\"ReasonDontLawsuit\"  disabled>\r\n                    </div>\r\n                  </div>\r\n              </div>\r\n          </div>\r\n          <div class=\"row\">\r\n              <div class=\"col-md-12\">\r\n                  <div class=\"form-group row\">\r\n                    <div class=\"col-md-12\">\r\n                      <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"IsOutside\" name=\"IsOutside\" >\r\n                      <label class=\"col-form-label col-md-12\" for=\"defaultCheck1\">\r\n                          คดีรับคำกล่าวโทษนอกสถานที่ทำการ\r\n                      </label>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n          </div>\r\n          <div class=\"row\">\r\n              <div class=\"col-md-6\">\r\n                <div class=\"form-group row\">\r\n                  <label class=\"col-form-label text-right col-md-4\">เลขที่คดีรับคำกล่าวโทษ : </label>\r\n                  <div class=\"col-md-8\">\r\n                    <input class=\"form-control\" type=\"text\" [(ngModel)]=\"item.LawsuitNo\" name=\"LawsuitNo\" >\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-6\">\r\n                <div class=\"form-group row\">\r\n                  <label class=\"col-form-label text-right col-md-3\">วันที่รับคดี : </label>\r\n                  <div class=\"col-md-4\">\r\n                    <input class=\"form-control\" type=\"text\" [(ngModel)]=\"item.LawsuitDate\" name=\"LawsuitDate\" >\r\n                  </div>\r\n                  <label class=\"col-form-label text-center col-md-2\">เวลา</label>\r\n                  <div class=\"col-md-3\">\r\n                    <input class=\"form-control\" type=\"text\" [(ngModel)]=\"item.LawsuitTime\" name=\"LawsuitTime\" >\r\n                  </div>\r\n                </div>\r\n              </div>\r\n          </div>\r\n          <div class=\"row\">\r\n              <div class=\"col-md-6\">\r\n                <div class=\"form-group row\">\r\n                  <label class=\"col-form-label text-right col-md-3\">ผู้รับคดี : </label>\r\n                  <div class=\"col-md-9\">\r\n                    <input class=\"form-control\" type=\"text\" name=\"FullName\" >\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-6\">\r\n                <div class=\"form-group row\">\r\n                  <label class=\"col-form-label text-right col-md-3\">ตำแหน่ง : </label>\r\n                  <div class=\"col-md-9\">\r\n                    <input class=\"form-control\" type=\"text\" name=\"PositionName\" disabled>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"col-md-6\">\r\n                  <div class=\"form-group row\">\r\n                    <label class=\"col-form-label text-right col-md-3\">หน่วยงาน : </label>\r\n                    <div class=\"col-md-9\">\r\n                      <input class=\"form-control\" type=\"text\" name=\"DepartmentName\" disabled>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-md-6\">\r\n                  <div class=\"form-group row\">\r\n                    <label class=\"col-form-label text-right col-md-3\">เขียนที่ : </label>\r\n                    <div class=\"col-md-9\">\r\n                      <input class=\"form-control\" type=\"text\" [(ngModel)]=\"item.LawsuitStation\" name=\"LawsuitStation\" >\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                  <div class=\"col-md-12\">\r\n                    <div class=\"form-group row\">\r\n                      <label class=\"col-form-label text-right col-md-2\">คำให้การของผู้กล่าวโทษ : </label>\r\n                      <div class=\"col-md-10\">\r\n                        <textarea class=\"form-control\" rows=\"5\" [(ngModel)]=\"item.AccuserTestimony\" name=\"AccuserTestimony\" ></textarea>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n           \r\n          </div>\r\n  </div>\r\n      <div class=\"table-responsive table-striped\">\r\n        <table class=\"table\" *ngIf=\"!errorShow\">\r\n          <thead>\r\n            <tr>\r\n              <th class=\"footable-sortable text-center\">ลำดับ</th>\r\n              <th class=\"footable-sortable\">ชื่อผู้ต้องหา</th>\r\n              <th class=\"footable-sortable\">ลักษณะคดี</th>\r\n              <th class=\"footable-sortable\">คดีสิ้นสุดชั้น</th>\r\n              <th class=\"footable-sortable\">รายละเอียดของกลาง</th>\r\n              <th class=\"footable-sortable\"></th>\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr class=\"footable\" *ngFor=\"let item of lawsuitList; let i = index;\">\r\n              <td class=\"text-center\">{{item.RowsId}}</td>\r\n              <td>{{item.LawsuitNo}}</td>\r\n              <td>\r\n                <div *ngFor=\"let section of masLawGroupSectionList;\">{{section.SectionNo}}</div>\r\n              </td>\r\n              <td>\r\n                <div *ngFor=\"let guilt of masLawGuitBaseList;\">{{guilt.GuiltBaseName}}</div>\r\n              </td>\r\n              <td>{{item.IsLawsuitStatus}}</td>\r\n              <td>\r\n                <a href=\"javaScript:void(0);\" class=\"text-secondary\" (click)=\"viewData(item)\">\r\n                  <i class=\"mdi mdi-eye fa-lg\"></i>\r\n                </a>\r\n              </td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n  \r\n</div>"

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
        this.masOfficeList = [];
        this.masStaffList = [];
        this.lawsuitList = [];
        this.masLawGroupSectionList = [];
        this.masLawGuitBaseList = [];
        this.arrestList = [];
        this.setShowButton();
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
        // this.navService.setInnerTextNextPageButton('งานจับกุม')
    }
    ManageComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.sidebarService.setVersion('0.0.0.4');
                        // this.preLoaderService.setShowPreloader(true);
                        return [4 /*yield*/, this.getParamFromActiveRoute()];
                    case 1:
                        // this.preLoaderService.setShowPreloader(true);
                        _a.sent();
                        this.navigate_service();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.navigate_service = function () {
        var _this = this;
        this.onPrintSubscribe = this.navService.onPrint.subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
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
        this.onSaveSubscribe = this.navService.onSave.subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
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
    };
    ManageComponent.prototype.setShowButton = function () {
        this.navService.setPrintButton(false);
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
                        // LawsuitArrestgetByCon
                        return [4 /*yield*/, this.lawsuitService.LawsuitArrestGetByCon(params.IndictmentID).then(function (res) {
                                //console.log("params"+params.IndictmentID);
                                //console.log("RES"+(res.LawsuitArrestIndicment[0]));
                                _this.lawsuitList = res || [];
                                _this.lawsuitList.map(function (p) {
                                    //lawsuitList[0]['LawsuitArrestIndicment']['LawsuitLawGuiltbase']['LawsuitLawSubSectionRule']['LawsuitLawSubSection']['SubSectionType']
                                    p.SubSectionType = (_this.lawsuitList[0]['LawsuitArrestIndicment'][0]['LawsuitLawGuiltbase'][0]['LawsuitLawSubSectionRule'][0]['LawsuitLawSubSection'][0]['SubSectionType']);
                                    //console.log("P:"+p.SubSectionType);
                                    p.GuiltBaseName = (_this.lawsuitList[0]['LawsuitArrestIndicment'][0]['LawsuitLawGuiltbase'][0]['GuiltBaseName']);
                                    p.SectionNo = (_this.lawsuitList[0]['LawsuitArrestIndicment'][0]['LawsuitLawGuiltbase'][0]['LawsuitLawSubSectionRule'][0]['LawsuitLawSection'][0]['SectionNo']);
                                    p.PenaltyDesc = _this.lawsuitList[0]['LawsuitArrestIndicment'][0]['LawsuitLawGuiltbase'][0]['LawsuitLawSubSectionRule'][0]['LawsuitLawSection'][0]['LawsuitLawPenalty'][0]['PenaltyID'];
                                    p.OccurrenceDate = Object(__WEBPACK_IMPORTED_MODULE_0__config_dateFormat__["j" /* toLocalShort */])(p.OccurrenceDate);
                                    p.OccurrenceTime = Object(__WEBPACK_IMPORTED_MODULE_0__config_dateFormat__["k" /* toTimeShort */])(p.OccurrenceTime);
                                    p.LawsuitArrestStaff.map(function (staff) {
                                        //console.log("STAFF++++"+JSON.stringify(staff));
                                        staff.FullName = "" + staff.TitleName + staff.FirstName + " " + staff.LastName;
                                    });
                                });
                                if (res) {
                                    _this.lawsuitList.map(function (data, index) {
                                        data.RowsId = index + 1;
                                    });
                                    var IsLawsuitComplete = res[0]['IsLawsuitComplete'];
                                    console.log("ISLAWSUIT:" + _this.lawsuitList[0].IsLawsuit);
                                    if (IsLawsuitComplete == 1) {
                                        console.log("LAWSUIT COMPLETE = 1");
                                        _this.lawsuitService.MasDocumentMaingetAll(4, params.LawsuitID).then(function (docall) {
                                            console.log(JSON.stringify(docall));
                                        });
                                        var IsLawsuit = _this.lawsuitList[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['IsLawsuit'];
                                        _this.lawsuitList[0].IsLawsuit = IsLawsuit;
                                        var ReasonDontLawsuit = _this.lawsuitList[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['ReasonDontLawsuit'];
                                        _this.lawsuitList[0].ReasonDontLawsuit = ReasonDontLawsuit;
                                        var IsOutside = _this.lawsuitList[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['IsOutside'];
                                        _this.lawsuitList[0].IsOutside = IsOutside;
                                        var LawsuitNo = _this.lawsuitList[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitNo'];
                                        _this.lawsuitList[0].LawsuitNo = LawsuitNo;
                                        var LawsuitDate = _this.lawsuitList[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitDate'];
                                        _this.lawsuitList[0].LawsuitDate = LawsuitDate;
                                        var LawsuitTime = _this.lawsuitList[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitTime'];
                                        _this.lawsuitList[0].LawsuitTime = LawsuitTime;
                                        var LawsuitStation = _this.lawsuitList[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitStation'];
                                        _this.lawsuitList[0].LawsuitStation = LawsuitStation;
                                        var AccuserTestimony = _this.lawsuitList[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['AccuserTestimony'];
                                        _this.lawsuitList[0].AccuserTestimony = AccuserTestimony;
                                        var isProve = _this.lawsuitList[0]['LawsuitArrestIndicment'][0]['IsProve'];
                                        var lawsuitType = _this.lawsuitList[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'][0]['LawsuitType'];
                                        if (isProve == 0) {
                                            if (lawsuitType == 1) {
                                                _this.navService.setPrintButton(true);
                                                _this.navService.setDeleteButton(true);
                                                _this.navService.setEditButton(true);
                                            }
                                            else {
                                                _this.navService.setPrintButton(true);
                                                _this.navService.setDeleteButton(true);
                                                _this.navService.setEditButton(true);
                                            }
                                        }
                                        else {
                                            _this.navService.setPrintButton(true);
                                            _this.navService.setDeleteButton(true);
                                            _this.navService.setEditButton(true);
                                        }
                                        //islawsuitcomplete!=1
                                    }
                                    else {
                                        console.log("LAWSUIT COMPLETE = 0");
                                        _this.lawsuitService.MasStaffMaingetAll().then(function (masstaff) {
                                            console.log(JSON.stringify(masstaff));
                                            _this.masStaffList = masstaff || [];
                                        });
                                        _this.lawsuitService.MasOfficeMaingetAll().then(function (masoffice) {
                                            console.log(JSON.stringify(masoffice));
                                            _this.masOfficeList = masoffice || [];
                                        });
                                        _this.navService.setSaveButton(true);
                                        _this.navService.setCancelButton(true);
                                    }
                                }
                                /*if (res) {
                                  this.lawsuitList.map((data, index) => {
                                    data.RowsId = index + 1;
                                  });
                                 
                                  if (res && res.IsOutside == 1 && res.LawsuitNo != null) {
                                    this.lawsuitList.map(law => {
                                      law.LawsuitNo = `น ${law.LawsuitNo}`;
                                    });
                                  }
                                 
                                  if (res && res.IsLawsuit == 0) {
                                    this.lawsuitList.map(law => {
                                      law.IsLawsuitStatus = "ไม่รับคดี";
                                    });
                                  } else if (res && res.IsLawsuitComplete == 1) {
                                    this.lawsuitList.map(law => {
                                      law.IsLawsuitStatus = "ดำเนินการรับคดีแล้ว";
                                    });
                                  } else {
                                    this.lawsuitList.map(law => {
                                      law.IsLawsuitStatus = "ยังไม่ดำเนินกำรรับคดี";
                                    });
                                  }
                                }*/
                            })];
                    case 1:
                        // LawsuitArrestgetByCon
                        _a.sent();
                        /*
                        // Find guiltbaseID with IndictmentID from Lawsuit
                        await this.arrestList[0].ArrestIndictment.forEach(value => {
                          if (this.lawsuitList.length && value.IndicmentID == this.lawsuitList[0].IndictmentID) {
                            this.lawsuitService.CompareMasLawgetByCon(value.GuiltBaseID).then(res => {
                              if (res) {
                                for (let key in res) {
                                  if (key == "CompareMasLawSection") {
                                    this.masLawGroupSectionList.push(res[key]);
                                  }
                                  if (key == "CompareMasLawGuiltBase") {
                                    this.masLawGuitBaseList.push(res[key]);
                                  }
                                }
                              }
                            });
                          }
                        });*/
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
        this.onPrintSubscribe.unsubscribe();
        this.onSaveSubscribe.unsubscribe();
    };
    ManageComponent.prototype.createLawsuitForm = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.lawsuitForm = new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["e" /* FormGroup */]({
                    //'LawsuitNo': new FormControl(null, Validators.required),
                    //'LawsuitDate': new FormControl(null, Validators.required),
                    //'LawsuitTime': new FormControl(null, Validators.required),
                    'Fullname': new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["d" /* FormControl */](),
                });
                return [2 /*return*/];
            });
        });
    };
    ManageComponent.prototype.onSave = function () {
        return __awaiter(this, void 0, void 0, function () {
            var IsLawsuitComplete;
            return __generator(this, function (_a) {
                console.log("ONSAVE CLICK");
                this.preLoaderService.setShowPreloader(true);
                IsLawsuitComplete = this.lawsuitList[0]['IsLawsuitComplete'];
                if (IsLawsuitComplete == 1) {
                    //this.onSaveValidate();
                }
                this.preLoaderService.setShowPreloader(false);
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["_13" /* ViewChild */])('printDocModal'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__angular_core__["u" /* ElementRef */])
    ], ManageComponent.prototype, "printDocModel", void 0);
    ManageComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["n" /* Component */])({
            selector: "app-manage",
            template: __webpack_require__("./src/app/pages/lawsuit/manage/manage.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__["d" /* NgbModal */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */],
            __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormBuilder */],
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__print_doc_modal_print_doc_modal_module__ = __webpack_require__("./src/app/pages/lawsuit/print-doc-modal/print-doc-modal.module.ts");
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
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["g" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["l" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_http__["d" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_9__ng_bootstrap_ng_bootstrap__["e" /* NgbModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["d" /* RouterModule */].forChild(routes),
                __WEBPACK_IMPORTED_MODULE_1__component_card_actions_card_actions_module__["a" /* CardActionsModule */],
                __WEBPACK_IMPORTED_MODULE_10__component_suspect_modal_suspect_modal_module__["a" /* SuspectModalModule */],
                __WEBPACK_IMPORTED_MODULE_11__component_modal_lawbreaker_modal_lawbreaker_module__["a" /* ModalLawbreakerModule */],
                __WEBPACK_IMPORTED_MODULE_12__print_doc_modal_print_doc_modal_module__["a" /* PrintLawsuitModalModule */],
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
//# sourceMappingURL=manage.module.6.chunk.js.map
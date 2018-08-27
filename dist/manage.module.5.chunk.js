webpackJsonp(["manage.module.5"],{

/***/ "./src/app/pages/income/manage/manage.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-template #printDocModal let-c=\"close\" let-d=\"dismiss\">\n    <app-printdoc-modal (c)=\"modal.close()\" (d)=\"modal.dismiss()\"></app-printdoc-modal>\n</ng-template>\n\n<div class=\"wizard-content\" style=\"margin-bottom: 10px;\">\n    <div class=\"wizard-circle wizard clearfix clearfix\">\n        <div class=\"steps tab-wizard\">\n            <ul role=\"tablist\">\n                <li role=\"tab\" class=\"current\" aria-disabled=\"false\" aria-selected=\"true\">\n                    <a>\n                        <span class=\"current-info audible\">current step: </span>\n                        <span class=\"step\"></span> 1. ใบแจ้งความนำจับ</a>\n                </li>\n                <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\n                    <a>\n                        <span class=\"step\"></span> 2. งานจับกุม </a>\n                </li>\n                <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\n                    <a>\n                        <span class=\"step\"></span> 3. รับคำกล่าวโทษ </a>\n                </li>\n                <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\n                    <a>\n                        <span class=\"step\"></span> 4. งานตรวจรับและพิสูจน์ของกลาง </a>\n                </li>\n                <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\n                    <a>\n                        <span class=\"step\"></span> 5. งานเปรียบเทียบและชำระค่าปรับ </a>\n                </li>\n                <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\n                    <a>\n                        <span class=\"step\"></span> 6. นำส่งเงินรายได้ </a>\n                </li>\n                <li role=\"tab\" class=\"disabled\" aria-disabled=\"true\">\n                    <a>\n                        <span class=\"step\"></span> 7. คำร้องขอรับเงินสินบนรางวัล </a>\n                </li>\n            </ul>\n        </div>\n    </div>\n</div>\n\n<!-- รายละเอียดการนำส่งเงินรายได้ -->\n<form class=\"form-horizontal\">\n    <div class=\"card card-outline-bluish unset-radius\">\n        <div class=\"card-header unset-radius\">\n            <app-card-actions-collapse></app-card-actions-collapse>\n            <h4 class=\"card-title m-b-0\">รายละเอียดการนำส่งเงินรายได้</h4>\n        </div>\n        <div class=\"card-body\">\n\n\n            <div class=\"row\">\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">เลขที่นำส่งเงิน :</label>\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\n                    <div class=\"form-group \">\n                        <input type=\"text\" class=\"form-control form-control-sm\" value=\"Auto Generate\" readonly>\n                    </div>\n                </div>\n\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">วันที่นำส่ง :\n                </label>\n                <div class=\"form-group input-group  col-lg-4 col-md-7\">\n                    <div style=\"width:45%\">\n                        <my-date-picker-th name=\"oRevenue.RevenueStaff\" [(ngModel)]=\"oRevenue.RevenueStaff\"></my-date-picker-th>\n                    </div>\n                    <label for=\"\" class=\"\">&nbsp; เวลา : &nbsp;</label>\n                    <input type=\"text\" name=\"\" id=\"\" class=\"form-control form-control-sm\" [disabled]=\"showEditField\">\n                </div>\n            </div>\n\n            <div class=\"row\">\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">เลขที่หนังสือนำส่ง :\n                </label>\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\n                    <div class=\"form-group \">\n                        <input type=\"text\" name=\"RevenueCode\" [(ngModel)]=\"RevenueCode\"  class=\"form-control form-control-sm\" [disabled]=\"showEditField\">\n                    </div>\n                </div>\n\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">เรียน :\n                </label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <input type=\"text\" name=\"\" id=\"\" class=\"form-control form-control-sm\" [disabled]=\"showEditField\">\n                </div>\n            </div>\n\n            <div class=\"row\">\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">เขียนที่ :\n                </label>\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\n                    <div class=\"form-group \">\n                        <input type=\"text\" class=\"form-control\" [(ngModel)]=\"RevenueStation\" name=\"RevenueStation\" placeholder=\"พิมพ์ข้อความ\" aria-label=\"Number\"\n                            matInput [matAutocomplete]=\"auto3\" (input)=\"onAutoChange($event.target.value)\" (focus)=\"onAutoFocus($event.target.value)\"\n                            [disabled]=\"showEditField\" [ngClass]=\"{'ng-touched':isRequired}\" required>\n                        <mat-autocomplete #auto3=\"matAutocomplete\">\n                            <mat-option *ngFor=\"let option of options\" [value]=\"option.DepartmentNameTH\" (click)=\"onAutoSelecteWord(option)\">\n                                {{ option.DepartmentNameTH }}\n                            </mat-option>\n                        </mat-autocomplete>\n                    </div>\n                </div>\n\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">ผู้นำส่ง :\n                </label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <input type=\"text\" class=\"form-control\" [(ngModel)]=\"StaffSendName\" name=\"StaffSendName\" placeholder=\"พิมพ์ข้อความ\" aria-label=\"Number\"\n                        matInput [matAutocomplete]=\"auto\" (input)=\"StaffSendonAutoChange($event.target.value)\" (focus)=\"StaffSendonAutoFocus($event.target.value)\"\n                        [disabled]=\"showEditField\" [ngClass]=\"{'ng-touched':isRequired}\" required>\n                    <mat-autocomplete #auto=\"matAutocomplete\">\n                        <mat-option *ngFor=\"let ssOption of StaffSendoptions\" [value]=\"ssOption.TitleName + ssOption.FirstName + ' ' + ssOption.LastName\"\n                            (click)=\"StaffSendonAutoSelecteWord(ssOption)\">\n                            {{ ssOption.TitleName }}{{ ssOption.FirstName }} {{ ssOption.LastName }}\n                        </mat-option>\n                    </mat-autocomplete>\n                </div>\n            </div>\n\n            <div class=\"row\">\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">ตำแหน่ง :\n                </label>\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\n                    <div class=\"form-group \">\n                        <input type=\"text\" [(ngModel)]=\"PosSend\" name=\"PosSend\" class=\"form-control form-control-sm\" readonly>\n                    </div>\n                </div>\n\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">หน่วยงาน :\n                </label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <input type=\"text\" [(ngModel)]=\"DeptSend\" name=\"DeptSend\" class=\"form-control form-control-sm\" readonly>\n                </div>\n            </div>\n\n            <div class=\"row\">\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">ผู้จัดทำ :\n                </label>\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\n                    <div class=\"form-group \">\n                        <input type=\"text\" class=\"form-control\" [(ngModel)]=\"StaffName\" name=\"StaffName\" placeholder=\"พิมพ์ข้อความ\" aria-label=\"Number\"\n                            matInput [matAutocomplete]=\"auto2\" (input)=\"StaffonAutoChange($event.target.value)\" (focus)=\"StaffonAutoFocus($event.target.value)\"\n                            [disabled]=\"showEditField\" [ngClass]=\"{'ng-touched':isRequired}\" required>\n                        <mat-autocomplete #auto2=\"matAutocomplete\">\n                            <mat-option *ngFor=\"let sOption of Staffoptions\" [value]=\"sOption.TitleName + sOption.FirstName + ' ' + sOption.LastName\"\n                                (click)=\"StaffonAutoSelecteWord(sOption)\">\n                                {{ sOption.TitleName }}{{ sOption.FirstName }} {{ sOption.LastName }}\n                            </mat-option>\n                        </mat-autocomplete>\n                    </div>\n                </div>\n\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">ตำแหน่ง :\n                </label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <input type=\"text\" [(ngModel)]=\"PosStaff\" name=\"PosStaff\" class=\"form-control form-control-sm\" readonly>\n                </div>\n            </div>\n            <div class=\"row\">\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">หน่วยงาน :\n                </label>\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\n                    <div class=\"form-group \">\n                        <input type=\"text\" [(ngModel)]=\"DeptStaff\" name=\"DeptStaff\" class=\"form-control form-control-sm\" readonly>\n                    </div>\n                </div>\n\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">สถานะนำส่งเงิน :\n                </label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <select name=\"\" id=\"\" class=\"form-control form-control-sm\" [disabled]=\"showEditField\">\n                    </select>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <!-- รายการที่ยังไม่นำส่งเงินรายได้ -->\n    <div class=\"card card-outline-bluish unset-radius\">\n        <div class=\"card-header unset-radius\">\n            <app-card-actions-collapse></app-card-actions-collapse>\n            <h4 class=\"card-title m-b-0\">รายการที่ยังไม่นำส่งเงินรายได้</h4>\n        </div>\n        <div class=\"card-body\">\n\n            <form class=\"form-horizontal\">\n                <div class=\"card\">\n                    <div class=\"card-body\">\n\n                        <div class=\"table-responsive table-striped \">\n                            <table class=\"table\">\n                                <thead>\n                                    <tr>\n                                        <th></th>\n                                        <th style=\"text-align: center\">ลำดับ</th>\n                                        <th>เลขคดีเปรียบเทียบ</th>\n                                        <th>เลขที่ใบเสร็จ</th>\n                                        <th>ผู้ต้องหา</th>\n                                        <th>ผู้รับชำระค่าปรับ</th>\n                                        <th>วันที่ชำระ</th>\n                                        <th>ยอดชำระ</th>\n                                        <th>เงินสินบน</th>\n                                        <th>เงินรางวัล</th>\n                                        <th>เงินส่งคลัง</th>\n                                    </tr>\n                                </thead>\n                                <tbody>\n                                    <tr>\n                                        <td style=\"text-align: center\">\n                                            <input type=\"checkbox\" id=\"td_1\" class=\"filled-in chk-col-indigo\" [checked]=\"isCheckAll\">\n                                            <label for=\"td_1\" class=\"m-0\"></label>\n                                        </td>\n                                        <td style=\"text-align: center\">1</td>\n                                        <td>001/2561</td>\n                                        <td>001/2561</td>\n                                        <td>นายธวัชชัย บิงขุนทด</td>\n                                        <td>น.ส.แพรทิพย์ โครตแสนลี</td>\n                                        <td>10 พ.ค. 2561</td>\n                                        <td>10,000,000</td>\n                                        <td>2,000,000</td>\n                                        <td>2,000,000</td>\n                                        <td>6,000,000</td>\n                                    </tr>\n                                    <tr>\n                                        <td style=\"text-align: center\">\n                                            <input type=\"checkbox\" id=\"td_1\" class=\"filled-in chk-col-indigo\" [checked]=\"isCheckAll\">\n                                            <label for=\"td_1\" class=\"m-0\"></label>\n                                        </td>\n                                        <td style=\"text-align: center\">1</td>\n                                        <td>001/2561</td>\n                                        <td>001/2561</td>\n                                        <td>นายธวัชชัย บิงขุนทด</td>\n                                        <td>น.ส.แพรทิพย์ โครตแสนลี</td>\n                                        <td>10 พ.ค. 2561</td>\n                                        <td>10,000,000</td>\n                                        <td>2,000,000</td>\n                                        <td>2,000,000</td>\n                                        <td>6,000,000</td>\n                                    </tr>\n                                    <tr>\n                                        <td style=\"text-align: center\">\n                                            <input type=\"checkbox\" id=\"td_1\" class=\"filled-in chk-col-indigo\" [checked]=\"isCheckAll\">\n                                            <label for=\"td_1\" class=\"m-0\"></label>\n                                        </td>\n                                        <td style=\"text-align: center\">1</td>\n                                        <td>001/2561</td>\n                                        <td>001/2561</td>\n                                        <td>นายธวัชชัย บิงขุนทด</td>\n                                        <td>น.ส.แพรทิพย์ โครตแสนลี</td>\n                                        <td>10 พ.ค. 2561</td>\n                                        <td>10,000,000</td>\n                                        <td>2,000,000</td>\n                                        <td>2,000,000</td>\n                                        <td>6,000,000</td>\n                                    </tr>\n                                    <tr>\n                                        <td style=\"text-align: center\">\n                                            <input type=\"checkbox\" id=\"td_1\" class=\"filled-in chk-col-indigo\" [checked]=\"isCheckAll\">\n                                            <label for=\"td_1\" class=\"m-0\"></label>\n                                        </td>\n                                        <td style=\"text-align: center\">1</td>\n                                        <td>001/2561</td>\n                                        <td>001/2561</td>\n                                        <td>นายธวัชชัย บิงขุนทด</td>\n                                        <td>น.ส.แพรทิพย์ โครตแสนลี</td>\n                                        <td>10 พ.ค. 2561</td>\n                                        <td>10,000,000</td>\n                                        <td>2,000,000</td>\n                                        <td>2,000,000</td>\n                                        <td>6,000,000</td>\n                                    </tr>\n                                    <tr>\n                                        <td style=\"text-align: center\">\n                                            <input type=\"checkbox\" id=\"td_1\" class=\"filled-in chk-col-indigo\" [checked]=\"isCheckAll\">\n                                            <label for=\"td_1\" class=\"m-0\"></label>\n                                        </td>\n                                        <td style=\"text-align: center\">1</td>\n                                        <td>001/2561</td>\n                                        <td>001/2561</td>\n                                        <td>นายธวัชชัย บิงขุนทด</td>\n                                        <td>น.ส.แพรทิพย์ โครตแสนลี</td>\n                                        <td>10 พ.ค. 2561</td>\n                                        <td>10,000,000</td>\n                                        <td>2,000,000</td>\n                                        <td>2,000,000</td>\n                                        <td>6,000,000</td>\n                                    </tr>\n                                </tbody>\n                            </table>\n                        </div>\n\n                        <div class=\"card-footer card-footer-unset\">\n                            <div class=\"row justify-content-between m-l-5\">\n                                <div clas=\"col\">\n                                    <a class=\"icn-pagination text-secondary\" href=\"javaScript:void(0)\"> |<< </a>\n                                            <label> หน้าที่\n                                                <select>\n                                                    <option value=\"1\">1</option>\n                                                </select> จาก 1 หน้า</label>\n                                            <a class=\"icn-pagination m-r-10 text-secondary\" href=\"javaScript:void(0)\"> >>| </a>\n                                            รายการที่ 1 - 1 จาก 1 รายการ\n                                </div>\n                                <div class=\"col col-lg-3 text-right\">\n                                    <label>แสดง\n                                        <select>\n                                            <option>5</option>\n                                            <option>10</option>\n                                            <option>15</option>\n                                            <option>20</option>\n                                        </select> รายการ</label>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"row\">\n                    <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">ยอดนำส่งรวม :</label>\n                    <div class=\"form-group col-lg-4 col-md-7\">\n                        <input type=\"text\" [(ngModel)]=\"CompareFine\" name=\"CompareFine\" class=\"form-control form-control-sm\" readonly>\n                    </div>\n\n                    <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">จำนวนคดี :</label>\n                    <div class=\"col-lg-4 col-md-7 form-group \">\n                        <input type=\"text\" [(ngModel)]=\"MistreatNo\" name=\"MistreatNo\" class=\"form-control form-control-sm\" readonly>\n                    </div>\n                </div>\n\n                <div class=\"row\">\n                    <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">เงินสินบน :</label>\n                    <div class=\"form-group col-lg-4 col-md-7\">\n                        <input type=\"text\" [(ngModel)]=\"BribeMoney\" name=\"BribeMoney\" class=\"form-control form-control-sm\" readonly>\n                    </div>\n\n                    <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">เงินรางวัล :</label>\n                    <div class=\"col-lg-4 col-md-7 form-group \">\n                        <input type=\"text\" [(ngModel)]=\"RewardMoney\" name=\"RewardMoney\" class=\"form-control form-control-sm\" readonly>\n                    </div>\n                </div>\n\n                <div class=\"row\">\n                    <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">เงินส่งคลัง :</label>\n                    <div class=\"form-group col-lg-4 col-md-7\">\n                        <input type=\"text\" [(ngModel)]=\"TreasuryMoney\" name=\"TreasuryMoney\" class=\"form-control form-control-sm\" readonly>\n                    </div>\n                </div>\n            </form>\n\n        </div>\n    </div>\n\n</form>"

/***/ }),

/***/ "./src/app/pages/income/manage/manage.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_header_navigation_navigation_service__ = __webpack_require__("./src/app/shared/header-navigation/navigation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__income_service__ = __webpack_require__("./src/app/pages/income/income.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config_message__ = __webpack_require__("./src/app/config/message.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
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








var ManageComponent = /** @class */ (function () {
    function ManageComponent(activeRoute, formBuilder, ngbModel, navService, IncService, preloader) {
        this.activeRoute = activeRoute;
        this.formBuilder = formBuilder;
        this.ngbModel = ngbModel;
        this.navService = navService;
        this.IncService = IncService;
        this.preloader = preloader;
        this.StaffSendoptions = [];
        this.rawStaffSendOptions = [];
        this.Staffoptions = [];
        this.rawOptions = [];
        this.options = [];
        // set false
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
        this.navService.setNextPageButton(false);
    }
    ManageComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.preloader.setShowPreloader(true);
                        this.active_Route();
                        this.navigate_Service();
                        return [4 /*yield*/, this.CreateObject()];
                    case 1:
                        _a.sent();
                        // await this.getReveneueStaff();
                        // await this.getStation();
                        this.ShowRevenueCompare();
                        this.preloader.setShowPreloader(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.active_Route = function () {
        var _this = this;
        this.sub = this.activeRoute.params.subscribe(function (p) {
            _this.mode = p['mode'];
            if (p['mode'] === 'C') {
                // set false
                _this.navService.setPrintButton(false);
                _this.navService.setEditButton(false);
                _this.navService.setDeleteButton(false);
                _this.navService.setEditField(false);
                // set true
                _this.navService.setSaveButton(true);
                _this.navService.setCancelButton(true);
            }
            else if (p['mode'] === 'R') {
                // set false
                _this.navService.setSaveButton(false);
                _this.navService.setCancelButton(false);
                // set true
                _this.navService.setPrintButton(true);
                _this.navService.setEditButton(true);
                _this.navService.setDeleteButton(true);
                _this.navService.setEditField(true);
                if (p['code']) {
                    // this.arrestCode = p['code'];
                    // this.getByCon(p['code']);
                }
            }
        });
    };
    ManageComponent.prototype.navigate_Service = function () {
        var _this = this;
        this.sub = this.navService.showFieldEdit.subscribe(function (p) {
            _this.showEditField = p;
        });
        this.sub = this.navService.onSave.subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!status) return [3 /*break*/, 3];
                        // set action save = false
                        return [4 /*yield*/, this.navService.setOnSave(false)];
                    case 1:
                        // set action save = false
                        _a.sent();
                        if (!(this.mode == 'C')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.onInsRevenue()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        // this.sub = this.navService.onDelete.subscribe(async status => {
        //     if (status) {
        //         await this.navService.setOnDelete(false);
        //         this.onDelete();
        //     }
        // });
        // this.sub = this.navService.onPrint.subscribe(async status => {
        //     if (status) {
        //         await this.navService.setOnPrint(false);
        //         this.modal = this.ngbModel.open(this.printDocModel, { size: 'lg', centered: true });
        //     }
        // })
        // this.sub = this.navService.onCancel.subscribe(async status => {
        //     if (status) {
        //         if (confirm(Message.confirmAction)) {
        //             await this.navService.setOnCancel(false);
        //             this.router.navigate(['/prove/list']);
        //         }
        //     }
        // })
    };
    ManageComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ManageComponent.prototype.ShowRevenueCompare = function () {
        var _this = this;
        this.IncService.RevenueComparegetByCon("3").then(function (res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (res) {
                    debugger;
                }
                return [2 /*return*/];
            });
        }); }, function (err) {
            alert(err.message);
        });
    };
    ManageComponent.prototype.CreateObject = function () {
        this.oRevenue = {
            RevenueID: "",
            RevenueCode: "",
            RevenueNo: "",
            RevenueDate: "",
            StationCode: "",
            StationName: "",
            InformTo: "",
            ISACTIVE: 1,
            RevenueOneStaff: [],
            RevenueDetail: [],
            RevenueStaff: []
        };
    };
    ManageComponent.prototype.onInsRevenue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isSuccess;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.preloader.setShowPreloader(true);
                        this.oRevenue.RevenueStaff = [];
                        if (this.oRevenueSendStaff != null && this.oRevenueSendStaff != undefined) {
                            this.oRevenue.RevenueStaff.push(this.oRevenueSendStaff);
                        }
                        if (this.oRevenueStaff != null && this.oRevenueStaff != undefined) {
                            this.oRevenue.RevenueStaff.push(this.oRevenueStaff);
                        }
                        isSuccess = true;
                        return [4 /*yield*/, this.IncService.RevenueinsAll(this.oRevenue).then(function (IsSuccess) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (!IsSuccess) {
                                        isSuccess = IsSuccess;
                                        return [2 /*return*/, false];
                                    }
                                    return [2 /*return*/];
                                });
                            }); }, function (error) { isSuccess = false; console.error(error); return false; })];
                    case 1:
                        _a.sent();
                        if (!isSuccess)
                            return [2 /*return*/, false];
                        if (isSuccess) {
                            alert(__WEBPACK_IMPORTED_MODULE_5__config_message__["a" /* Message */].saveComplete);
                            // this.oProve = {};
                            // this.router.navigate(['/prove/list']);
                        }
                        else {
                            alert(__WEBPACK_IMPORTED_MODULE_5__config_message__["a" /* Message */].saveFail);
                        }
                        this.preloader.setShowPreloader(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    // ----- ผู้นำส่ง ---
    ManageComponent.prototype.getReveneueStaff = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.IncService.StaffgetByKeyword("").then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (res) {
                                    this.rawStaffSendOptions = res;
                                }
                                return [2 /*return*/];
                            });
                        }); }, function (err) {
                            alert(err.message);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.StaffSendonAutoChange = function (value) {
        if (value == '') {
            this.StaffSendoptions = [];
            this.ClearStaffSendData();
        }
        else {
            if (this.rawStaffSendOptions.length == 0) {
                this.getReveneueStaff();
            }
            this.StaffSendoptions = this.rawStaffSendOptions.filter(function (f) { return f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1; });
        }
    };
    ManageComponent.prototype.StaffSendonAutoFocus = function (value) {
        if (value == '') {
            this.StaffSendoptions = [];
            this.ClearStaffSendData();
        }
    };
    ManageComponent.prototype.StaffSendonAutoSelecteWord = function (event) {
        this.oRevenueSendStaff = {
            StaffID: this.StaffSendID,
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-07",
            RevenueID: this.revenueID,
            StaffCode: event.StaffCode,
            TitleName: event.TitleName,
            FirstName: event.FirstName,
            LastName: event.LastName,
            PositionCode: event.OperationPosCode,
            PositionName: event.OperationPosName,
            PosLevel: event.PosLevel,
            PosLevelName: event.PosLevelName,
            DepartmentCode: event.OperationDeptCode,
            DepartmentName: event.OperationDeptName,
            DepartmentLevel: event.DeptLevel,
            OfficeCode: event.OfficeCode,
            OfficeName: event.OfficeName,
            OfficeShortName: event.OfficeShortName,
            ContributorCode: "20",
            IsActive: "1"
        };
        this.PosSend = event.PosLevelName;
        this.DeptSend = event.OperationDeptName;
    };
    ManageComponent.prototype.ClearStaffSendData = function () {
        this.PosSend = "";
        this.DeptSend = "";
        this.oRevenueSendStaff = {
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-05",
            StaffID: this.StaffSendID,
            RevenueID: this.revenueID,
            StaffCode: "",
            TitleName: "",
            FirstName: "",
            LastName: "",
            PositionCode: "",
            PositionName: "",
            PosLevel: "",
            PosLevelName: "",
            DepartmentCode: "",
            DepartmentName: "",
            DepartmentLevel: "",
            OfficeCode: "",
            OfficeName: "",
            OfficeShortName: "",
            ContributorCode: "20",
            IsActive: "1"
        };
    };
    // ----- End ผู้นำส่ง ---
    // ----- ผู้จัดทำ ---
    ManageComponent.prototype.StaffonAutoChange = function (value) {
        if (value == '') {
            this.Staffoptions = [];
            this.ClearStaffData();
        }
        else {
            if (this.rawStaffSendOptions.length == 0) {
                this.getReveneueStaff();
            }
            debugger;
            this.Staffoptions = this.rawStaffSendOptions.filter(function (f) { return f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1; });
        }
    };
    ManageComponent.prototype.StaffonAutoFocus = function (value) {
        if (value == '') {
            this.Staffoptions = [];
            this.ClearStaffData();
        }
    };
    ManageComponent.prototype.StaffonAutoSelecteWord = function (event) {
        this.oRevenueStaff = {
            StaffID: this.StaffID,
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-07",
            RevenueID: this.revenueID,
            StaffCode: event.StaffCode,
            TitleName: event.TitleName,
            FirstName: event.FirstName,
            LastName: event.LastName,
            PositionCode: event.OperationPosCode,
            PositionName: event.OperationPosName,
            PosLevel: event.PosLevel,
            PosLevelName: event.PosLevelName,
            DepartmentCode: event.OperationDeptCode,
            DepartmentName: event.OperationDeptName,
            DepartmentLevel: event.DeptLevel,
            OfficeCode: event.OfficeCode,
            OfficeName: event.OfficeName,
            OfficeShortName: event.OfficeShortName,
            ContributorCode: "34",
            IsActive: "1"
        };
        this.PosStaff = event.PosLevelName;
        this.DeptStaff = event.OperationDeptName;
    };
    ManageComponent.prototype.ClearStaffData = function () {
        this.PosStaff = "";
        this.DeptStaff = "";
        this.oRevenueStaff = {
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-05",
            StaffID: this.StaffID,
            RevenueID: this.revenueID,
            StaffCode: "",
            TitleName: "",
            FirstName: "",
            LastName: "",
            PositionCode: "",
            PositionName: "",
            PosLevel: "",
            PosLevelName: "",
            DepartmentCode: "",
            DepartmentName: "",
            DepartmentLevel: "",
            OfficeCode: "",
            OfficeName: "",
            OfficeShortName: "",
            ContributorCode: "34",
            IsActive: "1"
        };
    };
    // ----- End ผู้นำส่ง ---
    // --- เขียนที่ ---
    ManageComponent.prototype.getStation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // this.preloader.setShowPreloader(true);
                    return [4 /*yield*/, this.IncService.getDepartment("").then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (res) {
                                    this.rawOptions = res;
                                }
                                return [2 /*return*/];
                            });
                        }); }, function (err) {
                            alert(err.message);
                        })];
                    case 1:
                        // this.preloader.setShowPreloader(true);
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.onAutoChange = function (value) {
        // 
        if (value == '') {
            this.options = [];
            this.oRevenue.StationCode = "";
            this.oRevenue.StationName = "";
        }
        else {
            this.options = this.rawOptions.filter(function (f) { return f.DepartmentNameTH.toLowerCase().indexOf(value.toLowerCase()) > -1; });
        }
    };
    ManageComponent.prototype.onAutoFocus = function (value) {
        if (value == '') {
            this.options = [];
        }
    };
    ManageComponent.prototype.onAutoSelecteWord = function (event) {
        this.oRevenue.StationCode = event.DepartmentCode;
        this.oRevenue.StationName = event.DepartmentNameTH;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('printDocModal'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], ManageComponent.prototype, "printDocModel", void 0);
    ManageComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-manage',
            template: __webpack_require__("./src/app/pages/income/manage/manage.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_6__ng_bootstrap_ng_bootstrap__["d" /* NgbModal */],
            __WEBPACK_IMPORTED_MODULE_2__shared_header_navigation_navigation_service__["a" /* NavigationService */],
            __WEBPACK_IMPORTED_MODULE_3__income_service__["a" /* IncomeService */],
            __WEBPACK_IMPORTED_MODULE_7__shared_preloader_preloader_component__["b" /* PreloaderService */]])
    ], ManageComponent);
    return ManageComponent;
}());



/***/ }),

/***/ "./src/app/pages/income/manage/manage.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageModule", function() { return ManageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__manage_component__ = __webpack_require__("./src/app/pages/income/manage/manage.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__component_card_actions_card_actions_module__ = __webpack_require__("./src/app/pages/component/card-actions/card-actions.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__income_service__ = __webpack_require__("./src/app/pages/income/income.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__printdoc_modal_printdoc_modal_module__ = __webpack_require__("./src/app/pages/income/printdoc-modal/printdoc-modal.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_material_autocomplete__ = __webpack_require__("./node_modules/@angular/material/esm5/autocomplete.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_mydatepicker_th__ = __webpack_require__("./node_modules/mydatepicker-th/index.js");
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
            // title: 'จัดการข้อมูล',
            urls: [
                { title: 'หน้าหลัก', url: '/' },
                { title: 'ค้นหารายการนำส่งเงินรายได้', url: '/income/list' },
                { title: 'จัดการข้อมูลนำส่งเงินรายได้' }
            ],
            nextPage: { title: '', url: '' }
        },
        component: __WEBPACK_IMPORTED_MODULE_2__manage_component__["a" /* ManageComponent */]
    }
];
var ManageModule = /** @class */ (function () {
    function ManageModule() {
    }
    ManageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_forms__["f" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_forms__["k" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* RouterModule */].forChild(routes),
                __WEBPACK_IMPORTED_MODULE_4__component_card_actions_card_actions_module__["a" /* CardActionsModule */],
                __WEBPACK_IMPORTED_MODULE_9__printdoc_modal_printdoc_modal_module__["a" /* PrintDocModalModule */],
                __WEBPACK_IMPORTED_MODULE_11_mydatepicker_th__["a" /* MyDatePickerTHModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material_autocomplete__["a" /* MatAutocompleteModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__manage_component__["a" /* ManageComponent */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_5__income_service__["a" /* IncomeService */]],
            exports: [__WEBPACK_IMPORTED_MODULE_10__angular_material_autocomplete__["a" /* MatAutocompleteModule */]]
        })
    ], ManageModule);
    return ManageModule;
}());



/***/ }),

/***/ "./src/app/pages/income/printdoc-modal/printdoc-modal.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <form action=\"\" #form=\"ngForm\" (ngSubmit)=\"onPrint(form)\"> -->\n    <div class=\"modal-header bg-theme\">\n        <div class=\"row\">\n            <div class=\"col-lg-5\">\n                <h4 class=\"modal-title text-white\">พิมพ์เอกสาร</h4>\n            </div>\n\n            <a href=\"javaScript:void(0);\" class=\"close text-white font-14\" aria-label=\"Close\" (click)=\"dismiss('Cross click')\">\n                <span aria-hidden=\"true\">\n                    <i class=\" ti-close\"></i>\n                </span>\n            </a>\n        </div>\n    </div>\n    <div class=\"modal-body font-14\">\n        <div class=\"card unset-radius\">\n            <div class=\"card-body p-0\">\n                <div class=\"table-responsive\">\n                    <div class=\"table-responsive table-striped \">\n                        <table class=\"table\">\n                            <thead>\n                                <tr>\n                                    <th style=\"text-align: center;width: 5%\"></th>\n                                    <th style=\"text-align: center;width: 7%\">ลำดับ</th>\n                                    <th>ชื่อเอกสาร</th>\n                                    <th>ประเภทเอกสาร</th>\n                                </tr>\n                            </thead>\n                            <tbody>\n                                <tr *ngFor=\"let item of document; let i=index;\">\n                                    <td class=\"text-center\">\n                                        <!-- <input type=\"hidden\" name=\"InvestigateDetailID\" [(ngModel)]=\"item.InvestigateDetailID\"> -->\n                                        <input type=\"checkbox\" [id]=\"'td'+i\" name=\"checking\" ngModel class=\"filled-in chk-col-indigo\">\n                                        <label [for]=\"'td'+i\" class=\"m-0\"></label>\n                                    </td>\n                                    <td class=\"text-center\">{{i+1}}</td>\n                                    <td>รายงานการ{{item.DocumentName}}</td>\n                                    <td></td>\n                                </tr>\n                            </tbody>\n                        </table>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"modal-footer\">\n        <div class=\"col-lg-2 col-sm-4\">\n            <button type=\"button\" class=\"btn btn-block btn-themecolor\" (click)=\"close('Print click')\">พิมพ์</button>\n        </div>\n    </div>\n<!-- </form> -->"

/***/ }),

/***/ "./src/app/pages/income/printdoc-modal/printdoc-modal.component.scss":
/***/ (function(module, exports) {

module.exports = "@media (min-width: 992px) {\n  .modal-lg {\n    max-width: 980px !important; } }\n"

/***/ }),

/***/ "./src/app/pages/income/printdoc-modal/printdoc-modal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrintDocModalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__income_service__ = __webpack_require__("./src/app/pages/income/income.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
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
    function PrintDocModalComponent(incomeService, fb, _router) {
        this.incomeService = incomeService;
        this.fb = fb;
        this._router = _router;
        this.document = new Array();
        this.d = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.c = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
    }
    PrintDocModalComponent.prototype.ngOnInit = function () {
        var _this = this;
        debugger;
        this.incomeService.DocumentgetByCon(this.DocumentID).subscribe(function (result) {
            _this.document = new Array();
            _this.document = result;
        });
    };
    PrintDocModalComponent.prototype.createFrom = function () {
        this.revenueForm = this.fb.group({
            document: this.fb.array([])
        });
    };
    PrintDocModalComponent.prototype.onPrint = function (form) {
        // console.log(form.value);
        // this.close('Save click')
        // this.c.emit(form);
        this._router.navigate(["/income/list"]);
    };
    PrintDocModalComponent.prototype.dismiss = function (e) {
        this.d.emit(e);
    };
    PrintDocModalComponent.prototype.close = function (e) {
        this.c.emit(e);
        this._router.navigate(["/income/list"]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", String)
    ], PrintDocModalComponent.prototype, "DocumentID", void 0);
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
            selector: 'app-printdoc-modal',
            template: __webpack_require__("./src/app/pages/income/printdoc-modal/printdoc-modal.component.html"),
            styles: [__webpack_require__("./src/app/pages/income/printdoc-modal/printdoc-modal.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__income_service__["a" /* IncomeService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]])
    ], PrintDocModalComponent);
    return PrintDocModalComponent;
}());



/***/ }),

/***/ "./src/app/pages/income/printdoc-modal/printdoc-modal.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrintDocModalModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__printdoc_modal_component__ = __webpack_require__("./src/app/pages/income/printdoc-modal/printdoc-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__component_card_actions_card_actions_module__ = __webpack_require__("./src/app/pages/component/card-actions/card-actions.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var PrintDocModalModule = /** @class */ (function () {
    function PrintDocModalModule() {
    }
    PrintDocModalModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["d" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_3__component_card_actions_card_actions_module__["a" /* CardActionsModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__printdoc_modal_component__["a" /* PrintDocModalComponent */]],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__printdoc_modal_component__["a" /* PrintDocModalComponent */]
            ]
        })
    ], PrintDocModalModule);
    return PrintDocModalModule;
}());



/***/ })

});
//# sourceMappingURL=manage.module.5.chunk.js.map
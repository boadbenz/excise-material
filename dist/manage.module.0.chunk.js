webpackJsonp(["manage.module.0"],{

/***/ "./src/app/pages/income/Revenue.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Revenue; });
/* unused harmony export RevenueStaff */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return RevenueDetail; });
var Revenue = /** @class */ (function () {
    function Revenue() {
    }
    return Revenue;
}());

var RevenueStaff = /** @class */ (function () {
    function RevenueStaff() {
    }
    return RevenueStaff;
}());

var RevenueDetail = /** @class */ (function () {
    function RevenueDetail() {
    }
    return RevenueDetail;
}());



/***/ }),

/***/ "./src/app/pages/income/manage/manage.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-template #printDocModal let-c=\"close\" let-d=\"dismiss\">\r\n    <app-printdoc-modal (c)=\"modal.close()\" (d)=\"modal.dismiss()\"></app-printdoc-modal>\r\n</ng-template>\r\n\r\n<div class=\"wizard-content\" style=\"margin-bottom: 10px;\">\r\n    <div class=\"wizard-circle wizard clearfix clearfix\">\r\n        <div class=\"steps tab-wizard\">\r\n            <ul role=\"tablist\">\r\n                <li role=\"tab\" class=\"current\" aria-disabled=\"false\" aria-selected=\"true\">\r\n                    <a>\r\n                        <span class=\"current-info audible\">current step: </span>\r\n                        <span class=\"step\"></span> 1. ใบแจ้งความนำจับ</a>\r\n                </li>\r\n                <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n                    <a>\r\n                        <span class=\"step\"></span> 2. งานจับกุม </a>\r\n                </li>\r\n                <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n                    <a>\r\n                        <span class=\"step\"></span> 3. รับคำกล่าวโทษ </a>\r\n                </li>\r\n                <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n                    <a>\r\n                        <span class=\"step\"></span> 4. งานตรวจรับและพิสูจน์ของกลาง </a>\r\n                </li>\r\n                <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n                    <a>\r\n                        <span class=\"step\"></span> 5. งานเปรียบเทียบและชำระค่าปรับ </a>\r\n                </li>\r\n                <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n                    <a>\r\n                        <span class=\"step\"></span> 6. นำส่งเงินรายได้ </a>\r\n                </li>\r\n                <li role=\"tab\" class=\"disabled\" aria-disabled=\"true\">\r\n                    <a>\r\n                        <span class=\"step\"></span> 7. คำร้องขอรับเงินสินบนรางวัล </a>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<!-- รายละเอียดการนำส่งเงินรายได้ -->\r\n<form class=\"form-horizontal\">\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header unset-radius\">\r\n            <app-card-actions-collapse></app-card-actions-collapse>\r\n            <h4 class=\"card-title m-b-0\">รายละเอียดการนำส่งเงินรายได้</h4>\r\n        </div>\r\n        <div class=\"card-body\">\r\n\r\n\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">เลขที่นำส่งเงิน :</label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\r\n                    <div class=\"form-group \">\r\n                        <input type=\"text\" name=\"txtRevenueCode\" [(ngModel)]=\"txtRevenueCode_Value\" class=\"form-control form-control-sm\" readonly>\r\n                    </div>\r\n                </div>\r\n\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">วันที่นำส่ง :\r\n                </label>\r\n                <div class=\"form-group input-group  col-lg-4 col-md-7\">\r\n                    <div style=\"width:45%\">\r\n                        <my-date-picker-th name=\"txtRevenueDate\" [(ngModel)]=\"txtRevenueDate_Value\" [ngClass]=\"{'ng-touched':isRequired}\" [disabled]=\"showEditField\" required></my-date-picker-th>\r\n                    </div>\r\n                    <label for=\"\" class=\"\">&nbsp; เวลา : &nbsp;</label>\r\n                    <input type=\"text\" [(ngModel)]=\"txtRevenueTime_Value\" name=\"txtRevenueTime\" class=\"form-control form-control-sm\" [disabled]=\"showEditField\">\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">เลขที่หนังสือนำส่ง :\r\n                </label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\r\n                    <div class=\"form-group \">\r\n                        <input type=\"text\" name=\"txtRevenueNo\" [(ngModel)]=\"txtRevenueNo_Value\" class=\"form-control form-control-sm\" [disabled]=\"showEditField\"\r\n                            [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                    </div>\r\n                </div>\r\n\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">เรียน :\r\n                </label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" name=\"txtInformTo\" [(ngModel)]=\"txtInformTo_Value\" class=\"form-control\" placeholder=\"พิมพ์ข้อความ\" \r\n                    matInput [matAutocomplete]=\"auto4\" (input)=\"txtInformTo_onInput($event.target.value)\"\r\n                    [disabled]=\"showEditField\" [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                    <mat-autocomplete #auto4=\"matAutocomplete\">\r\n                        <mat-option *ngFor=\"let sOption of informOptions\" [value]=\"sOption.TitleName + sOption.FirstName + ' ' + sOption.LastName\"\r\n                                >\r\n                                {{ sOption.TitleName }}{{ sOption.FirstName }} {{ sOption.LastName }}\r\n                            </mat-option>\r\n                    </mat-autocomplete>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">เขียนที่ :\r\n                </label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\r\n                    <div class=\"form-group \">\r\n                        <input type=\"text\" class=\"form-control\" [(ngModel)]=\"txtRevenueStation_Value\" name=\"txtRevenueStation\" placeholder=\"พิมพ์ข้อความ\" aria-label=\"Number\"\r\n                            matInput [matAutocomplete]=\"auto3\" (input)=\"txtRevenueStation_onInput($event.target.value)\" (focus)=\"txtRevenueStation_onFocus($event.target.value)\"\r\n                            [disabled]=\"showEditField\" [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                        <mat-autocomplete #auto3=\"matAutocomplete\">\r\n                            <mat-option *ngFor=\"let option of options\" [value]=\"option.OfficeName\" (click)=\"txtRevenueStation_onClick(option)\">\r\n                                {{ option.OfficeName }}\r\n                            </mat-option>\r\n                        </mat-autocomplete>\r\n                    </div>\r\n                </div>\r\n\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">ผู้นำส่ง :\r\n                </label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" class=\"form-control\" [(ngModel)]=\"txtStaffSendName_Value\" name=\"txtStaffSendName\" placeholder=\"พิมพ์ข้อความ\" aria-label=\"Number\"\r\n                        matInput [matAutocomplete]=\"auto\" (input)=\"txtStaffSendName_onInput($event.target.value)\" (focus)=\"txtStaffSendName_onFocus($event.target.value)\"\r\n                        [disabled]=\"showEditField\" [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                    <mat-autocomplete #auto=\"matAutocomplete\">\r\n                        <mat-option *ngFor=\"let ssOption of StaffSendoptions\" [value]=\"ssOption.TitleName + ssOption.FirstName + ' ' + ssOption.LastName\"\r\n                            (click)=\"txtStaffSendName_onClick(ssOption)\">\r\n                            {{ ssOption.TitleName }}{{ ssOption.FirstName }} {{ ssOption.LastName }}\r\n                        </mat-option>\r\n                    </mat-autocomplete>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">ตำแหน่ง :\r\n                </label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\r\n                    <div class=\"form-group \">\r\n                        <input type=\"text\" [(ngModel)]=\"txtPosSend_Value\" name=\"txtPosSend\" class=\"form-control form-control-sm\" readonly>\r\n                    </div>\r\n                </div>\r\n\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">หน่วยงาน :\r\n                </label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" [(ngModel)]=\"txtDeptSend_Value\" name=\"txtDeptSend\" class=\"form-control form-control-sm\" readonly>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">ผู้จัดทำ :\r\n                </label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\r\n                    <div class=\"form-group \">\r\n                        <input type=\"text\" class=\"form-control\" [(ngModel)]=\"txtStaffName_Value\" name=\"txtStaffName\" placeholder=\"พิมพ์ข้อความ\" aria-label=\"Number\"\r\n                            matInput [matAutocomplete]=\"auto2\" (input)=\"txtStaffName_onInput($event.target.value)\" (focus)=\"txtStaffName_onFocus($event.target.value)\"\r\n                            [disabled]=\"showEditField\" [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                        <mat-autocomplete #auto2=\"matAutocomplete\">\r\n                            <mat-option *ngFor=\"let sOption of Staffoptions\" [value]=\"sOption.TitleName + sOption.FirstName + ' ' + sOption.LastName\"\r\n                                (click)=\"txtStaffName_onClick(sOption)\">\r\n                                {{ sOption.TitleName }}{{ sOption.FirstName }} {{ sOption.LastName }}\r\n                            </mat-option>\r\n                        </mat-autocomplete>\r\n                    </div>\r\n                </div>\r\n\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">ตำแหน่ง :\r\n                </label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" [(ngModel)]=\"txtPosStaff_Value\" name=\"txtPosStaff\" class=\"form-control form-control-sm\" readonly>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">หน่วยงาน :\r\n                </label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\r\n                    <div class=\"form-group \">\r\n                        <input type=\"text\" [(ngModel)]=\"txtDeptStaff_Value\" name=\"txtDeptStaff\" class=\"form-control form-control-sm\" readonly>\r\n                    </div>\r\n                </div>\r\n\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">สถานะนำส่งเงิน :\r\n                </label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <select [(ngModel)]=\"selRevenueStatus_Value\" name=\"selRevenueStatus\" class=\"form-control form-control-sm\" disabled>\r\n                        <option value=\"0\">ยังไม่นำส่งเงินรายได้</option>\r\n                        <option value=\"1\">นำส่งเงินรายได้</option>\r\n                        <option value=\"2\">รับายการนำส่งเงิน</option>\r\n                    </select>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <!-- รายการที่ยังไม่นำส่งเงินรายได้ -->\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header unset-radius\">\r\n            <app-card-actions-collapse></app-card-actions-collapse>\r\n            <h4 class=\"card-title m-b-0\">รายการที่ยังไม่นำส่งเงินรายได้</h4>\r\n        </div>\r\n        <div class=\"card-body\">\r\n\r\n            <form class=\"form-horizontal\">\r\n                <div class=\"card\">\r\n                    <div class=\"card-body\">\r\n\r\n                        <div class=\"table-responsive table-striped \">\r\n                            <table class=\"table\">\r\n                                <thead>\r\n                                    <tr>\r\n                                        <th>\r\n                                            <input [disabled]=\"showEditField\" type=\"checkbox\" id=\"H_0\" class=\"filled-in chk-col-indigo\" name=\"chkAll\" [(ngModel)]=\"chkAll_Value\" (change)=\"chkAll_onChange();\">\r\n                                            <label for=\"H_0\" class=\"m-0\"></label>\r\n                                        </th>\r\n                                        <th style=\"text-align: center\">ลำดับ</th>\r\n                                        <th>เลขคดีเปรียบเทียบ</th>\r\n                                        <th style=\"text-align: center;\">เลขที่ใบเสร็จ</th>\r\n                                        <th>ผู้ต้องหา</th>\r\n                                        <th>ผู้รับชำระค่าปรับ</th>\r\n                                        <th>วันที่ชำระ</th>\r\n                                        <th>ยอดชำระ</th>\r\n                                        <th>เงินสินบน</th>\r\n                                        <th>เงินรางวัล</th>\r\n                                        <th>เงินส่งคลัง</th>\r\n                                    </tr>\r\n                                </thead>\r\n                                <tbody>\r\n                                    <tr *ngFor=\"let item of revenueCmpList; let i=index;\">\r\n                                        <td style=\"text-align: center\">\r\n                                            <input [disabled]=\"showEditField\" type=\"checkbox\" [id]=\"'RevenueD'+i\" class=\"filled-in chk-col-indigo\" name=\"chkDetail[i]\" [checked]=\"item.IsCheck\" (change)=\"item.IsCheck = !item.IsCheck\"\r\n                                                (change)=\"chkDetail_onChange();\">\r\n                                            <label [for]=\"'RevenueD'+i\" class=\"m-0\"></label>\r\n                                        </td>\r\n                                        <th style=\"text-align: center\">{{i + 1}}</th>\r\n                                        <th>{{ item.CompareCode }}</th>\r\n                                        <th style=\"text-align: center;\">{{ item.ReceiptNo }}</th>\r\n                                        <th>{{ item.LawBreaker }}</th>\r\n                                        <th>{{ item.StaffReceip }}</th>\r\n                                        <th>{{ item.PaymentDate }}</th>\r\n                                        <th>{{ item.TotalFine  }}</th>\r\n                                        <th>{{ item.BribeMoney  }}</th>\r\n                                        <th>{{ item.TreasuryMoney  }}</th>\r\n                                        <th>{{ item.RewardMoney  }}</th>\r\n                                    </tr>\r\n                                </tbody>\r\n                            </table>\r\n                        </div>\r\n\r\n                        <!-- <div class=\"card-footer card-footer-unset\">\r\n                            <app-pagination-table [TotalItems]=\"paginage.TotalItems\" [CurrentPage]=\"paginage.CurrentPage\" [PageSize]=\"paginage.PageSize\"\r\n                                [RowsPerPageOptions]=\"paginage.RowsPerPageOptions\" (onPageChange)=\"pageChanges($event)\">\r\n                            </app-pagination-table>\r\n                        </div> -->\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"row\">\r\n                    <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">ยอดนำส่งรวม :</label>\r\n                    <div class=\"form-group col-lg-4 col-md-7\">\r\n                        <input type=\"text\" [(ngModel)]=\"txtCompareFine_Value\" name=\"txtCompareFine\" class=\"form-control form-control-sm\" readonly>\r\n                    </div>\r\n\r\n                    <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">จำนวนคดี :</label>\r\n                    <div class=\"col-lg-4 col-md-7 form-group \">\r\n                        <input type=\"text\" [(ngModel)]=\"txtMistreatNo_Value\" name=\"txtMistreatNo\" class=\"form-control form-control-sm\" readonly>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"row\">\r\n                    <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">เงินสินบน :</label>\r\n                    <div class=\"form-group col-lg-4 col-md-7\">\r\n                        <input type=\"text\" [(ngModel)]=\"txtBribeMoney_Value\" name=\"txtBribeMoney\" class=\"form-control form-control-sm\" readonly>\r\n                    </div>\r\n\r\n                    <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">เงินรางวัล :</label>\r\n                    <div class=\"col-lg-4 col-md-7 form-group \">\r\n                        <input type=\"text\" [(ngModel)]=\"txtRewardMoney_Value\" name=\"txtRewardMoney\" class=\"form-control form-control-sm\" readonly>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"row\">\r\n                    <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">เงินส่งคลัง :</label>\r\n                    <div class=\"form-group col-lg-4 col-md-7\">\r\n                        <input type=\"text\" [(ngModel)]=\"txtTreasuryMoney_Value\" name=\"txtTreasuryMoney\" class=\"form-control form-control-sm\" readonly>\r\n                    </div>\r\n                </div>\r\n            </form>\r\n\r\n        </div>\r\n    </div>\r\n\r\n</form>"

/***/ }),

/***/ "./src/app/pages/income/manage/manage.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_header_navigation_navigation_service__ = __webpack_require__("./src/app/shared/header-navigation/navigation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__income_service__ = __webpack_require__("./src/app/pages/income/income.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Revenue__ = __webpack_require__("./src/app/pages/income/Revenue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__config_message__ = __webpack_require__("./src/app/config/message.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__staff__ = __webpack_require__("./src/app/pages/income/staff.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_preloader_preloader_component__ = __webpack_require__("./src/app/shared/preloader/preloader.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__config_dateFormat__ = __webpack_require__("./src/app/config/dateFormat.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__config_pagination__ = __webpack_require__("./src/app/config/pagination.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__shared_sidebar_sidebar_component__ = __webpack_require__("./src/app/shared/sidebar/sidebar.component.ts");
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
//#region "Imports"













//#endregion
var ManageComponent = /** @class */ (function () {
    //#endregion
    //#region "Ng"
    function ManageComponent(activeRoute, formBuilder, ngbModel, navService, IncService, preloader, router, sidebarService) {
        this.activeRoute = activeRoute;
        this.formBuilder = formBuilder;
        this.ngbModel = ngbModel;
        this.navService = navService;
        this.IncService = IncService;
        this.preloader = preloader;
        this.router = router;
        this.sidebarService = sidebarService;
        this.txtCompareFine_Value = "0.00"; // ยอดนำส่งรวม
        this.txtMistreatNo_Value = 0; // จำนวนคดี
        this.txtBribeMoney_Value = "0.00"; // เงินสินบนรวม
        this.txtRewardMoney_Value = "0.00"; // เงินรางวัลรวม
        this.txtTreasuryMoney_Value = "0.00"; // เงินส่งคลัง
        this.revenueCmpList = [];
        this.oldCompareRecId = [];
        this.paginage = __WEBPACK_IMPORTED_MODULE_11__config_pagination__["a" /* pagination */];
        this.revenueCmp = [];
        this.StaffSendoptions = [];
        this.rawStaffSendOptions = [];
        this.Staffoptions = [];
        this.rawOptions = [];
        this.informOptions = [];
        this.options = [];
        this.ListRevenueDetail = [];
        this.ListRevenueDetailPaging = [];
        this.ListChK = [];
        this.oRevenue = new __WEBPACK_IMPORTED_MODULE_4__Revenue__["a" /* Revenue */]();
        this.oRevenueDetail = new __WEBPACK_IMPORTED_MODULE_4__Revenue__["b" /* RevenueDetail */]();
        this.oRevenueSendStaff = new __WEBPACK_IMPORTED_MODULE_8__staff__["a" /* Staff */]();
        this.oRevenueStaff = new __WEBPACK_IMPORTED_MODULE_8__staff__["a" /* Staff */]();
        // set false
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
        this.navService.setNextPageButton(false);
    }
    ManageComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.sidebarService.setVersion('Revenue 0.0.0.2');
                        this.preloader.setShowPreloader(true);
                        this.active_Route();
                        this.navigate_Service();
                        this.selRevenueStatus_Value = 0;
                        this.txtRevenueNo_Value = "";
                        this.txtRevenueStation_Value == "";
                        this.txtStaffSendName_Value == "";
                        this.txtStaffName_Value == "";
                        this.txtInformTo_Value = "";
                        _a = this;
                        return [4 /*yield*/, this.getCurrentTime()];
                    case 1:
                        _a.txtRevenueTime_Value = _b.sent();
                        this.txtRevenueDate_Value = Object(__WEBPACK_IMPORTED_MODULE_10__config_dateFormat__["f" /* setDateMyDatepicker */])(new Date(this.getCurrentDate()));
                        return [4 /*yield*/, this.CreateObject()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.getMasStaffMaingetAll()];
                    case 3:
                        _b.sent();
                        if (!(this.mode === 'R')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.ShowRevenue()];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        this.paginage.TotalItems = this.ListRevenueDetail.length;
                        this.ListRevenueDetailPaging = this.ListRevenueDetail.slice(0, this.paginage.RowsPerPageOptions[0]);
                        this.CheckCompareReceive();
                        this.preloader.setShowPreloader(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    //#endregion
    //#region "Events"
    ManageComponent.prototype.chkAll_onChange = function () {
        for (var i = 0; i < this.revenueCmpList.length; i++) {
            this.revenueCmpList[i].IsCheck = this.chkAll_Value;
        }
        this.RevenueSummary();
    };
    ManageComponent.prototype.chkDetail_onChange = function () {
        //alert("test");
        this.chkAll_Value = this.revenueCmpList.every(function (item) {
            return item.IsCheck == true;
        });
        this.RevenueSummary();
    };
    //#region " ผู้จัดทำ "
    ManageComponent.prototype.txtStaffName_onInput = function (value) {
        if (value == '') {
            //alert(this.revenueCmpList.length);
            this.Staffoptions = [];
            this.ClearStaffData();
            this.txtPosStaff_Value = "";
            this.txtDeptStaff_Value = "";
            this.DeptStaffCode = "";
        }
        else {
            //alert(this.revenueCmpList.length);
            this.Staffoptions = this.rawStaffSendOptions.filter(function (f) { return f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1; });
        }
    };
    ManageComponent.prototype.txtStaffName_onFocus = function (value) {
        if (value == '') {
            this.Staffoptions = [];
            this.ClearStaffData();
            this.txtPosStaff_Value = "";
            this.txtDeptStaff_Value = "";
            this.DeptStaffCode = "";
        }
    };
    ManageComponent.prototype.txtStaffName_onClick = function (event) {
        //alert(this.revenueCmpList.length);
        console.log(this.txtRevenueDate_Value);
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
            ContributorID: "34",
            IsActive: "1"
        };
        this.txtPosStaff_Value = event.PosLevelName;
        this.txtDeptStaff_Value = event.OfficeName;
        this.DeptStaffCode = event.OperationDeptCode;
        this.getRevenueComparegetByCon();
    };
    //#endregion
    //#region " ผู้นำส่ง "
    ManageComponent.prototype.txtStaffSendName_onInput = function (value) {
        if (value == '') {
            this.StaffSendoptions = [];
            this.ClearStaffSendData();
            this.txtPosSend_Value = "";
            this.txtDeptSend_Value = "";
        }
        else {
            this.StaffSendoptions = this.rawStaffSendOptions.filter(function (f) { return f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1; });
        }
    };
    ManageComponent.prototype.txtStaffSendName_onFocus = function (value) {
        if (value == '') {
            this.StaffSendoptions = [];
            this.ClearStaffSendData();
            this.txtPosSend_Value = "";
            this.txtDeptSend_Value = "";
        }
    };
    ManageComponent.prototype.txtStaffSendName_onClick = function (event) {
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
            ContributorID: "20",
            IsActive: "1"
        };
        this.txtPosSend_Value = event.PosLevelName;
        this.txtDeptSend_Value = event.OfficeName;
    };
    //#endregion
    //#region " เรียน "
    ManageComponent.prototype.txtInformTo_onInput = function (value) {
        if (value == '') {
            this.informOptions = [];
        }
        else {
            this.informOptions = this.rawStaffSendOptions.filter(function (f) { return f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1; });
        }
    };
    //#endregion
    //#region " เขียนที่ "
    ManageComponent.prototype.txtRevenueStation_onFocus = function (value) {
        if (value == '') {
            this.options = [];
            this.oRevenue.StationCode = "";
            this.oRevenue.StationName = "";
        }
    };
    ManageComponent.prototype.txtRevenueStation_onClick = function (event) {
        this.oRevenue.StationCode = event.OfficeCode;
        this.oRevenue.StationName = event.OfficeName;
    };
    ManageComponent.prototype.txtRevenueStation_onInput = function (value) {
        if (value == '') {
            this.options = [];
            this.oRevenue.StationCode = "";
            this.oRevenue.StationName = "";
        }
        else {
            this.options = this.rawStaffSendOptions.filter(function (f) { return f.OfficeName.toLowerCase().indexOf(value.toLowerCase()) > -1; });
        }
    };
    //#endregion
    //#endregion
    //#region "Getters"
    ManageComponent.prototype.getMasStaffMaingetAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.IncService.MasStaffMaingetAll().then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (res) {
                                    this.rawStaffSendOptions = res;
                                }
                                return [2 /*return*/];
                            });
                        }); }, function (err) {
                            //alert(err.message);
                            alert(err.statusText);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.getRevenueComparegetByCon = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.preloader.setShowPreloader(true);
                        //alert(this.DeptStaffCode);
                        //alert(this.getCurrentDate());
                        return [4 /*yield*/, this.IncService.RevenueComparegetByCon(this.getCurrentDate() + "T00:00:00.0", this.DeptStaffCode).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!res) return [3 /*break*/, 2];
                                            if (res.length == 0) {
                                                if (this.mode === 'C') {
                                                    alert("ไม่พบข้อมูล");
                                                }
                                            }
                                            //console.log(res);
                                            return [4 /*yield*/, res.map(function (item) {
                                                    item.IsCheck = false;
                                                    item.TreasuryMoney = item.RevenueCompareDetail[0].TreasuryMoney;
                                                    item.BribeMoney = item.RevenueCompareDetail[0].BribeMoney;
                                                    item.RewardMoney = item.RevenueCompareDetail[0].RewardMoney;
                                                    item.TotalFine = item.RevenueCompareDetail[0].RevenueCompareDetailReceipt[0].TotalFine;
                                                    item.ReceiptNo = item.RevenueCompareDetail[0].RevenueCompareDetailReceipt[0].ReceiptNo;
                                                    item.TreasuryMoney = parseFloat(item.TreasuryMoney).toLocaleString(undefined, { minimumFractionDigits: 2 });
                                                    item.BribeMoney = parseFloat(item.BribeMoney).toLocaleString(undefined, { minimumFractionDigits: 2 });
                                                    item.RewardMoney = parseFloat(item.RewardMoney).toLocaleString(undefined, { minimumFractionDigits: 2 });
                                                    item.TotalFine = parseFloat(item.TotalFine).toLocaleString(undefined, { minimumFractionDigits: 2 });
                                                    item.CompareReceiptID = item.RevenueCompareDetail[0].RevenueCompareDetailReceipt[0].CompareReceiptID;
                                                    item.PaymentDate = Object(__WEBPACK_IMPORTED_MODULE_10__config_dateFormat__["j" /* toLocalShort */])(item.RevenueCompareDetail[0].RevenueCompareDetailReceipt[0].PaymentDate);
                                                    //let tmp = item.RevenueCompareDetail[0].RevenueArrestIndicmentDetail[0].RevenueArrestLawbreaker.filter(i => i.IsActive === '1');
                                                    item.LawBreaker = item.RevenueCompareDetail[0].LawbreakerTitleName + item.RevenueCompareDetail[0].LawbreakerFirstName + ' ' + item.RevenueCompareDetail[0].LawbreakerLastName;
                                                    var tmp = item.RevenueCompareStaff.filter(function (i) { return i.ContributorID === 19; });
                                                    item.StaffReceip = tmp[0].TitleName + tmp[0].FirstName + ' ' + tmp[0].LastName;
                                                })
                                                //this.revenueCmp = res;
                                                //alert(this.revenueCmpList.length);
                                                //res.push({"IsCheck":false,"CompareCode":"111"});
                                                //res.push({"IsCheck":true,"CompareCode":"222"});
                                            ];
                                        case 1:
                                            //console.log(res);
                                            _a.sent();
                                            //this.revenueCmp = res;
                                            //alert(this.revenueCmpList.length);
                                            //res.push({"IsCheck":false,"CompareCode":"111"});
                                            //res.push({"IsCheck":true,"CompareCode":"222"});
                                            this.revenueCmp = this.revenueCmpList.concat(res);
                                            //this.paginage.TotalItems = this.revenueCmp.length;
                                            //this.revenueCmpList = this.revenueCmp.slice(0, this.paginage.RowsPerPageOptions[0]);
                                            this.revenueCmpList = this.revenueCmp;
                                            this.preloader.setShowPreloader(false);
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); }, function (err) {
                                //alert(err.message);
                                alert(err.statusText);
                            })];
                    case 1:
                        //alert(this.DeptStaffCode);
                        //alert(this.getCurrentDate());
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.getReveneueStaff = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.IncService.StaffgetByKeyword().then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (res) {
                                    this.rawStaffSendOptions = res;
                                }
                                return [2 /*return*/];
                            });
                        }); }, function (err) {
                            //alert(err.message);
                            alert(err.statusText);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.getStation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // this.preloader.setShowPreloader(true);
                    return [4 /*yield*/, this.IncService.getDepartment().then(function (res) { return __awaiter(_this, void 0, void 0, function () {
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
    //#endregion
    //#region "Functions"
    ManageComponent.prototype.ShowRevenue = function () {
        var _this = this;
        this.IncService.getByCon(this.revenueID).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
            var RDate, SStaff, Staff, tmp, _loop_1, this_1, j;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(res != null)) return [3 /*break*/, 6];
                        this.preloader.setShowPreloader(true);
                        // if (res[0].RevenueDetail.length > 0) {
                        //     this.ReceiptBookNo = res[0].RevenueDetail[0].ReceiptBookNo;
                        // }
                        // else {
                        //     this.ReceiptBookNo = "";
                        // }
                        this.txtRevenueCode_Value = res[0].RevenueCode;
                        this.oRevenue.RevenueID = res[0].RevenueID;
                        this.oRevenue.StationCode = res[0].StationCode;
                        this.txtRevenueStation_Value = res[0].StationName;
                        this.txtRevenueNo_Value = res[0].RevenueNo;
                        this.txtInformTo_Value = res[0].InformTo;
                        RDate = res[0].RevenueDate.toString().split("T");
                        this.txtRevenueDate_Value = Object(__WEBPACK_IMPORTED_MODULE_10__config_dateFormat__["f" /* setDateMyDatepicker */])(new Date(RDate[0]));
                        this.txtRevenueTime_Value = RDate[1].substring(0, 5);
                        SStaff = res[0].RevenueStaff.filter(function (f) { return f.ContributorID == 20; });
                        if (SStaff.length > 0) {
                            this.txtStaffSendName_Value = SStaff[0].TitleName + SStaff[0].FirstName + ' ' + SStaff[0].LastName;
                            this.txtPosSend_Value = SStaff[0].PositionName;
                            this.txtDeptSend_Value = SStaff[0].OfficeName;
                            this.StaffSendID = SStaff[0].StaffID;
                            this.oRevenueSendStaff = SStaff[0];
                            console.log(SStaff[0]);
                            this.DeptStaffCode = SStaff[0].DepartmentCode;
                        }
                        Staff = res[0].RevenueStaff.filter(function (f) { return f.ContributorID == 34; });
                        if (Staff.length) {
                            this.txtStaffName_Value = Staff[0].TitleName + Staff[0].FirstName + ' ' + Staff[0].LastName;
                            this.txtPosStaff_Value = Staff[0].PositionName;
                            this.txtDeptStaff_Value = Staff[0].OfficeName;
                            this.StaffID = Staff[0].StaffID;
                            this.oRevenueStaff = Staff[0];
                        }
                        this.selRevenueStatus_Value = res[0].RevenueStatus;
                        if (!(res[0].RevenueDetail.length > 0)) return [3 /*break*/, 6];
                        console.log(res[0].RevenueDetail);
                        tmp = [];
                        _loop_1 = function () {
                            var tmp_rev_id;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        //alert(res[0].RevenueDetail.CompareReceiptID);
                                        this_1.oldCompareRecId.push(res[0].RevenueDetail[j].CompareReceiptID);
                                        tmp_rev_id = res[0].RevenueDetail[j].RevenueDetailID;
                                        return [4 /*yield*/, this_1.IncService.getRevenueComparegetByCompareReceiptID(res[0].RevenueDetail[j].CompareReceiptID).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                                var o, tmp2;
                                                return __generator(this, function (_a) {
                                                    o = new Object();
                                                    o["CompareCode"] = res[0].CompareCode;
                                                    //o.ReceiptNo = "111";
                                                    o["LawBreaker"] = "111";
                                                    o["StaffReceip"] = "111";
                                                    //o.PaymentDate = "111";
                                                    //o.TotalFine = "111";
                                                    //o.BribeMoney = "111";
                                                    //o.TreasuryMoney = "111";
                                                    //o.RewardMoney = "111";
                                                    o["IsCheck"] = true;
                                                    console.log(res[0]);
                                                    o["RevenueDetailID"] = tmp_rev_id;
                                                    o["TreasuryMoney"] = res[0].RevenueCompareDetail[0].TreasuryMoney;
                                                    o["BribeMoney"] = res[0].RevenueCompareDetail[0].BribeMoney;
                                                    o["RewardMoney"] = res[0].RevenueCompareDetail[0].RewardMoney;
                                                    o["TotalFine"] = res[0].RevenueCompareDetail[0].RevenueCompareDetailReceipt[0].TotalFine;
                                                    o["ReceiptNo"] = res[0].RevenueCompareDetail[0].RevenueCompareDetailReceipt[0].ReceiptNo;
                                                    o["TreasuryMoney"] = parseFloat(o["TreasuryMoney"]).toLocaleString(undefined, { minimumFractionDigits: 2 });
                                                    o["BribeMoney"] = parseFloat(o["BribeMoney"]).toLocaleString(undefined, { minimumFractionDigits: 2 });
                                                    o["RewardMoney"] = parseFloat(o["RewardMoney"]).toLocaleString(undefined, { minimumFractionDigits: 2 });
                                                    o["TotalFine"] = parseFloat(o["TotalFine"]).toLocaleString(undefined, { minimumFractionDigits: 2 });
                                                    o["CompareReceiptID"] = res[0].RevenueCompareDetail[0].RevenueCompareDetailReceipt[0].CompareReceiptID;
                                                    o["PaymentDate"] = Object(__WEBPACK_IMPORTED_MODULE_10__config_dateFormat__["j" /* toLocalShort */])(res[0].RevenueCompareDetail[0].RevenueCompareDetailReceipt[0].PaymentDate);
                                                    //let tmp = res[0].RevenueCompareDetail[0].RevenueArrestIndicmentDetail[0].RevenueArrestLawbreaker.filter(i => i.IsActive === '1');
                                                    o["LawBreaker"] = res[0].RevenueCompareDetail[0].LawbreakerTitleName + res[0].RevenueCompareDetail[0].LawbreakerFirstName + ' ' + res[0].RevenueCompareDetail[0].LawbreakerLastName;
                                                    tmp2 = res[0].RevenueCompareStaff.filter(function (i) { return i.ContributorID === 19; });
                                                    //alert(tmp.length);
                                                    o["StaffReceip"] = tmp2[0].TitleName + tmp2[0].FirstName + ' ' + tmp2[0].LastName;
                                                    tmp.push(o);
                                                    return [2 /*return*/];
                                                });
                                            }); })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        j = 0;
                        _a.label = 1;
                    case 1:
                        if (!(j < res[0].RevenueDetail.length)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        j += 1;
                        return [3 /*break*/, 1];
                    case 4:
                        //}
                        this.revenueCmpList = tmp;
                        return [4 /*yield*/, this.getRevenueComparegetByCon()];
                    case 5:
                        _a.sent();
                        this.chkDetail_onChange();
                        this.RevenueSummary();
                        this.preloader.setShowPreloader(false);
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); }, function (err) {
            alert(err.message);
        });
    };
    ManageComponent.prototype.ShowRevenueCompare = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
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
    ManageComponent.prototype.ClearStaffSendData = function () {
        this.txtPosSend_Value = "";
        this.txtDeptSend_Value = "";
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
            ContributorID: "20",
            IsActive: "1"
        };
    };
    ManageComponent.prototype.ClearStaffData = function () {
        this.txtPosStaff_Value = "";
        this.txtDeptStaff_Value = "";
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
            ContributorID: "34",
            IsActive: "1"
        };
    };
    ManageComponent.prototype.RevenueSummary = function () {
        var _this = this;
        var CompareFine = 0, BribeMoney = 0, RewardMoney = 0, TreasuryMoney = 0;
        var tmp = [];
        this.revenueCmpList.filter(function (item) { return item.IsCheck === true; })
            .map(function (item) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //alert(parseFloat(  item.TreasuryMoney.toString().replace(',','') ));
                BribeMoney += parseFloat(item.BribeMoney.toString().replace(',', ''));
                RewardMoney += parseFloat(item.RewardMoney.toString().replace(',', ''));
                TreasuryMoney += parseFloat(item.TreasuryMoney.toString().replace(',', ''));
                if (!tmp.includes(item.CompareCode)) {
                    tmp.push(item.CompareCode);
                }
                return [2 /*return*/];
            });
        }); });
        this.txtMistreatNo_Value = tmp.length;
        this.txtCompareFine_Value = (BribeMoney + RewardMoney + TreasuryMoney).toLocaleString(undefined, { minimumFractionDigits: 2 });
        this.txtBribeMoney_Value = BribeMoney.toLocaleString(undefined, { minimumFractionDigits: 2 });
        this.txtRewardMoney_Value = RewardMoney.toLocaleString(undefined, { minimumFractionDigits: 2 });
        this.txtTreasuryMoney_Value = TreasuryMoney.toLocaleString(undefined, { minimumFractionDigits: 2 });
    };
    ManageComponent.prototype.CheckCompareReceive = function () {
        this.ListChK = [];
        for (var i = 0; i < this.ListRevenueDetailPaging.length; i += 1) {
            if (this.ListRevenueDetailPaging[i].IsCheck) {
                this.ListChK.push(true);
            }
            else {
                this.ListChK.push(false);
            }
        }
    };
    ManageComponent.prototype.onInsRevenue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var DRate, cDateRevenue, i, aaa, isSuccess;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.preloader.setShowPreloader(true);
                        DRate = this.txtRevenueDate_Value.date;
                        if (DRate != undefined) {
                            cDateRevenue = DRate.year + '-' + DRate.month + '-' + DRate.day + ' ' + this.txtRevenueTime_Value;
                        }
                        this.oRevenue.RevenueID = "";
                        this.oRevenue.RevenueNo = this.txtRevenueNo_Value;
                        this.oRevenue.RevenueDate = "2017-12-29T22:00:00.0";
                        this.oRevenue.RevenueCode = this.txtRevenueCode_Value;
                        this.oRevenue.InformTo = this.txtInformTo_Value;
                        this.oRevenue.RevenueStaff = [];
                        if (this.oRevenueSendStaff != null && this.oRevenueSendStaff != undefined) {
                            this.oRevenue.RevenueStaff.push(this.oRevenueSendStaff);
                        }
                        if (this.oRevenueStaff != null && this.oRevenueStaff != undefined) {
                            this.oRevenue.RevenueStaff.push(this.oRevenueStaff);
                        }
                        //this.oRevenue.RevenueDetail = this.ListRevenueDetailPaging.filter(item => item.IsCheck === true);
                        //RevenueCompareDetailReceiptupdByCon
                        this.oRevenue.RevenueDetail = [];
                        debugger;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.revenueCmpList.length)) return [3 /*break*/, 4];
                        if (!this.revenueCmpList[i].IsCheck) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.IncService.RevenueCompareDetailReceiptupdByCon(this.revenueCmpList[i].CompareReceiptID)];
                    case 2:
                        _a.sent(); //.then(async item => {
                        //     // debugger
                        //     // if (!item.IsSuccess) {
                        //     //     isSuccess = item.IsSuccess;
                        //     // }
                        // }, (error) => { isSuccess = false; console.error(error); return false; });
                        //let o = {ReceiptBookNo:"1",ReceiptNo:"2",RevenueStatus:"3",CompareReceiptID:"4"};
                        console.log(this.revenueCmpList[i].RevenueCompareDetail[0].RevenueCompareDetailReceipt[0].ReceiptBookNo);
                        debugger;
                        aaa = new __WEBPACK_IMPORTED_MODULE_4__Revenue__["b" /* RevenueDetail */];
                        aaa.ReceiptBookNo = this.revenueCmpList[i].RevenueCompareDetail[0].RevenueCompareDetailReceipt[0].ReceiptBookNo;
                        aaa.ReceiptNo = this.revenueCmpList[i].RevenueCompareDetail[0].RevenueCompareDetailReceipt[0].ReceiptNo;
                        aaa.RevenueStatus = this.revenueCmpList[i].RevenueCompareDetail[0].RevenueCompareDetailReceipt[0].RevenueStatus;
                        aaa.CompareReceiptID = this.revenueCmpList[i].RevenueCompareDetail[0].RevenueCompareDetailReceipt[0].CompareReceiptID;
                        this.oRevenue.RevenueDetail.push(aaa);
                        _a.label = 3;
                    case 3:
                        i += 1;
                        return [3 /*break*/, 1];
                    case 4:
                        isSuccess = true;
                        return [4 /*yield*/, this.IncService.RevenueinsAll(this.oRevenue).then(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (!item.IsSuccess) {
                                        isSuccess = item.IsSuccess;
                                    }
                                    return [2 /*return*/];
                                });
                            }); }, function (error) { isSuccess = false; console.error(error); return false; })];
                    case 5:
                        _a.sent();
                        this.preloader.setShowPreloader(false);
                        if (isSuccess) {
                            alert(__WEBPACK_IMPORTED_MODULE_6__config_message__["a" /* Message */].saveComplete);
                            // this.oProve = {};
                            // this.router.navigate(['/prove/list']);
                        }
                        else {
                            alert(__WEBPACK_IMPORTED_MODULE_6__config_message__["a" /* Message */].saveFail);
                            if (!isSuccess)
                                return [2 /*return*/, false];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.onUdpRevenue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var DRate, cDateRevenue, toDel, toAdd, now, i, i, i, i, j, i, j, isSuccess;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // console.log(this.oldCompareRecId);
                        // return "";
                        this.preloader.setShowPreloader(true);
                        DRate = this.txtRevenueDate_Value.date;
                        if (DRate != undefined) {
                            cDateRevenue = DRate.year + '-' + DRate.month + '-' + DRate.day + ' ' + this.txtRevenueTime_Value;
                        }
                        this.oRevenue.RevenueNo = this.txtRevenueNo_Value;
                        this.oRevenue.RevenueDate = "2017-12-29T22:00:00.0";
                        this.oRevenue.RevenueCode = this.txtRevenueCode_Value;
                        this.oRevenue.InformTo = this.txtInformTo_Value;
                        this.oRevenue.RevenueStaff = [];
                        if (this.oRevenueSendStaff != null && this.oRevenueSendStaff != undefined) {
                            this.oRevenue.RevenueStaff.push(this.oRevenueSendStaff);
                        }
                        if (this.oRevenueStaff != null && this.oRevenueStaff != undefined) {
                            this.oRevenue.RevenueStaff.push(this.oRevenueStaff);
                        }
                        //this.oRevenue.RevenueDetail = this.ListRevenueDetail.filter(item => item.IsCheck === true);
                        //debugger
                        this.oRevenue.RevenueDetail = [];
                        toDel = [];
                        toAdd = [];
                        now = [];
                        for (i = 0; i < this.revenueCmpList.length; i += 1) {
                            if (this.revenueCmpList[i].IsCheck) {
                                //this.oldCompareRecId;
                                now.push(this.revenueCmpList[i].CompareReceiptID);
                            }
                        }
                        for (i = 0; i < this.oldCompareRecId.length; i += 1) {
                            if (!now.includes(this.oldCompareRecId[i])) {
                                toDel.push(this.oldCompareRecId[i]);
                            }
                        }
                        for (i = 0; i < now.length; i += 1) {
                            if (!toDel.includes(now[i]) && !this.oldCompareRecId.includes(now[i])) {
                                toAdd.push(now[i]);
                            }
                        }
                        console.log(this.oldCompareRecId);
                        console.log(now);
                        console.log(toDel);
                        console.log(toAdd);
                        for (i = 0; i < toAdd.length; i += 1) {
                            for (j = 0; j < this.revenueCmpList.length; j += 1) {
                                if (this.revenueCmpList[j].CompareReceiptID == toAdd[i]) {
                                    console.log(this.revenueCmpList[j]);
                                    this.IncService.RevenueDetailinsAll(this.revenueCmpList[j].CompareCode, this.revenueCmpList[j].ReceiptNo, "1", this.revenueID, toAdd[i], "1");
                                    this.IncService.RevenueCompareDetailReceiptupdByCon(toAdd[i]);
                                }
                            }
                        }
                        for (i = 0; i < toDel.length; i += 1) {
                            for (j = 0; j < this.revenueCmpList.length; j += 1) {
                                //console.log(this.revenueCmpList[j]);
                                if (this.revenueCmpList[j].CompareReceiptID == toDel[i]) {
                                    console.log(this.revenueCmpList[j]);
                                    this.IncService.RevenueDetailupdDelete(this.revenueCmpList[j].RevenueDetailID);
                                    this.IncService.RevenueCompareDetailReceiptupdDelete(toDel[i]);
                                }
                            }
                        }
                        isSuccess = true;
                        return [4 /*yield*/, this.IncService.RevenueUdp(this.oRevenue).then(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (!item.IsSuccess) {
                                        isSuccess = item.IsSuccess;
                                    }
                                    return [2 /*return*/];
                                });
                            }); }, function (error) { isSuccess = false; console.error(error); return false; })];
                    case 1:
                        _a.sent();
                        this.preloader.setShowPreloader(false);
                        if (isSuccess) {
                            alert(__WEBPACK_IMPORTED_MODULE_6__config_message__["a" /* Message */].saveComplete);
                            this.onComplete();
                            this.navService.setOnSave(false);
                        }
                        else {
                            alert(__WEBPACK_IMPORTED_MODULE_6__config_message__["a" /* Message */].saveFail);
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.onDelete = function () {
        var _this = this;
        if (confirm("ยืนยันการทำรายการหรือไม่")) {
            this.preloader.setShowPreloader(true);
            this.IncService.RevenueupdDelete(this.revenueID).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    this.revenueCmpList.filter(function (item) { return item.IsCheck === true; })
                        .map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.IncService.RevenueCompareDetailReceiptupdDelete(item.CompareReceiptID)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    alert("ลบข้อมูลสำเร็จ");
                    this.router.navigate(['/income/list']);
                    return [2 /*return*/];
                });
            }); });
        }
    };
    ManageComponent.prototype.onComplete = function () {
        this.navService.setPrintButton(true);
        this.navService.setDeleteButton(true);
        this.navService.setEditButton(true);
        this.navService.setSearchBar(false);
        this.navService.setCancelButton(false);
        this.navService.setSaveButton(false);
        this.showEditField = true;
    };
    ManageComponent.prototype.pageChanges = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.ListRevenueDetail.slice(event.startIndex - 1, event.endIndex)];
                    case 1:
                        _a.ListRevenueDetailPaging = _b.sent();
                        this.CheckCompareReceive();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.getCurrentDate = function () {
        var date = new Date();
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).toISOString().substring(0, 10);
    };
    ManageComponent.prototype.getCurrentTime = function () {
        var date = new Date();
        var tmp = "000" + date.getHours();
        var tmp2 = "000" + date.getMinutes();
        // 
        return tmp.substring(tmp.length - 2) + ":" + tmp2.substring(tmp2.length - 2);
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
                _this.txtRevenueCode_Value = "LC-" + (new Date).getTime();
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
                    _this.revenueID = atob(p['code']);
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
                        if (!status) return [3 /*break*/, 5];
                        // set action save = false
                        return [4 /*yield*/, this.navService.setOnSave(false)];
                    case 1:
                        // set action save = false
                        _a.sent();
                        if (this.txtRevenueNo_Value == "" || this.txtRevenueStation_Value == "" || this.txtRevenueStation_Value == undefined
                            || this.txtStaffSendName_Value == "" || this.txtStaffSendName_Value == undefined
                            || this.txtStaffName_Value == "" || this.txtStaffName_Value == undefined
                            || this.txtRevenueDate_Value == null) {
                            this.isRequired = true;
                            alert(__WEBPACK_IMPORTED_MODULE_6__config_message__["a" /* Message */].checkData);
                            return [2 /*return*/, false];
                        }
                        if (!(this.mode == 'C')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.onInsRevenue()];
                    case 2:
                        _a.sent();
                        this.router.navigate(['/income/list']);
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.onUdpRevenue()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        this.sub = this.navService.onDelete.subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
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
        this.sub = this.navService.onPrint.subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
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
        this.sub = this.navService.onCancel.subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!status) return [3 /*break*/, 2];
                        if (!confirm(__WEBPACK_IMPORTED_MODULE_6__config_message__["a" /* Message */].confirmAction)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.navService.setOnCancel(false)];
                    case 1:
                        _a.sent();
                        this.router.navigate(['/income/list']);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
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
            __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_7__ng_bootstrap_ng_bootstrap__["d" /* NgbModal */],
            __WEBPACK_IMPORTED_MODULE_2__shared_header_navigation_navigation_service__["a" /* NavigationService */],
            __WEBPACK_IMPORTED_MODULE_3__income_service__["a" /* IncomeService */],
            __WEBPACK_IMPORTED_MODULE_9__shared_preloader_preloader_component__["b" /* PreloaderService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */],
            __WEBPACK_IMPORTED_MODULE_12__shared_sidebar_sidebar_component__["b" /* SidebarService */]])
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__component_pagination_table_pagination_table_module__ = __webpack_require__("./src/app/pages/component/pagination-table/pagination-table.module.ts");
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
                __WEBPACK_IMPORTED_MODULE_6__angular_http__["d" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_forms__["g" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_forms__["l" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* RouterModule */].forChild(routes),
                __WEBPACK_IMPORTED_MODULE_4__component_card_actions_card_actions_module__["a" /* CardActionsModule */],
                __WEBPACK_IMPORTED_MODULE_9__printdoc_modal_printdoc_modal_module__["a" /* PrintDocModalModule */],
                __WEBPACK_IMPORTED_MODULE_11_mydatepicker_th__["a" /* MyDatePickerTHModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material_autocomplete__["a" /* MatAutocompleteModule */],
                __WEBPACK_IMPORTED_MODULE_12__component_pagination_table_pagination_table_module__["a" /* PaginationTableModule */]
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

module.exports = "<!-- <form action=\"\" #form=\"ngForm\" (ngSubmit)=\"onPrint(form)\"> -->\r\n    <div class=\"modal-header bg-theme\">\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-5\">\r\n                <h4 class=\"modal-title text-white\">พิมพ์เอกสาร</h4>\r\n            </div>\r\n\r\n            <a href=\"javaScript:void(0);\" class=\"close text-white font-14\" aria-label=\"Close\" (click)=\"dismiss('Cross click')\">\r\n                <span aria-hidden=\"true\">\r\n                    <i class=\" ti-close\"></i>\r\n                </span>\r\n            </a>\r\n        </div>\r\n    </div>\r\n    <div class=\"modal-body font-14\">\r\n        <div class=\"card unset-radius\">\r\n            <div class=\"card-body p-0\">\r\n                <div class=\"table-responsive\">\r\n                    <div class=\"table-responsive table-striped \">\r\n                        <table class=\"table\">\r\n                            <thead>\r\n                                <tr>\r\n                                    <th style=\"text-align: center;width: 5%\"></th>\r\n                                    <th style=\"text-align: center;width: 7%\">ลำดับ</th>\r\n                                    <th>ชื่อเอกสาร</th>\r\n                                    <th>ประเภทเอกสาร</th>\r\n                                </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                                <tr *ngFor=\"let item of document; let i=index;\">\r\n                                    <td class=\"text-center\">\r\n                                        <!-- <input type=\"hidden\" name=\"InvestigateDetailID\" [(ngModel)]=\"item.InvestigateDetailID\"> -->\r\n                                        <input type=\"checkbox\" [id]=\"'td'+i\" name=\"checking\" ngModel class=\"filled-in chk-col-indigo\">\r\n                                        <label [for]=\"'td'+i\" class=\"m-0\"></label>\r\n                                    </td>\r\n                                    <td class=\"text-center\">{{i+1}}</td>\r\n                                    <td>รายงานการ{{item.DocumentName}}</td>\r\n                                    <td></td>\r\n                                </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <div class=\"col-lg-2 col-sm-4\">\r\n            <button type=\"button\" class=\"btn btn-block btn-themecolor\" (click)=\"close('Print click')\">พิมพ์</button>\r\n        </div>\r\n    </div>\r\n<!-- </form> -->"

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
        debugger;
        // this.incomeService.DocumentgetByCon(this.DocumentID).subscribe(result => {
        //     this.document = new Array<Document>();
        //     this.document = result;
        // })
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
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormBuilder */],
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



/***/ }),

/***/ "./src/app/pages/income/staff.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Staff; });
var Staff = /** @class */ (function () {
    function Staff() {
    }
    return Staff;
}());



/***/ })

});
//# sourceMappingURL=manage.module.0.chunk.js.map
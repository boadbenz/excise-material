webpackJsonp(["manage.module.4"],{

/***/ "./src/app/pages/income/manage/manage.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-template #printDocModal let-c=\"close\" let-d=\"dismiss\">\r\n    <app-printdoc-modal (c)=\"modal.close()\" (d)=\"modal.dismiss()\"></app-printdoc-modal>\r\n</ng-template>\r\n\r\n<div class=\"wizard-content\" style=\"margin-bottom: 10px;\">\r\n    <div class=\"wizard-circle wizard clearfix clearfix\">\r\n        <div class=\"steps tab-wizard\">\r\n            <ul role=\"tablist\">\r\n                <li role=\"tab\" class=\"current\" aria-disabled=\"false\" aria-selected=\"true\">\r\n                    <a>\r\n                        <span class=\"current-info audible\">current step: </span>\r\n                        <span class=\"step\"></span> 1. ใบแจ้งความนำจับ</a>\r\n                </li>\r\n                <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n                    <a>\r\n                        <span class=\"step\"></span> 2. งานจับกุม </a>\r\n                </li>\r\n                <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n                    <a>\r\n                        <span class=\"step\"></span> 3. รับคำกล่าวโทษ </a>\r\n                </li>\r\n                <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n                    <a>\r\n                        <span class=\"step\"></span> 4. งานตรวจรับและพิสูจน์ของกลาง </a>\r\n                </li>\r\n                <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n                    <a>\r\n                        <span class=\"step\"></span> 5. งานเปรียบเทียบและชำระค่าปรับ </a>\r\n                </li>\r\n                <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n                    <a>\r\n                        <span class=\"step\"></span> 6. นำส่งเงินรายได้ </a>\r\n                </li>\r\n                <li role=\"tab\" class=\"disabled\" aria-disabled=\"true\">\r\n                    <a>\r\n                        <span class=\"step\"></span> 7. คำร้องขอรับเงินสินบนรางวัล </a>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<!-- รายละเอียดการนำส่งเงินรายได้ -->\r\n<form class=\"form-horizontal\">\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header unset-radius\">\r\n            <app-card-actions-collapse></app-card-actions-collapse>\r\n            <h4 class=\"card-title m-b-0\">รายละเอียดการนำส่งเงินรายได้</h4>\r\n        </div>\r\n        <div class=\"card-body\">\r\n\r\n            \r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">เลขที่นำส่งเงิน :</label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\r\n                    <div class=\"form-group \">\r\n                        <input type=\"text\" name=\"RevenueCode\" [(ngModel)]=\"RevenueCode\" class=\"form-control form-control-sm\" readonly>\r\n                    </div>\r\n                </div>\r\n\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">วันที่นำส่ง :\r\n                </label>\r\n                <div class=\"form-group input-group  col-lg-4 col-md-7\">\r\n                    <div style=\"width:45%\">\r\n                        <my-date-picker-th name=\"RevenueDate\" [(ngModel)]=\"RevenueDate\" \r\n                        [ngClass]=\"{'ng-touched':isRequired}\" [disabled]=\"mode=='R'\" \r\n                        required ></my-date-picker-th>\r\n                    </div>\r\n                    <label for=\"\" class=\"\">&nbsp; เวลา : &nbsp;</label>\r\n                    <input type=\"text\" [(ngModel)]=\"RevenueTime\" name=\"RevenueTime\" style=\"height: 35px;\" class=\"form-control form-control-sm\" [disabled]=\"mode=='R'\">\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">เลขที่หนังสือนำส่ง :\r\n                </label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\r\n                    <div class=\"form-group \">\r\n                        <input type=\"text\" name=\"RevenueNo\" [(ngModel)]=\"RevenueNo\" class=\"form-control form-control-sm\" [disabled]=\"showEditField\"\r\n                            [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                    </div>\r\n                </div>\r\n\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">เรียน :\r\n                </label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" class=\"form-control form-control-sm\" [(ngModel)]=\"InformTo\" name=\"InformTo\" placeholder=\"พิมพ์ข้อความ\" aria-label=\"Number\"\r\n                    matInput [matAutocomplete]=\"auto4\" (input)=\"InformToonAutoChange($event.target.value)\"\r\n                    [disabled]=\"showEditField\" [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                <mat-autocomplete #auto4=\"matAutocomplete\">\r\n                    <mat-option *ngFor=\"let infOption of InformTooptions\" [value]=\"infOption.TitleName + infOption.FirstName + ' ' + infOption.LastName\">\r\n                        {{ infOption.TitleName }}{{ infOption.FirstName }} {{ infOption.LastName }}\r\n                    </mat-option>\r\n                </mat-autocomplete>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">เขียนที่ :\r\n                </label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\r\n                    <div class=\"form-group \">\r\n                        <input type=\"text\" class=\"form-control form-control-sm\" [(ngModel)]=\"RevenueStation\" name=\"RevenueStation\" placeholder=\"พิมพ์ข้อความ\" aria-label=\"Number\"\r\n                            matInput [matAutocomplete]=\"auto3\" (input)=\"onAutoChange($event.target.value)\" (focus)=\"onAutoFocus($event.target.value)\"\r\n                            [disabled]=\"showEditField\" [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                        <mat-autocomplete #auto3=\"matAutocomplete\">\r\n                            <mat-option *ngFor=\"let option of options\" [value]=\"option.OfficeName\" \r\n                                (click)=\"onAutoSelecteWord(option)\" (onSelectionChange)=\"onAutoSelecteWord(option)\">\r\n                                {{ option.OfficeName }}\r\n                            </mat-option>\r\n                        </mat-autocomplete>\r\n                    </div>\r\n                </div>\r\n\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">ผู้นำส่ง :\r\n                </label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" class=\"form-control form-control-sm\" [(ngModel)]=\"StaffSendName\" name=\"StaffSendName\" placeholder=\"พิมพ์ข้อความ\" aria-label=\"Number\"\r\n                        matInput [matAutocomplete]=\"auto\" (input)=\"StaffSendonAutoChange($event.target.value)\" (focus)=\"StaffSendonAutoFocus($event.target.value)\"\r\n                        [disabled]=\"showEditField\" [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                    <mat-autocomplete #auto=\"matAutocomplete\">\r\n                        <mat-option *ngFor=\"let ssOption of StaffSendoptions\" [value]=\"ssOption.TitleName + ssOption.FirstName + ' ' + ssOption.LastName\"\r\n                            (click)=\"StaffSendonAutoSelecteWord(ssOption)\" (onSelectionChange)=\"StaffSendonAutoSelecteWord(ssOption)\">\r\n                            {{ ssOption.TitleName }}{{ ssOption.FirstName }} {{ ssOption.LastName }}\r\n                        </mat-option>\r\n                    </mat-autocomplete>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">ตำแหน่ง :\r\n                </label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\r\n                    <div class=\"form-group \">\r\n                        <input type=\"text\" [(ngModel)]=\"PosSend\" name=\"PosSend\" class=\"form-control form-control-sm\" [ngClass]=\"{'ng-touched':isRequired}\" required readonly>\r\n                    </div>\r\n                </div>\r\n\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">หน่วยงาน :\r\n                </label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" [(ngModel)]=\"DeptSend\" name=\"DeptSend\" class=\"form-control form-control-sm\" [ngClass]=\"{'ng-touched':isRequired}\" required readonly>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">ผู้จัดทำ :\r\n                </label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\r\n                    <div class=\"form-group \">\r\n                        <input type=\"text\" class=\"form-control form-control-sm\" [(ngModel)]=\"StaffName\" name=\"StaffName\" placeholder=\"พิมพ์ข้อความ\" aria-label=\"Number\"\r\n                            matInput [matAutocomplete]=\"auto2\" (input)=\"StaffonAutoChange($event.target.value)\" (focus)=\"StaffonAutoFocus($event.target.value)\"\r\n                            [ngClass]=\"{'ng-touched':isRequired}\" required [disabled]=\"mode=='R'\">\r\n                        <mat-autocomplete #auto2=\"matAutocomplete\">\r\n                            <mat-option *ngFor=\"let sOption of Staffoptions\" [value]=\"sOption.TitleName + sOption.FirstName + ' ' + sOption.LastName\"\r\n                                (click)=\"StaffonAutoSelecteWord(sOption)\" (onSelectionChange)=\"StaffonAutoSelecteWord(sOption)\">\r\n                                {{ sOption.TitleName }}{{ sOption.FirstName }} {{ sOption.LastName }}\r\n                            </mat-option>\r\n                        </mat-autocomplete>\r\n                    </div>\r\n                </div>\r\n\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">ตำแหน่ง :\r\n                </label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" [(ngModel)]=\"PosStaff\" name=\"PosStaff\" class=\"form-control form-control-sm\" [ngClass]=\"{'ng-touched':isRequired}\" required readonly>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">หน่วยงาน :\r\n                </label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\r\n                    <div class=\"form-group \">\r\n                        <input type=\"text\" [(ngModel)]=\"DeptStaff\" name=\"DeptStaff\" class=\"form-control form-control-sm\" [ngClass]=\"{'ng-touched':isRequired}\" required readonly>\r\n                    </div>\r\n                </div>\r\n\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">สถานะนำส่งเงิน :\r\n                </label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                        <!-- [(ngModel)]=\"RevenueStatus\" name=\"RevenueStatus\" -->\r\n                    <select class=\"form-control form-control-sm\" disabled [(ngModel)]=\"RevenueStatus\" name=\"RevenueStatus\">\r\n                        <option value=\"0\"></option>\r\n                        <option value=\"1\">นำส่งเงินรายได้</option>\r\n                        <option value=\"2\">รับรายการนำส่งเงิน</option>\r\n                    </select>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"col-lg-10 col-md-7 col-sm-8\">\r\n                </div>\r\n\r\n                <div class=\"form-group col-lg-2 col-md-7 col-sm-8\">\r\n                    <button type=\"button\" (click)=\"ShowRevenueCompare()\" class=\"btn btn-block btn-themecolor\" [disabled]=\"showEditField\" >อัพเดตรายการนำส่ง</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <!-- รายการที่ยังไม่นำส่งเงินรายได้ -->\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header unset-radius\">\r\n            <app-card-actions-collapse></app-card-actions-collapse>\r\n            <h4 class=\"card-title m-b-0\">รายการที่ยังไม่นำส่งเงินรายได้</h4>\r\n        </div>\r\n        <div class=\"card-body\">\r\n\r\n            <form class=\"form-horizontal\">\r\n                <div class=\"card\">\r\n                    <div class=\"card-body\">\r\n\r\n                        <div class=\"table-responsive table-striped \">\r\n                            <table class=\"table\">\r\n                                <thead>\r\n                                    <tr>\r\n                                        <th>\r\n                                            <input type=\"checkbox\" id=\"H_0\" class=\"filled-in chk-col-indigo\" name=\"selectAllChb\" [(ngModel)]=\"selectAllChb\" (change)=\"selectedChkAll();\" [disabled]=\"showEditField\">\r\n                                            <label for=\"H_0\" class=\"m-0\"></label>\r\n                                        </th>\r\n                                        <th style=\"text-align: center\">ลำดับ</th>\r\n                                        <th>เลขคดีเปรียบเทียบ</th>\r\n                                        <th style=\"text-align: center;\">เลขที่ใบเสร็จ</th>\r\n                                        <th>ผู้ต้องหา</th>\r\n                                        <th>ผู้รับชำระค่าปรับ</th>\r\n                                        <th>วันที่ชำระ</th>\r\n                                        <th>ยอดชำระ</th>\r\n                                        <th>เงินสินบน</th>\r\n                                        <th>เงินรางวัล</th>\r\n                                        <th>เงินส่งคลัง</th>\r\n                                    </tr>\r\n                                </thead>\r\n                                <tbody>\r\n                                    <tr *ngIf=\"!ListRevenueDetailPaging\"><td colspan=\"11\">ไม่พบข้อมูล</td></tr>\r\n                                    <tr *ngFor=\"let item of ListRevenueDetailPaging; let i=index;\">\r\n                                        <td style=\"text-align: center\">\r\n                                            <input type=\"checkbox\" class=\"filled-in chk-col-indigo\" id=\"ListChK{{i}}\" name=\"ListChK{{i}}\" [(ngModel)]=\"item.IsCheck\"\r\n                                                (change)=\"checkIfAllChbSelected();\" [ngClass]=\"{'ng-touched':isRequired}\" [disabled]=\"showEditField\" >\r\n                                            <label [for]=\"'ListChK'+i\" class=\"m-0\"></label>\r\n                                        </td>\r\n                                        <th style=\"text-align: center\">{{i + 1}}</th>\r\n                                        <th>{{ item.CompareCode }}</th>\r\n                                        <th style=\"text-align: center;\">{{ item.ReceiptNo }}</th>\r\n                                        <th>{{ item.LawBreaker }}</th>\r\n                                        <th>{{ item.StaffReceip }}</th>\r\n                                        <th>{{ item.PaymentDate }}</th>\r\n                                        <th>{{ item.TotalFine | number:0 }}</th>\r\n                                        <th>{{ item.BribeMoney | number:0 }}</th>\r\n                                        <th>{{ item.TreasuryMoney | number:0 }}</th>\r\n                                        <th>{{ item.RewardMoney | number:0 }}</th>\r\n                                    </tr>\r\n                                </tbody>\r\n                            </table>\r\n                        </div>\r\n\r\n                        <div class=\"card-footer card-footer-unset\">\r\n                            <app-pagination-table [TotalItems]=\"paginage.TotalItems\" [CurrentPage]=\"paginage.CurrentPage\" [PageSize]=\"paginage.PageSize\"\r\n                                [RowsPerPageOptions]=\"paginage.RowsPerPageOptions\" (onPageChange)=\"pageChanges($event)\">\r\n                            </app-pagination-table>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"row\">\r\n                    <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">ยอดนำส่งรวม :</label>\r\n                    <div class=\"form-group col-lg-4 col-md-7\">\r\n                        <input type=\"text\" [(ngModel)]=\"CompareFine\" name=\"CompareFine\" class=\"form-control form-control-sm\" readonly>\r\n                    </div>\r\n\r\n                    <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">จำนวนคดี :</label>\r\n                    <div class=\"col-lg-4 col-md-7 form-group \">\r\n                        <input type=\"text\" [(ngModel)]=\"MistreatNo\" name=\"MistreatNo\" class=\"form-control form-control-sm\" readonly>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"row\">\r\n                    <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">เงินสินบน :</label>\r\n                    <div class=\"form-group col-lg-4 col-md-7\">\r\n                        <input type=\"text\" [(ngModel)]=\"BribeMoney\" name=\"BribeMoney\" class=\"form-control form-control-sm\" readonly>\r\n                    </div>\r\n\r\n                    <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">เงินรางวัล :</label>\r\n                    <div class=\"col-lg-4 col-md-7 form-group \">\r\n                        <input type=\"text\" [(ngModel)]=\"TreasuryMoney\" name=\"TreasuryMoney\" class=\"form-control form-control-sm\" readonly>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"row\">\r\n                    <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">เงินส่งคลัง :</label>\r\n                    <div class=\"form-group col-lg-4 col-md-7\">\r\n                        <input type=\"text\" [(ngModel)]=\"RewardMoney\" name=\"RewardMoney\" class=\"form-control form-control-sm\" readonly>\r\n                    </div>\r\n                </div>\r\n            </form>\r\n\r\n        </div>\r\n    </div>\r\n\r\n</form>"

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__config_dateFormat__ = __webpack_require__("./src/app/config/dateFormat.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__config_pagination__ = __webpack_require__("./src/app/config/pagination.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared_sidebar_sidebar_component__ = __webpack_require__("./src/app/shared/sidebar/sidebar.component.ts");
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
    function ManageComponent(activeRoute, formBuilder, ngbModel, navService, IncService, preloader, router, sidebarService) {
        this.activeRoute = activeRoute;
        this.formBuilder = formBuilder;
        this.ngbModel = ngbModel;
        this.navService = navService;
        this.IncService = IncService;
        this.preloader = preloader;
        this.router = router;
        this.sidebarService = sidebarService;
        this.paginage = __WEBPACK_IMPORTED_MODULE_9__config_pagination__["a" /* pagination */];
        this.CompareFine = "0"; // ยอดนำส่งรวม
        this.MistreatNo = 0; // จำนวนคดี
        this.BribeMoney = "0"; // เงินสินบนรวม
        this.RewardMoney = "0"; // เงินรางวัลรวม
        this.TreasuryMoney = "0"; // เงินส่งคลัง
        this.StaffSendoptions = [];
        this.rawStaffSendOptions = [];
        this.Staffoptions = [];
        this.rawOptions = [];
        this.InformTooptions = [];
        this.options = [];
        this.ListRevenueDetail = [];
        this.ListRevenueDetailPaging = [];
        this.ListChK = [];
        this.RevenueDetailForUDP = [];
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
                        this.sidebarService.setVersion('Revenue 0.0.0.11 (M)');
                        this.active_Route();
                        this.navigate_Service();
                        this.RevenueStatus = 0;
                        this.RevenueNo = "";
                        this.RevenueStation == "";
                        this.StaffSendName == "";
                        this.StaffName == "";
                        this.InformTo = "";
                        this.StaffID = "";
                        this.StaffSendID = "";
                        this.RevenueTime = this.getCurrentTime();
                        this.RevenueDate = Object(__WEBPACK_IMPORTED_MODULE_8__config_dateFormat__["f" /* setDateMyDatepicker */])(new Date(this.getCurrentDate()));
                        this.RevenueCode = "Auto Generate";
                        return [4 /*yield*/, this.CreateObject()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getReveneueStaff()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.getStation()];
                    case 3:
                        _a.sent();
                        if (!(this.mode === 'R')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.ShowRevenue()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        this.preloader.setShowPreloader(false);
                        _a.label = 6;
                    case 6:
                        this.paginage.TotalItems = this.ListRevenueDetail.length;
                        this.ListRevenueDetailPaging = this.ListRevenueDetail.slice(0, this.paginage.RowsPerPageOptions[0]);
                        this.CheckCompareReceive();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.active_Route = function () {
        var _this = this;
        this.sub = this.activeRoute.params.subscribe(function (p) {
            _this.mode = p['mode'];
            //alert(this.mode);
            if (p['mode'] === 'C') {
                // set false
                _this.navService.setPrintButton(false);
                _this.navService.setEditButton(false);
                _this.navService.setDeleteButton(false);
                _this.navService.setEditField(false);
                // set true
                _this.navService.setSaveButton(true);
                _this.navService.setCancelButton(true);
                _this.RevenueCode = "LC-" + (new Date).getTime();
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
                    _this.RevenueID = p['code'];
                }
            }
        });
    };
    ManageComponent.prototype.navigate_Service = function () {
        var _this = this;
        this.navService.showFieldEdit.subscribe(function (p) {
            _this.showEditField = p;
        });
        this.onEditSubscribe = this.navService.onEdit.subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.RevenueStatus == 2) {
                    alert("ไม่สามารถแก้ไขรายการได้");
                    this.navService.setSaveButton(false);
                    this.navService.setCancelButton(false);
                    // set true
                    this.navService.setPrintButton(true);
                    this.navService.setEditButton(true);
                    this.navService.setDeleteButton(true);
                    this.navService.setEditField(true);
                }
                return [2 /*return*/];
            });
        }); });
        this.onSaveSubscribe = this.navService.onSave.subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!status) return [3 /*break*/, 5];
                        debugger;
                        // set action save = false
                        return [4 /*yield*/, this.navService.setOnSave(false)];
                    case 1:
                        // set action save = false
                        _a.sent();
                        if (this.RevenueNo == "" || this.RevenueStation == "" || this.RevenueStation == undefined
                            || this.StaffSendName == "" || this.StaffSendName == undefined
                            || this.StaffName == "" || this.StaffName == undefined
                            || this.PosSend == "" || this.PosSend == undefined
                            || this.DeptSend == "" || this.DeptSend == undefined
                            || this.PosStaff == "" || this.PosStaff == undefined
                            || this.DeptStaff == "" || this.DeptStaff == undefined
                            || this.RevenueDate == null) {
                            this.isRequired = true;
                            alert(__WEBPACK_IMPORTED_MODULE_5__config_message__["a" /* Message */].checkData);
                            return [2 /*return*/, false];
                        }
                        if (+this.MistreatNo < 1) {
                            alert("กรุณำเลือกรายการที่ต้องการนำส่งเงิน");
                            return [2 /*return*/, false];
                        }
                        if (!(this.mode === 'C')) return [3 /*break*/, 3];
                        //alert("mode C");
                        return [4 /*yield*/, this.onInsRevenue()];
                    case 2:
                        //alert("mode C");
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        if (!(this.mode === 'R')) return [3 /*break*/, 5];
                        //alert("mode U");
                        return [4 /*yield*/, this.onUdpRevenue()];
                    case 4:
                        //alert("mode U");
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        this.onDeleSubscribe = this.navService.onDelete.subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
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
        this.onCancelSubscribe = this.navService.onCancel.subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!status) return [3 /*break*/, 5];
                        this.navService.setOnCancel(false);
                        if (!confirm(__WEBPACK_IMPORTED_MODULE_5__config_message__["a" /* Message */].confirmAction)) return [3 /*break*/, 4];
                        if (!(this.mode === 'C')) return [3 /*break*/, 1];
                        this.router.navigate(['/income/list']);
                        return [3 /*break*/, 3];
                    case 1:
                        if (!(this.mode === 'R')) return [3 /*break*/, 3];
                        // set false
                        this.navService.setSaveButton(false);
                        this.navService.setCancelButton(false);
                        // set true
                        this.navService.setPrintButton(true);
                        this.navService.setEditButton(true);
                        this.navService.setDeleteButton(true);
                        this.navService.setEditField(true);
                        return [4 /*yield*/, this.ShowRevenue()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        this.navService.setSaveButton(true);
                        this.navService.setCancelButton(true);
                        this.navService.setPrintButton(false);
                        this.navService.setEditButton(false);
                        this.navService.setDeleteButton(false);
                        this.navService.setEditField(false);
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); });
    };
    ManageComponent.prototype.ngOnDestroy = function () {
        this.onCancelSubscribe.unsubscribe();
        this.onEditSubscribe.unsubscribe();
        this.onSaveSubscribe.unsubscribe();
        this.onDeleSubscribe.unsubscribe();
        this.onPrintSubscribe.unsubscribe();
    };
    ManageComponent.prototype.onDelete = function () {
        var _this = this;
        if (this.RevenueStatus == 1) {
            if (confirm(__WEBPACK_IMPORTED_MODULE_5__config_message__["a" /* Message */].confirmAction)) {
                this.IncService.RevenueupdDelete(this.RevenueID).then(function (IsSuccess) { return __awaiter(_this, void 0, void 0, function () {
                    var isSuccess;
                    var _this = this;
                    return __generator(this, function (_a) {
                        if (IsSuccess) {
                            isSuccess = true;
                            this.ListRevenueDetail.filter(function (item) { return (item.IsCheck === true); })
                                .map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.IncService.RevenueCompareDetailReceiptupdDelete(item.CompareReceiptID.toString()).then(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    if (!item.IsSuccess) {
                                                        isSuccess = item.IsSuccess;
                                                        return [2 /*return*/, false];
                                                    }
                                                    return [2 /*return*/];
                                                });
                                            }); }, function (error) { console.error(error); return false; })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            if (isSuccess) {
                                this.oRevenue = {};
                                alert(__WEBPACK_IMPORTED_MODULE_5__config_message__["a" /* Message */].saveComplete);
                                this.router.navigate(['/income/list']);
                            }
                        }
                        else {
                            alert(__WEBPACK_IMPORTED_MODULE_5__config_message__["a" /* Message */].saveFail);
                        }
                        return [2 /*return*/];
                    });
                }); }, function (error) { console.error(error); return false; });
            }
        }
        else if (this.RevenueStatus == 2) {
            alert(__WEBPACK_IMPORTED_MODULE_5__config_message__["a" /* Message */].cannotDelete);
        }
    };
    ManageComponent.prototype.ShowRevenue = function () {
        var _this = this;
        this.IncService.getByCon(this.RevenueID).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
            var RDate, SStaff, Staff, a;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(res.length > 0 && res != null)) return [3 /*break*/, 7];
                        // if (res[0].RevenueDetail.length > 0) {
                        //     this.ReceiptBookNo = res[0].RevenueDetail[0].ReceiptBookNo;
                        // }
                        // else {
                        //     this.ReceiptBookNo = "";
                        // }
                        this.oRevenue.RevenueID = res[0].RevenueID;
                        this.oRevenue.RevenueCode = res[0].RevenueCode;
                        this.oRevenue.StationCode = res[0].StationCode;
                        this.oRevenue.StationName = res[0].StationName;
                        this.RevenueCode = res[0].RevenueCode;
                        this.RevenueStation = res[0].StationName;
                        this.RevenueNo = res[0].RevenueNo;
                        this.InformTo = res[0].InformTo;
                        this.RevenueStatus = res[0].RevenueStatus;
                        RDate = res[0].RevenueDate.toString().split(" ");
                        this.RevenueDate = Object(__WEBPACK_IMPORTED_MODULE_8__config_dateFormat__["f" /* setDateMyDatepicker */])(new Date(RDate[0]));
                        this.RevenueTime = res[0].RevenueTime;
                        SStaff = res[0].RevenueStaff.filter(function (f) { return f.ContributorID == "20"; });
                        if (SStaff.length > 0) {
                            this.StaffSendName = SStaff[0].TitleName + SStaff[0].FirstName + ' ' + SStaff[0].LastName;
                            this.PosSend = SStaff[0].PositionName;
                            this.DeptSend = SStaff[0].OfficeName;
                            this.StaffSendID = SStaff[0].StaffID;
                            this.oRevenueSendStaff = SStaff[0];
                        }
                        Staff = res[0].RevenueStaff.filter(function (f) { return f.ContributorID == "36"; });
                        if (Staff.length) {
                            this.StaffName = Staff[0].TitleName + Staff[0].FirstName + ' ' + Staff[0].LastName;
                            this.PosStaff = Staff[0].PositionName;
                            this.DeptStaff = Staff[0].OfficeName;
                            this.StaffID = Staff[0].StaffID;
                            this.StaffDeptCode = Staff[0].OfficeCode;
                            this.oRevenueStaff = Staff[0];
                        }
                        return [4 /*yield*/, this.ShowRevenueCompare()];
                    case 1:
                        _a.sent();
                        debugger;
                        this.preloader.setShowPreloader(true);
                        if (!(res[0].RevenueDetail.length > 0)) return [3 /*break*/, 6];
                        a = 0;
                        _a.label = 2;
                    case 2:
                        if (!(a < res[0].RevenueDetail.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.IncService.RevenueComparegetByCompareReceiptID(res[0].RevenueDetail[a].CompareReceiptID).then(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                var j, i, k;
                                return __generator(this, function (_a) {
                                    this.preloader.setShowPreloader(false);
                                    if (item.length > 0) {
                                        for (j = 0; j < item.length; j += 1) {
                                            if (item[j].RevenueCompareDetail.length > 0) {
                                                for (i = 0; i < item[j].RevenueCompareDetail.length; i += 1) {
                                                    try {
                                                        if (item[j].RevenueCompareDetail[i].RevenueCompareDetailReceipt.length > 0) {
                                                            for (k = 0; k < item[j].RevenueCompareDetail[i].RevenueCompareDetailReceipt.length; k += 1) {
                                                                this.oRevenueDetail = {
                                                                    RevenueDetailID: res[0].RevenueDetail[a].RevenueDetailID,
                                                                    ReceiptBookNo: item[j].RevenueCompareDetail[i].RevenueCompareDetailReceipt[k].ReceiptBookNo,
                                                                    ReceiptNo: item[j].RevenueCompareDetail[i].RevenueCompareDetailReceipt[k].ReceiptNo,
                                                                    RevenueStatus: "1",
                                                                    RevenueID: this.oRevenue.RevenueID,
                                                                    CompareReceiptID: item[j].RevenueCompareDetail[i].RevenueCompareDetailReceipt[k].CompareReceiptID,
                                                                    CompareID: item[j].CompareID,
                                                                    CompareCode: item[j].CompareCode,
                                                                    LawBreaker: item[j].RevenueCompareDetail[i].LawbreakerTitleName + item[j].RevenueCompareDetail[i].LawbreakerFirstName + " " + item[j].RevenueCompareDetail[i].LawbreakerLastName,
                                                                    StaffReceip: item[j].RevenueCompareStaff[i].TitleName + item[j].RevenueCompareStaff[i].FirstName + " " + item[j].RevenueCompareStaff[i].LastName,
                                                                    PaymentDate: Object(__WEBPACK_IMPORTED_MODULE_8__config_dateFormat__["j" /* toLocalShort */])(item[j].RevenueCompareDetail[i].RevenueCompareDetailReceipt[k].PaymentDate),
                                                                    TotalFine: +("" + (item[j].RevenueCompareDetail[i].RevenueCompareDetailReceipt[k] == null ? 0 : item[j].RevenueCompareDetail[i].RevenueCompareDetailReceipt[k].TotalFine)),
                                                                    BribeMoney: +("" + (item[j].RevenueCompareDetail[i].BribeMoney == null ? 0 : item[0].RevenueCompareDetail[i].BribeMoney)),
                                                                    TreasuryMoney: +("" + (item[j].RevenueCompareDetail[i].TreasuryMoney == null ? 0 : item[0].RevenueCompareDetail[i].TreasuryMoney)),
                                                                    RewardMoney: +("" + (item[j].RevenueCompareDetail[i].RewardMoney == null ? 0 : item[0].RevenueCompareDetail[i].RewardMoney)),
                                                                    IsCheck: true,
                                                                    IsNewItem: false,
                                                                    IsDelItem: false
                                                                };
                                                                this.ListRevenueDetail.push(this.oRevenueDetail);
                                                            }
                                                        }
                                                    }
                                                    catch (_b) { }
                                                }
                                            }
                                        }
                                    }
                                    // set total record
                                    this.paginage.TotalItems = this.ListRevenueDetail.length;
                                    this.ListRevenueDetailPaging = this.ListRevenueDetail.slice(0, this.paginage.RowsPerPageOptions[0]);
                                    this.preloader.setShowPreloader(false);
                                    return [2 /*return*/];
                                });
                            }); }, function (err) {
                                alert(err.message);
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        a += 1;
                        return [3 /*break*/, 2];
                    case 5:
                        // set total record
                        this.paginage.TotalItems = this.ListRevenueDetail.length;
                        this.ListRevenueDetailPaging = this.ListRevenueDetail.slice(0, this.paginage.RowsPerPageOptions[0]);
                        this.checkIfAllChbSelected();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        alert("พบปัญหาในการติดต่อ Server");
                        this.preloader.setShowPreloader(false);
                        this.router.navigate(['/income/list']);
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        }); }, function (err) {
            alert(err.message);
        });
    };
    ManageComponent.prototype.ShowRevenueCompare = function () {
        return __awaiter(this, void 0, void 0, function () {
            var DRate, cDateRevenue;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.RevenueDate != null && this.RevenueDate != "")) return [3 /*break*/, 2];
                        this.preloader.setShowPreloader(true);
                        DRate = void 0, cDateRevenue = void 0;
                        DRate = this.RevenueDate.date;
                        if (DRate != undefined) {
                            cDateRevenue = new Date(DRate.year + "-" + DRate.month + "-" + DRate.day);
                        }
                        return [4 /*yield*/, this.IncService.RevenueComparegetByCon(Object(__WEBPACK_IMPORTED_MODULE_8__config_dateFormat__["h" /* setZeroHours */])(cDateRevenue), this.StaffDeptCode).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var j, i, k;
                                return __generator(this, function (_a) {
                                    this.preloader.setShowPreloader(false);
                                    this.ListRevenueDetail = [];
                                    this.ListRevenueDetailPaging = [];
                                    if (res.length > 0) {
                                        for (j = 0; j < res.length; j += 1) {
                                            if (res[j].RevenueCompareDetail.length > 0) {
                                                for (i = 0; i < res[j].RevenueCompareDetail.length; i += 1) {
                                                    try {
                                                        if (res[j].RevenueCompareDetail[i].RevenueCompareDetailReceipt.length > 0) {
                                                            for (k = 0; k < res[j].RevenueCompareDetail[i].RevenueCompareDetailReceipt.length; k += 1) {
                                                                this.oRevenueDetail = {
                                                                    RevenueDetailID: "",
                                                                    ReceiptBookNo: res[j].RevenueCompareDetail[i].RevenueCompareDetailReceipt[k].ReceiptBookNo,
                                                                    ReceiptNo: res[j].RevenueCompareDetail[i].RevenueCompareDetailReceipt[k].ReceiptNo,
                                                                    RevenueStatus: "1",
                                                                    RevenueID: "",
                                                                    CompareReceiptID: res[j].RevenueCompareDetail[i].RevenueCompareDetailReceipt[k].CompareReceiptID,
                                                                    CompareID: res[j].CompareID,
                                                                    CompareCode: res[j].CompareCode,
                                                                    LawBreaker: res[j].RevenueCompareDetail[i].LawbreakerTitleName + res[j].RevenueCompareDetail[i].LawbreakerFirstName + " " + res[j].RevenueCompareDetail[i].LawbreakerLastName,
                                                                    StaffReceip: res[j].RevenueCompareStaff[i].TitleName + res[j].RevenueCompareStaff[i].FirstName + " " + res[j].RevenueCompareStaff[i].LastName,
                                                                    PaymentDate: Object(__WEBPACK_IMPORTED_MODULE_8__config_dateFormat__["j" /* toLocalShort */])(res[j].RevenueCompareDetail[i].RevenueCompareDetailReceipt[k].PaymentDate),
                                                                    TotalFine: +("" + (res[j].RevenueCompareDetail[i].RevenueCompareDetailReceipt[k] == null ? 0 : res[j].RevenueCompareDetail[i].RevenueCompareDetailReceipt[k].TotalFine)),
                                                                    BribeMoney: +("" + (res[j].RevenueCompareDetail[i].BribeMoney == null ? 0 : res[0].RevenueCompareDetail[i].BribeMoney)),
                                                                    TreasuryMoney: +("" + (res[j].RevenueCompareDetail[i].TreasuryMoney == null ? 0 : res[0].RevenueCompareDetail[i].TreasuryMoney)),
                                                                    RewardMoney: +("" + (res[j].RevenueCompareDetail[i].RewardMoney == null ? 0 : res[0].RevenueCompareDetail[i].RewardMoney)),
                                                                    IsCheck: false,
                                                                    IsNewItem: true,
                                                                    IsDelItem: false
                                                                };
                                                                this.ListRevenueDetail.push(this.oRevenueDetail);
                                                            }
                                                        }
                                                    }
                                                    catch (_b) { }
                                                }
                                            }
                                        }
                                        // set total record
                                        this.paginage.TotalItems = this.ListRevenueDetail.length;
                                        this.ListRevenueDetailPaging = this.ListRevenueDetail.slice(0, this.paginage.RowsPerPageOptions[0]);
                                    }
                                    else {
                                        this.ListRevenueDetail = [];
                                        this.ListRevenueDetailPaging = [];
                                    }
                                    return [2 /*return*/];
                                });
                            }); }, function (err) {
                                alert(err.message);
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        alert("กรุณาระบุวันที่นำส่ง");
                        this.ListRevenueDetailPaging = [];
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
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
            RevenueOneStaff: "",
            RevenueDetail: [],
            RevenueStaff: []
        };
    };
    ManageComponent.prototype.onInsRevenue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var DRate, cDateRevenue;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.preloader.setShowPreloader(true);
                        DRate = this.RevenueDate.date;
                        if (DRate != undefined) {
                            cDateRevenue = new Date(DRate.year + "-" + DRate.month + "-" + DRate.day);
                        }
                        debugger;
                        this.oRevenue.RevenueID = "";
                        this.oRevenue.RevenueNo = this.RevenueNo;
                        this.oRevenue.RevenueDate = Object(__WEBPACK_IMPORTED_MODULE_8__config_dateFormat__["h" /* setZeroHours */])(cDateRevenue);
                        this.oRevenue.RevenueTime = this.RevenueTime;
                        this.oRevenue.InformTo = this.InformTo;
                        this.RevenueStatus = 1;
                        this.oRevenue.RevenueStatus = "1";
                        this.oRevenue.ResultCount = this.MistreatNo.toString();
                        this.oRevenue.RevenueStaff = [];
                        if (this.oRevenueSendStaff != null && this.oRevenueSendStaff != undefined) {
                            this.oRevenue.RevenueStaff.push(this.oRevenueSendStaff);
                        }
                        if (this.oRevenueStaff != null && this.oRevenueStaff != undefined) {
                            this.oRevenue.RevenueStaff.push(this.oRevenueStaff);
                        }
                        this.oRevenue.RevenueDetail = this.ListRevenueDetailPaging.filter(function (item) { return item.IsCheck === true; });
                        return [4 /*yield*/, this.IncService.TransactionRunninggetByCon("ops_revenue", this.StaffDeptCode).then(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(item.length == 0)) return [3 /*break*/, 1];
                                            this.IncService.TransactionRunninginsAll(this.StaffDeptCode, "ops_revenue", "LC").then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    if (res.IsSuccess) {
                                                        this.RevenueCode = "LC" + this.oRevenueStaff.OfficeCode + (this.RevenueDate.date.year + 543).toString().substring(4, 2) + "00001";
                                                        this.oRevenue.RevenueCode = this.RevenueCode;
                                                        this.InsRevenue();
                                                    }
                                                    this.preloader.setShowPreloader(false);
                                                    return [2 /*return*/];
                                                });
                                            }); }, function (error) { console.error(error); return false; });
                                            return [3 /*break*/, 3];
                                        case 1: return [4 /*yield*/, this.IncService.TransactionRunningupdByCon(item[0].RunningID).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                                var pad, RunningNo;
                                                return __generator(this, function (_a) {
                                                    if (res.IsSuccess) {
                                                        pad = "00000";
                                                        RunningNo = pad.substring(0, pad.length - item[0].RunningNo.toString().length) + (+item[0].RunningNo + 1);
                                                        this.RevenueCode = "LC" + this.oRevenueStaff.OfficeCode + (this.RevenueDate.date.year + 543).toString().substring(4, 2) + RunningNo;
                                                        this.oRevenue.RevenueCode = this.RevenueCode;
                                                        this.InsRevenue();
                                                    }
                                                    return [2 /*return*/];
                                                });
                                            }); }, function (error) { console.error(error); return false; })];
                                        case 2:
                                            _a.sent();
                                            _a.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); }, function (error) { console.error(error); return false; })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.onUdpRevenue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var DRate, cDateRevenue, isSuccess;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.preloader.setShowPreloader(true);
                        DRate = this.RevenueDate.date;
                        if (DRate != undefined) {
                            cDateRevenue = new Date(DRate.year + "-" + DRate.month + "-" + DRate.day);
                        }
                        this.oRevenue.RevenueNo = this.RevenueNo;
                        this.oRevenue.RevenueDate = Object(__WEBPACK_IMPORTED_MODULE_8__config_dateFormat__["h" /* setZeroHours */])(cDateRevenue);
                        this.oRevenue.RevenueTime = this.RevenueTime;
                        this.oRevenue.RevenueCode = this.RevenueCode;
                        this.oRevenue.InformTo = this.InformTo;
                        this.oRevenue.RevenueStatus = this.RevenueStatus.toString();
                        this.oRevenue.ResultCount = this.MistreatNo.toString();
                        this.oRevenue.RevenueStaff = [];
                        if (this.oRevenueSendStaff != null && this.oRevenueSendStaff != undefined) {
                            this.oRevenue.RevenueStaff.push(this.oRevenueSendStaff);
                        }
                        if (this.oRevenueStaff != null && this.oRevenueStaff != undefined) {
                            this.oRevenue.RevenueStaff.push(this.oRevenueStaff);
                        }
                        this.RevenueDetailForUDP = this.ListRevenueDetail;
                        this.oRevenue.RevenueDetail = [];
                        debugger;
                        isSuccess = true;
                        return [4 /*yield*/, this.IncService.RevenueUdp(this.oRevenue).then(function (IsSuccess) { return __awaiter(_this, void 0, void 0, function () {
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
                        if (this.RevenueDetailForUDP.length > 0) {
                            // New Product
                            this.RevenueDetailForUDP.filter(function (item) { return (item.IsNewItem === true && item.IsCheck === true); })
                                .map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            item.IsNewItem = false;
                                            item.RevenueID = this.RevenueID;
                                            return [4 /*yield*/, this.IncService.RevenueDetailinsAll(item).then(function (IsSuccess) { return __awaiter(_this, void 0, void 0, function () {
                                                    var _this = this;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                if (!!IsSuccess) return [3 /*break*/, 1];
                                                                isSuccess = IsSuccess;
                                                                return [2 /*return*/, false];
                                                            case 1: return [4 /*yield*/, this.IncService.RevenueCompareDetailReceiptupdByCon(item.CompareReceiptID.toString()).then(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                                                    return __generator(this, function (_a) {
                                                                        if (!IsSuccess) {
                                                                            isSuccess = IsSuccess;
                                                                            return [2 /*return*/, false];
                                                                        }
                                                                        return [2 /*return*/];
                                                                    });
                                                                }); }, function (error) { isSuccess = false; console.error(error); return false; })];
                                                            case 2:
                                                                _a.sent();
                                                                _a.label = 3;
                                                            case 3: return [2 /*return*/];
                                                        }
                                                    });
                                                }); }, function (error) { isSuccess = false; console.error(error); return false; })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            if (!isSuccess)
                                return [2 /*return*/, false];
                            // Delete Product
                            this.RevenueDetailForUDP.filter(function (item) { return item.IsCheck === false; })
                                .map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            item.IsNewItem = true;
                                            item.IsDelItem = false;
                                            return [4 /*yield*/, this.IncService.RevenueDetailupdDelete(item.RevenueDetailID).then(function (IsSuccess) { return __awaiter(_this, void 0, void 0, function () {
                                                    var _this = this;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                if (!!IsSuccess) return [3 /*break*/, 1];
                                                                isSuccess = IsSuccess;
                                                                return [2 /*return*/, false];
                                                            case 1: return [4 /*yield*/, this.IncService.RevenueCompareDetailReceiptupdDelete(item.CompareReceiptID.toString()).then(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                                                    return __generator(this, function (_a) {
                                                                        if (!IsSuccess) {
                                                                            isSuccess = IsSuccess;
                                                                            return [2 /*return*/, false];
                                                                        }
                                                                        return [2 /*return*/];
                                                                    });
                                                                }); }, function (error) { isSuccess = false; console.error(error); return false; })];
                                                            case 2:
                                                                _a.sent();
                                                                _a.label = 3;
                                                            case 3: return [2 /*return*/];
                                                        }
                                                    });
                                                }); }, function (error) { isSuccess = false; console.error(error); return false; })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            if (!isSuccess)
                                return [2 /*return*/, false];
                        }
                        if (isSuccess) {
                            //alert("Update");
                            alert(__WEBPACK_IMPORTED_MODULE_5__config_message__["a" /* Message */].saveComplete);
                            this.onComplete();
                            this.preloader.setShowPreloader(false);
                        }
                        else {
                            alert(__WEBPACK_IMPORTED_MODULE_5__config_message__["a" /* Message */].saveFail);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.InsRevenue = function () {
        var _this = this;
        this.IncService.RevenueinsAll(this.oRevenue).then(function (item) { return __awaiter(_this, void 0, void 0, function () {
            var isSuccess;
            var _this = this;
            return __generator(this, function (_a) {
                if (item.IsSuccess) {
                    this.RevenueID = item.RevenueID;
                    isSuccess = true;
                    this.oRevenue.RevenueDetail.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.IncService.RevenueCompareDetailReceiptupdByCon(item.CompareReceiptID.toString()).then(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            if (!item.IsSuccess) {
                                                isSuccess = item.IsSuccess;
                                                return [2 /*return*/, false];
                                            }
                                            this.preloader.setShowPreloader(false);
                                            return [2 /*return*/];
                                        });
                                    }); }, function (error) { console.error(error); return false; })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    if (isSuccess) {
                        //alert("Insert");
                        alert(__WEBPACK_IMPORTED_MODULE_5__config_message__["a" /* Message */].saveComplete);
                        this.oRevenue = {};
                        this.onComplete();
                        debugger;
                        //this.router.navigate(['/income/manage']);
                        this.router.navigate(["/income/manage/R/" + this.RevenueID]);
                    }
                }
                else {
                    alert(__WEBPACK_IMPORTED_MODULE_5__config_message__["a" /* Message */].saveFail);
                }
                return [2 /*return*/];
            });
        }); }, function (error) { console.error(error); return false; });
    };
    // ----- ผู้นำส่ง ---
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
                            alert("พบปัญหาในการติดต่อ Server");
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.StaffSendonAutoChange = function (value) {
        this.ClearStaffSendData();
        if (value == '') {
            this.StaffSendoptions = [];
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
            RevenueID: this.RevenueID,
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
        this.PosSend = event.OperationPosName;
        this.DeptSend = event.OfficeName;
    };
    ManageComponent.prototype.ClearStaffSendData = function () {
        this.PosSend = "";
        this.DeptSend = "";
        this.oRevenueSendStaff = {
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-05",
            StaffID: this.StaffSendID,
            RevenueID: this.RevenueID,
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
    // ----- End ผู้นำส่ง ---
    // ----- ผู้จัดทำ ---
    ManageComponent.prototype.StaffonAutoChange = function (value) {
        this.ClearStaffData();
        if (value == '') {
            this.Staffoptions = [];
            this.ListRevenueDetailPaging = [];
        }
        else {
            if (this.rawStaffSendOptions.length == 0) {
                this.getReveneueStaff();
            }
            this.Staffoptions = this.rawStaffSendOptions.filter(function (f) { return f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1; });
        }
    };
    ManageComponent.prototype.StaffonAutoFocus = function (value) {
        if (value == '') {
            this.Staffoptions = [];
            this.ListRevenueDetailPaging = [];
            this.ClearStaffData();
        }
    };
    ManageComponent.prototype.StaffonAutoSelecteWord = function (event) {
        this.oRevenueStaff = {
            StaffID: this.StaffID,
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-07",
            RevenueID: this.RevenueID,
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
            ContributorID: "36",
            IsActive: "1"
        };
        this.PosStaff = event.OperationPosName;
        this.DeptStaff = event.OfficeName;
        this.StaffDeptCode = event.OfficeCode;
        this.ShowRevenueCompare();
    };
    ManageComponent.prototype.ClearStaffData = function () {
        this.PosStaff = "";
        this.DeptStaff = "";
        this.oRevenueStaff = {
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-05",
            StaffID: this.StaffID,
            RevenueID: this.RevenueID,
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
            ContributorID: "36",
            IsActive: "1"
        };
    };
    // ----- End ผู้จัดทำ ---
    // ----- เรียน ---
    ManageComponent.prototype.InformToonAutoChange = function (value) {
        if (value == '') {
            this.InformTooptions = [];
        }
        else {
            if (this.rawStaffSendOptions.length == 0) {
                this.getReveneueStaff();
            }
            this.InformTooptions = this.rawStaffSendOptions.filter(function (f) { return f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1; });
        }
    };
    ManageComponent.prototype.InformToonAutoFocus = function (value) {
        if (value == '') {
            this.InformTooptions = [];
        }
    };
    // ----- End เรียน ---
    // --- เขียนที่ ---
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
                            alert("พบปัญหาในการติดต่อ Server");
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
        if (value == '') {
            this.options = [];
            this.oRevenue.StationCode = "";
            this.oRevenue.StationName = "";
        }
        else {
            this.options = this.rawOptions.filter(function (f) { return f.OfficeName.toLowerCase().indexOf(value.toLowerCase()) > -1; });
        }
    };
    ManageComponent.prototype.onAutoFocus = function (value) {
        if (value == '') {
            this.options = [];
        }
    };
    ManageComponent.prototype.onAutoSelecteWord = function (event) {
        this.oRevenue.StationCode = event.OfficeCode;
        this.oRevenue.StationName = event.OfficeName;
    };
    // ----- End เขียนที่ ---
    ManageComponent.prototype.getCurrentDate = function () {
        var date = new Date();
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).toISOString().substring(0, 10);
    };
    ManageComponent.prototype.getCurrentTime = function () {
        var date = new Date();
        // 
        // return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds();
        return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    };
    ManageComponent.prototype.selectedChkAll = function () {
        for (var i = 0; i < this.ListRevenueDetail.length; i++) {
            this.ListRevenueDetail[i].IsCheck = this.selectAllChb;
        }
        this.RevenueSummary();
    };
    ManageComponent.prototype.checkIfAllChbSelected = function () {
        this.selectAllChb = this.ListRevenueDetail.every(function (item) {
            return item.IsCheck == true;
        });
        this.RevenueSummary();
    };
    ManageComponent.prototype.RevenueSummary = function () {
        var _this = this;
        debugger;
        var CompareFine = 0, BribeMoney = 0, RewardMoney = 0, TreasuryMoney = 0;
        var MistreatNoList = [];
        this.ListRevenueDetail.filter(function (item) { return item.IsCheck === true; })
            .map(function (item) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                CompareFine += +item.TotalFine;
                BribeMoney += +item.BribeMoney;
                RewardMoney += +item.RewardMoney;
                TreasuryMoney += +item.TreasuryMoney;
                MistreatNoList.push(item.CompareCode);
                return [2 /*return*/];
            });
        }); });
        var MistreatNoUnique = Array.from(new Set(MistreatNoList));
        this.MistreatNo = MistreatNoUnique.length;
        // this.CompareFine = (BribeMoney + RewardMoney + TreasuryMoney).toLocaleString("en");
        this.CompareFine = CompareFine.toLocaleString("en");
        this.BribeMoney = BribeMoney.toLocaleString("en");
        this.RewardMoney = RewardMoney.toLocaleString("en");
        this.TreasuryMoney = TreasuryMoney.toLocaleString("en");
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
            __WEBPACK_IMPORTED_MODULE_7__shared_preloader_preloader_component__["b" /* PreloaderService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */],
            __WEBPACK_IMPORTED_MODULE_10__shared_sidebar_sidebar_component__["b" /* SidebarService */]])
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
                { title: 'จัดการข้อมูลนำส่งเงินรายได้' },
            ],
            nextPage: { title: '', url: '' },
            codePage: 'ILG60-07-02-00-00'
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

module.exports = "<!-- <form action=\"\" #form=\"ngForm\" (ngSubmit)=\"onPrint(form)\"> -->\r\n    <div class=\"modal-header bg-theme\">\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-5\">\r\n                <h4 class=\"modal-title text-white\">พิมพ์เอกสาร</h4>\r\n            </div>\r\n\r\n            <a href=\"javaScript:void(0);\" class=\"close text-white font-14\" aria-label=\"Close\" (click)=\"dismiss('Cross click')\">\r\n                <span aria-hidden=\"true\">\r\n                    <i class=\" ti-close\"></i>\r\n                </span>\r\n            </a>\r\n        </div>\r\n    </div>\r\n    <h5 class=\"text-right mt-3 pr-3\">ILG60-07-02-01-00</h5>\r\n    <div class=\"modal-body font-14\">\r\n        <div class=\"card unset-radius\">\r\n            <div class=\"card-body p-0\">\r\n                <div class=\"table-responsive\">\r\n                    <div class=\"table-responsive table-striped \">\r\n                        <table class=\"table\">\r\n                            <thead>\r\n                                <tr>\r\n                                    <th style=\"width:7%\"></th>\r\n                                    <th style=\"width:5%\" class=\"text-center\">ลำดับ</th>\r\n                                    <th style=\"width:60%\">ชื่อเอกสาร</th>\r\n                                    <th style=\"width:20%\">ประเภทเอกสาร  <i class=\"mdi mdi-filter-variant fa-lg\" style=\"margin-left: 5px;\"></i></th>\r\n                                </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                                <tr *ngFor=\"let item of printDoc; let i=index;\">\r\n                                    <td class=\"text-center\">\r\n                                        <input type=\"checkbox\" [id]=\"'td'+i\" name=\"ischeck\" ngModel class=\"filled-in chk-col-indigo\">\r\n                                        <label [for]=\"'td'+i\" class=\"m-0\"></label>\r\n                                    </td>\r\n                                    <td class=\"text-center\">{{i+1}}</td>\r\n                                    <td>{{item.DocName}}</td>\r\n                                    <td>{{item.DocType}}</td>\r\n                                </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <div class=\"col-lg-2 col-sm-4\">\r\n            <button type=\"button\" class=\"btn btn-block btn-themecolor\" (click)=\"close('Print click')\">พิมพ์</button>\r\n        </div>\r\n    </div>\r\n<!-- </form> -->"

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
    function PrintDocModalComponent() {
        this.printDoc = [
            {
                DocName: 'รายงานนำส่งรายได้',
                DocType: 'แบบฟอร์ม'
            }
        ];
        this.d = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.c = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
    }
    PrintDocModalComponent.prototype.ngOnInit = function () {
    };
    PrintDocModalComponent.prototype.onPrint = function (f) {
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
            selector: 'app-printdoc-modal',
            template: __webpack_require__("./src/app/pages/income/printdoc-modal/printdoc-modal.component.html"),
            styles: [__webpack_require__("./src/app/pages/income/printdoc-modal/printdoc-modal.component.scss")]
        }),
        __metadata("design:paramtypes", [])
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
//# sourceMappingURL=manage.module.4.chunk.js.map
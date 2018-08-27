webpackJsonp(["suspect.module"],{

/***/ "./src/app/pages/notices/suspect/suspect.component.html":
/***/ (function(module, exports) {

module.exports = "<form action=\"\" [formGroup]=\"SuspectFG\">\n    <div class=\"card card-outline-bluish unset-radius\">\n        <div class=\"card-header unset-radius\">\n            <app-card-actions-collapse></app-card-actions-collapse>\n            <h4 class=\"card-title m-b-0\">ข้อมูลส่วนต้ว</h4>\n        </div>\n        <div class=\"card-body\">\n\n            <div class=\"row\">\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ประเภทผู้ต้องสงสัย :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <select formControlName=\"SuspectType\" class=\"form-control form-control-sm\" [ngClass]=\"{'ng-touched':isRequired}\" [attr.disabled]=\"showEditField ? '' : null\" required>\n                        <option value=\"\" selected disabled></option>\n                        <option *ngFor=\"let item of suspectTypes; let i=index;\" [value]=\"item.value\">{{item.text}}</option>\n                    </select>\n                </div>\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ประเภทบุคคล :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <select formControlName=\"EntityType\" class=\"form-control form-control-sm\" [ngClass]=\"{'ng-touched':isRequired}\" [attr.disabled]=\"showEditField ? '' : null\" required>\n                        <option value=\"\" selected disabled></option>\n                        <option *ngFor=\"let item of entityTypes; let i=index;\" [value]=\"item.value\">{{item.text}}</option>\n                    </select>\n                </div>\n            </div>\n            <div class=\"row\">\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">เลขบัตรประชาชน :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <input type=\"text\" formControlName=\"IDCard\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\n                </div>\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">คำนำหน้าชื่อ :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <select formControlName=\"SuspectTitleName\" class=\"form-control form-control-sm\" [ngClass]=\"{'ng-touched':isRequired}\" [attr.disabled]=\"showEditField ? '' : null\" required>\n                        <option value=\"\" selected disabled></option>\n                        <option *ngFor=\"let item of titleNames; let i=index;\" [value]=\"item.value\">{{item.text}}</option>\n                    </select>\n                </div>\n            </div>\n            <div class=\"row\">\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ชื่อจริง :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <input type=\"text\" formControlName=\"SuspectFirstName\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\n                </div>\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">นามสกุล :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <input type=\"text\" formControlName=\"SuspectLastName\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\n                </div>\n            </div>\n            <div class=\"row\">\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ชื่ออื่น :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <input type=\"text\" formControlName=\"SuspectOtherName\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\n                </div>\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">วันเกิด :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <my-date-picker-th formControlName=\"BirthDate\" [options]=\"myDatePickerOptions\" [disabled]=\"showEditField\"></my-date-picker-th>\n                </div>\n            </div>\n            <div class=\"row\">\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">กรุ๊ปเลือด :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <select formControlName=\"BloodType\" class=\"form-control form-control-sm\" [ngClass]=\"{'ng-touched':isRequired}\" [attr.disabled]=\"showEditField ? '' : null\" required>\n                        <option value=\"\" selected disabled></option>\n                        <option *ngFor=\"let item of bloodTypes; let i=index;\" [value]=\"item.value\">{{item.text}}</option>\n                    </select>\n                </div>\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">สัญชาติ :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <select formControlName=\"NationalityNameTH\" class=\"form-control form-control-sm\" [ngClass]=\"{'ng-touched':isRequired}\" [attr.disabled]=\"showEditField ? '' : null\" required>\n                        <option value=\"\" selected disabled></option>\n                        <option *ngFor=\"let item of nationnalitys; let i=index;\" [value]=\"item.value\">{{item.text}}</option>\n                    </select>\n                </div>\n            </div>\n            <div class=\"row\">\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">เชื่อชาติ :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <select formControlName=\"RaceName\" class=\"form-control form-control-sm\" [ngClass]=\"{'ng-touched':isRequired}\" [attr.disabled]=\"showEditField ? '' : null\" required>\n                        <option value=\"\" selected disabled></option>\n                        <option *ngFor=\"let item of races; let i=index;\" [value]=\"item.value\">{{item.text}}</option>\n                    </select>\n                </div>\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ศาสนา :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <select formControlName=\"ReligionName\" class=\"form-control form-control-sm\" [ngClass]=\"{'ng-touched':isRequired}\" [attr.disabled]=\"showEditField ? '' : null\" required>\n                        <option value=\"\" selected disabled></option>\n                        <option *ngFor=\"let item of religions; let i=index;\" [value]=\"item.value\">{{item.text}}</option>\n                    </select>\n                </div>\n            </div>\n            <div class=\"row\">\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">สถานะภาพ :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <select formControlName=\"MaritalStatus\" class=\"form-control form-control-sm\" [ngClass]=\"{'ng-touched':isRequired}\" [attr.disabled]=\"showEditField ? '' : null\" required>\n                        <option value=\"\" selected disabled></option>\n                        <option *ngFor=\"let item of materialStatus; let i=index;\" [value]=\"item.value\">{{item.text}}</option>\n                    </select>\n                </div>\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">อาชีพ :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <input type=\"text\" formControlName=\"Career\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\n                </div>\n            </div>\n            <div class=\"row\">\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ชื่อบิดา :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <input type=\"text\" formControlName=\"FatherName\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\n                </div>\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ชื่อมารดา :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <input type=\"text\" formControlName=\"MotherName\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\n                </div>\n            </div>\n            <div class=\"row\">\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">เบอร์โทรศัพท์ :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <input type=\"text\" formControlName=\"TelephoneNo\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\n                </div>\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">อีเมล์ :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <input type=\"text\" formControlName=\"Email\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\n                </div>\n            </div>\n            <div class=\"row\">\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">รูปถ่ายผู้ต้องสงสัย :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <label for=\"fileImg\" class=\"find-img\">\n                        <img #imgNobody src=\"assets/images/users/nobody.jpg\" alt=\"\" height=\"180px\" width=\"180px\">\n                        <span>เลือกรูปภาพ</span>\n                    </label>\n                    <input id='fileImg' (change)=\"changeImage($event, imgNobody)\" type=\"file\" formControlName=\"LinkPhoto\" hidden [attr.disabled]=\"showEditField ? '' : null\">\n                </div>\n                <!-- <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">จำนวนครั้งกระทำผิด :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <input type=\"text\" formControlName=\"\" class=\"form-control form-control-sm\" readonly>\n                    <a class=\"viewOffense text-secondary\" href=\"javaScript:void(0);\" (click)=\"openOffenseDetailModal(offens)\">\n                        <i class=\"fa fa-eye fa-lg\"></i>\n                    </a>\n\n                    <ng-template #offens let-c=\"close\" let-d=\"dismiss\">\n                        <app-modal-offense (c)=\"modal.close()\" (d)=\"modal.dismiss()\"></app-modal-offense>\n                    </ng-template>\n                </div> -->\n            </div>\n        </div>\n    </div>\n\n    <div class=\"card card-outline-bluish unset-radius\">\n        <div class=\"card-header unset-radius\">\n            <app-card-actions-collapse></app-card-actions-collapse>\n            <h4 class=\"card-title m-b-0\">ที่อยู่/สถานที่ทำการ</h4>\n        </div>\n        <div class=\"card-body\">\n            <div class=\"row\">\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">GPS :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <input type=\"text\" formControlName=\"GPS\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\n                </div>\n                <!-- <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ลองติจูด :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <input type=\"text\" formControlName=\"\" class=\"form-control form-control-sm\" [disabled]=\"showEditField\">\n                </div> -->\n            </div>\n            <div class=\"row\">\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">บ้านเลขที่ :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <input type=\"text\" formControlName=\"Address\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\" required>\n                </div>\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">หมู่ที่ :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <input type=\"text\" formControlName=\"Village\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\" required>\n                </div>\n            </div>\n            <div class=\"row\">\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">อาคาร/สถานที่ :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <input type=\"text\" formControlName=\"Building\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\n                </div>\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ห้อง :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <input type=\"text\" formControlName=\"Room\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\n                </div>\n            </div>\n            <div class=\"row\">\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ชั้น :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <input type=\"text\" formControlName=\"Floor\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\n                </div>\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ตรอก/ซอย :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <input type=\"text\" formControlName=\"Alley\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\n                </div>\n            </div>\n            <div class=\"row\">\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ถนน :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <input type=\"text\" formControlName=\"Road\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\" required>\n                </div>\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ต./อ./จ. :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <ng-template #rt let-r=\"result\" let-t=\"term\">\n                        {{ r.SubDistrictNameTH }} {{r.DistrictNameTH}} {{r.ProvinceNameTH}}\n                    </ng-template>\n\n                    <input type=\"text\" class=\"form-control form-control-sm\" [ngbTypeahead]=\"searchRegion\" [resultTemplate]=\"rt\" [readOnly]=\"showEditField\"\n                        [inputFormatter]=\"formatterRegion\" (selectItem)=\"selectItemRegion($event)\" required/>\n\n                    <!-- value=\"{{SuspectFG.get('Region').value}}\" -->\n                </div>\n            </div>\n            <div class=\"row\">\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">รหัสไปรษณีย์ :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <input type=\"text\" formControlName=\"ZipCode\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\" required>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"card card-outline-bluish unset-radius\">\n        <div class=\"card-header unset-radius\">\n            <app-card-actions-collapse></app-card-actions-collapse>\n            <h4 class=\"card-title m-b-0\">ข้อมูลชาวต่างชาติ</h4>\n        </div>\n        <div class=\"card-body\">\n            <div class=\"row\">\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">เลขหนังสือเดินทาง :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <input type=\"text\" formControlName=\"PassportNo\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\n                </div>\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ประเทศที่ออกหนังสือเดินทาง :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <input type=\"text\" formControlName=\"PassportCountryName\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\n                </div>\n            </div>\n            <div class=\"row\">\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">วันที่เข้าประเทศ :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <my-date-picker-th formControlName=\"PassportDateIn\" [options]=\"myDatePickerOptions\" [disabled]=\"showEditField\"></my-date-picker-th>\n                </div>\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">วันที่ออกประเทศ :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <my-date-picker-th formControlName=\"PassportDateOut\" [options]=\"myDatePickerOptions\" [disabled]=\"showEditField\"></my-date-picker-th>\n                </div>\n            </div>\n            <div class=\"row\">\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ประเภทวีซ่า :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <select formControlName=\"VISAType\" class=\"form-control form-control-sm\" [ngClass]=\"{'ng-touched':isRequired}\" [attr.disabled]=\"showEditField ? '' : null\" required>\n                        <option value=\"\" selected disabled></option>\n                        <option *ngFor=\"let item of visaTypes; let i=index;\" [value]=\"item.value\">{{item.text}}</option>\n                    </select>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"card card-outline-bluish unset-radius\">\n        <div class=\"card-header unset-radius\">\n            <app-card-actions-collapse></app-card-actions-collapse>\n            <h4 class=\"card-title m-b-0\">ข้อมูลผู้ประกอบการ</h4>\n        </div>\n        <div class=\"card-body\">\n            <div class=\"row\">\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">เลขทะเบียนนิติบุคคล :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <input type=\"text\" formControlName=\"CompanyRegistrationNo\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\n                </div>\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">เลขทะเบียนสรรพสามิต :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <input type=\"text\" formControlName=\"ExciseRegNo\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\n                </div>\n            </div>\n            <div class=\"row\">\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ชื่อสถานที่ประกอบการ :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <input type=\"text\" formControlName=\"CompanyName\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\n                </div>\n            </div>\n        </div>\n    </div>\n</form>"

/***/ }),

/***/ "./src/app/pages/notices/suspect/suspect.component.scss":
/***/ (function(module, exports) {

module.exports = ".viewOffense {\n  position: absolute;\n  right: 20px;\n  top: 2px; }\n\nlabel.find-img {\n  cursor: pointer; }\n\nlabel.find-img span {\n    position: absolute;\n    left: 65px;\n    bottom: 5px;\n    z-index: 2;\n    color: #fff; }\n\nlabel.find-img::after {\n  content: '';\n  position: absolute;\n  width: 180px;\n  height: 35px;\n  background-color: #0d5397;\n  left: 15px;\n  bottom: 0px; }\n"

/***/ }),

/***/ "./src/app/pages/notices/suspect/suspect.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SuspectComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_header_navigation_navigation_service__ = __webpack_require__("./src/app/shared/header-navigation/navigation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_preloader_preloader_component__ = __webpack_require__("./src/app/shared/preloader/preloader.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models__ = __webpack_require__("./src/app/models/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_debounceTime__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/debounceTime.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/distinctUntilChanged.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_observable_of__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_catch__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_do__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/do.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_rxjs_add_operator_switchMap__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__arrests_arrests_service__ = __webpack_require__("./src/app/pages/arrests/arrests.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__notice_service__ = __webpack_require__("./src/app/pages/notices/notice.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_app_config_dateFormat__ = __webpack_require__("./src/app/config/dateFormat.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_app_config_message__ = __webpack_require__("./src/app/config/message.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_app_config_imageType__ = __webpack_require__("./src/app/config/imageType.ts");
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



















var SuspectComponent = /** @class */ (function () {
    function SuspectComponent(ngModalService, router, activatedRoute, preloader, navService, fb, arrestService, noticeService) {
        var _this = this;
        this.ngModalService = ngModalService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.preloader = preloader;
        this.navService = navService;
        this.fb = fb;
        this.arrestService = arrestService;
        this.noticeService = noticeService;
        this.myDatePickerOptions = __WEBPACK_IMPORTED_MODULE_16_app_config_dateFormat__["a" /* MyDatePickerOptions */];
        this.visaTypes = __WEBPACK_IMPORTED_MODULE_5__models__["k" /* VISATypes */];
        this.bloodTypes = __WEBPACK_IMPORTED_MODULE_5__models__["a" /* BloodTypes */];
        this.entityTypes = __WEBPACK_IMPORTED_MODULE_5__models__["c" /* EntityTypes */];
        this.genderTypes = __WEBPACK_IMPORTED_MODULE_5__models__["d" /* GenderTypes */];
        this.suspectTypes = __WEBPACK_IMPORTED_MODULE_5__models__["e" /* LawbreakerTypes */];
        this.titleNames = __WEBPACK_IMPORTED_MODULE_5__models__["j" /* TitleNames */];
        this.nationnalitys = __WEBPACK_IMPORTED_MODULE_5__models__["g" /* Nationalitys */];
        this.races = __WEBPACK_IMPORTED_MODULE_5__models__["h" /* Races */];
        this.religions = __WEBPACK_IMPORTED_MODULE_5__models__["i" /* Religions */];
        this.materialStatus = __WEBPACK_IMPORTED_MODULE_5__models__["f" /* MaritalStatus */];
        this.typeheadRegion = [];
        this.searchRegion = function (text3$) {
            return text3$
                .debounceTime(300)
                .distinctUntilChanged()
                .map(function (term) { return term === '' ? []
                : _this.typeheadRegion
                    .filter(function (v) {
                    return v.SubDistrictNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                        v.DistrictNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                        v.ProvinceNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1;
                }).slice(0, 10); });
        };
        this.formatterRegion = function (x) {
            return x.SubDistrictNameTH + " " + x.DistrictNameTH + " " + x.ProvinceNameTH;
        };
        this.navService.setPrintButton(false);
        this.navService.setDeleteButton(false);
    }
    SuspectComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.preloader.setShowPreloader(true);
                        this.SuspectFG = this.createForm();
                        return [4 /*yield*/, this.setRegionStore()];
                    case 1:
                        _a.sent();
                        this.active_route();
                        this.navigate_service();
                        this.preloader.setShowPreloader(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    SuspectComponent.prototype.createForm = function () {
        return new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["d" /* FormGroup */]({
            SuspectID: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            EntityType: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            CompanyTitleCode: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            CompanyTitle: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            CompanyName: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            CompanyOtherName: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            CompanyRegistrationNo: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            CompanyLicenseNo: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            FoundedDate: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            LicenseDateForm: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            LicenseDateTo: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            TaxID: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            ExciseRegNo: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            SuspectType: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            SuspectTitleCode: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            SuspectTitleName: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            SuspectFirstName: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            SuspectMiddleName: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            SuspectLastName: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            SuspectOtherName: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            SuspectDesc: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            IDCard: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            PassportNo: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            VISAType: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            PassportCountryCode: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            PassportCountryName: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            PassportDateIn: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            PassportDateOut: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            BirthDate: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            GenderType: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            BloodType: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            NationalityCode: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            NationalityNameTH: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            RaceCode: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            RaceName: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            ReligionCode: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            ReligionName: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            MaritalStatus: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            Career: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            GPS: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            Location: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            Address: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            Village: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            Building: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            Floor: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            Room: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            Alley: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            Road: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            SubDistrictCode: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            SubDistrict: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            DistrictCode: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            District: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            ProvinceCode: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            Province: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            ZipCode: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            TelephoneNo: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            Email: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            FatherName: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            MotherName: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            Remarks: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            LinkPhoto: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            PhotoDesc: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null),
            IsActive: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormControl */](null)
        });
    };
    SuspectComponent.prototype.ngOnDestroy = function () {
        this.subActivedRoute.unsubscribe();
    };
    SuspectComponent.prototype.active_route = function () {
        var _this = this;
        this.subActivedRoute = this.activatedRoute.params.subscribe(function (p) {
            _this.mode = p['mode'];
            if (p['mode'] === 'C') {
                // set false
                _this.navService.setEditButton(false);
                _this.navService.setEditField(false);
                _this.navService.setNextPageButton(false);
                // set true
                _this.navService.setSaveButton(true);
                _this.navService.setCancelButton(true);
            }
            else if (p['mode'] === 'R') {
                // set false
                _this.navService.setSaveButton(false);
                _this.navService.setCancelButton(false);
                // set true
                // this.navService.setPrintButton(true);
                _this.navService.setNextPageButton(false);
                _this.navService.setEditButton(true);
                _this.navService.setEditField(true);
                if (p['code']) {
                    _this.GetByCon(p['code']);
                }
            }
        });
    };
    SuspectComponent.prototype.navigate_service = function () {
        var _this = this;
        this.navService.showFieldEdit.subscribe(function (p) {
            _this.showEditField = p.valueOf();
        });
        this.onSaveSubscribe = this.navService.onSave.subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
            var birthDay, passportDateIn, passportDateOut;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!status) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.navService.setOnSave(false)];
                    case 1:
                        _a.sent();
                        birthDay = Object(__WEBPACK_IMPORTED_MODULE_16_app_config_dateFormat__["c" /* getDateMyDatepicker */])(this.SuspectFG.value.BirthDate);
                        passportDateIn = Object(__WEBPACK_IMPORTED_MODULE_16_app_config_dateFormat__["c" /* getDateMyDatepicker */])(this.SuspectFG.value.PassportDateIn);
                        passportDateOut = Object(__WEBPACK_IMPORTED_MODULE_16_app_config_dateFormat__["c" /* getDateMyDatepicker */])(this.SuspectFG.value.PassportDateOut);
                        this.SuspectFG.value.BirthDate = Object(__WEBPACK_IMPORTED_MODULE_16_app_config_dateFormat__["g" /* setZeroHours */])(birthDay);
                        this.SuspectFG.value.PassportDateIn = Object(__WEBPACK_IMPORTED_MODULE_16_app_config_dateFormat__["g" /* setZeroHours */])(passportDateIn);
                        this.SuspectFG.value.passportDateOut = Object(__WEBPACK_IMPORTED_MODULE_16_app_config_dateFormat__["g" /* setZeroHours */])(passportDateOut);
                        if (this.mode === 'C') {
                            this.OnCreate();
                        }
                        else if (this.mode === 'R') {
                            this.OnRevice();
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    };
    SuspectComponent.prototype.GetByCon = function (SuspectID) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.noticeService.getSuspectByCon(SuspectID).then(function (res) {
                            _this.SuspectFG.reset({
                                SuspectID: res.SuspectID,
                                EntityType: res.EntityType,
                                CompanyTitleCode: res.CompanyTitleCode,
                                CompanyTitle: res.CompanyTitle,
                                CompanyName: res.CompanyName,
                                CompanyOtherName: res.CompanyOtherName,
                                CompanyRegistrationNo: res.CompanyRegistrationNo,
                                CompanyLicenseNo: res.CompanyLicenseNo,
                                FoundedDate: res.FoundedDate,
                                LicenseDateForm: res.LicenseDateForm,
                                LicenseDateTo: res.LicenseDateTo,
                                TaxID: res.TaxID,
                                ExciseRegNo: res.ExciseRegNo,
                                SuspectType: res.SuspectType,
                                SuspectTitleCode: res.SuspectTitleCode,
                                SuspectTitleName: res.SuspectTitleName,
                                SuspectFirstName: res.SuspectFirstName,
                                SuspectMiddleName: res.SuspectMiddleName,
                                SuspectLastName: res.SuspectLastName,
                                SuspectOtherName: res.SuspectOtherName,
                                SuspectDesc: res.SuspectDesc,
                                IDCard: res.IDCard,
                                PassportNo: res.PassportNo,
                                VISAType: res.VISAType,
                                PassportCountryCode: res.PassportCountryCode,
                                PassportCountryName: res.PassportCountryName,
                                PassportDateIn: Object(__WEBPACK_IMPORTED_MODULE_16_app_config_dateFormat__["e" /* setDateMyDatepicker */])(res.PassportDateIn),
                                PassportDateOut: Object(__WEBPACK_IMPORTED_MODULE_16_app_config_dateFormat__["e" /* setDateMyDatepicker */])(res.PassportDateOut),
                                BirthDate: Object(__WEBPACK_IMPORTED_MODULE_16_app_config_dateFormat__["e" /* setDateMyDatepicker */])(res.BirthDate),
                                GenderType: res.GenderType,
                                BloodType: res.BloodType,
                                NationalityCode: res.NationalityCode,
                                NationalityNameTH: res.NationalityNameTH,
                                RaceCode: res.RaceCode,
                                RaceName: res.RaceName,
                                ReligionCode: res.ReligionCode,
                                ReligionName: res.ReligionName,
                                MaritalStatus: res.MaritalStatus,
                                Career: res.Career,
                                GPS: res.GPS,
                                Location: res.Location,
                                Address: res.Address,
                                Village: res.Village,
                                Building: res.Building,
                                Floor: res.Floor,
                                Room: res.Room,
                                Alley: res.Alley,
                                Road: res.Road,
                                SubDistrictCode: res.SubDistrictCode,
                                SubDistrict: res.SubDistrict,
                                DistrictCode: res.DistrictCode,
                                District: res.District,
                                ProvinceCode: res.ProvinceCode,
                                Province: res.Province,
                                ZipCode: res.ZipCode,
                                TelephoneNo: res.TelephoneNo,
                                Email: res.Email,
                                FatherName: res.FatherName,
                                MotherName: res.MotherName,
                                Remarks: res.Remarks,
                                LinkPhoto: res.LinkPhoto,
                                PhotoDesc: res.PhotoDesc,
                                IsActive: res.IsActive
                            });
                            if (res.LinkPhoto) {
                                _this.imgNobody.nativeElement.src = res.LinkPhoto;
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SuspectComponent.prototype.OnCreate = function () {
    };
    SuspectComponent.prototype.OnRevice = function () {
        return __awaiter(this, void 0, void 0, function () {
            var IsSuccess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Set Preloader
                        this.preloader.setShowPreloader(true);
                        return [4 /*yield*/, this.noticeService.updSuspect(this.SuspectFG.value).then(function (isSuccess) {
                                IsSuccess = isSuccess;
                            }, function (error) { IsSuccess = false; })];
                    case 1:
                        _a.sent();
                        if (IsSuccess) {
                            alert(__WEBPACK_IMPORTED_MODULE_17_app_config_message__["a" /* Message */].saveComplete);
                        }
                        else {
                            alert(__WEBPACK_IMPORTED_MODULE_17_app_config_message__["a" /* Message */].saveFail);
                        }
                        // Set Preloader
                        this.preloader.setShowPreloader(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    SuspectComponent.prototype.setRegionStore = function () {
        return __awaiter(this, void 0, void 0, function () {
            var subdistrict, district, province;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.arrestService.masSubdistrictgetAll().then(function (res) {
                            return subdistrict = res;
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.arrestService.masDistrictgetAll().then(function (res) {
                                return district = res;
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.arrestService.masProvincegetAll().then(function (res) {
                                return province = res;
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, subdistrict
                                .map(function (subdis) { return district.filter(function (dis) { return dis.DistrictCode == subdis.districtCode; })
                                .map(function (dis) { return province.filter(function (pro) { return pro.ProvinceCode == dis.ProvinceCode; })
                                .map(function (pro) {
                                var r = __assign({}, subdis, dis, pro);
                                _this.typeheadRegion.push({
                                    SubDistrictCode: r.subdistrictCode,
                                    SubDistrictNameTH: r.subdistrictNameTH,
                                    DistrictCode: r.DistrictCode,
                                    DistrictNameTH: r.DistrictNameTH,
                                    ProvinceCode: r.ProvinceCode,
                                    ProvinceNameTH: r.ProvinceNameTH,
                                    ZipCode: null
                                });
                            }); }); })];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SuspectComponent.prototype.selectItemRegion = function (ele) {
        this.SuspectFG.patchValue({
            SubDistrictCode: ele.item.SubDistrictCode,
            SubDistrict: ele.item.SubDistrictNameTH,
            DistrictCode: ele.item.DistrictCode,
            District: ele.item.DistrictNameTH,
            ProvinceCode: ele.item.ProvinceCode,
            Province: ele.item.ProvinceNameTH
        });
    };
    SuspectComponent.prototype.changeImage = function (e, img) {
        var _this = this;
        var file = e.target.files[0];
        var isMatch;
        __WEBPACK_IMPORTED_MODULE_18_app_config_imageType__["a" /* ImageType */].filter(function (item) { return file.type == item.type; }).map(function () { return isMatch = true; });
        if (!isMatch) {
            alert(__WEBPACK_IMPORTED_MODULE_17_app_config_message__["a" /* Message */].checkImageType);
            return;
        }
        var reader = new FileReader();
        reader.onload = function () {
            img.src = reader.result;
            _this.SuspectFG.patchValue({
                LinkPhoto: reader.result,
                PhotoDesc: file.name
            });
        };
        reader.readAsDataURL(file);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('imgNobody'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], SuspectComponent.prototype, "imgNobody", void 0);
    SuspectComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-suspect',
            template: __webpack_require__("./src/app/pages/notices/suspect/suspect.component.html"),
            styles: [__webpack_require__("./src/app/pages/notices/suspect/suspect.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["d" /* NgbModal */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_4__shared_preloader_preloader_component__["b" /* PreloaderService */],
            __WEBPACK_IMPORTED_MODULE_3__shared_header_navigation_navigation_service__["a" /* NavigationService */],
            __WEBPACK_IMPORTED_MODULE_6__angular_forms__["b" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_14__arrests_arrests_service__["a" /* ArrestsService */],
            __WEBPACK_IMPORTED_MODULE_15__notice_service__["a" /* NoticeService */]])
    ], SuspectComponent);
    return SuspectComponent;
}());



/***/ }),

/***/ "./src/app/pages/notices/suspect/suspect.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SuspectModule", function() { return SuspectModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__suspect_component__ = __webpack_require__("./src/app/pages/notices/suspect/suspect.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__component_card_actions_card_actions_module__ = __webpack_require__("./src/app/pages/component/card-actions/card-actions.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__arrests_arrests_service__ = __webpack_require__("./src/app/pages/arrests/arrests.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__notice_service__ = __webpack_require__("./src/app/pages/notices/notice.service.ts");
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
                { title: 'ค้นหาใบแจ้งความ', url: '/notice/list' },
                { title: 'จัดการข้อมูลใบแจ้งความนำจับ', url: '/notice/manage/C/NEW' },
                { title: 'จัดการข้อมูลผู้ต้องสงสัย' }
            ],
            codePage: 'XCS60-99-01-02-00',
            nextPage: { title: 'งานแจ้งความ', url: '/' }
        },
        component: __WEBPACK_IMPORTED_MODULE_2__suspect_component__["a" /* SuspectComponent */]
    }
];
var SuspectModule = /** @class */ (function () {
    function SuspectModule() {
    }
    SuspectModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["k" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["d" /* RouterModule */].forChild(routes),
                __WEBPACK_IMPORTED_MODULE_6__ng_bootstrap_ng_bootstrap__["e" /* NgbModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_3__component_card_actions_card_actions_module__["a" /* CardActionsModule */],
                __WEBPACK_IMPORTED_MODULE_11_mydatepicker_th__["a" /* MyDatePickerTHModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__suspect_component__["a" /* SuspectComponent */]],
            exports: [__WEBPACK_IMPORTED_MODULE_2__suspect_component__["a" /* SuspectComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_7__arrests_arrests_service__["a" /* ArrestsService */], __WEBPACK_IMPORTED_MODULE_10__notice_service__["a" /* NoticeService */]],
            schemas: [__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* NO_ERRORS_SCHEMA */]]
        })
    ], SuspectModule);
    return SuspectModule;
}());



/***/ })

});
//# sourceMappingURL=suspect.module.chunk.js.map
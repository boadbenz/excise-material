webpackJsonp(["detail-manage.module"],{

/***/ "./src/app/pages/arrests/offense-modal/offense-modal.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header bg-theme\">\n    <h4 class=\"modal-title text-white\">รายละเอียดการกระทำผิด</h4>\n    <a href=\"javaScript:void(0);\" class=\"close text-white font-14\" aria-label=\"Close\" (click)=\"dismiss('Cross click')\">\n        <span aria-hidden=\"true\">\n            <i class=\" ti-close\"></i>\n        </span>\n    </a>\n</div>\n<div class=\"modal-body font-14\">\n    <div class=\"card p-0 unset-radius\">\n        <div class=\"card-body p-0\">\n\n            <table class=\"table table-sm table-striped\">\n                <thead>\n                    <tr>\n                        <th class=\"text-center\">ลำดับ</th>\n                        <th>เลขที่รับ</th>\n                        <th>มาตรา</th>\n                        <th>ข้อ</th>\n                        <th>ข้อกล่าวหา</th>\n                        <th>สถานที่จับกุม</th>\n                        <th>หน่วยงาน</th>\n                        <th>วันที่จับกุม</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr>\n                        <td class=\"text-center\"></td>\n                        <td>1</td>\n                        <td>1</td>\n                        <td>1</td>\n                        <td>1</td>\n                        <td>1</td>\n                        <td>1</td>\n                        <td>1</td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n        <div class=\"card-footer card-footer-unset\">\n            <div class=\"row justify-content-between m-l-5\">\n                <div clas=\"col\">\n                    <a class=\"icn-pagination\"> |<< </a>\n                            <label> หน้าที่\n                                <select>\n                                    <option value=\"1\">1</option>\n                                    <option value=\"2\">2</option>\n                                </select> จาก 2 หน้า</label>\n                            <a class=\"icn-pagination m-r-10\"> >>| </a>\n                            รายการที่ 1 - 5 จาก 5 รายการ\n                </div>\n                <div class=\"col col-lg-3 text-right\">\n                    <label>แสดง\n                        <select>\n                            <option>5</option>\n                            <option>10</option>\n                            <option>15</option>\n                            <option>20</option>\n                        </select> รายการ</label>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/pages/arrests/offense-modal/offense-modal.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/arrests/offense-modal/offense-modal.component.ts":
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
            template: __webpack_require__("./src/app/pages/arrests/offense-modal/offense-modal.component.html"),
            styles: [__webpack_require__("./src/app/pages/arrests/offense-modal/offense-modal.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */]])
    ], OffenseModalComponent);
    return OffenseModalComponent;
}());



/***/ }),

/***/ "./src/app/pages/arrests/offense-modal/offense-modal.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OffenseModalModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__offense_modal_component__ = __webpack_require__("./src/app/pages/arrests/offense-modal/offense-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__component_card_actions_card_actions_module__ = __webpack_require__("./src/app/pages/component/card-actions/card-actions.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var OffenseModalModule = /** @class */ (function () {
    function OffenseModalModule() {
    }
    OffenseModalModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_3__component_card_actions_card_actions_module__["a" /* CardActionsModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__offense_modal_component__["a" /* OffenseModalComponent */]],
            exports: [__WEBPACK_IMPORTED_MODULE_2__offense_modal_component__["a" /* OffenseModalComponent */]]
        })
    ], OffenseModalModule);
    return OffenseModalModule;
}());



/***/ }),

/***/ "./src/app/pages/investigation/detail-manage/detail-manage.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form-horizontal\" [formGroup]=\"investigateFG\">\n\n    <div class=\"card card-outline-bluish unset-radius\">\n        <div class=\"card-header  unset-radius\">\n            <app-card-actions-collapse></app-card-actions-collapse>\n            <h4 class=\"card-title m-b-0\">รายงานการสืบสวน</h4>\n        </div>\n        <div class=\"card-body\" id=\"0\">\n            <div class=\"row\">\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ครั้งที่สืบสวน : </label>\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\n                    <div class=\"form-group \">\n                        <input type=\"text\" formControlName=\"InvestigateSeq\" class=\"form-control form-control-sm\" readonly>\n                    </div>\n                </div>\n\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">วันที่เริ่มสืบสวน :</label>\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\n                    <div class=\"form-group input-group\">\n                        <input type=\"date\" formControlName=\"InvestigateDateStart\" class=\"form-control form-control-sm\" [readOnly]=\"showEditField\">\n                        <label for=\"\">&nbsp;&nbsp;ถึง&nbsp;&nbsp;</label>\n                        <input type=\"date\" formControlName=\"InvestigateDateEnd\" class=\"form-control form-control-sm\" [readOnly]=\"showEditField\">\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"row\">\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ผู้ดูแลการสืบสวน :\n                </label>\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\n                    <div class=\"form-group \">\n                        <input type=\"text\" formControlName=\"StationCode\" class=\"form-control form-control-sm\" [disabled]=\"showEditField\">\n                    </div>\n                </div>\n\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">หน่วยงาน :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <input type=\"text\" formControlName=\"StationName\" class=\"form-control form-control-sm\" readonly>\n                </div>\n            </div>\n\n            <div class=\"row\">\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ตำแหน่ง :\n                </label>\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\n                    <div class=\"form-group \">\n                        <input type=\"text\" formControlName=\"InvestigateDetail\" class=\"form-control form-control-sm\" readonly>\n                    </div>\n                </div>\n\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ผู้สั่งการ :</label>\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\n                    <input type=\"text\" formControlName=\"StationName\" class=\"form-control form-control-sm\" [disabled]=\"showEditField\">\n                </div>\n            </div>\n\n            <div class=\"row\">\n                <label for=\"\" class=\"col-lg-3 col-sm-4 control-label\">มาตราความเชื่อมั่นของแหล่งข่าว :\n                </label>\n                <div class=\"col-lg-9 col-md-7 col-sm-8\">\n                    <div class=\"form-group \">\n                        <select formControlName=\"ValueOfNews\" class=\"form-control form-control-sm\" [ngClass]=\"{'ng-touched':isRequired}\" required>\n                            <option value=\"\" selected disabled></option>\n                            <option *ngFor=\"let item of valofnews; let i=index;\" [value]=\"item.value\" [disabled]=\"showEditField\">{{item.text}}</option>\n                        </select>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"row\">\n                <label for=\"\" class=\"col-lg-3 col-sm-4 control-label\">ค่าของเนื้อข่าว :\n                </label>\n                <div class=\"col-lg-9 col-md-7 col-sm-8\">\n                    <div class=\"form-group \">\n                        <select formControlName=\"ConfidenceOfNews\" class=\"form-control form-control-sm\" [ngClass]=\"{'ng-touched':isRequired}\" required>\n                            <option value=\"\" selected disabled></option>\n                            <option *ngFor=\"let item of costofnews; let i=index;\" [value]=\"item.value\" [disabled]=\"showEditField\">{{item.text}}</option>\n                        </select>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"card card-outline-bluish unset-radius\">\n        <div class=\"card-header unset-radius\">\n            <app-card-actions-collapse></app-card-actions-collapse>\n            <h4 class=\"card-title m-b-0\">ผู้ร่วมทำการสืบสวน</h4>\n        </div>\n        <div class=\"card-body\">\n            <table class=\"table table-sm table-striped table-set-border\">\n                <thead>\n                    <tr>\n                        <th class=\"text-center\"></th>\n                        <th class=\"text-center\">ลำดับ</th>\n                        <th>ชื่อผู้สืบสวน</th>\n                        <th>หน่วยงาน</th>\n                        <th>ตำแหน่ง</th>\n                    </tr>\n                </thead>\n                <tbody formArrayName=\"InvestigateDetailStaff\">\n                    <tr *ngFor=\"let item of InvestigateDetailStaff.controls; let i = index;\" [formGroupName]=\"i\">\n                        <td class=\"text-center\">\n                            <input type=\"checkbox\" id=\"staff_td1\" class=\"filled-in chk-col-indigo\" [disabled]=\"showEditField\">\n                            <label for=\"staff_td1\" class=\"m-0\"></label>\n                        </td>\n                        <td class=\"text-center\">{{i+1}}</td>\n                        <td>\n                            <ng-template #rt let-r=\"result\" let-t=\"term\">\n                                {{ r.TitleName == null ? '' : r.TitleName }} {{r.FirstName == null ? '' : r.FirstName}} {{r.LastName == null ? '' : r.LastName}}\n                            </ng-template>\n\n                            <input type=\"text\" class=\"form-control form-control-sm\" [ngbTypeahead]=\"searchStaff\" [resultTemplate]=\"rt\" [readOnly]=\"showEditField\"\n                                [inputFormatter]=\"formatterStaff\" (selectItem)=\"selectItemStaff($event, i)\" value=\"{{item.value.FullName}}\"\n                            />\n                        </td>\n                        <td>\n                            <input type=\"text\" formControlName=\"DepartmentName\" class=\"form-control form-control-sm\" readonly>\n                        </td>\n                        <td>\n                            <input type=\"text\" formControlName=\"PositionName\" class=\"form-control form-control-sm\" readonly>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n    </div>\n\n    <div class=\"card card-outline-bluish unset-radius\">\n        <div class=\"card-header  unset-radius\">\n            <app-card-actions-collapse></app-card-actions-collapse>\n            <h4 class=\"card-title m-b-0\">ผู้ต้องสงสัย</h4>\n        </div>\n        <div class=\"card-body\">\n            <div class=\"row form-group\">\n                <div class=\"col-lg-10 col-md-9 col-sm-8\"></div>\n                <div class=\"col-lg-2 col-md-3 col-sm-4\">\n                    <button type=\"button\" class=\"btn btn-block btn-themecolor\" (click)=\"openModal(lawbreaker)\" [disabled]=\"showEditField\">เพิ่มผู้ต้องสงสัย</button>\n                </div>\n\n                <ng-template #lawbreaker let-c=\"close\" let-d=\"dismiss\">\n                    <app-modal-lawbreaker (c)=\"modal.close()\" (d)=\"modal.dismiss()\"></app-modal-lawbreaker>\n                </ng-template>\n            </div>\n\n            <table class=\"table table-sm table-striped table-set-border\">\n                <thead>\n                    <tr>\n                        <th class=\"text-center\">\n                            <input type=\"checkbox\" id=\"offense_th\" class=\"filled-in chk-col-indigo\" [disabled]=\"showEditField\">\n                            <label for=\"offense_th\" class=\"m-0\"></label>\n                        </th>\n                        <th class=\"text-center\">ลำดับ</th>\n                        <th>ประเภทผู้ต้องสงสัย</th>\n                        <th>ประเภทบุคคล</th>\n                        <th>หมายเลขอ้างอิง</th>\n                        <th>ชื่อ</th>\n                        <th>จำนวนครั้งกระทำผิด</th>\n                        <th class=\"text-center\"></th>\n                        <th class=\"text-center\"></th>\n                    </tr>\n                </thead>\n                <tbody formArrayName=\"InvestigateDetailSuspect\">\n                    <tr *ngFor=\"let item of InvestigateDetailSuspect.controls; let i = index;\" [formGroupName]=\"i\">\n                        <td class=\"text-center\">\n                            <input type=\"checkbox\" id=\"suspect_td1\" class=\"filled-in chk-col-indigo\" [disabled]=\"showEditField\">\n                            <label for=\"suspect_td1\" class=\"m-0\"></label>\n                        </td>\n                        <td class=\"text-center\">{{i+1}}</td>\n                        <td>\n                            <input type=\"text\" formControlName=\"CompanyTitleName\" class=\"form-control form-control-sm\" readonly>\n                        </td>\n                        <td>\n                            <input type=\"text\" formControlName=\"CompanyTitleName\" class=\"form-control form-control-sm\" readonly>\n                        </td>\n                        <td>\n                            <input type=\"text\" formControlName=\"SuspectReferenceID\" class=\"form-control form-control-sm\" readonly>\n                        </td>\n                        <td>\n                            <ng-template #rt let-r=\"result\" let-t=\"term\">\n                                {{ r.TitleName == null ? '' : r.SuspecTitleName }} {{r.SuspectFirstName == null ? '' : r.SuspectFirstName}} {{r.SuspectLastName\n                                == null ? '' : r.SuspectLastName}}\n                            </ng-template>\n                            <input type=\"text\" class=\"form-control form-control-sm\" [readOnly]=\"showEditField\" value=\"{{item.value.FullName}}\" />\n                        </td>\n                        <td>\n                            <input type=\"text\" formControlName=\"InvestigateDetailID\" class=\"form-control form-control-sm\" readonly>\n                        </td>\n                        <td colspan=\"2\" class=\"text-center\">\n                            <a href=\"javaScript:void(0);\" class=\"text-secondary\" *ngIf=\"showEditField\">\n                                <i class=\"fa fa-eye fa-lg\"></i>\n                            </a>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n\n            <ng-template #offense let-c=\"close\" let-d=\"dismiss\">\n                <app-offense-modal (c)=\"modal.close()\" (d)=\"modal.dismiss()\"></app-offense-modal>\n            </ng-template>\n\n        </div>\n    </div>\n\n    <div class=\"card card-outline-bluish unset-radius\">\n        <div class=\"card-header  unset-radius\">\n            <app-card-actions-collapse></app-card-actions-collapse>\n            <h4 class=\"card-title m-b-0\">สถานที่ทำการสืบสวน</h4>\n        </div>\n        <div class=\"card-body\">\n            <div class=\"row form-group\">\n                <div class=\"col-lg-10 col-md-9 col-sm-8\"></div>\n                <div class=\"col-lg-2 col-md-3 col-sm-4\">\n                    <button type=\"button\" class=\"btn btn-block btn-themecolor\" [disabled]=\"showEditField\">เพิ่มสถานที่</button>\n                </div>\n            </div>\n\n\n            <table class=\"table table-sm table-striped table-set-border\">\n                <thead>\n                    <tr>\n                        <th class=\"text-center\">\n                            <input type=\"checkbox\" id=\"location_th\" class=\"filled-in chk-col-indigo\" [disabled]=\"showEditField\">\n                            <label for=\"location_th\" class=\"m-0\"></label>\n                        </th>\n                        <th class=\"text-center\">ลำดับ</th>\n                        <th>เลขที่</th>\n                        <th>หมู่ที่</th>\n                        <th>อาคาร</th>\n                        <th>ห้อง</th>\n                        <th>ชั้น</th>\n                        <th>ตรอก/ซอย</th>\n                        <th>ถนน</th>\n                        <th>ตำบล/อำเภอ/จังหวัด</th>\n                        <th></th>\n                    </tr>\n                </thead>\n                <tbody formArrayName=\"InvestigateDetailLocal\">\n                    <tr *ngFor=\"let item of InvestigateDetailLocal.controls; let i = index;\" [formGroupName]=\"i\">\n                        <td class=\"text-center\">\n                            <input type=\"checkbox\" id=\"location_td\" class=\"filled-in chk-col-indigo\" [disabled]=\"showEditField\">\n                            <label for=\"location_td\" class=\"m-0\"></label>\n                        </td>\n                        <td class=\"text-center\">{{i+1}}</td>\n                        <td>\n                            <input type=\"text\" formControlName=\"Address\" class=\"form-control form-control-sm\" readonly>\n                        </td>\n                        <td>\n                            <input type=\"text\" formControlName=\"Village\" class=\"form-control form-control-sm\" readonly>\n                        </td>\n                        <td>\n                            <input type=\"text\" formControlName=\"Building\" class=\"form-control form-control-sm\" readonly>\n                        </td>\n                        <td>\n                            <input type=\"text\" formControlName=\"Room\" class=\"form-control form-control-sm\" readonly>\n                        </td>\n                        <td>\n                            <input type=\"text\" formControlName=\"Floor\" class=\"form-control form-control-sm\" readonly>\n                        </td>\n                        <td>\n                            <input type=\"text\" formControlName=\"Alley\" class=\"form-control form-control-sm\" readonly>\n                        </td>\n                        <td>\n                            <input type=\"text\" formControlName=\"Road\" class=\"form-control form-control-sm\" readonly>\n                        </td>\n                        <td>\n                            <input type=\"text\" formControlName=\"SubDistrict\" class=\"form-control form-control-sm\" readonly>\n                        </td>\n                        <td class=\"text-center\">\n                            <a href=\"javaScript:void(0);\" class=\"text-secondary\" *ngIf=\"showEditField\">\n                                <i class=\"fa fa-trash-o fa-lg\"></i>\n                            </a>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n\n        </div>\n    </div>\n\n    <div class=\"card card-outline-bluish unset-radius\">\n        <div class=\"card-header  unset-radius\">\n            <app-card-actions-collapse></app-card-actions-collapse>\n            <h4 class=\"card-title m-b-0\">สินค้าต้องสงสัย</h4>\n        </div>\n        <div class=\"card-body\">\n            <div class=\"row form-group\">\n                <div class=\"col-lg-10 col-md-9 col-sm-8\"></div>\n                <div class=\"col-lg-2 col-md-3 col-sm-4\">\n                    <button type=\"button\" class=\"btn btn-block btn-themecolor\" [disabled]=\"showEditField\">เพิ่มสินค้า</button>\n                </div>\n            </div>\n\n            <table class=\"table table-sm table-striped table-set-border\">\n                <thead>\n                    <tr>\n                        <th class=\"text-center\">\n                            <input type=\"checkbox\" id=\"duty_th\" class=\"filled-in chk-col-indigo\" [disabled]=\"showEditField\">\n                            <label for=\"duty_th\" class=\"m-0\"></label>\n                        </th>\n                        <th class=\"text-center\">ลำดับ</th>\n                        <th>สินค้า</th>\n                        <th>จำนวน</th>\n                        <th>หน่วย</th>\n                        <th></th>\n                    </tr>\n                </thead>\n\n                <tbody formArrayName=\"InvestigateDetailProduct\">\n                    <tr *ngFor=\"let item of InvestigateDetailProduct.controls; let i = index;\" [formGroupName]=\"i\">\n                        <td class=\"text-center\">\n                            <input type=\"checkbox\" id=\"product_td1\" class=\"filled-in chk-col-indigo\" [disabled]=\"showEditField\">\n                            <label for=\"product_td1\" class=\"m-0\"></label>\n                        </td>\n                        <td class=\"text-center\">{{i+1}}</td>\n                        <td>\n                            <input type=\"text\" formControlName=\"ProductDesc\" class=\"form-control form-control-sm\" readonly>\n                        </td>\n                        <td>\n                            <input type=\"text\" formControlName=\"Qty\" class=\"form-control form-control-sm\" readonly>\n                        </td>\n                        <td>\n                            <input type=\"text\" formControlName=\"QtyUnit\" class=\"form-control form-control-sm\" readonly>\n                        </td>\n                        <td class=\"text-center\">\n                            <a href=\"javaScript:void(0);\" class=\"text-secondary\" *ngIf=\"showEditField\">\n                                <i class=\"fa fa-eye fa-lg\"></i>\n                            </a>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n    </div>\n\n    <div class=\"card card-outline-bluish unset-radius\">\n        <div class=\"card-header  unset-radius\">\n            <app-card-actions-collapse></app-card-actions-collapse>\n            <h4 class=\"card-title m-b-0\">รายละเอียดที่เกิดเหตุในการสืบสวน</h4>\n        </div>\n        <div class=\"card-body\">\n\n            <div class=\"row\">\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">หัวข้อการสืบสวน :\n                </label>\n                <div class=\"col-lg-10 col-sm-8\">\n                    <div class=\"form-group \">\n                        <textarea formControlName=\"InvestigateDetail\" cols=\"30\" rows=\"5\" class=\"form-control form-control-sm\" [disabled]=\"showEditField\"></textarea>\n                    </div>\n                </div>\n            </div>\n\n        </div>\n    </div>\n\n    <div class=\"card card-outline-bluish unset-radius\">\n        <div class=\"card-header  unset-radius\">\n            <app-card-actions-collapse></app-card-actions-collapse>\n            <h4 class=\"card-title m-b-0\">เอกสารแนบภายใน</h4>\n        </div>\n        <div class=\"card-body\">\n\n            <div class=\"row form-group\">\n                <div class=\"col-lg-10 col-md-9 col-sm-8\"></div>\n                <div class=\"col-lg-2 col-md-3 col-sm-4\">\n                    <button type=\"button\" class=\"btn btn-block btn-themecolor\" [disabled]=\"showEditField\">เพิ่มเอกสาร</button>\n                </div>\n            </div>\n\n            <table class=\"table table-sm table-striped table-set-border\">\n                <thead>\n                    <tr>\n                        <th class=\"text-center\">ลำดับ</th>\n                        <th>ชื่อเอกสารแนบ</th>\n                        <th>ที่อยู่เอกสารแนบ</th>\n                        <th></th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr>\n                        <td class=\"text-center\">\n                            1\n                        </td>\n                        <td>\n                            <input type=\"text\" name=\"\" id=\"\" class=\"form-control form-control-sm\" [disabled]=\"showEditField\">\n                        </td>\n                        <td>\n                            <input type=\"text\" name=\"\" id=\"\" class=\"form-control form-control-sm\" [disabled]=\"showEditField\">\n                        </td>\n                        <td class=\"text-center\">\n                            <a href=\"javaScript:void(0);\" class=\"text-danger\" *ngIf=\"!showEditField\">\n                                <i class=\"fa fa-trash-o fa-lg\"></i>\n                            </a>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n\n        </div>\n    </div>\n</form>"

/***/ }),

/***/ "./src/app/pages/investigation/detail-manage/detail-manage.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/investigation/detail-manage/detail-manage.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailManageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_header_navigation_navigation_service__ = __webpack_require__("./src/app/shared/header-navigation/navigation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__investigate_service__ = __webpack_require__("./src/app/pages/investigation/investigate.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config_dateFormat__ = __webpack_require__("./src/app/config/dateFormat.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__investigate_detail_staff__ = __webpack_require__("./src/app/pages/investigation/investigate-detail-staff.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__investigate_detail_suspect__ = __webpack_require__("./src/app/pages/investigation/investigate-detail-suspect.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__investigate_detail_local__ = __webpack_require__("./src/app/pages/investigation/investigate-detail-local.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__investigate_detail_product__ = __webpack_require__("./src/app/pages/investigation/investigate-detail-product.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__models__ = __webpack_require__("./src/app/models/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_debounceTime__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/debounceTime.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/distinctUntilChanged.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
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















var DetailManageComponent = /** @class */ (function () {
    function DetailManageComponent(fb, activeRoute, invesService, ngModal, navService, elem) {
        var _this = this;
        this.fb = fb;
        this.activeRoute = activeRoute;
        this.invesService = invesService;
        this.ngModal = ngModal;
        this.navService = navService;
        this.elem = elem;
        this.typeheadStaff = new Array();
        this.typeaheadProduct = new Array();
        this.typeheadProductUnit = new Array();
        this.valofnews = __WEBPACK_IMPORTED_MODULE_11__models__["l" /* ValueofNews */];
        this.costofnews = __WEBPACK_IMPORTED_MODULE_11__models__["b" /* CostofNews */];
        this.investigateDetail = new Array();
        this.investigateDetailStaff = new Array();
        this.investigateDetailSuspect = new Array();
        this.investigateDetailLocal = new Array();
        this.investigateDetailProduct = new Array();
        this.searchStaff = function (text$) {
            return text$
                .debounceTime(200)
                .distinctUntilChanged()
                .map(function (term) { return term === '' ? []
                : _this.typeheadStaff
                    .filter(function (v) {
                    return v.TitleName.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                        v.FirstName.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                        v.LastName.toLowerCase().indexOf(term.toLowerCase()) > -1;
                }).slice(0, 10); });
        };
        this.formatterStaff = function (x) {
            return x.TitleName + " " + x.FirstName + " " + x.LastName;
        };
        // set false
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
        this.navService.setNextPageButton(false);
    }
    Object.defineProperty(DetailManageComponent.prototype, "InvestigateDetail", {
        get: function () {
            return this.investigateFG.get('InvestigateDetail');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DetailManageComponent.prototype, "InvestigateDetailStaff", {
        get: function () {
            return this.investigateFG.get('InvestigateDetailStaff');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DetailManageComponent.prototype, "InvestigateDetailSuspect", {
        get: function () {
            return this.investigateFG.get('InvestigateDetailSuspect');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DetailManageComponent.prototype, "InvestigateDetailLocal", {
        get: function () {
            return this.investigateFG.get('InvestigateDetailLocal');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DetailManageComponent.prototype, "InvestigateDetailProduct", {
        get: function () {
            return this.investigateFG.get('InvestigateDetailProduct');
        },
        enumerable: true,
        configurable: true
    });
    DetailManageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.activeRoute.params.subscribe(function (p) {
            _this.mode = p['mode'];
            if (p['mode'] === 'C' && p['code']) {
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
                _this.detailGetByCon(p['code']);
            }
            _this.createForm();
            _this.setStaffStore(p['code']);
        });
        this.sub = this.navService.showFieldEdit.subscribe(function (status) {
            _this.showEditField = status;
        });
        this.sub = this.navService.onSave.subscribe(function (status) {
            if (status) {
                _this.onSave();
            }
        });
        this.sub = this.navService.onEdit.subscribe(function (status) {
            if (status) {
                _this.onEdit();
            }
        });
    };
    // show first panel
    DetailManageComponent.prototype.ngAfterViewInit = function () {
        var elements = this.elem.nativeElement.querySelectorAll('.card-body');
        elements.forEach(function (element) {
            if (element.id != "0") {
                element.style.display = "none";
            }
        });
    };
    DetailManageComponent.prototype.setStaffStore = function (InvestigateCode) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.invesService.teamgetByCon(InvestigateCode).subscribe(function (res) {
                            return _this.typeheadStaff = res;
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // private async setProductStore() {
    //     await this.invesService.masProductgetAll().then(res => {
    //         this.typeheadProduct = res;
    //     })
    // }
    // private async setProductUnitStore() {
    //     await this.invesService.getProveProductUnit('').then(res => {
    //         this.typeheadProductUnit = res;
    //     })
    // }
    DetailManageComponent.prototype.detailGetByCon = function (InvestigateCode) {
        var _this = this;
        this.sub = this.invesService.detailGetByCon(InvestigateCode).then(function (item) {
            _this.investigateFG.reset({
                InvestigateCode: item.InvestigateCode,
                InvestigateSeq: item.InvestigateSeq,
                StationCode: item.StationCode,
                StationName: item.StationName,
                InvestigateDetail: item.InvestigateDetail,
                InvestigateDateStart: Object(__WEBPACK_IMPORTED_MODULE_5__config_dateFormat__["h" /* toLocalNumeric */])(item.InvestigateDateStart),
                InvestigateDateEnd: Object(__WEBPACK_IMPORTED_MODULE_5__config_dateFormat__["h" /* toLocalNumeric */])(item.InvestigateDateEnd),
                ConfidenceOfNews: item.ConfidenceOfNews,
                ValueOfNews: item.ValueOfNews,
            });
            _this.investigateDetail = item;
            _this.setInvestTeam(item['InvestigateDetailStaff']);
            _this.setInvestLocal(item['InvestigateDetailLocal'], item.InvestigateCode);
            _this.setInvestSuspect(item['InvestigateDetailSuspect']);
            _this.setInvestProduct(item['InvestigateDetailProduct']);
        }, function (err) {
            alert(err.message);
        });
    };
    DetailManageComponent.prototype.setInvestTeam = function (investStaff) {
        var _this = this;
        if (investStaff) {
            investStaff.map(function (team) { return team.FullName = team.TitleName + " " + team.FirstName + " " + team.LastName; });
            var teamFGs = investStaff.map(function (team) { return _this.fb.group(team); });
            var teamFormArray = this.fb.array(teamFGs);
            this.investigateFG.setControl('InvestigateDetailStaff', teamFormArray);
        }
    };
    DetailManageComponent.prototype.setInvestSuspect = function (investSuspect) {
        var _this = this;
        if (investSuspect) {
            investSuspect.map(function (team) { return team.FullName = team.SuspecTitleName + " " + team.SuspectFirstName + " " + team.SuspectLastName; });
            var teamFGs = investSuspect.map(function (team) { return _this.fb.group(team); });
            var teamFormArray = this.fb.array(teamFGs);
            this.investigateFG.setControl('InvestigateDetailSuspect', teamFormArray);
        }
    };
    DetailManageComponent.prototype.setInvestLocal = function (investLocal, investCode) {
        var _this = this;
        if (investLocal) {
            this.invesService.localgetByCon(investCode).subscribe(function (item) {
                var teamFGs = item.map(function (team) { return _this.fb.group(team); });
                var teamFormArray = _this.fb.array(teamFGs);
                _this.investigateFG.setControl('InvestigateDetailLocal', teamFormArray);
            });
        }
    };
    DetailManageComponent.prototype.setInvestProduct = function (investProduct) {
        var _this = this;
        if (investProduct) {
            var teamFGs = investProduct.map(function (team) { return _this.fb.group(team); });
            var teamFormArray = this.fb.array(teamFGs);
            this.investigateFG.setControl('InvestigateDetailProduct', teamFormArray);
        }
    };
    DetailManageComponent.prototype.createForm = function () {
        this.investigateFG = this.fb.group({
            InvestigateCode: new __WEBPACK_IMPORTED_MODULE_10__angular_forms__["c" /* FormControl */](this.investCode, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["l" /* Validators */].required),
            InvestigateSeq: new __WEBPACK_IMPORTED_MODULE_10__angular_forms__["c" /* FormControl */](null),
            StationCode: new __WEBPACK_IMPORTED_MODULE_10__angular_forms__["c" /* FormControl */](null),
            StationName: new __WEBPACK_IMPORTED_MODULE_10__angular_forms__["c" /* FormControl */](null),
            InvestigateDateStart: new __WEBPACK_IMPORTED_MODULE_10__angular_forms__["c" /* FormControl */](null),
            InvestigateDateEnd: new __WEBPACK_IMPORTED_MODULE_10__angular_forms__["c" /* FormControl */](null),
            ConfidenceOfNews: new __WEBPACK_IMPORTED_MODULE_10__angular_forms__["c" /* FormControl */](null),
            ValueOfNews: new __WEBPACK_IMPORTED_MODULE_10__angular_forms__["c" /* FormControl */](null),
            InvestigateDetail: new __WEBPACK_IMPORTED_MODULE_10__angular_forms__["c" /* FormControl */](null),
            InvestigateDetailStaff: this.fb.array([this.createStaffForm()]),
            InvestigateDetailProduct: this.fb.array([this.createProductForm()]),
            InvestigateDetailLocal: this.fb.array([this.createLocalForm()]),
            InvestigateDetailSuspect: this.fb.array([this.createSuspectForm()])
        });
    };
    DetailManageComponent.prototype.createStaffForm = function () {
        __WEBPACK_IMPORTED_MODULE_6__investigate_detail_staff__["a" /* InvestigateStaffFormControl */].InvestigateCode = new __WEBPACK_IMPORTED_MODULE_10__angular_forms__["c" /* FormControl */](this.investCode);
        return this.fb.group(__WEBPACK_IMPORTED_MODULE_6__investigate_detail_staff__["a" /* InvestigateStaffFormControl */]);
    };
    DetailManageComponent.prototype.createSuspectForm = function () {
        __WEBPACK_IMPORTED_MODULE_7__investigate_detail_suspect__["a" /* InvestigateSuspectFormControl */].InvestigateCode = new __WEBPACK_IMPORTED_MODULE_10__angular_forms__["c" /* FormControl */](this.investCode);
        return this.fb.group(__WEBPACK_IMPORTED_MODULE_7__investigate_detail_suspect__["a" /* InvestigateSuspectFormControl */]);
    };
    DetailManageComponent.prototype.createProductForm = function () {
        __WEBPACK_IMPORTED_MODULE_9__investigate_detail_product__["a" /* InvestigateProductFormControl */].InvestigateCode = new __WEBPACK_IMPORTED_MODULE_10__angular_forms__["c" /* FormControl */](this.investCode);
        return this.fb.group(__WEBPACK_IMPORTED_MODULE_7__investigate_detail_suspect__["a" /* InvestigateSuspectFormControl */]);
    };
    DetailManageComponent.prototype.createLocalForm = function () {
        __WEBPACK_IMPORTED_MODULE_8__investigate_detail_local__["a" /* InvestigateLocalFormControl */].InvestigateCode = new __WEBPACK_IMPORTED_MODULE_10__angular_forms__["c" /* FormControl */](this.investCode);
        return this.fb.group(__WEBPACK_IMPORTED_MODULE_7__investigate_detail_suspect__["a" /* InvestigateSuspectFormControl */]);
    };
    DetailManageComponent.prototype.selectItemStaff = function (e, i) {
        this.InvestigateDetailStaff.at(i).reset(e.item);
        this.InvestigateDetailStaff.at(i).patchValue({
            DepartmentName: e.item.DepartmentName,
            PositionName: e.item.PositionName.trim(),
        });
    };
    DetailManageComponent.prototype.onSave = function () {
        // set true
        this.navService.setEditField(true);
        this.navService.setEditButton(true);
        this.navService.setPrintButton(true);
        this.navService.setDeleteButton(true);
        // set false
        this.navService.setSaveButton(false);
        this.navService.setCancelButton(false);
    };
    DetailManageComponent.prototype.onEdit = function () {
    };
    DetailManageComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    DetailManageComponent.prototype.openModal = function (e) {
        this.modal = this.ngModal.open(e, { size: 'lg', centered: true });
    };
    DetailManageComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-investigate-detail-manage',
            template: __webpack_require__("./src/app/pages/investigation/detail-manage/detail-manage.component.html"),
            styles: [__webpack_require__("./src/app/pages/investigation/detail-manage/detail-manage.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_10__angular_forms__["b" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_4__investigate_service__["a" /* InvestigateService */],
            __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["d" /* NgbModal */],
            __WEBPACK_IMPORTED_MODULE_3__shared_header_navigation_navigation_service__["a" /* NavigationService */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]])
    ], DetailManageComponent);
    return DetailManageComponent;
}());



/***/ }),

/***/ "./src/app/pages/investigation/detail-manage/detail-manage.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailManageModule", function() { return DetailManageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__detail_manage_component__ = __webpack_require__("./src/app/pages/investigation/detail-manage/detail-manage.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__component_card_actions_card_actions_module__ = __webpack_require__("./src/app/pages/component/card-actions/card-actions.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__investigate_service__ = __webpack_require__("./src/app/pages/investigation/investigate.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__arrests_offense_modal_offense_modal_module__ = __webpack_require__("./src/app/pages/arrests/offense-modal/offense-modal.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__component_modal_lawbreaker_modal_lawbreaker_module__ = __webpack_require__("./src/app/pages/component/modal-lawbreaker/modal-lawbreaker.module.ts");
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
                { title: 'ค้นหางานการสืบสวน', url: '/investigation/list' },
                { title: 'จัดการงานสืบสวน', url: '/investigation/manage/C/NEW' },
                { title: 'จัดการข้อมูลรายละเอียดรายงานการสืบสวน' }
            ],
            nextPage: { title: '', url: '' }
        },
        component: __WEBPACK_IMPORTED_MODULE_2__detail_manage_component__["a" /* DetailManageComponent */]
    }
];
var DetailManageModule = /** @class */ (function () {
    function DetailManageModule() {
    }
    DetailManageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_forms__["f" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_forms__["k" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_10__ng_bootstrap_ng_bootstrap__["e" /* NgbModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["d" /* RouterModule */].forChild(routes),
                __WEBPACK_IMPORTED_MODULE_3__component_card_actions_card_actions_module__["a" /* CardActionsModule */],
                __WEBPACK_IMPORTED_MODULE_11__component_modal_lawbreaker_modal_lawbreaker_module__["a" /* ModalLawbreakerModule */],
                __WEBPACK_IMPORTED_MODULE_9__arrests_offense_modal_offense_modal_module__["a" /* OffenseModalModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__detail_manage_component__["a" /* DetailManageComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_7__investigate_service__["a" /* InvestigateService */]]
        })
    ], DetailManageModule);
    return DetailManageModule;
}());



/***/ }),

/***/ "./src/app/pages/investigation/investigate-detail-local.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export InvestigateDetailLocal */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvestigateLocalFormControl; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");

var InvestigateDetailLocal = /** @class */ (function () {
    function InvestigateDetailLocal() {
    }
    return InvestigateDetailLocal;
}());

var InvestigateLocalFormControl = {
    LocalDetailID: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    LocalID: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    InvestigateCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    IsActive: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    GPS: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    Location: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    Address: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    Village: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    Building: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    Floor: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    Room: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    Alley: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    Road: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    SubDistrictCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    SubDistrict: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    DistrictCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    District: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    ProvinceCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    Province: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    ZipCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    Phone: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
};


/***/ }),

/***/ "./src/app/pages/investigation/investigate-detail-product.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export InvestigateDetailProduct */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvestigateProductFormControl; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");

var InvestigateDetailProduct = /** @class */ (function () {
    function InvestigateDetailProduct() {
    }
    return InvestigateDetailProduct;
}());

var InvestigateProductFormControl = {
    SuspectID: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    ProductID: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    InvestigateCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    GroupName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    GroupCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    IsDomestic: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    ProductCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    BrandCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    BrandNameTH: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    BrandNameEN: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    SubBrandCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    SubBrandNameTH: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    SubBrandNameEN: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    ModelCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    ModelName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    FixNo1: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    DegreeCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    Degree: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    SizeCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    Size: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    SizeUnitCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    SizeUnitName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    FixNo2: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    SequenceNo: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    ProductDesc: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    CarNo: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    Qty: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    QtyUnit: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    NetVolume: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    NetVolumeUnit: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    IsActive: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
};


/***/ }),

/***/ "./src/app/pages/investigation/investigate-detail-staff.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export InvestigateDetailStaff */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvestigateStaffFormControl; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");

var InvestigateDetailStaff = /** @class */ (function () {
    function InvestigateDetailStaff() {
        this.StaffID = 0;
        this.ProgramCode = '';
        this.ProcessCode = '';
        this.InvestigateCode = '';
        this.StaffCode = '';
        this.TitleName = '';
        this.FirstName = '';
        this.LastName = '';
        this.FullName = '';
        this.PositionCode = '';
        this.PositionName = '';
        this.PosLevel = '';
        this.PosLevelName = '';
        this.DepartmentCode = '';
        this.DepartmentName = '';
        this.DepartmentLevel = '';
        this.OfficeCode = '';
        this.OfficeName = '';
        this.OfficeShortName = '';
        this.ContributorID = '';
        this.IsActive = '';
    }
    return InvestigateDetailStaff;
}());

var InvestigateStaffFormControl = {
    StaffID: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    ProgramCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */]('XCS60-02-02'),
    ProcessCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */]('0001'),
    InvestigateCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["l" /* Validators */].required),
    StaffCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["l" /* Validators */].required),
    TitleName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    FirstName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["l" /* Validators */].required),
    LastName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    PositionCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["l" /* Validators */].required),
    PositionName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    PosLevel: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    PosLevelName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    DepartmentCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    DepartmentName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    DepartmentLevel: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    OfficeCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    OfficeName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    OfficeShortName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    ContributorCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    IsActive: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    ContributorID: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["l" /* Validators */].required),
    FullName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    IsNewItem: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](false)
};


/***/ }),

/***/ "./src/app/pages/investigation/investigate-detail-suspect.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export InvestigateDetailSuspect */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvestigateSuspectFormControl; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");

var InvestigateDetailSuspect = /** @class */ (function () {
    function InvestigateDetailSuspect() {
        this.FullName = '';
    }
    return InvestigateDetailSuspect;
}());

var InvestigateSuspectFormControl = {
    SuspectID: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    SuspectReferenceID: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    InvestigateDetailID: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    InvestigateCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    SuspecTitleName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    SuspectFirstName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    SuspectLastName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    CompanyTitleName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    CompanyName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    CompanyOtherName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    IsActive: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    FullName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
};


/***/ })

});
//# sourceMappingURL=detail-manage.module.chunk.js.map
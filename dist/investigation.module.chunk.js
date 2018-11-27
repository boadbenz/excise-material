webpackJsonp(["investigation.module"],{

/***/ "./src/app/pages/investigation/components/detail-manage/detail-manage.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form-horizontal\" [formGroup]=\"investigateFG\">\r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header  unset-radius\">\r\n            <div class=\"card-actions\">\r\n                <a class=\"\" (click)=\"card1 = !card1\">\r\n                    <i class=\"fa\" [ngClass]=\"{'fa-chevron-down': card1, 'fa-chevron-up': !card1}\"></i>\r\n                </a>\r\n            </div>\r\n            <h4 class=\"card-title m-b-0\">รายงานการสืบสวน</h4>\r\n        </div>\r\n        <div class=\"card-body\" *ngIf=\"card1\">\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ครั้งที่สืบสวน : </label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\r\n                    <div class=\"form-group \">\r\n                        <input type=\"text\" formControlName=\"InvestigateSeq\" class=\"form-control form-control-sm\"\r\n                            [readOnly]=\"showEditField\">\r\n                    </div>\r\n                </div>\r\n\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">วันที่เริ่มสืบสวน :</label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\r\n                    <div class=\"form-group input-group\">\r\n                        <my-date-picker-th class=\"form-control form-control-sm unset-form-control\" formControlName=\"InvestigateDateStart\"\r\n                            [disabled]=\"showEditField\" [options]=\"myDatePickerOptions\" (dateChanged)=\"onSDateChange($event)\"\r\n                            ngModel></my-date-picker-th>\r\n\r\n                        <label for=\"DateEnd\">&nbsp;ถึง&nbsp;</label>\r\n\r\n                        <my-date-picker-th class=\"form-control form-control-sm unset-form-control\" id=\"DateEnd\"\r\n                            [disabled]=\"showEditField\" formControlName=\"InvestigateDateEnd\" [options]=\"myDatePickerOptions\"\r\n                            (dateChanged)=\"onEDateChange($event)\"></my-date-picker-th>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">มาตราความเชื่อมั่น :\r\n                </label>\r\n                <div class=\"col-lg-10 col-sm-8\">\r\n                    <div class=\"form-group \">\r\n                        <select formControlName=\"ValueOfNews\" class=\"form-control form-control-sm\" [ngClass]=\"{'ng-touched':isRequired}\"\r\n                            required [attr.disabled]=\"showEditField ? '' : null\">\r\n                            <option value=\"\" selected disabled></option>\r\n                            <option *ngFor=\"let item of valueofNews; let i=index;\" [value]=\"item.value\" [disabled]=\"showEditField\">{{item.text}}</option>\r\n                        </select>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ค่าของเนื้อข่าว :\r\n                </label>\r\n                <div class=\"col-lg-10 col-sm-8\">\r\n                    <div class=\"form-group \">\r\n                        <select formControlName=\"ConfidenceOfNews\" class=\"form-control form-control-sm\" [ngClass]=\"{'ng-touched':isRequired}\"\r\n                            required [attr.disabled]=\"showEditField ? '' : null\">\r\n                            <option value=\"\" selected disabled></option>\r\n                            <option *ngFor=\"let item of costofNews; let i=index;\" [value]=\"item.value\" [disabled]=\"showEditField\">{{item.text}}</option>\r\n                        </select>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header unset-radius\">\r\n            <div class=\"card-actions\">\r\n                <a class=\"\" (click)=\"card2 = !card2\">\r\n                    <i class=\"fa\" [ngClass]=\"{'fa-chevron-down': card2, 'fa-chevron-up': !card2}\"></i>\r\n                </a>\r\n            </div>\r\n            <h4 class=\"card-title m-b-0\">ผู้ร่วมทำการสืบสวน</h4>\r\n        </div>\r\n        <div class=\"card-body\" *ngIf=\"card2\">\r\n            <div class=\"row form-group\">\r\n                <div class=\"col-lg-10 col-md-9 col-sm-8\"></div>\r\n                <div class=\"col-lg-2 col-md-3 col-sm-4\">\r\n                    <button type=\"button\" class=\"btn btn-block btn-themecolor\" [disabled]=\"showEditField\" (click)=\"addStaff()\">เพิ่มผู้ร่วมจับกุม</button>\r\n                </div>\r\n            </div>\r\n            <div class=\"table-responsive\">\r\n                <table class=\"table table-sm table-striped table-set-border\">\r\n                    <thead>\r\n                        <tr>\r\n                            <th class=\"text-center\">ลำดับ</th>\r\n                            <th>ชื่อผู้สืบสวน</th>\r\n                            <th>ตำแหน่ง</th>\r\n                            <th>หน่วยงาน</th>\r\n                            <th>ฐานะ</th>\r\n                            <th></th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody formArrayName=\"InvestigateDetailStaff\">\r\n                        <tr *ngFor=\"let item of InvestigateDetailStaff.controls; let i = index;\" [formGroupName]=\"i\">\r\n                            <td *ngIf=\"item.get('IsModify').value != 'd'\" class=\"text-center\">\r\n                                {{item.get('RowId').value}}\r\n                            </td>\r\n                            <td *ngIf=\"item.get('IsModify').value != 'd'\">\r\n                                <ng-template #rt let-r=\"result\" let-t=\"term\">\r\n                                    {{ r.TitleName == null ? '' : r.TitleName }}\r\n                                    {{r.FirstName == null ? '' : r.FirstName}}\r\n                                    {{r.LastName == null ? '' : r.LastName}}\r\n                                </ng-template>\r\n\r\n                                <input type=\"text\" class=\"form-control form-control-sm\" [ngbTypeahead]=\"searchStaff\"\r\n                                    [resultTemplate]=\"rt\" [readonly]=\"showEditField\" [inputFormatter]=\"formatterStaff\" (selectItem)=\"selectItemStaff($event, i)\"\r\n                                    value=\"{{item.value.FullName}}\" />\r\n                            </td>\r\n                            <td *ngIf=\"item.get('IsModify').value != 'd'\">\r\n                                <input type=\"text\" formControlName=\"PositionName\" class=\"form-control form-control-sm\"\r\n                                    readonly>\r\n                            </td>\r\n                            <td *ngIf=\"item.get('IsModify').value != 'd'\">\r\n                                <input type=\"text\" formControlName=\"OfficeName\" style=\"display: none;\" readonly>\r\n                                <input type=\"text\" formControlName=\"OfficeShortName\" class=\"form-control form-control-sm\"\r\n                                    readonly>\r\n                            </td>\r\n                            <td *ngIf=\"item.get('IsModify').value != 'd'\">\r\n                                <select formControlName=\"ContributorID\" class=\"form-control form-control-sm\"\r\n                                    [attr.disabled]=\"showEditField ? '' : null\">\r\n                                    <option value=\"\" disabled selected></option>\r\n                                    <option *ngFor=\"let c of contributorInvestType;\" [value]=\"c.value\">{{c.text}}</option>\r\n                                </select>\r\n                            </td>\r\n                            <td *ngIf=\"item.get('IsModify').value != 'd'\">\r\n                                <a class=\"text-warning\" href=\"javaScript:void(0);\" *ngIf=\"!showEditField\" (click)=\"deleteStaff(i)\">\r\n                                    <i class=\"fa fa-trash-o fa-lg\"></i>\r\n                                </a>\r\n                            </td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header  unset-radius\">\r\n            <div class=\"card-actions\">\r\n                <a class=\"\" (click)=\"card3 = !card3\">\r\n                    <i class=\"fa\" [ngClass]=\"{'fa-chevron-down': card3, 'fa-chevron-up': !card3}\"></i>\r\n                </a>\r\n            </div>\r\n            <h4 class=\"card-title m-b-0\">ผู้ต้องสงสัย</h4>\r\n        </div>\r\n        <div class=\"card-body\" *ngIf=\"card3\">\r\n            <div class=\"row form-group\">\r\n                <div class=\"col-lg-10 col-md-9 col-sm-8\"></div>\r\n                <div class=\"col-lg-2 col-md-3 col-sm-4\">\r\n                    <button type=\"button\" class=\"btn btn-block btn-themecolor\" (click)=\"openModal(suspect)\" [disabled]=\"showEditField\">เพิ่มผู้ต้องสงสัย</button>\r\n                </div>\r\n\r\n                <ng-template #suspect let-c=\"close\" let-d=\"dismiss\">\r\n                    <app-suspect-modal (c)=\"modal.close()\" (d)=\"modal.dismiss()\" (OutputSuspect)=\"addSuspect($event)\"></app-suspect-modal>\r\n                </ng-template>\r\n            </div>\r\n\r\n            <table class=\"table table-sm table-striped table-set-border\">\r\n                <thead>\r\n                    <tr>\r\n                        <th class=\"text-center\">ลำดับ</th>\r\n                        <th>ประเภทผู้ต้องสงสัย</th>\r\n                        <th>ประเภทบุคคล</th>\r\n                        <th>หมายเลขอ้างอิง</th>\r\n                        <th>ชื่อ</th>\r\n                        <th class=\"text-center\"></th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody formArrayName=\"InvestigateDetailSuspect\">\r\n                    <tr *ngFor=\"let item of InvestigateDetailSuspect.controls; let i = index;\" [formGroupName]=\"i\">\r\n                        <td *ngIf=\"item.get('IsModify').value != 'd'\" class=\"text-center\">{{item.get('RowId').value}}</td>\r\n                        <td *ngIf=\"item.get('IsModify').value != 'd'\">{{item.get('SuspectTypeName').value}}</td>\r\n                        <td *ngIf=\"item.get('IsModify').value != 'd'\">{{item.get('EntityTypeName').value}}</td>\r\n                        <td *ngIf=\"item.get('IsModify').value != 'd'\">{{item.get('ReferenceID').value}}</td>\r\n                        <td *ngIf=\"item.get('IsModify').value != 'd'\">{{item.get('FullName').value}}</td>\r\n                        <td *ngIf=\"item.get('IsModify').value != 'd'\" colspan=\"2\" class=\"text-center\">\r\n                            <a href=\"javaScript:void(0)\" class=\"text-warning\" *ngIf=\"!showEditField\" (click)=\"deleteSuspect(i)\">\r\n                                <i class=\"fa fa-trash-o fa-lg\"></i>\r\n                            </a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header  unset-radius\">\r\n            <div class=\"card-actions\">\r\n                <a class=\"\" (click)=\"card4 = !card4\">\r\n                    <i class=\"fa\" [ngClass]=\"{'fa-chevron-down': card4, 'fa-chevron-up': !card4}\"></i>\r\n                </a>\r\n            </div>\r\n            <h4 class=\"card-title m-b-0\">สถานที่ทำการสืบสวน</h4>\r\n        </div>\r\n        <div class=\"card-body\" *ngIf=\"card4\">\r\n            <div class=\"row form-group\">\r\n                <div class=\"col-lg-10 col-md-9 col-sm-8\"></div>\r\n                <div class=\"col-lg-2 col-md-3 col-sm-4\">\r\n                    <button type=\"button\" class=\"btn btn-block btn-themecolor\" (click)=\"addLocal()\" [disabled]=\"showEditField\">เพิ่มสถานที่</button>\r\n                </div>\r\n            </div>\r\n\r\n            <table class=\"table table-sm table-striped table-set-border\">\r\n                <thead>\r\n                    <tr>\r\n                        <th class=\"text-center\">ลำดับ</th>\r\n                        <th style=\"width: 100px\">เลขที่</th>\r\n                        <th style=\"width: 60px\">หมู่ที่</th>\r\n                        <th>อาคาร</th>\r\n                        <th style=\"width: 100px\">ห้อง</th>\r\n                        <!-- <th style=\"width: 60px\">ชั้น</th> -->\r\n                        <th>ตรอก/ซอย</th>\r\n                        <th>ถนน</th>\r\n                        <th style=\"width: 300px\">ตำบล/อำเภอ/จังหวัด</th>\r\n                        <th></th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody formArrayName=\"InvestigateDetailLocal\">\r\n                    <tr *ngFor=\"let item of InvestigateDetailLocal.controls; let i = index;\" [formGroupName]=\"i\">\r\n                        <td *ngIf=\"item.get('IsModify').value != 'd'\" class=\"text-center\">{{item.get('RowId').value}}</td>\r\n                        <td *ngIf=\"item.get('IsModify').value != 'd'\">\r\n                            <input type=\"text\" formControlName=\"Address\" class=\"form-control form-control-sm\"\r\n                                [readonly]=\"showEditField\">\r\n                        </td>\r\n                        <td *ngIf=\"item.get('IsModify').value != 'd'\">\r\n                            <input type=\"text\" formControlName=\"Village\" class=\"form-control form-control-sm\"\r\n                                [readonly]=\"showEditField\">\r\n                        </td>\r\n                        <td *ngIf=\"item.get('IsModify').value != 'd'\">\r\n                            <input type=\"text\" formControlName=\"Building\" class=\"form-control form-control-sm\"\r\n                                [readonly]=\"showEditField\">\r\n                        </td>\r\n                        <td *ngIf=\"item.get('IsModify').value != 'd'\">\r\n                            <input type=\"text\" formControlName=\"Room\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                        </td>\r\n                        <!-- <td *ngIf=\"item.get('IsModify').value != 'd'\">\r\n                            <input type=\"text\" formControlName=\"Floor\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                        </td> -->\r\n                        <td *ngIf=\"item.get('IsModify').value != 'd'\">\r\n                            <input type=\"text\" formControlName=\"Alley\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                        </td>\r\n                        <td *ngIf=\"item.get('IsModify').value != 'd'\">\r\n                            <input type=\"text\" formControlName=\"Road\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                        </td>\r\n                        <td *ngIf=\"item.get('IsModify').value != 'd'\">\r\n                            <ng-template #rt let-r=\"result\" let-t=\"term\">\r\n                                {{ r.SubdistrictNameTH }} {{r.DistrictNameTH}} {{r.ProvinceNameTH}}\r\n                            </ng-template>\r\n\r\n                            <input type=\"text\" class=\"form-control form-control-sm\" [ngbTypeahead]=\"searchRegion\"\r\n                                [resultTemplate]=\"rt\" [readOnly]=\"showEditField\" [inputFormatter]=\"formatterRegion\"\r\n                                (selectItem)=\"selectItemLocaleRegion($event, i)\" value=\"{{item.value.Region}}\" />\r\n                        </td>\r\n                        <td *ngIf=\"item.get('IsModify').value != 'd'\" class=\"text-center\">\r\n                            <a href=\"javaScript:void(0)\" class=\"text-warning\" *ngIf=\"!showEditField\" (click)=\"deleteLocal(i)\">\r\n                                <i class=\"fa fa-trash-o fa-lg\"></i>\r\n                            </a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header  unset-radius\">\r\n            <div class=\"card-actions\">\r\n                <a class=\"\" (click)=\"card5 = !card5\">\r\n                    <i class=\"fa\" [ngClass]=\"{'fa-chevron-down': card5, 'fa-chevron-up': !card5}\"></i>\r\n                </a>\r\n            </div>\r\n            <h4 class=\"card-title m-b-0\">สินค้าต้องสงสัย</h4>\r\n        </div>\r\n        <div class=\"card-body\" *ngIf=\"card5\">\r\n            <div class=\"row form-group\">\r\n                <div class=\"col-lg-10 col-md-9 col-sm-8\"></div>\r\n                <div class=\"col-lg-2 col-md-3 col-sm-4\">\r\n                    <button type=\"button\" class=\"btn btn-block btn-themecolor\" (click)=\"addProduct()\" [disabled]=\"showEditField\">เพิ่มสินค้า</button>\r\n                </div>\r\n            </div>\r\n\r\n            <table class=\"table table-sm table-striped table-set-border\">\r\n                <thead>\r\n                    <tr>\r\n                        <th class=\"text-center\">ลำดับ</th>\r\n                        <th>สินค้า</th>\r\n                        <th>จำนวน</th>\r\n                        <th>หน่วย</th>\r\n                        <th></th>\r\n                    </tr>\r\n                </thead>\r\n\r\n                <tbody formArrayName=\"InvestigateDetailProduct\">\r\n                    <tr *ngFor=\"let item of InvestigateDetailProduct.controls; let i = index;\" [formGroupName]=\"i\">\r\n                        <td *ngIf=\"item.get('IsModify').value != 'd'\" class=\"text-center\">{{item.get('RowId').value}}</td>\r\n                        <td *ngIf=\"item.get('IsModify').value != 'd'\" style=\"width: 700px;\">\r\n                            <ng-template #rt let-r=\"result\" let-t=\"term\">\r\n                                {{ r.ProductDesc }}\r\n                            </ng-template>\r\n                            <input type=\"text\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\"\r\n                                [ngbTypeahead]=\"searchProduct\" [resultTemplate]=\"rt\" [inputFormatter]=\"formatterProduct\"\r\n                                (selectItem)=\"selectItemProductItem($event, i)\" [value]=\"item.value.ProductDesc\"\r\n                                (change)=\"onChangeProductDesc($event, i)\" />\r\n                            <input style=\"display: none\" type=\"text\" formControlName=\"ProductDesc\">\r\n                        </td>\r\n                        <td *ngIf=\"item.get('IsModify').value != 'd'\">\r\n                            <input type=\"number\" formControlName=\"Qty\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                        </td>\r\n                        <td *ngIf=\"item.get('IsModify').value != 'd'\">\r\n                            <ng-template #qtyUnit let-r=\"result\" let-t=\"term\">\r\n                                {{ r.DutyCode }}\r\n                            </ng-template>\r\n                            <input type=\"text\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\"\r\n                                [ngbTypeahead]=\"searchUnit\" [resultTemplate]=\"qtyUnit\" [inputFormatter]=\"formatterUnit\"\r\n                                (selectItem)=\"selectItemQtyUnit($event, i)\" [value]=\"item.value.QtyUnit\" />\r\n                        </td>\r\n                        <td *ngIf=\"item.get('IsModify').value != 'd'\" class=\"text-center\">\r\n                            <a href=\"javaScript:void(0)\" class=\"text-warning\" *ngIf=\"!showEditField\" (click)=\"deleteProduct(i)\">\r\n                                <i class=\"fa fa-trash-o fa-lg\"></i>\r\n                            </a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header  unset-radius\">\r\n            <div class=\"card-actions\">\r\n                <a class=\"\" (click)=\"card6 = !card6\">\r\n                    <i class=\"fa\" [ngClass]=\"{'fa-chevron-down': card6, 'fa-chevron-up': !card6}\"></i>\r\n                </a>\r\n            </div>\r\n            <h4 class=\"card-title m-b-0\">รายละเอียดที่เกิดเหตุในการสืบสวน</h4>\r\n        </div>\r\n        <div class=\"card-body\" *ngIf=\"card6\">\r\n\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">รายละเอียด :\r\n                </label>\r\n                <div class=\"col-lg-10 col-sm-8\">\r\n                    <div class=\"form-group \">\r\n                        <textarea formControlName=\"InvestigateDetail\" cols=\"30\" rows=\"5\" class=\"form-control form-control-sm\"\r\n                            [readOnly]=\"showEditField\" required></textarea>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header  unset-radius\">\r\n            <div class=\"card-actions\">\r\n                <a class=\"\" (click)=\"card7 = !card7\">\r\n                    <i class=\"fa\" [ngClass]=\"{'fa-chevron-down': card7, 'fa-chevron-up': !card7}\"></i>\r\n                </a>\r\n            </div>\r\n            <h4 class=\"card-title m-b-0\">เอกสารแนบภายใน</h4>\r\n        </div>\r\n        <div class=\"card-body\" *ngIf=\"card7\">\r\n\r\n            <div class=\"row form-group\">\r\n                <div class=\"col-lg-10 col-md-9 col-sm-8\"></div>\r\n                <div class=\"col-lg-2 col-md-3 col-sm-4\">\r\n                    <button type=\"button\" class=\"btn btn-block btn-themecolor\" (click)=\"addDocument()\" [disabled]=\"showEditField\">เพิ่มเอกสาร</button>\r\n                </div>\r\n            </div>\r\n\r\n            <table class=\"table table-sm table-striped table-set-border\">\r\n                <thead>\r\n                    <tr>\r\n                        <th class=\"text-center\">ลำดับ</th>\r\n                        <th>ชื่อเอกสารแนบ</th>\r\n                        <th>ที่อยู่เอกสารแนบ</th>\r\n                        <th></th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody formArrayName=\"InvestigateDocument\">\r\n                    <tr *ngFor=\"let item of InvestigateDocument.controls; let i=index;\" [formGroupName]=\"i\">\r\n                        <td *ngIf=\"item.get('IsModify').value != 'd'\" class=\"text-center\">{{item.get('RowId').value}}</td>\r\n                        <td *ngIf=\"item.get('IsModify').value != 'd'\">\r\n                            <input type=\"text\" formControlName=\"DataSource\" class=\"form-control form-control-sm\"\r\n                                [readonly]=\"showEditField\">\r\n                        </td>\r\n                        <td *ngIf=\"item.get('IsModify').value != 'd'\">\r\n                            <div class=\"input-group\">\r\n                                <input type=\"text\" class=\"form-control form-control-sm\" formControlName=\"FilePath\"\r\n                                    style=\"border-right: 0;\" [readonly]=\"showEditField\">\r\n                                <div class=\"input-group-append\">\r\n                                    <input [id]=\"'arrestAttach'+i\" type=\"file\" (change)=\"changeArrestDoc($event, i)\"\r\n                                        hidden [attr.disabled]=\"showEditField ? '' : null\">\r\n                                    <label [for]=\"'arrestAttach'+i\" class=\"input-group-text custom-file-upload text-secondary\">\r\n                                        <i class=\"ti-more-alt\"></i>\r\n                                    </label>\r\n                                </div>\r\n                            </div>\r\n                        </td>\r\n                        <td *ngIf=\"item.get('IsModify').value != 'd'\">\r\n                            <a href=\"javaScript:void(0)\" class=\"text-warning\" *ngIf=\"!showEditField\" (click)=\"deleteDocument(i)\">\r\n                                <i class=\"fa fa-trash-o fa-lg\"></i>\r\n                            </a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n\r\n        </div>\r\n    </div>\r\n</form>"

/***/ }),

/***/ "./src/app/pages/investigation/components/detail-manage/detail-manage.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailManageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_debounceTime__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/debounceTime.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/distinctUntilChanged.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_shared_header_navigation_navigation_service__ = __webpack_require__("./src/app/shared/header-navigation/navigation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_observable_combineLatest__ = __webpack_require__("./node_modules/rxjs/_esm5/observable/combineLatest.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_app_config_dateFormat__ = __webpack_require__("./src/app/config/dateFormat.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_app_config_message__ = __webpack_require__("./src/app/config/message.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_app_models__ = __webpack_require__("./src/app/models/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__models__ = __webpack_require__("./src/app/pages/investigation/models/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services__ = __webpack_require__("./src/app/pages/investigation/services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_app_core_loader_loader_service__ = __webpack_require__("./src/app/core/loader/loader.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_app_services_main_master_service__ = __webpack_require__("./src/app/services/main-master.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_app_config_dataString__ = __webpack_require__("./src/app/config/dataString.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ngrx_store__ = __webpack_require__("./node_modules/@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__store__ = __webpack_require__("./src/app/pages/investigation/store/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_app_services_transaction_running_service__ = __webpack_require__("./src/app/services/transaction-running.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_app_services_mas_document_main_service__ = __webpack_require__("./src/app/services/mas-document-main.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_app_shared_sidebar_sidebar_component__ = __webpack_require__("./src/app/shared/sidebar/sidebar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__suspect_modal_suspect_modal_component__ = __webpack_require__("./src/app/pages/investigation/components/suspect-modal/suspect-modal.component.ts");
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
    function DetailManageComponent(fb, activeRoute, ngbModel, navService, mainMasterService, loaderService, s_transactionRunning, s_invest, s_investDetail, s_document, router, sidebarService, store) {
        var _this = this;
        this.fb = fb;
        this.activeRoute = activeRoute;
        this.ngbModel = ngbModel;
        this.navService = navService;
        this.mainMasterService = mainMasterService;
        this.loaderService = loaderService;
        this.s_transactionRunning = s_transactionRunning;
        this.s_invest = s_invest;
        this.s_investDetail = s_investDetail;
        this.s_document = s_document;
        this.router = router;
        this.sidebarService = sidebarService;
        this.store = store;
        this.destroy$ = new __WEBPACK_IMPORTED_MODULE_9_rxjs_Subject__["b" /* Subject */]();
        this.card1 = true;
        this.card2 = true;
        this.card3 = true;
        this.card4 = true;
        this.card5 = true;
        this.card6 = true;
        this.card7 = true;
        this.myDatePickerOptions = __WEBPACK_IMPORTED_MODULE_10_app_config_dateFormat__["a" /* MyDatePickerOptions */];
        this.lawbreakerType = __WEBPACK_IMPORTED_MODULE_12_app_models__["g" /* LawbreakerTypes */];
        this.entityType = __WEBPACK_IMPORTED_MODULE_12_app_models__["e" /* EntityTypes */];
        this.contributorInvestType = __WEBPACK_IMPORTED_MODULE_12_app_models__["b" /* ContributorInvestType */];
        this.valueofNews = __WEBPACK_IMPORTED_MODULE_12_app_models__["k" /* ValueofNews */];
        this.costofNews = __WEBPACK_IMPORTED_MODULE_12_app_models__["d" /* CostofNews */];
        this.runningTable = 'ops_investigate';
        this.runningOfficeCode = '900012';
        this.runningPrefix = 'AI';
        this.officeName = '900012';
        this.documentType = '3';
        this.typeheadOffice = new Array();
        this.typeheadStaff = new Array();
        this.typeheadRegion = new Array();
        this.typeheadProduct = new Array();
        this.typeheadQtyUnit = new Array();
        this.typeheadNetVolumeUnit = new Array();
        this.endLoader = function () { return _this.loaderService.hide(); };
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
        this.formatterStaff = function (x) {
            return x.TitleName + " " + x.FirstName + " " + x.LastName;
        };
        this.formatterRegion = function (x) {
            return (x.SubdistrictNameTH || '') + " " + (x.DistrictNameTH || '') + " " + (x.ProvinceNameTH || '');
        };
        this.formatterProduct = function (x) { return x.ProductDesc; };
        this.formatterOffice = function (x) { return x.OfficeName; };
        this.formatterUnit = function (DutyCode) { return DutyCode; };
        this.clearFormArray = function (formArray) {
            while (formArray.length !== 0) {
                formArray.removeAt(0);
            }
        };
        this.navigateToManage = function () { return _this.router.navigate(["/investigation/manage", _this.investMode, _this.investCode]); };
        this.onRefreshPage = function () { return _this.router.navigate(["/investigation/detail-manage", 'R'], {
            queryParams: {
                investMode: _this.investMode,
                investCode: _this.investCode,
                invesDetailId: _this.invesDetailId
            }
        }); };
        this.obInvest = store.select(function (s) { return s.invest; });
        this.obInvest
            .takeUntil(this.destroy$)
            .subscribe(function (x) { return _this.stateInvest = x; });
        this.navService.setInnerTextNextPageButton('กลับ');
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
    Object.defineProperty(DetailManageComponent.prototype, "InvestigateDocument", {
        get: function () {
            return this.investigateFG.get('InvestigateDocument');
        },
        enumerable: true,
        configurable: true
    });
    DetailManageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sidebarService.setVersion(this.s_invest.version);
        this.createForm();
        Object(__WEBPACK_IMPORTED_MODULE_8_rxjs_observable_combineLatest__["a" /* combineLatest */])(this.activeRoute.params, this.activeRoute.queryParams)
            .map(function (results) { return ({ params: results[0], queryParams: results[1] }); })
            .takeUntil(this.destroy$)
            .subscribe(function (p) {
            _this.mode = p.params.mode;
            _this.investMode = p.queryParams.investMode;
            _this.investCode = p.queryParams.investCode;
            _this.invesDetailId = p.queryParams.invesDetailId;
            switch (_this.mode) {
                case 'C':
                    _this.showEditField = true;
                    _this.enableBtnModeC();
                    _this.loadMasterData();
                    break;
                case 'R':
                    _this.enableBtnModeR();
                    _this.onPageLoad();
                    break;
            }
        });
        this.resetConfig();
        this.navService.showFieldEdit
            .takeUntil(this.destroy$)
            .subscribe(function (status) {
            _this.showEditField = status.valueOf();
        });
        this.navService.onEdit
            .takeUntil(this.destroy$)
            .subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
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
        this.navService.onCancel
            .takeUntil(this.destroy$)
            .subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!status) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.navService.setOnCancel(false)];
                    case 1:
                        _a.sent();
                        if (confirm(__WEBPACK_IMPORTED_MODULE_11_app_config_message__["a" /* Message */].confirmAction)) {
                            this.onCancel();
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
        this.navService.onSave
            .takeUntil(this.destroy$)
            .subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
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
        this.navService.onDelete
            .takeUntil(this.destroy$)
            .subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
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
        this.navService.onPrint
            .takeUntil(this.destroy$)
            .subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
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
                        this.navigateToManage();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    };
    DetailManageComponent.prototype.resetConfig = function () {
        var _this = this;
        var routerConfig = this.router['config'];
        routerConfig
            .find(function (x) { return x.path == 'investigation'; })['_loadedConfig'].routes // core investigation path
            .filter(function (x) { return x.path.indexOf('detail-manage') >= 0; }) // curent path
            .map(function (x) {
            x.data.urls
                .find(function (y) { return y.url.indexOf('/investigation/manage') >= 0; })
                .url = "/investigation/manage/R/" + _this.investCode; // previous path
            return x;
        });
        this.router.resetConfig(routerConfig);
    };
    DetailManageComponent.prototype.enableBtnModeC = function () {
        // set false
        this.navService.setPrintButton(false);
        this.navService.setEditButton(false);
        this.navService.setDeleteButton(false);
        this.navService.setEditField(false);
        this.navService.setPrevPageButton(false);
        this.navService.setNextPageButton(false);
        // set true 
        this.navService.setSaveButton(true);
        this.navService.setCancelButton(true);
    };
    DetailManageComponent.prototype.enableBtnModeR = function () {
        // set false
        this.navService.setSaveButton(false);
        this.navService.setCancelButton(false);
        this.navService.setPrevPageButton(false);
        // set true
        this.navService.setPrintButton(true);
        this.navService.setEditButton(true);
        this.navService.setDeleteButton(true);
        this.navService.setEditField(true);
        this.navService.setNextPageButton(true);
    };
    DetailManageComponent.prototype.loadMasterData = function () {
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
    DetailManageComponent.prototype.onPageLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var invest;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loaderService.show();
                        return [4 /*yield*/, this.s_investDetail.InvestigateDetailgetByCon(this.invesDetailId).then(function (x) { return __awaiter(_this, void 0, void 0, function () {
                                var invest;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!this.checkResponse(x))
                                                return [2 /*return*/];
                                            invest = this.investigateFG;
                                            x.InvestigateDateStart = Object(__WEBPACK_IMPORTED_MODULE_10_app_config_dateFormat__["e" /* setDateMyDatepicker */])(x.InvestigateDateStart);
                                            x.InvestigateDateEnd = Object(__WEBPACK_IMPORTED_MODULE_10_app_config_dateFormat__["e" /* setDateMyDatepicker */])(x.InvestigateDateEnd);
                                            return [4 /*yield*/, this.pageRefreshStaff(x.InvestigateDetailStaff)];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, this.pageRefreshSuspect(x.InvestigateDetailSuspect)];
                                        case 2:
                                            _a.sent();
                                            return [4 /*yield*/, this.pageRefreshLocal(x.InvestigateDetailLocal)];
                                        case 3:
                                            _a.sent();
                                            return [4 /*yield*/, this.pageRefreshProduct(x.InvestigateDetailProduct)];
                                        case 4:
                                            _a.sent();
                                            return [4 /*yield*/, this.pageRefreshDocument(this.invesDetailId)];
                                        case 5:
                                            _a.sent();
                                            invest.patchValue(x);
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        invest = _a.sent();
                        Promise.all([invest]);
                        this.loaderService.hide();
                        return [2 /*return*/];
                }
            });
        });
    };
    DetailManageComponent.prototype.pageRefreshStaff = function (staff) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, staff.map(function (y, index) {
                            y.RowId = index + 1;
                            y.IsModify = 'r';
                            y.FullName = y.TitleName + " " + y.FirstName + " " + y.LastName;
                        })];
                    case 1:
                        _a.sent();
                        this.setItemFormArray(staff, 'InvestigateDetailStaff');
                        return [2 /*return*/];
                }
            });
        });
    };
    DetailManageComponent.prototype.pageRefreshSuspect = function (suspect) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, suspect.map(function (y, index) {
                            y = Object(__WEBPACK_IMPORTED_MODULE_23__suspect_modal_suspect_modal_component__["b" /* setViewSuspect */])(y);
                            y.RowId = index + 1;
                            y.IsModify = 'r';
                            y.FullName = y.SuspectTitleName + " " + y.SuspectFirstName + " " + y.SuspectLastName;
                            return y;
                        })];
                    case 1:
                        _a.sent();
                        this.setItemFormArray(suspect, 'InvestigateDetailSuspect');
                        return [2 /*return*/];
                }
            });
        });
    };
    DetailManageComponent.prototype.pageRefreshLocal = function (local) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, local.map(function (y, index) {
                            y.RowId = index + 1;
                            y.IsModify = 'r';
                            y.Floor = y.Floor || null;
                            if (y.SubDistrictCode && y.DistrictCode && y.ProvinceCode) {
                                y.Region = y.SubDistrict + " " + y.District + " " + y.Province;
                            }
                        })];
                    case 1:
                        _a.sent();
                        this.setItemFormArray(local, 'InvestigateDetailLocal');
                        return [2 /*return*/];
                }
            });
        });
    };
    DetailManageComponent.prototype.pageRefreshProduct = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, product.map(function (y, index) {
                            y.RowId = index + 1;
                            y.IsModify = 'r';
                        })];
                    case 1:
                        _a.sent();
                        this.setItemFormArray(product, 'InvestigateDetailProduct');
                        return [2 /*return*/];
                }
            });
        });
    };
    DetailManageComponent.prototype.pageRefreshDocument = function (investDetailId) {
        return __awaiter(this, void 0, void 0, function () {
            var _doc;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _doc = new Array();
                        return [4 /*yield*/, this.s_document.MasDocumentMaingetAll(this.documentType, investDetailId)
                                .then(function (x) {
                                if (!_this.checkResponse(x))
                                    return;
                                _doc = x.map(function (y) {
                                    y.IsModify = 'r';
                                    return y;
                                });
                            }).catch(function (error) { return _this.catchError(error); })];
                    case 1:
                        _a.sent();
                        if (!_doc.length)
                            return [2 /*return*/];
                        _doc.map(function (y, index) { return y.RowId = index + 1; });
                        this.setItemFormArray(_doc, 'InvestigateDocument');
                        return [2 /*return*/];
                }
            });
        });
    };
    DetailManageComponent.prototype.onSDateChange = function (event) {
        this._dateStartFrom = event;
        this._dateStartTo = this._dateStartTo || this.investigateFG.value.DateEnd;
        this.checkDate();
    };
    DetailManageComponent.prototype.onEDateChange = function (event) {
        this._dateStartFrom = this._dateStartFrom || this.investigateFG.value.DateStart;
        this._dateStartTo = event;
        this.checkDate();
    };
    DetailManageComponent.prototype.checkDate = function () {
        var _this = this;
        if (this._dateStartFrom && this._dateStartTo) {
            var sdate = Object(__WEBPACK_IMPORTED_MODULE_10_app_config_dateFormat__["d" /* getDateMyDatepicker */])(this._dateStartFrom);
            var edate = Object(__WEBPACK_IMPORTED_MODULE_10_app_config_dateFormat__["d" /* getDateMyDatepicker */])(this._dateStartTo);
            if (!Object(__WEBPACK_IMPORTED_MODULE_10_app_config_dateFormat__["b" /* compareDate */])(sdate, edate)) {
                alert(__WEBPACK_IMPORTED_MODULE_11_app_config_message__["a" /* Message */].checkDate);
                setTimeout(function () {
                    _this.investigateFG.patchValue({
                        InvestigateDateEnd: Object(__WEBPACK_IMPORTED_MODULE_10_app_config_dateFormat__["e" /* setDateMyDatepicker */])(_this._dateStartFrom)
                    });
                }, 0);
            }
        }
    };
    // isObject = (obj) => obj === Object(obj);
    DetailManageComponent.prototype.sortFormArray = function (arr) {
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
    DetailManageComponent.prototype.deleteFormArray = function (o, i, controls) {
        var _this = this;
        o.at(i).patchValue({ IsModify: 'd', RowId: 0 });
        var sort = this.sortFormArray(o.value);
        o.value.map(function () { return o.removeAt(0); });
        sort.then(function (x) { return _this.setItemFormArray(x, controls); })
            .catch(function (error) { return _this.catchError(error); });
        ;
    };
    DetailManageComponent.prototype.setItemFormArray = function (array, formControl) {
        var _this = this;
        if (array !== undefined && array.length) {
            var itemFGs = array.map(function (item) { return _this.fb.group(item); });
            var itemFormArray = this.fb.array(itemFGs);
            this.investigateFG.setControl(formControl, itemFormArray);
        }
    };
    DetailManageComponent.prototype.addStaff = function () {
        var lastIndex = this.InvestigateDetailStaff.length - 1;
        var item = new __WEBPACK_IMPORTED_MODULE_13__models__["c" /* InvestigateDetailStaff */]();
        item.StaffID = null;
        item.ProgramCode = null;
        item.ProcessCode = null;
        item.InvestigateDetailID = null;
        item.StaffCode = null;
        item.TitleName = null;
        item.FirstName = null;
        item.LastName = null;
        item.PositionCode = null;
        item.PositionName = null;
        item.PosLevel = null;
        item.PosLevelName = null;
        item.DepartmentCode = null;
        item.DepartmentName = null;
        item.DepartmentLevel = null;
        item.OfficeCode = null;
        item.OfficeName = null;
        item.OfficeShortName = null;
        item.ContributorID = null;
        item.IsActive = null;
        item.IsModify = 'c';
        if (lastIndex < 0) {
            item.RowId = 1;
            this.InvestigateDetailStaff.push(this.fb.group(item));
            return;
        }
        var lastDoc = this.InvestigateDetailStaff.at(lastIndex).value;
        if (lastDoc.ContributorID) {
            item.RowId = lastDoc.RowId + 1;
            this.InvestigateDetailStaff.push(this.fb.group(item));
        }
    };
    DetailManageComponent.prototype.addSuspect = function (suspect) {
        var _this = this;
        suspect.RowId = 1;
        suspect.IsModify = 'c';
        this.InvestigateDetailSuspect.push(this.fb.group(suspect));
        var sort = this.sortFormArray(this.InvestigateDetailSuspect.value);
        sort.then(function (x) { return _this.setItemFormArray(x, 'InvestigateDetailSuspect'); })
            .catch(function (error) { return _this.catchError(error); });
    };
    DetailManageComponent.prototype.addLocal = function () {
        var lastIndex = this.InvestigateDetailLocal.length - 1;
        var item = new __WEBPACK_IMPORTED_MODULE_13__models__["a" /* InvestigateDetailLocal */]();
        item.LocalID = null;
        item.InvestigateDetailID = null;
        item.GPS = null;
        item.Location = null;
        item.Address = null;
        item.Village = null;
        item.Building = null;
        item.Room = null;
        item.Alley = null;
        item.Road = null;
        item.Floor = null;
        item.SubDistrictCode = null;
        item.SubDistrict = null;
        item.DistrictCode = null;
        item.District = null;
        item.ProvinceCode = null;
        item.Province = null;
        item.ZipCode = null;
        item.IsActive = 1;
        item.Region = null;
        item.IsModify = 'c';
        if (lastIndex < 0) {
            item.RowId = 1;
            this.InvestigateDetailLocal.push(this.fb.group(item));
            return;
        }
        var lastDoc = this.InvestigateDetailLocal.at(lastIndex).value;
        if (lastDoc.Address) {
            item.RowId = lastDoc.RowId + 1;
            this.InvestigateDetailLocal.push(this.fb.group(item));
        }
    };
    DetailManageComponent.prototype.addProduct = function () {
        var lastIndex = this.InvestigateDetailProduct.length - 1;
        var item = new __WEBPACK_IMPORTED_MODULE_13__models__["b" /* InvestigateDetailProduct */]();
        item.ProductID = null;
        item.InvestigateDetailID = null;
        item.GroupCode = '1';
        item.GroupName = null;
        item.IsDomestic = null;
        item.ProductCode = null;
        item.BrandCode = null;
        item.BrandNameTH = null;
        item.BrandNameEN = null;
        item.SubBrandCode = null;
        item.SubBrandNameTH = null;
        item.SubBrandNameEN = null;
        item.ModelCode = null;
        item.ModelName = null;
        item.FixNo1 = null;
        item.DegreeCode = null;
        item.Degree = null;
        item.SizeCode = null;
        item.Size = null;
        item.SizeUnitCode = null;
        item.SizeUnitName = null;
        item.FixNo2 = null;
        item.SequenceNo = null;
        item.ProductDesc = null;
        item.CarNo = null;
        item.Qty = null;
        item.QtyUnit = null;
        item.NetVolume = null;
        item.NetVolumeUnit = null;
        item.IsActive = null;
        item.IsModify = 'c';
        item.GroupCode = '1';
        if (lastIndex < 0) {
            item.RowId = 1;
            this.InvestigateDetailProduct.push(this.fb.group(item));
            return;
        }
        var lastDoc = this.InvestigateDetailProduct.at(lastIndex).value;
        if (lastDoc.ProductDesc) {
            item.RowId = lastDoc.RowId + 1;
            this.InvestigateDetailProduct.push(this.fb.group(item));
        }
    };
    DetailManageComponent.prototype.addDocument = function () {
        var lastIndex = this.InvestigateDocument.length - 1;
        var item = new __WEBPACK_IMPORTED_MODULE_13__models__["d" /* InvestigateDocumentModel */]();
        item.DocumentType = this.documentType;
        item.DataSource = null;
        item.FilePath = null;
        item.IsModify = 'c';
        if (lastIndex < 0) {
            item.RowId = 1;
            this.InvestigateDocument.push(this.fb.group(item));
            return;
        }
        var lastItem = this.InvestigateDocument.at(lastIndex).value;
        if (lastItem.DataSource && lastItem.FilePath) {
            item.RowId = lastItem.RowId + 1;
            this.InvestigateDocument.push(this.fb.group(item));
        }
    };
    DetailManageComponent.prototype.changeArrestDoc = function (e, index) {
        this.InvestigateDocument.at(index).patchValue({
            FilePath: Object(__WEBPACK_IMPORTED_MODULE_17_app_config_dataString__["a" /* replaceFakePath */])(e.target.value),
            IsActive: 1
        });
    };
    DetailManageComponent.prototype.deleteStaff = function (i) {
        this.deleteFormArray(this.InvestigateDetailStaff, i, 'InvestigateDetailStaff');
    };
    DetailManageComponent.prototype.deleteSuspect = function (i) {
        this.deleteFormArray(this.InvestigateDetailSuspect, i, 'InvestigateDetailSuspect');
    };
    DetailManageComponent.prototype.deleteLocal = function (i) {
        this.deleteFormArray(this.InvestigateDetailLocal, i, 'InvestigateDetailLocal');
    };
    DetailManageComponent.prototype.deleteProduct = function (i) {
        this.deleteFormArray(this.InvestigateDetailProduct, i, 'InvestigateDetailProduct');
    };
    DetailManageComponent.prototype.deleteDocument = function (i) {
        this.deleteFormArray(this.InvestigateDocument, i, 'InvestigateDocument');
    };
    DetailManageComponent.prototype.createForm = function () {
        this.investigateFG = this.fb.group({
            InvestigateDetailID: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormControl */](null),
            InvestigateCode: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormControl */](null),
            InvestigateSeq: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["m" /* Validators */].required),
            StationCode: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormControl */](this.runningOfficeCode),
            StationName: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormControl */](this.officeName),
            InvestigateDateStart: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["m" /* Validators */].required),
            InvestigateDateEnd: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["m" /* Validators */].required),
            ConfidenceOfNews: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["m" /* Validators */].required),
            ValueOfNews: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["m" /* Validators */].required),
            InvestigateDetail: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["m" /* Validators */].required),
            IsActive: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormControl */](1, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["m" /* Validators */].required),
            InvestigateDetailStaff: this.fb.array([]),
            InvestigateDetailProduct: this.fb.array([]),
            InvestigateDetailLocal: this.fb.array([]),
            InvestigateDetailSuspect: this.fb.array([]),
            InvestigateDocument: this.fb.array([])
        });
    };
    DetailManageComponent.prototype.selectItemLocaleRegion = function (e, i) {
        this.InvestigateDetailLocal.at(i).patchValue({
            SubDistrictCode: e.item.SubdistrictCode,
            SubDistrict: e.item.SubdistrictNameTH,
            DistrictCode: e.item.DistrictCode,
            District: e.item.DistrictNameTH,
            ProvinceCode: e.item.ProvinceCode,
            Province: e.item.ProvinceNameTH
        });
    };
    DetailManageComponent.prototype.selectItemProductItem = function (e, i) {
        var product = this.InvestigateDetailProduct.at(i).value;
        this.InvestigateDetailProduct.at(i).reset(e.item);
        this.InvestigateDetailProduct.at(i).patchValue({
            ProductType: e.item.ProductID ? '1' : '2',
            ProductID: product.ProductID || e.item.ProductID,
            IsModify: product.IsModify == 'r' ? 'u' : product.IsModify,
            RowId: product.RowId,
            GroupCode: e.item.GroupCode || product.GroupCode,
            GroupName: e.item.GroupName || e.item.GroupCode || product.GroupCode,
            IsDomestic: e.item.IsDomestic || product.IsDomestic,
        });
    };
    DetailManageComponent.prototype.onChangeProductDesc = function (e, i) {
        this.InvestigateDetailProduct.at(i).patchValue({
            ProductDesc: e.target.value
        });
    };
    DetailManageComponent.prototype.selectItemStaff = function (e, i) {
        var staff = this.InvestigateDetailStaff.at(i).value;
        this.InvestigateDetailStaff.at(i).reset(e.item);
        this.InvestigateDetailStaff.at(i).patchValue({
            IsModify: staff.IsModify == 'r' ? 'u' : staff.IsModify,
            RowId: staff.RowId,
            FullName: e.item.TitleName + " " + e.item.FirstName + " " + e.item.LastName,
            ProgramCode: 2,
            ProcessCode: '02',
            PositionCode: e.item.OperationPosCode,
            PositionName: e.item.OperationPosName,
            DepartmentCode: e.item.OfficeCode,
            DepartmentName: e.item.OfficeName,
            DepartmentLevel: e.item.DeptLevel,
            ContributorID: e.item.ContributorID
        });
    };
    DetailManageComponent.prototype.onChangeContributer = function (e, i) {
        var contributerId = e.target.value;
        var staff = this.InvestigateDetailStaff.at(i).value;
        this.InvestigateDetailStaff.at(i).patchValue({
            ContributorCode: contributerId,
            IsModify: staff.IsModify == 'r' ? 'u' : staff.IsModify
        });
    };
    DetailManageComponent.prototype.selectItemOffice = function (e) {
        this.investigateFG.patchValue({
            ArrestStationCode: e.item.OfficeCode,
            ArrestStation: e.item.OfficeName
        });
    };
    DetailManageComponent.prototype.onChangeArrestStation = function (e) {
        this.investigateFG.patchValue({
            ArrestStation: e.target.value
        });
    };
    DetailManageComponent.prototype.selectItemQtyUnit = function (e, i) {
        this.InvestigateDetailProduct.at(i).patchValue({
            QtyUnit: e.item.DutyCode,
        });
    };
    DetailManageComponent.prototype.selectItemNetVolumeUnit = function (e, i) {
        this.InvestigateDetailProduct.at(i).patchValue({
            NetVolumeUnit: e.item.DutyCode,
        });
    };
    DetailManageComponent.prototype.clearForm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var reset, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.investigateFG.reset()];
                    case 1:
                        _a = [
                            _b.sent()
                        ];
                        return [4 /*yield*/, this.clearFormArray(this.InvestigateDetailStaff)];
                    case 2:
                        _a = _a.concat([
                            _b.sent()
                        ]);
                        return [4 /*yield*/, this.clearFormArray(this.InvestigateDetailSuspect)];
                    case 3:
                        _a = _a.concat([
                            _b.sent()
                        ]);
                        return [4 /*yield*/, this.clearFormArray(this.InvestigateDetailLocal)];
                    case 4:
                        _a = _a.concat([
                            _b.sent()
                        ]);
                        return [4 /*yield*/, this.clearFormArray(this.InvestigateDetailProduct)];
                    case 5:
                        _a = _a.concat([
                            _b.sent()
                        ]);
                        return [4 /*yield*/, this.clearFormArray(this.InvestigateDocument)];
                    case 6:
                        reset = _a.concat([
                            _b.sent()
                        ]);
                        Promise.all(reset);
                        return [2 /*return*/];
                }
            });
        });
    };
    DetailManageComponent.prototype.ngOnDestroy = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.destroy$.next(true);
                        this.destroy$.unsubscribe();
                        return [4 /*yield*/, this.clearForm()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DetailManageComponent.prototype.openModal = function (e) {
        this.modal = this.ngbModel.open(e, { size: 'lg', centered: true });
    };
    DetailManageComponent.prototype.saveFail = function () {
        this._isSuccess = false;
        return false;
    };
    DetailManageComponent.prototype.checkResponse = function (res) {
        switch (res.IsSuccess) {
            case 'False':
            case false:
                return false;
            default:
                return true;
        }
    };
    DetailManageComponent.prototype.checkIsSuccess = function (res) {
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
    DetailManageComponent.prototype.catchError = function (error) {
        console.log(error);
        this._isSuccess = false;
        this.endLoader();
    };
    DetailManageComponent.prototype.onComplete = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this._isSuccess) return [3 /*break*/, 6];
                        alert(__WEBPACK_IMPORTED_MODULE_11_app_config_message__["a" /* Message */].saveComplete);
                        _a = this.mode;
                        switch (_a) {
                            case 'C': return [3 /*break*/, 1];
                            case 'R': return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_19__store__["b" /* RemoveInvestigate */])];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.clearForm()];
                    case 3:
                        _b.sent();
                        this.onRefreshPage();
                        return [3 /*break*/, 5];
                    case 4:
                        location.reload();
                        return [3 /*break*/, 5];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        alert(__WEBPACK_IMPORTED_MODULE_11_app_config_message__["a" /* Message */].saveFail);
                        _b.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    DetailManageComponent.prototype.onEdit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadMasterData()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DetailManageComponent.prototype.onCancel = function () {
        switch (this.mode) {
            case 'C':
                this.navigateToManage();
                break;
            case 'R':
                this.onRefreshPage();
                break;
        }
    };
    DetailManageComponent.prototype.onDelete = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (confirm(__WEBPACK_IMPORTED_MODULE_11_app_config_message__["a" /* Message */].confirmAction)) {
                    this.s_investDetail.InvestigateDetailupdDelete(this.invesDetailId)
                        .takeUntil(this.destroy$)
                        .subscribe(function (x) {
                        if (_this.checkIsSuccess(x)) {
                            alert(__WEBPACK_IMPORTED_MODULE_11_app_config_message__["a" /* Message */].delComplete);
                            _this.navigateToManage();
                        }
                        else {
                            alert(__WEBPACK_IMPORTED_MODULE_11_app_config_message__["a" /* Message */].delFail);
                        }
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    DetailManageComponent.prototype.onSave = function () {
        return __awaiter(this, void 0, void 0, function () {
            var staff, local, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.investCode == 'NEW') {
                            if (!this.stateInvest) {
                                alert('กรุณาย้อนกลับไประบุ ข้อมูลรายงานการสืบสวน');
                                return [2 /*return*/];
                            }
                            if (!this.stateInvest.InvestigateNo || !this.stateInvest.DateStart || !this.stateInvest.DateEnd) {
                                alert('กรุณาย้อนกลับไประบุ ข้อมูลรายงานการสืบสวน');
                                return [2 /*return*/];
                            }
                        }
                        if (this.investigateFG.invalid) {
                            alert(__WEBPACK_IMPORTED_MODULE_11_app_config_message__["a" /* Message */].checkData);
                            return [2 /*return*/];
                        }
                        staff = this.InvestigateDetailStaff.value.filter(function (x) { return x.IsModify != 'd'; });
                        if (staff.length) {
                            if (staff.filter(function (x) { return x.ContributorID == '2'; }).length <= 0) {
                                alert('ส่วนผู้ร่วมทำการสืบสวน ต้องมีรายการที่ฐานะเป็น “ผู้ดูแลการสืบสวน” อย่างน้อย 1 รายการ');
                                return [2 /*return*/];
                            }
                            if (staff.filter(function (x) { return x.ContributorID == '2'; }).length > 1) {
                                alert('ส่วนผู้ร่วมทำการสืบสวน รายการที่ฐานะเป็น “ผู้ดูแลการสืบสวน” ต้องมีได้แค่ 1 รายการเท่านั้น');
                                return [2 /*return*/];
                            }
                            if (staff.filter(function (x) { return x.ContributorID == '3'; }).length > 1) {
                                alert('ส่วนผู้ร่วมทำการสืบสวน รายการที่ฐานะเป็น “ผู้สั่งการ” ต้องมีได้แค่ 1 รายการเท่านั้น');
                                return [2 /*return*/];
                            }
                        }
                        else {
                            alert('ส่วนผู้ร่วมทำการสืบสวน ต้องมีรายการที่ฐานะเป็น “ผู้ดูแลการสืบสวน” อย่างน้อย 1 รายการ');
                            return [2 /*return*/];
                        }
                        local = this.InvestigateDetailLocal.value.filter(function (x) { return x.IsModify != 'd'; });
                        if (local.length) {
                            if (local.filter(function (x) { return x.Region == ''; }).length > 1) {
                                alert('ส่วนสถานที่ทำการสืบสวน กรุณาระบุ “ตำบล/อำเภอ/จังหวัด”');
                            }
                        }
                        else {
                            alert('ส่วนสถานที่ทำการสืบสวน ต้องมีอย่างน้อย 1 รายการ');
                        }
                        _a = this.mode;
                        switch (_a) {
                            case 'C': return [3 /*break*/, 1];
                            case 'R': return [3 /*break*/, 6];
                        }
                        return [3 /*break*/, 8];
                    case 1:
                        if (!(this.investCode == 'NEW')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.createWithOutInvestCode()];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.createWithInvestCode()];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5: return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, this.onRevice()];
                    case 7:
                        _b.sent();
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    DetailManageComponent.prototype.createWithInvestCode = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loaderService.show();
                        return [4 /*yield*/, this.insertInvestigateDetail(this.investCode)];
                    case 1:
                        _a.sent();
                        this.onComplete();
                        this.loaderService.hide();
                        return [2 /*return*/];
                }
            });
        });
    };
    DetailManageComponent.prototype.createWithOutInvestCode = function () {
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
    DetailManageComponent.prototype.onRevice = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loaderService.show();
                        return [4 /*yield*/, this.updateInvestigateDetail()];
                    case 1:
                        _a.sent();
                        this.onComplete();
                        this.loaderService.hide();
                        return [2 /*return*/];
                }
            });
        });
    };
    DetailManageComponent.prototype.getTransactionRunning = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resRunning, investCode, tr, str, pad, ans;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.s_transactionRunning
                            .TransactionRunninggetByCon(this.runningTable, this.runningOfficeCode)
                            .then(function (x) {
                            if (!_this.checkResponse(x))
                                return;
                            return x;
                        })];
                    case 1:
                        resRunning = _a.sent();
                        if (!resRunning.length) return [3 /*break*/, 3];
                        tr = resRunning.sort(function (a, b) { return b.RunningNo - a.RunningNo; })[0] // sort desc
                        ;
                        str = '' + (tr.RunningNo + 1);
                        pad = '00000';
                        ans = pad.substring(0, pad.length - str.length) + str;
                        investCode = "" + tr.RunningPrefix + tr.RunningOfficeCode + tr.RunningYear + ans;
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
                                investCode = "" + this.runningPrefix + this.runningOfficeCode + year + ans;
                                return [2 /*return*/, true];
                            });
                        }); }, function () { _this.saveFail(); return; })
                            .catch(function (error) { return _this.catchError(error); })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        if (!investCode) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.insertInvestigate(investCode)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    DetailManageComponent.prototype.insertInvestigate = function (investCode) {
        return __awaiter(this, void 0, void 0, function () {
            var invest;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        invest = this.stateInvest;
                        invest.InvestigateCode = investCode;
                        return [4 /*yield*/, this.s_invest.InvestigateinsAll(invest).then(function (x) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!this.checkIsSuccess(x))
                                                return [2 /*return*/];
                                            return [4 /*yield*/, this.insertInvestigateDetail(investCode)];
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
    DetailManageComponent.prototype.insertInvestigateDetail = function (investCode) {
        return __awaiter(this, void 0, void 0, function () {
            var form;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loaderService.show();
                        form = this.investigateFG.value;
                        this.investCode = investCode;
                        form.InvestigateCode = investCode;
                        form.InvestigateDateStart = Object(__WEBPACK_IMPORTED_MODULE_10_app_config_dateFormat__["d" /* getDateMyDatepicker */])(form.InvestigateDateStart);
                        form.InvestigateDateEnd = Object(__WEBPACK_IMPORTED_MODULE_10_app_config_dateFormat__["d" /* getDateMyDatepicker */])(form.InvestigateDateEnd);
                        console.log("InvestigateDetailinsAll : ", JSON.stringify(form));
                        return [4 /*yield*/, this.s_investDetail.InvestigateDetailinsAll(form).then(function (x) { return __awaiter(_this, void 0, void 0, function () {
                                var staff, suspect, local, product, ducument;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!this.checkIsSuccess(x))
                                                return [2 /*return*/];
                                            this.invesDetailId = x.InvestigateDetailID;
                                            return [4 /*yield*/, this.modifyInvestigateDetailStaff(x.InvestigateDetailID)];
                                        case 1:
                                            staff = _a.sent();
                                            return [4 /*yield*/, this.modifyInvestigateDetailSuspect(x.InvestigateDetailID)];
                                        case 2:
                                            suspect = _a.sent();
                                            return [4 /*yield*/, this.modifyInvestigateDetailLocal(x.InvestigateDetailID)];
                                        case 3:
                                            local = _a.sent();
                                            return [4 /*yield*/, this.modifyInvestigateDetailProduct(x.InvestigateDetailID)];
                                        case 4:
                                            product = _a.sent();
                                            return [4 /*yield*/, this.modifyMasDocument(x.InvestigateDetailID)];
                                        case 5:
                                            ducument = _a.sent();
                                            return [2 /*return*/, Promise.all([staff, suspect, local, product, ducument])];
                                    }
                                });
                            }); }, function () { _this.saveFail(); return; })
                                .catch(function (error) { return _this.catchError(error); })];
                    case 1:
                        _a.sent();
                        this.loaderService.hide();
                        return [2 /*return*/];
                }
            });
        });
    };
    DetailManageComponent.prototype.updateInvestigateDetail = function () {
        return __awaiter(this, void 0, void 0, function () {
            var form;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loaderService.show();
                        form = this.investigateFG.value;
                        form.InvestigateDateStart = Object(__WEBPACK_IMPORTED_MODULE_10_app_config_dateFormat__["d" /* getDateMyDatepicker */])(form.InvestigateDateStart);
                        form.InvestigateDateEnd = Object(__WEBPACK_IMPORTED_MODULE_10_app_config_dateFormat__["d" /* getDateMyDatepicker */])(form.InvestigateDateEnd);
                        console.log("InvestigateDetailupdByCon : ", JSON.stringify(form));
                        return [4 /*yield*/, this.s_investDetail.InvestigateDetailupdByCon(form).then(function (x) { return __awaiter(_this, void 0, void 0, function () {
                                var staff, suspect, local, product, ducument;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!this.checkIsSuccess(x))
                                                return [2 /*return*/];
                                            return [4 /*yield*/, this.modifyInvestigateDetailStaff(parseInt(this.invesDetailId))];
                                        case 1:
                                            staff = _a.sent();
                                            return [4 /*yield*/, this.modifyInvestigateDetailSuspect(parseInt(this.invesDetailId))];
                                        case 2:
                                            suspect = _a.sent();
                                            return [4 /*yield*/, this.modifyInvestigateDetailLocal(parseInt(this.invesDetailId))];
                                        case 3:
                                            local = _a.sent();
                                            return [4 /*yield*/, this.modifyInvestigateDetailProduct(parseInt(this.invesDetailId))];
                                        case 4:
                                            product = _a.sent();
                                            return [4 /*yield*/, this.modifyMasDocument(parseInt(this.invesDetailId))];
                                        case 5:
                                            ducument = _a.sent();
                                            return [2 /*return*/, Promise.all([staff, suspect, local, product, ducument])];
                                    }
                                });
                            }); }, function () { _this.saveFail(); return; })
                                .catch(function (error) { return _this.catchError(error); })];
                    case 1:
                        _a.sent();
                        this.loaderService.hide();
                        return [2 /*return*/];
                }
            });
        });
    };
    DetailManageComponent.prototype.modifyInvestigateDetailStaff = function (investDetailId) {
        return __awaiter(this, void 0, void 0, function () {
            var staff;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.InvestigateDetailStaff.value
                            .map(function (x, index) { return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            var _this = this;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        x.InvestigateDetailID = investDetailId;
                                        _a = x.IsModify;
                                        switch (_a) {
                                            case 'd': return [3 /*break*/, 1];
                                            case 'c': return [3 /*break*/, 3];
                                            case 'u': return [3 /*break*/, 5];
                                            case 'r': return [3 /*break*/, 5];
                                        }
                                        return [3 /*break*/, 7];
                                    case 1:
                                        if (this.mode == 'C')
                                            return [2 /*return*/];
                                        return [4 /*yield*/, this.s_investDetail.InvestigateDetailStaffupdDelete(x.StaffID.toString())
                                                .then(function (y) {
                                                if (!_this.checkIsSuccess(y))
                                                    return;
                                            }, function () { _this.saveFail(); return; })
                                                .catch(function (error) { return _this.catchError(error); })];
                                    case 2:
                                        _b.sent();
                                        return [3 /*break*/, 7];
                                    case 3:
                                        console.log("InvestigateDetailStaffinsAll : " + (index + 1), JSON.stringify(x));
                                        return [4 /*yield*/, this.s_investDetail.InvestigateDetailStaffinsAll(x)
                                                .then(function (y) {
                                                if (!_this.checkIsSuccess(y))
                                                    return;
                                            }, function () { _this.saveFail(); return; })
                                                .catch(function (error) { return _this.catchError(error); })];
                                    case 4:
                                        _b.sent();
                                        return [3 /*break*/, 7];
                                    case 5: return [4 /*yield*/, this.s_investDetail.InvestigateDetailStaffupdByCon(x)
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
                        staff = _a.sent();
                        return [2 /*return*/, Promise.all(staff)];
                }
            });
        });
    };
    DetailManageComponent.prototype.modifyInvestigateDetailSuspect = function (investDetailId) {
        return __awaiter(this, void 0, void 0, function () {
            var suspect;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.InvestigateDetailSuspect.value
                            .map(function (x) { return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            var _this = this;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        x.InvestigateDetailID = investDetailId;
                                        _a = x.IsModify;
                                        switch (_a) {
                                            case 'd': return [3 /*break*/, 1];
                                            case 'c': return [3 /*break*/, 3];
                                        }
                                        return [3 /*break*/, 5];
                                    case 1:
                                        if (this.mode == 'C')
                                            return [2 /*return*/];
                                        return [4 /*yield*/, this.s_investDetail.InvestigateDetailSuspectupdDelete(x.SuspectID.toString())
                                                .then(function (y) {
                                                if (!_this.checkIsSuccess(y))
                                                    return;
                                            }, function () { _this.saveFail(); return; })
                                                .catch(function (error) { return _this.catchError(error); })];
                                    case 2:
                                        _b.sent();
                                        return [3 /*break*/, 5];
                                    case 3: return [4 /*yield*/, this.s_investDetail.InvestigateDetailSuspectinsAll(x)
                                            .then(function (y) {
                                            if (!_this.checkIsSuccess(y))
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
                        suspect = _a.sent();
                        return [2 /*return*/, Promise.all(suspect)];
                }
            });
        });
    };
    DetailManageComponent.prototype.modifyInvestigateDetailLocal = function (investDetailId) {
        return __awaiter(this, void 0, void 0, function () {
            var product;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.InvestigateDetailLocal.value
                            .map(function (x, index) { return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            var _this = this;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        x.InvestigateDetailID = investDetailId;
                                        _a = x.IsModify;
                                        switch (_a) {
                                            case 'd': return [3 /*break*/, 1];
                                            case 'c': return [3 /*break*/, 3];
                                            case 'u': return [3 /*break*/, 5];
                                            case 'r': return [3 /*break*/, 5];
                                        }
                                        return [3 /*break*/, 7];
                                    case 1:
                                        if (this.mode == 'C')
                                            return [2 /*return*/];
                                        return [4 /*yield*/, this.s_investDetail.InvestigateDetailLocalupdDelete(x.LocalID.toString())
                                                .then(function (y) {
                                                if (!_this.checkIsSuccess(y))
                                                    return;
                                            }, function () { _this.saveFail(); return; })
                                                .catch(function (error) { return _this.catchError(error); })];
                                    case 2:
                                        _b.sent();
                                        return [3 /*break*/, 7];
                                    case 3:
                                        console.log("InvestigateDetailLocalinsAll : " + (index + 1), JSON.stringify(x));
                                        return [4 /*yield*/, this.s_investDetail.InvestigateDetailLocalinsAll(x)
                                                .then(function (y) {
                                                if (!_this.checkIsSuccess(y))
                                                    return;
                                            }, function () { _this.saveFail(); return; })
                                                .catch(function (error) { return _this.catchError(error); })];
                                    case 4:
                                        _b.sent();
                                        return [3 /*break*/, 7];
                                    case 5: return [4 /*yield*/, this.s_investDetail.InvestigateDetailLocalupdByCon(x)
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
                        product = _a.sent();
                        return [2 /*return*/, Promise.all(product)];
                }
            });
        });
    };
    DetailManageComponent.prototype.modifyInvestigateDetailProduct = function (investDetailId) {
        return __awaiter(this, void 0, void 0, function () {
            var product;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.InvestigateDetailProduct.value
                            .map(function (x) { return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            var _this = this;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        x.InvestigateDetailID = investDetailId;
                                        _a = x.IsModify;
                                        switch (_a) {
                                            case 'd': return [3 /*break*/, 1];
                                            case 'c': return [3 /*break*/, 3];
                                            case 'u': return [3 /*break*/, 5];
                                            case 'r': return [3 /*break*/, 5];
                                        }
                                        return [3 /*break*/, 7];
                                    case 1:
                                        if (this.mode == 'C')
                                            return [2 /*return*/];
                                        return [4 /*yield*/, this.s_investDetail.InvestigateDetailProductupdDelete(x.ProductID.toString())
                                                .then(function (y) {
                                                if (!_this.checkIsSuccess(y))
                                                    return;
                                            }, function () { _this.saveFail(); return; })
                                                .catch(function (error) { return _this.catchError(error); })];
                                    case 2:
                                        _b.sent();
                                        return [3 /*break*/, 7];
                                    case 3: return [4 /*yield*/, this.s_investDetail.InvestigateDetailProductinsAll(x)
                                            .then(function (y) {
                                            if (!_this.checkIsSuccess(y))
                                                return;
                                        }, function () { _this.saveFail(); return; })
                                            .catch(function (error) { return _this.catchError(error); })];
                                    case 4:
                                        _b.sent();
                                        return [3 /*break*/, 7];
                                    case 5: return [4 /*yield*/, this.s_investDetail.InvestigateDetailProductupdByCon(x)
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
                        product = _a.sent();
                        return [2 /*return*/, Promise.all(product)];
                }
            });
        });
    };
    DetailManageComponent.prototype.modifyMasDocument = function (investDetailId) {
        return __awaiter(this, void 0, void 0, function () {
            var document;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.InvestigateDocument.value
                            .map(function (x) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                x.ReferenceCode = investDetailId.toString();
                                switch (x.IsModify) {
                                    case 'd':
                                        this.s_document.MasDocumentMainupdDelete(x.DocumentID.toString())
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
                                    case 'r':
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
                        document = _a.sent();
                        return [2 /*return*/, Promise.all(document)];
                }
            });
        });
    };
    DetailManageComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-investigate-detail-manage',
            template: __webpack_require__("./src/app/pages/investigation/components/detail-manage/detail-manage.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["d" /* NgbModal */],
            __WEBPACK_IMPORTED_MODULE_7_app_shared_header_navigation_navigation_service__["a" /* NavigationService */],
            __WEBPACK_IMPORTED_MODULE_16_app_services_main_master_service__["a" /* MainMasterService */],
            __WEBPACK_IMPORTED_MODULE_15_app_core_loader_loader_service__["a" /* LoaderService */],
            __WEBPACK_IMPORTED_MODULE_20_app_services_transaction_running_service__["a" /* TransactionRunningService */], __WEBPACK_IMPORTED_MODULE_14__services__["d" /* InvestgateService */], __WEBPACK_IMPORTED_MODULE_14__services__["a" /* InvestgateDetailService */], __WEBPACK_IMPORTED_MODULE_21_app_services_mas_document_main_service__["a" /* MasDocumentMainService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */],
            __WEBPACK_IMPORTED_MODULE_22_app_shared_sidebar_sidebar_component__["b" /* SidebarService */],
            __WEBPACK_IMPORTED_MODULE_18__ngrx_store__["a" /* Store */]])
    ], DetailManageComponent);
    return DetailManageComponent;
}());



/***/ }),

/***/ "./src/app/pages/investigation/components/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return components; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__list_list_component__ = __webpack_require__("./src/app/pages/investigation/components/list/list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__manage_manage_component__ = __webpack_require__("./src/app/pages/investigation/components/manage/manage.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__detail_manage_detail_manage_component__ = __webpack_require__("./src/app/pages/investigation/components/detail-manage/detail-manage.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lawbreaker_lawbreaker_component__ = __webpack_require__("./src/app/pages/investigation/components/lawbreaker/lawbreaker.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__suspect_suspect_component__ = __webpack_require__("./src/app/pages/investigation/components/suspect/suspect.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__suspect_modal_suspect_modal_component__ = __webpack_require__("./src/app/pages/investigation/components/suspect-modal/suspect-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__printdoc_modal_printdoc_modal_component__ = __webpack_require__("./src/app/pages/investigation/components/printdoc-modal/printdoc-modal.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__list_list_component__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_1__manage_manage_component__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__detail_manage_detail_manage_component__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__lawbreaker_lawbreaker_component__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__suspect_suspect_component__["a"]; });
/* unused harmony namespace reexport */
/* unused harmony namespace reexport */







var components = [
    __WEBPACK_IMPORTED_MODULE_0__list_list_component__["a" /* ListComponent */],
    __WEBPACK_IMPORTED_MODULE_1__manage_manage_component__["a" /* ManageComponent */],
    __WEBPACK_IMPORTED_MODULE_2__detail_manage_detail_manage_component__["a" /* DetailManageComponent */],
    __WEBPACK_IMPORTED_MODULE_3__lawbreaker_lawbreaker_component__["a" /* LawbreakerComponent */],
    __WEBPACK_IMPORTED_MODULE_4__suspect_suspect_component__["a" /* SuspectComponent */],
    __WEBPACK_IMPORTED_MODULE_5__suspect_modal_suspect_modal_component__["a" /* SuspectModalComponent */],
    __WEBPACK_IMPORTED_MODULE_6__printdoc_modal_printdoc_modal_component__["a" /* PrintdocModalComponent */]
];









/***/ }),

/***/ "./src/app/pages/investigation/components/lawbreaker/lawbreaker.component.html":
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"LawbreakerFG\">\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header unset-radius\">\r\n            <div class=\"card-actions\">\r\n                <a class=\"\" (click)=\"card1 = !card1\">\r\n                    <i class=\"fa\" [ngClass]=\"{'fa-chevron-down': card1, 'fa-chevron-up': !card1}\"></i>\r\n                </a>\r\n            </div>\r\n            <h4 class=\"card-title m-b-0\">ข้อมูลส่วนต้ว</h4>\r\n        </div>\r\n        <div class=\"card-body\" *ngIf=\"card1\">\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ประเภทผู้ต้องสงสัย :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <select formControlName=\"LawbreakerType\" class=\"form-control form-control-sm\"\r\n                        [ngClass]=\"{'ng-touched':isRequired}\" [attr.disabled]=\"showEditField ? '' : null\" required\r\n                        (change)=\"toggleCard()\">\r\n                        <option value=\"\" selected disabled></option>\r\n                        <option *ngFor=\"let item of LawbreakerTypes; let i=index;\" [value]=\"item.value\">{{item.text}}</option>\r\n                    </select>\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ประเภทบุคคล :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <select formControlName=\"EntityType\" class=\"form-control form-control-sm\" [ngClass]=\"{'ng-touched':isRequired}\"\r\n                        [attr.disabled]=\"showEditField ? '' : null\" required (change)=\"toggleCard()\">\r\n                        <option value=\"\" selected disabled></option>\r\n                        <option *ngFor=\"let item of entityTypes; let i=index;\" [value]=\"item.value\">{{item.text}}</option>\r\n                    </select>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">เลขบัตรประชาชน :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"IDCard\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">คำนำหน้าชื่อ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <select formControlName=\"LawbreakerTitleCode\" class=\"form-control form-control-sm\" [attr.disabled]=\"showEditField ? '' : null\">\r\n                        <option value=\"\" selected disabled></option>\r\n                        <option *ngFor=\"let item of typeheadTitleNames; let i=index;\" [value]=\"item.TitleCode\">{{item.TitleNameTH}}</option>\r\n                    </select>\r\n                    <!-- <ng-template #rt let-r=\"result\" let-t=\"term\">\r\n                        {{ r.TitleNameTH }}\r\n                    </ng-template>\r\n\r\n                    <input type=\"text\" class=\"form-control form-control-sm\" [ngbTypeahead]=\"searchTitleName\"\r\n                        [resultTemplate]=\"rt\" [readOnly]=\"showEditField\" [inputFormatter]=\"formatterTitleName\"\r\n                        (selectItem)=\"selectItemTitleName($event)\" [value]=\"LawbreakerFG.get('LawbreakerTitleName').value\" /> -->\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ชื่อจริง :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"LawbreakerFirstName\" class=\"form-control form-control-sm\"\r\n                        [readonly]=\"showEditField\">\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">นามสกุล :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"LawbreakerLastName\" class=\"form-control form-control-sm\"\r\n                        [readonly]=\"showEditField\">\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ชื่ออื่น :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"LawbreakerOtherName\" class=\"form-control form-control-sm\"\r\n                        [readonly]=\"showEditField\">\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">วันเกิด :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <my-date-picker-th formControlName=\"BirthDate\" [options]=\"myDatePickerOptions\" [disabled]=\"showEditField\"></my-date-picker-th>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">กรุ๊ปเลือด :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <select formControlName=\"BloodType\" class=\"form-control form-control-sm\" [attr.disabled]=\"showEditField ? '' : null\">\r\n                        <option value=\"\" selected disabled></option>\r\n                        <option *ngFor=\"let item of bloodTypes; let i=index;\" [value]=\"item.value\">{{item.text}}</option>\r\n                    </select>\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">สัญชาติ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <select formControlName=\"NationalityCode\" class=\"form-control form-control-sm\" [attr.disabled]=\"showEditField ? '' : null\">\r\n                        <option value=\"\" selected disabled></option>\r\n                        <option *ngFor=\"let item of typeheadNationality; let i=index;\" [value]=\"item.NationalityCode\">{{item.NationalityNameTh}}</option>\r\n                    </select>\r\n                    <!-- <ng-template #rt let-r=\"result\" let-t=\"term\">\r\n                        {{ r.TitleNameTH }}\r\n                    </ng-template>\r\n\r\n                    <input type=\"text\" class=\"form-control form-control-sm\" [ngbTypeahead]=\"searchNationality\"\r\n                        [resultTemplate]=\"rt\" [readOnly]=\"showEditField\" [inputFormatter]=\"formatterNationality\"\r\n                        (selectItem)=\"selectItemNationality($event)\" [value]=\"LawbreakerFG.get('NationalityNameTH').value\" /> -->\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">เชื่อชาติ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <select #race formControlName=\"RaceCode\" class=\"form-control form-control-sm\" [attr.disabled]=\"showEditField ? '' : null\">\r\n                        <option value=\"\" selected disabled></option>\r\n                        <option *ngFor=\"let item of typeheadRaces; let i=index;\" [value]=\"item.RaceCode\">{{item.RaceNameTH}}</option>\r\n                    </select>\r\n                    <!-- <ng-template #rt let-r=\"result\" let-t=\"term\">\r\n                        {{ r.TitleNameTH }}\r\n                    </ng-template>\r\n\r\n                    <input type=\"text\" class=\"form-control form-control-sm\" [ngbTypeahead]=\"searchRace\"\r\n                        [resultTemplate]=\"rt\" [readOnly]=\"showEditField\" [inputFormatter]=\"formatterRace\" (selectItem)=\"selectItemRace($event)\"\r\n                        [value]=\"LawbreakerFG.get('RaceName').value\" /> -->\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ศาสนา :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <select formControlName=\"ReligionCode\" class=\"form-control form-control-sm\" [attr.disabled]=\"showEditField ? '' : null\">\r\n                        <option value=\"\" selected disabled></option>\r\n                        <option *ngFor=\"let item of typeheadReligions; let i=index;\" [value]=\"item.ReligionCode\">{{item.ReligionNameTH}}</option>\r\n                    </select>\r\n                    <!-- <ng-template #rt let-r=\"result\" let-t=\"term\">\r\n                        {{ r.TitleNameTH }}\r\n                    </ng-template>\r\n\r\n                    <input type=\"text\" class=\"form-control form-control-sm\" [ngbTypeahead]=\"searchRace\"\r\n                        [resultTemplate]=\"rt\" [readOnly]=\"showEditField\" [inputFormatter]=\"formatterRace\" (selectItem)=\"selectItemRace($event)\"\r\n                        [value]=\"LawbreakerFG.get('RaceName').value\" /> -->\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">สถานะภาพ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <select formControlName=\"MaritalStatus\" class=\"form-control form-control-sm\" [attr.disabled]=\"showEditField ? '' : null\">\r\n                        <option value=\"\" selected disabled></option>\r\n                        <option *ngFor=\"let item of materialStatus; let i=index;\" [value]=\"item.value\">{{item.text}}</option>\r\n                    </select>\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">อาชีพ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"Career\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ชื่อบิดา :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"FatherName\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ชื่อมารดา :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"MotherName\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">เบอร์โทรศัพท์ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"TelephoneNo\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">อีเมล์ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"Email\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">รูปถ่ายผู้ต้องสงสัย :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <label for=\"fileImg\" class=\"find-img\">\r\n                        <img #imgNobody src=\"assets/images/users/nobody.jpg\" alt=\"\" height=\"180px\" width=\"180px\">\r\n                        <span>เลือกรูปภาพ</span>\r\n                    </label>\r\n                    <input id='fileImg' (change)=\"changeImage($event, imgNobody)\" type=\"file\" hidden [attr.disabled]=\"showEditField ? '' : null\">\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">จำนวนครั้งกระทำผิด :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" class=\"form-control form-control-sm\" readonly>\r\n                    <!-- <a class=\"viewOffense text-secondary\" href=\"javaScript:void(0);\" (click)=\"!showEditField && openOffenseDetailModal(offens)\">\r\n                        <i class=\"fa fa-eye fa-lg\"></i>\r\n                    </a> -->\r\n\r\n                    <!-- <ng-template #offens let-c=\"close\" let-d=\"dismiss\">\r\n                        <app-modal-offense (c)=\"modal.close()\" (d)=\"modal.dismiss()\"></app-modal-offense>\r\n                    </ng-template> -->\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header unset-radius\">\r\n            <div class=\"card-actions\">\r\n                <a class=\"\" (click)=\"card2 = !card2\">\r\n                    <i class=\"fa\" [ngClass]=\"{'fa-chevron-down': card2, 'fa-chevron-up': !card2}\"></i>\r\n                </a>\r\n            </div>\r\n            <h4 class=\"card-title m-b-0\">ที่อยู่/สถานที่ทำการ</h4>\r\n        </div>\r\n        <div *ngIf=\"card2\" class=\"card-body\">\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ละติจูด :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input #latitude (change)=\"onChangeGps()\" type=\"text\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ลองจิจูด :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input #longitude (change)=\"onChangeGps()\" type=\"text\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n\r\n                <input type=\"text\" formControlName=\"GPS\" style=\"display: none;\">\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">บ้านเลขที่ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"Address\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">หมู่ที่ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"Village\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">อาคาร/สถานที่ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"Building\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ห้อง :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"Room\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ชั้น :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"Floor\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ตรอก/ซอย :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"Alley\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ถนน :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"Road\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ต./อ./จ. :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <ng-template #rt let-r=\"result\" let-t=\"term\">\r\n                        {{ r.SubdistrictNameTH }} {{r.DistrictNameTH}} {{r.ProvinceNameTH}}\r\n                    </ng-template>\r\n\r\n                    <input type=\"text\" class=\"form-control form-control-sm\" [ngbTypeahead]=\"searchRegion\"\r\n                        [resultTemplate]=\"rt\" [readOnly]=\"showEditField\" [inputFormatter]=\"formatterRegion\"\r\n                        (selectItem)=\"selectItemRegion($event)\" \r\n                        [value]=\"LawbreakerFG.get('Region').value\"/>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">รหัสไปรษณีย์ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"ZipCode\" class=\"form-control form-control-sm\" [readOnly]=\"showEditField\">\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header unset-radius\">\r\n            <div class=\"card-actions\">\r\n                <a class=\"\" (click)=\"card3 = !card3\">\r\n                    <i class=\"fa\" [ngClass]=\"{'fa-chevron-down': card3, 'fa-chevron-up': !card3}\"></i>\r\n                </a>\r\n            </div>\r\n            <h4 class=\"card-title m-b-0\">ข้อมูลชาวต่างชาติ</h4>\r\n        </div>\r\n        <div *ngIf=\"card3\" class=\"card-body\">\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">เลขหนังสือเดินทาง :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"PassportNo\" class=\"form-control form-control-sm\" [ngClass]=\"{'ng-touched':isRequired}\"\r\n                        [required]=\"requiredPassport\" [readonly]=\"showEditField\">\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ประเทศที่ออกหนังสือเดินทาง :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <ng-template #rt let-r=\"result\" let-t=\"term\">\r\n                        {{ r.CountryNameEN }}\r\n                    </ng-template>\r\n\r\n                    <input type=\"text\" class=\"form-control form-control-sm\" [ngbTypeahead]=\"searchCountry\"\r\n                        [resultTemplate]=\"rt\" [readOnly]=\"showEditField\" [inputFormatter]=\"formatterCountry\"\r\n                        (selectItem)=\"selectItemCountry($event)\" [value]=\"LawbreakerFG.get('PassportCountryName').value\" />\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">วันที่เข้าประเทศ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <my-date-picker-th formControlName=\"PassportDateIn\" [options]=\"myDatePickerOptions\" [disabled]=\"showEditField\"></my-date-picker-th>\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">วันที่ออกประเทศ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <my-date-picker-th formControlName=\"PassportDateOut\" [options]=\"myDatePickerOptions\" [disabled]=\"showEditField\"></my-date-picker-th>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ประเภทวีซ่า :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <select formControlName=\"VISAType\" class=\"form-control form-control-sm\" [attr.disabled]=\"showEditField ? '' : null\">\r\n                        <option value=\"\" selected disabled></option>\r\n                        <option *ngFor=\"let item of visaTypes; let i=index;\" [value]=\"item.value\">{{item.text}}</option>\r\n                    </select>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header unset-radius\">\r\n            <div class=\"card-actions\">\r\n                <a class=\"\" (click)=\"card4 = !card4\">\r\n                    <i class=\"fa\" [ngClass]=\"{'fa-chevron-down': card4, 'fa-chevron-up': !card4}\"></i>\r\n                </a>\r\n            </div>\r\n            <h4 class=\"card-title m-b-0\">ข้อมูลผู้ประกอบการ</h4>\r\n        </div>\r\n        <div *ngIf=\"card4\" class=\"card-body\">\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">เลขทะเบียนนิติบุคคล :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <!-- <div *ngIf=\"requiredCompanyRegister; else notShow\"> -->\r\n                    <input type=\"text\" formControlName=\"CompanyRegistrationNo\" class=\"form-control form-control-sm\"\r\n                        [ngClass]=\"{'ng-touched':isRequired}\" [required]=\"requiredCompanyRegister\" [readonly]=\"showEditField\">\r\n                    <!-- </div> -->\r\n                    <!-- <ng-template #notShow>\r\n                        <input type=\"text\" formControlName=\"CompanyRegistrationNo\" class=\"form-control form-control-sm\"\r\n                            [readonly]=\"showEditField\">\r\n                    </ng-template> -->\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">เลขทะเบียนสรรพสามิต :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"ExciseRegNo\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ชื่อสถานที่ประกอบการ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"CompanyName\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</form>"

/***/ }),

/***/ "./src/app/pages/investigation/components/lawbreaker/lawbreaker.component.scss":
/***/ (function(module, exports) {

module.exports = ".viewOffense {\n  position: absolute;\n  right: 20px;\n  top: 2px; }\n\nlabel.find-img {\n  cursor: pointer; }\n\nlabel.find-img span {\n    position: absolute;\n    left: 65px;\n    bottom: 5px;\n    z-index: 2;\n    color: #fff; }\n\nlabel.find-img::after {\n  content: '';\n  position: absolute;\n  width: 180px;\n  height: 35px;\n  background-color: #0d5397;\n  left: 15px;\n  bottom: 0px; }\n"

/***/ }),

/***/ "./src/app/pages/investigation/components/lawbreaker/lawbreaker.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LawbreakerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_main_master_service__ = __webpack_require__("./src/app/services/main-master.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_models__ = __webpack_require__("./src/app/models/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services__ = __webpack_require__("./src/app/pages/investigation/services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models__ = __webpack_require__("./src/app/pages/investigation/models/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_shared_header_navigation_navigation_service__ = __webpack_require__("./src/app/shared/header-navigation/navigation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_app_shared_sidebar_sidebar_component__ = __webpack_require__("./src/app/shared/sidebar/sidebar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_app_core_loader_loader_service__ = __webpack_require__("./src/app/core/loader/loader.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs__ = __webpack_require__("./node_modules/rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_app_config_dateFormat__ = __webpack_require__("./src/app/config/dateFormat.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_rxjs_observable_combineLatest__ = __webpack_require__("./node_modules/rxjs/_esm5/observable/combineLatest.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_app_config_message__ = __webpack_require__("./src/app/config/message.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_app_config_imageType__ = __webpack_require__("./src/app/config/imageType.ts");
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
    function LawbreakerComponent(ngModalService, router, s_mainMaster, s_masLawbreaker, activatedRoute, navService, fb, sidebarService, loaderService, s_invest) {
        var _this = this;
        this.ngModalService = ngModalService;
        this.router = router;
        this.s_mainMaster = s_mainMaster;
        this.s_masLawbreaker = s_masLawbreaker;
        this.activatedRoute = activatedRoute;
        this.navService = navService;
        this.fb = fb;
        this.sidebarService = sidebarService;
        this.loaderService = loaderService;
        this.s_invest = s_invest;
        this.card1 = true;
        this.card2 = true;
        this.card3 = false;
        this.card4 = false;
        this.requiredPassport = false;
        this.requiredCompanyRegister = false;
        this.destroy$ = new __WEBPACK_IMPORTED_MODULE_11_rxjs__["Subject"]();
        this.myDatePickerOptions = __WEBPACK_IMPORTED_MODULE_12_app_config_dateFormat__["a" /* MyDatePickerOptions */];
        this.isRequired = false;
        this.visaTypes = __WEBPACK_IMPORTED_MODULE_4_app_models__["j" /* VISATypes */];
        this.bloodTypes = __WEBPACK_IMPORTED_MODULE_4_app_models__["a" /* BloodTypes */];
        this.entityTypes = __WEBPACK_IMPORTED_MODULE_4_app_models__["e" /* EntityTypes */];
        this.genderTypes = __WEBPACK_IMPORTED_MODULE_4_app_models__["f" /* GenderTypes */];
        this.LawbreakerTypes = __WEBPACK_IMPORTED_MODULE_4_app_models__["g" /* LawbreakerTypes */];
        this.materialStatus = __WEBPACK_IMPORTED_MODULE_4_app_models__["h" /* MaritalStatuType */];
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
                        this.sidebarService.setVersion(this.s_invest.version);
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
        this.navService.setOnEdit(false);
        this.navService.setOnSave(false);
        this.navService.setOnDelete(false);
        this.navService.setOnCancel(false);
        this.navService.setOnSearch(false);
        this.navService.setOnPrint(false);
        this.navService.setOnNextPage(false);
        this.navService.setOnPrevPage(false);
        this.navService.setEditField(false);
        this.navService.setSearchBar(false);
        this.navService.setPrintButton(false);
        this.navService.setEditButton(false);
        this.navService.setDeleteButton(false);
        this.navService.setSaveButton(false);
        this.navService.setCancelButton(false);
        this.navService.setNewButton(false);
        this.navService.setNextPageButton(false);
        this.navService.setPrevPageButton(false);
    };
    LawbreakerComponent.prototype.createForm = function () {
        __WEBPACK_IMPORTED_MODULE_6__models__["e" /* InvestigateMasLawbreakerFC */].LinkPhoto = new __WEBPACK_IMPORTED_MODULE_8__angular_forms__["d" /* FormControl */]("C:\\Image");
        __WEBPACK_IMPORTED_MODULE_6__models__["e" /* InvestigateMasLawbreakerFC */].IsActive = new __WEBPACK_IMPORTED_MODULE_8__angular_forms__["d" /* FormControl */](1);
        return new __WEBPACK_IMPORTED_MODULE_8__angular_forms__["e" /* FormGroup */](__WEBPACK_IMPORTED_MODULE_6__models__["e" /* InvestigateMasLawbreakerFC */]);
    };
    LawbreakerComponent.prototype.active_route = function () {
        var _this = this;
        Object(__WEBPACK_IMPORTED_MODULE_13_rxjs_observable_combineLatest__["a" /* combineLatest */])(this.activatedRoute.params, this.activatedRoute.queryParams)
            .map(function (results) { return ({ params: results[0], queryParams: results[1] }); })
            .takeUntil(this.destroy$)
            .subscribe(function (results) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.mode = results.params.mode;
                this.lawbreakerId = results.params.code;
                this.enableBtnModeR();
                this.pageLoad();
                return [2 /*return*/];
            });
        }); });
    };
    // private enableBtnModeC() {
    //     // set false
    //     this.navService.setEditButton(false);
    //     this.navService.setEditField(false);
    //     this.navService.setNextPageButton(false);
    //     // set true
    //     this.navService.setSaveButton(true);
    //     this.navService.setCancelButton(true);
    // }
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
                        return [4 /*yield*/, this.ArrestLawbreakerGetByCon(this.lawbreakerId)];
                    case 7:
                        _b.sent();
                        this.loaderService.hide();
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
                                alert(__WEBPACK_IMPORTED_MODULE_14_app_config_message__["a" /* Message */].checkData);
                            }
                            return [2 /*return*/];
                        }
                        _Lfg_1 = this.LawbreakerFG.value;
                        birthDay = this.isObject(_Lfg_1.BirthDate)
                            && Object(__WEBPACK_IMPORTED_MODULE_12_app_config_dateFormat__["d" /* getDateMyDatepicker */])(_Lfg_1.BirthDate);
                        passportDateIn = this.isObject(_Lfg_1.PassportDateIn)
                            && Object(__WEBPACK_IMPORTED_MODULE_12_app_config_dateFormat__["d" /* getDateMyDatepicker */])(_Lfg_1.PassportDateIn);
                        passportDateOut = this.isObject(_Lfg_1.PassportDateOut)
                            && Object(__WEBPACK_IMPORTED_MODULE_12_app_config_dateFormat__["d" /* getDateMyDatepicker */])(_Lfg_1.PassportDateOut);
                        _Lfg_1.BirthDate = Object(__WEBPACK_IMPORTED_MODULE_12_app_config_dateFormat__["c" /* convertDateForSave */])(birthDay) || '';
                        _Lfg_1.PassportDateIn = Object(__WEBPACK_IMPORTED_MODULE_12_app_config_dateFormat__["c" /* convertDateForSave */])(passportDateIn) || '';
                        _Lfg_1.PassportDateOut = Object(__WEBPACK_IMPORTED_MODULE_12_app_config_dateFormat__["c" /* convertDateForSave */])(passportDateOut) || '';
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
                        this.OnRevice(_Lfg_1);
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
    };
    LawbreakerComponent.prototype.ArrestLawbreakerGetByCon = function (LawbreakerID) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.s_masLawbreaker.InvestigateMasLawbreakergetByCon(LawbreakerID)
                            .then(function (x) {
                            var law = x[0];
                            law.BirthDate = law.BirthDate && Object(__WEBPACK_IMPORTED_MODULE_12_app_config_dateFormat__["e" /* setDateMyDatepicker */])(law.BirthDate);
                            law.PassportDateIn = law.PassportDateIn && Object(__WEBPACK_IMPORTED_MODULE_12_app_config_dateFormat__["e" /* setDateMyDatepicker */])(law.PassportDateIn);
                            law.PassportDateOut = law.PassportDateOut && Object(__WEBPACK_IMPORTED_MODULE_12_app_config_dateFormat__["e" /* setDateMyDatepicker */])(law.PassportDateOut);
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
            alert(__WEBPACK_IMPORTED_MODULE_14_app_config_message__["a" /* Message */].checkImageType);
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
    LawbreakerComponent.prototype.OnRevice = function (lawbreaker) {
        var _this = this;
        this.s_masLawbreaker.InvestigateMasLawbreakerupdByCon(lawbreaker)
            .takeUntil(this.destroy$)
            .subscribe(function (res) {
            if (!_this.checkResponse(res)) {
                alert(__WEBPACK_IMPORTED_MODULE_14_app_config_message__["a" /* Message */].saveFail);
                return;
            }
            alert(__WEBPACK_IMPORTED_MODULE_14_app_config_message__["a" /* Message */].saveComplete);
            _this.enableBtnModeR();
        });
    };
    LawbreakerComponent.prototype.onCancel = function () {
        if (!confirm(__WEBPACK_IMPORTED_MODULE_14_app_config_message__["a" /* Message */].confirmAction))
            return;
        this.router.navigate(["investigation/lawbreaker", this.mode, this.lawbreakerId]);
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
            template: __webpack_require__("./src/app/pages/investigation/components/lawbreaker/lawbreaker.component.html"),
            styles: [__webpack_require__("./src/app/pages/investigation/components/lawbreaker/lawbreaker.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["d" /* NgbModal */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */],
            __WEBPACK_IMPORTED_MODULE_3_app_services_main_master_service__["a" /* MainMasterService */], __WEBPACK_IMPORTED_MODULE_5__services__["b" /* InvestgateMasLawbreakerService */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_7_app_shared_header_navigation_navigation_service__["a" /* NavigationService */],
            __WEBPACK_IMPORTED_MODULE_8__angular_forms__["c" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_9_app_shared_sidebar_sidebar_component__["b" /* SidebarService */],
            __WEBPACK_IMPORTED_MODULE_10_app_core_loader_loader_service__["a" /* LoaderService */], __WEBPACK_IMPORTED_MODULE_5__services__["d" /* InvestgateService */]])
    ], LawbreakerComponent);
    return LawbreakerComponent;
}());



/***/ }),

/***/ "./src/app/pages/investigation/components/list/list.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"advSearch | async\" class=\"card card-outline-bluish unset-radius\">\r\n    <div class=\"card-header unset-radius\">\r\n        <app-card-actions-close></app-card-actions-close>\r\n        <h4 class=\"card-title m-b-0\">ค้นหา</h4>\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <form class=\"form-horizontal\" #advForm=\"ngForm\" (ngSubmit)=\"onAdvSearch(advForm.value)\">\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-3\">เลขที่สืบสวน :</label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-9\">\r\n                    <div class=\"form-group\">\r\n                        <input type=\"text\" id=\"\" name=\"InvestigateCode\" ngModel class=\"form-control form-control-sm\"\r\n                            placeholder=\"\">\r\n                    </div>\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-3\">คดีสืบสวนที่ :</label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-9\">\r\n                    <div class=\"form-group\">\r\n                        <input type=\"text\" id=\"\" name=\"InvestigateNo\" ngModel class=\"form-control form-control-sm\"\r\n                            placeholder=\"\">\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-3\">หัวข้อการสืบสวน :</label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-9\">\r\n                    <div class=\"form-group\">\r\n                        <input type=\"text\" id=\"\" name=\"Subject\" ngModel class=\"form-control form-control-sm\"\r\n                            placeholder=\"\">\r\n                    </div>\r\n                </div>\r\n\r\n                <label for=\"\" class=\"col-lg-2 col-sm-3\">วันที่เริ่มสืบสวน :</label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-9\">\r\n                    <div class=\"form-group input-group\">\r\n                        <my-date-picker-th class=\"form-control form-control-sm unset-form-control\" name=\"DateStart\" \r\n                        [options]=\"myDatePickerOptions\" (dateChanged)=\"onSDateChange($event)\" ngModel></my-date-picker-th>\r\n\r\n                        <label for=\"DateEnd\">&nbsp;ถึง&nbsp;</label>\r\n\r\n                        <my-date-picker-th class=\"form-control form-control-sm unset-form-control\" id=\"DateEnd\" \r\n                        name=\"DateEnd\" [options]=\"myDatePickerOptions\"\r\n                        (dateChanged)=\"onEDateChange($event)\" [(ngModel)]=\"DateStartTo\"></my-date-picker-th>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"row form-group\">\r\n                <div class=\"col-lg-10 col-8\"></div>\r\n                <div class=\"col-lg-2 col-4\">\r\n                    <button type=\"submit\" class=\"btn btn-block btn-themecolor\">ค้นข้อมูล</button>\r\n                </div>\r\n            </div>\r\n        </form>\r\n    </div>\r\n\r\n</div>\r\n\r\n<div class=\"card unset-radius\">\r\n    <div class=\"card-body p-0\">\r\n        <div class=\"table-responsive\">\r\n            <table #invesTable class=\"table table-sm table-striped\">\r\n                <thead>\r\n                    <tr>\r\n                        <th class=\"text-center\">ลำดับ</th>\r\n                        <th>เลขที่สืบสวน</th>\r\n                        <th>คดีสืบสวนที่</th>\r\n                        <th>หัวข้อการสืบสวน</th>\r\n                        <th>วันที่เริ่มสืบสวน</th>\r\n                        <th>วันที่สิ้นสุดสืบสวน</th>\r\n                        <th>ครั้งที่สืบสวนล่าสุด</th>\r\n                        <th></th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr *ngFor=\"let item of invesList; let i=index;\">\r\n                        <td class=\"text-center\">{{item.RowsId}}</td>\r\n                        <td>{{item.InvestigateCode}}</td>\r\n                        <td>{{item.InvestigateNo}}</td>\r\n                        <td>{{item.Subject}}</td>\r\n                        <td>{{item.DateStart}}</td>\r\n                        <td>{{item.DateEnd}}</td>\r\n                        <td>{{item.InvestigateSeq}}</td>\r\n                        <td class=\"text-center\">\r\n                            <a href=\"javaScript:void(0);\" class=\"text-secondary\" (click)=\"clickView(item.InvestigateCode)\">\r\n                                <i class=\"fa fa-eye fa-lg\"></i>\r\n                            </a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n    <div class=\"card-footer card-footer-unset\">\r\n        <app-pagination-table [TotalItems]=\"paginage.TotalItems\" [CurrentPage]=\"paginage.CurrentPage\" [PageSize]=\"paginage.PageSize\"\r\n            [RowsPerPageOptions]=\"paginage.RowsPerPageOptions\" (onPageChange)=\"pageChanges($event)\">\r\n        </app-pagination-table>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/pages/investigation/components/list/list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_config_message__ = __webpack_require__("./src/app/config/message.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_config_pagination__ = __webpack_require__("./src/app/config/pagination.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_shared_header_navigation_navigation_service__ = __webpack_require__("./src/app/shared/header-navigation/navigation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_shared_sidebar_sidebar_component__ = __webpack_require__("./src/app/shared/sidebar/sidebar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_shared_preloader_preloader_component__ = __webpack_require__("./src/app/shared/preloader/preloader.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services__ = __webpack_require__("./src/app/pages/investigation/services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_config_dateFormat__ = __webpack_require__("./src/app/config/dateFormat.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/_esm5/Subject.js");
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
    function ListComponent(navService, s_invest, router, sidebarService, preLoader) {
        this.navService = navService;
        this.s_invest = s_invest;
        this.router = router;
        this.sidebarService = sidebarService;
        this.preLoader = preLoader;
        this.staffCode = '134194';
        this.destroy$ = new __WEBPACK_IMPORTED_MODULE_9_rxjs_Subject__["b" /* Subject */]();
        this.investigate = new Array();
        this.invesList = new Array();
        this.paginage = __WEBPACK_IMPORTED_MODULE_3_app_config_pagination__["a" /* pagination */];
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
        // set true
        this.navService.setSearchBar(true);
        this.navService.setNewButton(true);
        this.advSearch = this.navService.showAdvSearch;
    }
    ListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sidebarService.setVersion(this.s_invest.version);
        this.navService.searchByKeyword.subscribe(function (Textsearch) { return __awaiter(_this, void 0, void 0, function () {
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
        this.navService.onNextPage.subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!status) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.navService.setOnNextPage(false)];
                    case 1:
                        _a.sent();
                        this.router.navigate(["/investigation/manage/C/NEW"]);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    };
    ListComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
        this.paginage.TotalItems = 0;
    };
    ListComponent.prototype.onSearch = function (form) {
        var _this = this;
        this.s_invest.InvestigateListgetByKeyword(form.Textsearch, this.staffCode)
            .takeUntil(this.destroy$)
            .subscribe(function (x) { return _this.onSearchComplete(x); });
    };
    ListComponent.prototype.onAdvSearch = function (form) {
        var _this = this;
        var sdate = Object(__WEBPACK_IMPORTED_MODULE_8_app_config_dateFormat__["d" /* getDateMyDatepicker */])(form.DateStart);
        var edate = Object(__WEBPACK_IMPORTED_MODULE_8_app_config_dateFormat__["d" /* getDateMyDatepicker */])(form.DateEnd);
        if (sdate && edate) {
            if (!Object(__WEBPACK_IMPORTED_MODULE_8_app_config_dateFormat__["b" /* compareDate */])(sdate, edate)) {
                alert(__WEBPACK_IMPORTED_MODULE_2_app_config_message__["a" /* Message */].checkDate);
                return;
            }
        }
        form.DateStart = sdate || '';
        form.DateEnd = edate || '';
        console.log(JSON.stringify(form));
        this.s_invest.InvestigateListgetByConAdv(form)
            .takeUntil(this.destroy$)
            .subscribe(function (list) {
            _this.onSearchComplete(list);
        }, function (err) {
            alert(__WEBPACK_IMPORTED_MODULE_2_app_config_message__["a" /* Message */].noRecord);
        });
    };
    ListComponent.prototype.onSearchComplete = function (list) {
        this.investigate = [];
        if (!list.length) {
            alert(__WEBPACK_IMPORTED_MODULE_2_app_config_message__["a" /* Message */].noRecord);
            return false;
        }
        var rows = list.map(function (p, i) {
            p.RowsId = i + 1;
            p.DateStart = Object(__WEBPACK_IMPORTED_MODULE_8_app_config_dateFormat__["i" /* toLocalShort */])(p.DateStart);
            p.DateEnd = Object(__WEBPACK_IMPORTED_MODULE_8_app_config_dateFormat__["i" /* toLocalShort */])(p.DateEnd);
            return p;
        });
        this.investigate = rows;
        // set total record
        this.paginage.TotalItems = this.investigate.length;
    };
    ListComponent.prototype.onSDateChange = function (event) {
        this._dateStartFrom = event;
        this.checkDate();
    };
    ListComponent.prototype.onEDateChange = function (event) {
        this._dateStartTo = event;
        this.checkDate();
    };
    ListComponent.prototype.checkDate = function () {
        var _this = this;
        if (this._dateStartFrom && this._dateStartTo) {
            var sdate = Object(__WEBPACK_IMPORTED_MODULE_8_app_config_dateFormat__["d" /* getDateMyDatepicker */])(this._dateStartFrom);
            var edate = Object(__WEBPACK_IMPORTED_MODULE_8_app_config_dateFormat__["d" /* getDateMyDatepicker */])(this._dateStartTo);
            if (!Object(__WEBPACK_IMPORTED_MODULE_8_app_config_dateFormat__["b" /* compareDate */])(sdate, edate)) {
                alert(__WEBPACK_IMPORTED_MODULE_2_app_config_message__["a" /* Message */].checkDate);
                setTimeout(function () {
                    _this.DateStartTo = { date: _this._dateStartFrom.date };
                }, 0);
            }
        }
    };
    ListComponent.prototype.clickView = function (invesCode) {
        this.router.navigate(["/investigation/manage/R/" + invesCode]);
    };
    ListComponent.prototype.pageChanges = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.investigate.slice(event.startIndex - 1, event.endIndex)];
                    case 1:
                        _a.invesList = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('invesTable'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], ListComponent.prototype, "invesTable", void 0);
    ListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-list',
            template: __webpack_require__("./src/app/pages/investigation/components/list/list.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_app_shared_header_navigation_navigation_service__["a" /* NavigationService */], __WEBPACK_IMPORTED_MODULE_7__services__["d" /* InvestgateService */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */],
            __WEBPACK_IMPORTED_MODULE_5_app_shared_sidebar_sidebar_component__["b" /* SidebarService */],
            __WEBPACK_IMPORTED_MODULE_6_app_shared_preloader_preloader_component__["b" /* PreloaderService */]])
    ], ListComponent);
    return ListComponent;
}());



/***/ }),

/***/ "./src/app/pages/investigation/components/manage/manage.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <ng-template #printDocModal let-c=\"close\" let-d=\"dismiss\">\r\n    <app-printdoc-modal [investCode]=\"investCode\" (c)=\"modal.close()\" (d)=\"modal.dismiss()\"></app-printdoc-modal>\r\n</ng-template> -->\r\n\r\n<form class=\"form-horizontal\" [formGroup]=\"investigateForm\">\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header  unset-radius\">\r\n            <div class=\"card-actions\">\r\n                <a class=\"\" (click)=\"card1 = !card1\">\r\n                    <i class=\"fa\" [ngClass]=\"{'fa-chevron-down': card1, 'fa-chevron-up': !card1}\"></i>\r\n                </a>\r\n            </div>\r\n            <h4 class=\"card-title m-b-0\">คดีสืบสวน</h4>\r\n        </div>\r\n        <div class=\"card-body\" *ngIf=\"card1\">\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">เลขที่สืบสวน :\r\n                </label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\r\n                    <div class=\"form-group \">\r\n                        <input type=\"text\" formControlName=\"InvestigateCode\" class=\"form-control form-control-sm\"\r\n                            readonly>\r\n                    </div>\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">คดีสืบสวนที่ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"InvestigateNo\" class=\"form-control form-control-sm\" [readOnly]=\"showEditField\"\r\n                        [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">วันที่เริ่มสืบสวน :\r\n                </label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\r\n                    <div class=\"form-group \">\r\n                        <my-date-picker-th class=\"form-control form-control-sm unset-form-control\" formControlName=\"DateStart\"\r\n                            [disabled]=\"showEditField\" [options]=\"myDatePickerOptions\" (dateChanged)=\"onSDateChange($event)\"\r\n                            ngModel></my-date-picker-th>\r\n                    </div>\r\n                </div>\r\n\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">วันที่สิ้นสุดสืบสวน :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <my-date-picker-th class=\"form-control form-control-sm unset-form-control\" id=\"DateEnd\" [disabled]=\"showEditField\"\r\n                        formControlName=\"DateEnd\" [options]=\"myDatePickerOptions\" (dateChanged)=\"onEDateChange($event)\"></my-date-picker-th>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">หัวข้อการสืบสวน :\r\n                </label>\r\n                <div class=\"col-lg-10 col-sm-8\">\r\n                    <div class=\"form-group \">\r\n                        <input type=\"text\" formControlName=\"Subject\" class=\"form-control form-control-sm\" [readOnly]=\"showEditField\">\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header  unset-radius\">\r\n            <div class=\"card-actions\">\r\n                <a class=\"\" (click)=\"card2 = !card2\">\r\n                    <i class=\"fa\" [ngClass]=\"{'fa-chevron-down': card2, 'fa-chevron-up': !card2}\"></i>\r\n                </a>\r\n            </div>\r\n            <h4 class=\"card-title m-b-0\">รายงานการสืบสวน</h4>\r\n        </div>\r\n        <div class=\"card-body\" *ngIf=\"card2\">\r\n\r\n            <div class=\"row form-group\">\r\n                <div class=\"col-lg-10 col-md-9 col-sm-8\"></div>\r\n                <div class=\"col-lg-2 col-md-3 col-sm-4\">\r\n                    <button type=\"button\" class=\"btn btn-block btn-themecolor\" [disabled]=\"showEditField\" (click)=\"onCreateInvestDetail()\">เพิ่มรายงาน</button>\r\n                </div>\r\n            </div>\r\n\r\n            <table class=\"table table-sm table-striped table-set-border\">\r\n                <thead>\r\n                    <tr>\r\n                        <th class=\"text-center\">ลำดับ</th>\r\n                        <th class=\"text-center\">ครั้งที่สืบสวน</th>\r\n                        <th>วันที่เริ่มสืบสวน</th>\r\n                        <th>วันที่สิ้นสุดการสืบสวน</th>\r\n                        <th>ผู้ดูแลการสืบสวน</th>\r\n                        <th>ผู้สั่งการ</th>\r\n                        <th></th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody formArrayName='InvestigateDetail'>\r\n                    <tr *ngFor=\"let item of InvestigateDetail.controls; let i=index;\" [formGroupName]='i'>\r\n                        <td class=\"text-center\">{{i+1}}</td>\r\n                        <td class=\"text-center\">{{item.get('InvestigateSeq').value}}</td>\r\n                        <td>\r\n                            {{toLocalShort(item.get('InvestigateDateStart').value)}}\r\n                        </td>\r\n                        <td>\r\n                            {{toLocalShort(item.get('InvestigateDateEnd').value)}}\r\n                        </td>\r\n                        <td>\r\n                            <div *ngFor=\"let staff of getInvestigateDetailStaff(item)\">\r\n                                {{staff.Investigator}}\r\n                            </div>\r\n                        </td>\r\n                        <td>\r\n                            <div *ngFor=\"let staff of getInvestigateDetailStaff(item)\">\r\n                                {{staff.Commander}}\r\n                            </div>\r\n                        </td>\r\n                        <td class=\"text-center\">\r\n                            <a href=\"javaScript:void(0);\" class=\"text-secondary\" (click)=\"onViewInvesDetail(item.get('InvestigateDetailID').value)\"\r\n                                *ngIf=\"!showEditField\">\r\n                                <i class=\"fa fa-eye fa-lg\"></i>\r\n                            </a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n</form>"

/***/ }),

/***/ "./src/app/pages/investigation/components/manage/manage.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_debounceTime__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/debounceTime.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/distinctUntilChanged.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services__ = __webpack_require__("./src/app/pages/investigation/services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_shared_header_navigation_navigation_service__ = __webpack_require__("./src/app/shared/header-navigation/navigation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_app_shared_sidebar_sidebar_component__ = __webpack_require__("./src/app/shared/sidebar/sidebar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_app_config_message__ = __webpack_require__("./src/app/config/message.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_app_config_dateFormat__ = __webpack_require__("./src/app/config/dateFormat.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__store__ = __webpack_require__("./src/app/pages/investigation/store/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ngrx_store__ = __webpack_require__("./node_modules/@ngrx/store/@ngrx/store.es5.js");
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
    function ManageComponent(router, fb, activeRoute, navService, ngbModel, sidebarService, s_invest, store) {
        var _this = this;
        this.router = router;
        this.fb = fb;
        this.activeRoute = activeRoute;
        this.navService = navService;
        this.ngbModel = ngbModel;
        this.sidebarService = sidebarService;
        this.s_invest = s_invest;
        this.store = store;
        this.card1 = true;
        this.card2 = true;
        this.destroy$ = new __WEBPACK_IMPORTED_MODULE_12_rxjs_Subject__["b" /* Subject */]();
        this.toLocalShort = __WEBPACK_IMPORTED_MODULE_11_app_config_dateFormat__["i" /* toLocalShort */];
        this.myDatePickerOptions = __WEBPACK_IMPORTED_MODULE_11_app_config_dateFormat__["a" /* MyDatePickerOptions */];
        this.clearFormArray = function (formArray) {
            while (formArray.length !== 0) {
                formArray.removeAt(0);
            }
        };
        // set false
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
        this.obInvest = store.select(function (s) { return s.invest; });
        this.obInvest
            .takeUntil(this.destroy$)
            .subscribe(function (x) { return _this.stateInvest = x; });
    }
    Object.defineProperty(ManageComponent.prototype, "InvestigateDetail", {
        get: function () {
            return this.investigateForm.get('InvestigateDetail');
        },
        enumerable: true,
        configurable: true
    });
    ManageComponent.prototype.getInvestigateDetailStaff = function (form) {
        return form.controls.InvestigateDetailStaff.value;
    };
    ManageComponent.prototype.ngOnInit = function () {
        this.sidebarService.setVersion(this.s_invest.version);
        this.active_Route();
        this.navigate_Service();
        this.createForm();
    };
    ManageComponent.prototype.createForm = function () {
        this.investigateForm = this.fb.group({
            InvestigateCode: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormControl */](this.investCode, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["m" /* Validators */].required),
            InvestigateNo: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["m" /* Validators */].required),
            DateStart: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["m" /* Validators */].required),
            DateEnd: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["m" /* Validators */].required),
            Subject: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormControl */](null),
            IsActive: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormControl */](1),
            InvestigateDetail: this.fb.array([])
        });
    };
    ManageComponent.prototype.active_Route = function () {
        var _this = this;
        this.activeRoute.params.takeUntil(this.destroy$).subscribe(function (p) {
            _this.mode = p['mode'];
            _this.investCode = p['code'];
            switch (_this.mode) {
                case 'C':
                    _this.enableBtnModeC();
                    break;
                case 'R':
                    _this.enableBtnModeR();
                    break;
            }
            _this.pageLoad();
        });
    };
    ManageComponent.prototype.enableBtnModeC = function () {
        // set false
        this.navService.setPrintButton(false);
        this.navService.setEditButton(false);
        this.navService.setDeleteButton(false);
        this.navService.setEditField(false);
        this.navService.setPrevPageButton(false);
        this.navService.setNextPageButton(false);
        // set true 
        this.navService.setSaveButton(true);
        this.navService.setCancelButton(true);
    };
    ManageComponent.prototype.enableBtnModeR = function () {
        // set false
        this.navService.setSaveButton(false);
        this.navService.setCancelButton(false);
        this.navService.setPrevPageButton(false);
        this.navService.setNextPageButton(false);
        // set true
        this.navService.setPrintButton(true);
        this.navService.setEditButton(true);
        this.navService.setDeleteButton(true);
        this.navService.setEditField(true);
    };
    ManageComponent.prototype.navigate_Service = function () {
        var _this = this;
        this.navService.showFieldEdit.takeUntil(this.destroy$).subscribe(function (p) {
            _this.showEditField = p;
        });
        this.navService.onCancel.takeUntil(this.destroy$).subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!status) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.navService.setOnCancel(false)];
                    case 1:
                        _a.sent();
                        switch (this.mode) {
                            case 'C':
                                this.router.navigate(['/investigation/list']);
                                break;
                            case 'R':
                                this.investigateForm.reset();
                                this.pageLoad();
                                break;
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
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
    };
    ManageComponent.prototype.onSave = function () {
        var f = this.investigateForm.value;
        if (this.investigateForm.invalid) {
            alert(__WEBPACK_IMPORTED_MODULE_10_app_config_message__["a" /* Message */].checkData);
            return;
        }
        if (!this.InvestigateDetail.length) {
            alert('ส่วนรายงานการสืบสวน ต้องมีอย่างน้อย 1 รายการ');
            return;
        }
        f.DateStart = Object(__WEBPACK_IMPORTED_MODULE_11_app_config_dateFormat__["d" /* getDateMyDatepicker */])(f.DateStart);
        f.DateEnd = Object(__WEBPACK_IMPORTED_MODULE_11_app_config_dateFormat__["d" /* getDateMyDatepicker */])(f.DateEnd);
        switch (this.mode) {
            case 'R':
                this.updateInvestigate(f);
                break;
        }
    };
    ManageComponent.prototype.pageLoad = function () {
        var _this = this;
        if (this.stateInvest) {
            this.pageRefreshInvestigate(this.stateInvest);
        }
        else {
            if (this.investCode == 'NEW')
                return;
            this.s_invest.InvestigategetByCon(this.investCode)
                .takeUntil(this.destroy$)
                .subscribe(function (x) {
                if (!_this.checkResponse(x))
                    return;
                _this.pageRefreshInvestigate(x[0]);
            });
        }
    };
    ManageComponent.prototype.pageRefreshInvestigate = function (x) {
        return __awaiter(this, void 0, void 0, function () {
            var investDetail;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        x.DateStart = Object(__WEBPACK_IMPORTED_MODULE_11_app_config_dateFormat__["e" /* setDateMyDatepicker */])(x.DateStart);
                        x.DateEnd = Object(__WEBPACK_IMPORTED_MODULE_11_app_config_dateFormat__["e" /* setDateMyDatepicker */])(x.DateEnd);
                        investDetail = x.InvestigateDetail;
                        if (!investDetail)
                            return [2 /*return*/];
                        return [4 /*yield*/, investDetail.map(function (id) {
                                var staff = id.InvestigateDetailStaff
                                    .filter(function (staff) { return staff.ContributorID == '2' || staff.ContributorID == '3'; })
                                    .map(function (staff) {
                                    switch (parseInt(staff.ContributorID)) {
                                        case 2:
                                            staff.Investigator = staff.TitleName + " " + staff.FirstName + " " + staff.LastName;
                                            break;
                                        case 3:
                                            staff.Commander = staff.TitleName + " " + staff.FirstName + " " + staff.LastName;
                                            break;
                                    }
                                    return staff;
                                });
                                id.InvestigateDetailStaff = staff;
                            })];
                    case 1:
                        _a.sent();
                        investDetail.sort(function (a, b) { if (a.InvestigateSeq < b.InvestigateSeq)
                            return -1; });
                        this.setItemFormArray(investDetail, 'InvestigateDetail');
                        this.investigateForm.patchValue(x);
                        return [2 /*return*/];
                }
            });
        });
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
                return true;
            default:
                return false;
        }
    };
    ManageComponent.prototype.onSDateChange = function (event) {
        this._dateStartFrom = event;
        this._dateStartTo = this._dateStartTo || this.investigateForm.value.DateEnd;
        this.checkDate();
    };
    ManageComponent.prototype.onEDateChange = function (event) {
        this._dateStartFrom = this._dateStartFrom || this.investigateForm.value.DateStart;
        this._dateStartTo = event;
        this.checkDate();
    };
    ManageComponent.prototype.checkDate = function () {
        var _this = this;
        if (this._dateStartFrom && this._dateStartTo) {
            var sdate = Object(__WEBPACK_IMPORTED_MODULE_11_app_config_dateFormat__["d" /* getDateMyDatepicker */])(this._dateStartFrom);
            var edate = Object(__WEBPACK_IMPORTED_MODULE_11_app_config_dateFormat__["d" /* getDateMyDatepicker */])(this._dateStartTo);
            if (!Object(__WEBPACK_IMPORTED_MODULE_11_app_config_dateFormat__["b" /* compareDate */])(sdate, edate)) {
                alert(__WEBPACK_IMPORTED_MODULE_10_app_config_message__["a" /* Message */].checkDate);
                setTimeout(function () {
                    _this.investigateForm.patchValue({
                        DateEnd: Object(__WEBPACK_IMPORTED_MODULE_11_app_config_dateFormat__["e" /* setDateMyDatepicker */])(_this._dateStartFrom)
                    });
                }, 0);
            }
        }
    };
    ManageComponent.prototype.onCreateInvestDetail = function () {
        var invest = this.investigateForm.value;
        invest.DateStart = Object(__WEBPACK_IMPORTED_MODULE_11_app_config_dateFormat__["d" /* getDateMyDatepicker */])(invest.DateStart);
        invest.DateEnd = Object(__WEBPACK_IMPORTED_MODULE_11_app_config_dateFormat__["d" /* getDateMyDatepicker */])(invest.DateEnd);
        this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_13__store__["a" /* CreateInvestigate */](invest));
        this.router.navigate(["investigation/detail-manage", 'C'], {
            queryParams: {
                investMode: this.mode,
                investCode: this.investCode
            }
        });
    };
    ManageComponent.prototype.onViewInvesDetail = function (invesDetailId) {
        this.router.navigate(["investigation/detail-manage", 'R'], {
            queryParams: {
                investMode: this.mode,
                investCode: this.investCode,
                invesDetailId: invesDetailId
            }
        });
    };
    ManageComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
        this.investigateForm.reset();
        this.clearFormArray(this.InvestigateDetail);
        this.navService.setOnEdit(false);
        this.navService.setOnSave(false);
        this.navService.setOnDelete(false);
        this.navService.setOnCancel(false);
        this.navService.setOnSearch(false);
        this.navService.setOnPrint(false);
        this.navService.setOnNextPage(false);
        this.navService.setOnPrevPage(false);
        this.navService.setEditField(false);
        this.navService.setSearchBar(false);
        this.navService.setPrintButton(false);
        this.navService.setEditButton(false);
        this.navService.setDeleteButton(false);
        this.navService.setSaveButton(false);
        this.navService.setCancelButton(false);
        this.navService.setNewButton(false);
        this.navService.setNextPageButton(false);
        this.navService.setPrevPageButton(false);
    };
    ManageComponent.prototype.catchError = function (error) {
        console.log(error);
        alert(__WEBPACK_IMPORTED_MODULE_10_app_config_message__["a" /* Message */].saveFail);
    };
    ManageComponent.prototype.setItemFormArray = function (array, formControl) {
        var _this = this;
        if (array !== undefined && array.length) {
            var itemFGs = array.map(function (item) { return _this.fb.group(item); });
            var itemFormArray = this.fb.array(itemFGs);
            this.investigateForm.setControl(formControl, itemFormArray);
        }
    };
    ManageComponent.prototype.onDelete = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.s_invest.InvestigateupdDelete(this.investCode)
                    .takeUntil(this.destroy$)
                    .subscribe(function (x) {
                    if (_this.checkIsSuccess(x)) {
                        alert(__WEBPACK_IMPORTED_MODULE_10_app_config_message__["a" /* Message */].delComplete);
                        _this.router.navigate(['/investigation/list']);
                    }
                    else {
                        alert(__WEBPACK_IMPORTED_MODULE_10_app_config_message__["a" /* Message */].delFail);
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    ManageComponent.prototype.updateInvestigate = function (form) {
        var _this = this;
        var invest = {
            InvestigateCode: form.InvestigateCode,
            InvestigateNo: form.InvestigateNo,
            DateStart: form.DateStart,
            DateEnd: form.DateEnd,
            Subject: form.Subject,
            IsActive: form.IsActive
        };
        console.log("InvestigateupdAll : ", JSON.stringify(invest));
        this.s_invest.InvestigateupdAll(invest)
            .takeUntil(this.destroy$)
            .subscribe(function (x) {
            if (!_this.checkIsSuccess(x)) {
                alert(__WEBPACK_IMPORTED_MODULE_10_app_config_message__["a" /* Message */].saveFail);
                return;
            }
            alert(__WEBPACK_IMPORTED_MODULE_10_app_config_message__["a" /* Message */].saveComplete);
            _this.router.navigate(['/investigation/manage', _this.mode, _this.investCode]);
        }, function (error) { return _this.catchError(error); });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('printDocModal'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], ManageComponent.prototype, "printDocModel", void 0);
    ManageComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-manage',
            template: __webpack_require__("./src/app/pages/investigation/components/manage/manage.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_8_app_shared_header_navigation_navigation_service__["a" /* NavigationService */],
            __WEBPACK_IMPORTED_MODULE_6__ng_bootstrap_ng_bootstrap__["d" /* NgbModal */],
            __WEBPACK_IMPORTED_MODULE_9_app_shared_sidebar_sidebar_component__["b" /* SidebarService */], __WEBPACK_IMPORTED_MODULE_7__services__["d" /* InvestgateService */], __WEBPACK_IMPORTED_MODULE_14__ngrx_store__["a" /* Store */]])
    ], ManageComponent);
    return ManageComponent;
}());



/***/ }),

/***/ "./src/app/pages/investigation/components/printdoc-modal/printdoc-modal.component.html":
/***/ (function(module, exports) {

module.exports = "<form action=\"\" #form=\"ngForm\" (ngSubmit)=\"onPrint(form)\">\r\n    <div class=\"modal-header bg-theme\">\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-5\">\r\n                <h4 class=\"modal-title text-white\">พิมพ์เอกสาร</h4>\r\n            </div>\r\n            <a href=\"javaScript:void(0);\" class=\"close text-white font-14\" aria-label=\"Close\" (click)=\"dismiss('Cross click')\">\r\n                <span aria-hidden=\"true\">\r\n                    <i class=\" ti-close\"></i>\r\n                </span>\r\n            </a>\r\n        </div>\r\n    </div>\r\n    <div class=\"modal-body font-14\">\r\n\r\n        <div class=\"table-responsive\">\r\n            <table class=\"table table-sm table-striped table-set-border\">\r\n                <thead>\r\n                    <tr>\r\n                        <th></th>\r\n                        <th class=\"text-center\">ลำดับ</th>\r\n                        <th>ชื่อเอกสาร</th>\r\n                        <th>ประเภทเอกสาร</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr *ngFor=\"let item of investDetail; let i=index;\">\r\n                        <td class=\"text-center\">\r\n                            <input type=\"hidden\" name=\"InvestigateDetailID\" [(ngModel)]=\"item.InvestigateDetailID\">\r\n                            <input type=\"checkbox\" [id]=\"'td'+i\" name=\"checking\" ngModel class=\"filled-in chk-col-indigo\">\r\n                            <label [for]=\"'td'+i\" class=\"m-0\"></label>\r\n                        </td>\r\n                        <td class=\"text-center\">{{i+1}}</td>\r\n                        <td>รายงานการ{{item.InvestigateDetail}}</td>\r\n                        <td></td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <div class=\"col-lg-2 col-4\">\r\n            <button type=\"submit\" class=\"btn btn-block btn-themecolor\">พิมพ์</button>\r\n        </div>\r\n    </div>\r\n</form>"

/***/ }),

/***/ "./src/app/pages/investigation/components/printdoc-modal/printdoc-modal.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/investigation/components/printdoc-modal/printdoc-modal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrintdocModalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PrintdocModalComponent = /** @class */ (function () {
    function PrintdocModalComponent(
    // private investService: InvestigateService,
    fb) {
        this.fb = fb;
        this.d = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.c = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
    }
    PrintdocModalComponent.prototype.ngOnInit = function () {
        // this.createFrom();
        // this.investService.detailGetByCon(this.investCode).then(result => {
        //     this.investDetail = new Array<InvestigateDetail>();
        //     this.investDetail = result;
        //     // this.setInvestDetail(result);
        // })
    };
    PrintdocModalComponent.prototype.createFrom = function () {
        this.investigate = this.fb.group({
            InvestigateDetail: this.fb.array([])
        });
    };
    // get InvestigateDetail(): FormArray {
    //     return this.investigate.get('InvestigateDetail') as FormArray;
    // }
    // setInvestDetail(detail: InvestigateDetail[]) {
    //     if (detail) {
    //         const detailFGs = detail.map(item => this.fb.group(item));
    //         const detailFormArray = this.fb.array(detailFGs);
    //         this.investigate.setControl('InvestigateDetail', detailFormArray);
    //     }
    // }
    PrintdocModalComponent.prototype.onPrint = function (form) {
        console.log(form.value);
        this.close('Save click');
    };
    PrintdocModalComponent.prototype.dismiss = function (e) {
        this.d.emit(e);
    };
    PrintdocModalComponent.prototype.close = function (e) {
        this.c.emit(e);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", String)
    ], PrintdocModalComponent.prototype, "investCode", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
        __metadata("design:type", Object)
    ], PrintdocModalComponent.prototype, "d", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
        __metadata("design:type", Object)
    ], PrintdocModalComponent.prototype, "c", void 0);
    PrintdocModalComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-printdoc-modal',
            template: __webpack_require__("./src/app/pages/investigation/components/printdoc-modal/printdoc-modal.component.html"),
            styles: [__webpack_require__("./src/app/pages/investigation/components/printdoc-modal/printdoc-modal.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */]])
    ], PrintdocModalComponent);
    return PrintdocModalComponent;
}());



/***/ }),

/***/ "./src/app/pages/investigation/components/suspect-modal/suspect-modal.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header bg-theme\">\r\n  <div class=\"row\">\r\n    <div class=\"col-lg-5\">\r\n      <h4 class=\"modal-title text-white\">เพิ่มผู้ต้องหา\r\n        <a class=\"btn btn-ghost\" [routerLink]=\"['/investigation/suspect', 'C', 'NEW']\" target=\"_blank\">\r\n          <i class=\"ti-plus\"></i>\r\n          สร้างข้อมูล\r\n        </a>\r\n      </h4>\r\n    </div>\r\n    <div class=\"col-lg-5 col-8\">\r\n      <form autocomplete=\"off\" class=\"app-search\" #searchFrom=\"ngForm\" (ngSubmit)=\"onSearchByKey(searchFrom.value)\">\r\n        <input type=\"search\" name=\"TextSearch\" ngModel class=\"form-control form-control-sm\">\r\n        <a class=\"srh-btn\" (click)=\"onSearchByKey(searchFrom.value)\" href=\"javaScript:void(0)\">\r\n          <i class=\"ti-search\"></i>\r\n        </a>\r\n      </form>\r\n    </div>\r\n    <div class=\"col-lg-2 col-4 p-0\">\r\n      <a href=\"javaScript:void(0);\" class=\"text-white\" (click)=\"advSearch = !advSearch\">ค้นหาขั้นสูง</a>\r\n    </div>\r\n\r\n    <a href=\"javaScript:void(0);\" class=\"close text-white font-14\" aria-label=\"Close\" (click)=\"dismiss('Cross click')\">\r\n      <span aria-hidden=\"true\">\r\n        <i class=\" ti-close\"></i>\r\n      </span>\r\n    </a>\r\n  </div>\r\n</div>\r\n<h5 class=\"text-right mt-3 pr-3\">ILG60-01-03-01-00</h5>\r\n<div class=\"modal-body font-14\">\r\n  <div *ngIf=\"advSearch\">\r\n    <div class=\"card card-outline-bluish unset-radius m-b-15\">\r\n      <div class=\"card-header unset-radius\">\r\n        <div class=\"card-actions\">\r\n          <a class=\"\" (click)=\"advSearch = false\">\r\n            <i class=\"fa fa-times\"></i>\r\n          </a>\r\n        </div>\r\n        <h4 class=\"card-title m-b-0\">ค้นหาขั้นสูง</h4>\r\n      </div>\r\n      <div class=\"card-body\">\r\n        <form class=\"form-horizontal\" #advForm=\"ngForm\" (ngSubmit)=\"onSearchAdv(advForm.value)\">\r\n          <div class=\"row\">\r\n            <label for=\"\" class=\"col-lg-2 col-sm-4\">ประเภทผู้ต้องหา :</label>\r\n            <div class=\"col-lg-4 col-sm-8 form-group\">\r\n              <select name=\"EntityType\" ngModel class=\"form-control form-control-sm\">\r\n                <option value=\"\" selected disabled></option>\r\n                <option *ngFor=\"let item of entityType\" [value]=\"item.value\">{{item.text}}</option>\r\n              </select>\r\n            </div>\r\n\r\n            <label for=\"\" class=\"col-lg-2 col-sm-4\">ประเภทบุคคล :</label>\r\n            <div class=\"col-lg-4 col-sm-8 form-group\">\r\n              <select name=\"SuspectType\" ngModel class=\"form-control form-control-sm\">\r\n                <option value=\"\" selected disabled></option>\r\n                <option *ngFor=\"let item of lawbreakerType\" [value]=\"item.value\">{{item.text}}</option>\r\n              </select>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <label for=\"\" class=\"col-lg-2 col-sm-4\">เลขบัตรประชาชน :</label>\r\n            <div class=\"col-lg-4 col-sm-8 form-group\">\r\n              <input type=\"text\" name=\"IDCard\" ngModel class=\"form-control form-control-sm\">\r\n            </div>\r\n            <label for=\"\" class=\"col-lg-2 col-sm-4\">เลขหนังสือเดินทาง :</label>\r\n            <div class=\"col-lg-4 col-sm-8 form-group\">\r\n              <input type=\"text\" name=\"PassportNo\" ngModel class=\"form-control form-control-sm\">\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <label for=\"\" class=\"col-lg-2 col-sm-4\">เลขนิติบุคคล :</label>\r\n            <div class=\"col-lg-4 col-sm-8 form-group\">\r\n              <input type=\"text\" name=\"CompanyRegistrationNo\" ngModel class=\"form-control form-control-sm\">\r\n            </div>\r\n            <label for=\"\" class=\"col-lg-2 col-sm-4\">ชื่อสถานที่ประกอบการ :</label>\r\n            <div class=\"col-lg-4 col-sm-8 form-group\">\r\n              <input type=\"text\" name=\"CompanyName\" ngModel class=\"form-control form-control-sm\">\r\n            </div>\r\n            <label for=\"\" class=\"col-lg-2 col-sm-4\">ชื่อผู้ต้องสงสัย :</label>\r\n            <div class=\"col-lg-4 col-sm-8 form-group\">\r\n              <input #fname type=\"text\" name=\"SuspectName\" class=\"form-control form-control-sm\">\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-lg-10 col-sm-8\"></div>\r\n            <div class=\"col-lg-2 col-sm-4\">\r\n              <button type=\"submit\" class=\"btn btn-block btn-themecolor\">ค้นข้อมูล</button>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div [formGroup]=\"FG\">\r\n    <div class=\"card unset-radius m-b-15\">\r\n      <div class=\"card-body p-0\">\r\n        <div class=\"table-responsive\">\r\n          <table id=\"suspectModal\" #suspectModal class=\"table table-sm table-striped\">\r\n            <thead>\r\n              <tr>\r\n                <th></th>\r\n                <th class=\"text-center\">ลำดับ</th>\r\n                <th>ประเภทผู้ต้องหา</th>\r\n                <th>ประเภทบุคคล</th>\r\n                <th>หมายเลขอ้างอิง</th>\r\n                <th>ชื่อ</th>\r\n                <th>จำนวนครั้งการกระทำผิด</th>\r\n              </tr>\r\n            </thead>\r\n            <tbody formArrayName=\"Suspect\">\r\n              <tr *ngFor=\"let item of Suspect.controls; let i=index;\" [formGroupName]=\"i\">\r\n                <td class=\"text-center\">\r\n                  <input name=\"IsChecked\" formControlName=\"IsChecked\" type=\"radio\" id=\"td{{i}}\" [checked]=\"!item.get('IsChecked').value\"\r\n                    class=\"with-gap radio-col-indigo\" (change)=\"setIsChecked(i)\">\r\n                  <label for=\"td{{i}}\" class=\"m-0\"></label>\r\n                </td>\r\n                <td class=\"text-center\">{{item.get('RowId').value}}</td>\r\n                <td>{{item.get('SuspectTypeName').value}}</td>\r\n                <td>{{item.get('EntityTypeName').value}}</td>\r\n                <td>{{item.get('ReferenceID').value}}</td>\r\n                <td>{{item.get('FullName').value}}</td>\r\n                <td class=\"text-center\">{{item.get('ResultCount').value}}</td>\r\n                <td class=\"text-center\">\r\n                  <div *ngIf=\"item.get('ResultCount').value != null; else elseTempate\">\r\n                    <a class=\"text-center text-secondary\" [routerLink]=\"['/investigation/lawbreaker', 'R', item.value.SuspectID]\"\r\n                      target=\"_blank\">\r\n                      <i class=\"fa fa-eye fa-lg\"></i>\r\n                    </a>\r\n                  </div>\r\n                  <ng-template #elseTempate>\r\n                    <a class=\"text-center text-secondary\" [routerLink]=\"['/investigation/suspect', 'R', item.value.SuspectID]\"\r\n                      target=\"_blank\">\r\n                      <i class=\"fa fa-eye fa-lg\"></i>\r\n                    </a>\r\n                  </ng-template>\r\n                </td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      </div>\r\n      <div class=\"card-footer card-footer-unset\">\r\n        <app-pagination-table [TotalItems]=\"paginage.TotalItems\" [CurrentPage]=\"paginage.CurrentPage\" [PageSize]=\"paginage.PageSize\"\r\n          [RowsPerPageOptions]=\"paginage.RowsPerPageOptions\" (onPageChange)=\"pageChanges($event)\">\r\n        </app-pagination-table>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"modal-footer\">\r\n  <div class=\"col-lg-2 col-4\">\r\n    <button type=\"button\" class=\"btn btn-block btn-themecolor\" (click)=\"close('Save click')\">เลือก</button>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/pages/investigation/components/suspect-modal/suspect-modal.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/investigation/components/suspect-modal/suspect-modal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SuspectModalComponent; });
/* harmony export (immutable) */ __webpack_exports__["b"] = setViewSuspect;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_models_drop_downs_model__ = __webpack_require__("./src/app/models/drop-downs.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__("./src/app/pages/investigation/services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_pages_arrests_models__ = __webpack_require__("./src/app/pages/arrests/models/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_config_pagination__ = __webpack_require__("./src/app/config/pagination.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_config_message__ = __webpack_require__("./src/app/config/message.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_core_loader_loader_service__ = __webpack_require__("./src/app/core/loader/loader.service.ts");
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};









var SEARCHWITH = {
    ADVANCE: 'adv',
    KEYWORD: 'key'
};
var SuspectModalComponent = /** @class */ (function () {
    function SuspectModalComponent(s_masSuspect, s_masLawbreaker, loaderService, s_invest, fb) {
        this.s_masSuspect = s_masSuspect;
        this.s_masLawbreaker = s_masLawbreaker;
        this.loaderService = loaderService;
        this.s_invest = s_invest;
        this.fb = fb;
        this.destroy$ = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["b" /* Subject */]();
        this.ACCEPTABILITY = __WEBPACK_IMPORTED_MODULE_4_app_pages_arrests_models__["a" /* Acceptability */];
        this.paginage = __WEBPACK_IMPORTED_MODULE_5_app_config_pagination__["a" /* pagination */];
        this.lawbreakerType = __WEBPACK_IMPORTED_MODULE_1_app_models_drop_downs_model__["g" /* LawbreakerTypes */];
        this.entityType = __WEBPACK_IMPORTED_MODULE_1_app_models_drop_downs_model__["e" /* EntityTypes */];
        this.suspect = new Array();
        this.card1 = true;
        this.d = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.c = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.OutputSuspect = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.renameProp = function (oldProp, newProp, _a) {
            var _b = oldProp, old = _a[_b], others = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
            var _c;
            return __assign((_c = {}, _c[newProp] = old, _c), others);
        };
    }
    Object.defineProperty(SuspectModalComponent.prototype, "Suspect", {
        get: function () {
            return this.FG.get('Suspect');
        },
        enumerable: true,
        configurable: true
    });
    SuspectModalComponent.prototype.ngOnInit = function () {
        this.FG = this.fb.group({
            Suspect: this.fb.array([])
        });
    };
    SuspectModalComponent.prototype.ngOnDestroy = function () {
        this.paginage.TotalItems = 0;
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    };
    SuspectModalComponent.prototype.dismiss = function (e) {
        this.d.emit(e);
    };
    // onSearchAdv(f: any) {
    //   this.s_masSuspect.InvestigateMasSuspectgetByConAdv(f)
    //     .takeUntil(this.destroy$)
    //     .subscribe(x => this.onSearchComplete(x));
    // }
    // onSearchByKey(f: any) {
    //   this.loaderService.show();
    //   this.s_masLawbreaker.InvestigateMasLawbreakergetByKeyword(f)
    //     .then((x: fromModels.InvestigateMasLawbreakerModel[]) => {
    //       if (this.checkResponse(x)) {
    //         x.map(async l => {
    //           await this.s_invest.InvestigateLawsuitResultCountgetByLawbreakerID(l.LawbreakerID.toString())
    //             .then(law => {
    //               if (!this.checkResponse(law)) return;
    //               l.ResultCount = law.ResultCount;
    //               return l;
    //             });
    //         })
    //       };
    //       this.s_masSuspect.InvestigateMasSuspectgetByKeyword(f)
    //         .then(sus => {
    //         })
    //     })
    //   // this.s_masSuspect.InvestigateMasSuspectgetByKeyword(f)
    //   //   .takeUntil(this.destroy$)
    //   //   .subscribe(x => this.onSearchComplete(x));
    //   this.loaderService.hide();
    // }
    SuspectModalComponent.prototype.onSearchComplete = function (list) {
        return __awaiter(this, void 0, void 0, function () {
            var law;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!list.length) {
                            alert(__WEBPACK_IMPORTED_MODULE_6_app_config_message__["a" /* Message */].noRecord);
                            return [2 /*return*/];
                        }
                        law = [];
                        return [4 /*yield*/, list.filter(function (item) { return item.IsActive == 1; })
                                .map(function (item, i) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    item.IsActive = 1;
                                    item.RowId = i + 1;
                                    item.IsChecked = __WEBPACK_IMPORTED_MODULE_4_app_pages_arrests_models__["a" /* Acceptability */].INACCEPTABLE;
                                    law.push(setViewSuspect(item));
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        this.suspect = law;
                        // set total record
                        this.paginage.TotalItems = law.length;
                        return [2 /*return*/];
                }
            });
        });
    };
    SuspectModalComponent.prototype.onSearchByKey = function (form) {
        return __awaiter(this, void 0, void 0, function () {
            var one;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loaderService.show();
                        one = new Promise(function (resolve, reject) {
                            resolve(_this.response(SEARCHWITH.KEYWORD, form));
                        });
                        return [4 /*yield*/, one.then(function (x) { return _this.onSearchComplete(x); })];
                    case 1:
                        _a.sent();
                        this.loaderService.hide();
                        return [2 /*return*/];
                }
            });
        });
    };
    SuspectModalComponent.prototype.onSearchAdv = function (form) {
        return __awaiter(this, void 0, void 0, function () {
            var one;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loaderService.show();
                        one = new Promise(function (resolve, reject) {
                            resolve(_this.response(SEARCHWITH.ADVANCE, form));
                        });
                        return [4 /*yield*/, one.then(function (x) { return _this.onSearchComplete(x); })];
                    case 1:
                        _a.sent();
                        this.loaderService.hide();
                        return [2 /*return*/];
                }
            });
        });
    };
    SuspectModalComponent.prototype.response = function (searchWith, form) {
        return __awaiter(this, void 0, void 0, function () {
            var lawbreaker, suspect, _a, response;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = searchWith;
                        switch (_a) {
                            case SEARCHWITH.KEYWORD: return [3 /*break*/, 1];
                            case SEARCHWITH.ADVANCE: return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 7];
                    case 1: return [4 /*yield*/, this.s_masLawbreaker.InvestigateMasLawbreakergetByKeyword(form)
                            .then(function (x) {
                            if (!_this.checkResponse(x))
                                return [];
                            return x;
                        })];
                    case 2:
                        lawbreaker = _b.sent();
                        return [4 /*yield*/, this.s_masSuspect.InvestigateMasSuspectgetByKeyword(form)
                                .then(function (x) {
                                if (!_this.checkResponse(x))
                                    return [];
                                return x;
                            })];
                    case 3:
                        suspect = _b.sent();
                        return [3 /*break*/, 7];
                    case 4: return [4 /*yield*/, this.s_masLawbreaker.InvestigateMasLawbreakergetByConAdv(form)
                            .then(function (x) {
                            if (!_this.checkResponse(x))
                                return [];
                            return x;
                        })];
                    case 5:
                        lawbreaker = _b.sent();
                        return [4 /*yield*/, this.s_masSuspect.InvestigateMasSuspectgetByConAdv(form)
                                .then(function (x) {
                                if (!_this.checkResponse(x))
                                    return [];
                                return x;
                            })];
                    case 6:
                        suspect = _b.sent();
                        return [3 /*break*/, 7];
                    case 7:
                        response = [];
                        if (!lawbreaker.length) return [3 /*break*/, 9];
                        return [4 /*yield*/, lawbreaker.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                var obj;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.s_invest
                                                .InvestigateLawsuitResultCountgetByLawbreakerID(item.LawbreakerID.toString())
                                                .then(function (x) {
                                                if (!_this.checkResponse(x))
                                                    return;
                                                item.ResultCount = x.ResultCount;
                                            })];
                                        case 1:
                                            _a.sent();
                                            obj = item;
                                            obj = this.renameProp('LawbreakerID', 'SuspectID', obj);
                                            obj = this.renameProp('LawbreakerType', 'SuspectType', obj);
                                            obj = this.renameProp('LawbreakerTitleCode', 'SuspectTitleCode', obj);
                                            obj = this.renameProp('LawbreakerTitleName', 'SuspectTitleName', obj);
                                            obj = this.renameProp('LawbreakerFirstName', 'SuspectFirstName', obj);
                                            obj = this.renameProp('LawbreakerMiddleName', 'SuspectMiddleName', obj);
                                            obj = this.renameProp('LawbreakerLastName', 'SuspectLastName', obj);
                                            obj = this.renameProp('LawbreakerOtherName', 'SuspectOtherName', obj);
                                            obj = this.renameProp('LawbreakerDesc', 'SuspectDesc', obj);
                                            obj = setViewSuspect(obj);
                                            return [2 /*return*/, obj];
                                    }
                                });
                            }); })];
                    case 8:
                        response = _b.sent();
                        _b.label = 9;
                    case 9:
                        if (!suspect.length) return [3 /*break*/, 11];
                        return [4 /*yield*/, suspect.map(function (item) {
                                item.ResultCount = null;
                                var obj = item;
                                switch (item.EntityType) {
                                    case 1: // บุคคลธรรมดา
                                        switch (item.SuspectType) {
                                            case 0: // ต่างชาติ
                                                var type0 = response.filter(function (x) { return x.PassportNo == obj.PassportNo; });
                                                if (!type0.length) {
                                                    obj = setViewSuspect(obj);
                                                    response.push(obj);
                                                }
                                                ;
                                                break;
                                            case 1: // ชาวไทย
                                                var type1 = response.filter(function (x) { return x.IDCard == obj.IDCard; });
                                                if (!type1.length) {
                                                    obj = setViewSuspect(obj);
                                                    response.push(obj);
                                                }
                                                ;
                                                break;
                                        }
                                    case 2: // นิติบุคคล
                                        var entity2 = response.filter(function (x) { return x.CompanyRegistrationNo == obj.CompanyRegistrationNo; });
                                        if (!entity2.length) {
                                            obj = setViewSuspect(obj);
                                            response.push(obj);
                                        }
                                        ;
                                        break;
                                }
                            })];
                    case 10:
                        _b.sent();
                        _b.label = 11;
                    case 11: return [2 /*return*/, Promise.all(response)];
                }
            });
        });
    };
    SuspectModalComponent.prototype.checkResponse = function (res) {
        switch (res.IsSuccess) {
            case 'False':
            case false:
                return false;
            default:
                return true;
        }
    };
    SuspectModalComponent.prototype.setIsChecked = function (i) {
        var law = this.Suspect;
        law.value.map(function (item, index) {
            item.IsChecked = (i == index) ? __WEBPACK_IMPORTED_MODULE_4_app_pages_arrests_models__["a" /* Acceptability */].ACCEPTABLE : __WEBPACK_IMPORTED_MODULE_4_app_pages_arrests_models__["a" /* Acceptability */].INACCEPTABLE;
        });
    };
    SuspectModalComponent.prototype.setItemFormArray = function (array, formControl) {
        var _this = this;
        if (array !== undefined && array.length) {
            var itemFGs = array.map(function (item) { return _this.fb.group(item); });
            var itemFormArray = this.fb.array(itemFGs);
            this.FG.setControl(formControl, itemFormArray);
        }
    };
    SuspectModalComponent.prototype.pageChanges = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.suspect.slice(event.startIndex - 1, event.endIndex)];
                    case 1:
                        list = _a.sent();
                        this.setItemFormArray(list, 'Suspect');
                        return [2 /*return*/];
                }
            });
        });
    };
    SuspectModalComponent.prototype.closeLawbreakerDetail = function () {
        var law = this.Suspect;
        law.value.map(function (item) { return item.IsChecked = __WEBPACK_IMPORTED_MODULE_4_app_pages_arrests_models__["a" /* Acceptability */].INACCEPTABLE; });
        law.patchValue(law.value);
    };
    SuspectModalComponent.prototype.close = function (e) {
        var _a;
        var law = this.Suspect.value
            .filter(function (x) { return x.IsChecked == __WEBPACK_IMPORTED_MODULE_4_app_pages_arrests_models__["a" /* Acceptability */].ACCEPTABLE; });
        if (!law)
            return;
        (_a = this.OutputSuspect).emit.apply(_a, law);
        this.c.emit(e);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
        __metadata("design:type", Object)
    ], SuspectModalComponent.prototype, "d", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
        __metadata("design:type", Object)
    ], SuspectModalComponent.prototype, "c", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
        __metadata("design:type", Object)
    ], SuspectModalComponent.prototype, "OutputSuspect", void 0);
    SuspectModalComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-suspect-modal',
            template: __webpack_require__("./src/app/pages/investigation/components/suspect-modal/suspect-modal.component.html"),
            styles: [__webpack_require__("./src/app/pages/investigation/components/suspect-modal/suspect-modal.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services__["c" /* InvestgateMasSuspectService */], __WEBPACK_IMPORTED_MODULE_2__services__["b" /* InvestgateMasLawbreakerService */], __WEBPACK_IMPORTED_MODULE_8_app_core_loader_loader_service__["a" /* LoaderService */], __WEBPACK_IMPORTED_MODULE_2__services__["d" /* InvestgateService */], __WEBPACK_IMPORTED_MODULE_7__angular_forms__["c" /* FormBuilder */]])
    ], SuspectModalComponent);
    return SuspectModalComponent;
}());

function setViewSuspect(item) {
    item.SuspectTypeName = __WEBPACK_IMPORTED_MODULE_1_app_models_drop_downs_model__["g" /* LawbreakerTypes */].find(function (key) { return parseInt(key.value) == item.SuspectType; }).text;
    item.EntityType = item.EntityType;
    item.EntityTypeName = __WEBPACK_IMPORTED_MODULE_1_app_models_drop_downs_model__["e" /* EntityTypes */].find(function (key) { return parseInt(key.value) == item.EntityType; }).text;
    item.SuspectReferenceID = item.SuspectID;
    item.FullName = "" + (item.SuspectTitleName || '');
    item.FullName += " " + (item.SuspectFirstName || '');
    item.FullName += " " + (item.SuspectLastName || '');
    switch (item.EntityType) {
        case 1: // บุคคลธรรมดา
            switch (item.SuspectType) {
                case 0: // ต่างชาติ
                    item.ReferenceID = item.PassportNo;
                    break;
                case 1: // ชาวไทย
                    item.ReferenceID = item.IDCard;
                    break;
            }
            break;
        case 2: // นิติบุคคล
            item.ReferenceID = item.CompanyRegistrationNo;
            break;
    }
    return item;
}


/***/ }),

/***/ "./src/app/pages/investigation/components/suspect/suspect.component.html":
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"SuspectFG\">\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header unset-radius\">\r\n            <div class=\"card-actions\">\r\n                <a class=\"\" (click)=\"card1 = !card1\">\r\n                    <i class=\"fa\" [ngClass]=\"{'fa-chevron-down': card1, 'fa-chevron-up': !card1}\"></i>\r\n                </a>\r\n            </div>\r\n            <h4 class=\"card-title m-b-0\">ข้อมูลส่วนต้ว</h4>\r\n        </div>\r\n        <div class=\"card-body\" *ngIf=\"card1\">\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ประเภทผู้ต้องสงสัย :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <select formControlName=\"SuspectType\" class=\"form-control form-control-sm\"\r\n                        [ngClass]=\"{'ng-touched':isRequired}\" [attr.disabled]=\"showEditField ? '' : null\" required\r\n                        (change)=\"toggleCard()\">\r\n                        <option value=\"\" selected disabled></option>\r\n                        <option *ngFor=\"let item of suspectTypes; let i=index;\" [value]=\"item.value\">{{item.text}}</option>\r\n                    </select>\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ประเภทบุคคล :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <select formControlName=\"EntityType\" class=\"form-control form-control-sm\" [ngClass]=\"{'ng-touched':isRequired}\"\r\n                        [attr.disabled]=\"showEditField ? '' : null\" required (change)=\"toggleCard()\">\r\n                        <option value=\"\" selected disabled></option>\r\n                        <option *ngFor=\"let item of entityTypes; let i=index;\" [value]=\"item.value\">{{item.text}}</option>\r\n                    </select>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">เลขบัตรประชาชน :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"IDCard\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">คำนำหน้าชื่อ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <select formControlName=\"SuspectTitleCode\" class=\"form-control form-control-sm\" [attr.disabled]=\"showEditField ? '' : null\">\r\n                        <option value=\"\" selected disabled></option>\r\n                        <option *ngFor=\"let item of typeheadTitleNames; let i=index;\" [value]=\"item.TitleCode\">{{item.TitleNameTH}}</option>\r\n                    </select>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ชื่อจริง :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"SuspectFirstName\" class=\"form-control form-control-sm\"\r\n                        [readonly]=\"showEditField\">\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">นามสกุล :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"SuspectLastName\" class=\"form-control form-control-sm\"\r\n                        [readonly]=\"showEditField\">\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ชื่ออื่น :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"SuspectOtherName\" class=\"form-control form-control-sm\"\r\n                        [readonly]=\"showEditField\">\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">วันเกิด :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <my-date-picker-th formControlName=\"BirthDate\" [options]=\"myDatePickerOptions\" [disabled]=\"showEditField\"></my-date-picker-th>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">กรุ๊ปเลือด :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <select formControlName=\"BloodType\" class=\"form-control form-control-sm\" [attr.disabled]=\"showEditField ? '' : null\">\r\n                        <option value=\"\" selected disabled></option>\r\n                        <option *ngFor=\"let item of bloodTypes; let i=index;\" [value]=\"item.value\">{{item.text}}</option>\r\n                    </select>\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">สัญชาติ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <select formControlName=\"NationalityCode\" class=\"form-control form-control-sm\" [attr.disabled]=\"showEditField ? '' : null\">\r\n                        <option value=\"\" selected disabled></option>\r\n                        <option *ngFor=\"let item of typeheadNationality; let i=index;\" [value]=\"item.NationalityCode\">{{item.NationalityNameTh}}</option>\r\n                    </select>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">เชื่อชาติ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <select #race formControlName=\"RaceCode\" class=\"form-control form-control-sm\" [attr.disabled]=\"showEditField ? '' : null\">\r\n                        <option value=\"\" selected disabled></option>\r\n                        <option *ngFor=\"let item of typeheadRaces; let i=index;\" [value]=\"item.RaceCode\">{{item.RaceNameTH}}</option>\r\n                    </select>\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ศาสนา :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <select formControlName=\"ReligionCode\" class=\"form-control form-control-sm\" [attr.disabled]=\"showEditField ? '' : null\">\r\n                        <option value=\"\" selected disabled></option>\r\n                        <option *ngFor=\"let item of typeheadReligions; let i=index;\" [value]=\"item.ReligionCode\">{{item.ReligionNameTH}}</option>\r\n                    </select>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">สถานะภาพ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <select formControlName=\"MaritalStatus\" class=\"form-control form-control-sm\" [attr.disabled]=\"showEditField ? '' : null\">\r\n                        <option value=\"\" selected disabled></option>\r\n                        <option *ngFor=\"let item of materialStatus; let i=index;\" [value]=\"item.value\">{{item.text}}</option>\r\n                    </select>\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">อาชีพ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"Career\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ชื่อบิดา :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"FatherName\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ชื่อมารดา :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"MotherName\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">เบอร์โทรศัพท์ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"TelephoneNo\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">อีเมล์ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"Email\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">รูปถ่ายผู้ต้องสงสัย :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <label for=\"fileImg\" class=\"find-img\">\r\n                        <img #imgNobody src=\"assets/images/users/nobody.jpg\" alt=\"\" height=\"180px\" width=\"180px\">\r\n                        <span>เลือกรูปภาพ</span>\r\n                    </label>\r\n                    <input id='fileImg' (change)=\"changeImage($event, imgNobody)\" type=\"file\" hidden [attr.disabled]=\"showEditField ? '' : null\">\r\n                </div>\r\n                \r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header unset-radius\">\r\n            <div class=\"card-actions\">\r\n                <a class=\"\" (click)=\"card2 = !card2\">\r\n                    <i class=\"fa\" [ngClass]=\"{'fa-chevron-down': card2, 'fa-chevron-up': !card2}\"></i>\r\n                </a>\r\n            </div>\r\n            <h4 class=\"card-title m-b-0\">ที่อยู่/สถานที่ทำการ</h4>\r\n        </div>\r\n        <div *ngIf=\"card2\" class=\"card-body\">\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ละติจูด :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input #latitude (change)=\"onChangeGps()\" type=\"text\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ลองจิจูด :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input #longitude (change)=\"onChangeGps()\" type=\"text\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n\r\n                <input type=\"text\" formControlName=\"GPS\" style=\"display: none;\">\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">บ้านเลขที่ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"Address\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">หมู่ที่ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"Village\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">อาคาร/สถานที่ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"Building\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ห้อง :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"Room\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ชั้น :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"Floor\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ตรอก/ซอย :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"Alley\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ถนน :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"Road\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ต./อ./จ. :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <ng-template #rt let-r=\"result\" let-t=\"term\">\r\n                        {{ r.SubdistrictNameTH }} {{r.DistrictNameTH}} {{r.ProvinceNameTH}}\r\n                    </ng-template>\r\n\r\n                    <input type=\"text\" class=\"form-control form-control-sm\" [ngbTypeahead]=\"searchRegion\"\r\n                        [resultTemplate]=\"rt\" [readOnly]=\"showEditField\" [inputFormatter]=\"formatterRegion\"\r\n                        (selectItem)=\"selectItemRegion($event)\" \r\n                        [value]=\"SuspectFG.get('Region').value\"/>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">รหัสไปรษณีย์ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"ZipCode\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header unset-radius\">\r\n            <div class=\"card-actions\">\r\n                <a class=\"\" (click)=\"card3 = !card3\">\r\n                    <i class=\"fa\" [ngClass]=\"{'fa-chevron-down': card3, 'fa-chevron-up': !card3}\"></i>\r\n                </a>\r\n            </div>\r\n            <h4 class=\"card-title m-b-0\">ข้อมูลชาวต่างชาติ</h4>\r\n        </div>\r\n        <div *ngIf=\"card3\" class=\"card-body\">\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">เลขหนังสือเดินทาง :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <!-- <div *ngIf=\"requiredPassport; else notShow\"> -->\r\n                    <input type=\"text\" formControlName=\"PassportNo\" class=\"form-control form-control-sm\" [ngClass]=\"{'ng-touched':isRequired}\"\r\n                        [required]=\"requiredPassport\" [readonly]=\"showEditField\">\r\n                    <!-- </div>\r\n                    <ng-template #notShow>\r\n                        <input type=\"text\" formControlName=\"PassportNo\" class=\"form-control form-control-sm\"\r\n                            [readonly]=\"showEditField\">\r\n                    </ng-template> -->\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ประเทศที่ออกหนังสือเดินทาง :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <ng-template #rt let-r=\"result\" let-t=\"term\">\r\n                        {{ r.CountryNameEN }}\r\n                    </ng-template>\r\n\r\n                    <input type=\"text\" class=\"form-control form-control-sm\" [ngbTypeahead]=\"searchCountry\"\r\n                        [resultTemplate]=\"rt\" [readOnly]=\"showEditField\" [inputFormatter]=\"formatterCountry\"\r\n                        (selectItem)=\"selectItemCountry($event)\" [value]=\"SuspectFG.get('PassportCountryName').value\" />\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">วันที่เข้าประเทศ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <my-date-picker-th formControlName=\"PassportDateIn\" [options]=\"myDatePickerOptions\" [disabled]=\"showEditField\"></my-date-picker-th>\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">วันที่ออกประเทศ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <my-date-picker-th formControlName=\"PassportDateOut\" [options]=\"myDatePickerOptions\" [disabled]=\"showEditField\"></my-date-picker-th>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ประเภทวีซ่า :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <select formControlName=\"VISAType\" class=\"form-control form-control-sm\" [attr.disabled]=\"showEditField ? '' : null\">\r\n                        <option value=\"\" selected disabled></option>\r\n                        <option *ngFor=\"let item of visaTypes; let i=index;\" [value]=\"item.value\">{{item.text}}</option>\r\n                    </select>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header unset-radius\">\r\n            <div class=\"card-actions\">\r\n                <a class=\"\" (click)=\"card4 = !card4\">\r\n                    <i class=\"fa\" [ngClass]=\"{'fa-chevron-down': card4, 'fa-chevron-up': !card4}\"></i>\r\n                </a>\r\n            </div>\r\n            <h4 class=\"card-title m-b-0\">ข้อมูลผู้ประกอบการ</h4>\r\n        </div>\r\n        <div *ngIf=\"card4\" class=\"card-body\">\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">เลขทะเบียนนิติบุคคล :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <!-- <div *ngIf=\"requiredCompanyRegister; else notShow\"> -->\r\n                    <input type=\"text\" formControlName=\"CompanyRegistrationNo\" class=\"form-control form-control-sm\"\r\n                        [ngClass]=\"{'ng-touched':isRequired}\" [required]=\"requiredCompanyRegister\" [readonly]=\"showEditField\">\r\n                    <!-- </div> -->\r\n                    <!-- <ng-template #notShow>\r\n                        <input type=\"text\" formControlName=\"CompanyRegistrationNo\" class=\"form-control form-control-sm\"\r\n                            [readonly]=\"showEditField\">\r\n                    </ng-template> -->\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">เลขทะเบียนสรรพสามิต :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"ExciseRegNo\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ชื่อสถานที่ประกอบการ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"CompanyName\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</form>"

/***/ }),

/***/ "./src/app/pages/investigation/components/suspect/suspect.component.scss":
/***/ (function(module, exports) {

module.exports = ".viewOffense {\n  position: absolute;\n  right: 20px;\n  top: 2px; }\n\nlabel.find-img {\n  cursor: pointer; }\n\nlabel.find-img span {\n    position: absolute;\n    left: 65px;\n    bottom: 5px;\n    z-index: 2;\n    color: #fff; }\n\nlabel.find-img::after {\n  content: '';\n  position: absolute;\n  width: 180px;\n  height: 35px;\n  background-color: #0d5397;\n  left: 15px;\n  bottom: 0px; }\n"

/***/ }),

/***/ "./src/app/pages/investigation/components/suspect/suspect.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SuspectComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_config_dateFormat__ = __webpack_require__("./src/app/config/dateFormat.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_services_main_master_service__ = __webpack_require__("./src/app/services/main-master.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_shared_sidebar_sidebar_component__ = __webpack_require__("./src/app/shared/sidebar/sidebar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_models__ = __webpack_require__("./src/app/models/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services__ = __webpack_require__("./src/app/pages/investigation/services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__models__ = __webpack_require__("./src/app/pages/investigation/models/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_observable_combineLatest__ = __webpack_require__("./node_modules/rxjs/_esm5/observable/combineLatest.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_app_core_loader_loader_service__ = __webpack_require__("./src/app/core/loader/loader.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_app_shared_header_navigation_navigation_service__ = __webpack_require__("./src/app/shared/header-navigation/navigation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_app_config_message__ = __webpack_require__("./src/app/config/message.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_app_config_imageType__ = __webpack_require__("./src/app/config/imageType.ts");
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
    function SuspectComponent(ngModalService, router, s_mainMaster, s_masSuspect, activatedRoute, navService, fb, sidebarService, loaderService, s_invest) {
        var _this = this;
        this.ngModalService = ngModalService;
        this.router = router;
        this.s_mainMaster = s_mainMaster;
        this.s_masSuspect = s_masSuspect;
        this.activatedRoute = activatedRoute;
        this.navService = navService;
        this.fb = fb;
        this.sidebarService = sidebarService;
        this.loaderService = loaderService;
        this.s_invest = s_invest;
        this.card1 = true;
        this.card2 = true;
        this.card3 = false;
        this.card4 = false;
        this.requiredPassport = false;
        this.requiredCompanyRegister = false;
        this.destroy$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["b" /* Subject */]();
        this.myDatePickerOptions = __WEBPACK_IMPORTED_MODULE_3_app_config_dateFormat__["a" /* MyDatePickerOptions */];
        this.isRequired = false;
        this.visaTypes = __WEBPACK_IMPORTED_MODULE_8_app_models__["j" /* VISATypes */];
        this.bloodTypes = __WEBPACK_IMPORTED_MODULE_8_app_models__["a" /* BloodTypes */];
        this.entityTypes = __WEBPACK_IMPORTED_MODULE_8_app_models__["e" /* EntityTypes */];
        this.genderTypes = __WEBPACK_IMPORTED_MODULE_8_app_models__["f" /* GenderTypes */];
        this.suspectTypes = __WEBPACK_IMPORTED_MODULE_8_app_models__["g" /* LawbreakerTypes */];
        this.materialStatus = __WEBPACK_IMPORTED_MODULE_8_app_models__["h" /* MaritalStatuType */];
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
        this.selectItemTitleName = function (e) { return _this.SuspectFG.patchValue({
            SuspectTitleCode: e.item.TitleCode,
            SuspectTitleName: e.item.TitleNameTH
        }); };
        this.selectItemNationality = function (e) { return _this.SuspectFG.patchValue({
            NationalityCode: e.item.NationalityCode,
            NationalityNameTH: e.item.NationalityNameTh
        }); };
        this.selectItemRace = function (e) { return _this.SuspectFG.patchValue({
            RaceCode: e.item.RaceCode,
            RaceName: e.item.RaceNameTH
        }); };
        this.selectItemReligion = function (e) { return _this.SuspectFG.patchValue({
            ReligionCode: e.item.ReligionCode,
            ReligionName: e.item.ReligionNameTH
        }); };
        this.selectItemCountry = function (e) { return _this.SuspectFG.patchValue({
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
    SuspectComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.SuspectFG = this.createForm();
                        this.sidebarService.setVersion(this.s_invest.version);
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
    SuspectComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
        this.SuspectFG.reset();
        this.navService.setOnEdit(false);
        this.navService.setOnSave(false);
        this.navService.setOnDelete(false);
        this.navService.setOnCancel(false);
        this.navService.setOnSearch(false);
        this.navService.setOnPrint(false);
        this.navService.setOnNextPage(false);
        this.navService.setOnPrevPage(false);
        this.navService.setEditField(false);
        this.navService.setSearchBar(false);
        this.navService.setPrintButton(false);
        this.navService.setEditButton(false);
        this.navService.setDeleteButton(false);
        this.navService.setSaveButton(false);
        this.navService.setCancelButton(false);
        this.navService.setNewButton(false);
        this.navService.setNextPageButton(false);
        this.navService.setPrevPageButton(false);
    };
    SuspectComponent.prototype.createForm = function () {
        __WEBPACK_IMPORTED_MODULE_10__models__["f" /* InvestigateMasSuspectFC */].LinkPhoto = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormControl */]("C:\\Image");
        __WEBPACK_IMPORTED_MODULE_10__models__["f" /* InvestigateMasSuspectFC */].IsActive = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormControl */](1);
        return new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* FormGroup */](__WEBPACK_IMPORTED_MODULE_10__models__["f" /* InvestigateMasSuspectFC */]);
    };
    SuspectComponent.prototype.active_route = function () {
        var _this = this;
        Object(__WEBPACK_IMPORTED_MODULE_11_rxjs_observable_combineLatest__["a" /* combineLatest */])(this.activatedRoute.params, this.activatedRoute.queryParams)
            .map(function (results) { return ({ params: results[0], queryParams: results[1] }); })
            .takeUntil(this.destroy$)
            .subscribe(function (results) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.mode = results.params.mode;
                this.suspectId = results.params.code;
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
    SuspectComponent.prototype.enableBtnModeC = function () {
        // set false
        this.navService.setEditButton(false);
        this.navService.setEditField(false);
        this.navService.setNextPageButton(false);
        // set true
        this.navService.setSaveButton(true);
        this.navService.setCancelButton(true);
    };
    SuspectComponent.prototype.enableBtnModeR = function () {
        // set false
        this.navService.setSaveButton(false);
        this.navService.setCancelButton(false);
        this.navService.setNextPageButton(false);
        // set true
        this.navService.setEditButton(true);
        this.navService.setEditField(true);
    };
    SuspectComponent.prototype.pageLoad = function () {
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
                        switch (this.mode) {
                            case 'C':
                                break;
                            case 'R':
                                this.ArrestSuspectGetByCon(this.suspectId);
                                break;
                        }
                        this.loaderService.hide();
                        return [2 /*return*/];
                }
            });
        });
    };
    SuspectComponent.prototype.navigate_service = function () {
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
                        if (this.SuspectFG.invalid) {
                            this.isRequired = true;
                            if (this.SuspectFG.controls.PassportNo.invalid) {
                                alert('กรุณาระบุ เลขหนังสือเดินทาง');
                            }
                            else if (this.SuspectFG.controls.CompanyRegistrationNo.invalid) {
                                alert('กรุณาระบุ เลขทะเบียนนิติบุคคล');
                            }
                            else {
                                alert(__WEBPACK_IMPORTED_MODULE_14_app_config_message__["a" /* Message */].checkData);
                            }
                            return [2 /*return*/];
                        }
                        _Lfg_1 = this.SuspectFG.value;
                        birthDay = this.isObject(_Lfg_1.BirthDate)
                            && Object(__WEBPACK_IMPORTED_MODULE_3_app_config_dateFormat__["d" /* getDateMyDatepicker */])(_Lfg_1.BirthDate);
                        passportDateIn = this.isObject(_Lfg_1.PassportDateIn)
                            && Object(__WEBPACK_IMPORTED_MODULE_3_app_config_dateFormat__["d" /* getDateMyDatepicker */])(_Lfg_1.PassportDateIn);
                        passportDateOut = this.isObject(_Lfg_1.PassportDateOut)
                            && Object(__WEBPACK_IMPORTED_MODULE_3_app_config_dateFormat__["d" /* getDateMyDatepicker */])(_Lfg_1.PassportDateOut);
                        _Lfg_1.BirthDate = (birthDay) || '';
                        _Lfg_1.PassportDateIn = (passportDateIn) || '';
                        _Lfg_1.PassportDateOut = (passportDateOut) || '';
                        _Lfg_1.SuspectTitleName = _Lfg_1.SuspectTitleCode &&
                            this.typeheadTitleNames
                                .find(function (x) { return x.TitleCode == _Lfg_1.SuspectTitleCode; }).TitleShortNameTH;
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
    };
    SuspectComponent.prototype.ArrestSuspectGetByCon = function (SuspectID) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.s_masSuspect.InvestigateMasSuspectgetByCon(SuspectID)
                            .then(function (x) {
                            var law = x[0];
                            law.BirthDate = law.BirthDate && Object(__WEBPACK_IMPORTED_MODULE_3_app_config_dateFormat__["e" /* setDateMyDatepicker */])(law.BirthDate);
                            law.PassportDateIn = law.PassportDateIn && Object(__WEBPACK_IMPORTED_MODULE_3_app_config_dateFormat__["e" /* setDateMyDatepicker */])(law.PassportDateIn);
                            law.PassportDateOut = law.PassportDateOut && Object(__WEBPACK_IMPORTED_MODULE_3_app_config_dateFormat__["e" /* setDateMyDatepicker */])(law.PassportDateOut);
                            _this.latitude.nativeElement.value = law.GPS && law.GPS.split(',')[0];
                            _this.longitude.nativeElement.value = law.GPS && law.GPS.split(',')[1];
                            if (law.SubDistrictCode && law.DistrictCode && law.ProvinceCode) {
                                law.Region = law.SubDistrict + " " + law.District + " " + law.Province;
                            }
                            _this.SuspectFG.patchValue(law);
                            if (law.LinkPhoto) {
                                // this.imgNobody.nativeElement.src = law.LinkPhoto;
                            }
                            if (law.EntityType == 1 && law.SuspectType == 1) {
                                // บุคคลธรรมดา
                                _this.card3 = false;
                                _this.card4 = false;
                            }
                            else if (law.EntityType == 1 && law.SuspectType == 0) {
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
    SuspectComponent.prototype.onChangeGps = function () {
        var t = this.latitude.nativeElement.value;
        var g = this.longitude.nativeElement.value;
        this.SuspectFG.patchValue({
            GPS: t + "," + g
        });
    };
    SuspectComponent.prototype.toggleCard = function () {
        var e = this.SuspectFG.value.EntityType;
        var l = this.SuspectFG.value.SuspectType;
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
    SuspectComponent.prototype.openOffenseDetailModal = function (e) {
        this.modal = this.ngModalService.open(e, { size: 'lg', centered: true });
    };
    SuspectComponent.prototype.selectItemRegion = function (ele) {
        this.SuspectFG.patchValue({
            SubDistrictCode: ele.item.SubdistrictCode,
            SubDistrict: ele.item.SubdistrictNameTH,
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
        __WEBPACK_IMPORTED_MODULE_15_app_config_imageType__["a" /* ImageType */].filter(function (item) { return file.type == item.type; }).map(function () { return isMatch = true; });
        if (!isMatch) {
            alert(__WEBPACK_IMPORTED_MODULE_14_app_config_message__["a" /* Message */].checkImageType);
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
    SuspectComponent.prototype.catchError = function (error) {
        console.log(error);
        this.endLoader();
    };
    SuspectComponent.prototype.checkResponse = function (res) {
        switch (res.IsSuccess) {
            case 'False':
            case false:
                return false;
            default:
                return true;
        }
    };
    SuspectComponent.prototype.OnCreate = function (suspect) {
        var _this = this;
        this.s_masSuspect.InvestigateMasSuspectinsAll(suspect)
            .takeUntil(this.destroy$)
            .subscribe(function (res) {
            if (!_this.checkResponse(res)) {
                alert(__WEBPACK_IMPORTED_MODULE_14_app_config_message__["a" /* Message */].saveFail);
                return;
            }
            alert(__WEBPACK_IMPORTED_MODULE_14_app_config_message__["a" /* Message */].saveComplete);
            _this.router.navigate(["/investigation/suspect/R/" + res.SuspectID]);
        }, function (error) {
            console.log(error);
            alert(__WEBPACK_IMPORTED_MODULE_14_app_config_message__["a" /* Message */].saveFail);
        });
    };
    SuspectComponent.prototype.OnRevice = function (suspect) {
        var _this = this;
        this.s_masSuspect.InvestigateMasSuspectupdByCon(suspect)
            .takeUntil(this.destroy$)
            .subscribe(function (res) {
            if (!_this.checkResponse(res)) {
                alert(__WEBPACK_IMPORTED_MODULE_14_app_config_message__["a" /* Message */].saveFail);
                return;
            }
            alert(__WEBPACK_IMPORTED_MODULE_14_app_config_message__["a" /* Message */].saveComplete);
            _this.enableBtnModeR();
        }, function (error) {
            console.log(error);
            alert(__WEBPACK_IMPORTED_MODULE_14_app_config_message__["a" /* Message */].saveFail);
        });
    };
    SuspectComponent.prototype.onCancel = function () {
        if (!confirm(__WEBPACK_IMPORTED_MODULE_14_app_config_message__["a" /* Message */].confirmAction))
            return;
        this.router.navigate(["investigation/lawbreaker", this.mode, this.suspectId]);
        // switch (this.mode) {
        //   case 'C':
        //     this.router.navigate([`arrest/allegation`, this.mode, this.suspectId]);
        //     break;
        //   case 'R':
        //     this.enableBtnModeR();
        //     break;
        // }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('imgNobody'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], SuspectComponent.prototype, "imgNobody", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('latitude'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], SuspectComponent.prototype, "latitude", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('longitude'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], SuspectComponent.prototype, "longitude", void 0);
    SuspectComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-suspect',
            template: __webpack_require__("./src/app/pages/investigation/components/suspect/suspect.component.html"),
            styles: [__webpack_require__("./src/app/pages/investigation/components/suspect/suspect.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ng_bootstrap_ng_bootstrap__["d" /* NgbModal */],
            __WEBPACK_IMPORTED_MODULE_5__angular_router__["c" /* Router */],
            __WEBPACK_IMPORTED_MODULE_6_app_services_main_master_service__["a" /* MainMasterService */], __WEBPACK_IMPORTED_MODULE_9__services__["c" /* InvestgateMasSuspectService */], __WEBPACK_IMPORTED_MODULE_5__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_13_app_shared_header_navigation_navigation_service__["a" /* NavigationService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_7_app_shared_sidebar_sidebar_component__["b" /* SidebarService */],
            __WEBPACK_IMPORTED_MODULE_12_app_core_loader_loader_service__["a" /* LoaderService */], __WEBPACK_IMPORTED_MODULE_9__services__["d" /* InvestgateService */]])
    ], SuspectComponent);
    return SuspectComponent;
}());



/***/ }),

/***/ "./src/app/pages/investigation/investigation.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvestigationModule", function() { return InvestigationModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__component_card_actions_card_actions_module__ = __webpack_require__("./src/app/pages/component/card-actions/card-actions.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__component_pagination_table_pagination_table_module__ = __webpack_require__("./src/app/pages/component/pagination-table/pagination-table.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_mydatepicker_th__ = __webpack_require__("./node_modules/mydatepicker-th/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__component_step_wizard_step_wizard_module__ = __webpack_require__("./src/app/pages/component/step-wizard/step-wizard.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_app_shared_preloader_preloader_module__ = __webpack_require__("./src/app/shared/preloader/preloader.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components__ = __webpack_require__("./src/app/pages/investigation/components/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services__ = __webpack_require__("./src/app/pages/investigation/services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__investigation_routing__ = __webpack_require__("./src/app/pages/investigation/investigation.routing.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











// Components



var InvestigationModule = /** @class */ (function () {
    function InvestigationModule() {
    }
    InvestigationModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["l" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["d" /* RouterModule */].forChild(__WEBPACK_IMPORTED_MODULE_13__investigation_routing__["a" /* routes */]),
                __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__["e" /* NgbModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_7__component_pagination_table_pagination_table_module__["a" /* PaginationTableModule */],
                __WEBPACK_IMPORTED_MODULE_8_mydatepicker_th__["a" /* MyDatePickerTHModule */],
                __WEBPACK_IMPORTED_MODULE_9__component_step_wizard_step_wizard_module__["a" /* StepWizardModule */],
                __WEBPACK_IMPORTED_MODULE_10_app_shared_preloader_preloader_module__["a" /* PreloaderModule */],
                __WEBPACK_IMPORTED_MODULE_6__component_card_actions_card_actions_module__["a" /* CardActionsModule */]
            ],
            declarations: __WEBPACK_IMPORTED_MODULE_11__components__["f" /* components */].slice(),
            exports: __WEBPACK_IMPORTED_MODULE_11__components__["f" /* components */].slice(),
            providers: __WEBPACK_IMPORTED_MODULE_12__services__["e" /* services */].slice()
        })
    ], InvestigationModule);
    return InvestigationModule;
}());



/***/ }),

/***/ "./src/app/pages/investigation/investigation.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components__ = __webpack_require__("./src/app/pages/investigation/components/index.ts");
// Components

var routes = [
    {
        path: 'list',
        data: {
            urls: [{ title: 'หน้าหลัก', url: '/' }, { title: 'ค้นหาข้อมูลสืบสวน' }],
            codePage: 'ILG60-01-01-00-00',
            nextPage: { title: 'รายงานสืบสวน', url: '/investigation/manage' }
        },
        component: __WEBPACK_IMPORTED_MODULE_0__components__["c" /* ListComponent */]
    },
    {
        path: 'manage/:mode/:code',
        data: {
            urls: [
                { title: 'หน้าหลัก', url: '/' },
                { title: 'ค้นหางานการสืบสวน', url: '/investigation/list' },
                { title: 'จัดการงานสืบสวน' }
            ],
            codePage: 'ILG60-01-02-00-00'
        },
        component: __WEBPACK_IMPORTED_MODULE_0__components__["d" /* ManageComponent */]
    },
    {
        path: 'detail-manage/:mode',
        data: {
            urls: [
                { title: 'หน้าหลัก', url: '/' },
                { title: 'ค้นหางานการสืบสวน', url: '/investigation/list' },
                { title: 'จัดการงานสืบสวน', url: '/investigation/manage/C/NEW' },
                { title: 'จัดการข้อมูลรายละเอียดรายงานการสืบสวน' }
            ],
            codePage: 'ILG60-01-03-00-00'
        },
        component: __WEBPACK_IMPORTED_MODULE_0__components__["a" /* DetailManageComponent */]
    },
    {
        path: 'lawbreaker/:mode/:code',
        data: {
            urls: [
                { title: 'หน้าหลัก', url: '/' },
                { title: 'ค้นหางานการสืบสวน', url: '/investigation/list' },
                { title: 'จัดการงานสืบสวน', url: '/investigation/manage/C/NEW' },
                { title: 'จัดการข้อมูลรายละเอียดรายงานการสืบสวน' },
                { title: 'จัดการข้อมูลผู้ต้องหา' }
            ],
            codePage: 'ILG60-99-02-02-00'
        },
        component: __WEBPACK_IMPORTED_MODULE_0__components__["b" /* LawbreakerComponent */]
    },
    {
        path: 'suspect/:mode/:code',
        data: {
            urls: [
                { title: 'หน้าหลัก', url: '/' },
                { title: 'ค้นหางานการสืบสวน', url: '/investigation/list' },
                { title: 'จัดการงานสืบสวน', url: '/investigation/manage/C/NEW' },
                { title: 'จัดการข้อมูลรายละเอียดรายงานการสืบสวน' },
                { title: 'จัดการข้อมูลผู้ต้องสงสัย' }
            ],
            codePage: 'ILG60-99-01-02-00'
        },
        component: __WEBPACK_IMPORTED_MODULE_0__components__["e" /* SuspectComponent */]
    }
];


/***/ }),

/***/ "./src/app/pages/investigation/models/acceptability.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Acceptability */
var Acceptability;
(function (Acceptability) {
    Acceptability[Acceptability["ACCEPTABLE"] = 0] = "ACCEPTABLE";
    Acceptability[Acceptability["INACCEPTABLE"] = 1] = "INACCEPTABLE";
})(Acceptability || (Acceptability = {}));


/***/ }),

/***/ "./src/app/pages/investigation/models/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__investigate_list_model__ = __webpack_require__("./src/app/pages/investigation/models/investigate-list.model.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__investigate_mas_lawbreaker_model__ = __webpack_require__("./src/app/pages/investigation/models/investigate-mas-lawbreaker.model.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_1__investigate_mas_lawbreaker_model__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__investigate_mas_suspect_model__ = __webpack_require__("./src/app/pages/investigation/models/investigate-mas-suspect.model.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_2__investigate_mas_suspect_model__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__investigate_model__ = __webpack_require__("./src/app/pages/investigation/models/investigate.model.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__investigate_model__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__investigate_model__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_3__investigate_model__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__acceptability__ = __webpack_require__("./src/app/pages/investigation/models/acceptability.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__investigate_document_model__ = __webpack_require__("./src/app/pages/investigation/models/investigate-document.model.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_5__investigate_document_model__["a"]; });








/***/ }),

/***/ "./src/app/pages/investigation/models/investigate-document.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvestigateDocumentModel; });
var InvestigateDocumentModel = /** @class */ (function () {
    function InvestigateDocumentModel() {
    }
    return InvestigateDocumentModel;
}());



/***/ }),

/***/ "./src/app/pages/investigation/models/investigate-list.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export InvestigateList */
var InvestigateList = /** @class */ (function () {
    function InvestigateList() {
    }
    return InvestigateList;
}());



/***/ }),

/***/ "./src/app/pages/investigation/models/investigate-mas-lawbreaker.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export InvestigateMasLawbreakerModel */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvestigateMasLawbreakerFC; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");

var InvestigateMasLawbreakerModel = /** @class */ (function () {
    function InvestigateMasLawbreakerModel() {
    }
    return InvestigateMasLawbreakerModel;
}());

var InvestigateMasLawbreakerFC = {
    LawbreakerID: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    EntityType: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    CompanyTitleCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    CompanyTitle: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    CompanyName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    CompanyOtherName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    CompanyRegistrationNo: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    CompanyLicenseNo: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    FoundedDate: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    LicenseDateForm: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    LicenseDateTo: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    TaxID: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    ExciseRegNo: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    LawbreakerType: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    LawbreakerTitleCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    LawbreakerTitleName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    LawbreakerFirstName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    LawbreakerMiddleName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    LawbreakerLastName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    LawbreakerOtherName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    LawbreakerDesc: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    IDCard: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    PassportNo: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    VISAType: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    PassportCountryCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    PassportCountryName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    PassportDateIn: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    PassportDateOut: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    BirthDate: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    GenderType: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    BloodType: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    NationalityCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    NationalityNameTH: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    RaceCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    RaceName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    ReligionCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    ReligionName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    MaritalStatus: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    Career: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    GPS: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    Location: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    Address: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    Village: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    Building: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    Floor: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    Room: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    Alley: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    Road: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    SubDistrictCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    SubDistrict: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    DistrictCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    District: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    ProvinceCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    Province: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    ZipCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    TelephoneNo: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    Email: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    FatherName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    MotherName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    Remarks: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    LinkPhoto: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    PhotoDesc: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    IsActive: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    ResultCount: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    Region: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */]('')
};


/***/ }),

/***/ "./src/app/pages/investigation/models/investigate-mas-suspect.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export InvestigateMasSuspectModel */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvestigateMasSuspectFC; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");

var InvestigateMasSuspectModel = /** @class */ (function () {
    function InvestigateMasSuspectModel() {
    }
    return InvestigateMasSuspectModel;
}());

var InvestigateMasSuspectFC = {
    SuspectID: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    EntityType: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    CompanyTitleCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    CompanyTitle: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    CompanyName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    CompanyOtherName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    CompanyRegistrationNo: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    CompanyLicenseNo: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    FoundedDate: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    LicenseDateForm: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    LicenseDateTo: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    TaxID: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    ExciseRegNo: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    SuspectType: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    SuspectTitleCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    SuspectTitleName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    SuspectFirstName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    SuspectMiddleName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    SuspectLastName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    SuspectOtherName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    SuspectDesc: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    IDCard: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    PassportNo: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    VISAType: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    PassportCountryCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    PassportCountryName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    PassportDateIn: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    PassportDateOut: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    BirthDate: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    GenderType: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    BloodType: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    NationalityCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    NationalityNameTH: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    RaceCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    RaceName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    ReligionCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    ReligionName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    MaritalStatus: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    Career: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    GPS: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    Location: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    Address: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    Village: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    Building: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    Floor: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    Room: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    Alley: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    Road: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    SubDistrictCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    SubDistrict: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    DistrictCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    District: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    ProvinceCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    Province: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    ZipCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    TelephoneNo: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    Email: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    FatherName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    MotherName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    Remarks: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    LinkPhoto: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    PhotoDesc: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    IsActive: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    SuspectTypeName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    EntityTypeName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    LawbreakerRefID: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    ReferenceID: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    FullName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
    Region: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](''),
};


/***/ }),

/***/ "./src/app/pages/investigation/models/investigate.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export InvestigateModel */
/* unused harmony export InvestigateDetail */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return InvestigateDetailStaff; });
/* unused harmony export InvestigateDetailSuspect */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvestigateDetailLocal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return InvestigateDetailProduct; });
var InvestigateModel = /** @class */ (function () {
    function InvestigateModel() {
    }
    return InvestigateModel;
}());

var InvestigateDetail = /** @class */ (function () {
    function InvestigateDetail() {
    }
    return InvestigateDetail;
}());

var InvestigateDetailStaff = /** @class */ (function () {
    function InvestigateDetailStaff() {
    }
    return InvestigateDetailStaff;
}());

var InvestigateDetailSuspect = /** @class */ (function () {
    function InvestigateDetailSuspect() {
    }
    return InvestigateDetailSuspect;
}());

var InvestigateDetailLocal = /** @class */ (function () {
    function InvestigateDetailLocal() {
    }
    return InvestigateDetailLocal;
}());

var InvestigateDetailProduct = /** @class */ (function () {
    function InvestigateDetailProduct() {
    }
    return InvestigateDetailProduct;
}());



/***/ }),

/***/ "./src/app/pages/investigation/services/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return services; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__investgate_service__ = __webpack_require__("./src/app/pages/investigation/services/investgate.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__investgate_detail_service__ = __webpack_require__("./src/app/pages/investigation/services/investgate-detail.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__investgate_mas_lawbreaker_service__ = __webpack_require__("./src/app/pages/investigation/services/investgate-mas-lawbreaker.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__investgate_mas_suspect_service__ = __webpack_require__("./src/app/pages/investigation/services/investgate-mas-suspect.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__investgate_detail_service__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__investgate_mas_lawbreaker_service__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_3__investgate_mas_suspect_service__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__investgate_service__["a"]; });




var services = [
    __WEBPACK_IMPORTED_MODULE_0__investgate_service__["a" /* InvestgateService */],
    __WEBPACK_IMPORTED_MODULE_1__investgate_detail_service__["a" /* InvestgateDetailService */],
    __WEBPACK_IMPORTED_MODULE_2__investgate_mas_lawbreaker_service__["a" /* InvestgateMasLawbreakerService */],
    __WEBPACK_IMPORTED_MODULE_3__investgate_mas_suspect_service__["a" /* InvestgateMasSuspectService */]
];






/***/ }),

/***/ "./src/app/pages/investigation/services/investgate-detail.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvestgateDetailService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_app_config__ = __webpack_require__("./src/app/app.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_core_http_service__ = __webpack_require__("./src/app/core/http.service.ts");
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




var InvestgateDetailService = /** @class */ (function () {
    function InvestgateDetailService(http, httpClient) {
        this.http = http;
        this.httpClient = httpClient;
        this.httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpHeaders */]({
                'Content-Type': 'application/json'
            })
        };
    }
    InvestgateDetailService.prototype.InvestigateDetailgetByCon = function (InvestigateDetailID) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = { InvestigateDetailID: InvestigateDetailID };
                        url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api8888 + "/InvestigateDetailgetByCon";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    InvestgateDetailService.prototype.InvestigateDetailinsAll = function (inves) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = inves;
                        url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api8888 + "/InvestigateDetailinsAll";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    InvestgateDetailService.prototype.InvestigateDetailupdByCon = function (inves) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = inves;
                        url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api8888 + "/InvestigateDetailupdByCon";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    InvestgateDetailService.prototype.InvestigateDetailupdDelete = function (InvestigateDetailID) {
        var params = { InvestigateDetailID: InvestigateDetailID };
        var url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api8888 + "/InvestigateDetailupdDelete";
        return this.http.post(url, params).map(function (x) { return x.json(); });
    };
    ////////////////// Staff \\\\\\\\\\\\\\\\\\
    InvestgateDetailService.prototype.InvestigateDetailStaffinsAll = function (staff) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = staff;
                        url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api8888 + "/InvestigateDetailStaffinsAll";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    InvestgateDetailService.prototype.InvestigateDetailStaffupdByCon = function (staff) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = staff;
                        url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api8888 + "/InvestigateDetailStaffupdByCon";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    InvestgateDetailService.prototype.InvestigateDetailStaffupdDelete = function (StaffID) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = { StaffID: StaffID };
                        url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api8888 + "/InvestigateDetailStaffupdDelete";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ////////////////// Product \\\\\\\\\\\\\\\\\\
    InvestgateDetailService.prototype.InvestigateDetailProductinsAll = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = product;
                        url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api8888 + "/InvestigateDetailProductinsAll";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    InvestgateDetailService.prototype.InvestigateDetailProductupdByCon = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = product;
                        url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api8888 + "/InvestigateDetailProductupdByCon";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    InvestgateDetailService.prototype.InvestigateDetailProductupdDelete = function (ProductID) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = { ProductID: ProductID };
                        url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api8888 + "/InvestigateDetailProductupdDelete";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ////////////////// Local \\\\\\\\\\\\\\\\\\
    InvestgateDetailService.prototype.InvestigateDetailLocalinsAll = function (local) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = local;
                        url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api8888 + "/InvestigateDetailLocalinsAll";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    InvestgateDetailService.prototype.InvestigateDetailLocalupdByCon = function (local) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = local;
                        url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api8888 + "/InvestigateDetailLocalupdByCon";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    InvestgateDetailService.prototype.InvestigateDetailLocalupdDelete = function (LocalID) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = { LocalID: LocalID };
                        url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api8888 + "/InvestigateDetailLocalupdDelete";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ////////////////// Suspect \\\\\\\\\\\\\\\\\\
    InvestgateDetailService.prototype.InvestigateDetailSuspectinsAll = function (suspect) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = suspect;
                        url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api8888 + "/InvestigateDetailSuspectinsAll";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    InvestgateDetailService.prototype.InvestigateDetailSuspectupdByCon = function (suspect) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = suspect;
                        url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api8888 + "/InvestigateDetailSuspectupdByCon";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    InvestgateDetailService.prototype.InvestigateDetailSuspectupdDelete = function (SuspectID) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = { SuspectID: SuspectID };
                        url = __WEBPACK_IMPORTED_MODULE_2_app_app_config__["a" /* appConfig */].api8888 + "/InvestigateDetailSuspectinsAll";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    InvestgateDetailService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_app_core_http_service__["a" /* HttpService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */]])
    ], InvestgateDetailService);
    return InvestgateDetailService;
}());



/***/ }),

/***/ "./src/app/pages/investigation/services/investgate-mas-lawbreaker.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvestgateMasLawbreakerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_core_http_service__ = __webpack_require__("./src/app/core/http.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_app_config__ = __webpack_require__("./src/app/app.config.ts");
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




var InvestgateMasLawbreakerService = /** @class */ (function () {
    function InvestgateMasLawbreakerService(http, httpClient) {
        this.http = http;
        this.httpClient = httpClient;
        this.httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpHeaders */]({
                'Content-Type': 'application/json'
            })
        };
    }
    InvestgateMasLawbreakerService.prototype.InvestigateMasLawbreakergetByKeyword = function (TextSearch) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = TextSearch === '' ? { 'TextSearch': '' } : TextSearch;
                        url = __WEBPACK_IMPORTED_MODULE_3_app_app_config__["a" /* appConfig */].api8888 + "/InvestigateMasLawbreakergetByKeyword";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    InvestgateMasLawbreakerService.prototype.InvestigateMasLawbreakergetByConAdv = function (form) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = form;
                        url = __WEBPACK_IMPORTED_MODULE_3_app_app_config__["a" /* appConfig */].api8888 + "/InvestigateMasLawbreakergetByConAdv";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    InvestgateMasLawbreakerService.prototype.InvestigateMasLawbreakergetByCon = function (LawbreakerID) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = { LawbreakerID: LawbreakerID };
                        url = __WEBPACK_IMPORTED_MODULE_3_app_app_config__["a" /* appConfig */].api8888 + "/InvestigateMasLawbreakergetByCon";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    InvestgateMasLawbreakerService.prototype.InvestigateMasLawbreakerupdByCon = function (lawbreaker) {
        var params = lawbreaker;
        var url = __WEBPACK_IMPORTED_MODULE_3_app_app_config__["a" /* appConfig */].api8888 + "/InvestigateMasLawbreakerupdByCon";
        return this.http.post(url, params).map(function (x) { return x.json(); });
    };
    InvestgateMasLawbreakerService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_core_http_service__["a" /* HttpService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClient */]])
    ], InvestgateMasLawbreakerService);
    return InvestgateMasLawbreakerService;
}());



/***/ }),

/***/ "./src/app/pages/investigation/services/investgate-mas-suspect.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvestgateMasSuspectService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_core_http_service__ = __webpack_require__("./src/app/core/http.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_app_config__ = __webpack_require__("./src/app/app.config.ts");
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




var InvestgateMasSuspectService = /** @class */ (function () {
    function InvestgateMasSuspectService(http, httpClient) {
        this.http = http;
        this.httpClient = httpClient;
        this.httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpHeaders */]({
                'Content-Type': 'application/json'
            })
        };
    }
    InvestgateMasSuspectService.prototype.InvestigateMasSuspectgetByKeyword = function (TextSearch) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = TextSearch === '' ? { 'TextSearch': '' } : TextSearch;
                        url = __WEBPACK_IMPORTED_MODULE_3_app_app_config__["a" /* appConfig */].api8888 + "/InvestigateMasSuspectgetByKeyword";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    InvestgateMasSuspectService.prototype.InvestigateMasSuspectgetByConAdv = function (form) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = form;
                        url = __WEBPACK_IMPORTED_MODULE_3_app_app_config__["a" /* appConfig */].api8888 + "/InvestigateMasSuspectgetByConAdv";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    InvestgateMasSuspectService.prototype.InvestigateMasSuspectgetByCon = function (SuspectID) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = { SuspectID: SuspectID };
                        url = __WEBPACK_IMPORTED_MODULE_3_app_app_config__["a" /* appConfig */].api8888 + "/InvestigateMasSuspectgetByCon";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    InvestgateMasSuspectService.prototype.InvestigateMasSuspectinsAll = function (suspect) {
        var params = suspect;
        var url = __WEBPACK_IMPORTED_MODULE_3_app_app_config__["a" /* appConfig */].api8888 + "/InvestigateMasSuspectinsAll";
        return this.http.post(url, params).map(function (x) { return x.json(); });
    };
    InvestgateMasSuspectService.prototype.InvestigateMasSuspectupdByCon = function (suspect) {
        var params = suspect;
        var url = __WEBPACK_IMPORTED_MODULE_3_app_app_config__["a" /* appConfig */].api8888 + "/InvestigateMasSuspectupdByCon";
        return this.http.post(url, params).map(function (x) { return x.json(); });
    };
    InvestgateMasSuspectService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_core_http_service__["a" /* HttpService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClient */]])
    ], InvestgateMasSuspectService);
    return InvestgateMasSuspectService;
}());



/***/ }),

/***/ "./src/app/pages/investigation/services/investgate.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvestgateService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_core_http_service__ = __webpack_require__("./src/app/core/http.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_app_config__ = __webpack_require__("./src/app/app.config.ts");
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




var InvestgateService = /** @class */ (function () {
    function InvestgateService(http, httpClient) {
        this.http = http;
        this.httpClient = httpClient;
        this.httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpHeaders */]({
                'Content-Type': 'application/json'
            })
        };
        this.version = '0.0.0.6';
    }
    InvestgateService.prototype.InvestigateListgetByKeyword = function (TextSearch, StaffCode) {
        var params = { TextSearch: TextSearch, StaffCode: StaffCode };
        var url = __WEBPACK_IMPORTED_MODULE_3_app_app_config__["a" /* appConfig */].api8888 + "/InvestigateListgetByKeyword";
        return this.http.post(url, params).map(function (x) { return x.json(); });
    };
    InvestgateService.prototype.InvestigateListgetByConAdv = function (form) {
        var params = form;
        var url = __WEBPACK_IMPORTED_MODULE_3_app_app_config__["a" /* appConfig */].api8888 + "/InvestigateListgetByConAdv";
        return this.http.post(url, params).map(function (x) { return x.json(); });
    };
    InvestgateService.prototype.InvestigategetByCon = function (InvestigateCode) {
        var params = { InvestigateCode: InvestigateCode };
        var url = __WEBPACK_IMPORTED_MODULE_3_app_app_config__["a" /* appConfig */].api8888 + "/InvestigategetByCon";
        return this.http.post(url, params).map(function (x) { return x.json(); });
    };
    InvestgateService.prototype.InvestigateinsAll = function (invest) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = invest;
                        url = __WEBPACK_IMPORTED_MODULE_3_app_app_config__["a" /* appConfig */].api8888 + "/InvestigateinsAll";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    InvestgateService.prototype.InvestigateupdAll = function (invest) {
        var params = invest;
        var url = __WEBPACK_IMPORTED_MODULE_3_app_app_config__["a" /* appConfig */].api8888 + "/InvestigateupdAll";
        return this.http.post(url, params).map(function (x) { return x.json(); });
    };
    InvestgateService.prototype.InvestigateupdDelete = function (InvestigateCode) {
        var params = { InvestigateCode: InvestigateCode };
        var url = __WEBPACK_IMPORTED_MODULE_3_app_app_config__["a" /* appConfig */].api8888 + "/InvestigateupdDelete";
        return this.http.post(url, params).map(function (x) { return x.json(); });
    };
    InvestgateService.prototype.InvestigateLawsuitResultCountgetByLawbreakerID = function (LawbreakerID) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = { LawbreakerID: LawbreakerID };
                        url = __WEBPACK_IMPORTED_MODULE_3_app_app_config__["a" /* appConfig */].api8888 + "/InvestigateLawsuitResultCountgetByLawbreakerID";
                        return [4 /*yield*/, this.httpClient.post(url, params, this.httpOptions).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    InvestgateService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_core_http_service__["a" /* HttpService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClient */]])
    ], InvestgateService);
    return InvestgateService;
}());



/***/ }),

/***/ "./src/app/pages/investigation/store/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions__ = __webpack_require__("./src/app/pages/investigation/store/actions/index.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__actions__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__actions__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__reducers__ = __webpack_require__("./src/app/pages/investigation/store/reducers/index.ts");
/* unused harmony namespace reexport */




/***/ })

});
//# sourceMappingURL=investigation.module.chunk.js.map
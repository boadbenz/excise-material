webpackJsonp(["manage.module"],{

/***/ "./src/app/pages/notices/manage/manage.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-template #printDocModal let-c=\"close\" let-d=\"dismiss\">\r\n    <app-print-doc-modal [NoticeCode]=\"noticeCode\" (c)=\"modal.close()\" (d)=\"modal.dismiss()\"></app-print-doc-modal>\r\n</ng-template>\r\n<form class=\"form-horizontal\" [formGroup]=\"noticeForm\">\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header  unset-radius\">\r\n            <app-card-actions-collapse></app-card-actions-collapse>\r\n            <h4 class=\"card-title m-b-0\">ผู้รับแจ้ง</h4>\r\n        </div>\r\n        <div class=\"card-body\">\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">เลขที่บันทึกแจ้งความ :</label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\r\n                    <div class=\"form-group \">\r\n                        <input type=\"text\" formControlName=\"NoticeCode\" class=\"form-control form-control-sm\" readonly>\r\n                    </div>\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">วันที่รับแจ้งความ :\r\n                </label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-9\">\r\n                        <div class=\"form-group input-group\">\r\n                            <my-date-picker-th class=\"form-control form-control-sm unset-form-control\" \r\n                            [options]=\"myDatePickerOptions\" [disabled]=\"showEditField\" \r\n                            [ngClass]=\"{'ng-touched':isRequired}\" required\r\n                            (dateChanged)=\"onNoticeDateChange($event)\" formControlName=\"NoticeDate\"></my-date-picker-th>\r\n\r\n                            <label for=\"OccurrenceDateTo\">&nbsp;เวลา :&nbsp;</label>\r\n\r\n                            <input #noticeTime type=\"text\" formControlName=\"NoticeTime\" class=\"form-control form-control-sm\" \r\n                            [readonly]=\"showEditField\" [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                        </div>\r\n                    </div>\r\n            </div>\r\n            \r\n\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ใช้ได้ภายในกำหนด(วัน) :</label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\r\n                    <div class=\"form-group \">\r\n                        <input #noticeDue type=\"number\" min=\"0\" formControlName=\"NoticeDue\" class=\"form-control form-control-sm\" \r\n                        (keyup)=\"addNoticeDueDate(noticeDue)\" \r\n                        (change)=\"addNoticeDueDate(noticeDue)\" \r\n                        [readonly]=\"showEditField\" [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                    </div>\r\n                </div>\r\n\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">สิ้นสุดวันที่ :</label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\r\n                    <div class=\"form-group input-group\" style=\"z-index: 1;\">\r\n                        <my-date-picker-th class=\"form-control form-control-sm unset-form-control\" \r\n                        [options]=\"myDatePickerOptions\" [disabled]=\"showEditField\"\r\n                        (dateChanged)=\"onNoticeDueDateChange($event)\" formControlName=\"NoticeDueDate\"></my-date-picker-th>\r\n    \r\n                        <label for=\"\" class=\"\">&nbsp;เวลา :&nbsp;</label>\r\n                        <input type=\"text\" formControlName=\"NoticeDueTime\" class=\"form-control form-control-sm\" \r\n                        [readOnly]=\"showEditField\"\r\n                        [value]=\"noticeTime.value\">\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">เขียนที่ :\r\n                </label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\r\n                    <div class=\"form-group \">\r\n                        <ng-template #rt let-r=\"result\" let-t=\"term\">\r\n                            {{ r.OfficeName }}\r\n                        </ng-template>\r\n    \r\n                        <input type=\"text\" class=\"form-control form-control-sm \"\r\n                            [ngClass]=\"{'ng-touched':isRequired}\"\r\n                            required\r\n                            [ngbTypeahead]=\"serachOffice\"\r\n                            [resultTemplate]=\"rt\"\r\n                            [readOnly]=\"showEditField\"\r\n                            [inputFormatter]=\"formatterOffice\" \r\n                            (selectItem)=\"selectItemOffice($event)\"\r\n                            [value]=\"noticeForm.get('NoticeStation').value\"\r\n                                />\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <div formArrayName=\"NoticeStaff\">\r\n                <div class=\"row\" *ngFor=\"let item of NoticeStaff.controls; let i=index;\" [formGroupName]=\"i\">\r\n\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ผู้รับแจ้งความ :\r\n                    </label>\r\n                    <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                        <ng-template #rt let-r=\"result\" let-t=\"term\">\r\n                            {{ r.TitleName}} {{r.FirstName}} {{r.LastName}}\r\n                        </ng-template>\r\n    \r\n                        <input type=\"text\" class=\"form-control form-control-sm\"\r\n                            [ngbTypeahead]=\"searchStaff\"\r\n                            [resultTemplate]=\"rt\"\r\n                            [readOnly]=\"showEditField\"\r\n                            [inputFormatter]=\"formatterStaff\" \r\n                            (selectItem)=\"selectItemStaff($event, i)\"\r\n                            value=\"{{item.value.StaffFullName}}\"\r\n                            [ngClass]=\"{'ng-touched':isRequired}\"\r\n                            required/>\r\n                    </div>\r\n\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">หน่วยงาน :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-8\">\r\n                        <div class=\"form-group \">\r\n                            <input type=\"text\" formControlName=\"DepartmentName\" class=\"form-control form-control-sm\" \r\n                            [readonly]=\"showEditField\"[ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                        </div>\r\n                    </div>\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ตำแหน่ง :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-8\">\r\n                        <div class=\"form-group \">\r\n                            <input type=\"text\" formControlName=\"PositionName\" class=\"form-control form-control-sm\" \r\n                            [readonly]=\"showEditField\" [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                        </div>\r\n                    </div>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n\r\n        <div class=\"card-header unset-radius\">\r\n            <app-card-actions-collapse></app-card-actions-collapse>\r\n            <h4 class=\"card-title m-b-0\">รายละเอียดผู้แจ้งความ</h4>\r\n        </div>\r\n        <div class=\"card-body\" formArrayName=\"NoticeInformer\">\r\n            <div *ngFor=\"let item of NoticeInformer.controls; let i=index;\" [formGroupName]=\"i\">\r\n\r\n                <div class=\"row form-group\">\r\n                    <div class=\"col\">\r\n                        <input [attr.disabled]=\"showEditField ? '' : null\" \r\n                        type=\"checkbox\" id=\"md_checkbox_25\" formControlName=\"InformerType\" class=\"filled-in chk-col-indigo\"\r\n                            (change)=\"onChangeConceal()\">\r\n                        <label for=\"md_checkbox_25\">สายลับขอปิดนาม</label>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"row\">\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ชื่อ(นามแฝง) ผู้แจ้ง :\r\n                    </label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-8\">\r\n                        <div class=\"form-group \">\r\n                            <input type=\"text\" class=\"form-control form-control-sm\" formControlName=\"FirstName\" [attr.disabled]=\"isConceal ? '' : null\"\r\n                            [readonly]=\"showEditField\" [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">อายุผู้แจ้ง (ปี) :</label>\r\n                    <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                        <input type=\"number\" min=\"0\" class=\"form-control form-control-sm number\" formControlName=\"Age\" [readonly]=\"showEditField\">\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"row\">\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">บ้านเลขที่ :</label>\r\n                    <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                        <input type=\"text\" class=\"form-control form-control-sm\" formControlName=\"Address\" [readonly]=\"showEditField\">\r\n                    </div>\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">หมู่ที่ :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-8\">\r\n                        <div class=\"form-group \">\r\n                            <input type=\"text\" class=\"form-control form-control-sm\" formControlName=\"Village\" [readonly]=\"showEditField\">\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"row\">\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">อาคาร/สถานที่ :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-8\">\r\n                        <div class=\"form-group \">\r\n                            <input type=\"text\" class=\"form-control form-control-sm\" formControlName=\"Building\" [readonly]=\"showEditField\">\r\n                        </div>\r\n                    </div>\r\n\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ห้อง :</label>\r\n                    <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                        <input type=\"text\" class=\"form-control form-control-sm\" formControlName=\"Room\" [readonly]=\"showEditField\">\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"row\">\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ชั้น :</label>\r\n                    <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                        <input type=\"text\" class=\"form-control form-control-sm\" formControlName=\"Floor\" [readonly]=\"showEditField\">\r\n                    </div>\r\n\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ตรอก/ซอย :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-8 form-group \">\r\n                        <input type=\"text\" class=\"form-control form-control-sm\" formControlName=\"Alley\" [readOnly]=\"showEditField\">\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"row\">\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ถนน :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-8 form-group \">\r\n                        <input type=\"text\" class=\"form-control form-control-sm\" formControlName=\"Road\" [readOnly]=\"showEditField\">\r\n                    </div>\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ตำบล/อำเภอ/จังหวัด :</label>\r\n\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-8 form-group \">\r\n                        <ng-template #rt let-r=\"result\" let-t=\"term\">\r\n                            {{ r.SubdistrictNameTH }} {{r.DistrictNameTH}} {{r.ProvinceNameTH}}\r\n                        </ng-template>\r\n\r\n                        <input type=\"text\" class=\"form-control form-control-sm\"\r\n                            [ngbTypeahead]=\"searchRegion\"\r\n                            [resultTemplate]=\"rt\"\r\n                            [readOnly]=\"showEditField\"\r\n                            [inputFormatter]=\"formatterRegion\" \r\n                            (selectItem)=\"selectItemInformmerRegion($event)\"\r\n                            value=\"{{item.get('Region').value}}\"\r\n                            />\r\n                    </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">รายละเอียดแจ้งความ :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-8 form-group \">\r\n                        <textarea name=\"\" id=\"\" cols=\"\" rows=\"5\" class=\"form-control form-control-sm\" formControlName=\"InformerInfo\" \r\n                        [readOnly]=\"showEditField\"></textarea>\r\n                    </div>\r\n                </div>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header  unset-radius\">\r\n            <app-card-actions-collapse></app-card-actions-collapse>\r\n            <h4 class=\"card-title m-b-0\">สถานที่เกิดเหตุ</h4>\r\n        </div>\r\n        <div class=\"card-body\" formArrayName=\"NoticeLocale\">\r\n\r\n            <div *ngFor=\"let item of NoticeLocale.controls; let i=index;\" [formGroupName]=\"i\">\r\n\r\n                <div class=\"row\">\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">บ้านเลขที่ :</label>\r\n                    <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                        <input type=\"text\" class=\"form-control form-control-sm\" formControlName=\"Address\" [readonly]=\"showEditField\" [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                    </div>\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">หมู่ที่ :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-8\">\r\n                        <div class=\"form-group \">\r\n                            <input type=\"text\" formControlName=\"Village\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\" [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"row\">\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">อาคาร/สถานที่ :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-8\">\r\n                        <div class=\"form-group \">\r\n                            <input type=\"text\" formControlName=\"Building\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\" [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ห้อง :</label>\r\n                    <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                        <input type=\"text\" formControlName=\"Room\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\" [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"row\">\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ชั้น :</label>\r\n                    <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                        <input type=\"text\" formControlName=\"Floor\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\" [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                    </div>\r\n\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ตรอก/ซอย :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-8 form-group \">\r\n                        <input type=\"text\" formControlName=\"Alley\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\" [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"row\">\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ถนน :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-8 form-group \">\r\n                        <input type=\"text\" formControlName=\"Road\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\" [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                    </div>\r\n\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ตำบล/อำเภอ/จังหวัด :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-8 form-group \">\r\n\r\n                        <ng-template #rt let-r=\"result\" let-t=\"term\">\r\n                            {{ r.SubdistrictNameTH }} {{r.DistrictNameTH}} {{r.ProvinceNameTH}}\r\n                        </ng-template>\r\n                        <input type=\"text\" class=\"form-control form-control-sm\"\r\n                            [ngbTypeahead]=\"searchRegion\"\r\n                            [readOnly]=\"showEditField\"\r\n                            [resultTemplate]=\"rt\"\r\n                            [inputFormatter]=\"formatterRegion\" \r\n                            (selectItem)=\"selectItemLocaleRegion($event)\" \r\n                            value=\"{{item.get('Region').value}}\"\r\n                            [ngClass]=\"{'ng-touched':isRequired}\" required/>\r\n                    </div>\r\n                </div>\r\n\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header unset-radius\">\r\n            <app-card-actions-collapse></app-card-actions-collapse>\r\n            <h4 class=\"card-title m-b-0\">สินค้าต้องสงสัย</h4>\r\n        </div>\r\n        <div class=\"card-body\">\r\n            <div class=\"row form-group\">\r\n                <div class=\"col-lg-10 col-md-9 col-sm-8\"></div>\r\n                <div class=\"col-lg-2 col-md-3 col-sm-4\">\r\n                    <button class=\"btn btn-block btn-themecolor\" [disabled]=\"showEditField\" (click)=\"addProduct()\">เพิ่มสินค้า</button>\r\n                </div>\r\n            </div>\r\n            <table class=\"table table-sm table-striped table-set-border\">\r\n                <thead>\r\n                    <tr>\r\n                        <th class=\"text-center\">ลำดับ</th>\r\n                        <th>สินค้า</th>\r\n                        <th>จำนวน</th>\r\n                        <th>หน่วย</th>\r\n                        <th></th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody formArrayName=\"NoticeProduct\">\r\n                    <tr *ngFor=\"let item of NoticeProduct.controls; let i=index;\" [formGroupName]=\"i\">\r\n                        <td class=\"text-center\">{{i+1}}</td>\r\n                        <td>\r\n                            <ng-template #rt let-r=\"result\" let-t=\"term\">\r\n                                {{ r.BrandNameTH }} {{r.SubBrandNameTH}} {{r.ModelName}}\r\n                            </ng-template>\r\n                            <input type=\"text\" class=\"form-control form-control-sm\"\r\n                                [readonly]=\"showEditField\"\r\n                                [ngbTypeahead]=\"searchProduct\"\r\n                                [resultTemplate]=\"rt\"\r\n                                [inputFormatter]=\"formatterProduct\"\r\n                                (selectItem)=\"selectItemProductItem($event, i)\"\r\n                                value=\"{{item.get('BrandFullName').value}}\"\r\n                                [ngClass]=\"{'ng-touched':isRequired}\" required/>\r\n                        </td>\r\n                        <td>\r\n                            <input type=\"number\" min=\"0\" formControlName=\"Qty\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\" [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                        </td>\r\n                        <td>\r\n                            <select formControlName=\"QtyUnit\" class=\"form-control form-control-sm\" [ngClass]=\"{'ng-touched':isRequired}\" required [attr.disabled]=\"showEditField ? '' : null\">\r\n                                <option value=\"\" selected disabled></option>\r\n                                <option *ngFor=\"let item of typeheadProductUnit;\" [value]=\"item.DutyUnitCode\">{{item.DutyCode}}</option>\r\n                            </select>\r\n                        </td>\r\n                        <td class=\"text-center\">\r\n                            <a href=\"javaScript:void(0);\" class=\"text-danger\" *ngIf=\"!showEditField\" (click)=\"onDeleteProduct(item.get('ProductID').value, i)\">\r\n                                <i class=\"fa fa-trash-o fa-lg\"></i>\r\n                            </a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header  unset-radius\">\r\n            <app-card-actions-collapse></app-card-actions-collapse>\r\n            <h4 class=\"card-title m-b-0\">ผู้ต้องสงสัย</h4>\r\n        </div>\r\n        <div class=\"card-body\">\r\n            <div class=\"row form-group\">\r\n                <div class=\"col-lg-10 col-md-9 col-sm-8\"></div>\r\n                <div class=\"col-lg-2 col-md-3 col-sm-4\">\r\n                    <button type=\"button\" class=\"btn btn-block btn-themecolor\" (click)=\"openSuspect(suspect)\" [disabled]=\"showEditField\">เพิ่มผู้ต้องสงสัย</button>\r\n                </div>\r\n\r\n                <ng-template #suspect let-c=\"close\" let-d=\"dismiss\">\r\n                    <app-suspect-modal (c)=\"modal.close()\" (d)=\"modal.dismiss()\" \r\n                    (exportSuspectData)=\"addSuspect($event)\">\r\n                </app-suspect-modal>\r\n                    <!-- <app-modal-lawbreaker (c)=\"modal.close()\" (d)=\"modal.dismiss()\" (lawbreakerEmit)=\"addSuspect($event)\"></app-modal-lawbreaker> -->\r\n                </ng-template>\r\n            </div>\r\n            <table class=\"table table-sm table-striped table-set-border\">\r\n                <thead>\r\n                    <tr>\r\n                        <th class=\"text-center\">ลำดับ</th>\r\n                        <th>ประเภทผู้ต้องสงสัย</th>\r\n                        <th>ประเภทบุคคล</th>\r\n                        <th>หมายเลขอ้างอิง</th>\r\n                        <th>ชื่อ</th>\r\n                        <th>จำนวนครั้งการกระทำผิด</th>\r\n                        <th></th>\r\n                        <th></th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody formArrayName=\"NoticeSuspect\">\r\n                    <tr *ngFor=\"let item of NoticeSuspect.controls; let i=index;\" [formGroupName]=\"i\">\r\n                        <td class=\"text-center\">{{i+1}}</td>\r\n                        <td>{{item.get('SuspectTypeName').value}}</td>\r\n                        <td>{{item.get('EntityTypeName').value}}</td>\r\n                        <td>{{item.get('SuspectID').value}}</td>\r\n                        <td>\r\n                            <span *ngIf=\"item.get('EntityType').value == 0\">\r\n                                {{item.get('SuspectFullName').value}}\r\n                            </span>\r\n                            <span *ngIf=\"item.get('EntityType').value == 1\">\r\n                                {{item.get('CompanyFullName').value}}\r\n                            </span>\r\n                        </td>\r\n                        <td>{{i+1}}</td>\r\n                        <td class=\"text-center\">\r\n                            <a href=\"javaScript:void(0);\" class=\"text-secondary\" *ngIf=\"!showEditField\" (click)=\"onViewSuspect(item.get('SuspectID').value)\">\r\n                                <i class=\"fa fa-eye fa-lg\"></i>\r\n                            </a>\r\n                        </td>\r\n                        <td class=\"text-center\">\r\n                            <a href=\"javaScript:void(0);\" class=\"text-danger\" *ngIf=\"!showEditField\" (click)=\"onDeleteSuspect(item.get('SuspectID').value, i)\">\r\n                                <i class=\"fa fa-trash-o fa-lg\"></i>\r\n                            </a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header  unset-radius\">\r\n            <app-card-actions-collapse></app-card-actions-collapse>\r\n            <h4 class=\"card-title m-b-0\">หลักฐานการแจ้งความ</h4>\r\n        </div>\r\n        <div class=\"card-body\">\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ช่องทางการรับแจ้งความ :</label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-8 form-group \">\r\n                    <select formControlName=\"CommunicationChanelID\" class=\"form-control form-control-sm\" [ngClass]=\"{'ng-touched':isRequired}\" required [attr.disabled]=\"showEditField ? '' : null\">\r\n                        <option value=\"\" selected disabled></option>\r\n                        <option *ngFor=\"let item of typeheadcommunicateModel; let i=index;\" [value]=\"item.CommunicationChanelID\">\r\n                            {{item.CommunicationChanelName}}\r\n                        </option>\r\n                    </select>\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ชื่อเอกสารแนบ :</label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-8 form-group \">\r\n                    <input type=\"text\" formControlName=\"DataSource\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ที่อยู่เอกสารแนบ :</label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-8 form-group \">\r\n                    <div class=\"input-group\">\r\n                        <input type=\"text\" class=\"form-control form-control-sm\" formControlName=\"FilePath\" style=\"border-right: 0;\"  [readonly]=\"showEditField\">\r\n                        <div class=\"input-group-append\">\r\n                            <input id=\"communicateAttach\" type=\"file\" (change)=\"changeComunicateFile($event)\" hidden [attr.disabled]=\"showEditField ? '' : null\">\r\n                            <label for=\"communicateAttach\" class=\"input-group-text custom-file-upload text-secondary\">\r\n                                <i class=\"ti-more-alt\"></i>\r\n                            </label>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header  unset-radius\">\r\n            <app-card-actions-collapse></app-card-actions-collapse>\r\n            <h4 class=\"card-title m-b-0\">เอกสารแนบภายใน</h4>\r\n        </div>\r\n        <div class=\"card-body\">\r\n            <div class=\"row form-group\">\r\n                <div class=\"col-lg-10 col-md-9 col-sm-8\"></div>\r\n                <div class=\"col-lg-2 col-md-3 col-sm-4\">\r\n                    <button class=\"btn btn-block btn-themecolor\" [disabled]=\"showEditField\" (click)=\"addDocument()\">เพิ่มเอกสารแนบ</button>\r\n                </div>\r\n            </div>\r\n            <table class=\"table table-sm table-striped table-set-border\">\r\n                <thead>\r\n                    <tr>\r\n                        <th class=\"text-center\">ลำดับ</th>\r\n                        <th>ชื่อเอกสารแนบ</th>\r\n                        <th>ที่อยู่เอกสารแนบ</th>\r\n                        <th></th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody formArrayName=\"NoticeDocument\">\r\n                    <tr *ngFor=\"let item of NoticeDocument.controls; let j=index;\" [formGroupName]=\"j\">\r\n                        <td class=\"text-center\">{{j+1}}</td>\r\n                        <td>\r\n                            <input type=\"text\" formControlName=\"DocumentName\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                        </td>\r\n                        <td>\r\n                            <div class=\"input-group\">\r\n                                <input type=\"text\" class=\"form-control form-control-sm\" formControlName=\"FilePath\" style=\"border-right: 0;\"  [readonly]=\"showEditField\">\r\n                                <div class=\"input-group-append\">\r\n                                    <input [id]=\"'noticeAttach'+j\" type=\"file\" (input)=\"changeNoticeDoc($event, j)\" hidden [attr.disabled]=\"showEditField ? '' : null\">\r\n                                    <label [for]=\"'noticeAttach'+j\" class=\"input-group-text custom-file-upload text-secondary\">\r\n                                        <i class=\"ti-more-alt\"></i>\r\n                                    </label>\r\n                                </div>\r\n                            </div>\r\n                        </td>\r\n                        <td class=\"text-center\">\r\n                            <a href=\"javaScript:void(0);\" class=\"text-danger\" *ngIf=\"!showEditField\" (click)=\"onDeleteDocument(item.get('DocumentID').value, j)\">\r\n                                <i class=\"fa fa-trash-o fa-lg\"></i>\r\n                            </a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n\r\n</form>"

/***/ }),

/***/ "./src/app/pages/notices/manage/manage.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_header_navigation_navigation_service__ = __webpack_require__("./src/app/shared/header-navigation/navigation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__notice_service__ = __webpack_require__("./src/app/pages/notices/notice.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_debounceTime__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/debounceTime.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/distinctUntilChanged.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_observable_of__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_catch__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_do__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/do.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_switchMap__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__config_dateFormat__ = __webpack_require__("./src/app/config/dateFormat.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__config_message__ = __webpack_require__("./src/app/config/message.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__notice_product__ = __webpack_require__("./src/app/pages/notices/notice-product.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__notice_document__ = __webpack_require__("./src/app/pages/notices/notice-document.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__notice_staff__ = __webpack_require__("./src/app/pages/notices/notice-staff.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__notice_informer__ = __webpack_require__("./src/app/pages/notices/notice-informer.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__notice_locale__ = __webpack_require__("./src/app/pages/notices/notice-locale.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__shared_preloader_preloader_component__ = __webpack_require__("./src/app/shared/preloader/preloader.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__shared_sidebar_sidebar_component__ = __webpack_require__("./src/app/shared/sidebar/sidebar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__models__ = __webpack_require__("./src/app/models/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_app_config_dataString__ = __webpack_require__("./src/app/config/dataString.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__services_main_master_service__ = __webpack_require__("./src/app/services/main-master.service.ts");
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
    function ManageComponent(activeRoute, suspectModalService, router, fb, navService, noticeService, ngbModel, preloader, sidebarService, mainMasterService) {
        var _this = this;
        this.activeRoute = activeRoute;
        this.suspectModalService = suspectModalService;
        this.router = router;
        this.fb = fb;
        this.navService = navService;
        this.noticeService = noticeService;
        this.ngbModel = ngbModel;
        this.preloader = preloader;
        this.sidebarService = sidebarService;
        this.mainMasterService = mainMasterService;
        this.programSpect = 'ILG60-02-02-00';
        this.searching = false;
        this.searchFailed = false;
        this.isConceal = false;
        this.myDatePickerOptions = __WEBPACK_IMPORTED_MODULE_13__config_dateFormat__["a" /* MyDatePickerOptions */];
        this.communicateModel = __WEBPACK_IMPORTED_MODULE_22__models__["n" /* communicate */];
        this.suspectTypes = __WEBPACK_IMPORTED_MODULE_22__models__["f" /* LawbreakerTypes */];
        this.entityTypes = __WEBPACK_IMPORTED_MODULE_22__models__["d" /* EntityTypes */];
        this.subdistrict = new Array();
        this.district = new Array();
        this.province = new Array();
        this.typeheadRegion = new Array();
        this.typeheadProduct = new Array();
        this.typeheadOffice = new Array();
        this.typeheadStaff = new Array();
        this.typeheadProductUnit = new Array();
        this.typeheadcommunicateModel = new Array();
        this.searchRegion = function (text3$) {
            return text3$
                .debounceTime(300)
                .distinctUntilChanged()
                .map(function (term) { return term === '' ? []
                : _this.typeheadRegion
                    .filter(function (v) {
                    return (v.SubdistrictNameTH && v.SubdistrictNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        (v.DistrictNameTH && v.DistrictNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        (v.ProvinceNameTH && v.ProvinceNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1);
                }).slice(0, 10); });
        };
        this.searchProduct = function (text$) {
            return text$
                .debounceTime(300)
                .distinctUntilChanged()
                .map(function (term) { return term === '' ? []
                : _this.typeheadProduct
                    .filter(function (v) {
                    return (v.SubBrandNameTH && v.SubBrandNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        (v.BrandNameTH && v.BrandNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        (v.ModelName && v.ModelName.toLowerCase().indexOf(term.toLowerCase()) > -1);
                }).slice(0, 10); });
        };
        this.searchStaff = function (text3$) {
            return text3$
                .debounceTime(200)
                .distinctUntilChanged()
                .map(function (term) { return term === '' ? []
                : _this.typeheadStaff
                    .filter(function (v) {
                    return (v.TitleName && v.TitleName.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        (v.FirstName && v.FirstName.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        (v.LastName && v.LastName.toLowerCase().indexOf(term.toLowerCase()) > -1);
                }).slice(0, 10); });
        };
        this.serachOffice = function (text3$) {
            return text3$
                .debounceTime(200)
                .distinctUntilChanged()
                .map(function (term) { return term === '' ? []
                : _this.typeheadOffice
                    .filter(function (v) {
                    return (v.OfficeName && v.OfficeName.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        (v.OfficeShortName && v.OfficeShortName.toLowerCase().indexOf(term.toLowerCase()) > -1);
                }).slice(0, 10); });
        };
        this.formatterProduct = function (x) {
            return (x.SubBrandNameTH || '') + " " + (x.BrandNameTH || '') + " " + (x.ModelName || '');
        };
        this.formatterRegion = function (x) {
            return (x.SubdistrictNameTH || '') + " " + (x.DistrictNameTH || '') + " " + (x.ProvinceNameTH || '');
        };
        this.formatterStaff = function (x) {
            return (x.TitleName || '') + " " + (x.FirstName || '') + " " + (x.LastName || '');
        };
        this.formatterOffice = function (x) { return x.OfficeShortName; };
        // set false
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
        this.navService.setInnerTextNextPageButton('งานจับกุม');
    }
    Object.defineProperty(ManageComponent.prototype, "NoticeStaff", {
        get: function () {
            return this.noticeForm.get('NoticeStaff');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManageComponent.prototype, "NoticeInformer", {
        get: function () {
            return this.noticeForm.get('NoticeInformer');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManageComponent.prototype, "NoticeLocale", {
        get: function () {
            return this.noticeForm.get('NoticeLocale');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManageComponent.prototype, "NoticeProduct", {
        get: function () {
            return this.noticeForm.get('NoticeProduct');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManageComponent.prototype, "NoticeSuspect", {
        get: function () {
            return this.noticeForm.get('NoticeSuspect');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManageComponent.prototype, "NoticeDocument", {
        get: function () {
            return this.noticeForm.get('NoticeDocument');
        },
        enumerable: true,
        configurable: true
    });
    ManageComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.preloader.setShowPreloader(true);
                        this.sidebarService.setVersion('0.0.2.12');
                        this.navigate_service();
                        this.active_route();
                        this.createForm();
                        return [4 /*yield*/, this.setCommunicateStore()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.setProductStore()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.setStaffStore()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.setRegionStore()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.setProductUnitStore()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.setOfficeStore()];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.setCommunicateStore()];
                    case 7:
                        _a.sent();
                        if (this.mode == 'R') {
                            this.getByCon(this.noticeCode);
                        }
                        this.preloader.setShowPreloader(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.active_route = function () {
        var _this = this;
        this.activeRoute.params.subscribe(function (p) {
            _this.mode = p['mode'];
            if (p['mode'] === 'C') {
                // set false
                _this.navService.setEditButton(false);
                _this.navService.setDeleteButton(false);
                _this.navService.setEditField(false);
                _this.navService.setNextPageButton(false);
                // set true
                _this.navService.setSaveButton(true);
                _this.navService.setCancelButton(true);
                _this.noticeCode = "LS-" + (new Date).getTime();
                _this.arrestCode = "TN-" + (new Date).getTime();
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
                _this.navService.setNextPageButton(true);
                _this.noticeCode = p['code'];
            }
        });
    };
    ManageComponent.prototype.navigate_service = function () {
        var _this = this;
        this.navService.showFieldEdit.subscribe(function (p) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.showEditField = p;
                return [2 /*return*/];
            });
        }); });
        this.onCancelSubscribe = this.navService.onCancel.subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!status) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.navService.setOnCancel(false)];
                    case 1:
                        _a.sent();
                        this.router.navigate(['/notice/list']);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
        this.onSaveSubscribe = this.navService.onSave.subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
            var sDateCompare, eDateCompare;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!status) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.navService.setOnSave(false)];
                    case 1:
                        _a.sent();
                        if (!this.noticeForm.valid) {
                            this.isRequired = true;
                            alert(__WEBPACK_IMPORTED_MODULE_14__config_message__["a" /* Message */].checkData);
                            return [2 /*return*/, false];
                        }
                        sDateCompare = Object(__WEBPACK_IMPORTED_MODULE_13__config_dateFormat__["d" /* getDateMyDatepicker */])(this.noticeForm.value.NoticeDate);
                        eDateCompare = Object(__WEBPACK_IMPORTED_MODULE_13__config_dateFormat__["d" /* getDateMyDatepicker */])(this.noticeForm.value.NoticeDueDate);
                        if (sDateCompare.valueOf() > eDateCompare.valueOf()) {
                            alert(__WEBPACK_IMPORTED_MODULE_14__config_message__["a" /* Message */].checkDate);
                            return [2 /*return*/];
                        }
                        if (!this.NoticeSuspect.value.length) {
                            alert(__WEBPACK_IMPORTED_MODULE_14__config_message__["a" /* Message */].checkData);
                            return [2 /*return*/];
                        }
                        this.noticeForm.value.NoticeDate = Object(__WEBPACK_IMPORTED_MODULE_13__config_dateFormat__["c" /* convertDateForSave */])(sDateCompare);
                        this.noticeForm.value.NoticeDueDate = Object(__WEBPACK_IMPORTED_MODULE_13__config_dateFormat__["c" /* convertDateForSave */])(eDateCompare);
                        this.noticeForm.value.NoticeInformer.map(function (item) {
                            item.InformerType = item.InformerType == true ? 1 : 0;
                        });
                        if (this.mode === 'C') {
                            this.onCreate();
                        }
                        else if (this.mode === 'R') {
                            this.onReviced();
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
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
        this.onNextPageSubscribe = this.navService.onNextPage.subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!status) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.navService.setOnNextPage(false)];
                    case 1:
                        _a.sent();
                        this.router.navigate(['/arrest/list']);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    };
    ManageComponent.prototype.createForm = function () {
        var noticeDate = this.mode == 'C' ? Object(__WEBPACK_IMPORTED_MODULE_13__config_dateFormat__["f" /* setDateMyDatepicker */])(new Date()) : null;
        var noticeTime = this.mode == 'C' ? Object(__WEBPACK_IMPORTED_MODULE_13__config_dateFormat__["g" /* setZero */])((new Date).getHours()) + "." + Object(__WEBPACK_IMPORTED_MODULE_13__config_dateFormat__["g" /* setZero */])((new Date).getMinutes()) + " \u0E19." : null;
        var noticeDueDate = noticeDate;
        this.noticeForm = this.fb.group({
            NoticeCode: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* FormControl */](this.noticeCode, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["m" /* Validators */].required),
            NoticeStationCode: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* FormControl */](null),
            NoticeStation: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["m" /* Validators */].required),
            NoticeDate: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* FormControl */](noticeDate, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["m" /* Validators */].required),
            NoticeTime: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* FormControl */](noticeTime, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["m" /* Validators */].required),
            NoticeDue: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["m" /* Validators */].required),
            NoticeDueDate: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* FormControl */](noticeDueDate, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["m" /* Validators */].required),
            NoticeDueTime: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* FormControl */](null),
            GroupNameDesc: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* FormControl */]('N/A'),
            CommunicationChanelID: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["m" /* Validators */].required),
            DataSource: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* FormControl */](null),
            FilePath: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* FormControl */](null),
            ArrestCode: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* FormControl */](null),
            IsArrest: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* FormControl */](1),
            IsActive: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* FormControl */](1),
            NoticeStaff: this.fb.array([this.createStaffForm()]),
            NoticeInformer: this.fb.array([this.createInformerForm()]),
            NoticeLocale: this.fb.array([this.createLocaleForm()]),
            NoticeProduct: this.fb.array([this.createProductForm()]),
            NoticeSuspect: this.fb.array([]),
            NoticeDocument: this.fb.array([])
        });
    };
    ManageComponent.prototype.createStaffForm = function () {
        __WEBPACK_IMPORTED_MODULE_17__notice_staff__["a" /* NoticeStaffFormControl */].NoticeCode = new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* FormControl */](this.noticeCode);
        return this.fb.group(__WEBPACK_IMPORTED_MODULE_17__notice_staff__["a" /* NoticeStaffFormControl */]);
    };
    ManageComponent.prototype.createInformerForm = function () {
        __WEBPACK_IMPORTED_MODULE_18__notice_informer__["a" /* NoticeInformerFormControl */].NoticeCode = new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* FormControl */](this.noticeCode);
        return this.fb.group(__WEBPACK_IMPORTED_MODULE_18__notice_informer__["a" /* NoticeInformerFormControl */]);
    };
    ManageComponent.prototype.createLocaleForm = function () {
        __WEBPACK_IMPORTED_MODULE_19__notice_locale__["a" /* NoticeLocaleFormControl */].NoticeCode = new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* FormControl */](this.noticeCode);
        return this.fb.group(__WEBPACK_IMPORTED_MODULE_19__notice_locale__["a" /* NoticeLocaleFormControl */]);
    };
    ManageComponent.prototype.createProductForm = function () {
        __WEBPACK_IMPORTED_MODULE_15__notice_product__["b" /* NoticeProductFormControl */].NoticeCode = new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* FormControl */](this.noticeCode);
        return this.fb.group(__WEBPACK_IMPORTED_MODULE_15__notice_product__["b" /* NoticeProductFormControl */]);
    };
    ManageComponent.prototype.setItemFormArray = function (array, formControl) {
        var _this = this;
        if (array !== undefined && array.length) {
            var itemFGs = array.map(function (item) { return _this.fb.group(item); });
            var itemFormArray = this.fb.array(itemFGs);
            this.noticeForm.setControl(formControl, itemFormArray);
        }
    };
    ManageComponent.prototype.getByCon = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.noticeService.getByCon(code).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                            var staff, informer, suspect, product;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this.noticeCode = res.NoticeCode;
                                        this.arrestCode = res.ArrestCode;
                                        return [4 /*yield*/, this.noticeForm.reset({
                                                NoticeCode: res.NoticeCode,
                                                NoticeStationCode: res.NoticeStationCode,
                                                NoticeStation: res.NoticeStation,
                                                NoticeDate: Object(__WEBPACK_IMPORTED_MODULE_13__config_dateFormat__["f" /* setDateMyDatepicker */])(new Date(res.NoticeDate)),
                                                NoticeTime: res.NoticeTime,
                                                NoticeDue: res.NoticeDue,
                                                NoticeDueDate: Object(__WEBPACK_IMPORTED_MODULE_13__config_dateFormat__["f" /* setDateMyDatepicker */])(new Date(res.NoticeDueDate)),
                                                GroupNameDesc: res.GroupNameDesc || 'N/A',
                                                CommunicationChanelID: res.CommunicationChanelID,
                                                ArrestCode: res.ArrestCode,
                                                IsActive: res.IsActive,
                                                IsArrest: res.IsArrest || 1
                                            })];
                                    case 1:
                                        _a.sent();
                                        staff = res.NoticeStaff.filter(function (item) { return item.IsActive == 1; });
                                        staff.map(function (item) {
                                            item.StaffFullName = item.TitleName + " " + item.FirstName + " " + item.LastName;
                                        });
                                        return [4 /*yield*/, res.NoticeLocale.map(function (item) {
                                                return item.Region = item.SubDistrict + " " + item.District + " " + item.Province;
                                            })];
                                    case 2:
                                        _a.sent();
                                        informer = res.NoticeInformer.filter(function (item) { return item.IsActive == 1; });
                                        informer.map(function (item) {
                                            _this.isConceal = item.InformerType == 1 ? true : false;
                                            item.Region = item.SubDistrict == null ? '' : "" + item.SubDistrict;
                                            item.Region += item.District == null ? '' : " " + item.District;
                                            item.Region += item.Province == null ? '' : " " + item.Province;
                                        });
                                        suspect = res.NoticeSuspect.filter(function (item) { return item.IsActive == 1; });
                                        suspect.map(function (item) {
                                            item.SuspectFullName = !item.SuspectTitleName ? '' : item.SuspectTitleName;
                                            item.SuspectFullName += !item.SuspectFirstName ? '' : " " + item.SuspectFirstName;
                                            item.SuspectFullName += !item.SuspectFirstName ? '' : " " + item.SuspectFirstName;
                                            item.CompanyFullName = !item.CompanyTitleName ? '' : item.CompanyTitleName;
                                            item.CompanyFullName += !item.CompanyName ? '' : " " + item.CompanyName;
                                            item.SuspectType = item.SuspectType || 0;
                                            item.EntityType = item.EntityType || 0;
                                            item.SuspectTypeName = item.SuspectTypeName || _this.suspectTypes.find(function (el) { return parseInt(el.value) == item.SuspectType; }).text;
                                            item.EntityTypeName = item.EntityTypeName || _this.entityTypes.find(function (el) { return parseInt(el.value) == item.EntityType; }).text;
                                        });
                                        product = res.NoticeProduct.filter(function (item) { return item.IsActive == 1; });
                                        product.map(function (item) {
                                            item.BrandFullName = item.BrandNameTH == null ? '' : item.BrandNameTH;
                                            item.BrandFullName += item.SubBrandNameTH == null ? '' : " " + item.SubBrandNameTH;
                                            item.BrandFullName += item.ModelName == null ? '' : " " + item.ModelName;
                                            item.NetWeight = item.NetWeight || '0';
                                            item.NetWeightUnit = item.NetWeightUnit || '0';
                                        });
                                        return [4 /*yield*/, this.setItemFormArray(staff, 'NoticeStaff')];
                                    case 3:
                                        _a.sent();
                                        return [4 /*yield*/, this.setItemFormArray(informer, 'NoticeInformer')];
                                    case 4:
                                        _a.sent();
                                        return [4 /*yield*/, this.setItemFormArray(res.NoticeLocale, 'NoticeLocale')];
                                    case 5:
                                        _a.sent();
                                        return [4 /*yield*/, this.setItemFormArray(product, 'NoticeProduct')];
                                    case 6:
                                        _a.sent();
                                        return [4 /*yield*/, this.setItemFormArray(suspect, 'NoticeSuspect')];
                                    case 7:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })
                        // await this.noticeService.getDocument(code).then(async res => {
                        //     res.map(item => item.IsNewItem = false)
                        //     await this.setItemFormArray(res, 'NoticeDocument')
                        // })
                    ];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.onCreate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var IsSuccess;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Set Preloader
                        this.preloader.setShowPreloader(true);
                        console.log('===================');
                        console.log('Create Notice : ', JSON.stringify(this.noticeForm.value));
                        console.log('===================');
                        IsSuccess = true;
                        return [4 /*yield*/, this.noticeService.insAll(this.noticeForm.value).then(function (isSuccess) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (!isSuccess) {
                                        IsSuccess = false;
                                        return [2 /*return*/, false];
                                    }
                                    ;
                                    return [2 /*return*/];
                                });
                            }); }, function () { IsSuccess = false; return; })];
                    case 1:
                        _a.sent();
                        if (!IsSuccess) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.NoticeDocument.value.map(function (doc) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: 
                                        // insert Document
                                        return [4 /*yield*/, this.noticeService.noticeDocumentinsAll(doc).then(function (docIsSuccess) {
                                                if (!docIsSuccess) {
                                                    IsSuccess = false;
                                                    return false;
                                                }
                                                ;
                                            }, function () { IsSuccess = false; return false; })];
                                        case 1:
                                            // insert Document
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (IsSuccess) {
                            alert(__WEBPACK_IMPORTED_MODULE_14__config_message__["a" /* Message */].saveComplete);
                            this.router.navigate(['/notice/manage', 'R', this.noticeCode]);
                        }
                        else {
                            alert(__WEBPACK_IMPORTED_MODULE_14__config_message__["a" /* Message */].saveFail);
                        }
                        this.preloader.setShowPreloader(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.onReviced = function () {
        return __awaiter(this, void 0, void 0, function () {
            var IsSuccess, document_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Set Preloader
                        this.preloader.setShowPreloader(true);
                        console.log('===================');
                        console.log('Update Notice : ', JSON.stringify(this.noticeForm.value));
                        console.log('===================');
                        IsSuccess = true;
                        return [4 /*yield*/, this.noticeService.updByCon(this.noticeForm.value).then(function (isSuccess) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    debugger;
                                    if (!isSuccess) {
                                        IsSuccess = false;
                                        return [2 /*return*/];
                                    }
                                    ;
                                    return [2 /*return*/];
                                });
                            }); }, function () { IsSuccess = false; return; })];
                    case 1:
                        _a.sent();
                        if (!IsSuccess) return [3 /*break*/, 3];
                        document_1 = this.NoticeDocument.value;
                        return [4 /*yield*/, document_1.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!item.IsNewItem) return [3 /*break*/, 2];
                                            return [4 /*yield*/, this.noticeService.noticeDocumentinsAll(item).then(function (docIsSuccess) {
                                                    if (!docIsSuccess) {
                                                        IsSuccess = false;
                                                        return;
                                                    }
                                                    ;
                                                }, function () { IsSuccess = false; return; })];
                                        case 1:
                                            _a.sent();
                                            return [3 /*break*/, 3];
                                        case 2:
                                            this.noticeService.noticeDocumentupd(item).then(function (docIsSuccess) {
                                                if (!docIsSuccess) {
                                                    IsSuccess = false;
                                                    return;
                                                }
                                                ;
                                            }, function () { IsSuccess = false; return; });
                                            _a.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (IsSuccess) {
                            alert(__WEBPACK_IMPORTED_MODULE_14__config_message__["a" /* Message */].saveComplete);
                            this.onComplete();
                        }
                        else {
                            alert(__WEBPACK_IMPORTED_MODULE_14__config_message__["a" /* Message */].saveFail);
                        }
                        this.preloader.setShowPreloader(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.onDelete = function () {
        var _this = this;
        if (confirm(__WEBPACK_IMPORTED_MODULE_14__config_message__["a" /* Message */].confirmAction)) {
            // Set Preloader
            this.preloader.setShowPreloader(true);
            this.noticeService.updDelete(this.noticeCode).then(function (IsSuccess) {
                if (IsSuccess) {
                    alert(__WEBPACK_IMPORTED_MODULE_14__config_message__["a" /* Message */].delComplete);
                    _this.router.navigate(['/notice/list']);
                }
                else
                    (alert(__WEBPACK_IMPORTED_MODULE_14__config_message__["a" /* Message */].delFail));
            });
        }
        else {
            this.router.navigate(['/notice/list']);
        }
    };
    ManageComponent.prototype.onComplete = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // set true
                    return [4 /*yield*/, this.navService.setEditField(true)];
                    case 1:
                        // set true
                        _a.sent();
                        return [4 /*yield*/, this.navService.setEditButton(true)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.navService.setPrintButton(true)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.navService.setDeleteButton(true)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.navService.setNextPageButton(true)];
                    case 5:
                        _a.sent();
                        // set false
                        return [4 /*yield*/, this.navService.setSaveButton(false)];
                    case 6:
                        // set false
                        _a.sent();
                        return [4 /*yield*/, this.navService.setCancelButton(false)];
                    case 7:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.onNoticeDateChange = function (event) {
        this._noticeDate = event;
        this.checkDate();
    };
    ManageComponent.prototype.onNoticeDueDateChange = function (event) {
        this._noticeDueDate = event;
        this.checkDate();
    };
    ManageComponent.prototype.checkDate = function () {
        var _this = this;
        var _sdate = this._noticeDate ? this._noticeDate : this.noticeForm.value.NoticeDate;
        var _edate = this._noticeDueDate ? this._noticeDueDate : this.noticeForm.value.NoticeDueDate;
        if (_sdate && _edate) {
            var sdate = Object(__WEBPACK_IMPORTED_MODULE_13__config_dateFormat__["d" /* getDateMyDatepicker */])(_sdate);
            var edate = Object(__WEBPACK_IMPORTED_MODULE_13__config_dateFormat__["d" /* getDateMyDatepicker */])(_edate);
            if (!Object(__WEBPACK_IMPORTED_MODULE_13__config_dateFormat__["b" /* compareDate */])(sdate, edate)) {
                alert(__WEBPACK_IMPORTED_MODULE_14__config_message__["a" /* Message */].checkDate);
                setTimeout(function () {
                    _this.noticeForm.patchValue({
                        NoticeDueDate: { date: _sdate.date }
                    });
                }, 0);
            }
        }
    };
    ManageComponent.prototype.addProduct = function () {
        var lastIndex = this.NoticeProduct.length - 1;
        var product = new __WEBPACK_IMPORTED_MODULE_15__notice_product__["a" /* NoticeProduct */]();
        product.IsNewItem = true;
        if (lastIndex < 0) {
            this.NoticeProduct.push(this.fb.group(product));
        }
        else {
            var lastDoc = this.NoticeProduct.at(lastIndex).value;
            if (lastDoc.Qty && lastDoc.QtyUnit) {
                this.NoticeProduct.push(this.fb.group(product));
            }
        }
    };
    ManageComponent.prototype.addSuspect = function (suspect) {
        var _this = this;
        if (suspect.length) {
            suspect.map(function (item) {
                var noticeSuspect = {
                    SuspectID: item.SuspectID.toString(),
                    SuspectReferenceID: item.SuspectID.toString(),
                    NoticeCode: _this.noticeCode,
                    SuspectTitleName: item.SuspectTitleName,
                    SuspectFirstName: item.SuspectFirstName,
                    SuspectLastName: item.SuspectLastName,
                    CompanyTitleName: item.CompanyTitle,
                    CompanyName: item.CompanyName,
                    CompanyOtherName: item.CompanyOtherName,
                    IsActive: 1,
                    EntityType: item.EntityType,
                    SuspectType: item.SuspectType,
                    EntityTypeName: item.EntityTypeName,
                    SuspectTypeName: item.SuspectTypeName,
                    CompanyFullName: item.CompanyFullName,
                    SuspectFullName: item.SuspectFullName,
                    RowId: item.RowId,
                    IsChecked: true,
                    IsNewItem: true,
                };
                _this.NoticeSuspect.push(_this.fb.group(noticeSuspect));
            });
        }
    };
    ManageComponent.prototype.addDocument = function () {
        var lastIndex = this.NoticeDocument.length - 1;
        var document = new __WEBPACK_IMPORTED_MODULE_16__notice_document__["a" /* NoticeDocument */]();
        document.IsNewItem = true;
        if (lastIndex < 0) {
            this.NoticeDocument.push(this.fb.group(document));
        }
        else {
            var lastDoc = this.NoticeDocument.at(lastIndex).value;
            if (lastDoc.DocumentName && lastDoc.FilePath) {
                this.NoticeDocument.push(this.fb.group(document));
            }
        }
    };
    ManageComponent.prototype.setOfficeStore = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mainMasterService.masOfficeMaingetAll().then(function (res) {
                            return _this.typeheadOffice = res;
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.setStaffStore = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    ManageComponent.prototype.setProductStore = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mainMasterService.masProductMaingetAll().then(function (res) {
                            _this.typeheadProduct = res;
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.setProductUnitStore = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mainMasterService.masDutyUnitMaingetAll().then(function (res) {
                            _this.typeheadProductUnit = res;
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.setCommunicateStore = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mainMasterService.masCommunicationchanelMaingetAll().then(function (res) {
                            _this.typeheadcommunicateModel = res;
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.setRegionStore = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mainMasterService.masDistrictMaingetAll().then(function (res) {
                            res.map(function (prov) {
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
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.addNoticeDueDate = function (e) {
        var _date = new Date();
        if (!this.noticeForm.value.NoticeDate) {
            this.noticeForm.patchValue({
                NoticeDate: Object(__WEBPACK_IMPORTED_MODULE_13__config_dateFormat__["f" /* setDateMyDatepicker */])(_date),
                NoticeTime: Object(__WEBPACK_IMPORTED_MODULE_13__config_dateFormat__["g" /* setZero */])((new Date).getHours()) + "." + Object(__WEBPACK_IMPORTED_MODULE_13__config_dateFormat__["g" /* setZero */])((new Date).getMinutes()) + " \u0E19."
            });
        }
        var noticeTime = this.noticeForm.value.NoticeTime;
        var dueDate = e.value == '' ? 0 : e.value;
        var noticeDate = Object(__WEBPACK_IMPORTED_MODULE_13__config_dateFormat__["d" /* getDateMyDatepicker */])(this.noticeForm.value.NoticeDate);
        noticeDate.setDate(noticeDate.getDate() + parseInt(dueDate));
        this.noticeForm.patchValue({
            NoticeDueDate: Object(__WEBPACK_IMPORTED_MODULE_13__config_dateFormat__["f" /* setDateMyDatepicker */])(noticeDate),
            NoticeDueTime: noticeTime
        });
    };
    ManageComponent.prototype.selectItemInformmerRegion = function (ele) {
        this.NoticeInformer.at(0).patchValue({
            SubDistrictCode: ele.item.SubdistrictCode,
            SubDistrict: ele.item.SubdistrictNameTH,
            DistrictCode: ele.item.DistrictCode,
            District: ele.item.DistrictNameTH,
            ProvinceCode: ele.item.ProvinceCode,
            Province: ele.item.ProvinceNameTH,
            ZipCode: ele.item.ZipCode
        });
    };
    ManageComponent.prototype.selectItemLocaleRegion = function (ele) {
        this.NoticeLocale.at(0).patchValue({
            SubDistrictCode: ele.item.SubdistrictCode,
            SubDistrict: ele.item.SubdistrictNameTH,
            DistrictCode: ele.item.DistrictCode,
            District: ele.item.DistrictNameTH,
            ProvinceCode: ele.item.ProvinceCode,
            Province: ele.item.ProvinceNameTH,
            ZipCode: 'N/A'
        });
    };
    ManageComponent.prototype.selectItemProductItem = function (ele, index) {
        this.NoticeProduct.at(index).reset(ele.item);
        this.NoticeProduct.at(index).patchValue({
            IsActive: 1,
            IsNewItem: true,
            NoticeCode: this.noticeCode,
            GroupCode: ele.item.GroupCode || '1',
            IsDomestic: ele.item.IsDomestic || '1',
            NetWeight: ele.item.NetWeight || 0,
            NetWeightUnit: ele.item.NetWeightUnit || 0,
        });
    };
    ManageComponent.prototype.selectItemStaff = function (e, i) {
        this.NoticeStaff.at(i).reset(e.item);
        this.NoticeStaff.at(i).patchValue({
            ProgramCode: this.programSpect,
            ProcessCode: '0002',
            NoticeCode: this.noticeCode,
            IsActive: 1,
            StaffFullName: (e.item.TitleName || '') + " " + (e.item.FirstName || '') + " " + (e.item.LastName || ''),
            PositionCode: e.item.PositionCode || e.item.ManagementPosCode,
            PositionName: e.item.PositionName || e.item.ManagementPosName,
            DepartmentLevel: e.item.DepartmentLevel || e.item.DeptLevel,
            DepartmentCode: e.item.DepartmentCode || e.item.OfficeCode,
            DepartmentName: "" + (e.item.DepartmentName || e.item.OfficeName),
            ContributorCode: e.item.ContributorCode || 2,
            ContributorID: e.item.ContributorID || 1
        });
    };
    ManageComponent.prototype.selectItemOffice = function (e) {
        this.noticeForm.patchValue({
            NoticeStationCode: e.item.OfficeCode || '-',
            NoticeStation: e.item.OfficeName
        });
    };
    ManageComponent.prototype.onDeleteProduct = function (id, index) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.mode === 'C')) return [3 /*break*/, 1];
                        this.NoticeProduct.removeAt(index);
                        return [3 /*break*/, 3];
                    case 1:
                        if (!(this.mode === 'R')) return [3 /*break*/, 3];
                        if (this.NoticeProduct.at(index).value.IsNewItem) {
                            this.NoticeProduct.removeAt(index);
                            return [2 /*return*/];
                        }
                        if (!confirm(__WEBPACK_IMPORTED_MODULE_14__config_message__["a" /* Message */].confirmAction)) return [3 /*break*/, 3];
                        this.preloader.setShowPreloader(true);
                        return [4 /*yield*/, this.noticeService.productupdDelete(id).then(function (isSuccess) {
                                if (isSuccess === true) {
                                    _this.NoticeProduct.removeAt(index);
                                    alert(__WEBPACK_IMPORTED_MODULE_14__config_message__["a" /* Message */].delProductComplete);
                                }
                                else {
                                    alert(__WEBPACK_IMPORTED_MODULE_14__config_message__["a" /* Message */].delProductFail);
                                }
                            })];
                    case 2:
                        _a.sent();
                        this.preloader.setShowPreloader(false);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.onDeleteSuspect = function (id, index) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.mode === 'C')) return [3 /*break*/, 1];
                        this.NoticeSuspect.removeAt(index);
                        return [3 /*break*/, 3];
                    case 1:
                        if (!(this.mode === 'R')) return [3 /*break*/, 3];
                        if (this.NoticeSuspect.at(index).value.IsNewItem) {
                            this.NoticeSuspect.removeAt(index);
                            return [2 /*return*/];
                        }
                        if (!confirm(__WEBPACK_IMPORTED_MODULE_14__config_message__["a" /* Message */].confirmAction)) return [3 /*break*/, 3];
                        this.preloader.setShowPreloader(true);
                        return [4 /*yield*/, this.noticeService.suspectupdDelete(id).then(function (isSuccess) {
                                if (isSuccess === true) {
                                    _this.NoticeSuspect.removeAt(index);
                                    alert(__WEBPACK_IMPORTED_MODULE_14__config_message__["a" /* Message */].delSuspcetComplete);
                                }
                                else {
                                    alert(__WEBPACK_IMPORTED_MODULE_14__config_message__["a" /* Message */].delSuspectFail);
                                }
                            })];
                    case 2:
                        _a.sent();
                        this.preloader.setShowPreloader(false);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.onDeleteDocument = function (id, index) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.mode === 'C')) return [3 /*break*/, 1];
                        this.NoticeDocument.removeAt(index);
                        return [3 /*break*/, 3];
                    case 1:
                        if (!(this.mode === 'R')) return [3 /*break*/, 3];
                        if (this.NoticeDocument.at(index).value.IsNewItem) {
                            this.NoticeDocument.removeAt(index);
                            return [2 /*return*/];
                        }
                        if (!confirm(__WEBPACK_IMPORTED_MODULE_14__config_message__["a" /* Message */].confirmAction)) return [3 /*break*/, 3];
                        this.preloader.setShowPreloader(true);
                        return [4 /*yield*/, this.noticeService.noticeDocumentupdDelete(id).then(function (isSuccess) {
                                if (isSuccess === true) {
                                    _this.NoticeDocument.removeAt(index);
                                    alert(__WEBPACK_IMPORTED_MODULE_14__config_message__["a" /* Message */].delDocumentComplete);
                                }
                                else {
                                    alert(__WEBPACK_IMPORTED_MODULE_14__config_message__["a" /* Message */].delDocumentFail);
                                }
                            })];
                    case 2:
                        _a.sent();
                        this.preloader.setShowPreloader(false);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.onViewSuspect = function (id) {
        this.router.navigate(['/notice/suspect', 'R', id]);
    };
    ManageComponent.prototype.ngOnDestroy = function () {
        this.onCancelSubscribe.unsubscribe();
        this.onSaveSubscribe.unsubscribe();
        this.onDeleSubscribe.unsubscribe();
        this.onPrintSubscribe.unsubscribe();
        this.onNextPageSubscribe.unsubscribe();
    };
    ManageComponent.prototype.openSuspect = function (e) {
        this.modal = this.suspectModalService.open(e, { size: 'lg', centered: true });
    };
    ManageComponent.prototype.onChangeConceal = function () {
        this.isConceal = !this.isConceal;
        var informName = 'สายลับขอปิดนาม';
        this.NoticeInformer.at(0).patchValue({
            FullName: !this.isConceal ? null : informName,
            FirstName: !this.isConceal ? null : informName
        });
    };
    ManageComponent.prototype.changeComunicateFile = function (e) {
        var _this = this;
        var reader = new FileReader();
        var file = e.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = function () {
            var dataSource = reader.result.split(',')[1];
            if (dataSource && dataSource !== undefined) {
                _this.noticeForm.patchValue({
                    FilePath: Object(__WEBPACK_IMPORTED_MODULE_23_app_config_dataString__["a" /* replaceFakePath */])(e.target.value),
                    DataSource: dataSource,
                    IsActive: 1
                });
            }
        };
    };
    ManageComponent.prototype.changeNoticeDoc = function (e, index) {
        var _this = this;
        var reader = new FileReader();
        var file = e.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = function () {
            var dataSource = reader.result.split(',')[1];
            if (dataSource && dataSource !== undefined) {
                _this.NoticeDocument.at(index).patchValue({
                    ReferenceCode: _this.noticeCode,
                    FilePath: Object(__WEBPACK_IMPORTED_MODULE_23_app_config_dataString__["a" /* replaceFakePath */])(e.target.value),
                    DataSource: dataSource,
                    IsActive: 1
                });
            }
        };
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('printDocModal'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], ManageComponent.prototype, "printDocModel", void 0);
    ManageComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-manage',
            template: __webpack_require__("./src/app/pages/notices/manage/manage.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["d" /* NgbModal */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__shared_header_navigation_navigation_service__["a" /* NavigationService */],
            __WEBPACK_IMPORTED_MODULE_5__notice_service__["a" /* NoticeService */],
            __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["d" /* NgbModal */],
            __WEBPACK_IMPORTED_MODULE_20__shared_preloader_preloader_component__["b" /* PreloaderService */],
            __WEBPACK_IMPORTED_MODULE_21__shared_sidebar_sidebar_component__["b" /* SidebarService */],
            __WEBPACK_IMPORTED_MODULE_24__services_main_master_service__["a" /* MainMasterService */]])
    ], ManageComponent);
    return ManageComponent;
}());



/***/ }),

/***/ "./src/app/pages/notices/manage/manage.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageModule", function() { return ManageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__manage_component__ = __webpack_require__("./src/app/pages/notices/manage/manage.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__component_card_actions_card_actions_module__ = __webpack_require__("./src/app/pages/component/card-actions/card-actions.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__notice_service__ = __webpack_require__("./src/app/pages/notices/notice.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__component_suspect_modal_suspect_modal_module__ = __webpack_require__("./src/app/pages/component/suspect-modal/suspect-modal.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__print_doc_modal_print_doc_modal_module__ = __webpack_require__("./src/app/pages/notices/print-doc-modal/print-doc-modal.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__arrests_arrests_service__ = __webpack_require__("./src/app/pages/arrests/arrests.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__component_modal_lawbreaker_modal_lawbreaker_module__ = __webpack_require__("./src/app/pages/component/modal-lawbreaker/modal-lawbreaker.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_datepicker_i18n_service__ = __webpack_require__("./src/app/services/datepicker-i18n.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__prove_prove_service__ = __webpack_require__("./src/app/pages/prove/prove.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_mydatepicker_th__ = __webpack_require__("./node_modules/mydatepicker-th/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_main_master_service__ = __webpack_require__("./src/app/services/main-master.service.ts");
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
            urls: [
                { title: 'หน้าหลัก', url: '/' },
                { title: 'ค้นหาใบแจ้งความนำจับ', url: '/notice/list' },
                { title: 'จัดการข้อมูลใบแจ้งความนำจับ' }
            ],
            codePage: 'XCS60-02-02-00'
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
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["l" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_http__["d" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_9__ng_bootstrap_ng_bootstrap__["e" /* NgbModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* RouterModule */].forChild(routes),
                __WEBPACK_IMPORTED_MODULE_5__component_card_actions_card_actions_module__["a" /* CardActionsModule */],
                __WEBPACK_IMPORTED_MODULE_10__component_suspect_modal_suspect_modal_module__["a" /* SuspectModalModule */],
                __WEBPACK_IMPORTED_MODULE_13__component_modal_lawbreaker_modal_lawbreaker_module__["a" /* ModalLawbreakerModule */],
                __WEBPACK_IMPORTED_MODULE_11__print_doc_modal_print_doc_modal_module__["a" /* PrintDocModalModule */],
                __WEBPACK_IMPORTED_MODULE_16_mydatepicker_th__["a" /* MyDatePickerTHModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__manage_component__["a" /* ManageComponent */]
            ], providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_9__ng_bootstrap_ng_bootstrap__["c" /* NgbDatepickerI18n */], useClass: __WEBPACK_IMPORTED_MODULE_14__services_datepicker_i18n_service__["a" /* DatepickerI18nService */] },
                __WEBPACK_IMPORTED_MODULE_6__notice_service__["a" /* NoticeService */],
                __WEBPACK_IMPORTED_MODULE_12__arrests_arrests_service__["a" /* ArrestsService */],
                __WEBPACK_IMPORTED_MODULE_15__prove_prove_service__["a" /* ProveService */],
                __WEBPACK_IMPORTED_MODULE_17__services_main_master_service__["a" /* MainMasterService */]
            ]
        })
    ], ManageModule);
    return ManageModule;
}());



/***/ }),

/***/ "./src/app/pages/notices/notice-document.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NoticeDocument; });
/* unused harmony export NoticeDocumentFormControl */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");

var NoticeDocument = /** @class */ (function () {
    function NoticeDocument() {
    }
    return NoticeDocument;
}());

var NoticeDocumentFormControl = {
    // DocumentID: new FormControl(null),
    // ReferenceCode: new FormControl(null),
    // FilePath: new FormControl(null),
    // DataSource: new FormControl(null),
    // DocumentType: new FormControl(null),
    // DocumentName: new FormControl(null),
    // IsActive: new FormControl(null),
    // IsNewItem: new FormControl(null)
    DocumentID: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    ReferenceCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    FilePath: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    DataSource: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    IsActive: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    IsNewItem: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null)
};


/***/ }),

/***/ "./src/app/pages/notices/notice-informer.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export NoticeInformer */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NoticeInformerFormControl; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");

var NoticeInformer = /** @class */ (function () {
    function NoticeInformer() {
    }
    return NoticeInformer;
}());

var NoticeInformerFormControl = {
    InformerID: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */]('22'),
    InformerType: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    NoticeCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["m" /* Validators */].required),
    TitleCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    TitleName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    FirstName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["m" /* Validators */].required),
    LastName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    IDCard: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */]('N/A'),
    Age: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    GenderType: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */]('-'),
    Location: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */]('N/A'),
    Address: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    Village: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    Building: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    Floor: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    Room: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    Alley: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    Road: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    SubDistrictCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    SubDistrict: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    DistrictCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    District: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    ProvinceCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    Province: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    ZipCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */]('N/A'),
    TelephoneNo: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */]('N/A'),
    InformerInfo: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */]('N/A'),
    IsActive: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](1),
    FullName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    Region: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null)
};


/***/ }),

/***/ "./src/app/pages/notices/notice-locale.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export NoticeLocale */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NoticeLocaleFormControl; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");

var NoticeLocale = /** @class */ (function () {
    function NoticeLocale() {
    }
    return NoticeLocale;
}());

var NoticeLocaleFormControl = {
    LocaleID: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    NoticeCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["m" /* Validators */].required),
    // CoordinateX: new FormControl('CoordinateX'),
    // CoordinateY: new FormControl('CoordinateY'),
    Location: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    Address: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["m" /* Validators */].required),
    Village: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["m" /* Validators */].required),
    Building: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["m" /* Validators */].required),
    Floor: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["m" /* Validators */].required),
    Room: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["m" /* Validators */].required),
    Alley: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["m" /* Validators */].required),
    Road: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["m" /* Validators */].required),
    SubDistrictCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["m" /* Validators */].required),
    SubDistrict: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["m" /* Validators */].required),
    DistrictCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["m" /* Validators */].required),
    District: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["m" /* Validators */].required),
    ProvinceCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["m" /* Validators */].required),
    Province: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["m" /* Validators */].required),
    ZipCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */]('N/A', __WEBPACK_IMPORTED_MODULE_0__angular_forms__["m" /* Validators */].required),
    Policestation: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    IsActive: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](1),
    Region: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null)
};


/***/ }),

/***/ "./src/app/pages/notices/notice-product.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NoticeProduct; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NoticeProductFormControl; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");

var NoticeProduct = /** @class */ (function () {
    function NoticeProduct() {
        this.ProductID = '';
        this.NoticeCode = '';
        this.GroupCode = '';
        this.IsDomestic = '';
        this.ProductCode = '';
        this.BrandCode = '';
        this.BrandNameTH = '';
        this.BrandNameEN = '';
        this.SubBrandCode = '';
        this.SubBrandNameTH = '';
        this.SubBrandNameEN = '';
        this.ModelCode = '';
        this.ModelName = '';
        this.FixNo1 = '';
        this.DegreeCode = '';
        this.Degree = '';
        this.SizeCode = '';
        this.Size = '';
        this.SizeUnitCode = '';
        this.SizeUnitName = '';
        this.FixNo2 = '';
        this.SequenceNo = '';
        this.ProductDesc = '';
        this.CarNo = '';
        this.Qty = '';
        this.QtyUnit = '';
        this.NetWeight = '';
        this.NetWeightUnit = '';
        this.Remarks = '';
        this.IsActive = 1;
        this.BrandFullName = '';
    }
    return NoticeProduct;
}());

var NoticeProductFormControl = {
    ProductID: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    NoticeCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["m" /* Validators */].required),
    GroupCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    IsDomestic: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    ProductCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["m" /* Validators */].required),
    BrandCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    BrandNameTH: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    BrandNameEN: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    SubBrandCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    SubBrandNameTH: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    SubBrandNameEN: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    ModelCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    ModelName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    FixNo1: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    DegreeCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    Degree: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    SizeCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    Size: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    SizeUnitCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    SizeUnitName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    FixNo2: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    SequenceNo: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    ProductDesc: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    CarNo: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    Qty: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["m" /* Validators */].required),
    QtyUnit: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["m" /* Validators */].required),
    NetWeight: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    NetWeightUnit: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    Remarks: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    IsActive: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    BrandFullName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    IsNewItem: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](false)
};


/***/ }),

/***/ "./src/app/pages/notices/notice-staff.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export NoticeStaff */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NoticeStaffFormControl; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");

var NoticeStaff = /** @class */ (function () {
    function NoticeStaff() {
    }
    return NoticeStaff;
}());

var NoticeStaffFormControl = {
    StaffID: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    ProgramCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */]('XCS60-02-02'),
    ProcessCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */]('0002'),
    NoticeCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["m" /* Validators */].required),
    StaffCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["m" /* Validators */].required),
    TitleName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    FirstName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["m" /* Validators */].required),
    LastName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    PositionCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    PositionName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    PosLevel: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    PosLevelName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    DepartmentCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    DepartmentName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    DepartmentLevel: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    OfficeCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    OfficeName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    OfficeShortName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    ContributorCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    IsActive: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null),
    StaffFullName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormControl */](null)
};


/***/ }),

/***/ "./src/app/pages/notices/print-doc-modal/print-doc-modal.component.html":
/***/ (function(module, exports) {

module.exports = "<form action=\"\" #form=\"ngForm\" (ngSubmit)=\"onPrint(form)\">\r\n    <div class=\"modal-header bg-theme\">\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-5\">\r\n                <h4 class=\"modal-title text-white\">พิมพ์เอกสาร</h4>\r\n            </div>\r\n            <a href=\"javaScript:void(0);\" class=\"close text-white font-14\" aria-label=\"Close\" (click)=\"dismiss('Cross click')\">\r\n                <span aria-hidden=\"true\">\r\n                    <i class=\" ti-close\"></i>\r\n                </span>\r\n            </a>\r\n        </div>\r\n    </div>\r\n    <div class=\"modal-body font-14\">\r\n\r\n        <div class=\"table-responsive\">\r\n            <table class=\"table table-sm table-striped table-set-border\">\r\n                <thead>\r\n                    <tr>\r\n                        <th></th>\r\n                        <th class=\"text-center\">ลำดับ</th>\r\n                        <th>ชื่อเอกสาร</th>\r\n                        <th>ประเภทเอกสาร</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr *ngFor=\"let item of printDoc; let i=index;\">\r\n                        <td class=\"text-center\">\r\n                            <input type=\"checkbox\" [id]=\"'td'+i\" name=\"ischeck\" ngModel class=\"filled-in chk-col-indigo\">\r\n                            <label [for]=\"'td'+i\" class=\"m-0\"></label>\r\n                        </td>\r\n                        <td class=\"text-center\">{{i+1}}</td>\r\n                        <td>{{item.DocName}}</td>\r\n                        <td>{{item.DocType}}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <div class=\"col-lg-2 col-4\">\r\n            <button type=\"submit\" class=\"btn btn-block btn-themecolor\">พิมพ์</button>\r\n        </div>\r\n    </div>\r\n</form>\r\n"

/***/ }),

/***/ "./src/app/pages/notices/print-doc-modal/print-doc-modal.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/notices/print-doc-modal/print-doc-modal.component.ts":
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
                DocName: 'ใบแจ้งความนำจับตามแบบ รว.1',
                DocType: 'แบบฟอร์ม'
            }, {
                DocName: 'ใบแจ้งความนำจับตามแบบ รว.1',
                DocType: 'เอกสารแนบภายใน'
            }, {
                DocName: 'ภาพหน้าจอแสดงข้อความจากผู้แจ้งความ',
                DocType: 'หลักฐานการแจ้งความ'
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
    ], PrintDocModalComponent.prototype, "NoticeCode", void 0);
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
            template: __webpack_require__("./src/app/pages/notices/print-doc-modal/print-doc-modal.component.html"),
            styles: [__webpack_require__("./src/app/pages/notices/print-doc-modal/print-doc-modal.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], PrintDocModalComponent);
    return PrintDocModalComponent;
}());



/***/ }),

/***/ "./src/app/pages/notices/print-doc-modal/print-doc-modal.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrintDocModalModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__print_doc_modal_component__ = __webpack_require__("./src/app/pages/notices/print-doc-modal/print-doc-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
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
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["l" /* ReactiveFormsModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__print_doc_modal_component__["a" /* PrintDocModalComponent */]],
            exports: [__WEBPACK_IMPORTED_MODULE_2__print_doc_modal_component__["a" /* PrintDocModalComponent */]]
        })
    ], PrintDocModalModule);
    return PrintDocModalModule;
}());



/***/ })

});
//# sourceMappingURL=manage.module.chunk.js.map
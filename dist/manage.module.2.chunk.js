webpackJsonp(["manage.module.2"],{

/***/ "./src/app/pages/prove/manage/manage.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-template #printDocModal let-c=\"close\" let-d=\"dismiss\">\r\n    <app-printdoc-modal (c)=\"modal.close()\" (d)=\"modal.dismiss()\"></app-printdoc-modal>\r\n</ng-template>\r\n\r\n<div class=\"wizard-content\">\r\n    <div class=\"wizard-circle wizard clearfix clearfix\">\r\n        <div class=\"steps tab-wizard\">\r\n            <ul role=\"tablist\">\r\n                <li role=\"tab\" class=\"current\" aria-disabled=\"false\" aria-selected=\"true\">\r\n                    <a>\r\n                        <span class=\"current-info audible\">current step: </span>\r\n                        <span class=\"step\"></span> 1. ใบแจ้งความนำจับ</a>\r\n                </li>\r\n                <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n                    <a>\r\n                        <span class=\"step\"></span> 2. งานจับกุม </a>\r\n                </li>\r\n                <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n                    <a>\r\n                        <span class=\"step\"></span> 3. รับคำกล่าวโทษ </a>\r\n                </li>\r\n                <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n                    <a>\r\n                        <span class=\"step\"></span> 4. งานตรวจรับและพิสูจน์ของกลาง </a>\r\n                </li>\r\n                <li role=\"tab\" class=\"disabled\" aria-disabled=\"true\">\r\n                    <a>\r\n                        <span class=\"step\"></span> 5. งานเปรียบเทียบและชำระค่าปรับ </a>\r\n                </li>\r\n                <li role=\"tab\" class=\"disabled\" aria-disabled=\"true\">\r\n                    <a>\r\n                        <span class=\"step\"></span> 6. นำส่งเงินรายได้ </a>\r\n                </li>\r\n                <li role=\"tab\" class=\"disabled\" aria-disabled=\"true\">\r\n                    <a>\r\n                        <span class=\"step\"></span> 7. คำร้องขอรับเงินสินบนรางวัล </a>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<!-- รายละเอียดคดี -->\r\n<div class=\"card card-outline-bluish unset-radius\">\r\n    <div class=\"card-header unset-radius\">\r\n        <app-card-actions-collapse></app-card-actions-collapse>\r\n        <h4 class=\"card-title m-b-0\">รายละเอียดคดี</h4>\r\n    </div>\r\n    <div class=\"card-body\">\r\n\r\n        <form class=\"form-horizontal\">\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">เลขที่ใบงาน :\r\n                </label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\r\n                    <div class=\"form-group \">\r\n                        <input type=\"text\" [(ngModel)]=\"ArrestCode\" name=\"ArrestCode\" class=\"form-control form-control-sm\" readonly>\r\n                    </div>\r\n                </div>\r\n\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">เลขที่คดีรับคำกล่าวโทษ :\r\n                </label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" [(ngModel)]=\"LawsuiltCode\" name=\"LawsuiltCode\" class=\"form-control form-control-sm\" readonly>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">ฐานความผิดมาตรา :\r\n                </label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\r\n                    <div class=\"form-group \">\r\n                        <input type=\"text\" [(ngModel)]=\"SectionName\" name=\"SectionName\" class=\"form-control form-control-sm\" readonly>\r\n                    </div>\r\n                </div>\r\n\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">ฐานความผิด :\r\n                </label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" [(ngModel)]=\"GuiltBaseName\" name=\"GuiltBaseName\" class=\"form-control form-control-sm\" readonly>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">บทกำหนดโทษ :\r\n                </label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\r\n                    <div class=\"form-group \">\r\n                        <input type=\"text\" [(ngModel)]=\"SectionNo\" name=\"SectionNo\" class=\"form-control form-control-sm\" readonly>\r\n                    </div>\r\n                </div>\r\n\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">อัตราโทษ :\r\n                </label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" [(ngModel)]=\"PenaltyDesc\" name=\"PenaltyDesc\" class=\"form-control form-control-sm\" readonly>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"card\">\r\n                <div class=\"card-body\">\r\n\r\n                    <div class=\"table-responsive table-striped \">\r\n                        <table class=\"table\">\r\n                            <thead>\r\n                                <tr>\r\n                                    <th style=\"text-align: center\">ลำดับ</th>\r\n                                    <th>ของกลาง</th>\r\n                                    <th>จำนวน</th>\r\n                                    <th>หน่วย</th>\r\n                                    <th>ปริมาณสุทธิ</th>\r\n                                    <th>หน่วย</th>\r\n                                </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                                <tr *ngFor=\"let item of ArrestProduct; let i=index;\">\r\n                                    <td class=\"text-center\">{{i + 1}}</td>\r\n                                    <td>\r\n                                        <input type=\"text\" value=\"{{item.ProductDesc}}\" class=\"form-control form-control-sm\" readonly>\r\n                                    </td>\r\n                                    <td>\r\n                                        <input type=\"text\" value=\"{{item.Qty}}\" class=\"form-control form-control-sm\" readonly>\r\n                                    </td>\r\n                                    <td>\r\n                                        <select class=\"form-control form-control-sm\"  [(ngModel)]=\"item.QtyUnit\" name=\"item.QtyUnit\" readonly>\r\n                                            <option *ngFor=\"let opt of UnitOption\" value=\"{{opt.ProductUnitCode}}\">{{opt.ProductUnitNameTH}}\r\n                                            </option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td>\r\n                                        <input type=\"text\" value=\"{{item.NetVolume}}\" class=\"form-control form-control-sm\" readonly>\r\n                                    </td>\r\n                                    <td>\r\n                                        <select class=\"form-control form-control-sm\" [(ngModel)]=\"item.NetVolumeUnit\" name=\"item.NetVolumeUnit\" readonly>\r\n                                            <option *ngFor=\"let opt of UnitOption\" value=\"{{opt.ProductUnitCode}}\">{{opt.ProductUnitNameTH}}\r\n                                            </option>\r\n                                        </select>\r\n                                    </td>\r\n                                </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </form>\r\n\r\n    </div>\r\n</div>\r\n\r\n<!-- ตรวจรับของกลาง -->\r\n<div class=\"card card-outline-bluish unset-radius\">\r\n    <div class=\"card-header unset-radius\">\r\n        <app-card-actions-collapse></app-card-actions-collapse>\r\n        <h4 class=\"card-title m-b-0\">ตรวจรับของกลาง</h4>\r\n    </div>\r\n    <div class=\"card-body\">\r\n\r\n        <form class=\"form-horizontal\">\r\n            <div class=\"row form-group\">\r\n                <div class=\"col\">\r\n                    <input type=\"checkbox\" id=\"md_checkbox_2\" class=\"filled-in chk-col-indigo\" [disabled]=\"showEditField\">\r\n                    <label for=\"md_checkbox_2\">ตรวจรับของกลาง</label>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"row form-group\">\r\n                <div class=\"col\">\r\n                    <input type=\"checkbox\" id=\"md_checkbox_3\" class=\"filled-in chk-col-indigo\" [disabled]=\"showEditField\">\r\n                    <label for=\"md_checkbox_3\">ตรวจพิสูจน์นอกสถานที่ทำการ</label>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">ทะเบียนตรวจพิสูจน์ :</label>\r\n                <div class=\"form-group input-group  col-lg-4 col-md-7\">\r\n                    <input type=\"text\" [(ngModel)]=\"ReportNo\" name=\"ReportNo\" class=\"form-control form-control-sm\" [disabled]=\"showEditField\"\r\n                        [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                    <label class=\"col-form-label\">/{{ProveYear}}</label>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">เขียนที่ :</label>\r\n                <div class=\"col-lg-4 col-md-7\">\r\n                    <input type=\"text\" class=\"form-control\" [(ngModel)]=\"ProveStation\" name=\"ProveStation\" placeholder=\"พิมพ์ข้อความ\" aria-label=\"Number\"\r\n                        matInput [matAutocomplete]=\"auto\" (input)=\"onAutoChange($event.target.value)\" (focus)=\"onAutoFocus($event.target.value)\"\r\n                        [disabled]=\"showEditField\" [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                    <mat-autocomplete #auto=\"matAutocomplete\">\r\n                        <mat-option *ngFor=\"let option of options\" [value]=\"option.OfficeName\" (click)=\"onAutoSelecteWord(option)\">\r\n                            {{ option.OfficeName }}\r\n                        </mat-option>\r\n                    </mat-autocomplete>\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">วันที่ตรวจรับ :\r\n                </label>\r\n                <div class=\"form-group input-group  col-lg-4 col-md-7\">\r\n                    <my-date-picker-th name=\"ProveDate\" [options]=\"myDatePickerOptions\" class=\"form-control form-control-sm unset-form-control\"\r\n                        [(ngModel)]=\"ProveDate\" [disabled]=\"showEditField\" [ngClass]=\"{'ng-touched':isRequired}\" required></my-date-picker-th>\r\n                    <!-- <div style=\"width:45%\">\r\n\r\n                    </div> -->\r\n                    <!-- <input type=\"date\" class=\"form-control form-control-sm\" [(ngModel)]=\"ProveDate\" name=\"ProveDate\" [disabled]=\"showEditField\"> -->\r\n\r\n                    <label for=\"\" class=\"\">&nbsp; เวลา : &nbsp;</label>\r\n                    <input type=\"time\" [(ngModel)]=\"ProveTime\" name=\"ProveTime\" class=\"form-control form-control-sm\" [disabled]=\"showEditField\">\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">หนังสือนำส่งเลขที่ :</label>\r\n                <div class=\"col-lg-4 col-md-7\">\r\n                    <div class=\"form-group \">\r\n                        <input type=\"text\" [(ngModel)]=\"DeliveryDocNo\" name=\"DeliveryDocNo\" class=\"form-control form-control-sm\" [disabled]=\"showEditField\">\r\n                    </div>\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">วันที่นำส่ง :\r\n                </label>\r\n                <div class=\"form-group input-group  col-lg-4 col-md-7\">\r\n                    <my-date-picker-th name=\"DeliveryDate\" [options]=\"myDatePickerOptions\" class=\"form-control form-control-sm unset-form-control\"\r\n                        [(ngModel)]=\"DeliveryDate\" [disabled]=\"showEditField\" [ngClass]=\"{'ng-touched':isRequired}\" required></my-date-picker-th>\r\n                    <!-- <input type=\"date\" class=\"form-control form-control-sm\" [(ngModel)]=\"DeliveryDate\" name=\"DeliveryDate\" [disabled]=\"showEditField\"> -->\r\n\r\n                    <label for=\"\" class=\"\">&nbsp; เวลา : &nbsp;</label>\r\n                    <input type=\"time\" [(ngModel)]=\"DeliveryTime\" name=\"DeliveryTime\" class=\"form-control form-control-sm\" [disabled]=\"showEditField\">\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">หน่วยงานนำส่ง :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7\">\r\n                    <input type=\"text\" class=\"form-control\" [(ngModel)]=\"ProveDelivery\" name=\"ProveDelivery\" placeholder=\"พิมพ์ข้อความ\" aria-label=\"Number\"\r\n                        matInput [matAutocomplete]=\"auto4\" (input)=\"DeliveryOnAutoChange($event.target.value)\" (focus)=\"DeliveryOnAutoFocus($event.target.value)\"\r\n                        [disabled]=\"showEditField\">\r\n                    <mat-autocomplete #auto4=\"matAutocomplete\">\r\n                        <mat-option *ngFor=\"let optionD of Deliveryoptions\" [value]=\"optionD.OfficeName\" (click)=\"DeliveryOnAutoSelecteWord(optionD)\">\r\n                            {{ optionD.OfficeName }}\r\n                        </mat-option>\r\n                    </mat-autocomplete>\r\n                </div>\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">ผู้ตรวจรับ :</label>\r\n                <div class=\"col-lg-4 col-md-7\">\r\n                    <div class=\"form-group \">\r\n                        <input type=\"text\" class=\"form-control\" [(ngModel)]=\"ProveStaffName\" name=\"ProveStaffName\" placeholder=\"พิมพ์ข้อความ\" aria-label=\"Number\"\r\n                            matInput [matAutocomplete]=\"auto2\" (input)=\"StaffonAutoChange($event.target.value)\" (focus)=\"StaffonAutoFocus($event.target.value)\"\r\n                            [disabled]=\"showEditField\" >\r\n                            <!-- [ngClass]=\"{'ng-touched':isRequired}\" required -->\r\n                        <mat-autocomplete #auto2=\"matAutocomplete\">\r\n                            <mat-option *ngFor=\"let sOption of Staffoptions\" [value]=\"sOption.TitleName + sOption.FirstName + ' ' + sOption.LastName\"\r\n                                (click)=\"StaffonAutoSelecteWord(sOption)\">\r\n                                {{ sOption.TitleName }}{{ sOption.FirstName }} {{ sOption.LastName }}\r\n                            </mat-option>\r\n                        </mat-autocomplete>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">ตำแหน่ง :</label>\r\n                <div class=\"col-lg-4 col-md-7\">\r\n                    <div class=\"form-group \">\r\n                        <input type=\"text\" [(ngModel)]=\"PosExaminer\" name=\"PosExaminer\" class=\"form-control form-control-sm\" disabled>\r\n                    </div>\r\n                </div>\r\n\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">หน่วยงาน :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7\">\r\n                    <input type=\"text\" [(ngModel)]=\"DeptExaminer\" name=\"DeptExaminer\" class=\"form-control form-control-sm\" disabled>\r\n                </div>\r\n            </div>\r\n        </form>\r\n\r\n    </div>\r\n</div>\r\n\r\n<!-- พิสูจน์ของกลาง -->\r\n<div class=\"card card-outline-bluish unset-radius\">\r\n    <div class=\"card-header unset-radius\">\r\n        <app-card-actions-collapse></app-card-actions-collapse>\r\n        <h4 class=\"card-title m-b-0\">พิสูจน์ของกลาง</h4>\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <form class=\"form-horizontal\">\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">วันที่พิสูจน์ :\r\n                </label>\r\n                <div class=\"form-group input-group  col-lg-4 col-md-7\">\r\n                    <my-date-picker-th name=\"ProveDate\" [options]=\"myDatePickerOptions\" class=\"form-control form-control-sm unset-form-control\"\r\n                        [(ngModel)]=\"ProveDate\" [disabled]=\"showEditField\" [ngClass]=\"{'ng-touched':isRequired}\" required></my-date-picker-th>\r\n                    <!-- <input type=\"date\" class=\"form-control form-control-sm\" [(ngModel)]=\"ProveDate\" name=\"ProveDate\" [disabled]=\"showEditField\"> -->\r\n\r\n                    <label for=\"\" class=\"\">&nbsp; เวลา : &nbsp;</label>\r\n                    <input type=\"time\" [(ngModel)]=\"ProveTime\" name=\"ProveTime\" class=\"form-control form-control-sm\" [disabled]=\"showEditField\">\r\n                </div>\r\n\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">ผู้ตรวจพิสูจน์ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7\">\r\n                    <input type=\"text\" class=\"form-control\" [(ngModel)]=\"ScienceStaffName\" name=\"ScienceStaffName\" placeholder=\"พิมพ์ข้อความ\"\r\n                        aria-label=\"Number\" matInput [matAutocomplete]=\"auto3\" (input)=\"ScienceStaffonAutoChange($event.target.value)\"\r\n                        (focus)=\"ScienceStaffonAutoFocus($event.target.value)\" [disabled]=\"showEditField\" >\r\n                        <!-- [ngClass]=\"{'ng-touched':isRequired}\" required -->\r\n                    <mat-autocomplete #auto3=\"matAutocomplete\">\r\n                        <mat-option *ngFor=\"let ScOption of Scienceoptions\" [value]=\"ScOption.TitleName + ScOption.FirstName + ' ' + ScOption.LastName\"\r\n                            (click)=\"ScienceStaffonAutoSelecteWord(ScOption)\">\r\n                            {{ ScOption.TitleName }}{{ ScOption.FirstName }} {{ ScOption.LastName }}\r\n                        </mat-option>\r\n                    </mat-autocomplete>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">ตำแหน่ง :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7\">\r\n                    <input type=\"text\" [(ngModel)]=\"PosScience\" name=\"PosScience\" class=\"form-control form-control-sm\" disabled>\r\n                </div>\r\n\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">หน่วยงาน :</label>\r\n                <div class=\"col-lg-4 col-md-7 form-group \">\r\n                    <input type=\"text\" [(ngModel)]=\"DeptScience\" name=\"DeptScience\" class=\"form-control form-control-sm\" disabled>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">คำสั่ง :</label>\r\n                <div class=\"col-lg-10 col-md-12 form-group \">\r\n                    <input type=\"text\" [(ngModel)]=\"Command\" name=\"Command\" class=\"form-control form-control-sm\" [disabled]=\"showEditField\">\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"row form-group\" style=\"margin-top:20px;\">\r\n                <div class=\"col-lg-10 col-md-9 col-sm-8\"></div>\r\n                <div class=\"col-lg-2 col-md-3 col-sm-4\">\r\n                    <button (click)=\"AddProduct()\" class=\"btn btn-block btn-themecolor\" [disabled]=\"showEditField\" data-toggle=\"modal\" data-target=\"#SciencePopup\">เพิ่มของกลาง</button>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"card\">\r\n                <div class=\"card-body\">\r\n\r\n                    <div class=\"table-responsive table-striped \">\r\n                        <table class=\"table\">\r\n                            <thead>\r\n                                <tr>\r\n                                    <th style=\"text-align: center\">ลำดับ</th>\r\n                                    <th>ของกลาง</th>\r\n                                    <th style=\"text-align: center\">ตามปริมาณ</th>\r\n                                    <th style=\"text-align: center\">ตามมูลค่า</th>\r\n                                    <th style=\"text-align: center\">พิสูจน์ทางเคมีหรือวิทยาศาสตร์</th>\r\n                                    <th style=\"text-align: center\">มูลค่าภาษีพิสูจน์</th>\r\n                                    <th></th>\r\n                                </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                                <!-- *ngIf=\"lsPD.IsAction!='D'\" -->\r\n                                <!-- | callback: filterProductDel let i=index;-->\r\n                                <tr *ngFor=\"let lsPD of oProve.ProveProduct | IsActivePipe; let i=index;\">\r\n                                    <td style=\"text-align: center\">{{i+1}}</td>\r\n                                    <td>{{lsPD.ProductDesc}}</td>\r\n                                    <td style=\"text-align: center\">{{lsPD.ReferenceVatRate == '1' ?'/':'X'}}</td>\r\n                                    <td style=\"text-align: center\">{{lsPD.ReferenceVatQty == '1' ?'/':'X'}}</td>\r\n                                    <td style=\"text-align: center\">{{lsPD.ProveScienceResult == null || lsPD.ProveScienceResult == '' ?'X':'/'}} </td>\r\n                                    <td style=\"text-align: center\">{{lsPD.VatProve}}</td>\r\n                                    <td>\r\n                                        <a *ngIf=\"showEditField\" (click)=\"OpenPopupProduct(i)\" class=\"text-secondary\" data-toggle=\"modal\" data-target=\"#SciencePopup\">\r\n                                            <i class=\"mdi mdi-eye fa-lg\"></i>\r\n                                        </a>\r\n                                        <a *ngIf=\"!showEditField\" (click)=\"OpenPopupProduct(i)\" class=\"text-secondary\" [hidden]=\"showEditField\" data-toggle=\"modal\"\r\n                                            data-target=\"#SciencePopup\">\r\n                                            <i class=\"ti-pencil-alt btn-action\"></i>\r\n                                        </a>\r\n                                        &nbsp;\r\n                                        <a class=\"text-warning\" (click)=\"onDeleteProduct(lsPD.ProductSeq)\" [hidden]=\"showEditField\">\r\n                                            <i class=\"fa fa-trash-o fa-lg\"></i>\r\n                                        </a>\r\n                                    </td>\r\n                                </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </form>\r\n\r\n    </div>\r\n</div>\r\n\r\n<!-- เอกสารแนบภายใน -->\r\n<div class=\"card card-outline-bluish unset-radius\">\r\n    <div class=\"card-header unset-radius\">\r\n        <app-card-actions-collapse></app-card-actions-collapse>\r\n        <h4 class=\"card-title m-b-0\">เอกสารแนบภายใน</h4>\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <div class=\"row form-group\">\r\n            <div class=\"col-lg-10 col-md-9 col-sm-8\"></div>\r\n            <div class=\"col-lg-2 col-md-3 col-sm-4\">\r\n                <button class=\"btn btn-block btn-themecolor\" (click)=\"AddDocument()\" [disabled]=\"showEditField\">เพิ่มเอกสารแนบ</button>\r\n            </div>\r\n        </div>\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <div class=\"table-responsive table-striped \">\r\n                    <table class=\"table\">\r\n                        <thead>\r\n                            <tr>\r\n                                <th style=\"text-align: center\">ลำดับ</th>\r\n                                <th>ชื่อเอกสารแนบ</th>\r\n                                <th>ที่อยู่เอกสารแนบ</th>\r\n                                <th></th>\r\n                            </tr>\r\n                        </thead>\r\n                        <tbody>\r\n                            <tr *ngFor=\"let lsDoc of ListProveDoc | IsActivePipe; let i=index;\">\r\n                                <td style=\"text-align: center\">{{i+1}}</td>\r\n                                <td>\r\n                                    <input type=\"text\" [(ngModel)]=\"lsDoc.DocumentName\" name=\"lsDoc.DocumentName\" class=\"form-control form-control-sm\" [disabled]=\"showEditField\">\r\n                                </td>\r\n                                <td>\r\n                                    <div class=\"input-group\">\r\n                                        <input type=\"text\" class=\"form-control form-control-sm\" [(ngModel)]=\"lsDoc.FilePath\" name=\"lsDoc.FilePath\" style=\"border-right: 0;\"\r\n                                            [disabled]=\"showEditField\">\r\n                                        <div class=\"input-group-append\">\r\n                                            <input [id]=\"'communicateAttach'+lsDoc.DocumentSeq\" type=\"file\" (change)=\"changeComunicateFile($event, lsDoc.DocumentSeq)\"\r\n                                                hidden>\r\n                                            <label [for]=\"'communicateAttach'+lsDoc.DocumentSeq\" class=\"input-group-text custom-file-upload text-secondary\" [hidden]=\"showEditField\">\r\n                                                <i class=\"ti-more-alt\"></i>\r\n                                            </label>\r\n                                        </div>\r\n                                    </div>\r\n                                </td>\r\n                                <td>\r\n                                    <a href=\"javaScript:void(0);\" class=\"text-warning\">\r\n                                        <i class=\"fa fa-trash-o fa-lg\" (click)=\"DelDocument(lsDoc.DocumentSeq)\" [hidden]=\"showEditField\"></i>\r\n                                    </a>\r\n                                </td>\r\n                            </tr>\r\n                        </tbody>\r\n                    </table>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n\r\n<!-- Pop up พิสูจน์ -->\r\n<div class=\"modal fade\" id=\"SciencePopup\" tabindex=\"-1\" role=\"dialog\">\r\n    <div class=\"modal-dialog modal-lg\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header bg-theme\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-lg-5\">\r\n                        <h4 class=\"modal-title text-white\">รายละเอียดพิสูจน์ของกลาง\r\n                        </h4>\r\n                    </div>\r\n\r\n                    <a href=\"javaScript:void(0);\" class=\"close text-white font-14\" data-dismiss=\"modal\" data-target=\"testimonyPopup\">\r\n                        <span aria-hidden=\"true\">\r\n                            <i class=\" ti-close\"></i>\r\n                        </span>\r\n                    </a>\r\n                </div>\r\n            </div>\r\n            <div class=\"modal-body font-14\">\r\n                <!-- รายละเอียดการคำนวณอัตราภาษีพิสูจน์ -->\r\n                <div class=\"card card-outline-bluish unset-radius\">\r\n                    <div class=\"card-header unset-radius\">\r\n                        <app-card-actions-collapse></app-card-actions-collapse>\r\n                        <h4 class=\"card-title m-b-0\">รายละเอียดการคำนวณอัตราภาษีพิสูจน์</h4>\r\n                    </div>\r\n                    <div class=\"card-body\">\r\n                        <form class=\"form-horizontal\">\r\n                            <div class=\"row\">\r\n                                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">ของกลางจากจับกลุ่ม :</label>\r\n                                <div class=\"col-lg-10 col-md-7\">\r\n                                    <div class=\"form-group \">\r\n                                        <select [(ngModel)]=\"ProductID\" name=\"ProductID\" class=\"form-control form-control-sm\" [disabled]=\"modePopup == 'I'?false:'true'\"\r\n                                            (change)=\"SelecteArrestProduct($event)\">\r\n                                            <option *ngFor=\"let opt of ArrestProduct\" value={{opt.ProductID}}>{{opt.ProductDesc}}\r\n                                            </option>\r\n                                        </select>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"row\">\r\n                                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">เพิ่ม/แก้ไขของกลาง :</label>\r\n                                <div class=\"col-lg-10 col-md-7\">\r\n                                    <div class=\"form-group \">\r\n                                        <input type=\"text\" [(ngModel)]=\"oProveProduct.ProductDesc\" name=\"oProveProduct.ProductDesc\" class=\"form-control form-control-sm\"\r\n                                            [disabled]=\"showEditField\">\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"row\">\r\n                                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">จำนวน :</label>\r\n                                <div class=\"col-lg-4 col-md-7\">\r\n                                    <div class=\"form-group \">\r\n                                        <input type=\"text\" [(ngModel)]=\"oProveProduct.Qty\" name=\"oProveProduct.Qty\" class=\"form-control form-control-sm\" [disabled]=\"showEditField\">\r\n                                    </div>\r\n                                </div>\r\n                                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">หน่วย :</label>\r\n                                <div class=\"form-group input-group  col-lg-4 col-md-7\">\r\n                                    <select [(ngModel)]=\"oProveProduct.QtyUnit\" name=\"oProveProduct.QtyUnit\" class=\"form-control form-control-sm\" [disabled]=\"showEditField\">\r\n                                        <option *ngFor=\"let opt of UnitOption\" value={{opt.ProductUnitCode}}>{{opt.ProductUnitNameTH}}\r\n                                        </option>\r\n                                    </select>\r\n                                </div>\r\n                            </div>\r\n\r\n                            <div class=\"row\">\r\n                                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">ปริมาณสุทธิ :</label>\r\n                                <div class=\"col-lg-4 col-md-7\">\r\n                                    <div class=\"form-group \">\r\n                                        <input type=\"number\" [(ngModel)]=\"oProveProduct.NetVolume\" name=\"oProveProduct.NetVolume\" class=\"form-control form-control-sm\"\r\n                                            [disabled]=\"showEditField\">\r\n                                    </div>\r\n                                </div>\r\n                                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">หน่วย :</label>\r\n                                <div class=\"form-group input-group  col-lg-4 col-md-7\">\r\n                                    <select [(ngModel)]=\"oProveProduct.NetVolumeUnit\" name=\"oProveProduct.NetVolumeUnit\" class=\"form-control form-control-sm\"\r\n                                        [disabled]=\"showEditField\">\r\n                                        <option *ngFor=\"let opt of UnitOption\" value={{opt.ProductUnitCode}}>{{opt.ProductUnitNameTH}}\r\n                                        </option>\r\n                                    </select>\r\n                                </div>\r\n                            </div>\r\n\r\n                            <div class=\"row\">\r\n                                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">อัตราภาษี :</label>\r\n                                <div class=\"form-group input-group  col-lg-4 col-md-7\">\r\n                                    <input type=\"checkbox\" class=\"filled-in chk-col-indigo\" [disabled]=\"showEditField\" [checked]=\"C1_ReferenceVatRate!='' && C1_ReferenceVatRate!=null\">\r\n                                    <label for=\"md_checkbox_5\">ตามมูลค่าร้อยละ </label>&nbsp;&nbsp;\r\n                                    <input type=\"number\" [(ngModel)]=\"oProveProduct.ReferenceVatRate\" name=\"oProveProduct.ReferenceVatRate\" class=\"form-control form-control-sm\"\r\n                                        [disabled]=\"showEditField\">\r\n                                </div>\r\n                            </div>\r\n\r\n                            <div class=\"row\">\r\n                                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\"></label>\r\n                                <div class=\"form-group input-group  col-lg-4 col-md-7\">\r\n                                    <input type=\"checkbox\" class=\"filled-in chk-col-indigo\" [disabled]=\"showEditField\" [checked]=\"C1_ReferenceVatQty!='' && C1_ReferenceVatQty!=null\">\r\n                                    <label for=\"md_checkbox_5\">ตามปริมาณต่อ </label>&nbsp;&nbsp;\r\n                                    <input type=\"number\" [(ngModel)]=\"oProveProduct.ReferenceVatQty\" name=\"oProveProduct.ReferenceVatQty\" class=\"form-control form-control-sm\"\r\n                                        [disabled]=\"showEditField\">\r\n                                </div>\r\n                            </div>\r\n\r\n                            <div class=\"row\">\r\n                                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\"></label>\r\n                                <div class=\"form-group input-group  col-lg-4 col-md-7\">\r\n                                    <label for=\"\">หน่วย </label>&nbsp;&nbsp;\r\n                                    <select [(ngModel)]=\"oProveProduct.ReferenceVatUnit\" name=\"oProveProduct.ReferenceVatUnit\" class=\"form-control form-control-sm\"\r\n                                        [disabled]=\"showEditField\">\r\n                                        <option *ngFor=\"let opt of UnitOption\" value={{opt.ProductUnitCode}}>{{opt.ProductUnitNameTH}}\r\n                                        </option>\r\n                                    </select>\r\n                                </div>\r\n                            </div>\r\n\r\n                            <div class=\"row\">\r\n                                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\"></label>\r\n                                <div class=\"form-group input-group  col-lg-4 col-md-7\">\r\n                                    <label for=\"\">หน่วยละ (บาท) </label>&nbsp;&nbsp;\r\n                                    <input type=\"number\" [(ngModel)]=\"oProveProduct.ReferenceVatValue\" name=\"oProveProduct.ReferenceVatValue\" class=\"form-control form-control-sm\"\r\n                                        [disabled]=\"showEditField\">\r\n                                </div>\r\n                            </div>\r\n\r\n\r\n                            <div class=\"row\">\r\n                                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">ราคาขายปลีกแนะนำ :</label>\r\n                                <div class=\"col-lg-4 col-md-7\">\r\n                                    <div class=\"form-group \">\r\n                                        <input type=\"number\" [(ngModel)]=\"oProveProduct.ReferenceRetailPrice\" name=\"oProveProduct.ReferenceRetailPrice\" class=\"form-control form-control-sm\"\r\n                                            [disabled]=\"showEditField\">\r\n                                    </div>\r\n                                </div>\r\n\r\n                                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">หน่วย :</label>\r\n                                <div class=\"form-group col-lg-4 col-md-7\">\r\n                                    <select [(ngModel)]=\"oProveProduct.ReferenceRetailUnit\" name=\"oProveProduct.ReferenceRetailUnit\" class=\"form-control form-control-sm\"\r\n                                        [disabled]=\"showEditField\">\r\n                                        <option *ngFor=\"let opt of UnitOption\" value={{opt.ProductUnitCode}}>{{opt.ProductUnitNameTH}}\r\n                                        </option>\r\n                                    </select>\r\n                                </div>\r\n                            </div>\r\n\r\n                            <div class=\"row\">\r\n                                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">ราคาขายปลีกจริง :</label>\r\n                                <div class=\"col-lg-4 col-md-7\">\r\n                                    <div class=\"form-group \">\r\n                                        <input type=\"number\" [(ngModel)]=\"oProveProduct.RetailPrice\" name=\"oProveProduct.RetailPrice\" class=\"form-control form-control-sm\"\r\n                                            [disabled]=\"showEditField\">\r\n                                    </div>\r\n                                </div>\r\n\r\n                                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">หน่วย :</label>\r\n                                <div class=\"form-group col-lg-4 col-md-7\">\r\n                                    <select [(ngModel)]=\"oProveProduct.RetailUnit\" name=\"oProveProduct.RetailUnit\" class=\"form-control form-control-sm\" [disabled]=\"showEditField\">\r\n                                        <option *ngFor=\"let opt of UnitOption\" value={{opt.ProductUnitCode}}>{{opt.ProductUnitNameTH}}\r\n                                        </option>\r\n                                    </select>\r\n                                </div>\r\n                            </div>\r\n\r\n                            <div class=\"row\">\r\n                                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">มูลค่าภาษีพิสูจน์ :</label>\r\n                                <div class=\"col-lg-4 col-md-7\">\r\n                                    <div class=\"form-group \">\r\n                                        <input type=\"number\" [(ngModel)]=\"oProveProduct.VatProve\" name=\"oProveProduct.VatProve\" class=\"form-control form-control-sm\"\r\n                                            [disabled]=\"showEditField\">\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                    </div>\r\n                </div>\r\n\r\n                <!-- ปริมาณของกลางที่เหลือจากการพิสูจน์ -->\r\n                <div class=\"card card-outline-bluish unset-radius\">\r\n                    <div class=\"card-header unset-radius\">\r\n                        <app-card-actions-collapse></app-card-actions-collapse>\r\n                        <h4 class=\"card-title m-b-0\">ปริมาณของกลางที่เหลือจากการพิสูจน์</h4>\r\n                    </div>\r\n                    <div class=\"card-body\">\r\n                        <form class=\"form-horizontal\">\r\n\r\n                            <div class=\"row\">\r\n                                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">จำนวน :</label>\r\n                                <div class=\"col-lg-4 col-md-7\">\r\n                                    <div class=\"form-group \">\r\n                                        <input type=\"number\" [(ngModel)]=\"oProveProduct.QtyBalance\" name=\"oProveProduct.QtyBalance\" class=\"form-control form-control-sm\"\r\n                                            [disabled]=\"showEditField\">\r\n                                    </div>\r\n                                </div>\r\n                                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">หน่วย :</label>\r\n                                <div class=\"form-group input-group  col-lg-4 col-md-7\">\r\n                                    <select [(ngModel)]=\"oProveProduct.QtyBalanceUnit\" name=\"oProveProduct.QtyBalanceUnit\" class=\"form-control form-control-sm\"\r\n                                        [disabled]=\"showEditField\">\r\n                                        <option *ngFor=\"let opt of UnitOption\" value={{opt.ProductUnitCode}}>{{opt.ProductUnitNameTH}}\r\n                                        </option>\r\n                                    </select>\r\n                                </div>\r\n                            </div>\r\n\r\n                            <div class=\"row\">\r\n                                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">ปริมาณสุทธิ :</label>\r\n                                <div class=\"col-lg-4 col-md-7\">\r\n                                    <div class=\"form-group \">\r\n                                        <input type=\"number\" [(ngModel)]=\"oProveProduct.NetVolumeBalance\" name=\"oProveProduct.NetVolumeBalance\" class=\"form-control form-control-sm\"\r\n                                            [disabled]=\"showEditField\">\r\n                                    </div>\r\n                                </div>\r\n                                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">หน่วย :</label>\r\n                                <div class=\"form-group input-group  col-lg-4 col-md-7\">\r\n                                    <select [(ngModel)]=\"oProveProduct.NetVolumeBalanceUnit\" name=\"oProveProduct.NetVolumeBalanceUnit\" class=\"form-control form-control-sm\"\r\n                                        [disabled]=\"showEditField\">\r\n                                        <option *ngFor=\"let opt of UnitOption\" value={{opt.ProductUnitCode}}>{{opt.ProductUnitNameTH}}\r\n                                        </option>\r\n                                    </select>\r\n                                </div>\r\n                            </div>\r\n\r\n                            <div class=\"row\">\r\n                                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">หมายเหตุ :</label>\r\n                                <div class=\"form-group col-lg-4 col-md-12\">\r\n                                    <input type=\"text\" [(ngModel)]=\"oProveProduct.Remarks\" name=\"oProveProduct.Remarks\" class=\"form-control form-control-sm\"\r\n                                        [disabled]=\"showEditField\">\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                    </div>\r\n                </div>\r\n\r\n                <!-- รายงานผลการพิสูจน์ -->\r\n                <div class=\"card card-outline-bluish unset-radius\">\r\n                    <div class=\"card-header unset-radius\">\r\n                        <app-card-actions-collapse></app-card-actions-collapse>\r\n                        <h4 class=\"card-title m-b-0\">รายงานผลการพิสูจน์</h4>\r\n                    </div>\r\n                    <div class=\"card-body\">\r\n                        <form class=\"form-horizontal\">\r\n                            <div class=\"row\">\r\n                                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">เลขที่หนังสือนำส่ง :</label>\r\n                                <div class=\"col-lg-3 col-md-7\">\r\n                                    <div class=\"form-group \">\r\n                                        <input type=\"text\" [(ngModel)]=\"oProveScience.DeliveryDocNo\" name=\"oProveScience.DeliveryDocNo\" class=\"form-control form-control-sm\"\r\n                                            [disabled]=\"showEditField\">\r\n                                    </div>\r\n                                </div>\r\n                                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">วันที่นำส่ง :</label>\r\n                                <div class=\"form-group input-group  col-lg-5 col-md-8\">\r\n                                    <div style=\"width:50%\">\r\n                                        <my-date-picker-th name=\"ProveScienceDate\" [options]=\"myDatePickerOptions\" [(ngModel)]=\"ProveScienceDate\" [disabled]=\"showEditField\"></my-date-picker-th>\r\n                                    </div>\r\n                                    <!-- <input type=\"date\" class=\"form-control form-control-sm\" [(ngModel)]=\"ProveScienceDate\" name=\"ProveScienceDate\" [disabled]=\"showEditField\"> -->\r\n\r\n                                    <label for=\"\" class=\"\">&nbsp; เวลา : &nbsp;</label>\r\n                                    <input type=\"time\" [(ngModel)]=\"ProveScienceTime\" name=\"ProveScienceTime\" class=\"form-control form-control-sm\" [disabled]=\"showEditField\">\r\n                                </div>\r\n                            </div>\r\n\r\n                            <div class=\"row\">\r\n                                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">เลขที่คำขอ :</label>\r\n                                <div class=\"col-lg-3 col-md-7\">\r\n                                    <div class=\"form-group \">\r\n                                        <input type=\"text\" [(ngModel)]=\"oProveScience.RequestNo\" name=\"oProveScience.RequestNo\" class=\"form-control form-control-sm\"\r\n                                            [disabled]=\"showEditField\">\r\n                                    </div>\r\n                                </div>\r\n                                <label for=\"\" class=\"col-lg-2 col-md-4 control-label\">เลขที่รายงานผล :</label>\r\n                                <div class=\"form-group input-group  col-lg-5 col-md-7\">\r\n                                    <input type=\"text\" [(ngModel)]=\"oProveScience.ReportNo\" name=\"oProveScience.ReportNo\" class=\"form-control form-control-sm\"\r\n                                        [disabled]=\"showEditField\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"row\">\r\n                                <div class=\"form-group input-group  col-lg-4 col-md-7\">\r\n                                    <input type=\"checkbox\" [(ngModel)]=\"IsProveScience\" name=\"IsProveScience\" class=\"filled-in chk-col-indigo\" [disabled]=\"showEditField\">\r\n                                    <label for=\"md_checkbox_7\">ส่งพิสูจน์ทางเคมีหรือวิทยาศาสตร์ </label>&nbsp;&nbsp;\r\n                                </div>\r\n                            </div>\r\n\r\n                            <div class=\"row\">\r\n                                <label for=\"\" class=\"col-lg-3 col-md-6 control-label\">รายงานผลทางเคมีหรือวิทยาศาสตร์ :</label>\r\n                                <div class=\"col-lg-9 col-md-6\">\r\n                                    <div class=\"form-group \">\r\n                                        <input type=\"text\" [(ngModel)]=\"oProveProduct.ProveScienceResult\" name=\"oProveProduct.ProveScienceResult\" class=\"form-control form-control-sm\"\r\n                                            [disabled]=\"showEditField\">\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n\r\n                            <div class=\"row\">\r\n                                <label for=\"\" class=\"col-lg-3 col-md-6 control-label\">รายงานการตรวจพิสูจน์ของกลาง :</label>\r\n                                <div class=\"col-lg-9 col-md-6\">\r\n                                    <div class=\"form-group \">\r\n                                        <textarea [(ngModel)]=\"oProveProduct.ProveResult\" name=\"oProveProduct.ProveResult\" cols=\"\" rows=\"5\" class=\"form-control form-control-sm\"\r\n                                            [disabled]=\"showEditField\"></textarea>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <div class=\"col-lg-2 col-sm-4\">\r\n                    <button type=\"button\" class=\"btn btn-block btn-themecolor\" data-toggle=\"modal\" data-target=\"#SciencePopup\" (click)=\"ClosePopupProduct()\"\r\n                        [disabled]=\"showEditField\">บันทึก</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/pages/prove/manage/manage.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_header_navigation_navigation_service__ = __webpack_require__("./src/app/shared/header-navigation/navigation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__prove_service__ = __webpack_require__("./src/app/pages/prove/prove.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_arrest_service__ = __webpack_require__("./src/app/pages/model/arrest.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__model_lawsuit_service__ = __webpack_require__("./src/app/pages/model/lawsuit.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__model_master_service__ = __webpack_require__("./src/app/pages/model/master.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__config_message__ = __webpack_require__("./src/app/config/message.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_preloader_preloader_component__ = __webpack_require__("./src/app/shared/preloader/preloader.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__config_dateFormat__ = __webpack_require__("./src/app/config/dateFormat.ts");
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
    function ManageComponent(navService, ngbModel, activeRoute, proveService, ArrestSV, LawsuitSV, MasterSV, router, preloader) {
        this.navService = navService;
        this.ngbModel = ngbModel;
        this.activeRoute = activeRoute;
        this.proveService = proveService;
        this.ArrestSV = ArrestSV;
        this.LawsuitSV = LawsuitSV;
        this.MasterSV = MasterSV;
        this.router = router;
        this.preloader = preloader;
        this.programSpect = 'ILG60-05-02-00';
        this.myDatePickerOptions = __WEBPACK_IMPORTED_MODULE_10__config_dateFormat__["a" /* MyDatePickerOptions */];
        // --- Array ---
        this.rawOptions = [];
        this.options = [];
        this.rawStaffOptions = [];
        this.Staffoptions = [];
        this.Scienceoptions = [];
        this.Deliveryoptions = [];
        this.UnitOption = [];
        this.ArrestProduct = [];
        this.ListProveDoc = [];
        this.ListProduct = [];
        this.ListQtyUnit = [];
        this.ReportNo = ""; // เลขทะเบียนตรวจพิสูจน์  (ไม่รวม /ปี พ.ศ.)
        this.DeliveryDocNo = ""; // เลขที่หนังสือนำส่ง
        this.modePopup = 'I';
        // set false
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
        // set true
        this.navService.setNextPageButton(true);
    }
    ManageComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var date, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.preloader.setShowPreloader(true);
                        return [4 /*yield*/, this.navService.setEditField(true)];
                    case 1:
                        _d.sent();
                        this.active_Route();
                        this.navigate_Service();
                        this.CreateObject();
                        this.CreateProduct();
                        this.CreateScience();
                        // this.CreateStaff();
                        this.CreateDocuement();
                        this.getUnit();
                        return [4 /*yield*/, this.getStation()];
                    case 2:
                        _d.sent();
                        return [4 /*yield*/, this.getProveStaff()];
                    case 3:
                        _d.sent();
                        this.ArrestCode = this.ArrestCode;
                        this.ProveStaffName = "";
                        this.ScienceStaffName = "";
                        this.ProveStation = "";
                        date = new Date();
                        this.ProveYear = (date.getFullYear() + 543).toString();
                        this.ProveDate = Object(__WEBPACK_IMPORTED_MODULE_10__config_dateFormat__["f" /* setDateMyDatepicker */])(new Date(this.getCurrentDate()));
                        _a = this;
                        return [4 /*yield*/, this.getCurrentTime()];
                    case 4:
                        _a.ProveTime = _d.sent();
                        this.DeliveryDate = Object(__WEBPACK_IMPORTED_MODULE_10__config_dateFormat__["f" /* setDateMyDatepicker */])(new Date(this.getCurrentDate()));
                        _b = this;
                        return [4 /*yield*/, this.getCurrentTime()];
                    case 5:
                        _b.DeliveryTime = _d.sent();
                        this.ProveScienceDate = Object(__WEBPACK_IMPORTED_MODULE_10__config_dateFormat__["f" /* setDateMyDatepicker */])(new Date(this.getCurrentDate()));
                        _c = this;
                        return [4 /*yield*/, this.getCurrentTime()];
                    case 6:
                        _c.ProveScienceTime = _d.sent();
                        if (!(this.ProveID != '0')) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.getProveByID()];
                    case 7:
                        _d.sent();
                        _d.label = 8;
                    case 8: return [4 /*yield*/, this.getLawsuitByID()];
                    case 9:
                        _d.sent();
                        return [4 /*yield*/, this.getGuiltBaseByID()];
                    case 10:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.active_Route = function () {
        // this.sub = this.navService.showFieldEdit.subscribe(status => {
        //     if (!status) {
        //         this.navService.setCancelButton(true);
        //         this.navService.setSaveButton(true);
        //         this.navService.setPrintButton(false);
        //         this.navService.setSearchBar(false);
        //         this.navService.setDeleteButton(false);
        //         this.navService.setEditButton(false);
        var _this = this;
        //     } else {
        //         this.navService.setPrintButton(true);
        //         this.navService.setDeleteButton(true);
        //         this.navService.setEditButton(true);
        //         this.navService.setSearchBar(false);
        //         this.navService.setCancelButton(false);
        //         this.navService.setSaveButton(false);
        //     }
        //     this.navService.setNextPageButton(true);
        // });
        this.param = this.activeRoute.params.subscribe(function (p) {
            _this.navService.setPrintButton(true);
            _this.navService.setDeleteButton(true);
            _this.navService.setEditButton(true);
            _this.navService.setSearchBar(false);
            _this.navService.setCancelButton(false);
            _this.navService.setSaveButton(false);
            _this.navService.setNextPageButton(true);
            if (p['code1']) {
                _this.LawsuitID = p['code1'];
            }
            if (p['code2']) {
                _this.ArrestCode = p['code2'];
            }
            if (p['code3']) {
                _this.IndictmentID = p['code3'];
            }
            if (p['code4']) {
                _this.GuiltBaseID = p['code4'];
            }
            if (p['code5']) {
                _this.ProveID = p['code5'];
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
                        if (!status) return [3 /*break*/, 8];
                        this.preloader.setShowPreloader(true);
                        // set action save = false
                        return [4 /*yield*/, this.navService.setOnSave(false)];
                    case 1:
                        // set action save = false
                        _a.sent();
                        if (!(this.ReportNo == ""
                            // || this.ProveStaffName == "" || this.ProveStaffName == undefined
                            // || this.ScienceStaffName == "" || this.ScienceStaffName == undefined
                            || this.ProveStation == "" || this.ProveStation == undefined
                            || this.ProveDate == null || this.DeliveryDate == null)) return [3 /*break*/, 2];
                        this.isRequired = true;
                        alert(__WEBPACK_IMPORTED_MODULE_8__config_message__["a" /* Message */].checkData);
                        // this.showEditField = false;
                        return [2 /*return*/, false];
                    case 2:
                        if (!this.oProve) return [3 /*break*/, 6];
                        if (!(this.ProveID == '0')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.onInsProve()];
                    case 3:
                        _a.sent();
                        this.router.navigate(['/prove/list']);
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.onUpdProve()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [4 /*yield*/, this.onComplete()];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [2 /*return*/];
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
                        if (!confirm(__WEBPACK_IMPORTED_MODULE_8__config_message__["a" /* Message */].confirmAction)) return [3 /*break*/, 2];
                        // await this.navService.setOnCancel(false);
                        // this.router.navigate(['/prove/list']);
                        return [4 /*yield*/, this.navService.setOnSave(false)];
                    case 1:
                        // await this.navService.setOnCancel(false);
                        // this.router.navigate(['/prove/list']);
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    };
    ManageComponent.prototype.onInsProve = function () {
        return __awaiter(this, void 0, void 0, function () {
            var DDate, cDateDelivery, PDate, cProveDate, isSuccess;
            var _this = this;
            return __generator(this, function (_a) {
                this.preloader.setShowPreloader(true);
                this.oProve.DeliveryDocNo = this.DeliveryDocNo;
                DDate = this.DeliveryDate.date;
                if (DDate != undefined) {
                    cDateDelivery = DDate.year + '-' + DDate.month + '-' + DDate.day + ' ' + this.DeliveryTime;
                }
                PDate = this.ProveDate.date;
                if (PDate != undefined) {
                    cProveDate = PDate.year + '-' + PDate.month + '-' + PDate.day + ' ' + this.ProveTime;
                }
                this.oProve.DeliveryDate = cDateDelivery;
                this.oProve.ProveReportNo = this.ReportNo + "/" + this.ProveYear;
                this.oProve.ProveDate = cProveDate;
                this.oProve.IndictmentID = this.IndictmentID;
                this.oProve.ProveStaff = [];
                if (this.oProveStaff != 'nulll' && this.oProveStaff != undefined) {
                    this.oProve.ProveStaff.push(this.oProveStaff);
                }
                if (this.oProveScienceStaff != 'nulll' && this.oProveScienceStaff != undefined) {
                    this.oProve.ProveStaff.push(this.oProveScienceStaff);
                }
                isSuccess = true;
                this.proveService.insAll(this.oProve).then(function (IsSuccess) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        if (!IsSuccess) {
                            isSuccess = IsSuccess;
                            return [2 /*return*/, false];
                        }
                        if (this.ListProveDoc.length > 0) {
                            this.ListProveDoc.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            item.ReferenceCode = this.oProve.ProveReportNo;
                                            return [4 /*yield*/, this.proveService.DocumentinsAll(item).then(function (IsSuccess) {
                                                    if (!IsSuccess) {
                                                        isSuccess = IsSuccess;
                                                        return false;
                                                    }
                                                }, function (error) { isSuccess = false; console.error(error); return false; })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                        return [2 /*return*/];
                    });
                }); }, function (error) { isSuccess = false; console.error(error); return false; });
                if (isSuccess) {
                    this.preloader.setShowPreloader(false);
                    alert(__WEBPACK_IMPORTED_MODULE_8__config_message__["a" /* Message */].saveComplete);
                    this.oProve = {};
                    this.router.navigate(['/prove/list']);
                }
                else {
                    this.preloader.setShowPreloader(false);
                    alert(__WEBPACK_IMPORTED_MODULE_8__config_message__["a" /* Message */].saveFail);
                }
                return [2 /*return*/];
            });
        });
    };
    ManageComponent.prototype.onUpdProve = function () {
        var _this = this;
        var DDate, cDateDelivery, PDate, cProveDate;
        DDate = this.DeliveryDate.date;
        if (DDate != undefined) {
            cDateDelivery = DDate.year + '-' + DDate.month + '-' + DDate.day + ' ' + this.DeliveryTime;
        }
        PDate = this.ProveDate.date;
        if (PDate != undefined) {
            cProveDate = PDate.year + '-' + PDate.month + '-' + PDate.day + ' ' + this.ProveTime;
        }
        this.oProve.DeliveryDocNo = this.DeliveryDocNo;
        this.oProve.DeliveryDate = cDateDelivery;
        this.oProve.ProveReportNo = this.ReportNo + "/" + this.ProveYear;
        this.oProve.ProveDate = cProveDate;
        this.oProve.IndictmentID = this.IndictmentID;
        // var aIndex;
        // aIndex = this.getIndexOf(this.oProve.ProveStaff, "14", "ContributorCode");
        // if (aIndex != -1) {
        //     this.oProve.ProveStaff[aIndex] = this.oProveStaff;
        //     this.oProve.ProveStaff[aIndex].ProveID = this.ProveID;
        // }
        // var sIndex;
        // sIndex = this.getIndexOf(this.oProve.ProveStaff, "15", "ContributorCode");
        // if (sIndex != -1) {
        //     this.oProve.ProveStaff[sIndex] = this.oProveScienceStaff;
        //     this.oProve.ProveStaff[sIndex].ProveID = this.ProveID;
        // }
        this.oProve.ProveStaff = [];
        if (this.oProveStaff != 'nulll' && this.oProveStaff != undefined) {
            this.oProve.ProveStaff.push(this.oProveStaff);
            this.oProve.ProveStaff[this.oProve.ProveStaff.length - 1].ProveID = this.ProveID;
        }
        if (this.oProveScienceStaff != 'nulll' && this.oProveScienceStaff != undefined) {
            this.oProve.ProveStaff.push(this.oProveScienceStaff);
            this.oProve.ProveStaff[this.oProve.ProveStaff.length - 1].ProveID = this.ProveID;
        }
        this.ListProduct = this.oProve.ProveProduct;
        this.oProve.ProveProduct = [];
        if (this.oProve.ProveScience.length > 0) {
            if (this.oProve.ProveScience[0].ProveScienceDate == null) {
                this.oProve.ProveScience[0].ProveScienceDate = cProveDate;
                this.oProve.ProveScience[0].ProveScienceTime = this.ProveTime;
            }
            else {
                this.oProve.ProveScience[0].ProveScienceDate = cProveDate;
            }
        }
        // -----------------------------------------------------------
        //                       Call API Update
        // -----------------------------------------------------------
        var isSuccess = true;
        // Update Prove
        this.proveService.ProveupdByCon(this.oProve).then(function (IsSuccess) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!IsSuccess) {
                    isSuccess = IsSuccess;
                    return [2 /*return*/, false];
                }
                return [2 /*return*/];
            });
        }); }, function (error) { isSuccess = false; console.error(error); return false; });
        if (!isSuccess)
            return false;
        if (this.ListProduct.length > 0) {
            // New Product
            this.ListProduct.filter(function (item) { return item.IsNewItem === true; })
                .map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            item.ProveID = this.ProveID;
                            item.ReferenceDate = this.oProve.ProveDate + ".000";
                            return [4 /*yield*/, this.proveService.ProveProductinsAll(item).then(function (IsSuccess) {
                                    if (!IsSuccess) {
                                        isSuccess = IsSuccess;
                                        return false;
                                    }
                                }, function (error) { isSuccess = false; console.error(error); return false; })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            if (!isSuccess)
                return false;
            // Update Product
            this.ListProduct.filter(function (item) { return item.IsNewItem === false; })
                .map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            item.ReferenceDate = this.oProve.ProveDate + ".000";
                            return [4 /*yield*/, this.proveService.ProveProductupdByCon(item).then(function (IsSuccess) {
                                    if (!IsSuccess) {
                                        isSuccess = IsSuccess;
                                        return false;
                                    }
                                }, function (error) { isSuccess = false; console.error(error); return false; })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            if (!isSuccess)
                return false;
            // Delete Product
            this.ListProduct.filter(function (item) { return item.IsDelItem === true; })
                .map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.proveService.ProveProductupdDelete(item).then(function (IsSuccess) {
                                if (!IsSuccess) {
                                    isSuccess = IsSuccess;
                                    return false;
                                }
                            }, function (error) { isSuccess = false; console.error(error); return false; })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        }
        debugger;
        if (this.ListProveDoc.length > 0) {
            // New Document
            this.ListProveDoc.filter(function (item) { return item.IsNewItem === true; })
                .map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            item.ReferenceCode = this.oProve.ProveReportNo;
                            debugger;
                            return [4 /*yield*/, this.proveService.DocumentinsAll(item).then(function (IsSuccess) {
                                    if (!IsSuccess) {
                                        isSuccess = IsSuccess;
                                        return false;
                                    }
                                }, function (error) { isSuccess = false; console.error(error); return false; })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            if (!isSuccess)
                return false;
            // Edit Document
            this.ListProveDoc.filter(function (item) { return item.IsNewItem === false; })
                .map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            item.ReferenceCode = this.oProve.ProveReportNo;
                            return [4 /*yield*/, this.proveService.DocumentupdByCon(item).then(function (IsSuccess) {
                                    if (!IsSuccess) {
                                        isSuccess = IsSuccess;
                                        return false;
                                    }
                                }, function (error) { isSuccess = false; console.error(error); return false; })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            if (!isSuccess)
                return false;
            // Del Document
            this.ListProveDoc.filter(function (item) { return item.IsDelItem === true; })
                .map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.proveService.DocumentupdDelete(item).then(function (IsSuccess) {
                                if (!IsSuccess) {
                                    isSuccess = IsSuccess;
                                    return false;
                                }
                            }, function (error) { isSuccess = false; console.error(error); return false; })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            if (!isSuccess)
                return false;
        }
        if (isSuccess) {
            alert(__WEBPACK_IMPORTED_MODULE_8__config_message__["a" /* Message */].saveComplete);
            this.oProve.ProveProduct = this.ListProduct;
            this.preloader.setShowPreloader(false);
        }
        else {
            alert(__WEBPACK_IMPORTED_MODULE_8__config_message__["a" /* Message */].saveFail);
            this.preloader.setShowPreloader(false);
        }
    };
    ManageComponent.prototype.onDelete = function () {
        var _this = this;
        if (confirm(__WEBPACK_IMPORTED_MODULE_8__config_message__["a" /* Message */].confirmDeleteProduct)) {
            this.proveService.ProveupdDelete(this.ProveID).then(function (IsSuccess) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (IsSuccess) {
                        this.oProve = {};
                        alert(__WEBPACK_IMPORTED_MODULE_8__config_message__["a" /* Message */].saveComplete);
                        this.router.navigate(['/prove/list']);
                    }
                    else {
                        alert(__WEBPACK_IMPORTED_MODULE_8__config_message__["a" /* Message */].saveFail);
                    }
                    return [2 /*return*/];
                });
            }); }, function (error) { console.error(error); return false; });
        }
    };
    ManageComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
        this.param.unsubscribe();
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
    // openSuspect(e) {
    //     this.modal = this.suspectModalService.open(e, { size: 'lg', centered: true });
    // }
    ManageComponent.prototype.CreateObject = function () {
        this.oProve = {
            ProveID: "",
            DeliveryDocNo: "",
            DeliveryDate: null,
            ProveReportNo: "",
            ProveDate: null,
            ProveStationCode: "",
            ProveStation: "",
            IndictmentID: "",
            DeliveryStationCode: "",
            DeliveryStation: "",
            IsActive: 1,
            ProveProduct: [],
            ProveStaff: [],
            ProveScience: []
        };
    };
    ManageComponent.prototype.CreateProduct = function () {
        this.oProveProduct = {};
        this.oProveProduct = {
            ProductID: "",
            ProductType: "",
            ProveID: "",
            ProductRefID: "",
            GroupCode: "",
            IsDomestic: "",
            ProductCode: "",
            BrandCode: "",
            BrandNameTH: "",
            BrandNameEN: "",
            SubBrandCode: "",
            SubBrandNameTH: "",
            SubBrandNameEN: "",
            ModelCode: "",
            ModelName: "",
            FixNo1: "",
            DegreeCode: "",
            Degree: "",
            SizeCode: "",
            Size: "",
            SizeUnitCode: "",
            SizeUnitName: "",
            FixNo2: "",
            SequenceNo: "",
            ProductDesc: "",
            CarNo: "",
            Qty: "",
            QtyUnit: "",
            NetVolume: "",
            NetVolumeUnit: "",
            ProveScienceID: "",
            ProveScienceResult: "",
            IsActive: "1",
            ReferenceRetailPrice: "",
            ReferenceVatRate: "",
            ReferenceVatQty: "",
            ReferenceRetailUnit: "",
            ReferenceVatValue: "",
            ReferenceVatUnit: "",
            ReferenceDate: "",
            IsStatusExhibit: "",
            Remarks: "",
            IsNewItem: false,
            IsDelItem: false
        };
    };
    ManageComponent.prototype.CreateScience = function () {
        this.oProveScience = {};
        this.oProveScience = {
            ProveScienceID: "",
            ProveID: "",
            ProveScienceDate: "",
            ProveScienceTime: "",
            RequestNo: "",
            ReportNo: "",
            IsProveScience: "",
            DeliveryDocNo: "",
            IsActive: 1,
        };
    };
    // CreateStaff()
    // {
    //     this.oProveStaff = {};
    //     this.oProveStaff = {
    //         ProgramCode: "XCS-60",
    //         ProcessCode: "XCS-60-05",
    //         LawsuitID: this.LawsuitID,
    //         StaffCode: "-",
    //         TitleName: "",
    //         FirstName: "",
    //         LastName: "",
    //         PositionCode: "",
    //         PositionName: "",
    //         PosLevel: "",
    //         PosLevelName: "",
    //         DepartmentCode: "",
    //         DepartmentName: "",
    //         DepartmentLevel: "",
    //         OfficeCode: "",
    //         OfficeName: "",
    //         OfficeShortName: "",
    //         ContributorCode: "14"
    //     }
    //     this.oProveScienceStaff = {};
    //     this.oProveScienceStaff = {
    //         ProgramCode: "XCS-60",
    //         ProcessCode: "XCS-60-05",
    //         LawsuitID: this.LawsuitID,
    //         StaffCode: "-",
    //         TitleName: "-",
    //         FirstName: "-",
    //         LastName: "-",
    //         PositionCode: "",
    //         PositionName: "",
    //         PosLevel: "",
    //         PosLevelName: "",
    //         DepartmentCode: "",
    //         DepartmentName: "",
    //         DepartmentLevel: "",
    //         OfficeCode: "",
    //         OfficeName: "",
    //         OfficeShortName: "",
    //         ContributorCode: "15"
    //     }
    // }
    ManageComponent.prototype.CreateDocuement = function () {
        this.oProveDocument = {};
        this.oProveDocument = {
            DocumentID: "",
            ReferenceCode: "",
            FilePath: "",
            DataSource: "",
            DocumentType: "",
            DocumentName: "",
            IsActive: "1"
        };
    };
    ManageComponent.prototype.getProveByID = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // this.preloader.setShowPreloader(true);
                        debugger;
                        return [4 /*yield*/, this.proveService.ProvegetByCon(this.ProveID).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var PRN, PDate, PSDate, PStaff, PScienceStaff, i;
                                return __generator(this, function (_a) {
                                    if (res != null) {
                                        this.oProve = res;
                                        PRN = this.oProve.ProveReportNo.split('/');
                                        if (PRN.length > 1) {
                                            this.ReportNo = PRN[0];
                                            this.ProveYear = PRN[1];
                                        }
                                        this.ProveStation = "" + (this.oProve.ProveStation == 'null' ? '' : this.oProve.ProveStation);
                                        this.ProveDelivery = "" + (this.oProve.DeliveryStation == 'null' ? '' : this.oProve.DeliveryStation);
                                        this.DeliveryDocNo = this.oProve.DeliveryDocNo;
                                        PDate = this.oProve.ProveDate.toString().split(" ");
                                        this.ProveDate = Object(__WEBPACK_IMPORTED_MODULE_10__config_dateFormat__["f" /* setDateMyDatepicker */])(new Date(PDate[0]));
                                        this.ProveTime = PDate[1] + ".000";
                                        PSDate = this.oProve.DeliveryDate.toString().split(" ");
                                        this.DeliveryDate = Object(__WEBPACK_IMPORTED_MODULE_10__config_dateFormat__["f" /* setDateMyDatepicker */])(new Date(PSDate[0]));
                                        this.DeliveryTime = PSDate[1] + ".000";
                                        PStaff = this.oProve.ProveStaff.filter(function (f) { return f.ContributorCode == "14"; });
                                        if (PStaff.length > 0) {
                                            this.ProveStaffName = PStaff[0].TitleName + PStaff[0].FirstName + ' ' + PStaff[0].LastName;
                                            this.PosExaminer = PStaff[0].PositionName;
                                            this.DeptExaminer = PStaff[0].DepartmentName;
                                            this.StaffID = PStaff[0].StaffID;
                                            this.oProveStaff = PStaff[0];
                                        }
                                        PScienceStaff = this.oProve.ProveStaff.filter(function (f) { return f.ContributorCode == "15"; });
                                        if (PScienceStaff.length) {
                                            this.ScienceStaffName = PScienceStaff[0].TitleName + PScienceStaff[0].FirstName + ' ' + PScienceStaff[0].LastName;
                                            this.PosScience = PScienceStaff[0].PositionName;
                                            this.DeptScience = PScienceStaff[0].DepartmentName;
                                            this.StaffScienceID = PScienceStaff[0].StaffID;
                                            this.oProveScienceStaff = PScienceStaff[0];
                                        }
                                        this.oProve.ProveStaff = [];
                                        this.oProve.ProveProduct.map(function (item) {
                                            item.IsNewItem = false;
                                            item.IsDelItem = false;
                                            item.Remarks = "" + (item.Remarks == null ? '' : item.Remarks);
                                            item.ProveScienceResult = "" + (item.ProveScienceResult == null ? '' : item.ProveScienceResult);
                                            item.ProveResult = "" + (item.ProveResult == null ? '' : item.ProveResult);
                                        });
                                        for (i = 0; i < this.oProve.ProveProduct.length; i += 1) {
                                            this.oProve.ProveProduct[i].ProductSeq = i;
                                        }
                                        this.oProve.ProveScience.map(function (item) {
                                            item.DeliveryDocNo = "" + (item.DeliveryDocNo == null ? '' : item.DeliveryDocNo);
                                            item.ProveScienceDate = "" + (item.ProveScienceDate == null ? '' : item.ProveScienceDate);
                                            item.RequestNo = "" + (item.RequestNo == null ? '' : item.RequestNo);
                                            item.ReportNo = "" + (item.ReportNo == null ? '' : item.ReportNo);
                                        });
                                    }
                                    return [2 /*return*/];
                                });
                            }); }, function (err) {
                                alert(err.message);
                            })];
                    case 1:
                        _a.sent();
                        this.ListProveDoc = [];
                        return [4 /*yield*/, this.proveService.DocumentgetByCon(this.oProve.ProveReportNo).then(function (doc) { return __awaiter(_this, void 0, void 0, function () {
                                var i;
                                return __generator(this, function (_a) {
                                    if (doc) {
                                        this.ListProveDoc.push(doc);
                                        for (i = 0; i < this.ListProveDoc.length; i += 1) {
                                            this.ListProveDoc[i].DocumentSeq = i;
                                            this.ListProveDoc[i].IsNewItem = false;
                                            this.ListProveDoc[i].IsDelItem = false;
                                        }
                                    }
                                    return [2 /*return*/];
                                });
                            }); }, function (err) {
                                alert(err.message);
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.getLawsuitByID = function () {
        var _this = this;
        if (this.IndictmentID != "0") {
            this.LawsuitSV.LawsuitegetByCon(this.LawsuitID).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                var aIndex;
                return __generator(this, function (_a) {
                    // --- รายละเอียดคดี ----
                    if (res.length > 0) {
                        if (res[0].ArrestIndicment.length > 0) {
                            aIndex = this.getIndexOf(res[0].ArrestIndicment, this.IndictmentID, "IndictmentID");
                            if (aIndex != -1) {
                                if (res[0].ArrestIndicment[aIndex].Lawsuit.length > 0) {
                                    if (res[0].ArrestIndicment[aIndex].Lawsuit[0].IsOutside == "1") {
                                        this.LawsuiltCode = "น " + res[0].ArrestIndicment[aIndex].Lawsuit[0].LawsuitNo;
                                    }
                                    else {
                                        this.LawsuiltCode = res[0].ArrestIndicment[aIndex].Lawsuit[0].LawsuitNo;
                                    }
                                }
                            }
                        }
                    }
                    return [2 /*return*/];
                });
            }); }, function (err) {
            });
        }
    };
    ManageComponent.prototype.getArrestByID = function (ArrestCode) {
        var _this = this;
        debugger;
        this.ArrestSV.getByArrestCon(ArrestCode).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(res.length > 0)) return [3 /*break*/, 4];
                        if (!(res.IsSuccess == true)) return [3 /*break*/, 2];
                        this.oArrest = res.ResponseData;
                        this.ArrestProduct = res.ResponseData.ArrestProduct;
                        return [4 /*yield*/, this.getProveProduct()];
                    case 1:
                        _a.sent();
                        this.preloader.setShowPreloader(false);
                        return [3 /*break*/, 3];
                    case 2:
                        alert(res.ResponseData.Msg);
                        this.preloader.setShowPreloader(false);
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        this.preloader.setShowPreloader(false);
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); }, function (err) {
            //alert(err.message);
        });
    };
    ManageComponent.prototype.getGuiltBaseByID = function () {
        var _this = this;
        this.LawsuitSV.getGuiltBaseByCon(this.GuiltBaseID).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.SectionName = res.CompareMasLawSection.SectionName;
                        this.GuiltBaseName = res.CompareMasLawGuiltBase.GuiltBaseName;
                        this.SectionNo = res.CompareMasLawPenalty.SectionNo.toString();
                        this.PenaltyDesc = res.CompareMasLawPenalty.PenaltyDesc;
                        return [4 /*yield*/, this.getArrestByID(this.ArrestCode)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }, function (err) {
            alert(err.message);
        });
    };
    ManageComponent.prototype.getIndexOf = function (arr, val, prop) {
        var l = arr.length, k = 0;
        for (k = 0; k < l; k = k + 1) {
            if (arr[k][prop] == val) {
                return k;
            }
        }
        return -1;
    };
    ManageComponent.prototype.getProveProduct = function () {
        // this.preloader.setShowPreloader(true);
        // ---- กรณีไม่มีเลข ProveID จะ default Product จาก ArrestProduct----
        if (this.ProveID == "0") {
            if (this.oArrest.ArrestProduct.length > 0) {
                this.oProve.ProveProduct = [];
                this.oProve.ProveScience = [];
                this.oProveScience = {
                    ProveScienceID: "",
                    ProveID: "",
                    ProveScienceDate: "",
                    ProveScienceTime: "",
                    RequestNo: "",
                    ReportNo: "",
                    DeliveryDocNo: "",
                    IsActive: 1,
                };
                this.oProve.ProveScience.push(this.oProveScience);
                for (var i = 0; i < this.oArrest.ArrestProduct.length; i += 1) {
                    this.oProveProduct = {
                        ProductID: this.oArrest.ArrestProduct[i].ProductID,
                        ProductType: this.oArrest.ArrestProduct[i].ProductType,
                        ProveID: "",
                        ProductRefID: "",
                        GroupCode: this.oArrest.ArrestProduct[i].GroupCode,
                        IsDomestic: this.oArrest.ArrestProduct[i].IsDomestic,
                        ProductCode: this.oArrest.ArrestProduct[i].ProductCode,
                        BrandCode: this.oArrest.ArrestProduct[i].BrandCode,
                        BrandNameTH: this.oArrest.ArrestProduct[i].BrandNameTH,
                        BrandNameEN: this.oArrest.ArrestProduct[i].BrandNameEN,
                        SubBrandCode: this.oArrest.ArrestProduct[i].SubBrandCode,
                        SubBrandNameTH: this.oArrest.ArrestProduct[i].SubBrandNameTH,
                        SubBrandNameEN: this.oArrest.ArrestProduct[i].SubBrandNameEN,
                        ModelCode: this.oArrest.ArrestProduct[i].ModelCode,
                        ModelName: this.oArrest.ArrestProduct[i].ModelName,
                        FixNo1: this.oArrest.ArrestProduct[i].FixNo1,
                        DegreeCode: this.oArrest.ArrestProduct[i].DegreeCode,
                        Degree: this.oArrest.ArrestProduct[i].Degree,
                        SizeCode: this.oArrest.ArrestProduct[i].SizeCode,
                        Size: this.oArrest.ArrestProduct[i].Size,
                        SizeUnitCode: this.oArrest.ArrestProduct[i].SizeUnitCode,
                        SizeUnitName: this.oArrest.ArrestProduct[i].SizeUnitName,
                        FixNo2: this.oArrest.ArrestProduct[i].FixNo2,
                        SequenceNo: this.oArrest.ArrestProduct[i].SequenceNo,
                        ProductDesc: this.oArrest.ArrestProduct[i].ProductDesc,
                        CarNo: this.oArrest.ArrestProduct[i].CarNo,
                        Qty: this.oArrest.ArrestProduct[i].Qty,
                        QtyUnit: this.oArrest.ArrestProduct[i].QtyUnit,
                        NetVolume: this.oArrest.ArrestProduct[i].NetVolume,
                        NetVolumeUnit: this.oArrest.ArrestProduct[i].NetVolumeUnit,
                        ProveScienceID: "",
                        ProveScienceResult: "",
                        IsActive: "1",
                        ReferenceRetailPrice: "",
                        ReferenceVatRate: "",
                        ReferenceVatQty: "",
                        ReferenceRetailUnit: "",
                        ReferenceVatValue: "",
                        ReferenceVatUnit: "",
                        ReferenceDate: "",
                        IsStatusExhibit: "",
                        Remarks: "",
                        ProveResult: "",
                        IsNewItem: true,
                        IsDelItem: false
                    };
                    this.oProve.ProveProduct.push(this.oProveProduct);
                    this.ListQtyUnit.push(this.oArrest.ArrestProduct[i].QtyUnit);
                }
            }
        }
        this.preloader.setShowPreloader(false);
    };
    // --- เขียนที่ ---
    ManageComponent.prototype.getStation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // this.preloader.setShowPreloader(true);
                    return [4 /*yield*/, this.MasterSV.getStation().then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (res) {
                                    this.rawOptions = res;
                                }
                                return [2 /*return*/];
                            });
                        }); }, function (err) {
                            //alert(err.message);
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
            this.oProve.ProveStationCode = "";
            this.oProve.ProveStation = "";
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
        this.oProve.ProveStationCode = event.OfficeCode;
        this.oProve.ProveStation = event.OfficeName;
    };
    // ----- End เขียนที่ ---
    // --- หน่วยงานที่ส่งมอบ ---
    ManageComponent.prototype.DeliveryOnAutoChange = function (value) {
        if (value == '') {
            this.Deliveryoptions = [];
            this.oProve.DeliveryStationCode = "";
            this.oProve.DeliveryStation = "";
        }
        else {
            this.Deliveryoptions = this.rawOptions.filter(function (f) { return f.OfficeName.toLowerCase().indexOf(value.toLowerCase()) > -1; });
        }
    };
    ManageComponent.prototype.DeliveryOnAutoFocus = function (value) {
        if (value == '') {
            this.Deliveryoptions = [];
        }
    };
    ManageComponent.prototype.DeliveryOnAutoSelecteWord = function (event) {
        this.oProve.DeliveryStationCode = event.OfficeCode;
        this.oProve.DeliveryStation = event.OfficeName;
    };
    // ----- End หน่วยงานที่ส่งมอบ ---
    // --- ผู้ตรวจรับ ---
    ManageComponent.prototype.getProveStaff = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // this.preloader.setShowPreloader(true);
                    return [4 /*yield*/, this.MasterSV.getStaff().then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (res) {
                                    this.rawStaffOptions = res;
                                }
                                return [2 /*return*/];
                            });
                        }); }, function (err) {
                            // alert(err.message);
                        })];
                    case 1:
                        // this.preloader.setShowPreloader(true);
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.StaffonAutoChange = function (value) {
        // 
        if (value == '') {
            this.Staffoptions = [];
            this.ClearStaffData();
        }
        else {
            if (this.rawStaffOptions.length == 0) {
                this.getProveStaff();
            }
            this.Staffoptions = this.rawStaffOptions.filter(function (f) { return f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1; });
        }
    };
    ManageComponent.prototype.StaffonAutoFocus = function (value) {
        if (value == '') {
            this.Staffoptions = [];
            this.ClearStaffData();
        }
    };
    ManageComponent.prototype.StaffonAutoSelecteWord = function (event) {
        this.oProveStaff = {
            StaffID: this.StaffID,
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-05",
            LawsuitID: this.LawsuitID,
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
            ContributorCode: "14"
        };
        this.PosExaminer = event.PosLevelName;
        this.DeptExaminer = event.OperationDeptName;
    };
    // ----- End ผู้ตรวจรับ ---
    // --- ผู้พิสูจน์ ---
    ManageComponent.prototype.ScienceStaffonAutoChange = function (value) {
        // 
        if (value == '') {
            this.Scienceoptions = [];
            this.ClearStaffScience();
        }
        else {
            if (this.rawStaffOptions.length == 0) {
                this.getProveStaff();
            }
            this.Scienceoptions = this.rawStaffOptions.filter(function (f) { return f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1; });
        }
    };
    ManageComponent.prototype.ScienceStaffonAutoFocus = function (value) {
        if (value == '') {
            this.Scienceoptions = [];
            this.ClearStaffScience();
        }
    };
    ManageComponent.prototype.ScienceStaffonAutoSelecteWord = function (event) {
        this.oProveScienceStaff = {
            StaffID: this.StaffScienceID,
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-05",
            LawsuitID: this.LawsuitID,
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
            ContributorCode: "15"
        };
        this.PosScience = event.PosLevelName;
        this.DeptScience = event.OperationDeptName;
    };
    // ----- End ผู้ตรวจรับ ---
    // ----- DateTime -----
    ManageComponent.prototype.getCurrentDate = function () {
        var date = new Date();
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).toISOString().substring(0, 10);
    };
    ManageComponent.prototype.getCurrentTime = function () {
        var date = new Date();
        // 
        return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds();
    };
    // ----- End DateTime -----
    // ----- Unit -----
    ManageComponent.prototype.getUnit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // this.preloader.setShowPreloader(true);
                    return [4 /*yield*/, this.proveService.getProveProductUnit("").then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (res) {
                                    this.UnitOption = res;
                                }
                                return [2 /*return*/];
                            });
                        }); }, function (err) {
                            //alert(err.message);
                        })];
                    case 1:
                        // this.preloader.setShowPreloader(true);
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // ----- End Unit -----
    // ----- Popup Product-----
    ManageComponent.prototype.OpenPopupProduct = function (i) {
        this.oProveProduct = this.oProve.ProveProduct[i];
        if (this.oProve.ProveScience.length > 0) {
            this.oProveScience = this.oProve.ProveScience[0];
            this.ProveScienceDate = Object(__WEBPACK_IMPORTED_MODULE_10__config_dateFormat__["f" /* setDateMyDatepicker */])(new Date(this.oProveScience.ProveScienceDate));
            this.ProveScienceTime = this.oProveScience.ProveScienceTime;
        }
        this.ProductID = this.oProve.ProveProduct[i].ProductID;
        this.iPopup = i;
        this.modePopup = "U";
    };
    ManageComponent.prototype.ClosePopupProduct = function () {
        debugger;
        this.oProveProduct.ProductID = this.ProductID;
        var DDate, cDateScience, PDate, cProveDate;
        DDate = this.ProveScienceDate.date;
        if (DDate != undefined) {
            cDateScience = DDate.year + '-' + DDate.month + '-' + DDate.day + ' ' + this.DeliveryTime;
        }
        this.oProveScience.ProveScienceDate = this.oProve.DeliveryDate = cDateScience;
        ;
        this.oProveScience.ProveScienceTime = this.ProveScienceTime;
        if (this.oProve.ProveScience.length > 0) {
            this.oProve.ProveScience[0] = this.oProveScience;
        }
        else {
            this.oProve.ProveScience.push(this.oProveScience);
        }
        if (this.modePopup == "I") {
            this.oProveProduct.ReferenceDate = "";
            this.oProveProduct.IsNewItem = true;
            this.oProveProduct.IsDelItem = false;
            this.oProveProduct.ProductSeq = this.oProve.ProveProduct.length;
            this.oProve.ProveProduct.push(this.oProveProduct);
        }
        else if (this.modePopup == 'U') {
            this.oProve.ProveProduct[this.iPopup] = this.oProveProduct;
        }
    };
    ManageComponent.prototype.AddProduct = function () {
        this.modePopup = "I";
        this.ProductID = "";
        this.CreateProduct();
    };
    ManageComponent.prototype.SelecteArrestProduct = function (event) {
        var aIndex;
        aIndex = this.getIndexOf(this.ArrestProduct, this.ProductID, "ProductID");
        if (aIndex != -1) {
            this.oProveProduct = this.ArrestProduct[aIndex];
            this.oProveProduct.IsNewItem = true;
        }
    };
    ManageComponent.prototype.onDeleteProduct = function (i) {
        if (confirm(__WEBPACK_IMPORTED_MODULE_8__config_message__["a" /* Message */].confirmDeleteProduct)) {
            var aIndex;
            aIndex = this.getIndexOf(this.oProve.ProveProduct, i, "ProductSeq");
            if (aIndex != -1) {
                if (this.oProve.ProveProduct[aIndex].IsNewItem == false) {
                    this.oProve.ProveProduct[aIndex].IsDelItem = true;
                }
                else {
                    this.oProve.ProveProduct.splice(i, 1);
                }
            }
        }
    };
    // ----- End Popup Product -----
    // ----- Clear -----
    ManageComponent.prototype.ClearStaffData = function () {
        this.PosExaminer = "";
        this.DeptExaminer = "";
        this.oProveStaff = {
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-05",
            StaffID: this.StaffID,
            LawsuitID: this.LawsuitID,
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
            ContributorCode: "14"
        };
    };
    ManageComponent.prototype.ClearStaffScience = function () {
        this.PosScience = "";
        this.DeptScience = "";
        this.oProveScienceStaff = {
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-05",
            StaffID: this.StaffScienceID,
            LawsuitID: this.LawsuitID,
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
            ContributorCode: "15"
        };
    };
    // ----- End Clear -----
    // ----- Document -----
    ManageComponent.prototype.AddDocument = function () {
        this.oProveDocument = {};
        this.oProveDocument.ReferenceCode = "";
        this.oProveDocument.DocumentSeq = this.ListProveDoc.length;
        this.oProveDocument.IsNewItem = true;
        this.oProveDocument.IsDelItem = false;
        this.ListProveDoc.push(this.oProveDocument);
    };
    ManageComponent.prototype.changeComunicateFile = function (e, i) {
        var _this = this;
        var reader = new FileReader();
        var file = e.target.files[0];
        var fileName = file.name;
        var fileType = file.type;
        reader.readAsDataURL(file);
        reader.onload = function () {
            var dataSource = reader.result.split(',')[1];
            if (dataSource && dataSource !== undefined) {
                _this.ListProveDoc[i].FilePath = "D:\\XCS\\03. Design\\03. Program Spec\\" + _this.programSpect;
                _this.ListProveDoc[i].DataSource = "";
                _this.ListProveDoc[i].DocumentType = 1;
                _this.ListProveDoc[i].DocumentName = fileName;
                _this.ListProveDoc[i].IsActive = 1;
            }
        };
    };
    ManageComponent.prototype.DelDocument = function (i) {
        if (confirm(__WEBPACK_IMPORTED_MODULE_8__config_message__["a" /* Message */].confirmDeleteProduct)) {
            var aIndex;
            aIndex = this.getIndexOf(this.ListProveDoc, i, "DocumentSeq");
            if (aIndex != -1) {
                if (this.ListProveDoc[aIndex].IsNewItem == false) {
                    this.ListProveDoc[aIndex].IsDelItem = true;
                }
                else {
                    this.ListProveDoc.splice(i, 1);
                }
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
            template: __webpack_require__("./src/app/pages/prove/manage/manage.component.html"),
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__shared_header_navigation_navigation_service__["a" /* NavigationService */],
            __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["d" /* NgbModal */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_4__prove_service__["a" /* ProveService */],
            __WEBPACK_IMPORTED_MODULE_5__model_arrest_service__["a" /* ArrestService */],
            __WEBPACK_IMPORTED_MODULE_6__model_lawsuit_service__["a" /* LawsuitService */],
            __WEBPACK_IMPORTED_MODULE_7__model_master_service__["a" /* MasterService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */],
            __WEBPACK_IMPORTED_MODULE_9__shared_preloader_preloader_component__["b" /* PreloaderService */]])
    ], ManageComponent);
    return ManageComponent;
}());



/***/ }),

/***/ "./src/app/pages/prove/manage/manage.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageModule", function() { return ManageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__manage_component__ = __webpack_require__("./src/app/pages/prove/manage/manage.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__component_card_actions_card_actions_module__ = __webpack_require__("./src/app/pages/component/card-actions/card-actions.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__prove_service__ = __webpack_require__("./src/app/pages/prove/prove.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__model_arrest_service__ = __webpack_require__("./src/app/pages/model/arrest.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__model_lawsuit_service__ = __webpack_require__("./src/app/pages/model/lawsuit.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__model_master_service__ = __webpack_require__("./src/app/pages/model/master.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_material_autocomplete__ = __webpack_require__("./node_modules/@angular/material/esm5/autocomplete.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__printdoc_modal_printdoc_modal_module__ = __webpack_require__("./src/app/pages/prove/printdoc-modal/printdoc-modal.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__shared_pipe_IsActivePipe__ = __webpack_require__("./src/app/shared/pipe/IsActivePipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_mydatepicker_th__ = __webpack_require__("./node_modules/mydatepicker-th/index.js");
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
                { title: 'ค้นหางานตรวจรับและพิสูจน์ของกลาง', url: '/prove/list' },
                { title: 'จัดการข้อมูลงานตรวจรับและพิสูจน์ของกลาง' }
            ],
            nextPage: { title: 'งานตรวจรับและพิสูจน์ของกลาง', url: '/prove/manage' }
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
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* RouterModule */].forChild(routes),
                __WEBPACK_IMPORTED_MODULE_7__angular_http__["d" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_5__component_card_actions_card_actions_module__["a" /* CardActionsModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_material_autocomplete__["a" /* MatAutocompleteModule */],
                __WEBPACK_IMPORTED_MODULE_13__printdoc_modal_printdoc_modal_module__["a" /* PrintDocModalModule */],
                __WEBPACK_IMPORTED_MODULE_15_mydatepicker_th__["a" /* MyDatePickerTHModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_6__prove_service__["a" /* ProveService */],
                __WEBPACK_IMPORTED_MODULE_9__model_arrest_service__["a" /* ArrestService */],
                __WEBPACK_IMPORTED_MODULE_10__model_lawsuit_service__["a" /* LawsuitService */],
                __WEBPACK_IMPORTED_MODULE_11__model_master_service__["a" /* MasterService */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__manage_component__["a" /* ManageComponent */], __WEBPACK_IMPORTED_MODULE_14__shared_pipe_IsActivePipe__["a" /* IsActivePipe */]],
            exports: [__WEBPACK_IMPORTED_MODULE_12__angular_material_autocomplete__["a" /* MatAutocompleteModule */]]
        })
    ], ManageModule);
    return ManageModule;
}());



/***/ }),

/***/ "./src/app/pages/prove/printdoc-modal/printdoc-modal.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header bg-theme\">\r\n    <div class=\"row\">\r\n        <div class=\"col-lg-5\">\r\n            <h4 class=\"modal-title text-white\">พิมพ์เอกสาร</h4>\r\n        </div>\r\n\r\n        <a href=\"javaScript:void(0);\" class=\"close text-white font-14\" aria-label=\"Close\" (click)=\"dismiss('Cross click')\">\r\n            <span aria-hidden=\"true\">\r\n                <i class=\" ti-close\"></i>\r\n            </span>\r\n        </a>\r\n    </div>\r\n</div>\r\n<div class=\"modal-body font-14\">\r\n    <div class=\"card unset-radius\">\r\n        <div class=\"card-body p-0\">\r\n            <div class=\"table-responsive\">\r\n                <div class=\"table-responsive table-striped \">\r\n                    <table class=\"table\">\r\n                        <thead>\r\n                            <tr>\r\n                                <th style=\"text-align: center;width: 5%\"></th>\r\n                                <th style=\"text-align: center;width: 7%\">ลำดับ</th>\r\n                                <th>ชื่อเอกสาร</th>\r\n                                <th>ประเภทเอกสาร</th>\r\n                            </tr>\r\n                        </thead>\r\n                        <tbody>\r\n                            <tr>\r\n                                <td style=\"text-align: center\">\r\n                                    <input type=\"checkbox\" id=\"td_1\" class=\"filled-in chk-col-indigo\" [checked]=\"isCheckAll\">\r\n                                    <label for=\"td_1\" class=\"m-0\"></label>\r\n                                </td>\r\n                                <td style=\"text-align: center\">1</td>\r\n                                <td>บันทึกการตรวจรับของกลาง</td>\r\n                                <td>แบบฟอร์ม</td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td style=\"text-align: center\">\r\n                                    <input type=\"checkbox\" id=\"td_3\" class=\"filled-in chk-col-indigo\" [checked]=\"isCheckAll\">\r\n                                    <label for=\"td_3\" class=\"m-0\"></label>\r\n                                </td>\r\n                                <td style=\"text-align: center\">3</td>\r\n                                <td>บัญชีของกลางและรายการการตรวจพิสูจน์ของกลาง ส.ส 2/4</td>\r\n                                <td>แบบฟอร์ม</td>\r\n                            </tr>\r\n                        </tbody>\r\n                    </table>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"modal-footer\">\r\n    <div class=\"col-lg-2 col-sm-4\">\r\n        <button type=\"button\" class=\"btn btn-block btn-themecolor\" (click)=\"close('Save click')\">พิมพ์</button>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/pages/prove/printdoc-modal/printdoc-modal.component.scss":
/***/ (function(module, exports) {

module.exports = "@media (min-width: 992px) {\n  .modal-lg {\n    max-width: 980px !important; } }\n"

/***/ }),

/***/ "./src/app/pages/prove/printdoc-modal/printdoc-modal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrintDocModalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__prove_service__ = __webpack_require__("./src/app/pages/prove/prove.service.ts");
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
    function PrintDocModalComponent(proveService, _chRef) {
        this.proveService = proveService;
        this._chRef = _chRef;
        this.isOpen = false;
        this.isCheckAll = false;
        this.document = new Array();
        this.d = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.c = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
    }
    PrintDocModalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.proveService.DocumentgetByCon("").then(function (result) {
            _this.document = new Array();
            _this.document = result;
        });
    };
    PrintDocModalComponent.prototype.checkAll = function () {
        this.isCheckAll = !this.isCheckAll;
    };
    PrintDocModalComponent.prototype.toggle = function (e) {
        //    this.advSearch = !this.advSearch;
    };
    PrintDocModalComponent.prototype.dismiss = function (e) {
        this.d.emit(e);
    };
    PrintDocModalComponent.prototype.close = function (e) {
        this.c.emit(e);
    };
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
            template: __webpack_require__("./src/app/pages/prove/printdoc-modal/printdoc-modal.component.html"),
            styles: [__webpack_require__("./src/app/pages/prove/printdoc-modal/printdoc-modal.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__prove_service__["a" /* ProveService */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */]])
    ], PrintDocModalComponent);
    return PrintDocModalComponent;
}());



/***/ }),

/***/ "./src/app/pages/prove/printdoc-modal/printdoc-modal.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrintDocModalModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__printdoc_modal_component__ = __webpack_require__("./src/app/pages/prove/printdoc-modal/printdoc-modal.component.ts");
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
//# sourceMappingURL=manage.module.2.chunk.js.map
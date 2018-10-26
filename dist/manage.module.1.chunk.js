webpackJsonp(["manage.module.1"],{

/***/ "./src/app/pages/fine/manage/manage.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-template #printDocModal let-c=\"close\" let-d=\"dismiss\">\r\n  <app-printdoc-modal (c)=\"modal.close()\" (d)=\"modal.dismiss()\"></app-printdoc-modal>\r\n</ng-template>\r\n<!-- <div style=\"height: 100px; background-color: white;border: 1px solid #ccc;\">\r\n  <div *ngFor=\"let option of options\" style=\"padding:2px;\">\r\n    {{ option.OfficeName }}\r\n  </div>\r\n</div> -->\r\n\r\n<div class=\"wizard-content\">\r\n  <div class=\"wizard-circle wizard clearfix clearfix\">\r\n    <div class=\"steps tab-wizard\">\r\n      <ul role=\"tablist\">\r\n        <li role=\"tab\" class=\"current\" aria-disabled=\"false\" aria-selected=\"true\">\r\n          <a>\r\n            <span class=\"current-info audible\">current step: </span>\r\n            <span class=\"step\"></span> 1. ใบแจ้งความนำจับ</a>\r\n        </li>\r\n        <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n          <a>\r\n            <span class=\"step\"></span> 2. งานจับกุม </a>\r\n        </li>\r\n        <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n          <a>\r\n            <span class=\"step\"></span> 3. รับคำกล่าวโทษ </a>\r\n        </li>\r\n        <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n          <a>\r\n            <span class=\"step\"></span> 4. งานตรวจรับและพิสูจน์ของกลาง </a>\r\n        </li>\r\n        <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n          <a>\r\n            <span class=\"step\"></span> 5. งานเปรียบเทียบและชำระค่าปรับ </a>\r\n        </li>\r\n        <li role=\"tab\" class=\"disabled\" aria-disabled=\"true\">\r\n          <a>\r\n            <span class=\"step\"></span> 6. นำส่งเงินรายได้ </a>\r\n        </li>\r\n        <li role=\"tab\" class=\"disabled\" aria-disabled=\"true\">\r\n          <a>\r\n            <span class=\"step\"></span> 7. คำร้องขอรับเงินสินบนรางวัล </a>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<!-- [formGroup]=\"CompareForm\" -->\r\n<form class=\"form-horizontal\">\r\n  <div class=\"card \">\r\n    <div class=\"card-header  unset-radius\">\r\n      <app-card-actions-collapse></app-card-actions-collapse>\r\n      <h4 class=\"card-title m-b-0\">รายละเอียดข้อกล่าวหา</h4>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <div class=\"form-body\">\r\n        <div class=\"row\">\r\n          <div class=\"col-md-6\">\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-form-label col-md-4\">เลขที่ใบงาน : </label>\r\n              <div class=\"col-md-8\">\r\n                <input class=\"form-control\" [(ngModel)]=\"ArrestCode\" type=\"text\" name=\"ArrestCode\" disabled>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-6\">\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-form-label col-md-4\">เลขที่คดีรับคำกล่าวโทษ : </label>\r\n              <div class=\"col-md-8\">\r\n                <input class=\"form-control\" [(ngModel)]=\"LawsuiltCode\" type=\"text\" name=\"LawsuiltCode\" disabled>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"row\">\r\n          <div class=\"col-md-6\">\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-form-label col-md-4\">ทะเบียนตรวจพิสูจน์ : </label>\r\n              <div class=\"col-md-8\">\r\n                <input class=\"form-control\" [(ngModel)]=\"ProveReportNo\" type=\"text\" name=\"ProveReportNo\" disabled>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-6\">\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-form-label col-md-4\">วันที่รับทำคดี : </label>\r\n              <div class=\"col-md-3\">\r\n                <input class=\"form-control\" [(ngModel)]=\"LawsuiltDate\" type=\"date\" name=\"LawsuiltDate\" disabled>\r\n              </div>\r\n              <label class=\"col-form-label text-center col-md-2\">เวลา</label>\r\n              <div class=\"col-md-3\">\r\n                <input class=\"form-control\" [(ngModel)]=\"LawsuiltTime\" type=\"date\" name=\"LawsuiltTime\" disabled>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"row\">\r\n          <div class=\"col-md-6\">\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-form-label col-md-4\">ผู้กล่าวหา : </label>\r\n              <div class=\"col-md-8\">\r\n                <input class=\"form-control\" [(ngModel)]=\"ArrestStaffName\" type=\"text\" name=\"ArrestStaffName\" disabled>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-6\">\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-form-label col-md-4\">ตำแหน่ง : </label>\r\n              <div class=\"col-md-8\">\r\n                <input class=\"form-control\" type=\"text\" [(ngModel)]=\"PositionName\" name=\"PositionName\" disabled>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"row\">\r\n          <div class=\"col-md-6\">\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-form-label col-md-4\">หน่วยงาน : </label>\r\n              <div class=\"col-md-8\">\r\n                <input class=\"form-control\" type=\"text\" [(ngModel)]=\"DepartmentName\" name=\"DepartmentName\" disabled>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-6\">\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-form-label col-md-4\">สถานที่จับกุม : </label>\r\n              <div class=\"col-md-8\">\r\n                <input class=\"form-control\" type=\"text\" [(ngModel)]=\"ArrestLocation\" name=\"ArrestLocation\" disabled>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"row\">\r\n          <div class=\"col-md-6\">\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-form-label col-md-4\">ฐานความผิดมาตรา : </label>\r\n              <div class=\"col-md-8\">\r\n                <input class=\"form-control\" type=\"text\" [(ngModel)]=\"SectionName\" name=\"SectionName\" disabled>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-6\">\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-form-label col-md-4\">ฐานความผิด : </label>\r\n              <div class=\"col-md-8\">\r\n                <input class=\"form-control\" type=\"text\" [(ngModel)]=\"GuiltBaseName\" name=\"GuiltBaseName\" disabled>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"row\">\r\n          <div class=\"col-md-6\">\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-form-label col-md-4\">บทกำหนดโทษ : </label>\r\n              <div class=\"col-md-8\">\r\n                <input class=\"form-control\" type=\"text\" [(ngModel)]=\"SectionNo\" name=\"SectionNo\" disabled>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-6\">\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-form-label col-md-4\">อัตราโทษ : </label>\r\n              <div class=\"col-md-8\">\r\n                <input class=\"form-control\" type=\"text\" [(ngModel)]=\"PenaltyDesc\" name=\"PenaltyDesc\" disabled>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</form>\r\n\r\n\r\n<!-- เงินค่าปรับ -->\r\n<div class=\"card \">\r\n  <div class=\"card-header  unset-radius\">\r\n    <app-card-actions-collapse></app-card-actions-collapse>\r\n    <h4 class=\"card-title m-b-0\">รายละเอียดเงินค่าปรับ</h4>\r\n  </div>\r\n  <div class=\"card-body\">\r\n    <div class=\"table-responsive\">\r\n      <table class=\"dataTable table table-sm table-striped table-hover\">\r\n        <thead>\r\n          <tr>\r\n            <th class=\"footable-sortable\" style=\"width:15%\">ชื่อผู้ต้องหา</th>\r\n            <th class=\"footable-sortable\" style=\"width:7%;\">จำนวนครั้ง</th>\r\n            <th class=\"footable-sortable\" style=\"width:10%\">ของกลาง</th>\r\n            <th class=\"footable-sortable\" style=\"width:7%\">จำนวนเท่า</th>\r\n            <th class=\"footable-sortable\" style=\"width:7%\">มูลค่าภาษี</th>\r\n            <th class=\"footable-sortable\" style=\"width:7%\">ค่าปรับสุทธิ</th>\r\n            <th class=\"footable-sortable\" style=\"width:7%\">ยอดชำระ</th>\r\n            <th class=\"footable-sortable\" style=\"width:7%\">สินบน</th>\r\n            <th class=\"footable-sortable\" style=\"width:7%\">รางวัล</th>\r\n            <th class=\"footable-sortable\" style=\"width:7%\">ส่งคลัง</th>\r\n            <th class=\"footable-sortable\" style=\"width:7%\">รวม</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr *ngFor=\"let item of ListCompareDetail; let i=index;\" class=\"footable\">\r\n            <td class=\"\">{{item.LawBrakerName}}</td>\r\n                        <!--<td *ngIf=\"item.EntityType === '0'\" class=\"\">{{item.CompanyTitle}} + {{item.CompanyName }}</td>\r\n            <td *ngIf=\"item.EntityType === '1'\" class=\"\">{{item.LawbreakerTitleName}} + {{item.LawbreakerFirstName}} + {{item.LawbreakerMiddleName}} + {{item.LawbreakerLastName}} </td>-->\r\n            <td class=\"text-center\">\r\n              <b>\r\n                <u>\r\n                  <a (click)=\"viewData()\">{{item.MistreatNo}}</a>\r\n                </u>\r\n              </b>\r\n            </td>\r\n            <td>{{item.ProductDesc}}</td>\r\n            <!-- <td class=\"text-center\">{{item.FineRate}}</td> -->\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"item.FineRate\" [disabled]=\"showEditField\" value=\"\">\r\n            </td>\r\n            <!-- <td class=\"\">{{item.VatValue}}</td> -->\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"item.VatValue\" [disabled]=\"showEditField\" value=\"\">\r\n            </td>\r\n            <td class=\"\">{{item.FineRate * item.VatValue}}</td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"item.CompareFine\" [disabled]=\"showEditField\" value=\"\">\r\n            </td>\r\n            <!-- <td class=\"\">{{item.BribeMoney}}</td> -->\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"item.BribeMoney\" [disabled]=\"showEditField\" value=\"\">\r\n            </td>\r\n            <td class=\"\">{{item.CompareFine * item.RewardRate}}</td>\r\n            <td class=\"\">{{item.CompareFine - (item.BribeMoney + item.RewardMoney | number) }}</td>\r\n            <td class=\"\">รวม</td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<!-- คำให้การของผู้ต้องหา -->\r\n<div class=\"card \">\r\n  <div class=\"card-header  unset-radius\">\r\n    <app-card-actions-collapse></app-card-actions-collapse>\r\n    <h4 class=\"card-title m-b-0\">คำให้การของผู้ต้องหา</h4>\r\n  </div>\r\n  <div class=\"card-body\">\r\n    <div class=\"form-body\">\r\n      <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label  col-md-3\">วันที่จัดทำ : </label>\r\n            <div class=\"col-md-4\">\r\n              <input class=\"form-control\" type=\"date\" [(ngModel)]=\"CompareDate\" name=\"CompareDate\" [disabled]=\"showEditField\">\r\n            </div>\r\n            <label class=\"col-form-label text-center col-md-2\">เวลา</label>\r\n            <div class=\"col-md-3\">\r\n              <input class=\"form-control\" type=\"time\" [(ngModel)]=\"CompareTime\" name=\"CompareTime\" [disabled]=\"showEditField\">\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4\">เขียนที่ : </label>\r\n            <div class=\"col-md-7\">\r\n              <input type=\"text\" class=\"form-control\" [(ngModel)]=\"StationName\" name=\"StationName\" placeholder=\"พิมพ์ข้อความ\" aria-label=\"Number\"\r\n                matInput [matAutocomplete]=\"auto\" (input)=\"onAutoChange($event.target.value)\" (focus)=\"onAutoFocus($event.target.value)\"\r\n                [disabled]=\"showEditField\">\r\n              <mat-autocomplete #auto=\"matAutocomplete\">\r\n                <mat-option *ngFor=\"let option of options\" [value]=\"option.OfficeName\" (click)=\"onAutoSelecteWord(option)\">\r\n                  {{ option.OfficeName }}\r\n                </mat-option>\r\n              </mat-autocomplete>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-3\">ชื่อผู้เปรียบเทียบ : </label>\r\n            <div class=\"col-md-9\">\r\n              <input type=\"text\" class=\"form-control\" [(ngModel)]=\"CompareStaffName\" name=\"CompareStaffName\" placeholder=\"พิมพ์ข้อความ\" aria-label=\"Number\"\r\n                matInput [matAutocomplete]=\"auto3\" (input)=\"StaffonAutoChange($event.target.value)\" (focus)=\"StaffonAutoFocus($event.target.value)\"\r\n                [disabled]=\"showEditField\">\r\n              <mat-autocomplete #auto3=\"matAutocomplete\">\r\n                <mat-option *ngFor=\"let sOption of Staffoptions\" [value]=\"sOption.TitleName + sOption.FirstName + ' ' + sOption.LastName\"\r\n                  (click)=\"StaffonAutoSelecteWord(sOption)\">\r\n                  {{ sOption.TitleName }}{{ sOption.FirstName }} {{ sOption.LastName }}\r\n                </mat-option>\r\n              </mat-autocomplete>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4\">ตำแหน่ง : </label>\r\n            <div class=\"col-md-7\">\r\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"OperationPosName\" name=\"OperationPosName\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-3\">หน่วยงาน : </label>\r\n            <div class=\"col-md-9\">\r\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"OperationDeptName\" name=\"OperationDeptName\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"table-responsive\">\r\n      <table class=\"dataTable table table-sm table-striped table-hover\">\r\n        <thead>\r\n          <tr>\r\n            <th class=\"footable-sortable text-center\" style=\"width:5%\">ลำดับ</th>\r\n            <th class=\"footable-sortable\" style=\"width:20%\">ชื่อผู้ต้องหา</th>\r\n            <th class=\"footable-sortable text-center\" style=\"width:10%\">วันที่กำหนดชำระค่าปรับ</th>\r\n            <th class=\"footable-sortable text-center\" style=\"width:10%\">วันที่กำหนดชำระภาษี</th>\r\n            <th class=\"footable-sortable text-center\" style=\"width:10%\">ปล่อยตัวชั่วคราว</th>\r\n            <th class=\"footable-sortable text-center\" style=\"width:5%\"></th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr *ngFor=\"let item of AccusedTable; let i=index;\" class=\"footable\">\r\n            <td class=\"text-center\">{{i + 1}}</td>\r\n            <td>{{item.AccusedName }} </td>\r\n            <td class=\"text-center\">{{item.PaymentFineAppointDate | date:'dd/MM/yyyy'}}</td>\r\n            <td class=\"text-center\">{{item.PaymentVatDate | date:'dd/MM/yyyy'}}</td>\r\n            <td class=\"text-center\">\r\n              <span *ngIf=\"IsProvisionalAcquittal == 1\">/</span>\r\n            </td>\r\n            <td class=\" text-center\">\r\n              <a (click)=\"onClickEditF3(i)\" class=\"text-secondary\" data-toggle=\"modal\" data-target=\"#testimonyPopup\">\r\n                <i class=\"mdi mdi-eye fa-lg\"></i>\r\n              </a>\r\n              <a (click)=\"onClickEditF3(i)\" class=\"text-secondary\" [hidden]=\"showEditField\" data-toggle=\"modal\" data-target=\"#testimonyPopup\">\r\n                <i class=\"ti-pencil-alt btn-action\"></i>\r\n              </a>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n\r\n<!-- บันทึกการเปรียบเทียบคดีและชำระค่าปรับ -->\r\n<div class=\"card \">\r\n  <div class=\"card-header  unset-radius\">\r\n    <app-card-actions-collapse></app-card-actions-collapse>\r\n    <h4 class=\"card-title m-b-0\">บันทึกการเปรียบเทียบคดีและชำระค่าปรับ</h4>\r\n  </div>\r\n\r\n  <div class=\"card-body\">\r\n    <div class=\"form-body\">\r\n      <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n          <div class=\"form-group row\">\r\n            <div class=\"custom-control custom-checkbox col-form-label col-md-4\">\r\n              <input class=\"col-form-label filled-in chk-col-indigo\" id=\"IsOutside\" type=\"checkbox\" [(ngModel)]=\"IsOutside\" name=\"IsOutside\"\r\n                [disabled]=\"showEditField\" (checked)=\"IsOutside=='1'\">\r\n              <label for=\"IsOutside\">คดีเปรียบเทียบนอกสถานที่ทำการ</label>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4\">คดีเปรียบเทียบที่ : </label>\r\n            <div class=\"col-md-7\">\r\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"CompareNo\" name=\"CompareNo\" [disabled]=\"showEditField\">\r\n            </div>\r\n            <label class=\"col-form-label\">/{{CompareYear}}</label>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"table-responsive\">\r\n      <table class=\"dataTable table table-sm table-striped table-hover\">\r\n        <thead>\r\n          <tr>\r\n            <th class=\"footable-sortable text-center\">ลำดับ</th>\r\n            <th class=\"footable-sortable\">ชื่อผู้ต้องหา</th>\r\n            <th class=\"footable-sortable text-center\">วันที่ชำระค่าปรับ</th>\r\n            <th class=\"footable-sortable\">ผู้รับชำระค่าปรับ</th>\r\n            <th class=\"footable-sortable text-center\">ช่องทางชำระ</th>\r\n            <th class=\"footable-sortable text-center\">ใบเสร็จเล่มที่</th>\r\n            <th class=\"footable-sortable text-center\">ใบเสร็จเลขที่/เลขอ้างอิง</th>\r\n            <th class=\"footable-sortable text-center\">สถานะคดี</th>\r\n            <th class=\"footable-sortable\"></th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr *ngFor=\"let item of ListCompareDetailReceipt; let i=index;\" class=\"footable\">\r\n            <td class=\"text-center\">{{i + 1}}</td>\r\n            <td>{{item.LawBrakerName}}</td>\r\n            <td class=\"text-center\">{{item.PaymentDate | date:'dd/MM/yyyy'}}</td>\r\n            <td>{{item.ReceipStaff}}</td>\r\n            <td class=\"text-center\">{{item.ReceiptChanel}}</td>\r\n            <td class=\"text-center\">{{item.ReceiptBookNo}}</td>\r\n            <td class=\"text-center\">{{item.ReceiptBookNo}}/{{item.ReceiptNo}}</td>\r\n            <td class=\"text-center\">{{item.RevernueStatus}}</td>\r\n            <td>\r\n              <a (click)=\"onClickEditF4(i)\" class=\"text-secondary\" data-toggle=\"modal\" data-target=\"#payPopup\">\r\n                <i class=\"mdi mdi-eye fa-lg\"></i>\r\n              </a>\r\n              <a (click)=\"onClickEditF4(i)\" class=\"text-warning\" [hidden]=\"showEditField\" data-toggle=\"modal\" data-target=\"#payPopup\">\r\n                <i class=\"ti-pencil-alt btn-action\"></i>\r\n              </a>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<!-- รายงานขออนุมัติการเปรียบเทียบคดีและแบบอนุมัติ -->\r\n<div class=\"card \">\r\n  <div class=\"card-header  unset-radius\">\r\n    <app-card-actions-collapse></app-card-actions-collapse>\r\n    <h4 class=\"card-title m-b-0\">รายงานขออนุมัติการเปรียบเทียบคดีและแบบอนุมัติ</h4>\r\n  </div>\r\n  <div class=\"card-body\">\r\n    <div class=\"table-responsive\">\r\n      <table class=\"dataTable table table-sm table-striped table-hover\">\r\n        <thead>\r\n          <tr>\r\n            <th class=\"footable-sortable text-center\" style=\"width:10%\">ลำดับ</th>\r\n            <th class=\"footable-sortable\">ชื่อผู้ต้องหา</th>\r\n            <th class=\"footable-sortable text-center\" style=\"width:15%\">วันที่จัดทำรายงานฯ</th>\r\n            <th class=\"footable-sortable text-center\" style=\"width:15%\">แบบอนุมัติ</th>\r\n            <th class=\"footable-sortable\" style=\"width:10%\"></th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr *ngFor=\"let item of ListCompareDetail; let i=index;\" class=\"footable\">\r\n            <td class=\"text-center\">{{i + 1}}</td>\r\n            <td>{{item.LawBrakerName}}</td>\r\n            <td class=\"text-center\">{{item.ApproveReportDate | date:'dd/MM/yyyy'}}</td>\r\n            <td>{{item.ApproveReportType}}</td>\r\n            <td>\r\n              <a (click)=\"onClickEditF5(i)\" class=\"text-secondary\" data-toggle=\"modal\" data-target=\"#approvePopup\">\r\n                <i class=\"mdi mdi-eye fa-lg\"></i>\r\n              </a>\r\n              <a (click)=\"onClickEditF5(i)\" class=\"text-warning\" [hidden]=\"showEditField\" data-toggle=\"modal\" data-target=\"#approvePopup\">\r\n                <i class=\"ti-pencil-alt btn-action\"></i>\r\n              </a>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<!-- เอกสารแนบภายใน -->\r\n<div class=\"card \">\r\n  <div class=\"card-header  unset-radius\">\r\n    <app-card-actions-collapse></app-card-actions-collapse>\r\n    <h4 class=\"card-title m-b-0\">เอกสารแนบภายใน</h4>\r\n  </div>\r\n  <div class=\"card-body\">\r\n    <div class=\"text-right\">\r\n      <input type=\"file\" id=\"btn-browse\" #file [disabled]=\"showEditField\">\r\n      <label for=\"btn-browse\" [ngClass]=\"{disabled : showEditField}\" class=\"btn waves-effect waves-light btn-navy\"> เพิ่มเอกสารแนบ </label>\r\n    </div>\r\n    <div class=\"table-responsive\">\r\n      <table class=\"dataTable table table-sm table-striped table-hover\">\r\n        <thead>\r\n          <tr>\r\n            <th class=\"footable-sortable text-center\">ลำดับ</th>\r\n            <th class=\"footable-sortable\">ชื่อเอกสารแนบ</th>\r\n            <th class=\"footable-sortable\">ที่อยู่เอกสารแนบ</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr class=\"footable\">\r\n            <td class=\"text-center\">1</td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" nmae=\"fileName\" [disabled]=\"showEditField\">\r\n            </td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" name=\"filePath\" [disabled]=\"showEditField\">\r\n            </td>\r\n            <td>\r\n              <i class=\"ti-trash btn-action\" [hidden]=\"showEditField\"></i>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<!-- Pop up คำให้การของผู้ต้องหา -->\r\n<div class=\"modal fade\" id=\"testimonyPopup\" tabindex=\"-1\" role=\"dialog\">\r\n  <div class=\"modal-dialog modal-lg\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header top-navbar text-white\">\r\n        คำให้การของผู้ต้องหา\r\n        <div class=\"card-actions\">\r\n          <i class=\"ti-close text-white close-popup\" data-dismiss=\"modal\" data-target=\"testimonyPopup\"></i>\r\n        </div>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <div class=\"text-right\"> XCS60-06-02-02-00 </div>\r\n        <div class=\"form-body m-t-10\">\r\n          <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-form-label col-md-5\">ชื่อผู้ต้องหา : </label>\r\n                <div class=\"col-md-7\">\r\n                  <input class=\"form-control\" type=\"text\" [(ngModel)]=\"ArrestName\" name=\"ArrestName\" disabled>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-form-label col-md-5\">วันที่กำหนดชำระค่าปรับ : </label>\r\n                <div class=\"col-md-7\">\r\n                  <input class=\"form-control\" type=\"date\" [(ngModel)]=\"PaymentFineAppointDate\" name=\"PaymentFineAppointDate\" [disabled]=\"showEditField\">\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-form-label col-md-5\">วันที่กำหนดชำระภาษี : </label>\r\n                <div class=\"col-md-7\">\r\n                  <input class=\"form-control\" type=\"date\" [(ngModel)]=\"PaymentVatDate\" name=\"PaymentVatDate\" [disabled]=\"showEditField\">\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-form-label col-md-5\">ข้อมูลการปล่อยตัวชั่วคราว</label>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n              <div class=\"form-group row\">\r\n                <div class=\"custom-control custom-checkbox col-form-label col-md-4\">\r\n                  <input class=\"col-form-label filled-in chk-col-indigo\" id=\"insurance\" type=\"checkbox\" [checked]=\"Bail!='' && Bail!=nul\" disabled>\r\n                  <label for=\"insurance\">ประกัน :</label>\r\n                </div>\r\n                <div class=\"col-md-7\">\r\n                  <input class=\"form-control\" type=\"text\" [(ngModel)]=\"Bail\" name=\"Bail\" [disabled]=\"showEditField\">\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n              <div class=\"form-group row\">\r\n                <div class=\"custom-control custom-checkbox col-form-label col-md-4\">\r\n                  <input class=\"col-form-label filled-in chk-col-indigo\" id=\"collateral\" type=\"checkbox\" disabled [checked]=\"Guaruntee!='' && Guaruntee!=nul\">\r\n                  <label for=\"collateral\">ประกันและหลักประกัน :</label>\r\n                </div>\r\n                <div class=\"col-md-7\">\r\n                  <input class=\"form-control\" type=\"text\" [(ngModel)]=\"Guaruntee\" name=\"Guaruntee\" [disabled]=\"showEditField\">\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-form-label col-md-12\">การแจ้งสิทธิให้แจ้งญาติหรือผู้ซึ่งไว้วางใจทราบถึงการถูกจับและสถานที่ถูกควบคุม</label>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n              <div class=\"form-popup form-group row\">\r\n                <div class=\"custom-control custom-radio col-form-label col-md-10\">\r\n                  <input name=\"RequestRadio\" id=\"yRequest\" class=\"col-form-label with-gap radio-col-indigo\" type=\"radio\" [disabled]=\"showEditField\">\r\n                  <!-- [checked]=\"oCompareDetail.IsRequest=='1'\" -->\r\n                  <label for=\"yRequest\">ร้องขอ</label>\r\n\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n              <div class=\"form-group row\">\r\n                <div class=\"custom-control custom-radio col-form-label col-md-10\">\r\n                  <input name=\"RequestRadio\" id=\"nRequest\" class=\"col-form-label with-gap radio-col-indigo\" type=\"radio\" [disabled]=\"showEditField\">\r\n                  <!-- [checked]=\"oCompareDetail.IsRequest=='0'\" -->\r\n                  <label for=\"nRequest\">ไม่ร้องขอ</label>\r\n\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-form-label col-md-3\">คำให้การของผู้ต้องหา : </label>\r\n                <div class=\"col-md-9\">\r\n                  <textarea class=\"form-control\" [disabled]=\"showEditField\" rows=\"5\" [(ngModel)]=\"LawbrakerTestimony\" name=\"LawbrakerTestimony\"></textarea>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"text-right\">\r\n          <button type=\"button\" class=\"btn waves-effect waves-light btn-navy\" [disabled]=\"showEditField\" data-toggle=\"modal\" data-target=\"#testimonyPopup\"\r\n            (click)=\"onSaveF3()\">บันทึก</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<!-- บันทึกการเปรียบเทียบคดีและชำระค่าปรับ -->\r\n<div class=\"modal fade\" id=\"payPopup\" tabindex=\"-1\" role=\"dialog\">\r\n  <div class=\"modal-dialog modal-lg\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header text-white top-navbar\">\r\n        ชำระค่าปรับ\r\n        <div class=\"card-actions\">\r\n          <i class=\"ti-close text-white close-popup\" data-dismiss=\"modal\" data-target=\"payPopup\"></i>\r\n        </div>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <div class=\"text-right\"> XCS60-06-02-03-00 </div>\r\n        <div class=\"form-body m-t-10\">\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-form-label col-md-4\">ชื่อผู้ต้องหา : </label>\r\n                <div class=\"input-group col-md-8\">\r\n                  <input class=\"form-control\" type=\"text\" [(ngModel)]=\"ArrestName\" name=\"ArrestName\" disabled>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-form-label col-md-5\">ยอดชำระค่าปรับ : </label>\r\n                <div class=\"col-md-7\">\r\n                  <input class=\"form-control\" type=\"text\" [(ngModel)]=\"TotalFine\" name=\"TotalFine\" [disabled]=\"showEditField\">\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-form-label col-md-4\">วันที่ชำระค่าปรับ : </label>\r\n                <div class=\"col-md-3\">\r\n                  <input class=\"form-control\" type=\"date\" [(ngModel)]=\"PaymentDate\" name=\"PaymentDate\" [disabled]=\"showEditField\">\r\n                </div>\r\n                <label class=\"col-form-label text-center col-md-2\">เวลา</label>\r\n                <div class=\"col-md-3\">\r\n                  <input class=\"form-control\" type=\"date\" [(ngModel)]=\"PaymentTime\" name=\"PaymentTime\" [disabled]=\"showEditField\">\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-form-label col-md-5\">เขียนที่ : </label>\r\n                <div class=\"col-md-7\">\r\n                  <input type=\"text\" class=\"form-control\" [(ngModel)]=\"ReceipStation\" name=\"ReceipStation\" placeholder=\"พิมพ์ข้อความ\" aria-label=\"Number\"\r\n                    matInput [matAutocomplete]=\"auto\" (input)=\"onAutoChange($event.target.value)\" (focus)=\"onAutoFocus($event.target.value)\"\r\n                    [disabled]=\"showEditField\">\r\n                  <mat-autocomplete #auto=\"matAutocomplete\">\r\n                    <mat-option *ngFor=\"let option of options\" [value]=\"option.OfficeName\" (click)=\"onAutoSelecteWord(option)\">\r\n                      {{ option.OfficeName }}\r\n                    </mat-option>\r\n                  </mat-autocomplete>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-form-label col-md-4\">ผู้รับชำระค่าปรับ : </label>\r\n                <div class=\"input-group col-md-8\">\r\n                  <input class=\"form-control\" type=\"text\" [(ngModel)]=\"ReceipStaff\" name=\"ReceipStaff\" [disabled]=\"showEditField\">\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-form-label col-md-5\">ตำแหน่ง : </label>\r\n                <div class=\"col-md-7\">\r\n                  <input class=\"form-control\" type=\"text\" [(ngModel)]=\"ReceipPosition\" name=\"ReceipPosition\" disabled>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-form-label col-md-4\">หน่วยงาน : </label>\r\n                <div class=\"input-group col-md-8\">\r\n                  <input class=\"form-control\" type=\"text\" [(ngModel)]=\"ReceipDepartment\" name=\"ReceipDepartment\" disabled>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-form-label col-md-5\">ช่องทางชำระค่าปรับ : </label>\r\n                <div class=\"col-md-7\">\r\n                  <select class=\"custom-select col-12\" [(ngModel)]=\"ReceiptChanel\" name=\"ReceiptChanel\">\r\n                    <option value=\"1\">เงินสด</option>\r\n                    <option value=\"2\">EDC</option>\r\n                    <option value=\"3\">เครดิต</option>\r\n                    <option value=\"4\">เดบิต</option>\r\n                  </select>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-form-label col-md-4\">ใบเสร็จเล่มที่ : </label>\r\n                <div class=\"input-group col-md-8\">\r\n                  <input class=\"form-control\" type=\"text\" [(ngModel)]=\"ReceiptBookNo\" name=\"ReceiptBookNo\" [disabled]=\"showEditField\">\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-form-label col-md-5\">ใบเสร็จเลขที่ : </label>\r\n                <div class=\"col-md-7\">\r\n                  <input class=\"form-control\" type=\"text\" [(ngModel)]=\"ReceiptNo\" name=\"ReceiptNo\" [disabled]=\"showEditField\">\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-form-label col-md-4\">หมายเลขอ้างอิง : </label>\r\n                <div class=\"input-group col-md-8\">\r\n                  <input class=\"form-control\" type=\"text\" [(ngModel)]=\"ReferenceNo\" name=\"ReferenceNo\" [disabled]=\"showEditField\">\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"text-right\">\r\n          <button (click)=\"ConfirmDelF4()\" type=\"button\" class=\"btn waves-effect waves-light btn-orange m-r-10\" data-toggle=\"modal\"\r\n            data-target=\"#payPopup\">ยกเลิกใบเสร็จ</button>\r\n          <button (click)=\"onSaveF4()\" type=\"button\" class=\"btn waves-effect waves-light btn-navy\" data-toggle=\"modal\" data-target=\"#payPopup\">บันทึก</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<!-- รายงานขออนุมัติการเปรียบเทียบคดีและแบบอนุมัติ -->\r\n<div class=\"modal fade\" id=\"approvePopup\" tabindex=\"-1\" role=\"dialog\">\r\n  <div class=\"modal-dialog modal-lg\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header top-navbar text-white\">\r\n        รายงานขออนุมัติการเปรียบเทียบคดีและแบบอนุมัติ\r\n        <div class=\"card-actions\">\r\n          <i class=\"ti-close text-white close-popup\" data-dismiss=\"modal\" data-target=\"approvePopup\"></i>\r\n        </div>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <div class=\"text-right\"> XCS60-06-02-04-00 </div>\r\n        <div class=\"form-body m-t-10\">\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-form-label col-md-4\">ชื่อผู้ต้องหา : </label>\r\n                <div class=\"input-group col-md-8\">\r\n                  <input class=\"form-control\" type=\"text\" name=\"fullName\" disabled>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-form-label col-md-4\">วันที่ชำระค่าปรับ : </label>\r\n                <div class=\"col-md-3\">\r\n                  <input class=\"form-control\" type=\"text\" name=\"payDate\" disabled>\r\n                </div>\r\n                <label class=\"col-form-label text-center col-md-2\">เวลา</label>\r\n                <div class=\"col-md-3\">\r\n                  <input class=\"form-control\" type=\"text\" name=\"payTime\" disabled>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-form-label col-md-4\">ค่าปรับคดีรวม : </label>\r\n                <div class=\"col-md-8\">\r\n                  <input class=\"form-control\" type=\"text\" name=\"payAmount\" disabled>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-form-label col-md-4\">เขียนที่ : </label>\r\n                <div class=\"input-group col-md-8\">\r\n                  <input type=\"text\" class=\"form-control\" [(ngModel)]=\"ApproveStation\" name=\"ApproveStation\" placeholder=\"พิมพ์ข้อความ\" aria-label=\"Number\"\r\n                    matInput [matAutocomplete]=\"auto2\" (input)=\"ReportonAutoChange($event.target.value)\" (focus)=\"ReportonAutoFocus($event.target.value)\"\r\n                    [disabled]=\"showEditField\">\r\n                  <mat-autocomplete #auto2=\"matAutocomplete\">\r\n                    <mat-option *ngFor=\"let Roption of ReportOptions\" [value]=\"Roption.OfficeName\" (click)=\"ReportonAutoSelecteWord(Roption)\">\r\n                      {{ Roption.OfficeName }}\r\n                    </mat-option>\r\n                  </mat-autocomplete>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-form-label col-md-4\">วันที่จัดทำรายงานฯ : </label>\r\n                <div class=\"col-md-8\">\r\n                  <input class=\"form-control\" type=\"date\" [(ngModel)]=\"ApproveReportDate\" name=\"ApproveReportDate\" [disabled]=\"showEditField\">\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-form-label col-md-2\">แบบอนุมัติ : </label>\r\n                <div class=\"custom-control custom-radio col-form-label col-md-8\">\r\n                  <input name=\"approveRadio\" id=\"typeOne\" class=\"col-form-label with-gap radio-col-indigo\" type=\"radio\">\r\n                  <label for=\"typeOne\" class=\"col-4\">แบบอนุมัติ 1</label>\r\n                  <input name=\"approveRadio\" id=\"typeTwo\" class=\"col-form-label with-gap radio-col-indigo\" type=\"radio\">\r\n                  <label for=\"typeTwo\" class=\"col-4\">แบบอนุมัติ 2</label>\r\n                  <input name=\"approveRadio\" id=\"typeThree\" class=\"col-form-label with-gap radio-col-indigo\" type=\"radio\">\r\n                  <label for=\"typeThree\" class=\"col-4\">แบบอนุมัติ 3</label>\r\n                  <input name=\"approveRadio\" id=\"typeFour\" class=\"col-form-label with-gap radio-col-indigo\" type=\"radio\">\r\n                  <label for=\"typeFour\" class=\"col-4\">แบบอนุมัติ 4</label>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-form-label col-md-4\">ผู้เสนอพิจารณาเห็นชอบ : </label>\r\n                <div class=\"col-md-8\">\r\n                  <input class=\"form-control\" type=\"text\" [disabled]=\"showEditField\">\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-form-label col-md-4\">ตำแหน่ง : </label>\r\n                <div class=\"input-group col-md-8\">\r\n                  <input class=\"form-control\" type=\"text\" name=\"postion\" disabled>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-form-label col-md-4\">หน่วยงาน : </label>\r\n                <div class=\"input-group col-md-8\">\r\n                  <input class=\"form-control\" type=\"text\" name=\"deparment\" disabled>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-form-label col-md-4\">ผู้พิจารณาเห็นชอบ : </label>\r\n                <div class=\"input-group col-md-8\">\r\n                  <input class=\"form-control\" type=\"text\" name=\"reviewer\" [disabled]=\"showEditField\">\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-form-label col-md-4\">ตำแหน่ง : </label>\r\n                <div class=\"input-group col-md-8\">\r\n                  <input class=\"form-control\" type=\"text\" name=\"rank\" disabled>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-form-label col-md-4\">หน่วยงาน : </label>\r\n                <div class=\"input-group col-md-8\">\r\n                  <input class=\"form-control\" type=\"text\" name=\"deparment\" disabled>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-form-label col-md-4\">ผู้มีอำนาจอนุมัติ : </label>\r\n                <div class=\"input-group col-md-8\">\r\n                  <input class=\"form-control\" type=\"text\" name=\"approver\" [disabled]=\"showEditField\">\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-form-label col-md-4\">ตำแหน่ง : </label>\r\n                <div class=\"input-group col-md-8\">\r\n                  <input class=\"form-control\" type=\"text\" name=\"rank\" disabled>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-form-label col-md-4\">หน่วยงาน : </label>\r\n                <div class=\"input-group col-md-8\">\r\n                  <input class=\"form-control\" type=\"text\" name=\"department\" disabled>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-form-label col-md-4\">คำสั่งกรมฯ ที่ : </label>\r\n                <div class=\"input-group col-md-8\">\r\n                  <input class=\"form-control\" type=\"text\" name=\"departOrder\" [disabled]=\"showEditField\">\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-form-label col-md-4\">วันที่ออกคำสั่ง : </label>\r\n                <div class=\"input-group col-md-8\">\r\n                  <input class=\"form-control\" type=\"date\" name=\"dateOfIssue\" [disabled]=\"showEditField\">\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-form-label col-md-4\">ข้อเท็จจริงเกี่ยวกับความผิดโดยละเอียด : </label>\r\n                <div class=\"col-md-8\">\r\n                  <textarea class=\"form-control\" [disabled]=\"showEditField\" rows=\"5\"></textarea>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n              <div class=\"form-group row\">\r\n                <label class=\"col-form-label col-md-4\">เหตุผลที่ควรเปรียบเทียบคดีและ/หรือจัดการของกลาง :</label>\r\n                <div class=\"col-md-8\">\r\n                  <textarea class=\"form-control\" [disabled]=\"showEditField\" rows=\"5\"></textarea>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n        </div>\r\n        <div class=\"text-right\">\r\n          <button type=\"button\" (click)=\"onSaveF5()\" class=\"btn waves-effect waves-light btn-navy\" data-toggle=\"modal\" data-target=\"#approvePopup\">บันทึก</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/pages/fine/manage/manage.component.scss":
/***/ (function(module, exports) {

module.exports = ".btn-navy {\n  background: #005e8d;\n  color: white; }\n\n.btn-orange {\n  background: #e07023;\n  color: white; }\n\n.top-navbar {\n  background: linear-gradient(45deg, #005e8d, #353993); }\n\n.btn-action {\n  color: red;\n  font-size: 20px;\n  margin-left: 5px;\n  cursor: pointer; }\n\n#btn-browse {\n  opacity: 0; }\n\n.form-popup {\n  margin-bottom: 0; }\n\n.col-form-label {\n  color: black;\n  font-weight: 400; }\n\n.card-header {\n  background: #ccdeea;\n  border-color: #ccdeea; }\n\n::ng-deep .mat-autocomplete-panel {\n  background-color: white; }\n"

/***/ }),

/***/ "./src/app/pages/fine/manage/manage.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_header_navigation_navigation_service__ = __webpack_require__("./src/app/shared/header-navigation/navigation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__fine_service__ = __webpack_require__("./src/app/pages/fine/fine.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_arrest_service__ = __webpack_require__("./src/app/pages/model/arrest.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__model_lawsuit_service__ = __webpack_require__("./src/app/pages/model/lawsuit.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__model_master_service__ = __webpack_require__("./src/app/pages/model/master.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__config_message__ = __webpack_require__("./src/app/config/message.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_preloader_preloader_component__ = __webpack_require__("./src/app/shared/preloader/preloader.component.ts");
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








// import { ProveStaff } from '../proveStaff';
// import { ProveScience } from '../proveScience';
// import { ProveProduct } from '../proveProduct';

// import { ProveDocument } from '../proveDoc';

var ManageComponent = /** @class */ (function () {
    function ManageComponent(navService, ngbModel, activeRoute, fineService, ArrestSV, LawsuitSV, MasterSV, router, preloader) {
        this.navService = navService;
        this.ngbModel = ngbModel;
        this.activeRoute = activeRoute;
        this.fineService = fineService;
        this.ArrestSV = ArrestSV;
        this.LawsuitSV = LawsuitSV;
        this.MasterSV = MasterSV;
        this.router = router;
        this.preloader = preloader;
        this.programSpect = 'ILG60-06-02-00';
        // --- Array ---
        this.rawOptions = [];
        this.options = [];
        this.rawStaffOptions = [];
        this.Staffoptions = [];
        this.ReportOptions = [];
        this.ListCompareDetail = [];
        this.ListCompareDetailReceipt = [];
        this.ListCompareStaff = [];
        this.ArrestIndictment = [];
        // ---- Varible ---
        this.CompareNo = ""; // เลขที่เปรียบเทียบ  (ไม่รวม /ปี พ.ศ.)
        this.oCompareDetail = {};
        // set false
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
        // set true
        this.navService.setNextPageButton(true);
    }
    ManageComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var date;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // this.preloader.setShowPreloader(true);
                        this.active_Route();
                        this.navigate_Service();
                        return [4 /*yield*/, this.getStation()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getCompareStaff()];
                    case 2:
                        _a.sent();
                        this.CreateObject();
                        this.getLawsuitByID(this.LawsuitID);
                        return [4 /*yield*/, this.getArrestByID(this.ArrestCode)];
                    case 3:
                        _a.sent();
                        date = new Date();
                        this.CompareYear = (date.getFullYear() + 543).toString();
                        this.CompareDate = this.getCurrentDate();
                        this.CompareTime = this.getCurrentTime();
                        if (!(this.CompareID !== "0")) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.getCompareByID()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.ShowData()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        this.preloader.setShowPreloader(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.active_Route = function () {
        // this.sub = this.navService.showFieldEdit.subscribe(status => {
        //   if (!status) {
        //     this.navService.setCancelButton(true);
        //     this.navService.setSaveButton(true);
        //     this.navService.setPrintButton(false);
        //     this.navService.setSearchBar(false);
        //     this.navService.setDeleteButton(false);
        //     this.navService.setEditButton(false);
        var _this = this;
        //   } else {
        //     this.navService.setPrintButton(true);
        //     this.navService.setDeleteButton(true);
        //     this.navService.setEditButton(true);
        //     this.navService.setSearchBar(false);
        //     this.navService.setCancelButton(false);
        //     this.navService.setSaveButton(false);
        //   }
        //   this.navService.setNextPageButton(true);
        // });
        this.param = this.activeRoute.params.subscribe(function (p) {
            _this.navService.setPrintButton(true);
            _this.navService.setDeleteButton(true);
            _this.navService.setEditButton(true);
            _this.navService.setSearchBar(false);
            _this.navService.setCancelButton(false);
            _this.navService.setSaveButton(false);
            _this.navService.setNextPageButton(true);
            console.log(_this.param);
            if (p['code1']) {
                _this.LawsuitID = p['code1'];
            }
            if (p['code2']) {
                _this.ArrestCode = p['code2'];
            }
            if (p['code3']) {
                _this.CompareID = p['code3'];
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
                        if (!status) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.navService.setOnSave(false)];
                    case 1:
                        _a.sent();
                        if (!(this.CompareID == '0')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.onInsCompare()];
                    case 2:
                        _a.sent();
                        this.router.navigate(['/fine/list']);
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, this.onUpdCompare()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.onComplete()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); });
        // this.sub =  this.navService.onDelete.subscribe(async status => {
        //     if (status) {
        //         await this.navService.setOnDelete(false);
        //         this.onDelete();
        //     }
        // });
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
    ManageComponent.prototype.CreateObject = function () {
        this.oCompare = {
            CompareID: "",
            CompareCode: "",
            CompareDate: "",
            CompareStationCode: "",
            CompareStation: "",
            CompareSubdistrictCode: "",
            CompareSubdistrict: "",
            CompareDistrictCode: "",
            CompareDistrict: "",
            CompareProvinceCode: "",
            CompareProvince: "",
            AccuserSubdistrictCode: "",
            AccuserSubdistrict: "",
            AccuserDistrictCode: "",
            AccuserDistrict: "",
            AccuserProvinceCode: "",
            AccuserProvince: "",
            IsOutside: "",
            LawsuitID: ""
        };
    };
    ManageComponent.prototype.getLawsuitByID = function (LawsuitID) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // this.preloader.setShowPreloader(true);
                    return [4 /*yield*/, this.LawsuitSV.LawsuitegetByCon2(LawsuitID).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                            var tmplawsuit;
                            return __generator(this, function (_a) {
                                tmplawsuit = res;
                                // for (let index = 0; index < tmplawsuit.length; index++) {
                                //   if (this.LawsuitID === tmplawsuit.ArrestIndicment[index].Lawsuit[0].LawsuitID) {
                                //     // this.LawsuitList =
                                //   }
                                // }  
                                // if (res[0].ArrestIndicment[0].Lawsuit[0].IsOutside == "1") {
                                //   this.LawsuiltCode = "น " + res[0].ArrestIndicment[0].Lawsuit[0].LawsuitNo;
                                // }
                                // else {
                                //   this.LawsuiltCode = res[0].ArrestIndicment[0].Lawsuit[0].LawsuitNo;
                                // }
                                if (res.IsOutside == "1") {
                                    this.LawsuiltCode = "น " + res.LawsuitNo;
                                }
                                else {
                                    this.LawsuiltCode = res.LawsuitNo;
                                }
                                // this.LawsuiltDate = new Date(res.LawsuitDate).toISOString().substring(0, 10);
                                // this.LawsuiltTime = new Date(res.LawsuitTime).toISOString().substring(0, 10);
                                // this.IndictmentID = res.IndictmentID.toString();
                                // this.LawsuiltDate = new Date(res[0].ArrestIndicment[0].Lawsuit[0].LawsuitDate).toISOString().substring(0, 10);
                                // this.LawsuiltTime = new Date(res[0].ArrestIndicment[0].Lawsuit[0].LawsuitTime).toISOString().substring(15, 20);
                                // this.IndictmentID = res[0].ArrestIndicment[0].IndictmentID.toString();
                                this.preloader.setShowPreloader(false);
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
    ManageComponent.prototype.getArrestByID = function (ArrestCode) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // this.preloader.setShowPreloader(true);
                    return [4 /*yield*/, this.ArrestSV.getByArrestCon(ArrestCode).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        console.log(res);
                                        res[0].ArrestStaff.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                if (item.ContributorCode === "6") {
                                                    item.FullName = "" + (item.TitleName == null ? '' : item.TitleName);
                                                    item.FullName += "" + (item.FirstName == null ? '' : item.FirstName);
                                                    item.FullName += " " + (item.LastName == null ? '' : item.LastName);
                                                }
                                                return [2 /*return*/];
                                            });
                                        }); });
                                        res[0].ArrestLawbreaker.forEach(function (item) {
                                            if (item.EntityType === "0") {
                                                item.AccusedName = "" + (item.CompanyTitle == null ? '' : item.CompanyTitle);
                                                item.AccusedName += "" + (item.CompanyName == null ? '' : item.CompanyName);
                                                // item.AccusedName += ` ${item.LastName == null ? '' : item.LastName}`;
                                            }
                                            else {
                                                var tpmname = {
                                                    AccusedName: item.AccusedName = item.LawbreakerTitleName + " "
                                                        + item.LawbreakerFirstName + " "
                                                        + item.LawbreakerMiddleName + " "
                                                        + item.LawbreakerLastName
                                                };
                                                if (_this.AccusedTable === undefined) {
                                                    _this.AccusedTable = new Array();
                                                }
                                                _this.AccusedTable.push(tpmname);
                                                // item.AccusedName = `${item.LawbreakerTitleName == null ? '' : item.LawbreakerTitleName}`;
                                                // item.AccusedName += `${item.LawbreakerFirstName == null ? '' : item.LawbreakerFirstName}`;
                                                // item.AccusedName += ` ${item.LawbreakerMiddleName == null ? '' : item.LawbreakerMiddleName}`;
                                                // item.AccusedName += ` ${item.LawbreakerLastName == null ? '' : item.LawbreakerLastName}`;
                                            }
                                        });
                                        this.ArrestLocation = "" + (res[0].ArrestLocale[0].SubDistrict == null ? '' : res[0].ArrestLocale[0].SubDistrict);
                                        this.ArrestLocation += " " + (res[0].ArrestLocale[0].District == null ? '' : res[0].ArrestLocale[0].District);
                                        this.ArrestLocation += " " + (res[0].ArrestLocale[0].Province == null ? '' : res[0].ArrestLocale[0].Province);
                                        this.AccuserSubdistrictCode = "" + (res[0].ArrestLocale[0].SubDistrictCode == null ? '' : res[0].ArrestLocale[0].SubDistrictCode);
                                        this.AccuserSubdistrict = "" + (res[0].ArrestLocale[0].SubDistrict == null ? '' : res[0].ArrestLocale[0].SubDistrict);
                                        // res.ArrestStaff.filter(item => item.ContributorID === "11").map(async item => {
                                        res[0].ArrestStaff.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                if (item.ContributorCode === "6") {
                                                    this.ArrestStaffName = item.FullName; // ผู้กล่าวหา
                                                    this.PositionName = item.PositionName; // ตำแหน่งผู้กล่าวหา
                                                    this.DepartmentName = item.DepartmentName; // แผนกผู้กล่าวหา
                                                }
                                                return [2 /*return*/];
                                            });
                                        }); });
                                        // res[0].ArrestLawbreaker.map(async item => {
                                        //   this.AccusedTable = item.AccusedName;
                                        //   if (isArray(this.AccusedTable)) {
                                        //     this.AccusedTable = [this.AccusedTable];
                                        //   }
                                        // });
                                        this.oArrest = res[0];
                                        this.oArrest.ArrestLawbreaker.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                if (item.EntityType == 0) {
                                                    item.LawbreakerFullName = "" + (item.CompanyTitle == null ? '' : item.CompanyTitle);
                                                    item.LawbreakerFullName += " " + (item.CompanyName == null ? '' : item.CompanyName);
                                                }
                                                else {
                                                    item.LawbreakerFullName = "" + (item.LawbreakerTitleName == null ? '' : item.LawbreakerTitleName);
                                                    item.LawbreakerFullName += "" + (item.LawbreakerFirstName == null ? '' : item.LawbreakerFirstName);
                                                    item.LawbreakerFullName += " " + (item.LawbreakerLastName == null ? '' : item.LawbreakerLastName);
                                                }
                                                return [2 /*return*/];
                                            });
                                        }); });
                                        console.log("ArrestLawbreaker");
                                        console.log(this.oArrest);
                                        return [4 /*yield*/, this.getGuiltBaseByID()];
                                    case 1:
                                        _a.sent();
                                        this.preloader.setShowPreloader(false);
                                        return [2 /*return*/];
                                }
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
    ManageComponent.prototype.CompareMasLawgetByCon = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    ManageComponent.prototype.getGuiltBaseByID = function () {
        return __awaiter(this, void 0, void 0, function () {
            var aIndex, arrestIndex;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.oArrest.ArrestIndictment.length > 0)) return [3 /*break*/, 2];
                        this.ArrestIndictment = this.oArrest.ArrestIndictment.filter(function (item) { return item.IndictmentID == +_this.IndictmentID; });
                        return [4 /*yield*/, this.LawsuitSV.getGuiltBaseByCon(this.oArrest.ArrestIndictment[0].GuiltBaseID.toString()).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    this.SectionName = res.CompareMasLawSection.SectionName;
                                    this.GuiltBaseName = res.CompareMasLawGuiltBase.GuiltBaseName;
                                    this.SectionNo = res.CompareMasLawPenalty.SectionNo.toString();
                                    this.PenaltyDesc = res.CompareMasLawPenalty.PenaltyDesc;
                                    return [2 /*return*/];
                                });
                            }); }, function (err) {
                                alert(err.message);
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.preloader.setShowPreloader(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.getCompareByID = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // this.preloader.setShowPreloader(true);
                    return [4 /*yield*/, this.fineService.getByCon(this.CompareID).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                            var CompareStaff;
                            return __generator(this, function (_a) {
                                console.log("getCompareByID");
                                console.log(res);
                                if (res != null) {
                                    this.oCompare = res[0];
                                    CompareStaff = res[0].CompareStaff[0];
                                    this.CompareStaffName = CompareStaff.TitleName + " " + CompareStaff.FirstName + " " + CompareStaff.LastName;
                                    this.OperationPosName = CompareStaff.PositionName;
                                    this.OperationDeptName = CompareStaff.DepartmentName;
                                    this.preloader.setShowPreloader(false);
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
    ManageComponent.prototype.ShowData = function () {
        var _this = this;
        debugger;
        if (this.CompareID !== "0") {
            var CRN = this.oCompare.CompareCode.split('/');
            if (CRN.length > 1) {
                this.CompareNo = CRN[0];
                this.CompareYear = CRN[1];
            }
            var CDate = this.oCompare.CompareDate.split(" ");
            this.CompareDate = CDate[0];
            this.CompareTime = CDate[1] + ".000";
            this.IsOutside = this.oCompare.IsOutside;
            this.StationName = this.oCompare.CompareStation;
            this.ListCompareDetail = this.oCompare.CompareDetail;
            this.ListCompareStaff = this.oCompare.CompareStaff;
            this.ListCompareStaff.filter(function (f) { return f.ContributorCode == "18"; }).map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // this.CompareStaffName = `${item.TitleName == null ? '' : item.TitleName}`;
                    // this.CompareStaffName += `${item.FirstName == null ? '' : item.FirstName}`;
                    // this.CompareStaffName += ` ${item.LastName == null ? '' : item.LastName}`;
                    this.OperationPosName = "" + (item.PositionName == null ? '' : item.PositionName);
                    this.OperationDeptName = "" + (item.DepartmentName == null ? '' : item.DepartmentName);
                    this.CompareStaffID = "" + (item.StaffID == null ? '' : item.StaffID);
                    this.oCompareStaff = item;
                    this.oCompareStaff.IsNewItem = false;
                    return [2 /*return*/];
                });
            }); });
            // for (var i = 0; this.ListCompareDetail.length; i++) {
            //   this.ListCompareDetail[i].LawBrakerName = "";
            //   this.ListCompareDetailReceipt.push(this.oCompare.CompareDetail[i].CompareDetailReceipt);
            //   this.ListCompareDetail[i].IsNewItem = false;
            //   this.ListCompareDetailReceipt[i].IsNewItem = false;
            //   if (this.ListCompareDetail[i].IndictmentDetailID != null && this.ListCompareDetail[i].IndictmentDetailID || "") {
            //     let LawbreakerID = this.oArrest.ArrestIndictment
            //       .filter(item => item.IndictmentID === +this.IndictmentID)[0].OpsArrestIndicmentDetailCollection
            //       .filter(item => item.IndictmentDetailID === this.ListCompareDetail[i].IndictmentDetailID);
            //     let result = this.oArrest.ArrestLawbreaker.filter(item => item.LawbreakerID === +LawbreakerID[0].LawbreakerID);
            //     if (result.length > 0) {
            //       this.ListCompareDetail[i].LawBrakerName = result[0].LawbreakerFullName;
            //       this.ListCompareDetailReceipt[i].LawBrakerName = result[0].LawbreakerFullName;
            //     }
            //   }
            // }
        }
    };
    ManageComponent.prototype.getIndexOf = function (arr, val, prop) {
        var l = arr.length, k = 0;
        for (k = 0; k < l; k = k + 1) {
            if (arr[k][prop] == val) {
                return k;
            }
        }
        return false;
    };
    ManageComponent.prototype.onInsCompare = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    ManageComponent.prototype.onUpdCompare = function () {
        return __awaiter(this, void 0, void 0, function () {
            var aIndex, isSuccess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // this.preloader.setShowPreloader(true);
                        this.oCompare.CompareCode = this.CompareNo + "/" + this.CompareYear;
                        this.oCompare.CompareDate = this.CompareDate + ' ' + this.CompareTime;
                        this.oCompare.AccuserSubdistrictCode = this.AccuserSubdistrictCode;
                        this.oCompare.AccuserSubdistrict = this.AccuserSubdistrict;
                        aIndex = this.getIndexOf(this.ListCompareStaff, "18", "ContributorCode");
                        this.ListCompareStaff[aIndex] = this.oCompareStaff;
                        this.oCompare.IsOutside = '1';
                        isSuccess = true;
                        debugger;
                        // Update compare
                        return [4 /*yield*/, this.fineService.CompareupdByCon(this.oCompare).then(function (IsSuccess) {
                                if (!IsSuccess) {
                                    isSuccess = IsSuccess;
                                    return false;
                                }
                            }, function (error) { isSuccess = false; console.error(error); return false; })];
                    case 1:
                        // Update compare
                        _a.sent();
                        if (!isSuccess)
                            return [2 /*return*/, false];
                        if (isSuccess) {
                            alert(__WEBPACK_IMPORTED_MODULE_8__config_message__["a" /* Message */].saveComplete);
                        }
                        else {
                            alert(__WEBPACK_IMPORTED_MODULE_8__config_message__["a" /* Message */].saveFail);
                        }
                        this.preloader.setShowPreloader(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    // --- เขียนที่ (คำให้การของผู้ต้องหา) ---
    ManageComponent.prototype.getStation = function () {
        var _this = this;
        // this.preloader.setShowPreloader(true);
        this.MasterSV.getStation().then(function (res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (res) {
                    this.rawOptions = res;
                }
                return [2 /*return*/];
            });
        }); }, function (err) {
            alert(err.message);
        });
        // this.preloader.setShowPreloader(false);
    };
    ManageComponent.prototype.onAutoChange = function (value) {
        // 
        if (value == '') {
            this.options = [];
            this.oCompare.CompareStationCode = "";
            this.oCompare.CompareStation = "";
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
        this.oCompare.CompareStationCode = event.OfficeCode;
        this.oCompare.CompareStation = event.OfficeName;
        debugger;
    };
    // ----- End เขียนที่ (คำให้การของผู้ต้องหา) ---
    // --- เขียนที่ (รายงานขออนุมัติการเปรียบเทียบคดีและแบบอนุมัติ) ---
    ManageComponent.prototype.ReportonAutoChange = function (value) {
        // 
        if (value == '') {
            this.ReportOptions = [];
        }
        else {
            this.ReportOptions = this.rawOptions.filter(function (f) { return f.OfficeName.toLowerCase().indexOf(value.toLowerCase()) > -1; });
        }
    };
    ManageComponent.prototype.ReportonAutoFocus = function (value) {
        if (value == '') {
            this.ReportOptions = [];
        }
    };
    ManageComponent.prototype.ReportonAutoSelecteWord = function (event) {
        // this.oProve.ProveStationCode = event.OfficeCode;
        // this.oProve.ProveStation = event.OfficeName;
    };
    // ----- End เขียนที่ (รายงานขออนุมัติการเปรียบเทียบคดีและแบบอนุมัติ) ---
    // ----- Format Datetime ---
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
    // ----- ผู้เปรียบเทียบ ---
    ManageComponent.prototype.getCompareStaff = function () {
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
    ManageComponent.prototype.StaffonAutoChange = function (value) {
        // 
        if (value == '') {
            this.Staffoptions = [];
            this.ClearStaffData();
        }
        else {
            if (this.rawStaffOptions.length == 0) {
                this.getCompareStaff();
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
        this.oCompareStaff = {
            StaffID: this.CompareStaffID,
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-06",
            // LawsuitID: this.LawsuitID,
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
            ContributorID: "18",
            IsActive: "1"
        };
        if (this.CompareStaffID == '' || this.CompareStaffID == undefined) {
            this.oCompareStaff.IsNewItem = true;
        }
        this.OperationPosName = event.PosLevelName;
        this.OperationDeptName = event.OperationDeptName;
    };
    ManageComponent.prototype.ClearStaffData = function () {
        this.OperationPosName = "";
        this.OperationDeptName = "";
        this.oCompareStaff = {
            ProgramCode: "XCS-60",
            ProcessCode: "XCS-60-05",
            StaffID: this.CompareStaffID,
            // LawsuitID: this.LawsuitID,
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
            ContributorID: "18"
        };
        if (this.CompareStaffID == '' || this.CompareStaffID == undefined) {
            this.oCompareStaff.IsNewItem = true;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('printDocModal'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], ManageComponent.prototype, "printDocModel", void 0);
    ManageComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-manage',
            template: __webpack_require__("./src/app/pages/fine/manage/manage.component.html"),
            styles: [__webpack_require__("./src/app/pages/fine/manage/manage.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__shared_header_navigation_navigation_service__["a" /* NavigationService */],
            __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["d" /* NgbModal */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_4__fine_service__["a" /* FineService */],
            __WEBPACK_IMPORTED_MODULE_5__model_arrest_service__["a" /* ArrestService */],
            __WEBPACK_IMPORTED_MODULE_6__model_lawsuit_service__["a" /* LawsuitService */],
            __WEBPACK_IMPORTED_MODULE_7__model_master_service__["a" /* MasterService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */],
            __WEBPACK_IMPORTED_MODULE_9__shared_preloader_preloader_component__["b" /* PreloaderService */]])
    ], ManageComponent);
    return ManageComponent;
}());



/***/ }),

/***/ "./src/app/pages/fine/manage/manage.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageModule", function() { return ManageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__manage_component__ = __webpack_require__("./src/app/pages/fine/manage/manage.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__component_card_actions_card_actions_module__ = __webpack_require__("./src/app/pages/component/card-actions/card-actions.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__fine_service__ = __webpack_require__("./src/app/pages/fine/fine.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__model_arrest_service__ = __webpack_require__("./src/app/pages/model/arrest.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__model_lawsuit_service__ = __webpack_require__("./src/app/pages/model/lawsuit.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__model_master_service__ = __webpack_require__("./src/app/pages/model/master.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_material_autocomplete__ = __webpack_require__("./node_modules/@angular/material/esm5/autocomplete.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__printdoc_modal_printdoc_modal_module__ = __webpack_require__("./src/app/pages/fine/printdoc-modal/printdoc-modal.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__shared_pipe_IsActivePipe__ = __webpack_require__("./src/app/shared/pipe/IsActivePipe.ts");
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
                { title: 'ค้นหางานเปรียบแทียบและชำระค่าปรับ', url: '/fine/list' },
                { title: 'จัดการข้อมูลงานเปรียบแทียบและชำระค่าปรับ' }
            ],
            nextPage: { title: 'ส่งเงินรายได้', url: '/income/manage' }
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
                __WEBPACK_IMPORTED_MODULE_13__printdoc_modal_printdoc_modal_module__["a" /* PrintDocModalModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_6__fine_service__["a" /* FineService */],
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

/***/ "./src/app/pages/fine/printdoc-modal/printdoc-modal.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <form action=\"\" #form=\"ngForm\" (ngSubmit)=\"onPrint(form)\"> -->\r\n<div class=\"modal-header bg-theme\">\r\n    <div class=\"row\">\r\n        <div class=\"col-lg-5\">\r\n            <h4 class=\"modal-title text-white\">พิมพ์เอกสาร</h4>\r\n        </div>\r\n\r\n        <a href=\"javaScript:void(0);\" class=\"close text-white font-14\" aria-label=\"Close\" (click)=\"dismiss('Cross click')\">\r\n            <span aria-hidden=\"true\">\r\n                <i class=\" ti-close\"></i>\r\n            </span>\r\n        </a>\r\n    </div>\r\n</div>\r\n<div class=\"modal-body font-14\">\r\n    <div class=\"card unset-radius\">\r\n        <div class=\"card-body p-0\">\r\n            <div class=\"table-responsive\">\r\n                <div class=\"table-responsive table-striped \">\r\n                    <table class=\"table\">\r\n                        <thead>\r\n                            <tr>\r\n                                <th style=\"text-align: center;width: 5%\"></th>\r\n                                <th style=\"text-align: center;width: 7%\">ลำดับ</th>\r\n                                <th>ชื่อเอกสาร</th>\r\n                                <th>ประเภทเอกสาร</th>\r\n                            </tr>\r\n                        </thead>\r\n                        <tbody>\r\n                            <tr>\r\n                                <td class=\"text-center\">\r\n                                    <!-- <input type=\"hidden\" name=\"InvestigateDetailID\" [(ngModel)]=\"item.InvestigateDetailID\">\r\n                                    <input type=\"checkbox\" [id]=\"'td'+i\" name=\"checking\" ngModel class=\"filled-in chk-col-indigo\">\r\n                                    <label [for]=\"'td'+i\" class=\"m-0\"></label> -->\r\n                                </td>\r\n                                <td class=\"text-center\">1</td>\r\n                                <td>บันทึกคำให้การของผู้กล่าวโทษ ส.ส.2/54 {{TitleName}}{{FirstName}} {{LastName}}</td>\r\n                                <td>แบบฟอร์ม</td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td class=\"text-center\">\r\n                                    <!-- <input type=\"hidden\" name=\"InvestigateDetailID\" [(ngModel)]=\"item.InvestigateDetailID\">\r\n                                        <input type=\"checkbox\" [id]=\"'td'+i\" name=\"checking\" ngModel class=\"filled-in chk-col-indigo\">\r\n                                        <label [for]=\"'td'+i\" class=\"m-0\"></label> -->\r\n                                </td>\r\n                                <td class=\"text-center\">2</td>\r\n                                <td>ใบเสร็จชำระค่าปรับ {{TitleName}}{{FirstName}} {{LastName}}</td>\r\n                                <td>แบบฟอร์ม</td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td class=\"text-center\">\r\n                                    <!-- <input type=\"hidden\" name=\"InvestigateDetailID\" [(ngModel)]=\"item.InvestigateDetailID\">\r\n                                            <input type=\"checkbox\" [id]=\"'td'+i\" name=\"checking\" ngModel class=\"filled-in chk-col-indigo\">\r\n                                            <label [for]=\"'td'+i\" class=\"m-0\"></label> -->\r\n                                </td>\r\n                                <td class=\"text-center\">3</td>\r\n                                <td>บันทึกการเปรียบเทียบคดี 2/54 {{TitleName}}{{FirstName}} {{LastName}}</td>\r\n                                <td>แบบฟอร์ม</td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td class=\"text-center\">\r\n                                    <!-- <input type=\"hidden\" name=\"InvestigateDetailID\" [(ngModel)]=\"item.InvestigateDetailID\">\r\n                                                <input type=\"checkbox\" [id]=\"'td'+i\" name=\"checking\" ngModel class=\"filled-in chk-col-indigo\">\r\n                                                <label [for]=\"'td'+i\" class=\"m-0\"></label> -->\r\n                                </td>\r\n                                <td class=\"text-center\">4</td>\r\n                                <td>รายงานขออนุมัติการเปรียบเทียบและอนุมัติ {{TitleName}}{{FirstName}} {{LastName}}</td>\r\n                                <td>แบบฟอร์ม</td>\r\n                            </tr>\r\n                            <tr *ngFor=\"let item of document; let i=index;\">\r\n                                <td class=\"text-center\">\r\n                                    <!-- <input type=\"hidden\" name=\"InvestigateDetailID\" [(ngModel)]=\"item.InvestigateDetailID\"> -->\r\n                                    <input type=\"checkbox\" [id]=\"'td'+i\" name=\"checking\" ngModel class=\"filled-in chk-col-indigo\">\r\n                                    <label [for]=\"'td'+i\" class=\"m-0\"></label>\r\n                                </td>\r\n                                <td class=\"text-center\">{{i+1}}</td>\r\n                                <td>รายงานการ{{item.DocumentName}}</td>\r\n                                <td></td>\r\n                            </tr>\r\n                        </tbody>\r\n                    </table>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"modal-footer\">\r\n    <div class=\"col-lg-2 col-sm-4\">\r\n        <button type=\"button\" class=\"btn btn-block btn-themecolor\" (click)=\"close('Print click')\">พิมพ์</button>\r\n    </div>\r\n</div>\r\n<!-- </form> -->"

/***/ }),

/***/ "./src/app/pages/fine/printdoc-modal/printdoc-modal.component.scss":
/***/ (function(module, exports) {

module.exports = "@media (min-width: 992px) {\n  .modal-lg {\n    max-width: 980px !important; } }\n"

/***/ }),

/***/ "./src/app/pages/fine/printdoc-modal/printdoc-modal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrintDocModalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fine_service__ = __webpack_require__("./src/app/pages/fine/fine.service.ts");
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




var PrintDocModalComponent = /** @class */ (function () {
    function PrintDocModalComponent(fineService, fb, _router) {
        this.fineService = fineService;
        this.fb = fb;
        this._router = _router;
        this.condtion = {};
        this.d = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.c = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
    }
    PrintDocModalComponent.prototype.ngOnInit = function () {
        this.getCompareByID();
        //this.getCompareDoc();
    };
    PrintDocModalComponent.prototype.getCompareByID = function () {
        this.setCompareCondition();
        // this.fineService.getByCon(this.condtion).subscribe(list => {
        //   if (Array.isArray(list)) {
        //     this.getLawbreakerByArrest(list[0].ArrestCode);
        //   } 
        // });
        // this.fineService.getByCon(this.condtion).then(async res => {
        //     this.getLawbreakerByArrest(res[0].ArrestCode);
        // });
    };
    PrintDocModalComponent.prototype.getLawbreakerByArrest = function (ArrestCode) {
        var _this = this;
        ArrestCode = "050100020";
        this.fineService.getByArrestCon(ArrestCode).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.TitleName = res.ArrestLawbreaker[0].LawbreakerTitleName;
                this.FirstName = res.ArrestLawbreaker[0].LawbreakerFirstName;
                this.LastName = res.ArrestLawbreaker[0].LawbreakerLastName;
                return [2 /*return*/];
            });
        }); });
    };
    PrintDocModalComponent.prototype.getCompareDoc = function () {
        var _this = this;
        debugger;
        //this.pCompareID
        this.fineService.getByDoc("050100020").then(function (res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.TitleName = res.ArrestLawbreaker[0].LawbreakerTitleName;
                this.FirstName = res.ArrestLawbreaker[0].LawbreakerFirstName;
                this.LastName = res.ArrestLawbreaker[0].LawbreakerLastName;
                return [2 /*return*/];
            });
        }); });
    };
    PrintDocModalComponent.prototype.setCompareCondition = function () {
        this.condtion = {};
        this.condtion = {
            CompareID: "22",
            CompareDetailID: "",
            CompareDetailReceiptID: "",
            FineType: "",
            CompareFineID: "",
            ReceiptFineType: "",
            StaffID: "",
            ProgramCode: "",
            ProcessCode: ""
        };
    };
    PrintDocModalComponent.prototype.onPrint = function (form) {
        // console.log(form.value);
        // this.close('Save click')
        // this.c.emit(form);
        this._router.navigate(["/fine/list"]);
    };
    PrintDocModalComponent.prototype.dismiss = function (e) {
        this.d.emit(e);
    };
    PrintDocModalComponent.prototype.close = function (e) {
        this.c.emit(e);
        this._router.navigate(["/fine/list"]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", String)
    ], PrintDocModalComponent.prototype, "pCompareID", void 0);
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
            template: __webpack_require__("./src/app/pages/fine/printdoc-modal/printdoc-modal.component.html"),
            styles: [__webpack_require__("./src/app/pages/fine/printdoc-modal/printdoc-modal.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__fine_service__["a" /* FineService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]])
    ], PrintDocModalComponent);
    return PrintDocModalComponent;
}());



/***/ }),

/***/ "./src/app/pages/fine/printdoc-modal/printdoc-modal.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrintDocModalModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__printdoc_modal_component__ = __webpack_require__("./src/app/pages/fine/printdoc-modal/printdoc-modal.component.ts");
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
//# sourceMappingURL=manage.module.1.chunk.js.map
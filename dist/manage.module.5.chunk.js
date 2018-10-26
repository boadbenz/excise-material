webpackJsonp(["manage.module.5"],{

/***/ "./src/app/pages/reduction/manage/manage.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card card-outline-bluish unset-radius\">\r\n  <div class=\"card-header unset-radius\">\r\n    <app-card-actions-collapse></app-card-actions-collapse>\r\n    <h5 class=\"card-title m-b-0\">รายละเอียดคดี</h5>\r\n  </div>\r\n  <div class=\"card-body\">\r\n    <div class=\"form-body\">\r\n      <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label text-left col-md-4\">เลขที่ใบงาน : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.arrestCode\" name=\"arrestCode\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label text-right col-md-4\">วันที่จับกุม : </label>\r\n            <div class=\"form-group input-group col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.lawsuitDate\" name=\"lawsuitDate\" disabled>\r\n              <label class=\"col-form-label text-right col-md-2\">เวลา</label>\r\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.lawsuitTime\" name=\"lawsuitTime\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label text-left col-md-4\">ผู้กล่าวหา : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"fullName\" name=\"\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label text-right col-md-4\">ตำแหน่ง : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.positionlawName\" name=\"positionlawName\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label text-left col-md-4\">หน่วยงาน : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.departmentlawName\" name=\"departmentlawName\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label text-right col-md-4\">สถานที่จับกุม : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.locationlawName\" name=\"locationlawName\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label text-left col-md-4\">เลขที่คดีรับคำกล่าวโทษ : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.lawsuitNo\" name=\"lawsuitNo\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label text-right col-md-4\">วันที่รับคดี : </label>\r\n            <div class=\"form-group input-group col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.lawsuitDate\" name=\"lawsuitDate\" disabled>\r\n              <label class=\"col-form-label text-right col-md-2\">เวลา</label>\r\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.lawsuitTime\" name=\"lawsuitTime\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label text-left col-md-4\">ฐานความผิดมาตรา : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.faultNo\" name=\"faultNo\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label text-right col-md-4\">ฐานความผิด : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.faultSubject\" name=\"faultSubject\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label text-left col-md-4\">บทกำหนดโทษ : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.faultNo\" name=\"faultNo\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label text-right col-md-4\">อัตราโทษ : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.penalty\" name=\"penalty\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label text-left col-md-4\">เลขที่คดีเปรียบเทียบ : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.lawsuitNo\" name=\"lawsuitNo\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label text-right col-md-4\">วันที่เปรียบเทียบ : </label>\r\n            <div class=\"form-group input-group col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.lawsuitDate\" name=\"lawsuitDate\" disabled>\r\n              <label class=\"col-form-label text-right col-md-2\">เวลา</label>\r\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.lawsuitTime\" name=\"lawsuitTime\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label text-left col-md-4\">ผู้เปรียบเทียบ : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"fullName\" name=\"\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label text-right col-md-4\">ตำแหน่ง : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.positionlawName\" name=\"positionlawName\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label text-left col-md-4\">หน่วยงาน : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.departmentlawName\" name=\"departmentlawName\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"card card-outline-bluish unset-radius\">\r\n  <div class=\"card-header unset-radius\">\r\n    <app-card-actions-collapse></app-card-actions-collapse>\r\n    <h5 class=\"card-title m-b-0\">รายละเอียดการปรับเพิ่มหรือปรับลด</h5>\r\n  </div>\r\n  <div class=\"card-body\">\r\n    <div class=\"text-right m-b-10\">\r\n      <button [ngClass]=\"{disabled : showField}\" class=\"btn waves-effect waves-light btn-navy\" [disabled]=\"showField\" (click)=\"showReductionPopup()\">\r\n      ปรับเพิ่ม-ลด </button>\r\n    </div>\r\n    <div class=\"table-responsive table-striped no-wrap\">\r\n      <table class=\"table\">\r\n        <thead>\r\n          <tr>\r\n            <th class=\"footable-sortable\">ลำดับ</th>\r\n            <th class=\"footable-sortable\">ชื่อผู้ต้องหา</th>\r\n            <th class=\"footable-sortable\">ค่าปรับเดิม</th>\r\n            <th class=\"footable-sortable\">ค่าปรับใหม่</th>\r\n            <th class=\"footable-sortable\">วันที่ชำระค่าปรับ</th>\r\n            <th class=\"footable-sortable\">ช่องทางชำระ</th>\r\n            <th class=\"footable-sortable\">ใบเสร็จเล่มที่</th>\r\n            <th class=\"footable-sortable\">ใบเสร็จเลขที่/เลขอ้างอิง</th>\r\n            <th class=\"footable-sortable\">สถานะคดี</th>\r\n            <th class=\"footable-sortable\"></th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr class=\"footable\" *ngFor=\"let item of tableData; let i = index;\">\r\n            <td>{{i+1}}</td>\r\n            <td>{{item.fullName}}</td>\r\n            <td>{{item.oldFine}}</td>\r\n            <td>{{item.newFine}}</td>\r\n            <td>{{item.dateFine}}</td>\r\n            <td>{{item.payment}}</td>\r\n            <td>{{item.receiptNo}}</td>\r\n            <td>{{item.receiptRef}}</td>\r\n            <td>{{item.statusCase}}</td>\r\n            <td>\r\n              <a href=\"javaScript:void(0);\" class=\"text-secondary\" (click)=\"viewData(i)\">\r\n                <i class=\"mdi mdi-eye fa-lg\"></i>\r\n              </a>\r\n              <a href=\"javaScript:void(0);\" class=\"text-secondary m-l-10\" (click)=\"editData(i)\" [hidden]=\"showField\">\r\n                <i class=\"ti-pencil-alt btn-action\"></i>\r\n              </a>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div class=\"modal fade\" id=\"reductionPopup\" tabindex=\"-1\" role=\"dialog\" #reductionPopup>\r\n  <div class=\"modal-dialog modal-lg\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header top-navbar text-white\">\r\n        เลือกรายการที่ต้องการปรับเพิ่ม-ลดค่าปรับเปรียบเทียบคดี\r\n        <div class=\"card-actions\">\r\n          <a data-toggle=\"modal\" data-target=\"#reductionPopup\">\r\n            <i class=\"ti-close\"></i>\r\n          </a>\r\n        </div>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <div class=\"text-right\"> ILG60-09-02-01-00 </div>\r\n        <div class=\"table-responsive table-striped no-wrap table-bordered m-t-10\">\r\n          <table class=\"table table-sm\">\r\n            <thead>\r\n              <tr>\r\n                <th class=\"footable-sortable text-center\">\r\n                  <div class=\"custom-control custom-checkbox\">\r\n                    <input id=\"checkbox_checkAll\" [(ngModel)]=\"selectAll\" type=\"checkbox\" class=\"col-form-label filled-in chk-col-indigo\">\r\n                    <label for=\"checkbox_checkAll\"></label>\r\n                  </div>\r\n                </th>\r\n                <th class=\"footable-sortable\">ลำดับ</th>\r\n                <th class=\"footable-sortable\">ชื่อผู้ต้องหา</th>\r\n                <th class=\"footable-sortable\">ลักษณะคดี </th>\r\n                <th class=\"footable-sortable\">เลขที่ดคีเปรียบเทียบ/คำพิพากษาฎีกาที่ </th>\r\n                <th class=\"footable-sortable\">วันที่ชำระเงิน </th>\r\n                <th class=\"footable-sortable\">งวดชำระ </th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr class=\"footable\" *ngFor=\"let item of tableData; let i = index;\">\r\n                <td class=\"text-center\">\r\n                  <div class=\"custom-control custom-checkbox\">\r\n                    <input id=\"checkbox_{{i}}\" [checked]=\"selectAll\" type=\"checkbox\" class=\"col-form-label filled-in chk-col-indigo\">\r\n                    <label for=\"checkbox_{{i}}\"></label>\r\n                  </div>\r\n                </td>\r\n                <td>{{i+1}}</td>\r\n                <td>{{item.fullName}}</td>\r\n                <td>{{item.typeCase}}</td>\r\n                <td>{{item.receiptRef}}</td>\r\n                <td>{{item.dateFine}}</td>\r\n                <td>{{item.period}}</td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn waves-effect waves-light btn-navy\" data-toggle=\"modal\" data-target=\"#reductionPopup\">ถัดไป</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/reduction/manage/manage.component.scss":
/***/ (function(module, exports) {

module.exports = ".btn-navy {\n  background: #005e8d;\n  color: white; }\n\n.btn-action {\n  color: red;\n  font-size: 20px; }\n\n.top-navbar {\n  background: linear-gradient(45deg, #005e8d, #353993); }\n"

/***/ }),

/***/ "./src/app/pages/reduction/manage/manage.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_header_navigation_navigation_service__ = __webpack_require__("./src/app/shared/header-navigation/navigation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ManageComponent = /** @class */ (function () {
    function ManageComponent(router, activeRoute, navService) {
        this.router = router;
        this.activeRoute = activeRoute;
        this.navService = navService;
        this.tableData = [
            {
                fullName: "นายธวัชชัย บิงขุนทด",
                oldFine: "1,400,000.00",
                newFine: "",
                dateFine: "10-ม.ค.-2560",
                payment: "เงินสด",
                receiptNo: "33",
                receiptRef: "001/2561",
                statusCase: "รับรายการนำส่ง",
                typeCase: "เปรียบเทียบคดี",
                period: "1/1"
            },
            {
                fullName: "นายสุชาติ ปัญโญใหญ่",
                oldFine: "1,400,000.00",
                newFine: "",
                dateFine: "10-ม.ค.-2560",
                payment: "เงินสด",
                receiptNo: "33",
                receiptRef: "001/2561",
                statusCase: "รับรายการนำส่ง",
                typeCase: "เปรียบเทียบคดี",
                period: "1/1"
            },
        ];
        this.listData = [{
                arrestCode: "TN90806026000001",
                lawsuitNo: "001/2561",
                proofNo: "001/2561",
                caseNumber: "001/2561",
                titleName: "นาย",
                firstName: "ธวัชชัย",
                lastName: "บิงขุนทด",
                lawsuitDate: "10-ม.ค.-2560",
                lawsuitTime: "12.00",
                departmentlawName: "สสท.ระนอง สาขาเมืองกระบุรี",
                positionlawName: "เจ้าพนักงานสรรพสามิตชำนาญงาน",
                locationlawName: "คลองจั่น/บางกะปิ/กรุงเทพมหานคร",
                faultSubject: "มีไว้ในครอบครองซึ่งสินค้าที่มิได้เสียภาษี",
                faultNo: "203",
                penalty: "กรณียาสูบ สุรา และไพ่ ปรับ 10 เท่า กรณีความผิดสินค้าอื่น กระทำผิดครั้งที่ 1 ปรับ 2 เท่า เว้นน้ำมัน และผลิตภัณฑ์น้ำมันปรับ 5 เท่า กระทำผิดครั้งที่ 2 ปรับ 5 เท่า เว้นน้ำมันและผลิตภัณฑ์น้ำมันปรับ 10 เท่า กระทำผิดครั้งที่ 3 ปรับ 10 เท่า"
            },
            {
                arrestCode: "TN90806026000002",
                lawsuitNo: "น.001/2561",
                proofNo: "น.001/2561",
                caseNumber: "001/2561",
                titleName: "นาย",
                firstName: "ธวัชชัย",
                lastName: "บิงขุนทด",
                lawsuitDate: "19-มี.ค.-2560",
                lawsuitTime: "12.00",
                departmentlawName: "สสท.ระนอง สาขาเมืองกระบุรี",
                positionlawName: "เจ้าพนักงานสรรพสามิตชำนาญงาน",
                locationlawName: "คลองจั่น/บางกะปิ/กรุงเทพมหานคร",
                faultSubject: "มีไว้ในครอบครองซึ่งสินค้าที่มิได้เสียภาษี",
                faultNo: "203",
                penalty: "กรณียาสูบ สุรา และไพ่ ปรับ 10 เท่า กรณีความผิดสินค้าอื่น กระทำผิดครั้งที่ 1 ปรับ 2 เท่า เว้นน้ำมัน และผลิตภัณฑ์น้ำมันปรับ 5 เท่า กระทำผิดครั้งที่ 2 ปรับ 5 เท่า เว้นน้ำมันและผลิตภัณฑ์น้ำมันปรับ 10 เท่า กระทำผิดครั้งที่ 3 ปรับ 10 เท่า"
            },
            {
                arrestCode: "TN90806026000003",
                lawsuitNo: "002/2561",
                proofNo: "002/2561",
                caseNumber: "002/2561",
                titleName: "นาย",
                firstName: "ธวัชชัย",
                lastName: "บิงขุนทด",
                lawsuitDate: "22-ต.ค.-2560",
                lawsuitTime: "12.00",
                departmentlawName: "สสท.ระนอง สาขาเมืองกระบุรี",
                positionlawName: "เจ้าพนักงานสรรพสามิตชำนาญงาน",
                locationlawName: "คลองจั่น/บางกะปิ/กรุงเทพมหานคร",
                faultSubject: "มีไว้ในครอบครองซึ่งสินค้าที่มิได้เสียภาษี",
                faultNo: "203",
                penalty: "กรณียาสูบ สุรา และไพ่ ปรับ 10 เท่า กรณีความผิดสินค้าอื่น กระทำผิดครั้งที่ 1 ปรับ 2 เท่า เว้นน้ำมัน และผลิตภัณฑ์น้ำมันปรับ 5 เท่า กระทำผิดครั้งที่ 2 ปรับ 5 เท่า เว้นน้ำมันและผลิตภัณฑ์น้ำมันปรับ 10 เท่า กระทำผิดครั้งที่ 3 ปรับ 10 เท่า"
            },
            {
                arrestCode: "TN90806026000004",
                lawsuitNo: "003/2561",
                proofNo: "003/2561",
                caseNumber: "003/2561",
                titleName: "นาย",
                firstName: "ธวัชชัย",
                lastName: "บิงขุนทด",
                lawsuitDate: "11-ธ.ค.-2560",
                lawsuitTime: "12.00",
                departmentlawName: "สสท.ระนอง สาขาเมืองกระบุรี",
                positionlawName: "เจ้าพนักงานสรรพสามิตชำนาญงาน",
                locationlawName: "คลองจั่น/บางกะปิ/กรุงเทพมหานคร",
                faultSubject: "มีไว้ในครอบครองซึ่งสินค้าที่มิได้เสียภาษี",
                faultNo: "203",
                penalty: "กรณียาสูบ สุรา และไพ่ ปรับ 10 เท่า กรณีความผิดสินค้าอื่น กระทำผิดครั้งที่ 1 ปรับ 2 เท่า เว้นน้ำมัน และผลิตภัณฑ์น้ำมันปรับ 5 เท่า กระทำผิดครั้งที่ 2 ปรับ 5 เท่า เว้นน้ำมันและผลิตภัณฑ์น้ำมันปรับ 10 เท่า กระทำผิดครั้งที่ 3 ปรับ 10 เท่า"
            },
            {
                arrestCode: "TN90806026000005",
                lawsuitNo: "004/2561",
                proofNo: "004/2561",
                caseNumber: "004/2561",
                titleName: "นาย",
                firstName: "ธวัชชัย",
                lastName: "บิงขุนทด",
                lawsuitDate: "03-มี.ค.-2561",
                lawsuitTime: "12.00",
                departmentlawName: "สสท.ระนอง สาขาเมืองกระบุรี",
                positionlawName: "เจ้าพนักงานสรรพสามิตชำนาญงาน",
                locationlawName: "คลองจั่น/บางกะปิ/กรุงเทพมหานคร",
                faultSubject: "มีไว้ในครอบครองซึ่งสินค้าที่มิได้เสียภาษี",
                faultNo: "203",
                penalty: "กรณียาสูบ สุรา และไพ่ ปรับ 10 เท่า กรณีความผิดสินค้าอื่น กระทำผิดครั้งที่ 1 ปรับ 2 เท่า เว้นน้ำมัน และผลิตภัณฑ์น้ำมันปรับ 5 เท่า กระทำผิดครั้งที่ 2 ปรับ 5 เท่า เว้นน้ำมันและผลิตภัณฑ์น้ำมันปรับ 10 เท่า กระทำผิดครั้งที่ 3 ปรับ 10 เท่า"
            }];
        this.fileItem = [{
                fileName: "",
                filePath: "",
            }];
    }
    ManageComponent.prototype.ngOnInit = function () {
        var _this = this;
        //set show button
        this.navServiceSub = this.navService.showFieldEdit.subscribe(function (status) {
            _this.showField = status;
            if (!_this.showField) {
                _this.navService.setCancelButton(true);
                _this.navService.setSaveButton(true);
                _this.navService.setPrintButton(false);
                _this.navService.setSearchBar(false);
                _this.navService.setDeleteButton(false);
                _this.navService.setEditButton(false);
            }
            else {
                _this.navService.setPrintButton(true);
                _this.navService.setDeleteButton(true);
                _this.navService.setEditButton(true);
                _this.navService.setSearchBar(false);
                _this.navService.setCancelButton(false);
                _this.navService.setSaveButton(false);
            }
        });
        this.getDataFromListPage = this.activeRoute.queryParams
            .subscribe(function (params) {
            //check id from list page
            for (var i = 0; i < _this.listData.length; i++) {
                if (params.code == _this.listData[i].arrestCode) {
                    _this.detailData = _this.listData[i];
                    _this.fullName =
                        _this.listData[i].titleName +
                            _this.listData[i].firstName +
                            " " +
                            _this.listData[i].lastName;
                }
            }
        });
    };
    ManageComponent.prototype.viewData = function (id) {
        this.router.navigate(['/reduction/manage', 'R', this.detailData.arrestCode], { queryParams: { id: id } });
    };
    ManageComponent.prototype.editData = function (id) {
        this.router.navigate(['/reduction/manage', 'R', this.detailData.arrestCode], { queryParams: { id: id } });
    };
    ManageComponent.prototype.attachFile = function (file) {
        this.fileItem.push({
            fileName: file[0].name,
            filePath: ""
        });
    };
    ManageComponent.prototype.showReductionPopup = function () {
        // jQuery(this.modalReduction.nativeElement).modal('show');
    };
    ManageComponent.prototype.ngOnDestroy = function () {
        this.getDataFromListPage.unsubscribe();
        this.navServiceSub.unsubscribe();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_13" /* ViewChild */])('reductionPopup'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__angular_core__["u" /* ElementRef */])
    ], ManageComponent.prototype, "modalReduction", void 0);
    ManageComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["n" /* Component */])({
            selector: 'app-manage',
            template: __webpack_require__("./src/app/pages/reduction/manage/manage.component.html"),
            styles: [__webpack_require__("./src/app/pages/reduction/manage/manage.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_0__shared_header_navigation_navigation_service__["a" /* NavigationService */]])
    ], ManageComponent);
    return ManageComponent;
}());



/***/ }),

/***/ "./src/app/pages/reduction/manage/manage.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageModule", function() { return ManageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__component_card_actions_card_actions_module__ = __webpack_require__("./src/app/pages/component/card-actions/card-actions.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__manage_component__ = __webpack_require__("./src/app/pages/reduction/manage/manage.component.ts");
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
                { title: "หน้าหลัก", url: '' },
                { title: "ค้นหารายการปรับเพิ่ม-ปรับลด", url: '/reduction/list' },
                { title: "จัดการข้อมูลรายการปรับเพิ่ม-ปรับลด" }
            ],
            pageType: 'manage',
            codePage: 'ILG60-09-02-00-00',
            nextPage: { title: 'จัดการข้อมูลรายละเอียดการปรับเพิ่ม-ปรับลด', url: '/reduction/manage-detail/:code' }
        },
        component: __WEBPACK_IMPORTED_MODULE_5__manage_component__["a" /* ManageComponent */]
    }
];
var ManageModule = /** @class */ (function () {
    function ManageModule() {
    }
    ManageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_0__component_card_actions_card_actions_module__["a" /* CardActionsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* RouterModule */].forChild(routes)
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_5__manage_component__["a" /* ManageComponent */]]
        })
    ], ManageModule);
    return ManageModule;
}());



/***/ })

});
//# sourceMappingURL=manage.module.5.chunk.js.map
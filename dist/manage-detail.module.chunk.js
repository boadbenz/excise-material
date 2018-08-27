webpackJsonp(["manage-detail.module"],{

/***/ "./src/app/pages/reduction/manage-detail/manage-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card card-outline-bluish unset-radius\">\n  <div class=\"card-header unset-radius\">\n    <app-card-actions-collapse></app-card-actions-collapse>\n    <h5 class=\"card-title m-b-0\">รายละเอียดคดี</h5>\n  </div>\n  <div class=\"card-body\">\n    <div class=\"form-body\">\n      <div class=\"row\">\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label text-left col-md-4\">เลขที่ใบงาน : </label>\n            <div class=\"col-md-8\">\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.arrestCode\" name=\"arrestCode\" disabled>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label text-right col-md-4\">วันที่จับกุม : </label>\n            <div class=\"form-group input-group col-md-8\">\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.lawsuitDate\" name=\"lawsuitDate\" disabled>\n              <label class=\"col-form-label text-right col-md-2\">เวลา</label>\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.lawsuitTime\" name=\"lawsuitTime\" disabled>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label text-left col-md-4\">ผู้กล่าวหา : </label>\n            <div class=\"col-md-8\">\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"fullName\" name=\"\" disabled>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label text-right col-md-4\">ตำแหน่ง : </label>\n            <div class=\"col-md-8\">\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.positionlawName\" name=\"positionlawName\" disabled>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label text-left col-md-4\">หน่วยงาน : </label>\n            <div class=\"col-md-8\">\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.departmentlawName\" name=\"departmentlawName\" disabled>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label text-right col-md-4\">สถานที่จับกุม : </label>\n            <div class=\"col-md-8\">\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.locationlawName\" name=\"locationlawName\" disabled>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label text-left col-md-4\">เลขที่คดีรับคำกล่าวโทษ : </label>\n            <div class=\"col-md-8\">\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.lawsuitNo\" name=\"lawsuitNo\" disabled>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label text-right col-md-4\">วันที่รับคดี : </label>\n            <div class=\"form-group input-group col-md-8\">\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.lawsuitDate\" name=\"lawsuitDate\" disabled>\n              <label class=\"col-form-label text-right col-md-2\">เวลา</label>\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.lawsuitTime\" name=\"lawsuitTime\" disabled>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label text-left col-md-4\">ฐานความผิดมาตรา : </label>\n            <div class=\"col-md-8\">\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.faultNo\" name=\"faultNo\" disabled>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label text-right col-md-4\">ฐานความผิด : </label>\n            <div class=\"col-md-8\">\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.faultSubject\" name=\"faultSubject\" disabled>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label text-left col-md-4\">บทกำหนดโทษ : </label>\n            <div class=\"col-md-8\">\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.faultNo\" name=\"faultNo\" disabled>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label text-right col-md-4\">อัตราโทษ : </label>\n            <div class=\"col-md-8\">\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.penalty\" name=\"penalty\" disabled>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label text-left col-md-4\">เลขที่คดีเปรียบเทียบ : </label>\n            <div class=\"col-md-8\">\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.lawsuitNo\" name=\"lawsuitNo\" disabled>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label text-right col-md-4\">วันที่เปรียบเทียบ : </label>\n            <div class=\"form-group input-group col-md-8\">\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.lawsuitDate\" name=\"lawsuitDate\" disabled>\n              <label class=\"col-form-label text-right col-md-2\">เวลา</label>\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.lawsuitTime\" name=\"lawsuitTime\" disabled>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label text-left col-md-4\">ผู้เปรียบเทียบ : </label>\n            <div class=\"col-md-8\">\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"fullName\" name=\"\" disabled>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label text-right col-md-4\">ตำแหน่ง : </label>\n            <div class=\"col-md-8\">\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.positionlawName\" name=\"positionlawName\" disabled>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label text-left col-md-4\">หน่วยงาน : </label>\n            <div class=\"col-md-8\">\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.departmentlawName\" name=\"departmentlawName\" disabled>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"card card-outline-bluish unset-radius\">\n  <div class=\"card-header unset-radius\">\n    <app-card-actions-collapse></app-card-actions-collapse>\n    <h5 class=\"card-title m-b-0\">รายละเอียดการปรับเพิ่มหรือปรับลด</h5>\n  </div>\n  <div class=\"card-body\">\n    <div class=\"form-group row\">\n      <label class=\"col-form-label text-left col-md-2\">เหตุผลในการปรับ : </label>\n      <div class=\"col-md-10\">\n        <textarea class=\"form-control\" type=\"text\" rows=\"5\" [(ngModel)]=\"detailData.positionLawName\" name=\"positionLawName\" [disabled]=\"showField\"></textarea>\n      </div>\n    </div>\n    <div class=\"table-responsive table-striped no-wrap\">\n      <table class=\"table\" *ngIf=\"!errorShow\">\n        <thead>\n          <tr>\n            <th class=\"footable-sortable\">ชื่อผู้ต้องหา</th>\n            <th class=\"footable-sortable\">ของกลาง</th>\n            <th class=\"footable-sortable\">ค่าปรับเดิม</th>\n            <th class=\"footable-sortable\">ค่าปรับใหม่</th>\n            <th class=\"footable-sortable\">ผลต่าง</th>\n            <th class=\"footable-sortable\">สถานะ</th>\n            <th class=\"footable-sortable\">สินบน</th>\n            <th class=\"footable-sortable\">รางวัล</th>\n            <th class=\"footable-sortable\">ส่งคลัง</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr class=\"footable\" *ngFor=\"let item of reductionDataTable; let i = index;\">\n            <td>{{item.fullName}}</td>\n            <td>{{item.exhibit}}</td>\n            <td>{{item.oldFine}}</td>\n            <td>\n              <input type=\"text\" [(ngModel)]=\"item.newFine\" name=\"newFine\" class=\"form-control\" [disabled]=\"showField\">\n            </td>\n            <td>{{item.diffFine}}</td>\n            <td class=\"status-increase\" *ngIf=\"item.status\">ปรับเพิ่ม</td>\n            <td class=\"status-decrease\" *ngIf=\"!item.status\">ปรับลด</td>\n            <td>{{item.bribe}}</td>\n            <td>{{item.prize}}</td>\n            <td>{{item.treasury}}</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</div>\n\n<div class=\"card card-outline-bluish unset-radius\">\n  <div class=\"card-header unset-radius\">\n    <app-card-actions-collapse></app-card-actions-collapse>\n    <h5 class=\"card-title m-b-0\">การชำระค่าปรับ</h5>\n  </div>\n  <div class=\"card-body\">\n    <div class=\"table-responsive table-striped no-wrap\">\n      <table class=\"table\" *ngIf=\"!errorShow\">\n        <thead>\n          <tr>\n            <th class=\"footable-sortable text-center\">ลำดับ</th>\n            <th class=\"footable-sortable\">ชื่อผู้ต้องหา</th>\n            <th class=\"footable-sortable\">วันที่ชำระค่าปรับ</th>\n            <th class=\"footable-sortable\">ผู้รับชำระค่าปรับ</th>\n            <th class=\"footable-sortable\">ช่องทางชำระ</th>\n            <th class=\"footable-sortable\">ใบเสร็จเล่มที่</th>\n            <th class=\"footable-sortable\">ใบเสร็จเลขที่/เลขอ้างอิง</th>\n            <th class=\"footable-sortable\">สถานะคดี</th>\n            <th class=\"footable-sortable\"></th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr class=\"footable\" *ngFor=\"let item of payFineDataTable; let i = index;\">\n            <td class=\"text-center\">{{i+1}}</td>\n            <td>{{item.fullName}}</td>\n            <td>{{item.dateFine}}</td>\n            <td>{{item.finer}}</td>\n            <td>{{item.payment}}</td>\n            <td>{{item.receiptNo}}</td>\n            <td>{{item.receiptRef}}</td>\n            <td>{{item.status}}</td>\n            <td>\n              <a href=\"javaScript:void(0);\" class=\"text-secondary\" (click)=\"viewData()\" data-toggle=\"modal\" data-target=\"#finePopup\">\n                <i class=\"mdi mdi-eye fa-lg\"></i>\n              </a>\n              <a href=\"javaScript:void(0);\" class=\"text-secondary m-l-10\" (click)=\"editData()\" [hidden]=\"showField\" data-toggle=\"modal\" data-target=\"#finePopup\">\n                <i class=\"ti-pencil-alt btn-action\"></i>\n              </a>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal fade\" id=\"finePopup\" tabindex=\"-1\" role=\"dialog\">\n  <div class=\"modal-dialog modal-lg\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header top-navbar text-white\">\n        ชำระค่าปรับ\n        <div class=\"card-actions\">\n          <a data-toggle=\"modal\" data-target=\"#finePopup\">\n            <i class=\"ti-close\"></i>\n          </a>\n        </div>\n      </div>\n      <div class=\"modal-body\">\n        <div class=\"text-right\"> ILG60-09-03-01-00 </div>\n        <div class=\"form-body m-t-15\">\n          <div class=\"row\">\n            <div class=\"col-md-6\">\n              <div class=\"form-group row\">\n                <label class=\"col-form-label text-left col-md-4\">ชื่อผู้ต้องหา : </label>\n                <div class=\"col-md-8\">\n                  <input class=\"form-control\" type=\"text\" [(ngModel)]=\"fullName\" name=\"fullName\" disabled>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-md-6\">\n              <div class=\"form-group row\">\n                <label class=\"col-form-label text-left col-md-5\">ยอดชำระค่าปรับ : </label>\n                <div class=\"col-md-7\">\n                  <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.arrestCode\" name=\"\" disabled>\n                </div>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"row\">\n            <div class=\"col-md-6\">\n              <div class=\"form-group row\">\n                <label class=\"col-form-label text-left col-md-4\">วันที่ชำระค่าปรับ : </label>\n                <div class=\"form-group input-group col-md-8\">\n                  <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.lawsuitDate\" name=\"\" [disabled]=\"viewMode\">\n                  <label class=\"col-form-label text-center col-md-3\"> เวลา </label>\n                  <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.lawsuitTime\" name=\"\" [disabled]=\"viewMode\">\n                </div>\n              </div>\n            </div>\n            <div class=\"col-md-6\">\n              <div class=\"form-group row\">\n                <label class=\"col-form-label text-left col-md-5\">เขียนที่ : </label>\n                <div class=\"col-md-7\">\n                  <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.arrestCode\" name=\"\" [disabled]=\"viewMode\">\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"row\">\n          <div class=\"col-md-6\">\n            <div class=\"form-group row\">\n              <label class=\"col-form-label text-left col-md-4\">ผู้รับชำระค่าปรับ : </label>\n              <div class=\"col-md-8\">\n                <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.arrestCode\" name=\"\" [disabled]=\"viewMode\">\n              </div>\n            </div>\n          </div>\n          <div class=\"col-md-6\">\n            <div class=\"form-group row\">\n              <label class=\"col-form-label text-left col-md-5\">ตำแหน่ง : </label>\n              <div class=\"col-md-7\">\n                <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.arrestCode\" name=\"\" [disabled]=\"viewMode\">\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"row\">\n          <div class=\"col-md-6\">\n            <div class=\"form-group row\">\n              <label class=\"col-form-label text-left col-md-4\">หน่วยงาน : </label>\n              <div class=\"col-md-8\">\n                <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.arrestCode\" name=\"\" [disabled]=\"viewMode\">\n              </div>\n            </div>\n          </div>\n          <div class=\"col-md-6\">\n            <div class=\"form-group row\">\n              <label class=\"col-form-label text-left col-md-5\">ช่องทางชำระค่าปรับ : </label>\n              <div class=\"col-md-7\">\n                <select class=\"custom-select col-12\" [disabled]=\"viewMode\">\n                  <option selected=\"\">เงินสด</option>\n                  <option value=\"1\">1</option>\n                  <option value=\"2\">2</option>\n                  <option value=\"3\">3</option>\n                </select>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"row\">\n          <div class=\"col-md-6\">\n            <div class=\"form-group row\">\n              <label class=\"col-form-label text-left col-md-4\">ใบเสร็จเล่มที่ : </label>\n              <div class=\"col-md-8\">\n                <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.arrestCode\" name=\"\" [disabled]=\"viewMode\">\n              </div>\n            </div>\n          </div>\n          <div class=\"col-md-6\">\n            <div class=\"form-group row\">\n              <label class=\"col-form-label text-left col-md-5\">ใบเสร็จเลขที่ : </label>\n              <div class=\"col-md-7\">\n                <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.arrestCode\" name=\"\" [disabled]=\"viewMode\">\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"row\">\n          <div class=\"col-md-6\">\n            <div class=\"form-group row\">\n              <label class=\"col-form-label text-left col-md-4\">หมายเลขอ้างอิง : </label>\n              <div class=\"col-md-8\">\n                <input class=\"form-control\" type=\"text\" [(ngModel)]=\"detailData.arrestCode\" name=\"\" [disabled]=\"viewMode\">\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"submit\" class=\"btn waves-effect waves-light btn-orange m-r-10\" data-toggle=\"modal\" data-target=\"#finePopup\">ยกเลิกใบเสร็จ</button>\n        <button type=\"submit\" class=\"btn waves-effect waves-light btn-navy\" data-toggle=\"modal\" data-target=\"#finePopup\">บันทึก</button>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"card card-outline-bluish unset-radius\">\n  <div class=\"card-header unset-radius\">\n    <app-card-actions-collapse></app-card-actions-collapse>\n    <h5 class=\"card-title m-b-0\">รายงานขออนุมัติการเปรียบเทียบคดีและแบบอนุมัติ</h5>\n  </div>\n  <div class=\"card-body\">\n    <div class=\"table-responsive table-striped no-wrap\">\n      <table class=\"table\" *ngIf=\"!errorShow\">\n        <thead>\n          <tr>\n            <th class=\"footable-sortable text-center\">ลำดับ</th>\n            <th class=\"footable-sortable col-3\">ชื่อผู้ต้องหา</th>\n            <th class=\"footable-sortable\">วันที่จัดทำรายงานฯ</th>\n            <th class=\"footable-sortable col-6\">แบบอนุมัติ</th>\n            <th class=\"footable-sortable\"></th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr class=\"footable\" *ngFor=\"let item of approveDataTable; let i = index;\">\n            <td class=\"text-center\">{{i+1}}</td>\n            <td>{{item.fullName}}</td>\n            <td>{{item.dateReport}}</td>\n            <td>{{item.typeApprove}}</td>\n            <td>\n              <a href=\"javaScript:void(0);\" class=\"text-secondary\" (click)=\"viewData()\" data-toggle=\"modal\" data-target=\"#approvePopup\">\n                <i class=\"mdi mdi-eye fa-lg\"></i>\n              </a>\n              <a href=\"javaScript:void(0);\" class=\"text-secondary m-l-10\" (click)=\"editData()\" [hidden]=\"showField\" data-toggle=\"modal\" data-target=\"#approvePopup\">\n                <i class=\"ti-pencil-alt btn-action\"></i>\n              </a>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal fade\" id=\"approvePopup\" tabindex=\"-1\" role=\"dialog\">\n  <div class=\"modal-dialog modal-lg\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header top-navbar text-white\">\n        รายงานขออนุมัติการเปรียบเทียบคดีและแบบอนุมัติ\n        <div class=\"card-actions\">\n          <a data-toggle=\"modal\" data-target=\"#approvePopup\">\n            <i class=\"ti-close\"></i>\n          </a>\n        </div>\n      </div>\n      <div class=\"modal-body\">\n        <div class=\"text-right\"> ILG60-09-03-02-00 </div>\n        <div class=\"form-body m-t-10\">\n\n          <div class=\"row\">\n            <div class=\"col-md-6\">\n              <div class=\"form-group row\">\n                <label class=\"col-form-label col-md-4\">ชื่อผู้ต้องหา : </label>\n                <div class=\"input-group col-md-8\">\n                  <input class=\"form-control\" type=\"text\" name=\"fullName\" disabled>\n                </div>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"row\">\n            <div class=\"col-md-6\">\n              <div class=\"form-group row\">\n                <label class=\"col-form-label col-md-4\">วันที่ชำระค่าปรับ : </label>\n                <div class=\"col-md-3\">\n                  <input class=\"form-control\" type=\"text\" name=\"payDate\" disabled>\n                </div>\n                <label class=\"col-form-label text-center col-md-2\">เวลา</label>\n                <div class=\"col-md-3\">\n                  <input class=\"form-control\" type=\"text\" name=\"payTime\" disabled>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-md-6\">\n              <div class=\"form-group row\">\n                <label class=\"col-form-label col-md-4\">ค่าปรับคดีรวม : </label>\n                <div class=\"col-md-8\">\n                  <input class=\"form-control\" type=\"text\" name=\"payAmount\" disabled>\n                </div>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"row\">\n            <div class=\"col-md-6\">\n              <div class=\"form-group row\">\n                <label class=\"col-form-label col-md-4\">เขียนที่ : </label>\n                <div class=\"input-group col-md-8\">\n                  <input class=\"form-control\" type=\"text\" name=\"fullName\" [disabled]=\"viewMode\">\n                </div>\n              </div>\n            </div>\n            <div class=\"col-md-6\">\n              <div class=\"form-group row\">\n                <label class=\"col-form-label col-md-4\">วันที่จัดทำรายงานฯ : </label>\n                <div class=\"col-md-8\">\n                  <input class=\"form-control\" type=\"text\" [disabled]=\"viewMode\">\n                </div>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"row\">\n            <div class=\"col-md-12\">\n              <div class=\"form-group row\">\n                <label class=\"col-form-label col-md-2\">แบบอนุมัติ : </label>\n                <div class=\"custom-control custom-radio col-form-label col-md-8\">\n                  <input name=\"approveRadio\" id=\"typeOne\" class=\"col-form-label with-gap radio-col-indigo\" type=\"radio\">\n                  <label for=\"typeOne\" class=\"col-4\">แบบอนุมัติ 1</label>\n                  <input name=\"approveRadio\" id=\"typeTwo\" class=\"col-form-label with-gap radio-col-indigo\" type=\"radio\">\n                  <label for=\"typeTwo\" class=\"col-4\">แบบอนุมัติ 2</label>\n                  <input name=\"approveRadio\" id=\"typeThree\" class=\"col-form-label with-gap radio-col-indigo\" type=\"radio\">\n                  <label for=\"typeThree\" class=\"col-4\">แบบอนุมัติ 3</label>\n                  <input name=\"approveRadio\" id=\"typeFour\" class=\"col-form-label with-gap radio-col-indigo\" type=\"radio\">\n                  <label for=\"typeFour\" class=\"col-4\">แบบอนุมัติ 4</label>\n                </div>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"row\">\n            <div class=\"col-md-6\">\n              <div class=\"form-group row\">\n                <label class=\"col-form-label col-md-4\">ผู้เสนอพิจารณาเห็นชอบ : </label>\n                <div class=\"col-md-8\">\n                  <input class=\"form-control\" type=\"text\" [disabled]=\"viewMode\">\n                </div>\n              </div>\n            </div>\n            <div class=\"col-md-6\">\n              <div class=\"form-group row\">\n                <label class=\"col-form-label col-md-4\">ตำแหน่ง : </label>\n                <div class=\"input-group col-md-8\">\n                  <input class=\"form-control\" type=\"text\" name=\"postion\" disabled>\n                </div>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"row\">\n            <div class=\"col-md-6\">\n              <div class=\"form-group row\">\n                <label class=\"col-form-label col-md-4\">หน่วยงาน : </label>\n                <div class=\"input-group col-md-8\">\n                  <input class=\"form-control\" type=\"text\" name=\"deparment\" disabled>\n                </div>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"row\">\n            <div class=\"col-md-6\">\n              <div class=\"form-group row\">\n                <label class=\"col-form-label col-md-4\">ผู้พิจารณาเห็นชอบ : </label>\n                <div class=\"input-group col-md-8\">\n                  <input class=\"form-control\" type=\"text\" name=\"reviewer\" [disabled]=\"viewMode\">\n                </div>\n              </div>\n            </div>\n\n            <div class=\"col-md-6\">\n              <div class=\"form-group row\">\n                <label class=\"col-form-label col-md-4\">ตำแหน่ง : </label>\n                <div class=\"input-group col-md-8\">\n                  <input class=\"form-control\" type=\"text\" name=\"rank\" disabled>\n                </div>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"row\">\n            <div class=\"col-md-6\">\n              <div class=\"form-group row\">\n                <label class=\"col-form-label col-md-4\">หน่วยงาน : </label>\n                <div class=\"input-group col-md-8\">\n                  <input class=\"form-control\" type=\"text\" name=\"deparment\" disabled>\n                </div>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"row\">\n            <div class=\"col-md-6\">\n              <div class=\"form-group row\">\n                <label class=\"col-form-label col-md-4\">ผู้มีอำนาจอนุมัติ : </label>\n                <div class=\"input-group col-md-8\">\n                  <input class=\"form-control\" type=\"text\" name=\"approver\" [disabled]=\"viewMode\">\n                </div>\n              </div>\n            </div>\n\n            <div class=\"col-md-6\">\n              <div class=\"form-group row\">\n                <label class=\"col-form-label col-md-4\">ตำแหน่ง : </label>\n                <div class=\"input-group col-md-8\">\n                  <input class=\"form-control\" type=\"text\" name=\"rank\" disabled>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-6\">\n              <div class=\"form-group row\">\n                <label class=\"col-form-label col-md-4\">หน่วยงาน : </label>\n                <div class=\"input-group col-md-8\">\n                  <input class=\"form-control\" type=\"text\" name=\"department\" disabled>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-md-6\">\n              <div class=\"form-group row\">\n                <label class=\"col-form-label col-md-4\">คำสั่งกรมฯ ที่ : </label>\n                <div class=\"input-group col-md-8\">\n                  <input class=\"form-control\" type=\"text\" name=\"departOrder\" [disabled]=\"viewMode\">\n                </div>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"row\">\n            <div class=\"col-md-6\">\n              <div class=\"form-group row\">\n                <label class=\"col-form-label col-md-4\">วันที่ออกคำสั่ง : </label>\n                <div class=\"input-group col-md-8\">\n                  <input class=\"form-control\" type=\"text\" name=\"dateOfIssue\" [disabled]=\"viewMode\">\n                </div>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"row\">\n            <div class=\"col-md-12\">\n              <div class=\"form-group row\">\n                <label class=\"col-form-label col-md-4\">ข้อเท็จจริงเกี่ยวกับความผิดโดยละเอียด : </label>\n                <div class=\"col-md-8\">\n                  <textarea class=\"form-control\" [disabled]=\"viewMode\" rows=\"5\"></textarea>\n                </div>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"row\">\n            <div class=\"col-md-12\">\n              <div class=\"form-group row\">\n                <label class=\"col-form-label col-md-4\">เหตุผลที่ควรเปรียบเทียบคดีและ/หรือจัดการของกลาง :</label>\n                <div class=\"col-md-8\">\n                  <textarea class=\"form-control\" [disabled]=\"viewMode\" rows=\"5\"></textarea>\n                </div>\n              </div>\n            </div>\n          </div>\n\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"submit\" class=\"btn waves-effect waves-light btn-navy\" data-toggle=\"modal\" data-target=\"approvePopup\">บันทึก</button>\n      </div>\n    </div>\n  </div>\n</div>\n\n\n<div class=\"card card-outline-bluish unset-radius\">\n  <div class=\"card-header unset-radius\">\n    <app-card-actions-collapse></app-card-actions-collapse>\n    <h5 class=\"card-title m-b-0\">เอกสารแนบภายใน</h5>\n  </div>\n  <div class=\"card-body\">\n    <div class=\"text-right\">\n      <input type=\"file\" id=\"btn-browse\" [disabled]=\"showField\" (change)=\"attachFile(file.files)\" #file>\n      <label for=\"btn-browse\" class=\"btn waves-effect waves-light btn-navy\"> เพิ่มเอกสารแนบ </label>\n    </div>\n    <div class=\"table-responsive table-striped no-wrap\">\n      <table class=\"table\">\n        <thead>\n          <tr>\n            <th class=\"footable-sortable text-center col-1\">ลำดับ</th>\n            <th class=\"footable-sortable\">ชื่อเอกสารแนบ</th>\n            <th class=\"footable-sortable\">ที่อยู่เอกสารแนบ</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr class=\"footable\" *ngFor=\"let item of fileItem; let i = index;\">\n            <td class=\"text-center\">{{i+1}}</td>\n            <td>\n              <input class=\"form-control\" type=\"text\" nmae=\"fileName\" [(ngModel)]=\"item.fileName\" [disabled]=\"showField\">\n            </td>\n            <td>\n              <input class=\"form-control\" type=\"text\" name=\"filePath\" [(ngModel)]=\"item.filePath\" [disabled]=\"showField\">\n            </td>\n            <td>\n              <a href=\"javaScript:void(0);\" class=\"text-secondary\" [hidden]=\"showField\">\n                <i class=\"ti-trash btn-action\"></i>\n              </a>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/pages/reduction/manage-detail/manage-detail.component.scss":
/***/ (function(module, exports) {

module.exports = ".btn-search {\n  background: #005c97;\n  font-size: 16px;\n  width: 120px;\n  height: 40px; }\n\n.btn-navy {\n  background: #005e8d;\n  color: white; }\n\n.btn-orange {\n  background: #e07023;\n  color: white; }\n\n#btn-browse {\n  opacity: 0; }\n\n.btn-action {\n  color: red;\n  font-size: 20px; }\n\n.status-increase {\n  font-size: 20px;\n  color: green; }\n\n.status-decrease {\n  font-size: 20px;\n  color: red; }\n\n.top-navbar {\n  background: linear-gradient(45deg, #005e8d, #353993); }\n"

/***/ }),

/***/ "./src/app/pages/reduction/manage-detail/manage-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_header_navigation_navigation_service__ = __webpack_require__("./src/app/shared/header-navigation/navigation.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ManageDetailComponent = /** @class */ (function () {
    function ManageDetailComponent(router, activeRoute, navService) {
        this.router = router;
        this.activeRoute = activeRoute;
        this.navService = navService;
        this.approveDataTable = [{
                fullName: "นายธวัชชัย บิงขุนทด",
                dateReport: "10-ม.ค.-2560",
                typeApprove: "แบบอนุมัติ 4"
            }, {
                fullName: "นายสุชาติ ปัญโญใหญ่",
                dateReport: "",
                typeApprove: ""
            }];
        this.payFineDataTable = [{
                fullName: "นายธวัชชัย บิงขุนทด",
                dateFine: "20-ม.ค.-2560",
                finer: "นางสาวฟาติมา ตันดิลกตระกูล",
                payment: "เงินสด",
                receiptNo: "33",
                receiptRef: "003/2561",
                status: "ยังไม่นำส่งรายได้",
            }, {
                fullName: "นายสุชาติ ปัญโญใหญ่",
                dateFine: "",
                finer: "",
                payment: "",
                receiptNo: "",
                receiptRef: "",
                status: "ยังไม่ชำระค่าปรับ",
            }];
        this.reductionDataTable = [
            {
                fullName: "นายธวัชชัย บิงขุนทด",
                exhibit: "Hoegaarden/Witb",
                oldFine: "800,000.00",
                newFine: "900,000.00",
                diffFine: "100,000.00",
                status: true,
                bribe: "160,000.00",
                prize: "160,000.00",
                treasury: "480,000.00"
            }, {
                fullName: "นายสุชาติ ปัญโญใหญ่",
                exhibit: "Hoegaarden/Witb",
                oldFine: "800,000.00",
                newFine: "700,000.00",
                diffFine: "-100,000.00",
                status: false,
                bribe: "160,000.00",
                prize: "160,000.00",
                treasury: "480,000.00"
            }
        ];
        this.listData = [
            {
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
            }, {
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
            }, {
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
            }, {
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
            }, {
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
            }
        ];
        this.fileItem = [{
                fileName: "",
                filePath: "",
            }];
        this.viewMode = true;
    }
    ManageDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        //set show button
        this.navServiceSub = this.navService.showFieldEdit.subscribe(function (status) {
            _this.showField = status;
            if (!_this.showField) {
                _this.navService.setSaveButton(true);
                _this.navService.setCancelButton(true);
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
        this.getDataFromListPage = this.activeRoute.params
            .subscribe(function (params) {
            //check id from manage view page
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
    ManageDetailComponent.prototype.viewData = function () {
        this.viewMode = true;
    };
    ManageDetailComponent.prototype.editData = function () {
        this.viewMode = false;
    };
    ManageDetailComponent.prototype.attachFile = function (file) {
        this.fileItem.push({
            fileName: file[0].name,
            filePath: ""
        });
    };
    ManageDetailComponent.prototype.ngOnDestroy = function () {
        this.getDataFromListPage.unsubscribe();
        this.navServiceSub.unsubscribe();
    };
    ManageDetailComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-manage-detail',
            template: __webpack_require__("./src/app/pages/reduction/manage-detail/manage-detail.component.html"),
            styles: [__webpack_require__("./src/app/pages/reduction/manage-detail/manage-detail.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_2__shared_header_navigation_navigation_service__["a" /* NavigationService */]])
    ], ManageDetailComponent);
    return ManageDetailComponent;
}());



/***/ }),

/***/ "./src/app/pages/reduction/manage-detail/manage-detail.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageDetailModule", function() { return ManageDetailModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__component_card_actions_card_actions_module__ = __webpack_require__("./src/app/pages/component/card-actions/card-actions.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__manage_detail_component__ = __webpack_require__("./src/app/pages/reduction/manage-detail/manage-detail.component.ts");
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
                { title: 'ค้นหารายการปรับเพิ่ม-ปรับลด', url: '/reduction/list' },
                { title: 'จัดการข้อมูลรายการปรับเพิ่ม-ปรับลด', url: 'reduction/manage/' },
                { title: 'จัดการข้อมูลรายละเอียดการปรับเพิ่ม-ปรับลด' }
            ],
            pageType: 'manage',
            codePage: 'ILG60-09-03-00-00',
        },
        component: __WEBPACK_IMPORTED_MODULE_5__manage_detail_component__["a" /* ManageDetailComponent */]
    }
];
var ManageDetailModule = /** @class */ (function () {
    function ManageDetailModule() {
    }
    ManageDetailModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_0__component_card_actions_card_actions_module__["a" /* CardActionsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* RouterModule */].forChild(routes)
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__manage_detail_component__["a" /* ManageDetailComponent */]
            ]
        })
    ], ManageDetailModule);
    return ManageDetailModule;
}());



/***/ })

});
//# sourceMappingURL=manage-detail.module.chunk.js.map
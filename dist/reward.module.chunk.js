webpackJsonp(["reward.module"],{

/***/ "./src/app/pages/reward/reward/reward.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wizard-content\">\r\n  <div class=\"wizard-circle wizard clearfix clearfix\">\r\n    <div class=\"steps tab-wizard\">\r\n      <ul role=\"tablist\">\r\n        <li role=\"tab\" class=\"current\" aria-disabled=\"false\" aria-selected=\"true\">\r\n          <a>\r\n            <span class=\"current-info audible\">current step: </span>\r\n            <span class=\"step\"></span> 1. ใบแจ้งความนำจับ</a>\r\n        </li>\r\n        <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n          <a>\r\n            <span class=\"step\"></span> 2. งานจับกุม </a>\r\n        </li>\r\n        <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n          <a>\r\n            <span class=\"step\"></span> 3. รับคำกล่าวโทษ </a>\r\n        </li>\r\n        <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n          <a>\r\n            <span class=\"step\"></span> 4. งานตรวจรับและพิสูจน์ของกลาง </a>\r\n        </li>\r\n        <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n          <a>\r\n            <span class=\"step\"></span> 5. งานเปรียบเทียบและชำระค่าปรับ </a>\r\n        </li>\r\n        <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n          <a>\r\n            <span class=\"step\"></span> 6. นำส่งเงินรายได้ </a>\r\n        </li>\r\n        <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n          <a>\r\n            <span class=\"step\"></span> 7. คำร้องขอรับเงินสินบนรางวัล </a>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"card \">\r\n  <div class=\"card-header  unset-radius\">\r\n    <app-card-actions-collapse></app-card-actions-collapse>\r\n    <h4 class=\"card-title m-b-0\">รายละเอียดคดี</h4>\r\n  </div>\r\n  <div class=\"card-body\">\r\n    <div class=\"form-body\">\r\n      <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4\">เลขที่ใบงาน : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4\">วันที่จับกุม : </label>\r\n            <div class=\"col-md-3\">\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </div>\r\n            <label class=\"col-form-label text-center col-md-2\">เวลา</label>\r\n            <div class=\"col-md-3\">\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4\">ผู้กล่าวหา : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" name=\"allegationNo\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4\">ตำแหน่ง : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" name=\"allegationNo\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4\">หน่วยงาน : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4\">สถานที่จับกุม : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" name=\"allegationSubject\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4 padding-adv-label\">เลขที่คดีรับคำกล่าวโทษ : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4\">วันที่รับคดี : </label>\r\n            <div class=\"col-md-3\">\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </div>\r\n            <label class=\"col-form-label text-center col-md-2\">เวลา</label>\r\n            <div class=\"col-md-3\">\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4 padding-adv-label\">ฐานความผิดมาตรา : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4\">ฐานความผิด : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" name=\"allegationSubject\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4\">บทกำหนดโทษ : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4\">อัตราโทษ : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" name=\"allegationSubject\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<!-- ส่งฟ้องศาล ซ่อน -->\r\n<div class=\"card\" [hidden]=\"!court\">\r\n  <div class=\"card-header  unset-radius\">\r\n    <app-card-actions-collapse></app-card-actions-collapse>\r\n    <h4 class=\"card-title m-b-0\">รายละเอียดคำพิพากษาของศาล</h4>\r\n  </div>\r\n  <div class=\"card-body\">\r\n    <div class=\"table-responsive\">\r\n      <table class=\"dataTable table table-sm table-striped table-hover\">\r\n        <thead>\r\n          <tr>\r\n            <th class=\"footable-sortable text-center\">ลำดับ</th>\r\n            <th class=\"footable-sortable\">ชื่อผู้ต้องหา</th>\r\n            <th class=\"footable-sortable\">ชื่อศาล</th>\r\n            <th class=\"footable-sortable\">เลขคดีดำ</th>\r\n            <th class=\"footable-sortable\">เลขคดีแดง</th>\r\n            <th class=\"footable-sortable\">คำพิพากษาฎีกาที่</th>\r\n            <th class=\"footable-sortable\">วันที่อ่านคำพิพากษา</th>\r\n            <th class=\"footable-sortable\">ค่าปรับ</th>\r\n            <th class=\"footable-sortable\">จำนวนงวด</th>\r\n            <th class=\"footable-sortable\">วันที่ชำระ</th>\r\n            <th class=\"footable-sortable\">รอบชำระทุก</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr class=\"footable\">\r\n            <td class=\"text-center\">1</td>\r\n            <td class=\"\">นายธวัชชัย บิงขุนทด</td>\r\n            <td>มีนบุรี</td>\r\n            <td>มย.222/2561</td>\r\n            <td>มย.222/2561</td>\r\n            <td>1267/2561</td>\r\n            <td>10-ม.ค.-2560</td>\r\n            <td>2,000,000.00</td>\r\n            <td class=\"text-center\">2</td>\r\n            <td>10-ม.ค.-2560</td>\r\n            <td>1 เดือน</td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"card \">\r\n  <div class=\"card-header  unset-radius\">\r\n    <app-card-actions-collapse></app-card-actions-collapse>\r\n    <h4 class=\"card-title m-b-0\">คำร้องขอรับเงินรางวัล กรณีคดีถึงที่สุดโดยการเปรียบเทียบคดี</h4>\r\n  </div>\r\n  <div class=\"card-body\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-6\">\r\n        <div class=\"form-group row\">\r\n          <label class=\"col-form-label col-md-4\">เลขที่คำร้องขอ : </label>\r\n          <div class=\"col-md-8\">\r\n            <input class=\"form-control\" type=\"text\" disabled>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col-md-6\">\r\n        <div class=\"form-group row\">\r\n          <label class=\"col-form-label col-md-4\">เขียนที่ : </label>\r\n          <div class=\"col-md-8\">\r\n            <input class=\"form-control\" type=\"text\" [disabled]=\"viewMode\">\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-md-6\">\r\n        <div class=\"form-group row\">\r\n          <label class=\"col-form-label col-md-4\">วันที่จัดทำ : </label>\r\n          <div class=\"col-md-3\">\r\n            <input class=\"form-control\" type=\"text\" [disabled]=\"viewMode\">\r\n          </div>\r\n          <label class=\"col-form-label text-center col-md-2\">เวลา</label>\r\n          <div class=\"col-md-3\">\r\n            <input class=\"form-control\" type=\"text\" [disabled]=\"viewMode\">\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"table-responsive\">\r\n      <table class=\"dataTable table table-sm table-striped table-hover\">\r\n        <thead>\r\n          <tr>\r\n            <th class=\"footable-sortable text-center\">ลำดับ</th>\r\n            <th class=\"footable-sortable\">ชื่อผู้ต้องหา</th>\r\n            <th class=\"footable-sortable\">วันที่ชำระ</th>\r\n            <th class=\"footable-sortable\">ใบเสร็จเล่มที่</th>\r\n            <th class=\"footable-sortable\">ใบเสร็จเลขที่</th>\r\n            <th class=\"footable-sortable\">รายละเอียดของกลาง</th>\r\n            <th class=\"footable-sortable\">ค่าปรับ</th>\r\n            <th class=\"footable-sortable\">เงินสินบน</th>\r\n            <th class=\"footable-sortable\">เงินรางวัล</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr class=\"footable\">\r\n            <td class=\"text-center\">1</td>\r\n            <td class=\"\">นายธวัชชัย บิงขุนทด</td>\r\n            <td>10-ม.ค.-2560</td>\r\n            <td class=\"text-center\">33</td>\r\n            <td class=\"\">001/2561</td>\r\n            <td class=\"\">สุรา/สุราแช่/ชนิดเบียร์/Hoegaarden/Wit</td>\r\n            <td class=\"\">800,000.00</td>\r\n            <td>160,000.00</td>\r\n            <td>160,000.00</td>\r\n          </tr>\r\n          <tr>\r\n            <td></td>\r\n            <td></td>\r\n            <td></td>\r\n            <td></td>\r\n            <td></td>\r\n            <td class=\"text-right\">รวม :</td>\r\n            <td>2,800,000.00</td>\r\n            <td>480,000.00</td>\r\n            <td>480,000.00</td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<!-- แปะ -->\r\n<div class=\"card \">\r\n  <div class=\"card-header  unset-radius\">\r\n    <app-card-actions-collapse></app-card-actions-collapse>\r\n    <h4 class=\"card-title m-b-0\">ตารางการแบ่งจ่ายเงินสินบนรางวัล</h4>\r\n  </div>\r\n  <div class=\"card-body\">\r\n    <div class=\"text-right\">\r\n      <!-- addSupport ส่ง id -->\r\n      <input type=\"button\" id=\"btn-browse\" [disabled]=\"viewMode\">\r\n      <label for=\"btn-browse\" [ngClass]=\"{disabled : viewMode}\" class=\"btn waves-effect waves-light btn-navy\">เพิ่มจนท.สนับสนุน</label>\r\n    </div>\r\n    <div class=\"table-responsive\">\r\n      <table class=\"dataTable table table-sm table-striped table-hover\">\r\n        <thead>\r\n          <tr>\r\n            <th class=\"footable-sortable\" colspan=\"1\"></th>\r\n            <th class=\"footable-sortable\" colspan=\"1\">ลำดับ</th>\r\n            <th class=\"footable-sortable\" colspan=\"1\">ยศ</th>\r\n            <th class=\"footable-sortable\" colspan=\"1\">ชื่อ-สกุล</th>\r\n            <th class=\"footable-sortable\" colspan=\"1\">ตำแหน่ง</th>\r\n            <th class=\"footable-sortable\" colspan=\"1\">ระดับ</th>\r\n            <th class=\"footable-sortable\" colspan=\"1\">ได้ในฐานะ</th>\r\n            <th class=\"footable-sortable text-center\" colspan=\"2\">จำนวนสัดส่วน</th>\r\n            <th class=\"footable-sortable text-center\" colspan=\"2\">จำนวนเงิน</th>\r\n            <th class=\"footable-sortable\" colspan=\"1\">รวมทั้งสิ้น</th>\r\n            <th class=\"footable-sortable\" colspan=\"1\"></th>\r\n          </tr>\r\n          <tr>\r\n            <th></th>\r\n            <th></th>\r\n            <th></th>\r\n            <th></th>\r\n            <th></th>\r\n            <th></th>\r\n            <th></th>\r\n            <th>ส่วนแรก</th>\r\n            <th>ส่วนหลัง</th>\r\n            <th>ส่วนแรก</th>\r\n            <th>ส่วนหลัง</th>\r\n            <th></th>\r\n            <th></th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr class=\"footable\">\r\n            <td>\r\n              <input type=\"checkbox\" class=\"filled-in chk-col-indigo\" id=\"1\">\r\n              <label for=\"1\"></label>\r\n            </td>\r\n            <td class=\"text-center\">1</td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </td>\r\n            <td></td>\r\n          </tr>\r\n          <tr class=\"footable\">\r\n            <td>\r\n              <input type=\"checkbox\" class=\"filled-in chk-col-indigo\" id=\"2\">\r\n              <label for=\"2\"></label>\r\n            </td>\r\n            <td class=\"text-center\">2</td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </td>\r\n            <td>\r\n              <i class=\"ti-trash btn-action\" [hidden]=\"modeCreate\"></i>\r\n            </td>\r\n          </tr>\r\n          <tr [hidden]=\"!modeCreate\">\r\n            <td>\r\n              <input type=\"checkbox\" class=\"filled-in chk-col-indigo\" id=\"crt\">\r\n              <label for=\"crt\"></label>\r\n            </td>\r\n            <td class=\"text-center\">$index+1</td>\r\n            <td>\r\n              <select class=\"form-control\"></select>\r\n            </td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\">\r\n            </td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\">\r\n            </td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\">\r\n            </td>\r\n            <td>\r\n              <select class=\"form-control\"></select>\r\n            </td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </td>\r\n            <td>\r\n              <select class=\"form-control\"></select>\r\n            </td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </td>\r\n            <td>\r\n              <i class=\"ti-trash btn-action\"></i>\r\n            </td>\r\n          </tr>\r\n          <tr class=\"footable\" id=\"add\">\r\n\r\n          </tr>\r\n          <tr class=\"footable\">\r\n            <td></td>\r\n            <td></td>\r\n            <td></td>\r\n            <td></td>\r\n            <td></td>\r\n            <td></td>\r\n            <td class=\"text-right\">รวมทั้งสิ้น:</td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" disabled>\r\n            </td>\r\n            <td></td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col-md-6\">\r\n        <div class=\"form-group row\">\r\n          <label class=\"col-form-label col-md-5 padding-adv-label\">รวมเงินสินบนและรางวัล : </label>\r\n          <div class=\"col-md-7\">\r\n            <input class=\"form-control\" type=\"text\" disabled>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col-md-6\">\r\n        <div class=\"form-group row\">\r\n          <label class=\"col-form-label col-md-5 padding-adv-label\">1 ใน 3 ส่วนแรกเป็นเงิน : </label>\r\n          <div class=\"col-md-7\">\r\n            <input class=\"form-control\" type=\"text\" disabled>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-md-6\">\r\n        <div class=\"form-group row\">\r\n          <label class=\"col-form-label col-md-4\">แบ่งเป็นส่วนๆละ : </label>\r\n          <div class=\"col-md-3\">\r\n            <input class=\"form-control\" type=\"text\" disabled>\r\n          </div>\r\n          <label class=\"col-form-label text-center col-md-2 padding-none\">เหลือเศษ</label>\r\n          <div class=\"col-md-3\">\r\n            <input class=\"form-control\" type=\"text\" disabled>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col-md-6\">\r\n        <div class=\"form-group row\">\r\n          <label class=\"col-form-label col-md-5 padding-adv-label\">2 ใน 3 ส่วนแรกเป็นเงิน : </label>\r\n          <div class=\"col-md-7\">\r\n            <input class=\"form-control\" type=\"text\" disabled>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-md-6\">\r\n        <div class=\"form-group row\">\r\n          <label class=\"col-form-label col-md-4\">แบ่งเป็นส่วนๆละ : </label>\r\n          <div class=\"col-md-3\">\r\n            <input class=\"form-control\" type=\"text\" disabled>\r\n          </div>\r\n          <label class=\"col-form-label text-center col-md-2 padding-none\">เหลือเศษ</label>\r\n          <div class=\"col-md-3\">\r\n            <input class=\"form-control\" type=\"text\" disabled>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"card \">\r\n  <div class=\"card-header  unset-radius\">\r\n    <app-card-actions-collapse></app-card-actions-collapse>\r\n    <h4 class=\"card-title m-b-0\">เอกสารแนบภายใน</h4>\r\n  </div>\r\n  <div class=\"card-body\">\r\n    <div class=\"text-right\">\r\n      <input type=\"file\" id=\"btn-browse\" #file>\r\n      <label for=\"btn-browse\" [ngClass]=\"{disabled : viewMode}\" class=\"btn waves-effect waves-light btn-navy\"> เพิ่มเอกสารแนบ </label>\r\n    </div>\r\n    <div class=\"table-responsive\">\r\n      <table class=\"dataTable table table-sm table-striped table-hover\">\r\n        <thead>\r\n          <tr>\r\n            <th class=\"footable-sortable text-center\">ลำดับ</th>\r\n            <th class=\"footable-sortable\">ชื่อเอกสารแนบ</th>\r\n            <th class=\"footable-sortable\">ที่อยู่เอกสารแนบ</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr class=\"footable\">\r\n            <td class=\"text-center\">1</td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" nmae=\"fileName\" [disabled]=\"viewMode\">\r\n            </td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" name=\"filePath\" [disabled]=\"viewMode\">\r\n            </td>\r\n            <td>\r\n              <i class=\"ti-trash btn-action\"></i>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/pages/reward/reward/reward.component.scss":
/***/ (function(module, exports) {

module.exports = ".card-header {\n  background: #ccdeea;\n  border-color: #ccdeea; }\n\n#btn-browse {\n  opacity: 0; }\n\n.btn-navy {\n  background: #005e8d;\n  color: white; }\n\n.btn-action {\n  color: red;\n  font-size: 20px;\n  margin-left: 5px;\n  cursor: pointer; }\n\nth, td {\n  padding: .2rem; }\n\n.padding-adv-label {\n  padding-right: 0px; }\n\n.padding-none {\n  padding: 0; }\n"

/***/ }),

/***/ "./src/app/pages/reward/reward/reward.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RewardComponent; });
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



var RewardComponent = /** @class */ (function () {
    function RewardComponent(router, navService, activeRoute) {
        this.router = router;
        this.navService = navService;
        this.activeRoute = activeRoute;
    }
    RewardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.navService.showFieldEdit.subscribe(function (status) {
            _this.viewMode = status;
            if (!_this.viewMode) {
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
        this.getmode = this.activeRoute.params
            .subscribe(function (params) {
            if (params.mode == 'c') {
                _this.modeCreate = true;
            }
            if (params.caseSelect == "เปรียบเทียบคดี") {
                _this.court = false;
            }
            else if (params.caseSelect == "ส่งฟ้องศาล") {
                _this.court = true;
            }
        });
    };
    RewardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-reward',
            template: __webpack_require__("./src/app/pages/reward/reward/reward.component.html"),
            styles: [__webpack_require__("./src/app/pages/reward/reward/reward.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */], __WEBPACK_IMPORTED_MODULE_2__shared_header_navigation_navigation_service__["a" /* NavigationService */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]])
    ], RewardComponent);
    return RewardComponent;
}());



/***/ }),

/***/ "./src/app/pages/reward/reward/reward.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RewardModule", function() { return RewardModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reward_component__ = __webpack_require__("./src/app/pages/reward/reward/reward.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__component_card_actions_card_actions_module__ = __webpack_require__("./src/app/pages/component/card-actions/card-actions.module.ts");
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
                { title: 'ค้นหาคำร้องขอรับเงินสินบนรางวัล', url: '/reward/list' },
                { title: 'จัดการข้อมูลคำร้องขอรับเงินสินบนรางวัล', url: '/reward/manage' },
                { title: 'จัดการข้อมูลคำร้องขอรับเงินรางวัล' }
            ],
            pageType: 'manage'
            // nextPage: { title: '...', url: '#' }
        },
        component: __WEBPACK_IMPORTED_MODULE_2__reward_component__["a" /* RewardComponent */]
    }
];
var RewardModule = /** @class */ (function () {
    function RewardModule() {
    }
    RewardModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_5__component_card_actions_card_actions_module__["a" /* CardActionsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* RouterModule */].forChild(routes)
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__reward_component__["a" /* RewardComponent */]]
        })
    ], RewardModule);
    return RewardModule;
}());



/***/ })

});
//# sourceMappingURL=reward.module.chunk.js.map
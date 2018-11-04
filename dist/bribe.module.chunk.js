webpackJsonp(["bribe.module"],{

/***/ "./src/app/pages/reward/bribe/bribe.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wizard-content\">\r\n  <div class=\"wizard-circle wizard clearfix clearfix\">\r\n    <div class=\"steps tab-wizard\">\r\n      <ul role=\"tablist\">\r\n        <li role=\"tab\" class=\"current\" aria-disabled=\"false\" aria-selected=\"true\">\r\n          <a>\r\n            <span class=\"current-info audible\">current step: </span>\r\n            <span class=\"step\"></span> 1. ใบแจ้งความนำจับ</a>\r\n        </li>\r\n        <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n          <a>\r\n            <span class=\"step\"></span> 2. งานจับกุม </a>\r\n        </li>\r\n        <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n          <a>\r\n            <span class=\"step\"></span> 3. รับคำกล่าวโทษ </a>\r\n        </li>\r\n        <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n          <a>\r\n            <span class=\"step\"></span> 4. งานตรวจรับและพิสูจน์ของกลาง </a>\r\n        </li>\r\n        <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n          <a>\r\n            <span class=\"step\"></span> 5. งานเปรียบเทียบและชำระค่าปรับ </a>\r\n        </li>\r\n        <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n          <a>\r\n            <span class=\"step\"></span> 6. นำส่งเงินรายได้ </a>\r\n        </li>\r\n        <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\r\n          <a>\r\n            <span class=\"step\"></span> 7. คำร้องขอรับเงินสินบนรางวัล </a>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"card\">\r\n  <div class=\"card-header  unset-radius\">\r\n    <app-card-actions-collapse></app-card-actions-collapse>\r\n    <h4 class=\"card-title m-b-0\">รายละเอียดคดี</h4>\r\n  </div>\r\n  <div class=\"card-body\">\r\n    <div class=\"form-body\">\r\n      <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4\">เลขที่ใบแจ้งความนำจับ : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" name=\"allegationCode\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4\">วันที่แจ้งความนำจับ : </label>\r\n            <div class=\"col-md-3\">\r\n              <input class=\"form-control\" type=\"text\" name=\"lawsuitDate\" disabled>\r\n            </div>\r\n            <label class=\"col-form-label text-center col-md-2\">เวลา</label>\r\n            <div class=\"col-md-3\">\r\n              <input class=\"form-control\" type=\"text\" name=\"lawsuitTime\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4\">ผู้แจ้งความนำจับ : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" name=\"allegationNo\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4\">ผู้รับแจ้งความนำจับ : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" name=\"allegationNo\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4\">ตำแหน่ง : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" name=\"allegationCode\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4\">หน่วยงาน : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" name=\"allegationSubject\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4\">เลขที่ใบงาน : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" name=\"allegationCode\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4\">วันที่จับกุม : </label>\r\n            <div class=\"col-md-3\">\r\n              <input class=\"form-control\" type=\"text\" name=\"lawsuitDate\" disabled>\r\n            </div>\r\n            <label class=\"col-form-label text-center col-md-2\">เวลา</label>\r\n            <div class=\"col-md-3\">\r\n              <input class=\"form-control\" type=\"text\" name=\"lawsuitTime\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4\">ผู้กล่าวหา : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" name=\"allegationCode\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4\">ตำแหน่ง : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" name=\"allegationSubject\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4\">หน่วยงาน : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" name=\"allegationCode\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4\">สถานที่จับกุม : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" name=\"allegationSubject\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4\">เลขที่คดีรับคำกล่าวโทษ : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" name=\"allegationCode\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4\">วันที่รับคดี : </label>\r\n            <div class=\"col-md-3\">\r\n              <input class=\"form-control\" type=\"text\" name=\"lawsuitDate\" disabled>\r\n            </div>\r\n            <label class=\"col-form-label text-center col-md-2\">เวลา</label>\r\n            <div class=\"col-md-3\">\r\n              <input class=\"form-control\" type=\"text\" name=\"lawsuitTime\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4\">ฐานความผิดมาตรา : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" name=\"allegationCode\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4\">ฐานความผิด : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" name=\"allegationSubject\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4\">บทกำหนดโทษ : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" name=\"allegationCode\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4\">อัตราโทษ : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" name=\"allegationSubject\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"card \">\r\n  <div class=\"card-header  unset-radius\">\r\n    <app-card-actions-collapse></app-card-actions-collapse>\r\n    <h4 class=\"card-title m-b-0\">คำร้องขอรับเงินสินบน</h4>\r\n  </div>\r\n  <div class=\"card-body\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-6\">\r\n        <div class=\"form-group row\">\r\n          <label class=\"col-form-label col-md-4\">เลขที่คำร้องขอ : </label>\r\n          <div class=\"col-md-8\">\r\n            <input class=\"form-control\" type=\"text\" name=\"allegationCode\" disabled>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-md-6\">\r\n        <div class=\"form-group row\">\r\n          <label class=\"col-form-label col-md-4\">จำนวนส่วน : </label>\r\n          <div class=\"col-md-8\">\r\n            <input class=\"form-control\" type=\"text\" name=\"allegationCode\" disabled>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col-md-6\">\r\n        <div class=\"form-group row\">\r\n          <label class=\"col-form-label col-md-4\">เขียนที่ : </label>\r\n          <div class=\"col-md-8\">\r\n            <input class=\"form-control\" type=\"text\" name=\"allegationCode\" [disabled]=\"viewMode\">\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-md-6\">\r\n        <div class=\"form-group row\">\r\n          <label class=\"col-form-label col-md-4\">วันที่จัดทำ : </label>\r\n          <div class=\"col-md-3\">\r\n            <input class=\"form-control\" type=\"text\" name=\"lawsuitDate\" [disabled]=\"viewMode\">\r\n          </div>\r\n          <label class=\"col-form-label text-center col-md-2\">เวลา</label>\r\n          <div class=\"col-md-3\">\r\n            <input class=\"form-control\" type=\"text\" name=\"lawsuitTime\" [disabled]=\"viewMode\">\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col-md-12\">\r\n        <div class=\"form-group row\">\r\n          <label class=\"col-form-label col-md-2\">ผู้แจ้งความได้ทราบว่า : </label>\r\n          <div class=\"col-md-10\">\r\n            <textarea class=\"form-control\" rows=\"8\" [disabled]=\"viewMode\"></textarea>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"table-responsive\">\r\n      <table class=\"dataTable table table-sm table-striped table-hover\">\r\n        <thead>\r\n          <tr>\r\n            <th class=\"footable-sortable text-center\">ลำดับ</th>\r\n            <th class=\"footable-sortable\">ชื่อผู้ต้องหา</th>\r\n            <th class=\"footable-sortable\">ลักษณะคดี</th>\r\n            <th class=\"footable-sortable\">วันที่ชำระ</th>\r\n            <th class=\"footable-sortable\">ใบเสร็จเล่มที่</th>\r\n            <th class=\"footable-sortable\">ใบเสร็จเลขที่</th>\r\n            <th class=\"footable-sortable\">เลขที่อ้างอิง</th>\r\n            <th class=\"footable-sortable\">งวดชำระ</th>\r\n            <th class=\"footable-sortable\">เงินสินบน</th>\r\n            <th class=\"footable-sortable\">เงินสินบนสุทธิ</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr class=\"footable\">\r\n            <td class=\"text-center\">1</td>\r\n            <td class=\"\">นายธวัชชัย บิงขุนทด</td>\r\n            <td class=\"\">เปรียบเทียบคดี</td>\r\n            <td>10-ม.ค.-2560</td>\r\n            <td class=\"text-center\">33</td>\r\n            <td class=\"\">001/2561</td>\r\n            <td class=\"\">1/1</td>\r\n            <td>1,000,000.00</td>\r\n            <td>200,000.00</td>\r\n            <td>50,000.00</td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"card \">\r\n  <div class=\"card-header unset-radius\">\r\n    <app-card-actions-collapse></app-card-actions-collapse>\r\n    <h4 class=\"card-title m-b-0\">หนังสือมอบอำนาจ</h4>\r\n  </div>\r\n  <div class=\"card-body\">\r\n    <div class=\"form-body\">\r\n      <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4\">เขียนที่ : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" name=\"allegationCode\" [disabled]=\"viewMode\">\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4\">วันที่จัดทำ : </label>\r\n            <div class=\"col-md-3\">\r\n              <input class=\"form-control\" type=\"text\" name=\"lawsuitDate\" [disabled]=\"viewMode\">\r\n            </div>\r\n            <label class=\"col-form-label text-center col-md-2\">เวลา</label>\r\n            <div class=\"col-md-3\">\r\n              <input class=\"form-control\" type=\"text\" name=\"lawsuitTime\" [disabled]=\"viewMode\">\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4\">ผู้กล่าวหา : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" name=\"allegationCode\" [disabled]=\"viewMode\">\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4\">ตำแหน่ง : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" name=\"allegationCode\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-form-label col-md-4\">หน่วยงาน : </label>\r\n            <div class=\"col-md-8\">\r\n              <input class=\"form-control\" type=\"text\" name=\"allegationCode\" disabled>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"card\">\r\n  <div class=\"card-header card-navy\">\r\n    <strong class=\"text-dark\">\r\n      เอกสารแนบภายใน\r\n    </strong>\r\n    <app-card-actions-collapse></app-card-actions-collapse>\r\n  </div>\r\n  <div class=\"card-body\">\r\n    <div class=\"text-right\">\r\n      <input type=\"file\" id=\"btn-browse\" #file>\r\n      <label for=\"btn-browse\" [ngClass]=\"{disabled : viewMode}\" class=\"btn waves-effect waves-light btn-navy\"> เพิ่มเอกสารแนบ </label>\r\n    </div>\r\n    <div class=\"table-responsive table-striped no-wrap\">\r\n      <table class=\"table\">\r\n        <thead>\r\n          <tr>\r\n            <th class=\"footable-sortable text-center\">ลำดับ</th>\r\n            <th class=\"footable-sortable\">ชื่อเอกสารแนบ</th>\r\n            <th class=\"footable-sortable\">ที่อยู่เอกสารแนบ</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr class=\"footable\">\r\n            <td class=\"text-center\">1</td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" nmae=\"fileName\" [disabled]=\"viewMode\">\r\n            </td>\r\n            <td>\r\n              <input class=\"form-control\" type=\"text\" name=\"filePath\" [disabled]=\"viewMode\">\r\n            </td>\r\n            <td>\r\n              <i class=\"ti-trash btn-action\"></i>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/pages/reward/bribe/bribe.component.scss":
/***/ (function(module, exports) {

module.exports = ".btn-navy {\n  background: #005e8d;\n  color: white; }\n\n.btn-orange {\n  background: #e07023;\n  color: white; }\n\n.top-navbar {\n  background: linear-gradient(45deg, #005e8d, #353993); }\n\n.btn-action {\n  color: red;\n  font-size: 20px;\n  margin-left: 5px;\n  cursor: pointer; }\n\n#btn-browse {\n  opacity: 0; }\n\n.col-form-label {\n  color: black;\n  font-weight: 400; }\n\n.card-header {\n  background: #ccdeea;\n  border-color: #ccdeea; }\n"

/***/ }),

/***/ "./src/app/pages/reward/bribe/bribe.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BribeComponent; });
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



var BribeComponent = /** @class */ (function () {
    function BribeComponent(router, navService) {
        this.router = router;
        this.navService = navService;
    }
    BribeComponent.prototype.ngOnInit = function () {
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
    };
    BribeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-bribe',
            template: __webpack_require__("./src/app/pages/reward/bribe/bribe.component.html"),
            styles: [__webpack_require__("./src/app/pages/reward/bribe/bribe.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */], __WEBPACK_IMPORTED_MODULE_2__shared_header_navigation_navigation_service__["a" /* NavigationService */]])
    ], BribeComponent);
    return BribeComponent;
}());



/***/ }),

/***/ "./src/app/pages/reward/bribe/bribe.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BribeModule", function() { return BribeModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bribe_component__ = __webpack_require__("./src/app/pages/reward/bribe/bribe.component.ts");
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
                { title: 'จัดการข้อมูลคำร้องขอรับเงินสินบน' }
            ],
            pageType: 'manage'
            // nextPage: { title: '...', url: '#' }
        },
        component: __WEBPACK_IMPORTED_MODULE_2__bribe_component__["a" /* BribeComponent */]
    }
];
var BribeModule = /** @class */ (function () {
    function BribeModule() {
    }
    BribeModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_5__component_card_actions_card_actions_module__["a" /* CardActionsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* RouterModule */].forChild(routes)
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__bribe_component__["a" /* BribeComponent */]
            ]
        })
    ], BribeModule);
    return BribeModule;
}());



/***/ })

});
//# sourceMappingURL=bribe.module.chunk.js.map
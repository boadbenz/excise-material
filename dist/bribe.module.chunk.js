webpackJsonp(["bribe.module"],{

/***/ "./src/app/pages/reward/bribe/bribe.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wizard-content\">\n  <div class=\"wizard-circle wizard clearfix clearfix\">\n    <div class=\"steps tab-wizard\">\n      <ul role=\"tablist\">\n        <li role=\"tab\" class=\"current\" aria-disabled=\"false\" aria-selected=\"true\">\n          <a>\n            <span class=\"current-info audible\">current step: </span>\n            <span class=\"step\"></span> 1. ใบแจ้งความนำจับ</a>\n        </li>\n        <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\n          <a>\n            <span class=\"step\"></span> 2. งานจับกุม </a>\n        </li>\n        <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\n          <a>\n            <span class=\"step\"></span> 3. รับคำกล่าวโทษ </a>\n        </li>\n        <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\n          <a>\n            <span class=\"step\"></span> 4. งานตรวจรับและพิสูจน์ของกลาง </a>\n        </li>\n        <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\n          <a>\n            <span class=\"step\"></span> 5. งานเปรียบเทียบและชำระค่าปรับ </a>\n        </li>\n        <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\n          <a>\n            <span class=\"step\"></span> 6. นำส่งเงินรายได้ </a>\n        </li>\n        <li role=\"tab\" class=\"current\" aria-disabled=\"true\">\n          <a>\n            <span class=\"step\"></span> 7. คำร้องขอรับเงินสินบนรางวัล </a>\n        </li>\n      </ul>\n    </div>\n  </div>\n</div>\n\n<div class=\"card\">\n  <div class=\"card-header  unset-radius\">\n    <app-card-actions-collapse></app-card-actions-collapse>\n    <h4 class=\"card-title m-b-0\">รายละเอียดคดี</h4>\n  </div>\n  <div class=\"card-body\">\n    <div class=\"form-body\">\n      <div class=\"row\">\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label col-md-4\">เลขที่ใบแจ้งความนำจับ : </label>\n            <div class=\"col-md-8\">\n              <input class=\"form-control\" type=\"text\" name=\"allegationCode\" disabled>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label col-md-4\">วันที่แจ้งความนำจับ : </label>\n            <div class=\"col-md-3\">\n              <input class=\"form-control\" type=\"text\" name=\"lawsuitDate\" disabled>\n            </div>\n            <label class=\"col-form-label text-center col-md-2\">เวลา</label>\n            <div class=\"col-md-3\">\n              <input class=\"form-control\" type=\"text\" name=\"lawsuitTime\" disabled>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label col-md-4\">ผู้แจ้งความนำจับ : </label>\n            <div class=\"col-md-8\">\n              <input class=\"form-control\" type=\"text\" name=\"allegationNo\" disabled>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label col-md-4\">ผู้รับแจ้งความนำจับ : </label>\n            <div class=\"col-md-8\">\n              <input class=\"form-control\" type=\"text\" name=\"allegationNo\" disabled>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label col-md-4\">ตำแหน่ง : </label>\n            <div class=\"col-md-8\">\n              <input class=\"form-control\" type=\"text\" name=\"allegationCode\" disabled>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label col-md-4\">หน่วยงาน : </label>\n            <div class=\"col-md-8\">\n              <input class=\"form-control\" type=\"text\" name=\"allegationSubject\" disabled>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label col-md-4\">เลขที่ใบงาน : </label>\n            <div class=\"col-md-8\">\n              <input class=\"form-control\" type=\"text\" name=\"allegationCode\" disabled>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label col-md-4\">วันที่จับกุม : </label>\n            <div class=\"col-md-3\">\n              <input class=\"form-control\" type=\"text\" name=\"lawsuitDate\" disabled>\n            </div>\n            <label class=\"col-form-label text-center col-md-2\">เวลา</label>\n            <div class=\"col-md-3\">\n              <input class=\"form-control\" type=\"text\" name=\"lawsuitTime\" disabled>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label col-md-4\">ผู้กล่าวหา : </label>\n            <div class=\"col-md-8\">\n              <input class=\"form-control\" type=\"text\" name=\"allegationCode\" disabled>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label col-md-4\">ตำแหน่ง : </label>\n            <div class=\"col-md-8\">\n              <input class=\"form-control\" type=\"text\" name=\"allegationSubject\" disabled>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label col-md-4\">หน่วยงาน : </label>\n            <div class=\"col-md-8\">\n              <input class=\"form-control\" type=\"text\" name=\"allegationCode\" disabled>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label col-md-4\">สถานที่จับกุม : </label>\n            <div class=\"col-md-8\">\n              <input class=\"form-control\" type=\"text\" name=\"allegationSubject\" disabled>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label col-md-4\">เลขที่คดีรับคำกล่าวโทษ : </label>\n            <div class=\"col-md-8\">\n              <input class=\"form-control\" type=\"text\" name=\"allegationCode\" disabled>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label col-md-4\">วันที่รับคดี : </label>\n            <div class=\"col-md-3\">\n              <input class=\"form-control\" type=\"text\" name=\"lawsuitDate\" disabled>\n            </div>\n            <label class=\"col-form-label text-center col-md-2\">เวลา</label>\n            <div class=\"col-md-3\">\n              <input class=\"form-control\" type=\"text\" name=\"lawsuitTime\" disabled>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label col-md-4\">ฐานความผิดมาตรา : </label>\n            <div class=\"col-md-8\">\n              <input class=\"form-control\" type=\"text\" name=\"allegationCode\" disabled>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label col-md-4\">ฐานความผิด : </label>\n            <div class=\"col-md-8\">\n              <input class=\"form-control\" type=\"text\" name=\"allegationSubject\" disabled>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label col-md-4\">บทกำหนดโทษ : </label>\n            <div class=\"col-md-8\">\n              <input class=\"form-control\" type=\"text\" name=\"allegationCode\" disabled>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label col-md-4\">อัตราโทษ : </label>\n            <div class=\"col-md-8\">\n              <input class=\"form-control\" type=\"text\" name=\"allegationSubject\" disabled>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"card \">\n  <div class=\"card-header  unset-radius\">\n    <app-card-actions-collapse></app-card-actions-collapse>\n    <h4 class=\"card-title m-b-0\">คำร้องขอรับเงินสินบน</h4>\n  </div>\n  <div class=\"card-body\">\n    <div class=\"row\">\n      <div class=\"col-md-6\">\n        <div class=\"form-group row\">\n          <label class=\"col-form-label col-md-4\">เลขที่คำร้องขอ : </label>\n          <div class=\"col-md-8\">\n            <input class=\"form-control\" type=\"text\" name=\"allegationCode\" disabled>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-md-6\">\n        <div class=\"form-group row\">\n          <label class=\"col-form-label col-md-4\">จำนวนส่วน : </label>\n          <div class=\"col-md-8\">\n            <input class=\"form-control\" type=\"text\" name=\"allegationCode\" disabled>\n          </div>\n        </div>\n      </div>\n\n    </div>\n    <div class=\"row\">\n      <div class=\"col-md-6\">\n        <div class=\"form-group row\">\n          <label class=\"col-form-label col-md-4\">เขียนที่ : </label>\n          <div class=\"col-md-8\">\n            <input class=\"form-control\" type=\"text\" name=\"allegationCode\" [disabled]=\"viewMode\">\n          </div>\n        </div>\n      </div>\n      <div class=\"col-md-6\">\n        <div class=\"form-group row\">\n          <label class=\"col-form-label col-md-4\">วันที่จัดทำ : </label>\n          <div class=\"col-md-3\">\n            <input class=\"form-control\" type=\"text\" name=\"lawsuitDate\" [disabled]=\"viewMode\">\n          </div>\n          <label class=\"col-form-label text-center col-md-2\">เวลา</label>\n          <div class=\"col-md-3\">\n            <input class=\"form-control\" type=\"text\" name=\"lawsuitTime\" [disabled]=\"viewMode\">\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <div class=\"form-group row\">\n          <label class=\"col-form-label col-md-2\">ผู้แจ้งความได้ทราบว่า : </label>\n          <div class=\"col-md-10\">\n            <textarea class=\"form-control\" rows=\"8\" [disabled]=\"viewMode\"></textarea>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"table-responsive\">\n      <table class=\"dataTable table table-sm table-striped table-hover\">\n        <thead>\n          <tr>\n            <th class=\"footable-sortable text-center\">ลำดับ</th>\n            <th class=\"footable-sortable\">ชื่อผู้ต้องหา</th>\n            <th class=\"footable-sortable\">ลักษณะคดี</th>\n            <th class=\"footable-sortable\">วันที่ชำระ</th>\n            <th class=\"footable-sortable\">ใบเสร็จเล่มที่</th>\n            <th class=\"footable-sortable\">ใบเสร็จเลขที่</th>\n            <th class=\"footable-sortable\">เลขที่อ้างอิง</th>\n            <th class=\"footable-sortable\">งวดชำระ</th>\n            <th class=\"footable-sortable\">เงินสินบน</th>\n            <th class=\"footable-sortable\">เงินสินบนสุทธิ</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr class=\"footable\">\n            <td class=\"text-center\">1</td>\n            <td class=\"\">นายธวัชชัย บิงขุนทด</td>\n            <td class=\"\">เปรียบเทียบคดี</td>\n            <td>10-ม.ค.-2560</td>\n            <td class=\"text-center\">33</td>\n            <td class=\"\">001/2561</td>\n            <td class=\"\">1/1</td>\n            <td>1,000,000.00</td>\n            <td>200,000.00</td>\n            <td>50,000.00</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</div>\n\n<div class=\"card \">\n  <div class=\"card-header unset-radius\">\n    <app-card-actions-collapse></app-card-actions-collapse>\n    <h4 class=\"card-title m-b-0\">หนังสือมอบอำนาจ</h4>\n  </div>\n  <div class=\"card-body\">\n    <div class=\"form-body\">\n      <div class=\"row\">\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label col-md-4\">เขียนที่ : </label>\n            <div class=\"col-md-8\">\n              <input class=\"form-control\" type=\"text\" name=\"allegationCode\" [disabled]=\"viewMode\">\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label col-md-4\">วันที่จัดทำ : </label>\n            <div class=\"col-md-3\">\n              <input class=\"form-control\" type=\"text\" name=\"lawsuitDate\" [disabled]=\"viewMode\">\n            </div>\n            <label class=\"col-form-label text-center col-md-2\">เวลา</label>\n            <div class=\"col-md-3\">\n              <input class=\"form-control\" type=\"text\" name=\"lawsuitTime\" [disabled]=\"viewMode\">\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label col-md-4\">ผู้กล่าวหา : </label>\n            <div class=\"col-md-8\">\n              <input class=\"form-control\" type=\"text\" name=\"allegationCode\" [disabled]=\"viewMode\">\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label col-md-4\">ตำแหน่ง : </label>\n            <div class=\"col-md-8\">\n              <input class=\"form-control\" type=\"text\" name=\"allegationCode\" disabled>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-md-6\">\n          <div class=\"form-group row\">\n            <label class=\"col-form-label col-md-4\">หน่วยงาน : </label>\n            <div class=\"col-md-8\">\n              <input class=\"form-control\" type=\"text\" name=\"allegationCode\" disabled>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"card\">\n  <div class=\"card-header card-navy\">\n    <strong class=\"text-dark\">\n      เอกสารแนบภายใน\n    </strong>\n    <app-card-actions-collapse></app-card-actions-collapse>\n  </div>\n  <div class=\"card-body\">\n    <div class=\"text-right\">\n      <input type=\"file\" id=\"btn-browse\" #file>\n      <label for=\"btn-browse\" [ngClass]=\"{disabled : viewMode}\" class=\"btn waves-effect waves-light btn-navy\"> เพิ่มเอกสารแนบ </label>\n    </div>\n    <div class=\"table-responsive table-striped no-wrap\">\n      <table class=\"table\">\n        <thead>\n          <tr>\n            <th class=\"footable-sortable text-center\">ลำดับ</th>\n            <th class=\"footable-sortable\">ชื่อเอกสารแนบ</th>\n            <th class=\"footable-sortable\">ที่อยู่เอกสารแนบ</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr class=\"footable\">\n            <td class=\"text-center\">1</td>\n            <td>\n              <input class=\"form-control\" type=\"text\" nmae=\"fileName\" [disabled]=\"viewMode\">\n            </td>\n            <td>\n              <input class=\"form-control\" type=\"text\" name=\"filePath\" [disabled]=\"viewMode\">\n            </td>\n            <td>\n              <i class=\"ti-trash btn-action\"></i>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</div>"

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
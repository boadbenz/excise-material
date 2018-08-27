webpackJsonp(["list.module.0"],{

/***/ "./src/app/pages/reduction/list/list.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row m-t-10\">\n  <div class=\"col-12\">\n    <div class=\"card card-outline-bluish unset-radius\" *ngIf=\"advSearch | async\">\n      <div class=\"card-header unset-radius\">\n        ค้นหาขั้นสูง\n        <div class=\"card-actions\">\n          <a (click)=\"closeAdvSearch()\">\n            <i class=\"ti-close\"></i>\n          </a>\n        </div>\n      </div>\n      <div class=\"card-body\">\n        <form class=\"form-horizontal\">\n          <div class=\"form-body\">\n            <div class=\"row\">\n              <div class=\"col-md-6\">\n                <div class=\"form-group row\">\n                  <label class=\"col-form-label text-right col-md-4\">เลขที่ใบงาน : </label>\n                  <div class=\"col-md-8\">\n                    <input class=\"form-control\" type=\"text\" [(ngModel)]=\"arrestCode\" name=\"arrestCode\">\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-md-6\">\n                <div class=\"form-group has-danger row\">\n                  <label class=\"col-form-label text-right col-md-4\">เลขที่คดีรับคำกล่าวโทษ : </label>\n                  <div class=\"col-md-8\">\n                    <input class=\"form-control\" type=\"text\" [(ngModel)]=\"lawsuitNo\" name=\"lawsuitNo\">\n                  </div>\n                </div>\n              </div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-md-6\">\n                <div class=\"form-group row\">\n                  <label class=\"col-form-label text-right col-md-4\">ทะเบียนตรวจพิสูจน์ : </label>\n                  <div class=\"col-md-8\">\n                    <input class=\"form-control\" type=\"text\" [(ngModel)]=\"proofNo\" name=\"proofNo\">\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-md-6\">\n                <div class=\"form-group has-danger row\">\n                  <label class=\"col-form-label text-right col-md-4\">เลขที่เปรียบเทียบคดี : </label>\n                  <div class=\"col-md-8\">\n                    <input class=\"form-control\" type=\"text\" [(ngModel)]=\"caseNumber\" name=\"caseNumber\">\n                  </div>\n                </div>\n              </div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-md-6\">\n                <div class=\"form-group row\">\n                  <label class=\"col-form-label text-right col-md-4\">วันที่เปรียบเทียบคดี : </label>\n                  <div class=\"form-group input-group col-md-8\">\n                    <input class=\"form-control\" type=\"date\" [(ngModel)]=\"lawsuitDateStart\" name=\"lawsuitDateStart\">\n                    <label class=\"col-form-label text-center col-md-2\">ถึง</label>\n                    <input class=\"form-control\" type=\"date\" [(ngModel)]=\"lawsuitDateEnd\" name=\"lawsuitDateEnd\">\n                  </div>\n                </div>\n              </div>\n              <div class=\"col-md-6\">\n                <div class=\"form-group row\">\n                  <label class=\"col-form-label text-right col-md-4\">ผู้เปรียบเทียบคดี : </label>\n                  <div class=\"col-md-8\">\n                    <input class=\"form-control\" type=\"text\" [(ngModel)]=\"lawName\" name=\"lawName\">\n                  </div>\n                </div>\n              </div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-md-6\">\n                <div class=\"form-group row\">\n                  <label class=\"col-form-label text-right col-md-4\">หน่วยงาน : </label>\n                  <div class=\"col-md-8\">\n                    <input class=\"form-control\" type=\"text\" [(ngModel)]=\"departmentlawName\" name=\"departmentlawName\">\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div class=\"text-right\">\n            <button type=\"submit\" class=\"btn waves-effect waves-light text-white btn-search\">ค้นข้อมูล</button>\n          </div>\n        </form>\n      </div>\n    </div>\n    <div class=\"card\">\n      <div class=\"card-body\">\n        <div class=\"table-responsive table-striped no-wrap\">\n          <table class=\"table\">\n            <thead>\n              <tr>\n                <th class=\"footable-sortable\">ลำดับ</th>\n                <th class=\"footable-sortable\">เลขที่ใบงาน</th>\n                <th class=\"footable-sortable\">เลขที่คดีรับคำกล่าวโทษ</th>\n                <th class=\"footable-sortable\">ทะเบียนตรวจพิสูจน์</th>\n                <th class=\"footable-sortable\">เลขที่เปรียบเทียบคดี</th>\n                <th class=\"footable-sortable\">ผู้เปรียบเทียบคดี</th>\n                <th class=\"footable-sortable\">วันที่เปรียบเทียบคดี</th>\n                <th class=\"footable-sortable\">หน่วยงาน</th>\n                <th class=\"footable-sortable\"></th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr class=\"footable\" *ngFor=\"let item of listData | slice:0:numberPage; let i = index;\">\n                <td>{{i+1}}</td>\n                <td>{{item.arrestCode}}</td>\n                <td>{{item.lawsuitNo}}</td>\n                <td>{{item.proofNo}}</td>\n                <td>{{item.caseNumber}}</td>\n                <td>{{item.titleName}}{{item.firstName}} {{item.lastName}}</td>\n                <td>{{item.lawsuitDate}}</td>\n                <td>{{item.departmentlawName}}</td>\n                <td>\n                  <a href=\"javaScript:void(0);\" class=\"text-secondary\" (click)=\"viewData(item.arrestCode)\">\n                    <i class=\"mdi mdi-eye fa-lg\"></i>\n                  </a>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n        <div class=\"card-footer bg-transparent\">\n          <div class=\"row justify-content-between\">\n            <div clas=\"col\">\n              <a class=\"icn-pagination\"> |&lt;&lt; </a>\n              <label> หน้าที่\n                <select>\n                  <option *ngFor=\"let number of numberSelectPage;\">{{number}}</option>\n                </select> จาก {{allPageCount}} หน้า</label>\n              <a class=\"icn-pagination m-r-10\"> &gt;&gt;| </a>\n              รายการที่ 1 - {{numberPage}} จาก {{listData.length}} รายการ\n            </div>\n            <div class=\"col col-lg-3 text-right\">\n              <label>แสดง\n                <select>\n                  <option (click)=\"changeNumPage(5)\">5</option>\n                  <option (click)=\"changeNumPage(10)\">10</option>\n                  <option (click)=\"changeNumPage(15)\">15</option>\n                  <option (click)=\"changeNumPage(20)\">20</option>\n                </select> รายการ</label>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/pages/reduction/list/list.component.scss":
/***/ (function(module, exports) {

module.exports = ".btn-search {\n  background: #005c97;\n  font-size: 16px;\n  width: 120px;\n  height: 40px; }\n\n.table-striped tbody tr:nth-of-type(2n+1) {\n  background: #e5eef4; }\n\n.table td,\n.table th {\n  max-width: 100px;\n  overflow: hidden;\n  text-overflow: ellipsis; }\n"

/***/ }),

/***/ "./src/app/pages/reduction/list/list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_header_navigation_navigation_service__ = __webpack_require__("./src/app/shared/header-navigation/navigation.service.ts");
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



var ListComponent = /** @class */ (function () {
    function ListComponent(navService, router) {
        this.navService = navService;
        this.router = router;
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
                departmentlawName: "สสท.ระนอง สาขาเมืองกระบุรี"
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
                departmentlawName: "สสท.ระนอง สาขาเมืองกระบุรี"
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
                departmentlawName: "สสท.ระนอง สาขาเมืองกระบุรี"
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
                departmentlawName: "สสท.ระนอง สาขาเมืองกระบุรี"
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
                departmentlawName: "สสท.ระนอง สาขาเมืองกระบุรี",
            }
        ];
        this.allPageCount = 0;
        this.numberPage = 5;
        this.advSearch = this.navService.showAdvSearch;
    }
    ListComponent.prototype.ngOnInit = function () {
        this.navService.setSearchBar(true);
        this.navService.setPrintButton(false);
        this.navService.setDeleteButton(false);
        this.navService.setCancelButton(false);
        this.navService.setEditButton(false);
        this.navService.setSaveButton(false);
        this.allPageCount = this.listData.length / this.numberPage;
        this.numberSelectPage = Array(this.allPageCount).fill(0).map(function (x, i) { return i + 1; });
    };
    ListComponent.prototype.viewData = function (arrestCode) {
        this.router.navigate(['/reduction/manage', 'R'], { queryParams: { code: arrestCode } });
    };
    ListComponent.prototype.closeAdvSearch = function () {
        this.navService.showAdvSearch.next(false);
    };
    ListComponent.prototype.changeNumPage = function (numPage) {
        this.numberPage = numPage;
        this.allPageCount = Math.ceil(this.listData.length / this.numberPage);
        this.numberSelectPage = Array(this.allPageCount).fill(0).map(function (x, i) { return i + 1; });
    };
    ListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["n" /* Component */])({
            selector: 'app-list',
            template: __webpack_require__("./src/app/pages/reduction/list/list.component.html"),
            styles: [__webpack_require__("./src/app/pages/reduction/list/list.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__shared_header_navigation_navigation_service__["a" /* NavigationService */], __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* Router */]])
    ], ListComponent);
    return ListComponent;
}());



/***/ }),

/***/ "./src/app/pages/reduction/list/list.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListModule", function() { return ListModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_header_navigation_navigation_component__ = __webpack_require__("./src/app/shared/header-navigation/navigation.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__list_component__ = __webpack_require__("./src/app/pages/reduction/list/list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
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
            urls: [{ title: 'หน้าหลัก', url: '/' }, { title: 'ค้นหารายการปรับเพิ่ม-ปรับลด' }],
            codePage: 'ILG60-09-01-00-00',
            pageType: 'list',
            nextPage: { title: 'จัดการข้อมูลรายการปรับเพิ่ม-ปรับลด', url: '/reduction/manage' }
        },
        component: __WEBPACK_IMPORTED_MODULE_3__list_component__["a" /* ListComponent */]
    }
];
var ListModule = /** @class */ (function () {
    function ListModule() {
    }
    ListModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["d" /* RouterModule */].forChild(routes)
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_0__shared_header_navigation_navigation_component__["a" /* NavigationComponent */]],
            declarations: [__WEBPACK_IMPORTED_MODULE_3__list_component__["a" /* ListComponent */]]
        })
    ], ListModule);
    return ListModule;
}());



/***/ })

});
//# sourceMappingURL=list.module.0.chunk.js.map
webpackJsonp(["timepicker.module"],{

/***/ "./src/app/pages/component/timepicker/timepicker.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col-md-6\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <h3 class=\"card-title\">Timepicker</h3>\r\n                <h6 class=\"card-subtitle\">This is basic Timepicker</h6>\r\n                <ngb-timepicker [(ngModel)]=\"time\"></ngb-timepicker>\r\n                <pre>Selected time: {{time | json}}</pre>\r\n  \t\t\t</div> \r\n        </div>\r\n    </div>\r\n    <div class=\"col-md-6\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <h3 class=\"card-title\">Spinners</h3>\r\n                <h6 class=\"card-subtitle\">This is Spinners</h6>\r\n                <ngb-timepicker [(ngModel)]=\"time\" [spinners]=\"spinners\"></ngb-timepicker>\r\n                <button class=\"m-t-1 m-t-10 btn btn-sm btn-outline-{{spinners ? 'success' : 'danger'}}\" (click)=\"toggleSpinners()\">\r\n                    Spinners - {{spinners ? \"ON\" : \"OFF\"}}\r\n                </button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-md-6\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <h3 class=\"card-title\">Meridian</h3>\r\n                <h6 class=\"card-subtitle\">This is Meridian Timepicker</h6>\r\n                <ngb-timepicker [(ngModel)]=\"time\" [meridian]=\"meridian\"></ngb-timepicker>\r\n                <button class=\"btn btn-sm btn-outline-{{meridian ? 'success' : 'danger'}}\" (click)=\"toggleMeridian()\">\r\n                    Meridian - {{meridian ? \"ON\" : \"OFF\"}}\r\n                </button>\r\n                <hr>\r\n                <pre>Selected time: {{time | json}}</pre>\r\n  \t\t\t</div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-md-6\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <h3 class=\"card-title\">Seconds</h3>\r\n                <h6 class=\"card-subtitle\">This is Seconds with the on off</h6>\r\n                <ngb-timepicker [(ngModel)]=\"time\" [seconds]=\"seconds\"></ngb-timepicker>\r\n                <button class=\"btn btn-sm btn-outline-{{seconds ? 'success' : 'danger'}}\" (click)=\"toggleSeconds()\">\r\n                    Seconds - {{seconds ? \"ON\" : \"OFF\"}}\r\n                </button>\r\n                <hr>\r\n                <pre>Selected time: {{time | json}}</pre> \r\n  \t\t\t</div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-md-12\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <h3 class=\"card-title\">Custom steps</h3>\r\n                <h6 class=\"card-subtitle\">This is Custom steps</h6>\r\n                <ngb-timepicker [(ngModel)]=\"time2\" [seconds]=\"true\"\r\n                    [hourStep]=\"hourStep\" [minuteStep]=\"minuteStep\" [secondStep]=\"secondStep\"></ngb-timepicker>\r\n\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-3\">\r\n                        <label for=\"changeHourStep\">Hour Step</label>\r\n                        <input id=\"changeHourStep\" type=\"number\" class=\"form-control form-control\" [(ngModel)]=\"hourStep\" />\r\n                    </div>\r\n                    <div class=\"col-md-3\">\r\n                        <label for=\"changeMinuteStep\">Minute Step</label>\r\n                        <input id=\"changeMinuteStep\" type=\"number\" class=\"form-control form-control\" [(ngModel)]=\"minuteStep\" />\r\n                    </div>\r\n                    <div class=\"col-md-3\">\r\n                        <label for=\"changeSecondStep\">Second Step</label>\r\n                        <input id=\"changeSecondStep\" type=\"number\" class=\"form-control form-control\" [(ngModel)]=\"secondStep\" />\r\n                    </div>\r\n                </div>\r\n                \r\n                <pre class=\"m-t-20\">Selected time: {{time2 | json}}</pre>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-md-12\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <h3 class=\"card-title\">Custom validation</h3>\r\n                <h6 class=\"card-subtitle\">Illustrates custom validation, you have to select time between 12:00 and 13:59</h6>\r\n                <div class=\"form-group\" [class.has-success]=\"ctrl.valid\" [class.has-danger]=\"!ctrl.valid\">\r\n                  <ngb-timepicker [(ngModel)]=\"time3\" [formControl]=\"ctrl\" required></ngb-timepicker>\r\n                  <div class=\"form-control-feedback\">\r\n                    <div *ngIf=\"ctrl.valid\">Great choice</div>\r\n                    <div *ngIf=\"ctrl.errors && ctrl.errors['required']\">Select some time during lunchtime</div>\r\n                    <div *ngIf=\"ctrl.errors && ctrl.errors['tooLate']\">Oh no, it's way too late</div>\r\n                    <div *ngIf=\"ctrl.errors && ctrl.errors['tooEarly']\">It's a bit too early</div>\r\n                  </div>\r\n                </div> \r\n\r\n                <hr>\r\n                <pre>Selected time: {{time3 | json}}</pre>  \r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/pages/component/timepicker/timepicker.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgbdtimepickerBasic; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var NgbdtimepickerBasic = /** @class */ (function () {
    function NgbdtimepickerBasic() {
        this.time = { hour: 13, minute: 30 };
        this.meridian = true;
        // This is for the seconds
        this.seconds = true;
        // This is for the spinners
        this.spinners = true;
        // This is for the column step
        this.time2 = { hour: 13, minute: 30, second: 0 };
        this.hourStep = 1;
        this.minuteStep = 15;
        this.secondStep = 30;
        this.ctrl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */]('', function (control) {
            var value = control.value;
            if (!value) {
                return null;
            }
            if (value.hour < 12) {
                return { tooEarly: true };
            }
            if (value.hour > 13) {
                return { tooLate: true };
            }
            return null;
        });
    }
    NgbdtimepickerBasic.prototype.toggleMeridian = function () {
        this.meridian = !this.meridian;
    };
    NgbdtimepickerBasic.prototype.toggleSeconds = function () {
        this.seconds = !this.seconds;
    };
    NgbdtimepickerBasic.prototype.toggleSpinners = function () {
        this.spinners = !this.spinners;
    };
    NgbdtimepickerBasic = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'ngbd-timepicker',
            template: __webpack_require__("./src/app/pages/component/timepicker/timepicker.component.html")
        })
    ], NgbdtimepickerBasic);
    return NgbdtimepickerBasic;
}());



/***/ }),

/***/ "./src/app/pages/component/timepicker/timepicker.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimepickerModule", function() { return TimepickerModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__timepicker_component__ = __webpack_require__("./src/app/pages/component/timepicker/timepicker.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var routes = [{
        path: '',
        data: {
            title: 'Timepicker page',
            urls: [{ title: 'Dashboard', url: '/' }, { title: 'Angular Component' }, { title: 'Timepicker page' }]
        },
        component: __WEBPACK_IMPORTED_MODULE_4__timepicker_component__["a" /* NgbdtimepickerBasic */]
    }];
var TimepickerModule = /** @class */ (function () {
    function TimepickerModule() {
    }
    TimepickerModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["k" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__["e" /* NgbModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* RouterModule */].forChild(routes)
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_4__timepicker_component__["a" /* NgbdtimepickerBasic */]]
        })
    ], TimepickerModule);
    return TimepickerModule;
}());



/***/ })

});
//# sourceMappingURL=timepicker.module.chunk.js.map
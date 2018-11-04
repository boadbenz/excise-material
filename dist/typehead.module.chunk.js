webpackJsonp(["typehead.module"],{

/***/ "./src/app/pages/component/typehead/typehead.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col-md-6\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <h3 class=\"card-title\">Simple Typeahead</h3>\r\n                <h6 class=\"card-subtitle\">A typeahead example that gets values from a static string</h6>\r\n                <label for=\"typeahead-basic\">Search for a USA state:</label>\r\n                <input id=\"typeahead-basic\" type=\"text\" class=\"form-control\" [(ngModel)]=\"model\" [ngbTypeahead]=\"search\"/>\r\n                <div class=\"m-t-10\">Model: {{ model | json }}</div>\r\n  \t\t\t</div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-md-6\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <h3 class=\"card-title\">Formatted results</h3>\r\n                <h6 class=\"card-subtitle\">A typeahead example that uses a formatter function for string results</h6>\r\n                <label for=\"typeahead-format\">Search for a state:</label>\r\n                <input id=\"typeahead-format\" type=\"text\" class=\"form-control\" [(ngModel)]=\"model\" [ngbTypeahead]=\"search\" [resultFormatter]=\"formatter\" />\r\n                <hr>\r\n                <pre>Model: {{ model | json }}</pre>\r\n  \t\t\t</div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-md-6\"> \r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <h3 class=\"card-title\">Wikipedia search</h3>\r\n                <h6 class=\"card-subtitle\">A typeahead example that gets values from the <code>WikipediaService</code></h6>\r\n                    <div class=\"form-group\" [class.has-danger]=\"searchFailed\">\r\n                      <label for=\"typeahead-http\">Search for a wiki page:</label>\r\n                      <input id=\"typeahead-http\" type=\"text\" class=\"form-control\" [(ngModel)]=\"model2\" [ngbTypeahead]=\"search2\" placeholder=\"Wikipedia search\" />\r\n                      <span *ngIf=\"searching\">searching...</span>\r\n                      <div class=\"form-control-feedback\" *ngIf=\"searchFailed\">Sorry, suggestions could not be loaded.</div> \r\n                    </div>\r\n\r\n                    <hr>\r\n                    <pre>Model: {{ model2 | json }}</pre>\r\n  \t\t\t</div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-md-6\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <h3 class=\"card-title\">Template for results</h3>\r\n                <h6 class=\"card-subtitle\">A typeahead example that uses custom template for results display and uses object as a model</h6>\r\n                <ng-template #rt let-r=\"result\" let-t=\"term\">\r\n                  <img [src]=\"'https://upload.wikimedia.org/wikipedia/commons/thumb/' + r.flag\" width=\"16\">\r\n                  {{ r.name}}\r\n                </ng-template>\r\n\r\n                <label for=\"typeahead-template\">Search for a state:</label>\r\n                <input id=\"typeahead-template\" type=\"text\" class=\"form-control\" [(ngModel)]=\"model4\" [ngbTypeahead]=\"search3\" [resultTemplate]=\"rt\"\r\n                  [inputFormatter]=\"formatter2\" />\r\n                <hr>\r\n                <pre>Model: {{ model4 | json }}</pre>\r\n  \t\t\t</div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/pages/component/typehead/typehead.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export WikipediaService */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgbdtypeheadBasic; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_debounceTime__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/debounceTime.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/distinctUntilChanged.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_of__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_do__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/do.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/switchMap.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
    'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
    'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
    'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
    'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
    'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
var statesWithFlags = [
    { 'name': 'Alabama', 'flag': '5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png' },
    { 'name': 'Alaska', 'flag': 'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png' },
    { 'name': 'Arizona', 'flag': '9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png' },
    { 'name': 'Arkansas', 'flag': '9/9d/Flag_of_Arkansas.svg/45px-Flag_of_Arkansas.svg.png' },
    { 'name': 'California', 'flag': '0/01/Flag_of_California.svg/45px-Flag_of_California.svg.png' },
    { 'name': 'Colorado', 'flag': '4/46/Flag_of_Colorado.svg/45px-Flag_of_Colorado.svg.png' },
    { 'name': 'Connecticut', 'flag': '9/96/Flag_of_Connecticut.svg/39px-Flag_of_Connecticut.svg.png' },
    { 'name': 'Delaware', 'flag': 'c/c6/Flag_of_Delaware.svg/45px-Flag_of_Delaware.svg.png' },
    { 'name': 'Florida', 'flag': 'f/f7/Flag_of_Florida.svg/45px-Flag_of_Florida.svg.png' },
    {
        'name': 'Georgia',
        'flag': '5/54/Flag_of_Georgia_%28U.S._state%29.svg/46px-Flag_of_Georgia_%28U.S._state%29.svg.png'
    },
    { 'name': 'Hawaii', 'flag': 'e/ef/Flag_of_Hawaii.svg/46px-Flag_of_Hawaii.svg.png' },
    { 'name': 'Idaho', 'flag': 'a/a4/Flag_of_Idaho.svg/38px-Flag_of_Idaho.svg.png' },
    { 'name': 'Illinois', 'flag': '0/01/Flag_of_Illinois.svg/46px-Flag_of_Illinois.svg.png' },
    { 'name': 'Indiana', 'flag': 'a/ac/Flag_of_Indiana.svg/45px-Flag_of_Indiana.svg.png' },
    { 'name': 'Iowa', 'flag': 'a/aa/Flag_of_Iowa.svg/44px-Flag_of_Iowa.svg.png' },
    { 'name': 'Kansas', 'flag': 'd/da/Flag_of_Kansas.svg/46px-Flag_of_Kansas.svg.png' },
    { 'name': 'Kentucky', 'flag': '8/8d/Flag_of_Kentucky.svg/46px-Flag_of_Kentucky.svg.png' },
    { 'name': 'Louisiana', 'flag': 'e/e0/Flag_of_Louisiana.svg/46px-Flag_of_Louisiana.svg.png' },
    { 'name': 'Maine', 'flag': '3/35/Flag_of_Maine.svg/45px-Flag_of_Maine.svg.png' },
    { 'name': 'Maryland', 'flag': 'a/a0/Flag_of_Maryland.svg/45px-Flag_of_Maryland.svg.png' },
    { 'name': 'Massachusetts', 'flag': 'f/f2/Flag_of_Massachusetts.svg/46px-Flag_of_Massachusetts.svg.png' },
    { 'name': 'Michigan', 'flag': 'b/b5/Flag_of_Michigan.svg/45px-Flag_of_Michigan.svg.png' },
    { 'name': 'Minnesota', 'flag': 'b/b9/Flag_of_Minnesota.svg/46px-Flag_of_Minnesota.svg.png' },
    { 'name': 'Mississippi', 'flag': '4/42/Flag_of_Mississippi.svg/45px-Flag_of_Mississippi.svg.png' },
    { 'name': 'Missouri', 'flag': '5/5a/Flag_of_Missouri.svg/46px-Flag_of_Missouri.svg.png' },
    { 'name': 'Montana', 'flag': 'c/cb/Flag_of_Montana.svg/45px-Flag_of_Montana.svg.png' },
    { 'name': 'Nebraska', 'flag': '4/4d/Flag_of_Nebraska.svg/46px-Flag_of_Nebraska.svg.png' },
    { 'name': 'Nevada', 'flag': 'f/f1/Flag_of_Nevada.svg/45px-Flag_of_Nevada.svg.png' },
    { 'name': 'New Hampshire', 'flag': '2/28/Flag_of_New_Hampshire.svg/45px-Flag_of_New_Hampshire.svg.png' },
    { 'name': 'New Jersey', 'flag': '9/92/Flag_of_New_Jersey.svg/45px-Flag_of_New_Jersey.svg.png' },
    { 'name': 'New Mexico', 'flag': 'c/c3/Flag_of_New_Mexico.svg/45px-Flag_of_New_Mexico.svg.png' },
    { 'name': 'New York', 'flag': '1/1a/Flag_of_New_York.svg/46px-Flag_of_New_York.svg.png' },
    { 'name': 'North Carolina', 'flag': 'b/bb/Flag_of_North_Carolina.svg/45px-Flag_of_North_Carolina.svg.png' },
    { 'name': 'North Dakota', 'flag': 'e/ee/Flag_of_North_Dakota.svg/38px-Flag_of_North_Dakota.svg.png' },
    { 'name': 'Ohio', 'flag': '4/4c/Flag_of_Ohio.svg/46px-Flag_of_Ohio.svg.png' },
    { 'name': 'Oklahoma', 'flag': '6/6e/Flag_of_Oklahoma.svg/45px-Flag_of_Oklahoma.svg.png' },
    { 'name': 'Oregon', 'flag': 'b/b9/Flag_of_Oregon.svg/46px-Flag_of_Oregon.svg.png' },
    { 'name': 'Pennsylvania', 'flag': 'f/f7/Flag_of_Pennsylvania.svg/45px-Flag_of_Pennsylvania.svg.png' },
    { 'name': 'Rhode Island', 'flag': 'f/f3/Flag_of_Rhode_Island.svg/32px-Flag_of_Rhode_Island.svg.png' },
    { 'name': 'South Carolina', 'flag': '6/69/Flag_of_South_Carolina.svg/45px-Flag_of_South_Carolina.svg.png' },
    { 'name': 'South Dakota', 'flag': '1/1a/Flag_of_South_Dakota.svg/46px-Flag_of_South_Dakota.svg.png' },
    { 'name': 'Tennessee', 'flag': '9/9e/Flag_of_Tennessee.svg/46px-Flag_of_Tennessee.svg.png' },
    { 'name': 'Texas', 'flag': 'f/f7/Flag_of_Texas.svg/45px-Flag_of_Texas.svg.png' },
    { 'name': 'Utah', 'flag': 'f/f6/Flag_of_Utah.svg/45px-Flag_of_Utah.svg.png' },
    { 'name': 'Vermont', 'flag': '4/49/Flag_of_Vermont.svg/46px-Flag_of_Vermont.svg.png' },
    { 'name': 'Virginia', 'flag': '4/47/Flag_of_Virginia.svg/44px-Flag_of_Virginia.svg.png' },
    { 'name': 'Washington', 'flag': '5/54/Flag_of_Washington.svg/46px-Flag_of_Washington.svg.png' },
    { 'name': 'West Virginia', 'flag': '2/22/Flag_of_West_Virginia.svg/46px-Flag_of_West_Virginia.svg.png' },
    { 'name': 'Wisconsin', 'flag': '2/22/Flag_of_Wisconsin.svg/45px-Flag_of_Wisconsin.svg.png' },
    { 'name': 'Wyoming', 'flag': 'b/bc/Flag_of_Wyoming.svg/43px-Flag_of_Wyoming.svg.png' }
];
var WikipediaService = /** @class */ (function () {
    function WikipediaService(_jsonp) {
        this._jsonp = _jsonp;
    }
    WikipediaService.prototype.search = function (term) {
        if (term === '') {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */].of([]);
        }
        var wikiUrl = 'https://en.wikipedia.org/w/api.php';
        var params = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["e" /* URLSearchParams */]();
        params.set('search', term);
        params.set('action', 'opensearch');
        params.set('format', 'json');
        params.set('callback', 'JSONP_CALLBACK');
        return this._jsonp
            .get(wikiUrl, { search: params })
            .map(function (response) { return response.json()[1]; });
    };
    WikipediaService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* Jsonp */]])
    ], WikipediaService);
    return WikipediaService;
}());

var NgbdtypeheadBasic = /** @class */ (function () {
    function NgbdtypeheadBasic(_service) {
        var _this = this;
        this._service = _service;
        this.searching = false;
        this.searchFailed = false;
        this.formatter = function (result) { return result.toUpperCase(); };
        this.search = function (text$) {
            return text$
                .debounceTime(200)
                .distinctUntilChanged()
                .map(function (term) { return term.length < 2 ? []
                : states.filter(function (v) { return v.toLowerCase().indexOf(term.toLowerCase()) > -1; }).slice(0, 10); });
        };
        this.search2 = function (text2$) {
            return text2$
                .debounceTime(300)
                .distinctUntilChanged()
                .do(function () { return _this.searching = true; })
                .switchMap(function (term) {
                return _this._service.search(term)
                    .do(function () { return _this.searchFailed = false; })
                    .catch(function () {
                    _this.searchFailed = true;
                    return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */].of([]);
                });
            })
                .do(function () { return _this.searching = false; });
        };
        this.search3 = function (text3$) {
            return text3$
                .debounceTime(200)
                .map(function (term) { return term === '' ? []
                : statesWithFlags.filter(function (v) { return v.name.toLowerCase().indexOf(term.toLowerCase()) > -1; }).slice(0, 10); });
        };
        this.formatter2 = function (x) { return x.name; };
    }
    NgbdtypeheadBasic = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'ngbd-pagination',
            template: __webpack_require__("./src/app/pages/component/typehead/typehead.component.html"),
            providers: [WikipediaService]
        }),
        __metadata("design:paramtypes", [WikipediaService])
    ], NgbdtypeheadBasic);
    return NgbdtypeheadBasic;
}());



/***/ }),

/***/ "./src/app/pages/component/typehead/typehead.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TypeheadModule", function() { return TypeheadModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__typehead_component__ = __webpack_require__("./src/app/pages/component/typehead/typehead.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [{
        path: '',
        data: {
            title: 'Pagination page',
            urls: [{ title: 'Dashboard', url: '/' }, { title: 'Angular Component' }, { title: 'Pagination page' }]
        },
        component: __WEBPACK_IMPORTED_MODULE_4__typehead_component__["a" /* NgbdtypeheadBasic */]
    }];
var TypeheadModule = /** @class */ (function () {
    function TypeheadModule() {
    }
    TypeheadModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_http__["d" /* JsonpModule */],
                __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__["e" /* NgbModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* RouterModule */].forChild(routes)
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_4__typehead_component__["a" /* NgbdtypeheadBasic */]]
        })
    ], TypeheadModule);
    return TypeheadModule;
}());



/***/ })

});
//# sourceMappingURL=typehead.module.chunk.js.map
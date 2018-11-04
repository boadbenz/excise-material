webpackJsonp(["manage.module.0"],{

/***/ "./node_modules/@ngrx/store/@ngrx/store.es5.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Store */
/* unused harmony export select */
/* unused harmony export combineReducers */
/* unused harmony export compose */
/* unused harmony export createReducerFactory */
/* unused harmony export ActionsSubject */
/* unused harmony export INIT */
/* unused harmony export ReducerManager */
/* unused harmony export ReducerObservable */
/* unused harmony export ReducerManagerDispatcher */
/* unused harmony export UPDATE */
/* unused harmony export ScannedActionsSubject */
/* unused harmony export createSelector */
/* unused harmony export createSelectorFactory */
/* unused harmony export createFeatureSelector */
/* unused harmony export defaultMemoize */
/* unused harmony export defaultStateFn */
/* unused harmony export State */
/* unused harmony export StateObservable */
/* unused harmony export reduceState */
/* unused harmony export INITIAL_STATE */
/* unused harmony export _REDUCER_FACTORY */
/* unused harmony export REDUCER_FACTORY */
/* unused harmony export _INITIAL_REDUCERS */
/* unused harmony export INITIAL_REDUCERS */
/* unused harmony export STORE_FEATURES */
/* unused harmony export _INITIAL_STATE */
/* unused harmony export META_REDUCERS */
/* unused harmony export _STORE_REDUCERS */
/* unused harmony export _FEATURE_REDUCERS */
/* unused harmony export FEATURE_REDUCERS */
/* unused harmony export _FEATURE_REDUCERS_TOKEN */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoreModule; });
/* unused harmony export StoreRootModule */
/* unused harmony export StoreFeatureModule */
/* unused harmony export _initialStateFactory */
/* unused harmony export _createStoreReducers */
/* unused harmony export _createFeatureReducers */
/* unused harmony export ɵc */
/* unused harmony export ɵd */
/* unused harmony export ɵe */
/* unused harmony export ɵf */
/* unused harmony export ɵb */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_pluck__ = __webpack_require__("./node_modules/rxjs/_esm5/operator/pluck.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_distinctUntilChanged__ = __webpack_require__("./node_modules/rxjs/_esm5/operator/distinctUntilChanged.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_BehaviorSubject__ = __webpack_require__("./node_modules/rxjs/_esm5/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_scheduler_queue__ = __webpack_require__("./node_modules/rxjs/_esm5/scheduler/queue.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_observeOn__ = __webpack_require__("./node_modules/rxjs/_esm5/operator/observeOn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_operator_withLatestFrom__ = __webpack_require__("./node_modules/rxjs/_esm5/operator/withLatestFrom.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_operator_scan__ = __webpack_require__("./node_modules/rxjs/_esm5/operator/scan.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/_esm5/Subject.js");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();











/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var INIT = ('@ngrx/store/init');
var ActionsSubject = /** @class */ (function (_super) {
    __extends(ActionsSubject, _super);
    function ActionsSubject() {
        return _super.call(this, { type: INIT }) || this;
    }
    /**
     * @param {?} action
     * @return {?}
     */
    ActionsSubject.prototype.next = function (action) {
        if (typeof action === 'undefined') {
            throw new TypeError("Actions must be objects");
        }
        else if (typeof action.type === 'undefined') {
            throw new TypeError("Actions must have a type property");
        }
        _super.prototype.next.call(this, action);
    };
    /**
     * @return {?}
     */
    ActionsSubject.prototype.complete = function () {
        /* noop */
    };
    /**
     * @return {?}
     */
    ActionsSubject.prototype.ngOnDestroy = function () {
        _super.prototype.complete.call(this);
    };
    return ActionsSubject;
}(__WEBPACK_IMPORTED_MODULE_5_rxjs_BehaviorSubject__["a" /* BehaviorSubject */]));
ActionsSubject.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */] },
];
/** @nocollapse */
ActionsSubject.ctorParameters = function () { return []; };
var ACTIONS_SUBJECT_PROVIDERS = [ActionsSubject];
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var _INITIAL_STATE = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* InjectionToken */]('@ngrx/store Internal Initial State');
var INITIAL_STATE = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* InjectionToken */]('@ngrx/store Initial State');
var REDUCER_FACTORY = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* InjectionToken */]('@ngrx/store Reducer Factory');
var _REDUCER_FACTORY = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* InjectionToken */]('@ngrx/store Reducer Factory Provider');
var INITIAL_REDUCERS = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* InjectionToken */]('@ngrx/store Initial Reducers');
var _INITIAL_REDUCERS = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* InjectionToken */]('@ngrx/store Internal Initial Reducers');
var META_REDUCERS = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* InjectionToken */]('@ngrx/store Meta Reducers');
var STORE_FEATURES = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* InjectionToken */]('@ngrx/store Store Features');
var _STORE_REDUCERS = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* InjectionToken */]('@ngrx/store Internal Store Reducers');
var _FEATURE_REDUCERS = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* InjectionToken */]('@ngrx/store Internal Feature Reducers');
var _FEATURE_REDUCERS_TOKEN = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* InjectionToken */]('@ngrx/store Internal Feature Reducers Token');
var FEATURE_REDUCERS = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* InjectionToken */]('@ngrx/store Feature Reducers');
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?} reducers
 * @param {?=} initialState
 * @return {?}
 */
function combineReducers(reducers, initialState) {
    if (initialState === void 0) { initialState = {}; }
    var /** @type {?} */ reducerKeys = Object.keys(reducers);
    var /** @type {?} */ finalReducers = {};
    for (var /** @type {?} */ i = 0; i < reducerKeys.length; i++) {
        var /** @type {?} */ key = reducerKeys[i];
        if (typeof reducers[key] === 'function') {
            finalReducers[key] = reducers[key];
        }
    }
    var /** @type {?} */ finalReducerKeys = Object.keys(finalReducers);
    return function combination(state, action) {
        state = state === undefined ? initialState : state;
        var /** @type {?} */ hasChanged = false;
        var /** @type {?} */ nextState = {};
        for (var /** @type {?} */ i = 0; i < finalReducerKeys.length; i++) {
            var /** @type {?} */ key = finalReducerKeys[i];
            var /** @type {?} */ reducer = finalReducers[key];
            var /** @type {?} */ previousStateForKey = state[key];
            var /** @type {?} */ nextStateForKey = reducer(previousStateForKey, action);
            nextState[key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
        }
        return hasChanged ? nextState : state;
    };
}
/**
 * @template T
 * @param {?} object
 * @param {?} keyToRemove
 * @return {?}
 */
function omit(object, keyToRemove) {
    return Object.keys(object)
        .filter(function (key) { return key !== keyToRemove; })
        .reduce(function (result, key) {
        return Object.assign(result, (_a = {}, _a[key] = object[key], _a));
        var _a;
    }, {});
}
/**
 * @param {...?} functions
 * @return {?}
 */
function compose() {
    var functions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        functions[_i] = arguments[_i];
    }
    return function (arg) {
        if (functions.length === 0) {
            return arg;
        }
        var /** @type {?} */ last = functions[functions.length - 1];
        var /** @type {?} */ rest = functions.slice(0, -1);
        return rest.reduceRight(function (composed, fn) { return fn(composed); }, last(arg));
    };
}
/**
 * @template T, V
 * @param {?} reducerFactory
 * @param {?=} metaReducers
 * @return {?}
 */
function createReducerFactory(reducerFactory, metaReducers) {
    if (Array.isArray(metaReducers) && metaReducers.length > 0) {
        return compose.apply(null, metaReducers.concat([reducerFactory]));
    }
    return reducerFactory;
}
/**
 * @template T, V
 * @param {?=} metaReducers
 * @return {?}
 */
function createFeatureReducerFactory(metaReducers) {
    var /** @type {?} */ reducerFactory = Array.isArray(metaReducers) && metaReducers.length > 0
        ? compose.apply(void 0, metaReducers) : function (r) { return r; };
    return function (reducer, initialState) {
        reducer = reducerFactory(reducer);
        return function (state, action) {
            state = state === undefined ? initialState : state;
            return reducer(state, action);
        };
    };
}
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @abstract
 */
var ReducerObservable = /** @class */ (function (_super) {
    __extends(ReducerObservable, _super);
    function ReducerObservable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ReducerObservable;
}(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */]));
/**
 * @abstract
 */
var ReducerManagerDispatcher = /** @class */ (function (_super) {
    __extends(ReducerManagerDispatcher, _super);
    function ReducerManagerDispatcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ReducerManagerDispatcher;
}(ActionsSubject));
var UPDATE = ('@ngrx/store/update-reducers');
var ReducerManager = /** @class */ (function (_super) {
    __extends(ReducerManager, _super);
    /**
     * @param {?} dispatcher
     * @param {?} initialState
     * @param {?} reducers
     * @param {?} reducerFactory
     */
    function ReducerManager(dispatcher, initialState, reducers, reducerFactory) {
        var _this = _super.call(this, reducerFactory(reducers, initialState)) || this;
        _this.dispatcher = dispatcher;
        _this.initialState = initialState;
        _this.reducers = reducers;
        _this.reducerFactory = reducerFactory;
        return _this;
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    ReducerManager.prototype.addFeature = function (_a) {
        var reducers = _a.reducers, reducerFactory = _a.reducerFactory, metaReducers = _a.metaReducers, initialState = _a.initialState, key = _a.key;
        var /** @type {?} */ reducer = typeof reducers === 'function'
            ? createFeatureReducerFactory(metaReducers)(reducers, initialState)
            : createReducerFactory(reducerFactory, metaReducers)(reducers, initialState);
        this.addReducer(key, reducer);
    };
    /**
     * @param {?} __0
     * @return {?}
     */
    ReducerManager.prototype.removeFeature = function (_a) {
        var key = _a.key;
        this.removeReducer(key);
    };
    /**
     * @param {?} key
     * @param {?} reducer
     * @return {?}
     */
    ReducerManager.prototype.addReducer = function (key, reducer) {
        this.reducers = Object.assign({}, this.reducers, (_a = {}, _a[key] = reducer, _a));
        this.updateReducers(key);
        var _a;
    };
    /**
     * @param {?} key
     * @return {?}
     */
    ReducerManager.prototype.removeReducer = function (key) {
        this.reducers = /** @type {?} */ (omit(this.reducers, key) /*TODO(#823)*/);
        this.updateReducers(key);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    ReducerManager.prototype.updateReducers = function (key) {
        this.next(this.reducerFactory(this.reducers, this.initialState));
        this.dispatcher.next(/** @type {?} */ ({ type: UPDATE, feature: key }));
    };
    /**
     * @return {?}
     */
    ReducerManager.prototype.ngOnDestroy = function () {
        this.complete();
    };
    return ReducerManager;
}(__WEBPACK_IMPORTED_MODULE_5_rxjs_BehaviorSubject__["a" /* BehaviorSubject */]));
ReducerManager.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */] },
];
/** @nocollapse */
ReducerManager.ctorParameters = function () { return [
    { type: ReducerManagerDispatcher, },
    { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Inject */], args: [INITIAL_STATE,] },] },
    { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Inject */], args: [INITIAL_REDUCERS,] },] },
    { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Inject */], args: [REDUCER_FACTORY,] },] },
]; };
var REDUCER_MANAGER_PROVIDERS = [
    ReducerManager,
    { provide: ReducerObservable, useExisting: ReducerManager },
    { provide: ReducerManagerDispatcher, useExisting: ActionsSubject },
];
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ScannedActionsSubject = /** @class */ (function (_super) {
    __extends(ScannedActionsSubject, _super);
    function ScannedActionsSubject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    ScannedActionsSubject.prototype.ngOnDestroy = function () {
        this.complete();
    };
    return ScannedActionsSubject;
}(__WEBPACK_IMPORTED_MODULE_10_rxjs_Subject__["a" /* Subject */]));
ScannedActionsSubject.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */] },
];
/** @nocollapse */
ScannedActionsSubject.ctorParameters = function () { return []; };
var SCANNED_ACTIONS_SUBJECT_PROVIDERS = [
    ScannedActionsSubject,
];
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @abstract
 */
var StateObservable = /** @class */ (function (_super) {
    __extends(StateObservable, _super);
    function StateObservable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StateObservable;
}(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */]));
var State = /** @class */ (function (_super) {
    __extends(State, _super);
    /**
     * @param {?} actions$
     * @param {?} reducer$
     * @param {?} scannedActions
     * @param {?} initialState
     */
    function State(actions$, reducer$, scannedActions, initialState) {
        var _this = _super.call(this, initialState) || this;
        var /** @type {?} */ actionsOnQueue$ = __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_observeOn__["a" /* observeOn */].call(actions$, __WEBPACK_IMPORTED_MODULE_6_rxjs_scheduler_queue__["a" /* queue */]);
        var /** @type {?} */ withLatestReducer$ = __WEBPACK_IMPORTED_MODULE_8_rxjs_operator_withLatestFrom__["a" /* withLatestFrom */].call(actionsOnQueue$, reducer$);
        var /** @type {?} */ stateAndAction$ = __WEBPACK_IMPORTED_MODULE_9_rxjs_operator_scan__["a" /* scan */].call(withLatestReducer$, reduceState, { state: initialState });
        _this.stateSubscription = stateAndAction$.subscribe(function (_a) {
            var state = _a.state, action = _a.action;
            _this.next(state);
            scannedActions.next(action);
        });
        return _this;
    }
    /**
     * @return {?}
     */
    State.prototype.ngOnDestroy = function () {
        this.stateSubscription.unsubscribe();
        this.complete();
    };
    return State;
}(__WEBPACK_IMPORTED_MODULE_5_rxjs_BehaviorSubject__["a" /* BehaviorSubject */]));
State.INIT = INIT;
State.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */] },
];
/** @nocollapse */
State.ctorParameters = function () { return [
    { type: ActionsSubject, },
    { type: ReducerObservable, },
    { type: ScannedActionsSubject, },
    { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Inject */], args: [INITIAL_STATE,] },] },
]; };
/**
 * @template T, V
 * @param {?=} stateActionPair
 * @param {?=} __1
 * @return {?}
 */
function reduceState(stateActionPair, _a) {
    if (stateActionPair === void 0) { stateActionPair = { state: undefined }; }
    var action = _a[0], reducer = _a[1];
    var state = stateActionPair.state;
    return { state: reducer(state, action), action: action };
}
var STATE_PROVIDERS = [
    State,
    { provide: StateObservable, useExisting: State },
];
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Store = /** @class */ (function (_super) {
    __extends(Store, _super);
    /**
     * @param {?} state$
     * @param {?} actionsObserver
     * @param {?} reducerManager
     */
    function Store(state$, actionsObserver, reducerManager) {
        var _this = _super.call(this) || this;
        _this.actionsObserver = actionsObserver;
        _this.reducerManager = reducerManager;
        _this.source = state$;
        return _this;
    }
    /**
     * @param {?} pathOrMapFn
     * @param {...?} paths
     * @return {?}
     */
    Store.prototype.select = function (pathOrMapFn) {
        var paths = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            paths[_i - 1] = arguments[_i];
        }
        return select.apply(void 0, [pathOrMapFn].concat(paths))(this);
    };
    /**
     * @template R
     * @param {?} operator
     * @return {?}
     */
    Store.prototype.lift = function (operator) {
        var /** @type {?} */ store = new Store(this, this.actionsObserver, this.reducerManager);
        store.operator = operator;
        return store;
    };
    /**
     * @template V
     * @param {?} action
     * @return {?}
     */
    Store.prototype.dispatch = function (action) {
        this.actionsObserver.next(action);
    };
    /**
     * @param {?} action
     * @return {?}
     */
    Store.prototype.next = function (action) {
        this.actionsObserver.next(action);
    };
    /**
     * @param {?} err
     * @return {?}
     */
    Store.prototype.error = function (err) {
        this.actionsObserver.error(err);
    };
    /**
     * @return {?}
     */
    Store.prototype.complete = function () {
        this.actionsObserver.complete();
    };
    /**
     * @template State, Actions
     * @param {?} key
     * @param {?} reducer
     * @return {?}
     */
    Store.prototype.addReducer = function (key, reducer) {
        this.reducerManager.addReducer(key, reducer);
    };
    /**
     * @template Key
     * @param {?} key
     * @return {?}
     */
    Store.prototype.removeReducer = function (key) {
        this.reducerManager.removeReducer(key);
    };
    return Store;
}(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */]));
Store.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */] },
];
/** @nocollapse */
Store.ctorParameters = function () { return [
    { type: StateObservable, },
    { type: ActionsSubject, },
    { type: ReducerManager, },
]; };
var STORE_PROVIDERS = [Store];
/**
 * @template T, K
 * @param {?} pathOrMapFn
 * @param {...?} paths
 * @return {?}
 */
function select(pathOrMapFn) {
    var paths = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        paths[_i - 1] = arguments[_i];
    }
    return function selectOperator(source$) {
        var /** @type {?} */ mapped$;
        if (typeof pathOrMapFn === 'string') {
            mapped$ = __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_pluck__["a" /* pluck */].call.apply(__WEBPACK_IMPORTED_MODULE_3_rxjs_operator_pluck__["a" /* pluck */], [source$, pathOrMapFn].concat(paths));
        }
        else if (typeof pathOrMapFn === 'function') {
            mapped$ = __WEBPACK_IMPORTED_MODULE_2_rxjs_operator_map__["a" /* map */].call(source$, pathOrMapFn);
        }
        else {
            throw new TypeError("Unexpected type '" + typeof pathOrMapFn + "' in select operator," +
                " expected 'string' or 'function'");
        }
        return __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_distinctUntilChanged__["a" /* distinctUntilChanged */].call(mapped$);
    };
}
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function isEqualCheck(a, b) {
    return a === b;
}
/**
 * @param {?} t
 * @param {?=} isEqual
 * @return {?}
 */
function defaultMemoize(t, isEqual) {
    if (isEqual === void 0) { isEqual = isEqualCheck; }
    var /** @type {?} */ lastArguments = null;
    var /** @type {?} */ lastResult = null;
    /**
     * @return {?}
     */
    function reset() {
        lastArguments = null;
        lastResult = null;
    }
    /**
     * @return {?}
     */
    function memoized() {
        if (!lastArguments) {
            lastResult = t.apply(null, arguments);
            lastArguments = arguments;
            return lastResult;
        }
        for (var /** @type {?} */ i = 0; i < arguments.length; i++) {
            if (!isEqual(arguments[i], lastArguments[i])) {
                lastResult = t.apply(null, arguments);
                lastArguments = arguments;
                return lastResult;
            }
        }
        return lastResult;
    }
    return { memoized: memoized, reset: reset };
}
/**
 * @param {...?} input
 * @return {?}
 */
function createSelector() {
    var input = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        input[_i] = arguments[_i];
    }
    return createSelectorFactory(defaultMemoize).apply(void 0, input);
}
/**
 * @param {?} state
 * @param {?} selectors
 * @param {?} memoizedProjector
 * @return {?}
 */
function defaultStateFn(state, selectors, memoizedProjector) {
    var /** @type {?} */ args = selectors.map(function (fn) { return fn(state); });
    return memoizedProjector.memoized.apply(null, args);
}
/**
 * @param {?} memoize
 * @param {?=} options
 * @return {?}
 */
function createSelectorFactory(memoize, options) {
    if (options === void 0) { options = {
        stateFn: defaultStateFn,
    }; }
    return function () {
        var input = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            input[_i] = arguments[_i];
        }
        var /** @type {?} */ args = input;
        if (Array.isArray(args[0])) {
            var head = args[0], tail = args.slice(1);
            args = head.concat(tail);
        }
        var /** @type {?} */ selectors = args.slice(0, args.length - 1);
        var /** @type {?} */ projector = args[args.length - 1];
        var /** @type {?} */ memoizedSelectors = selectors.filter(function (selector) { return selector.release && typeof selector.release === 'function'; });
        var /** @type {?} */ memoizedProjector = memoize(function () {
            var selectors = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                selectors[_i] = arguments[_i];
            }
            return projector.apply(null, selectors);
        });
        var /** @type {?} */ memoizedState = defaultMemoize(function (state) {
            return options.stateFn.apply(null, [state, selectors, memoizedProjector]);
        });
        /**
         * @return {?}
         */
        function release() {
            memoizedState.reset();
            memoizedProjector.reset();
            memoizedSelectors.forEach(function (selector) { return selector.release(); });
        }
        return Object.assign(memoizedState.memoized, {
            release: release,
            projector: memoizedProjector.memoized,
        });
    };
}
/**
 * @template T
 * @param {?} featureName
 * @return {?}
 */
function createFeatureSelector(featureName) {
    return createSelector(function (state) { return state[featureName]; }, function (featureState) { return featureState; });
}
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var StoreRootModule = /** @class */ (function () {
    /**
     * @param {?} actions$
     * @param {?} reducer$
     * @param {?} scannedActions$
     * @param {?} store
     */
    function StoreRootModule(actions$, reducer$, scannedActions$, store) {
    }
    return StoreRootModule;
}());
StoreRootModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */], args: [{},] },
];
/** @nocollapse */
StoreRootModule.ctorParameters = function () { return [
    { type: ActionsSubject, },
    { type: ReducerObservable, },
    { type: ScannedActionsSubject, },
    { type: Store, },
]; };
var StoreFeatureModule = /** @class */ (function () {
    /**
     * @param {?} features
     * @param {?} featureReducers
     * @param {?} reducerManager
     * @param {?} root
     */
    function StoreFeatureModule(features, featureReducers, reducerManager, root) {
        this.features = features;
        this.featureReducers = featureReducers;
        this.reducerManager = reducerManager;
        features
            .map(function (feature, index) {
            var /** @type {?} */ featureReducerCollection = featureReducers.shift();
            var /** @type {?} */ reducers = ((featureReducerCollection))[index];
            return Object.assign({}, feature, { reducers: reducers, initialState: _initialStateFactory(feature.initialState) });
        })
            .forEach(function (feature) { return reducerManager.addFeature(feature); });
    }
    /**
     * @return {?}
     */
    StoreFeatureModule.prototype.ngOnDestroy = function () {
        var _this = this;
        this.features.forEach(function (feature) { return _this.reducerManager.removeFeature(feature); });
    };
    return StoreFeatureModule;
}());
StoreFeatureModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */], args: [{},] },
];
/** @nocollapse */
StoreFeatureModule.ctorParameters = function () { return [
    { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Inject */], args: [STORE_FEATURES,] },] },
    { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Inject */], args: [FEATURE_REDUCERS,] },] },
    { type: ReducerManager, },
    { type: StoreRootModule, },
]; };
var StoreModule = /** @class */ (function () {
    function StoreModule() {
    }
    /**
     * @param {?} reducers
     * @param {?=} config
     * @return {?}
     */
    StoreModule.forRoot = function (reducers, config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: StoreRootModule,
            providers: [
                { provide: _INITIAL_STATE, useValue: config.initialState },
                {
                    provide: INITIAL_STATE,
                    useFactory: _initialStateFactory,
                    deps: [_INITIAL_STATE],
                },
                { provide: _INITIAL_REDUCERS, useValue: reducers },
                {
                    provide: _STORE_REDUCERS,
                    useExisting: reducers instanceof __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* InjectionToken */] ? reducers : _INITIAL_REDUCERS,
                },
                {
                    provide: INITIAL_REDUCERS,
                    deps: [__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Injector */], _INITIAL_REDUCERS, [new __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Inject */](_STORE_REDUCERS)]],
                    useFactory: _createStoreReducers,
                },
                {
                    provide: META_REDUCERS,
                    useValue: config.metaReducers ? config.metaReducers : [],
                },
                {
                    provide: _REDUCER_FACTORY,
                    useValue: config.reducerFactory
                        ? config.reducerFactory
                        : combineReducers,
                },
                {
                    provide: REDUCER_FACTORY,
                    deps: [_REDUCER_FACTORY, META_REDUCERS],
                    useFactory: createReducerFactory,
                },
                ACTIONS_SUBJECT_PROVIDERS,
                REDUCER_MANAGER_PROVIDERS,
                SCANNED_ACTIONS_SUBJECT_PROVIDERS,
                STATE_PROVIDERS,
                STORE_PROVIDERS,
            ],
        };
    };
    /**
     * @param {?} featureName
     * @param {?} reducers
     * @param {?=} config
     * @return {?}
     */
    StoreModule.forFeature = function (featureName, reducers, config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: StoreFeatureModule,
            providers: [
                {
                    provide: STORE_FEATURES,
                    multi: true,
                    useValue: /** @type {?} */ ({
                        key: featureName,
                        reducerFactory: config.reducerFactory
                            ? config.reducerFactory
                            : combineReducers,
                        metaReducers: config.metaReducers ? config.metaReducers : [],
                        initialState: config.initialState,
                    }),
                },
                { provide: _FEATURE_REDUCERS, multi: true, useValue: reducers },
                {
                    provide: _FEATURE_REDUCERS_TOKEN,
                    multi: true,
                    useExisting: reducers instanceof __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* InjectionToken */] ? reducers : _FEATURE_REDUCERS,
                },
                {
                    provide: FEATURE_REDUCERS,
                    multi: true,
                    deps: [
                        __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Injector */],
                        _FEATURE_REDUCERS,
                        [new __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Inject */](_FEATURE_REDUCERS_TOKEN)],
                    ],
                    useFactory: _createFeatureReducers,
                },
            ],
        };
    };
    return StoreModule;
}());
StoreModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */], args: [{},] },
];
/** @nocollapse */
StoreModule.ctorParameters = function () { return []; };
/**
 * @param {?} injector
 * @param {?} reducers
 * @param {?} tokenReducers
 * @return {?}
 */
function _createStoreReducers(injector, reducers, tokenReducers) {
    return reducers instanceof __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* InjectionToken */] ? injector.get(reducers) : reducers;
}
/**
 * @param {?} injector
 * @param {?} reducerCollection
 * @param {?} tokenReducerCollection
 * @return {?}
 */
function _createFeatureReducers(injector, reducerCollection, tokenReducerCollection) {
    var /** @type {?} */ reducers = reducerCollection.map(function (reducer, index) {
        return reducer instanceof __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* InjectionToken */] ? injector.get(reducer) : reducer;
    });
    return reducers;
}
/**
 * @param {?} initialState
 * @return {?}
 */
function _initialStateFactory(initialState) {
    if (typeof initialState === 'function') {
        return initialState();
    }
    return initialState;
}
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

//# sourceMappingURL=store.es5.js.map


/***/ }),

/***/ "./node_modules/rxjs/_esm5/operator/observeOn.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = observeOn;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__operators_observeOn__ = __webpack_require__("./node_modules/rxjs/_esm5/operators/observeOn.js");
/** PURE_IMPORTS_START .._operators_observeOn PURE_IMPORTS_END */

/**
 *
 * Re-emits all notifications from source Observable with specified scheduler.
 *
 * <span class="informal">Ensure a specific scheduler is used, from outside of an Observable.</span>
 *
 * `observeOn` is an operator that accepts a scheduler as a first parameter, which will be used to reschedule
 * notifications emitted by the source Observable. It might be useful, if you do not have control over
 * internal scheduler of a given Observable, but want to control when its values are emitted nevertheless.
 *
 * Returned Observable emits the same notifications (nexted values, complete and error events) as the source Observable,
 * but rescheduled with provided scheduler. Note that this doesn't mean that source Observables internal
 * scheduler will be replaced in any way. Original scheduler still will be used, but when the source Observable emits
 * notification, it will be immediately scheduled again - this time with scheduler passed to `observeOn`.
 * An anti-pattern would be calling `observeOn` on Observable that emits lots of values synchronously, to split
 * that emissions into asynchronous chunks. For this to happen, scheduler would have to be passed into the source
 * Observable directly (usually into the operator that creates it). `observeOn` simply delays notifications a
 * little bit more, to ensure that they are emitted at expected moments.
 *
 * As a matter of fact, `observeOn` accepts second parameter, which specifies in milliseconds with what delay notifications
 * will be emitted. The main difference between {@link delay} operator and `observeOn` is that `observeOn`
 * will delay all notifications - including error notifications - while `delay` will pass through error
 * from source Observable immediately when it is emitted. In general it is highly recommended to use `delay` operator
 * for any kind of delaying of values in the stream, while using `observeOn` to specify which scheduler should be used
 * for notification emissions in general.
 *
 * @example <caption>Ensure values in subscribe are called just before browser repaint.</caption>
 * const intervals = Rx.Observable.interval(10); // Intervals are scheduled
 *                                               // with async scheduler by default...
 *
 * intervals
 * .observeOn(Rx.Scheduler.animationFrame)       // ...but we will observe on animationFrame
 * .subscribe(val => {                           // scheduler to ensure smooth animation.
 *   someDiv.style.height = val + 'px';
 * });
 *
 * @see {@link delay}
 *
 * @param {IScheduler} scheduler Scheduler that will be used to reschedule notifications from source Observable.
 * @param {number} [delay] Number of milliseconds that states with what delay every notification should be rescheduled.
 * @return {Observable<T>} Observable that emits the same notifications as the source Observable,
 * but with provided scheduler.
 *
 * @method observeOn
 * @owner Observable
 */
function observeOn(scheduler, delay) {
    if (delay === void 0) {
        delay = 0;
    }
    return Object(__WEBPACK_IMPORTED_MODULE_0__operators_observeOn__["b" /* observeOn */])(scheduler, delay)(this);
}
//# sourceMappingURL=observeOn.js.map


/***/ }),

/***/ "./node_modules/rxjs/_esm5/operator/pluck.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = pluck;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__operators_pluck__ = __webpack_require__("./node_modules/rxjs/_esm5/operators/pluck.js");
/** PURE_IMPORTS_START .._operators_pluck PURE_IMPORTS_END */

/**
 * Maps each source value (an object) to its specified nested property.
 *
 * <span class="informal">Like {@link map}, but meant only for picking one of
 * the nested properties of every emitted object.</span>
 *
 * <img src="./img/pluck.png" width="100%">
 *
 * Given a list of strings describing a path to an object property, retrieves
 * the value of a specified nested property from all values in the source
 * Observable. If a property can't be resolved, it will return `undefined` for
 * that value.
 *
 * @example <caption>Map every click to the tagName of the clicked target element</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var tagNames = clicks.pluck('target', 'tagName');
 * tagNames.subscribe(x => console.log(x));
 *
 * @see {@link map}
 *
 * @param {...string} properties The nested properties to pluck from each source
 * value (an object).
 * @return {Observable} A new Observable of property values from the source values.
 * @method pluck
 * @owner Observable
 */
function pluck() {
    var properties = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        properties[_i - 0] = arguments[_i];
    }
    return __WEBPACK_IMPORTED_MODULE_0__operators_pluck__["a" /* pluck */].apply(void 0, properties)(this);
}
//# sourceMappingURL=pluck.js.map


/***/ }),

/***/ "./node_modules/rxjs/_esm5/operator/scan.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = scan;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__operators_scan__ = __webpack_require__("./node_modules/rxjs/_esm5/operators/scan.js");
/** PURE_IMPORTS_START .._operators_scan PURE_IMPORTS_END */

/* tslint:enable:max-line-length */
/**
 * Applies an accumulator function over the source Observable, and returns each
 * intermediate result, with an optional seed value.
 *
 * <span class="informal">It's like {@link reduce}, but emits the current
 * accumulation whenever the source emits a value.</span>
 *
 * <img src="./img/scan.png" width="100%">
 *
 * Combines together all values emitted on the source, using an accumulator
 * function that knows how to join a new source value into the accumulation from
 * the past. Is similar to {@link reduce}, but emits the intermediate
 * accumulations.
 *
 * Returns an Observable that applies a specified `accumulator` function to each
 * item emitted by the source Observable. If a `seed` value is specified, then
 * that value will be used as the initial value for the accumulator. If no seed
 * value is specified, the first item of the source is used as the seed.
 *
 * @example <caption>Count the number of click events</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var ones = clicks.mapTo(1);
 * var seed = 0;
 * var count = ones.scan((acc, one) => acc + one, seed);
 * count.subscribe(x => console.log(x));
 *
 * @see {@link expand}
 * @see {@link mergeScan}
 * @see {@link reduce}
 *
 * @param {function(acc: R, value: T, index: number): R} accumulator
 * The accumulator function called on each source value.
 * @param {T|R} [seed] The initial accumulation value.
 * @return {Observable<R>} An observable of the accumulated values.
 * @method scan
 * @owner Observable
 */
function scan(accumulator, seed) {
    if (arguments.length >= 2) {
        return Object(__WEBPACK_IMPORTED_MODULE_0__operators_scan__["a" /* scan */])(accumulator, seed)(this);
    }
    return Object(__WEBPACK_IMPORTED_MODULE_0__operators_scan__["a" /* scan */])(accumulator)(this);
}
//# sourceMappingURL=scan.js.map


/***/ }),

/***/ "./node_modules/rxjs/_esm5/operator/withLatestFrom.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = withLatestFrom;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__operators_withLatestFrom__ = __webpack_require__("./node_modules/rxjs/_esm5/operators/withLatestFrom.js");
/** PURE_IMPORTS_START .._operators_withLatestFrom PURE_IMPORTS_END */

/* tslint:enable:max-line-length */
/**
 * Combines the source Observable with other Observables to create an Observable
 * whose values are calculated from the latest values of each, only when the
 * source emits.
 *
 * <span class="informal">Whenever the source Observable emits a value, it
 * computes a formula using that value plus the latest values from other input
 * Observables, then emits the output of that formula.</span>
 *
 * <img src="./img/withLatestFrom.png" width="100%">
 *
 * `withLatestFrom` combines each value from the source Observable (the
 * instance) with the latest values from the other input Observables only when
 * the source emits a value, optionally using a `project` function to determine
 * the value to be emitted on the output Observable. All input Observables must
 * emit at least one value before the output Observable will emit a value.
 *
 * @example <caption>On every click event, emit an array with the latest timer event plus the click event</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var timer = Rx.Observable.interval(1000);
 * var result = clicks.withLatestFrom(timer);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link combineLatest}
 *
 * @param {ObservableInput} other An input Observable to combine with the source
 * Observable. More than one input Observables may be given as argument.
 * @param {Function} [project] Projection function for combining values
 * together. Receives all values in order of the Observables passed, where the
 * first parameter is a value from the source Observable. (e.g.
 * `a.withLatestFrom(b, c, (a1, b1, c1) => a1 + b1 + c1)`). If this is not
 * passed, arrays will be emitted on the output Observable.
 * @return {Observable} An Observable of projected values from the most recent
 * values from each input Observable, or an array of the most recent values from
 * each input Observable.
 * @method withLatestFrom
 * @owner Observable
 */
function withLatestFrom() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    return __WEBPACK_IMPORTED_MODULE_0__operators_withLatestFrom__["a" /* withLatestFrom */].apply(void 0, args)(this);
}
//# sourceMappingURL=withLatestFrom.js.map


/***/ }),

/***/ "./src/app/actions/arrest/get-mas-productget-all.action.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ADD_PRODUCT; });
/* unused harmony export REMOVE_PRODUCT */
/* unused harmony export AddProduct */
/* unused harmony export RemoveProduct */
// Section 2
var ADD_PRODUCT = '[PRODUCT] Add';
var REMOVE_PRODUCT = '[PRODUCT] Remove';
// Section 3
var AddProduct = /** @class */ (function () {
    function AddProduct(payload) {
        this.payload = payload;
        this.type = ADD_PRODUCT;
    }
    return AddProduct;
}());

var RemoveProduct = /** @class */ (function () {
    function RemoveProduct(payload) {
        this.payload = payload;
        this.type = REMOVE_PRODUCT;
    }
    return RemoveProduct;
}());



/***/ }),

/***/ "./src/app/pages/arrests/allegation-modal/allegation-modal.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header bg-theme\">\r\n    <div class=\"row\">\r\n        <div class=\"col-lg-5\">\r\n            <h4 class=\"modal-title text-white\">รายละเอียดข้อกล่าวหา</h4>\r\n        </div>\r\n        <div class=\"col-lg-5 col-8\">\r\n            <form class=\"app-search\" #searchFrom=\"ngForm\" (ngSubmit)=\"onSearchByKey(searchFrom.value)\">\r\n                <input type=\"search\" name=\"Textsearch\" ngModel class=\"form-control form-control-sm\" \r\n                placeholder=\"ค้นหาฐานความผิดมาตรา/ฐานความผิด\">\r\n                <a class=\"srh-btn\" (click)=\"onSearchByKey(searchFrom.value)\" href=\"javaScript:void(0)\">\r\n                    <i class=\"ti-search\"></i>\r\n                </a>\r\n            </form>\r\n        </div>\r\n        <div class=\"col-lg-2 col-4 p-0\">\r\n            <a href=\"javaScript:void(0);\" class=\"text-white\">ค้นหาขั้นสูง</a>\r\n        </div>\r\n\r\n        <a href=\"javaScript:void(0);\" class=\"close text-white font-14\" aria-label=\"Close\" (click)=\"dismiss('Cross click')\">\r\n            <span aria-hidden=\"true\">\r\n                <i class=\" ti-close\"></i>\r\n            </span>\r\n        </a>\r\n    </div>\r\n</div>\r\n<div class=\"modal-body font-14\" [formGroup]=\"lawGroupFG\">\r\n    <div class=\"card unset-radius\">\r\n        <div class=\"card-body p-0\">\r\n            <table id=\"allegation\" class=\"table table-striped table-sm\">\r\n                <thead>\r\n                    <tr>\r\n                        <th class=\"text-center\"></th>\r\n                        <th class=\"text-center\">ลำดับ</th>\r\n                        <th>ฐานความผิดมาตรา</th>\r\n                        <th>ฐานความผิด</th>\r\n                        <th>บทกำหนดโทษ</th>\r\n                        <th>อัตราโทษ</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody formArrayName=\"LawGroupSection\">\r\n                    <tr *ngFor=\"let item of LawGroupSection.controls; let i=index;\" [formGroupName]=\"i\">\r\n                        <td class=\"text-center\">\r\n                            <input name=\"noticeRadio\" name=\"IsChecked\" \r\n                            formControlName=\"IsChecked\" type=\"radio\" id=\"td{{i}}\"  \r\n                            (change)=\"setIsChecked(i)\"\r\n                            class=\"with-gap radio-col-indigo\">\r\n                            <label for=\"td{{i}}\" class=\"m-0\"></label>\r\n                        </td>\r\n                        <td class=\"text-center\">{{item.get('RowId').value}}</td>\r\n                        <td>{{item.get('SectionNo').value}}</td>\r\n                        <td>{{item.get('SectionName').value}}</td>\r\n                        <td>GuiltBaseID ไม่ถูกส่งออกมา</td>\r\n                        <td>GuiltBaseName ไม่ถูกส่งออกมา</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <div class=\"card-footer card-footer-unset\">\r\n            <app-pagination-table \r\n                [TotalItems]=\"paginage.TotalItems\" \r\n                [CurrentPage]=\"paginage.CurrentPage\" \r\n                [PageSize]=\"paginage.PageSize\"\r\n                [RowsPerPageOptions]=\"paginage.RowsPerPageOptions\" \r\n                (onPageChange)=\"pageChanges($event)\">\r\n            </app-pagination-table>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"card unset-radius\">\r\n        <div class=\"card-body p-0\">\r\n            <table class=\"table table-striped table-sm\">\r\n                <thead>\r\n                    <tr>\r\n                        <th class=\"text-center\"></th>\r\n                        <th class=\"text-center\">ลำดับ</th>\r\n                        <th>ชื่อผู้กระทำความผิด</th>\r\n                        <th>รายละเอียดของกลาง</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody formArrayName=\"IndictmentLawbreaker\">\r\n                    <tr *ngFor=\"let item of IndictmentLawbreaker.controls; let i=index;\" [formGroupName]=\"i\">\r\n                        <td class=\"text-center\">\r\n                            <input type=\"checkbox\" formControlName=\"IsChecked\" [id]=\"'lb' + i\" [checked]=\"isCheckAll\"\r\n                            class=\"filled-in chk-col-indigo\">\r\n                            <label [for]=\"'lb' + i\" class=\"m-0\"></label>\r\n                        </td>\r\n                        <td class=\"text-center\">{{i+1}}</td>\r\n                        <td>\r\n                            <span *ngIf=\"item.get('EntityType').value == 0\">\r\n                                {{item.get('CompanyFullName').value}}\r\n                            </span>\r\n                            <span *ngIf=\"item.get('EntityType').value == 1\">\r\n                                {{item.get('LawbreakerFullName').value}}\r\n                            </span>\r\n                        </td>\r\n                        <td>\r\n                            <select formControlName=\"ProductID\" class=\"form-control form-control-sm\"\r\n                            (change)=\"selectItemPorduct($event, i)\">\r\n                                <option value=\"\" disabled selected></option>\r\n                                <option *ngFor=\"let p of product\" [value]=\"p.ProductID\">{{p.ProductDesc}}</option>\r\n                            </select>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"modal-footer\">\r\n    <div class=\"col-lg-2 col-4\">\r\n        <button type=\"button\" class=\"btn btn-block btn-themecolor\" (click)=\"close('Save click')\">บันทึก</button>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/pages/arrests/allegation-modal/allegation-modal.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/arrests/allegation-modal/allegation-modal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AllegationModalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_pagination__ = __webpack_require__("./src/app/config/pagination.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__arrests_service__ = __webpack_require__("./src/app/pages/arrests/arrests.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_preloader_preloader_component__ = __webpack_require__("./src/app/shared/preloader/preloader.component.ts");
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





var AllegationModalComponent = /** @class */ (function () {
    function AllegationModalComponent(arrestService, fb, preloader) {
        this.arrestService = arrestService;
        this.fb = fb;
        this.preloader = preloader;
        this.isOpen = false;
        this.isCheckAll = false;
        this.isCheck = false;
        this.paginage = __WEBPACK_IMPORTED_MODULE_1__config_pagination__["a" /* pagination */];
        this.lawGroupSection = new Array();
        this.lawbreaker = new Array();
        this.product = new Array();
        this.indicment = new Array();
        this.d = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.c = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.setIndicment = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.patchIndicment = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
    }
    Object.defineProperty(AllegationModalComponent.prototype, "LawGroupSection", {
        get: function () {
            return this.lawGroupFG.get('LawGroupSection');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AllegationModalComponent.prototype, "IndictmentLawbreaker", {
        get: function () {
            return this.lawGroupFG.get('IndictmentLawbreaker');
        },
        enumerable: true,
        configurable: true
    });
    AllegationModalComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _indictmentLawbreaker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.paginage.TotalItems = 0;
                        this.lawGroupFG = this.fb.group({
                            LawGroupSection: this.fb.array([]),
                            IndictmentLawbreaker: this.fb.array([])
                        });
                        _indictmentLawbreaker = new Array();
                        return [4 /*yield*/, this.lawbreaker.map(function (item) {
                                _indictmentLawbreaker.push({
                                    LawbreakerID: item.LawbreakerID.toString(),
                                    LawbreakerFullName: item.LawbreakerFullName,
                                    CompanyFullName: item.CompanyFullName,
                                    EntityType: item.EntityType,
                                    ProductID: null,
                                    ProductName: null,
                                    Qty: null,
                                    QtyUnit: null,
                                    Size: null,
                                    SizeUnit: null,
                                    Weight: null,
                                    WeightUnit: null,
                                    IsChecked: false
                                });
                            })];
                    case 1:
                        _a.sent();
                        this.setItemFormArray(_indictmentLawbreaker, 'IndictmentLawbreaker');
                        return [2 /*return*/];
                }
            });
        });
    };
    AllegationModalComponent.prototype.onSearchByKey = function (f) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.preloader.setShowPreloader(true);
                        return [4 /*yield*/, this.arrestService
                                .masLawGroupSectiongetByKeyword(f)
                                .then(function (res) { return _this.onSearchComplete(res); })];
                    case 1:
                        _a.sent();
                        this.preloader.setShowPreloader(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    AllegationModalComponent.prototype.onSearchComplete = function (list) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, list.map(function (item, i) {
                            item.RowId = i + 1;
                            item.IsChecked = false;
                            item.GuiltBaseID = item.GuiltBaseID == null ? i + 1 : item.GuiltBaseID;
                        })];
                    case 1:
                        _a.sent();
                        this.lawGroupSection = list;
                        this.paginage.TotalItems = list.length;
                        return [2 /*return*/];
                }
            });
        });
    };
    AllegationModalComponent.prototype.setItemFormArray = function (array, formControl) {
        var _this = this;
        if (array !== undefined && array.length) {
            var itemFGs = array.map(function (item) { return _this.fb.group(item); });
            var itemFormArray = this.fb.array(itemFGs);
            this.lawGroupFG.setControl(formControl, itemFormArray);
        }
    };
    AllegationModalComponent.prototype.setIsChecked = function (i) {
        this.LawGroupSection.value.map(function (item, index) {
            item.IsChecked = i == index ? true : false;
        });
    };
    AllegationModalComponent.prototype.selectItemPorduct = function (e, i) {
        var _product = this.product.find(function (item) { return item.ProductID == e.target.value; });
        this.IndictmentLawbreaker.at(i).patchValue({
            ProductID: e.target.value,
            ProductName: _product.ProductDesc,
            Qty: _product.Qty,
            QtyUnit: _product.QtyUnit,
            Size: null,
            SizeUnit: null,
            Weight: _product.NetVolume,
            WeightUnit: _product.NetVolumeUnit
        });
    };
    AllegationModalComponent.prototype.checkAll = function () {
        this.isCheckAll = !this.isCheckAll;
    };
    AllegationModalComponent.prototype.dismiss = function (e) {
        this.isEditIndicment = false;
        this.d.emit(e);
    };
    AllegationModalComponent.prototype.close = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _indictmentLawbreaker, _lawGroup, _indicmentArr;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _indictmentLawbreaker = [];
                        _lawGroup = this.LawGroupSection.value.filter(function (item) { return item.IsChecked; });
                        if (!_lawGroup.length)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.IndictmentLawbreaker.value
                                .filter(function (item) { return item.IsChecked; })
                                .map(function (item) {
                                _indictmentLawbreaker.push({
                                    LawbreakerID: item.LawbreakerID,
                                    LawbreakerFullName: item.LawbreakerFullName,
                                    CompanyFullName: item.CompanyFullName,
                                    EntityType: item.EntityType,
                                    ProductID: item.ProductID,
                                    ProductName: item.ProductName,
                                    Qty: item.Qty,
                                    QtyUnit: item.QtyUnit,
                                    Size: item.Size,
                                    SizeUnit: item.SizeUnit,
                                    Weight: item.Weight,
                                    WeightUnit: item.WeightUnit,
                                    IsChecked: false
                                });
                            })];
                    case 1:
                        _b.sent();
                        _indicmentArr = [];
                        return [4 /*yield*/, _lawGroup.map(function (lg) {
                                _indicmentArr.push({
                                    IndictmentID: lg.IndictmentID,
                                    IsProve: 1,
                                    IsActive: 1,
                                    GuiltBaseID: lg.GuiltBaseID,
                                    SectionNo: lg.SectionNo,
                                    SectionDesc1: lg.SectionDesc1,
                                    SectionName: lg.SectionName,
                                    IndictmentLawbreaker: _indictmentLawbreaker,
                                });
                            })];
                    case 2:
                        _b.sent();
                        if (this.isEditIndicment) {
                            (_a = this.patchIndicment).emit.apply(_a, _indicmentArr);
                            this.isEditIndicment = false;
                        }
                        else {
                            this.setIndicment.emit(_indicmentArr);
                        }
                        this.c.emit(e);
                        return [2 /*return*/];
                }
            });
        });
    };
    AllegationModalComponent.prototype.pageChanges = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.lawGroupSection.slice(event.startIndex - 1, event.endIndex)];
                    case 1:
                        list = _a.sent();
                        this.setItemFormArray(list, 'LawGroupSection');
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", String)
    ], AllegationModalComponent.prototype, "mode", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", Object)
    ], AllegationModalComponent.prototype, "lawbreaker", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", Object)
    ], AllegationModalComponent.prototype, "product", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", Object)
    ], AllegationModalComponent.prototype, "indicment", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", Boolean)
    ], AllegationModalComponent.prototype, "isEditIndicment", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
        __metadata("design:type", Object)
    ], AllegationModalComponent.prototype, "d", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
        __metadata("design:type", Object)
    ], AllegationModalComponent.prototype, "c", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
        __metadata("design:type", Object)
    ], AllegationModalComponent.prototype, "setIndicment", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
        __metadata("design:type", Object)
    ], AllegationModalComponent.prototype, "patchIndicment", void 0);
    AllegationModalComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-allegation-modal',
            template: __webpack_require__("./src/app/pages/arrests/allegation-modal/allegation-modal.component.html"),
            styles: [__webpack_require__("./src/app/pages/arrests/allegation-modal/allegation-modal.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__arrests_service__["a" /* ArrestsService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_4__shared_preloader_preloader_component__["b" /* PreloaderService */]])
    ], AllegationModalComponent);
    return AllegationModalComponent;
}());



/***/ }),

/***/ "./src/app/pages/arrests/allegation-modal/allegation-modal.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AllegationModalModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__allegation_modal_component__ = __webpack_require__("./src/app/pages/arrests/allegation-modal/allegation-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__component_pagination_table_pagination_table_module__ = __webpack_require__("./src/app/pages/component/pagination-table/pagination-table.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var AllegationModalModule = /** @class */ (function () {
    function AllegationModalModule() {
    }
    AllegationModalModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["k" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_4__component_pagination_table_pagination_table_module__["a" /* PaginationTableModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__allegation_modal_component__["a" /* AllegationModalComponent */]],
            exports: [__WEBPACK_IMPORTED_MODULE_2__allegation_modal_component__["a" /* AllegationModalComponent */]]
        })
    ], AllegationModalModule);
    return AllegationModalModule;
}());



/***/ }),

/***/ "./src/app/pages/arrests/arrest-document.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArrestDocument; });
/* unused harmony export ArrestDocumentFormControl */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");

var ArrestDocument = /** @class */ (function () {
    function ArrestDocument() {
        this.DocumentID = '';
        this.ReferenceCode = '';
        this.FilePath = '';
        this.DataSource = '';
        this.DocumentType = '';
        this.DocumentName = '';
    }
    return ArrestDocument;
}());

var ArrestDocumentFormControl = {
    DocumentID: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    ReferenceCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    FilePath: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    DataSource: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    DocumentType: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    DocumentName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    IsActive: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    IsNewItem: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null)
};


/***/ }),

/***/ "./src/app/pages/arrests/arrest-indictment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IndictmentLawbreaker */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArrestIndictment; });
/* unused harmony export ArrestIndicmentDetail */
var OpsArrestIndicmentDetailCollection = /** @class */ (function () {
    function OpsArrestIndicmentDetailCollection() {
    }
    return OpsArrestIndicmentDetailCollection;
}());
var IndictmentLawbreaker = /** @class */ (function () {
    function IndictmentLawbreaker() {
    }
    return IndictmentLawbreaker;
}());

var ArrestIndictment = /** @class */ (function () {
    function ArrestIndictment() {
    }
    return ArrestIndictment;
}());

var ArrestIndicmentDetail = /** @class */ (function () {
    function ArrestIndicmentDetail() {
    }
    return ArrestIndicmentDetail;
}());



/***/ }),

/***/ "./src/app/pages/arrests/arrest-locale.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ArrestLocale */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArrestLocaleFormControl; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");

var ArrestLocale = /** @class */ (function () {
    function ArrestLocale() {
    }
    return ArrestLocale;
}());

var ArrestLocaleFormControl = {
    IsArrest: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    ArrestCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["l" /* Validators */].required),
    GPS: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    Location: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */]("N/A"),
    Address: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["l" /* Validators */].required),
    Village: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["l" /* Validators */].required),
    Building: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["l" /* Validators */].required),
    Floor: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["l" /* Validators */].required),
    Room: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["l" /* Validators */].required),
    Alley: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["l" /* Validators */].required),
    Road: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["l" /* Validators */].required),
    SubDistrictCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["l" /* Validators */].required),
    SubDistrict: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["l" /* Validators */].required),
    DistrictCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["l" /* Validators */].required),
    District: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["l" /* Validators */].required),
    ProvinceCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["l" /* Validators */].required),
    Province: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["l" /* Validators */].required),
    ZipCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["l" /* Validators */].required),
    Policestation: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["l" /* Validators */].required),
    IsActive: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](1, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["l" /* Validators */].required),
    Region: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null)
};


/***/ }),

/***/ "./src/app/pages/arrests/arrest-product.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArrestProduct; });
/* unused harmony export ArrestProductDetail */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ArrestProductFormControl; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");

var ArrestProduct = /** @class */ (function () {
    function ArrestProduct() {
        this.ProductID = '';
        this.ProductType = '';
        this.ArrestCode = '';
        this.GroupCode = '';
        this.IsDomestic = '';
        this.ProductCode = '';
        this.BrandCode = '';
        this.BrandNameTH = '';
        this.BrandNameEN = '';
        this.SubBrandCode = '';
        this.SubBrandNameTH = '';
        this.SubBrandNameEN = '';
        this.ModelCode = '';
        this.ModelName = '';
        this.FixNo1 = '';
        this.DegreeCode = '';
        this.Degree = '';
        this.SizeCode = '';
        this.Size = '';
        this.SizeUnitCode = '';
        this.SizeUnitName = '';
        this.FixNo2 = '';
        this.SequenceNo = '';
        this.ProductDesc = '';
        this.CarNo = '';
        this.Qty = '';
        this.QtyUnit = '';
        this.NetVolume = '';
        this.NetVolumeUnit = '';
        this.NetWeight = "";
        this.NetWeightUnit = "";
        this.ProductFullName = '';
    }
    return ArrestProduct;
}());

var ArrestProductDetail = /** @class */ (function () {
    function ArrestProductDetail() {
    }
    return ArrestProductDetail;
}());

var ArrestProductFormControl = {
    ProductID: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["l" /* Validators */].required),
    ProductType: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    ArrestCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["l" /* Validators */].required),
    GroupCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    IsDomestic: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    ProductCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["l" /* Validators */].required),
    BrandCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["l" /* Validators */].required),
    BrandNameTH: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["l" /* Validators */].required),
    BrandNameEN: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    SubBrandCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    SubBrandNameTH: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    SubBrandNameEN: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    ModelCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    ModelName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    FixNo1: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    DegreeCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    Degree: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    SizeCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    Size: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    SizeUnitCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    SizeUnitName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    FixNo2: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    SequenceNo: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    ProductDesc: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    CarNo: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    Qty: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["l" /* Validators */].required),
    QtyUnit: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["l" /* Validators */].required),
    NetVolume: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    NetVolumeUnit: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    NetWeight: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    NetWeightUnit: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    IsActive: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](1, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["l" /* Validators */].required),
    IsNewItem: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["l" /* Validators */].required),
    ProductFullName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null)
};


/***/ }),

/***/ "./src/app/pages/arrests/arrest-staff.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArrestStaff; });
/* unused harmony export Contributor */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ArrestStaffFormControl; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");

var ArrestStaff = /** @class */ (function () {
    function ArrestStaff() {
        this.StaffID = '';
        this.ProgramCode = '';
        this.ProcessCode = '';
        this.ArrestCode = '';
        this.StaffCode = '';
        this.TitleName = '';
        this.FirstName = '';
        this.LastName = '';
        this.PositionCode = '';
        this.PositionName = '';
        this.PosLevel = '';
        this.PosLevelName = '';
        this.DepartmentCode = '';
        this.DepartmentName = '';
        this.DepartmentLevel = '';
        this.OfficeCode = '';
        this.OfficeName = '';
        this.OfficeShortName = '';
        this.ContributorCode = '';
        this.ContributorID = '';
        this.FullName = '';
    }
    return ArrestStaff;
}());

var Types = /** @class */ (function () {
    function Types() {
    }
    return Types;
}());
var Contributor = [
    {
        value: '1',
        text: 'contributor1'
    }, {
        value: '2',
        text: 'contributor2'
    }
];
var ArrestStaffFormControl = {
    StaffID: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    ProgramCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */]('XCS60-02-02'),
    ProcessCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */]('0001'),
    ArrestCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["l" /* Validators */].required),
    StaffCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["l" /* Validators */].required),
    TitleName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    FirstName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["l" /* Validators */].required),
    LastName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    PositionCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["l" /* Validators */].required),
    PositionName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    PosLevel: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    PosLevelName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    DepartmentCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    DepartmentName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    DepartmentLevel: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    OfficeCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    OfficeName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    OfficeShortName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    ContributorCode: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    IsActive: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    ContributorID: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    FullName: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](null),
    IsNewItem: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */](false)
};


/***/ }),

/***/ "./src/app/pages/arrests/manage/manage.component.html":
/***/ (function(module, exports) {

module.exports = "<app-step-wizard [sectionId]=\"2\"></app-step-wizard>\r\n\r\n<ng-template #printDocModal let-c=\"close\" let-d=\"dismiss\">\r\n    <app-print-doc-modal [ArrestCode]=\"arrestCode\" (c)=\"modal.close()\" (d)=\"modal.dismiss()\"></app-print-doc-modal>\r\n</ng-template>\r\n\r\n<form action=\"\" [formGroup]=\"arrestFG\">\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header unset-radius\">\r\n            <app-card-actions-collapse></app-card-actions-collapse>\r\n            <h4 class=\"card-title m-b-0\">ข้อมูลการจับกุม</h4>\r\n        </div>\r\n        <div class=\"card-body\">\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ใบแจ้งความนำจับ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"NoticeCode\"\r\n                    class=\"form-control form-control-sm\" [readonly]=\"showEditField\"  [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                    <a href=\"javaScript:void(0);\" class=\"more text-secondary\" (click)=\"!showEditField && openModal(noticelist)\" disabled>\r\n                        <i class=\"ti-more-alt\" aria-hidden=\"true\"></i>\r\n                    </a>\r\n                    <ng-template #noticelist let-c=\"close\" let-d=\"dismiss\">\r\n                        <app-modal-notice (c)=\"modal.close()\" (d)=\"modal.dismiss()\" (outputNotice)=\"setNoticeForm($event)\"></app-modal-notice>\r\n                    </ng-template>\r\n                </div>\r\n\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">หมายค้น :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"InvestigationSurveyDocument\" class=\"form-control form-control-sm\" \r\n                    [readonly]=\"showEditField\"  [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                    <a href=\"javaScript:void(0);\" class=\"more text-secondary\">\r\n                        <i class=\"ti-more-alt\" aria-hidden=\"true\"></i>\r\n                    </a>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ส.ส.2/27 :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"InvestigationCode\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\"  [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                    <a href=\"javaScript:void(0);\" class=\"more text-secondary\">\r\n                        <i class=\"ti-more-alt\" aria-hidden=\"true\"></i>\r\n                    </a>\r\n                </div>\r\n\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">เลขที่ใบงาน :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <input type=\"text\" formControlName=\"ArrestCode\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\"  [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                    <a href=\"javaScript:void(0);\" class=\"more text-secondary\">\r\n                        <i class=\"ti-more-alt\" aria-hidden=\"true\"></i>\r\n                    </a>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">วันที่เขียน :</label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\r\n                    <div class=\"form-group input-group\">\r\n                        <my-date-picker-th class=\"form-control form-control-sm unset-form-control\" \r\n                            [options]=\"myDatePickerOptions\" [disabled]=\"showEditField\" \r\n                            [ngClass]=\"{'ng-touched':isRequired}\" required\r\n                            formControlName=\"ArrestDate\"></my-date-picker-th>\r\n                        <label for=\"\">&nbsp;&nbsp;เวลา&nbsp;&nbsp;</label>\r\n                        <input type=\"text\" formControlName=\"ArrestTime\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\"  [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                    </div>\r\n                </div>\r\n\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">เขียนที่ :</label>\r\n                <div class=\"form-group col-lg-4 col-md-7 col-sm-8\">\r\n                    <ng-template #rt let-r=\"result\" let-t=\"term\">\r\n                        {{ r.OfficeShortName }}\r\n                    </ng-template>\r\n\r\n                    <input type=\"text\" class=\"form-control form-control-sm \"\r\n                        [ngClass]=\"{'ng-touched':isRequired}\"\r\n                        required\r\n                        [ngbTypeahead]=\"serachOffice\"\r\n                        [resultTemplate]=\"rt\"\r\n                        [readOnly]=\"showEditField\"\r\n                        [inputFormatter]=\"formatterOffice\" \r\n                        (selectItem)=\"selectItemOffice($event)\"\r\n                        [value]=\"arrestFG.get('ArrestStation').value\"\r\n                         />\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">วันที่เกิดเหตุ :</label>\r\n                <div class=\"col-lg-4 col-md-7 col-sm-8\">\r\n                    <div class=\"form-group input-group\" style=\"z-index: 1;\">\r\n                        <my-date-picker-th class=\"form-control form-control-sm unset-form-control\" \r\n                            [options]=\"myDatePickerOptions\" [disabled]=\"showEditField\" \r\n                            [ngClass]=\"{'ng-touched':isRequired}\" required\r\n                            formControlName=\"OccurrenceDate\"></my-date-picker-th>\r\n                        <label for=\"\">&nbsp;&nbsp;เวลา&nbsp;&nbsp;</label>\r\n                        <input type=\"text\" formControlName=\"OccurrenceTime\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\"  [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n\r\n        \r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header unset-radius\">\r\n            <app-card-actions-collapse></app-card-actions-collapse>\r\n            <h4 class=\"card-title m-b-0\">ผู้จับกุม</h4>\r\n        </div>\r\n        <div class=\"card-body\">\r\n            <div class=\"row form-group\">\r\n                <div class=\"col-lg-10 col-md-9 col-sm-8\"></div>\r\n                <div class=\"col-lg-2 col-md-3 col-sm-4\">\r\n                    <button type=\"button\" class=\"btn btn-block btn-themecolor\" [disabled]=\"showEditField\" (click)=\"addStaff()\">เพิ่มผู้ร่วมจับกุม</button>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"table-responsive\">\r\n                <table class=\"table table-sm table-striped table-set-border\">\r\n                    <thead>\r\n                        <tr>\r\n                            <th class=\"text-center\">ลำดับ</th>\r\n                            <th>ชื่อผู้จับกุม</th>\r\n                            <th>ตำแหน่ง</th>\r\n                            <th>หน่วยงาน</th>\r\n                            <th>ฐานะ</th>\r\n                            <th></th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody formArrayName=\"ArrestStaff\">\r\n                        <tr *ngFor=\"let item of ArrestStaff.controls; let i = index;\" [formGroupName]=\"i\">\r\n                            <td class=\"text-center\">{{i+1}}</td>\r\n                            <td>\r\n                                <ng-template #rt let-r=\"result\" let-t=\"term\">\r\n                                    {{ r.TitleName == null ? '' : r.TitleName }} \r\n                                    {{r.FirstName == null ? '' : r.FirstName}} \r\n                                    {{r.LastName == null ? '' : r.LastName}}\r\n                                </ng-template>\r\n            \r\n                                <input type=\"text\" class=\"form-control form-control-sm\"\r\n                                    [ngbTypeahead]=\"searchStaff\"\r\n                                    [resultTemplate]=\"rt\"\r\n                                    [readOnly]=\"showEditField\"\r\n                                    [inputFormatter]=\"formatterStaff\" \r\n                                    (selectItem)=\"selectItemStaff($event, i)\"\r\n                                    value=\"{{item.value.FullName}}\"\r\n                                    />\r\n                            </td>\r\n                            <td>\r\n                                <input type=\"text\" formControlName=\"PositionName\" class=\"form-control form-control-sm\" readonly >\r\n                            </td>\r\n                            <td>\r\n                                <input type=\"text\" formControlName=\"DepartmentName\" class=\"form-control form-control-sm\" readonly >\r\n                            </td>\r\n                            <td>\r\n                                <!-- <input type=\"text\" formControlName=\"ContributorID\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\" > -->\r\n                                <select formControlName=\"ContributorID\" class=\"form-control form-control-sm\" [attr.disabled]=\"showEditField ? '' : null\">\r\n                                    <option value=\"\" disabled selected></option>\r\n                                    <option *ngFor=\"let c of contributerType;\" [value]=\"c.value\">{{c.text}}</option>\r\n                                </select>\r\n                            </td>\r\n                            <td>\r\n                                <a class=\"text-warning\" href=\"javaScript:void(0);\" *ngIf=\"!showEditField\" (click)=\"deleteStaff(i, item.get('StaffID').value)\">\r\n                                    <i class=\"fa fa-trash-o fa-lg\"></i>\r\n                                </a>\r\n                            </td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n\r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header unset-radius\">\r\n            <app-card-actions-collapse></app-card-actions-collapse>\r\n            <h4 class=\"card-title m-b-0\">สถานที่เกิดเหตุ</h4>\r\n        </div>\r\n        <div class=\"card-body\" formArrayName=\"ArrestLocale\">\r\n            <div *ngFor=\"let item of ArrestLocale.controls; let i = index;\" [formGroupName]=\"i\">\r\n                <div class=\"row\">\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">บ้านเลขที่ :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-8 form-group\">\r\n                        <input type=\"text\" formControlName=\"Address\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\"  [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                    </div>\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">หมู่ที่ :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-8 form-group\">\r\n                        <input type=\"text\" formControlName=\"Village\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\"  [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                    </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">อาคาร/สถานที่ :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-8 form-group\">\r\n                        <input type=\"text\" formControlName=\"Building\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\"  [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                    </div>\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ห้อง :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-8 form-group\">\r\n                        <input type=\"text\" formControlName=\"Room\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\"  [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                    </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ชั้น :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-8 form-group\">\r\n                        <input type=\"text\" formControlName=\"Floor\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\"  [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                    </div>\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ตรอก/ซอย :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-8 form-group\">\r\n                        <input type=\"text\" formControlName=\"Alley\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\"  [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                    </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ถนน :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-8 form-group\">\r\n                        <input type=\"text\" formControlName=\"Road\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\"  [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                    </div>\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">ตำบล/อำเภอ/จังหวัด :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-8 form-group\">\r\n                        <ng-template #rt let-r=\"result\" let-t=\"term\">\r\n                            {{ r.SubdistrictNameTH }} {{r.DistrictNameTH}} {{r.ProvinceNameTH}}\r\n                        </ng-template>\r\n    \r\n                        <input type=\"text\" class=\"form-control form-control-sm\"\r\n                            [ngbTypeahead]=\"searchRegion\"\r\n                            [resultTemplate]=\"rt\"\r\n                            [readOnly]=\"showEditField\"\r\n                            [inputFormatter]=\"formatterRegion\" \r\n                            (selectItem)=\"selectItemLocaleRegion($event)\"\r\n                            value=\"{{item.value.Region}}\"\r\n                             [ngClass]=\"{'ng-touched':isRequired}\" required/>\r\n                        <!-- <input type=\"text\" formControlName=\"Region\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\"> -->\r\n                    </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">รหัสไปรษณีย์ :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-8 form-group\">\r\n                        <input type=\"text\" formControlName=\"ZipCode\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\"  [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                    </div>\r\n                    <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">สน.ท้องที่เกิดเหตุ :</label>\r\n                    <div class=\"col-lg-4 col-md-7 col-sm-8 form-group\">\r\n                        <input type=\"text\" formControlName=\"Policestation\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\"  [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header unset-radius\">\r\n            <app-card-actions-collapse></app-card-actions-collapse>\r\n            <h4 class=\"card-title m-b-0\">ผู้ต้องหา</h4>\r\n        </div>\r\n        <div class=\"card-body\">\r\n            <div class=\"row form-group\">\r\n                <div class=\"col-lg-10 col-md-9 col-sm-8\"></div>\r\n                <div class=\"col-lg-2 col-md-3 col-sm-4\">\r\n                    <button type=\"button\" class=\"btn btn-block btn-themecolor\" (click)=\"openModal(lawbreaker)\" [disabled]=\"showEditField\">เพิ่มผู้ต้องหา</button>\r\n                </div>\r\n\r\n                <ng-template #lawbreaker let-c=\"close\" let-d=\"dismiss\">\r\n                    <app-modal-lawbreaker (c)=\"modal.close()\" (d)=\"modal.dismiss()\" (lawbreakerEmit)=\"addLawbreaker($event)\">\r\n                        \r\n                    </app-modal-lawbreaker>\r\n                </ng-template>\r\n            </div>\r\n\r\n            <div class=\"table-responsive\">\r\n                <table class=\"table table-sm table-striped table-set-border\">\r\n                    <thead>\r\n                        <tr>\r\n                            <th class=\"text-center\">ลำดับ</th>\r\n                            <th>ประเภทผู้ต้องสงสัย</th>\r\n                            <th>ประเภทบุคคล</th>\r\n                            <th>หมายเลขอ้างอิง</th>\r\n                            <th>ชื่อ</th>\r\n                            <th>จำนวนครั้งกระทำผิด</th>\r\n                            <th></th>\r\n                            <th></th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody formArrayName=\"ArrestLawbreaker\">\r\n                        <tr *ngFor=\"let item of ArrestLawbreaker.controls; let i=index;\" [formGroupName]=\"i\">\r\n                            <td class=\"text-center\">{{i+1}}</td>\r\n                            <td>{{item.get('EntityTypeName').value}}</td>\r\n                            <td>{{item.get('LawbreakerTypeName').value}}</td>\r\n                            <td>{{item.get('LawbreakerRefID').value}}</td>\r\n                            <td>\r\n                                <span *ngIf=\"item.get('EntityType').value == 0\">\r\n                                    {{item.get('CompanyFullName').value}}\r\n                                </span>\r\n                                <span *ngIf=\"item.get('EntityType').value == 1\">\r\n                                    {{item.get('LawbreakerFullName').value}}\r\n                                </span>\r\n                            </td>\r\n                            <td>{{i+1}}</td>\r\n                            <td class=\"text-center\">\r\n                                <a href=\"javaScript:void(0);\" class=\"text-secondary\" *ngIf=\"!showEditField\" (click)=\"viewLawbreaker(item.get('LawbreakerID').value)\">\r\n                                    <i class=\"fa fa-eye fa-lg\"></i>\r\n                                </a>\r\n                            </td>\r\n                            <td>\r\n                                <a href=\"javaScript:void(0)\" class=\"text-warning\" *ngIf=\"!showEditField\" (click)=\"deleteLawbreaker(i, item.get('LawbreakerID').value)\">\r\n                                    <i class=\"fa fa-trash-o fa-lg\"></i>\r\n                                </a>\r\n                            </td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header unset-radius\">\r\n            <app-card-actions-collapse></app-card-actions-collapse>\r\n            <h4 class=\"card-title m-b-0\">ของกลาง</h4>\r\n        </div>\r\n        <div class=\"card-body\">\r\n            <div class=\"row form-group\">\r\n                <div class=\"col-lg-10 col-md-9 col-sm-8\"></div>\r\n                <div class=\"col-lg-2 col-md-3 col-sm-4\">\r\n                    <button type=\"button\" class=\"btn btn-block btn-themecolor\" [disabled]=\"showEditField\" (click)=\"addProduct()\">เพิ่มของกลาง</button>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"table-responsive\">\r\n                <table class=\"table table-sm table-striped table-set-border\">\r\n                    <thead>\r\n                        <tr>\r\n                            <th class=\"text-center\">ลำดับ</th>\r\n                            <th>ของกลาง</th>\r\n                            <th>จำนวน</th>\r\n                            <th>หน่วย</th>\r\n                            <th>ปริมาณสุทธิ</th>\r\n                            <th>หน่วย</th>\r\n                            <th></th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody formArrayName=\"ArrestProduct\">\r\n                        <tr *ngFor=\"let item of ArrestProduct.controls; let i=index;\" [formGroupName]=\"i\">\r\n                            <td class=\"text-center\">{{i+1}}</td>\r\n                            <td>\r\n                                <ng-template #rt let-r=\"result\" let-t=\"term\">\r\n                                    {{ r.SubBrandNameTH }} {{r.BrandNameTH}} {{r.ModelName}}\r\n                                </ng-template>\r\n                                <input type=\"text\" class=\"form-control form-control-sm\"\r\n                                    [readonly]=\"showEditField\"\r\n                                    [ngbTypeahead]=\"searchProduct\"\r\n                                    [resultTemplate]=\"rt\"\r\n                                    [inputFormatter]=\"formatterProduct\"\r\n                                    (selectItem)=\"selectItemProductItem($event, i)\" \r\n                                    value=\"{{item.value.ProductFullName}}\" />\r\n                            </td>\r\n                            <td>\r\n                                <input type=\"number\" formControlName=\"Qty\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                            </td>\r\n                            <td>\r\n                                <select formControlName=\"QtyUnit\" class=\"form-control form-control-sm\" [ngClass]=\"{'ng-touched':isRequired}\" required [attr.disabled]=\"showEditField ? '' : null\">\r\n                                    <option value=\"\" disabled selected></option>\r\n                                    <option *ngFor=\"let item of typeheadProductUnit;\" [value]=\"item.DutyUnitCode\">{{item.DutyCode}}</option>\r\n                                </select>\r\n                            </td>\r\n                            <td>\r\n                                <input type=\"number\" formControlName=\"NetWeight\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                            </td>\r\n                            <td>\r\n                                <select formControlName=\"NetWeightUnit\" class=\"form-control form-control-sm\" [ngClass]=\"{'ng-touched':isRequired}\" [attr.disabled]=\"showEditField ? '' : null\">\r\n                                    <option value=\"\" selected disabled></option>\r\n                                    <option *ngFor=\"let item of typeheadProductUnit;\" [value]=\"item.DutyUnitCode\">{{item.DutyCode}}</option>\r\n                                </select>\r\n                            </td>\r\n                            <td>\r\n                                <a href=\"javaScript:void(0)\" class=\"text-warning\" *ngIf=\"!showEditField\" (click)=\"deleteProduct(i, item.get('ProductID').value)\">\r\n                                    <i class=\"fa fa-trash-o fa-lg\"></i>\r\n                                </a>\r\n                            </td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header unset-radius\">\r\n            <app-card-actions-collapse></app-card-actions-collapse>\r\n            <h4 class=\"card-title m-b-0\">ข้อกล่าวหา</h4>\r\n        </div>\r\n        <div class=\"card-body\">\r\n            <div class=\"row form-group\">\r\n                <div class=\"col-lg-10 col-md-9 col-sm-8\"></div>\r\n                <div class=\"col-lg-2 col-md-3 col-sm-4\">\r\n                    <button type=\"button\" class=\"btn btn-block btn-themecolor\" [disabled]=\"showEditField\" (click)=\"openModal(allegation)\">เพิ่มข้อกล่าวหา</button>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"table-responsive\">\r\n                <table class=\"table table-sm table-striped table-set-border\">\r\n                    <thead>\r\n                        <tr>\r\n                            <th class=\"text-center\">ลำดับ</th>\r\n                            <th>ฐานความผิด</th>\r\n                            <th>ข้อกล่าวหา</th>\r\n                            <th>ชื่อผู้กระทำผิด</th>\r\n                            <th>รายระเอียดของกลาง</th>\r\n                            <th></th>\r\n                            <th></th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody formArrayName=\"ArrestIndictment\">\r\n                        <tr *ngFor=\"let item of ArrestIndictment.controls; let i=index;\" [formGroupName]=\"i\">\r\n                            <td class=\"text-center\">{{i+1}}</td>\r\n                            <td>{{item.get('SectionName').value}}</td>\r\n                            <td>{{item.get('GuiltBaseID').value}}</td>\r\n                            <td>\r\n                                <div *ngFor=\"let law of item.value.IndictmentLawbreaker;\">\r\n                                    <!-- <div *ngIf=\"law.EntityType == 0\">\r\n                                        {{law.CompanyFullName}}\r\n                                    </div> -->\r\n                                    <!-- <div *ngIf=\"law.EntityType == 1\"> -->\r\n                                        <div *ngIf=\"law\">{{law.LawbreakerFullName}}</div>\r\n                                    <!-- </div> -->\r\n                                </div>\r\n                            </td>\r\n                            <td>\r\n                                <div *ngFor=\"let law of item.value.IndictmentLawbreaker;\">\r\n                                    <div *ngIf=\"law\">{{law.ProductName}}</div>\r\n                                </div>\r\n                            </td>\r\n                            <td>\r\n                                <a href=\"javaScript:void(0)\" class=\"text-danger\" (click)=\"editAllegation(i ,allegation)\" *ngIf=\"!showEditField\">\r\n                                    <i class=\"fa fa-edit fa-lg\"></i>\r\n                                </a>\r\n                            </td>\r\n                            <td>\r\n                                <a href=\"javaScript:void(0)\" class=\"text-warning\" *ngIf=\"!showEditField\" (click)=\"deleteIndicment(i, item.get('IndictmentID').value)\">\r\n                                    <i class=\"fa fa-trash-o fa-lg\"></i>\r\n                                </a>\r\n                            </td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n\r\n                <ng-template #allegation let-c=\"close\" let-d=\"dismiss\">\r\n                    <app-allegation-modal (c)=\"modal.close()\" (d)=\"modal.dismiss()\" \r\n                    (patchIndicment)=\"patchIndicment($event)\"\r\n                    (setIndicment)=\"addIndicment($event)\"\r\n                    [mode]=\"mode\"\r\n                    [lawbreaker]=\"ArrestLawbreaker.value\"\r\n                    [product]=\"ArrestProduct.value\"\r\n                    [indicment]=\"indictmentModal\"  \r\n                    [isEditIndicment]=\"isEditIndicment\" \r\n                    ></app-allegation-modal>\r\n                </ng-template>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header unset-radius\">\r\n            <app-card-actions-collapse></app-card-actions-collapse>\r\n            <h4 class=\"card-title m-b-0\">รายละเอียดการจับกุม</h4>\r\n        </div>\r\n        <div class=\"card-body\">\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">พฤติกรรมในการจับ :</label>\r\n                <div class=\"col-lg-10 col-sm-8 form-group \">\r\n                    <textarea formControlName=\"Behaviour\" cols=\"\" rows=\"3\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\"  [ngClass]=\"{'ng-touched':isRequired}\" required></textarea>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">คำให้การของผู้ต้องหา :</label>\r\n                <div class=\"col-lg-10 col-sm-8 form-group \">\r\n                    <textarea formControlName=\"Testimony\" cols=\"\" rows=\"3\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\"  [ngClass]=\"{'ng-touched':isRequired}\" required></textarea>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <label for=\"\" class=\"col-lg-2 col-sm-4 control-label\">การแจ้งสิทธิ :</label>\r\n                <div class=\"col-lg-10 col-sm-8 form-group \">\r\n                    <textarea formControlName=\"Prompt\" cols=\"\" rows=\"3\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\"  [ngClass]=\"{'ng-touched':isRequired}\" required></textarea>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header unset-radius\">\r\n            <app-card-actions-collapse></app-card-actions-collapse>\r\n            <h4 class=\"card-title m-b-0\">เอกสารแนบภายใน</h4>\r\n        </div>\r\n        <div class=\"card-body\">\r\n            <div class=\"row form-group\">\r\n                <div class=\"col-lg-10 col-md-9 col-sm-8\"></div>\r\n                <div class=\"col-lg-2 col-md-3 col-sm-4\">\r\n                    <button type=\"button\" class=\"btn btn-block btn-themecolor\" [disabled]=\"showEditField\" (click)=\"addDocument()\">เพิ่มเอกสารแนบ</button>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"table-responsive\">\r\n                <table class=\"table table-sm table-striped table-set-border\">\r\n                    <thead>\r\n                        <tr>\r\n                            <th class=\"text-center\">ลำดับ</th>\r\n                            <th>ชื่อเอกสารแนบ</th>\r\n                            <th>ที่อยู่เอกสารแนบ</th>\r\n                            <th></th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody formArrayName=\"ArrestDocument\">\r\n                        <tr *ngFor=\"let item of ArrestDocument.controls; let i=index;\" [formGroupName]=\"i\">\r\n                            <td class=\"text-center\">{{i+1}}</td>\r\n                            <td>\r\n                                <input type=\"text\" formControlName=\"DocumentName\" class=\"form-control form-control-sm\" [readonly]=\"showEditField\">\r\n                            </td>\r\n                            <td>\r\n                                <div class=\"input-group\">\r\n                                    <input type=\"text\" class=\"form-control form-control-sm\" formControlName=\"FilePath\" style=\"border-right: 0;\"  [readonly]=\"showEditField\">\r\n                                    <div class=\"input-group-append\">\r\n                                        <input [id]=\"'arrestAttach'+i\" type=\"file\" (change)=\"changeArrestDoc($event, i)\" hidden [attr.disabled]=\"showEditField ? '' : null\">\r\n                                        <label [for]=\"'arrestAttach'+i\" class=\"input-group-text custom-file-upload text-secondary\">\r\n                                            <i class=\"ti-more-alt\"></i>\r\n                                        </label>\r\n                                    </div>\r\n                                </div>\r\n                            </td>\r\n                            <td>\r\n                                <a href=\"javaScript:void(0)\" class=\"text-warning\" *ngIf=\"!showEditField\" (click)=\"deleteDocument(i)\">\r\n                                    <i class=\"fa fa-trash-o fa-lg\"></i>\r\n                                </a>\r\n                            </td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</form>"

/***/ }),

/***/ "./src/app/pages/arrests/manage/manage.component.scss":
/***/ (function(module, exports) {

module.exports = ".more {\n  position: absolute;\n  right: 20px;\n  bottom: -4px; }\n"

/***/ }),

/***/ "./src/app/pages/arrests/manage/manage.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_header_navigation_navigation_service__ = __webpack_require__("./src/app/shared/header-navigation/navigation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__arrests_service__ = __webpack_require__("./src/app/pages/arrests/arrests.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__config_dateFormat__ = __webpack_require__("./src/app/config/dateFormat.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__arrest_staff__ = __webpack_require__("./src/app/pages/arrests/arrest-staff.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__config_message__ = __webpack_require__("./src/app/config/message.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__arrest_product__ = __webpack_require__("./src/app/pages/arrests/arrest-product.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__arrest_document__ = __webpack_require__("./src/app/pages/arrests/arrest-document.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__arrest_indictment__ = __webpack_require__("./src/app/pages/arrests/arrest-indictment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__shared_sidebar_sidebar_component__ = __webpack_require__("./src/app/shared/sidebar/sidebar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__arrest_locale__ = __webpack_require__("./src/app/pages/arrests/arrest-locale.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__shared_preloader_preloader_component__ = __webpack_require__("./src/app/shared/preloader/preloader.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_rxjs_add_operator_debounceTime__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/debounceTime.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/distinctUntilChanged.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_rxjs_add_observable_of__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_rxjs_add_operator_catch__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_rxjs_add_operator_do__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/do.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_rxjs_add_operator_switchMap__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__models__ = __webpack_require__("./src/app/models/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__prove_prove_service__ = __webpack_require__("./src/app/pages/prove/prove.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__config_dataString__ = __webpack_require__("./src/app/config/dataString.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__services_main_master_service__ = __webpack_require__("./src/app/services/main-master.service.ts");
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
    function ManageComponent(fb, activeRoute, modelService, navService, ngbModel, arrestService, proveService, router, sidebarService, preloader, mainMasterService) {
        var _this = this;
        this.fb = fb;
        this.activeRoute = activeRoute;
        this.modelService = modelService;
        this.navService = navService;
        this.ngbModel = ngbModel;
        this.arrestService = arrestService;
        this.proveService = proveService;
        this.router = router;
        this.sidebarService = sidebarService;
        this.preloader = preloader;
        this.mainMasterService = mainMasterService;
        this.programSpect = 'ILG60-03-02-00';
        this.myDatePickerOptions = __WEBPACK_IMPORTED_MODULE_6__config_dateFormat__["a" /* MyDatePickerOptions */];
        this.typeheadOffice = new Array();
        this.typeheadStaff = new Array();
        this.typeheadRegion = new Array();
        this.typeheadProduct = new Array();
        this.typeheadProductUnit = new Array();
        // typeheadNetVolumeUnit = new Array<MasDutyProductUnitModel>();
        this.lawbreakerType = __WEBPACK_IMPORTED_MODULE_22__models__["f" /* LawbreakerTypes */];
        this.entityType = __WEBPACK_IMPORTED_MODULE_22__models__["d" /* EntityTypes */];
        this.contributerType = __WEBPACK_IMPORTED_MODULE_22__models__["b" /* ContributorType */];
        this.searchProduct = function (text$) {
            return text$
                .debounceTime(200)
                .distinctUntilChanged()
                .map(function (term) { return term === '' ? []
                : _this.typeheadProduct
                    .filter(function (v) {
                    return (v.SubBrandNameTH && v.SubBrandNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        (v.BrandNameTH && v.BrandNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        (v.ModelName && v.ModelName.toLowerCase().indexOf(term.toLowerCase()) > -1);
                }).slice(0, 10); });
        };
        this.searchRegion = function (text3$) {
            return text3$
                .debounceTime(200)
                .distinctUntilChanged()
                .map(function (term) { return term === '' ? []
                : _this.typeheadRegion
                    .filter(function (v) {
                    return (v.SubdistrictNameTH && v.SubdistrictNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        (v.DistrictNameTH && v.DistrictNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        (v.ProvinceNameTH && v.ProvinceNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1);
                }).slice(0, 10); });
        };
        this.searchStaff = function (text3$) {
            return text3$
                .debounceTime(200)
                .distinctUntilChanged()
                .map(function (term) { return term === '' ? []
                : _this.typeheadStaff
                    .filter(function (v) {
                    return (v.TitleName && v.TitleName.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        (v.FirstName && v.FirstName.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        (v.LastName && v.LastName.toLowerCase().indexOf(term.toLowerCase()) > -1);
                }).slice(0, 10); });
        };
        this.serachOffice = function (text3$) {
            return text3$
                .debounceTime(200)
                .distinctUntilChanged()
                .map(function (term) { return term === '' ? []
                : _this.typeheadOffice
                    .filter(function (v) {
                    return (v.OfficeName && v.OfficeName.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        (v.OfficeShortName && v.OfficeShortName.toLowerCase().indexOf(term.toLowerCase()) > -1);
                }).slice(0, 10); });
        };
        this.formatterRegion = function (x) {
            return (x.SubdistrictNameTH || '') + " " + (x.DistrictNameTH || '') + " " + (x.ProvinceNameTH || '');
        };
        this.formatterProduct = function (x) {
            return (x.SubBrandNameTH || '') + " " + (x.BrandNameTH || '') + " " + (x.ModelName || '');
        };
        this.formatterStaff = function (x) {
            return (x.TitleName || '') + " " + (x.FirstName || '') + " " + (x.LastName || '');
        };
        this.formatterOffice = function (x) { return x.OfficeShortName; };
        // set false
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
        // set true
        this.navService.setNextPageButton(true);
        this.navService.setInnerTextNextPageButton("รับคำกล่าวโทษ");
    }
    Object.defineProperty(ManageComponent.prototype, "ArrestStaff", {
        get: function () {
            return this.arrestFG.get('ArrestStaff');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManageComponent.prototype, "ArrestLocale", {
        get: function () {
            return this.arrestFG.get('ArrestLocale');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManageComponent.prototype, "ArrestLawbreaker", {
        get: function () {
            return this.arrestFG.get('ArrestLawbreaker');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManageComponent.prototype, "ArrestProduct", {
        get: function () {
            return this.arrestFG.get('ArrestProduct');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManageComponent.prototype, "ArrestIndictment", {
        get: function () {
            return this.arrestFG.get('ArrestIndictment');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManageComponent.prototype, "ArrestDocument", {
        get: function () {
            return this.arrestFG.get('ArrestDocument');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManageComponent.prototype, "ArrestInictmentDetail", {
        get: function () {
            return this.arrestFG.get('ArrestInictmentDetail');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManageComponent.prototype, "ArrestProductDetail", {
        get: function () {
            return this.arrestFG.get('ArrestProductDetail');
        },
        enumerable: true,
        configurable: true
    });
    ManageComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.preloader.setShowPreloader(true);
                        this.sidebarService.setVersion('0.0.0.10');
                        this.active_route();
                        this.navigate_Service();
                        this.arrestFG = this.createForm();
                        return [4 /*yield*/, this.setStaffStore()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.setOfficeStore()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.setProductStore()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.setProductUnitStore()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.setRegionStore()];
                    case 5:
                        _a.sent();
                        this.preloader.setShowPreloader(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.ngOnDestroy = function () {
        // this.sub.unsubscribe();
        this.onCancelSubscribe.unsubscribe();
        this.onSaveSubscribe.unsubscribe();
        this.onDeleSubscribe.unsubscribe();
        this.onPrintSubscribe.unsubscribe();
        this.onNextPageSubscribe.unsubscribe();
    };
    ManageComponent.prototype.createForm = function () {
        var ArrestDate = this.mode == 'C' ? Object(__WEBPACK_IMPORTED_MODULE_6__config_dateFormat__["f" /* setDateMyDatepicker */])(new Date()) : null;
        var ArrestTime = this.mode == 'C' ? Object(__WEBPACK_IMPORTED_MODULE_6__config_dateFormat__["g" /* setZero */])((new Date).getHours()) + "." + Object(__WEBPACK_IMPORTED_MODULE_6__config_dateFormat__["g" /* setZero */])((new Date).getMinutes()) + " \u0E19." : null;
        // let OccurrenceDate = ArrestDate;
        return new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["d" /* FormGroup */]({
            ArrestCode: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](this.arrestCode, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["l" /* Validators */].required),
            ArrestDate: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](ArrestDate, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["l" /* Validators */].required),
            ArrestTime: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](ArrestTime, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["l" /* Validators */].required),
            OccurrenceDate: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](ArrestDate, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["l" /* Validators */].required),
            OccurrenceTime: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](ArrestTime, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["l" /* Validators */].required),
            ArrestStationCode: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["l" /* Validators */].required),
            ArrestStation: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["l" /* Validators */].required),
            HaveCulprit: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](0),
            Behaviour: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["l" /* Validators */].required),
            Testimony: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["l" /* Validators */].required),
            Prompt: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["l" /* Validators */].required),
            IsMatchNotice: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](null),
            ArrestDesc: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */]('N/A'),
            NoticeCode: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["l" /* Validators */].required),
            InvestigationSurveyDocument: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](null),
            InvestigationCode: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["l" /* Validators */].required),
            IsActive: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](1),
            ArrestStaff: this.fb.array([this.createStaffForm()]),
            ArrestLocale: this.fb.array([this.createLocalForm()]),
            ArrestLawbreaker: this.fb.array([]),
            ArrestProduct: this.fb.array([]),
            ArrestIndictment: this.fb.array([]),
            ArrestDocument: this.fb.array([])
        });
    };
    ManageComponent.prototype.createStaffForm = function () {
        __WEBPACK_IMPORTED_MODULE_7__arrest_staff__["b" /* ArrestStaffFormControl */].ArrestCode = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](this.arrestCode);
        return this.fb.group(__WEBPACK_IMPORTED_MODULE_7__arrest_staff__["b" /* ArrestStaffFormControl */]);
    };
    ManageComponent.prototype.createLocalForm = function () {
        __WEBPACK_IMPORTED_MODULE_13__arrest_locale__["a" /* ArrestLocaleFormControl */].ArrestCode = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](this.arrestCode);
        return this.fb.group(__WEBPACK_IMPORTED_MODULE_13__arrest_locale__["a" /* ArrestLocaleFormControl */]);
    };
    ManageComponent.prototype.createProductForm = function () {
        __WEBPACK_IMPORTED_MODULE_9__arrest_product__["b" /* ArrestProductFormControl */].ArrestCode = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](this.arrestCode);
        return this.fb.group(__WEBPACK_IMPORTED_MODULE_9__arrest_product__["b" /* ArrestProductFormControl */]);
    };
    // private createIndictment(): FormGroup {
    //     return this.fb.group(ArrestIndictmentFormControl)
    // }
    // private createLawbreaker(): FormGroup {
    //     return this.fb.group(ArrestLawbreakerFormControl);
    // }
    ManageComponent.prototype.setItemFormArray = function (array, formControl) {
        var _this = this;
        if (array !== undefined && array.length) {
            var itemFGs = array.map(function (item) { return _this.fb.group(item); });
            var itemFormArray = this.fb.array(itemFGs);
            this.arrestFG.setControl(formControl, itemFormArray);
        }
    };
    ManageComponent.prototype.active_route = function () {
        var _this = this;
        this.sub = this.activeRoute.params.subscribe(function (p) {
            _this.mode = p['mode'];
            if (p['mode'] === 'C') {
                // set false
                _this.navService.setPrintButton(false);
                _this.navService.setEditButton(false);
                _this.navService.setDeleteButton(false);
                _this.navService.setEditField(false);
                // set true
                _this.navService.setSaveButton(true);
                _this.navService.setCancelButton(true);
                _this.arrestCode = p['code'] == 'NEW' ? "TN-" + (new Date).getTime() : p['code'];
            }
            else if (p['mode'] === 'R') {
                // set false
                _this.navService.setSaveButton(false);
                _this.navService.setCancelButton(false);
                // set true
                _this.navService.setPrintButton(true);
                _this.navService.setEditButton(true);
                _this.navService.setDeleteButton(true);
                _this.navService.setEditField(true);
                if (p['code']) {
                    _this.arrestCode = p['code'];
                    _this.getByCon(p['code']);
                }
            }
        });
    };
    ManageComponent.prototype.navigate_Service = function () {
        var _this = this;
        this.navService.showFieldEdit.subscribe(function (p) {
            _this.showEditField = p.valueOf();
        });
        this.onSaveSubscribe = this.navService.onSave.subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
            var sDateCompare, eDateCompare;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!status) return [3 /*break*/, 2];
                        // set action save = false
                        return [4 /*yield*/, this.navService.setOnSave(false)];
                    case 1:
                        // set action save = false
                        _a.sent();
                        if (!this.arrestFG.valid) {
                            this.isRequired = true;
                            alert(__WEBPACK_IMPORTED_MODULE_8__config_message__["a" /* Message */].checkData);
                            return [2 /*return*/, false];
                        }
                        if (!this.ArrestLawbreaker.length) {
                            alert(__WEBPACK_IMPORTED_MODULE_8__config_message__["a" /* Message */].checkData);
                            return [2 /*return*/, false];
                        }
                        sDateCompare = Object(__WEBPACK_IMPORTED_MODULE_6__config_dateFormat__["d" /* getDateMyDatepicker */])(this.arrestFG.value.ArrestDate);
                        eDateCompare = Object(__WEBPACK_IMPORTED_MODULE_6__config_dateFormat__["d" /* getDateMyDatepicker */])(this.arrestFG.value.OccurrenceDate);
                        if (sDateCompare.valueOf() > eDateCompare.valueOf()) {
                            alert(__WEBPACK_IMPORTED_MODULE_8__config_message__["a" /* Message */].checkDate);
                            return [2 /*return*/, false];
                        }
                        this.arrestFG.value.ArrestDate = Object(__WEBPACK_IMPORTED_MODULE_6__config_dateFormat__["c" /* convertDateForSave */])(sDateCompare);
                        this.arrestFG.value.OccurrenceDate = Object(__WEBPACK_IMPORTED_MODULE_6__config_dateFormat__["c" /* convertDateForSave */])(eDateCompare);
                        this.arrestFG.value.ArrestTime = (new Date()).toISOString();
                        if (this.mode === 'C') {
                            this.onCreate();
                        }
                        else if (this.mode === 'R') {
                            this.onReviced();
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
        this.onDeleSubscribe = this.navService.onDelete.subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
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
        this.onCancelSubscribe = this.navService.onCancel.subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!status) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.navService.setOnCancel(false)];
                    case 1:
                        _a.sent();
                        this.router.navigate(['/arrest/list']);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
        this.onPrintSubscribe = this.navService.onPrint.subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
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
        this.onNextPageSubscribe = this.navService.onNextPage.subscribe(function (status) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!status) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.navService.setOnNextPage(false)];
                    case 1:
                        _a.sent();
                        this.router.navigate(['/lawsuit/manage', 'C']);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    };
    // private async setOfficeStore() {
    //     await this.arrestService.masOfficegetAll().then(res =>
    //         this.typeheadOffice = res
    //     )
    // }
    // private async setProductStore() {
    //     await this.arrestService.masProductgetAll().then(res => {
    //         this.typeheadProduct = res;
    //     })
    // }
    // private async setProductUnitStore() {
    //     await this.proveService.getProveProductUnit('').then(res => {
    //         this.typeheadQtyUnit = res;
    //         this.typeheadNetVolumeUnit = res;
    //     })
    // }
    // private async setStaffStore() {
    //     await this.arrestService.masStaffgetAll().then(res =>
    //         this.typeheadStaff = res
    //     )
    // }
    ManageComponent.prototype.setOfficeStore = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mainMasterService.masOfficeMaingetAll().then(function (res) {
                            return _this.typeheadOffice = res;
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.setStaffStore = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mainMasterService.masStaffMaingetAll().then(function (res) {
                            return _this.typeheadStaff = res;
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.setProductStore = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mainMasterService.masProductMaingetAll().then(function (res) {
                            _this.typeheadProduct = res;
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.setProductUnitStore = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mainMasterService.masDutyUnitMaingetAll().then(function (res) {
                            _this.typeheadProductUnit = res;
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.setRegionStore = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mainMasterService.masDistrictMaingetAll().then(function (res) {
                            res.map(function (prov) {
                                return prov.MasDistrict.map(function (dis) {
                                    return dis.MasSubDistrict.map(function (subdis) {
                                        _this.typeheadRegion.push({
                                            SubdistrictCode: subdis.SubdistrictCode,
                                            SubdistrictNameTH: subdis.SubdistrictNameTH,
                                            DistrictCode: dis.DistrictCode,
                                            DistrictNameTH: dis.DistrictNameTH,
                                            ProvinceCode: prov.ProvinceCode,
                                            ProvinceNameTH: prov.ProvinceNameTH,
                                            ZipCode: null
                                        });
                                    });
                                });
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.getByCon = function (code) {
        var _this = this;
        this.arrestService.getByCon(code).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
            var staff, lawbreaker, product, indictment;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.arrestFG.reset({
                            ArrestCode: res.ArrestCode,
                            ArrestDate: Object(__WEBPACK_IMPORTED_MODULE_6__config_dateFormat__["f" /* setDateMyDatepicker */])(new Date(res.ArrestDate)),
                            ArrestTime: res.ArrestTime,
                            OccurrenceDate: Object(__WEBPACK_IMPORTED_MODULE_6__config_dateFormat__["f" /* setDateMyDatepicker */])(new Date(res.OccurrenceDate)),
                            OccurrenceTime: res.OccurrenceTime,
                            ArrestStationCode: res.ArrestStationCode,
                            ArrestStation: res.ArrestStation,
                            HaveCulprit: res.HaveCulprit,
                            Behaviour: res.Behaviour,
                            Testimony: res.Testimony,
                            Prompt: res.Prompt,
                            IsMatchNotice: res.IsMatchNotice,
                            ArrestDesc: res.ArrestDesc,
                            NoticeCode: res.NoticeCode,
                            InvestigationSurveyDocument: res.InvestigationSurveyDocument,
                            InvestigationCode: res.InvestigationCode,
                            IsActive: res.IsActive
                        })];
                    case 1:
                        _a.sent();
                        res.ArrestLocale.map(function (item) {
                            item.ArrestCode = item.ArrestCode || code;
                            item.Region = item.SubDistrict + " " + item.District + " " + item.Province;
                        });
                        staff = res.ArrestStaff.filter(function (item) { return item.IsActive == 1; });
                        staff.map(function (item) {
                            item.FullName = "" + (item.TitleName == null ? '' : item.TitleName);
                            item.FullName += " " + (item.FirstName == null ? '' : item.FirstName);
                            item.FullName += " " + (item.LastName == null ? '' : item.LastName);
                            item.IsNewItem = false;
                            item.ContributorID = item.ContributorID;
                        });
                        lawbreaker = res.ArrestLawbreaker.filter(function (item) { return item.IsActive == 1; });
                        lawbreaker.map(function (item) {
                            item.LawbreakerFullName = "" + (item.LawbreakerTitleName == null ? '' : item.LawbreakerTitleName);
                            item.LawbreakerFullName += " " + (item.LawbreakerFirstName == null ? '' : item.LawbreakerFirstName);
                            item.LawbreakerFullName += " " + (item.LawbreakerMiddleName == null ? '' : item.LawbreakerMiddleName);
                            item.LawbreakerFullName += " " + (item.LawbreakerLastName == null ? '' : item.LawbreakerLastName);
                            item.CompanyFullName = "" + (item.CompanyTitle == null ? '' : item.CompanyTitle);
                            item.CompanyFullName += "" + (item.CompanyName == null ? '' : item.CompanyName);
                            item.EntityTypeName = _this.entityType.find(function (e) { return parseInt(e.value) == item.EntityType; }).text;
                            item.LawbreakerTypeName = _this.lawbreakerType.find(function (e) { return parseInt(e.value) == item.LawbreakerType; }).text;
                            item.IsNewItem = false;
                        });
                        product = res.ArrestProduct.filter(function (item) { return item.IsActive == 1; });
                        product.map(function (item) {
                            item.IsNewItem = false;
                            item.ProductFullName = "" + (item.SubBrandNameTH == null ? '' : item.SubBrandNameTH);
                            item.ProductFullName += " " + (item.BrandNameTH == null ? '' : item.BrandNameTH);
                            item.ProductFullName += " " + (item.ModelName == null ? '' : item.ModelName);
                        });
                        indictment = res.ArrestIndictment.filter(function (item) { return item.IsActive == 1; });
                        indictment.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                            var _IndictmentLawbreaker;
                            return __generator(this, function (_a) {
                                item.IsNewItem = false;
                                item.SectionName = item.SectionName ? item.SectionName : null;
                                _IndictmentLawbreaker = new Array();
                                // await item.OpsArrestIndicmentDetailCollection.map(a1 => {
                                //     let _lawbreaker = res.ArrestLawbreaker.filter(a2 => a2.LawbreakerID == a1.LawbreakerID);
                                //     _IndictmentLawbreaker.push({
                                //         LawbreakerID: a1.LawbreakerID.toString(),
                                //         LawbreakerFullName: _lawbreaker.length ? _lawbreaker[0].LawbreakerFullName : null,
                                //         CompanyFullName: _lawbreaker.length ? _lawbreaker[0].CompanyFullName : null,
                                //         EntityType: _lawbreaker.length ? _lawbreaker[0].EntityType : null,
                                //         ProductID: null,
                                //         ProductName: null,
                                //         Qty: null,
                                //         QtyUnit: null,
                                //         Size: null,
                                //         SizeUnit: null,
                                //         Weight: null,
                                //         WeightUnit: null,
                                //         IsChecked: false
                                //     })
                                // })
                                item.IndictmentLawbreaker = _IndictmentLawbreaker;
                                return [2 /*return*/];
                            });
                        }); });
                        return [4 /*yield*/, this.arrestService.getDocument(code).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var doc;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            doc = res.filter(function (item) { return item.IsActive == 1; });
                                            doc.map(function (item) { return item.IsNewItem = false; });
                                            return [4 /*yield*/, this.setItemFormArray(res, 'ArrestDocument')];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        this.setItemFormArray(staff, 'ArrestStaff');
                        this.setItemFormArray(res.ArrestLocale, 'ArrestLocale');
                        this.setItemFormArray(lawbreaker, 'ArrestLawbreaker');
                        this.setItemFormArray(product, 'ArrestProduct');
                        this.addIndicment(indictment);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    ManageComponent.prototype.onCreate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isSuccess;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.preloader.setShowPreloader(true);
                        console.log('====================================');
                        console.log(JSON.stringify(this.arrestFG.value));
                        console.log('====================================');
                        // ___1.บันทึกข้อมูลจับกุม
                        return [4 /*yield*/, this.arrestService.insAll(this.arrestFG.value).then(function (IsSuccess) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!IsSuccess) {
                                                isSuccess = false;
                                                return [2 /*return*/, false];
                                            }
                                            return [4 /*yield*/, this.saveIndictmentDetail().then(function (IsSuccess) { return isSuccess = IsSuccess; })];
                                        case 1:
                                            _a.sent();
                                            if (!isSuccess) {
                                                return [2 /*return*/];
                                            }
                                            this.ArrestDocument.value.map(function (doc) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: 
                                                        // insert Document
                                                        return [4 /*yield*/, this.arrestService.insDocument(doc).then(function (docIsSuccess) {
                                                                if (!docIsSuccess) {
                                                                    isSuccess = docIsSuccess;
                                                                    return;
                                                                }
                                                            }, function () { isSuccess = false; return false; })];
                                                        case 1:
                                                            // insert Document
                                                            _a.sent();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, function () { isSuccess = false; return; })];
                    case 1:
                        // ___1.บันทึกข้อมูลจับกุม
                        _a.sent();
                        if (isSuccess) {
                            this.onComplete();
                            alert(__WEBPACK_IMPORTED_MODULE_8__config_message__["a" /* Message */].saveComplete);
                            this.router.navigate(["/arrest/manage", 'R', this.arrestCode]);
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
    ManageComponent.prototype.saveIndictmentDetail = function () {
        return __awaiter(this, void 0, void 0, function () {
            var IsSuccess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // ___2. ดึงข้อมูการจับกุม ด้วยเลขที่ ArrestCode
                    return [4 /*yield*/, this.arrestService.getByCon(this.arrestCode).then(function (arrestRes) {
                            if (!arrestRes) {
                                IsSuccess = false;
                                return;
                            }
                            // ___3. ค้นหาข้อมูลภายใน ArrestIndictment
                            IsSuccess = true;
                            // arrestRes.ArrestIndictment.map(indictObj => {
                            //     // ข้อกล่าวหา
                            //     // ___4. เปรียบเทียบ รายการข้อกล่าวหาด้วย GuiltBaseID กับ res0.GuiltBaseID
                            //     this.ArrestIndictment.value.filter(item1 => indictObj.GuiltBaseID == item1.GuiltBaseID).map((item1) => {
                            //         // รายละเอียดข้อกล่าวหา
                            //         item1.ArrestIndictmentDetail.map(async indictD => {
                            //             // ___5. Set IndictmentID ให้กับ object IndicmentDetail
                            //             indictD.IndictmentID = indictObj.IndictmentID;
                            //             // ___6. บันทึก ArrestIndictmentDetail
                            //             await this.arrestService.indicmentDetailinsAll(indictD).then(async indictDIns => {
                            //                 if (!indictDIns) { IsSuccess = false; return false; }
                            //                 IsSuccess = true
                            //                 // ___7. ค้นหา indicmentDetail เพื่อดึงเอา indicmentDetailID มาใช้งาน
                            //                 await this.arrestService
                            //                     .indicmentgetByCon(indictD.IndictmentID.toString())
                            //                     .then(indictDetailGet => {
                            //                         debugger
                            //                         if (!indictDetailGet.length) return false;
                            //                         console.log(indictDetailGet);
                            //                         // รายละเอียดสินค้า
                            //                         indictD.ArrestProductDetail.map(productD => {
                            //                             console.log(productD);
                            //                             debugger
                            //                             // ___8. set IndictmentDetailID ให้กับ Object ProductDetail
                            //                             // productD.IndictmentDetailID = indictDetailGet.IndictmentDetailID
                            //                             // ___9.บันทึก ArrestProductDetail
                            //                             // this.arrestService.productDetailInsAll(productD).then(productDIns => console.log(productDIns));
                            //                         })
                            //                     }, (error) => { IsSuccess = false; console.error(error); return false; });
                            //             }, (error) => { IsSuccess = false; console.error(error); return false; });
                            //         })
                            //     })
                            // })
                        }, function () { IsSuccess = false; return false; })];
                    case 1:
                        // ___2. ดึงข้อมูการจับกุม ด้วยเลขที่ ArrestCode
                        _a.sent();
                        return [2 /*return*/, IsSuccess];
                }
            });
        });
    };
    ManageComponent.prototype.onReviced = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isSuccess;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.preloader.setShowPreloader(true);
                        console.log('====================================');
                        console.log(JSON.stringify(this.arrestFG.value));
                        console.log('====================================');
                        return [4 /*yield*/, this.arrestService.updByCon(this.arrestFG.value).then(function (_arrest) { return __awaiter(_this, void 0, void 0, function () {
                                var staff, lawbreaker, product, indicment, document;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!_arrest) {
                                                isSuccess = false;
                                                return [2 /*return*/];
                                            }
                                            return [4 /*yield*/, this.arrestService.localeupdByCon(this.ArrestLocale.at(0).value)
                                                    .then(function (IsSuccess) { return isSuccess = IsSuccess; }, function () { isSuccess = false; return false; })];
                                        case 1:
                                            _a.sent();
                                            if (!isSuccess)
                                                return [2 /*return*/, false];
                                            staff = this.ArrestStaff.value;
                                            staff.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            if (!item.IsNewItem) return [3 /*break*/, 2];
                                                            return [4 /*yield*/, this.arrestService.staffinsAll(item).then(function (_staff) {
                                                                    if (!_staff) {
                                                                        isSuccess = false;
                                                                        return;
                                                                    }
                                                                }, function () { isSuccess = false; return; })];
                                                        case 1:
                                                            _a.sent();
                                                            return [3 /*break*/, 4];
                                                        case 2: return [4 /*yield*/, this.arrestService.staffUpd(item).then(function (_staff) {
                                                                if (!_staff) {
                                                                    isSuccess = false;
                                                                    return;
                                                                }
                                                            }, function () { isSuccess = false; return; })];
                                                        case 3:
                                                            _a.sent();
                                                            _a.label = 4;
                                                        case 4: return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                            if (!isSuccess)
                                                return [2 /*return*/, false];
                                            lawbreaker = this.ArrestLawbreaker.value;
                                            lawbreaker.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            if (!item.IsNewItem) return [3 /*break*/, 2];
                                                            return [4 /*yield*/, this.arrestService.lawbreakerinsAll(item).then(function (_lawbreaker) {
                                                                    if (!_lawbreaker) {
                                                                        isSuccess = false;
                                                                        return;
                                                                    }
                                                                }, function () { isSuccess = false; return; })];
                                                        case 1:
                                                            _a.sent();
                                                            return [3 /*break*/, 4];
                                                        case 2: return [4 /*yield*/, this.arrestService.lawbreakerUpd(item).then(function (_lawbreaker) {
                                                                if (!_lawbreaker) {
                                                                    isSuccess = false;
                                                                    return;
                                                                }
                                                            }, function () { isSuccess = false; return; })];
                                                        case 3:
                                                            _a.sent();
                                                            _a.label = 4;
                                                        case 4: return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                            if (!isSuccess)
                                                return [2 /*return*/, false];
                                            product = this.ArrestProduct.value;
                                            product.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            if (!item.IsNewItem) return [3 /*break*/, 2];
                                                            return [4 /*yield*/, this.arrestService.productinsAll(item).then(function (_product) {
                                                                    if (!_product) {
                                                                        isSuccess = false;
                                                                        return;
                                                                    }
                                                                }, function () { isSuccess = false; return false; })];
                                                        case 1:
                                                            _a.sent();
                                                            return [3 /*break*/, 4];
                                                        case 2: return [4 /*yield*/, this.arrestService.productUpd(item).then(function (_product) {
                                                                if (!_product) {
                                                                    isSuccess = false;
                                                                    return;
                                                                }
                                                            }, function () { isSuccess = false; return false; })];
                                                        case 3:
                                                            _a.sent();
                                                            _a.label = 4;
                                                        case 4: return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                            if (!isSuccess)
                                                return [2 /*return*/, false];
                                            indicment = this.ArrestIndictment.value;
                                            indicment.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                                var _this = this;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            if (!item.IsNewItem) return [3 /*break*/, 2];
                                                            return [4 /*yield*/, this.arrestService.indicmentinsAll(item).then(function (_indict) { return __awaiter(_this, void 0, void 0, function () {
                                                                    return __generator(this, function (_a) {
                                                                        if (!_indict) {
                                                                            isSuccess = false;
                                                                            return [2 /*return*/];
                                                                        }
                                                                        return [2 /*return*/];
                                                                    });
                                                                }); }, function () { isSuccess = false; return false; })];
                                                        case 1:
                                                            _a.sent();
                                                            return [3 /*break*/, 4];
                                                        case 2: return [4 /*yield*/, this.arrestService.indictmentUpd(item).then(function (_indict) { return __awaiter(_this, void 0, void 0, function () {
                                                                return __generator(this, function (_a) {
                                                                    if (!_indict) {
                                                                        isSuccess = false;
                                                                        return [2 /*return*/];
                                                                    }
                                                                    return [2 /*return*/];
                                                                });
                                                            }); }, function () { isSuccess = false; return false; })];
                                                        case 3:
                                                            _a.sent();
                                                            _a.label = 4;
                                                        case 4: return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                            document = this.ArrestDocument.value;
                                            document.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            if (!item.IsNewItem) return [3 /*break*/, 2];
                                                            return [4 /*yield*/, this.arrestService.insDocument(item).then(function (docIsSuccess) {
                                                                    if (!docIsSuccess) {
                                                                        isSuccess = docIsSuccess;
                                                                        return;
                                                                    }
                                                                }, function () { isSuccess = false; return false; })];
                                                        case 1:
                                                            _a.sent();
                                                            return [3 /*break*/, 3];
                                                        case 2:
                                                            this.arrestService.updDocument(item).then(function (docIsSuccess) {
                                                                if (!docIsSuccess) {
                                                                    isSuccess = docIsSuccess;
                                                                    return;
                                                                }
                                                            }, function () { isSuccess = false; return; });
                                                            _a.label = 3;
                                                        case 3: return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, function () { isSuccess = false; return false; })];
                    case 1:
                        _a.sent();
                        if (isSuccess) {
                            alert(__WEBPACK_IMPORTED_MODULE_8__config_message__["a" /* Message */].saveComplete);
                            this.onComplete();
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
    ManageComponent.prototype.onDelete = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!confirm(__WEBPACK_IMPORTED_MODULE_8__config_message__["a" /* Message */].confirmAction)) return [3 /*break*/, 2];
                        this.preloader.setShowPreloader(true);
                        return [4 /*yield*/, this.arrestService.updDelete(this.arrestCode).then(function (IsSuccess) {
                                if (IsSuccess) {
                                    alert(__WEBPACK_IMPORTED_MODULE_8__config_message__["a" /* Message */].delComplete);
                                    _this.router.navigate(["/arrest/list"]);
                                }
                                else {
                                    alert(__WEBPACK_IMPORTED_MODULE_8__config_message__["a" /* Message */].delFail);
                                }
                            })];
                    case 1:
                        _a.sent();
                        this.preloader.setShowPreloader(false);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.onComplete = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // set true
                    return [4 /*yield*/, this.navService.setEditField(true)];
                    case 1:
                        // set true
                        _a.sent();
                        return [4 /*yield*/, this.navService.setEditButton(true)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.navService.setPrintButton(true)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.navService.setDeleteButton(true)];
                    case 4:
                        _a.sent();
                        // set false
                        return [4 /*yield*/, this.navService.setSaveButton(false)];
                    case 5:
                        // set false
                        _a.sent();
                        return [4 /*yield*/, this.navService.setCancelButton(false)];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.setNoticeForm = function (notice) {
        return __awaiter(this, void 0, void 0, function () {
            var locale, product, i;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.arrestFG.patchValue({ NoticeCode: notice.NoticeCode });
                        locale = notice.NoticeLocale[0];
                        product = notice.NoticeProduct;
                        this.ArrestLocale.at(0).reset(locale);
                        this.ArrestLocale.at(0).patchValue({
                            SubDistrictCode: locale.SubDistrictCode,
                            SubDistrict: locale.SubDistrict,
                            DistrictCode: locale.DistrictCode,
                            District: locale.District,
                            ProvinceCode: locale.ProvinceCode,
                            Province: locale.Province,
                            Region: locale.SubDistrict + " " + locale.District + " " + locale.Province,
                            ArrestCode: this.arrestCode,
                            IsArrest: 1
                        });
                        return [4 /*yield*/, product.map(function (item) {
                                item.ProductFullName = "" + (item.SubBrandNameTH == null ? '' : item.SubBrandNameTH);
                                item.ProductFullName += " " + (item.BrandNameTH == null ? '' : item.BrandNameTH);
                                item.ProductFullName += " " + (item.ModelName == null ? '' : item.ModelName);
                                item.NetWeight = item.NetWeight || null;
                                item.NetWeightUnit = item.NetWeightUnit || null;
                                _this.ArrestProduct.push(_this.fb.group(item));
                            })];
                    case 1:
                        _a.sent();
                        for (i = 0; i < this.ArrestProduct.length; i++) {
                            this.ArrestProduct.at(i).patchValue({
                                ArrestCode: this.arrestCode,
                                IsNewItem: true
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.openModal = function (e) {
        this.modal = this.modelService.open(e, { size: 'lg', centered: true });
        this.isEditIndicment = false;
        this.indicmentIndex = null;
    };
    ManageComponent.prototype.editAllegation = function (index, e) {
        this.modal = this.modelService.open(e, { size: 'lg', centered: true });
        this.indictmentModal = new __WEBPACK_IMPORTED_MODULE_11__arrest_indictment__["a" /* ArrestIndictment */]();
        this.isEditIndicment = true;
        this.indicmentIndex = index;
        // this.indictmentModal = this.ArrestIndictment.at(index).value;
    };
    ManageComponent.prototype.addLawbreaker = function (e) {
        var _this = this;
        e.map(function (item) {
            item.ArrestCode = _this.arrestCode;
            item.IsNewItem = true;
            item.LawbreakerRefID = item.LawbreakerID;
            _this.ArrestLawbreaker.push(_this.fb.group(item));
        });
    };
    ManageComponent.prototype.addStaff = function () {
        var lastIndex = this.ArrestStaff.length - 1;
        var item = new __WEBPACK_IMPORTED_MODULE_7__arrest_staff__["a" /* ArrestStaff */]();
        item.ArrestCode = this.arrestCode;
        item.IsNewItem = true;
        if (lastIndex < 0) {
            this.ArrestStaff.push(this.fb.group(item));
        }
        else {
            var lastDoc = this.ArrestStaff.at(lastIndex).value;
            if (lastDoc.StaffCode) {
                this.ArrestStaff.push(this.fb.group(item));
            }
        }
    };
    ManageComponent.prototype.addProduct = function () {
        var lastIndex = this.ArrestProduct.length - 1;
        var item = new __WEBPACK_IMPORTED_MODULE_9__arrest_product__["a" /* ArrestProduct */]();
        item.ArrestCode = this.arrestCode;
        item.IsNewItem = true;
        if (lastIndex < 0) {
            this.ArrestProduct.push(this.fb.group(item));
        }
        else {
            var lastDoc = this.ArrestProduct.at(lastIndex).value;
            if (lastDoc.ProductID) {
                this.ArrestProduct.push(this.fb.group(item));
            }
        }
    };
    ManageComponent.prototype.addIndicment = function (e) {
        var _this = this;
        e.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
            var indictDetail, FG;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        indictDetail = [];
                        return [4 /*yield*/, item.IndictmentLawbreaker.map(function (lb) {
                                var productDetail = [];
                                productDetail.push(_this.fb.group({
                                    ProductID: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](lb.ProductID, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["l" /* Validators */].required),
                                    IsProdcutCo: 1,
                                    Qty: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](lb.Qty, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["l" /* Validators */].required),
                                    QtyUnit: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](lb.QtyUnit, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["l" /* Validators */].required),
                                    Size: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](lb.Size),
                                    SizeUnit: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](lb.SizeUnit),
                                    Weight: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](lb.Weight),
                                    WeightUnit: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](lb.WeightUnit),
                                    MistreatRate: null,
                                    Fine: null,
                                    IndictmentDetailID: null
                                }));
                                indictDetail.push(_this.fb.group({
                                    IndictmentID: null,
                                    ArrestCode: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](_this.arrestCode, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["l" /* Validators */].required),
                                    LawbreakerID: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](lb.LawbreakerID, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["l" /* Validators */].required),
                                    GuiltBaseID: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](item.GuiltBaseID, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["l" /* Validators */].required),
                                    IsProve: 1,
                                    IsActive: 1,
                                    ArrestProductDetail: _this.fb.array(productDetail)
                                }));
                            })];
                    case 1:
                        _a.sent();
                        FG = this.fb.group({
                            ArrestCode: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](this.arrestCode, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["l" /* Validators */].required),
                            IndictmentID: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](item.IndictmentID),
                            IsProve: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](item.IsProve, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["l" /* Validators */].required),
                            IsActive: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](item.IsActive, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["l" /* Validators */].required),
                            GuiltBaseID: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](item.GuiltBaseID, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["l" /* Validators */].required),
                            SectionNo: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormControl */](item.SectionNo),
                            SectionDesc1: item.SectionDesc1,
                            SectionName: item.SectionName,
                            IndictmentLawbreaker: this.fb.array(item.IndictmentLawbreaker),
                            ArrestIndictmentDetail: this.fb.array(indictDetail),
                            IsNewItem: item.IsNewItem == false ? false : true
                        });
                        this.ArrestIndictment.push(FG);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    ManageComponent.prototype.patchIndicment = function (e) {
        var isNewItem = this.ArrestIndictment.at(this.indicmentIndex).value.isNewItem;
        this.ArrestIndictment.at(this.indicmentIndex).reset({
            IsNewItem: isNewItem || true,
            ArrestCode: this.arrestCode,
            IsProve: 1,
            IsActive: 1,
            GuiltBaseID: e.GuiltBaseID,
            SectionNo: e.SectionNo,
            SectionDesc1: e.SectionDesc1,
            SectionName: e.SectionName,
            IndictmentLawbreaker: this.fb.array(e.IndictmentLawbreaker),
        });
    };
    ManageComponent.prototype.addDocument = function () {
        var lastIndex = this.ArrestDocument.length - 1;
        var item = new __WEBPACK_IMPORTED_MODULE_10__arrest_document__["a" /* ArrestDocument */]();
        item.ReferenceCode = this.arrestCode;
        item.IsNewItem = true;
        if (lastIndex < 0) {
            this.ArrestDocument.push(this.fb.group(item));
        }
        else {
            var lastItem = this.ArrestDocument.at(lastIndex).value;
            if (lastItem.DocumentName && lastItem.FilePath) {
                this.ArrestDocument.push(this.fb.group(item));
            }
        }
    };
    ManageComponent.prototype.viewLawbreaker = function (id) {
        this.router.navigate(["/notice/lawbreaker", 'R', id]);
    };
    ManageComponent.prototype.deleteStaff = function (indexForm, staffId) {
        return __awaiter(this, void 0, void 0, function () {
            var isNewItem;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.mode === 'C')) return [3 /*break*/, 1];
                        this.ArrestStaff.removeAt(indexForm);
                        return [3 /*break*/, 3];
                    case 1:
                        if (!(this.mode === 'R')) return [3 /*break*/, 3];
                        isNewItem = this.ArrestStaff.at(indexForm).value.IsNewItem;
                        if (isNewItem) {
                            this.ArrestStaff.removeAt(indexForm);
                            return [2 /*return*/];
                        }
                        if (!confirm(__WEBPACK_IMPORTED_MODULE_8__config_message__["a" /* Message */].confirmAction)) return [3 /*break*/, 3];
                        this.preloader.setShowPreloader(true);
                        return [4 /*yield*/, this.arrestService.staffupdDelete(staffId).then(function (IsSuccess) {
                                if (IsSuccess) {
                                    alert(__WEBPACK_IMPORTED_MODULE_8__config_message__["a" /* Message */].delStaffComplete);
                                    _this.ArrestStaff.removeAt(indexForm);
                                }
                                else {
                                    alert(__WEBPACK_IMPORTED_MODULE_8__config_message__["a" /* Message */].delStaffFail);
                                }
                            })];
                    case 2:
                        _a.sent();
                        this.preloader.setShowPreloader(false);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.deleteLawbreaker = function (indexForm, lawbreakerId) {
        return __awaiter(this, void 0, void 0, function () {
            var isNewItem;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.mode === 'C')) return [3 /*break*/, 1];
                        this.ArrestLawbreaker.removeAt(indexForm);
                        return [3 /*break*/, 3];
                    case 1:
                        if (!(this.mode === 'R')) return [3 /*break*/, 3];
                        isNewItem = this.ArrestLawbreaker.at(indexForm).value.IsNewItem;
                        if (isNewItem) {
                            this.ArrestLawbreaker.removeAt(indexForm);
                            return [2 /*return*/];
                        }
                        if (!confirm(__WEBPACK_IMPORTED_MODULE_8__config_message__["a" /* Message */].confirmAction)) return [3 /*break*/, 3];
                        this.preloader.setShowPreloader(true);
                        return [4 /*yield*/, this.arrestService.lawbreakerupdDelete(lawbreakerId).then(function (IsSuccess) {
                                if (IsSuccess) {
                                    alert(__WEBPACK_IMPORTED_MODULE_8__config_message__["a" /* Message */].delLawbreakerComplete);
                                    _this.ArrestLawbreaker.removeAt(indexForm);
                                }
                                else {
                                    alert(__WEBPACK_IMPORTED_MODULE_8__config_message__["a" /* Message */].delLawbreakerFail);
                                }
                            })];
                    case 2:
                        _a.sent();
                        this.preloader.setShowPreloader(false);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.deleteProduct = function (indexForm, productId) {
        return __awaiter(this, void 0, void 0, function () {
            var isNewItem;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.mode === 'C')) return [3 /*break*/, 1];
                        this.ArrestProduct.removeAt(indexForm);
                        return [3 /*break*/, 3];
                    case 1:
                        if (!(this.mode === 'R')) return [3 /*break*/, 3];
                        isNewItem = this.ArrestProduct.at(indexForm).value.IsNewItem;
                        if (isNewItem) {
                            this.ArrestProduct.removeAt(indexForm);
                            return [2 /*return*/];
                        }
                        if (!confirm(__WEBPACK_IMPORTED_MODULE_8__config_message__["a" /* Message */].confirmAction)) return [3 /*break*/, 3];
                        this.preloader.setShowPreloader(true);
                        return [4 /*yield*/, this.arrestService.productupdDelete(productId).then(function (IsSuccess) {
                                if (IsSuccess) {
                                    alert(__WEBPACK_IMPORTED_MODULE_8__config_message__["a" /* Message */].delProductComplete);
                                    _this.ArrestProduct.removeAt(indexForm);
                                }
                                else {
                                    alert(__WEBPACK_IMPORTED_MODULE_8__config_message__["a" /* Message */].delProductFail);
                                }
                            })];
                    case 2:
                        _a.sent();
                        this.preloader.setShowPreloader(false);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.deleteIndicment = function (indexForm, indicmtmentId) {
        return __awaiter(this, void 0, void 0, function () {
            var isNewItem;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.mode === 'C')) return [3 /*break*/, 1];
                        this.ArrestIndictment.removeAt(indexForm);
                        return [3 /*break*/, 3];
                    case 1:
                        if (!(this.mode === 'R')) return [3 /*break*/, 3];
                        isNewItem = this.ArrestIndictment.at(indexForm).value.IsNewItem;
                        if (isNewItem) {
                            this.ArrestIndictment.removeAt(indexForm);
                            return [2 /*return*/];
                        }
                        if (!confirm(__WEBPACK_IMPORTED_MODULE_8__config_message__["a" /* Message */].confirmAction)) return [3 /*break*/, 3];
                        this.preloader.setShowPreloader(true);
                        return [4 /*yield*/, this.arrestService.indicmentupdDelete(indicmtmentId).then(function (IsSuccess) {
                                if (IsSuccess) {
                                    alert(__WEBPACK_IMPORTED_MODULE_8__config_message__["a" /* Message */].delIndicmentComplete);
                                    _this.ArrestIndictment.removeAt(indexForm);
                                }
                                else {
                                    alert(__WEBPACK_IMPORTED_MODULE_8__config_message__["a" /* Message */].delIndicmentFail);
                                }
                            })];
                    case 2:
                        _a.sent();
                        this.preloader.setShowPreloader(false);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.deleteDocument = function (id, indexForm) {
        return __awaiter(this, void 0, void 0, function () {
            var isNewItem;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.mode === 'C')) return [3 /*break*/, 1];
                        this.ArrestDocument.removeAt(indexForm);
                        return [3 /*break*/, 3];
                    case 1:
                        if (!(this.mode === 'R')) return [3 /*break*/, 3];
                        isNewItem = this.ArrestDocument.at(indexForm).value.IsNewItem;
                        if (isNewItem) {
                            this.ArrestDocument.removeAt(indexForm);
                            return [2 /*return*/];
                        }
                        if (!confirm(__WEBPACK_IMPORTED_MODULE_8__config_message__["a" /* Message */].confirmAction)) return [3 /*break*/, 3];
                        this.preloader.setShowPreloader(true);
                        return [4 /*yield*/, this.arrestService.documentUpDelete(id).then(function (isSuccess) {
                                if (isSuccess === true) {
                                    _this.ArrestDocument.removeAt(indexForm);
                                    alert(__WEBPACK_IMPORTED_MODULE_8__config_message__["a" /* Message */].delDocumentComplete);
                                }
                                else {
                                    alert(__WEBPACK_IMPORTED_MODULE_8__config_message__["a" /* Message */].delDocumentFail);
                                }
                            })];
                    case 2:
                        _a.sent();
                        this.preloader.setShowPreloader(false);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageComponent.prototype.selectItemLocaleRegion = function (e) {
        this.ArrestLocale.at(0).patchValue({
            SubDistrictCode: e.item.SubdistrictCode,
            SubDistrict: e.item.SubdistrictNameTH,
            DistrictCode: e.item.DistrictCode,
            District: e.item.DistrictNameTH,
            ProvinceCode: e.item.ProvinceCode,
            Province: e.item.ProvinceNameTH,
        });
    };
    ManageComponent.prototype.selectItemProductItem = function (e, i) {
        var isNewItem = this.ArrestProduct.at(i).value.isNewItem;
        this.ArrestProduct.at(i).reset(e.item);
        this.ArrestProduct.at(i).patchValue({
            IsNewItem: isNewItem || true,
            ArrestCode: this.arrestCode,
            GroupCode: e.item.GroupCode || 1,
            IsDomestic: e.item.IsDomestic || 1
        });
    };
    ManageComponent.prototype.selectItemStaff = function (e, i) {
        var isNewItem = this.ArrestStaff.at(i).value.isNewItem;
        this.ArrestStaff.at(i).reset(e.item);
        this.ArrestStaff.at(i).patchValue({
            IsNewItem: isNewItem || true,
            ProgramCode: this.programSpect,
            ProcessCode: '0002',
            ArrestCode: this.arrestCode,
            PositionCode: e.item.OperationPosCode,
            PositionName: e.item.OperationPosName,
            DepartmentCode: e.item.OfficeCode,
            DepartmentName: e.item.OfficeName,
            DepartmentLevel: e.item.DeptLevel,
            ContributorID: e.item.ContributorID || 2,
            ContributorCode: e.item.ContributorCode || 2
        });
    };
    ManageComponent.prototype.selectItemOffice = function (e) {
        this.arrestFG.patchValue({
            ArrestStationCode: e.item.OfficeCode,
            ArrestStation: e.item.OfficeShortName
        });
    };
    ManageComponent.prototype.changeArrestDoc = function (e, index) {
        var _this = this;
        var reader = new FileReader();
        var file = e.target.files[0];
        var fileName = file.name;
        var fileType = file.type;
        reader.readAsDataURL(file);
        reader.onload = function () {
            var dataSource = reader.result.split(',')[1];
            if (dataSource && dataSource !== undefined) {
                _this.ArrestDocument.at(index).patchValue({
                    ReferenceCode: _this.arrestCode,
                    FilePath: Object(__WEBPACK_IMPORTED_MODULE_24__config_dataString__["a" /* replaceFakePath */])(e.target.value),
                    IsActive: 1
                });
            }
        };
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", String)
    ], ManageComponent.prototype, "_noticeCode", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('printDocModal'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], ManageComponent.prototype, "printDocModel", void 0);
    ManageComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-manage',
            template: __webpack_require__("./src/app/pages/arrests/manage/manage.component.html"),
            styles: [__webpack_require__("./src/app/pages/arrests/manage/manage.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["d" /* NgbModal */],
            __WEBPACK_IMPORTED_MODULE_3__shared_header_navigation_navigation_service__["a" /* NavigationService */],
            __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["d" /* NgbModal */],
            __WEBPACK_IMPORTED_MODULE_4__arrests_service__["a" /* ArrestsService */],
            __WEBPACK_IMPORTED_MODULE_23__prove_prove_service__["a" /* ProveService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */],
            __WEBPACK_IMPORTED_MODULE_12__shared_sidebar_sidebar_component__["b" /* SidebarService */],
            __WEBPACK_IMPORTED_MODULE_14__shared_preloader_preloader_component__["b" /* PreloaderService */],
            __WEBPACK_IMPORTED_MODULE_25__services_main_master_service__["a" /* MainMasterService */]])
    ], ManageComponent);
    return ManageComponent;
}());



/***/ }),

/***/ "./src/app/pages/arrests/manage/manage.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageModule", function() { return ManageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__manage_component__ = __webpack_require__("./src/app/pages/arrests/manage/manage.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__component_card_actions_card_actions_module__ = __webpack_require__("./src/app/pages/component/card-actions/card-actions.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__allegation_modal_allegation_modal_module__ = __webpack_require__("./src/app/pages/arrests/allegation-modal/allegation-modal.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__component_step_wizard_step_wizard_module__ = __webpack_require__("./src/app/pages/component/step-wizard/step-wizard.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__arrests_service__ = __webpack_require__("./src/app/pages/arrests/arrests.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__print_doc_modal_print_doc_modal_module__ = __webpack_require__("./src/app/pages/arrests/print-doc-modal/print-doc-modal.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ngrx_store__ = __webpack_require__("./node_modules/@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__reducers_product_reducer__ = __webpack_require__("./src/app/reducers/product.reducer.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__component_modal_notice_modal_notice_module__ = __webpack_require__("./src/app/pages/component/modal-notice/modal-notice.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__component_modal_lawbreaker_modal_lawbreaker_module__ = __webpack_require__("./src/app/pages/component/modal-lawbreaker/modal-lawbreaker.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__prove_prove_service__ = __webpack_require__("./src/app/pages/prove/prove.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_mydatepicker_th__ = __webpack_require__("./node_modules/mydatepicker-th/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__services_main_master_service__ = __webpack_require__("./src/app/services/main-master.service.ts");
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
                { title: 'ค้นหางานจับกุม', url: '/arrest/list' },
                { title: 'จัดการข้อมูลบันทึกจับกุม' }
            ],
            codePage: 'XCS60-03-02-00',
            nextPage: { title: 'รับคำกล่าวโทษ', url: '/accusations/manage' }
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
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["k" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_14__ng_bootstrap_ng_bootstrap__["e" /* NgbModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_12__ngrx_store__["a" /* StoreModule */].forRoot({
                    productModule: __WEBPACK_IMPORTED_MODULE_13__reducers_product_reducer__["a" /* productReducer */]
                }),
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* RouterModule */].forChild(routes),
                __WEBPACK_IMPORTED_MODULE_16__component_modal_lawbreaker_modal_lawbreaker_module__["a" /* ModalLawbreakerModule */],
                __WEBPACK_IMPORTED_MODULE_4__component_card_actions_card_actions_module__["a" /* CardActionsModule */],
                __WEBPACK_IMPORTED_MODULE_6__allegation_modal_allegation_modal_module__["a" /* AllegationModalModule */],
                __WEBPACK_IMPORTED_MODULE_15__component_modal_notice_modal_notice_module__["a" /* ModalNoticeModule */],
                __WEBPACK_IMPORTED_MODULE_7__component_step_wizard_step_wizard_module__["a" /* StepWizardModule */],
                __WEBPACK_IMPORTED_MODULE_11__print_doc_modal_print_doc_modal_module__["a" /* PrintDocModalModule */],
                __WEBPACK_IMPORTED_MODULE_18_mydatepicker_th__["a" /* MyDatePickerTHModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__manage_component__["a" /* ManageComponent */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_8__arrests_service__["a" /* ArrestsService */], __WEBPACK_IMPORTED_MODULE_17__prove_prove_service__["a" /* ProveService */], __WEBPACK_IMPORTED_MODULE_19__services_main_master_service__["a" /* MainMasterService */]]
        })
    ], ManageModule);
    return ManageModule;
}());



/***/ }),

/***/ "./src/app/pages/arrests/print-doc-modal/print-doc-modal.component.html":
/***/ (function(module, exports) {

module.exports = "<form action=\"\" #form=\"ngForm\" (ngSubmit)=\"onPrint(form)\">\r\n    <div class=\"modal-header bg-theme\">\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-5\">\r\n                <h4 class=\"modal-title text-white\">พิมพ์เอกสาร</h4>\r\n            </div>\r\n            <a href=\"javaScript:void(0);\" class=\"close text-white font-14\" aria-label=\"Close\" (click)=\"dismiss('Cross click')\">\r\n                <span aria-hidden=\"true\">\r\n                    <i class=\" ti-close\"></i>\r\n                </span>\r\n            </a>\r\n        </div>\r\n    </div>\r\n    <div class=\"modal-body font-14\">\r\n\r\n        <div class=\"table-responsive\">\r\n            <table class=\"table table-sm table-striped table-set-border\">\r\n                <thead>\r\n                    <tr>\r\n                        <th></th>\r\n                        <th class=\"text-center\">ลำดับ</th>\r\n                        <th>ชื่อเอกสาร</th>\r\n                        <th>ประเภทเอกสาร</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr *ngFor=\"let item of printDoc; let i=index;\">\r\n                        <td class=\"text-center\">\r\n                            <input type=\"checkbox\" [id]=\"'td'+i\" name=\"ischeck\" ngModel class=\"filled-in chk-col-indigo\">\r\n                            <label [for]=\"'td'+i\" class=\"m-0\"></label>\r\n                        </td>\r\n                        <td class=\"text-center\">{{i+1}}</td>\r\n                        <td>{{item.DocName}}</td>\r\n                        <td>{{item.DocType}}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <div class=\"col-lg-2 col-4\">\r\n            <button type=\"submit\" class=\"btn btn-block btn-themecolor\">พิมพ์</button>\r\n        </div>\r\n    </div>\r\n</form>"

/***/ }),

/***/ "./src/app/pages/arrests/print-doc-modal/print-doc-modal.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/arrests/print-doc-modal/print-doc-modal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrintDocModalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
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
    function PrintDocModalComponent() {
        this.printDoc = [
            {
                DocName: 'บันทึกจับกุม (ส.ส. 2/39)',
                DocType: 'แบบฟอร์ม'
            }, {
                DocName: 'บันทึกจับกุม (ส.ส. 2/39)',
                DocType: 'เอกสารแนบภายใน'
            }
        ];
        this.d = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.c = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
    }
    PrintDocModalComponent.prototype.ngOnInit = function () {
    };
    PrintDocModalComponent.prototype.onPrint = function (f) {
    };
    PrintDocModalComponent.prototype.dismiss = function (e) {
        this.d.emit(e);
    };
    PrintDocModalComponent.prototype.close = function (e) {
        this.c.emit(e);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", String)
    ], PrintDocModalComponent.prototype, "ArrestCode", void 0);
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
            selector: 'app-print-doc-modal',
            template: __webpack_require__("./src/app/pages/arrests/print-doc-modal/print-doc-modal.component.html"),
            styles: [__webpack_require__("./src/app/pages/arrests/print-doc-modal/print-doc-modal.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], PrintDocModalComponent);
    return PrintDocModalComponent;
}());



/***/ }),

/***/ "./src/app/pages/arrests/print-doc-modal/print-doc-modal.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrintDocModalModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__print_doc_modal_component__ = __webpack_require__("./src/app/pages/arrests/print-doc-modal/print-doc-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
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
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["k" /* ReactiveFormsModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__print_doc_modal_component__["a" /* PrintDocModalComponent */]],
            exports: [__WEBPACK_IMPORTED_MODULE_2__print_doc_modal_component__["a" /* PrintDocModalComponent */]]
        })
    ], PrintDocModalModule);
    return PrintDocModalModule;
}());



/***/ }),

/***/ "./src/app/pages/component/modal-notice/modal-notice.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header bg-theme\">\r\n    <div class=\"row\">\r\n        <div class=\"col-lg-5\">\r\n            <h4 class=\"modal-title text-white\">อ้างอิงใบแจ้งความนำจับ</h4>\r\n        </div>\r\n        <div class=\"col-lg-5 col-sm-8\">\r\n            <form class=\"app-search\" #searchFrom=\"ngForm\" (ngSubmit)=\"onSearch(searchFrom.value)\">\r\n                <input type=\"search\" name=\"Textsearch\" ngModel class=\"form-control form-control-sm\">\r\n                <a href=\"javaScript:void(0);\" class=\"srh-btn\" (click)=\"onSearch(searchFrom.value)\">\r\n                    <i class=\"ti-search\"></i>\r\n                </a>\r\n            </form>\r\n        </div>\r\n        <div class=\"col-lg-2 col-sm-4 p-0\">\r\n            <a href=\"javaScript:void(0);\" (click)=\"toggle()\" class=\"text-white\">ค้นหาขั้นสูง</a>\r\n        </div>\r\n\r\n        <a href=\"javaScript:void(0);\" class=\"close text-white font-14\" aria-label=\"Close\" (click)=\"dismiss('Cross click')\">\r\n            <span aria-hidden=\"true\">\r\n                <i class=\" ti-close\"></i>\r\n            </span>\r\n        </a>\r\n    </div>\r\n</div>\r\n<div class=\"modal-body font-14\">\r\n    <div *ngIf=\"advSearch\" class=\"card card-outline-bluish unset-radius\">\r\n        <div class=\"card-header unset-radius\">\r\n            <div class=\"card-actions\">\r\n                <a class=\"\" (click)=\"toggle()\">\r\n                    <i class=\"fa fa-times\"></i>\r\n                </a>\r\n            </div>\r\n            <h4 class=\"card-title m-b-0\">ค้นหาขั้นสูง</h4>\r\n        </div>\r\n        <div class=\"card-body\">\r\n            <form class=\"form-horizontal\" *ngIf=\"advSearch\" #advForm=\"ngForm\" (ngSubmit)=\"onAdvSearch(advForm)\">\r\n                <div>\r\n                    <div class=\"row\">\r\n                        <label for=\"\" class=\"col-lg-2 col-sm-3\">เลขที่ใบแจ้งความ :</label>\r\n                        <div class=\"col-lg-4 col-md-7 col-sm-9\">\r\n                            <div class=\"form-group\">\r\n                                <input type=\"text\" name=\"NoticeCode\" ngModel class=\"form-control form-control-sm\" [ngClass]=\"{'ng-touched':isRequired}\" required>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <label for=\"\" class=\"col-lg-2 col-sm-3\">วันที่รับแจ้งความ :</label>\r\n                        <div class=\"col-lg-4 col-md-7 col-sm-9\">\r\n                            <div class=\"form-group input-group\">\r\n                                <input type=\"date\" name=\"DateStartFrom\" ngModel class=\"form-control form-control-sm\" placeholder=\"วว/ดด/ปปปป\" [ngClass]=\"{'ng-touched':isRequired}\"\r\n                                    required>\r\n\r\n                                <label for=\"\">&nbsp; ถึง &nbsp;</label>\r\n\r\n                                <input type=\"date\" name=\"DateStartTo\" ngModel class=\"form-control form-control-sm\" placeholder=\"วว/ดด/ปปปป\" [ngClass]=\"{'ng-touched':isRequired}\"\r\n                                    required>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                        <label for=\"\" class=\"col-lg-2 col-sm-3\">ชื่อผู้รับแจ้ง :</label>\r\n                        <div class=\"col-lg-4 col-md-7 col-sm-9\">\r\n                            <div class=\"form-group\">\r\n                                <input type=\"text\" name=\"StaffName\" ngModel class=\"form-control form-control-sm\" placeholder=\"\" [ngClass]=\"{'ng-touched':isRequired}\"\r\n                                    required>\r\n                            </div>\r\n                        </div>\r\n                        <label for=\"\" class=\"col-lg-2 col-sm-3\">หน่วยงาน :</label>\r\n                        <div class=\"col-lg-4 col-md-7 col-sm-9\">\r\n                            <div class=\"form-group\">\r\n                                <input type=\"text\" name=\"DepartmentName\" ngModel class=\"form-control form-control-sm\" placeholder=\"\" [ngClass]=\"{'ng-touched':isRequired}\"\r\n                                    required>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                        <label for=\"\" class=\"col-lg-2 col-sm-3\">ผู้ต้องสงสัย :</label>\r\n                        <div class=\"col-lg-4 col-md-7 col-sm-9\">\r\n                            <div class=\"form-group\">\r\n                                <input type=\"text\" name=\"SuspectName\" ngModel class=\"form-control form-control-sm\" placeholder=\"\" [ngClass]=\"{'ng-touched':isRequired}\"\r\n                                    required>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"row form-group\">\r\n                        <div class=\"col-lg-10 col-8\"></div>\r\n                        <div class=\"col-lg-2 col-4\">\r\n                            <button type=\"submit\" class=\"btn btn-block btn-themecolor\">ค้นข้อมูล</button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n    <div class=\"card  unset-radius\">\r\n        <div class=\"card-body p-0\">\r\n            <div class=\"table-responsive table-sm table-striped\">\r\n                <table #noticeTable class=\"table\" [formGroup]=\"noticeFG\">\r\n                    <thead>\r\n                        <tr>\r\n                            <th class=\"text-center\"></th>\r\n                            <th class=\"text-center\">ลำดับ</th>\r\n                            <th>เลขที่ใบแจ้งความ</th>\r\n                            <th>วันที่แจ้งความ</th>\r\n                            <th>ผู้รับแจ้ง</th>\r\n                            <th>หน่วยงาน</th>\r\n                            <th>ผู้ต้องสงสัย</th>\r\n                            <th></th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody formArrayName=\"NoticeList\">\r\n                        <tr *ngFor=\"let item of NoticeList.controls; let i=index;\" [formGroupName]=\"i\">\r\n                            <td class=\"text-center\">\r\n                                <input name=\"IsChecked\" formControlName=\"IsChecked\" \r\n                                type=\"radio\" id=\"td{{i}}\" (change)=\"setIsChecked(i)\"\r\n                                class=\"with-gap radio-col-indigo\">\r\n                                <label for=\"td{{i}}\" class=\"m-0\"></label>\r\n                            </td>\r\n                            <td class=\"text-center\">{{item.get('RowId').value}}</td>\r\n                            <td>{{item.get('NoticeCode').value}}</td>\r\n                            <td>{{item.get('NoticeDate').value}}</td>\r\n                            <td>\r\n                                <div *ngFor=\"let staff of item.value.NoticeStaff;\">{{staff.StaffFullName}}</div>\r\n                            </td>\r\n                            <td>\r\n                                <div *ngFor=\"let staff of item.value.NoticeStaff;\">{{staff.DepartmentName}}</div>\r\n                            </td>\r\n                            <td>\r\n                                <div *ngFor=\"let suspect of item.value.NoticeSuspect;\">{{suspect.SuspectFullName}}</div>\r\n                            </td>\r\n                            <td class=\"text-center\">\r\n                                <a href=\"javaScript:void(0);\" class=\"text-secondary\" (click)=\"view(item.value.NoticeCode)\">\r\n                                    <i class=\"fa fa-eye fa-lg\"></i>\r\n                                </a>\r\n                            </td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n        <div class=\"card-footer card-footer-unset\">\r\n            <app-pagination-table [TotalItems]=\"paginage.TotalItems\" [CurrentPage]=\"paginage.CurrentPage\" [PageSize]=\"paginage.PageSize\"\r\n                [RowsPerPageOptions]=\"paginage.RowsPerPageOptions\" (onPageChange)=\"pageChanges($event)\">\r\n            </app-pagination-table>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"modal-footer\">\r\n    <div class=\"col-lg-2 col-4\">\r\n        <button type=\"button\" class=\"btn btn-block btn-themecolor\" (click)=\"close('Save click')\">บันทึก</button>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/pages/component/modal-notice/modal-notice.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalNoticeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_pagination__ = __webpack_require__("./src/app/config/pagination.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_preloader_preloader_component__ = __webpack_require__("./src/app/shared/preloader/preloader.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config_message__ = __webpack_require__("./src/app/config/message.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config_dateFormat__ = __webpack_require__("./src/app/config/dateFormat.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__arrests_arrests_service__ = __webpack_require__("./src/app/pages/arrests/arrests.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__notices_notice_service__ = __webpack_require__("./src/app/pages/notices/notice.service.ts");
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









var ModalNoticeComponent = /** @class */ (function () {
    function ModalNoticeComponent(arrestService, _router, preLoaderService, fb, noticeService) {
        this.arrestService = arrestService;
        this._router = _router;
        this.preLoaderService = preLoaderService;
        this.fb = fb;
        this.noticeService = noticeService;
        this.isOpen = false;
        this.isCheckAll = false;
        this.advSearch = false;
        this.isRequired = false;
        this.isNoRecord = false;
        this.notice = new Array();
        this.noticeList = new Array();
        this.msgNorecord = __WEBPACK_IMPORTED_MODULE_4__config_message__["a" /* Message */].noRecord;
        this.paginage = __WEBPACK_IMPORTED_MODULE_1__config_pagination__["a" /* pagination */];
        this.d = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.c = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.outputNotice = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
    }
    Object.defineProperty(ModalNoticeComponent.prototype, "NoticeList", {
        get: function () {
            return this.noticeFG.get('NoticeList');
        },
        enumerable: true,
        configurable: true
    });
    ModalNoticeComponent.prototype.ngOnInit = function () {
        this.paginage.TotalItems = 0;
        this.noticeFG = this.fb.group({
            NoticeList: this.fb.array([])
        });
    };
    ModalNoticeComponent.prototype.onSearch = function (Textsearch) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.preLoaderService.setShowPreloader(true);
                        return [4 /*yield*/, this.arrestService.noticegetByKeyword(Textsearch).then(function (list) { return _this.onSearchComplete(list); })];
                    case 1:
                        _a.sent();
                        this.preLoaderService.setShowPreloader(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    ModalNoticeComponent.prototype.onAdvSearch = function (form) {
        return __awaiter(this, void 0, void 0, function () {
            var sDateCompare, eDateCompare;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!form.valid) {
                            this.isRequired = true;
                            return [2 /*return*/, false];
                        }
                        sDateCompare = new Date(form.value.DateStartFrom);
                        eDateCompare = new Date(form.value.DateStartTo);
                        if (!(sDateCompare.valueOf() > eDateCompare.valueOf())) return [3 /*break*/, 1];
                        alert(__WEBPACK_IMPORTED_MODULE_4__config_message__["a" /* Message */].checkDate);
                        return [3 /*break*/, 3];
                    case 1:
                        this.preLoaderService.setShowPreloader(true);
                        form.value.DateStartFrom = sDateCompare.toISOString();
                        form.value.DateStartTo = eDateCompare.toISOString();
                        return [4 /*yield*/, this.arrestService.noticegetByConAdv(form.value).then(function (list) { return _this.onSearchComplete(list); })];
                    case 2:
                        _a.sent();
                        this.preLoaderService.setShowPreloader(false);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ModalNoticeComponent.prototype.onSearchComplete = function (list) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.notice = [];
                        return [4 /*yield*/, list.filter(function (item) { return item.IsActive == 1; }).map(function (item, i) {
                                item.RowId = i + 1;
                                item.IsChecked = false;
                                item.NoticeDate = Object(__WEBPACK_IMPORTED_MODULE_5__config_dateFormat__["j" /* toLocalShort */])(item.NoticeDate);
                                item.NoticeStaff.map(function (s) {
                                    s.StaffFullName = s.TitleName + " " + s.FirstName + " " + s.LastName;
                                });
                                item.NoticeSuspect.map(function (s) {
                                    s.SuspectFullName = s.SuspectTitleName + " " + s.SuspectFirstName + " " + s.SuspectLastName;
                                });
                            })];
                    case 1:
                        _a.sent();
                        this.notice = list;
                        // set total record
                        this.paginage.TotalItems = list.length;
                        return [2 /*return*/];
                }
            });
        });
    };
    ModalNoticeComponent.prototype.setIsChecked = function (i) {
        this.NoticeList.value.map(function (item, index) {
            item.IsChecked = i == index ? true : false;
        });
    };
    ModalNoticeComponent.prototype.view = function (code) {
        this.dismiss('Cross click');
        this._router.navigate(["/notice/manage/R/" + code]);
    };
    ModalNoticeComponent.prototype.checkAll = function () {
        this.isCheckAll = !this.isCheckAll;
    };
    ModalNoticeComponent.prototype.toggle = function () {
        this.advSearch = !this.advSearch;
    };
    ModalNoticeComponent.prototype.dismiss = function (e) {
        this.d.emit(e);
    };
    ModalNoticeComponent.prototype.close = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var code, _notice;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.preLoaderService.setShowPreloader(true);
                        return [4 /*yield*/, this.NoticeList.value.find(function (item) { return item.IsChecked; }).NoticeCode];
                    case 1:
                        code = _a.sent();
                        return [4 /*yield*/, this.noticeService.getByCon(code).then(function (res) { return res; })];
                    case 2:
                        _notice = _a.sent();
                        this.outputNotice.emit(_notice);
                        this.c.emit(e);
                        this.preLoaderService.setShowPreloader(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    ModalNoticeComponent.prototype.pageChanges = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var list, _noticeList, itemFormArray;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.notice.slice(event.startIndex - 1, event.endIndex)];
                    case 1:
                        list = _a.sent();
                        _noticeList = [];
                        return [4 /*yield*/, list.map(function (item) {
                                var FG = _this.fb.group({
                                    IsChecked: item.IsChecked,
                                    RowId: item.RowId,
                                    NoticeCode: item.NoticeCode,
                                    NoticeDate: item.NoticeDate,
                                    NoticeStaff: _this.fb.array(item.NoticeStaff),
                                    NoticeSuspect: _this.fb.array(item.NoticeSuspect)
                                });
                                _noticeList.push(FG);
                            })];
                    case 2:
                        _a.sent();
                        itemFormArray = this.fb.array(_noticeList);
                        this.noticeFG.setControl('NoticeList', itemFormArray);
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
        __metadata("design:type", Object)
    ], ModalNoticeComponent.prototype, "d", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
        __metadata("design:type", Object)
    ], ModalNoticeComponent.prototype, "c", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
        __metadata("design:type", Object)
    ], ModalNoticeComponent.prototype, "outputNotice", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('noticeTable'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], ModalNoticeComponent.prototype, "noticeTable", void 0);
    ModalNoticeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-modal-notice',
            template: __webpack_require__("./src/app/pages/component/modal-notice/modal-notice.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__arrests_arrests_service__["a" /* ArrestsService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */],
            __WEBPACK_IMPORTED_MODULE_3__shared_preloader_preloader_component__["b" /* PreloaderService */],
            __WEBPACK_IMPORTED_MODULE_7__angular_forms__["b" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_8__notices_notice_service__["a" /* NoticeService */]])
    ], ModalNoticeComponent);
    return ModalNoticeComponent;
}());



/***/ }),

/***/ "./src/app/pages/component/modal-notice/modal-notice.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalNoticeModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modal_notice_component__ = __webpack_require__("./src/app/pages/component/modal-notice/modal-notice.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__card_actions_card_actions_module__ = __webpack_require__("./src/app/pages/component/card-actions/card-actions.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pagination_table_pagination_table_module__ = __webpack_require__("./src/app/pages/component/pagination-table/pagination-table.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__arrests_arrests_service__ = __webpack_require__("./src/app/pages/arrests/arrests.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__notices_notice_service__ = __webpack_require__("./src/app/pages/notices/notice.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var ModalNoticeModule = /** @class */ (function () {
    function ModalNoticeModule() {
    }
    ModalNoticeModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["k" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__card_actions_card_actions_module__["a" /* CardActionsModule */],
                __WEBPACK_IMPORTED_MODULE_5__pagination_table_pagination_table_module__["a" /* PaginationTableModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__modal_notice_component__["a" /* ModalNoticeComponent */]],
            exports: [__WEBPACK_IMPORTED_MODULE_2__modal_notice_component__["a" /* ModalNoticeComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_6__arrests_arrests_service__["a" /* ArrestsService */], __WEBPACK_IMPORTED_MODULE_7__notices_notice_service__["a" /* NoticeService */]]
        })
    ], ModalNoticeModule);
    return ModalNoticeModule;
}());



/***/ }),

/***/ "./src/app/reducers/product.reducer.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = productReducer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_arrest_get_mas_productget_all_action__ = __webpack_require__("./src/app/actions/arrest/get-mas-productget-all.action.ts");

// Section 1
var initialState = {
    ProductID: null,
    GroupCode: null,
    IsDomestic: null,
    ProductCode: null,
    BrandCode: null,
    BrandNameTH: null,
    BrandNameEN: null,
    SubBrandCode: null,
    SubBrandNameTH: null,
    SubBrandNameEN: null,
    ModelCode: null,
    ModelName: null,
    FixNo1: null,
    DegreeCode: null,
    Degree: null,
    SizeCode: null,
    Size: null,
    SizeUnitCode: null,
    SizeUnitName: null,
    FixNo2: null,
    SequenceNo: null,
    ProductDesc: null,
    EffectiveDate: null,
    ExpirationDate: null,
    IsActive: null,
    EventDatetime: null
};
// Section 2
function productReducer(state, action) {
    if (state === void 0) { state = [initialState]; }
    // Section 3
    switch (action.type) {
        case __WEBPACK_IMPORTED_MODULE_0__actions_arrest_get_mas_productget_all_action__["a" /* ADD_PRODUCT */]:
            return state.concat([action.payload]);
        default:
            return state;
    }
}


/***/ })

});
//# sourceMappingURL=manage.module.0.chunk.js.map
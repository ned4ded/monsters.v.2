webpackJsonp([2],{

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GamePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_trinkets_trinkets_component__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_monsters_monsters_component__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_game_game_service__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_game_game_logic__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_item_holder_item_holder_component__ = __webpack_require__(184);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var GamePage = /** @class */ (function (_super) {
    __extends(GamePage, _super);
    function GamePage(navCtrl, params, renderer, componentFactoryResolver, injector, app) {
        var _this = _super.call(this, renderer) || this;
        _this.navCtrl = navCtrl;
        _this.params = params;
        _this.renderer = renderer;
        _this.componentFactoryResolver = componentFactoryResolver;
        _this.injector = injector;
        _this.app = app;
        _this.monsterId = _this.params.get('monster');
        return _this;
    }
    GamePage.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.monster = this.monsterComponent.getCurrentMonster();
        var instances = this.trinkets.getInstances();
        var canPlace = function (ev) {
            var _a = ev, clientX = _a.clientX, clientY = _a.clientY;
            var dashboard = document.getElementById('panel');
            var top = dashboard.offsetTop;
            var bottom = top + dashboard.offsetHeight;
            var left = dashboard.offsetLeft;
            var right = left + dashboard.offsetWidth;
            var isOnDashboard = function () { return clientX > left && clientX < right && clientY > top && clientY < bottom; };
            var _b = document.getElementsByTagName('body').item(0), bodyH = _b.clientHeight, bodyW = _b.clientWidth;
            var isNearEdges = function (p) {
                return clientX < p || clientX > bodyW - p || clientY < p || clientY > bodyH - p;
            };
            return isOnDashboard() || isNearEdges(40);
        };
        this.logic = new __WEBPACK_IMPORTED_MODULE_5__components_game_game_logic__["a" /* GameLogic */](this.renderer, instances, canPlace);
        var setHolderPosition = function (ref, item, event) {
            var _a = event, x = _a.clientX, y = _a.clientY;
            var _b = _this.holder.getSize(), width = _b.width, height = _b.height;
            _this.holder.setAttributes({
                style: "left: " + (x - width / 2) + "px; top: " + (y - height / 2) + "px",
            });
        };
        this.logic.setFns('onItemDragging', setHolderPosition);
        this.logic.setFns('onItemClick', function (items, item, ev) {
            var _a = item.meta, after = _a.after, multiple = _a.multiple, onScreen = _a.onScreen, random = _a.random;
            if (item.isCopy()) {
                after ? after(_this.monster) : null;
                var parent_1 = item.isCopy();
                if (!onScreen) {
                    _this.monster.clear(item.meta.container);
                }
                else {
                    _this.monsterComponent.remove(item.instance);
                }
                var holderInstance_1 = _this.holder.loadComponent(parent_1.component);
                if (random) {
                    holderInstance_1.hide(item.randomArr);
                }
                items.removeActiveElement(item);
                (item).deleteCopy();
                return;
            }
            if (!multiple) {
                item.deactivate();
                _this.renderer.addClass(item.instance, 'blocked');
            }
            var holderInstance = _this.holder.loadComponent(item.component);
            if (random) {
                var selected = holderInstance.randomize(function (selected) {
                    item.randomArr = selected;
                });
            }
            return;
        }, setHolderPosition);
        this.logic.setFns('afterItemDropped', function () {
            _this.holder.clear();
        });
        this.logic.setFns('afterItemPlaced', function (items, item, ev) {
            var _a = item.meta, before = _a.before, multiple = _a.multiple, onScreen = _a.onScreen;
            if (onScreen) {
                _this.monsterComponent.render(item.component, function (instance) {
                    var position = _this.holder.getAttributes().style;
                    var style = "position: absolute; z-index: 11; " + position;
                    _this.renderer.setAttribute(instance.node, 'style', style);
                    var copy = items.addActiveElementCopy(item, instance.node);
                    before ? before(_this.monster, _this.monsterComponent, copy.instance) : null;
                    if (item.meta.random) {
                        instance.hide(item.randomArr);
                        copy.randomArr = item.randomArr;
                        item.randomArr = null;
                    }
                });
                return;
            }
            var content = _this.monster.getContainer(item.meta.container).content;
            var element = _this.monster.getGroup(item.meta.container).element;
            if (content) {
                var active = items.findActiveElementByInstance(content);
                var after = active.meta.after;
                after ? after(_this.monster, _this.monsterComponent, item.instance) : null;
                var parent_2 = active.isCopy();
                parent_2.activate();
                _this.renderer.removeClass(parent_2.instance, 'blocked');
                items.removeActiveElement(active);
            }
            _this.monster.render(item.component, item.meta.container, function (instance) {
                var copy = items.addActiveElementCopy(item, instance);
                before ? before(_this.monster, _this.monsterComponent, copy.instance) : null;
                var config = element.getBBox();
                var attr = item.meta.attr;
                Object.keys(attr).forEach(function (name) {
                    var funcs = attr[name];
                    var fn = funcs[_this.monster.name] || funcs['default'];
                    _this.renderer.setAttribute(instance, name, fn(config).toString());
                    return;
                });
                return;
            });
        });
        this.logic.setFns('afterItemDesroyed', function (ref, item) {
            var parent = item.isCopy();
            var el = parent ? parent : item;
            el.activate();
            _this.renderer.removeClass(el.instance, 'blocked');
        });
        this.logic.setFns('afterClear', function (ref, items) {
            items.forEach(function (el) {
                el.activate();
                _this.renderer.removeClass(el.instance, 'blocked');
            });
        });
        this.logic.start();
    };
    GamePage.prototype.endGame = function () {
        this.logic.over();
        this.holder.clear();
        this.monster.clearAll();
        this.monsterComponent.clearAll();
        this.navCtrl.pop();
    };
    GamePage.prototype.reset = function () {
        this.logic.over();
        this.holder.clear();
        this.monster.clearAll();
        this.monsterComponent.clearAll();
        this.logic.start();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1__components_trinkets_trinkets_component__["a" /* TrinketsComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__components_trinkets_trinkets_component__["a" /* TrinketsComponent */])
    ], GamePage.prototype, "trinkets", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2__components_monsters_monsters_component__["a" /* MonstersComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__components_monsters_monsters_component__["a" /* MonstersComponent */])
    ], GamePage.prototype, "monsterComponent", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_6__components_item_holder_item_holder_component__["a" /* ItemHolderComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_6__components_item_holder_item_holder_component__["a" /* ItemHolderComponent */])
    ], GamePage.prototype, "holder", void 0);
    GamePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-game',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/pages/game/game.html"*/'<ion-content fixed no-bounce>\n  <div id="container" class="container">\n    <item-holder></item-holder>\n    <div id="nb-target" class="screen zombie__screen">\n      <div id="on-screen">\n        <monster [monsterId]="monsterId"></monster>\n      </div>\n      <button ion-button icon-only outline class="btn-close" (click)="endGame()">\n        <ion-icon name="close" class="icon-close"></ion-icon>\n      </button>\n\n      <button ion-button icon-only outline class="btn-reset" (click)="reset()">\n        <ion-icon name="refresh" class="icon-reset"></ion-icon>\n      </button>\n    </div>\n    <div id="panel" class="panel-container">\n      <trinkets></trinkets>\n    </div>\n  </div>\n  <div id="active-ct"></div>\n</ion-content>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/pages/game/game.html"*/,
            providers: [],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ApplicationRef */]])
    ], GamePage);
    return GamePage;
}(__WEBPACK_IMPORTED_MODULE_4__components_game_game_service__["a" /* Game */]));

//# sourceMappingURL=game.js.map

/***/ }),

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__select_select__ = __webpack_require__(186);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomePage = /** @class */ (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    HomePage.prototype.select = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__select_select__["a" /* SelectPage */]);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/pages/home/home.html"*/'<!--\n  Generated template for the HomePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content class="container" padding fixed no-bounce>\n  <div class="image">\n    <img class="btn-play" (click)="select()" src="assets/imgs/home-page_play.svg" alt="hit the btn to play!" />\n  </div>\n  <img src="assets/imgs/home-page_logo.svg" alt="logotype" class="logo">\n</ion-content>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/pages/home/home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 112:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 112;

/***/ }),

/***/ 12:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MonsterModel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__monster_part_directive__ = __webpack_require__(171);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MonsterModel = /** @class */ (function () {
    function MonsterModel(name, element, componentFactoryResolver, injector, app) {
        this.name = name;
        this.element = element;
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
        this.app = app;
    }
    MonsterModel.prototype.ngAfterViewInit = function () { };
    MonsterModel.prototype.getPartsArray = function () {
        return this.parts.toArray();
    };
    MonsterModel.prototype.isOnMonster = function (_a) {
        var top = _a.top, left = _a.left, bottom = _a.bottom, right = _a.right;
        var point = function (x, y) { return ({ x: x, y: y, }); };
        var rect = function (p1, p2) { return ({
            p1: p1, p2: p2,
            onRect: function (point) {
                var compareX = function (x) {
                    return (p1.x <= point.x) && (point.x <= p2.x);
                };
                var compareY = function (x) {
                    return (p1.y <= point.y) && (point.y <= p2.y);
                };
                return compareX(point.x) && compareY(point.y);
            }
        }); };
        var outline = this.getParts(function (p) { return p.outline; }).map(function (p) {
            var _a = p.element.getBoundingClientRect(), top = _a.top, right = _a.right, left = _a.left, bottom = _a.bottom;
            var point1 = point(Number(left), Number(top));
            var point2 = point(Number(right), Number(bottom));
            return rect(point1, point2);
        });
        var leftTop = point(Number(left), Number(top));
        var rightBottom = point(Number(right), Number(bottom));
        return outline.find(function (rect) { return rect.onRect(leftTop) || rect.onRect(rightBottom); }) ? true : false;
    };
    MonsterModel.prototype.getParts = function (fn) {
        if (fn === void 0) { fn = function (el) { return true; }; }
        var parts = this.getPartsArray();
        return parts.filter(fn);
    };
    MonsterModel.prototype.getRoot = function () {
        return this.getPart(function (p) { return p.type === 'root'; });
    };
    MonsterModel.prototype.getPart = function (arg) {
        var parts = this.getPartsArray();
        var fn = arg || (function (p) { return p.name === arg; });
        return parts.find(fn);
    };
    MonsterModel.prototype.getContainer = function (name) {
        return this.getPart(function (p) { return p.group === name && p.type === 'container'; });
    };
    MonsterModel.prototype.getGroup = function (name) {
        return this.getPart(function (p) { return p.name === name && p.type === 'group'; });
    };
    MonsterModel.prototype.getContainers = function () {
        return this.getParts(function (p) { return p.type === 'container'; });
    };
    MonsterModel.prototype.render = function (component, name, callback) {
        if (callback === void 0) { callback = function (instance) { }; }
        var obj = this.getContainer(name);
        var container = obj.viewContainerRef, element = obj.element, content = obj.content;
        this.clear(name);
        var factory = this.componentFactoryResolver.resolveComponentFactory(component);
        var ref = factory.create(this.injector, [], element);
        // this.app.attachView(ref.hostView);
        var instance = ref.instance.node.firstChild;
        obj.content = instance;
        return callback(instance);
    };
    MonsterModel.prototype.clear = function (name) {
        var _this = this;
        var object = this.getContainer(name);
        var element = object.element;
        var children = Array.from(element.children).forEach(function (e) {
            return _this.renderer.removeChild(element, e);
        });
        object.content = null;
        return this;
    };
    MonsterModel.prototype.trigger = function (name, fn) {
        var gr = this.getParts(function (p) { return p.name === name; });
        gr.forEach(function (_a) {
            var element = _a.element;
            return fn(element);
        });
    };
    MonsterModel.prototype.close = function (name) {
        var _this = this;
        this.trigger(name, function (element) {
            _this.renderer.setAttribute(element, 'visibility', 'hidden');
            return;
        });
        return function () { return _this.open(name); };
    };
    MonsterModel.prototype.open = function (name) {
        var _this = this;
        this.trigger(name, function (element) {
            element.removeAttribute('visibility');
        });
        return function () { return _this.close(name); };
        ;
    };
    MonsterModel.prototype.clearAll = function () {
        var _this = this;
        this.getContainers().forEach(function (_a) {
            var group = _a.group;
            return _this.clear(group);
        });
        this.getParts(function (p) { return p.type !== 'container'; }).forEach(function (_a) {
            var name = _a.name;
            _this.open(name);
        });
        return;
    };
    MonsterModel.prototype.animate = function (name, cb) {
        return false;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChildren */])(__WEBPACK_IMPORTED_MODULE_1__monster_part_directive__["a" /* MonsterPartDirective */]),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* QueryList */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* QueryList */]) === "function" && _a || Object)
    ], MonsterModel.prototype, "parts", void 0);
    MonsterModel = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({}),
        __metadata("design:paramtypes", [Object, Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ApplicationRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ApplicationRef */]) === "function" && _d || Object])
    ], MonsterModel);
    return MonsterModel;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=monster.model.js.map

/***/ }),

/***/ 153:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/game/game.module": [
		334,
		1
	],
	"../pages/home/home.module": [
		335,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 153;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrinketsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__trinket_host_directive__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__trinkets_service__ = __webpack_require__(283);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TrinketsComponent = /** @class */ (function () {
    function TrinketsComponent(componentFactoryResolver, trinketsService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.trinketsService = trinketsService;
    }
    ;
    TrinketsComponent.prototype.ngOnInit = function () {
        this.trinkets = this.trinketsService.getTrinkets();
    };
    TrinketsComponent.prototype.ngAfterViewInit = function () {
        this.loadTrinkets();
    };
    TrinketsComponent.prototype.loadTrinkets = function () {
        var _this = this;
        this.instances = this.hosts.map(function (_a) {
            var id = _a.id, viewContainerRef = _a.viewContainerRef;
            var trinket = _this.trinkets.find(function (e) { return e.id == id; });
            var componentFactory = _this.componentFactoryResolver.resolveComponentFactory(trinket.component);
            viewContainerRef.clear();
            var instance = viewContainerRef.createComponent(componentFactory).instance;
            return __assign({}, instance, { component: trinket.component, meta: trinket.meta });
        });
        return;
    };
    TrinketsComponent.prototype.getInstances = function () {
        return this.instances;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChildren */])(__WEBPACK_IMPORTED_MODULE_1__trinket_host_directive__["a" /* TrinketHostDirective */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* QueryList */])
    ], TrinketsComponent.prototype, "hosts", void 0);
    TrinketsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'trinkets',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/trinkets/trinkets.component.html"*/'<ul class="panel">\n  <li *ngFor="let trinket of trinkets" class="panel__item">\n    <ng-template trinket-host trinket-id="{{ trinket.id }}"></ng-template>\n  </li>\n  <li class="panel__item panel__item--fraud"></li>\n</ul>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/trinkets/trinkets.component.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__trinkets_service__["a" /* TrinketsService */]],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */],
            __WEBPACK_IMPORTED_MODULE_2__trinkets_service__["a" /* TrinketsService */]])
    ], TrinketsComponent);
    return TrinketsComponent;
}());

//# sourceMappingURL=trinkets.component.js.map

/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrinketHostDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TrinketHostDirective = /** @class */ (function () {
    function TrinketHostDirective(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('trinket-id'),
        __metadata("design:type", String)
    ], TrinketHostDirective.prototype, "id", void 0);
    TrinketHostDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Directive */])({
            selector: '[trinket-host]',
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewContainerRef */]])
    ], TrinketHostDirective);
    return TrinketHostDirective;
}());

//# sourceMappingURL=trinket-host.directive.js.map

/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlassComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_element_component_model__ = __webpack_require__(42);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GlassComponent = /** @class */ (function (_super) {
    __extends(GlassComponent, _super);
    function GlassComponent(element) {
        return _super.call(this, 'glass', element.nativeElement) || this;
    }
    GlassComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'glass',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/trinkets/glass/glass.svg"*/'<svg width="200" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 301.28 112.68" class="glass">\n  <path class="cls-1" d="M96.84,106.39l-39.23,-50.49a20.3,20.3,0,1,1,35.17,-20.3l4.07,7l4.07,-7a20.3,20.3,0,1,1,35.16,20.3z"/>\n  <path class="cls-1" d="M204.44,106.39l-39.23,-50.49a20.3,20.3,0,1,1,35.16,-20.3l4.07,7l4.07,-7a20.3,20.3,0,1,1,35.16,20.3z"/>\n  <path class="cls-2" d="M137.65,49.83a18.36,18.36,0,0,1,26,0"/>\n  <path class="cls-3" d="M6.16,22.4a11.53,11.53,0,0,1,-0.66,-16.24h0a11.53,11.53,0,0,1,16.24,-0.66l34.09,31.41"/>\n  <path class="cls-3" d="M295.12,22.4a11.53,11.53,0,0,0,0.66,-16.24h0a11.53,11.53,0,0,0,-16.24,-0.66l-34.09,31.41"/>\n</svg>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/trinkets/glass/glass.svg"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]])
    ], GlassComponent);
    return GlassComponent;
}(__WEBPACK_IMPORTED_MODULE_1__model_element_component_model__["a" /* ElementComponentModel */]));

//# sourceMappingURL=glass.js.map

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ElementRepository; });
// import { Injectable } from "@angular/core";
// @Injectable()
var ElementRepository = /** @class */ (function () {
    function ElementRepository() {
        this.elements = [];
    }
    ;
    ElementRepository.prototype.add = function (element) {
        var arr = this.elements.slice();
        this.elements = arr.concat([element]);
        return this;
    };
    ElementRepository.prototype.removeById = function (id) {
        var arr = this.elements.slice().filter(function (e) { return e.getId() == id; });
        this.elements = arr;
        return this;
    };
    return ElementRepository;
}());

/* harmony default export */ __webpack_exports__["b"] = (new ElementRepository());
//# sourceMappingURL=element.repository.js.map

/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EyesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_element_component_model__ = __webpack_require__(42);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EyesComponent = /** @class */ (function (_super) {
    __extends(EyesComponent, _super);
    function EyesComponent(element) {
        return _super.call(this, 'eyes', element.nativeElement) || this;
    }
    EyesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'eyes',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/trinkets/eyes/eyes.html"*/'<svg width="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 131.99 42.03" class="eyes-trinket">\n         <path class="cls-1" d="M0.76,21c16.86,28,44.16,28,61,0c-16.85,-28,-44.14,-28,-61,0z"></path>\n         <path d="M0.18,7a14.15,14.15,0,0,0,1.16,3.1a10.71,10.71,0,0,0,1.86,2.52a10.75,10.75,0,0,0,2.52,1.86a14.25,14.25,0,0,0,3.1,1.17a7.15,7.15,0,0,1,-6.61,-2a7.17,7.17,0,0,1,-2.03,-6.65z"></path>\n         <path d="M4.09,5.05a14.15,14.15,0,0,0,1.16,3.1a10.71,10.71,0,0,0,1.86,2.52a10.76,10.76,0,0,0,2.52,1.86a14.25,14.25,0,0,0,3.1,1.17a7.15,7.15,0,0,1,-6.61,-2a7.17,7.17,0,0,1,-2.03,-6.65z"></path>\n         <path d="M8,3.59a14.15,14.15,0,0,0,1.16,3.1a10.69,10.69,0,0,0,1.84,2.52a10.77,10.77,0,0,0,2.52,1.86a14.27,14.27,0,0,0,3.1,1.17a7.15,7.15,0,0,1,-6.61,-2a7.17,7.17,0,0,1,-2.01,-6.65z"></path>\n         <path d="M11.91,1.6a14.15,14.15,0,0,0,1.16,3.1a10.69,10.69,0,0,0,1.86,2.52a10.77,10.77,0,0,0,2.52,1.86a14.27,14.27,0,0,0,3.1,1.17a7.15,7.15,0,0,1,-6.61,-2a7.17,7.17,0,0,1,-2.03,-6.65z"></path>\n         <path d="M15.82,0.67a14.15,14.15,0,0,0,1.18,3.09a10.7,10.7,0,0,0,1.86,2.52a10.74,10.74,0,0,0,2.52,1.86a14.25,14.25,0,0,0,3.1,1.17a7.15,7.15,0,0,1,-6.61,-2a7.17,7.17,0,0,1,-2.05,-6.64z"></path>\n         <path d="M19.72,0a14.15,14.15,0,0,0,1.16,3.1a10.7,10.7,0,0,0,1.86,2.52a10.77,10.77,0,0,0,2.52,1.86a14.27,14.27,0,0,0,3.1,1.17a7.15,7.15,0,0,1,-6.61,-2a7.17,7.17,0,0,1,-2.03,-6.65z"></path>\n         <path class="cls-2" d="M0.76,21a43.13,43.13,0,0,0,61,0a43.13,43.13,0,0,0,-61,0z"></path>\n         <path class="cls-3" d="M41.26,32.5a15.21,15.21,0,0,0,0,-23a43.31,43.31,0,0,0,-20,0a15.21,15.21,0,0,0,0,23a43.31,43.31,0,0,0,20,0z"></path>\n         <circle cx="31.27" cy="21.02" r="5.12"></circle>\n         <path class="cls-1" d="M131.24,21c-16.86,28,-44.16,28,-61,0c16.84,-28,44.13,-28,61,0z"></path>\n         <path d="M131.82,7a7.17,7.17,0,0,1,-2,6.61a7.15,7.15,0,0,1,-6.61,2a14.25,14.25,0,0,0,3.1,-1.17a10.75,10.75,0,0,0,2.52,-1.86a10.71,10.71,0,0,0,1.86,-2.52a14.15,14.15,0,0,0,1.13,-3.06z"></path>\n         <path d="M127.91,5.05a7.17,7.17,0,0,1,-2,6.61a7.15,7.15,0,0,1,-6.61,2a14.25,14.25,0,0,0,3.1,-1.17a10.76,10.76,0,0,0,2.52,-1.86a10.72,10.72,0,0,0,1.86,-2.52a14.15,14.15,0,0,0,1.13,-3.06z"></path>\n         <path d="M124,3.59a7.17,7.17,0,0,1,-2,6.61a7.15,7.15,0,0,1,-6.61,2a14.27,14.27,0,0,0,3.1,-1.17a10.77,10.77,0,0,0,2.51,-1.82a10.69,10.69,0,0,0,1.86,-2.52a14.16,14.16,0,0,0,1.14,-3.1z"></path>\n         <path d="M120.09,1.6a7.17,7.17,0,0,1,-2,6.61a7.15,7.15,0,0,1,-6.61,2a14.27,14.27,0,0,0,3.1,-1.17a10.77,10.77,0,0,0,2.52,-1.86a10.69,10.69,0,0,0,1.86,-2.52a14.15,14.15,0,0,0,1.13,-3.06z"></path>\n         <path d="M116.18,0.67a7.17,7.17,0,0,1,-2,6.61a7.15,7.15,0,0,1,-6.61,2a14.25,14.25,0,0,0,3.1,-1.17a10.74,10.74,0,0,0,2.52,-1.86a10.7,10.7,0,0,0,1.81,-2.49a14.15,14.15,0,0,0,1.18,-3.09z"></path>\n         <path d="M112.27,0a7.17,7.17,0,0,1,-2,6.61a7.15,7.15,0,0,1,-6.61,2a14.27,14.27,0,0,0,3.1,-1.17a10.77,10.77,0,0,0,2.52,-1.86a10.7,10.7,0,0,0,1.82,-2.48a14.15,14.15,0,0,0,1.17,-3.1z"></path>\n         <path class="cls-2" d="M131.24,21a43.13,43.13,0,0,1,-61,0a43.13,43.13,0,0,1,61,0z"></path>\n         <path class="cls-3" d="M90.73,32.5a15.21,15.21,0,0,1,0,-23a43.31,43.31,0,0,1,20,0a15.21,15.21,0,0,1,0,23a43.31,43.31,0,0,1,-20,0z"></path>\n         <circle cx="100.73" cy="21.02" r="5.12"></circle>\n</svg>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/trinkets/eyes/eyes.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]])
    ], EyesComponent);
    return EyesComponent;
}(__WEBPACK_IMPORTED_MODULE_1__model_element_component_model__["a" /* ElementComponentModel */]));

//# sourceMappingURL=eyes.js.map

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HoodComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_element_component_model__ = __webpack_require__(42);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HoodComponent = /** @class */ (function (_super) {
    __extends(HoodComponent, _super);
    function HoodComponent(element) {
        return _super.call(this, 'hood', element.nativeElement) || this;
    }
    HoodComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'hood',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/trinkets/hood/hood.html"*/'<svg width="100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71.8 98.59" class="hood">\n   <polygon class="cls-1" points="6.8 26.09 39.3 45.48 71.8 64.86 50.17 81.72 28.54 98.58 17.67 62.34 6.8 26.09"></polygon>\n   <path class="cls-1" d="M8.34,27.07l-1.26,0.41a4.29,4.29,0,0,1,0.38,-3.48a3,3,0,0,0,-1.46,-4.39a4.26,4.26,0,0,1,-2,-6.09a3,3,0,0,0,0.36,-2.52a3,3,0,0,0,-1.76,-1.85a4.26,4.26,0,0,1,-2,-6.09a3,3,0,0,0,0.33,-2.53l1.26,-0.41a4.29,4.29,0,0,1,-0.38,3.49a3,3,0,0,0,-0.33,2.53a3,3,0,0,0,1.76,1.86a4.26,4.26,0,0,1,2,6.09a3,3,0,0,0,1.43,4.37a4.26,4.26,0,0,1,2,6.09a3,3,0,0,0,-0.33,2.52z"></path>\n   <path class="cls-1" d="M8.64,28l-1.33,0a4.29,4.29,0,0,1,1.69,-3.14a3,3,0,0,0,0.29,-4.59a4.26,4.26,0,0,1,0.41,-6.39a3,3,0,0,0,0.3,-4.6a4.26,4.26,0,0,1,0.41,-6.39a3,3,0,0,0,1.19,-2.23l1.32,0.08a4.29,4.29,0,0,1,-1.65,3.1a3,3,0,0,0,-1.27,2.23a3,3,0,0,0,1,2.37a4.26,4.26,0,0,1,-0.41,6.39a3,3,0,0,0,-0.29,4.59a4.26,4.26,0,0,1,-0.41,6.39a3,3,0,0,0,-1.25,2.19z"></path>\n   <path class="cls-1" d="M8.53,27.62l-1.31,0.17a4.29,4.29,0,0,1,1,-3.36a3,3,0,0,0,-0.58,-4.57a4.26,4.26,0,0,1,-0.8,-6.35a3,3,0,0,0,-0.54,-4.57a4.26,4.26,0,0,1,-0.8,-6.35a3,3,0,0,0,0.8,-2.42l1.32,-0.17a4.29,4.29,0,0,1,-1,3.36a3,3,0,0,0,-0.8,2.42a3,3,0,0,0,1.33,2.15a4.26,4.26,0,0,1,0.85,6.35a3,3,0,0,0,0.58,4.57a4.26,4.26,0,0,1,0.8,6.35a3,3,0,0,0,-0.85,2.42z"></path>\n   <circle class="cls-2" cx="24.88" cy="49.38" r="4.97" transform="translate(-25.1 25.73) rotate(-37.94)"></circle>\n   <circle class="cls-3" cx="30.55" cy="68.48" r="7.18" transform="translate(-35.65 33.25) rotate(-37.94)"></circle>\n   <circle class="cls-4" cx="51.12" cy="66.15" r="7.18" transform="translate(-29.87 45.41) rotate(-37.94)"></circle>\n</svg>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/trinkets/hood/hood.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]])
    ], HoodComponent);
    return HoodComponent;
}(__WEBPACK_IMPORTED_MODULE_1__model_element_component_model__["a" /* ElementComponentModel */]));

//# sourceMappingURL=hood.js.map

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MoleComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__trinket_random_model__ = __webpack_require__(285);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MoleComponent = /** @class */ (function (_super) {
    __extends(MoleComponent, _super);
    function MoleComponent(element) {
        return _super.call(this, 'mole', element.nativeElement) || this;
    }
    MoleComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'mole',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/trinkets/mole/mole.html"*/'<svg class="mole" width="75" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55.86 63.82">\n  <ng-template trinket-random-part>\n    <g>\n      <circle class="cls-1" cx="15.45" cy="19.12" r="11.25"></circle>\n      <line class="cls-2" x1="19.58" y1="18.74" x2="41.4" y2="12.04"></line>\n      <line class="cls-2" x1="14.79" y1="0.03" x2="15.45" y2="19.12"></line>\n      <line class="cls-2" x1="0.47" y1="28.23" x2="10.58" y2="20.99"></line>\n    </g>\n  </ng-template>\n\n  <ng-template trinket-random-part>\n    <g>\n       <circle class="cls-1" cx="44.61" cy="34.95" r="11.25" transform="translate(-11.8 40.41) rotate(-43.6)"></circle>\n       <line class="cls-2" x1="47.73" y1="37.68" x2="45" y2="55.89"></line>\n       <line class="cls-2" x1="27.68" y1="30.39" x2="39.89" y2="32.72"></line>\n     </g>\n  </ng-template>\n\n  <ng-template trinket-random-part>\n    <g>\n     <circle class="cls-1" cx="11.25" cy="52.57" r="11.25" transform="translate(-33.15 22.26) rotate(-43.6)"></circle>\n    </g>\n  </ng-template>\n\n</svg>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/trinkets/mole/mole.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]])
    ], MoleComponent);
    return MoleComponent;
}(__WEBPACK_IMPORTED_MODULE_1__trinket_random_model__["a" /* TrinketRandomModel */]));

//# sourceMappingURL=mole.js.map

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrinketRandomPartDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TrinketRandomPartDirective = /** @class */ (function () {
    function TrinketRandomPartDirective(el, templateRef, viewContainerRef) {
        this.templateRef = templateRef;
        this.viewContainerRef = viewContainerRef;
        this.shown = false;
        this.element = el.nativeElement;
        this.show();
    }
    TrinketRandomPartDirective.prototype.show = function () {
        if (!this.shown) {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
            this.shown = true;
        }
        return this;
    };
    TrinketRandomPartDirective.prototype.hide = function () {
        if (this.shown) {
            this.viewContainerRef.clear();
            this.shown = false;
        }
        return this;
    };
    TrinketRandomPartDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Directive */])({
            selector: '[trinket-random-part]',
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* TemplateRef */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewContainerRef */]])
    ], TrinketRandomPartDirective);
    return TrinketRandomPartDirective;
}());

//# sourceMappingURL=trinket-random-part.directive.js.map

/***/ }),

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeartComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_element_component_model__ = __webpack_require__(42);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HeartComponent = /** @class */ (function (_super) {
    __extends(HeartComponent, _super);
    function HeartComponent(element) {
        return _super.call(this, 'heart', element.nativeElement) || this;
    }
    HeartComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'heart',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/trinkets/heart/heart.svg"*/'<svg width="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 141.6 138.47" class="heart">\n   <path class="cls-1" d="M51.65,133.57l-48.3,-62.16a25,25,0,1,1,43.29,-25l5,8.68l5,-8.68a25,25,0,1,1,43.29,25z"></path>\n   <line class="cls-2" x1="77.76" y1="63.18" x2="125.64" y2="15.3"></line>\n   <line class="cls-2" x1="8.59" y1="132.01" x2="32.54" y2="108.07"></line>\n   <line class="cls-2" x1="104.69" y1="13.3" x2="104.69" y2="36.58"></line>\n   <line class="cls-2" x1="111.34" y1="5.32" x2="111.34" y2="28.6"></line>\n   <line class="cls-2" x1="117.99" x2="117.99" y2="23.28"></line>\n   <line class="cls-2" x1="128.3" y1="35.58" x2="105.02" y2="35.58"></line>\n   <line class="cls-2" x1="136.28" y1="28.93" x2="113" y2="28.93"></line>\n   <line class="cls-2" x1="141.6" y1="22.28" x2="118.32" y2="22.28"></line>\n   <polygon points="2.11 138.47 7.99 127.95 13.87 117.43 18.51 122.07 23.16 126.72 12.64 132.6 2.11 138.47"></polygon>\n</svg>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/trinkets/heart/heart.svg"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]])
    ], HeartComponent);
    return HeartComponent;
}(__WEBPACK_IMPORTED_MODULE_1__model_element_component_model__["a" /* ElementComponentModel */]));

//# sourceMappingURL=heart.js.map

/***/ }),

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MonstersComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__monsters_host_directive__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__monsters_screen_directive__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__monsters_service__ = __webpack_require__(169);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MonstersComponent = /** @class */ (function () {
    function MonstersComponent(componentFactoryResolver, monstersService, viewContainerRef, renderer) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.monstersService = monstersService;
        this.viewContainerRef = viewContainerRef;
        this.renderer = renderer;
        this.onScreen = [];
    }
    MonstersComponent.prototype.ngOnInit = function () {
        this.monsters = this.monstersService.getMonsters();
        this.loadMonster(this.monsterId);
    };
    MonstersComponent.prototype.ngAfterViewInit = function () {
    };
    MonstersComponent.prototype.loadMonster = function (id) {
        var monster = this.monsters.find(function (e) { return e.id == id; });
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(monster.component);
        var viewContainerRef = this.monsterHost.viewContainerRef;
        viewContainerRef.clear();
        var instance = viewContainerRef.createComponent(componentFactory).instance;
        this.monster = instance;
    };
    MonstersComponent.prototype.render = function (component, cb) {
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        var viewContainerRef = this.screen.viewContainerRef;
        var _a = viewContainerRef.createComponent(componentFactory), hostView = _a.hostView, instance = _a.instance;
        this.addOnScreen(instance.node, hostView);
        return cb(instance);
    };
    MonstersComponent.prototype.addOnScreen = function (instance, host) {
        this.onScreen = this.onScreen.concat([{ instance: instance, host: host }]);
        return this;
    };
    MonstersComponent.prototype.remove = function (instance) {
        var host = this.onScreen.find(function (_a) {
            var i = _a.instance;
            return i === instance;
        }).host;
        var index = this.screen.viewContainerRef.indexOf(host);
        this.screen.viewContainerRef.remove(index);
        this.onScreen = this.onScreen.filter(function (_a) {
            var i = _a.instance;
            return i !== instance;
        });
        return this;
    };
    MonstersComponent.prototype.clearAll = function () {
        this.screen.viewContainerRef.clear();
        return this;
    };
    MonstersComponent.prototype.getCurrentMonster = function () {
        return this.monster;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], MonstersComponent.prototype, "monsterId", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1__monsters_host_directive__["a" /* MonstersHostDirective */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__monsters_host_directive__["a" /* MonstersHostDirective */])
    ], MonstersComponent.prototype, "monsterHost", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2__monsters_screen_directive__["a" /* MonstersScreenDirective */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__monsters_screen_directive__["a" /* MonstersScreenDirective */])
    ], MonstersComponent.prototype, "screen", void 0);
    MonstersComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'monster',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/monsters.component.html"*/'<ng-template monster-host></ng-template>\n<ng-template monster-screen></ng-template>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/monsters.component.html"*/,
            // styleUrls: ['monsters.component.scss'],
            providers: [__WEBPACK_IMPORTED_MODULE_3__monsters_service__["a" /* MonstersService */]],
            host: {
                '[class]': 'monster.name + "__screen"',
                '[class.monster]': 'true',
            }
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */],
            __WEBPACK_IMPORTED_MODULE_3__monsters_service__["a" /* MonstersService */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewContainerRef */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */]])
    ], MonstersComponent);
    return MonstersComponent;
}());

//# sourceMappingURL=monsters.component.js.map

/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MonstersHostDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MonstersHostDirective = /** @class */ (function () {
    function MonstersHostDirective(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    MonstersHostDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Directive */])({
            selector: '[monster-host]',
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewContainerRef */]])
    ], MonstersHostDirective);
    return MonstersHostDirective;
}());

//# sourceMappingURL=monsters-host.directive.js.map

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MonstersScreenDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MonstersScreenDirective = /** @class */ (function () {
    function MonstersScreenDirective(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    MonstersScreenDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Directive */])({
            selector: '[monster-screen]',
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewContainerRef */]])
    ], MonstersScreenDirective);
    return MonstersScreenDirective;
}());

//# sourceMappingURL=monsters-screen.directive.js.map

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MonstersService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__zombie_zombie__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__skeleton_skeleton__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alien_alien__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__spider_spider__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__vampire_vampire__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__wolf_wolf__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__mummy_mummy__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__yaga_yaga__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__doctor_doctor__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__yeti_yeti__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ghost_ghost__ = __webpack_require__(181);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var MonstersService = /** @class */ (function () {
    function MonstersService() {
    }
    MonstersService.prototype.getMonsters = function () {
        return [
            {
                id: 1,
                anchor: 1,
                name: 'alien',
                component: __WEBPACK_IMPORTED_MODULE_3__alien_alien__["a" /* AlienComponent */],
            },
            {
                id: 2,
                anchor: 12,
                name: 'zombie',
                component: __WEBPACK_IMPORTED_MODULE_1__zombie_zombie__["a" /* ZombieComponent */],
            },
            {
                id: 3,
                anchor: 6,
                name: 'skeleton',
                component: __WEBPACK_IMPORTED_MODULE_2__skeleton_skeleton__["a" /* SkeletonComponent */],
            },
            {
                id: 4,
                anchor: 5,
                name: 'spider',
                component: __WEBPACK_IMPORTED_MODULE_4__spider_spider__["a" /* SpiderComponent */],
            },
            {
                id: 5,
                anchor: 11,
                name: 'vampire',
                component: __WEBPACK_IMPORTED_MODULE_5__vampire_vampire__["a" /* VampireComponent */],
            },
            {
                id: 6,
                anchor: 9,
                name: 'wolf',
                component: __WEBPACK_IMPORTED_MODULE_6__wolf_wolf__["a" /* WolfComponent */],
            },
            {
                id: 7,
                name: 'mummy',
                component: __WEBPACK_IMPORTED_MODULE_7__mummy_mummy__["a" /* MummyComponent */],
            },
            {
                id: 8,
                name: 'yaga',
                component: __WEBPACK_IMPORTED_MODULE_8__yaga_yaga__["a" /* YagaComponent */],
            },
            {
                id: 9,
                name: 'doctor',
                component: __WEBPACK_IMPORTED_MODULE_9__doctor_doctor__["a" /* DoctorComponent */],
            },
            {
                id: 10,
                name: 'yeti',
                component: __WEBPACK_IMPORTED_MODULE_10__yeti_yeti__["a" /* YetiComponent */],
            },
            {
                id: 11,
                name: 'ghost',
                component: __WEBPACK_IMPORTED_MODULE_11__ghost_ghost__["a" /* GhostComponent */],
            },
        ];
    };
    MonstersService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], MonstersService);
    return MonstersService;
}());

//# sourceMappingURL=monsters.service.js.map

/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ZombieComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__monster_model__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__animation_animation_set_controller__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__animation_animation_sequence_controller__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_imports_loader_this_window_fix_module_exports_0_snapsvg_dist_snap_svg_js__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_imports_loader_this_window_fix_module_exports_0_snapsvg_dist_snap_svg_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_imports_loader_this_window_fix_module_exports_0_snapsvg_dist_snap_svg_js__);
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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// @ts-ignore: Unreachable code error

var aniamtions = function (instance) {
    var _this = this;
    var root = __WEBPACK_IMPORTED_MODULE_4_imports_loader_this_window_fix_module_exports_0_snapsvg_dist_snap_svg_js___default()(instance);
    var config = {
        pupilL: { begin: 74.18, end: 64.18 },
        pupilR: { begin: 142.93, end: 132.93 },
        lids: { begin: 64, end: 97.54 }
    };
    return {
        getRoot: function () {
            return root;
        },
        eyes: function (cb) {
            if (cb === void 0) { cb = function () { }; }
            var eyesMovement = _this.snap.eyesMovement();
            var blink = _this.snap.blink();
            var timeLine = function () {
                setTimeout(blink, 0);
                setTimeout(function () {
                    eyesMovement(cb);
                }, 0);
            };
            timeLine();
            return timeLine;
        },
        blink: function (cb) {
            if (cb === void 0) { cb = function () { }; }
            var lids = _this.getParts(function (p) { return p.name === 'lid'; })
                .map(function (_a) {
                var element = _a.element;
                return __WEBPACK_IMPORTED_MODULE_4_imports_loader_this_window_fix_module_exports_0_snapsvg_dist_snap_svg_js___default()(element);
            });
            return function () {
                lids.forEach(function (l) {
                    l.animate({ cy: config.lids.end, }, 42, function () {
                        l.animate({ cy: config.lids.begin, }, 84, cb);
                    });
                });
            };
        },
        eyesMovement: function (cb) {
            if (cb === void 0) { cb = function () { }; }
            var pupils = _this.getParts(function (p) { return p.name === 'pupil'; })
                .reduce(function (acc, _a) {
                var mod = _a.mod, element = _a.element;
                return __assign({}, acc, (_b = {}, _b[mod] = __WEBPACK_IMPORTED_MODULE_4_imports_loader_this_window_fix_module_exports_0_snapsvg_dist_snap_svg_js___default()(element), _b));
                var _b;
            }, {});
            var animatePupilRightForward = function () { return pupils.right.animate({ cx: config.pupilR.end, }, 100); };
            var animatePupilLeftForward = function () { return pupils.left.animate({ cx: config.pupilL.end, }, 100); };
            var animatePupilRightBackward = function () { return pupils.right.animate({ cx: config.pupilR.begin, }, 250, cb); };
            var animatePupilLeftBackward = function () { return pupils.left.animate({ cx: config.pupilL.begin, }, 250, cb); };
            return function () {
                animatePupilRightForward();
                animatePupilLeftForward();
                setTimeout(function () {
                    animatePupilRightBackward();
                    animatePupilLeftBackward();
                }, 588);
            };
        },
        smile: function (arg) {
            var el = _this.getPart(function (p) { return p.name == 'mouth'; }).element;
            var mouth = __WEBPACK_IMPORTED_MODULE_4_imports_loader_this_window_fix_module_exports_0_snapsvg_dist_snap_svg_js___default()(el);
            var value = 'M102.43,194c15.36,0,27.81-7.55,27.81-16.86H74.62C74.62,186.43,87.07,194,102.43,194Z';
            var smileForward = function (cb) {
                mouth.attr({ class: 'fadeIn ' });
                mouth.animate({
                    d: 'M134.5,197.76c22.39-6.56,37.32-22.88,33.34-36.45L86.76,185.05C90.74,198.63,112.11,204.31,134.5,197.76Z',
                }, 200, cb);
                return smileBackward;
            };
            var smileBackward = function (cb) {
                mouth.attr({ class: 'fadeOut' });
                mouth.animate({ d: value, }, 200, cb);
                return smileForward;
            };
            return arg ? smileForward : smileBackward;
        },
        smileLids: function (arg) {
            var lids = _this.getParts(function (p) { return p.name === 'lid'; })
                .map(function (_a) {
                var element = _a.element;
                return __WEBPACK_IMPORTED_MODULE_4_imports_loader_this_window_fix_module_exports_0_snapsvg_dist_snap_svg_js___default()(element);
            });
            var config = { original: 64, end: 118, begin: 132 };
            var smileForward = function (cb) {
                if (cb === void 0) { cb = function () { }; }
                lids.forEach(function (l) {
                    l.attr({ cy: config.begin });
                    l.animate({ cy: config.end }, 200, cb);
                });
                return smileBackward;
            };
            var smileBackward = function (cb) {
                if (cb === void 0) { cb = function () { }; }
                lids.forEach(function (l) {
                    l.animate({ cy: config.begin }, 200, function () {
                        l.attr({ cy: config.original });
                        cb();
                        return;
                    });
                });
            };
            return arg ? smileForward : smileBackward;
        }
    };
};
var ZombieComponent = /** @class */ (function (_super) {
    __extends(ZombieComponent, _super);
    function ZombieComponent(el, renderer, componentFactoryResolver, injector, app) {
        var _this = _super.call(this, 'zombie', el.nativeElement, componentFactoryResolver, injector, app) || this;
        _this.renderer = renderer;
        return _this;
    }
    ZombieComponent.prototype.ngAfterViewInit = function () {
        this.snap = aniamtions.bind(this)(this.getRoot().element);
        var anims = {
            lid: {
                close: function (l, cb) { return l.animate({ cy: 97.54, }, 42, cb); },
                open: function (l, cb) { return l.animate({ cy: 64, }, 84, cb); },
            },
            pupil: {
                left: function (instance, cb) {
                    var cx = instance.attr().cx;
                    instance.animate({ cx: Number(cx) - 10 }, 100, cb);
                    return;
                },
                right: function (instance, cb) {
                    var cx = instance.attr().cx;
                    instance.animate({ cx: Number(cx) + 10 }, 250, cb);
                    return;
                }
            }
        };
        this.loadAnimations(anims);
        var pupils = this.getParts(function (p) { return p.name === 'pupil'; });
        var scheme = [
            'pupilsGoLeft',
            'pupilsGoRight'
        ];
        var animations = {
            pupilsGoLeft: function () { return pupils.forEach(function (l) {
                l.animations.run('left');
                return l.animations;
            }); },
            pupilsGoRight: function (cb) { return pupils.forEach(function (l) {
                l.animations.run('right');
                cb(l.animations);
                return;
            }); },
        };
        var seq = new __WEBPACK_IMPORTED_MODULE_3__animation_animation_sequence_controller__["a" /* AnimationSequenceController */](scheme, animations);
        // seq.run(1000);
        // console.time('clear');
        //
        // setTimeout(() => {
        //   seq.clear();
        //   console.timeEnd('clear');
        // }, 3200);
    };
    // isOnMonster(top, right, bootom, left) {
    //   console.log(Snap.getElementByPoint(top, left));
    //   return;
    // }
    ZombieComponent.prototype.loadAnimations = function (animations) {
        var _this = this;
        var partNames = Object.keys(animations);
        partNames.forEach(function (name) {
            _this.getParts(function (part) { return part.name === name; })
                .forEach(function (part) {
                return part.setAnimations(new __WEBPACK_IMPORTED_MODULE_2__animation_animation_set_controller__["a" /* AnimationSetController */](__WEBPACK_IMPORTED_MODULE_4_imports_loader_this_window_fix_module_exports_0_snapsvg_dist_snap_svg_js___default()(part.element), animations[name]));
            });
        });
    };
    ZombieComponent.prototype.animate = function (name) {
        return name ? this.snap[name] : true;
    };
    ZombieComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'zombie',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/zombie/zombie.html"*/'<svg monster-part part-type="root" width="auto" height="95%" viewBox="0 0 233.58 324.24" class="zombie svg-container" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n      <g class="">\n        <path monster-part part-outline="true" class="body" d="M260.9,280.8c0-64.94-53.13-118.07-118.07-118.07h0c-64.94,0-118.07,53.13-118.07,118.07V539.15H260.9Z"></path>\n        <g class="head" monster-part part-outline="true">\n          <g monster-part part-name="head-figure" part-type="group" class="head-figure">\n            <g class="hair">\n              <polygon points="132.33 -0.05 96.08 48.13 87.64 48.13 79.21 48.13 132.33 -0.05" class="hair-part"></polygon>\n              <polygon points="145.47 -0.05 109.21 48.13 100.78 48.13 92.34 48.13 145.47 -0.05" class="hair-part"></polygon>\n              <polygon points="158.6 -0.05 122.35 48.13 113.91 48.13 105.48 48.13 158.6 -0.05" class="hair-part"></polygon>\n            </g>\n            <rect x="18.13" y="47.84" width="168.14" height="168.14" rx="52.98" ry="52.98" class="face"></rect>\n          </g>\n          <g monster-part part-group="head-figure" part-type="container"></g>\n\n          <g monster-part part-name="eyes" part-type="group" class="eyes">\n            <g monster-part part-name="eye" part-name-mod="left" part-type="group" part-group="eyes" class="eye eye--left">\n              <ellipse class="eyeball" cx="66.08" cy="97.54" rx="27.81" ry="16.86"></ellipse>\n              <circle monster-part part-name="pupil" part-name-mod="left" part-type="element" part-group="eye" class="pupil pupil--left" cx="74.18" cy="97.32" r="8.32"></circle>\n            </g>\n            <g monster-part part-name="eye" part-name-mod="right" part-type="group" part-group="eyes" class="eye eye--right">\n              <ellipse class="eyeball" cx="135.7" cy="97.54" rx="27.81" ry="16.86"></ellipse>\n              <circle monster-part part-name="pupil" part-name-mod="right" part-type="element" part-group="eye" class="pupil pupil--right" cx="142.93" cy="97.32" r="8.32"></circle>\n            </g>\n          </g>\n          <g monster-part part-name="eyes-animation">\n            <clipPath id="eyeball--left-mask">\n              <ellipse class="" cx="66.08" cy="97.54" rx="27.81" ry="16.86"></ellipse>\n            </clipPath>\n            <ellipse monster-part part-name="lid" part-name-mod="left" part-type="element" part-group="eye" clip-path="url(#eyeball--left-mask)" class="eyeball eyeball--lid eyeball--left" cx="66.08" cy="64" rx="27.81" ry="16.86"></ellipse>\n\n            <clipPath id="eyeball--right-mask">\n              <ellipse class="" cx="135.7" cy="97.54" rx="27.81" ry="16.86"></ellipse>\n            </clipPath>\n            <ellipse monster-part part-name="lid" part-name-mod="right" part-type="element" part-group="eye" clip-path="url(#eyeball--right-mask)" class="eyeball eyeball--lid eyeball--right" cx="135.7" cy="64" rx="27.81" ry="16.86"></ellipse>\n          </g>\n          <g monster-part part-group="eyes" part-type="container"></g>\n          <path monster-part part-outline="true" d="M19.21,122.49A19.3,19.3,0,0,0,0,141.74H0A19.3,19.3,0,0,0,19.21,161h83.43v-38.5Z" class="nose"></path>\n          <path monster-part part-name="mouth" part-type="element" d="M102.43,194c15.36,0,27.81-7.55,27.81-16.86H74.62C74.62,186.43,87.07,194,102.43,194Z" class="mouth"></path>\n          <g class="steams">\n            <g class="steam steam--right">\n              <line x1="128.09" y1="159.01" x2="162.15" y2="124.95" class="steam-part"></line>\n              <line x1="130.88" y1="148.79" x2="138.31" y2="156.22" class="steam-part"></line>\n              <line x1="136.14" y1="143.53" x2="143.57" y2="150.96" class="steam-part"></line>\n              <line x1="141.4" y1="138.26" x2="148.84" y2="145.69" class="steam-part"></line>\n              <line x1="146.67" y1="133" x2="154.1" y2="140.43" class="steam-part"></line>\n              <line x1="151.93" y1="127.74" x2="159.36" y2="135.17" class="steam-part"></line>\n            </g>\n            <g class="steam steam--left">\n             <line class="steam-part" x1="40.51" y1="170.93" x2="74.57" y2="204.99"></line>\n             <line class="steam-part" x1="50.73" y1="173.71" x2="43.3" y2="181.14"></line>\n             <line class="steam-part" x1="55.99" y1="178.98" x2="48.56" y2="186.41"></line>\n             <line class="steam-part" x1="61.26" y1="184.24" x2="53.84" y2="191.67"></line>\n             <line class="steam-part" x1="66.52" y1="189.5" x2="59.09" y2="196.94"></line>\n             <line class="steam-part" x1="71.79" y1="194.77" x2="64.35" y2="202.2"></line>\n            </g>\n          </g>\n        </g>\n      </g>\n    </svg>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/zombie/zombie.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ApplicationRef */]])
    ], ZombieComponent);
    return ZombieComponent;
}(__WEBPACK_IMPORTED_MODULE_1__monster_model__["a" /* MonsterModel */]));

//# sourceMappingURL=zombie.js.map

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MonsterPartDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_uuid__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_uuid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_uuid__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MonsterPartDirective = /** @class */ (function () {
    function MonsterPartDirective(el, viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
        this.id = __WEBPACK_IMPORTED_MODULE_1_uuid___default()();
        this.element = el.nativeElement;
    }
    MonsterPartDirective.prototype.setAnimations = function (controller) {
        this.animations = controller;
        return;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('part-type'),
        __metadata("design:type", String)
    ], MonsterPartDirective.prototype, "type", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('part-name'),
        __metadata("design:type", String)
    ], MonsterPartDirective.prototype, "name", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('part-name-mod'),
        __metadata("design:type", String)
    ], MonsterPartDirective.prototype, "mod", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('part-group'),
        __metadata("design:type", String)
    ], MonsterPartDirective.prototype, "group", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('part-outline'),
        __metadata("design:type", Boolean)
    ], MonsterPartDirective.prototype, "outline", void 0);
    MonsterPartDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Directive */])({
            selector: '[monster-part]',
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewContainerRef */]])
    ], MonsterPartDirective);
    return MonsterPartDirective;
}());

//# sourceMappingURL=monster-part.directive.js.map

/***/ }),

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SkeletonComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__monster_model__ = __webpack_require__(12);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SkeletonComponent = /** @class */ (function (_super) {
    __extends(SkeletonComponent, _super);
    function SkeletonComponent(el, renderer, componentFactoryResolver, injector, app) {
        var _this = _super.call(this, 'skeleton', el.nativeElement, componentFactoryResolver, injector, app) || this;
        _this.el = el;
        _this.renderer = renderer;
        return _this;
    }
    SkeletonComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'skeleton',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/skeleton/skeleton.html"*/'<svg class="skeleton svg-container" viewBox="0 0 200.62 322.01" width="auto" height="90%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n   <g class="">\n     <g class="body">\n        <rect class="rib" y="227.64" width="200.62" height="21.55"></rect>\n        <rect class="rib" y="264.11" width="200.62" height="21.55"></rect>\n        <rect class="rib" y="300.59" width="200.62" height="21.55"></rect>\n     </g>\n      <g class="head">\n         <ellipse monster-part part-name="head-figure" part-type="group" class="head head--figure" cx="99.95" cy="67.37" rx="89.2" ry="67.38"></ellipse>\n         <g monster-part part-group="head-figure" part-type="container"></g>\n         <g class="content">\n            <g monster-part part-name="mouth" part-type="group" class="jaws">\n               <g class="jaw jaw--top">\n                  <rect class="jaw" x="43.33" y="95.52" width="113.24" height="63.9"></rect>\n                  <g class="teeth">\n                     <rect class="tooth" x="53.24" y="143.29" width="10.75" height="10.75"></rect>\n                     <rect class="tooth" x="69.77" y="143.29" width="10.75" height="10.75"></rect>\n                     <rect class="tooth" x="86.3" y="143.29" width="10.75" height="10.75"></rect>\n                     <rect class="tooth" x="102.83" y="143.29" width="10.75" height="10.75"></rect>\n                     <rect class="tooth" x="119.37" y="143.29" width="10.75" height="10.75"></rect>\n                     <rect class="tooth" x="135.9" y="143.29" width="10.75" height="10.75"></rect>\n                  </g>\n               </g>\n               <g class="jaw jaw--bottom">\n                  <rect class="jaw" x="43.33" y="169.54" width="113.24" height="28.52"></rect>\n                  <g class="teeth">\n                     <rect class="tooth" x="53.24" y="178.43" width="10.75" height="10.75"></rect>\n                     <rect class="tooth" x="69.77" y="178.43" width="10.75" height="10.75"></rect>\n                     <rect class="tooth" x="86.3" y="178.43" width="10.75" height="10.75"></rect>\n                     <rect class="tooth" x="102.83" y="178.43" width="10.75" height="10.75"></rect>\n                     <rect class="tooth" x="119.37" y="178.43" width="10.75" height="10.75"></rect>\n                     <rect class="tooth" x="135.9" y="178.43" width="10.75" height="10.75"></rect>\n                  </g>\n               </g>\n            </g>\n            <g monster-part part-name="eyes" part-type="group" class="eyes">\n               <g monster-part part-name="eye" part-name-mod="left" part-type="group" part-group="eyes" class="eye eye--right">\n                  <circle class="eyeball" cx="129.44" cy="66.37" r="25.31"></circle>\n                  <circle class="pupil" cx="136.88" cy="58.14" r="10.09"></circle>\n               </g>\n               <g monster-part part-name="eye" part-name-mod="right" part-type="group" part-group="eyes" class="eye eye--left">\n                  <circle class="eyeball" cx="70.45" cy="66.37" r="25.31"></circle>\n                  <circle class="pupil" cx="72.84" cy="76.61" r="10.09"></circle>\n               </g>\n            </g>\n            <g monster-part part-group="mouth" part-type="container"></g>\n            <g monster-part part-group="eyes" part-type="container"></g>\n            <polygon class="nose" points="99.95 91.72 112.37 113.24 124.8 134.76 99.95 134.76 75.09 134.76 87.52 113.24 99.95 91.72"></polygon>\n         </g>\n      </g>\n   </g>\n</svg>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/skeleton/skeleton.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ApplicationRef */]])
    ], SkeletonComponent);
    return SkeletonComponent;
}(__WEBPACK_IMPORTED_MODULE_1__monster_model__["a" /* MonsterModel */]));

//# sourceMappingURL=skeleton.js.map

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlienComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__monster_model__ = __webpack_require__(12);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AlienComponent = /** @class */ (function (_super) {
    __extends(AlienComponent, _super);
    function AlienComponent(el, renderer, componentFactoryResolver, injector, app) {
        var _this = _super.call(this, 'alien', el.nativeElement, componentFactoryResolver, injector, app) || this;
        _this.el = el;
        _this.renderer = renderer;
        return _this;
    }
    AlienComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'alien',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/alien/alien.html"*/'<svg class="alien svg-container" viewBox="0 0 165.37 302.36" width="80%" height="80%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n	<g class="">\n		<ellipse class="body body--figure" cx="82.66" cy="285.78" rx="50.36" ry="139.24"></ellipse>\n		<g class="head">\n			<path monster-part part-name="head-figure" part-type="group" class="head head--figure" d="M82.67,153.65a39.12,39.12,0,0,1-33.88-19.56L5.25,58.69A39.13,39.13,0,0,1,39.13,0H126.2a39.13,39.13,0,0,1,33.88,58.69l-43.53,75.4A39.13,39.13,0,0,1,82.67,153.65Z"></path>\n			<g monster-part part-group="head-figure" part-type="container"></g>\n			<g class="content">\n				<g monster-part part-name="mouth" part-type="group">\n					<path monster-part part-name="mouth" part-type="element" part-group="mouth" class="mouth" d="M82.66,131.54a2.83,2.83,0,0,1-2.45-1.41l-3.15-5.45a2.83,2.83,0,0,1,2.45-4.24h6.29a2.83,2.83,0,0,1,2.45,4.24l-3.15,5.45A2.83,2.83,0,0,1,82.66,131.54Z"></path>\n				</g>\n				<g monster-part part-name="eyes" part-type="group" class="eyes">\n					<g monster-part part-name="eye" part-name-mod="left" part-type="group" part-group="eyes" class="eye eye--left">\n						<path class="eyeball" d="M25.19,26.89A52.14,52.14,0,0,0,77.36,79.06,52.14,52.14,0,0,0,25.19,26.89Z"></path>\n						<circle class="iris" cx="51.86" cy="53.61" r="15.32"></circle>\n						<circle class="pupil" cx="51.86" cy="53.61" r="7.21"></circle>\n					</g>\n					<g monster-part part-name="eye" part-name-mod="right" part-type="group" part-group="eyes" class="eye eye--right">\n						<path class="eyeball" d="M140.14,26.89A52.14,52.14,0,0,0,88,79.06,52.14,52.14,0,0,0,140.14,26.89Z"></path>\n						<circle class="iris" cx="113.53" cy="53.61" r="15.32"></circle>\n						<circle class="pupil" cx="113.53" cy="53.61" r="4.75"></circle>\n					</g>\n				</g>\n        <g monster-part part-group="eyes" part-type="container"></g>\n				<g class="nose">\n					<circle class="nostril nostril--left" cx="76.75" cy="99.18" r="2.49"></circle>\n					<circle class="nostril nostril--right" cx="88.6" cy="99.18" r="2.49"></circle>\n				</g>\n			</g>\n			<g monster-part part-group="mouth" part-type="container"></g>\n		</g>\n	</g>\n</svg>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/alien/alien.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ApplicationRef */]])
    ], AlienComponent);
    return AlienComponent;
}(__WEBPACK_IMPORTED_MODULE_1__monster_model__["a" /* MonsterModel */]));

//# sourceMappingURL=alien.js.map

/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpiderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__monster_model__ = __webpack_require__(12);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SpiderComponent = /** @class */ (function (_super) {
    __extends(SpiderComponent, _super);
    function SpiderComponent(el, renderer, componentFactoryResolver, injector, app) {
        var _this = _super.call(this, 'spider', el.nativeElement, componentFactoryResolver, injector, app) || this;
        _this.el = el;
        _this.renderer = renderer;
        return _this;
    }
    SpiderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'spider',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/spider/spider.html"*/'<svg class="spider svg-container" viewBox="-35 80 335 243" width="90%" height="90%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n   <g class="">\n      <line class="web decor__web" x1="131.28" y1="-370.69" x2="131.28" y2="73.95"></line>\n      <g class="body">\n         <g class="legs">\n            <g class="legs-pair legs-pair--top">\n               <polyline class="leg leg--left" points="16.65 99.33 51.1 64.87 85.55 99.33"></polyline>\n               <polyline class="leg leg--left" points="16.65 119.89 51.1 85.44 85.55 119.89"></polyline>\n               <polyline class="leg leg--left" points="16.65 140.45 51.1 106 85.55 140.45"></polyline>\n               <polyline class="leg leg--right" points="179.35 99.33 213.81 64.87 248.26 99.33"></polyline>\n               <polyline class="leg leg--right" points="179.35 119.89 213.81 85.44 248.26 119.89"></polyline>\n               <polyline class="leg leg--right" points="179.35 140.45 213.81 106 248.26 140.45"></polyline>\n            </g>\n            <g class="legs-pair legs-pair--bottom">\n               <polyline class="leg leg--left" points="-28.89 218.03 19.11 170.03 67.11 218.03"></polyline>\n               <polyline class="leg leg--left" points="-28.89 246.68 19.11 198.68 67.11 246.68"></polyline>\n               <polyline class="leg leg--left" points="-28.89 275.32 19.11 227.32 67.11 275.32"></polyline>\n               <polyline class="leg leg--right" points="197.79 218.03 245.79 170.03 293.79 218.03"></polyline>\n               <polyline class="leg leg--right" points="197.79 246.68 245.79 198.68 293.79 246.68"></polyline>\n               <polyline class="leg leg--right" points="197.79 275.32 245.79 227.32 293.79 275.32"></polyline>\n            </g>\n         </g>\n         <g class="body-figure">\n            <ellipse class="body-part body-part--colored" cx="132.45" cy="259.43" rx="74.06" ry="47.7"></ellipse>\n            <ellipse class="body-part" cx="132.45" cy="209.44" rx="74.06" ry="47.7"></ellipse>\n            <ellipse class="body-part body-part--colored" cx="132.45" cy="163.61" rx="74.06" ry="47.7"></ellipse>\n            <ellipse class="body-part" cx="132.45" cy="115.29" rx="74.06" ry="47.7"></ellipse>\n            <g class="decor">\n               <g class="mouth decor__mouth">\n                  <polygon class="tooth" points="112.44 244.6 109.19 224.94 115.68 224.94 112.44 244.6"></polygon>\n                  <polygon class="tooth" points="126.44 244.6 123.2 224.94 129.69 224.94 126.44 244.6"></polygon>\n                  <polygon class="tooth" points="139.93 244.6 136.69 224.94 143.18 224.94 139.93 244.6"></polygon>\n                  <polygon class="tooth" points="153.94 244.6 150.69 224.94 157.18 224.94 153.94 244.6"></polygon>\n               </g>\n               <polygon class="sting decor__sting" points="130.6 327.09 127.36 307.43 133.85 307.43 130.6 327.09"></polygon>\n            </g>\n         </g>\n      </g>\n      <g monster-part part-name="head-figure" part-type="group" class="head">\n         <g monster-part part-name="eyes" part-type="group" class="eyes">\n            <g monster-part part-name="eye" part-name-mod="left" part-type="group" class="eye eye--left">\n               <circle class="eyeball" cx="110.35" cy="104.04" r="17.91"></circle>\n               <circle class="pupil" cx="110.35" cy="104.04" r="9.83"></circle>\n            </g>\n            <g monster-part part-name="eye" part-name-mod="right" part-type="group" class="eye eye--right">\n               <circle class="eyeball" cx="154.55" cy="104.04" r="17.91"></circle>\n               <circle class="pupil" cx="154.55" cy="104.04" r="9.83"></circle>\n            </g>\n         </g>\n         <g monster-part part-group="eyes" part-type="container"></g>\n         <g monster-part part-name="mouth" part-type="group"  class="mouth">\n            <polygon class="tooth" points="124.93 145.45 121.69 125.79 128.18 125.79 124.93 145.45"></polygon>\n            <polygon class="tooth" points="138.93 145.45 135.69 125.79 142.18 125.79 138.93 145.45"></polygon>\n         </g>\n      </g>\n      <g monster-part part-group="head-figure" part-type="container"></g>\n      <g monster-part part-group="mouth" part-type="container"></g>\n\n   </g>\n</svg>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/spider/spider.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ApplicationRef */]])
    ], SpiderComponent);
    return SpiderComponent;
}(__WEBPACK_IMPORTED_MODULE_1__monster_model__["a" /* MonsterModel */]));

//# sourceMappingURL=spider.js.map

/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VampireComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__monster_model__ = __webpack_require__(12);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var VampireComponent = /** @class */ (function (_super) {
    __extends(VampireComponent, _super);
    function VampireComponent(el, renderer, componentFactoryResolver, injector, app) {
        var _this = _super.call(this, 'vampire', el.nativeElement, componentFactoryResolver, injector, app) || this;
        _this.el = el;
        _this.renderer = renderer;
        return _this;
    }
    VampireComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'vampire',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/vampire/vampire.html"*/'<svg class="dracula svg-container" viewBox="0 0 206.58 334.71" width="90%" height="95%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n   <g class="">\n      <g class="body">\n         <polygon class="body-part body-part--top" points="145.49 266.49 61.06 266.49 -0.03 166.71 206.59 166.71 145.49 266.49"></polygon>\n         <polygon class="body-part body-part--bottom" points="145 266.49 61.06 266.49 -34.33 620.09 240.88 620.09 145.49 266"></polygon>\n      </g>\n      <g class="head">\n         <g monster-part part-name="head-figure" part-type="group" class="head-figure">\n            <path class="hair-part hair-part--back" d="M79.78,3.64A30.21,30.21,0,0,1,69.23,51a30.2,30.2,0,1,0,34.49,48.06A49.66,49.66,0,1,0,79.78,3.64Z"></path>\n            <ellipse class="face" cx="103.28" cy="141.3" rx="32.84" ry="101.27"></ellipse>\n            <path class="hair-part hair-part--forward" d="M115,29.3a44.77,44.77,0,0,1-44.8,44.8l9-19.38,19-19.81Z"></path>\n         </g>\n         <g monster-part part-group="head-figure" part-type="container"></g>\n         <g class="ears">\n            <ellipse class="ear ear--left" cx="71.4" cy="115.56" rx="13.66" ry="18.22"></ellipse>\n            <ellipse class="ear ear--right" cx="135.15" cy="115.56" rx="13.66" ry="18.22"></ellipse>\n         </g>\n         <rect class="nose" x="99.92" y="93.91" width="6.03" height="87.44"></rect>\n         <g monster-part part-name="eyes" part-type="group" class="eyes">\n            <circle monster-part part-name="eye" part-name-mod="left" part-type="element" part-group="eyes" class="eye eye--left" cx="88.29" cy="108.56" r="6.46"></circle>\n            <circle monster-part part-name="eye" part-name-mod="right" part-type="element" part-group="eyes" class="eye eye--right" cx="118.01" cy="108.56" r="6.46"></circle>\n            <rect class="eyebrows" x="81.9" y="89.55" width="42.86" height="6.03"></rect>\n         </g>\n         <g monster-part part-group="eyes" part-type="container"></g>\n         <g monster-part part-name="mouth" part-type="group" class="mouth">\n            <g class="teeth">\n               <polygon class="tooth tooth--left" points="90.39 244.06 84.3 193.54 96.48 193.54 90.39 244.06"></polygon>\n               <polygon class="tooth tooth--right" points="116.67 244.06 110.58 193.54 122.75 193.54 116.67 244.06"></polygon>\n            </g>\n            <rect class="mouth-figure" x="82" y="190.5" width="42.86" height="6.03"></rect>\n            <path class="blood decor__blood" d="M120.05,267.44a2.51,2.51,0,1,1-5,.13c0-1.57.9-8.55,2.27-8.59S120,265.87,120.05,267.44Z"></path>\n         </g>\n         <g monster-part part-group="mouth" part-type="container"></g>\n      </g>\n   </g>\n</svg>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/vampire/vampire.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ApplicationRef */]])
    ], VampireComponent);
    return VampireComponent;
}(__WEBPACK_IMPORTED_MODULE_1__monster_model__["a" /* MonsterModel */]));

//# sourceMappingURL=vampire.js.map

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WolfComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__monster_model__ = __webpack_require__(12);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WolfComponent = /** @class */ (function (_super) {
    __extends(WolfComponent, _super);
    function WolfComponent(el, renderer, componentFactoryResolver, injector, app) {
        var _this = _super.call(this, 'wolf', el.nativeElement, componentFactoryResolver, injector, app) || this;
        _this.el = el;
        _this.renderer = renderer;
        return _this;
    }
    WolfComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'wolf',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/wolf/wolf.html"*/'<svg class="wolf svg-container" viewBox="0 0 264.56 322.51" width="90%" height="90%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n   <g class="wolf">\n      <rect class="body" x="-21" y="192.5" width="194.13" height="465.27"></rect>\n      <g class="head">\n         <g monster-part part-name="mouth" part-type="group" class="mouth">\n            <rect monster-part part-name="tongue" part-type="element" part-group="mouth" class="tongue" x="24.31" y="119.4" width="226.72" height="55.94" rx="27.93" ry="27.97"></rect>\n            <rect class="jaw" x="23.78" y="175.24" width="195.57" height="20.31"></rect>\n            <rect class="cheek" x="23.78" y="106.91" width="125.28" height="74.65"></rect>\n            <g class="teeth">\n               <polygon class="tooth" points="205.91 175.57 199.15 119.4 212.68 119.4 205.91 175.57"></polygon>\n               <polygon class="tooth" points="184.59 175.57 177.82 119.4 191.35 119.4 184.59 175.57"></polygon>\n               <polygon class="tooth" points="163.26 175.57 156.49 119.4 170.03 119.4 163.26 175.57"></polygon>\n            </g>\n            <g class="drooling decor__drooling">\n               <path class="saliva" d="M221.84,134.24a2.35,2.35,0,1,1-4.65.12c0-1.47.84-8,2.13-8S221.8,132.77,221.84,134.24Z"></path>\n               <path class="saliva" d="M229.73,188.83a2.35,2.35,0,1,1-4.65.12c0-1.47.84-8,2.13-8S229.7,187.36,229.73,188.83Z"></path>\n               <path class="saliva" d="M197.77,178.05a2.35,2.35,0,1,1-4.65.12c0-1.47.84-8,2.13-8S197.73,176.58,197.77,178.05Z"></path>\n               <path class="saliva" d="M176.22,161.17a2.35,2.35,0,1,1-4.65.12c0-1.47.84-8,2.13-8S176.19,159.7,176.22,161.17Z"></path>\n            </g>\n         </g>\n\n         <g class="nose">\n            <polygon class="snout" points="219.34 119.39 23.78 119.39 23.78 61.81 219.34 96.35 219.34 119.39"></polygon>\n            <circle class="nose-figure" cx="218.98" cy="95.93" r="8.93"></circle>\n         </g>\n         <g class="ears">\n           <polygon class="ear ear--left" points="46.7 0.05 23.78 56.72 69.63 56.72 46.7 0.05"></polygon>\n           <polygon class="ear ear--right" points="91.45 0.05 68.53 56.72 114.38 56.72 91.45 0.05"></polygon>\n         </g>\n         <rect monster-part part-name="head-figure" part-type="group" class="face" x="23.78" y="56.1" width="125.28" height="74.65"></rect>\n         <g monster-part part-group="head-figure" part-type="container"></g>\n         <g monster-part part-name="eyes" part-type="group" class="eyes">\n            <g monster-part part-name="eye" part-name-mod="left" part-type="group" part-group="eyes" class="eye eye--left">\n               <g class="eyeball">\n                  <path class="eyeball-part eyeball-part--top" d="M53.75,82.9a22.69,22.69,0,0,0,32.1,0"></path>\n                  <path class="eyeball-part eyeball-part--bottom" d="M85.86,82.9a22.69,22.69,0,0,0-32.1,0"></path>\n               </g>\n               <g class="pupil">\n                  <path class="pupil-part pupil-part--top" d="M69.8,76.25a9.41,9.41,0,0,0,0,13.31"></path>\n                  <path class="pupil-part pupil-part--bottom" d="M69.8,89.56a9.41,9.41,0,0,0,0-13.31"></path>\n               </g>\n            </g>\n            <g monster-part part-name="eye" part-name-mod="right" part-type="group" part-group="eyes" class="eye eye--right">\n               <g class="eyeball">\n                  <path class="eyeball-part eyeball-part--top" d="M95,82.9a22.69,22.69,0,0,0,32.1,0"></path>\n                  <path class="eyeball-part eyeball-part--bottom" d="M127.11,82.9a22.69,22.69,0,0,0-32.1,0"></path>\n               </g>\n               <g class="pupil">\n                  <path class="pupil-part pupil-part--top" d="M111.06,76.25a9.41,9.41,0,0,0,0,13.31"></path>\n                  <path class="pupil-part pupil-part--bottom" d="M111.06,89.56a9.41,9.41,0,0,0,0-13.31"></path>\n               </g>\n            </g>\n         </g>\n         <g monster-part part-group="eyes" part-type="container"></g>\n      </g>\n      <g monster-part part-group="mouth" part-type="container"></g>\n\n   </g>\n</svg>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/wolf/wolf.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ApplicationRef */]])
    ], WolfComponent);
    return WolfComponent;
}(__WEBPACK_IMPORTED_MODULE_1__monster_model__["a" /* MonsterModel */]));

//# sourceMappingURL=wolf.js.map

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MummyComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__monster_model__ = __webpack_require__(12);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MummyComponent = /** @class */ (function (_super) {
    __extends(MummyComponent, _super);
    function MummyComponent(el, renderer, componentFactoryResolver, injector, app) {
        var _this = _super.call(this, 'mummy', el.nativeElement, componentFactoryResolver, injector, app) || this;
        _this.el = el;
        _this.renderer = renderer;
        return _this;
    }
    MummyComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'mummy',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/mummy/mummy.html"*/'<svg monster-part part-type="root" width="80%" height="80%"  class="mummy svg-container" viewBox="0 0 266.33 334.62" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n   <g class="">\n      <g monster-part part-outline="true" class="body">\n         <path class="bandage decor__bandage body__bandage" d="M364.14,242.55c-12.14,0-12.14,13.71-24.29,13.71s-12.14-13.71-24.29-13.71-12.14,13.71-24.27,13.71S279.17,242.55,267,242.55s-12.13,13.71-24.26,13.71-12.13-13.71-24.26-13.71-12.13,13.71-24.26,13.71S182.13,242.55,170,242.55V269.8c12.13,0,12.13,13.71,24.26,13.71s12.13-13.71,24.26-13.71,12.13,13.71,24.26,13.71S254.91,269.8,267,269.8s12.13,13.71,24.25,13.71,12.14-13.71,24.27-13.71,12.14,13.71,24.29,13.71S352,269.8,364.14,269.8Z"></path>\n         <path class="body-part" d="M216.21,255.72a163.68,163.68,0,0,0-83.74-23h0A164.49,164.49,0,0,0,17.82,279.36l48,20.83Z"></path>\n         <path class="body-part" d="M-11.92,318.07H5.39l60.45-17.88-48-20.83A166.73,166.73,0,0,0-11.92,318.07Z"></path>\n         <path class="body-part body-part--dark" d="M-15.12,324.14l20.51-6.07H-11.92C-13,320.07-14.09,322.1-15.12,324.14Z"></path>\n         <path class="body-part body-part--dark" d="M216.21,255.72,65.84,300.19,5.39,318.07l-20.51,6.07a163.48,163.48,0,0,0-17.35,67.41c0,.05,0,.11,0,.17l309.16-73.95A167,167,0,0,0,216.21,255.72Z"></path>\n         <path class="body-part" d="M276.88,318.07l-.19-.31L-32.47,391.72c-.08,2-.16,4.05-.16,6.1v7.94l171.23,15.94L257,391.55l12.28-3.13,27.52-7A163.59,163.59,0,0,0,276.88,318.07Z"></path>\n      </g>\n      <g class="head">\n         <path class="bandage bandage--head decor__bandage head__bandage" d="M270.44,14.09c-7.59,0-7.59,8.56-15.17,8.56s-7.59-8.56-15.17-8.56-7.58,8.56-15.16,8.56-7.58-8.56-15.15-8.56-7.58,8.56-15.16,8.56-7.58-8.56-15.15-8.56-7.58,8.56-15.15,8.56-7.58-8.56-15.15-8.56v17c7.58,0,7.58,8.56,15.15,8.56s7.58-8.56,15.15-8.56,7.58,8.56,15.15,8.56,7.58-8.56,15.16-8.56,7.58,8.56,15.15,8.56,7.58-8.56,15.16-8.56,7.59,8.56,15.17,8.56,7.59-8.56,15.17-8.56Z"></path>\n         <g monster-part part-outline="true" class="ears">\n            <circle class="ear ear--ear-left" cx="61.37" cy="110.92" r="22.96"></circle>\n            <circle class="ear ear--ear-right" cx="203.59" cy="110.92" r="22.96"></circle>\n         </g>\n         <g monster-part part-name="head-figure" part-type="group" part-outline="true" class="head-figure">\n            <path class="head-part" d="M132.48,0C115,0,99,10.15,86.48,27L192.57,52.62C179.62,20.89,157.55,0,132.48,0Z"></path>\n            <path class="head-part head-part--dark" d="M192.57,52.62,86.48,27C75.15,42.38,66.74,63.27,62.78,87.16l130.41-33C193,53.67,192.79,53.14,192.57,52.62Z"></path>\n            <path class="head-part head-part--empty" d="M193.19,54.2,80.54,82.67l75.09,17.26,45.85-16.81A160.27,160.27,0,0,0,193.19,54.2Z"></path>\n            <path class="head-part" d="M62.78,87.16a189.68,189.68,0,0,0-2.53,31c0,5.6.26,11.11.72,16.5l94.65-34.71L80.54,82.67Z"></path>\n            <path class="head-part head-part--dark" d="M62.33,146.29,203,143.48a191.36,191.36,0,0,0,1.68-25.34,188.5,188.5,0,0,0-3.23-35L61,134.64Q61.48,140.56,62.33,146.29Z"></path>\n            <path class="head-part" d="M64.24,156.85l128.89,25.39A165.12,165.12,0,0,0,203,143.48L62.33,146.29Q63.14,151.67,64.24,156.85Z"></path>\n            <path class="head-part head-part--dark" d="M64.68,158.76a150.89,150.89,0,0,0,11.06,32.42l110,6.67c1.22-2.19,2.39-4.46,3.5-6.8Z"></path>\n            <path class="head-part" d="M132.48,236.28c21.11,0,40.09-14.82,53.3-38.43l-110-6.67C89,218.64,109.45,236.28,132.48,236.28Z"></path>\n         </g>\n         <g monster-part part-group="head-figure" part-type="container"></g>\n         <g monster-part part-name="mouth" part-type="group" class="mouth">\n            <path monster-part part-name="mouth" part-type="element" part-group="mouth" class="mouth-figure" d="M193.13,182.24,64.24,156.85c.14.64.29,1.27.43,1.91l124.6,32.29Q191.32,186.79,193.13,182.24Z"></path>\n            <polygon class="tooth" points="145.34 186.66 134.48 186.66 134.48 170.68 145.34 172.81 145.34 186.66"></polygon>\n         </g>\n         <g monster-part part-group="mouth" part-type="container"></g>\n         <g monster-part part-name="eyes" part-type="group" class="eyes">\n            <g monster-part part-name="eye" part-name-mod="left" part-type="group" part-group="eyes" class="eye eye--left">\n               <circle class="eyeball" cx="102.5" cy="82.46" r="8.94"></circle>\n               <circle class="pupil" cx="102.5" cy="82.46" r="4.41"></circle>\n            </g>\n            <g monster-part part-name="eye" part-name-mod="right" part-type="group" part-group="eyes" class="eye eye--right">\n               <circle class="eyeball" cx="161.09" cy="82.46" r="8.94"></circle>\n               <circle class="pupil" cx="161.09" cy="82.46" r="4.41"></circle>\n            </g>\n         </g>\n         <g monster-part part-group="eyes" part-type="container"></g>\n      </g>\n   </g>\n</svg>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/mummy/mummy.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ApplicationRef */]])
    ], MummyComponent);
    return MummyComponent;
}(__WEBPACK_IMPORTED_MODULE_1__monster_model__["a" /* MonsterModel */]));

//# sourceMappingURL=mummy.js.map

/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YagaComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__monster_model__ = __webpack_require__(12);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var YagaComponent = /** @class */ (function (_super) {
    __extends(YagaComponent, _super);
    function YagaComponent(el, renderer, componentFactoryResolver, injector, app) {
        var _this = _super.call(this, 'yaga', el.nativeElement, componentFactoryResolver, injector, app) || this;
        _this.el = el;
        _this.renderer = renderer;
        return _this;
    }
    YagaComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'yaga',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/yaga/yaga.html"*/'<svg width="80%" height="80%" class="yaga svg-container" viewBox="0 0 233.58 324.24" width="auto" height="95%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n   <g class="">\n      <g class="body">\n         <path class="body-figure" d="M0,526.25V299.52a69.37,69.37,0,0,1,69.17-69.17h44.62V525.5Z"></path>\n         <g class="ornament decor__ornament">\n            <circle class="ornament-part" cx="31.56" cy="265.47" r="4.89"></circle>\n            <circle class="ornament-part" cx="54.23" cy="252.58" r="4.89"></circle>\n            <circle class="ornament-part" cx="17.78" cy="291.7" r="4.89"></circle>\n            <circle class="ornament-part" cx="94.23" cy="313.03" r="4.89"></circle>\n         </g>\n      </g>\n      <g class="head">\n         <g monster-part part-name="head-figure" part-type="group" class="head-figure">\n            <g class="shawl shawl--decor__shawl">\n               <path class="shawl-part" d="M96.38.07a196.7,196.7,0,0,1,0,278.33A196.7,196.7,0,0,1,96.38.07Z"></path>\n               <path class="shawl-part" d="M26.33,330.41A73.62,73.62,0,0,1,100,256.75,73.62,73.62,0,0,1,26.33,330.41Z"></path>\n               <path class="shawl-part" d="M92.76,256.75a73.62,73.62,0,0,1,73.66,73.66A73.62,73.62,0,0,1,92.76,256.75Z"></path>\n               <circle class="shawl-part" cx="96.38" cy="269.15" r="26.63"></circle>\n            </g>\n            <rect class="face" x="72.11" y="38.2" width="48.53" height="202.49" rx="24.27" ry="24.27"></rect>\n         </g>\n				 <g monster-part part-group="head-figure" part-type="container"></g>\n         <g monster-part part-name="eyes" part-type="group" class="eyes">\n            <g monster-part part-name="eye" part-name-mod="left" part-type="group" part-group="eyes" class="eye eye--left">\n               <circle class="eyeball" cx="79.94" cy="81" r="11.98"></circle>\n               <circle class="pupil" cx="79.94" cy="81" r="6.14"></circle>\n            </g>\n            <g monster-part part-name="eye" part-name-mod="right" part-type="group" part-group="eyes" class="eye eye--right">\n               <circle class="eyeball" cx="112.78" cy="81" r="15.2"></circle>\n               <circle class="pupil" cx="112.78" cy="81" r="7.79"></circle>\n            </g>\n         </g>\n				 <g monster-part part-group="eyes" part-type="container"></g>\n         <path class="nose" d="M96.62,109a13.69,13.69,0,0,1,12.54,13.6V157H96.62Z"></path>\n         <g monster-part part-name="mouth" part-type="group" class="mouth">\n            <rect class="mouth-figure" x="81.54" y="185.9" width="39.1" height="8.83"></rect>\n            <rect class="tooth" x="94.68" y="185.9" width="4.48" height="4.48"></rect>\n            <rect class="tooth" x="102.67" y="185.9" width="4.48" height="4.48"></rect>\n         </g>\n         <g monster-part part-group="mouth" part-type="container"></g>\n      </g>\n   </g>\n</svg>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/yaga/yaga.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ApplicationRef */]])
    ], YagaComponent);
    return YagaComponent;
}(__WEBPACK_IMPORTED_MODULE_1__monster_model__["a" /* MonsterModel */]));

//# sourceMappingURL=yaga.js.map

/***/ }),

/***/ 179:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DoctorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__monster_model__ = __webpack_require__(12);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DoctorComponent = /** @class */ (function (_super) {
    __extends(DoctorComponent, _super);
    function DoctorComponent(el, renderer, componentFactoryResolver, injector, app) {
        var _this = _super.call(this, 'doctor', el.nativeElement, componentFactoryResolver, injector, app) || this;
        _this.el = el;
        _this.renderer = renderer;
        return _this;
    }
    DoctorComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'doctor',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/doctor/doctor.html"*/'<svg width="80%" height="80%" class="doctor svg-container" viewBox="0 0 150.13 337.94" width="auto" height="96%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n   <g class="">\n      <path class="body" d="M150.15,332a75.32,75.32,0,0,0-75.1-75.1h0A75.32,75.32,0,0,0,0,332V761.33h150.2Z"></path>\n      <g class="head">\n         <ellipse  monster-part part-name="head-figure" part-type="group" class="head-figure" cx="75.42" cy="173.19" rx="49.17" ry="117.42"></ellipse>\n				 <g monster-part part-group="head-figure" part-type="container"></g>\n         <g class="hat decor__hat">\n            <rect class="hat-figure" x="40.23" width="70.38" height="90.75"></rect>\n            <rect class="cross cross--vertical" x="69.55" y="22.99" width="11.74" height="51.37"></rect>\n            <rect class="cross cross--horizontal" x="50" y="42.8" width="51.37" height="11.74"></rect>\n         </g>\n         <g class="ears">\n            <ellipse class="ear ear--left" cx="25.38" cy="169.88" rx="11.3" ry="26.99"></ellipse>\n            <ellipse class="ear ear--right" cx="124.87" cy="169.88" rx="11.3" ry="26.99"></ellipse>\n         </g>\n         <g monster-part part-name="eyes" part-type="group" class="eyes">\n            <circle monster-part part-name="eye" part-name-mod="left" part-type="element" part-group="eyes" class="eye eye--left" cx="55.81" cy="143.35" r="6.53"></circle>\n            <circle monster-part part-name="eye" part-name-mod="right" part-type="element" part-group="eyes" class="eye eye--right" cx="92.44" cy="137.48" r="12.06"></circle>\n         </g>\n				 <g monster-part part-group="eyes" part-type="container"></g>\n         <rect class="nose" x="69.96" y="161.94" width="10.92" height="53.82"></rect>\n         <g monster-part part-name="mouth" part-type="group" class="mouth">\n            <rect class="mouth-figure" x="52.67" y="225.05" width="45.5" height="7.34"></rect>\n            <rect class="tooth" x="61.64" y="231.9" width="10.92" height="15.17"></rect>\n            <rect class="tooth" x="78.28" y="231.9" width="10.92" height="15.17"></rect>\n         </g>\n         <g monster-part part-group="mouth" part-type="container"></g>\n\n      </g>\n   </g>\n</svg>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/doctor/doctor.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ApplicationRef */]])
    ], DoctorComponent);
    return DoctorComponent;
}(__WEBPACK_IMPORTED_MODULE_1__monster_model__["a" /* MonsterModel */]));

//# sourceMappingURL=doctor.js.map

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YetiComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__monster_model__ = __webpack_require__(12);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var YetiComponent = /** @class */ (function (_super) {
    __extends(YetiComponent, _super);
    function YetiComponent(el, renderer, componentFactoryResolver, injector, app) {
        var _this = _super.call(this, 'yeti', el.nativeElement, componentFactoryResolver, injector, app) || this;
        _this.el = el;
        _this.renderer = renderer;
        return _this;
    }
    YetiComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'yeti',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/yeti/yeti.html"*/'<svg class="yeti svg-container" viewBox="0 0 264.56 322.51" width="100%" height="90%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n   <g class="">\n      <rect class="body" x="-47.31" y="96.49" width="336.14" height="556.92" rx="156.32" ry="156.32"></rect>\n      <g class="head">\n         <g monster-part part-name="head-figure" part-type="group" class="face-figure">\n            <polygon class="hair" points="133.72 -0.04 139.54 26.87 148.68 0.9 151.07 28.33 163.39 3.71 162.33 31.22 177.64 8.34 173.13 35.5 191.19 14.71 183.32 41.1 203.84 22.74 192.72 47.93 215.39 32.29 201.2 55.89 225.64 43.21 208.61 64.84 234.45 55.33 214.84 74.66 241.66 68.46 219.78 85.18 247.18 82.39 223.38 96.23 250.9 96.9 225.55 107.65 252.78 111.76 226.28 119.25 252.78 126.74 225.55 130.85 250.9 141.6 223.38 142.27 247.18 156.11 219.78 153.32 241.66 170.04 214.84 163.84 234.45 183.17 208.61 173.65 225.64 195.29 201.2 182.61 215.39 206.21 192.72 190.57 203.84 215.76 183.32 197.4 191.19 223.78 173.13 203 177.64 230.16 162.33 207.28 163.39 234.79 151.07 210.17 148.68 237.6 139.54 211.63 133.72 238.54 127.91 211.63 118.77 237.6 116.38 210.17 104.06 234.79 105.12 207.28 89.81 230.16 94.32 203 76.26 223.78 84.13 197.4 63.61 215.76 74.73 190.57 52.06 206.21 66.25 182.61 41.81 195.29 58.84 173.65 33 183.17 52.62 163.84 25.79 170.04 47.67 153.32 20.27 156.11 44.07 142.27 16.55 141.6 41.9 130.85 14.67 126.74 41.17 119.25 14.67 111.76 41.9 107.65 16.55 96.9 44.07 96.23 20.27 82.39 47.67 85.18 25.79 68.46 52.62 74.66 33 55.33 58.84 64.84 41.81 43.21 66.25 55.89 52.06 32.29 74.73 47.93 63.61 22.74 84.13 41.1 76.26 14.71 94.32 35.5 89.81 8.34 105.12 31.22 104.06 3.71 116.38 28.33 118.77 0.9 127.91 26.87 133.72 -0.04"></polygon>\n            <ellipse class="face" cx="133.73" cy="99.05" rx="70.61" ry="54.35"></ellipse>\n         </g>\n				 <g monster-part part-group="head-figure" part-type="container"></g>\n         <g class="ears">\n            <ellipse class="ear ear--left" cx="68.67" cy="98.73" rx="16.3" ry="12.55"></ellipse>\n            <ellipse class="ear ear--right" cx="197.58" cy="98.73" rx="16.3" ry="12.55"></ellipse>\n         </g>\n         <g class="mouth">\n            <rect class="jaw" x="75.52" y="117.65" width="116.41" height="64.46"></rect>\n            <rect class="mouth-figure" x="82.73" y="132.72" width="101.97" height="43.29"></rect>\n            <path class="lips" d="M182.79,134.64v39.44H84.66V134.64h98.13m3.85-3.85H80.81v47.14H186.64V130.79Z"></path>\n            <g class="tooth">\n               <g class="teeth-top">\n                  <polygon class="tooth" points="161.13 160.77 155.1 134.64 167.16 134.64 161.13 160.77"></polygon>\n                  <polygon class="tooth" points="142.13 160.77 136.1 134.64 148.16 134.64 142.13 160.77"></polygon>\n                  <polygon class="tooth" points="123.13 160.77 117.1 134.64 129.16 134.64 123.13 160.77"></polygon>\n                  <polygon class="tooth" points="104.13 160.77 98.1 134.64 110.16 134.64 104.13 160.77"></polygon>\n               </g>\n               <g class="teeth-bottom">\n                  <polygon class="tooth" points="94.75 147.96 100.78 174.09 88.72 174.09 94.75 147.96"></polygon>\n                  <polygon class="tooth" points="113.75 147.96 119.78 174.09 107.72 174.09 113.75 147.96"></polygon>\n                  <polygon class="tooth" points="132.75 147.96 138.78 174.09 126.72 174.09 132.75 147.96"></polygon>\n                  <polygon class="tooth" points="151.75 147.96 157.78 174.09 145.72 174.09 151.75 147.96"></polygon>\n                  <polygon class="tooth" points="170.75 147.96 176.78 174.09 164.72 174.09 170.75 147.96"></polygon>\n               </g>\n            </g>\n         </g>\n         <g monster-part part-name="eyes" part-type="group" class="eyes">\n            <circle monster-part part-name="eye" part-name-mod="left" part-type="element" part-group="eyes" class="eye eye--left" cx="114.32" cy="79.49" r="5.77"></circle>\n            <circle monster-part part-name="eye" part-name-mod="right" part-type="element" part-group="eyes" class="eye eye--right" cx="153.13" cy="79.49" r="5.77"></circle>\n         </g>\n				 <g monster-part part-group="eyes" part-type="container"></g>\n         <path class="nose" d="M160.8,101.61h-26V113.8h26a6.11,6.11,0,0,0,6.09-6.09h0A6.11,6.11,0,0,0,160.8,101.61Z"></path>\n      </g>\n   </g>\n</svg>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/yeti/yeti.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ApplicationRef */]])
    ], YetiComponent);
    return YetiComponent;
}(__WEBPACK_IMPORTED_MODULE_1__monster_model__["a" /* MonsterModel */]));

//# sourceMappingURL=yeti.js.map

/***/ }),

/***/ 181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GhostComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__monster_model__ = __webpack_require__(12);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GhostComponent = /** @class */ (function (_super) {
    __extends(GhostComponent, _super);
    function GhostComponent(el, renderer, componentFactoryResolver, injector, app) {
        var _this = _super.call(this, 'ghost', el.nativeElement, componentFactoryResolver, injector, app) || this;
        _this.el = el;
        _this.renderer = renderer;
        return _this;
    }
    GhostComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'ghost',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/ghost/ghost.html"*/'<svg class="ghost svg-container" viewBox="0 0 245.74 325.76" width="100%" height="90%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n   <g class="">\n      <defs class="defs">\n         <clipPath class="clipPath" id="mouth-clip-path">\n            <ellipse class="mouth-clip-path-figure" cx="122.87" cy="152.77" rx="28.28" ry="61.84"></ellipse>\n         </clipPath>\n      </defs>\n      <path monster-part part-name="head-figure" part-type="group" class="body" d="M122.87,0C50.59,0-8,222.7-8,497.41q0,5.15,0,10.26c.32,0,.62.07.95.07,21.75,0,21.75-48.95,43.49-48.95S58.22,507.74,80,507.74s21.75-48.95,43.5-48.95,21.75,48.95,43.51,48.95,21.75-48.95,43.51-48.95,21.76,48.49,43.22,48.93q0-5.14,0-10.31C253.74,222.7,195.14,0,122.87,0Z"></path>\n			<g monster-part part-group="head-figure" part-type="container"></g>\n      <g monster-part part-name="eyes" part-type="group" class="eyes">\n         <g monster-part part-name="eye" part-name-mod="left" part-type="group" part-group="eyes" class="eye eye--left">\n            <path class="pupil" d="M104.3,76.32A10.75,10.75,0,1,1,115,65.57,10.76,10.76,0,0,1,104.3,76.32Z"></path>\n            <path class="eyeball" d="M104.3,58.58a7,7,0,1,1-7,7,7,7,0,0,1,7-7m0-7.52a14.51,14.51,0,1,0,14.51,14.51A14.51,14.51,0,0,0,104.3,51.06Z"></path>\n         </g>\n         <g monster-part part-name="eye" part-name-mod="right" part-type="group" part-group="eyes" class="eye eye--right">\n            <path class="pupil" d="M141.44,76.32a10.75,10.75,0,1,1,10.75-10.75A10.76,10.76,0,0,1,141.44,76.32Z"></path>\n            <path class="eyeball" d="M141.44,58.58a7,7,0,1,1-7,7,7,7,0,0,1,7-7m0-7.52a14.51,14.51,0,1,0,14.51,14.51,14.51,14.51,0,0,0-14.51-14.51Z"></path>\n         </g>\n      </g>\n			<g monster-part part-group="eyes" part-type="container"></g>\n      <g monster-part part-name="mouth" part-type="group" class="mouth">\n         <ellipse class="mouth-figure" cx="122.87" cy="152.77" rx="28.28" ry="61.84"></ellipse>\n         <path class="ubula" d="M148.48,125.93c-.46-.25-6-3.12-11.73-.12s-6.62,9.44-6.6,10.64a16.42,16.42,0,0,0,.53,3.55h0a12,12,0,0,0,2.26,4.15l.21.29a10.68,10.68,0,0,1,1.52,5.86,12,12,0,0,1-24,0,11.48,11.48,0,0,1,2.06-6.56l.22-.29a12,12,0,0,0,1.71-3.43h0a12.06,12.06,0,0,1,.54-3.57c.45-1.55-.73-8.54-5.58-10.64-4.17-1.8-10.2.39-13.23,5.9,3.69-21.4,12.94-40.07,26.25-40.76a26.29,26.29,0,0,1,2.71.13C140.48,93.34,147,119.22,148.48,125.93Z"></path>\n         <g class="teeth">\n            <path class="tooth" d="M121.8,105.44h-8.23L114,94.14a13.26,13.26,0,0,1,5.93-2.92A12.42,12.42,0,0,1,121.8,91Z"></path>\n            <path class="tooth" d="M132.42,105.44h-8.23L124.53,91a14.62,14.62,0,0,1,2.74.5,14.92,14.92,0,0,1,5.14,2.63q-.07,2.22-.09,4.53Q132.3,102.15,132.42,105.44Z"></path>\n         </g>\n      </g>\n      <g monster-part part-group="mouth" part-type="container"></g>\n   </g>\n</svg>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/ghost/ghost.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ApplicationRef */]])
    ], GhostComponent);
    return GhostComponent;
}(__WEBPACK_IMPORTED_MODULE_1__monster_model__["a" /* MonsterModel */]));

//# sourceMappingURL=ghost.js.map

/***/ }),

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameFinistStateMachine; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_javascript_state_machine__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_javascript_state_machine___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_javascript_state_machine__);

var GameFinistStateMachine = /** @class */ (function () {
    function GameFinistStateMachine() {
        var _this = this;
        this.stateMethodsHandler = function (name) {
            return function (obj) {
                return _this.fnsRegister[name].forEach(function (fn) {
                    return fn(obj, _this);
                });
            };
        };
        this.fnsRegister = { select: [], grab: [], moveIn: [], moveOut: [], destroy: [], place: [], unselect: [] };
        this.state = new __WEBPACK_IMPORTED_MODULE_0_javascript_state_machine___default.a({
            init: 'idle',
            transitions: [
                { name: 'select', from: 'idle', to: 'itemSelected' },
                { name: 'unselect', from: 'itemSelected', to: 'idle' },
                { name: 'grab', from: 'itemSelected', to: 'draggedOut' },
                { name: 'moveIn', from: 'draggedOut', to: 'draggedIn' },
                { name: 'moveOut', from: 'draggedIn', to: 'draggedOut' },
                { name: 'destroy', from: 'draggedOut', to: 'idle' },
                { name: 'place', from: 'draggedIn', to: 'idle' },
            ],
            methods: {
                onSelect: this.stateMethodsHandler('select'),
                onUnselect: this.stateMethodsHandler('unselect'),
                onGrab: this.stateMethodsHandler('grab'),
                onMoveIn: this.stateMethodsHandler('moveIn'),
                onMoveOut: this.stateMethodsHandler('moveOut'),
                onDestroy: this.stateMethodsHandler('destroy'),
                onPlace: this.stateMethodsHandler('place'),
            }
        });
    }
    ;
    GameFinistStateMachine.prototype.setFns = function (name) {
        var fns = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            fns[_i - 1] = arguments[_i];
        }
        var oldFns = this.fnsRegister[name];
        this.fnsRegister[name] = oldFns.concat(fns);
        return this;
    };
    GameFinistStateMachine.prototype.next = function (fn) {
    };
    GameFinistStateMachine.prototype.select = function () {
        this.state.select();
        return this;
    };
    GameFinistStateMachine.prototype.unselect = function () {
        this.state.unselect();
        return this;
    };
    GameFinistStateMachine.prototype.grab = function () {
        this.state.grab();
        return this;
    };
    GameFinistStateMachine.prototype.moveOut = function () {
        this.state.moveOut();
        return this;
    };
    GameFinistStateMachine.prototype.moveIn = function () {
        this.state.moveIn();
        return this;
    };
    GameFinistStateMachine.prototype.destroy = function () {
        this.state.destroy();
        return this;
    };
    GameFinistStateMachine.prototype.place = function () {
        this.state.place();
        return this;
    };
    GameFinistStateMachine.prototype.isIdle = function () {
        return this.state.is('idle');
    };
    GameFinistStateMachine.prototype.isDraggedOut = function () {
        return this.state.is('draggedOut');
    };
    GameFinistStateMachine.prototype.isDraggedIn = function () {
        return this.state.is('draggedIn');
    };
    return GameFinistStateMachine;
}());

//# sourceMappingURL=game-fsm.js.map

/***/ }),

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListnersHandler; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__listner_register_class__ = __webpack_require__(296);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};

var ListnersHandler = /** @class */ (function () {
    function ListnersHandler(r) {
        this.r = r;
        this.register = new __WEBPACK_IMPORTED_MODULE_0__listner_register_class__["a" /* ListnerRegister */]();
    }
    ;
    ListnersHandler.prototype.addListner = function (target, event, fn) {
        var config = { target: target, event: event, fn: fn };
        if (!this.register.has(config)) {
            var rmFunc = this.r.listen(target, event, fn);
            this.register.add(__assign({}, config, { rmFunc: rmFunc }), function (err, register) {
                if (err)
                    console.log(err);
                return;
            });
            return true;
        }
        ;
        return false;
    };
    ListnersHandler.prototype.removeListner = function (target, event, fn) {
        var config = { target: target, event: event, fn: fn };
        if (this.register.has(config)) {
            var config_1 = { target: target, event: event, fn: fn };
            this.register.remove(config_1).rmFunc();
            return true;
        }
        return false;
    };
    ListnersHandler.prototype.removeListners = function () {
        this.register.forEach(function (_a) {
            var rmFunc = _a.rmFunc;
            if (!rmFunc)
                return;
            return setTimeout(rmFunc, 0);
        });
        this.register.clear();
        return;
    };
    return ListnersHandler;
}());

//# sourceMappingURL=listners-handler.js.map

/***/ }),

/***/ 184:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemHolderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__template_host_directive__ = __webpack_require__(185);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ItemHolderComponent = /** @class */ (function () {
    function ItemHolderComponent(componentFactoryResolver, r, el) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.r = r;
        this.el = el.nativeElement;
    }
    ItemHolderComponent.prototype.clear = function () {
        this.host.viewContainerRef.clear();
        return this;
    };
    ItemHolderComponent.prototype.loadComponent = function (component) {
        this.clear();
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        var instance = this.host.viewContainerRef.createComponent(componentFactory).instance;
        return instance;
    };
    ItemHolderComponent.prototype.getAttributes = function () {
        return this.attr;
    };
    ItemHolderComponent.prototype.setAttributes = function (obj) {
        var _this = this;
        this.attr = obj;
        var attrs = Object.keys(obj);
        attrs.forEach(function (attr) { return _this.r.setAttribute(_this.el, attr, obj[attr]); });
        return;
    };
    ItemHolderComponent.prototype.getSize = function () {
        return { width: this.el.offsetWidth, height: this.el.offsetHeight };
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1__template_host_directive__["a" /* TemplateHostDriective */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__template_host_directive__["a" /* TemplateHostDriective */])
    ], ItemHolderComponent.prototype, "host", void 0);
    ItemHolderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'item-holder',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/item-holder/item-holder.html"*/'<ng-template template-host></ng-template>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/item-holder/item-holder.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]])
    ], ItemHolderComponent);
    return ItemHolderComponent;
}());

//# sourceMappingURL=item-holder.component.js.map

/***/ }),

/***/ 185:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TemplateHostDriective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TemplateHostDriective = /** @class */ (function () {
    function TemplateHostDriective(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    TemplateHostDriective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Directive */])({
            selector: '[template-host]',
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewContainerRef */]])
    ], TemplateHostDriective);
    return TemplateHostDriective;
}());

//# sourceMappingURL=template-host.directive.js.map

/***/ }),

/***/ 186:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_monsters_monsters_service__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__game_game__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__background_background_tablet_component__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__background_background_mobile_component__ = __webpack_require__(190);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SelectPage = /** @class */ (function () {
    function SelectPage(navCtrl, repo, r, platform) {
        this.navCtrl = navCtrl;
        this.repo = repo;
        this.r = r;
        this.platform = platform;
        this.monsters = this.repo.getMonsters().map(function (m) { return ({ name: m.name, id: m.id }); });
    }
    SelectPage.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.monsters = this.repo.getMonsters().map(function (m) {
            var _a = _this.isIphone() ? _this.bgMobile.find(m.name) : _this.bg.find(m.name), top = _a.top, left = _a.left;
            return { name: m.name, top: Math.floor(top), left: Math.floor(left), id: m.id };
        });
        this.monsters.forEach(function (m) {
            var el = document.getElementById(m.name);
            // el.setAttribute('width', '100px');
            // console.log(el);
        });
    };
    SelectPage.prototype.isIphone = function () {
        return this.platform.is('iphone');
    };
    SelectPage.prototype.beginGame = function (monster) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__game_game__["a" /* GamePage */], { monster: monster });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_4__background_background_tablet_component__["a" /* BackgroundTabletComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4__background_background_tablet_component__["a" /* BackgroundTabletComponent */])
    ], SelectPage.prototype, "bg", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_5__background_background_mobile_component__["a" /* BackgroundMobileComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5__background_background_mobile_component__["a" /* BackgroundMobileComponent */])
    ], SelectPage.prototype, "bgMobile", void 0);
    SelectPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'select-page',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/pages/select/select.html"*/'<ion-content class="container" fixed no-bounce>\n  <div class="bg">\n    <div class="list" [class.mobile]="isIphone()">\n        <img *ngFor="let monster of monsters" (click)="beginGame(monster.id)" src="assets/imgs/monsters/{{monster.name}}.svg" alt="placholder" class="monsters monsters__{{monster.name}}" [style.left.px]="monster.left" [style.top.px]="monster.top">\n    </div>\n\n    <background-mobile *ngIf="isIphone(); else tablet"></background-mobile>\n    <ng-template #tablet>\n      <background-tablet></background-tablet>\n    </ng-template>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/pages/select/select.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__components_monsters_monsters_service__["a" /* MonstersService */]],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__components_monsters_monsters_service__["a" /* MonstersService */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */]])
    ], SelectPage);
    return SelectPage;
}());

//# sourceMappingURL=select.js.map

/***/ }),

/***/ 187:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BackgroundTabletComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bg_component__ = __webpack_require__(188);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BackgroundTabletComponent = /** @class */ (function (_super) {
    __extends(BackgroundTabletComponent, _super);
    function BackgroundTabletComponent() {
        return _super.call(this) || this;
    }
    BackgroundTabletComponent.prototype.ngAfterViewInit = function () {
    };
    BackgroundTabletComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'background-tablet',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/pages/select/background/background-tablet.component.html"*/'<svg class="bg__content" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="6.5 -14.25 267.5 347.5">\n    <!-- 0 0 274.02 335.2 -->\n      <rect x="85.42" y="75.81" width="131.4" height="258.09" />\n      <rect x="50.76" y="75.13" width="174.7" height="168.77" />\n      <rect class="cls-1" x="73.82" y="175.48" width="77.09" height="57.09" />\n      <rect class="cls-1" x="140.82" y="243.18" width="56.05" height="79.04" />\n      <polygon points="163 25.67 187.61 46.37 212.22 67.07 163 67.07 113.78 67.07 138.39 46.37 163 25.67" />\n      <polygon points="26.8 234.79 40.21 258.01 53.61 281.22 26.8 281.22 0 281.22 13.4 258.01 26.8 234.79" />\n      <polygon points="26.8 261.8 40.21 285.01 53.61 308.23 26.8 308.23 0 308.23 13.4 285.01 26.8 261.8" />\n      <polygon points="26.8 288.81 40.21 312.02 53.61 335.23 26.8 335.23 0 335.23 13.4 312.02 26.8 288.81" />\n      <ellipse cx="73.82" cy="27.19" rx="59.58" ry="15.53" />\n      <ellipse cx="73.82" cy="26.68" rx="32.87" ry="26.68" />\n      <circle class="cls-1" cx="36.49" cy="26.27" r="3.95" />\n      <circle class="cls-1" cx="51.42" cy="26.27" r="3.95" />\n      <circle class="cls-1" cx="66.36" cy="26.27" r="3.95" />\n      <circle class="cls-1" cx="96.23" cy="26.27" r="3.95" />\n      <circle class="cls-1" cx="111.16" cy="26.27" r="3.95" />\n      <rect x="132.5" y="65.79" width="116.11" height="12" />\n      <rect x="37.94" y="162.89" width="70" height="12" />\n      <rect x="186.61" y="213.5" width="70" height="12" />\n      <rect x="214.52" y="225.5" width="52.09" height="12" />\n      <rect x="206.61" y="237.5" width="67.41" height="12" />\n      <rect x="256.78" y="249.5" width="17.23" height="12" />\n      <rect x="269.77" y="261.5" width="4.24" height="12" />\n      <rect class="cls-1" x="150.9" y="87.05" width="56.83" height="78.24" />\n      <g>\n        <rect background-anchor monster-name="alien" id="anchor-1" class="alien" x="71.83" y="0" width="0.001" height="1"></rect>\n        <rect background-anchor monster-name="yaga" id="anchor-2" class="yaga" x="195.491" y="-25.384" width="0.001" height="1"></rect>\n        <rect background-anchor monster-name="ghost" id="anchor-3" class="ghost" x="110.237" y="30.116" width="0.001" height="1"></rect>\n        <rect background-anchor monster-name="mummy" id="anchor-4" class="mummy" x="24.82" y="86.707" width="0.001" height="1"></rect>\n        <rect background-anchor monster-name="spider" id="anchor-5" class="spider" x="228.048" y="59.216" width="0.001" height="1"></rect>\n        <rect background-anchor monster-name="skeleton" id="anchor-6" class="skeleton" x="153.74" y="127.33" width="0.001" height="1"></rect>\n        <rect background-anchor monster-name="doctor" id="anchor-7" class="doctor" x="219.4" y="130.811" width="0.001" height="1"></rect>\n        <rect background-anchor monster-name="bed" id="anchor-8" class="bed" x="82.255" y="179.489" width="0.001" height="1"></rect>\n        <rect background-anchor monster-name="wolf" id="anchor-9" class="wolf" x="8.137" y="282.876" width="0.001" height="1"></rect>\n        <rect background-anchor monster-name="yeti" id="anchor-10" class="yeti" x="94.566" y="256.423" width="0.001" height="1"></rect>\n        <rect background-anchor monster-name="vampire" id="anchor-11" class="vampire" x="162.25" y="242.469" width="0.001" height="1"></rect>\n        <rect background-anchor monster-name="zombie" id="anchor-12" class="zombie" x="213.094" y="248.342" width="0.001" height="1"></rect>\n      </g>\n  </svg>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/pages/select/background/background-tablet.component.html"*/,
        }),
        __metadata("design:paramtypes", [])
    ], BackgroundTabletComponent);
    return BackgroundTabletComponent;
}(__WEBPACK_IMPORTED_MODULE_1__bg_component__["a" /* BackgroundComponent */]));

//# sourceMappingURL=background-tablet.component.js.map

/***/ }),

/***/ 188:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BackgroundComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bg_directive__ = __webpack_require__(189);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BackgroundComponent = /** @class */ (function () {
    function BackgroundComponent() {
    }
    ;
    BackgroundComponent.prototype.find = function (name) {
        return this.anchors.find(function (a) { return a.name === name; });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChildren */])(__WEBPACK_IMPORTED_MODULE_1__bg_directive__["a" /* BackgroundAnchorDirective */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* QueryList */])
    ], BackgroundComponent.prototype, "anchors", void 0);
    BackgroundComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({}),
        __metadata("design:paramtypes", [])
    ], BackgroundComponent);
    return BackgroundComponent;
}());

//# sourceMappingURL=bg.component.js.map

/***/ }),

/***/ 189:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BackgroundAnchorDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var BackgroundAnchorDirective = /** @class */ (function () {
    function BackgroundAnchorDirective(element) {
        this.element = element.nativeElement;
    }
    BackgroundAnchorDirective.prototype.onResize = function (event) {
        this.update();
    };
    ;
    ;
    BackgroundAnchorDirective.prototype.ngAfterViewInit = function () {
        this.update();
    };
    BackgroundAnchorDirective.prototype.update = function () {
        var _a = this.element.getBoundingClientRect(), top = _a.top, left = _a.left;
        return this.set(top, left);
    };
    BackgroundAnchorDirective.prototype.set = function (top, left) {
        this.top = top;
        this.left = left;
        return this;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('monster-name'),
        __metadata("design:type", String)
    ], BackgroundAnchorDirective.prototype, "name", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* HostListener */])('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], BackgroundAnchorDirective.prototype, "onResize", null);
    BackgroundAnchorDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Directive */])({
            selector: '[background-anchor]',
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]])
    ], BackgroundAnchorDirective);
    return BackgroundAnchorDirective;
}());

//# sourceMappingURL=bg.directive.js.map

/***/ }),

/***/ 190:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BackgroundMobileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bg_component__ = __webpack_require__(188);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BackgroundMobileComponent = /** @class */ (function (_super) {
    __extends(BackgroundMobileComponent, _super);
    function BackgroundMobileComponent() {
        return _super.call(this) || this;
    }
    BackgroundMobileComponent.prototype.ngAfterViewInit = function () {
    };
    BackgroundMobileComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'background-mobile',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/pages/select/background/background-mobile.component.html"*/'<svg class="bg__content" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="4.15 0 163.06 289.77">\n  <rect class="cls-1" x="4.07" width="163.06" height="289.77" />\n  <rect x="52.28" y="74.52" width="80.03" height="216.05" />\n  <rect x="31.16" y="74.1" width="106.4" height="109.69" />\n  <rect class="cls-1" x="39.2" y="141.22" width="46.95" height="34.77" />\n  <rect class="cls-1" x="90.12" y="188.21" width="25.59" height="48.14" />\n  <polygon points="99.52 43.98 114.51 56.59 129.5 69.2 99.52 69.2 69.55 69.2 84.53 56.59 99.52 43.98" />\n  <polygon points="19.78 216.21 29.67 233.34 39.55 250.47 19.78 250.47 0 250.47 9.89 233.34 19.78 216.21" />\n  <polygon points="19.78 236.14 29.67 253.27 39.55 270.39 19.78 270.39 0 270.39 9.89 253.27 19.78 236.14" />\n  <polygon points="19.78 256.07 29.67 273.19 39.55 290.32 19.78 290.32 0 290.32 9.89 273.19 19.78 256.07" />\n  <ellipse cx="55.48" cy="26.47" rx="43.55" ry="11.35" />\n  <ellipse cx="55.48" cy="26.1" rx="24.02" ry="19.5" />\n  <circle class="cls-1" cx="28.19" cy="25.8" r="2.89" />\n  <circle class="cls-1" cx="39.1" cy="25.8" r="2.89" />\n  <circle class="cls-1" cx="50.02" cy="25.8" r="2.89" />\n  <circle class="cls-1" cx="60.69" cy="25.8" r="2.89" />\n  <circle class="cls-1" cx="71.85" cy="25.8" r="2.89" />\n  <circle class="cls-1" cx="82.76" cy="25.8" r="2.89" />\n  <rect x="80.95" y="68.42" width="70.71" height="7.31" />\n  <rect x="23.36" y="127.55" width="42.63" height="7.31" />\n  <rect x="110.4" y="162.38" width="42.63" height="7.31" />\n  <rect x="127.4" y="169.69" width="31.72" height="7.31" />\n  <rect x="122.58" y="177" width="42.63" height="7.31" />\n  <rect x="153.14" y="184.3" width="18.16" height="7.31" />\n  <rect x="161.05" y="191.61" width="6.88" height="7.31" />\n  <rect class="cls-1" x="92.16" y="81.37" width="34.61" height="47.65" />\n  <g>\n    <rect background-anchor monster-name="alien" id="anchor-1" class="alien" x="43.937" y="22.193" width="0.01" height="1"></rect>\n    <rect background-anchor monster-name="yaga" id="anchor-2" class="yaga" x="114.661" y="-2.828" width="0.01" height="1"></rect>\n    <rect background-anchor monster-name="ghost" id="anchor-3" class="ghost" x="59.11" y="50.17" width="0.01" height="1"></rect>\n    <rect background-anchor monster-name="mummy" id="anchor-4" class="mummy" x="15.31" y="75.16" width="0.01" height="1"></rect>\n    <rect background-anchor monster-name="spider" id="anchor-5" class="spider" x="142.74" y="58.42" width="0.01" height="1"></rect>\n    <rect background-anchor monster-name="skeleton" id="anchor-6" class="skeleton" x="90.823" y="99.902" width="0.01" height="1"></rect>\n    <rect background-anchor monster-name="doctor" id="anchor-7" class="doctor" x="133.814" y="106.024" width="0.001" height="1"></rect>\n    <rect background-anchor monster-name="bed" id="anchor-8" class="bed" x="44.16" y="137.673" width="0.001" height="1"></rect>\n    <rect background-anchor monster-name="wolf" id="anchor-9" class="wolf" x="5.69" y="253.105" width="0.001" height="1"></rect>\n    <rect background-anchor monster-name="yeti" id="anchor-10" class="yeti" x="69.567" y="236.835" width="0.001" height="1"></rect>\n    <rect background-anchor monster-name="vampire" id="anchor-11" class="vampire" x="93.66" y="181.61" width="0.001" height="1"></rect>\n    <rect background-anchor monster-name="zombie" id="anchor-12" class="zombie" x="129.554" y="232.395" width="0.001" height="1"></rect>\n  </g>\n</svg>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/pages/select/background/background-mobile.component.html"*/,
        }),
        __metadata("design:paramtypes", [])
    ], BackgroundMobileComponent);
    return BackgroundMobileComponent;
}(__WEBPACK_IMPORTED_MODULE_1__bg_component__["a" /* BackgroundComponent */]));

//# sourceMappingURL=background-mobile.component.js.map

/***/ }),

/***/ 234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(257);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_components_module__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_select_background_bg_module__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__model_model_module__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_home_home__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_select_select__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_game_game__ = __webpack_require__(101);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





// import { File } from '@ionic-native/file';
// Modules



// Components

// Pages



var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_select_select__["a" /* SelectPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_game_game__["a" /* GamePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/game/game.module#GamePageModule', name: 'GamePage', segment: 'game', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_5__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_6__pages_select_background_bg_module__["a" /* BackgroundModule */],
                __WEBPACK_IMPORTED_MODULE_7__model_model_module__["a" /* ModelModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_select_select__["a" /* SelectPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_game_game__["a" /* GamePage */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                // File,
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrinketsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__glass_glass__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__eyes_eyes__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__hood_hood__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mole_mole__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__heart_heart__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__beard_beard__ = __webpack_require__(336);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var TrinketsService = /** @class */ (function () {
    function TrinketsService() {
    }
    TrinketsService.prototype.getTrinkets = function () {
        return [
            {
                id: 6,
                component: __WEBPACK_IMPORTED_MODULE_6__beard_beard__["a" /* BeardComponent */],
                meta: {
                    container: 'mouth',
                    before: function (monster) {
                        if (monster.name !== 'wolf') {
                            monster.close('mouth');
                        }
                        else {
                            monster.close('tongue');
                        }
                        return;
                    },
                    after: function (monster) {
                        if (monster.name !== 'wolf') {
                            monster.open('mouth');
                        }
                        else {
                            monster.open('tongue');
                        }
                        return;
                    },
                    attr: {
                        width: {
                            default: function (_a) {
                                var width = _a.width;
                                return width * 1.5;
                            },
                            mummy: function (_a) {
                                var width = _a.width;
                                return width * 3.5;
                            },
                            alien: function (_a) {
                                var width = _a.width;
                                return width * 9.3;
                            },
                            skeleton: function (_a) {
                                var width = _a.width;
                                return width * 1.6;
                            },
                            yaga: function (_a) {
                                var width = _a.width;
                                return width * 12.8;
                            },
                            doctor: function (_a) {
                                var width = _a.width;
                                return width * 5;
                            },
                            spider: function (_a) {
                                var width = _a.width;
                                return width * 6.6;
                            },
                            vampire: function (_a) {
                                var width = _a.width;
                                return width * 2.87;
                            },
                            wolf: function (_a) {
                                var width = _a.width;
                                return width * 1.6;
                            },
                            ghost: function (_a) {
                                var width = _a.width;
                                return width * 3.5;
                            },
                        },
                        height: {
                            default: function (_a) {
                                var height = _a.height;
                                return height * 1.5;
                            },
                            mummy: function (_a) {
                                var height = _a.height;
                                return height * 3.5;
                            },
                            alien: function (_a) {
                                var height = _a.height;
                                return height * 9.3;
                            },
                            skeleton: function (_a) {
                                var height = _a.height;
                                return height * 1.6;
                            },
                            yaga: function (_a) {
                                var height = _a.height;
                                return height * 12.8;
                            },
                            doctor: function (_a) {
                                var height = _a.height;
                                return height * 5;
                            },
                            spider: function (_a) {
                                var height = _a.height;
                                return height * 6.6;
                            },
                            vampire: function (_a) {
                                var height = _a.height;
                                return height * 1.83;
                            },
                            wolf: function (_a) {
                                var height = _a.height;
                                return height * 1.6;
                            },
                            ghost: function (_a) {
                                var height = _a.height;
                                return height * 1.76;
                            },
                        },
                        x: {
                            default: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (width * 1.5) / 2) + width / 2;
                            },
                            mummy: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (width * 3.5) / 2) + width / 2;
                            },
                            alien: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (width * 9.3) / 2) + width / 2;
                            },
                            skeleton: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (width * 1.6) / 2) + width / 2;
                            },
                            yaga: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (width * 12.8) / 2) + width / 2;
                            },
                            doctor: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (width * 5) / 2) + width / 2;
                            },
                            spider: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (width * 6.6) / 2) + width / 2;
                            },
                            vampire: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (width * 2.87) / 2) + width / 2;
                            },
                            wolf: function (_a) {
                                var x = _a.x, width = _a.width;
                                return x - 20;
                            },
                            ghost: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (width * 3.5) / 2) + width / 2;
                            },
                        },
                        y: {
                            default: function (_a) {
                                var y = _a.y, height = _a.height;
                                return (y - (height * 1.5) / 2) + height / 2;
                            },
                            mummy: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y;
                            },
                            alien: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 20;
                            },
                            skeleton: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y + 22;
                            },
                            yaga: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 30;
                            },
                            doctor: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 30;
                            },
                            spider: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 10;
                            },
                            vampire: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 30;
                            },
                            wolf: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 10;
                            },
                        }
                    }
                }
            },
            {
                id: 4,
                component: __WEBPACK_IMPORTED_MODULE_4__mole_mole__["a" /* MoleComponent */],
                meta: {
                    onScreen: true,
                    multiple: true,
                    random: true,
                    before: function (monster, host, instance) {
                        if (monster.animate() && monster.isOnMonster(instance.getBoundingClientRect())) {
                            var smile = monster.animate('smile')(true)();
                            var smileLids = monster.animate('smileLids')(true)();
                        }
                    },
                    after: function (monster, host) {
                        if (monster.animate()) {
                            var smile = monster.animate('smile')(false)();
                            var smileLids = monster.animate('smileLids')(false)();
                        }
                    },
                }
            },
            {
                id: 5,
                component: __WEBPACK_IMPORTED_MODULE_5__heart_heart__["a" /* HeartComponent */],
                meta: {
                    onScreen: true,
                    multiple: true,
                }
            },
            {
                id: 1,
                component: __WEBPACK_IMPORTED_MODULE_2__eyes_eyes__["a" /* EyesComponent */],
                meta: {
                    container: 'eyes',
                    before: function (monster) {
                        monster.close('eyes');
                        return;
                    },
                    after: function (monster) {
                        monster.open('eyes');
                        return;
                    },
                    attr: {
                        width: {
                            default: function (_a) {
                                var width = _a.width;
                                return width * 1.5;
                            },
                            mummy: function (_a) {
                                var width = _a.width;
                                return width * 2.88;
                            },
                        },
                        height: {
                            default: function (_a) {
                                var height = _a.height;
                                return height * 1.5;
                            },
                            mummy: function (_a) {
                                var height = _a.height;
                                return height * 2.88;
                            },
                        },
                        x: {
                            default: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (width * 1.5) / 2) + width / 2;
                            },
                            mummy: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (width * 2.88) / 2) + width / 2;
                            },
                        },
                        y: {
                            default: function (_a) {
                                var y = _a.y, height = _a.height;
                                return (y - (height * 1.5) / 2) + height / 2;
                            },
                            mummy: function (_a) {
                                var y = _a.y, height = _a.height;
                                return (y - (height * 2.88) / 2) + height / 2;
                            },
                        }
                    }
                }
            },
            {
                id: 2,
                component: __WEBPACK_IMPORTED_MODULE_1__glass_glass__["a" /* GlassComponent */],
                meta: {
                    container: 'eyes',
                    attr: {
                        width: {
                            default: function (_a) {
                                var width = _a.width;
                                return width * 2;
                            },
                            skeleton: function (_a) {
                                var width = _a.width;
                                return width * 2.113;
                            },
                            mummy: function (_a) {
                                var width = _a.width;
                                return width * 3.82;
                            },
                        },
                        height: {
                            default: function (_a) {
                                var height = _a.height;
                                return height * 2;
                            },
                            skeleton: function (_a) {
                                var height = _a.height;
                                return height * 2.113;
                            },
                            mummy: function (_a) {
                                var height = _a.height;
                                return height * 3.82;
                            },
                        },
                        x: {
                            default: function (_a) {
                                var x = _a.x, width = _a.width;
                                return x - width / 2;
                            },
                            skeleton: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - width / 2) - 6;
                            },
                            mummy: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (width * 3.82) / 2) + width / 2;
                            },
                        },
                        y: {
                            default: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - height / 2;
                            },
                            skeleton: function (_a) {
                                var y = _a.y, height = _a.height;
                                return (y - height / 2) + 15;
                            },
                            mummy: function (_a) {
                                var y = _a.y, height = _a.height;
                                return (y - (height * 3.82) / 2) + height / 2;
                            },
                        }
                    }
                }
            },
            {
                id: 3,
                component: __WEBPACK_IMPORTED_MODULE_3__hood_hood__["a" /* HoodComponent */],
                meta: {
                    container: 'head-figure',
                    before: function (monster) {
                        if (monster.animate()) {
                            var smile = monster.animate('smile')(true)();
                            var smileLids = monster.animate('smileLids')(true)();
                        }
                    },
                    after: function (monster) {
                        if (monster.animate()) {
                            var smile = monster.animate('smile')(false)();
                            var smileLids = monster.animate('smileLids')(false)();
                        }
                    },
                    attr: {
                        width: {
                            default: function (_a) {
                                var width = _a.width;
                                return width * 0.3;
                            },
                            skeleton: function (_a) {
                                var width = _a.width;
                                return width * 0.55;
                            },
                            alien: function (_a) {
                                var width = _a.width;
                                return width * 0.55;
                            },
                            zombie: function (_a) {
                                var width = _a.width;
                                return width * 0.38;
                            },
                            wolf: function (_a) {
                                var width = _a.width;
                                return width * 0.81;
                            },
                            spider: function (_a) {
                                var width = _a.width;
                                return width * 1.5;
                            },
                        },
                        height: {
                            default: function (_a) {
                                var height = _a.height;
                                return height * 0.3;
                            },
                            skeleton: function (_a) {
                                var height = _a.height;
                                return height * 0.55;
                            },
                            alien: function (_a) {
                                var height = _a.height;
                                return height * 0.55;
                            },
                            zombie: function (_a) {
                                var height = _a.height;
                                return height * 0.38;
                            },
                            wolf: function (_a) {
                                var height = _a.height;
                                return height * 0.81;
                            },
                            spider: function (_a) {
                                var height = _a.height;
                                return height * 1.5;
                            },
                        },
                        x: {
                            default: function (_a) {
                                var x = _a.x, width = _a.width;
                                return 0;
                            },
                            vampire: function (_a) {
                                var x = _a.x, width = _a.width;
                                return x;
                            },
                            yaga: function (_a) {
                                var x = _a.x, width = _a.width;
                                return x + 30;
                            },
                            skeleton: function (_a) {
                                var x = _a.x, width = _a.width;
                                return x - 30;
                            },
                            alien: function (_a) {
                                var x = _a.x, width = _a.width;
                                return x - 30;
                            },
                            zombie: function (_a) {
                                var x = _a.x, width = _a.width;
                                return -2.5;
                            },
                            spider: function (_a) {
                                var x = _a.x, width = _a.width;
                                return x - width;
                            },
                            mummy: function (_a) {
                                var x = _a.x, width = _a.width;
                                return x + 5;
                            },
                        },
                        y: {
                            default: function (_a) {
                                var y = _a.y, height = _a.height;
                                return 0;
                            },
                            vampire: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y;
                            },
                            yaga: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 20;
                            },
                            skeleton: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 30;
                            },
                            alien: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 50;
                            },
                            zombie: function (_a) {
                                var y = _a.y, height = _a.height;
                                return -5;
                            },
                            spider: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - height;
                            },
                            mummy: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 20;
                            },
                        }
                    }
                }
            },
        ];
    };
    TrinketsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], TrinketsService);
    return TrinketsService;
}());

//# sourceMappingURL=trinkets.service.js.map

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ElementModel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_uuid_v4__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_uuid_v4___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_uuid_v4__);

var ElementModel = /** @class */ (function () {
    function ElementModel(name, node, root) {
        this.name = name;
        this.node = node;
        this.id = __WEBPACK_IMPORTED_MODULE_0_uuid_v4___default()();
        this.root = root || this.node;
    }
    ;
    ElementModel.prototype.getId = function () {
        return this.id;
    };
    ElementModel.prototype.getName = function () {
        return this.name;
    };
    ElementModel.prototype.getRoot = function () {
        return this.root;
    };
    ElementModel.prototype.getNode = function () {
        return this.node;
    };
    ElementModel.prototype.isRoot = function () {
        return this.root.isSameNode(this.node);
    };
    return ElementModel;
}());

//# sourceMappingURL=element.model.js.map

/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrinketRandomModel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__trinket_random_part_directive__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_element_component_model__ = __webpack_require__(42);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TrinketRandomModel = /** @class */ (function (_super) {
    __extends(TrinketRandomModel, _super);
    function TrinketRandomModel(name, element) {
        var _this = _super.call(this, name, element) || this;
        _this.afterInit = [];
        _this.initiated = false;
        _this.randomize = function (cb) {
            if (!_this.initiated) {
                _this.afterInit = _this.afterInit.concat([function () { return _this.randomize(cb); }]);
                return;
            }
            var random = Math.round((_this.parts.length - 1) * Math.random()) + 1;
            var parts = _this.parts.reduce(function (acc, el) { return acc.concat([el]); }, []);
            var randomParts = function (arr, acc, cur) {
                if (!cur)
                    return acc;
                var randomIndex = Math.round((arr.length - 1) * Math.random());
                var randomPart = arr[randomIndex];
                var filteredArray = arr.slice(0, randomIndex).concat(arr.slice(randomIndex + 1, arr.length));
                return randomParts(filteredArray, acc.concat([randomIndex]), cur - 1);
            };
            var selected = randomParts(parts, [], random);
            _this.hide(selected);
            return cb ? cb(selected) : selected;
        };
        return _this;
    }
    ;
    TrinketRandomModel.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.initiated = true;
        this.afterInit.forEach(function (fn) { return fn(_this); });
    };
    TrinketRandomModel.prototype.hide = function (selected) {
        var _this = this;
        if (!this.initiated) {
            this.afterInit = this.afterInit.concat([function () { return _this.hide(selected); }]);
            return;
        }
        selected.forEach(function (i) { return _this.parts.toArray()[i].hide(); });
        return this;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChildren */])(__WEBPACK_IMPORTED_MODULE_1__trinket_random_part_directive__["a" /* TrinketRandomPartDirective */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* QueryList */])
    ], TrinketRandomModel.prototype, "parts", void 0);
    TrinketRandomModel = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({}),
        __metadata("design:paramtypes", [Object, Object])
    ], TrinketRandomModel);
    return TrinketRandomModel;
}(__WEBPACK_IMPORTED_MODULE_2__model_element_component_model__["a" /* ElementComponentModel */]));

//# sourceMappingURL=trinket-random.model.js.map

/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnimationSetController; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__animation_model__ = __webpack_require__(289);


var once = function (fn) {
    var called = false;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (called)
            throw Error('AnimationSet has been configured already');
        called = true;
        return fn.apply(void 0, args);
    };
};
var AnimationSetController = /** @class */ (function () {
    function AnimationSetController(instance, animations, recoveryPoint, recoveryFn) {
        var _this = this;
        this.instance = instance;
        this.recoveryPoint = recoveryPoint;
        this.recoveryFn = recoveryFn;
        this.state = false;
        this.current = null;
        this.queue = [];
        this.queueCleared = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.end = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.config = once(function (animations) {
            _this.animations = Object.keys(animations).reduce(function (acc, k) {
                var animation = new __WEBPACK_IMPORTED_MODULE_1__animation_model__["a" /* AnimationModel */](_this.instance, animations[k]);
                animation.onStart(function (animation) {
                    _this.setState(true);
                    _this.setCurrent(animation);
                    return;
                });
                animation.onEnd(function (animation) {
                    _this.setState(false);
                    _this.setCurrent(null);
                    return;
                });
                return acc.set(k, animation);
            }, new Map());
            return;
        });
        this.recoveryPoint = this.instance.attr();
        this.recoveryFn = function (instance, recoveryPoint) { return instance.attr(recoveryPoint); };
        this.end.subscribe(function () {
            if (!_this.queue.length)
                return _this.queueCleared.emit(null);
            var _a = _this.queue, first = _a[0], rest = _a.slice(1);
            _this.queue = rest;
            first.run();
            return;
        });
        this.config(animations);
    }
    AnimationSetController.prototype.get = function (name) {
        return this.animations.get(name);
    };
    AnimationSetController.prototype.setState = function (arg) {
        this.state = arg;
        if (this.state === false)
            this.end.emit(null);
        return this;
    };
    AnimationSetController.prototype.setCurrent = function (animation) {
        this.current = animation;
        return this;
    };
    AnimationSetController.prototype.isAnimating = function () {
        return this.state;
    };
    AnimationSetController.prototype.getInQueue = function (animation) {
        this.queue.push(animation);
        return;
    };
    AnimationSetController.prototype.onDisengage = function (cb) {
        this.queueCleared.subscribe(cb);
        return this;
    };
    AnimationSetController.prototype.recovery = function () {
        var _this = this;
        var recovery = function () { return _this.recoveryFn(_this.instance, _this.recoveryPoint); };
        this.isAnimating() ? this.onDisengage(recovery) : recovery();
        return this;
    };
    AnimationSetController.prototype.getRecoveryPoint = function () {
        return this.recoveryPoint;
    };
    AnimationSetController.prototype.run = function (name) {
        var animation = this.animations.get(name);
        if (!animation)
            throw Error('AnimationSet: No animation was found');
        if (this.isAnimating()) {
            this.getInQueue(animation);
            return this;
        }
        animation.run();
        return this;
    };
    AnimationSetController.prototype.specify = function (name) {
        return new AnimationSetControllerSpecified(this, name);
    };
    return AnimationSetController;
}());

var AnimationSetControllerSpecified = /** @class */ (function () {
    function AnimationSetControllerSpecified(parent, name) {
        this.parent = parent;
        this.name = name;
    }
    ;
    AnimationSetControllerSpecified.prototype.run = function () {
        this.parent.run(this.name);
        return this;
    };
    AnimationSetControllerSpecified.prototype.specify = function (name) {
        return false;
    };
    return AnimationSetControllerSpecified;
}());
//# sourceMappingURL=animation-set.controller.js.map

/***/ }),

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnimationModel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

var AnimationModel = /** @class */ (function () {
    function AnimationModel(instance, fn) {
        this.instance = instance;
        this.fn = fn;
        this.start = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.end = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
    }
    ;
    AnimationModel.prototype.run = function () {
        var _this = this;
        this.start.emit(this);
        this.fn(this.instance, function () { return _this.end.emit(_this); });
        return this;
    };
    AnimationModel.prototype.onEnd = function (fn) {
        this.end.subscribe(fn);
        return this;
    };
    AnimationModel.prototype.onStart = function (fn) {
        this.start.subscribe(fn);
        return this;
    };
    return AnimationModel;
}());

//# sourceMappingURL=animation.model.js.map

/***/ }),

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnimationSequenceController; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__animation_sequence_model__ = __webpack_require__(291);


var AnimationSequenceController = /** @class */ (function () {
    function AnimationSequenceController(scheme, animations) {
        var _this = this;
        this.start = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.end = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.interval = false;
        this.state = false;
        this.model = new __WEBPACK_IMPORTED_MODULE_1__animation_sequence_model__["a" /* AnimationSequenceModel */](scheme, animations);
        this.start.subscribe(function () { return _this.setState(true); });
        this.end.subscribe(function () { return _this.setState(false); });
    }
    AnimationSequenceController.prototype.setState = function (arg) {
        this.state = arg;
        return;
    };
    AnimationSequenceController.prototype.setInterval = function (fn, interval) {
        var _this = this;
        this.interval = true;
        var func = function () {
            if (!_this.interval)
                return;
            setTimeout(fn, interval);
        };
        this.end.subscribe(func);
        return fn();
    };
    AnimationSequenceController.prototype.isAnimating = function () {
        return this.state;
    };
    AnimationSequenceController.prototype.run = function (interval) {
        var _this = this;
        if (this.isAnimating())
            return false;
        this.start.emit(null);
        var rec = function (acc) {
            var first = acc[0], rest = acc.slice(1);
            if (!first)
                return _this.end.emit(null);
            var arr = first instanceof Array ? first : [first];
            return arr.forEach(function (name) {
                var set = _this.model.getFunction(name)(function (set) { return set; });
                return;
            });
        };
        var scheme = this.model.getScheme();
        var run = function () { return rec(scheme); };
        interval ? this.setInterval(run, interval) : setTimeout(run, 0);
        return this;
    };
    AnimationSequenceController.prototype.clear = function () {
        this.interval = false;
    };
    return AnimationSequenceController;
}());

//# sourceMappingURL=animation-sequence.controller.js.map

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnimationSequenceModel; });
var AnimationSequenceModel = /** @class */ (function () {
    function AnimationSequenceModel(scheme, animations) {
        var _this = this;
        this.scheme = scheme;
        this.animations = animations;
        var keys = Object.keys(this.animations);
        var rec = function (acc) {
            if (!acc.length)
                return true;
            var current = acc[0], rest = acc.slice(1);
            var child = current instanceof Array ? rec(current) : null;
            return keys.includes(current) ? rec(rest) : false;
        };
        var isCorrect = function () { return rec(_this.scheme); };
        if (!isCorrect())
            throw new Error('AnimationSequenceModel: Wrong Scheme Values');
    }
    AnimationSequenceModel.prototype.getScheme = function () {
        return this.scheme;
    };
    AnimationSequenceModel.prototype.getFunction = function (name) {
        return this.animations[name];
    };
    return AnimationSequenceModel;
}());

//# sourceMappingURL=animation-sequence.model.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Game; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cursor_position__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_fsm__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__listners_handler__ = __webpack_require__(183);



var lib = {
    setPosition: function (register, ev) {
        return register.set(ev.clientX, ev.clientY);
    },
    nullifyPosition: function (register) {
        return register.set(undefined, undefined);
    },
    changeCursorStateToDown: function (cursor, ev) {
        cursor.down();
    },
    changeCursorStateToUp: function (cursor, ev) {
        cursor.up();
    },
    bind: function (name, context) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return (_a = (this[name])).bind.apply(_a, [context].concat(args));
        var _a;
    }
};
var Game = /** @class */ (function () {
    function Game(renderer) {
        this.cursor = new __WEBPACK_IMPORTED_MODULE_1__game_fsm__["a" /* GameFinistStateMachine */]();
        this.position = new __WEBPACK_IMPORTED_MODULE_0__cursor_position__["a" /* CursorPosition */]();
        this.r = renderer;
        this.listners = new __WEBPACK_IMPORTED_MODULE_2__listners_handler__["a" /* ListnersHandler */](this.r);
        // this.triggerOnMouseMove(lib.bind('setPosition', this, this.position));
        // this.triggerOnMouseOut(lib.bind('nullifyPosition', this, this.position));
        // this.triggerOnMouseUp(lib.changeCursorStateToUp.bind(null, this.cursor));
        // this.triggerOnMouseDown(lib.changeCursorStateToDown.bind(null, this.cursor));
        // this.cursor.setFns('down', (...args) => { console.log(args) });
    }
    return Game;
}());

;
//# sourceMappingURL=game.service.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CursorPosition; });
var CursorPosition = /** @class */ (function () {
    function CursorPosition() {
        this.handlers = [];
    }
    ;
    CursorPosition.prototype.set = function (x, y) {
        var _this = this;
        this.positionX = x;
        this.positionY = y;
        if (this.handlers.length) {
            this.handlers.forEach(function (fn) {
                setTimeout(function () { return fn(_this.get()); }, 0);
                return;
            });
        }
        return this;
    };
    CursorPosition.prototype.get = function () {
        return this.positionX && this.positionX ?
            { x: this.positionX, y: this.positionY } :
            undefined;
    };
    CursorPosition.prototype.setHandler = function () {
        var fns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fns[_i] = arguments[_i];
        }
        this.handlers = this.handlers.concat(fns);
        return this;
    };
    CursorPosition.prototype.rmHandler = function (fn) {
        this.handlers = this.handlers.filter(function (func) { return func !== fn; });
        return this;
    };
    return CursorPosition;
}());

//# sourceMappingURL=cursor-position.js.map

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListnerRegister; });
var Listner = /** @class */ (function () {
    function Listner(_a) {
        var target = _a.target, event = _a.event, fn = _a.fn, rmFunc = _a.rmFunc;
        this.target = target;
        this.event = event;
        this.fn = fn;
        this.rmFunc = rmFunc;
    }
    ;
    Listner.prototype.getConfig = function () {
        return {
            target: this.target,
            event: this.event,
            fn: this.fn,
            rmFunc: this.rmFunc,
        };
    };
    Listner.prototype.compare = function (listner) {
        var _this = this;
        return !Object.keys(listner).find(function (v) {
            return listner[v] !== _this[v];
        });
    };
    return Listner;
}());
var ListnerRegister = /** @class */ (function () {
    function ListnerRegister() {
        this.register = [];
    }
    ;
    Object.defineProperty(ListnerRegister.prototype, "length", {
        get: function () {
            return this.register.length;
        },
        enumerable: true,
        configurable: true
    });
    ListnerRegister.prototype.find = function (listner) {
        return this.register.find(function (v) { return v.compare(listner); });
    };
    ListnerRegister.prototype.add = function (listner, callback) {
        if (this.has(listner))
            return callback(new Error('Instance already exists'));
        var arr = this.register.slice();
        this.register = arr.concat([new Listner(listner)]);
        return callback(null, this);
    };
    ListnerRegister.prototype.has = function (listner) {
        return !!this.find(listner);
    };
    ListnerRegister.prototype.remove = function (listner) {
        var instance = this.find(listner);
        if (!instance)
            return false;
        this.register = this.register.filter(function (i) { return i !== instance; });
        return instance.getConfig();
    };
    ListnerRegister.prototype.clear = function () {
        this.register = [];
        return this;
    };
    ListnerRegister.prototype.forEach = function (fn) {
        this.register.slice().forEach(fn);
        return this;
    };
    return ListnerRegister;
}());

//# sourceMappingURL=listner-register.class.js.map

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameLogic; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__active_element_repository__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_fsm__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__listners_handler__ = __webpack_require__(183);



var GameLogic = /** @class */ (function () {
    function GameLogic(r, items, dashboard) {
        var _this = this;
        this.r = r;
        this.fsm = new __WEBPACK_IMPORTED_MODULE_1__game_fsm__["a" /* GameFinistStateMachine */]();
        this.items = [];
        this.itemsMouseEnterListners = function (arg) {
            var items = _this.repo.getActive();
            return items.forEach(function (item) { return _this.makeListner(arg)(item.instance, 'mouseenter', item.getFn('mouseEnterOnItem')); });
        };
        this.itemMouseLeaveListner = function (arg) {
            var item = _this.repo.getCurrent();
            return _this.makeListner(arg)(item.instance, 'mouseleave', item.getFn('mouseLeaveFromItem'));
        };
        this.itemMouseDownListner = function (arg) {
            var item = _this.repo.getCurrent();
            return _this.makeListner(arg)(window, 'mousedown', item.getFn('mouseDown'));
        };
        this.itemMouseUpListner = function (arg) {
            var item = _this.repo.getCurrent();
            return _this.makeListner(arg)(window, 'mouseup', item.getFn('mouseUp'));
        };
        this.listenCursorPosition = function (arg) {
            var item = _this.repo.getCurrent();
            return _this.makeListner(arg)(window, 'mousemove', item.getFn('handleCursorPosition'));
        };
        this.listners = new __WEBPACK_IMPORTED_MODULE_2__listners_handler__["a" /* ListnersHandler */](this.r);
        this.repo = new __WEBPACK_IMPORTED_MODULE_0__active_element_repository__["a" /* ActiveElementRepository */](this.fsm, dashboard, items);
        this.fsm.setFns('select', this.itemsMouseEnterListners.bind(this, false), this.itemMouseLeaveListner.bind(this, true, null), this.itemMouseDownListner.bind(this, true));
        this.fsm.setFns('unselect', this.itemMouseLeaveListner.bind(this, false, null), this.itemsMouseEnterListners.bind(this, true), this.itemMouseDownListner.bind(this, false));
        this.fsm.setFns('grab', this.itemMouseLeaveListner.bind(this, false, null), this.itemMouseDownListner.bind(this, false), this.itemMouseUpListner.bind(this, true), this.listenCursorPosition.bind(this, true));
        this.fsm.setFns('destroy', this.listenCursorPosition.bind(this, false), this.itemMouseUpListner.bind(this, false), this.itemsMouseEnterListners.bind(this, true));
        this.fsm.setFns('place', this.listenCursorPosition.bind(this, false), this.itemMouseUpListner.bind(this, false), this.itemsMouseEnterListners.bind(this, true));
    }
    ;
    GameLogic.prototype.start = function () {
        this.itemsMouseEnterListners(true);
        return this;
    };
    GameLogic.prototype.over = function () {
        this.listners.removeListners();
        this.repo.clear();
        return this;
    };
    GameLogic.prototype.makeListner = function (arg) {
        var _this = this;
        return function (e, ev, fn) {
            return _this.listners[arg ? 'addListner' : 'removeListner'](e, ev, fn);
        };
    };
    GameLogic.prototype.setFns = function (name) {
        var fns = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            fns[_i - 1] = arguments[_i];
        }
        (_a = this.repo).setFns.apply(_a, [name].concat(fns));
        return this;
        var _a;
    };
    return GameLogic;
}());

//# sourceMappingURL=game-logic.js.map

/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActiveElementRepository; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__active_element_model__ = __webpack_require__(299);

var lib = {
    mouseEnterOnItem: function (item, ev) {
        this.update(item);
        this.fsm.select();
        return;
    },
    mouseLeaveFromItem: function (item, ev) {
        this.fsm.unselect();
        return;
    },
    handleCursorPosition: function (item, ev) {
        var _this = this;
        this.callbacks.onItemDragging.forEach(function (fn) { return fn(_this, item, ev); });
        if (this.onDashboard(ev)) {
            if (!this.fsm.isDraggedOut()) {
                this.fsm.moveOut();
            }
        }
        else {
            if (!this.fsm.isDraggedIn()) {
                this.fsm.moveIn();
            }
        }
        return;
    },
    mouseDown: function (item, ev) {
        var _this = this;
        this.fsm.grab();
        this.callbacks.onItemClick.forEach(function (fn) { return fn(_this, item, ev); });
        return;
    },
    mouseUp: function (item, ev) {
        var _this = this;
        // console.log('mouseUp');
        this.callbacks.afterItemDropped.forEach(function (fn) { return fn(_this, item, ev); });
        if (this.fsm.isDraggedIn()) {
            this.callbacks.afterItemPlaced.forEach(function (fn) { return fn(_this, item, ev); });
            this.fsm.place();
            return;
        }
        if (this.fsm.isDraggedOut()) {
            this.callbacks.afterItemDesroyed.forEach(function (fn) { return fn(_this, item, ev); });
            this.fsm.destroy();
            return;
        }
    }
};
var ActiveElementRepository = /** @class */ (function () {
    function ActiveElementRepository(fsm, onDashboard, items) {
        var _this = this;
        this.fsm = fsm;
        this.onDashboard = onDashboard;
        this.items = [];
        this.callbacks = {
            onItemClick: [],
            afterItemDropped: [],
            afterItemPlaced: [],
            afterItemDesroyed: [],
            onItemDragging: [],
            afterClear: [],
        };
        items.forEach(function (item) { return _this.addActiveElement(new __WEBPACK_IMPORTED_MODULE_0__active_element_model__["a" /* ActiveElementModel */]({
            instance: item.node,
            component: item.component,
            meta: item.meta
        })); });
    }
    ActiveElementRepository.prototype.addActiveElement = function (element) {
        var _this = this;
        var functions = Object.keys(lib);
        functions.forEach(function (name) {
            var fn = lib[name].bind(_this, element);
            element.addFn(name, fn);
            return;
        });
        this.items.push(element);
        return this;
    };
    ActiveElementRepository.prototype.update = function (arg) {
        this.current = arg;
        return this;
    };
    ActiveElementRepository.prototype.addActiveElementCopy = function (element, instance) {
        var copy = element.copy(instance);
        this.addActiveElement(copy);
        return copy;
    };
    ActiveElementRepository.prototype.removeActiveElement = function (element) {
        var filtered = this.items.filter(function (e) { return e !== element; });
        this.items = filtered;
        return this;
    };
    ActiveElementRepository.prototype.findActiveElementByInstance = function (instance) {
        return this.items.find(function (e) { return e.instance === instance; });
    };
    ActiveElementRepository.prototype.getCurrent = function () {
        return this.current;
    };
    ActiveElementRepository.prototype.getActive = function () {
        return this.items.filter(function (item) { return item.isActive(); });
    };
    ActiveElementRepository.prototype.clear = function () {
        var _this = this;
        var filtered = this.items.filter(function (e) { return e.type === 'original'; });
        this.items = filtered;
        var originals = this.items.forEach(function (e) { return e.deleteAllCopies(); });
        this.callbacks.afterClear.forEach(function (fn) { return fn(_this, _this.items); });
        return;
    };
    ActiveElementRepository.prototype.setFns = function (name) {
        var fns = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            fns[_i - 1] = arguments[_i];
        }
        var oldFns = this.callbacks[name];
        this.callbacks[name] = oldFns.concat(fns);
        return this;
    };
    return ActiveElementRepository;
}());

//# sourceMappingURL=active-element.repository.js.map

/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActiveElementModel; });
/* unused harmony export ActiveElementDescendentModel */
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
var ActiveElementModel = /** @class */ (function () {
    function ActiveElementModel(obj) {
        this.state = 'activated';
        this.type = 'original';
        this.funcReg = new Map();
        this.children = [];
        this.instance = obj.instance;
        this.component = obj.component;
        this.meta = obj.meta;
        this.breakpoints = { afterActivation: [], afterDeactivation: [] };
    }
    ;
    ActiveElementModel.prototype.addFn = function (name, fn) {
        this.funcReg.set(name, fn);
        return this;
    };
    ActiveElementModel.prototype.getFn = function (name) {
        return this.funcReg.get(name);
    };
    ActiveElementModel.prototype.setFns = function (name) {
        var fns = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            fns[_i - 1] = arguments[_i];
        }
        var oldFns = this.breakpoints[name];
        this.breakpoints[name] = oldFns.concat(fns);
        return this;
    };
    ActiveElementModel.prototype.copy = function (instance) {
        var child = new ActiveElementDescendentModel({
            instance: instance,
            component: this.component,
            meta: this.meta,
        }, this);
        this.children = this.children.concat([child]);
        return child;
    };
    ActiveElementModel.prototype.deleteCopy = function (instance) {
        this.children = this.children.filter(function (i) { return i === instance; });
        return this;
    };
    ActiveElementModel.prototype.deleteAllCopies = function () {
        var _this = this;
        this.children.forEach(function (ch) { return _this.deleteCopy(ch); });
        return this;
    };
    ActiveElementModel.prototype.isCopy = function () {
        return false;
    };
    ActiveElementModel.prototype.deactivate = function () {
        var _this = this;
        this.state = 'deactivated';
        this.breakpoints.afterDeactivation.forEach(function (fn) { return fn(_this.instance); });
        return;
    };
    ActiveElementModel.prototype.activate = function () {
        var _this = this;
        this.state = 'activated';
        this.breakpoints.afterActivation.forEach(function (fn) { return fn(_this.instance); });
        return;
    };
    ActiveElementModel.prototype.isActive = function () {
        if (this.state == 'activated')
            return true;
        return false;
    };
    return ActiveElementModel;
}());

var ActiveElementDescendentModel = /** @class */ (function (_super) {
    __extends(ActiveElementDescendentModel, _super);
    function ActiveElementDescendentModel(obj, parent) {
        var _this = _super.call(this, obj) || this;
        _this.parent = parent;
        _this.type = 'copy';
        return _this;
    }
    ActiveElementDescendentModel.prototype.copy = function (instance) {
        return this.parent.copy(instance);
    };
    ActiveElementDescendentModel.prototype.isCopy = function () {
        return this.parent;
    };
    ActiveElementDescendentModel.prototype.deleteCopy = function () {
        return this.parent.deleteCopy(this);
    };
    return ActiveElementDescendentModel;
}(ActiveElementModel));

//# sourceMappingURL=active-element.model.js.map

/***/ }),

/***/ 325:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__monsters_monsters_module__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__trinkets_trinkets_module__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__game_game_module__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__item_holder_item_holder_module__ = __webpack_require__(330);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [],
            imports: [__WEBPACK_IMPORTED_MODULE_1__monsters_monsters_module__["a" /* MonstersModule */], __WEBPACK_IMPORTED_MODULE_2__trinkets_trinkets_module__["a" /* TrinketsModule */], __WEBPACK_IMPORTED_MODULE_3__game_game_module__["a" /* GameModule */], __WEBPACK_IMPORTED_MODULE_4__item_holder_item_holder_module__["a" /* ItemHolderModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_1__monsters_monsters_module__["a" /* MonstersModule */], __WEBPACK_IMPORTED_MODULE_2__trinkets_trinkets_module__["a" /* TrinketsModule */], __WEBPACK_IMPORTED_MODULE_3__game_game_module__["a" /* GameModule */], __WEBPACK_IMPORTED_MODULE_4__item_holder_item_holder_module__["a" /* ItemHolderModule */]]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());

;
//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 326:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MonstersModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__alien_alien__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__skeleton_skeleton__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__zombie_zombie__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__bed_bed__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__spider_spider__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__vampire_vampire__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__wolf_wolf__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__mummy_mummy__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__yaga_yaga__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__doctor_doctor__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__yeti_yeti__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ghost_ghost__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__monsters_component__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__monsters_host_directive__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__monsters_screen_directive__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__monster_part_directive__ = __webpack_require__(171);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

// List of Monsters
















var MonstersModule = /** @class */ (function () {
    function MonstersModule() {
    }
    MonstersModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_3__zombie_zombie__["a" /* ZombieComponent */], __WEBPACK_IMPORTED_MODULE_2__skeleton_skeleton__["a" /* SkeletonComponent */], __WEBPACK_IMPORTED_MODULE_1__alien_alien__["a" /* AlienComponent */], __WEBPACK_IMPORTED_MODULE_4__bed_bed__["a" /* BedComponent */], __WEBPACK_IMPORTED_MODULE_5__spider_spider__["a" /* SpiderComponent */], __WEBPACK_IMPORTED_MODULE_6__vampire_vampire__["a" /* VampireComponent */], __WEBPACK_IMPORTED_MODULE_7__wolf_wolf__["a" /* WolfComponent */], __WEBPACK_IMPORTED_MODULE_8__mummy_mummy__["a" /* MummyComponent */], __WEBPACK_IMPORTED_MODULE_9__yaga_yaga__["a" /* YagaComponent */], __WEBPACK_IMPORTED_MODULE_10__doctor_doctor__["a" /* DoctorComponent */], __WEBPACK_IMPORTED_MODULE_11__yeti_yeti__["a" /* YetiComponent */], __WEBPACK_IMPORTED_MODULE_12__ghost_ghost__["a" /* GhostComponent */], __WEBPACK_IMPORTED_MODULE_13__monsters_component__["a" /* MonstersComponent */], __WEBPACK_IMPORTED_MODULE_14__monsters_host_directive__["a" /* MonstersHostDirective */], __WEBPACK_IMPORTED_MODULE_15__monsters_screen_directive__["a" /* MonstersScreenDirective */], __WEBPACK_IMPORTED_MODULE_16__monster_part_directive__["a" /* MonsterPartDirective */]],
            providers: [],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_3__zombie_zombie__["a" /* ZombieComponent */], __WEBPACK_IMPORTED_MODULE_2__skeleton_skeleton__["a" /* SkeletonComponent */], __WEBPACK_IMPORTED_MODULE_1__alien_alien__["a" /* AlienComponent */], __WEBPACK_IMPORTED_MODULE_4__bed_bed__["a" /* BedComponent */], __WEBPACK_IMPORTED_MODULE_5__spider_spider__["a" /* SpiderComponent */], __WEBPACK_IMPORTED_MODULE_6__vampire_vampire__["a" /* VampireComponent */], __WEBPACK_IMPORTED_MODULE_7__wolf_wolf__["a" /* WolfComponent */], __WEBPACK_IMPORTED_MODULE_9__yaga_yaga__["a" /* YagaComponent */], __WEBPACK_IMPORTED_MODULE_10__doctor_doctor__["a" /* DoctorComponent */], __WEBPACK_IMPORTED_MODULE_11__yeti_yeti__["a" /* YetiComponent */], __WEBPACK_IMPORTED_MODULE_8__mummy_mummy__["a" /* MummyComponent */], __WEBPACK_IMPORTED_MODULE_12__ghost_ghost__["a" /* GhostComponent */],],
            exports: [__WEBPACK_IMPORTED_MODULE_13__monsters_component__["a" /* MonstersComponent */]]
        })
    ], MonstersModule);
    return MonstersModule;
}());

//# sourceMappingURL=monsters.module.js.map

/***/ }),

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BedComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__monster_model__ = __webpack_require__(12);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BedComponent = /** @class */ (function (_super) {
    __extends(BedComponent, _super);
    function BedComponent(el, renderer, componentFactoryResolver, injector, app) {
        var _this = _super.call(this, 'bed', el.nativeElement, componentFactoryResolver, injector, app) || this;
        _this.el = el;
        _this.renderer = renderer;
        return _this;
    }
    BedComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'bed',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/bed/bed.html"*/'<svg width="auto" height="95%" viewBox="0 0 233.58 324.24" class="zombie svg-container" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n  <g class="">\n    <path class="body" d="M260.9,280.8c0-64.94-53.13-118.07-118.07-118.07h0c-64.94,0-118.07,53.13-118.07,118.07V539.15H260.9Z"></path>\n    <g class="head">\n      <g class="head-figure">\n        <g class="hair">\n          <polygon points="132.33 -0.05 96.08 48.13 87.64 48.13 79.21 48.13 132.33 -0.05" class="hair-part"></polygon>\n          <polygon points="145.47 -0.05 109.21 48.13 100.78 48.13 92.34 48.13 145.47 -0.05" class="hair-part"></polygon>\n          <polygon points="158.6 -0.05 122.35 48.13 113.91 48.13 105.48 48.13 158.6 -0.05" class="hair-part"></polygon>\n        </g>\n        <rect x="18.13" y="47.84" width="168.14" height="168.14" rx="52.98" ry="52.98" class="face"></rect>\n      </g>\n      <g monster-part part-name="eyes" part-type="group" class="eyes">\n        <g monster-part part-name="eye" part-name-mod="left" part-type="group" part-group="eyes" class="eye eye--left" visibility="visible">\n          <ellipse cx="66.08" cy="97.54" rx="27.81" ry="16.86" class="eyeball"></ellipse>\n          <circle cx="74.18" cy="97.32" r="8.32" class="pupil"></circle>\n        </g>\n        <g monster-part part-name="eye" part-name-mod="right" part-type="group" part-group="eyes" class="eye eye--right" visibility="visible">\n          <ellipse cx="135.7" cy="97.54" rx="27.81" ry="16.86" class="eyeball"></ellipse>\n          <circle cx="142.93" cy="97.32" r="8.32" class="pupil"></circle>\n        </g>\n      </g>\n      <g monster-part part-group="eyes" part-type="container"></g>\n      <path d="M19.21,122.49A19.3,19.3,0,0,0,0,141.74H0A19.3,19.3,0,0,0,19.21,161h83.43v-38.5Z" class="nose"></path>\n      <path d="M102.43,194c15.36,0,27.81-7.55,27.81-16.86H74.62C74.62,186.43,87.07,194,102.43,194Z" class="mouth"></path>\n      <g class="steams">\n        <g class="steam steam--right">\n          <line x1="128.09" y1="159.01" x2="162.15" y2="124.95" class="steam-part"></line>\n          <line x1="130.88" y1="148.79" x2="138.31" y2="156.22" class="steam-part"></line>\n          <line x1="136.14" y1="143.53" x2="143.57" y2="150.96" class="steam-part"></line>\n          <line x1="141.4" y1="138.26" x2="148.84" y2="145.69" class="steam-part"></line>\n          <line x1="146.67" y1="133" x2="154.1" y2="140.43" class="steam-part"></line>\n          <line x1="151.93" y1="127.74" x2="159.36" y2="135.17" class="steam-part"></line>\n        </g>\n      </g>\n    </g>\n  </g>\n</svg>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/bed/bed.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ApplicationRef */]])
    ], BedComponent);
    return BedComponent;
}(__WEBPACK_IMPORTED_MODULE_1__monster_model__["a" /* MonsterModel */]));

//# sourceMappingURL=bed.js.map

/***/ }),

/***/ 328:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrinketsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__glass_glass__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__eyes_eyes__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__hood_hood__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mole_mole__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__heart_heart__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__beard_beard__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__trinkets_component__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__trinket_host_directive__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__trinket_random_part_directive__ = __webpack_require__(164);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var TrinketsModule = /** @class */ (function () {
    function TrinketsModule() {
    }
    TrinketsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_2__glass_glass__["a" /* GlassComponent */], __WEBPACK_IMPORTED_MODULE_3__eyes_eyes__["a" /* EyesComponent */], __WEBPACK_IMPORTED_MODULE_4__hood_hood__["a" /* HoodComponent */], __WEBPACK_IMPORTED_MODULE_5__mole_mole__["a" /* MoleComponent */], __WEBPACK_IMPORTED_MODULE_6__heart_heart__["a" /* HeartComponent */], __WEBPACK_IMPORTED_MODULE_7__beard_beard__["a" /* BeardComponent */], __WEBPACK_IMPORTED_MODULE_8__trinkets_component__["a" /* TrinketsComponent */], __WEBPACK_IMPORTED_MODULE_9__trinket_host_directive__["a" /* TrinketHostDirective */], __WEBPACK_IMPORTED_MODULE_10__trinket_random_part_directive__["a" /* TrinketRandomPartDirective */]],
            providers: [],
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_2__glass_glass__["a" /* GlassComponent */], __WEBPACK_IMPORTED_MODULE_3__eyes_eyes__["a" /* EyesComponent */], __WEBPACK_IMPORTED_MODULE_4__hood_hood__["a" /* HoodComponent */], __WEBPACK_IMPORTED_MODULE_5__mole_mole__["a" /* MoleComponent */], __WEBPACK_IMPORTED_MODULE_6__heart_heart__["a" /* HeartComponent */], __WEBPACK_IMPORTED_MODULE_7__beard_beard__["a" /* BeardComponent */],],
            exports: [__WEBPACK_IMPORTED_MODULE_8__trinkets_component__["a" /* TrinketsComponent */]]
        })
    ], TrinketsModule);
    return TrinketsModule;
}());

//# sourceMappingURL=trinkets.module.js.map

/***/ }),

/***/ 329:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

// import { CursorStateService } from './cursor-state.service';
var GameModule = /** @class */ (function () {
    function GameModule() {
    }
    GameModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [],
            // providers: [GameService, CursorStateService],
            imports: [],
            entryComponents: [],
            exports: []
        })
    ], GameModule);
    return GameModule;
}());

//# sourceMappingURL=game.module.js.map

/***/ }),

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemHolderModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__item_holder_component__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__template_host_directive__ = __webpack_require__(185);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ItemHolderModule = /** @class */ (function () {
    function ItemHolderModule() {
    }
    ItemHolderModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__item_holder_component__["a" /* ItemHolderComponent */], __WEBPACK_IMPORTED_MODULE_2__template_host_directive__["a" /* TemplateHostDriective */]],
            providers: [],
            imports: [],
            entryComponents: [],
            exports: [__WEBPACK_IMPORTED_MODULE_1__item_holder_component__["a" /* ItemHolderComponent */], __WEBPACK_IMPORTED_MODULE_2__template_host_directive__["a" /* TemplateHostDriective */]]
        })
    ], ItemHolderModule);
    return ItemHolderModule;
}());

//# sourceMappingURL=item-holder.module.js.map

/***/ }),

/***/ 331:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BackgroundModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bg_directive__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__background_tablet_component__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__background_mobile_component__ = __webpack_require__(190);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var BackgroundModule = /** @class */ (function () {
    function BackgroundModule() {
    }
    BackgroundModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_2__background_tablet_component__["a" /* BackgroundTabletComponent */], __WEBPACK_IMPORTED_MODULE_3__background_mobile_component__["a" /* BackgroundMobileComponent */], __WEBPACK_IMPORTED_MODULE_1__bg_directive__["a" /* BackgroundAnchorDirective */]],
            providers: [],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_2__background_tablet_component__["a" /* BackgroundTabletComponent */], __WEBPACK_IMPORTED_MODULE_3__background_mobile_component__["a" /* BackgroundMobileComponent */],],
            exports: [__WEBPACK_IMPORTED_MODULE_2__background_tablet_component__["a" /* BackgroundTabletComponent */], __WEBPACK_IMPORTED_MODULE_3__background_mobile_component__["a" /* BackgroundMobileComponent */]]
        })
    ], BackgroundModule);
    return BackgroundModule;
}());

//# sourceMappingURL=bg.module.js.map

/***/ }),

/***/ 332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModelModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__element_repository__ = __webpack_require__(157);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var ModelModule = /** @class */ (function () {
    function ModelModule() {
    }
    ModelModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [],
            providers: [__WEBPACK_IMPORTED_MODULE_1__element_repository__["a" /* ElementRepository */]]
        })
    ], ModelModule);
    return ModelModule;
}());

;
//# sourceMappingURL=model.module.js.map

/***/ }),

/***/ 333:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(102);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BeardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_element_component_model__ = __webpack_require__(42);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BeardComponent = /** @class */ (function (_super) {
    __extends(BeardComponent, _super);
    function BeardComponent(element) {
        return _super.call(this, 'beard', element.nativeElement) || this;
    }
    BeardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'beard',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/trinkets/beard/beard.html"*/'<svg width="150" class="beard" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 147.33 127.73">\n   <path class="cls-1" d="M144.35,33.21c0,-4.87,-20.48,-8.42,-21,-13.07a2.17,2.17,0,0,1,0.09,-0.87h-99.51a2.17,2.17,0,0,1,0.09,0.87c-0.57,4.65,-21,8.19,-21,13.06s20.48,8.42,21,13.07c0.6,4.85,-18.38,13.29,-17.22,17.82c1.2,4.74,21.9,2.91,23.67,7.22c1.87,4.54,-14,18,-11.54,21.92c2.57,4.2,21.57,-4,24.68,-0.61c3.31,3.65,-6.36,22,-2.54,24.6c4,2.77,17.23,-13,21.7,-11.52s6,22,10.89,22s6.37,-20.53,10.89,-22s17.68,14.3,21.69,11.52c3.82,-2.63,-5.85,-21,-2.54,-24.6c3.11,-3.43,22.11,4.81,24.68,0.61c2.42,-4,-13.41,-17.38,-11.54,-21.92c1.77,-4.31,22.46,-2.48,23.67,-7.22c1.16,-4.53,-17.81,-13,-17.22,-17.82c0.58,-4.64,21.06,-8.19,21.06,-13.06z"></path>\n   <path class="cls-2" d="M99.63,19.1c0,26.9,-51.93,26.9,-51.93,0z"></path>\n   <path class="cls-3" d="M80.78,20.68a62.4,62.4,0,0,1,-22.3,10.59a58.33,58.33,0,0,1,-23.26,1a54.7,54.7,0,0,1,-20.46,-7.73a51.16,51.16,0,0,1,-14.76,-14.2a47.44,47.44,0,0,0,17.56,7.42a43.61,43.61,0,0,0,17.66,-0.13a39.78,39.78,0,0,0,14.86,-6.63a36.51,36.51,0,0,0,10,-11z"></path>\n   <path class="cls-3" d="M87.23,0a36.51,36.51,0,0,0,10,11a39.78,39.78,0,0,0,14.86,6.62a43.61,43.61,0,0,0,17.66,0.13a47.44,47.44,0,0,0,17.56,-7.42a51.16,51.16,0,0,1,-14.76,14.18a54.7,54.7,0,0,1,-20.46,7.73a58.33,58.33,0,0,1,-23.26,-1a62.4,62.4,0,0,1,-22.3,-10.59z"></path>\n</svg>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/trinkets/beard/beard.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]) === "function" && _a || Object])
    ], BeardComponent);
    return BeardComponent;
    var _a;
}(__WEBPACK_IMPORTED_MODULE_1__model_element_component_model__["a" /* ElementComponentModel */]));

//# sourceMappingURL=beard.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ElementComponentModel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__element_repository__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__element_model__ = __webpack_require__(284);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ElementComponentModel = /** @class */ (function () {
    function ElementComponentModel(name, node) {
        this.name = name;
        this.node = node;
        this.repo = __WEBPACK_IMPORTED_MODULE_1__element_repository__["b" /* default */];
    }
    ;
    ElementComponentModel.prototype.ngOnInit = function () {
        this.element = new __WEBPACK_IMPORTED_MODULE_2__element_model__["a" /* ElementModel */](this.name, this.node);
        this.add(this.element);
    };
    ;
    ElementComponentModel.prototype.ngOnDestroy = function () {
        this.repo.removeById(this.element.getId());
    };
    ;
    ElementComponentModel.prototype.add = function (element) {
        return this.repo.add(element);
    };
    ElementComponentModel = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({}),
        __metadata("design:paramtypes", [String, HTMLElement])
    ], ElementComponentModel);
    return ElementComponentModel;
}());

//# sourceMappingURL=element-component.model.js.map

/***/ })

},[234]);
//# sourceMappingURL=main.js.map
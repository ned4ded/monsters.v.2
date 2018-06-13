webpackJsonp([2],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MonsterModel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__monster_part_directive__ = __webpack_require__(180);
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
        this.emotion = 'default';
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
        if (callback === void 0) { callback = function (instance, ref) { }; }
        var obj = this.getContainer(name);
        var container = obj.viewContainerRef, element = obj.element, content = obj.content;
        this.clear(name);
        var factory = this.componentFactoryResolver.resolveComponentFactory(component);
        var ref = factory.create(this.injector, [], element);
        this.app.attachView(ref.hostView);
        var instance = ref.instance.node.children.item(0);
        obj.content = ref.instance;
        return callback(ref.instance, ref);
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
    MonsterModel.prototype.makeSad = function () {
        this.emotion = 'sad';
        return this;
    };
    MonsterModel.prototype.makeJoyjul = function () {
        this.emotion = 'joyful';
        return this;
    };
    MonsterModel.prototype.clearEmotion = function () {
        this.emotion = 'default';
        return this;
    };
    MonsterModel.prototype.getEmotion = function () {
        return this.emotion;
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
        this.getParts(function (p) { return p.hidden; }).forEach(function (_a) {
            var name = _a.name;
            _this.close(name);
        });
        return;
    };
    MonsterModel.prototype.animate = function (name, cb) {
        return false;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChildren */])(__WEBPACK_IMPORTED_MODULE_1__monster_part_directive__["a" /* MonsterPartDirective */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* QueryList */])
    ], MonsterModel.prototype, "parts", void 0);
    MonsterModel = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({}),
        __metadata("design:paramtypes", [Object, HTMLElement, __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ApplicationRef */]])
    ], MonsterModel);
    return MonsterModel;
}());

//# sourceMappingURL=monster.model.js.map

/***/ }),
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ElementComponentModel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__element_repository__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__element_model__ = __webpack_require__(294);
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

/***/ }),
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrinketUniqModel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__trinket_uniq_part_directive__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_element_component_model__ = __webpack_require__(21);
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



var TrinketUniqModel = /** @class */ (function (_super) {
    __extends(TrinketUniqModel, _super);
    function TrinketUniqModel(name, element) {
        var _this = _super.call(this, name, element) || this;
        _this.afterInit = [];
        _this.initiated = false;
        return _this;
    }
    TrinketUniqModel.prototype.ngAfterViewInit = function () {
        this.initiated = true;
        if (!this.afterInit.length)
            this.load('default');
        this.afterInit.forEach(function (fn) { return fn(); });
    };
    TrinketUniqModel.prototype.load = function (name) {
        var _this = this;
        if (!this.initiated) {
            this.afterInit = this.afterInit.concat([function () { return _this.load(name); }]);
            return;
        }
        var part = this.parts.find(function (p) { return p.name === name; }) || this.parts.find(function (p) { return p.name === 'default'; });
        part.show();
        return;
    };
    TrinketUniqModel.prototype.getInstance = function (cb) {
        var _this = this;
        if (!this.initiated) {
            this.afterInit = this.afterInit.concat([function () { return _this.getInstance(cb); }]);
            return;
        }
        cb(this.node);
        return;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChildren */])(__WEBPACK_IMPORTED_MODULE_1__trinket_uniq_part_directive__["a" /* TrinketUniqPartDirective */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* QueryList */])
    ], TrinketUniqModel.prototype, "parts", void 0);
    TrinketUniqModel = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({}),
        __metadata("design:paramtypes", [Object, Object])
    ], TrinketUniqModel);
    return TrinketUniqModel;
}(__WEBPACK_IMPORTED_MODULE_2__model_element_component_model__["a" /* ElementComponentModel */]));

//# sourceMappingURL=trinket-uniq.model.js.map

/***/ }),
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GamePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_trinkets_trinkets_component__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_monsters_monsters_component__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_game_game_service__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_game_game_logic__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_item_holder_item_holder_component__ = __webpack_require__(194);
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
            var _c = item.instance.getBoundingClientRect(), instanceW = _c.width, instanceH = _c.height;
            _this.holder.setAttributes({
                style: "left: " + x + "px; top: " + y + "px; transform: translate(-50%, -50%)",
            });
        };
        this.logic.setFns('onItemDragging', setHolderPosition);
        this.logic.setFns('onItemClick', function (items, item, ev) {
            var _a = item.meta, after = _a.after, multiple = _a.multiple, onScreen = _a.onScreen, random = _a.random;
            if (item.isCopy()) {
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
                after ? after(_this.monster, items, item.instance) : null;
                return;
            }
            if (!multiple) {
                // item.deactivate();
                // this.renderer.addClass(item.instance, 'blocked');
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
                    before ? before(_this.monster, items, instance.node) : null;
                    var copy = items.addActiveElementCopy(item, instance.node);
                    if (_this.monster.isOnMonster(instance.node.getBoundingClientRect())) {
                        copy.onMonster = true;
                    }
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
                var contentElement = content.node.children.item(0);
                var active = items.findActiveElementByInstance(contentElement);
                var after = active.meta.after;
                var parent_2 = active.isCopy();
                // parent.activate();
                // this.renderer.removeClass(parent.instance, 'blocked');
                items.removeActiveElement(active);
                after ? after(_this.monster, items, item.instance) : null;
            }
            _this.monster.render(item.component, item.meta.container, function (instance, ref) {
                var func = function (instance, async) {
                    before ? before(_this.monster, items, instance) : null;
                    var copy = items.addActiveElementCopy(item, instance);
                    var config = element.getBBox();
                    var attr = item.meta.attr;
                    Object.keys(attr).forEach(function (name) {
                        var funcs = attr[name];
                        var fn = funcs[_this.monster.name] || funcs['default'];
                        _this.renderer.setAttribute(instance, name, fn(config).toString());
                        return;
                    });
                    if (async) {
                        _this.logic.stop();
                        _this.logic.start();
                    }
                    return;
                };
                if (item.meta.uniq) {
                    ref.instance.load(_this.monster.name);
                    ref.instance.getInstance(function (node) {
                        var svg = node.children.item(0);
                        func(svg, true);
                    });
                }
                else {
                    var instanceElement = instance.node.children.item(0);
                    func(instanceElement);
                    return;
                }
            });
        });
        this.logic.setFns('afterItemDesroyed', function (ref, item) {
            var parent = item.isCopy();
            var el = parent ? parent : item;
            // el.activate();
            // this.renderer.removeClass(el.instance, 'blocked');
        });
        this.logic.setFns('afterClear', function (ref, items) {
            items.forEach(function (el) {
                // el.activate();
                // this.renderer.removeClass(el.instance, 'blocked');
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
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__select_select__ = __webpack_require__(196);
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
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */
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
webpackEmptyAsyncContext.id = 113;

/***/ }),
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/game/game.module": [
		343,
		1
	],
	"../pages/home/home.module": [
		344,
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
webpackAsyncContext.id = 154;
module.exports = webpackAsyncContext;

/***/ }),
/* 155 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrinketsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__trinket_host_directive__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__trinkets_service__ = __webpack_require__(293);
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
/* 156 */
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
/* 157 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlassComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_element_component_model__ = __webpack_require__(21);
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
/* 158 */
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
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EyesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_element_component_model__ = __webpack_require__(21);
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
/* 163 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HoodComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_element_component_model__ = __webpack_require__(21);
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
/* 164 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MoleComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__trinket_random_model__ = __webpack_require__(295);
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
/* 165 */
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
/* 166 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeartComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_element_component_model__ = __webpack_require__(21);
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
/* 167 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BeardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_element_component_model__ = __webpack_require__(21);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]])
    ], BeardComponent);
    return BeardComponent;
}(__WEBPACK_IMPORTED_MODULE_1__model_element_component_model__["a" /* ElementComponentModel */]));

//# sourceMappingURL=beard.js.map

/***/ }),
/* 168 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MoustacheComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_element_component_model__ = __webpack_require__(21);
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


var MoustacheComponent = /** @class */ (function (_super) {
    __extends(MoustacheComponent, _super);
    function MoustacheComponent(element) {
        return _super.call(this, 'moustache', element.nativeElement) || this;
    }
    MoustacheComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'moustache',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/trinkets/moustache/moustache.html"*/'<svg width="150" class="moustache" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108.42 44.04">\n   <path class="cls-1" d="M27.26,34.7a27.27,27.27,0,0,1,-26.86,-22.59a27.27,27.27,0,1,0,54.13,4.67a27.44,27.44,0,0,0,-0.4,-4.67a27.27,27.27,0,0,1,-26.87,22.59z"></path>\n   <path class="cls-1" d="M23.7,28a25.89,25.89,0,0,1,-18.06,-28a25.89,25.89,0,1,0,47.81,19.36a26,26,0,0,0,0.94,-4.36a25.89,25.89,0,0,1,-30.69,13z"></path>\n   <path class="cls-1" d="M81.15,34.7a27.27,27.27,0,0,0,26.85,-22.59a27.26,27.26,0,1,1,-53.73,0a27.27,27.27,0,0,0,26.88,22.59z"></path>\n   <path class="cls-1" d="M84.71,28a25.89,25.89,0,0,0,18.07,-28a25.88,25.88,0,1,1,-48.78,15a25.89,25.89,0,0,0,30.71,13z"></path>\n   <path class="cls-1" d="M27.9,24.18a22.33,22.33,0,0,1,-15.59,-24.18a22.33,22.33,0,1,0,42.05,13a22.33,22.33,0,0,1,-26.46,11.18z"></path>\n   <path class="cls-1" d="M80.52,24.18a22.33,22.33,0,0,0,15.58,-24.18a22.33,22.33,0,1,1,-42.05,13a22.33,22.33,0,0,0,26.47,11.18z"></path>\n</svg>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/trinkets/moustache/moustache.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]])
    ], MoustacheComponent);
    return MoustacheComponent;
}(__WEBPACK_IMPORTED_MODULE_1__model_element_component_model__["a" /* ElementComponentModel */]));

//# sourceMappingURL=moustache.js.map

/***/ }),
/* 169 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SnivelComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_element_component_model__ = __webpack_require__(21);
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


var SnivelComponent = /** @class */ (function (_super) {
    __extends(SnivelComponent, _super);
    function SnivelComponent(element) {
        return _super.call(this, 'snivel', element.nativeElement) || this;
    }
    SnivelComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'snivel',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/trinkets/snivel/snivel.html"*/'<svg width="25" class="snivel" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 32.49 121.17">\n         <path class="cls-1" d="M8.12,85.65c0,6.74,-0.82,8,-1.82,8s-1.82,-1.26,-1.82,-8a42.85,42.85,0,0,1,1.82,-12.2a42.85,42.85,0,0,1,1.82,12.2z"></path>\n         <path class="cls-1" d="M17.74,57.14c0,6.74,-0.82,8,-1.82,8s-1.82,-1.26,-1.82,-8a42.85,42.85,0,0,1,1.82,-12.2a42.85,42.85,0,0,1,1.82,12.2z"></path>\n         <path class="cls-1" d="M27.68,88.3c0,6.74,-0.82,8,-1.82,8s-1.86,-1.3,-1.86,-8a42.85,42.85,0,0,1,1.82,-12.2a42.85,42.85,0,0,1,1.86,12.2z"></path>\n         <path class="cls-1" d="M27.68,113.17c0,6.74,-0.82,8,-1.82,8s-1.82,-1.26,-1.82,-8a42.85,42.85,0,0,1,1.82,-12.17a42.85,42.85,0,0,1,1.82,12.17z"></path>\n         <path class="cls-1" d="M1.46,0a233.82,233.82,0,0,0,-1.46,27.35c0,23.9,2.89,43.27,6.47,43.27c3.09,0,5.67,-14.51,6.31,-33.91c-1.88,-7.47,-3.14,-21.1,-3.16,-36.71z"></path>\n         <path class="cls-1" d="M21.28,0h-9.8a233.79,233.79,0,0,1,1.46,27.35c0,3.21,-0.05,6.34,-0.15,9.35c1,3.85,2.1,6.06,3.3,6.06s2.53,-2.62,3.55,-7.1q-0.07,-3.1,-0.07,-6.32a224.61,224.61,0,0,1,1.71,-29.34z"></path>\n         <path class="cls-1" d="M11.47,0h-1.85c0,15.61,1.29,29.24,3.16,36.71c0.1,-3,0.15,-6.14,0.15,-9.35a233.79,233.79,0,0,0,-1.46,-27.36z"></path>\n         <path class="cls-1" d="M22.54,0c0,14.91,-1.18,28,-2.91,35.66c0.46,20.9,3.15,36.94,6.4,36.94c3.57,0,6.47,-19.37,6.47,-43.27a224.61,224.61,0,0,0,-1.72,-29.33z"></path>\n         <path class="cls-1" d="M21.28,0a224.61,224.61,0,0,0,-1.71,29.34q0,3.22,0.07,6.32c1.73,-7.66,2.88,-20.75,2.9,-35.66z"></path>\n</svg>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/trinkets/snivel/snivel.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]])
    ], SnivelComponent);
    return SnivelComponent;
}(__WEBPACK_IMPORTED_MODULE_1__model_element_component_model__["a" /* ElementComponentModel */]));

//# sourceMappingURL=snivel.js.map

/***/ }),
/* 170 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DressComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__trinket_uniq_model__ = __webpack_require__(48);
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


var DressComponent = /** @class */ (function (_super) {
    __extends(DressComponent, _super);
    function DressComponent(element) {
        return _super.call(this, 'dress', element.nativeElement) || this;
    }
    DressComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'dress',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/trinkets/dress/dress.html"*/'<ng-template trinket-uniq-part part-name="default">\n  <svg width="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 172.5 86.5" class="dress">\n     <path class="cls-1" d="M172.5,46.51a46.64,46.64,0,0,0,-46.5,-46.51h-79.5a46.64,46.64,0,0,0,-46.5,46.51v40h172.5z"></path>\n     <polygon class="cls-2" points="13.5 7.8 72.04 39 89.19 0 27.16 0 13.5 7.8"></polygon>\n     <polygon class="cls-2" points="159 7.8 100.46 39 83.31 0 145.34 0 159 7.8"></polygon>\n     <circle class="cls-3" cx="27.81" cy="7.53" r="2.05"></circle>\n     <circle class="cls-3" cx="37.31" cy="6.35" r="2.05"></circle>\n     <circle class="cls-3" cx="40.79" cy="13.8" r="2.05"></circle>\n     <circle class="cls-3" cx="52.57" cy="8.35" r="2.05"></circle>\n     <circle class="cls-3" cx="69.46" cy="9.33" r="2.05"></circle>\n     <circle class="cls-3" cx="109.21" cy="27.3" r="2.05"></circle>\n     <circle class="cls-3" cx="101.21" cy="13" r="2.05"></circle>\n     <circle class="cls-3" cx="86.21" cy="10.55" r="7.13" transform="translate(17.79 64.05) rotate(-45)"></circle>\n     <circle class="cls-1" cx="84.11" cy="8.44" r="1.24" transform="translate(18.66 61.95) rotate(-45)"></circle>\n     <circle class="cls-1" cx="88.16" cy="12.49" r="1.24" transform="translate(16.99 66) rotate(-45)"></circle>\n     <circle class="cls-1" cx="88.16" cy="8.44" r="1.24" transform="translate(19.85 64.81) rotate(-45)"></circle>\n     <circle class="cls-1" cx="84.11" cy="12.49" r="1.24" transform="translate(15.8 63.13) rotate(-45)"></circle>\n     <circle class="cls-3" cx="86.21" cy="37.05" r="7.13" transform="translate(-0.95 71.81) rotate(-45)"></circle>\n     <circle class="cls-3" cx="86.21" cy="63.55" r="7.13" transform="translate(-19.69 79.58) rotate(-45)"></circle>\n     <circle class="cls-3" cx="108.96" cy="6.25" r="2.05"></circle>\n     <circle class="cls-3" cx="119.21" cy="10.25" r="2.05"></circle>\n     <circle class="cls-3" cx="132.46" cy="5.25" r="2.05"></circle>\n     <circle class="cls-3" cx="143.66" cy="9" r="2.05"></circle>\n     <circle class="cls-3" cx="121.71" cy="22.5" r="2.05"></circle>\n     <circle class="cls-3" cx="57.46" cy="18.17" r="2.05"></circle>\n     <circle class="cls-3" cx="66.3" cy="27.83" r="2.05"></circle>\n     <circle class="cls-1" cx="84.11" cy="34.95" r="1.24" transform="translate(-0.08 69.71) rotate(-45)"></circle>\n     <circle class="cls-1" cx="88.16" cy="39" r="1.24" transform="translate(-1.75 73.76) rotate(-45)"></circle>\n     <circle class="cls-1" cx="88.16" cy="34.95" r="1.24" transform="translate(1.11 72.57) rotate(-45)"></circle>\n     <circle class="cls-1" cx="84.11" cy="39" r="1.24" transform="translate(-2.94 70.89) rotate(-45)"></circle>\n     <circle class="cls-1" cx="84.17" cy="61.39" r="1.24" transform="translate(-18.76 77.49) rotate(-45)"></circle>\n     <circle class="cls-1" cx="88.22" cy="65.44" r="1.24" transform="translate(-20.43 81.54) rotate(-45)"></circle>\n     <circle class="cls-1" cx="88.22" cy="61.39" r="1.24" transform="translate(-17.57 80.36) rotate(-45)"></circle>\n     <circle class="cls-1" cx="84.17" cy="65.44" r="1.24" transform="translate(-21.62 78.68) rotate(-45)"></circle>\n     <line class="cls-4" x1="84.11" y1="8.44" x2="88.16" y2="12.49"></line>\n     <line class="cls-4" x1="88.16" y1="8.44" x2="84.11" y2="12.49"></line>\n     <line class="cls-4" x1="84.11" y1="34.94" x2="88.16" y2="38.99"></line>\n     <line class="cls-4" x1="88.16" y1="34.94" x2="84.11" y2="38.99"></line>\n     <line class="cls-4" x1="84.06" y1="61.5" x2="88.11" y2="65.55"></line>\n     <line class="cls-4" x1="88.11" y1="61.5" x2="84.06" y2="65.55"></line>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="mummy">\n  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 192.892 96" class="dress--mummy">\n    <path class="cls-3" d="M202.89,70a52.15,52.15,0,0,0,-52,-52h-88.89a52.15,52.15,0,0,0,-52,52v44.72h192.89z" transform="translate(-10 -18.02)"></path>\n    <polygon class="cls-4" points="15.1 8.72 80.56 43.61 99.73 0 30.37 0 15.1 8.72"></polygon>\n    <polygon class="cls-4" points="177.79 8.72 112.33 43.61 93.16 0 162.52 0 177.79 8.72"></polygon>\n    <circle class="cls-5" cx="31.1" cy="8.42" r="2.29"></circle>\n    <circle class="cls-5" cx="41.73" cy="7.1" r="2.29"></circle>\n    <circle class="cls-5" cx="45.61" cy="15.43" r="2.29"></circle>\n    <circle class="cls-5" cx="58.79" cy="9.33" r="2.29"></circle>\n    <circle class="cls-5" cx="77.68" cy="10.44" r="2.29"></circle>\n    <circle class="cls-5" cx="122.12" cy="30.53" r="2.29"></circle>\n    <circle class="cls-5" cx="113.18" cy="14.54" r="2.29"></circle>\n    <circle class="cls-5" cx="106.4" cy="29.82" r="7.97" transform="translate(0.08 65.95) rotate(-45)"></circle>\n    <circle class="cls-3" cx="104.05" cy="27.46" r="1.39" transform="translate(1.06 63.6) rotate(-45)"></circle>\n    <circle class="cls-3" cx="108.58" cy="31.99" r="1.39" transform="translate(-0.82 68.12) rotate(-45)"></circle>\n    <circle class="cls-3" cx="108.58" cy="27.46" r="1.39" transform="translate(2.38 66.8) rotate(-45)"></circle>\n    <circle class="cls-3" cx="104.05" cy="31.99" r="1.39" transform="translate(-2.15 64.92) rotate(-45)"></circle>\n    <circle class="cls-5" cx="106.4" cy="59.45" r="7.97" transform="translate(-20.87 74.63) rotate(-45)"></circle>\n    <circle class="cls-5" cx="106.4" cy="89.09" r="7.97" transform="translate(-41.83 83.31) rotate(-45)"></circle>\n    <circle class="cls-5" cx="121.84" cy="6.99" r="2.29"></circle>\n    <circle class="cls-5" cx="133.31" cy="11.46" r="2.29"></circle>\n    <circle class="cls-5" cx="148.12" cy="5.87" r="2.29"></circle>\n    <circle class="cls-5" cx="160.65" cy="10.06" r="2.29"></circle>\n    <circle class="cls-5" cx="136.1" cy="25.16" r="2.29"></circle>\n    <circle class="cls-5" cx="64.26" cy="20.31" r="2.29"></circle>\n    <circle class="cls-5" cx="74.13" cy="31.12" r="2.29"></circle>\n    <circle class="cls-3" cx="104.05" cy="57.1" r="1.39" transform="translate(-19.9 72.28) rotate(-45)"></circle>\n    <circle class="cls-3" cx="108.58" cy="61.63" r="1.39" transform="translate(-21.78 76.8) rotate(-45)"></circle>\n    <circle class="cls-3" cx="108.58" cy="57.1" r="1.39" transform="translate(-18.58 75.48) rotate(-45)"></circle>\n    <circle class="cls-3" cx="104.05" cy="61.63" r="1.39" transform="translate(-23.1 73.6) rotate(-45)"></circle>\n    <circle class="cls-3" cx="104.12" cy="86.67" r="1.39" transform="translate(-40.79 80.98) rotate(-45)"></circle>\n    <circle class="cls-3" cx="108.64" cy="91.2" r="1.39" transform="translate(-42.66 85.51) rotate(-45)"></circle>\n    <circle class="cls-3" cx="108.64" cy="86.67" r="1.39" transform="translate(-39.46 84.18) rotate(-45)"></circle>\n    <circle class="cls-3" cx="104.12" cy="91.2" r="1.39" transform="translate(-43.99 82.31) rotate(-45)"></circle>\n    <line class="cls-6" x1="94.05" y1="9.44" x2="98.58" y2="13.97"></line>\n    <line class="cls-6" x1="98.58" y1="9.44" x2="94.05" y2="13.97"></line>\n    <line class="cls-6" x1="94.05" y1="39.08" x2="98.58" y2="43.6"></line>\n    <line class="cls-6" x1="98.58" y1="39.08" x2="94.05" y2="43.6"></line>\n    <line class="cls-6" x1="93.99" y1="68.77" x2="98.52" y2="73.29"></line>\n    <line class="cls-6" x1="98.52" y1="68.77" x2="93.99" y2="73.29"></line>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="zombie">\n  <svg class="dress--zombie" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 261 191.33">\n    <path class="cls-3" d="M251,215.33l-243.67,-0.66l0.51,-81.75s-3.84,-61.92,44.16,-74.73l101.56,-26.19c9.86,-1.28,27.73,-2.05,46.46,6.65c44.68,20.75,50.66,75.13,51,78.58zm17.33,-32" transform="translate(-7.33 -24)"></path>\n    <polygon class="cls-4" points="5.03 55.01 90.1 75.61 99.17 20.13 22.17 36 5.03 55.01"></polygon>\n    <polygon class="cls-4" points="190.95 7.12 126.42 66.26 91.67 22.06 159.17 0 190.95 7.12"></polygon>\n    <circle class="cls-5" cx="30.56" cy="73.95" r="2.7" transform="translate(-24.81 -14.04) rotate(-14.44)"></circle>\n    <circle class="cls-5" cx="41.31" cy="72.32" r="2.7" transform="translate(-24.06 -11.41) rotate(-14.44)"></circle>\n    <circle class="cls-5" cx="52.12" cy="82.33" r="2.7" transform="translate(-26.22 -8.4) rotate(-14.44)"></circle>\n    <circle class="cls-5" cx="61.88" cy="79.67" r="2.7" transform="translate(-25.25 -6.05) rotate(-14.44)"></circle>\n    <circle class="cls-5" cx="170" cy="44" r="2.7" transform="translate(-12.94 19.79) rotate(-14.44)"></circle>\n    <circle class="cls-5" cx="135.67" cy="78.67" r="2.7" transform="translate(-22.67 12.32) rotate(-14.44)"></circle>\n    <circle class="cls-5" cx="126.16" cy="56.79" r="2.7" transform="translate(-17.51 9.26) rotate(-14.44)"></circle>\n    <circle class="cls-5" cx="106.18" cy="58.59" r="9.41" transform="matrix(0.51, -0.86, 0.86, 0.51, -5.59, 96.24)"></circle>\n    <circle class="cls-3" cx="102.8" cy="56.59" r="1.64" transform="translate(-5.53 92.34) rotate(-59.44)"></circle>\n    <circle class="cls-3" cx="109.3" cy="60.43" r="1.64" transform="matrix(0.51, -0.86, 0.86, 0.51, -5.64, 99.83)"></circle>\n    <circle class="cls-3" cx="107.97" cy="55.26" r="1.64" transform="translate(-1.84 96.14) rotate(-59.44)"></circle>\n    <circle class="cls-3" cx="104.13" cy="61.77" r="1.64" transform="translate(-9.33 96.03) rotate(-59.44)"></circle>\n    <circle class="cls-5" cx="114.9" cy="92.46" r="9.41" transform="translate(-30.47 120.4) rotate(-59.44)"></circle>\n    <circle class="cls-5" cx="123.63" cy="126.32" r="9.41" transform="translate(-55.34 144.55) rotate(-59.44)"></circle>\n    <circle class="cls-5" cx="133.84" cy="45.61" r="2.7" transform="translate(-14.48 10.82) rotate(-14.44)"></circle>\n    <circle class="cls-5" cx="148.25" cy="47.35" r="2.7" transform="translate(-14.46 14.47) rotate(-14.44)"></circle>\n    <circle class="cls-5" cx="159.95" cy="38.66" r="2.7" transform="translate(-11.92 17.11) rotate(-14.44)"></circle>\n    <circle class="cls-5" cx="180.73" cy="37.91" r="2.7" transform="translate(-11.08 22.27) rotate(-14.44)"></circle>\n    <circle class="cls-5" cx="144.62" cy="68.33" r="2.7" transform="translate(-19.8 14.23) rotate(-14.44)"></circle>\n    <circle class="cls-5" cx="156" cy="61.67" r="2.7" transform="translate(-17.78 16.85) rotate(-14.44)"></circle>\n    <circle class="cls-5" cx="80" cy="75" r="2.7" transform="translate(-23.51 -1.68) rotate(-14.44)"></circle>\n    <circle class="cls-5" cx="86.42" cy="87.23" r="2.7" transform="translate(-26.36 0.31) rotate(-14.44)"></circle>\n    <circle class="cls-3" cx="111.52" cy="90.46" r="1.64" transform="translate(-30.41 116.5) rotate(-59.44)"></circle>\n    <circle class="cls-3" cx="118.02" cy="94.3" r="1.64" transform="translate(-30.52 123.99) rotate(-59.44)"></circle>\n    <circle class="cls-3" cx="116.69" cy="89.13" r="1.64" transform="matrix(0.51, -0.86, 0.86, 0.51, -26.72, 120.3)"></circle>\n    <circle class="cls-3" cx="112.85" cy="95.64" r="1.64" transform="translate(-34.21 120.19) rotate(-59.44)"></circle>\n    <circle class="cls-3" cx="120.3" cy="124.23" r="1.64" transform="translate(-55.18 140.66) rotate(-59.44)"></circle>\n    <circle class="cls-3" cx="126.8" cy="128.07" r="1.64" transform="translate(-55.28 148.15) rotate(-59.44)"></circle>\n    <circle class="cls-3" cx="125.47" cy="122.9" r="1.64" transform="translate(-51.48 144.46) rotate(-59.44)"></circle>\n    <circle class="cls-3" cx="121.63" cy="129.41" r="1.64" transform="translate(-58.98 144.35) rotate(-59.44)"></circle>\n    <line class="cls-6" x1="95.46" y1="32.59" x2="101.97" y2="36.43"></line>\n    <line class="cls-6" x1="100.64" y1="31.26" x2="96.8" y2="37.77"></line>\n    <line class="cls-6" x1="104.19" y1="66.46" x2="110.69" y2="70.3"></line>\n    <line class="cls-6" x1="109.36" y1="65.13" x2="105.52" y2="71.63"></line>\n    <line class="cls-6" x1="112.86" y1="100.41" x2="119.37" y2="104.25"></line>\n    <line class="cls-6" x1="118.04" y1="99.07" x2="114.19" y2="105.58"></line>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="skeleton">\n  <svg class="dress--skeleton" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 172.5 86.5">\n   <path class="cls-1" d="M172.5,46.51a46.64,46.64,0,0,0,-46.5,-46.51h-79.5a46.64,46.64,0,0,0,-46.5,46.51v40h172.5z"></path>\n   <polygon class="cls-2" points="13.5 7.8 72.04 39 89.19 0 27.16 0 13.5 7.8"></polygon>\n   <polygon class="cls-2" points="159 7.8 100.46 39 83.31 0 145.34 0 159 7.8"></polygon>\n   <circle class="cls-3" cx="27.81" cy="7.53" r="2.05"></circle>\n   <circle class="cls-3" cx="37.31" cy="6.35" r="2.05"></circle>\n   <circle class="cls-3" cx="40.79" cy="13.8" r="2.05"></circle>\n   <circle class="cls-3" cx="52.57" cy="8.35" r="2.05"></circle>\n   <circle class="cls-3" cx="69.46" cy="9.33" r="2.05"></circle>\n   <circle class="cls-3" cx="109.21" cy="27.3" r="2.05"></circle>\n   <circle class="cls-3" cx="101.21" cy="13" r="2.05"></circle>\n   <circle class="cls-3" cx="86.21" cy="10.55" r="7.13" transform="translate(17.79 64.05) rotate(-45)"></circle>\n   <circle class="cls-1" cx="84.11" cy="8.44" r="1.24" transform="translate(18.66 61.95) rotate(-45)"></circle>\n   <circle class="cls-1" cx="88.16" cy="12.49" r="1.24" transform="translate(16.99 66) rotate(-45)"></circle>\n   <circle class="cls-1" cx="88.16" cy="8.44" r="1.24" transform="translate(19.85 64.81) rotate(-45)"></circle>\n   <circle class="cls-1" cx="84.11" cy="12.49" r="1.24" transform="translate(15.8 63.13) rotate(-45)"></circle>\n   <circle class="cls-3" cx="86.21" cy="37.05" r="7.13" transform="translate(-0.95 71.81) rotate(-45)"></circle>\n   <circle class="cls-3" cx="86.21" cy="63.55" r="7.13" transform="translate(-19.69 79.58) rotate(-45)"></circle>\n   <circle class="cls-3" cx="108.96" cy="6.25" r="2.05"></circle>\n   <circle class="cls-3" cx="119.21" cy="10.25" r="2.05"></circle>\n   <circle class="cls-3" cx="132.46" cy="5.25" r="2.05"></circle>\n   <circle class="cls-3" cx="143.66" cy="9" r="2.05"></circle>\n   <circle class="cls-3" cx="121.71" cy="22.5" r="2.05"></circle>\n   <circle class="cls-3" cx="57.46" cy="18.17" r="2.05"></circle>\n   <circle class="cls-3" cx="66.3" cy="27.83" r="2.05"></circle>\n   <circle class="cls-1" cx="84.11" cy="34.95" r="1.24" transform="translate(-0.08 69.71) rotate(-45)"></circle>\n   <circle class="cls-1" cx="88.16" cy="39" r="1.24" transform="translate(-1.75 73.76) rotate(-45)"></circle>\n   <circle class="cls-1" cx="88.16" cy="34.95" r="1.24" transform="translate(1.11 72.57) rotate(-45)"></circle>\n   <circle class="cls-1" cx="84.11" cy="39" r="1.24" transform="translate(-2.94 70.89) rotate(-45)"></circle>\n   <circle class="cls-1" cx="84.17" cy="61.39" r="1.24" transform="translate(-18.76 77.49) rotate(-45)"></circle>\n   <circle class="cls-1" cx="88.22" cy="65.44" r="1.24" transform="translate(-20.43 81.54) rotate(-45)"></circle>\n   <circle class="cls-1" cx="88.22" cy="61.39" r="1.24" transform="translate(-17.57 80.36) rotate(-45)"></circle>\n   <circle class="cls-1" cx="84.17" cy="65.44" r="1.24" transform="translate(-21.62 78.68) rotate(-45)"></circle>\n   <line class="cls-4" x1="84.11" y1="8.44" x2="88.16" y2="12.49"></line>\n   <line class="cls-4" x1="88.16" y1="8.44" x2="84.11" y2="12.49"></line>\n   <line class="cls-4" x1="84.11" y1="34.94" x2="88.16" y2="38.99"></line>\n   <line class="cls-4" x1="88.16" y1="34.94" x2="84.11" y2="38.99"></line>\n   <line class="cls-4" x1="84.06" y1="61.5" x2="88.11" y2="65.55"></line>\n   <line class="cls-4" x1="88.11" y1="61.5" x2="84.06" y2="65.55"></line>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="ghost">\n  <svg class="dress--ghost" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 254.63 127.69">\n    <path class="cls-3" d="M267.83,92.44a68.84,68.84,0,0,0,-68.64,-68.64h-117.35a68.84,68.84,0,0,0,-68.64,68.64v59h254.63z" transform="translate(-13.2 -23.79)"></path>\n    <polygon class="cls-4" points="19.93 11.51 106.34 57.57 131.65 0 40.09 0 19.93 11.51"></polygon>\n    <polygon class="cls-4" points="234.7 11.51 148.29 57.57 122.98 0 214.54 0 234.7 11.51"></polygon>\n    <circle class="cls-5" cx="41.06" cy="11.11" r="3.03"></circle>\n    <circle class="cls-5" cx="55.08" cy="9.37" r="3.03"></circle>\n    <circle class="cls-5" cx="60.21" cy="20.37" r="3.03"></circle>\n    <circle class="cls-5" cx="77.61" cy="12.32" r="3.03"></circle>\n    <circle class="cls-5" cx="102.54" cy="13.78" r="3.03"></circle>\n    <circle class="cls-5" cx="161.21" cy="40.3" r="3.03"></circle>\n    <circle class="cls-5" cx="149.41" cy="19.19" r="3.03"></circle>\n    <circle class="cls-5" cx="140.46" cy="39.36" r="10.53" transform="translate(0.11 87.06) rotate(-45)"></circle>\n    <circle class="cls-3" cx="137.36" cy="36.26" r="1.83" transform="translate(1.39 83.95) rotate(-45)"></circle>\n    <circle class="cls-3" cx="143.33" cy="42.23" r="1.83" transform="translate(-1.08 89.93) rotate(-45)"></circle>\n    <circle class="cls-3" cx="143.33" cy="36.26" r="1.83" transform="translate(3.14 88.18) rotate(-45)"></circle>\n    <circle class="cls-3" cx="137.36" cy="42.23" r="1.83" transform="translate(-2.83 85.7) rotate(-45)"></circle>\n    <circle class="cls-5" cx="140.46" cy="78.48" r="10.53" transform="translate(-27.56 98.52) rotate(-45)"></circle>\n    <circle class="cls-5" cx="140.46" cy="117.6" r="10.53" transform="translate(-55.22 109.98) rotate(-45)"></circle>\n    <circle class="cls-5" cx="160.85" cy="9.23" r="3.03"></circle>\n    <circle class="cls-5" cx="175.98" cy="15.13" r="3.03"></circle>\n    <circle class="cls-5" cx="195.53" cy="7.75" r="3.03"></circle>\n    <circle class="cls-5" cx="212.07" cy="13.29" r="3.03"></circle>\n    <circle class="cls-5" cx="179.67" cy="33.21" r="3.03"></circle>\n    <circle class="cls-5" cx="84.82" cy="26.82" r="3.03"></circle>\n    <circle class="cls-5" cx="97.86" cy="41.09" r="3.03"></circle>\n    <circle class="cls-3" cx="137.35" cy="75.38" r="1.83" transform="translate(-26.27 95.41) rotate(-45)"></circle>\n    <circle class="cls-3" cx="143.33" cy="81.35" r="1.83" transform="translate(-28.75 101.39) rotate(-45)"></circle>\n    <circle class="cls-3" cx="143.33" cy="75.38" r="1.83" transform="translate(-24.52 99.64) rotate(-45)"></circle>\n    <circle class="cls-3" cx="137.35" cy="81.35" r="1.83" transform="translate(-30.5 97.16) rotate(-45)"></circle>\n    <circle class="cls-3" cx="137.44" cy="114.41" r="1.83" transform="translate(-53.84 106.9) rotate(-45)"></circle>\n    <circle class="cls-3" cx="143.42" cy="120.39" r="1.83" transform="translate(-56.32 112.88) rotate(-45)"></circle>\n    <circle class="cls-3" cx="143.42" cy="114.41" r="1.83" transform="translate(-52.09 111.13) rotate(-45)"></circle>\n    <circle class="cls-3" cx="137.44" cy="120.39" r="1.83" transform="translate(-58.07 108.66) rotate(-45)"></circle>\n    <line class="cls-6" x1="124.15" y1="12.46" x2="130.13" y2="18.44"></line>\n    <line class="cls-6" x1="130.13" y1="12.46" x2="124.15" y2="18.44"></line>\n    <line class="cls-6" x1="124.16" y1="51.58" x2="130.13" y2="57.56"></line>\n    <line class="cls-6" x1="130.13" y1="51.58" x2="124.16" y2="57.56"></line>\n    <line class="cls-6" x1="124.08" y1="90.78" x2="130.06" y2="96.75"></line>\n    <line class="cls-6" x1="130.06" y1="90.78" x2="124.08" y2="96.75"></line>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="wolf">\n  <svg class="dress--wolf" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 218.5 274">\n    <path class="cls-1" d="M217.27,58.48A58.64,58.64,0,0,0,158.79,0h-100A58.64,58.64,0,0,0,.35,58.48Q.18,165,0,271.5L218.5,274Z"/>\n    <polygon class="cls-2" points="17.33 9.81 90.94 49.04 112.5 0 34.5 0 17.33 9.81"/>\n    <polygon class="cls-2" points="200.29 9.81 126.68 49.04 105.12 0 183.11 0 200.29 9.81"/>\n    <circle class="cls-3" cx="35.33" cy="9.47" r="2.58"/>\n    <circle class="cls-3" cx="47.27" cy="7.99" r="2.58"/>\n    <circle class="cls-3" cx="51.65" cy="17.36" r="2.58"/>\n    <circle class="cls-3" cx="66.46" cy="10.5" r="2.58"/>\n    <circle class="cls-3" cx="87.7" cy="11.74" r="2.58"/>\n    <circle class="cls-3" cx="137.69" cy="34.33" r="2.58"/>\n    <circle class="cls-3" cx="127.63" cy="16.35" r="2.58"/>\n    <circle class="cls-3" cx="108.76" cy="13.27" r="8.97" transform="translate(22.48 80.79) rotate(-45)"/>\n    <circle class="cls-1" cx="106.11" cy="10.62" r="1.56" transform="translate(23.57 78.14) rotate(-45)"/>\n    <circle class="cls-1" cx="111.21" cy="15.71" r="1.56" transform="translate(21.46 83.24) rotate(-45)"/>\n    <circle class="cls-1" cx="111.21" cy="10.62" r="1.56" transform="translate(25.06 81.74) rotate(-45)"/>\n    <circle class="cls-1" cx="106.11" cy="15.71" r="1.56" transform="translate(19.97 79.64) rotate(-45)"/>\n    <circle class="cls-3" cx="108.76" cy="46.59" r="8.97" transform="translate(-1.09 90.55) rotate(-45)"/>\n    <circle class="cls-3" cx="108.76" cy="79.92" r="8.97" transform="translate(-24.65 100.31) rotate(-45)"/>\n    <circle class="cls-3" cx="137.37" cy="7.86" r="2.58"/>\n    <circle class="cls-3" cx="150.26" cy="12.89" r="2.58"/>\n    <circle class="cls-3" cx="166.92" cy="6.6" r="2.58"/>\n    <circle class="cls-3" cx="181.01" cy="11.32" r="2.58"/>\n    <circle class="cls-3" cx="153.4" cy="28.29" r="2.58"/>\n    <circle class="cls-3" cx="72.61" cy="22.84" r="2.58"/>\n    <circle class="cls-3" cx="83.72" cy="35" r="2.58"/>\n    <circle class="cls-1" cx="106.11" cy="43.95" r="1.56" transform="translate(0.01 87.9) rotate(-45)"/>\n    <circle class="cls-1" cx="111.2" cy="49.04" r="1.56" transform="translate(-2.1 93) rotate(-45)"/>\n    <circle class="cls-1" cx="111.2" cy="43.95" r="1.56" transform="translate(1.5 91.5) rotate(-45)"/>\n    <circle class="cls-1" cx="106.11" cy="49.04" r="1.56" transform="translate(-3.59 89.4) rotate(-45)"/>\n    <circle class="cls-1" cx="106.19" cy="77.19" r="1.56" transform="translate(-23.48 97.7) rotate(-45)"/>\n    <circle class="cls-1" cx="111.28" cy="82.29" r="1.56" transform="translate(-25.59 102.79) rotate(-45)"/>\n    <circle class="cls-1" cx="111.28" cy="77.19" r="1.56" transform="translate(-21.99 101.3) rotate(-45)"/>\n    <circle class="cls-1" cx="106.19" cy="82.29" r="1.56" transform="translate(-27.08 99.19) rotate(-45)"/>\n    <line class="cls-4" x1="106.11" y1="10.62" x2="111.21" y2="15.71"/>\n    <line class="cls-4" x1="111.21" y1="10.62" x2="106.11" y2="15.71"/>\n    <line class="cls-4" x1="106.12" y1="43.94" x2="111.21" y2="49.03"/>\n    <line class="cls-4" x1="111.21" y1="43.94" x2="106.12" y2="49.03"/>\n    <line class="cls-4" x1="106.05" y1="77.33" x2="111.14" y2="82.42"/>\n    <line class="cls-4" x1="111.14" y1="77.33" x2="106.05" y2="82.42"/>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="yaga">\n  <svg class="dress--yaga" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.71 232.13">\n    <path class="cls-1" d="M0,232.13v-176.74a54.08,54.08,0,0,1,53.92,-53.92h34.79v230.08z"></path>\n    <circle class="cls-2" cx="77.43" cy="55.01" r="3.92" transform="translate(-16.11 71.47) rotate(-45.37)"></circle>\n    <circle class="cls-1" cx="76.26" cy="53.86" r="0.68" transform="translate(-15.64 70.3) rotate(-45.37)"></circle>\n    <circle class="cls-1" cx="78.5" cy="56.07" r="0.68" transform="translate(-16.55 72.55) rotate(-45.37)"></circle>\n    <circle class="cls-1" cx="78.49" cy="53.84" r="0.68" transform="translate(-14.97 71.88) rotate(-45.37)"></circle>\n    <circle class="cls-1" cx="76.28" cy="56.08" r="0.68" transform="translate(-17.22 70.97) rotate(-45.37)"></circle>\n    <line class="cls-3" x1="76.26" y1="53.86" x2="78.5" y2="56.07"></line>\n    <line class="cls-3" x1="78.49" y1="53.84" x2="76.28" y2="56.08"></line>\n    <circle class="cls-2" cx="77.52" cy="69.58" r="3.92" transform="translate(-26.45 75.87) rotate(-45.37)"></circle>\n    <circle class="cls-1" cx="76.36" cy="68.43" r="0.68" transform="translate(-25.98 74.7) rotate(-45.37)"></circle>\n    <circle class="cls-1" cx="78.6" cy="70.64" r="0.68" transform="translate(-26.89 76.96) rotate(-45.37)"></circle>\n    <circle class="cls-1" cx="78.58" cy="68.41" r="0.68" transform="translate(-25.31 76.28) rotate(-45.37)"></circle>\n    <circle class="cls-1" cx="76.37" cy="70.65" r="0.68" transform="translate(-27.56 75.38) rotate(-45.37)"></circle>\n    <line class="cls-3" x1="76.36" y1="68.43" x2="78.6" y2="70.64"></line>\n    <line class="cls-3" x1="78.58" y1="68.41" x2="76.37" y2="70.65"></line>\n    <circle class="cls-2" cx="77.62" cy="84.14" r="3.92" transform="translate(-36.79 80.28) rotate(-45.37)"></circle>\n    <circle class="cls-1" cx="76.48" cy="82.96" r="0.68" transform="translate(-36.29 79.12) rotate(-45.37)"></circle>\n    <circle class="cls-1" cx="78.72" cy="85.17" r="0.68" transform="translate(-37.2 81.37) rotate(-45.37)"></circle>\n    <circle class="cls-1" cx="78.71" cy="82.95" r="0.68" transform="translate(-35.62 80.7) rotate(-45.37)"></circle>\n    <circle class="cls-1" cx="76.5" cy="85.19" r="0.68" transform="translate(-37.87 79.79) rotate(-45.37)"></circle>\n    <line class="cls-3" x1="76.42" y1="83.02" x2="78.66" y2="85.23"></line>\n    <line class="cls-3" x1="78.65" y1="83.01" x2="76.44" y2="85.25"></line>\n    <polygon class="cls-4" points="22.11 7.34 40.1 46.09 69.32 28.83 49.61 0 22.11 7.34"></polygon>\n    <circle class="cls-2" cx="43.91" cy="7.91" r="1.63" transform="translate(11.86 38.95) rotate(-54.29)"></circle>\n    <circle class="cls-2" cx="29.16" cy="10.16" r="1.63" transform="translate(3.89 27.91) rotate(-54.29)"></circle>\n    <circle class="cls-2" cx="35.86" cy="21.09" r="1.63" transform="translate(-2.19 37.9) rotate(-54.29)"></circle>\n    <circle class="cls-2" cx="47.11" cy="16.84" r="1.63" transform="translate(5.94 45.27) rotate(-54.29)"></circle>\n    <circle class="cls-2" cx="52.23" cy="25.7" r="1.63" transform="translate(0.87 53.11) rotate(-54.29)"></circle>\n    <circle class="cls-2" cx="43.16" cy="25.66" r="1.63" transform="translate(-2.87 45.73) rotate(-54.29)"></circle>\n    <circle class="cls-2" cx="41.58" cy="36.2" r="1.63" transform="translate(-12.08 48.83) rotate(-54.29)"></circle>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="doctor">\n  <svg class="dress--doctor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 93.76 116.13">\n    <path class="cls-1" d="M93.13,33.41a25.18,25.18,0,0,0,-25.13,-25.11h-42.89a25.18,25.18,0,0,0,-25.11,25.11l1.09,82.72h92.67z"></path>\n    <polygon class="cls-2" points="7.29 12.51 38.89 29.36 48.15 8.3 22.96 0 7.29 12.51"></polygon>\n    <polygon class="cls-2" points="85.84 12.51 54.24 29.36 44.98 8.3 70.86 0.69 85.84 12.51"></polygon>\n    <circle class="cls-3" cx="15.02" cy="12.37" r="1.11"></circle>\n    <circle class="cls-3" cx="20.76" cy="6.9" r="1.11"></circle>\n    <circle class="cls-3" cx="22.02" cy="15.75" r="1.11"></circle>\n    <circle class="cls-3" cx="24.26" cy="11.8" r="1.11"></circle>\n    <circle class="cls-3" cx="37.5" cy="13.34" r="1.11"></circle>\n    <circle class="cls-3" cx="55.51" cy="22.8" r="1.11"></circle>\n    <circle class="cls-3" cx="54.65" cy="15.32" r="1.11"></circle>\n    <circle class="cls-3" cx="46.55" cy="14" r="3.85" transform="translate(3.74 37.01) rotate(-45)"></circle>\n    <circle class="cls-1" cx="45.41" cy="12.86" r="0.67" transform="translate(4.21 35.88) rotate(-45)"></circle>\n    <circle class="cls-1" cx="47.6" cy="15.05" r="0.67" transform="translate(3.3 38.06) rotate(-45)"></circle>\n    <circle class="cls-1" cx="47.6" cy="12.86" r="0.67" transform="translate(4.85 37.42) rotate(-45)"></circle>\n    <circle class="cls-1" cx="45.41" cy="15.05" r="0.67" transform="translate(2.66 36.52) rotate(-45)"></circle>\n    <circle class="cls-3" cx="46.55" cy="28.31" r="3.85" transform="translate(-6.38 41.2) rotate(-45)"></circle>\n    <circle class="cls-3" cx="46.55" cy="38.61" r="3.85" transform="translate(-13.67 44.22) rotate(-45)"></circle>\n    <circle class="cls-3" cx="58.83" cy="11.68" r="1.11"></circle>\n    <circle class="cls-3" cx="66.4" cy="14.3" r="1.11"></circle>\n    <circle class="cls-3" cx="71.65" cy="7.8" r="1.11"></circle>\n    <circle class="cls-3" cx="77.56" cy="13.16" r="1.11"></circle>\n    <circle class="cls-3" cx="62.01" cy="19.94" r="1.11"></circle>\n    <circle class="cls-3" cx="31.02" cy="18.11" r="1.11"></circle>\n    <circle class="cls-3" cx="35.79" cy="23.33" r="1.11"></circle>\n    <circle class="cls-1" cx="45.41" cy="27.17" r="0.67" transform="translate(-5.91 40.07) rotate(-45)"></circle>\n    <circle class="cls-1" cx="47.59" cy="29.36" r="0.67" transform="translate(-6.82 42.25) rotate(-45)"></circle>\n    <circle class="cls-1" cx="47.59" cy="27.17" r="0.67" transform="translate(-5.27 41.61) rotate(-45)"></circle>\n    <circle class="cls-1" cx="45.41" cy="29.36" r="0.67" transform="translate(-7.46 40.71) rotate(-45)"></circle>\n    <circle class="cls-1" cx="45.44" cy="37.44" r="0.67" transform="translate(-13.17 43.1) rotate(-45)"></circle>\n    <circle class="cls-1" cx="47.63" cy="39.63" r="0.67" transform="translate(-14.07 45.28) rotate(-45)"></circle>\n    <circle class="cls-1" cx="47.63" cy="37.44" r="0.67" transform="translate(-12.53 44.64) rotate(-45)"></circle>\n    <circle class="cls-1" cx="45.44" cy="39.63" r="0.67" transform="translate(-14.71 43.74) rotate(-45)"></circle>\n    <line class="cls-4" x1="45.41" y1="12.86" x2="47.6" y2="15.05"></line>\n    <line class="cls-4" x1="47.6" y1="12.86" x2="45.41" y2="15.05"></line>\n    <line class="cls-4" x1="45.41" y1="27.17" x2="47.6" y2="29.35"></line>\n    <line class="cls-4" x1="47.6" y1="27.17" x2="45.41" y2="29.35"></line>\n    <line class="cls-4" x1="45.38" y1="37.5" x2="47.57" y2="39.69"></line>\n    <line class="cls-4" x1="47.57" y1="37.5" x2="45.38" y2="39.69"></line>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="spider">\n  <svg class="dress--spider" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 178.33 243.73">\n    <path class="cls-1" d="M178.16,151.9a48,48,0,0,0,-47.86,-47.9h-81.83a48,48,0,0,0,-47.86,47.9l-0.61,91.83l178.33,-0.33q-0.08,-45.75,-0.17,-91.5z"></path>\n    <polygon class="cls-2" points="14.51 112.06 74.76 144.18 90.67 102.07 33.67 79.73 14.51 112.06"></polygon>\n    <polygon class="cls-2" points="164.27 112.06 104.01 144.18 86.67 101.73 145.33 79.07 164.27 112.06"></polygon>\n    <circle class="cls-3" cx="29.24" cy="111.78" r="2.11"></circle>\n    <circle class="cls-3" cx="38.67" cy="90.4" r="2.11"></circle>\n    <circle class="cls-3" cx="38.33" cy="102.07" r="2.11"></circle>\n    <circle class="cls-3" cx="55.67" cy="99.07" r="2.11"></circle>\n    <circle class="cls-3" cx="139.33" cy="90.07" r="2.11"></circle>\n    <circle class="cls-3" cx="129.33" cy="100.73" r="2.11"></circle>\n    <circle class="cls-3" cx="103.67" cy="102.4" r="2.11"></circle>\n    <circle class="cls-3" cx="42.6" cy="118.24" r="2.11"></circle>\n    <circle class="cls-3" cx="54.72" cy="112.62" r="2.11"></circle>\n    <circle class="cls-3" cx="72.11" cy="113.64" r="2.11"></circle>\n    <circle class="cls-3" cx="113.02" cy="132.13" r="2.11"></circle>\n    <circle class="cls-3" cx="104.79" cy="117.41" r="2.11"></circle>\n    <circle class="cls-3" cx="89.35" cy="114.89" r="7.34" transform="translate(-55.07 96.83) rotate(-45)"></circle>\n    <circle class="cls-1" cx="87.18" cy="112.72" r="1.28" transform="translate(-54.17 94.66) rotate(-45)"></circle>\n    <circle class="cls-1" cx="91.35" cy="116.89" r="1.28" transform="translate(-55.9 98.83) rotate(-45)"></circle>\n    <circle class="cls-1" cx="91.35" cy="112.72" r="1.28" transform="translate(-52.95 97.61) rotate(-45)"></circle>\n    <circle class="cls-1" cx="87.18" cy="116.89" r="1.28" transform="translate(-57.12 95.88) rotate(-45)"></circle>\n    <circle class="cls-3" cx="89.35" cy="142.17" r="7.34" transform="translate(-74.36 104.82) rotate(-45)"></circle>\n    <circle class="cls-3" cx="112.77" cy="110.47" r="2.11"></circle>\n    <circle class="cls-3" cx="123.32" cy="114.58" r="2.11"></circle>\n    <circle class="cls-3" cx="136.96" cy="109.44" r="2.11"></circle>\n    <circle class="cls-3" cx="148.48" cy="113.3" r="2.11"></circle>\n    <circle class="cls-3" cx="125.89" cy="127.19" r="2.11"></circle>\n    <circle class="cls-3" cx="59.76" cy="122.73" r="2.11"></circle>\n    <circle class="cls-3" cx="68.85" cy="132.68" r="2.11"></circle>\n    <circle class="cls-1" cx="87.18" cy="140" r="1.28" transform="translate(-73.46 102.65) rotate(-45)"></circle>\n    <circle class="cls-1" cx="91.35" cy="144.17" r="1.28" transform="translate(-75.19 106.82) rotate(-45)"></circle>\n    <circle class="cls-1" cx="91.35" cy="140" r="1.28" transform="translate(-72.24 105.6) rotate(-45)"></circle>\n    <circle class="cls-1" cx="87.18" cy="144.17" r="1.28" transform="translate(-76.41 103.87) rotate(-45)"></circle>\n    <line class="cls-4" x1="87.18" y1="112.72" x2="91.35" y2="116.89"></line>\n    <line class="cls-4" x1="91.35" y1="112.72" x2="87.18" y2="116.89"></line>\n    <line class="cls-4" x1="87.18" y1="140" x2="91.35" y2="144.17"></line>\n    <line class="cls-4" x1="91.35" y1="140" x2="87.18" y2="144.17"></line>\n    <polygon class="cls-2" points="14.88 32.99 75.13 65.11 91.03 23 34.03 0.67 14.88 32.99"></polygon>\n    <polygon class="cls-2" points="164.63 32.99 104.38 65.11 87.03 22.67 145.7 0 164.63 32.99"></polygon>\n    <circle class="cls-3" cx="29.6" cy="32.72" r="2.11"></circle>\n    <circle class="cls-3" cx="39.03" cy="11.33" r="2.11"></circle>\n    <circle class="cls-3" cx="38.7" cy="23" r="2.11"></circle>\n    <circle class="cls-3" cx="56.03" cy="20" r="2.11"></circle>\n    <circle class="cls-3" cx="139.7" cy="11" r="2.11"></circle>\n    <circle class="cls-3" cx="129.7" cy="21.67" r="2.11"></circle>\n    <circle class="cls-3" cx="104.03" cy="23.33" r="2.11"></circle>\n    <circle class="cls-3" cx="42.96" cy="39.17" r="2.11"></circle>\n    <circle class="cls-3" cx="55.09" cy="33.56" r="2.11"></circle>\n    <circle class="cls-3" cx="72.48" cy="34.57" r="2.11"></circle>\n    <circle class="cls-3" cx="113.39" cy="53.07" r="2.11"></circle>\n    <circle class="cls-3" cx="105.16" cy="38.35" r="2.11"></circle>\n    <circle class="cls-3" cx="89.72" cy="35.82" r="7.34" transform="translate(0.95 73.93) rotate(-45)"></circle>\n    <circle class="cls-1" cx="87.55" cy="33.66" r="1.28" transform="translate(1.84 71.76) rotate(-45)"></circle>\n    <circle class="cls-1" cx="91.72" cy="37.83" r="1.28" transform="translate(0.12 75.93) rotate(-45)"></circle>\n    <circle class="cls-1" cx="91.72" cy="33.66" r="1.28" transform="translate(3.06 74.71) rotate(-45)"></circle>\n    <circle class="cls-1" cx="87.55" cy="37.83" r="1.28" transform="translate(-1.1 72.98) rotate(-45)"></circle>\n    <circle class="cls-3" cx="89.72" cy="63.1" r="7.34" transform="translate(-18.34 81.92) rotate(-45)"></circle>\n    <circle class="cls-3" cx="113.13" cy="31.4" r="2.11"></circle>\n    <circle class="cls-3" cx="123.68" cy="35.52" r="2.11"></circle>\n    <circle class="cls-3" cx="137.32" cy="30.37" r="2.11"></circle>\n    <circle class="cls-3" cx="148.85" cy="34.23" r="2.11"></circle>\n    <circle class="cls-3" cx="126.26" cy="48.13" r="2.11"></circle>\n    <circle class="cls-3" cx="60.12" cy="43.67" r="2.11"></circle>\n    <circle class="cls-3" cx="69.22" cy="53.62" r="2.11"></circle>\n    <circle class="cls-1" cx="87.55" cy="60.94" r="1.28" transform="translate(-17.45 79.75) rotate(-45)"></circle>\n    <circle class="cls-1" cx="91.71" cy="65.11" r="1.28" transform="translate(-19.17 83.92) rotate(-45)"></circle>\n    <circle class="cls-1" cx="91.71" cy="60.94" r="1.28" transform="translate(-16.23 82.7) rotate(-45)"></circle>\n    <circle class="cls-1" cx="87.55" cy="65.11" r="1.28" transform="translate(-20.39 80.97) rotate(-45)"></circle>\n    <line class="cls-4" x1="87.55" y1="33.66" x2="91.72" y2="37.83"></line>\n    <line class="cls-4" x1="91.72" y1="33.66" x2="87.55" y2="37.83"></line>\n    <line class="cls-4" x1="87.55" y1="60.93" x2="91.72" y2="65.1"></line>\n    <line class="cls-4" x1="91.72" y1="60.93" x2="87.55" y2="65.1"></line>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="alien">\n  <svg class="dress--alien" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.91 156.21">\n    <path class="cls-1" d="M129.91,35a35.12,35.12,0,0,0,-35,-35h-59.91a35.12,35.12,0,0,0,-35,35l0.57,120.88l130.33,0.33z"></path>\n    <polygon class="cls-2" points="10.17 5.87 54.25 29.37 67.16 0 20.45 0 10.17 5.87"></polygon>\n    <polygon class="cls-2" points="119.74 5.87 75.65 29.37 62.74 0 109.45 0 119.74 5.87"></polygon>\n    <circle class="cls-3" cx="20.95" cy="5.67" r="1.54"></circle>\n    <circle class="cls-3" cx="28.1" cy="4.78" r="1.54"></circle>\n    <circle class="cls-3" cx="30.72" cy="10.39" r="1.54"></circle>\n    <circle class="cls-3" cx="39.59" cy="6.29" r="1.54"></circle>\n    <circle class="cls-3" cx="52.31" cy="7.03" r="1.54"></circle>\n    <circle class="cls-3" cx="82.25" cy="20.56" r="1.54"></circle>\n    <circle class="cls-3" cx="76.22" cy="9.79" r="1.54"></circle>\n    <circle class="cls-3" cx="64.93" cy="7.94" r="5.37" transform="translate(13.4 48.24) rotate(-45)"></circle>\n    <circle class="cls-1" cx="63.34" cy="6.36" r="0.93" transform="translate(14.06 46.65) rotate(-45)"></circle>\n    <circle class="cls-1" cx="66.39" cy="9.41" r="0.93" transform="translate(12.79 49.7) rotate(-45)"></circle>\n    <circle class="cls-1" cx="66.39" cy="6.36" r="0.93" transform="translate(14.95 48.81) rotate(-45)"></circle>\n    <circle class="cls-1" cx="63.34" cy="9.41" r="0.93" transform="translate(11.9 47.54) rotate(-45)"></circle>\n    <circle class="cls-3" cx="64.93" cy="27.9" r="5.37" transform="translate(-0.71 54.08) rotate(-45)"></circle>\n    <circle class="cls-3" cx="64.93" cy="47.86" r="5.37" transform="translate(-14.83 59.93) rotate(-45)"></circle>\n    <circle class="cls-3" cx="82.06" cy="4.71" r="1.54"></circle>\n    <circle class="cls-3" cx="89.78" cy="7.72" r="1.54"></circle>\n    <circle class="cls-3" cx="99.76" cy="3.95" r="1.54"></circle>\n    <circle class="cls-3" cx="108.19" cy="6.78" r="1.54"></circle>\n    <circle class="cls-3" cx="91.66" cy="16.94" r="1.54"></circle>\n    <circle class="cls-3" cx="43.27" cy="13.68" r="1.54"></circle>\n    <circle class="cls-3" cx="49.93" cy="20.96" r="1.54"></circle>\n    <circle class="cls-1" cx="63.34" cy="26.32" r="0.93" transform="translate(-0.06 52.5) rotate(-45)"></circle>\n    <circle class="cls-1" cx="66.39" cy="29.37" r="0.93" transform="translate(-1.32 55.54) rotate(-45)"></circle>\n    <circle class="cls-1" cx="66.39" cy="26.32" r="0.93" transform="translate(0.83 54.65) rotate(-45)"></circle>\n    <circle class="cls-1" cx="63.34" cy="29.37" r="0.93" transform="translate(-2.21 53.39) rotate(-45)"></circle>\n    <circle class="cls-1" cx="63.38" cy="46.23" r="0.93" transform="translate(-14.13 58.36) rotate(-45)"></circle>\n    <circle class="cls-1" cx="66.43" cy="49.28" r="0.93" transform="translate(-15.39 61.41) rotate(-45)"></circle>\n    <circle class="cls-1" cx="66.43" cy="46.23" r="0.93" transform="translate(-13.23 60.52) rotate(-45)"></circle>\n    <circle class="cls-1" cx="63.38" cy="49.28" r="0.93" transform="translate(-16.28 59.25) rotate(-45)"></circle>\n    <line class="cls-4" x1="63.34" y1="6.36" x2="66.39" y2="9.41"></line>\n    <line class="cls-4" x1="66.39" y1="6.36" x2="63.34" y2="9.41"></line>\n    <line class="cls-4" x1="63.34" y1="26.32" x2="66.39" y2="29.37"></line>\n    <line class="cls-4" x1="66.39" y1="26.32" x2="63.34" y2="29.37"></line>\n    <line class="cls-4" x1="63.3" y1="46.31" x2="66.35" y2="49.36"></line>\n    <line class="cls-4" x1="66.35" y1="46.31" x2="63.3" y2="49.36"></line>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="vampire">\n  <svg class="dress--vampire" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 137.5 139.59">\n    <path class="cls-3" d="M137.5,37.22a37.07,37.07,0,0,0-37-37H37.35a37.07,37.07,0,0,0-37,37Q.2,88.54,0,139.85H137.25Q137.38,88.53,137.5,37.22Z" transform="translate(0 -0.26)"/>\n    <polygon class="cls-4" points="11.12 6.2 57.65 31 71.28 0 21.98 0 11.12 6.2"/>\n    <polygon class="cls-4" points="126.77 6.2 80.24 31 66.61 0 115.91 0 126.77 6.2"/>\n    <circle class="cls-5" cx="22.5" cy="5.98" r="1.63"/>\n    <circle class="cls-5" cx="30.05" cy="5.05" r="1.63"/>\n    <circle class="cls-5" cx="32.81" cy="10.97" r="1.63"/>\n    <circle class="cls-5" cx="42.18" cy="6.63" r="1.63"/>\n    <circle class="cls-5" cx="49.62" cy="8.73" r="1.63"/>\n    <circle class="cls-5" cx="87.2" cy="21.7" r="1.63"/>\n    <circle class="cls-5" cx="91.5" cy="3.86" r="1.63"/>\n    <circle class="cls-5" cx="68.92" cy="29.71" r="5.67" transform="translate(-0.82 57.18) rotate(-45)"/>\n    <circle class="cls-5" cx="68.92" cy="50.77" r="5.67" transform="translate(-15.71 63.35) rotate(-45)"/>\n    <circle class="cls-5" cx="88.13" cy="10.86" r="1.63"/>\n    <circle class="cls-5" cx="98" cy="9.23" r="1.63"/>\n    <circle class="cls-5" cx="105.68" cy="4.17" r="1.63"/>\n    <circle class="cls-5" cx="114.58" cy="7.15" r="1.63"/>\n    <circle class="cls-5" cx="97.13" cy="17.88" r="1.63"/>\n    <circle class="cls-5" cx="46.07" cy="14.44" r="1.63"/>\n    <circle class="cls-5" cx="53.09" cy="22.12" r="1.63"/>\n    <circle class="cls-3" cx="67.24" cy="28.03" r="0.99" transform="translate(-0.13 55.5) rotate(-45)"/>\n    <circle class="cls-3" cx="70.46" cy="31.25" r="0.99" transform="translate(-1.46 58.72) rotate(-45)"/>\n    <circle class="cls-3" cx="70.46" cy="28.03" r="0.99" transform="translate(0.81 57.78) rotate(-45)"/>\n    <circle class="cls-3" cx="67.24" cy="31.25" r="0.99" transform="translate(-2.4 56.44) rotate(-45)"/>\n    <circle class="cls-3" cx="67.29" cy="49.05" r="0.99" transform="translate(-14.97 61.69) rotate(-45)"/>\n    <circle class="cls-3" cx="70.51" cy="52.27" r="0.99" transform="translate(-16.31 64.91) rotate(-45)"/>\n    <circle class="cls-3" cx="70.51" cy="49.05" r="0.99" transform="translate(-14.03 63.97) rotate(-45)"/>\n    <circle class="cls-3" cx="67.29" cy="52.27" r="0.99" transform="translate(-17.25 62.63) rotate(-45)"/>\n    <line class="cls-6" x1="67.24" y1="27.77" x2="70.46" y2="30.99"/>\n    <line class="cls-6" x1="70.46" y1="27.77" x2="67.24" y2="30.99"/>\n    <line class="cls-6" x1="67.2" y1="48.88" x2="70.42" y2="52.1"/>\n    <line class="cls-6" x1="70.42" y1="48.88" x2="67.2" y2="52.1"/>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="yeti">\n  <svg class="dress--yeti" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 296.14 215.33">\n    <path class="cls-3" d="M296.14,107.39a80,80,0,0,0,-79.74,-79.74h-136.34a80,80,0,0,0,-79.74,79.74q-0.16,62.72,-0.32,125.43l295.33,2z" transform="translate(0 -19.49)"></path>\n    <polygon class="cls-4" points="20 16.67 62 132 153.26 59.48 54 0 20 16.67"></polygon>\n    <polygon class="cls-4" points="269.33 14 230 130.67 143.19 59.48 239.33 1.33 269.33 14"></polygon>\n    <circle class="cls-5" cx="47.33" cy="66.33" r="3.51"></circle>\n    <circle class="cls-5" cx="35.33" cy="37.83" r="3.51"></circle>\n    <circle class="cls-5" cx="57.33" cy="76.83" r="3.51"></circle>\n    <circle class="cls-5" cx="63.82" cy="95.83" r="3.51"></circle>\n    <circle class="cls-5" cx="65.33" cy="114.33" r="3.51"></circle>\n    <circle class="cls-5" cx="225.33" cy="114.82" r="3.51"></circle>\n    <circle class="cls-5" cx="148.17" cy="140.51" r="10.42" transform="translate(-55.96 126.43) rotate(-45)"></circle>\n    <circle class="cls-5" cx="148.17" cy="187.96" r="12.23" transform="translate(-89.51 140.33) rotate(-45)"></circle>\n    <circle class="cls-5" cx="247.32" cy="51.33" r="3.51"></circle>\n    <circle class="cls-5" cx="232.33" cy="76.32" r="3.51"></circle>\n    <circle class="cls-5" cx="228.33" cy="97.83" r="3.51"></circle>\n    <circle class="cls-5" cx="211.82" cy="98.83" r="3.51"></circle>\n    <circle class="cls-5" cx="78.33" cy="106.83" r="3.51"></circle>\n    <circle class="cls-3" cx="145.09" cy="137.43" r="1.81" transform="translate(-54.69 123.35) rotate(-45)"></circle>\n    <circle class="cls-3" cx="151" cy="143.35" r="1.81" transform="translate(-57.14 129.27) rotate(-45)"></circle>\n    <circle class="cls-3" cx="151" cy="137.43" r="1.81" transform="translate(-52.95 127.54) rotate(-45)"></circle>\n    <circle class="cls-3" cx="145.09" cy="143.35" r="1.81" transform="translate(-58.87 125.09) rotate(-45)"></circle>\n    <circle class="cls-3" cx="144.66" cy="184.25" r="2.13" transform="translate(-87.91 136.76) rotate(-45)"></circle>\n    <circle class="cls-3" cx="151.6" cy="191.19" r="2.13" transform="translate(-90.79 143.7) rotate(-45)"></circle>\n    <circle class="cls-3" cx="151.6" cy="184.25" r="2.13" transform="translate(-85.88 141.67) rotate(-45)"></circle>\n    <circle class="cls-3" cx="144.66" cy="191.19" r="2.13" transform="translate(-92.82 138.79) rotate(-45)"></circle>\n    <line class="cls-6" x1="145.09" y1="117.94" x2="151.01" y2="123.85"></line>\n    <line class="cls-6" x1="151.01" y1="117.94" x2="145.09" y2="123.85"></line>\n    <line class="cls-6" x1="144.47" y1="164.94" x2="151.41" y2="171.88"></line>\n    <line class="cls-6" x1="151.41" y1="164.94" x2="144.47" y2="171.88"></line>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="bed">\n  <svg class="dress--bed" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 159.49 27.64">\n    <path class="cls-1" d="M2.39,26.77,26.51,1.33l132.94.29,0,25.83Z"/>\n    <polygon class="cls-2" points="0 27.64 18.54 23.24 14.82 11.58 1.46 23.36 0 27.64"/>\n    <polygon class="cls-2" points="31.34 0 24.66 17.84 13.56 12.7 26.92 0.91 31.34 0"/>\n    <circle class="cls-3" cx="3.03" cy="24.86" r="0.59" transform="translate(-15.68 8.22) rotate(-41.41)"/>\n    <circle class="cls-3" cx="4.85" cy="22.8" r="0.59" transform="translate(-13.87 8.91) rotate(-41.41)"/>\n    <circle class="cls-3" cx="7.02" cy="23.75" r="0.59" transform="translate(-13.95 10.58) rotate(-41.41)"/>\n    <circle class="cls-3" cx="8.52" cy="20.33" r="0.59" transform="translate(-11.32 10.72) rotate(-41.41)"/>\n    <circle class="cls-3" cx="12.35" cy="17.34" r="0.59" transform="translate(-8.38 12.5) rotate(-41.41)"/>\n    <circle class="cls-3" cx="24.32" cy="13.66" r="0.59" transform="translate(-2.95 19.5) rotate(-41.41)"/>\n    <circle class="cls-3" cx="19.88" cy="12.1" r="0.59" transform="translate(-3.03 16.17) rotate(-41.41)"/>\n    <circle class="cls-3" cx="16.18" cy="14.42" r="2.05" transform="translate(0.78 29.67) rotate(-86.41)"/>\n    <circle class="cls-1" cx="15.33" cy="14.36" r="0.36" transform="matrix(0.06, -1, 1, 0.06, 0.03, 28.76)"/>\n    <circle class="cls-1" cx="16.97" cy="14.47" r="0.36" transform="translate(1.47 30.5) rotate(-86.41)"/>\n    <circle class="cls-1" cx="16.2" cy="13.59" r="0.36" transform="translate(1.62 28.91) rotate(-86.41)"/>\n    <circle class="cls-1" cx="16.1" cy="15.24" r="0.36" transform="translate(-0.12 30.35) rotate(-86.41)"/>\n    <circle class="cls-3" cx="20.27" cy="9.17" r="0.59" transform="translate(-1 15.7) rotate(-41.41)"/>\n    <circle class="cls-3" cx="23.24" cy="8.08" r="0.59" transform="translate(0.46 17.39) rotate(-41.41)"/>\n    <circle class="cls-3" cx="25.14" cy="4.49" r="0.59" transform="translate(3.31 17.75) rotate(-41.41)"/>\n    <circle class="cls-3" cx="28.27" cy="3.17" r="0.59" transform="translate(4.97 19.49) rotate(-41.41)"/>\n    <circle class="cls-3" cx="26.1" cy="10.25" r="0.59" transform="translate(-0.25 19.83) rotate(-41.41)"/>\n    <circle class="cls-3" cx="11.44" cy="21.52" r="0.59" transform="translate(-11.37 12.94) rotate(-41.41)"/>\n    <circle class="cls-3" cx="15.18" cy="21.92" r="0.59" transform="translate(-10.71 15.52) rotate(-41.41)"/>\n    <line class="cls-4" x1="15.33" y1="14.36" x2="16.97" y2="14.47"/>\n    <line class="cls-4" x1="16.2" y1="13.59" x2="16.1" y2="15.24"/>\n  </svg>\n</ng-template>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/trinkets/dress/dress.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]])
    ], DressComponent);
    return DressComponent;
}(__WEBPACK_IMPORTED_MODULE_1__trinket_uniq_model__["a" /* TrinketUniqModel */]));

//# sourceMappingURL=dress.js.map

/***/ }),
/* 171 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrinketUniqPartDirective; });
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

var TrinketUniqPartDirective = /** @class */ (function () {
    function TrinketUniqPartDirective(el, templateRef, viewContainerRef) {
        this.templateRef = templateRef;
        this.viewContainerRef = viewContainerRef;
        this.element = el.nativeElement;
    }
    TrinketUniqPartDirective.prototype.show = function () {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
        return this;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('part-name'),
        __metadata("design:type", String)
    ], TrinketUniqPartDirective.prototype, "name", void 0);
    TrinketUniqPartDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Directive */])({
            selector: '[trinket-uniq-part]',
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* TemplateRef */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewContainerRef */]])
    ], TrinketUniqPartDirective);
    return TrinketUniqPartDirective;
}());

//# sourceMappingURL=trinket-uniq-part.directive.js.map

/***/ }),
/* 172 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BraComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__trinket_uniq_model__ = __webpack_require__(48);
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


var BraComponent = /** @class */ (function (_super) {
    __extends(BraComponent, _super);
    function BraComponent(element) {
        return _super.call(this, 'bra', element.nativeElement) || this;
    }
    BraComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'bra',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/trinkets/bra/bra.html"*/'<ng-template trinket-uniq-part part-name="default">\n  <svg class="bra" width="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 276.76 152.07">\n      <rect class="cls-1" y="91.44" width="276.76" height="16.33"></rect>\n      <rect class="cls-1" x="60.01" width="18.78" height="100.42"></rect>\n      <rect class="cls-1" x="197.98" width="18.78" height="100.42"></rect>\n      <path class="cls-1" d="M136.34,103.68a48.39,48.39,0,0,1,-96.77,0"></path>\n      <path class="cls-1" d="M237.2,103.68a48.39,48.39,0,0,1,-96.77,0"></path>\n      <path class="cls-2" d="M57.43,118.43l-9.56,-12.31a4.95,4.95,0,1,1,8.57,-4.95l1,1.72l1,-1.72a4.95,4.95,0,1,1,8.56,4.96z"></path>\n      <path class="cls-2" d="M78.67,143.75l-9.57,-12.31a4.95,4.95,0,1,1,8.57,-4.95l1,1.72l1,-1.72a4.95,4.95,0,1,1,8.57,4.95z"></path>\n      <path class="cls-2" d="M103.57,120.07l-9.57,-12.31a4.95,4.95,0,1,1,8.57,-4.95l1,1.72l1,-1.72a4.95,4.95,0,1,1,8.57,4.95z"></path>\n      <path class="cls-2" d="M157.47,116.39l-9.56,-12.31a4.95,4.95,0,1,1,8.57,-4.95l1,1.72l1,-1.72a4.95,4.95,0,1,1,8.57,4.95z"></path>\n      <path class="cls-2" d="M173.81,142.93l-9.56,-12.31a4.95,4.95,0,1,1,8.57,-4.95l1,1.72l1,-1.72a4.95,4.95,0,1,1,8.57,4.95z"></path>\n      <path class="cls-2" d="M189.73,116l-9.56,-12.31a4.95,4.95,0,1,1,8.57,-4.95l1,1.72l1,-1.72a4.95,4.95,0,1,1,8.57,4.95z"></path>\n      <path class="cls-2" d="M210.56,135.58l-9.56,-12.3a4.95,4.95,0,1,1,8.57,-4.95l1,1.72l1,-1.72a4.95,4.95,0,1,1,8.57,4.95z"></path>\n</svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="zombie">\n  <svg class="bra" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160.64 71.08">\n      <polygon class="cls-1" points="160.64 50.37 0 50.37 4 42.74 160.64 42.74 160.64 50.37"/>\n      <rect class="cls-1" x="24.84" width="8.78" height="46.94"/>\n      <rect class="cls-1" x="89.33" width="8.78" height="46.94"/>\n      <path class="cls-1" d="M60.52,48.46a22.62,22.62,0,0,1-45.24,0"/>\n      <path class="cls-1" d="M107.66,48.46a22.62,22.62,0,0,1-45.24,0"/>\n      <path class="cls-2" d="M23.64,55.36l-4.47-5.75a2.31,2.31,0,1,1,4-2.31l.46.8.46-.8a2.31,2.31,0,1,1,4,2.31Z"/>\n      <path class="cls-2" d="M33.56,67.19l-4.47-5.75a2.31,2.31,0,1,1,4-2.31l.46.8.46-.8a2.31,2.31,0,1,1,4,2.31Z"/>\n      <path class="cls-2" d="M45.2,56.12l-4.47-5.75a2.31,2.31,0,1,1,4-2.31l.46.8.46-.8a2.31,2.31,0,1,1,4,2.31Z"/>\n      <path class="cls-2" d="M70.4,54.41l-4.47-5.75a2.31,2.31,0,1,1,4-2.31l.46.8.46-.8a2.31,2.31,0,1,1,4,2.31Z"/>\n      <path class="cls-2" d="M78,66.81l-4.47-5.75a2.31,2.31,0,1,1,4-2.31l.46.8.46-.8a2.31,2.31,0,1,1,4,2.31Z"/>\n      <path class="cls-2" d="M85.48,54.22,81,48.46a2.31,2.31,0,1,1,4-2.31l.46.8.46-.8a2.31,2.31,0,1,1,4,2.31Z"/>\n      <path class="cls-2" d="M95.21,63.38l-4.47-5.75a2.31,2.31,0,1,1,4-2.31l.46.8.46-.8a2.31,2.31,0,1,1,4,2.31Z"/>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="mummy">\n  <svg class="bra" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102.67 29.48">\n      <polygon class="cls-1" points="102.67 16.91 0 16.91 9.67 12.28 92.67 12.28 102.67 16.91"/>\n      <polygon class="cls-1" points="34.69 14.83 29.36 14.83 29.36 1 34.69 0.33 34.69 14.83"/>\n      <polygon class="cls-1" points="73.81 14.83 68.49 14.83 68.49 0 73.81 1 73.81 14.83"/>\n      <path class="cls-1" d="M51,15.75a13.72,13.72,0,1,1-27.44,0"/>\n      <path class="cls-1" d="M79.61,15.75a13.72,13.72,0,1,1-27.44,0"/>\n      <path class="cls-2" d="M28.63,19.94l-2.71-3.49A1.4,1.4,0,1,1,28.35,15l.28.49.28-.49a1.4,1.4,0,1,1,2.43,1.4Z"/>\n      <path class="cls-2" d="M34.65,27.12l-2.71-3.49a1.4,1.4,0,1,1,2.43-1.4l.28.49.28-.49a1.4,1.4,0,1,1,2.43,1.4Z"/>\n      <path class="cls-2" d="M41.72,20.4,39,16.91a1.4,1.4,0,1,1,2.43-1.4l.28.49.28-.49a1.4,1.4,0,1,1,2.43,1.4Z"/>\n      <path class="cls-2" d="M57,19.36l-2.71-3.49a1.4,1.4,0,1,1,2.43-1.4L57,15l.28-.49a1.4,1.4,0,1,1,2.43,1.4Z"/>\n      <path class="cls-2" d="M61.63,26.89,58.92,23.4A1.4,1.4,0,1,1,61.35,22l.28.49.28-.49a1.4,1.4,0,1,1,2.43,1.4Z"/>\n      <path class="cls-2" d="M66.15,19.24l-2.71-3.49a1.4,1.4,0,1,1,2.43-1.4l.28.49.28-.49a1.4,1.4,0,1,1,2.43,1.4Z"/>\n      <path class="cls-2" d="M72.06,24.8l-2.71-3.49a1.4,1.4,0,1,1,2.43-1.4l.28.49.28-.49a1.4,1.4,0,1,1,2.43,1.4Z"/>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="yaga">\n  <svg class="bra" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 109.55 79.39">\n    <rect class="cls-1" y="62.4" width="109.55" height="4.57"/>\n    <polygon class="cls-1" points="54.08 64.92 48.82 64.92 48.82 0 54.08 9.5 54.08 64.92"/>\n    <rect class="cls-1" x="87.48" y="36.78" width="5.26" height="28.13"/>\n    <path class="cls-1" d="M70.21,65.83a13.56,13.56,0,1,1-27.11,0"/>\n    <path class="cls-1" d="M98.46,65.83a13.56,13.56,0,0,1-27.11,0"/>\n    <path class="cls-2" d="M48.1,70l-2.68-3.45a1.39,1.39,0,1,1,2.4-1.39l.28.48.28-.48a1.39,1.39,0,1,1,2.4,1.39Z"/>\n    <path class="cls-2" d="M54,77.06l-2.68-3.45a1.39,1.39,0,1,1,2.4-1.39l.28.48.28-.48a1.39,1.39,0,1,1,2.4,1.39Z"/>\n    <path class="cls-2" d="M61,70.42,58.35,67a1.39,1.39,0,1,1,2.4-1.39l.28.48.28-.48A1.39,1.39,0,1,1,63.71,67Z"/>\n    <path class="cls-2" d="M76.13,69.39l-2.68-3.45a1.39,1.39,0,1,1,2.4-1.39l.28.48.28-.48a1.39,1.39,0,1,1,2.4,1.39Z"/>\n    <path class="cls-2" d="M80.7,76.83,78,73.38A1.39,1.39,0,1,1,80.43,72l.28.48L81,72a1.39,1.39,0,1,1,2.4,1.39Z"/>\n    <path class="cls-2" d="M85.17,69.28l-2.68-3.45a1.39,1.39,0,1,1,2.4-1.39l.28.48.28-.48a1.39,1.39,0,1,1,2.4,1.39Z"/>\n    <path class="cls-2" d="M91,74.77l-2.68-3.45a1.39,1.39,0,1,1,2.4-1.39l.28.48.28-.48a1.39,1.39,0,1,1,2.4,1.39Z"/>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="doctor">\n  <svg class="bra" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72.3 36.88">\n    <rect class="cls-1" y="21.04" width="72.3" height="4.27"/>\n    <polygon class="cls-1" points="20.58 23.39 15.68 23.39 15.68 0 20.58 6.33 20.58 23.39"/>\n    <polygon class="cls-1" points="56.62 23.39 51.72 23.39 51.72 6.83 56.62 0.67 56.62 23.39"/>\n    <path class="cls-1" d="M35.62,24.24a12.64,12.64,0,1,1-25.28,0"/>\n    <path class="cls-1" d="M62,24.24a12.64,12.64,0,1,1-25.28,0"/>\n    <path class="cls-2" d="M15,28.09l-2.5-3.22a1.29,1.29,0,1,1,2.24-1.29L15,24l.26-.45a1.29,1.29,0,1,1,2.24,1.29Z"/>\n    <path class="cls-2" d="M20.55,34.71l-2.5-3.22a1.29,1.29,0,1,1,2.24-1.29l.26.45.26-.45A1.29,1.29,0,1,1,23,31.49Z"/>\n    <path class="cls-2" d="M27.06,28.52l-2.5-3.22A1.29,1.29,0,1,1,26.8,24l.26.45.26-.45a1.29,1.29,0,1,1,2.24,1.29Z"/>\n    <path class="cls-2" d="M41.14,27.56l-2.5-3.22a1.29,1.29,0,1,1,2.24-1.29l.26.45.26-.45a1.29,1.29,0,1,1,2.24,1.29Z"/>\n    <path class="cls-2" d="M45.4,34.49l-2.5-3.22A1.29,1.29,0,1,1,45.14,30l.26.45.26-.45a1.29,1.29,0,1,1,2.24,1.29Z"/>\n    <path class="cls-2" d="M49.56,27.45l-2.5-3.22a1.29,1.29,0,1,1,2.24-1.29l.26.45.26-.45a1.29,1.29,0,1,1,2.24,1.29Z"/>\n    <path class="cls-2" d="M55,32.57l-2.5-3.22a1.29,1.29,0,1,1,2.24-1.29l.26.45.26-.45a1.29,1.29,0,1,1,2.24,1.29Z"/>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="spider">\n  <svg class="bra" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121.67 144.21">\n    <polygon class="cls-1" points="121.67 42.83 0 42.83 5.67 33.24 116 33.24 121.67 42.83"/>\n    <polygon class="cls-1" points="26.13 38.52 15.11 38.52 15.11 0.33 26.13 6 26.13 38.52"/>\n    <polygon class="cls-1" points="107.15 38.52 96.12 38.52 96.12 6.33 107.15 0 107.15 38.52"/>\n    <path class="cls-1" d="M59.93,40.43a28.41,28.41,0,0,1-56.82,0"/>\n    <path class="cls-1" d="M119.15,40.43a28.41,28.41,0,1,1-56.82,0"/>\n    <path class="cls-2" d="M13.59,49.1,8,41.87A2.91,2.91,0,1,1,13,39l.58,1,.58-1a2.91,2.91,0,1,1,5,2.91Z"/>\n    <path class="cls-2" d="M26.06,64l-5.62-7.23a2.91,2.91,0,1,1,5-2.91l.58,1,.58-1a2.91,2.91,0,1,1,5,2.91Z"/>\n    <path class="cls-2" d="M40.69,50.06l-5.62-7.23a2.91,2.91,0,1,1,5-2.91l.58,1,.58-1a2.91,2.91,0,1,1,5,2.91Z"/>\n    <path class="cls-2" d="M72.34,47.9l-5.62-7.23a2.91,2.91,0,1,1,5-2.91l.58,1,.58-1a2.91,2.91,0,1,1,5,2.91Z"/>\n    <path class="cls-2" d="M81.93,63.48l-5.62-7.23a2.91,2.91,0,1,1,5-2.91l.58,1,.58-1a2.91,2.91,0,1,1,5,2.91Z"/>\n    <path class="cls-2" d="M91.28,47.66l-5.62-7.23a2.91,2.91,0,1,1,5-2.91l.58,1,.58-1a2.91,2.91,0,1,1,5,2.91Z"/>\n    <path class="cls-2" d="M103.51,59.17l-5.62-7.23a2.91,2.91,0,1,1,5-2.91l.58,1,.58-1a2.91,2.91,0,1,1,5,2.91Z"/>\n    <rect class="cls-1" x="2.88" y="108.61" width="116.88" height="9.59"/>\n    <polygon class="cls-1" points="26.13 113.88 15.11 113.88 15.11 79.35 26.13 85.98 26.13 113.88"/>\n    <polygon class="cls-1" points="107.15 113.88 96.12 113.88 96.12 85.59 107.15 79.74 107.15 113.88"/>\n    <path class="cls-1" d="M59.93,115.79a28.41,28.41,0,0,1-56.82,0"/>\n    <path class="cls-1" d="M119.15,115.79a28.41,28.41,0,0,1-56.82,0"/>\n    <path class="cls-2" d="M13.59,124.46,8,117.23a2.91,2.91,0,1,1,5-2.91l.58,1,.58-1a2.91,2.91,0,1,1,5,2.91Z"/>\n    <path class="cls-2" d="M26.06,139.32l-5.62-7.23a2.91,2.91,0,1,1,5-2.91l.58,1,.58-1a2.91,2.91,0,1,1,5,2.91Z"/>\n    <path class="cls-2" d="M40.69,125.42l-5.62-7.23a2.91,2.91,0,1,1,5-2.91l.58,1,.58-1a2.91,2.91,0,1,1,5,2.91Z"/>\n    <path class="cls-2" d="M72.34,123.26,66.72,116a2.91,2.91,0,1,1,5-2.91l.58,1,.58-1A2.91,2.91,0,1,1,78,116Z"/>\n    <path class="cls-2" d="M81.93,138.84l-5.62-7.23a2.91,2.91,0,1,1,5-2.91l.58,1,.58-1a2.91,2.91,0,1,1,5,2.91Z"/>\n    <path class="cls-2" d="M91.28,123l-5.62-7.23a2.91,2.91,0,1,1,5-2.91l.58,1,.58-1a2.91,2.91,0,1,1,5,2.91Z"/>\n    <path class="cls-2" d="M103.51,134.53l-5.62-7.23a2.91,2.91,0,1,1,5-2.91l.58,1,.58-1a2.91,2.91,0,1,1,5,2.91Z"/>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="alien">\n  <svg class="bra" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 79.13 58.25">\n    <polygon class="cls-1" points="79.13 44.12 0 44.12 1.5 38.91 77.38 38.91 79.13 44.12"/>\n    <polygon class="cls-1" points="20.45 41.77 14.46 41.77 14.46 8.38 20.63 0 20.45 41.77"/>\n    <polygon class="cls-1" points="64.48 41.77 58.49 41.77 58.49 0 64.48 7.75 64.48 41.77"/>\n    <path class="cls-1" d="M38.82,42.81a15.44,15.44,0,1,1-30.88,0"/>\n    <path class="cls-1" d="M71,42.81a15.44,15.44,0,1,1-30.88,0"/>\n    <path class="cls-2" d="M13.64,47.52l-3.05-3.93A1.58,1.58,0,1,1,13.32,42l.32.55L14,42a1.58,1.58,0,1,1,2.73,1.58Z"/>\n    <path class="cls-2" d="M20.42,55.6l-3.05-3.93a1.58,1.58,0,1,1,2.73-1.58l.32.55.32-.55a1.58,1.58,0,1,1,2.73,1.58Z"/>\n    <path class="cls-2" d="M28.36,48l-3.05-3.93A1.58,1.58,0,1,1,28,42.53l.32.55.32-.55a1.58,1.58,0,1,1,2.73,1.58Z"/>\n    <path class="cls-2" d="M45.56,46.87l-3.05-3.93a1.58,1.58,0,1,1,2.73-1.58l.32.55.32-.55a1.58,1.58,0,1,1,2.73,1.58Z"/>\n    <path class="cls-2" d="M50.77,55.34l-3.05-3.93a1.58,1.58,0,1,1,2.73-1.58l.32.55.32-.55a1.58,1.58,0,1,1,2.73,1.58Z"/>\n    <path class="cls-2" d="M55.85,46.74,52.8,42.81a1.58,1.58,0,1,1,2.73-1.58l.32.55.32-.55a1.58,1.58,0,1,1,2.73,1.58Z"/>\n    <path class="cls-2" d="M62.5,53l-3.05-3.93a1.58,1.58,0,1,1,2.73-1.58l.32.55.32-.55a1.58,1.58,0,1,1,2.73,1.58Z"/>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="vampire">\n  <svg class="bra" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70.87 45.46">\n    <rect class="cls-1" y="23.72" width="70.87" height="5.85"/>\n    <polygon class="cls-1" points="14.07 26.94 7.34 26.94 7.34 7 14.07 0 14.07 26.94"/>\n    <polygon class="cls-1" points="63.54 26.94 56.81 26.94 56.81 0.67 63.54 6.67 63.54 26.94"/>\n    <path class="cls-1" d="M34.71,28.11A17.35,17.35,0,1,1,0,28.11"/>\n    <path class="cls-1" d="M70.87,28.11a17.35,17.35,0,1,1-34.69,0"/>\n    <path class="cls-2" d="M6.42,33.4,3,29a1.77,1.77,0,1,1,3.07-1.77l.36.62.36-.62A1.77,1.77,0,1,1,9.85,29Z"/>\n    <path class="cls-2" d="M14,42.48,10.6,38.06a1.77,1.77,0,1,1,3.07-1.77l.36.62.36-.62a1.77,1.77,0,1,1,3.07,1.77Z"/>\n    <path class="cls-2" d="M23,34l-3.43-4.41a1.77,1.77,0,1,1,3.07-1.77l.36.62.36-.62a1.77,1.77,0,1,1,3.07,1.77Z"/>\n    <path class="cls-2" d="M42.28,32.67l-3.43-4.41a1.77,1.77,0,1,1,3.07-1.77l.36.62.36-.62a1.77,1.77,0,1,1,3.07,1.77Z"/>\n    <path class="cls-2" d="M48.14,42.18l-3.43-4.41A1.77,1.77,0,1,1,47.78,36l.36.62L48.5,36a1.77,1.77,0,1,1,3.07,1.77Z"/>\n    <path class="cls-2" d="M53.85,32.52l-3.43-4.41a1.77,1.77,0,1,1,3.07-1.77l.36.62.36-.62a1.77,1.77,0,1,1,3.07,1.77Z"/>\n    <path class="cls-2" d="M61.32,39.55l-3.43-4.41A1.77,1.77,0,1,1,61,33.36l.36.62.36-.62a1.77,1.77,0,1,1,3.07,1.77Z"/>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="yeti">\n  <svg class="bra" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 332.83 137.75">\n    <path class="cls-1" d="M332.83,111.74,0,112l1.77-9.69,329.33-.08Z"/>\n    <polygon class="cls-1" points="158.35 107.43 147.33 107.43 67.84 4.67 75.53 0 158.35 107.43"/>\n    <polygon class="cls-1" points="239.37 107.43 228.34 107.43 292.5 28.33 298.2 35 239.37 107.43"/>\n    <path class="cls-1" d="M192.15,109.34a28.41,28.41,0,1,1-56.82,0"/>\n    <path class="cls-1" d="M251.37,109.34a28.41,28.41,0,1,1-56.82,0"/>\n    <path class="cls-2" d="M145.81,118l-5.62-7.23a2.91,2.91,0,1,1,5-2.91l.58,1,.58-1a2.91,2.91,0,1,1,5,2.91Z"/>\n    <path class="cls-2" d="M158.28,132.87l-5.62-7.23a2.91,2.91,0,1,1,5-2.91l.58,1,.58-1a2.91,2.91,0,1,1,5,2.91Z"/>\n    <path class="cls-2" d="M172.91,119l-5.62-7.23a2.91,2.91,0,1,1,5-2.91l.58,1,.58-1a2.91,2.91,0,1,1,5,2.91Z"/>\n    <path class="cls-2" d="M204.56,116.81l-5.62-7.23a2.91,2.91,0,1,1,5-2.91l.58,1,.58-1a2.91,2.91,0,1,1,5,2.91Z"/>\n    <path class="cls-2" d="M214.15,132.39l-5.62-7.23a2.91,2.91,0,1,1,5-2.91l.58,1,.58-1a2.91,2.91,0,1,1,5,2.91Z"/>\n    <path class="cls-2" d="M223.5,116.57l-5.62-7.23a2.91,2.91,0,1,1,5-2.91l.58,1,.58-1a2.91,2.91,0,1,1,5,2.91Z"/>\n    <path class="cls-2" d="M235.73,128.08l-5.62-7.23a2.91,2.91,0,1,1,5-2.91l.58,1,.58-1a2.91,2.91,0,1,1,5,2.91Z"/>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="ghost">\n  <svg class="bra" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 144.43">\n    <polygon class="cls-1" points="220 122.09 0 122.09 2 113.85 218.83 113.67 220 122.09"/>\n    <polygon class="cls-1" points="200.24 118.38 190.76 118.38 190.76 0 200.24 30 200.24 118.38"/>\n    <polygon class="cls-1" points="27.96 118.38 18.49 118.38 18.49 36.5 27.96 5.17 27.96 118.38"/>\n    <path class="cls-1" d="M110,120a24.4,24.4,0,0,1-48.8,0"/>\n    <path class="cls-1" d="M160.85,120a24.4,24.4,0,0,1-48.8,0"/>\n    <path class="cls-2" d="M70.19,127.47l-4.82-6.21a2.5,2.5,0,1,1,4.32-2.5l.5.87.5-.87a2.5,2.5,0,1,1,4.32,2.5Z"/>\n    <path class="cls-2" d="M80.9,140.23,76.08,134a2.5,2.5,0,1,1,4.32-2.5l.5.87.5-.87a2.5,2.5,0,1,1,4.32,2.5Z"/>\n    <path class="cls-2" d="M93.46,128.29l-4.82-6.21a2.5,2.5,0,1,1,4.32-2.5l.5.87.5-.87a2.5,2.5,0,1,1,4.32,2.5Z"/>\n    <path class="cls-2" d="M120.64,126.44l-4.82-6.21a2.5,2.5,0,1,1,4.32-2.5l.5.87.5-.87a2.5,2.5,0,1,1,4.32,2.5Z"/>\n    <path class="cls-2" d="M128.88,139.82l-4.82-6.21a2.5,2.5,0,1,1,4.32-2.5l.5.87.5-.87a2.5,2.5,0,1,1,4.32,2.5Z"/>\n    <path class="cls-2" d="M136.91,126.23,132.09,120a2.5,2.5,0,1,1,4.32-2.5l.5.87.5-.87a2.5,2.5,0,1,1,4.32,2.5Z"/>\n    <path class="cls-2" d="M147.41,136.12l-4.82-6.21a2.5,2.5,0,1,1,4.32-2.5l.5.87.5-.87a2.5,2.5,0,1,1,4.32,2.5Z"/>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="wolf">\n  <svg class="bra" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 174 62.44">\n    <rect class="cls-1" y="26.84" width="174" height="9.59"/>\n    <polygon class="cls-1" points="70.85 32.11 59.83 32.11 12.97 0 24 0 70.85 32.11"/>\n    <polygon class="cls-1" points="151.87 32.11 140.84 32.11 173.97 3.5 173.5 13.5 151.87 32.11"/>\n    <path class="cls-1" d="M104.65,34a28.41,28.41,0,1,1-56.82,0"/>\n    <path class="cls-1" d="M163.87,34A28.41,28.41,0,1,1,107,34"/>\n    <path class="cls-2" d="M58.32,42.69,52.7,35.46a2.91,2.91,0,1,1,5-2.91l.58,1,.58-1a2.91,2.91,0,1,1,5,2.91Z"/>\n    <path class="cls-2" d="M70.78,57.55l-5.62-7.23a2.91,2.91,0,1,1,5-2.91l.58,1,.58-1a2.91,2.91,0,1,1,5,2.91Z"/>\n    <path class="cls-2" d="M85.41,43.65l-5.62-7.23a2.91,2.91,0,1,1,5-2.91l.58,1,.58-1a2.91,2.91,0,1,1,5,2.91Z"/>\n    <path class="cls-2" d="M117.06,41.49l-5.62-7.23a2.91,2.91,0,1,1,5-2.91l.58,1,.58-1a2.91,2.91,0,1,1,5,2.91Z"/>\n    <path class="cls-2" d="M126.65,57.07,121,49.85a2.91,2.91,0,1,1,5-2.91l.58,1,.58-1a2.91,2.91,0,1,1,5,2.91Z"/>\n    <path class="cls-2" d="M136,41.25,130.38,34a2.91,2.91,0,1,1,5-2.91l.58,1,.58-1a2.91,2.91,0,1,1,5,2.91Z"/>\n    <path class="cls-2" d="M148.23,52.76l-5.62-7.23a2.91,2.91,0,1,1,5-2.91l.58,1,.58-1a2.91,2.91,0,1,1,5,2.91Z"/>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="bed">\n  <svg class="bra" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65.47 35.97">\n    <rect class="cls-1" y="21.63" width="65.47" height="3.86"/>\n    <rect class="cls-1" x="14.2" width="4.44" height="23.76"/>\n    <rect class="cls-1" x="46.84" width="4.44" height="23.76"/>\n    <path class="cls-1" d="M32.25,24.53a11.45,11.45,0,1,1-22.89,0"/>\n    <path class="cls-1" d="M56.11,24.53a11.45,11.45,0,0,1-22.89,0"/>\n    <path class="cls-2" d="M13.59,28l-2.26-2.91a1.17,1.17,0,1,1,2-1.17l.23.41.23-.41a1.17,1.17,0,1,1,2,1.17Z"/>\n    <path class="cls-2" d="M18.61,34l-2.26-2.91a1.17,1.17,0,1,1,2-1.17l.23.41.23-.41a1.17,1.17,0,1,1,2,1.17Z"/>\n    <path class="cls-2" d="M24.5,28.4l-2.26-2.91a1.17,1.17,0,1,1,2-1.17l.23.41.23-.41a1.17,1.17,0,1,1,2,1.17Z"/>\n    <path class="cls-2" d="M37.25,27.53,35,24.62a1.17,1.17,0,1,1,2-1.17l.23.41.23-.41a1.17,1.17,0,1,1,2,1.17Z"/>\n    <path class="cls-2" d="M41.12,33.81,38.85,30.9a1.17,1.17,0,1,1,2-1.17l.23.41.23-.41a1.17,1.17,0,1,1,2,1.17Z"/>\n    <path class="cls-2" d="M44.88,27.44l-2.26-2.91a1.17,1.17,0,1,1,2-1.17l.23.41.23-.41a1.17,1.17,0,1,1,2,1.17Z"/>\n    <path class="cls-2" d="M49.81,32.07l-2.26-2.91a1.17,1.17,0,1,1,2-1.17l.23.41L50,28a1.17,1.17,0,1,1,2,1.17Z"/>\n  </svg>\n</ng-template>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/trinkets/bra/bra.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]])
    ], BraComponent);
    return BraComponent;
}(__WEBPACK_IMPORTED_MODULE_1__trinket_uniq_model__["a" /* TrinketUniqModel */]));

//# sourceMappingURL=bra.js.map

/***/ }),
/* 173 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WigComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__trinket_uniq_model__ = __webpack_require__(48);
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


var WigComponent = /** @class */ (function (_super) {
    __extends(WigComponent, _super);
    function WigComponent(element) {
        return _super.call(this, 'wig', element.nativeElement) || this;
    }
    WigComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'wig',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/trinkets/wig/wig.html"*/'<ng-template trinket-uniq-part part-name="default">\n  <svg class="wig" width="120" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170.69 170.82">\n         <circle class="cls-1" cx="16.76" cy="65.74" r="13.24"/>\n         <circle class="cls-1" cx="91.76" cy="13.24" r="13.24"/>\n         <circle class="cls-1" cx="91.26" cy="31.74" r="13.24"/>\n         <circle class="cls-1" cx="108.76" cy="43.74" r="13.24"/>\n         <circle class="cls-1" cx="40.59" cy="20.57" r="15.26"/>\n         <circle class="cls-1" cx="20" cy="42.5" r="20"/>\n         <circle class="cls-1" cx="64.5" cy="21" r="20"/>\n         <circle class="cls-1" cx="116.5" cy="21.5" r="20"/>\n         <circle class="cls-1" cx="150.5" cy="45" r="20"/>\n         <circle class="cls-1" cx="129" cy="46" r="20"/>\n         <circle class="cls-1" cx="45.64" cy="39.34" r="12.03"/>\n         <circle class="cls-1" cx="143.64" cy="25.34" r="12.03"/>\n         <circle class="cls-1" cx="145.14" cy="37.84" r="12.03"/>\n         <circle class="cls-1" cx="149.14" cy="49.34" r="12.03"/>\n         <circle class="cls-1" cx="145.5" cy="63" r="12.03"/>\n         <circle class="cls-1" cx="159.36" cy="67.36" r="10.06"/>\n         <circle class="cls-1" cx="159.06" cy="82.06" r="7.61"/>\n         <circle class="cls-1" cx="160.5" cy="94" r="7.61"/>\n         <circle class="cls-1" cx="13" cy="100.5" r="5.22"/>\n         <circle class="cls-1" cx="13" cy="110.28" r="5.22"/>\n         <circle class="cls-1" cx="13" cy="118.86" r="5.22"/>\n         <circle class="cls-1" cx="161" cy="108.19" r="5.22"/>\n         <circle class="cls-1" cx="161" cy="117.43" r="5.22"/>\n         <ellipse class="cls-1" cx="161.1" cy="136.43" rx="5.32" ry="15.13"/>\n         <circle class="cls-1" cx="13.48" cy="84.45" r="8.89"/>\n         <polygon class="cls-2" points="16.48 96.46 3.48 101.17 3.48 88.17 16.48 92.88 16.48 96.46"/>\n         <polygon class="cls-2" points="9.69 92.88 22.69 88.17 22.69 101.17 9.69 96.46 9.69 92.88"/>\n         <polygon class="cls-2" points="164 102.74 151 107.46 151 94.46 164 99.17 164 102.74"/>\n         <polygon class="cls-2" points="157.21 99.17 170.21 94.46 170.21 107.46 157.21 102.74 157.21 99.17"/>\n         <path class="cls-1" d="M13,127.16c-10.58,0-6.43,17.89,0,24.32C19.45,145.05,24.07,127.16,13,127.16Z"/>\n         <polygon class="cls-2" points="16.48 128.46 3.48 133.17 3.48 120.17 16.48 124.88 16.48 128.46"/>\n         <polygon class="cls-2" points="9.69 124.88 22.69 120.17 22.69 133.17 9.69 128.46 9.69 124.88"/>\n         <path class="cls-1" d="M161,146.49c-10.58,0-6.43,17.89,0,24.32C167.45,164.38,172.07,146.49,161,146.49Z"/>\n         <polygon class="cls-2" points="164.48 147.79 151.48 152.5 151.48 139.5 164.48 144.21 164.48 147.79"/>\n         <polygon class="cls-2" points="157.69 144.21 170.69 139.5 170.69 152.5 157.69 147.79 157.69 144.21"/>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="zombie">\n  <svg class="wig--color--white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 206.71 203.3">\n   <circle class="cls-1" cx="15.83" cy="78.62" r="15.83"/>\n   <circle class="cls-1" cx="112.54" cy="15.83" r="15.83"/>\n   <circle class="cls-1" cx="111.94" cy="37.96" r="15.83"/>\n   <circle class="cls-1" cx="132.87" cy="52.31" r="15.83"/>\n   <circle class="cls-1" cx="51.34" cy="24.61" r="18.25"/>\n   <circle class="cls-1" cx="26.71" cy="50.83" r="23.92"/>\n   <circle class="cls-1" cx="79.94" cy="25.12" r="23.92"/>\n   <circle class="cls-1" cx="142.13" cy="25.71" r="23.92"/>\n   <circle class="cls-1" cx="182.79" cy="53.82" r="23.92"/>\n   <circle class="cls-1" cx="155.07" cy="60.02" r="23.92"/>\n   <circle class="cls-1" cx="57.38" cy="47.06" r="14.38"/>\n   <circle class="cls-1" cx="174.59" cy="30.31" r="14.38"/>\n   <circle class="cls-1" cx="176.38" cy="45.26" r="14.38"/>\n   <circle class="cls-1" cx="181.17" cy="59.02" r="14.38"/>\n   <circle class="cls-1" cx="176.81" cy="75.35" r="14.38"/>\n   <circle class="cls-1" cx="193.38" cy="80.56" r="12.03"/>\n   <circle class="cls-1" cx="183.02" cy="97.14" r="9.11"/>\n   <circle class="cls-1" cx="184.75" cy="111.42" r="9.11"/>\n   <circle class="cls-1" cx="185.34" cy="128.39" r="6.24"/>\n   <circle class="cls-1" cx="185.34" cy="139.44" r="6.24"/>\n   <ellipse class="cls-1" cx="185.46" cy="162.17" rx="6.36" ry="18.09"/>\n   <circle class="cls-1" cx="16.92" cy="101" r="10.64"/>\n   <polygon class="cls-2" points="188.93 121.88 173.38 127.52 173.38 111.97 188.93 117.6 188.93 121.88"/>\n   <polygon class="cls-2" points="180.8 117.6 196.35 111.97 196.35 127.52 180.8 121.88 180.8 117.6"/>\n   <path class="cls-1" d="M185.37,174.2c-12.65,0-7.69,21.4,0,29.09C193.06,195.6,198.58,174.2,185.37,174.2Z"/>\n   <polygon class="cls-2" points="189.51 175.76 173.96 181.39 173.96 165.84 189.51 171.48 189.51 175.76"/>\n   <polygon class="cls-2" points="181.38 171.48 196.93 165.84 196.93 181.39 181.38 175.76 181.38 171.48"/>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="mummy">\n  <svg class="wig--color--white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 178.31 256.13">\n   <circle class="cls-1" cx="16.76" cy="65.74" r="13.24"/>\n   <circle class="cls-1" cx="91.76" cy="13.24" r="13.24"/>\n   <circle class="cls-1" cx="91.26" cy="31.74" r="13.24"/>\n   <circle class="cls-1" cx="108.76" cy="43.74" r="13.24"/>\n   <circle class="cls-1" cx="40.59" cy="20.57" r="15.26"/>\n   <circle class="cls-1" cx="20" cy="42.5" r="20"/>\n   <circle class="cls-1" cx="64.5" cy="21" r="20"/>\n   <circle class="cls-1" cx="116.5" cy="21.5" r="20"/>\n   <circle class="cls-1" cx="150.5" cy="45" r="20"/>\n   <circle class="cls-1" cx="129" cy="46" r="20"/>\n   <circle class="cls-1" cx="45.64" cy="39.34" r="12.03"/>\n   <circle class="cls-1" cx="143.64" cy="25.34" r="12.03"/>\n   <circle class="cls-1" cx="145.14" cy="37.84" r="12.03"/>\n   <circle class="cls-1" cx="149.14" cy="49.34" r="12.03"/>\n   <circle class="cls-1" cx="145.5" cy="63" r="12.03"/>\n   <circle class="cls-1" cx="159.36" cy="67.36" r="10.06"/>\n   <circle class="cls-1" cx="155.98" cy="85.64" r="14.63"/>\n   <circle class="cls-1" cx="158.75" cy="108.57" r="14.63"/>\n   <circle class="cls-1" cx="13" cy="100.5" r="5.22"/>\n   <circle class="cls-1" cx="13" cy="110.28" r="5.22"/>\n   <circle class="cls-1" cx="13" cy="118.86" r="5.22"/>\n   <circle class="cls-1" cx="159.71" cy="135.83" r="10.03"/>\n   <circle class="cls-1" cx="159.71" cy="153.58" r="10.03"/>\n   <ellipse class="cls-1" cx="159.9" cy="190.08" rx="10.22" ry="29.06"/>\n   <circle class="cls-1" cx="13.48" cy="84.45" r="8.89"/>\n   <polygon class="cls-2" points="16.48 96.46 3.48 101.17 3.48 88.17 16.48 92.88 16.48 96.46"/>\n   <polygon class="cls-2" points="9.69 92.88 22.69 88.17 22.69 101.17 9.69 96.46 9.69 92.88"/>\n   <polygon class="cls-2" points="165.47 125.37 140.5 134.42 140.5 109.45 165.47 118.5 165.47 125.37"/>\n   <polygon class="cls-2" points="152.42 118.5 177.39 109.45 177.39 134.42 152.42 125.37 152.42 118.5"/>\n   <path class="cls-1" d="M13,127.16c-10.58,0-6.43,17.89,0,24.32C19.45,145.05,24.07,127.16,13,127.16Z"/>\n   <polygon class="cls-2" points="16.48 128.46 3.48 133.17 3.48 120.17 16.48 124.88 16.48 128.46"/>\n   <polygon class="cls-2" points="9.69 124.88 22.69 120.17 22.69 133.17 9.69 128.46 9.69 124.88"/>\n   <path class="cls-1" d="M159.74,209.4c-20.32,0-12.35,34.37,0,46.72C172.1,243.77,181,209.4,159.74,209.4Z"/>\n   <polygon class="cls-2" points="166.4 211.9 141.42 220.95 141.42 195.97 166.4 205.02 166.4 211.9"/>\n   <polygon class="cls-2" points="153.34 205.02 178.31 195.97 178.31 220.95 153.34 211.9 153.34 205.02"/>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="doctor">\n  <svg class="wig--color--yellow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 119.65 119.74">\n   <circle class="cls-1" cx="11.75" cy="46.08" r="9.28"/>\n   <circle class="cls-1" cx="64.32" cy="9.28" r="9.28"/>\n   <circle class="cls-1" cx="63.97" cy="22.25" r="9.28"/>\n   <circle class="cls-1" cx="76.24" cy="30.66" r="9.28"/>\n   <circle class="cls-1" cx="28.45" cy="14.42" r="10.69"/>\n   <circle class="cls-1" cx="14.02" cy="29.79" r="14.02"/>\n   <circle class="cls-1" cx="45.21" cy="14.72" r="14.02"/>\n   <circle class="cls-1" cx="81.66" cy="15.07" r="14.02"/>\n   <circle class="cls-1" cx="105.5" cy="31.54" r="14.02"/>\n   <circle class="cls-1" cx="90.42" cy="32.25" r="14.02"/>\n   <circle class="cls-1" cx="31.99" cy="27.58" r="8.43"/>\n   <circle class="cls-1" cx="100.69" cy="17.77" r="8.43"/>\n   <circle class="cls-1" cx="101.74" cy="26.53" r="8.43"/>\n   <circle class="cls-1" cx="104.55" cy="34.59" r="8.43"/>\n   <circle class="cls-1" cx="101.99" cy="44.16" r="8.43"/>\n   <circle class="cls-1" cx="108.7" cy="48.22" r="7.05"/>\n   <circle class="cls-1" cx="111.5" cy="57.52" r="5.34"/>\n   <circle class="cls-1" cx="112.51" cy="65.89" r="5.34"/>\n   <circle class="cls-1" cx="9.11" cy="70.45" r="3.66"/>\n   <circle class="cls-1" cx="9.11" cy="77.3" r="3.66"/>\n   <circle class="cls-1" cx="9.11" cy="83.32" r="3.66"/>\n   <circle class="cls-1" cx="112.86" cy="75.84" r="3.66"/>\n   <circle class="cls-1" cx="112.86" cy="82.32" r="3.66"/>\n   <ellipse class="cls-1" cx="112.93" cy="95.64" rx="3.73" ry="10.6"/>\n   <circle class="cls-1" cx="9.45" cy="59.2" r="6.23"/>\n   <polygon class="cls-2" points="11.55 67.61 2.44 70.92 2.44 61.8 11.55 65.11 11.55 67.61"/>\n   <polygon class="cls-2" points="6.79 65.11 15.9 61.8 15.9 70.92 6.79 67.61 6.79 65.11"/>\n   <polygon class="cls-2" points="114.96 72.02 105.85 75.33 105.85 66.21 114.96 69.51 114.96 72.02"/>\n   <polygon class="cls-2" points="110.2 69.51 119.31 66.21 119.31 75.33 110.2 72.02 110.2 69.51"/>\n   <path class="cls-1" d="M9.13,89.14c-7.41,0-4.51,12.54,0,17.05C13.63,101.68,16.87,89.14,9.13,89.14Z"/>\n   <polygon class="cls-2" points="11.55 90.05 2.44 93.35 2.44 84.23 11.55 87.54 11.55 90.05"/>\n   <polygon class="cls-2" points="6.79 87.54 15.9 84.23 15.9 93.35 6.79 90.05 6.79 87.54"/>\n   <path class="cls-1" d="M112.87,102.69c-7.41,0-4.51,12.54,0,17.05C117.38,115.23,120.62,102.69,112.87,102.69Z"/>\n   <polygon class="cls-2" points="115.3 103.6 106.19 106.9 106.19 97.79 115.3 101.09 115.3 103.6"/>\n   <polygon class="cls-2" points="110.53 101.09 119.65 97.79 119.65 106.9 110.53 103.6 110.53 101.09"/>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="vampire">\n  <svg class="wig--color--white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108.64 186.86">\n   <circle class="cls-1" cx="14.53" cy="71.31" r="8.09"/>\n   <circle class="cls-1" cx="60.38" cy="39.21" r="8.09"/>\n   <circle class="cls-1" cx="60.08" cy="50.52" r="8.09"/>\n   <circle class="cls-1" cx="70.78" cy="57.86" r="8.09"/>\n   <circle class="cls-1" cx="29.1" cy="43.69" r="9.33"/>\n   <circle class="cls-1" cx="18.74" cy="60.23" r="12.23"/>\n   <circle class="cls-1" cx="41.74" cy="28.73" r="12.23"/>\n   <circle class="cls-1" cx="53.24" cy="12.23" r="12.23"/>\n   <circle class="cls-1" cx="53.97" cy="28.73" r="12.23"/>\n   <circle class="cls-1" cx="69.24" cy="24.73" r="12.23"/>\n   <circle class="cls-1" cx="86.24" cy="33.23" r="12.23"/>\n   <circle class="cls-1" cx="37.74" cy="15.23" r="12.23"/>\n   <circle class="cls-1" cx="25.74" cy="27.73" r="12.23"/>\n   <circle class="cls-1" cx="43.72" cy="43.95" r="12.23"/>\n   <circle class="cls-1" cx="75.51" cy="44.26" r="12.23"/>\n   <circle class="cls-1" cx="96.3" cy="58.63" r="12.23"/>\n   <circle class="cls-1" cx="83.15" cy="59.24" r="12.23"/>\n   <circle class="cls-1" cx="32.19" cy="55.17" r="7.35"/>\n   <circle class="cls-1" cx="92.1" cy="46.61" r="7.35"/>\n   <circle class="cls-1" cx="93.02" cy="54.25" r="7.35"/>\n   <circle class="cls-1" cx="95.47" cy="61.28" r="7.35"/>\n   <circle class="cls-1" cx="93.24" cy="69.63" r="7.35"/>\n   <circle class="cls-1" cx="99.24" cy="75.73" r="6.15"/>\n   <circle class="cls-1" cx="101.53" cy="81.29" r="4.66"/>\n   <circle class="cls-1" cx="102.41" cy="88.59" r="4.66"/>\n   <circle class="cls-1" cx="14.24" cy="110.58" r="7.81"/>\n   <circle class="cls-1" cx="14.24" cy="125.21" r="7.81"/>\n   <circle class="cls-1" cx="14.24" cy="138.05" r="7.81"/>\n   <circle class="cls-1" cx="102.72" cy="97.26" r="3.19"/>\n   <circle class="cls-1" cx="102.72" cy="102.91" r="3.19"/>\n   <ellipse class="cls-1" cx="102.78" cy="114.53" rx="3.25" ry="9.25"/>\n   <circle class="cls-1" cx="14.96" cy="86.57" r="13.3"/>\n   <polygon class="cls-2" points="19.45 104.53 0 111.58 0 92.13 19.45 99.18 19.45 104.53"/>\n   <polygon class="cls-2" points="9.28 99.18 28.73 92.13 28.73 111.58 9.28 104.53 9.28 99.18"/>\n   <polygon class="cls-2" points="104.55 93.93 96.6 96.81 96.6 88.86 104.55 91.75 104.55 93.93"/>\n   <polygon class="cls-2" points="100.4 91.75 108.34 88.86 108.34 96.81 100.4 93.93 100.4 91.75"/>\n   <path class="cls-1" d="M14.27,150.47c-15.83,0-9.62,26.77,0,36.39C23.89,177.24,30.8,150.47,14.27,150.47Z"/>\n   <polygon class="cls-2" points="19.45 152.41 0 159.46 0 140.01 19.45 147.06 19.45 152.41"/>\n   <polygon class="cls-2" points="9.28 147.06 28.73 140.01 28.73 159.46 9.28 152.41 9.28 147.06"/>\n   <path class="cls-1" d="M102.73,120.68c-6.47,0-3.93,10.94,0,14.87C106.66,131.62,109.48,120.68,102.73,120.68Z"/>\n   <polygon class="cls-2" points="104.85 121.47 96.9 124.35 96.9 116.41 104.85 119.29 104.85 121.47"/>\n   <polygon class="cls-2" points="100.69 119.29 108.64 116.41 108.64 124.35 100.69 121.47 100.69 119.29"/>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="yeti">\n  <svg class="wig" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 188.17 188.32">\n   <circle class="cls-1" cx="18.48" cy="72.47" r="14.6"/>\n   <circle class="cls-1" cx="101.16" cy="14.6" r="14.6"/>\n   <circle class="cls-1" cx="100.61" cy="34.99" r="14.6"/>\n   <circle class="cls-1" cx="119.9" cy="48.22" r="14.6"/>\n   <circle class="cls-1" cx="44.75" cy="22.68" r="16.82"/>\n   <circle class="cls-1" cx="22.05" cy="46.85" r="22.05"/>\n   <circle class="cls-1" cx="71.11" cy="23.15" r="22.05"/>\n   <circle class="cls-1" cx="78.89" cy="44.33" r="22.05"/>\n   <circle class="cls-1" cx="105.39" cy="47.33" r="22.05"/>\n   <circle class="cls-1" cx="159.39" cy="78.83" r="22.05"/>\n   <circle class="cls-1" cx="128.44" cy="23.7" r="22.05"/>\n   <circle class="cls-1" cx="165.92" cy="49.61" r="22.05"/>\n   <circle class="cls-1" cx="142.21" cy="50.72" r="22.05"/>\n   <circle class="cls-1" cx="50.32" cy="43.37" r="13.26"/>\n   <circle class="cls-1" cx="38.73" cy="66.94" r="13.26"/>\n   <circle class="cls-1" cx="58.73" cy="56.94" r="13.26"/>\n   <circle class="cls-1" cx="158.36" cy="27.94" r="13.26"/>\n   <circle class="cls-1" cx="160.01" cy="41.72" r="13.26"/>\n   <circle class="cls-1" cx="164.42" cy="54.4" r="13.26"/>\n   <circle class="cls-1" cx="160.41" cy="69.45" r="13.26"/>\n   <circle class="cls-1" cx="27.89" cy="85.33" r="13.26"/>\n   <circle class="cls-1" cx="175.68" cy="74.26" r="11.09"/>\n   <circle class="cls-1" cx="175.35" cy="90.47" r="8.4"/>\n   <circle class="cls-1" cx="176.94" cy="103.63" r="8.4"/>\n   <circle class="cls-1" cx="177.49" cy="119.27" r="5.76"/>\n   <circle class="cls-1" cx="177.49" cy="129.46" r="5.76"/>\n   <ellipse class="cls-1" cx="177.6" cy="150.41" rx="5.86" ry="16.68"/>\n   <circle class="cls-1" cx="14.86" cy="93.1" r="9.8"/>\n   <polygon class="cls-2" points="180.8 113.27 166.47 118.46 166.47 104.13 180.8 109.33 180.8 113.27"/>\n   <polygon class="cls-2" points="173.31 109.33 187.64 104.13 187.64 118.46 173.31 113.27 173.31 109.33"/>\n   <path class="cls-1" d="M177.51,161.5c-11.66,0-7.09,19.73,0,26.82C184.6,181.23,189.69,161.5,177.51,161.5Z"/>\n   <polygon class="cls-2" points="181.33 162.93 167 168.12 167 153.79 181.33 158.99 181.33 162.93"/>\n   <polygon class="cls-2" points="173.84 158.99 188.17 153.79 188.17 168.12 173.84 162.93 173.84 158.99"/>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="ghost">\n  <svg class="wig" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 164.24 243.77">\n   <circle class="cls-1" cx="15.24" cy="59.78" r="12.04"/>\n   <circle class="cls-1" cx="83.44" cy="12.04" r="12.04"/>\n   <circle class="cls-1" cx="82.99" cy="28.86" r="12.04"/>\n   <circle class="cls-1" cx="98.9" cy="39.77" r="12.04"/>\n   <circle class="cls-1" cx="36.91" cy="18.71" r="13.87"/>\n   <circle class="cls-1" cx="18.19" cy="38.65" r="18.19"/>\n   <circle class="cls-1" cx="58.65" cy="19.1" r="18.19"/>\n   <circle class="cls-1" cx="105.94" cy="19.55" r="18.19"/>\n   <circle class="cls-1" cx="136.85" cy="40.92" r="18.19"/>\n   <circle class="cls-1" cx="117.3" cy="41.83" r="18.19"/>\n   <circle class="cls-1" cx="41.5" cy="35.78" r="10.94"/>\n   <circle class="cls-1" cx="130.62" cy="23.05" r="10.94"/>\n   <circle class="cls-1" cx="131.98" cy="34.41" r="10.94"/>\n   <circle class="cls-1" cx="135.62" cy="44.87" r="10.94"/>\n   <circle class="cls-1" cx="132.31" cy="57.29" r="10.94"/>\n   <circle class="cls-1" cx="144.91" cy="61.25" r="9.14"/>\n   <circle class="cls-1" cx="143" cy="81.61" r="13.91"/>\n   <circle class="cls-1" cx="145.63" cy="103.42" r="13.91"/>\n   <circle class="cls-1" cx="11.82" cy="91.39" r="4.75"/>\n   <circle class="cls-1" cx="11.82" cy="100.28" r="4.75"/>\n   <circle class="cls-1" cx="11.82" cy="108.08" r="4.75"/>\n   <circle class="cls-1" cx="146.55" cy="129.35" r="9.54"/>\n   <circle class="cls-1" cx="146.55" cy="146.23" r="9.54"/>\n   <ellipse class="cls-1" cx="146.72" cy="180.94" rx="9.72" ry="27.64"/>\n   <circle class="cls-1" cx="12.26" cy="76.79" r="8.09"/>\n   <polygon class="cls-2" points="14.99 87.71 3.17 91.99 3.17 80.17 14.99 84.46 14.99 87.71"/>\n   <polygon class="cls-2" points="8.81 84.46 20.63 80.17 20.63 91.99 8.81 87.71 8.81 84.46"/>\n   <polygon class="cls-2" points="152.03 119.4 128.28 128.01 128.28 104.26 152.03 112.86 152.03 119.4"/>\n   <polygon class="cls-2" points="139.61 112.86 163.36 104.26 163.36 128.01 139.61 119.4 139.61 112.86"/>\n   <path class="cls-1" d="M11.84,115.63c-9.62,0-5.85,16.27,0,22.12C17.69,131.9,21.88,115.63,11.84,115.63Z"/>\n   <polygon class="cls-2" points="14.99 116.81 3.17 121.09 3.17 109.27 14.99 113.56 14.99 116.81"/>\n   <polygon class="cls-2" points="8.81 113.56 20.63 109.27 20.63 121.09 8.81 116.81 8.81 113.56"/>\n   <path class="cls-1" d="M146.58,199.33c-19.33,0-11.75,32.69,0,44.44C158.33,232,166.77,199.33,146.58,199.33Z"/>\n   <polygon class="cls-2" points="152.91 201.7 129.16 210.3 129.16 186.55 152.91 195.16 152.91 201.7"/>\n   <polygon class="cls-2" points="140.49 195.16 164.24 186.55 164.24 210.3 140.49 201.7 140.49 195.16"/>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="wolf">\n  <svg class="wig" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170.5 151.48">\n     <circle class="cls-1" cx="16.76" cy="65.74" r="13.24"/>\n     <circle class="cls-1" cx="91.76" cy="13.24" r="13.24"/>\n     <circle class="cls-1" cx="91.26" cy="31.74" r="13.24"/>\n     <circle class="cls-1" cx="108.76" cy="43.74" r="13.24"/>\n     <circle class="cls-1" cx="40.59" cy="20.57" r="15.26"/>\n     <circle class="cls-1" cx="20" cy="42.5" r="20"/>\n     <circle class="cls-1" cx="64.5" cy="21" r="20"/>\n     <circle class="cls-1" cx="116.5" cy="21.5" r="20"/>\n     <circle class="cls-1" cx="150.5" cy="45" r="20"/>\n     <circle class="cls-1" cx="140.5" cy="47" r="20"/>\n     <circle class="cls-1" cx="45.64" cy="39.34" r="12.03"/>\n     <circle class="cls-1" cx="143.64" cy="25.34" r="12.03"/>\n     <circle class="cls-1" cx="145.14" cy="37.84" r="12.03"/>\n     <circle class="cls-1" cx="149.14" cy="49.34" r="12.03"/>\n     <circle class="cls-1" cx="13" cy="100.5" r="5.22"/>\n     <circle class="cls-1" cx="13" cy="110.28" r="5.22"/>\n     <circle class="cls-1" cx="13" cy="118.86" r="5.22"/>\n     <circle class="cls-1" cx="13.48" cy="84.45" r="8.89"/>\n     <polygon class="cls-2" points="16.48 96.46 3.48 101.17 3.48 88.17 16.48 92.88 16.48 96.46"/>\n     <polygon class="cls-2" points="9.69 92.88 22.69 88.17 22.69 101.17 9.69 96.46 9.69 92.88"/>\n     <path class="cls-1" d="M13,127.16c-10.58,0-6.43,17.89,0,24.32C19.45,145.05,24.07,127.16,13,127.16Z"/>\n     <polygon class="cls-2" points="16.48 128.46 3.48 133.17 3.48 120.17 16.48 124.88 16.48 128.46"/>\n     <polygon class="cls-2" points="9.69 124.88 22.69 120.17 22.69 133.17 9.69 128.46 9.69 124.88"/>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="bed">\n  <svg class="wig--bed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90.11 90.18">\n    <circle class="cls-1" cx="8.85" cy="34.71" r="6.99"/>\n    <circle class="cls-1" cx="48.45" cy="6.99" r="6.99"/>\n    <circle class="cls-1" cx="48.18" cy="16.76" r="6.99"/>\n    <circle class="cls-1" cx="57.42" cy="23.09" r="6.99"/>\n    <circle class="cls-1" cx="21.43" cy="10.86" r="8.05"/>\n    <circle class="cls-1" cx="10.56" cy="22.44" r="10.56"/>\n    <circle class="cls-1" cx="34.05" cy="11.09" r="10.56"/>\n    <circle class="cls-1" cx="61.51" cy="11.35" r="10.56"/>\n    <circle class="cls-1" cx="79.46" cy="23.76" r="10.56"/>\n    <circle class="cls-1" cx="68.1" cy="24.29" r="10.56"/>\n    <circle class="cls-1" cx="24.1" cy="20.77" r="6.35"/>\n    <circle class="cls-1" cx="75.84" cy="13.38" r="6.35"/>\n    <circle class="cls-1" cx="76.63" cy="19.98" r="6.35"/>\n    <circle class="cls-1" cx="78.74" cy="26.05" r="6.35"/>\n    <circle class="cls-1" cx="76.82" cy="33.26" r="6.35"/>\n    <circle class="cls-1" cx="84.13" cy="35.56" r="5.31"/>\n    <circle class="cls-1" cx="83.98" cy="43.32" r="4.02"/>\n    <circle class="cls-1" cx="84.74" cy="49.63" r="4.02"/>\n    <circle class="cls-1" cx="6.86" cy="53.06" r="2.76"/>\n    <circle class="cls-1" cx="6.86" cy="58.22" r="2.76"/>\n    <circle class="cls-1" cx="6.86" cy="62.75" r="2.76"/>\n    <circle class="cls-1" cx="85" cy="57.12" r="2.76"/>\n    <circle class="cls-1" cx="85" cy="62" r="2.76"/>\n    <ellipse class="cls-1" cx="85.05" cy="72.03" rx="2.81" ry="7.99"/>\n    <circle class="cls-1" cx="7.12" cy="44.59" r="4.69"/>\n    <polygon class="cls-2" points="8.7 50.92 1.84 53.41 1.84 46.55 8.7 49.03 8.7 50.92"/>\n    <polygon class="cls-2" points="5.11 49.03 11.98 46.55 11.98 53.41 5.11 50.92 5.11 49.03"/>\n    <polygon class="cls-2" points="86.58 54.24 79.72 56.73 79.72 49.87 86.58 52.36 86.58 54.24"/>\n    <polygon class="cls-2" points="83 52.36 89.86 49.87 89.86 56.73 83 54.24 83 52.36"/>\n    <path class="cls-1" d="M6.87,67.13c-5.58,0-3.4,9.45,0,12.84C10.27,76.58,12.71,67.13,6.87,67.13Z"/>\n    <polygon class="cls-2" points="8.7 67.82 1.84 70.31 1.84 63.44 8.7 65.93 8.7 67.82"/>\n    <polygon class="cls-2" points="5.11 65.93 11.98 63.44 11.98 70.31 5.11 67.82 5.11 65.93"/>\n    <path class="cls-1" d="M85,77.34c-5.58,0-3.4,9.45,0,12.84C88.41,86.79,90.84,77.34,85,77.34Z"/>\n    <polygon class="cls-2" points="86.84 78.03 79.97 80.51 79.97 73.65 86.84 76.14 86.84 78.03"/>\n    <polygon class="cls-2" points="83.25 76.14 90.11 73.65 90.11 80.51 83.25 78.03 83.25 76.14"/>\n  </svg>\n</ng-template>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/trinkets/wig/wig.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]])
    ], WigComponent);
    return WigComponent;
}(__WEBPACK_IMPORTED_MODULE_1__trinket_uniq_model__["a" /* TrinketUniqModel */]));

//# sourceMappingURL=wig.js.map

/***/ }),
/* 174 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LipsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__trinket_uniq_model__ = __webpack_require__(48);
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


var LipsComponent = /** @class */ (function (_super) {
    __extends(LipsComponent, _super);
    function LipsComponent(element) {
        return _super.call(this, 'lips', element.nativeElement) || this;
    }
    LipsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'lips',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/trinkets/lips/lips.html"*/'<ng-template trinket-uniq-part part-name="default">\n  <svg width="100" class="lips" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 86.16 54.06">\n   <path class="cls-1" d="M42.35,43.24a6.69,6.69,0,0,1,5.41-2.75H60.5A6.7,6.7,0,0,1,55.3,34v0A6.7,6.7,0,0,0,43.19,30,6.7,6.7,0,0,0,31.08,34a6.7,6.7,0,0,1-5.2,6.52H38A6.54,6.54,0,0,1,42.35,43.24Z"/>\n   <path class="cls-2" d="M62,40.66a6.7,6.7,0,0,1-1.49-.17H47.76a6.69,6.69,0,0,0-5.41,2.75A6.54,6.54,0,0,0,38,40.49H25.88a6.7,6.7,0,0,1-1.49.17h0a6.7,6.7,0,0,1,6.69,6.68v0a6.7,6.7,0,0,0,12.11,3.95A6.7,6.7,0,0,0,55.3,47.36,6.7,6.7,0,0,1,62,40.66h0Z"/>\n   <circle class="cls-3" cx="13.91" cy="13.91" r="13.91"/>\n   <circle class="cls-3" cx="72.24" cy="13.91" r="13.91"/>\n  </svg>\n\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="skeleton">\n  <svg class="lips" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 83.21 67.13">\n   <circle class="cls-1" cx="11.9" cy="11.9" r="11.9"/>\n   <circle class="cls-1" cx="71.31" cy="11.9" r="11.9"/>\n   <path class="cls-2" d="M40.86,56.31a6.69,6.69,0,0,1,5.41-2.75H59a6.7,6.7,0,0,1-5.2-6.51v0A6.7,6.7,0,0,0,41.7,43.08,6.7,6.7,0,0,0,29.59,47a6.7,6.7,0,0,1-5.2,6.52H36.48A6.54,6.54,0,0,1,40.86,56.31Z"/>\n   <path class="cls-3" d="M60.49,53.73A6.7,6.7,0,0,1,59,53.56H46.27a6.69,6.69,0,0,0-5.41,2.75,6.54,6.54,0,0,0-4.38-2.75H24.38a6.7,6.7,0,0,1-1.49.17h0a6.7,6.7,0,0,1,6.69,6.68v0a6.7,6.7,0,0,0,12.11,3.95A6.7,6.7,0,0,0,53.8,60.43a6.7,6.7,0,0,1,6.69-6.7h0Z"/>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="zombie">\n  <svg class="lips" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 89.54 76.51">\n    <path class="cls-1" d="M18,65.69a6.69,6.69,0,0,1,5.41-2.75H36.12a6.7,6.7,0,0,1-5.2-6.51v0a6.7,6.7,0,0,0-12.11-3.95A6.7,6.7,0,0,0,6.7,56.41a6.7,6.7,0,0,1-5.2,6.52H13.59A6.54,6.54,0,0,1,18,65.69Z"/>\n    <path class="cls-2" d="M37.6,63.11a6.7,6.7,0,0,1-1.49-.17H23.38A6.69,6.69,0,0,0,18,65.69a6.54,6.54,0,0,0-4.38-2.75H1.5A6.7,6.7,0,0,1,0,63.11H0A6.7,6.7,0,0,1,6.7,69.79v0a6.7,6.7,0,0,0,12.11,3.95,6.7,6.7,0,0,0,12.11-3.95,6.7,6.7,0,0,1,6.69-6.7h0Z"/>\n    <circle class="cls-3" cx="75.63" cy="13.91" r="13.91"/>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="mummy">\n  <svg class="lips" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.33 94.6">\n    <circle class="cls-1" cx="13.91" cy="13.91" r="13.91"/>\n    <circle class="cls-1" cx="108.41" cy="29.91" r="13.91"/>\n    <path class="cls-2" d="M59.47,83.77A6.69,6.69,0,0,1,64.88,81H77.62a6.7,6.7,0,0,1-5.2-6.51v0a6.7,6.7,0,0,0-12.11-3.95A6.7,6.7,0,0,0,48.2,74.5,6.7,6.7,0,0,1,43,81H55.09A6.54,6.54,0,0,1,59.47,83.77Z"/>\n    <path class="cls-3" d="M79.1,81.2A6.7,6.7,0,0,1,77.62,81H64.88a6.69,6.69,0,0,0-5.41,2.75A6.54,6.54,0,0,0,55.09,81H43a6.7,6.7,0,0,1-1.49.17h0a6.7,6.7,0,0,1,6.69,6.68v0a6.7,6.7,0,0,0,12.11,3.95A6.7,6.7,0,0,0,72.42,87.9a6.7,6.7,0,0,1,6.69-6.7h0Z"/>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="yaga">\n  <svg class="lips" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 57.13 43.11">\n    <path class="cls-1" d="M28.13,34.9a5.08,5.08,0,0,1,4.11-2.09h9.67A5.09,5.09,0,0,1,38,27.87h0a5.09,5.09,0,0,0-9.2-3,5.09,5.09,0,0,0-9.2,3,5.09,5.09,0,0,1-3.95,5H24.8A5,5,0,0,1,28.13,34.9Z"/>\n    <path class="cls-2" d="M43,32.94a5.09,5.09,0,0,1-1.13-.13H32.24a5.08,5.08,0,0,0-4.11,2.09,5,5,0,0,0-3.33-2.09H15.62a5.09,5.09,0,0,1-1.13.13h0A5.09,5.09,0,0,1,19.57,38h0a5.09,5.09,0,0,0,9.2,3A5.09,5.09,0,0,0,38,38,5.09,5.09,0,0,1,43,32.94h0Z"/>\n    <circle class="cls-3" cx="10.48" cy="10.48" r="10.48"/>\n    <circle class="cls-3" cx="46.65" cy="10.48" r="10.48"/>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="doctor">\n  <svg class="lips" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74.83 85.62">\n    <path class="cls-1" d="M36.85,74.8A6.69,6.69,0,0,1,42.26,72H55a6.7,6.7,0,0,1-5.2-6.51v0a6.7,6.7,0,0,0-12.11-3.95,6.7,6.7,0,0,0-12.11,3.95A6.7,6.7,0,0,1,20.38,72H32.47A6.54,6.54,0,0,1,36.85,74.8Z"/>\n    <path class="cls-2" d="M56.49,72.22A6.7,6.7,0,0,1,55,72H42.26a6.69,6.69,0,0,0-5.41,2.75A6.54,6.54,0,0,0,32.47,72H20.38a6.7,6.7,0,0,1-1.49.17h0a6.7,6.7,0,0,1,6.69,6.68v0a6.7,6.7,0,0,0,12.11,3.95A6.7,6.7,0,0,0,49.8,78.92a6.7,6.7,0,0,1,6.69-6.7h0Z"/>\n    <circle class="cls-3" cx="13.91" cy="13.91" r="13.91"/>\n    <circle class="cls-3" cx="60.91" cy="13.91" r="13.91"/>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="spider">\n  <svg class="lips" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 107.16 108.73">\n    <path class="cls-1" d="M52.25,19.25a6.69,6.69,0,0,1,5.41-2.75H70.39A6.7,6.7,0,0,1,65.19,10v0A6.7,6.7,0,0,0,53.08,6,6.7,6.7,0,0,0,41,10a6.7,6.7,0,0,1-5.2,6.52H47.87A6.54,6.54,0,0,1,52.25,19.25Z"/>\n    <path class="cls-2" d="M71.88,16.67a6.7,6.7,0,0,1-1.49-.17H57.66a6.69,6.69,0,0,0-5.41,2.75,6.54,6.54,0,0,0-4.38-2.75H35.77a6.7,6.7,0,0,1-1.49.17h0A6.7,6.7,0,0,1,41,23.35v0a6.7,6.7,0,0,0,12.11,3.95,6.7,6.7,0,0,0,12.11-3.95,6.7,6.7,0,0,1,6.69-6.7h0Z"/>\n    <path class="cls-1" d="M51.91,97.91a6.69,6.69,0,0,1,5.41-2.75H70.06a6.7,6.7,0,0,1-5.2-6.51v0a6.7,6.7,0,0,0-12.11-3.95,6.7,6.7,0,0,0-12.11,3.95,6.7,6.7,0,0,1-5.2,6.52H47.53A6.54,6.54,0,0,1,51.91,97.91Z"/>\n    <path class="cls-2" d="M71.54,95.34a6.7,6.7,0,0,1-1.49-.17H57.32a6.69,6.69,0,0,0-5.41,2.75,6.54,6.54,0,0,0-4.38-2.75H35.44a6.7,6.7,0,0,1-1.49.17h0A6.7,6.7,0,0,1,40.64,102v0A6.7,6.7,0,0,0,52.75,106,6.7,6.7,0,0,0,64.86,102a6.7,6.7,0,0,1,6.69-6.7h0Z"/>\n    <circle class="cls-3" cx="13.91" cy="13.91" r="13.91"/>\n    <circle class="cls-3" cx="93.25" cy="13.91" r="13.91"/>\n    <circle class="cls-3" cx="13.91" cy="91" r="13.91"/>\n    <circle class="cls-3" cx="93.25" cy="93.66" r="13.91"/>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="alien">\n  <svg class="lips" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 107.16 108.73">\n    <path class="cls-1" d="M42.35,43.24a6.69,6.69,0,0,1,5.41-2.75H60.5A6.7,6.7,0,0,1,55.3,34v0A6.7,6.7,0,0,0,43.19,30,6.7,6.7,0,0,0,31.08,34a6.7,6.7,0,0,1-5.2,6.52H38A6.54,6.54,0,0,1,42.35,43.24Z"/>\n    <path class="cls-2" d="M62,40.66a6.7,6.7,0,0,1-1.49-.17H47.76a6.69,6.69,0,0,0-5.41,2.75A6.54,6.54,0,0,0,38,40.49H25.88a6.7,6.7,0,0,1-1.49.17h0a6.7,6.7,0,0,1,6.69,6.68v0a6.7,6.7,0,0,0,12.11,3.95A6.7,6.7,0,0,0,55.3,47.36,6.7,6.7,0,0,1,62,40.66h0Z"/>\n    <circle class="cls-3" cx="13.91" cy="13.91" r="13.91"/>\n    <circle class="cls-3" cx="72.24" cy="13.91" r="13.91"/>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="yeti">\n  <svg class="lips" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 93.33 41.11">\n    <circle class="cls-1" cx="13.91" cy="13.91" r="13.91"/>\n    <circle class="cls-1" cx="79.41" cy="13.91" r="13.91"/>\n    <path class="cls-2" d="M46,30.29a6.69,6.69,0,0,1,5.41-2.75H64.11A6.7,6.7,0,0,1,58.91,21v0A6.7,6.7,0,0,0,46.8,17.06,6.7,6.7,0,0,0,34.69,21a6.7,6.7,0,0,1-5.2,6.52H41.59A6.54,6.54,0,0,1,46,30.29Z"/>\n    <path class="cls-3" d="M65.6,27.71a6.7,6.7,0,0,1-1.49-.17H51.38A6.69,6.69,0,0,0,46,30.29a6.54,6.54,0,0,0-4.38-2.75H29.49a6.7,6.7,0,0,1-1.49.17h0a6.7,6.7,0,0,1,6.69,6.68v0A6.7,6.7,0,0,0,46.8,38.36a6.7,6.7,0,0,0,12.11-3.95,6.7,6.7,0,0,1,6.69-6.7h0Z"/>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="ghost">\n  <svg class="lips" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 137.74 90.24">\n    <circle class="cls-1" cx="13.91" cy="13.91" r="13.91"/>\n    <circle class="cls-1" cx="123.83" cy="13.91" r="13.91"/>\n    <path class="cls-2" d="M67.91,79.42a6.69,6.69,0,0,1,5.41-2.75H86.06a6.7,6.7,0,0,1-5.2-6.51v0A6.7,6.7,0,0,0,68.75,66.2a6.7,6.7,0,0,0-12.11,3.95,6.7,6.7,0,0,1-5.2,6.52H63.53A6.54,6.54,0,0,1,67.91,79.42Z"/>\n    <path class="cls-3" d="M87.54,76.84a6.7,6.7,0,0,1-1.49-.17H73.32a6.69,6.69,0,0,0-5.41,2.75,6.54,6.54,0,0,0-4.38-2.75H51.44a6.7,6.7,0,0,1-1.49.17h0a6.7,6.7,0,0,1,6.69,6.68v0a6.7,6.7,0,0,0,12.11,3.95,6.7,6.7,0,0,0,12.11-3.95,6.7,6.7,0,0,1,6.69-6.7h0Z"/>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="wolf">\n  <svg class="lips" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 79.76 31.79">\n    <path class="cls-1" d="M61.87,19.75a6.69,6.69,0,0,1,4.3-4.29l12.11-3.93a6.7,6.7,0,0,1-7-4.58v0a6.7,6.7,0,0,0-12.74,0,6.7,6.7,0,0,0-10.3,7.49,6.7,6.7,0,0,1-2.93,7.81l11.5-3.73A6.54,6.54,0,0,1,61.87,19.75Z"/>\n    <path class="cls-2" d="M79.75,11.24a6.7,6.7,0,0,1-1.47.29L66.16,15.46a6.69,6.69,0,0,0-4.3,4.29,6.54,6.54,0,0,0-5-1.26l-11.5,3.73a6.7,6.7,0,0,1-1.36.62h0a6.7,6.7,0,0,1,8.42,4.29v0a6.7,6.7,0,0,0,12.74,0,6.7,6.7,0,0,0,10.3-7.49,6.7,6.7,0,0,1,4.29-8.44h0Z"/>\n    <circle class="cls-3" cx="13.91" cy="13.91" r="13.91"/>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="vampire">\n  <svg class="lips--vampire" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56.56 94.39">\n     <circle class="cls-1" cx="11.67" cy="11.67" r="11.67"/>\n     <circle class="cls-1" cx="44.89" cy="11.67" r="11.67"/>\n     <path class="cls-2" d="M27.3,58.88a6.69,6.69,0,0,1,5.41-2.75H45.44a6.7,6.7,0,0,1-5.2-6.51v0a6.7,6.7,0,0,0-12.11-3.95A6.7,6.7,0,0,0,16,49.6a6.7,6.7,0,0,1-5.2,6.52H22.92A6.54,6.54,0,0,1,27.3,58.88Z"/>\n     <path class="cls-3" d="M46.93,56.3a6.7,6.7,0,0,1-1.49-.17H32.71a6.69,6.69,0,0,0-5.41,2.75,6.54,6.54,0,0,0-4.38-2.75H10.82a6.7,6.7,0,0,1-1.49.17h0A6.7,6.7,0,0,1,16,63v0a6.7,6.7,0,0,0,12.11,3.95A6.7,6.7,0,0,0,40.24,63a6.7,6.7,0,0,1,6.69-6.7h0Z"/>\n     <polygon class="cls-4" points="18.2 94.39 13.6 56.29 22.79 56.29 18.2 94.39"/>\n     <polygon class="cls-4" points="38.01 94.39 33.42 56.29 42.6 56.29 38.01 94.39"/>\n  </svg>\n</ng-template>\n\n<ng-template trinket-uniq-part part-name="bed">\n  <svg class="lips--vampire" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41.57 27.56">\n    <circle class="cls-1" cx="5.71" cy="5.71" r="5.71"/>\n    <circle class="cls-1" cx="35.86" cy="5.71" r="5.71"/>\n    <path class="cls-2" d="M20.67,21.66a3.64,3.64,0,0,1,2.95-1.5h6.94a3.65,3.65,0,0,1-2.83-3.54h0a3.65,3.65,0,0,0-6.6-2.15,3.65,3.65,0,0,0-6.6,2.15,3.65,3.65,0,0,1-2.83,3.55h6.59A3.56,3.56,0,0,1,20.67,21.66Z"/>\n    <path class="cls-3" d="M31.36,20.26a3.65,3.65,0,0,1-.81-.09H23.61a3.64,3.64,0,0,0-2.95,1.5,3.56,3.56,0,0,0-2.39-1.5H11.69a3.65,3.65,0,0,1-.81.09h0a3.65,3.65,0,0,1,3.64,3.64h0a3.65,3.65,0,0,0,6.6,2.15,3.65,3.65,0,0,0,6.6-2.15,3.65,3.65,0,0,1,3.64-3.65h0Z"/>\n  </svg>\n</ng-template>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/trinkets/lips/lips.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]])
    ], LipsComponent);
    return LipsComponent;
}(__WEBPACK_IMPORTED_MODULE_1__trinket_uniq_model__["a" /* TrinketUniqModel */]));

//# sourceMappingURL=lips.js.map

/***/ }),
/* 175 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MonstersComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__monsters_host_directive__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__monsters_screen_directive__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__monsters_service__ = __webpack_require__(178);
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
/* 176 */
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
/* 177 */
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
/* 178 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MonstersService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__zombie_zombie__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__skeleton_skeleton__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alien_alien__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__bed_bed__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__spider_spider__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__vampire_vampire__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__wolf_wolf__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__mummy_mummy__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__yaga_yaga__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__doctor_doctor__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__yeti_yeti__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ghost_ghost__ = __webpack_require__(191);
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
                component: __WEBPACK_IMPORTED_MODULE_5__spider_spider__["a" /* SpiderComponent */],
            },
            {
                id: 5,
                anchor: 11,
                name: 'vampire',
                component: __WEBPACK_IMPORTED_MODULE_6__vampire_vampire__["a" /* VampireComponent */],
            },
            {
                id: 6,
                anchor: 9,
                name: 'wolf',
                component: __WEBPACK_IMPORTED_MODULE_7__wolf_wolf__["a" /* WolfComponent */],
            },
            {
                id: 7,
                name: 'mummy',
                component: __WEBPACK_IMPORTED_MODULE_8__mummy_mummy__["a" /* MummyComponent */],
            },
            {
                id: 8,
                name: 'yaga',
                component: __WEBPACK_IMPORTED_MODULE_9__yaga_yaga__["a" /* YagaComponent */],
            },
            {
                id: 9,
                name: 'doctor',
                component: __WEBPACK_IMPORTED_MODULE_10__doctor_doctor__["a" /* DoctorComponent */],
            },
            {
                id: 10,
                name: 'yeti',
                component: __WEBPACK_IMPORTED_MODULE_11__yeti_yeti__["a" /* YetiComponent */],
            },
            {
                id: 11,
                name: 'ghost',
                component: __WEBPACK_IMPORTED_MODULE_12__ghost_ghost__["a" /* GhostComponent */],
            },
            {
                id: 12,
                name: 'bed',
                component: __WEBPACK_IMPORTED_MODULE_4__bed_bed__["a" /* BedComponent */],
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
/* 179 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ZombieComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__monster_model__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__animation_animation_set_controller__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__animation_animation_sequence_controller__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_imports_loader_this_window_fix_module_exports_0_snapsvg_dist_snap_svg_js__ = __webpack_require__(302);
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
            var el = _this.getPart(function (p) { return p.name == 'mouth' && p.type == "element"; }).element;
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
            selector: 'zombie',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/zombie/zombie.html"*/'<svg monster-part part-type="root" width="95%" height="95%" viewBox="0 0 233.58 324.24" class="zombie svg-container" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n      <g class="">\n        <path monster-part part-name="body" part-type="group" part-outline="true" class="body" d="M260.9,280.8c0-64.94-53.13-118.07-118.07-118.07h0c-64.94,0-118.07,53.13-118.07,118.07V539.15H260.9Z"></path>\n        <g monster-part part-group="body" part-type="container"></g>\n        <g class="head" monster-part part-outline="true">\n          <g monster-part part-name="head-figure" part-type="group" class="head-figure">\n            <g monster-part part-name="hair" part-type="group"  class="hair">\n              <polygon points="132.33 -0.05 96.08 48.13 87.64 48.13 79.21 48.13 132.33 -0.05" class="hair-part"></polygon>\n              <polygon points="145.47 -0.05 109.21 48.13 100.78 48.13 92.34 48.13 145.47 -0.05" class="hair-part"></polygon>\n              <polygon points="158.6 -0.05 122.35 48.13 113.91 48.13 105.48 48.13 158.6 -0.05" class="hair-part"></polygon>\n            </g>\n            <rect x="18.13" y="47.84" width="168.14" height="168.14" rx="52.98" ry="52.98" class="face"></rect>\n          </g>\n\n          <g monster-part part-name="eyes" part-type="group" class="eyes">\n            <g monster-part part-name="eye" part-name-mod="left" part-type="group" part-group="eyes" class="eye eye--left">\n              <ellipse class="eyeball" cx="66.08" cy="97.54" rx="27.81" ry="16.86"></ellipse>\n              <circle monster-part part-name="pupil" part-name-mod="left" part-type="element" part-group="eye" class="pupil pupil--left" cx="74.18" cy="97.32" r="8.32"></circle>\n            </g>\n            <g monster-part part-name="eye" part-name-mod="right" part-type="group" part-group="eyes" class="eye eye--right">\n              <ellipse class="eyeball" cx="135.7" cy="97.54" rx="27.81" ry="16.86"></ellipse>\n              <circle monster-part part-name="pupil" part-name-mod="right" part-type="element" part-group="eye" class="pupil pupil--right" cx="142.93" cy="97.32" r="8.32"></circle>\n            </g>\n          </g>\n\n          <svg width="151.25" height="27.66" x="25" y="70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 138.93 26.58">\n            <g monster-part part-name="eyelashes" part-type="group" part-hidden="true" visibility="hidden" class="eyelashes">\n              <line class="eyelash" x1="0.71" y1="10.71" x2="15.87" y2="25.87"/>\n              <line class="eyelash" x1="2.37" y1="5.71" x2="17.54" y2="20.87"/>\n              <line class="eyelash" x1="4.04" y1="0.71" x2="19.21" y2="15.87"/>\n              <line class="eyelash" x1="119.72" y1="15.87" x2="134.89" y2="0.71"/>\n              <line class="eyelash" x1="121.39" y1="20.87" x2="136.55" y2="5.71"/>\n              <line class="eyelash" x1="123.05" y1="25.87" x2="138.22" y2="10.71"/>\n            </g>\n          </svg>\n\n          <g monster-part part-name="eyes-animation">\n            <clipPath id="eyeball--left-mask">\n              <ellipse class="" cx="66.08" cy="97.54" rx="27.81" ry="16.86"></ellipse>\n            </clipPath>\n            <ellipse monster-part part-name="lid" part-name-mod="left" part-type="element" part-group="eye" clip-path="url(#eyeball--left-mask)" class="eyeball eyeball--lid eyeball--left" cx="66.08" cy="64" rx="27.81" ry="16.86"></ellipse>\n\n            <clipPath id="eyeball--right-mask">\n              <ellipse class="" cx="135.7" cy="97.54" rx="27.81" ry="16.86"></ellipse>\n            </clipPath>\n            <ellipse monster-part part-name="lid" part-name-mod="right" part-type="element" part-group="eye" clip-path="url(#eyeball--right-mask)" class="eyeball eyeball--lid eyeball--right" cx="135.7" cy="64" rx="27.81" ry="16.86"></ellipse>\n          </g>\n          <g monster-part part-group="eyes" part-type="container"></g>\n          <g monster-part part-name="mouth" part-type="group">\n            <path monster-part part-name="mouth" part-type="element" d="M102.43,194c15.36,0,27.81-7.55,27.81-16.86H74.62C74.62,186.43,87.07,194,102.43,194Z" class="mouth"></path>\n          </g>\n          <g class="steams">\n            <g class="steam steam--left">\n             <line class="steam-part" x1="40.51" y1="170.93" x2="74.57" y2="204.99"></line>\n             <line class="steam-part" x1="50.73" y1="173.71" x2="43.3" y2="181.14"></line>\n             <line class="steam-part" x1="55.99" y1="178.98" x2="48.56" y2="186.41"></line>\n             <line class="steam-part" x1="61.26" y1="184.24" x2="53.84" y2="191.67"></line>\n             <line class="steam-part" x1="66.52" y1="189.5" x2="59.09" y2="196.94"></line>\n             <line class="steam-part" x1="71.79" y1="194.77" x2="64.35" y2="202.2"></line>\n            </g>\n\n            <g monster-part part-group="mouth" part-type="container"></g>\n            \n            <g class="steam steam--right">\n              <line x1="128.09" y1="159.01" x2="162.15" y2="124.95" class="steam-part"></line>\n              <line x1="130.88" y1="148.79" x2="138.31" y2="156.22" class="steam-part"></line>\n              <line x1="136.14" y1="143.53" x2="143.57" y2="150.96" class="steam-part"></line>\n              <line x1="141.4" y1="138.26" x2="148.84" y2="145.69" class="steam-part"></line>\n              <line x1="146.67" y1="133" x2="154.1" y2="140.43" class="steam-part"></line>\n              <line x1="151.93" y1="127.74" x2="159.36" y2="135.17" class="steam-part"></line>\n            </g>\n          </g>\n          <g monster-part part-group="nose" part-type="container"></g>\n          <g monster-part part-name="nose" part-type="group">\n            <path monster-part part-outline="true" d="M19.21,122.49A19.3,19.3,0,0,0,0,141.74H0A19.3,19.3,0,0,0,19.21,161h83.43v-38.5Z" class="nose"></path>\n          </g>\n          <g monster-part part-group="head-figure" part-type="container"></g>\n\n        </g>\n      </g>\n    </svg>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/zombie/zombie.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ApplicationRef */]])
    ], ZombieComponent);
    return ZombieComponent;
}(__WEBPACK_IMPORTED_MODULE_1__monster_model__["a" /* MonsterModel */]));

//# sourceMappingURL=zombie.js.map

/***/ }),
/* 180 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MonsterPartDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_uuid__ = __webpack_require__(296);
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
        this.hidden = false;
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
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('part-hidden'),
        __metadata("design:type", Boolean)
    ], MonsterPartDirective.prototype, "hidden", void 0);
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
/* 181 */
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
            selector: 'skeleton',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/skeleton/skeleton.html"*/'<svg class="skeleton svg-container" viewBox="0 0 200.62 322.01" width="90%" height="90%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n   <g class="">\n     <g monster-part part-name="body" part-type="group" part-outline="true" class="body">\n        <rect class="rib" y="227.64" width="200.62" height="21.55"></rect>\n        <rect class="rib" y="264.11" width="200.62" height="21.55"></rect>\n        <rect class="rib" y="300.59" width="200.62" height="21.55"></rect>\n     </g>\n     <g monster-part part-group="body" part-type="container"></g>\n      <g class="head">\n         <ellipse monster-part part-name="head-figure" part-type="group" class="head head--figure" cx="99.95" cy="67.37" rx="89.2" ry="67.38"></ellipse>\n         <g class="content">\n            <g monster-part part-name="mouth" part-type="group" class="jaws">\n               <g class="jaw jaw--top">\n                  <rect class="jaw" x="43.33" y="95.52" width="113.24" height="63.9"></rect>\n                  <g monster-part part-name="teeth" part-type="group" class="teeth">\n                     <rect class="tooth" x="53.24" y="143.29" width="10.75" height="10.75"></rect>\n                     <rect class="tooth" x="69.77" y="143.29" width="10.75" height="10.75"></rect>\n                     <rect class="tooth" x="86.3" y="143.29" width="10.75" height="10.75"></rect>\n                     <rect class="tooth" x="102.83" y="143.29" width="10.75" height="10.75"></rect>\n                     <rect class="tooth" x="119.37" y="143.29" width="10.75" height="10.75"></rect>\n                     <rect class="tooth" x="135.9" y="143.29" width="10.75" height="10.75"></rect>\n                  </g>\n               </g>\n               <g class="jaw jaw--bottom">\n                  <rect class="jaw" x="43.33" y="169.54" width="113.24" height="28.52"></rect>\n                  <g monster-part part-name="hidden-jaw" part-type="group" part-hidden="true" visibility="hidden">\n                    <rect class="jaw" x="43.33" y="149.54" width="113.24" height="28.52"></rect>\n                  </g>\n                  <g monster-part part-name="teeth" part-type="group" class="teeth">\n                     <rect class="tooth" x="53.24" y="178.43" width="10.75" height="10.75"></rect>\n                     <rect class="tooth" x="69.77" y="178.43" width="10.75" height="10.75"></rect>\n                     <rect class="tooth" x="86.3" y="178.43" width="10.75" height="10.75"></rect>\n                     <rect class="tooth" x="102.83" y="178.43" width="10.75" height="10.75"></rect>\n                     <rect class="tooth" x="119.37" y="178.43" width="10.75" height="10.75"></rect>\n                     <rect class="tooth" x="135.9" y="178.43" width="10.75" height="10.75"></rect>\n                  </g>\n               </g>\n            </g>\n            <svg width="139.9" height="25.56" x="30" y="34" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 104.32 20.25">\n              <g monster-part part-name="eyelashes" part-type="group" part-hidden="true" visibility="hidden" class="eyelashes">\n                <line class="eyelash" x1="0.71" y1="8.19" x2="12.06" y2="19.54"/>\n                <line class="eyelash" x1="1.95" y1="4.45" x2="13.3" y2="15.8"/>\n                <line class="eyelash" x1="3.2" y1="0.71" x2="14.55" y2="12.06"/>\n                <line class="eyelash" x1="89.77" y1="12.06" x2="101.12" y2="0.71"/>\n                <line class="eyelash" x1="91.02" y1="15.8" x2="102.37" y2="4.45"/>\n                <line class="eyelash" x1="92.26" y1="19.54" x2="103.61" y2="8.19"/>\n              </g>\n            </svg>\n            <g monster-part part-name="eyes" part-type="group" class="eyes">\n               <g monster-part part-name="eye" part-name-mod="left" part-type="group" part-group="eyes" class="eye eye--right">\n                  <circle class="eyeball" cx="129.44" cy="66.37" r="25.31"></circle>\n                  <circle class="pupil" cx="136.88" cy="58.14" r="10.09"></circle>\n               </g>\n               <g monster-part part-name="eye" part-name-mod="right" part-type="group" part-group="eyes" class="eye eye--left">\n                  <circle class="eyeball" cx="70.45" cy="66.37" r="25.31"></circle>\n                  <circle class="pupil" cx="72.84" cy="76.61" r="10.09"></circle>\n               </g>\n            </g>\n            <g monster-part part-group="mouth" part-type="container"></g>\n            <g monster-part part-group="eyes" part-type="container"></g>\n            <g monster-part part-group="nose" part-type="container"></g>\n            <g monster-part part-name="nose" part-type="group">\n              <polygon class="nose" points="99.95 91.72 112.37 113.24 124.8 134.76 99.95 134.76 75.09 134.76 87.52 113.24 99.95 91.72"></polygon>\n            </g>\n         </g>\n         <g monster-part part-group="head-figure" part-type="container"></g>\n      </g>\n   </g>\n</svg>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/skeleton/skeleton.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ApplicationRef */]])
    ], SkeletonComponent);
    return SkeletonComponent;
}(__WEBPACK_IMPORTED_MODULE_1__monster_model__["a" /* MonsterModel */]));

//# sourceMappingURL=skeleton.js.map

/***/ }),
/* 182 */
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
            selector: 'alien',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/alien/alien.html"*/'<svg class="alien svg-container" viewBox="0 0 165.37 302.36" width="80%" height="80%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n	<g class="">\n		<g monster-part part-name="body" part-type="group" part-outline="true" >\n			<ellipse class="body body--figure" cx="82.66" cy="285.78" rx="50.36" ry="139.24"></ellipse>\n		</g>\n\n		<g class="head">\n			<path monster-part part-name="head-figure" part-type="group" class="head head--figure" d="M82.67,153.65a39.12,39.12,0,0,1-33.88-19.56L5.25,58.69A39.13,39.13,0,0,1,39.13,0H126.2a39.13,39.13,0,0,1,33.88,58.69l-43.53,75.4A39.13,39.13,0,0,1,82.67,153.65Z"></path>\n			<g class="content">\n				<g monster-part part-name="mouth" part-type="group">\n					<path monster-part part-name="mouth" part-type="element" part-group="mouth" class="mouth" d="M82.66,131.54a2.83,2.83,0,0,1-2.45-1.41l-3.15-5.45a2.83,2.83,0,0,1,2.45-4.24h6.29a2.83,2.83,0,0,1,2.45,4.24l-3.15,5.45A2.83,2.83,0,0,1,82.66,131.54Z"></path>\n				</g>\n				<g monster-part part-name="eyes" part-type="group" class="eyes">\n					<g monster-part part-name="eye" part-name-mod="left" part-type="group" part-group="eyes" class="eye eye--left">\n						<path class="eyeball" d="M25.19,26.89A52.14,52.14,0,0,0,77.36,79.06,52.14,52.14,0,0,0,25.19,26.89Z"></path>\n						<circle class="iris" cx="51.86" cy="53.61" r="15.32"></circle>\n						<circle class="pupil" cx="51.86" cy="53.61" r="7.21"></circle>\n					</g>\n					<g monster-part part-name="eye" part-name-mod="right" part-type="group" part-group="eyes" class="eye eye--right">\n						<path class="eyeball" d="M140.14,26.89A52.14,52.14,0,0,0,88,79.06,52.14,52.14,0,0,0,140.14,26.89Z"></path>\n						<circle class="iris" cx="113.53" cy="53.61" r="15.32"></circle>\n						<circle class="pupil" cx="113.53" cy="53.61" r="4.75"></circle>\n					</g>\n				</g>\n        <g monster-part part-group="eyes" part-type="container"></g>\n				<g monster-part part-name="nose" part-type="group" class="nose">\n					<circle class="nostril nostril--left" cx="76.75" cy="99.18" r="2.49"></circle>\n					<circle class="nostril nostril--right" cx="88.6" cy="99.18" r="2.49"></circle>\n				</g>\n			</g>\n			<g monster-part part-group="head-figure" part-type="container"></g>\n			<g monster-part part-group="mouth" part-type="container"></g>\n			<g monster-part part-group="nose" part-type="container"></g>\n		</g>\n\n		<g monster-part part-group="body" part-type="container"></g>\n\n	</g>\n</svg>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/alien/alien.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ApplicationRef */]])
    ], AlienComponent);
    return AlienComponent;
}(__WEBPACK_IMPORTED_MODULE_1__monster_model__["a" /* MonsterModel */]));

//# sourceMappingURL=alien.js.map

/***/ }),
/* 183 */
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
            selector: 'bed',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/bed/bed.html"*/'<svg class="bed svg-container" width="85%" height="85%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 235.284 249.38">\n  <g class="monster">\n    <g monster-part part-name="head-figure" part-type="group">\n      <ellipse class="head-figure" cx="89.06" cy="176.45" rx="38.45" ry="62.44"/>\n    </g>\n\n    <g monster-part part-name="mouth" part-type="group" class="mouth">\n      <polygon class="tooth" points="72.44 221 70.86 211.2 74.03 211.2 72.44 221"/>\n      <polygon class="tooth" points="77.53 221 75.95 211.2 79.12 211.2 77.53 221"/>\n      <polygon class="tooth" points="82.63 221 81.04 211.2 84.21 211.2 82.63 221"/>\n    </g>\n\n    <g monster-part part-name="nose" part-type="group" class="nose">\n      <circle class="nostril" cx="74.79" cy="191.75" r="1.44"/>\n      <circle class="nostril" cx="80.28" cy="191.75" r="1.44"/>\n    </g>\n\n    <g monster-part part-name="eyes" part-type="group" class="eyes">\n      <g class="eye eye--left">\n        <path class="eyeball" d="M56.66,176.28a13.34,13.34,0,0,0,18.88,0A13.34,13.34,0,0,0,56.66,176.28Z" transform="translate(0 -0.4)"/>\n        <circle class="iris" cx="66.1" cy="175.87" r="3.99"/>\n      </g>\n\n       <g class="eye eye--right">\n        <path class="eyeball" d="M79.53,176.28a13.34,13.34,0,0,0,18.88,0A13.34,13.34,0,0,0,79.53,176.28Z" transform="translate(0 -0.4)"/>\n        <circle class="iris" cx="88.97" cy="175.87" r="3.99"/>\n      </g>\n    </g>\n\n    <g monster-part part-group="eyes" part-type="container"></g>\n\n    <g monster-part part-group="body" part-type="container"></g>\n\n    <g monster-part part-name="body" part-type="group" part-outline="true" class="body">\n      <rect x="130.76" y="206.74" width="117.63" height="23.46" rx="11.73" ry="11.73"/>\n      <rect x="130.76" y="215.26" width="6.04" height="34.12" rx="3.02" ry="3.02"/>\n      <rect x="138.11" y="215.26" width="6.04" height="34.12" rx="3.02" ry="3.02"/>\n      <rect x="145.45" y="215.26" width="6.04" height="34.12" rx="3.02" ry="3.02"/>\n      <rect x="152.8" y="207.67" width="6.04" height="30.92" rx="3.02" ry="3.02"/>\n    </g>\n  </g>\n\n  <g class="bed">\n    <g class="sheets">\n      <rect class="sheets" x="160.18" y="-29.29" width="15.05" height="311.22" transform="translate(294.02 -41.79) rotate(90)"/>\n      <rect class="sheets" x="159.92" y="-43.93" width="15.05" height="311.22" transform="translate(279.12 -56.17) rotate(90)"/>\n      <path class="sheets" d="M17.72,20.67A84.23,84.23,0,0,0,102,104.95,84.23,84.23,0,0,0,17.72,20.67Z" transform="translate(0 -0.4)"/>\n    </g>\n\n    <g class="frame">\n      <circle class="frame" cx="10.03" cy="10.03" r="10.03"/>\n      <rect class="frame" x="2.81" y="19.26" width="15.05" height="219.75"/>\n      <rect class="frame" x="159.92" y="-14.17" width="15.05" height="311.22" transform="translate(308.88 -26.4) rotate(90)"/>\n      <rect class="frame" x="319.84" y="46.22" width="15.05" height="192.8"/>\n      <rect class="blanket" x="155.67" y="52.54" width="120.11" height="208.48" transform="translate(372.5 -59.35) rotate(90)"/>\n    </g>\n  </g>\n\n  <g monster-part part-group="head-figure" part-type="container"></g>\n  <g monster-part part-group="mouth" part-type="container"></g>\n	<g monster-part part-group="nose" part-type="container"></g>\n</svg>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/bed/bed.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ApplicationRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ApplicationRef */]) === "function" && _e || Object])
    ], BedComponent);
    return BedComponent;
    var _a, _b, _c, _d, _e;
}(__WEBPACK_IMPORTED_MODULE_1__monster_model__["a" /* MonsterModel */]));

//# sourceMappingURL=bed.js.map

/***/ }),
/* 184 */
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
            selector: 'spider',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/spider/spider.html"*/'<svg class="spider svg-container" viewBox="-35 80 335 243" width="90%" height="90%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n   <g class="">\n      <line class="web decor__web" x1="131.28" y1="-370.69" x2="131.28" y2="73.95"></line>\n      <g class="body">\n         <g class="legs">\n            <g class="legs-pair legs-pair--top">\n               <polyline class="leg leg--left" points="16.65 99.33 51.1 64.87 85.55 99.33"></polyline>\n               <polyline class="leg leg--left" points="16.65 119.89 51.1 85.44 85.55 119.89"></polyline>\n               <polyline class="leg leg--left" points="16.65 140.45 51.1 106 85.55 140.45"></polyline>\n               <polyline class="leg leg--right" points="179.35 99.33 213.81 64.87 248.26 99.33"></polyline>\n               <polyline class="leg leg--right" points="179.35 119.89 213.81 85.44 248.26 119.89"></polyline>\n               <polyline class="leg leg--right" points="179.35 140.45 213.81 106 248.26 140.45"></polyline>\n            </g>\n            <g class="legs-pair legs-pair--bottom">\n               <polyline class="leg leg--left" points="-28.89 218.03 19.11 170.03 67.11 218.03"></polyline>\n               <polyline class="leg leg--left" points="-28.89 246.68 19.11 198.68 67.11 246.68"></polyline>\n               <polyline class="leg leg--left" points="-28.89 275.32 19.11 227.32 67.11 275.32"></polyline>\n               <polyline class="leg leg--right" points="197.79 218.03 245.79 170.03 293.79 218.03"></polyline>\n               <polyline class="leg leg--right" points="197.79 246.68 245.79 198.68 293.79 246.68"></polyline>\n               <polyline class="leg leg--right" points="197.79 275.32 245.79 227.32 293.79 275.32"></polyline>\n            </g>\n         </g>\n\n         <g monster-part part-name="body" part-type="group" part-outline="true" class="body-figure">\n            <ellipse class="body-part body-part--colored" cx="132.45" cy="259.43" rx="74.06" ry="47.7"></ellipse>\n            <ellipse class="body-part" cx="132.45" cy="209.44" rx="74.06" ry="47.7"></ellipse>\n            <ellipse class="body-part body-part--colored" cx="132.45" cy="163.61" rx="74.06" ry="47.7"></ellipse>\n            <ellipse class="body-part" cx="132.45" cy="115.29" rx="74.06" ry="47.7"></ellipse>\n            <g class="decor">\n               <g monster-part part-name="mouth-decor" part-type="element" class="mouth decor__mouth">\n                  <polygon class="tooth" points="112.44 244.6 109.19 224.94 115.68 224.94 112.44 244.6"></polygon>\n                  <polygon class="tooth" points="126.44 244.6 123.2 224.94 129.69 224.94 126.44 244.6"></polygon>\n                  <polygon class="tooth" points="139.93 244.6 136.69 224.94 143.18 224.94 139.93 244.6"></polygon>\n                  <polygon class="tooth" points="153.94 244.6 150.69 224.94 157.18 224.94 153.94 244.6"></polygon>\n               </g>\n               <polygon class="sting decor__sting" points="130.6 327.09 127.36 307.43 133.85 307.43 130.6 327.09"></polygon>\n            </g>\n         </g>\n         <g monster-part part-group="body" part-type="container"></g>\n      </g>\n      <g monster-part part-name="head-figure" part-type="group" class="head">\n        <svg width="119.23" height="28.95" x="73" y="42" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 106.07 26.22">\n          <g monster-part part-name="eyelashes" part-type="group" part-hidden="true" visibility="hidden" class="eyelashes">\n            <line class="eyelash" x1="0.69" y1="10.53" x2="12.24" y2="25.7"/>\n            <line class="eyelash" x1="1.96" y1="5.53" x2="13.51" y2="20.7"/>\n            <line class="eyelash" x1="3.23" y1="0.53" x2="14.78" y2="15.7"/>\n            <line class="eyelash" x1="91.29" y1="15.7" x2="102.84" y2="0.53"/>\n            <line class="eyelash" x1="92.56" y1="20.7" x2="104.1" y2="5.53"/>\n            <line class="eyelash" x1="93.83" y1="25.7" x2="105.37" y2="10.53"/>\n          </g>\n        </svg>\n\n         <g monster-part part-name="eyes" part-type="group" class="eyes">\n            <g monster-part part-name="eye" part-name-mod="left" part-type="group" class="eye eye--left">\n               <circle class="eyeball" cx="110.35" cy="104.04" r="17.91"></circle>\n               <circle class="pupil" cx="110.35" cy="104.04" r="9.83"></circle>\n            </g>\n            <g monster-part part-name="eye" part-name-mod="right" part-type="group" class="eye eye--right">\n               <circle class="eyeball" cx="154.55" cy="104.04" r="17.91"></circle>\n               <circle class="pupil" cx="154.55" cy="104.04" r="9.83"></circle>\n            </g>\n         </g>\n         <g monster-part part-group="eyes" part-type="container"></g>\n         <g monster-part part-name="mouth" part-type="group"  class="mouth">\n            <polygon class="tooth" points="124.93 145.45 121.69 125.79 128.18 125.79 124.93 145.45"></polygon>\n            <polygon class="tooth" points="138.93 145.45 135.69 125.79 142.18 125.79 138.93 145.45"></polygon>\n         </g>\n      </g>\n      <g monster-part part-group="head-figure" part-type="container"></g>\n      <g monster-part part-group="mouth" part-type="container"></g>\n      <g monster-part part-name="nose" part-type="group">\n        <rect fill="rgba(0,0,0,0)" x="140" y="134" width="1" height="1"></rect>\n      </g>\n      <g monster-part part-group="nose" part-type="container"></g>\n   </g>\n</svg>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/spider/spider.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ApplicationRef */]])
    ], SpiderComponent);
    return SpiderComponent;
}(__WEBPACK_IMPORTED_MODULE_1__monster_model__["a" /* MonsterModel */]));

//# sourceMappingURL=spider.js.map

/***/ }),
/* 185 */
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
            selector: 'vampire',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/vampire/vampire.html"*/'<svg class="dracula svg-container" viewBox="0 0 206.58 334.71" width="90%" height="95%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n   <g class="">\n      <g monster-part part-name="body" part-type="group" part-outline="true" class="body">\n         <polygon class="body-part body-part--top" points="145.49 266.49 61.06 266.49 -0.03 166.71 206.59 166.71 145.49 266.49"></polygon>\n         <polygon class="body-part body-part--bottom" points="145 266.49 61.06 266.49 -34.33 620.09 240.88 620.09 145.49 266"></polygon>\n      </g>\n      <g monster-part part-group="body" part-type="container"></g>\n      <g class="head">\n         <g monster-part part-name="head-figure" part-type="group" class="head-figure">\n            <path class="hair-part hair-part--back" d="M79.78,3.64A30.21,30.21,0,0,1,69.23,51a30.2,30.2,0,1,0,34.49,48.06A49.66,49.66,0,1,0,79.78,3.64Z"></path>\n            <ellipse class="face" cx="103.28" cy="141.3" rx="32.84" ry="101.27"></ellipse>\n            <path class="hair-part hair-part--forward" d="M115,29.3a44.77,44.77,0,0,1-44.8,44.8l9-19.38,19-19.81Z"></path>\n         </g>\n         <g class="ears">\n            <ellipse class="ear ear--left" cx="71.4" cy="115.56" rx="13.66" ry="18.22"></ellipse>\n            <ellipse class="ear ear--right" cx="135.15" cy="115.56" rx="13.66" ry="18.22"></ellipse>\n         </g>\n\n         <g monster-part part-name="mouth" part-type="group" class="mouth">\n            <g monster-part part-name="teeth" part-type="group" class="teeth">\n               <polygon class="tooth tooth--left" points="90.39 244.06 84.3 193.54 96.48 193.54 90.39 244.06"></polygon>\n               <polygon class="tooth tooth--right" points="116.67 244.06 110.58 193.54 122.75 193.54 116.67 244.06"></polygon>\n            </g>\n            <rect monster-part part-name="mouth-figure" part-type="element" class="mouth-figure" x="82" y="190.5" width="42.86" height="6.03"></rect>\n            <path class="blood decor__blood" d="M120.05,267.44a2.51,2.51,0,1,1-5,.13c0-1.57.9-8.55,2.27-8.59S120,265.87,120.05,267.44Z"></path>\n         </g>\n         \n         <g monster-part part-group="mouth" part-type="container"></g>\n         <g monster-part part-group="nose" part-type="container"></g>\n         <g monster-part part-name="nose" part-type="group">\n           <rect class="nose" x="99.92" y="93.91" width="6.03" height="87.44"></rect>\n         </g>\n         <g monster-part part-name="eyes" part-type="group" class="eyes">\n            <circle monster-part part-name="eye" part-name-mod="left" part-type="element" part-group="eyes" class="eye eye--left" cx="88.29" cy="108.56" r="6.46"></circle>\n            <circle monster-part part-name="eye" part-name-mod="right" part-type="element" part-group="eyes" class="eye eye--right" cx="118.01" cy="108.56" r="6.46"></circle>\n            <rect class="eyebrows" x="81.9" y="89.55" width="42.86" height="6.03"></rect>\n         </g>\n         <g monster-part part-group="eyes" part-type="container"></g>\n         <g monster-part part-group="head-figure" part-type="container"></g>\n      </g>\n   </g>\n</svg>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/vampire/vampire.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ApplicationRef */]])
    ], VampireComponent);
    return VampireComponent;
}(__WEBPACK_IMPORTED_MODULE_1__monster_model__["a" /* MonsterModel */]));

//# sourceMappingURL=vampire.js.map

/***/ }),
/* 186 */
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
            selector: 'wolf',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/wolf/wolf.html"*/'<svg class="wolf svg-container" viewBox="0 0 264.56 322.51" width="90%" height="90%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n   <g class="wolf">\n     <g monster-part part-name="body" part-type="group" part-outline="true">\n       <rect class="body" x="-21" y="192.5" width="194.13" height="465.27"></rect>\n     </g>\n     <g monster-part part-group="body" part-type="container"></g>\n      <g class="head">\n         <g monster-part part-name="mouth" part-type="group" class="mouth">\n            <rect monster-part part-name="tongue" part-type="element" part-group="mouth" class="tongue" x="24.31" y="119.4" width="226.72" height="55.94" rx="27.93" ry="27.97"></rect>\n            <rect monster-part part-name="jaw" part-type="element" part-group="mouth" class="jaw" x="23.78" y="175.24" width="195.57" height="20.31"></rect>\n            <rect class="cheek" x="23.78" y="106.91" width="125.28" height="74.65"></rect>\n            <g monster-part part-name="teeth" part-type="group" part-group="mouth" class="teeth">\n               <polygon class="tooth" points="205.91 175.57 199.15 119.4 212.68 119.4 205.91 175.57"></polygon>\n               <polygon class="tooth" points="184.59 175.57 177.82 119.4 191.35 119.4 184.59 175.57"></polygon>\n               <polygon class="tooth" points="163.26 175.57 156.49 119.4 170.03 119.4 163.26 175.57"></polygon>\n            </g>\n            <g monster-part part-name="drooling" part-type="group" part-group="mouth" class="drooling decor__drooling">\n               <path class="saliva" d="M221.84,134.24a2.35,2.35,0,1,1-4.65.12c0-1.47.84-8,2.13-8S221.8,132.77,221.84,134.24Z"></path>\n               <path class="saliva" d="M229.73,188.83a2.35,2.35,0,1,1-4.65.12c0-1.47.84-8,2.13-8S229.7,187.36,229.73,188.83Z"></path>\n               <path class="saliva" d="M197.77,178.05a2.35,2.35,0,1,1-4.65.12c0-1.47.84-8,2.13-8S197.73,176.58,197.77,178.05Z"></path>\n               <path class="saliva" d="M176.22,161.17a2.35,2.35,0,1,1-4.65.12c0-1.47.84-8,2.13-8S176.19,159.7,176.22,161.17Z"></path>\n            </g>\n            <g monster-part part-name="jaw-closed" part-type="group" part-hidden="true" visibility="hidden">\n              <svg width="195.56" height="86.75" x="23.8" y="106" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 195.57 86.75">\n                <polygon class="jaw" points="195.57 31.96 0 84 0 11.66 195.57 11.66 195.57 31.96"/>\n                <rect class="jaw" width="149.14" height="86.75"/>\n              </svg>\n            </g>\n         </g>\n\n\n\n         <polygon class="snout" points="219.34 119.39 23.78 119.39 23.78 61.81 219.34 96.35 219.34 119.39"></polygon>\n         <g class="ears">\n           <polygon class="ear ear--left" points="46.7 0.05 23.78 56.72 69.63 56.72 46.7 0.05"></polygon>\n           <polygon class="ear ear--right" points="91.45 0.05 68.53 56.72 114.38 56.72 91.45 0.05"></polygon>\n         </g>\n         <rect monster-part part-name="head-figure" part-type="group" class="face" x="23.78" y="56.1" width="125.28" height="74.65"></rect>\n         <g monster-part part-name="eyes" part-type="group" class="eyes">\n            <g monster-part part-name="eye" part-name-mod="left" part-type="group" part-group="eyes" class="eye eye--left">\n               <g class="eyeball">\n                  <path class="eyeball-part eyeball-part--top" d="M53.75,82.9a22.69,22.69,0,0,0,32.1,0"></path>\n                  <path class="eyeball-part eyeball-part--bottom" d="M85.86,82.9a22.69,22.69,0,0,0-32.1,0"></path>\n               </g>\n               <g class="pupil">\n                  <path class="pupil-part pupil-part--top" d="M69.8,76.25a9.41,9.41,0,0,0,0,13.31"></path>\n                  <path class="pupil-part pupil-part--bottom" d="M69.8,89.56a9.41,9.41,0,0,0,0-13.31"></path>\n               </g>\n            </g>\n            <g monster-part part-name="eye" part-name-mod="right" part-type="group" part-group="eyes" class="eye eye--right">\n               <g class="eyeball">\n                  <path class="eyeball-part eyeball-part--top" d="M95,82.9a22.69,22.69,0,0,0,32.1,0"></path>\n                  <path class="eyeball-part eyeball-part--bottom" d="M127.11,82.9a22.69,22.69,0,0,0-32.1,0"></path>\n               </g>\n               <g class="pupil">\n                  <path class="pupil-part pupil-part--top" d="M111.06,76.25a9.41,9.41,0,0,0,0,13.31"></path>\n                  <path class="pupil-part pupil-part--bottom" d="M111.06,89.56a9.41,9.41,0,0,0,0-13.31"></path>\n               </g>\n            </g>\n         </g>\n         <g monster-part part-group="eyes" part-type="container"></g>\n         <g monster-part part-group="head-figure" part-type="container"></g>\n\n      </g>\n      <g monster-part part-group="mouth" part-type="container"></g>\n      <g monster-part part-group="nose" part-type="container"></g>\n      <g monster-part part-name="nose" part-type="group" class="nose">\n         <circle class="nose-figure" cx="218.98" cy="95.93" r="8.93"></circle>\n      </g>\n   </g>\n</svg>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/wolf/wolf.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ApplicationRef */]])
    ], WolfComponent);
    return WolfComponent;
}(__WEBPACK_IMPORTED_MODULE_1__monster_model__["a" /* MonsterModel */]));

//# sourceMappingURL=wolf.js.map

/***/ }),
/* 187 */
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
            selector: 'mummy',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/mummy/mummy.html"*/'<svg monster-part part-type="root" width="90%" height="90%"  class="mummy svg-container" viewBox="0 0 252.32 300" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n<!-- <svg monster-part part-type="root" width="80%" height="80%"  class="mummy svg-container" viewBox="0 0 266.33 334.62" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> -->\n   <g class="">\n      <g monster-part part-name="body" part-type="group" part-outline="true" class="body">\n         <!-- <path class="bandage decor__bandage body__bandage" d="M364.14,242.55c-12.14,0-12.14,13.71-24.29,13.71s-12.14-13.71-24.29-13.71-12.14,13.71-24.27,13.71S279.17,242.55,267,242.55s-12.13,13.71-24.26,13.71-12.13-13.71-24.26-13.71-12.13,13.71-24.26,13.71S182.13,242.55,170,242.55V269.8c12.13,0,12.13,13.71,24.26,13.71s12.13-13.71,24.26-13.71,12.13,13.71,24.26,13.71S254.91,269.8,267,269.8s12.13,13.71,24.25,13.71,12.14-13.71,24.27-13.71,12.14,13.71,24.29,13.71S352,269.8,364.14,269.8Z"></path> -->\n         <path class="body-part" d="M216.21,255.72a163.68,163.68,0,0,0-83.74-23h0A164.49,164.49,0,0,0,17.82,279.36l48,20.83Z"></path>\n         <path class="body-part" d="M-11.92,318.07H5.39l60.45-17.88-48-20.83A166.73,166.73,0,0,0-11.92,318.07Z"></path>\n         <!-- <path class="body-part body-part--dark" d="M-15.12,324.14l20.51-6.07H-11.92C-13,320.07-14.09,322.1-15.12,324.14Z"></path> -->\n         <path class="body-part body-part--dark" d="M216.21,255.72,65.84,300.19,5.39,318.07l-20.51,6.07a163.48,163.48,0,0,0-17.35,67.41c0,.05,0,.11,0,.17l309.16-73.95A167,167,0,0,0,216.21,255.72Z"></path>\n         <!-- <path class="body-part" d="M276.88,318.07l-.19-.31L-32.47,391.72c-.08,2-.16,4.05-.16,6.1v7.94l171.23,15.94L257,391.55l12.28-3.13,27.52-7A163.59,163.59,0,0,0,276.88,318.07Z"></path> -->\n      </g>\n      <g class="head">\n         <path class="bandage bandage--head decor__bandage head__bandage" d="M270.44,14.09c-7.59,0-7.59,8.56-15.17,8.56s-7.59-8.56-15.17-8.56-7.58,8.56-15.16,8.56-7.58-8.56-15.15-8.56-7.58,8.56-15.16,8.56-7.58-8.56-15.15-8.56-7.58,8.56-15.15,8.56-7.58-8.56-15.15-8.56v17c7.58,0,7.58,8.56,15.15,8.56s7.58-8.56,15.15-8.56,7.58,8.56,15.15,8.56,7.58-8.56,15.16-8.56,7.58,8.56,15.15,8.56,7.58-8.56,15.16-8.56,7.59,8.56,15.17,8.56,7.59-8.56,15.17-8.56Z"></path>\n         <g monster-part part-outline="true" class="ears">\n            <circle class="ear ear--ear-left" cx="61.37" cy="110.92" r="22.96"></circle>\n            <circle class="ear ear--ear-right" cx="203.59" cy="110.92" r="22.96"></circle>\n         </g>\n         <g monster-part part-name="head-figure" part-type="group" part-outline="true" class="head-figure">\n            <path class="head-part" d="M132.48,0C115,0,99,10.15,86.48,27L192.57,52.62C179.62,20.89,157.55,0,132.48,0Z"></path>\n            <path class="head-part head-part--dark" d="M192.57,52.62,86.48,27C75.15,42.38,66.74,63.27,62.78,87.16l130.41-33C193,53.67,192.79,53.14,192.57,52.62Z"></path>\n            <path class="head-part head-part--empty" d="M193.19,54.2,80.54,82.67l75.09,17.26,45.85-16.81A160.27,160.27,0,0,0,193.19,54.2Z"></path>\n            <path class="head-part" d="M62.78,87.16a189.68,189.68,0,0,0-2.53,31c0,5.6.26,11.11.72,16.5l94.65-34.71L80.54,82.67Z"></path>\n            <path class="head-part head-part--dark" d="M62.33,146.29,203,143.48a191.36,191.36,0,0,0,1.68-25.34,188.5,188.5,0,0,0-3.23-35L61,134.64Q61.48,140.56,62.33,146.29Z"></path>\n            <path class="head-part" d="M64.24,156.85l128.89,25.39A165.12,165.12,0,0,0,203,143.48L62.33,146.29Q63.14,151.67,64.24,156.85Z"></path>\n            <path class="head-part head-part--dark" d="M64.68,158.76a150.89,150.89,0,0,0,11.06,32.42l110,6.67c1.22-2.19,2.39-4.46,3.5-6.8Z"></path>\n            <path class="head-part" d="M132.48,236.28c21.11,0,40.09-14.82,53.3-38.43l-110-6.67C89,218.64,109.45,236.28,132.48,236.28Z"></path>\n         </g>\n         <g monster-part part-name="nose" part-type="group">\n           <rect fill="rgba(0,0,0,0)" x="132.5" y="144" width="1" height="1"></rect>\n         </g>\n\n         <g monster-part part-group="head-figure" part-type="container"></g>\n\n         <g monster-part part-name="mouth" part-type="group" class="mouth">\n            <path monster-part part-name="mouth" part-type="element" part-group="mouth" class="mouth-figure" d="M193.13,182.24,64.24,156.85c.14.64.29,1.27.43,1.91l124.6,32.29Q191.32,186.79,193.13,182.24Z"></path>\n            <polygon class="tooth" points="145.34 186.66 134.48 186.66 134.48 170.68 145.34 172.81 145.34 186.66"></polygon>\n         </g>\n         <g monster-part part-name="mouth-fraud" part-type="group" part-hidden="true" visibility="hidden" class="mouth">\n            <path monster-part part-name="mouth--fraud" part-type="element" part-group="mouth" class="mouth-figure mouth-figure--dark" d="M193.13,182.24,64.24,156.85c.14.64.29,1.27.43,1.91l124.6,32.29Q191.32,186.79,193.13,182.24Z"></path>\n         </g>\n\n         <svg width="18.5" height="25.16" x="85" y="60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.91 26.58">\n           <g monster-part part-name="eyelashes" part-type="group" part-hidden="true" visibility="hidden" class="eyelashes">\n             <line class="eyelash" x1="0.71" y1="10.71" x2="15.87" y2="25.87"/>\n             <line class="eyelash" x1="2.37" y1="5.71" x2="17.54" y2="20.87"/>\n             <line class="eyelash" x1="4.04" y1="0.71" x2="19.21" y2="15.87"/>\n           </g>\n         </svg>\n\n         <g monster-part part-name="eyes" part-type="group" class="eyes">\n            <g monster-part part-name="eye" part-name-mod="left" part-type="group" part-group="eyes" class="eye eye--left">\n               <circle class="eyeball" cx="102.5" cy="82.46" r="8.94"></circle>\n               <circle class="pupil" cx="102.5" cy="82.46" r="4.41"></circle>\n            </g>\n            <g monster-part part-name="eye" part-name-mod="right" part-type="group" part-group="eyes" class="eye eye--right">\n               <circle class="eyeball" cx="161.09" cy="82.46" r="8.94"></circle>\n               <circle class="pupil" cx="161.09" cy="82.46" r="4.41"></circle>\n            </g>\n         </g>\n\n         <g monster-part part-group="eyes" part-type="container"></g>\n      </g>\n      <g monster-part part-group="body" part-type="container"></g>\n      <g monster-part part-group="mouth" part-type="container"></g>\n      <g monster-part part-group="nose" part-type="container"></g>\n   </g>\n</svg>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/mummy/mummy.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ApplicationRef */]])
    ], MummyComponent);
    return MummyComponent;
}(__WEBPACK_IMPORTED_MODULE_1__monster_model__["a" /* MonsterModel */]));

//# sourceMappingURL=mummy.js.map

/***/ }),
/* 188 */
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
            selector: 'yaga',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/yaga/yaga.html"*/'<svg width="80%" height="80%" class="yaga svg-container" viewBox="0 0 233.58 324.24" width="auto" height="95%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n   <g class="">\n      <g monster-part part-name="body" part-type="group" part-outline="true" class="body">\n         <path class="body-figure" d="M0,526.25V299.52a69.37,69.37,0,0,1,69.17-69.17h44.62V525.5Z"></path>\n         <g class="ornament decor__ornament">\n            <circle class="ornament-part" cx="31.56" cy="265.47" r="4.89"></circle>\n            <circle class="ornament-part" cx="54.23" cy="252.58" r="4.89"></circle>\n            <circle class="ornament-part" cx="17.78" cy="291.7" r="4.89"></circle>\n            <circle class="ornament-part" cx="94.23" cy="313.03" r="4.89"></circle>\n         </g>\n      </g>\n      <g monster-part part-group="body" part-type="container"></g>\n      <g class="head">\n         <g monster-part part-name="head-figure" part-type="group" class="head-figure">\n            <g class="shawl shawl--decor__shawl">\n               <path class="shawl-part" d="M96.38.07a196.7,196.7,0,0,1,0,278.33A196.7,196.7,0,0,1,96.38.07Z"></path>\n               <path class="shawl-part" d="M26.33,330.41A73.62,73.62,0,0,1,100,256.75,73.62,73.62,0,0,1,26.33,330.41Z"></path>\n               <path class="shawl-part" d="M92.76,256.75a73.62,73.62,0,0,1,73.66,73.66A73.62,73.62,0,0,1,92.76,256.75Z"></path>\n               <circle class="shawl-part" cx="96.38" cy="269.15" r="26.63"></circle>\n            </g>\n            <rect class="face" x="72.11" y="38.2" width="48.53" height="202.49" rx="24.27" ry="24.27"></rect>\n         </g>\n\n         <svg width="44.52" height="17.22" x="74" y="54" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.13 12.33">\n           <g monster-part part-name="eyelashes" part-type="group" part-hidden="true" visibility="hidden" class="eyelashes">\n             <line class="eyelash" x1="26.14" x2="26.14" y2="9"/>\n             <line class="eyelash" x1="29.31" x2="29.31" y2="9"/>\n             <line class="eyelash" x1="32.48" x2="32.48" y2="9"/>\n             <line class="eyelash" x1="0.65" y1="3.33" x2="0.65" y2="12.33"/>\n             <line class="eyelash" x1="3.82" y1="3.33" x2="3.82" y2="12.33"/>\n             <line class="eyelash" x1="6.98" y1="3.33" x2="6.98" y2="12.33"/>\n           </g>\n         </svg>\n\n         <g monster-part part-name="eyes" part-type="group" class="eyes">\n            <g monster-part part-name="eye" part-name-mod="left" part-type="group" part-group="eyes" class="eye eye--left">\n               <circle class="eyeball" cx="79.94" cy="81" r="11.98"></circle>\n               <circle class="pupil" cx="79.94" cy="81" r="6.14"></circle>\n            </g>\n            <g monster-part part-name="eye" part-name-mod="right" part-type="group" part-group="eyes" class="eye eye--right">\n               <circle class="eyeball" cx="112.78" cy="81" r="15.2"></circle>\n               <circle class="pupil" cx="112.78" cy="81" r="7.79"></circle>\n            </g>\n         </g>\n				 <g monster-part part-group="eyes" part-type="container"></g>\n         <g monster-part part-name="mouth" part-type="group" class="mouth">\n            <rect class="mouth-figure" x="81.54" y="185.9" width="39.1" height="8.83"></rect>\n            <rect class="tooth" x="94.68" y="185.9" width="4.48" height="4.48"></rect>\n            <rect class="tooth" x="102.67" y="185.9" width="4.48" height="4.48"></rect>\n         </g>\n         <g monster-part part-group="head-figure" part-type="container"></g>\n         <g monster-part part-group="mouth" part-type="container"></g>\n         <g monster-part part-group="nose" part-type="container"></g>\n        <g monster-part part-name="nose" part-type="group">\n          <path class="nose" d="M96.62,109a13.69,13.69,0,0,1,12.54,13.6V157H96.62Z"></path>\n        </g>\n      </g>\n   </g>\n</svg>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/yaga/yaga.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ApplicationRef */]])
    ], YagaComponent);
    return YagaComponent;
}(__WEBPACK_IMPORTED_MODULE_1__monster_model__["a" /* MonsterModel */]));

//# sourceMappingURL=yaga.js.map

/***/ }),
/* 189 */
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
            selector: 'doctor',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/doctor/doctor.html"*/'<svg width="80%" height="80%" class="doctor svg-container" viewBox="0 0 150.13 337.94" width="auto" height="96%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n   <g class="">\n     <g monster-part part-name="body" part-type="group" part-outline="true" >\n       <path class="body" d="M150.15,332a75.32,75.32,0,0,0-75.1-75.1h0A75.32,75.32,0,0,0,0,332V761.33h150.2Z"></path>\n     </g>\n      <g monster-part part-group="body" part-type="container"></g>\n      <g class="head">\n         <ellipse  monster-part part-name="head-figure" part-type="group" class="head-figure" cx="75.42" cy="173.19" rx="49.17" ry="117.42"></ellipse>\n         <g class="hat decor__hat">\n            <rect class="hat-figure" x="40.23" width="70.38" height="90.75"></rect>\n            <rect class="cross cross--vertical" x="69.55" y="22.99" width="11.74" height="51.37"></rect>\n            <rect class="cross cross--horizontal" x="50" y="42.8" width="51.37" height="11.74"></rect>\n         </g>\n         <g class="ears">\n            <ellipse class="ear ear--left" cx="25.38" cy="169.88" rx="11.3" ry="26.99"></ellipse>\n            <ellipse class="ear ear--right" cx="124.87" cy="169.88" rx="11.3" ry="26.99"></ellipse>\n         </g>\n         <g monster-part part-name="eyes" part-type="group" class="eyes">\n            <circle monster-part part-name="eye" part-name-mod="left" part-type="element" part-group="eyes" class="eye eye--left" cx="55.81" cy="143.35" r="6.53"></circle>\n            <circle monster-part part-name="eye" part-name-mod="right" part-type="element" part-group="eyes" class="eye eye--right" cx="92.44" cy="137.48" r="12.06"></circle>\n         </g>\n				 <g monster-part part-group="eyes" part-type="container"></g>\n         <g monster-part part-group="head-figure" part-type="container"></g>\n         <g monster-part part-name="mouth" part-type="group" class="mouth">\n            <rect class="mouth-figure" x="52.67" y="225.05" width="45.5" height="7.34"></rect>\n            <rect class="tooth" x="61.64" y="231.9" width="10.92" height="15.17"></rect>\n            <rect class="tooth" x="78.28" y="231.9" width="10.92" height="15.17"></rect>\n         </g>\n         <g monster-part part-group="mouth" part-type="container"></g>\n         <g monster-part part-group="nose" part-type="container"></g>\n          <g monster-part part-name="nose" part-type="group">\n            <rect class="nose" x="69.96" y="161.94" width="10.92" height="53.82"></rect>\n          </g>\n      </g>\n   </g>\n</svg>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/doctor/doctor.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ApplicationRef */]])
    ], DoctorComponent);
    return DoctorComponent;
}(__WEBPACK_IMPORTED_MODULE_1__monster_model__["a" /* MonsterModel */]));

//# sourceMappingURL=doctor.js.map

/***/ }),
/* 190 */
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
            selector: 'yeti',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/yeti/yeti.html"*/'<svg class="yeti svg-container" viewBox="0 0 264.56 322.51" width="100%" height="90%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n   <g class="">\n     <g monster-part part-name="body" part-type="group" part-outline="true">\n       <rect class="body" x="-47.31" y="96.49" width="336.14" height="556.92" rx="156.32" ry="156.32"></rect>\n     </g>\n     <g monster-part part-group="body" part-type="container"></g>\n      <g class="head">\n         <g monster-part part-name="head-figure" part-type="group" class="face-figure">\n            <polygon class="hair" points="133.72 -0.04 139.54 26.87 148.68 0.9 151.07 28.33 163.39 3.71 162.33 31.22 177.64 8.34 173.13 35.5 191.19 14.71 183.32 41.1 203.84 22.74 192.72 47.93 215.39 32.29 201.2 55.89 225.64 43.21 208.61 64.84 234.45 55.33 214.84 74.66 241.66 68.46 219.78 85.18 247.18 82.39 223.38 96.23 250.9 96.9 225.55 107.65 252.78 111.76 226.28 119.25 252.78 126.74 225.55 130.85 250.9 141.6 223.38 142.27 247.18 156.11 219.78 153.32 241.66 170.04 214.84 163.84 234.45 183.17 208.61 173.65 225.64 195.29 201.2 182.61 215.39 206.21 192.72 190.57 203.84 215.76 183.32 197.4 191.19 223.78 173.13 203 177.64 230.16 162.33 207.28 163.39 234.79 151.07 210.17 148.68 237.6 139.54 211.63 133.72 238.54 127.91 211.63 118.77 237.6 116.38 210.17 104.06 234.79 105.12 207.28 89.81 230.16 94.32 203 76.26 223.78 84.13 197.4 63.61 215.76 74.73 190.57 52.06 206.21 66.25 182.61 41.81 195.29 58.84 173.65 33 183.17 52.62 163.84 25.79 170.04 47.67 153.32 20.27 156.11 44.07 142.27 16.55 141.6 41.9 130.85 14.67 126.74 41.17 119.25 14.67 111.76 41.9 107.65 16.55 96.9 44.07 96.23 20.27 82.39 47.67 85.18 25.79 68.46 52.62 74.66 33 55.33 58.84 64.84 41.81 43.21 66.25 55.89 52.06 32.29 74.73 47.93 63.61 22.74 84.13 41.1 76.26 14.71 94.32 35.5 89.81 8.34 105.12 31.22 104.06 3.71 116.38 28.33 118.77 0.9 127.91 26.87 133.72 -0.04"></polygon>\n            <ellipse class="face" cx="133.73" cy="99.05" rx="70.61" ry="54.35"></ellipse>\n         </g>\n         <g class="ears">\n            <ellipse class="ear ear--left" cx="68.67" cy="98.73" rx="16.3" ry="12.55"></ellipse>\n            <ellipse class="ear ear--right" cx="197.58" cy="98.73" rx="16.3" ry="12.55"></ellipse>\n         </g>\n         <g>\n            <rect class="jaw" x="75.52" y="117.65" width="116.41" height="64.46"></rect>\n            <g monster-part part-name="mouth" part-type="group" class="mouth">\n              <rect class="mouth-figure" x="82.73" y="132.72" width="101.97" height="43.29"></rect>\n              <path class="lips" d="M182.79,134.64v39.44H84.66V134.64h98.13m3.85-3.85H80.81v47.14H186.64V130.79Z"></path>\n              <g class="tooth">\n                <g class="teeth-top">\n                  <polygon class="tooth" points="161.13 160.77 155.1 134.64 167.16 134.64 161.13 160.77"></polygon>\n                  <polygon class="tooth" points="142.13 160.77 136.1 134.64 148.16 134.64 142.13 160.77"></polygon>\n                  <polygon class="tooth" points="123.13 160.77 117.1 134.64 129.16 134.64 123.13 160.77"></polygon>\n                  <polygon class="tooth" points="104.13 160.77 98.1 134.64 110.16 134.64 104.13 160.77"></polygon>\n                </g>\n                <g class="teeth-bottom">\n                  <polygon class="tooth" points="94.75 147.96 100.78 174.09 88.72 174.09 94.75 147.96"></polygon>\n                  <polygon class="tooth" points="113.75 147.96 119.78 174.09 107.72 174.09 113.75 147.96"></polygon>\n                  <polygon class="tooth" points="132.75 147.96 138.78 174.09 126.72 174.09 132.75 147.96"></polygon>\n                  <polygon class="tooth" points="151.75 147.96 157.78 174.09 145.72 174.09 151.75 147.96"></polygon>\n                  <polygon class="tooth" points="170.75 147.96 176.78 174.09 164.72 174.09 170.75 147.96"></polygon>\n                </g>\n              </g>\n            </g>\n         </g>\n         <g monster-part part-group="mouth" part-type="container"></g>\n\n         <svg width="55.8" height="6.9" x="106" y="70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56.17 7.24">\n           <g monster-part part-name="eyelashes" part-type="group" part-hidden="true" visibility="hidden" class="eyelashes">\n             <line class="eyelash" x1="0.18" y1="2.91" x2="4.33" y2="7.06"/>\n             <line class="eyelash" x1="0.63" y1="1.55" x2="4.78" y2="5.7"/>\n             <line class="eyelash" x1="1.09" y1="0.18" x2="5.24" y2="4.33"/>\n             <line class="eyelash" x1="55.99" y1="2.91" x2="51.84" y2="7.06"/>\n             <line class="eyelash" x1="55.54" y1="1.55" x2="51.38" y2="5.7"/>\n             <line class="eyelash" x1="55.08" y1="0.18" x2="50.93" y2="4.33"/>\n           </g>\n         </svg>\n\n         <g monster-part part-name="eyes" part-type="group" class="eyes">\n            <circle monster-part part-name="eye" part-name-mod="left" part-type="element" part-group="eyes" class="eye eye--left" cx="114.32" cy="79.49" r="5.77"></circle>\n            <circle monster-part part-name="eye" part-name-mod="right" part-type="element" part-group="eyes" class="eye eye--right" cx="153.13" cy="79.49" r="5.77"></circle>\n         </g>\n				 <g monster-part part-group="eyes" part-type="container"></g>\n         <g monster-part part-group="nose" part-type="container"></g>\n         <g monster-part part-group="head-figure" part-type="container"></g>\n\n         <g monster-part part-name="nose" part-type="group">\n           <path class="nose" d="M160.8,101.61h-26V113.8h26a6.11,6.11,0,0,0,6.09-6.09h0A6.11,6.11,0,0,0,160.8,101.61Z"></path>\n         </g>\n      </g>\n   </g>\n</svg>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/yeti/yeti.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ApplicationRef */]])
    ], YetiComponent);
    return YetiComponent;
}(__WEBPACK_IMPORTED_MODULE_1__monster_model__["a" /* MonsterModel */]));

//# sourceMappingURL=yeti.js.map

/***/ }),
/* 191 */
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
            selector: 'ghost',template:/*ion-inline-start:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/ghost/ghost.html"*/'<svg class="ghost svg-container" viewBox="0 0 245.74 325.76" width="100%" height="90%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n   <g class="">\n      <defs class="defs">\n         <clipPath class="clipPath" id="mouth-clip-path">\n            <ellipse class="mouth-clip-path-figure" cx="122.87" cy="152.77" rx="28.28" ry="61.84"></ellipse>\n         </clipPath>\n      </defs>\n      <g monster-part part-name="body" part-type="group" part-outline="true">\n        <path monster-part part-name="head-figure" part-type="group" class="body" d="M122.87,0C50.59,0-8,222.7-8,497.41q0,5.15,0,10.26c.32,0,.62.07.95.07,21.75,0,21.75-48.95,43.49-48.95S58.22,507.74,80,507.74s21.75-48.95,43.5-48.95,21.75,48.95,43.51,48.95,21.75-48.95,43.51-48.95,21.76,48.49,43.22,48.93q0-5.14,0-10.31C253.74,222.7,195.14,0,122.87,0Z"></path>\n      </g>\n      <g monster-part part-group="body" part-type="container"></g>\n\n      <svg width="87.8" height="25.2" x="79" y="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 89.25 26.58">\n        <g monster-part part-name="eyelashes" part-type="group" part-hidden="true" visibility="hidden" class="eyelashes">\n          <line class="eyelash" x1="0.71" y1="10.71" x2="15.87" y2="25.87"/>\n          <line class="eyelash" x1="2.37" y1="5.71" x2="17.54" y2="20.87"/>\n          <line class="eyelash" x1="4.04" y1="0.71" x2="19.21" y2="15.87"/>\n          <line class="eyelash" x1="88.54" y1="10.71" x2="73.37" y2="25.87"/>\n          <line class="eyelash" x1="86.87" y1="5.71" x2="71.71" y2="20.87"/>\n          <line class="eyelash" x1="85.21" y1="0.71" x2="70.04" y2="15.87"/>\n        </g>\n      </svg>\n\n      <g monster-part part-name="eyes" part-type="group" class="eyes">\n         <g monster-part part-name="eye" part-name-mod="left" part-type="group" part-group="eyes" class="eye eye--left">\n            <path class="pupil" d="M104.3,76.32A10.75,10.75,0,1,1,115,65.57,10.76,10.76,0,0,1,104.3,76.32Z"></path>\n            <path class="eyeball" d="M104.3,58.58a7,7,0,1,1-7,7,7,7,0,0,1,7-7m0-7.52a14.51,14.51,0,1,0,14.51,14.51A14.51,14.51,0,0,0,104.3,51.06Z"></path>\n         </g>\n         <g monster-part part-name="eye" part-name-mod="right" part-type="group" part-group="eyes" class="eye eye--right">\n            <path class="pupil" d="M141.44,76.32a10.75,10.75,0,1,1,10.75-10.75A10.76,10.76,0,0,1,141.44,76.32Z"></path>\n            <path class="eyeball" d="M141.44,58.58a7,7,0,1,1-7,7,7,7,0,0,1,7-7m0-7.52a14.51,14.51,0,1,0,14.51,14.51,14.51,14.51,0,0,0-14.51-14.51Z"></path>\n         </g>\n      </g>\n			<g monster-part part-group="eyes" part-type="container"></g>\n      <g monster-part part-name="mouth" part-type="group" class="mouth">\n         <ellipse class="mouth-figure" cx="122.87" cy="152.77" rx="28.28" ry="61.84"></ellipse>\n         <path class="ubula" d="M148.48,125.93c-.46-.25-6-3.12-11.73-.12s-6.62,9.44-6.6,10.64a16.42,16.42,0,0,0,.53,3.55h0a12,12,0,0,0,2.26,4.15l.21.29a10.68,10.68,0,0,1,1.52,5.86,12,12,0,0,1-24,0,11.48,11.48,0,0,1,2.06-6.56l.22-.29a12,12,0,0,0,1.71-3.43h0a12.06,12.06,0,0,1,.54-3.57c.45-1.55-.73-8.54-5.58-10.64-4.17-1.8-10.2.39-13.23,5.9,3.69-21.4,12.94-40.07,26.25-40.76a26.29,26.29,0,0,1,2.71.13C140.48,93.34,147,119.22,148.48,125.93Z"></path>\n         <g class="teeth">\n            <path class="tooth" d="M121.8,105.44h-8.23L114,94.14a13.26,13.26,0,0,1,5.93-2.92A12.42,12.42,0,0,1,121.8,91Z"></path>\n            <path class="tooth" d="M132.42,105.44h-8.23L124.53,91a14.62,14.62,0,0,1,2.74.5,14.92,14.92,0,0,1,5.14,2.63q-.07,2.22-.09,4.53Q132.3,102.15,132.42,105.44Z"></path>\n         </g>\n      </g>\n      <g monster-part part-group="mouth" part-type="container"></g>\n      <g monster-part part-name="nose" part-type="group">\n        <rect fill="rgba(0,0,0,0)" x="116" y="110" width="1" height="1"></rect>\n      </g>\n      <g monster-part part-group="nose" part-type="container"></g>\n      <g monster-part part-group="head-figure" part-type="container"></g>\n\n   </g>\n</svg>\n'/*ion-inline-end:"/home/ned4ded/dev/monsters.v.2/src/components/monsters/ghost/ghost.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ApplicationRef */]])
    ], GhostComponent);
    return GhostComponent;
}(__WEBPACK_IMPORTED_MODULE_1__monster_model__["a" /* MonsterModel */]));

//# sourceMappingURL=ghost.js.map

/***/ }),
/* 192 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameFinistStateMachine; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_javascript_state_machine__ = __webpack_require__(305);
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
/* 193 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListnersHandler; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__listner_register_class__ = __webpack_require__(306);
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
/* 194 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemHolderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__template_host_directive__ = __webpack_require__(195);
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
/* 195 */
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
/* 196 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_monsters_monsters_service__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__game_game__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__background_background_tablet_component__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__background_background_mobile_component__ = __webpack_require__(200);
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
/* 197 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BackgroundTabletComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bg_component__ = __webpack_require__(198);
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
/* 198 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BackgroundComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bg_directive__ = __webpack_require__(199);
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
/* 199 */
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
/* 200 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BackgroundMobileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bg_component__ = __webpack_require__(198);
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
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(267);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_components_module__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_select_background_bg_module__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__model_model_module__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_home_home__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_select_select__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_game_game__ = __webpack_require__(102);
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
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrinketsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__glass_glass__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__eyes_eyes__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__hood_hood__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mole_mole__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__heart_heart__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__beard_beard__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__moustache_moustache__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__snivel_snivel__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__dress_dress__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__bra_bra__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__wig_wig__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__lips_lips__ = __webpack_require__(174);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var zombieJoyAnimBefore = function (monster, repo, instance) {
    var filtered = repo.getCopies().filter(function (i) {
        if (i.meta.onScreen) {
            return i.onMonster && i.meta.emotion === 'joyful';
        }
        return i.meta.emotion === 'joyful';
    });
    var onMonster = monster.isOnMonster(instance.getBoundingClientRect());
    if (monster.animate() && filtered.length === 0 && monster.getEmotion() !== 'joyful' && onMonster) {
        monster.makeJoyjul();
        var smile = monster.animate('smile')(true)();
        var smileLids = monster.animate('smileLids')(true)();
    }
    ;
    return;
};
var zombieJoyAnimAfter = function (monster, repo, instance) {
    var filtered = repo.getCopies().filter(function (i) {
        if (i.meta.onScreen) {
            return i.onMonster && i.meta.emotion === 'joyful';
        }
        return i.meta.emotion === 'joyful';
    });
    if (monster.animate() && filtered.length === 0 && monster.getEmotion() === 'joyful') {
        monster.clearEmotion();
        var smile = monster.animate('smile')(false)();
        var smileLids = monster.animate('smileLids')(false)();
    }
};
var TrinketsService = /** @class */ (function () {
    function TrinketsService() {
    }
    TrinketsService.prototype.getTrinkets = function () {
        return [
            {
                id: 12,
                component: __WEBPACK_IMPORTED_MODULE_12__lips_lips__["a" /* LipsComponent */],
                meta: {
                    container: 'mouth',
                    uniq: true,
                    before: function (monster, repo, instance) {
                        monster.open('eyelashes');
                        if (monster.name === 'skeleton') {
                            monster.close('teeth');
                            monster.open('hidden-jaw');
                        }
                        if (monster.name === 'zombie') {
                            zombieJoyAnimBefore(monster, repo, instance);
                        }
                        if (monster.name === 'mummy') {
                            monster.open('mouth-fraud');
                        }
                        if (monster.name === 'spider') {
                            monster.close('mouth-decor');
                        }
                        if (monster.name === 'wolf') {
                            monster.close('tongue');
                            monster.close('drooling');
                            monster.close('jaw');
                            monster.close('teeth');
                            monster.open('jaw-closed');
                        }
                        if (monster.name === 'vampire') {
                            monster.close('mouth-figure');
                            monster.close('teeth');
                        }
                        if (!['skeleton', 'wolf', 'vampire'].includes(monster.name)) {
                            monster.close('mouth');
                        }
                    },
                    after: function (monster, repo, instance) {
                        monster.close('eyelashes');
                        if (monster.name === 'skeleton') {
                            monster.open('teeth');
                            monster.close('hidden-jaw');
                        }
                        if (monster.name === 'zombie') {
                            zombieJoyAnimAfter(monster, repo, instance);
                        }
                        if (monster.name === 'mummy') {
                            monster.close('mouth-fraud');
                        }
                        if (monster.name === 'spider') {
                            monster.open('mouth-decor');
                        }
                        if (monster.name === 'wolf') {
                            monster.open('tongue');
                            monster.open('drooling');
                            monster.open('jaw');
                            monster.open('teeth');
                            monster.close('jaw-closed');
                        }
                        if (monster.name === 'vampire') {
                            monster.open('mouth-figure');
                            monster.open('teeth');
                        }
                        if (!['skeleton', 'wolf', 'vampire'].includes(monster.name)) {
                            monster.open('mouth');
                        }
                    },
                    attr: {
                        width: {
                            default: function (_a) {
                                var width = _a.width;
                                return width * 1.5;
                            },
                            skeleton: function (_a) {
                                var width = _a.width;
                                return 99.84;
                            },
                            zombie: function (_a) {
                                var width = _a.width;
                                return 89.5;
                            },
                            mummy: function (_a) {
                                var width = _a.width;
                                return 122.3;
                            },
                            yaga: function (_a) {
                                var width = _a.width;
                                return 73.3;
                            },
                            doctor: function (_a) {
                                var width = _a.width;
                                return 74.8;
                            },
                            spider: function (_a) {
                                var width = _a.width;
                                return 117.876;
                            },
                            alien: function (_a) {
                                var width = _a.width;
                                return 94.78;
                            },
                            vampire: function (_a) {
                                var width = _a.width;
                                return 56.56;
                            },
                            yeti: function (_a) {
                                var width = _a.width;
                                return 93.325;
                            },
                            ghost: function (_a) {
                                var width = _a.width;
                                return 137.74;
                            },
                            wolf: function (_a) {
                                var width = _a.width;
                                return 79.76;
                            },
                            bed: function (_a) {
                                var width = _a.width;
                                return 41.571;
                            },
                        },
                        height: {
                            default: function (_a) {
                                var height = _a.height;
                                return height * 1.5;
                            },
                            skeleton: function (_a) {
                                var height = _a.height;
                                return 80.52;
                            },
                            zombie: function (_a) {
                                var height = _a.height;
                                return 76.5;
                            },
                            mummy: function (_a) {
                                var height = _a.height;
                                return 94.6;
                            },
                            yaga: function (_a) {
                                var height = _a.height;
                                return 73.4;
                            },
                            doctor: function (_a) {
                                var height = _a.height;
                                return 85.62;
                            },
                            spider: function (_a) {
                                var height = _a.height;
                                return 119.6;
                            },
                            alien: function (_a) {
                                var height = _a.height;
                                return 59.46;
                            },
                            vampire: function (_a) {
                                var height = _a.height;
                                return 94.4;
                            },
                            yeti: function (_a) {
                                var height = _a.height;
                                return 41.1;
                            },
                            ghost: function (_a) {
                                var height = _a.height;
                                return 90.24;
                            },
                            wolf: function (_a) {
                                var height = _a.height;
                                return 31.785;
                            },
                            bed: function (_a) {
                                var height = _a.height;
                                return 27.56;
                            },
                        },
                        x: {
                            default: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (width * 1.5) / 2) + width / 2;
                            },
                            skeleton: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (99.84) / 2) + width / 2;
                            },
                            zombie: function (_a) {
                                var x = _a.x, width = _a.width;
                                return x + 10;
                            },
                            mummy: function (_a) {
                                var x = _a.x, width = _a.width;
                                return ((x - (122.3) / 2) + width / 2) + 2;
                            },
                            yaga: function (_a) {
                                var x = _a.x, width = _a.width;
                                return x - 20;
                            },
                            doctor: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - 74.8 / 2) + width / 2;
                            },
                            spider: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - 117.876 / 2) + width / 2;
                            },
                            alien: function (_a) {
                                var x = _a.x, width = _a.width;
                                return ((x - (94.78) / 2) + width / 2) + 5;
                            },
                            vampire: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (56.56) / 2) + width / 2;
                            },
                            yeti: function (_a) {
                                var x = _a.x, width = _a.width;
                                return ((x - (93.325) / 2) + width / 2);
                            },
                            ghost: function (_a) {
                                var x = _a.x, width = _a.width;
                                return ((x - (137.74) / 2) + width / 2);
                            },
                            wolf: function (_a) {
                                var x = _a.x, width = _a.width;
                                return x + 50;
                            },
                            bed: function (_a) {
                                var x = _a.x, width = _a.width;
                                return ((x - (41.57) / 2) + width / 2);
                            },
                        },
                        y: {
                            default: function (_a) {
                                var y = _a.y, height = _a.height;
                                return (y - (height * 1.5) / 2) + height / 2;
                            },
                            skeleton: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y + 10;
                            },
                            zombie: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 45;
                            },
                            mummy: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 60;
                            },
                            yaga: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 30;
                            },
                            doctor: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 85.62 + 35;
                            },
                            spider: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y;
                            },
                            alien: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 15;
                            },
                            vampire: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 40;
                            },
                            yeti: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y;
                            },
                            ghost: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y + 20;
                            },
                            wolf: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y + 10;
                            },
                            bed: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 19;
                            },
                        }
                    }
                }
            },
            {
                id: 11,
                component: __WEBPACK_IMPORTED_MODULE_11__wig_wig__["a" /* WigComponent */],
                meta: {
                    container: 'head-figure',
                    uniq: true,
                    emotion: 'joyful',
                    before: function (monster, repo, instance) {
                        zombieJoyAnimBefore(monster, repo, instance);
                        if (monster.name === 'zombie') {
                            monster.close('hair');
                        }
                    },
                    after: function (monster, repo, instance) {
                        zombieJoyAnimAfter(monster, repo, instance);
                        if (monster.name === 'zombie') {
                            monster.open('hair');
                        }
                    },
                    attr: {
                        width: {
                            default: function (_a) {
                                var width = _a.width;
                                return width * 1.5;
                            },
                            skeleton: function (_a) {
                                var width = _a.width;
                                return 200;
                            },
                            zombie: function (_a) {
                                var width = _a.width;
                                return 206.7;
                            },
                            mummy: function (_a) {
                                var width = _a.width;
                                return 178.3;
                            },
                            yaga: function (_a) {
                                var width = _a.width;
                                return 73.3;
                            },
                            doctor: function (_a) {
                                var width = _a.width;
                                return 119.6;
                            },
                            spider: function (_a) {
                                var width = _a.width;
                                return 170.7;
                            },
                            alien: function (_a) {
                                var width = _a.width;
                                return 190.6;
                            },
                            vampire: function (_a) {
                                var width = _a.width;
                                return 108.6;
                            },
                            yeti: function (_a) {
                                var width = _a.width;
                                return 188.1;
                            },
                            ghost: function (_a) {
                                var width = _a.width;
                                return 164.2;
                            },
                            wolf: function (_a) {
                                var width = _a.width;
                                return 170.5;
                            },
                            bed: function (_a) {
                                var width = _a.width;
                                return 90.1;
                            },
                        },
                        height: {
                            default: function (_a) {
                                var height = _a.height;
                                return height * 1.5;
                            },
                            skeleton: function (_a) {
                                var height = _a.height;
                                return 200;
                            },
                            zombie: function (_a) {
                                var height = _a.height;
                                return 203.3;
                            },
                            mummy: function (_a) {
                                var height = _a.height;
                                return 256.1;
                            },
                            yaga: function (_a) {
                                var height = _a.height;
                                return 73.4;
                            },
                            doctor: function (_a) {
                                var height = _a.height;
                                return 119.7;
                            },
                            spider: function (_a) {
                                var height = _a.height;
                                return 170.8;
                            },
                            alien: function (_a) {
                                var height = _a.height;
                                return 190.7;
                            },
                            vampire: function (_a) {
                                var height = _a.height;
                                return 186.9;
                            },
                            yeti: function (_a) {
                                var height = _a.height;
                                return 188.3;
                            },
                            ghost: function (_a) {
                                var height = _a.height;
                                return 243.8;
                            },
                            wolf: function (_a) {
                                var height = _a.height;
                                return 151.5;
                            },
                            bed: function (_a) {
                                var height = _a.height;
                                return 90.18;
                            },
                        },
                        x: {
                            default: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (width * 1.5) / 2) + width / 2;
                            },
                            skeleton: function (_a) {
                                var x = _a.x, width = _a.width;
                                return 0;
                            },
                            zombie: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (206.7) / 2) + width / 2;
                            },
                            mummy: function (_a) {
                                var x = _a.x, width = _a.width;
                                return ((x - (178.3) / 2) + width / 2) + 2;
                            },
                            yaga: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (73.3) / 2) + width / 2;
                            },
                            doctor: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - 119.7 / 2) + width / 2;
                            },
                            spider: function (_a) {
                                var x = _a.x, width = _a.width;
                                return x - 45;
                            },
                            alien: function (_a) {
                                var x = _a.x, width = _a.width;
                                return ((x - (190.7) / 2) + width / 2) - 3.5;
                            },
                            vampire: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (108.6) / 2) + width / 2;
                            },
                            yeti: function (_a) {
                                var x = _a.x, width = _a.width;
                                return ((x - (188.1) / 2) + width / 2);
                            },
                            ghost: function (_a) {
                                var x = _a.x, width = _a.width;
                                return ((x - (164.2) / 2) + width / 2) - 0.25;
                            },
                            wolf: function (_a) {
                                var x = _a.x, width = _a.width;
                                return x - 15;
                            },
                            bed: function (_a) {
                                var x = _a.x, width = _a.width;
                                return ((x - (90.1) / 2) + width / 2) - 10;
                            },
                        },
                        y: {
                            default: function (_a) {
                                var y = _a.y, height = _a.height;
                                return (y - (height * 1.5) / 2) + height / 2;
                            },
                            skeleton: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 20;
                            },
                            zombie: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y + 10;
                            },
                            mummy: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 7;
                            },
                            yaga: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y + 30;
                            },
                            doctor: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y + 20;
                            },
                            spider: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 40;
                            },
                            alien: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 30;
                            },
                            vampire: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y + 30;
                            },
                            yeti: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 5;
                            },
                            ghost: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 7;
                            },
                            wolf: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 33;
                            },
                            bed: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y + 20;
                            },
                        }
                    }
                }
            },
            {
                id: 10,
                component: __WEBPACK_IMPORTED_MODULE_10__bra_bra__["a" /* BraComponent */],
                meta: {
                    container: 'body',
                    uniq: true,
                    before: function (monster) {
                        if (monster.name === 'bed') {
                            monster.close('eyes');
                        }
                        return;
                    },
                    after: function (monster) {
                        if (monster.name === 'bed') {
                            monster.open('eyes');
                        }
                        return;
                    },
                    attr: {
                        width: {
                            default: function (_a) {
                                var width = _a.width;
                                return width * 1.5;
                            },
                            zombie: function (_a) {
                                var width = _a.width;
                                return 160;
                            },
                            mummy: function (_a) {
                                var width = _a.width;
                                return 204;
                            },
                            alien: function (_a) {
                                var width = _a.width;
                                return 79.1;
                            },
                            skeleton: function (_a) {
                                var width = _a.width;
                                return 200.69;
                            },
                            yaga: function (_a) {
                                var width = _a.width;
                                return 139.95;
                            },
                            doctor: function (_a) {
                                var width = _a.width;
                                return 93.99;
                            },
                            spider: function (_a) {
                                var width = _a.width;
                                return 146;
                            },
                            vampire: function (_a) {
                                var width = _a.width;
                                return 70.86;
                            },
                            wolf: function (_a) {
                                var width = _a.width;
                                return 194.5;
                            },
                            ghost: function (_a) {
                                var width = _a.width;
                                return 220;
                            },
                            yeti: function (_a) {
                                var width = _a.width;
                                return 332.8;
                            },
                            bed: function (_a) {
                                var width = _a.width;
                                return 65.47;
                            },
                        },
                        height: {
                            default: function (_a) {
                                var height = _a.height;
                                return height * 1.5;
                            },
                            zombie: function (_a) {
                                var height = _a.height;
                                return 71;
                            },
                            mummy: function (_a) {
                                var height = _a.height;
                                return 50;
                            },
                            alien: function (_a) {
                                var height = _a.height;
                                return 58.25;
                            },
                            skeleton: function (_a) {
                                var height = _a.height;
                                return 110.29;
                            },
                            yaga: function (_a) {
                                var height = _a.height;
                                return 101.45;
                            },
                            doctor: function (_a) {
                                var height = _a.height;
                                return 47.97;
                            },
                            spider: function (_a) {
                                var height = _a.height;
                                return 173;
                            },
                            vampire: function (_a) {
                                var height = _a.height;
                                return 45.46;
                            },
                            wolf: function (_a) {
                                var height = _a.height;
                                return 69.8;
                            },
                            ghost: function (_a) {
                                var height = _a.height;
                                return 145.5;
                            },
                            yeti: function (_a) {
                                var height = _a.height;
                                return 137.75;
                            },
                            bed: function (_a) {
                                var height = _a.height;
                                return 35.973;
                            },
                        },
                        x: {
                            default: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (width * 1.5) / 2) + width / 2;
                            },
                            zombie: function (_a) {
                                var x = _a.x, width = _a.width;
                                return x + 10;
                            },
                            mummy: function (_a) {
                                var x = _a.x, width = _a.width;
                                return ((x - (204) / 2) + width / 2) + 9;
                            },
                            alien: function (_a) {
                                var x = _a.x, width = _a.width;
                                return ((x - (71.9) / 2) + width / 2) - 3.5;
                            },
                            skeleton: function (_a) {
                                var x = _a.x, width = _a.width;
                                return 0;
                            },
                            yaga: function (_a) {
                                var x = _a.x, width = _a.width;
                                return x;
                            },
                            doctor: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - 93.99 / 2) + width / 2;
                            },
                            spider: function (_a) {
                                var x = _a.x, width = _a.width;
                                return ((x - (146) / 2) + width / 2);
                            },
                            vampire: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (70.86) / 2) + width / 2;
                            },
                            wolf: function (_a) {
                                var x = _a.x, width = _a.width;
                                return x;
                            },
                            ghost: function (_a) {
                                var x = _a.x, width = _a.width;
                                return ((x - (220) / 2) + width / 2) - 0.25;
                            },
                            yeti: function (_a) {
                                var x = _a.x, width = _a.width;
                                return x + 1.5;
                            },
                            bed: function (_a) {
                                var x = _a.x, width = _a.width;
                                return x - 85.5;
                            },
                        },
                        y: {
                            default: function (_a) {
                                var y = _a.y, height = _a.height;
                                return (y - (height * 1.5) / 2) + height / 2;
                            },
                            ghost: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y + 105;
                            },
                            zombie: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y + 20;
                            },
                            mummy: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y + 2;
                            },
                            alien: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y + 10;
                            },
                            skeleton: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 20;
                            },
                            yaga: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y;
                            },
                            doctor: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y + 15;
                            },
                            spider: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y + 80;
                            },
                            vampire: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y + 82;
                            },
                            wolf: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y;
                            },
                            yeti: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y + 22;
                            },
                            bed: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 60;
                            },
                        }
                    }
                }
            },
            {
                id: 9,
                component: __WEBPACK_IMPORTED_MODULE_9__dress_dress__["a" /* DressComponent */],
                meta: {
                    container: 'body',
                    uniq: true,
                    before: function (monster) {
                        if (['mummy', 'yaga', 'yeti', 'doctor', 'vampire', 'zombie', 'wolf'].includes(monster.name)) {
                            monster.close('body');
                        }
                        return;
                    },
                    after: function (monster) {
                        if (['mummy', 'yaga', 'yeti', 'doctor', 'vampire', 'zombie', 'wolf'].includes(monster.name)) {
                            monster.open('body');
                        }
                        ;
                        return;
                    },
                    attr: {
                        width: {
                            default: function (_a) {
                                var width = _a.width;
                                return width * 1.5;
                            },
                            zombie: function (_a) {
                                var width = _a.width;
                                return 245;
                            },
                            mummy: function (_a) {
                                var width = _a.width;
                                return width * 0.7;
                            },
                            alien: function (_a) {
                                var width = _a.width;
                                return width * 1.3;
                            },
                            skeleton: function (_a) {
                                var width = _a.width;
                                return width * 1.3;
                            },
                            yaga: function (_a) {
                                var width = _a.width;
                                return width;
                            },
                            doctor: function (_a) {
                                var width = _a.width;
                                return width;
                            },
                            spider: function (_a) {
                                var width = _a.width;
                                return width * 1.44;
                            },
                            vampire: function (_a) {
                                var width = _a.width;
                                return 140;
                            },
                            wolf: function (_a) {
                                var width = _a.width;
                                return 217;
                            },
                            ghost: function (_a) {
                                var width = _a.width;
                                return 318.25;
                            },
                            yeti: function (_a) {
                                var width = _a.width;
                                return 326;
                            },
                            bed: function (_a) {
                                var width = _a.width;
                                return 159.49;
                            },
                        },
                        height: {
                            default: function (_a) {
                                var height = _a.height;
                                return height * 1.5;
                            },
                            zombie: function (_a) {
                                var height = _a.height;
                                return 210;
                            },
                            mummy: function (_a) {
                                var height = _a.height;
                                return 121.5;
                            },
                            alien: function (_a) {
                                var height = _a.height;
                                return height * 0.56;
                            },
                            skeleton: function (_a) {
                                var height = _a.height;
                                return height * 1.3;
                            },
                            yaga: function (_a) {
                                var height = _a.height;
                                return height;
                            },
                            doctor: function (_a) {
                                var height = _a.height;
                                return 190;
                            },
                            spider: function (_a) {
                                var height = _a.height;
                                return height * 1.1;
                            },
                            vampire: function (_a) {
                                var height = _a.height;
                                return 120;
                            },
                            wolf: function (_a) {
                                var height = _a.height;
                                return 274;
                            },
                            ghost: function (_a) {
                                var height = _a.height;
                                return 159.6;
                            },
                            yeti: function (_a) {
                                var height = _a.height;
                                return 237;
                            },
                            bed: function (_a) {
                                var height = _a.height;
                                return 27.637;
                            },
                        },
                        x: {
                            default: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (width * 1.5) / 2) + width / 2;
                            },
                            zombie: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (width) / 2) + width / 2;
                            },
                            mummy: function (_a) {
                                var x = _a.x, width = _a.width;
                                return 25;
                            },
                            alien: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (width * 1.3) / 2) + width / 2;
                            },
                            skeleton: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (width * 1.3) / 2) + width / 2;
                            },
                            yaga: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - width / 2) + width / 2;
                            },
                            doctor: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - width / 2) + width / 2;
                            },
                            spider: function (_a) {
                                var x = _a.x, width = _a.width;
                                return ((x - (width * 1.4) / 2) + width / 2) - 3;
                            },
                            vampire: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (140) / 2) + width / 2;
                            },
                            wolf: function (_a) {
                                var x = _a.x, width = _a.width;
                                return x;
                            },
                            ghost: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (318.25) / 2) + width / 2;
                            },
                            yeti: function (_a) {
                                var x = _a.x, width = _a.width;
                                return ((x - 326 / 2) + width / 2) + 7;
                            },
                            bed: function (_a) {
                                var x = _a.x, width = _a.width;
                                return x - 37;
                            },
                        },
                        y: {
                            default: function (_a) {
                                var y = _a.y, height = _a.height;
                                return (y - (height * 1.5) / 2) + height / 2;
                            },
                            ghost: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y + 220;
                            },
                            zombie: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 10;
                            },
                            mummy: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 10;
                            },
                            alien: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y;
                            },
                            skeleton: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 20;
                            },
                            yaga: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y;
                            },
                            doctor: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y;
                            },
                            spider: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y + 71;
                            },
                            vampire: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y + 57;
                            },
                            wolf: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y;
                            },
                            yeti: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y;
                            },
                            bed: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y + 8;
                            },
                        }
                    }
                }
            },
            {
                id: 8,
                component: __WEBPACK_IMPORTED_MODULE_8__snivel_snivel__["a" /* SnivelComponent */],
                meta: {
                    container: 'nose',
                    emotion: 'sad',
                    attr: {
                        width: {
                            default: function (_a) {
                                var width = _a.width;
                                return width * 1.5;
                            },
                            zombie: function (_a) {
                                var width = _a.width;
                                return 27;
                            },
                            mummy: function (_a) {
                                var width = _a.width;
                                return 25;
                            },
                            alien: function (_a) {
                                var width = _a.width;
                                return 11;
                            },
                            skeleton: function (_a) {
                                var width = _a.width;
                                return 22;
                            },
                            yaga: function (_a) {
                                var width = _a.width;
                                return 15;
                            },
                            doctor: function (_a) {
                                var width = _a.width;
                                return 15;
                            },
                            spider: function (_a) {
                                var width = _a.width;
                                return 28;
                            },
                            vampire: function (_a) {
                                var width = _a.width;
                                return 24;
                            },
                            wolf: function (_a) {
                                var width = _a.width;
                                return 17;
                            },
                            ghost: function (_a) {
                                var width = _a.width;
                                return 15;
                            },
                            yeti: function (_a) {
                                var width = _a.width;
                                return 24;
                            },
                            bed: function (_a) {
                                var width = _a.width;
                                return 11.64;
                            },
                        },
                        height: {
                            default: function (_a) {
                                var height = _a.height;
                                return height * 1.5;
                            },
                            zombie: function (_a) {
                                var height = _a.height;
                                return 47;
                            },
                            mummy: function (_a) {
                                var height = _a.height;
                                return 44;
                            },
                            alien: function (_a) {
                                var height = _a.height;
                                return 20;
                            },
                            skeleton: function (_a) {
                                var height = _a.height;
                                return 78;
                            },
                            yaga: function (_a) {
                                var height = _a.height;
                                return 26;
                            },
                            doctor: function (_a) {
                                var height = _a.height;
                                return 26;
                            },
                            spider: function (_a) {
                                var height = _a.height;
                                return 49;
                            },
                            vampire: function (_a) {
                                var height = _a.height;
                                return 42;
                            },
                            wolf: function (_a) {
                                var height = _a.height;
                                return 30;
                            },
                            ghost: function (_a) {
                                var height = _a.height;
                                return 26;
                            },
                            yeti: function (_a) {
                                var height = _a.height;
                                return 42;
                            },
                            bed: function (_a) {
                                var height = _a.height;
                                return 20.4;
                            },
                        },
                        x: {
                            default: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (width * 1.5) / 2) + width / 2;
                            },
                            zombie: function (_a) {
                                var x = _a.x, width = _a.width;
                                return x + 20;
                            },
                            mummy: function (_a) {
                                var x = _a.x, width = _a.width;
                                return x + width + 12.5;
                            },
                            alien: function (_a) {
                                var x = _a.x, width = _a.width;
                                return x + width - 7;
                            },
                            skeleton: function (_a) {
                                var x = _a.x, width = _a.width;
                                return x + width - 22;
                            },
                            yaga: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - 15 / 2) + width / 2;
                            },
                            doctor: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (15) / 2) + width / 2;
                            },
                            spider: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (width * 6.6) / 2) + width / 2;
                            },
                            vampire: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - 24 / 2) + width / 2;
                            },
                            wolf: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - 17 / 2) + width / 2;
                            },
                            ghost: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (width * 3.5) / 2) + width / 2;
                            },
                            yeti: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - 24 / 2) + width / 2;
                            },
                            bed: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - 11.64 / 2) + width / 2;
                            },
                        },
                        y: {
                            default: function (_a) {
                                var y = _a.y, height = _a.height;
                                return (y - (height * 1.5) / 2) + height / 2;
                            },
                            zombie: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y + height;
                            },
                            mummy: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y + height;
                            },
                            alien: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y + height;
                            },
                            skeleton: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y + height;
                            },
                            yaga: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y + height;
                            },
                            doctor: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y + height;
                            },
                            spider: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 10;
                            },
                            vampire: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y + height;
                            },
                            wolf: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y + height - 7;
                            },
                            yeti: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y + height;
                            },
                            bed: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y + height;
                            },
                        }
                    }
                }
            },
            {
                id: 7,
                component: __WEBPACK_IMPORTED_MODULE_7__moustache_moustache__["a" /* MoustacheComponent */],
                meta: {
                    container: 'mouth',
                    attr: {
                        width: {
                            default: function (_a) {
                                var width = _a.width;
                                return width * 1.5;
                            },
                            zombie: function (_a) {
                                var width = _a.width;
                                return 155;
                            },
                            mummy: function (_a) {
                                var width = _a.width;
                                return 155;
                            },
                            alien: function (_a) {
                                var width = _a.width;
                                return 50;
                            },
                            skeleton: function (_a) {
                                var width = _a.width;
                                return 75;
                            },
                            yaga: function (_a) {
                                var width = _a.width;
                                return 72;
                            },
                            doctor: function (_a) {
                                var width = _a.width;
                                return 127;
                            },
                            spider: function (_a) {
                                var width = _a.width;
                                return 50;
                            },
                            vampire: function (_a) {
                                var width = _a.width;
                                return 50;
                            },
                            wolf: function (_a) {
                                var width = _a.width;
                                return 71;
                            },
                            ghost: function (_a) {
                                var width = _a.width;
                                return 127;
                            },
                            yeti: function (_a) {
                                var width = _a.width;
                                return 127;
                            },
                            bed: function (_a) {
                                var width = _a.width;
                                return 95.74;
                            },
                        },
                        height: {
                            default: function (_a) {
                                var height = _a.height;
                                return height * 1.5;
                            },
                            zombie: function (_a) {
                                var height = _a.height;
                                return 63;
                            },
                            mummy: function (_a) {
                                var height = _a.height;
                                return 63;
                            },
                            alien: function (_a) {
                                var height = _a.height;
                                return 20;
                            },
                            skeleton: function (_a) {
                                var height = _a.height;
                                return 30;
                            },
                            yaga: function (_a) {
                                var height = _a.height;
                                return 29;
                            },
                            doctor: function (_a) {
                                var height = _a.height;
                                return 51;
                            },
                            spider: function (_a) {
                                var height = _a.height;
                                return 20;
                            },
                            vampire: function (_a) {
                                var height = _a.height;
                                return 20;
                            },
                            wolf: function (_a) {
                                var height = _a.height;
                                return 28;
                            },
                            ghost: function (_a) {
                                var height = _a.height;
                                return 51;
                            },
                            yeti: function (_a) {
                                var height = _a.height;
                                return 51;
                            },
                            bed: function (_a) {
                                var height = _a.height;
                                return 38.9;
                            },
                        },
                        x: {
                            default: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (width * 1.5) / 2) + width / 2;
                            },
                            zombie: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - 155 / 2) + width / 2;
                            },
                            mummy: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - 155 / 2) + width / 2;
                            },
                            alien: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - 50 / 2) + width / 2;
                            },
                            skeleton: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - 75 / 2) + width / 2;
                            },
                            yaga: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - 72 / 2) + width / 2;
                            },
                            doctor: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - 127 / 2) + width / 2;
                            },
                            spider: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - 50 / 2) + width / 2;
                            },
                            vampire: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - 50 / 2) + width / 2;
                            },
                            wolf: function (_a) {
                                var x = _a.x, width = _a.width;
                                return x + width - 67;
                            },
                            ghost: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - 127 / 2) + width / 2;
                            },
                            yeti: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - 127 / 2) + width / 2;
                            },
                            bed: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - 95.74 / 2) + width / 2;
                            },
                        },
                        y: {
                            default: function (_a) {
                                var y = _a.y, height = _a.height;
                                return (y - (height * 1.5) / 2) + height / 2;
                            },
                            zombie: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 40;
                            },
                            mummy: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 30;
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
                                return y - 25;
                            },
                            doctor: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 30;
                            },
                            spider: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 15;
                            },
                            vampire: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 11;
                            },
                            wolf: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 10;
                            },
                            yeti: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 18;
                            },
                            bed: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y - 26;
                            },
                        }
                    }
                }
            },
            {
                id: 6,
                component: __WEBPACK_IMPORTED_MODULE_6__beard_beard__["a" /* BeardComponent */],
                meta: {
                    container: 'mouth',
                    before: function (monster) {
                        if (monster.name === 'wolf') {
                            monster.close('tongue');
                        }
                        else if (monster.name === 'skeleton') {
                            return;
                        }
                        else {
                            monster.close('mouth');
                        }
                        return;
                    },
                    after: function (monster) {
                        if (monster.name === 'wolf') {
                            monster.open('tongue');
                        }
                        else if (monster.name === 'skeleton') {
                            return;
                        }
                        else {
                            monster.open('mouth');
                        }
                        return;
                    },
                    attr: {
                        width: {
                            default: function (_a) {
                                var width = _a.width;
                                return width * 1.5;
                            },
                            zombie: function () { return 114; },
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
                            yeti: function (_a) {
                                var width = _a.width;
                                return width * 2;
                            },
                            bed: function (_a) {
                                var width = _a.width;
                                return 58.36;
                            },
                        },
                        height: {
                            default: function (_a) {
                                var height = _a.height;
                                return height * 1.5;
                            },
                            zombie: function () { return 88; },
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
                            yeti: function (_a) {
                                var height = _a.height;
                                return height * 2;
                            },
                            bed: function (_a) {
                                var height = _a.height;
                                return 46.5;
                            },
                        },
                        x: {
                            default: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (width * 1.5) / 2) + width / 2;
                            },
                            zombie: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (114) / 2) + width / 2;
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
                            yeti: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (width * 2) / 2) + width / 2;
                            },
                            bed: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (58.36) / 2) + width / 2;
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
                            yeti: function (_a) {
                                var y = _a.y, height = _a.height;
                                return y;
                            },
                            bed: function (_a) {
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
                    before: function (monster, items, instance) {
                        if (monster.animate() && monster.isOnMonster(instance.getBoundingClientRect())) {
                            var smile = monster.animate('smile')(true)();
                            var smileLids = monster.animate('smileLids')(true)();
                        }
                    },
                    after: function (monster, items) {
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
                    before: zombieJoyAnimBefore,
                    after: zombieJoyAnimAfter,
                    emotion: 'joyful',
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
                            bed: function (_a) {
                                var width = _a.width;
                                return 73.414;
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
                            bed: function (_a) {
                                var height = _a.height;
                                return 23.414;
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
                            bed: function (_a) {
                                var x = _a.x, width = _a.width;
                                return ((x - (73.414) / 2) + width / 2);
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
                            bed: function (_a) {
                                var y = _a.y, height = _a.height;
                                return ((y - (23.414) / 2) + height / 2) - 5;
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
                            bed: function (_a) {
                                var width = _a.width;
                                return 75.79;
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
                            bed: function (_a) {
                                var height = _a.height;
                                return 26.578;
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
                            bed: function (_a) {
                                var x = _a.x, width = _a.width;
                                return (x - (75.79) / 2) + width / 2;
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
                            bed: function (_a) {
                                var y = _a.y, height = _a.height;
                                return ((y - (26.578) / 2) + height / 2) + 9;
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
                    emotion: 'joyful',
                    before: zombieJoyAnimBefore,
                    after: zombieJoyAnimAfter,
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
/* 294 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ElementModel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_uuid_v4__ = __webpack_require__(159);
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
/* 295 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrinketRandomModel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__trinket_random_part_directive__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_element_component_model__ = __webpack_require__(21);
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
            var random = Math.round((_this.parts.length - 1) * Math.random());
            var parts = _this.parts.reduce(function (acc, el) { return acc.concat([el]); }, []);
            var randomParts = function (arr, acc, cur) {
                if (!cur)
                    return acc;
                var randomIndex = Math.round((arr.length - 1) * Math.random());
                var randomPart = arr[randomIndex];
                var partIndex = parts.indexOf(randomPart);
                var filteredArray = arr.slice(0, randomIndex).concat(arr.slice(randomIndex + 1, arr.length));
                return randomParts(filteredArray, acc.concat([partIndex]), cur - 1);
            };
            var selected = randomParts(parts, [], random);
            _this.hide(selected);
            return cb ? cb(selected) : selected;
        };
        return _this;
    }
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
/* 296 */,
/* 297 */,
/* 298 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnimationSetController; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__animation_model__ = __webpack_require__(299);


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
/* 299 */
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
/* 300 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnimationSequenceController; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__animation_sequence_model__ = __webpack_require__(301);


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
/* 301 */
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
/* 302 */,
/* 303 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Game; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cursor_position__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_fsm__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__listners_handler__ = __webpack_require__(193);



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
/* 304 */
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
/* 305 */,
/* 306 */
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
/* 307 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameLogic; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__active_element_repository__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_fsm__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__listners_handler__ = __webpack_require__(193);



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
    GameLogic.prototype.stop = function () {
        this.itemsMouseEnterListners(false);
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
/* 308 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActiveElementRepository; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__active_element_model__ = __webpack_require__(309);

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
    ActiveElementRepository.prototype.getCopies = function () {
        return this.items.filter(function (item) { return item.isCopy(); });
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
/* 309 */
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
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__monsters_monsters_module__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__trinkets_trinkets_module__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__game_game_module__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__item_holder_item_holder_module__ = __webpack_require__(339);
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
/* 336 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MonstersModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__alien_alien__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__skeleton_skeleton__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__zombie_zombie__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__bed_bed__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__spider_spider__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__vampire_vampire__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__wolf_wolf__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__mummy_mummy__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__yaga_yaga__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__doctor_doctor__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__yeti_yeti__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ghost_ghost__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__monsters_component__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__monsters_host_directive__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__monsters_screen_directive__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__monster_part_directive__ = __webpack_require__(180);
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
/* 337 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrinketsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__glass_glass__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__eyes_eyes__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__hood_hood__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mole_mole__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__heart_heart__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__beard_beard__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__moustache_moustache__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__snivel_snivel__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__dress_dress__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__bra_bra__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__wig_wig__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__lips_lips__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__trinkets_component__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__trinket_host_directive__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__trinket_random_part_directive__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__trinket_uniq_part_directive__ = __webpack_require__(171);
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
            declarations: [__WEBPACK_IMPORTED_MODULE_2__glass_glass__["a" /* GlassComponent */], __WEBPACK_IMPORTED_MODULE_3__eyes_eyes__["a" /* EyesComponent */], __WEBPACK_IMPORTED_MODULE_4__hood_hood__["a" /* HoodComponent */], __WEBPACK_IMPORTED_MODULE_5__mole_mole__["a" /* MoleComponent */], __WEBPACK_IMPORTED_MODULE_6__heart_heart__["a" /* HeartComponent */], __WEBPACK_IMPORTED_MODULE_7__beard_beard__["a" /* BeardComponent */], __WEBPACK_IMPORTED_MODULE_8__moustache_moustache__["a" /* MoustacheComponent */], __WEBPACK_IMPORTED_MODULE_9__snivel_snivel__["a" /* SnivelComponent */], __WEBPACK_IMPORTED_MODULE_10__dress_dress__["a" /* DressComponent */], __WEBPACK_IMPORTED_MODULE_11__bra_bra__["a" /* BraComponent */], __WEBPACK_IMPORTED_MODULE_12__wig_wig__["a" /* WigComponent */], __WEBPACK_IMPORTED_MODULE_13__lips_lips__["a" /* LipsComponent */], __WEBPACK_IMPORTED_MODULE_14__trinkets_component__["a" /* TrinketsComponent */], __WEBPACK_IMPORTED_MODULE_15__trinket_host_directive__["a" /* TrinketHostDirective */], __WEBPACK_IMPORTED_MODULE_16__trinket_random_part_directive__["a" /* TrinketRandomPartDirective */], __WEBPACK_IMPORTED_MODULE_17__trinket_uniq_part_directive__["a" /* TrinketUniqPartDirective */]],
            providers: [],
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_2__glass_glass__["a" /* GlassComponent */], __WEBPACK_IMPORTED_MODULE_3__eyes_eyes__["a" /* EyesComponent */], __WEBPACK_IMPORTED_MODULE_4__hood_hood__["a" /* HoodComponent */], __WEBPACK_IMPORTED_MODULE_5__mole_mole__["a" /* MoleComponent */], __WEBPACK_IMPORTED_MODULE_6__heart_heart__["a" /* HeartComponent */], __WEBPACK_IMPORTED_MODULE_7__beard_beard__["a" /* BeardComponent */], __WEBPACK_IMPORTED_MODULE_8__moustache_moustache__["a" /* MoustacheComponent */], __WEBPACK_IMPORTED_MODULE_9__snivel_snivel__["a" /* SnivelComponent */], __WEBPACK_IMPORTED_MODULE_10__dress_dress__["a" /* DressComponent */], __WEBPACK_IMPORTED_MODULE_11__bra_bra__["a" /* BraComponent */], __WEBPACK_IMPORTED_MODULE_12__wig_wig__["a" /* WigComponent */], __WEBPACK_IMPORTED_MODULE_13__lips_lips__["a" /* LipsComponent */],],
            exports: [__WEBPACK_IMPORTED_MODULE_14__trinkets_component__["a" /* TrinketsComponent */]]
        })
    ], TrinketsModule);
    return TrinketsModule;
}());

//# sourceMappingURL=trinkets.module.js.map

/***/ }),
/* 338 */
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
/* 339 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemHolderModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__item_holder_component__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__template_host_directive__ = __webpack_require__(195);
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
/* 340 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BackgroundModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bg_directive__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__background_tablet_component__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__background_mobile_component__ = __webpack_require__(200);
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
/* 341 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModelModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__element_repository__ = __webpack_require__(158);
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
/* 342 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(103);
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

/***/ })
],[244]);
//# sourceMappingURL=main.js.map
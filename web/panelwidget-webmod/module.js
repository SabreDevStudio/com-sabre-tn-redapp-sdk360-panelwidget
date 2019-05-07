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
///<amd-module name="panelwidget-webmod/Context" />
/// <ngv scope="public" />
define("panelwidget-webmod/Context", ["require", "exports", "sabre-ngv-core/modules/ModuleContext"], function (require, exports, ModuleContext_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Cannot use IModuleContext['something'] for types - it seems to break generics
    // types are copied from IModuleContext
    /** @internal **/
    exports.context = new ModuleContext_1.ModuleContext();
    /** @internal **/
    exports.cf = exports.context.cf.bind(exports.context);
    /** @internal **/
    exports.registerService = exports.context.registerService.bind(exports.context);
    /** @internal **/
    exports.getService = exports.context.getService.bind(exports.context);
});
define("panelwidget-webmod/views/PanelTile", ["require", "exports", "sabre-ngv-app/app/widgets/drawer/views/elements/Tile", "sabre-ngv-core/decorators/classes/Initial"], function (require, exports, Tile_1, Initial_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // import {ShoppingData} from "sabre-ngv-app/app/responses/shopping/models/ShoppingData";
    // @CssClass('drawer-tile')
    var PanelTile = (function (_super) {
        __extends(PanelTile, _super);
        function PanelTile() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PanelTile.prototype.selfDrawerContextModelPropagated = function (flightSeg) {
            var customFt = "footer";
            var customCt1 = "USE POINTS";
            // var customCt2 = "c2";
            this.setDataContent({
                contents: [{
                        content: customCt1
                    }],
                footer: customFt
            });
        };
        return PanelTile;
    }(Tile_1.Tile));
    PanelTile = __decorate([
        Initial_1.Initial({
            caption: 'redeem'
        })
    ], PanelTile);
    exports.PanelTile = PanelTile;
});
define("panelwidget-webmod/views/TileModal", ["require", "exports", "sabre-ngv-core/decorators/classes/view/Template", "sabre-ngv-app/app/AbstractView", "sabre-ngv-core/decorators/methods/Bound", "sabre-ngv-app/app/services/impl/ExternalServiceConnector", "panelwidget-webmod/Context"], function (require, exports, Template_1, AbstractView_1, Bound_1, ExternalServiceConnector_1, Context_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TileModal = (function (_super) {
        __extends(TileModal, _super);
        function TileModal(options) {
            var _this = _super.call(this, options) || this;
            _this.addDomEvents({
                'click .slider': 'selectSlider',
                'oninput .slider': 'selectSlider',
                'change .slider': 'selectSlider'
            });
            return _this;
        }
        TileModal.prototype.selfDrawerContextModelPropagated = function (flightSeg) {
            console.log(flightSeg);
            var basePrice = flightSeg.getAirMiles();
            this.getModel().set('basePrice', basePrice);
            this.getModel().set('pctSelected', 50);
            this.refreshPrices(basePrice, 50);
            this.render();
        };
        TileModal.prototype.callWeatherAPI = function () {
            var url = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/347936?apikey=QKj0BOZpYwuygjL4NmsqAaywU75taHk8&language=en-us&details=true";
            var externalServiceConnector = Context_1.getService(ExternalServiceConnector_1.ExternalServiceConnector);
            // need to get destination city from shoping data obj 
            externalServiceConnector.callService(url, 'GET', '', null).done(this.updateModel);
        };
        TileModal.prototype.updateModel = function (data) {
            var response = JSON.parse(data.toString()).responseBody;
            //  this.getModel().set('externalServiceResponse', {'response': response.payload.data.substring(0, 500)});
            console.log(response);
            console.log(response.errors);
            this.render();
        };
        TileModal.prototype.refreshPrices = function (baseVal, pctSelected) {
            var priceUSD = baseVal * (pctSelected / 100);
            var pricePOINTS = (Math.floor(baseVal / 10) * 1000) * (pctSelected / 100);
            this.getModel().set('priceUSD', priceUSD);
            this.getModel().set('pricePOINTS', pricePOINTS);
            this.getModel().set('pctSelected', pctSelected);
        };
        TileModal.prototype.selectSlider = function (selector) {
            var baseVal = this.getModel().get('basePrice');
            var pctSelected = $('.slider').val();
            console.log(selector);
            console.log(baseVal);
            console.log(pctSelected);
            this.refreshPrices(baseVal, pctSelected);
            this.render();
        };
        return TileModal;
    }(AbstractView_1.AbstractView));
    __decorate([
        Bound_1.Bound,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TileModal.prototype, "updateModel", null);
    TileModal = __decorate([
        Template_1.Template('panelwidget-webmod:TileModal'),
        __metadata("design:paramtypes", [Object])
    ], TileModal);
    exports.TileModal = TileModal;
});
define("panelwidget-webmod/Main", ["require", "exports", "sabre-ngv-core/modules/Module", "panelwidget-webmod/Context", "sabre-ngv-app/app/services/impl/DrawerService", "sabre-ngv-core/configs/drawer/LargeWidgetDrawerConfig", "panelwidget-webmod/views/PanelTile", "panelwidget-webmod/views/TileModal"], function (require, exports, Module_1, Context_2, DrawerService_1, LargeWidgetDrawerConfig_1, PanelTile_1, TileModal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Main.prototype.init = function () {
            _super.prototype.init.call(this);
            // initialize your module here
            var cfgAbstractViewOtions = {
                title: 'Redeem - Use Points',
                maximized: false,
                cssClass: 'dn-panel results-panel-widget-container',
                actions: [
                    {
                        caption: ('CANCEL'),
                        actionName: 'close',
                        type: 'secondary',
                        cssClass: 'btn',
                        className: 'app.common.views.Button'
                    },
                    {
                        caption: ('ADD'),
                        actionName: 'some',
                        type: 'default',
                        cssClass: 'btn',
                        className: 'app.common.views.Button'
                    }
                ]
            };
            var drawerConfig = new LargeWidgetDrawerConfig_1.LargeWidgetDrawerConfig(PanelTile_1.PanelTile, TileModal_1.TileModal, cfgAbstractViewOtions);
            Context_2.getService(DrawerService_1.DrawerService).addConfig(['shopping-flight-segment'], drawerConfig);
        };
        return Main;
    }(Module_1.Module));
    exports.Main = Main;
});
///<amd-module name="panelwidget-webmod" />
define("panelwidget-webmod", ["require", "exports", "panelwidget-webmod/Main", "panelwidget-webmod/Context"], function (require, exports, Main_1, Context_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Module_panelwidget_webmod = (function (_super) {
        __extends(Module_panelwidget_webmod, _super);
        function Module_panelwidget_webmod(manifest) {
            var _this = _super.call(this, manifest) || this;
            Context_3.context.setModule(_this);
            return _this;
        }
        return Module_panelwidget_webmod;
    }(Main_1.Main));
    exports.default = Module_panelwidget_webmod;
});

//# sourceMappingURL=module.js.map

var reflex = require('ngv-jest-platform');
var _0 = require("..\\..\\..\\..\\sabre-ngv-app\\module.js");
var _1 = require("..\\..\\..\\..\\sabre-ngv-core\\module.js");
var _2 = require("..\\..\\..\\module.js");

var module = reflex.require("panelwidget-webmod/views/PanelTile");
reflex.initModule({"name":"panelwidget-webmod","version":"4.8.6","meta":{},"dependencies":["sabre-ngv-app","sabre-ngv-core"],"submodules":["panelwidget-webmod/Context","panelwidget-webmod/index","panelwidget-webmod/Main","panelwidget-webmod/views/PanelTile","panelwidget-webmod/views/TileModal"],"hasTemplates":true,"hasStyles":true});

for( var i in module ) {
    if( module.hasOwnProperty(i) ) {
        exports[i] = module[i];
    }
}

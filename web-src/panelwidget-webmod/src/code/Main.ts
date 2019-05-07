import {Module} from 'sabre-ngv-core/modules/Module';
import {TileWidgetDrawerConfig} from 'sabre-ngv-core/configs/drawer/TileWidgetDrawerConfig';
import {getService} from './Context'
import {DrawerService} from "sabre-ngv-app/app/services/impl/DrawerService";
import {LargeWidgetDrawerConfig} from 'sabre-ngv-core/configs/drawer/LargeWidgetDrawerConfig';

import {PanelTile} from './views/PanelTile';
import {TileModal} from './views/TileModal';

export class Main extends Module {
    init(): void {
        super.init();
        // initialize your module here
        let cfgAbstractViewOtions = {
            
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
                }]
        };

       const drawerConfig = new LargeWidgetDrawerConfig(PanelTile,TileModal,cfgAbstractViewOtions); 
        getService(DrawerService).addConfig(['shopping-flight-segment'], drawerConfig);


    }
}

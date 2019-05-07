import {Tile} from "sabre-ngv-app/app/widgets/drawer/views/elements/Tile";
import {TileOptions} from "sabre-ngv-app/app/widgets/drawer/views/elements/TileOptions";
import {Initial} from 'sabre-ngv-core/decorators/classes/Initial';
import {CssClass} from 'sabre-ngv-core/decorators/classes/view/CssClass';
import {FlightSegment} from "sabre-ngv-app/app/common/data/flight/FlightSegment";

// import {ShoppingData} from "sabre-ngv-app/app/responses/shopping/models/ShoppingData";
// @CssClass('drawer-tile')

@Initial<TileOptions>({
    caption: 'redeem'
})
export class PanelTile extends Tile<FlightSegment> {
    selfDrawerContextModelPropagated(flightSeg: FlightSegment){
        var customFt = "footer";
        var customCt1 = "USE POINTS";
        // var customCt2 = "c2";
        
        this.setDataContent({
            contents: [{
                content: customCt1
            }],
            footer: customFt
        });
        
    }
}
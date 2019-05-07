import {Template} from 'sabre-ngv-core/decorators/classes/view/Template';
import {AbstractView} from 'sabre-ngv-app/app/AbstractView';
import {AbstractModel} from 'sabre-ngv-app/app/AbstractModel';  
import {ShoppingData} from "sabre-ngv-app/app/responses/shopping/models/ShoppingData";
import {Bound} from 'sabre-ngv-core/decorators/methods/Bound';
import {ExternalServiceConnector } from 'sabre-ngv-app/app/services/impl/ExternalServiceConnector'; 
import {getService} from '../Context'
import {FlightSegment} from "sabre-ngv-app/app/common/data/flight/FlightSegment";
import {AbstractViewOptions} from "sabre-ngv-app/app/AbstractViewOptions";

@Template('panelwidget-webmod:TileModal')
export class TileModal extends AbstractView<FlightSegment>{


    constructor(options?: AbstractViewOptions) {
        super(options);
        this.addDomEvents(
        {
            'click .slider': 'selectSlider',
            'oninput .slider': 'selectSlider',
            'change .slider': 'selectSlider'
        });
    }

    selfDrawerContextModelPropagated(flightSeg: FlightSegment) {
        console.log(flightSeg)
        let basePrice = flightSeg.getAirMiles();
        this.getModel().set('basePrice',basePrice);
        this.getModel().set('pctSelected',50);
        this.refreshPrices(basePrice,50);
        
        this.render();
    }

    private callWeatherAPI(){

        let url :string ="http://dataservice.accuweather.com/forecasts/v1/daily/5day/347936?apikey=QKj0BOZpYwuygjL4NmsqAaywU75taHk8&language=en-us&details=true";
        
        let externalServiceConnector:ExternalServiceConnector = getService(ExternalServiceConnector);
        
        // need to get destination city from shoping data obj 
        externalServiceConnector.callService(url,'GET','',null).done(this.updateModel);
        
        }
        
        @Bound 
        private updateModel(data: Object) {
            let response = JSON.parse(data.toString()).responseBody;
          //  this.getModel().set('externalServiceResponse', {'response': response.payload.data.substring(0, 500)});
        console.log(response);     
         console.log(response.errors);
            this.render();
        
        }

        private refreshPrices(baseVal, pctSelected): void {

            let priceUSD = baseVal * (pctSelected/100);
            let pricePOINTS = (Math.floor(baseVal/10) * 1000) * (pctSelected/100);

            this.getModel().set('priceUSD',priceUSD);
            this.getModel().set('pricePOINTS',pricePOINTS);
            this.getModel().set('pctSelected',pctSelected);
        }

        private selectSlider(selector: JQueryEventObject): void {

            let baseVal = this.getModel().get('basePrice')
            let pctSelected = $('.slider').val();
            console.log(selector);
            console.log(baseVal);
            console.log(pctSelected);
            this.refreshPrices(baseVal,pctSelected);
            this.render();
        }

}

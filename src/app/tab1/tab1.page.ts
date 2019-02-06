import { Component,ViewChild,ElementRef } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    @ViewChild('map') mapElement: ElementRef<1>;
     @ViewChild('directionsPanel') directionsPanel:ElementRef<any>;
    map: any;
    source:any;
    destination:any;
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;
    constructor() {
        var _self=this;
        setTimeout(function(){
            _self.loadMap(_self);
         //   _self.startNavigating();
        },100);
       
    }

    ionViewDidLoad(){
    }
    showroute(){
        this.directionsDisplay.setMap(null);
        if(!this.source || !this.destination){
            alert("please add source and destination address");
            return;
        }
        this.startNavigating();
    }

    loadMap(_self){
        let latLng = new google.maps.LatLng(21.1702, 72.8311);

        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        _self.map = new google.maps.Map(_self.mapElement.nativeElement, mapOptions);

    }

    startNavigating(){

       
        
        this.directionsDisplay.setMap(this.map);
        this.directionsDisplay.setPanel(this.directionsPanel.nativeElement);

        this.directionsService.route({
            origin: this.source,
            destination: this.destination,
            travelMode: google.maps.TravelMode['DRIVING']
        }, (res, status) => {

            if(status == google.maps.DirectionsStatus.OK){
                this.directionsDisplay.setDirections(res);
            } else {
                alert(status);
                console.warn(status);
            }

        });

    }

}

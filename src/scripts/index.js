import "leaflet/dist/leaflet.css";
import L from "leaflet";
import '../styles/index.scss';
import Axios from "Axios";


var map = L.map('map', {
    center: [51.055196414464, 3.715950434642],
    zoom: 13
});


L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);


var myIcon = L.icon({
    iconUrl: 'public/marker.png',
    iconSize: [19, 25],
    iconAnchor: [9, 25],
    popupAnchor: [-3, -76],
});

L.marker([51.193125, 3.2178], {icon: myIcon}).addTo(map);



callMarkers();


// haalt data op uit de databank
let hondentegelscoordinaten;
function callMarkers() {
    Axios.get("https://datatank.stad.gent/4/infrastructuur/hondenvoorzieningen.geojson")
    .then(function (response) {
        hondentegelscoordinaten=response.data.coordinates;
        zetMarkers();
        console.log(response);  
    });
    
};


function zetMarkers() {
    let html = "";
    

        for (const eentegel of hondentegelscoordinaten) {  
            const xAs = eentegel[0];
            const yAs = eentegel[1];  
            html += L.marker([yAs, xAs], {icon: myIcon}).addTo(map);
        };

    };

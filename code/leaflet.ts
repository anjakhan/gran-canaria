import { config } from '../config';
import { Sightseeing } from '../pages/all-island-page/sightseeings';
import { FotoUploadDto } from './nobs/UploadNobs';

export const L = (<any>window).L;

//const debug = window.location.hostname === 'localhost' || window.location.href.indexOf('debug=1') > 0 || (<any>window).printessDebug === true;
const website = window.location.origin + "/#";

const travelledPlaces: Array<{ name: string, location: Array<number>, date: string, topic: string }> = [{
  name: "Camino Costa Ballena",
  location: [28.421440804718152, -13.853181596486714],
  date: "2021-06-08",
  topic: ""
}];

export const createMap = (mapid: HTMLDivElement, fotostory: Array<FotoUploadDto>) => {
  const zoom = config.isMobile ? 9 : 10;
  const map = L.map(mapid).setView([28.378412972969333, -14.115175194361001], zoom);

  const date: number = new Date().getDate();
  const month: number = new Date().getMonth() + 1;

  L.tileLayer(
    'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy;<a href="http://www.esri.com/">Esri</a>i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 18,
  }).addTo(map);

  //L.marker([28.173903183892257, -14.224354511395132]).addTo(map);
  fotostory && fotostory.map((story: FotoUploadDto) => {
    const marker = L.marker([parseFloat(story.location[0]), parseFloat(story.location[1])]).addTo(map).bindPopup(`<b>${story.popup}</b><br>${story.date}`);
    new Date(story.date).getDate() === date - 1 && new Date(story.date).getMonth() + 1 === month && marker.openPopup();
  });

  travelledPlaces.map(p => {
    L.marker(p.location).addTo(map).bindPopup(`<b>${p.name}</b><br>${p.date}`)
  });
  // L.marker([28.49820981705814, -13.857695606907182]).addTo(map).bindPopup("<b>Puerto del Rosario</b><br>2021-06-13");
};

let map: any;
let markers: any[] = [];

export const createToDoMap = (mapid: HTMLDivElement, mapType: "satellite" | "streets" | "roadmap" | "hikingmap", sightseeings: Sightseeing[], location?: [number, number], zoom: number = 9) => {
  location = location || [27.960669242389122, -15.58718600810936];

  const streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    id: 'mapbox.streets',
    attribution: 'Map data © OpenStreetMap contributors, CC-BY-SA, Imagery © CloudMade'
  })

  const roads = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    id: 'mapbox.hiking',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  const hiking = L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
    id: 'mapbox.hiking',
    attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  const satellite = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    id: 'mapbox.hiking',
    attribution: '&copy;<a href="http://www.esri.com/">Esri</a>i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  })

  map = L.map(mapid).setView(location, zoom);

  const baseMaps = {
    "Streets": streets,
    "Roadmap": roads,
    "Satellite": satellite,
    "Hiking": hiking
  };

  if (mapType === "hikingmap") {
    hiking.addTo(map);
  } else if (mapType === "roadmap") {
    roads.addTo(map);
  } else if (mapType === "streets") {
    streets.addTo(map);
  } else {
    satellite.addTo(map);
  }

  L.control.layers(baseMaps).addTo(map);

  //L.marker([28.173903183892257, -14.224354511395132]).addTo(map);
  sightseeings?.map((s: Sightseeing) => {
    const marker = L.marker(s.location)
    markers.push(marker);
    marker.addTo(map).bindPopup(`
      <a 
        style="text-decoration: none; display: flex; flex-direction: column; width: 220px; align-items: center; justify-content: center; text-align: center;" 
        href=${website + s.hash}
      >
        <img src=${s.image} style="width: 200px; height: auto; position: relative; margin-bottom: 10px; border: 1px solid var(--fuerte-background-color)">
        <b id=${s.hash}>${s.name}<br>
        <span>${s.location[0].toFixed(4)} ${s.location[1].toFixed(4)}</span>
      </a>`);
  });
};

export const updateMap = (sightseeings: Sightseeing[]) => {
  if (map) {
    markers?.forEach(m => map.removeLayer(m));
    markers = [];

    sightseeings?.map((s: Sightseeing) => {
      const marker = L.marker(s.location)
      markers.push(marker);
      marker.addTo(map).bindPopup(`
        <a 
          style="text-decoration: none; display: flex; flex-direction: column; width: 220px; align-items: center; justify-content: center; text-align: center;" 
          href=${website + s.hash}
        >
          <img src=${s.image} style="width: 200px; height: auto; position: relative; margin-bottom: 10px; border: 1px solid var(--fuerte-background-color)">
          <b id=${s.hash}>${s.name}<br>
          <span>${s.location[0].toFixed(4)} ${s.location[1].toFixed(4)}</span>
        </a>
      `);
    });
  }
}
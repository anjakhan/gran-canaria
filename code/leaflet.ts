import { config } from '../config';
import { Sightseeing } from '../pages/all-island-page/WcAllIslandPage';
import { FotoUploadDto } from './nobs/UploadNobs';

export const L = (<any>window).L;

export type Topic = "Gran-Canaria" | "Städte" | "Berge" | "Höhlen" | "Wasser" | "Parks" | "Erlebnisse";
export type Color = "black" | "green" | "sandybrown" | "aquamarine" | "olivedrab" | "magenta";

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


export const createToDoMap = (mapid: HTMLDivElement, mapType: "satellite" | "streetmap", sightseeings: Sightseeing[], location: [number, number] = [27.930669242389122, -15.58718600810936], zoom: number = 9) => {
  location = location || [27.930669242389122, -15.58718600810936];
  const map = L.map(mapid).setView(location, zoom);

  let link: string;
  let attribution: string;

  if (mapType === "streetmap") {
    link = "https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
    attribution = '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  } else {
    link = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
    attribution = '&copy;<a href="http://www.esri.com/">Esri</a>i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  }

  L.tileLayer(
    link, {
    attribution: attribution,
    maxZoom: 18,
  }).addTo(map);

  //L.marker([28.173903183892257, -14.224354511395132]).addTo(map);
  sightseeings?.map((s: { name: string, location: Array<number> }) => {
    L.marker(s.location).addTo(map).bindPopup(`<b>${s.name}</b><br>${s.location}`);
  });
};
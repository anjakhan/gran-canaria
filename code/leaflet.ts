import { config } from '../config';
import { FotoUploadDto } from './nobs/UploadNobs';

export const L = (<any>window).L;

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

  L.marker([28.173903183892257, -14.224354511395132]).addTo(map).bindPopup("<b>Casa Luciano</b>");
  L.marker([28.421440804718152, -13.853181596486714]).addTo(map).bindPopup("<b>Camino Costa Ballena</b><br>2021-06-08");
  L.marker([28.05377973446309, -14.323536843021353]).addTo(map).bindPopup("<b>Ventura Shopping Center</b><br>2021-06-09");
  L.marker([28.384905315405938, -13.863943972471807]).addTo(map).bindPopup("<b>La Guirra Beach</b><br>2021-06-11");
  L.marker([28.392091960114943, -13.853954683945577]).addTo(map).bindPopup("<b>Punta del Bajo</b><br>2021-06-11");
  L.marker([28.403508295007967, -14.15554652495963]).addTo(map).bindPopup("<b>Cuevas de Ajuy</b><br>2021-06-12");
  L.marker([28.388711737434996, -14.10026879269423]).addTo(map).bindPopup("<b>Barranco de las Peñitas</b><br>2021-06-12");
  L.marker([28.49820981705814, -13.857695606907182]).addTo(map).bindPopup("<b>Puerto del Rosario</b><br>2021-06-13");
  L.marker([28.211533376782686, -14.021162616671948]).addTo(map).bindPopup("<b>Gran Tarajal</b><br>2021-06-15");
};
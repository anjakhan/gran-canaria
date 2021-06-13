import { config } from '../config';

export const L = (<any>window).L;

export const createMap = (mapid: HTMLDivElement) => {
  const zoom = config.isMobile ? 9 : 10;
  const map = L.map(mapid).setView([28.378412972969333, -14.015175194361001], zoom);

  L.tileLayer(
    'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy;<a href="http://www.esri.com/">Esri</a>i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 18,
  }).addTo(map);

  L.marker([28.173903183892257, -14.224354511395132]).addTo(map);
  L.marker([28.219257523446036, -14.221378929709454]).addTo(map);
  L.marker([28.421440804718152, -13.853181596486714]).addTo(map);
  L.marker([28.05377973446309, -14.323536843021353]).addTo(map);
  L.marker([28.05291287531432, -14.320408750097652]).addTo(map);
  L.marker([28.163999231637778, -14.220967957002108]).addTo(map);
  L.marker([28.384905315405938, -13.863943972471807]).addTo(map);
  L.marker([28.392091960114943, -13.853954683945577]).addTo(map);
  L.marker([28.424407208910573, -14.057227882030535]).addTo(map);
  L.marker([28.403508295007967, -14.15554652495963]).addTo(map);
  L.marker([28.388711737434996, -14.10026879269423]).addTo(map);
  L.marker([28.70145018706374, -13.835220707010928]).addTo(map);
  L.marker([28.49820981705814, -13.857695606907182]).addTo(map);
};
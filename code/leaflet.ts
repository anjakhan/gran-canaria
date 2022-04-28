import { config } from '../config';
import { Sightseeing } from '../pages/all-island-page/sightseeings';
import { assertNever } from '../shared/tools';
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
    let icon = cities

    switch (s.topic) {
      case "Berge": icon = mountains; break;
      case "Erlebnisse": icon = adventure; break;
      case "Höhlen": icon = caves; break;
      case "Parks": icon = parks; break;
      case "Städte": icon = cities; break;
      case "Wasser": icon = water; break;
      case "Gran-Canaria": icon = cities; break;
      default: assertNever(s.topic);
    }

    const marker = L.marker(s.location, { icon: icon })
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
      let icon = cities

      switch (s.topic) {
        case "Berge": icon = mountains; break;
        case "Erlebnisse": icon = adventure; break;
        case "Höhlen": icon = caves; break;
        case "Parks": icon = parks; break;
        case "Städte": icon = cities; break;
        case "Wasser": icon = water; break;
        case "Gran-Canaria": icon = cities; break;
        default: assertNever(s.topic);
      }

      const marker = L.marker(s.location, { icon: icon })
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

const cities = L.divIcon({
  html: `<svg style="fill: var(--gran-canaria-cities)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><defs><style>.fa-secondary{opacity:.4}</style></defs><path class="fa-primary" d="M.0003 464V277.1C.0003 263.7 5.647 250.8 15.57 241.7L159.6 109.7C177.9 92.91 206.1 92.91 224.4 109.7L368.4 241.7C378.4 250.8 384 263.7 384 277.1V464C384 490.5 362.5 512 336 512H48C21.49 512 0 490.5 0 464H.0003zM168 272C154.7 272 144 282.7 144 296V344C144 357.3 154.7 368 168 368H216C229.3 368 240 357.3 240 344V296C240 282.7 229.3 272 216 272H168z"/><path class="fa-secondary" d="M566.6 137.4C575.8 146.5 578.5 160.3 573.6 172.2C568.6 184.2 556.9 192 544 192H514.6L600.1 300C608.7 309.6 610.2 322.8 604.8 333.9C599.5 344.1 588.3 352 576 352H546.6L632.1 460C640.7 469.6 642.2 482.8 636.8 493.9C631.5 504.1 620.3 512 608 512H400C410 498.6 416 482 416 464V277.1C416 254.7 406.6 233.3 390.1 218.1L282.9 119.9L393.4 9.372C405.9-3.124 426.1-3.124 438.6 9.372L566.6 137.4z"/></svg>`,
  className: "dungeon",
  iconSize: [24, 40],
});

const mountains = L.divIcon({
  html: `<svg style="fill: var(--gran-canaria-mountains)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><defs><style>.fa-secondary{opacity:.4}</style></defs><path class="fa-primary" d="M304.4 224H207.6C197.7 224 188.5 228.5 182.4 236.3l-55.63 71l13.25 16.5C149.7 336 170.2 336 180.1 323.8c10.75-13.5 26.75-21.25 44.13-21.5c17.13-1.5 33.5 7 44.75 20l31.63 36.88c9.751 11.38 29.13 11.38 39 0l45.13-52.62l-55-70.25C323.5 228.5 314.3 224 304.4 224zM352 16c-15.75 0-30 5.875-41.25 15.38C299.6 12.75 279.4 0 255.1 0C232.6 0 212.4 12.75 201.2 31.38C189.1 21.88 175.7 16 159.1 16c-35.25 0-64 28.75-64 64s28.75 64 64 64c12.88 0 24.75-3.875 34.75-10.38L223.1 192h64l29.25-58.38C327.3 140.1 339.1 144 352 144c35.25 0 64-28.75 64-64S387.3 16 352 16z"/><path class="fa-secondary" d="M480 512H32.1c-26.38 0-41.5-30.12-25.63-51.25l120.3-153.5l13.25 16.5C149.7 336 170.2 336 180.1 323.8c10.75-13.5 26.75-21.25 44.13-21.5c17.13-1.5 33.5 7 44.75 20l31.63 36.88c9.751 11.38 29.13 11.38 39 0l45.13-52.62l120.8 154.2C521.4 481.9 506.3 512 480 512z"/></svg>`,
  className: "dungeon",
  iconSize: [24, 40],
});

const caves = L.divIcon({
  html: `<svg style="fill: var(--gran-canaria-caves)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M336.6 156.5C327.3 148.1 322.6 136.5 327.1 125.3L357.6 49.18C362.7 36.27 377.8 30.36 389.7 37.63C410.9 50.63 430 66.62 446.5 85.02C455.7 95.21 452.9 110.9 441.5 118.5L373.9 163.5C363.6 170.4 349.8 168.1 340.5 159.9C339.2 158.7 337.9 157.6 336.6 156.5H336.6zM297.7 112.6C293.2 123.1 280.9 129.8 268.7 128.6C264.6 128.2 260.3 128 256 128C251.7 128 247.4 128.2 243.3 128.6C231.1 129.8 218.8 123.1 214.3 112.6L183.1 36.82C178.8 24.02 185.5 9.433 198.1 6.374C217.3 2.203 236.4 0 256 0C275.6 0 294.7 2.203 313 6.374C326.5 9.433 333.2 24.02 328 36.82L297.7 112.6zM122.3 37.63C134.2 30.36 149.3 36.27 154.4 49.18L184.9 125.3C189.4 136.5 184.7 148.1 175.4 156.5C174.1 157.6 172.8 158.7 171.5 159.9C162.2 168.1 148.4 170.4 138.1 163.5L70.52 118.5C59.13 110.9 56.32 95.21 65.46 85.02C81.99 66.62 101.1 50.63 122.3 37.63H122.3zM379.5 222.1C376.3 210.7 379.7 198.1 389.5 191.6L458.1 145.8C469.7 138.1 485.6 141.9 491.2 154.7C501.6 178.8 508.4 204.8 510.9 232C512.1 245.2 501.3 255.1 488 255.1H408C394.7 255.1 384.2 245.2 381.8 232.1C381.1 228.7 380.4 225.4 379.5 222.1V222.1zM122.5 191.6C132.3 198.1 135.7 210.7 132.5 222.1C131.6 225.4 130.9 228.7 130.2 232.1C127.8 245.2 117.3 256 104 256H24C10.75 256-.1184 245.2 1.107 232C3.636 204.8 10.43 178.8 20.82 154.7C26.36 141.9 42.26 138.1 53.91 145.8L122.5 191.6zM104 288C117.3 288 128 298.7 128 312V360C128 373.3 117.3 384 104 384H24C10.75 384 0 373.3 0 360V312C0 298.7 10.75 288 24 288H104zM488 288C501.3 288 512 298.7 512 312V360C512 373.3 501.3 384 488 384H408C394.7 384 384 373.3 384 360V312C384 298.7 394.7 288 408 288H488zM104 416C117.3 416 128 426.7 128 440V488C128 501.3 117.3 512 104 512H24C10.75 512 0 501.3 0 488V440C0 426.7 10.75 416 24 416H104zM488 416C501.3 416 512 426.7 512 440V488C512 501.3 501.3 512 488 512H408C394.7 512 384 501.3 384 488V440C384 426.7 394.7 416 408 416H488zM272 464C272 472.8 264.8 480 256 480C247.2 480 240 472.8 240 464V192C240 183.2 247.2 176 256 176C264.8 176 272 183.2 272 192V464zM208 464C208 472.8 200.8 480 192 480C183.2 480 176 472.8 176 464V224C176 215.2 183.2 208 192 208C200.8 208 208 215.2 208 224V464zM336 464C336 472.8 328.8 480 320 480C311.2 480 304 472.8 304 464V224C304 215.2 311.2 208 320 208C328.8 208 336 215.2 336 224V464z"/></svg>`,
  className: "dungeon",
  iconSize: [24, 40],
});

const water = L.divIcon({
  html: `<svg style="fill: var(--gran-canaria-water)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><defs><style>.fa-secondary{opacity:.4}</style></defs><path class="fa-primary" d="M37.78 156.4c25.33-4.625 44.72-13.31 58.19-21.25c19.5 11.53 51.47 24.68 96.04 24.68c44.55 0 76.49-13.12 96-24.65c19.52 11.53 51.45 24.59 96 24.59c44.58 0 76.55-13.09 96.05-24.62c13.47 7.938 32.86 16.62 58.19 21.25c17.56 3.375 34.06-8.344 37.25-25.72c3.172-17.38-8.344-34.03-25.72-37.22c-31.23-5.719-46.84-20.06-47.13-20.31c-12.22-12.19-32.31-12.12-44.91-.375c-1 .9375-25.14 23-73.73 23s-72.73-22.06-73.38-22.62c-12.22-12.25-32.3-12.12-44.89-.375c-1 .9375-25.14 23-73.73 23S119.3 73.76 118.6 73.2C106.4 60.95 86.35 61.04 73.74 72.85C73.09 73.45 57.48 87.79 26.24 93.51c-17.38 3.188-28.89 19.84-25.72 37.22C3.713 148.1 20.31 159.8 37.78 156.4zM549.8 381.7c-31.23-5.719-46.84-20.06-47.13-20.31c-12.22-12.19-32.31-12.12-44.91-.375C456.7 361.9 432.6 384 384 384s-72.73-22.06-73.38-22.62c-12.22-12.25-32.3-12.12-44.89-.375C264.7 361.9 240.6 384 192 384s-72.73-22.06-73.38-22.62c-12.22-12.25-32.28-12.16-44.89-.3438c-.6562 .5938-16.27 14.94-47.5 20.66c-17.38 3.188-28.89 19.84-25.72 37.22C3.713 436.3 20.31 448 37.78 444.6C63.1 440 82.49 431.3 95.96 423.4c19.5 11.53 51.51 24.62 96.08 24.62c44.55 0 76.45-13.06 95.96-24.59C307.5 434.9 339.5 448 384.1 448c44.58 0 76.5-13.09 95.1-24.62c13.47 7.938 32.86 16.62 58.19 21.25C555.8 448 572.3 436.3 575.5 418.9C578.7 401.5 567.2 384.9 549.8 381.7z"/><path class="fa-secondary" d="M384 303.8c-44.55 0-76.48-13.06-96-24.59c-19.52 11.53-51.46 24.65-96 24.65c-44.58 0-76.54-13.15-96.04-24.68C82.49 287.1 63.1 295.8 37.78 300.4C20.31 303.8 3.713 292.1 .5254 274.7C-2.646 257.4 8.869 240.7 26.24 237.5c31.23-5.719 46.84-20.06 47.5-20.66c12.61-11.81 32.67-11.91 44.89 .3438C119.3 217.8 143.4 239.8 192 239.8s72.73-22.06 73.73-23c12.59-11.75 32.67-11.88 44.89 .375c.6406 .5625 24.78 22.62 73.38 22.62s72.73-22.06 73.73-23c12.59-11.75 32.69-11.81 44.91 .375c.2813 .25 15.89 14.59 47.13 20.31c17.38 3.188 28.89 19.84 25.72 37.22c-3.188 17.38-19.69 29.09-37.25 25.72c-25.33-4.625-44.72-13.31-58.19-21.25C460.6 290.7 428.6 303.8 384 303.8z"/></svg>`,
  className: "dungeon",
  iconSize: [24, 40],
});

const parks = L.divIcon({
  html: `<svg style="fill: var(--gran-canaria-parks)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><defs><style>.fa-secondary{opacity:.4}</style></defs><path class="fa-primary" d="M192 192C174.3 192 160 206.3 160 223.1v256C160 497.7 174.3 512 192 512S224 497.7 224 480V223.1C224 206.3 209.7 192 192 192zM448 320c-17.67 0-32 14.33-32 31.1v128C416 497.7 430.3 512 448 512C465.7 512 480 497.7 480 480V351.1C480 334.3 465.7 320 448 320z"/><path class="fa-secondary" d="M298.4 288H329c9 0 17-5 20.88-13c3.75-8.125 2.5-17.38-3.375-24.12L268.4 160h28.88c9.127 0 17.38-5.375 20.88-13.62c3.625-8.125 1.875-17.62-4.25-24.12L203.6 4.875c-6-6.5-17.25-6.5-23.25 0L69.97 122.3c-6 6.5-7.75 16-4.125 24.12C69.34 154.6 77.59 160 86.72 160h28.88L37.46 250.9c-5.875 6.875-7.125 16-3.375 24.12C37.96 283 45.84 288 54.96 288h30.63l-79.88 90.5c-6 6.75-7.377 16.12-3.625 24.25C5.834 410.8 14.08 416 23.09 416H160V223.1C160 206.3 174.3 192 192 192s32 14.33 32 31.1V416h136.9c9 0 17.25-5.25 21-13.25c3.75-8.125 2.5-17.5-3.5-24.25L298.4 288zM634.3 378.5L554.4 288h30.63c9 0 17-5 20.88-13c3.75-8.125 2.5-17.38-3.375-24.12L524.4 160h28.88c9.125 0 17.38-5.375 20.88-13.62c3.625-8.125 1.875-17.62-4.25-24.12l-110.3-117.4c-6-6.5-17.25-6.5-23.25 0l-95.14 101.3c11.13 15.38 14 35.25 6.377 52.88c-4 9.375-10.38 17.12-18.25 22.75l41.5 48.25c14 16.25 17.13 39.25 8.002 58.62c-4.25 8.875-10.5 16.12-18.13 21.5l41.63 47.13c8.6 9.846 13.34 14.29 13.62 26.7L416 351.1C416 334.3 430.3 320 448 320s32 14.33 32 31.1V416h136.9c9.002 0 17.25-5.25 21-13.25C641.7 394.6 640.3 385.3 634.3 378.5z"/></svg>`,
  className: "dungeon",
  iconSize: [24, 40],
});

const adventure = L.divIcon({
  html: `<svg style="fill: var(--gran-canaria-adventure)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><defs><style>.fa-secondary{opacity:.4}</style></defs><path class="fa-primary" d="M128 148.3C129.8 136.9 139.3 128 151.3 128c13.25 0 24 10.74 24 24c0 13.25-10.75 24-24 24C139.3 176 129.8 167.1 128 155.7V148.3z"/><path class="fa-secondary" d="M438.4 129.5l-13.9-11.92c9.016-24.25 26.23-54.14 52.31-89.89c5.311-7.328 3.281-15.04-.4336-19.82c-4.619-5.98-11.83-8.907-20.34-7.575c-51.75 8.117-93.62 24.63-123.9 40.08c-35.5-25.72-77.93-40.4-122.1-40.4L176 0C96.47 0 32 64.47 32 144c0 18.38 3.771 35.8 10.05 51.97L14.25 214.5C5.348 220.4 0 230.4 0 241.1V256c0 17.68 14.33 32 32 32L192.9 288l102.8 61.7C306.4 356.1 320 348.4 320 335.1V288h2.902c.834 0 1.59 .21 2.412 .249C326.2 288.2 327.1 288 328 288C358.9 288 384 313.1 384 344s-25.07 56-56 56h-62.22l-13.07-21.31C248.3 372 240.8 368 232.7 368H171.1c-9.561 0-15.27 10.66-9.965 18.61l35.55 53.38l-35.53 53.36C156.7 501.3 162.4 512 172 512H232.7c8.064 0 15.58-4.033 19.99-10.69L265.8 480H320c105.9 0 192.4-86.08 192-191.1C512 202.3 460.3 148.3 438.4 129.5zM151.3 176C139.3 176 129.8 167.1 128 155.7V148.3C129.8 136.9 139.3 128 151.3 128c13.25 0 24 10.74 24 24C175.3 165.3 164.5 176 151.3 176z"/></svg>`,
  className: "dungeon",
  iconSize: [24, 40],
});

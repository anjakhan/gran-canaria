import { config } from '../config';
export const L = window.L;
const travelledPlaces = [{
        name: "Camino Costa Ballena",
        location: [28.421440804718152, -13.853181596486714],
        date: "2021-06-08",
        topic: ""
    }];
export const createMap = (mapid, fotostory) => {
    const zoom = config.isMobile ? 9 : 10;
    const map = L.map(mapid).setView([28.378412972969333, -14.115175194361001], zoom);
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy;<a href="http://www.esri.com/">Esri</a>i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        maxZoom: 18,
    }).addTo(map);
    fotostory && fotostory.map((story) => {
        const marker = L.marker([parseFloat(story.location[0]), parseFloat(story.location[1])]).addTo(map).bindPopup(`<b>${story.popup}</b><br>${story.date}`);
        new Date(story.date).getDate() === date - 1 && new Date(story.date).getMonth() + 1 === month && marker.openPopup();
    });
    travelledPlaces.map(p => {
        L.marker(p.location).addTo(map).bindPopup(`<b>${p.name}</b><br>${p.date}`);
    });
};
export const createToDoMap = (mapid, mapType, sightseeings, location = [27.930669242389122, -15.58718600810936], zoom = 9) => {
    location = location || [27.930669242389122, -15.58718600810936];
    const map = L.map(mapid).setView(location, zoom);
    let link;
    let attribution;
    if (mapType === "streetmap") {
        link = "https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png";
        attribution = '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    }
    else {
        link = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
        attribution = '&copy;<a href="http://www.esri.com/">Esri</a>i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
    }
    L.tileLayer(link, {
        attribution: attribution,
        maxZoom: 18,
    }).addTo(map);
    sightseeings?.map((s) => {
        L.marker(s.location).addTo(map).bindPopup(`<b>${s.name}</b><br>${s.location}`);
    });
};
//# sourceMappingURL=leaflet.js.map
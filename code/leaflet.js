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
let map;
let markers = [];
export const createToDoMap = (mapid, mapType, sightseeings, location, zoom = 9) => {
    location = location || [27.960669242389122, -15.58718600810936];
    const streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        id: 'mapbox.streets',
        attribution: 'Map data © OpenStreetMap contributors, CC-BY-SA, Imagery © CloudMade'
    });
    const roads = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        id: 'mapbox.hiking',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    const hiking = L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
        id: 'mapbox.hiking',
        attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    const satellite = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        id: 'mapbox.hiking',
        attribution: '&copy;<a href="http://www.esri.com/">Esri</a>i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });
    map = L.map(mapid).setView(location, zoom);
    const baseMaps = {
        "Streets": streets,
        "Roadmap": roads,
        "Satellite": satellite,
        "Hiking": hiking
    };
    if (mapType === "hikingmap") {
        hiking.addTo(map);
    }
    else if (mapType === "roadmap") {
        roads.addTo(map);
    }
    else if (mapType === "streets") {
        streets.addTo(map);
    }
    else {
        satellite.addTo(map);
    }
    L.control.layers(baseMaps).addTo(map);
    sightseeings?.map((s) => {
        const marker = L.marker(s.location);
        markers.push(marker);
        marker.addTo(map).bindPopup(`<b>${s.name}</b><br>${s.location}`);
    });
};
export const updateMap = (sightseeings) => {
    if (map & markers.length) {
        markers?.forEach(m => map.removeLayer(m));
        markers = [];
        sightseeings?.map((s) => {
            const marker = L.marker(s.location);
            markers.push(marker);
            marker.addTo(map).bindPopup(`<b>${s.name}</b><br>${s.location}`);
        });
    }
};
//# sourceMappingURL=leaflet.js.map
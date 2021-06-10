import { config } from '../config';
export const L = window.L;
export const createMap = (mapid) => {
    const zoom = config.isMobile ? 9 : 10;
    const map = L.map(mapid).setView([28.378412972969333, -14.015175194361001], zoom);
    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy;<a href="http://www.esri.com/">Esri</a>i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        maxZoom: 18,
    }).addTo(map);
    L.marker([28.173903183892257, -14.224354511395132]).addTo(map);
    L.marker([28.219257523446036, -14.221378929709454]).addTo(map);
    L.marker([28.421440804718152, -13.853181596486714]).addTo(map);
    L.marker([28.05377973446309, -14.323536843021353]).addTo(map);
    L.marker([28.05291287531432, -14.320408750097652]).addTo(map);
};
//# sourceMappingURL=leaflet.js.map
import { config } from '../config';

export const L = (<any>window).L;

export const createMap = (mapid: HTMLDivElement) => {
  const zoom = config.isMobile ? 9 : 10;
  const map = L.map(mapid).setView([28.378412972969333, -14.015175194361001], zoom);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  const marker = L.marker([28.173903183892257, -14.224354511395132]).addTo(map);
}
import { css, CSSResultGroup } from 'lit';
import { config } from '../../config';

export const mapStyles: CSSResultGroup = css`
  .leaflet-map-pane {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  img {
    position: absolute;
  }
  .leaflet-control-container {
    position: fixed;
    bottom: 10px;
    right: 20px;
    padding: 10px 20px;
    z-index: 10;
    font-size: 10px;
    color: white;
  }

  .leaflet-control-container a {
    color: var(--fuerte-aqua);
  }

  .leaflet-control-zoom-out, .leaflet-control-zoom-in {
    position: fixed;
    background-color: white;
    border-radius: 4px;
    color: #555;
    padding: 5px 7px;
    top: 70;
    right: 30;
    text-decoration: none;
  }

  .leaflet-control-zoom-out a, .leaflet-control-zoom-in a {
    color: #555;
  }

  .leaflet-control-zoom-in {
    right: 55px;
  }

  @media (max-width: ${config.mobileDeviceWidth}px) {
    #mapid {
      height: 100vh!important;
    }
  }
`;

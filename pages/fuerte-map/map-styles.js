import { css } from 'lit';
import { config } from '../../config';
export const mapStyles = css `
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

  @media (max-width: ${config.mobileDeviceWidth}px) {
    #mapid {
      height: 100vh!important;
    }
  }
`;
//# sourceMappingURL=map-styles.js.map
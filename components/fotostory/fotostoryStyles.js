import { css } from 'lit';
import { config } from '../../config';
export const fotostoryStyles = css `
  .fotostory-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: #555;
    padding-top: 30px;
  }

  .image-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    align-content: center;
    padding: 30px 0 60px;
  }

  img {
    width: auto;
    height: 250px;
    box-shadow: var(--fuerte-box-shadow);
    margin: 20px;
  }

  @media (max-width: ${config.mobileDeviceWidth}px) {
    .title {
      margin-bottom: 0;
    }

    .image-container {
      padding-top: 0px;
    }

    img {
      width: 100%;
      height: auto;
      margin: 10px;
    }
  }
`;
//# sourceMappingURL=fotostoryStyles.js.map
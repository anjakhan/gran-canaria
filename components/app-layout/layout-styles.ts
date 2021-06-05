import { css, CSSResultGroup } from 'lit';
import { config } from '../../config';

export const layoutStyles: CSSResultGroup = css`
  .account-layout {
    font-family: var(--printess-font);
    height: 100vh;
    display: grid;
    grid-template-rows: 50px 1fr;
    grid-template-columns: 200px 1fr;
    background-color: var(--fuerte-light);
  }

  #user-content {
    grid-column: 2/3;
    grid-row: 2/3;
    padding: 10px 250px 40px 50px;
    overflow-y: scroll;
  }

  @media (max-width: 1200px) {
    #user-content {
      padding-right: 50px;
    }
  }
  
  .drawer {
    background-color: var(--fuerte-aqua);
    grid-column: 1/2;
    grid-row: 2/3;
    border-right: 1px solid #1a39601a;
    outline: none;
    padding: 30px;
  }

  @media (max-width: ${config.mobileDeviceWidth}px) {
    .account-layout {
      display: flex;
      flex-direction: column;
    }

    #user-content {
      padding: 50px 30px 20px;
    }

    .drawer {
      position: fixed;
      top: 50;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      height: auto;
      padding: 0;
      z-index: 10;
    }
  }
`;

export const navbarStyles: CSSResultGroup = css`
  header {
    grid-column: 1/3;
    grid-row: 1/2;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: auto;
    z-index: 1;
    height: 50px;
    background-color: var(--fuerte-background-color);
    color: white;
    font-family: Ubuntu, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding-left: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: var(--fuerte-box-shadow);
  }
  header::before {
    content: "";
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-image: url("https://firebasestorage.googleapis.com/v0/b/fuerteventura-d4e75.appspot.com/o/fuerteventura_551.jpeg?alt=media&token=5660bdc4-9f90-4a28-9898-f2865ef4ac60");
    opacity: 0.2;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 1;
  }

  .island {
    width: 20px;
    margin-left: 10px; 
    cursor: pointer;
  }

  @media (max-width: ${config.mobileDeviceWidth}px) {
    header::before {
      background-image: none;
    }

    .island {
      width: 0px;
    }
  }

  #printess-logo {
    display: inline-block;
    height: 35px;
    width: 120px;
    padding-bottom: 5px;
    padding-left: 0px;
    background-size: 100%;
    background-image: url(https://printess.com/printess-white-2.svg);
    background-position: 0px 0px;
    background-size: contain;
    background-repeat: no-repeat;
    text-decoration: none;
    background-origin: content-box;
  }
`;

import { css } from 'lit';
export const dialogStyles = css `
  :host, :host * {
    box-sizing: border-box; 
  }
  :host  {
    position: absolute;
    background-color: var(--printess-panelBackground);
    box-shadow: black 0 0 10px;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    overflow: auto;
    max-height: 100vh;
    max-width: 100vw;
    
    font-family: Lato, sans-serif; 
    font-size: var(--printess-textSize);
    color:  var(--printess-textColor); 
    display: grid;
    width: fit-content;
    grid-template-rows: 1fr auto;
    z-index: 100;
}
  .content {
    padding: var(--printess-dialog-padding);
    overflow: auto;
  }
  .footer {                
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    column-gap: calc(var(--printess-dialog-padding) / 2);
    padding: var(--printess-dialog-padding);
    border-top: 1px solid var(--printess-textColorDisabled);
  }
  .header {                
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    padding: var(--printess-dialog-padding);
    padding-bottom: 25px;
    border-bottom: 1px solid var(--printess-textColorDisabled);
    font-size: var(--printess-headlineSize);
    color: var(--printess-headlineColor);
    
  }
  h1 {
    font-size: var(--printess-headlineSize);
    color: var(--printess-headlineColor);
    margin-top: 20px;
    margin-bottom: 10px;
  }
  p {
    font-size: var(--printess-textSize);
    line-height: 1.4;
    color: var(--printess-textColor);
    margin-top: 10px;
    margin-bottom: 20px;
  }
  p > b {
    color: var(--printess-headlineColor);
  }
`;
export const desktopPropertyStyles = css `
  
    :host {
      display: block;
      width: 100%;
      overflow: hidden; 
    } 
     
   /* :host > *:not(.seperator) {*/
    :host > *:not(.two-cols) {
      /*border-bottom: 20px solid yellow;*/
        margin-bottom: 7px;
    }
    .two-cols > * {
      margin-bottom: 7px;
    }
    .seperator {
      height: 0px;
      opacity: 0.5;
      border-bottom: dashed 1px var(--printess-textColorDisabled);
    }
    p {
      font-size: 12px;
      color: var(--printess-textColor);
      margin: 0px;
      margin-bottom: 3px;
    }
    b {
      background-color: var(--printess-headlineColor);
      color: white;
      padding: 2px;
      padding-left: 6px;
      padding-right: 6px;
      border-radius: 15%;
      box-shadow: 1px 1px 2px 0px rgba(0,0,0,0.75);
      margin-right: 3px;
      margin-left: 3px;
    }
    h5 {
      font-size: 14px;
      color: var(--printess-textColor);
      margin-bottom: 3px;
      margin-top: 2px;
    }
    .section-head {
        font-size: var(--printess-labelSize);
        margin: 0;
        margin-bottom: 10px;
    }
    .two-cols {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 5px;
  }
  .two-cols.uneven {
      grid-template-columns: auto 1fr;
      
  }
  .two-cols.fr2fr1 {
      grid-template-columns: 2fr 1fr;
      
  }
    .buyer-properties-devider {
        margin-top: 20px;
        margin-bottom: 5px;
        background: var(--printess-headlineColor);
        color:  var(--printess-headlineColorInverse);
        padding: 4px;
        font-size: var(--printess-textSize); /* 16px; */
        text-transform: uppercase;
        letter-spacing: 2px;
    }
    .admin-properties-devider {
        position: relative;
        margin-top: 20px;
        margin-bottom: 5px;
        background: var(--printess-headlineColor);
        color:  var(--printess-headlineColorInverse);
        padding: 2px;
        padding-bottom: 3px;
        font-size: var(--printess-labelSize);  
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    .anchor-grid {
      display: grid;
            
      align-items: stretch;
      align-content: stretch;
      grid-gap: 8px 8px;
      grid-template-rows:   var(--printess-anchor-size)  var(--printess-anchor-size)  var(--printess-anchor-size) ;
      grid-template-columns:    var(--printess-anchor-size)  var(--printess-anchor-size)  var(--printess-anchor-size) ;
                  
      grid-template-areas:  "m_lt m_ct m_rt"
                            "m_lm m_cm m_rm"
                            "m_lb m_cb m_rb";
      margin-top: 10px;                        
    }
    
    .anchor-box {
        grid-column-start: m_lt; 
        grid-column-end: m_rb;
        grid-row-start: m_lt; 
        grid-row-end: m_rb;
        padding: calc(var(--printess-anchor-size) / 2);
    }
    .anchor-box > div {
        border: 1px solid var(--printess-headlineColor); 
        height: 100%;
    }
    .anchor-grid > .checker {
        border: var(--printess-headlineColor) 1px solid;
      border-radius: 10%;
      transition: border-color;
      transition-duration: 0.7s;
      cursor: pointer;
    }
    .anchor-grid > .checker:hover {
         background-color: white;
    }
    
    .anchor-grid >  .on {
        background-color: var(--printess-headlineColor);
    }
    .anchor-grid >  .off {
        background-color: #eee;
    }
    
    .anchor-grid > .checker.on:hover {
        background-color: var(--printess-headlineColorHover);
    }
    
    .anchor-grid > .mixed {
        background-color: #ddd;
    }
    .anchor-grid > .null {
        background-color: yellow;
    }
`;
export const desktopBuyerGroupStyles = css `
  
    :host {
      display: block;
      width: 100%;
      overflow: hidden; 
    } 
   /* :host > *:not(.seperator) {*/
    :host > *:not(.two-cols) {
      /*border-bottom: 20px solid yellow;*/
        margin-bottom: 7px;
    }
    .two-cols > * {
      margin-bottom: 7px;
    }
    .seperator {
      height: 0px;
      opacity: 0.5;
      border-bottom: dashed 1px var(--printess-textColorDisabled);
    }
    p {
      font-size: 12px;
      color: var(--printess-textColor);
      margin: 0px;
      margin-bottom: 3px;
    }
    b {
      background-color: var(--printess-headlineColor);
      color: white;
      padding: 2px;
      padding-left: 6px;
      padding-right: 6px;
      border-radius: 15%;
      box-shadow: 1px 1px 2px 0px rgba(0,0,0,0.75);
      margin-right: 3px;
      margin-left: 3px;
    }
    h5 {
      font-size: 14px;
      color: var(--printess-textColor);
      margin-bottom: 3px;
      margin-top: 2px;
    }
    .section-head {
        font-size: var(--printess-labelSize);
        margin: 0;
        margin-bottom: 10px;
    }
    .two-cols {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 5px;
  }
    .two-cols.uneven {
      grid-template-columns: auto 1fr;
      
  }
    .header-bar {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        margin-top: 20px;
        margin-bottom: 5px;
        background: var(--printess-headlineColor);
       
        padding: 4px;
       
    }
    .header-bar-title {
      font-size: var(--printess-textSize); /* 16px; */
      text-transform: none;
      letter-spacing: 0px;
      color: var(--printess-headlineColorInverse);
    }
    .header-button {
      grid-column: 3;
      border: 1px solid var(--printess-headlineColorInverse);
      cursor: pointer;
      display: flex;
      align-items: center;
      flex-direction: row;
    } 
    .header-button:hover {
      background-color: rgba(0,0,0,0.1);
    }
    .header-button-icon {
      padding: 2px;
      width: 24px;
      height: 24px;
      font-size: var(--printess-textSize); /* 16px; */
      text-transform: uppercase;
      color:  var(--printess-headlineColorInverse);
    }
    .header-button-text {
      padding: 2px 6px;
      font-size: var(--printess-textSize); /* 16px; */
      text-transform: none;
      letter-spacing: 0px;
      color:  var(--printess-headlineColorInverse);
    }
    /****** IMAGE PROPERTIES ******/
    .image-property-grid {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-column-gap: 15px;
      align-items: center;
    }
    
    .image-property-caption {
      color: var(--printess-headlineColor);
      font-size: 14px; 
      font-weight: bold;
    }
    .image-property-container {
      display: flex;
      flex-wrap: wrap;
    }
    .image-property-button {
      margin: 5px;
      padding: 3px;
      background-color:  var( --printess-fatButtonBackgroundSelected);
      color:  var(--printess-fatButtonForeground);
      border-radius: 2px;
      cursor: pointer;
      display: flex;
      align-items: center;
      flex-direction: row;
    } 
    
    .image-property-button-icon {
      padding: 2px;
      width: 24px;
      height: 24px;
      font-size: var(--printess-textSize); /* 16px; */
      fill:  var(--printess-fatButtonForeground);
    }
    .image-property-button-text {
      padding: 2px 6px;
      font-size: var(--printess-textSize); /* 16px; */
      text-transform: none;
      letter-spacing: 0px;
      color:  var( --printess-fatButtonForeground);
    } 
    .image-property-button.sepia > * {
      color: #a39775;
      fill: #a39775;
    }
    .image-property-button.enhance > * {
      color: #7b658b;
      fill: #7b658b;
    }
    .image-property-button:hover {
      background-color: var(--printess-headlineColor);
    }
    .image-property-button:hover > * {
      color: var(--printess-headlineColorInverse);
      fill: var(--printess-headlineColorInverse);
    }
    
   /* .image-property-button.sepia:hover > * {
      color: #746b53;
      fill: #746b53;
    }*/
  
   /* .image-property-button.enhance:hover > * {
      color: #544560;
      fill: #544560;
    }*/
   
    
    .color-list {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
    .color-list > * {
      margin: 4px;
    }
    
    .admin-properties-devider {
        position: relative;
        margin-top: 20px;
        margin-bottom: 5px;
        background: var(--printess-headlineColor);
        color:  var(--printess-headlineColorInverse);
        padding: 2px;
        padding-bottom: 3px;
        font-size: var(--printess-labelSize);  
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    .anchor-grid {
      display: grid;
            
      align-items: stretch;
      align-content: stretch;
      grid-gap: 8px 8px;
      grid-template-rows:   var(--printess-anchor-size)  var(--printess-anchor-size)  var(--printess-anchor-size) ;
      grid-template-columns:    var(--printess-anchor-size)  var(--printess-anchor-size)  var(--printess-anchor-size) ;
                  
      grid-template-areas:  "m_lt m_ct m_rt"
                            "m_lm m_cm m_rm"
                            "m_lb m_cb m_rb";
      margin-top: 10px;                        
    }
    
    .anchor-box {
        grid-column-start: m_lt; 
        grid-column-end: m_rb;
        grid-row-start: m_lt; 
        grid-row-end: m_rb;
        padding: calc(var(--printess-anchor-size) / 2);
    }
    .anchor-box > div {
        border: 1px solid var(--printess-headlineColor); 
        height: 100%;
    }
    .anchor-grid > .checker {
        border: var(--printess-headlineColor) 1px solid;
      border-radius: 10%;
      transition: border-color;
      transition-duration: 0.7s;
      cursor: pointer;
    }
    .anchor-grid > .checker:hover {
         background-color: white;
    }
    
    .anchor-grid >  .on {
        background-color: var(--printess-headlineColor);
    }
    .anchor-grid >  .off {
        background-color: #eee;
    }
    
    .anchor-grid > .checker.on:hover {
        background-color: var(--printess-headlineColorHover);
    }
    
    .anchor-grid > .mixed {
        background-color: #ddd;
    }
    .anchor-grid > .null {
        background-color: yellow;
    }
    .imageListWrapper {
        display: block;
        width: 100%;
        overflow-x: auto;
        padding-bottom: 22px; /* because of scrollbar */
    }
    .imageList {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        margin: -2px;
    }
    .imageItem {
        display: grid;
        grid-template-columns: 70px;
        grid-template-rows: 70px;
        margin: 2px;
        cursor: pointer;
    }
    .small-image-list {
        height: 70px;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin: 2px;
    }
    .small-image-item {
        width: 33px;
        height: 33px;
        margin-right: 2px;
        margin-bottom: 2px;
        cursor: pointer;
    }
   
    .imageBox {
        width: 100%;  
        height: 100%;
      
        background-size: cover;
        border: 1px solid  var(--printess-textColor);
        border-radius: 3px;
        background-color: #bbb;
     } 
     .imageBox:hover {
      border: 1px solid  var(--printess-headlineColor);
     }
     .imageBox.selected {
        border: 2px solid  var(--printess-headlineColor);
    }
    .imageName {
        font-size: 9px;
        text-overflow: ellipsis;
        width: 100%;
        overflow:hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
    }   
    .image-upload .progress {
      width: 250px; 
      border: 1px solid black; 
      height: 22px;
    }
    .image-upload-progress > div {
      background: var(--printess-headlineColor); 
      height: 100%; 
      color: var(--printess-headlineColorInverse);
      text-align: center;
      padding: 2px;
    }

    









    
`;
export const masterStyles = css ` 
:root {
    --printess-properties-width: 442px;
    --printess-resourcebar-width: 32px;
    --printess-toolbar-width: 38px;
    --printess-open-toolbar-width: 72px;
    --printess-top-tabs-height: 36px;
    --printess-dialog-padding: 20px;
    --printess-anchor-size: 10px; /* small boxes in anchor grid */
    /**** PATH EDITOR  ******/
    --printess-path-editor-cover-bg: rgba(0,0,0,0.1);
    --printess-path-editor-cover-border: 1px solid rgba(0,0,0,0.5);
    --printess-path-editor-path-color: #21b7ff;
    --printess-path-editor-disabled-path-color: #bbbbbb;
    /**** Z-INDEX *****/
    --printess-z-index-ui-hint: 9987;
    --printess-z-index-context-menu: 9990;
    --printess-z-index-box-drag: 9985;
    --printess-z-index-box-selection: 9980;
    --printess-z-index-click-action-boxes: 9975;
    --printess-z-index-page-border: 9970;
    --printess-z-index-pasteboard: 9960;
    --printess-z-index-bleed: 9962;
    
    
    /*** FRAME  ***/
    --printess-frame-mover-size: 5px;
    --printess-extra-mover-catch-offset: -14px;
    --printess-cropper-large-side: 15px;
    --printess-cropper-small-side: 5px;
    --printess-annotationColor: DarkSlateBlue;
    --printess-rubberBandColor: red;
    --printess-resource-toolbar-width: 32px;
    --printess-resource-panel-initial-width: 200px;
    /* Mobile buyer side */ 
    /***** FORM PADDING *****/
    --printess-input-top-padding: 0; /*8px;*/ 
 
    /***** TEXT SIZE *****/
    --printess-annotationSize: 10px;
    --printess-labelSize: 11px;
    --printess-inputSize: 12px;
    --printess-textSize: 14px;
    --printess-headlineSize: 18px;
 
    /****** HEAD-TOOLBAR *******/ 
    --printess-headToolbarColor: white;
    --printess-headToolbarColorHover: #ffcccc;
    --printess-headToolbarBackgroundColor:   rgb(150, 150, 150);
    --printess-headToolbarBorderColor:   #444444; 
    /*** VAADIN COLOR MAPPING ***/
    --lumo-primary-text-color: var(--printess-headlineColor);
    --lumo-primary-color: var(--printess-headlineColor);
    --lumo-secondary-text-color: var(--printess-textColor) ;
    --lumo-disabled-text-color: var(--printess-textColorDisabled);  
    --lumo-body-text-color: var(--printess-inputColor);
    --lumo-base-color: var(--printess-panelBackground);
    --lumo-contrast-60pct: var(--printess-textColor);
    --lumo-contrast-5pct: var(--printess-inputBackgroundDisabled); /* input disabled background color */ 
    --lumo-contrast-10pct: var(--printess-inputBackground); /*rgba(255,255,255,0.2);*/ /* input background-color */
    --lumo-contrast-20pct: var(--printess-radioBackground); /*rgba(255,255,255,0.2);*/ /* input background-color used in radio buttons */
    --lumo-contrast-30pct: var(--printess-radioBackgroundHover); /*rgba(255,255,255,0.2);*/ /* input background-color used in radio buttons */
    --lumo-space-m: var(--printess-input-top-padding); /* padding-top of vaadin-text-box */
    --vaadin-text-field-default-width: 50px; /* make smaller to addopt to 100% later */
    /*input and button captions */ 
    --lumo-font-size-s: var(--printess-inputSize); /* input box size */
    --lumo-font-size-m:  var(--printess-inputSize); /* select-box does not react to theme=small */
    /*labels*/
    --lumo-font-size-xs:  var(--printess-labelSize); 
   
    /* MOBILE THEME DEFAULT */ 
    --printess-maxContrastColor: white;
    --printess-maxContrastColorInverse: black;
   
    /****** TEXT COLORS ********/
    --printess-headlineColor: #ff82d7;  
    --printess-headlineColorInverse: white;  
    --printess-headlineColorHover: #ffbeea;  
    --printess-textColor:#fff;
    --printess-textColorDisabled: #ddd;
    --printess-menuColorDisabled: #aaa;
    --printess-textColorHover: #fff;
    
    --printess-inputColor: white;
    --printess-inputColorDisabled:  rgb(200,200,200);
    --printess-inputBackground: rgba(255, 255, 255, 0.1);
    --printess-radioBackground: rgba(255, 255, 255, 0.2);
    --printess-radioBackgroundHover: rgba(255, 255, 255, 0.3);
    --printess-inputBackgroundDisabled: rgba(255, 255, 255, 0.05); 
    /****** FAT-BUTTON *****/
    --printess-fatButtonBackground: var(--printess-panelBackground);
    --printess-fatButtonBackgroundHover: var( --panelBackgroundHover:);
    --printess-fatButtonBackgroundSelected: var(--printess-panelBackgroundSelected);
    --printess-fatButtonForeground: var(--printess-textColor);
    --printess-fatButtonForegroundSelected: var(--printess-headlineColor);
     /****** SIDE-TOOLBARs *******/ 
    --printess-toolbarColor:  #fff;
    --printess-toolbarColorHover: #fff;
    --printess-toolbarBackgroundSelected: #000;
    --printess-toolbarBackground: #333; 
    --printess-toolbarBackgroundHover: #222;
    --printess-toolbarBorderColor:  Indigo; /* black */
     /*** PANEL COLORS ***/
    --printess-panelBackground: #15518e; //   hsl(214, 90%, 52%);  
    --printess-panelBackgroundSelected: #2a2a2a;
    --printess-panelAnchorMixed: #934a7c;
    --printess-panelBackgroundHover: #222;
    --printess-slider-rail: hsl(216, 85%, 68%);
    --printess-frameColor: #21b7ff;
    --printess-frameColorHover:  #1ca0df;
     
}
/* DESKTOP / TABLET STYLES */






  
*, *:before, *:after {
    box-sizing: border-box;
}
#printessMainGrid h1 {
  color: var(--printess-headlineColor);
}
#printessMainGrid h2 {
  color: red; 
}
#printessMainGrid {
    background: var(--printess-panelBackground); /* #727272;*/
    font-family: Lato, sans-serif; 
    font-size: var(--printess-textSize);
    overflow: hidden;
    margin: 0;
    padding: 0;
    color:  var(--printess-textColor); 
    opacity: 0; /* until loaded */
}
.printess-container-fullscreen {
  position: absolute !important;
  left: 0 !important;
  top: 0 !important;
  width: initial !important;
  height: initial !important;
  right: 0 !important;
  bottom: 0 !important;
}
#printessCopyPasteIndicator {
    background-color: black;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: none;
    opacity: 0.25;
}
#printess-clipboard-container {
    height: 16px;
    width: 50px;
    position: absolute;
   right: 100px;;
    top: 0
}
 
/*
 ************** MAIN LAYOUT GRID  *******************
 */
#printessMainGrid {
    transform: none;
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /*width: 100vw;
    height: 100vh;*/
   /* background-color: transparent;*/
    display: grid;
    grid-gap: 0;
    grid-template-rows: 0px 36px auto 100px;
    grid-template-columns: 1fr;
    grid-template-areas: 'doc-selector' 'toolbar' 'stage' 'properties';
}
#printessMainGrid.hide-controls {
    grid-template-areas: 'stage';
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
}
#printessMainGrid.hide-controls > .doc-selector,
#printessMainGrid.hide-controls > .toolbar,
#printessMainGrid.hide-controls > .printess-resources,
#printessMainGrid.hide-controls > .printess-properties,
#printessMainGrid.hide-controls > .printess-buyer-pages,
#printessMainGrid.hide-controls > .printess-data-panel,
#printessMainGrid.hide-controls > .printess-footer,
#printessMainGrid.hide-controls > #resourcesSplitterBar,
#printessMainGrid.hide-controls > #propertiesSplitterBar
{
  display: none !important;
}
.printess-data-panel {
  border-top: 1px solid black;
  grid-area: data;
  height: inherit;
}
.printess-resources {
    grid-area: resources;
    display: none;
    height: 100%;
    background: var(--printess-panelBackground);
}
#propertiesSplitterBar {
    grid-area: propertiesSplitterBar;
}
#resourcesSplitterBar {
    grid-area: resourcesSplitterBar;
    display: none;
}
#printessMainGrid.admin > #resourcesSplitterBar {
    display: block;
}
#resourcesSplitterBar, #propertiesSplitterBar {
    background-color: black; /* loooks better in dark and light mode var(--printess-maxContrastColor); */
    cursor: ew-resize;
    position: relative;
    display: none;
}
#resourcesSplitterBar::after, #propertiesSplitterBar::after {
    content: "";
    position: absolute;
    background-color: transparent;
    width: 7px;
    left: -3px;
    top: 0;
    bottom: 0;
    cursor: ew-resize;
}
.printess-nav-bar {
    grid-row: 2;
    height: 100%;
    width: 100%;
    grid-area: toolbar;
}
.printess-doc-selector {
    grid-row: 1;
    grid-area: doc-selector;
    display: none;
}
.printess-stage {
    grid-area: stage;
    height: 100%;
    overflow: hidden;
    background: #4e4e50;
    position: relative;
}
.printess-stage  > .printess-content {
    width: 1200px;
    height: 1200px;
    position: relative;
    /* background: white;*/
}
.printess-properties {
    grid-area: properties;
    height: 100%;
    background: var(--printess-panelBackground);
    position: relative;
}
.printess-buyer-pages {
    grid-area: pages;
    height: 100%;
    display: none;
    background: var(--printess-panelBackground);
}
#printessMainGrid.buyer > .printess-buyer-pages {
    display: block;
}
.printess-footer {
    background-color: lightblue;
    grid-area: footer;
}














 /*
 ******** SAFARI WEB APP NOTIFICATION 
 */
 #webAppNotification {
  z-index: 99999;
  display: none;
  position: absolute;
  bottom: 30px;
  left: 5%;
  right: 5%;
  height: 80px;
  padding: 7px;
  border-radius: 3px;
  background-color: #f7f8ef; /* ED6BB8FF*/ 
  color:  black;
  text-align: center;
  font-size: 14px;
  line-height: 1.2;
  box-shadow: 0px 5px 10px black;
} 
/* Triangle hack to make tooltip look like a speech bubble */
#webAppNotification:after {
  position: absolute;
  bottom: -20px;
  left: 50%;
  margin-left: -5px;
  width: 0;
  border-top: 20px solid #f7f8ef;
  border-right: 20px solid transparent;
  border-left: 20px solid transparent;
  content: " ";
  font-size: 0;
  line-height: 0;
  
}
#webAppNotification > .closeAppNotification {
  position: absolute;
  cursor: pointer;
  left: 4px;
  top: 4px;
  text-decoration: underline; 
  color: darkblue;
}
#webAppNotification > .closeAppNotification:hover {
  color: red;
}
/*
 ************** CONTEXT MENU AND TOAST************
 */
/*
.printess-toastwrp {
    position: absolute;
    top: 0px;
    right: 0px;
    left: 0px;
    bottom: 0px;
    overflow: hidden;
    z-index: -999;
}
.printess-toast {
    position: absolute;
    border-radius: 3px;
    padding: 5px;
    background-color: rgba(0, 0, 0, 0.43);
    color: rgba(255, 255, 255, 0.84);
    animation-name: printess-toast;
    animation-duration: 1s;
    animation-iteration-count: 1;
    transition-timing-function: cubic-bezier(0.27, 0.81, 0.86, 1.37);
}
@keyframes printess-toast {
    0% {
        top: 100vh;
    }
    30% {
        top: 90vh;
    }
    80% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        top: 90vh;
    }
}*/
/* BASIC MENU */
.printess-ctx-menu, .printess-rev-ctx-menu, .printess-sub-menu {
    cursor: pointer;
    position: absolute;
    border-radius: 2px;
    width: 150px;
    height: 200px;
    background-color: white;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.05) inset, 0px 0px 4px #555;
    animation-duration: 0.2s;
    animation-iteration-count: 1;
    transition: 0.2s;
    font-family: Lato, sans-serif; 
}
.printess-ctx-menu-item {
    position: relative;
    display: grid;
    grid-template-columns: 24px 1fr 24px;
    grid-template-rows: 28px;
    list-style-type: none;
    align-items: stretch;
    justify-content: stretch;
    width: 100%;
  
}
.printess-ctx-menu-item-seperator {
    display: block;
    width: 100%;
    height: 1px;
    background-color: var(--printess-textColorDisabled);
    margin-top: 3px;
    margin-bottom: 3px;
}
.printess-ctx-menu-item > .printess-ctx-menu-caption {
  color: #555555;
  white-space: nowrap;
  align-self: center;
  font-size: var(--printess-inputSize);
  padding-left: 10px;
}
.printess-ctx-menu-item > wc-icon {
   width: 16px;
   height: 16px; 
   align-self: center;
   justify-self: center;
}
.printess-ctx-menu-item > wc-icon.arrow {
   width: 14px;
   height: 14px;
   align-self: center;
   justify-self: center;
}
.printess-ctx-menu-item > .color {
   width: 16px;
   height: 16px;
   align-self: center;
   justify-self: center;
}
.printess-ctx-menu-item.disabled > .printess-ctx-menu-caption{
    color: var(--printess-menuColorDisabled);
}
.printess-ctx-menu-item:hover {
    background-color: var(--printess-headlineColor);
}
.printess-ctx-menu-item:hover > .printess-ctx-menu-caption, .printess-ctx-menu-item:hover > wc-icon {
    color: #fff;
}
 .printess-ctx-menu-item.disabled:hover {
    background-color: transparent; 
    
}
 .printess-ctx-menu-item.disabled:hover > .printess-ctx-menu-caption{
     color: var(--printess-menuColorDisabled);
}
.printess-ctx-menu:hover, .printess-rev-ctx-menu:hover, .printess-sub-menu:hover {
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.05) inset, 0px 4px 8px #555;
}
.printess-ctx-menu ul {
    margin: 0;
    padding: 0;
    text-align: left;
}
.printess-ctx-menu {
    animation-name: printess-appear;
    z-index: var(--printess-z-index-context-menu);
}
.printess-rev-ctx-menu {
    animation-name: printess-revappear;
}
.printess-sub-menu {
    height: 175px;
    display: none;
    overflow: auto;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.05) inset, 0px 4px 8px #555;
}
.printess-sub-menu:hover {
    display: block;
}
.printess-red-line {
    position: absolute;
    height: 3px;
    width: 25px;
    top: 12px;
    left: 1px;
    transform-origin: 50% 50%;
    transform: rotate(45deg);
    background-color: red;
}
@keyframes printess-appear { 
    0% {
        transform: scale(0.1) translateX(-100px);
    }
    100% {
        transform: scale(1) translateX(0px);
    }
}
@keyframes printess-revappear {
    0% {
        transform: scale(0.1) translateX(100px);
    }
    100% {
        transform: scale(1) translateX(0px);
    }
}
`;
//# sourceMappingURL=styles.js.map
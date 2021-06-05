import { createOverlayDiv } from "./tools.js";
import { WcIcon } from "../components/icons/WcIcon";
const menuItemH = 28;
const submMenuHGap = menuItemH * 0.25;
const contextOverlayDiv = createOverlayDiv();
contextOverlayDiv.addEventListener("mousedown", removeCtxMenu);
const contextMenuDiv = document.createElement('div');
contextMenuDiv.classList.add("printess-ctx-menu");
contextMenuDiv.id = "contextMenu";
let canReceiveMenuClick = false;
function getLi(itm) {
    const li = document.createElement("li");
    if (itm.caption === "-") {
        li.classList.add("printess-ctx-menu-item-seperator");
        return li;
    }
    li.classList.add("printess-ctx-menu-item");
    if (itm.callback && !(itm.disabled === true)) {
        li.addEventListener("mouseup", () => {
            if (canReceiveMenuClick && itm.callback)
                itm.callback();
        });
    }
    if (itm.disabled) {
        li.classList.add("disabled");
        if (itm.icon) {
            const icon = new WcIcon();
            icon.icon = itm.icon;
            icon.primaryColor = "gray";
            li.appendChild(icon);
        }
        else {
            li.appendChild(document.createElement("div"));
        }
    }
    else if (!itm.textOnly) {
        if (itm.icon) {
            const icon = new WcIcon();
            icon.icon = itm.icon;
            if (itm.icon.indexOf("-invers") >= 0) {
                icon.primaryColor = "headline";
            }
            else {
                icon.primaryColor = "text";
            }
            li.appendChild(icon);
        }
        else {
            const icon = document.createElement("div");
            if (itm.color) {
                icon.style.backgroundColor = itm.color;
                icon.classList.add("color");
            }
            li.appendChild(icon);
        }
    }
    const caption = document.createElement("div");
    caption.classList.add("printess-ctx-menu-caption");
    caption.innerText = itm.caption;
    if (itm.font) {
        caption.style.fontFamily = itm.font;
        caption.style.fontSize = "11pt";
    }
    li.appendChild(caption);
    if (itm.sub) {
        const icon = new WcIcon();
        icon.icon = "carret-right-solid";
        icon.primaryColor = "text";
        icon.classList.add("arrow");
        li.appendChild(icon);
    }
    return li;
}
export function showCtxMenu(event, items, xOffset = 0, yOffset = 0, pixelWidth = 180, showIfEddiIsActive = false) {
    event.preventDefault();
    const menuWidth = pixelWidth;
    removeCtxMenu();
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    if (!event.target)
        return;
    if (!items) {
        const wc = event.target;
        if (typeof wc.getContextMenu === "function") {
            items = wc.getContextMenu(event.target, mouseX, mouseY);
        }
    }
    if (!items)
        return;
    const menuHeight = (items.filter(i => i.caption !== "-").length * menuItemH) + (items.filter(i => i.caption === "-").length * 7);
    contextMenuDiv.style.height = menuHeight + "px";
    contextMenuDiv.style.width = menuWidth + "px";
    event.preventDefault();
    let curX = mouseX;
    let curY = mouseY;
    let curSubX = mouseX;
    let curSubY = mouseY;
    contextMenuDiv.innerHTML = "";
    const menu = document.createElement("div");
    contextMenuDiv.appendChild(menu);
    const ul = document.createElement("ul");
    menu.appendChild(ul);
    canReceiveMenuClick = false;
    for (const itm of items) {
        const li = getLi(itm);
        li.addEventListener("mousedown", () => {
            canReceiveMenuClick = true;
        });
        li.addEventListener("mouseup", () => {
            if (canReceiveMenuClick)
                removeCtxMenu();
        });
        if (itm.sub && itm.sub.length) {
            li.classList.add("printess-sub-menu-trigger");
            const submenu = document.createElement("div");
            const subUl = document.createElement("ul");
            submenu.appendChild(subUl);
            submenu.classList.add("printess-sub-menu");
            for (const subItem of itm.sub) {
                const li = getLi(subItem);
                subUl.appendChild(li);
            }
            if ((window.innerHeight - mouseY) < submMenuHGap) {
                curSubY = (submMenuHGap - 40) - ((mouseY + submMenuHGap) - window.innerHeight);
            }
            else {
                curSubY = submMenuHGap;
            }
            if ((window.innerWidth - mouseX) < menuWidth * 2) {
                curSubX = -menuWidth;
            }
            else {
                curSubX = menuWidth;
            }
            submenu.style.top = curSubY + 'px';
            submenu.style.left = curSubX + 'px';
            submenu.style.width = menuWidth + 'px';
            li.onmouseover = () => {
                submenu.style.display = 'block';
            };
            submenu.onmouseover = () => {
                submenu.style.display = 'block';
            };
            li.onmouseout = () => {
                submenu.style.display = 'none';
            };
            submenu.onmouseout = () => {
                submenu.style.display = 'none';
            };
            li.appendChild(submenu);
        }
        ul.appendChild(li);
    }
    if (mouseY + menuHeight > window.innerHeight) {
        curY = window.innerHeight - menuHeight - 10;
    }
    else {
        curY = mouseY;
    }
    if ((window.innerWidth - (mouseX + xOffset)) < menuWidth) {
        curX = mouseX - menuWidth;
        contextMenuDiv.classList.add("printess-rev-ctx-menu");
    }
    else {
        contextMenuDiv.classList.remove("printess-rev-ctx-menu");
        curX = mouseX;
    }
    contextMenuDiv.style.top = (curY + yOffset) + 'px';
    contextMenuDiv.style.left = (curX + xOffset) + 'px';
    document.body.appendChild(contextOverlayDiv);
    document.body.appendChild(contextMenuDiv);
}
export function showColorList(mouseX, mouseY, colors, callback, selected) {
    removeCtxMenu();
    const width = 240;
    const cw = 30;
    const menuHeight = Math.ceil(colors.length / (width / cw)) * cw;
    contextMenuDiv.style.height = menuHeight + "px";
    contextMenuDiv.style.width = width + "px";
    let curX = mouseX;
    let curY = mouseY;
    contextMenuDiv.innerHTML = "";
    const menu = document.createElement("div");
    contextMenuDiv.appendChild(menu);
    const colorPanel = document.createElement("div");
    colorPanel.style.display = "flex";
    colorPanel.style.flexWrap = "wrap";
    colorPanel.style.flexDirection = "row";
    menu.appendChild(colorPanel);
    for (const color of colors) {
        const colorBox = document.createElement("div");
        colorBox.style.width = cw + "px";
        colorBox.style.height = cw + "px";
        colorBox.style.position = "relative";
        colorBox.style.backgroundColor = color;
        if (color === selected) {
            colorBox.style.border = "2px solid  black";
        }
        if (color === "transparent") {
            const redLine = document.createElement("div");
            redLine.classList.add("printess-red-line");
            colorBox.appendChild(redLine);
        }
        const cb = (function (color) {
            return () => {
                removeCtxMenu();
                callback(color);
            };
        }(color));
        colorBox.addEventListener("mouseup", cb);
        colorPanel.appendChild(colorBox);
    }
    if (mouseY + menuHeight > window.innerHeight) {
        curY = window.innerHeight - menuHeight - 10;
    }
    else {
        curY = mouseY;
    }
    if ((window.innerWidth - width) < mouseX) {
        curX = mouseX - width;
        contextMenuDiv.classList.add("printess-rev-ctx-menu");
    }
    else {
        contextMenuDiv.classList.remove("printess-rev-ctx-menu");
        curX = mouseX;
    }
    contextMenuDiv.style.top = (curY) + 'px';
    contextMenuDiv.style.left = curX + 'px';
    document.body.appendChild(contextOverlayDiv);
    document.body.appendChild(contextMenuDiv);
}
function removeCtxMenu() {
    if (contextMenuDiv.parentElement) {
        document.body.removeChild(contextMenuDiv);
    }
    if (contextOverlayDiv.parentElement) {
        document.body.removeChild(contextOverlayDiv);
    }
}
export function contextMenuIsOpen() {
    if (contextMenuDiv.parentElement) {
        return true;
    }
    if (contextOverlayDiv.parentElement) {
        return true;
    }
    return false;
}
//# sourceMappingURL=contextMenu.js.map
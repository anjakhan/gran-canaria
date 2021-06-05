export function assertNever(x, msg = "") {
    const eMsg = msg || "Unexpected object: " + x;
    throw new Error(eMsg);
}
;
export function createOverlayDiv() {
    const div = document.createElement("div");
    div.style.left = "0";
    div.style.top = "0";
    div.style.bottom = "0";
    div.style.right = "0";
    div.style.position = "absolute";
    div.style.backgroundColor = "transparent";
    div.style.cursor = "grab";
    return div;
}
export function isMobile(mobileDeviceWidth = 896) {
    const mq = window.matchMedia(`(min-width:  ${mobileDeviceWidth + 1}px)`);
    return !mq.matches;
}
//# sourceMappingURL=tools.js.map
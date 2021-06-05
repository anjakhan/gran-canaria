export function assertNever(x: never, msg: string = ""): never {
  const eMsg = msg || "Unexpected object: " + x;
  throw new Error(eMsg);
};

export function createOverlayDiv(): HTMLDivElement {

  const div: HTMLDivElement = document.createElement("div");

  div.style.left = "0";
  div.style.top = "0";
  div.style.bottom = "0";
  div.style.right = "0";
  div.style.position = "absolute";
  div.style.backgroundColor = "transparent";
  div.style.cursor = "grab";

  return div;
}

export function isMobile(mobileDeviceWidth: number = 896): boolean {
  const mq = window.matchMedia(`(min-width:  ${mobileDeviceWidth + 1}px)`);
  return !mq.matches;
}
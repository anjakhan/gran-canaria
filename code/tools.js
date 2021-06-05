export class ValueDebounce {
    constructor(callback) {
        this.timeout = 1000;
        this.callback = callback;
    }
    change(value, timeout = 1000) {
        this.value = value;
        window.clearTimeout(this.timeoutHandle);
        this.timeoutHandle = window.setTimeout(() => {
            this.callback(this.value);
        }, timeout);
    }
    immediate(value) {
        this.value = value;
        this.callback(value);
    }
}
//# sourceMappingURL=tools.js.map
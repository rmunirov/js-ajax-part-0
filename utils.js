export function debounce(func, timeoutMs) {
    return function perform(...args) {
        const prevCall = this.lastCall;
        this.lastCall = Date.now();
        if (prevCall && this.lastCall - prevCall <= timeoutMs) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            func(...args);
        }, timeoutMs);
    };
}

export function clearHTMLContainer(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

window.addEventListener("load", () => {
    // serice worker
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./worker.js?t=" + Date.now(), { scope: '/color-clicker/' });
    }
    // wake-lock
    window.appwakelock = null;
    const releasewl = () => {
        try {
            if (window.appwakelock && !window.appwakelock.released) {
                window.appwakelock.release();
                window.appwakelock = null;
            }
        } catch (err) { }
    };
    const requestwl = async () => {
        try {
            if (document.visibilityState === 'visible') {
                if (!window.appwakelock || window.appwakelock.released) {
                    window.appwakelock = await navigator.wakeLock.request();
                }
            } else {
                releasewl();
            }
        } catch (err) { }
    };
    requestwl();
    document.addEventListener('visibilitychange', requestwl);
    document.addEventListener('unload', releasewl);
});

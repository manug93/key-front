// plugins/loadFilesPlugin.js

export default function ({ app }, inject) {
    inject('loadFiles', {
        async loadScript(url) {
            if (app.$scriptsLoaded[url]) {
                return; // Script already loaded, skip
            }

            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;

            script.onload = () => {
                app.$scriptsLoaded[url] = true;
                console.log(`Script loaded: ${url}`); // Optional logging
            };

            script.onerror = () => {
                console.error(`Error loading script: ${url}`);
            };

            document.head.appendChild(script);
        },
        async loadCSS(url) {
            if (app.$cssLoaded[url]) {
                return; // CSS already loaded, skip
            }

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = url;

            link.onload = () => {
                app.$cssLoaded[url] = true;
                console.log(`CSS loaded: ${url}`); // Optional logging
            };

            link.onerror = () => {
                console.error(`Error loading CSS: ${url}`);
            };

            document.head.appendChild(link);
        },
    });

    // Initialize loaded files trackers
    app.$scriptsLoaded = {};
    app.$cssLoaded = {};
}

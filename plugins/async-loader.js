export default function ({ app }, inject) {
    const queue = []; // Queue to store URLs to load
    let isProcessingQueue = false; // Flag to track if the queue is being processed
    const processQueue = async () => {       
        if (isProcessingQueue || queue.length === 0) return;

        isProcessingQueue = true;
        const url = queue.shift(); // Get the first URL from the queue
        try {
            console.log(url);
            await loadResource(url); // Load the resource
        } catch (error) {
            console.error(`Error loading resource: ${url}`, error);
        } finally {
        
            isProcessingQueue = false;
            processQueue(); // Process next URL in the queue
        }
    };

    const loadResource = async ({url, type}) => {
        if (type === 'script' && app.$scriptsLoaded[url]) {
            return; // Script already loaded, skip
        } else if (type === 'css' && app.$cssLoaded[url]) {   
            return; // CSS already loaded, skip
        }

        return new Promise((resolve, reject) => {
            const element = type === 'script' ? document.createElement('script') : document.createElement('link');
            element.onload = () => {
                if (type === 'script') {
                    app.$scriptsLoaded[url] = true;
                } else if (type === 'css') {
                    app.$cssLoaded[url] = true;
                }
                resolve();
            };
            element.onerror = () => {
                reject(new Error(`Error loading ${type === 'script' ? 'script' : 'CSS'}: ${url}`));
            };
            if (type === 'script') {
                element.type = 'text/javascript';
                element.src = url;
            } else if (type === 'css') {
                element.rel = 'stylesheet';
                element.type = 'text/css';
                element.href = url;
            }
            document.head.appendChild(element);
        });
    };

    inject('loadFiles', {
        async loadScript(url) {
            queue.push({ url, type: 'script' });
            await processQueue(); // Process the queue
        },
        async loadCSS(url) {
            queue.push({ url, type: 'css' });
            await processQueue(); // Process the queue
        },
    });

    // Initialize loaded files trackers
    app.$scriptsLoaded = {};
    app.$cssLoaded = {};
}

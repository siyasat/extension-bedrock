// Import Modules
import { Browser } from './libs/browser.js';
import { SiyasatUtils } from './libs/siyasat-utils.js';

// Get Browser object
const browser = Browser.get();

// Get Browser Runtime
const runtime = Browser.getRuntime();

/**
 * onInstall
 * Tasks to do on install
 */
runtime.onInstalled.addListener(() => {
    Browser.store.get('done_onboard').then(res => {
        if(!res) {
            Browser.tab.create({ url: 'https://my.siyasat.org' });
            Browser.store.set({ done_onboard: true });
        }
    });
});

/**
 * onStartup
 * Tasks to do on startup
 */
runtime.onStartup.addListener(()=> {
    // List all context menu items
    const starterContextMenuArray = [
        {
            id: "report_link",
            title: "Report Link",
            contexts: ["link"]
        },
        {
            id: "fact_check",
            title: "Fact Check",
            contexts: ["selection"]
        }
    ];
    // Add context menu items
    Browser.contextMenu.create(starterContextMenuArray);
});

/**
 * onMessage
 * Handle messages sent by extension and content scripts
 */
runtime.onMessage.addListener(object => {

});

/**
 * Tab onUpdated
 * Handle events emitted by tabs
 */
browser.tabs.onUpdated.addListener((tab_id, change_info, tab) => {
    // Handle URL Load
    if(change_info.status === 'loading' && change_info.url) SiyasatUtils.handleUrlLoad(tab_id, change_info, tab);
});

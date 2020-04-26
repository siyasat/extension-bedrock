/**
 * Siyasat
 * 2020
 * All Rights Reserved
 */

// Get Browser Object
const BrowserObject = chrome || firefox;

/**
 * Browser
 * contains methods for dealing with the browser apis
 */
export const Browser = {

  // Return the BrowserObject
  get () { return BrowserObject },

  // Return the Browser Runtime
  getRuntime() { return BrowserObject.runtime },

  // Tab Methods
  tab: {
    // Get current tab
    getCurrent () {
      return BrowserObject.tabs.getCurrent();
    },
    // Create a tab
    create (object) {
      return BrowserObject.tabs.create(object);
    }
  },

  // Local Storage Methods
  store: {
    // Get
    async get (key) {
      return new Promise((resolve, reject) => {
        try {
          BrowserObject.storage.local.get([key], (result) => resolve(result[key]));
        } catch(e) {
          reject(e);
        }
      })
    },
    // Set
    async set (object) {
      return BrowserObject.storage.local.set(object);
    },
    // Remove one item
    async remove (key) {
      return BrowserObject.storage.local.remove(key);
    },
    // Remove all items
    async clear () {
      return BrowserObject.storage.local.clear();
    }
  },

  // Context Menu methods
  contextMenu: {
    // Create from array
    create (array) {
      array.forEach(obj => BrowserObject.contextMenus.create(obj));
    },
    // Create one from object
    createOne (object) {
      BrowserObject.contextMenus.create(object);
    }
  }
};
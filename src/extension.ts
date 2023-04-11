declare const chrome: {
    runtime: {
        getURL: (path: string) => string;
    };
};

declare const browser: {
    runtime: {
        getURL: (path: string) => string;
    };
};

export const extension = chrome
    ? {
          getURL: chrome.runtime.getURL,
      }
    : browser
    ? {
          getURL: browser.runtime.getURL,
      }
    : {
          getURL: (path: string) => path,
      };

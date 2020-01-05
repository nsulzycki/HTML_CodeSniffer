# HTMLCodesniffer Browser Extension

The project's guidelines were to create an Extension for browsers - to eliminate the use of bookmark bars.

Browser Extension - facilitates the use of HTMLCodesniffer by users and test the page in the language of their choice.

In addition, the JavaScript Same-Origin Policy problem has been eliminated.

## General

A folder has been created in the project:
```/Contrib/BrowserExtension```
In which you can find the entire configuration for the Browser Extension.

```
├── js
│   ├── header-bookmarklet.js
│   ├── umd-footer.js
│   └── umd-header.js
├── readme.md
└── web
    ├── assets
    │   ├── css
    │   │   ├── HTMLCSAuditor.css
    │   │   └── index.css
    │   └── js
    │       └── index.js
    ├── manifest.json
    └── popup.html
```




## Compile Browser Extension

In the Grunt.js file, new tasks have been created:
```bash
grunt uglify:browser 
grunt copy:browser
```


After running the above tasks, a folder is created: ```/webExt``` in the main project directory. 

There are all the necessary files that are necessary to manually install the add-on in the browser.

## Installation Browser Extension

Here is a short guide how to install an unpacked extension on Google Chrome or Firefox.

###Chrome
- Visit ```chrome://extensions/``` in your Chrome browser
- Click Load Unpacked
- Select the extension’s folder

###Firefox

- Visit ```about:debugging```
- Click on Load Temporary Add-on
- Select the manifest.json within the extension’s folder

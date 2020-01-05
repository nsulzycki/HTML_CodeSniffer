// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Called when the user clicks on the browser action.

function runHTMLCS() {
    var browser = browser || chrome;

    // var path = '//squizlabs.github.io/HTML_CodeSniffer/build/';
    var path = browser.extension.getURL("assets/css/");     //Get absolute path of the file residing your extension.

    var lang = this.dataset.lang;
    browser.tabs.executeScript({
        code: 'HTMLCSAuditor.run(\'WCAG2AA\', null, { lang: \'' + lang + '\', path: \'' + path + '\'});'
    });
}

var buttonElement = document.getElementsByClassName('run-HTMLCS');

for (var i = 0; i < buttonElement.length; i++) {
    buttonElement[i].addEventListener('click', runHTMLCS);
}


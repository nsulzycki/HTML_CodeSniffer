// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Called when the user clicks on the browser action.

function runHTMLCS() {

    // var path = '//squizlabs.github.io/HTML_CodeSniffer/build/';
    var path = chrome.extension.getURL("assets/css/");     //Get absolute path of the file residing your extension.

    var lang = this.dataset.lang;
    chrome.tabs.executeScript({
        code: 'HTMLCSAuditor.run(\'WCAG2AA\', null, { lang: \''+lang+'\', path: \''+path+'\'});'
    });
}

for(var i=0; i<=5; i++) {
    document.getElementsByClassName('run-HTMLCS')[i].addEventListener('click', runHTMLCS);
}

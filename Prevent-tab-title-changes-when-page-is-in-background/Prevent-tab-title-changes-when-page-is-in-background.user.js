// ==UserScript==
// @name        Prevent tab title changes when page is in background
// @namespace   https://github.com/SylwesterZarebski/UserScripts
// @grant       none
// @version     1.0.0
// @author      Sylwester Zarębski
// @copyright   2021, Sylwester Zarębski (https://github.com/SylwesterZarebski)
// @license     CC-BY-NC-SA-4.0; https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode
// @license     GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
// @homepage    https://github.com/SylwesterZarebski/UserScripts/tree/master/Prevent-tab-title-changes-when-page-is-in-background
// @homepageURL https://github.com/SylwesterZarebski/UserScripts/tree/master/Prevent-tab-title-changes-when-page-is-in-background
// @downloadURL https://github.com/SylwesterZarebski/UserScripts/raw/master/Prevent-tab-title-changes-when-page-is-in-background/Prevent-tab-title-changes-when-page-is-in-background.user.js
// @updateURL   https://github.com/SylwesterZarebski/UserScripts/raw/master/Prevent-tab-title-changes-when-page-is-in-background/Prevent-tab-title-changes-when-page-is-in-background.user.js
// @supportURL  https://github.com/SylwesterZarebski/UserScripts/issues
// @include http://*/*
// @include https://*/*
// ==/UserScript==

(function () {
  // Original title
  var title = "";
  var titleSet = false;
  var inEvent = false;
  
  window.addEventListener('blur', function() {
    // Save title
    title = document.title;
    // Set that title is set
    titleSet = true;
  }, false);

  new MutationObserver(function(mutations) {
    // Return if already in observer
    if (inEvent || !titleSet)
      return;
    // Set inside observer
    inEvent = true;
    // Read new title
    let titleNew = mutations[0].target.text;
    // If new title is different than old, then reset to previous, except when this script sets loading title
    if (title != titleNew)
      document.title = title;
    // Reset lock
    inEvent = false;
  }).observe(
    document.querySelector('title'),
    { subtree: true, characterData: true, childList: true }
  );
})();

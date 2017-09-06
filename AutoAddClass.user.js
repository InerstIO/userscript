// ==UserScript==
// @name         AutoAddClass
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*.reg.uci.edu:8889/cgi-bin/wramia
// @grant        none
// ==/UserScript==

//load jQuery
var jquery = document.createElement('script');
jquery.src = "http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jquery);
//jQuery.noConflict();

function Trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

function autoAdd(){
    t=$('th h2');
    if (Trim(t.text())!='you have added') {
        a=$('#add');
        a[0].checked=true;
        code=$('[name=courseCode]')[0];
        code.value='34920';                     //course code
        send=$('[value="Send Request"]')[0];
        send.click();
    }
}

setTimeout(autoAdd,60000);                      //wait 60s

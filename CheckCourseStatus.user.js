// ==UserScript==
// @name         CheckCourseStatus
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.reg.uci.edu/perl/WebSoc
// @grant        none
// ==/UserScript==

//load jQuery
var jquery = document.createElement('script');
jquery.src = "https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jquery);

function statusCheck(){
	if ($('.course-list tr:nth-child(73) td:last-child').text()!="FULL") {//child 73 is the line for CS 273A
		alert('CS 273A Status Not Full!');
	} else {
		location.reload(true);//refresh the page
	}
}

setTimeout(statusCheck,60000);//wait 60s

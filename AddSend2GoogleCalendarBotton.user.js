// ==UserScript==
// @name         AddSend2GoogleCalendarBotton
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://antplanner.appspot.com/
// @grant        none
// ==/UserScript==

var calCtrl=$('#cal-ctrl');
calCtrl.prepend('<button type="button" id="send2Gcal-btn" class="btn">Send to Google Calendar</button>');

$('#send2Gcal-btn').on('click', function() {
  alert('If the time zone on your device is not Pacific Time, please change the time zone to Pacific Time, '
    + 'refresh this page, reselect your courses (on this site, NOT NOT NOT UCI official WebReg), '
    +'and try again to avoid errors.');

  var calItems  = $('#cal').weekCalendar('serializeEvents');

  if(calItems.length == 0) {
    alert('No course data present.');
    return;
  }

  var url = [];
  var urlbase = 'https://www.google.com/calendar/event?action=TEMPLATE&text=';
  var courseNames = [];
  var coursePeriods = [];
  var courseLoca = [];
  var weekdays = ['SU','MO','TU','WE','TH','FR','SA'];
  var curTime = new Date();
  var curDay;
  var startTime;
  var endTime;

  function appendZero(obj) {
      if(obj<10) return "0" +""+ obj;
      else return obj;
  }

  for (var i = 0; i < calItems.length; i++) {
    courseNames.push(calItems[i].title.split(' at ')[0]);
    curDay = curTime.getUTCFullYear() + appendZero((curTime.getUTCMonth() + 1)) + appendZero(curTime.getUTCDate());
    startTime = curDay + 'T' + appendZero(calItems[i].start.getUTCHours())
      + appendZero(calItems[i].start.getUTCMinutes()) + appendZero(calItems[i].start.getUTCSeconds()) + 'Z';
    endTime = curDay + 'T' + appendZero(calItems[i].end.getUTCHours())
      + appendZero(calItems[i].end.getUTCMinutes()) + appendZero(calItems[i].end.getUTCSeconds()) + 'Z';
    coursePeriods.push([startTime,endTime,weekdays[calItems[i].start.getUTCDay()]]);
    courseLoca.push(calItems[i].title.split(' at ')[1].split('<br>')[0]);
    url.push(urlbase + courseNames[i] + '&dates=' + coursePeriods[i][0] + '/' + coursePeriods[i][1] + '&location='
      + courseLoca[i] + '&recur=RRULE:FREQ=WEEKLY;BYDAY=' + coursePeriods[i][2]);
  }

  function firm(url,i) {
    if(confirm('Send ' + courseNames[i] + ' (' + (i+1) + '/' + calItems.length + ') to Google Calendar?')) {
      window.open(url[i]);
    }
    else {
      return;
    }
  }

  for (var i = 0; i < url.length; i++) {
    firm(url,i);
  }

  alert('Finished. Go to the newly opened Google Calendar tabs if you haven\'t done it. '
    + 'Notice that the starting weeks of your courses on Google Calendar start from this/next week, '
    + 'and the calendar events don\'t stop automatically. You have to delete the courses manually after the quarter ends:-)');
});

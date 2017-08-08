// ==UserScript==
// @name        Add Name to Grades page
// @namespace   https://github.com/jamesjonesmath/canvancement
// @description Adds a users name to their all grades page
// @include     https://*.instructure.com/users/*/grades
// @version     1
// @grant       none
// ==/UserScript==
var includeSisId = true;
var nameOrder = [
  'short_name',
  'name',
  'sortable_name'
];
var regex = new RegExp('/users/([0-9]+)/grades$');
var matches = regex.exec(document.location);
if (matches) {
  $.getJSON('/api/v1/users/' + matches[1], function (data) {
    var name;
    for (var i = 0; i < nameOrder.length; i++) {
      var key = nameOrder[i];
      if (typeof data[key] !== 'undefined' && data[key]) {
        name = data[key];
        break;
      }
    }
    if (includeSisId && typeof data.sis_user_id !== 'undefined' && data.sis_user_id) {
      name += ' (' + data.sis_user_id + ')';
    }
    console.log(name);
    if (typeof name !== 'undefined') {
      $('h2:contains("Courses ")').text(name);
    }
  });
}
//add code for grades after this
// ==UserScript== 
// @name        View All Grades for a Student
// @namespace   https://github.com/jamesjonesmath/canvancement
// @include     /^https://.*\.instructure\.com/?.*/users/[0-9]+$/
// @version     1
// @grant       none
// ==/UserScript==
var regex = new RegExp('/users/([0-9]+)$');
var matches = regex.exec(document.location);
if (matches) {
  if ($('#jj_allgrades').length == 0) {
    var url = '/users/' + matches[1] + '/grades';
    $('#right-side-wrapper div').append('<a id="jj_allgrades" class="btn button-sidebar-wide" href="' + url + '"><i class="icon-gradebook"></i> View All Grades for Student</a>');
  }
}
//add letter grade on same line as percent grade
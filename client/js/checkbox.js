$(function () {
  'use strict';

  $("#plugins1").jstree({
    "checkbox" : {
      "keep_selected_style" : false
    },
    "plugins" : [ "checkbox" ]
  });
});

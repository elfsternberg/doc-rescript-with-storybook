'use strict';

var React = require("react");
var $$String = require("bs-platform/lib/js/string.js");

function Noncard(Props) {
  var words = Props.words;
  var tmp;
  if (words) {
    var words$1 = words._0;
    tmp = words$1 ? $$String.concat(" ", words$1) : "Loading...";
  } else {
    tmp = "Huh?";
  }
  return React.createElement("div", undefined, tmp);
}

var make = Noncard;

exports.make = make;
/* react Not a pure module */

'use strict';

var React = require("react");
var ReactDOMRe = require("reason-react/src/legacy/ReactDOMRe.bs.js");
var Nonsense$Nonsense = require("./Nonsense.bs.js");

ReactDOMRe.renderToElementWithId(React.createElement(Nonsense$Nonsense.make, {}), "app");

/*  Not a pure module */

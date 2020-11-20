'use strict';

var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Random = require("bs-platform/lib/js/random.js");
var $$String = require("bs-platform/lib/js/string.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Js_json = require("bs-platform/lib/js/js_json.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Caml_string = require("bs-platform/lib/js/caml_string.js");

function Nonsense(Props) {
  var match = React.useState(function () {
        return /* Words */{
                _0: /* [] */0
              };
      });
  var setState = match[1];
  var state = match[0];
  Random.self_init(undefined);
  var decodeWord = function (json) {
    return Belt_Option.flatMap(Belt_Option.flatMap(Belt_Option.flatMap(Belt_Option.flatMap(Js_json.decodeObject(json), (function (object_) {
                              return Js_dict.get(object_, "words");
                            })), Js_json.decodeArray), (function (words) {
                      return Belt_Array.get(words, 0);
                    })), Js_json.decodeString);
  };
  var gotWords = function (words$prime) {
    return Curry._1(setState, (function (state) {
                  if (state) {
                    return /* Words */{
                            _0: List.append(state._0, words$prime)
                          };
                  } else {
                    return /* Error */0;
                  }
                }));
  };
  var isVowel = function (letter) {
    return List.mem(letter, {
                hd: /* "a" */97,
                tl: {
                  hd: /* "e" */101,
                  tl: {
                    hd: /* "i" */105,
                    tl: {
                      hd: /* "o" */111,
                      tl: {
                        hd: /* "u" */117,
                        tl: /* [] */0
                      }
                    }
                  }
                }
              });
  };
  var gotWord = function (set, word) {
    switch (set) {
      case "nouns" :
      case "objects" :
          break;
      default:
        return gotWords({
                    hd: word,
                    tl: /* [] */0
                  });
    }
    var match = Random.$$int(2);
    if (match !== 0) {
      if (isVowel(Caml_string.get(word, 0))) {
        return gotWords({
                    hd: "an",
                    tl: {
                      hd: word,
                      tl: /* [] */0
                    }
                  });
      } else {
        return gotWords({
                    hd: "a",
                    tl: {
                      hd: word,
                      tl: /* [] */0
                    }
                  });
      }
    } else {
      return gotWords({
                  hd: "the",
                  tl: {
                    hd: word,
                    tl: /* [] */0
                  }
                });
    }
  };
  var getWord = function (set) {
    var prim = fetch("https://api.noopschallenge.com/wordbot?set=" + set);
    var prim$1 = prim.then(function (prim) {
          return prim.json();
        });
    return prim$1.then(function (json) {
                var word = decodeWord(json);
                if (word !== undefined) {
                  gotWord(set, word);
                } else {
                  Curry._1(setState, (function (param) {
                          return /* Error */0;
                        }));
                }
                return Promise.resolve(undefined);
              });
  };
  React.useEffect((function () {
          var prim = getWord("nouns");
          var prim$1 = prim.then(function (param) {
                return getWord("verbs_past");
              });
          var prim$2 = prim$1.then(function (param) {
                return getWord("objects");
              });
          prim$2.then(function (param) {
                var n = Random.$$int(100);
                if (n < 30) {
                  return getWord("adverbs");
                } else {
                  return Promise.resolve(undefined);
                }
              });
          
        }), []);
  var tmp;
  if (state) {
    var words = state._0;
    tmp = words ? $$String.concat(" ", words) : "Loading...";
  } else {
    tmp = "Huh?";
  }
  return React.createElement("div", undefined, tmp);
}

var make = Nonsense;

exports.make = make;
/* react Not a pure module */

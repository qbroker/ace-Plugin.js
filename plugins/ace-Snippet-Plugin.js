/***
|Title |ace-Snippet-Plugin.js |
|Description |Custom snippets for ace.js |
|Documentation | |
|Version |0.0.3 |
|Version library | |
|Plugin type |systemConfig |
|Source |ace-Snippet-Source |
|Author |Okido |
|Original author | |
|License |See the license section |
|Core version |≥2.9.4 |
|Browser |A modern browser supporting ES6 or [[NW.js]] |
|Status |EXPERIMENTAL - SUBJECT TO CHANGE |
|Build date - time |25-01-2026 - 14:19, build with [[pluginBuilder-Plugin.js]] |

!!!Documentation
<<<

<<<
!!!Usage
<<<

<<<
!!!Configuration
<<<

<<<
!!!Revisions
<<<

<<<
!!!License
<<<
!!License for the third party library code
MIT License

Copyright (c) 2025 Okido

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
<<<
!!!Code
***/
//{{{
/* JavaScript CODE STARTS HERE */
/* Minified with Terser.js - 25-01-2026 */
"object"!=typeof config.macros.acecustomsnippet?config.macros.acecustomsnippet={}:config.macros.acecustomsnippet,config.macros.acecustomsnippet={init:function(){console.log("START INIT: ace-Snippet-Plugin.js")},data:[{name:"store.saveTiddler(oldTitle,newTitle,newBody,modifier,modified,tags,fields)",tabTrigger:"store.save",content:'store.saveTiddler("${1}", "${1}", newBody, config.options.txtUserName, new Date(), "tags", {"custom": "fields"})',scope:"javascript"},{name:'store.getTaggedTiddlers("tag")',tabTrigger:"store.getTag",content:'store.getTaggedTiddlers("${1}")',scope:"javascript"},{name:'store.deleteTiddler("tag")',tabTrigger:'store.deleteTiddler("tag")',content:'store.deleteTiddler("${1}")',scope:"javascript"},{name:'store.setTiddlerTag("tiddlertitle", false or true, "tag")',tabTrigger:'store.setTiddlerTag("tiddlertitle",',content:"store.setTiddlerTag(${1}, ${2}, ${3})",scope:"javascript"},{name:"DataTiddler.setData(tidTitle, fieldname, delete fieldname)",tabTrigger:"DataTiddler.setData(tidTitle, fieldname, delete fieldname)",content:"DataTiddler.setData(${1}, ${2}, ${3})",scope:"javascript"},{name:"DataTiddler.getData(tidTitle, fieldname, default value)",tabTrigger:"DataTiddler.getData(tidTitle, fieldname, default value)",content:"DataTiddler.getData(${1}, ${2}, ${3})",scope:"javascript"},{name:"const thisTiddlerTitle",tabTrigger:"const",content:'const thisTiddlerTitle = store.getTiddler(story.findContainingTiddler(place).getAttribute("tiddler")).title',scope:"javascript"},{name:"const debug = false",tabTrigger:"const",content:"const debug = false",scope:"javascript"},{name:'debug ? console.log() : ""',tabTrigger:"debug",content:'debug ? console.log(${1}) : ""',scope:"javascript"},{name:'debug ? console.clear() : ""',tabTrigger:"debug",content:'debug ? console.clear(${1}) : ""',scope:"javascript"},{name:"console.clear()",tabTrigger:"console",content:"console.clear()",scope:"javascript"},{name:"console.log()",tabTrigger:"console",content:'console.log("${1}:", ${1})',scope:"javascript"},{name:'store.tiddlerExists("tiddlertitle")',tabTrigger:'store.tiddlerExists("tiddlertitle")',content:"store.tiddlerExists(${1})",scope:"javascript"},{name:'store.filterTiddlers("tag")',tabTrigger:'store.filterTiddlers("tag")',content:"store.filterTiddlers(${1})",scope:"javascript"},{name:"forEach(function(d) { })",tabTrigger:"forEach(function(d)",content:"forEach(function(d) {${1} })",scope:"javascript"},{name:'story.closeTiddler("tiddler title", "animate true or false", "unused" )',tabTrigger:'story.closeTiddler("tiddler',content:"story.closeTiddler(${1}, false)",scope:"javascript"},{name:'story.displayTiddler("bottom or top", "tiddler title")',tabTrigger:'story.displayTiddler("bottom',content:'story.displayTiddler("top", "${1}")',scope:"javascript"},{name:'wikify("text to wikify", "where to wikify, place")',tabTrigger:'wikify("text',content:"wikify(${1}, place)",scope:"javascript"},{name:'displayMessage( "display text", undefined, { "use": true, color: "green red blue yellow", "duration": "5000" } )',tabTrigger:"displayMessage(",content:'displayMessage( "${1}", undefined, { "use": true, color: "${2}", "duration": "5000" } )',scope:"javascript"},{name:"store.suspendNotifications()",tabTrigger:"store.suspendNotifications()",content:"store.suspendNotifications()",scope:"javascript"},{name:"store.resumeNotifications()",tabTrigger:"store.resumeNotifications()",content:"store.resumeNotifications()",scope:"javascript"},{name:"refreshAll()",tabTrigger:"refreshAll()",content:"refreshAll()",scope:"javascript"},{name:'event.target.getAttribute("atr") === "value"',tabTrigger:'event.target.getAttribute("atr")',content:'event.target.getAttribute("$1") === "$2"',scope:"javascript"},{name:'store.getTiddlerSlice("tiddlertitle", "Slicename")',tabTrigger:'store.getTiddlerSlice("tiddlertitle",',content:'store.getTiddlerSlice("$1", "$2")',scope:"javascript"},{name:'store.getTiddlerText("tiddlertitle##Sectionname")',tabTrigger:'store.getTiddlerText("tiddlertitle##Sectionname")',content:'store.getTiddlerText("$1##$2")',scope:"javascript"},{name:'store.getTiddler("")',tabTrigger:"store.getTiddler",content:'store.getTiddler("$1")',scope:"javascript"},{name:'wikify("JSON.stringify", "where to wikify, place")',tabTrigger:'wikify("JSON.stringify",',content:'wikify("{{{\\n" + JSON.stringify($1, "\\t", 2) + "\\n}}}\\n", place)',scope:"javascript"},{name:'DataTiddler.getDataObject("tiddler title")',tabTrigger:'DataTiddler.getDataObject("tiddler',content:'DataTiddler.getDataObject("$1")',scope:"javascript"},{name:"config.options.txtUserName",tabTrigger:"config.options.txtUserName",content:"config.options.txtUserName",scope:"javascript"}]};
/* JavaScript CODE ENDS HERE */
//}}}
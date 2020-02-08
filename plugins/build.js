/* Last updated 20-06-2018 */
var fs = require('fs');

console.log('START BUILD PROCESS')

// var definition
var buildVersion = '3.0.0 beta'
var templateDir = 'template/'
// var buildDir = 'build-' + buildVersion + '/'
var buildDir = 'build' + '/'
var jsDir = 'js/'
var licenseDir = 'license/'
var shadowDir = 'shadow/'
var buildTemp = 'buildtemp/'
var deprecatedDir = 'deprecated/'
var jQueryDir = 'jquery/'
var insCode = ''
var splitTemplate = ''
var htmlTemplate = ''
var copyFromMaster = true
var buildStat = ''

var jsFiles = ['Guide.js', 'Config.js', 'ConfigBrowser.js', 'Lingo.js', 'main.js', 'Paramifiers.js', 'FormatterHelpers.js',
  'Formatter.js', 'Wikifier.js', 'Macros.js', 'NewTiddler.js', 'Search.js', 'Tabs.js', 'Toolbar.js', 'Commands.js', 'Tiddler.js', 'TiddlyWiki.js', 'Filters.js', 'TiddlerFields.js', 'Story.js', 'Backstage.js', 'Import.js', 'Upgrade.js', 'Manager.js',
  'Messages.js', 'Refresh.js', 'Options.js', 'Saving.js', 'SavingRSS.js', 'FileSystem.js', 'FileSystemUtils.js', 'AdaptorBase.js', 'FileAdaptor.js', 'Http.js', 'Utilities.js',
  'UtilitiesPopup.js', 'Animator.js', 'Morpher.js', 'Zoomer.js', 'Scroller.js', 'Slider.js', 'Popup.js', 'Version.js', 'Wizard.js', 'ListView.js', 'BasicTypes.js', 'Strings.js', 'Dates.js', 'RGB.js', 'Dom.js', 'LoaderSaver.js', 'TW21Loader.js', 'TW21Saver.js']
var deprecatedFiles = ['Crypto.js', 'Deprecated.js', 'FileAdaptor.js', 'Http.js', 'Strings.js', 'Tiddler.js', 'Numbers.js', 'Utilities.js', 'Wikifier.js']
var tidFiles = ['ColorPalette.tid', 'EditTemplate.tid','GettingStarted.tid', 'ImportTiddlers.tid', 'MarkupPreHead.tid', 'OptionsPanel.tid', 'PageTemplate.tid', 'StyleSheetColors.tid', 'StyleSheetLayout.tid', 'StyleSheetLocale.tid', 'StyleSheetPrint.tid', 'ViewTemplate.tid']
var allDirs = [templateDir, buildDir, jsDir, licenseDir, shadowDir, buildDir, buildTemp, deprecatedDir, jQueryDir]
var jQueryFiles = ['jQuery.encoding.digests.sha1.js', 'jQuery.twStylesheet.js']

/* Make all dirs if the not already exist */
allDirs.forEach(function(d){
  fs.existsSync(d) ? 'Dir ' + d + ' already there.' : fs.mkdirSync(d, 0777)  
})

/* If files need to be copied from Tiddlywiki-Master */
if (copyFromMaster) {
  /* Copy all files from master dir to seperate dirs -- Shadow tiddlers */
  tidFiles.forEach(function (d) {
    fs.copyFileSync('TiddlyWiki-master/shadows/' + d, shadowDir + d)
  })

  /* Copy files from master dir to seperate dirs -- Several files, order later */
  fs.copyFileSync('TiddlyWiki-master/html/tiddlywiki.template.html', templateDir + 'tiddlywiki.template.html')
  fs.copyFileSync('TiddlyWiki-master/html/copyright.txt', licenseDir + 'copyright.txt')
  fs.copyFileSync('TiddlyWiki-master/html/rss.link.html', jsDir + 'rss.link.html')
  fs.copyFileSync('TiddlyWiki-master/html/style.txt', jsDir + 'style.txt')
  fs.copyFileSync('TiddlyWiki-master/html/noscript.txt', jsDir + 'noscript.txt')
  fs.copyFileSync('TiddlyWiki-master/html/tiddlysaver.txt', jsDir + 'tiddlysaver.txt')
  fs.copyFileSync('TiddlyWiki-master/jquery/jquery.js', jQueryDir + 'jquery.js')
  fs.copyFileSync('TiddlyWiki-master/jquery/plugins/jQuery.encoding.digests.sha1.js', jQueryDir + 'jQuery.encoding.digests.sha1.js')
  fs.copyFileSync('TiddlyWiki-master/jquery/plugins/jQuery.twStylesheet.js', jQueryDir + 'jQuery.twStylesheet.js')

  /* Copy files from master dir to seperate dirs -- Deprecated files */
  deprecatedFiles.forEach(function (d) {
    fs.copyFileSync('TiddlyWiki-master/deprecated/' + d, deprecatedDir + d)
  })

  /* Copy files from master dir to seperate dirs -- *.js files */
  jsFiles.forEach(function (d) {
    fs.copyFileSync('TiddlyWiki-master/js/' + d, jsDir + d)
  })
}

/* Fix for source errors -- In Saving.js is a script tag //# clear <applet> following </script> */
insCode = ''
htmlTemplate = fs.readFileSync(jsDir + 'Saving.js', {encoding: 'utf8'})
splitTemplate = htmlTemplate.split('//# clear <applet> following </script>')
htmlTemplate = splitTemplate[0] + insCode + splitTemplate[1]
fs.writeFileSync(jsDir + 'Saving.js', htmlTemplate, {encoding: 'utf8'})


/* Fix for source errors -- Add place holder to tiddlywiki.template.html */
insCode = '</script>\n<!--@@tiddlysavetext@@-->\n<!--POST-SCRIPT-START-->\n'
htmlTemplate = fs.readFileSync('template/tiddlywiki.template.html', {encoding: 'utf8'})
splitTemplate = htmlTemplate.split('</script>\n<!--POST-SCRIPT-START-->\n')
htmlTemplate = splitTemplate[0] + insCode + splitTemplate[1]
fs.writeFileSync('template/tiddlywiki.template.html', htmlTemplate, {encoding: 'utf8'})


/* Load the template that is used for all insertions */
htmlTemplate = fs.readFileSync(templateDir + 'tiddlywiki.template.html', { encoding: 'utf8' })

/* Replace the place holders with the appropiate text, use concat instead of replace to prevent regex placeholder errors */
function replaceTW(srcFile, txtMarker){
  var src = ''
  srcFile == 'none' ? src = '' : src = fs.readFileSync(srcFile, {encoding: 'utf8'})
  var splitTemplate = htmlTemplate.split(txtMarker)
  htmlTemplate = splitTemplate[0] + src + splitTemplate[1]
  buidStat = buildStat + srcFile + ': ' + srcFile.length + '\n'
}

/* Build the *.tid files, first convert to html template and than concate all *.hmtl */
/* The files live in shadow */
tidFiles.forEach(e => {
  var inCode = fs.readFileSync(shadowDir + e, { encoding: 'utf8' })
  var srcLines = inCode.split('\n')
  var keys = ''
  var srcText = ''
  var text = false
    srcLines.forEach((d,n) => {
      d.indexOf('title:') == 0 ? keys = keys + 'title="'+ e.toString().replace('.tid', '') + '\"' : ""
      if(d.length == 0) {text = true}
        if(text){
          if(n+1 < srcLines.length){
            srcText = srcText + d + '\n'
          }
        }
    });
  
  /* Replace << with &lt;&lt; etc, shadows can not have <<, */
  /* the code is retrieved by documentgetelementBtId, option is than translation as an html element */
  srcText = srcText.replace(/<</g, '&lt;&lt;').replace(/>>/g, '&gt;&gt;')

  srcText = '<div ' + keys + '>\n' + '<pre>' + srcText + '</pre>\n</div>'
  fs.writeFileSync(buildTemp + e.replace('.tid', '.html'), srcText, {encoding: 'utf8'})
  });
  
  var shadowArea = ''
  tidFiles.forEach(e => {
    var inCode = fs.readFileSync(buildTemp + e.replace('.tid', '.html'), {encoding: 'utf8'})
    shadowArea = shadowArea + inCode
  })
  fs.writeFileSync(buildTemp + 'shadowTemp.html', shadowArea, { encoding: 'utf8' })
  console.log('READY BUILDING TID HTML')

  /* Build the *.js sources */
  insCode = ''
  jsFiles.forEach(function(d){
    insCode = insCode + fs.readFileSync(jsDir + d, { encoding: 'utf8' })
  })
  fs.writeFileSync(buildTemp + 'jsTemp.js', insCode, { encoding: 'utf8' })

/* Build the deprcated *.js */
insCode = ''
deprecatedFiles.forEach(function(d){
  insCode = insCode + fs.readFileSync(deprecatedDir + d, { encoding: 'utf8' })
})
fs.writeFileSync(buildTemp + 'jsDeprecated.js', insCode, { encoding: 'utf8' })

/* Build the jQuery files */
insCode = ''
jQueryFiles.forEach(function(d){
  insCode = insCode + fs.readFileSync(jQueryDir + d, { encoding: 'utf8' })
})
fs.writeFileSync(buildTemp + 'jsQueryFiles.js', insCode, { encoding: 'utf8' })

replaceTW(jsDir + 'Version.js', '<!--@@version@@-->')
replaceTW(licenseDir + 'copyright.txt', '&lt;!--@@copyright@@--&gt;')
replaceTW(jsDir + 'rss.link.html', '<!--@@prehead@@-->')
replaceTW('none', '<!--@@title@@-->')
replaceTW(jsDir + 'style.txt', '<!--@@style@@-->')
replaceTW('none', '<!--@@posthead@@-->')
replaceTW('none', '<!--@@prebody@@-->')
replaceTW(jsDir + 'noscript.txt', '<!--@@noscript@@-->')
replaceTW(buildTemp + 'shadowTemp.html', '<!--@@shadow@@-->')
replaceTW('none', '<!--@@tiddler@@-->')
replaceTW('none', '<!--@@plugin@@-->')
replaceTW('none', '<!--@@posttiddlers@@-->')
replaceTW('none', '<!--@@postbody@@-->')
replaceTW(buildTemp + 'jsTemp.js', '<!--@@prejs@@-->')
replaceTW('none', '<!--@@js@@-->')
replaceTW('none', '<!--@@postjs@@-->')
replaceTW('none', '<!--@@jsext@@-->')
replaceTW(buildTemp + 'jsDeprecated.js', '<!--@@jsdeprecated@@-->')
replaceTW(jQueryDir + 'jquery-3.3.1.min.js', '<!--@@jslib@@-->')
replaceTW(buildTemp + 'jsQueryFiles.js', '<!--@@jquery@@-->')
replaceTW(jsDir + 'tiddlysaver.txt', '<!--@@tiddlysavetext@@-->')
replaceTW('none', '<!--@@postscript@@-->')

/* Write TWclassic file as html */
fs.writeFileSync(buildDir + 'empty-core-' + buildVersion + '.html', htmlTemplate, { encoding: 'utf8' })
console.log('READY BUILDING')
console.log('\n' + buildStat)
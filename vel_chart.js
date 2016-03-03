function GenerateChart(e,t,a,i){$("#"+e).html("")
var r='<div id="'+e+'_vel_container" class="t-'+i+'"><div id="'+e+'_vel_chart" style="width:100%"></div></div>'
InsHTML2id({target:e,content:r})
var n=e+"_vel_chart",s=" <style>.dygraph-legend {background-color: rgba(200, 200, 255, 0.75) !important;padding: 4px;border: 1px solid #000;border-radius: 10px;box-shadow: 4px 4px 4px #888;pointer-events: none;}#"+n+" {width:100%;height: 500px;margin-bottom: 10px;display: block;box-sizing: border-box;}@media screen and (max-width: 768px) {#"+n+" {height: 200px;}}</style>"
$("head").append(s),new VelChart(document.getElementById(n),t,a)}function GenerateChartDate2(e,t,a,r,n){$("#"+e).html("")
var s='<div id="'+e+'_vel_container" class="t-'+r+'"><div id="'+e+'_vel_chart" style="width:100%"></div><div id="'+e+'_vel_legend" style="width:100%"></div></div>'
InsHTML2id({target:e,content:s})
var o=e+"_vel_chart",l=" <style>.dygraph-legend {background-color: rgba(200, 200, 255, 0.75) !important;padding: 4px;border: 1px solid #000;border-radius: 10px;box-shadow: 4px 4px 4px #888;pointer-events: none;}#"+o+" {width:100%;margin-bottom: 10px;display: block;box-sizing: border-box;}</style>"
options=[],options.labels=a.serie,options.title=a.tytul,options.xlabel=a.osX,options.ylabel=a.osY,options.height=n,options.legend="always",options.labelsDiv=e+"_vel_legend",options.fillGraph=!0,options.showRangeSelector=!0,$("head").append(l)
var h=[]
for(i=0;i<t.length;i++)for(h.push([new Date(t[i][0])]),j=1;j<Object.keys(t[0]).length/2;j++)h[i].push(t[i][j])
new VelChart(document.getElementById(o),h,options)}!function(e){"use strict"
for(var t,a,i={},r=function(){},n="memory".split(","),s="assert,clear,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn".split(",");t=n.pop();)e[t]=e[t]||i
for(;a=s.pop();)e[a]=e[a]||r}(this.console=this.console||{}),function(){"use strict"
CanvasRenderingContext2D.prototype.installPattern=function(e){if(void 0!==this.isPatternInstalled)throw"Must un-install old line pattern before installing a new one."
this.isPatternInstalled=!0
var t=[0,0],a=[],i=this.beginPath,r=this.lineTo,n=this.moveTo,s=this.stroke
this.uninstallPattern=function(){this.beginPath=i,this.lineTo=r,this.moveTo=n,this.stroke=s,this.uninstallPattern=void 0,this.isPatternInstalled=void 0},this.beginPath=function(){a=[],i.call(this)},this.moveTo=function(e,t){a.push([[e,t]]),n.call(this,e,t)},this.lineTo=function(e,t){var i=a[a.length-1]
i.push([e,t])},this.stroke=function(){if(0===a.length)return void s.call(this)
for(var i=0;i<a.length;i++)for(var o=a[i],l=o[0][0],h=o[0][1],d=1;d<o.length;d++){var c=o[d][0],p=o[d][1]
this.save()
var u=c-l,g=p-h,f=Math.sqrt(u*u+g*g),v=Math.atan2(g,u)
this.translate(l,h),n.call(this,0,0),this.rotate(v)
for(var y=t[0],_=0;f>_;){var x=e[y]
_+=t[1]?t[1]:x,_>f?(t=[y,_-f],_=f):t=[(y+1)%e.length,0],y%2===0?r.call(this,_,0):n.call(this,_,0),y=(y+1)%e.length}this.restore(),l=c,h=p}s.call(this),a=[]}},CanvasRenderingContext2D.prototype.uninstallPattern=function(){throw"Must install a line pattern before uninstalling it."}}()
var VelChartOptions=function(){return"undefined"==typeof DEBUG&&(DEBUG=!0),function(){"use strict"
var e=function(e){this.dygraph_=e,this.yAxes_=[],this.xAxis_={},this.series_={},this.global_=this.dygraph_.attrs_,this.user_=this.dygraph_.user_attrs_||{},this.labels_=[],this.highlightSeries_=this.get("highlightSeriesOpts")||{},this.reparseSeries()}
if(e.AXIS_STRING_MAPPINGS_={y:0,Y:0,y1:0,Y1:0,y2:1,Y2:1},e.axisToIndex_=function(t){if("string"==typeof t){if(e.AXIS_STRING_MAPPINGS_.hasOwnProperty(t))return e.AXIS_STRING_MAPPINGS_[t]
throw"Unknown axis : "+t}if("number"==typeof t){if(0===t||1===t)return t
throw"VelCharts only supports two y-axes, indexed from 0-1."}if(t)throw"Unknown axis : "+t
return 0},e.prototype.reparseSeries=function(){var t=this.get("labels")
if(t){this.labels_=t.slice(1),this.yAxes_=[{series:[],options:{}}],this.xAxis_={options:{}},this.series_={}
var a=!this.user_.series
if(a){for(var i=0,r=0;r<this.labels_.length;r++){var n=this.labels_[r],s=this.user_[n]||{},o=0,l=s.axis
"object"==typeof l&&(o=++i,this.yAxes_[o]={series:[n],options:l}),l||this.yAxes_[0].series.push(n),this.series_[n]={idx:r,yAxis:o,options:s}}for(var r=0;r<this.labels_.length;r++){var n=this.labels_[r],s=this.series_[n].options,l=s.axis
if("string"==typeof l){if(!this.series_.hasOwnProperty(l))return void console.error("Series "+n+" wants to share a y-axis with series "+l+", which does not define its own axis.")
var o=this.series_[l].yAxis
this.series_[n].yAxis=o,this.yAxes_[o].series.push(n)}}}else for(var r=0;r<this.labels_.length;r++){var n=this.labels_[r],s=this.user_.series[n]||{},o=e.axisToIndex_(s.axis)
this.series_[n]={idx:r,yAxis:o,options:s},this.yAxes_[o]?this.yAxes_[o].series.push(n):this.yAxes_[o]={series:[n],options:{}}}var h=this.user_.axes||{}
VelChart.update(this.yAxes_[0].options,h.y||{}),this.yAxes_.length>1&&VelChart.update(this.yAxes_[1].options,h.y2||{}),VelChart.update(this.xAxis_.options,h.x||{}),DEBUG&&this.validateOptions_()}},e.prototype.get=function(e){var t=this.getGlobalUser_(e)
return null!==t?t:this.getGlobalDefault_(e)},e.prototype.getGlobalUser_=function(e){return this.user_.hasOwnProperty(e)?this.user_[e]:null},e.prototype.getGlobalDefault_=function(e){return this.global_.hasOwnProperty(e)?this.global_[e]:VelChart.DEFAULT_ATTRS.hasOwnProperty(e)?VelChart.DEFAULT_ATTRS[e]:null},e.prototype.getForAxis=function(e,t){var a,i
if("number"==typeof t)a=t,i=0===a?"y":"y2"
else{if("y1"==t&&(t="y"),"y"==t)a=0
else if("y2"==t)a=1
else{if("x"!=t)throw"Unknown axis "+t
a=-1}i=t}var r=-1==a?this.xAxis_:this.yAxes_[a]
if(r){var n=r.options
if(n.hasOwnProperty(e))return n[e]}if("x"!==t||"logscale"!==e){var s=this.getGlobalUser_(e)
if(null!==s)return s}var o=VelChart.DEFAULT_ATTRS.axes[i]
return o.hasOwnProperty(e)?o[e]:this.getGlobalDefault_(e)},e.prototype.getForSeries=function(e,t){if(t===this.dygraph_.getHighlightSeries()&&this.highlightSeries_.hasOwnProperty(e))return this.highlightSeries_[e]
if(!this.series_.hasOwnProperty(t))throw"Unknown series: "+t
var a=this.series_[t],i=a.options
return i.hasOwnProperty(e)?i[e]:this.getForAxis(e,a.yAxis)},e.prototype.numAxes=function(){return this.yAxes_.length},e.prototype.axisForSeries=function(e){return this.series_[e].yAxis},e.prototype.axisOptions=function(e){return this.yAxes_[e].options},e.prototype.seriesForAxis=function(e){return this.yAxes_[e].series},e.prototype.seriesNames=function(){return this.labels_},DEBUG){e.prototype.validateOptions_=function(){if(void 0===VelChart.OPTIONS_REFERENCE)throw"Called validateOptions_ in prod build."
for(var e=this,t=function(t){VelChart.OPTIONS_REFERENCE[t]||e.warnInvalidOption_(t)},a=[this.xAxis_.options,this.yAxes_[0].options,this.yAxes_[1]&&this.yAxes_[1].options,this.global_,this.user_,this.highlightSeries_],i=this.seriesNames(),r=0;r<i.length;r++){var n=i[r]
this.series_.hasOwnProperty(n)&&a.push(this.series_[n].options)}for(var r=0;r<a.length;r++){var s=a[r]
if(s)for(var o in s)s.hasOwnProperty(o)&&t(o)}}
var t={}
e.prototype.warnInvalidOption_=function(e){if(!t[e]){t[e]=!0
var a=this.labels_.indexOf(e)>=0
if(!a)throw console.warn("Unknown option "+e+" (full list of options at VelCharts.com/options.html"),"invalid option "+e
console.warn("Use new-style per-series options (saw "+e+" as top-level options key). See http://bit.ly/1tceaJs")}},e.resetWarnings_=function(){t={}}}return e}()}(),VelChartLayout=function(){"use strict"
var e=function(e){this.dygraph_=e,this.points=[],this.setNames=[],this.annotations=[],this.yAxes_=null,this.xTicks_=null,this.yTicks_=null}
return e.prototype.addDataset=function(e,t){this.points.push(t),this.setNames.push(e)},e.prototype.getPlotArea=function(){return this.area_},e.prototype.computePlotArea=function(){var e={x:0,y:0}
e.w=this.dygraph_.width_-e.x-this.dygraph_.getOption("rightGap"),e.h=this.dygraph_.height_
var t={chart_div:this.dygraph_.graphDiv,reserveSpaceLeft:function(t){var a={x:e.x,y:e.y,w:t,h:e.h}
return e.x+=t,e.w-=t,a},reserveSpaceRight:function(t){var a={x:e.x+e.w-t,y:e.y,w:t,h:e.h}
return e.w-=t,a},reserveSpaceTop:function(t){var a={x:e.x,y:e.y,w:e.w,h:t}
return e.y+=t,e.h-=t,a},reserveSpaceBottom:function(t){var a={x:e.x,y:e.y+e.h-t,w:e.w,h:t}
return e.h-=t,a},chartRect:function(){return{x:e.x,y:e.y,w:e.w,h:e.h}}}
this.dygraph_.cascadeEvents_("layout",t),this.area_=e},e.prototype.setAnnotations=function(e){this.annotations=[]
for(var t=this.dygraph_.getOption("xValueParser")||function(e){return e},a=0;a<e.length;a++){var i={}
if(!e[a].xval&&void 0===e[a].x)return void console.error("Annotations must have an 'x' property")
if(e[a].icon&&(!e[a].hasOwnProperty("width")||!e[a].hasOwnProperty("height")))return void console.error("Must set width and height when setting annotation.icon property")
VelChart.update(i,e[a]),i.xval||(i.xval=t(i.x)),this.annotations.push(i)}},e.prototype.setXTicks=function(e){this.xTicks_=e},e.prototype.setYAxes=function(e){this.yAxes_=e},e.prototype.evaluate=function(){this._xAxis={},this._evaluateLimits(),this._evaluateLineCharts(),this._evaluateLineTicks(),this._evaluateAnnotations()},e.prototype._evaluateLimits=function(){var e=this.dygraph_.xAxisRange()
this._xAxis.minval=e[0],this._xAxis.maxval=e[1]
var t=e[1]-e[0]
this._xAxis.scale=0!==t?1/t:1,this.dygraph_.getOptionForAxis("logscale","x")&&(this._xAxis.xlogrange=VelChart.log10(this._xAxis.maxval)-VelChart.log10(this._xAxis.minval),this._xAxis.xlogscale=0!==this._xAxis.xlogrange?1/this._xAxis.xlogrange:1)
for(var a=0;a<this.yAxes_.length;a++){var i=this.yAxes_[a]
i.minyval=i.computedValueRange[0],i.maxyval=i.computedValueRange[1],i.yrange=i.maxyval-i.minyval,i.yscale=0!==i.yrange?1/i.yrange:1,this.dygraph_.getOption("logscale")&&(i.ylogrange=VelChart.log10(i.maxyval)-VelChart.log10(i.minyval),i.ylogscale=0!==i.ylogrange?1/i.ylogrange:1,(!isFinite(i.ylogrange)||isNaN(i.ylogrange))&&console.error("axis "+a+" of graph at "+i.g+" can't be displayed in log scale for range ["+i.minyval+" - "+i.maxyval+"]"))}},e.calcXNormal_=function(e,t,a){return a?(VelChart.log10(e)-VelChart.log10(t.minval))*t.xlogscale:(e-t.minval)*t.scale},e.calcYNormal_=function(e,t,a){if(a){var i=1-(VelChart.log10(t)-VelChart.log10(e.minyval))*e.ylogscale
return isFinite(i)?i:NaN}return 1-(t-e.minyval)*e.yscale},e.prototype._evaluateLineCharts=function(){for(var t=this.dygraph_.getOption("stackedGraph"),a=this.dygraph_.getOptionForAxis("logscale","x"),i=0;i<this.points.length;i++){for(var r=this.points[i],n=this.setNames[i],s=this.dygraph_.getOption("connectSeparatedPoints",n),o=this.dygraph_.axisPropertiesForSeries(n),l=this.dygraph_.attributes_.getForSeries("logscale",n),h=0;h<r.length;h++){var d=r[h]
d.x=e.calcXNormal_(d.xval,this._xAxis,a)
var c=d.yval
t&&(d.y_stacked=e.calcYNormal_(o,d.yval_stacked,l),null===c||isNaN(c)||(c=d.yval_stacked)),null===c&&(c=NaN,s||(d.yval=NaN)),d.y=e.calcYNormal_(o,c,l)}this.dygraph_.dataHandler_.onLineEvaluated(r,o,l)}},e.prototype._evaluateLineTicks=function(){var e,t,a,i
for(this.xticks=[],e=0;e<this.xTicks_.length;e++)t=this.xTicks_[e],a=t.label,i=this.dygraph_.toPercentXCoord(t.v),i>=0&&1>i&&this.xticks.push([i,a])
for(this.yticks=[],e=0;e<this.yAxes_.length;e++)for(var r=this.yAxes_[e],n=0;n<r.ticks.length;n++)t=r.ticks[n],a=t.label,i=this.dygraph_.toPercentYCoord(t.v,e),i>0&&1>=i&&this.yticks.push([e,i,a])},e.prototype._evaluateAnnotations=function(){var e,t={}
for(e=0;e<this.annotations.length;e++){var a=this.annotations[e]
t[a.xval+","+a.series]=a}if(this.annotated_points=[],this.annotations&&this.annotations.length)for(var i=0;i<this.points.length;i++){var r=this.points[i]
for(e=0;e<r.length;e++){var n=r[e],s=n.xval+","+n.name
s in t&&(n.annotation=t[s],this.annotated_points.push(n))}}},e.prototype.removeAllDatasets=function(){delete this.points,delete this.setNames,delete this.setPointsLengths,delete this.setPointsOffsets,this.points=[],this.setNames=[],this.setPointsLengths=[],this.setPointsOffsets=[]},e}(),VelChartCanvasRenderer=function(){"use strict"
var e=function(e,t,a,i){if(this.dygraph_=e,this.layout=i,this.element=t,this.elementContext=a,this.height=e.height_,this.width=e.width_,!this.isIE&&!VelChart.isCanvasSupported(this.element))throw"Canvas is not supported."
if(this.area=i.getPlotArea(),this.dygraph_.isUsingExcanvas_)this._createIEClipArea()
else if(!VelChart.isAndroid()){var r=this.dygraph_.canvas_ctx_
r.beginPath(),r.rect(this.area.x,this.area.y,this.area.w,this.area.h),r.clip(),r=this.dygraph_.hidden_ctx_,r.beginPath(),r.rect(this.area.x,this.area.y,this.area.w,this.area.h),r.clip()}}
return e.prototype.clear=function(){var e
if(this.isIE)try{this.clearDelay&&(this.clearDelay.cancel(),this.clearDelay=null),e=this.elementContext}catch(t){return}e=this.elementContext,e.clearRect(0,0,this.width,this.height)},e.prototype.render=function(){this._updatePoints(),this._renderLineChart()},e.prototype._createIEClipArea=function(){function e(e){if(0!==e.w&&0!==e.h){var i=document.createElement("div")
i.className=t,i.style.backgroundColor=r,i.style.position="absolute",i.style.left=e.x+"px",i.style.top=e.y+"px",i.style.width=e.w+"px",i.style.height=e.h+"px",a.appendChild(i)}}for(var t="dygraph-clip-div",a=this.dygraph_.graphDiv,i=a.childNodes.length-1;i>=0;i--)a.childNodes[i].className==t&&a.removeChild(a.childNodes[i])
for(var r=document.bgColor,n=this.dygraph_.graphDiv;n!=document;){var s=n.currentStyle.backgroundColor
if(s&&"transparent"!=s){r=s
break}n=n.parentNode}var o=this.area
e({x:0,y:0,w:o.x,h:this.height}),e({x:o.x,y:0,w:this.width-o.x,h:o.y}),e({x:o.x+o.w,y:0,w:this.width-o.x-o.w,h:this.height}),e({x:o.x,y:o.y+o.h,w:this.width-o.x,h:this.height-o.h-o.y})},e._getIteratorPredicate=function(t){return t?e._predicateThatSkipsEmptyPoints:null},e._predicateThatSkipsEmptyPoints=function(e,t){return null!==e[t].yval},e._drawStyledLine=function(t,a,i,r,n,s,o){var l=t.dygraph,h=l.getBooleanOption("stepPlot",t.setName)
VelChart.isArrayLike(r)||(r=null)
var d=l.getBooleanOption("drawGapEdgePoints",t.setName),c=t.points,p=t.setName,u=VelChart.createIterator(c,0,c.length,e._getIteratorPredicate(l.getBooleanOption("connectSeparatedPoints",p))),g=r&&r.length>=2,f=t.drawingContext
f.save(),g&&f.installPattern(r)
var v=e._drawSeries(t,u,i,o,n,d,h,a)
e._drawPointsOnLine(t,v,s,a,o),g&&f.uninstallPattern(),f.restore()},e._drawSeries=function(e,t,a,i,r,n,s,o){var l,h,d=null,c=null,p=null,u=[],g=!0,f=e.drawingContext
f.beginPath(),f.strokeStyle=o,f.lineWidth=a
for(var v=t.array_,y=t.end_,_=t.predicate_,x=t.start_;y>x;x++){if(h=v[x],_){for(;y>x&&!_(v,x);)x++
if(x==y)break
h=v[x]}if(null===h.canvasy||h.canvasy!=h.canvasy)s&&null!==d&&(f.moveTo(d,c),f.lineTo(h.canvasx,c)),d=c=null
else{if(l=!1,n||!d){t.nextIdx_=x,t.next(),p=t.hasNext?t.peek.canvasy:null
var m=null===p||p!=p
l=!d&&m,n&&(!g&&!d||t.hasNext&&m)&&(l=!0)}null!==d?a&&(s&&(f.moveTo(d,c),f.lineTo(h.canvasx,c)),f.lineTo(h.canvasx,h.canvasy)):f.moveTo(h.canvasx,h.canvasy),(r||l)&&u.push([h.canvasx,h.canvasy,h.idx]),d=h.canvasx,c=h.canvasy}g=!1}return f.stroke(),u},e._drawPointsOnLine=function(e,t,a,i,r){for(var n=e.drawingContext,s=0;s<t.length;s++){var o=t[s]
n.save(),a.call(e.dygraph,e.dygraph,e.setName,n,o[0],o[1],i,r,o[2]),n.restore()}},e.prototype._updatePoints=function(){for(var e=this.layout.points,t=e.length;t--;)for(var a=e[t],i=a.length;i--;){var r=a[i]
r.canvasx=this.area.w*r.x+this.area.x,r.canvasy=this.area.h*r.y+this.area.y}},e.prototype._renderLineChart=function(e,t){var a,i,r=t||this.elementContext,n=this.layout.points,s=this.layout.setNames
this.colors=this.dygraph_.colorsMap_
var o=this.dygraph_.getOption("plotter"),l=o
VelChart.isArrayLike(l)||(l=[l])
var h={}
for(a=0;a<s.length;a++){i=s[a]
var d=this.dygraph_.getOption("plotter",i)
d!=o&&(h[i]=d)}for(a=0;a<l.length;a++)for(var c=l[a],p=a==l.length-1,u=0;u<n.length;u++)if(i=s[u],!e||i==e){var g=n[u],f=c
if(i in h){if(!p)continue
f=h[i]}var v=this.colors[i],y=this.dygraph_.getOption("strokeWidth",i)
r.save(),r.strokeStyle=v,r.lineWidth=y,f({points:g,setName:i,drawingContext:r,color:v,strokeWidth:y,dygraph:this.dygraph_,axis:this.dygraph_.axisPropertiesForSeries(i),plotArea:this.area,seriesIndex:u,seriesCount:n.length,singleSeriesName:e,allSeriesPoints:n}),r.restore()}},e._Plotters={linePlotter:function(t){e._linePlotter(t)},fillPlotter:function(t){e._fillPlotter(t)},errorPlotter:function(t){e._errorPlotter(t)}},e._linePlotter=function(t){var a=t.dygraph,i=t.setName,r=t.strokeWidth,n=a.getNumericOption("strokeBorderWidth",i),s=a.getOption("drawPointCallback",i)||VelChart.Circles.DEFAULT,o=a.getOption("strokePattern",i),l=a.getBooleanOption("drawPoints",i),h=a.getNumericOption("pointSize",i)
n&&r&&e._drawStyledLine(t,a.getOption("strokeBorderColor",i),r+2*n,o,l,s,h),e._drawStyledLine(t,t.color,r,o,l,s,h)},e._errorPlotter=function(t){var a=t.dygraph,i=t.setName,r=a.getBooleanOption("errorBars")||a.getBooleanOption("customBars")
if(r){var n=a.getBooleanOption("fillGraph",i)
n&&console.warn("Can't use fillGraph option with error bars")
var s,o=t.drawingContext,l=t.color,h=a.getNumericOption("fillAlpha",i),d=a.getBooleanOption("stepPlot",i),c=t.points,p=VelChart.createIterator(c,0,c.length,e._getIteratorPredicate(a.getBooleanOption("connectSeparatedPoints",i))),u=NaN,g=NaN,f=[-1,-1],v=VelChart.toRGB_(l),y="rgba("+v.r+","+v.g+","+v.b+","+h+")"
o.fillStyle=y,o.beginPath()
for(var _=function(e){return null===e||void 0===e||isNaN(e)};p.hasNext;){var x=p.next()
!d&&_(x.y)||d&&!isNaN(g)&&_(g)?u=NaN:(s=[x.y_bottom,x.y_top],d&&(g=x.y),isNaN(s[0])&&(s[0]=x.y),isNaN(s[1])&&(s[1]=x.y),s[0]=t.plotArea.h*s[0]+t.plotArea.y,s[1]=t.plotArea.h*s[1]+t.plotArea.y,isNaN(u)||(d?(o.moveTo(u,f[0]),o.lineTo(x.canvasx,f[0]),o.lineTo(x.canvasx,f[1])):(o.moveTo(u,f[0]),o.lineTo(x.canvasx,s[0]),o.lineTo(x.canvasx,s[1])),o.lineTo(u,f[1]),o.closePath()),f=s,u=x.canvasx)}o.fill()}},e._fastCanvasProxy=function(e){var t=[],a=null,i=null,r=1,n=2,s=0,o=function(e){if(!(t.length<=1)){for(var a=t.length-1;a>0;a--){var i=t[a]
if(i[0]==n){var s=t[a-1]
s[1]==i[1]&&s[2]==i[2]&&t.splice(a,1)}}for(var a=0;a<t.length-1;){var i=t[a]
i[0]==n&&t[a+1][0]==n?t.splice(a,1):a++}if(t.length>2&&!e){var o=0
t[0][0]==n&&o++
for(var l=null,h=null,a=o;a<t.length;a++){var i=t[a]
if(i[0]==r)if(null===l&&null===h)l=a,h=a
else{var d=i[2]
d<t[l][2]?l=a:d>t[h][2]&&(h=a)}}var c=t[l],p=t[h]
t.splice(o,t.length-o),h>l?(t.push(c),t.push(p)):l>h?(t.push(p),t.push(c)):t.push(c)}}},l=function(a){o(a)
for(var l=0,h=t.length;h>l;l++){var d=t[l]
d[0]==r?e.lineTo(d[1],d[2]):d[0]==n&&e.moveTo(d[1],d[2])}t.length&&(i=t[t.length-1][1]),s+=t.length,t=[]},h=function(e,r,n){var s=Math.round(r)
if(null===a||s!=a){var o=a-i>1,h=s-a>1,d=o||h
l(d),a=s}t.push([e,r,n])}
return{moveTo:function(e,t){h(n,e,t)},lineTo:function(e,t){h(r,e,t)},stroke:function(){l(!0),e.stroke()},fill:function(){l(!0),e.fill()},beginPath:function(){l(!0),e.beginPath()},closePath:function(){l(!0),e.closePath()},_count:function(){return s}}},e._fillPlotter=function(t){if(!t.singleSeriesName&&0===t.seriesIndex){for(var a=t.dygraph,i=a.getLabels().slice(1),r=i.length;r>=0;r--)a.visibility()[r]||i.splice(r,1)
var n=function(){for(var e=0;e<i.length;e++)if(a.getBooleanOption("fillGraph",i[e]))return!0
return!1}()
if(n)for(var s,o,l=t.plotArea,h=t.allSeriesPoints,d=h.length,c=a.getNumericOption("fillAlpha"),p=a.getBooleanOption("stackedGraph"),u=a.getColors(),g={},f=function(e,t,a,i){if(e.lineTo(t,a),p)for(var r=i.length-1;r>=0;r--){var n=i[r]
e.lineTo(n[0],n[1])}},v=d-1;v>=0;v--){var y=t.drawingContext,_=i[v]
if(a.getBooleanOption("fillGraph",_)){var x=a.getBooleanOption("stepPlot",_),m=u[v],b=a.axisPropertiesForSeries(_),C=1+b.minyval*b.yscale
0>C?C=0:C>1&&(C=1),C=l.h*C+l.y
var w,A=h[v],T=VelChart.createIterator(A,0,A.length,e._getIteratorPredicate(a.getBooleanOption("connectSeparatedPoints",_))),V=NaN,E=[-1,-1],D=VelChart.toRGB_(m),S="rgba("+D.r+","+D.g+","+D.b+","+c+")"
y.fillStyle=S,y.beginPath()
var L,P=!0;(A.length>2*a.width_||VelChart.FORCE_FAST_PROXY)&&(y=e._fastCanvasProxy(y))
for(var O,k=[];T.hasNext;)if(O=T.next(),VelChart.isOK(O.y)||x){if(p){if(!P&&L==O.xval)continue
P=!1,L=O.xval,s=g[O.canvasx]
var N
N=void 0===s?C:o?s[0]:s,w=[O.canvasy,N],x?-1===E[0]?g[O.canvasx]=[O.canvasy,C]:g[O.canvasx]=[O.canvasy,E[0]]:g[O.canvasx]=O.canvasy}else w=isNaN(O.canvasy)&&x?[l.y+l.h,C]:[O.canvasy,C]
isNaN(V)?(y.moveTo(O.canvasx,w[1]),y.lineTo(O.canvasx,w[0])):(x?(y.lineTo(O.canvasx,E[0]),y.lineTo(O.canvasx,w[0])):y.lineTo(O.canvasx,w[0]),p&&(k.push([V,E[1]]),o&&s?k.push([O.canvasx,s[1]]):k.push([O.canvasx,w[1]]))),E=w,V=O.canvasx}else f(y,V,E[1],k),k=[],V=NaN,null===O.y_stacked||isNaN(O.y_stacked)||(g[O.canvasx]=l.h*O.y_stacked+l.y)
o=x,w&&O&&(f(y,O.canvasx,w[1],k),k=[]),y.fill()}}}},e}()
"undefined"==typeof DEBUG&&(DEBUG=!0)
var VelChart=function(){"use strict"
var e=function(e,t,a,i){this.is_initial_draw_=!0,this.readyFns_=[],void 0!==i?(console.warn("Using deprecated four-argument dygraph constructor"),this.__old_init__(e,t,a,i)):this.__init__(e,t,a)}
return e.NAME="VelChart",e.VERSION="1.1.1",e.__repr__=function(){return"["+e.NAME+" "+e.VERSION+"]"},e.toString=function(){return e.__repr__()},e.DEFAULT_ROLL_PERIOD=1,e.DEFAULT_WIDTH=480,e.DEFAULT_HEIGHT=320,e.ANIMATION_STEPS=12,e.ANIMATION_DURATION=200,e.KMB_LABELS=["K","M","B","T","Q"],e.KMG2_BIG_LABELS=["k","M","G","T","P","E","Z","Y"],e.KMG2_SMALL_LABELS=["m","u","n","p","f","a","z","y"],e.numberValueFormatter=function(t,a){var i=a("sigFigs")
if(null!==i)return e.floatFormat(t,i)
var r,n=a("digitsAfterDecimal"),s=a("maxNumberWidth"),o=a("labelsKMB"),l=a("labelsKMG2")
if(r=0!==t&&(Math.abs(t)>=Math.pow(10,s)||Math.abs(t)<Math.pow(10,-n))?t.toExponential(n):""+e.round_(t,n),o||l){var h,d=[],c=[]
o&&(h=1e3,d=e.KMB_LABELS),l&&(o&&console.warn("Setting both labelsKMB and labelsKMG2. Pick one!"),h=1024,d=e.KMG2_BIG_LABELS,c=e.KMG2_SMALL_LABELS)
for(var p=Math.abs(t),u=e.pow(h,d.length),g=d.length-1;g>=0;g--,u/=h)if(p>=u){r=e.round_(t/u,n)+d[g]
break}if(l){var f=(t.toExponential()+"").split("e-")
2===f.length&&f[1]>=3&&f[1]<=24&&(r=f[1]%3>0?e.round_(f[0]/e.pow(10,f[1]%3),n):(+f[0]).toFixed(2),r+=c[Math.floor(f[1]/3)-1])}}return r},e.numberAxisLabelFormatter=function(t,a,i){return e.numberValueFormatter.call(this,t,i)},e.SHORT_MONTH_NAMES_=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],e.SHORT_MONTH_NAMES_=["Sty","Lut","Mar","Kwi","Maj","Cze","Lip","Sie","Wrz","Paź","Lis","Gru"],e.dateAxisLabelFormatter=function(t,a,i){var r=i("labelsUTC"),n=r?e.DateAccessorsUTC:e.DateAccessorsLocal,s=n.getFullYear(t),o=n.getMonth(t),l=n.getDate(t),h=n.getHours(t),d=n.getMinutes(t),c=n.getSeconds(t),p=n.getSeconds(t)
if(a>=e.DECADAL)return""+s
if(a>=e.MONTHLY)return e.SHORT_MONTH_NAMES_[o]+"&#160;"+s
var u=3600*h+60*d+c+.001*p
return 0===u||a>=e.DAILY?e.zeropad(l)+"&#160;"+e.SHORT_MONTH_NAMES_[o]:e.hmsString_(h,d,c)},e.dateAxisFormatter=e.dateAxisLabelFormatter,e.dateValueFormatter=function(t,a){return e.dateString_(t,a("labelsUTC"))},e.Plotters=VelChartCanvasRenderer._Plotters,e.DEFAULT_ATTRS={highlightCircleSize:3,highlightSeriesOpts:null,highlightSeriesBackgroundAlpha:.5,labelsDivWidth:250,labelsDivStyles:{},labelsSeparateLines:!1,labelsShowZeroValues:!0,labelsKMB:!1,labelsKMG2:!1,showLabelsOnHighlight:!0,digitsAfterDecimal:2,maxNumberWidth:6,sigFigs:null,strokeWidth:1,strokeBorderWidth:0,strokeBorderColor:"white",axisTickSize:3,axisLabelFontSize:14,rightGap:5,showRoller:!1,xValueParser:e.dateParser,delimiter:",",sigma:2,errorBars:!1,fractions:!1,wilsonInterval:!0,customBars:!1,fillGraph:!1,fillAlpha:.15,connectSeparatedPoints:!1,stackedGraph:!1,stackedGraphNaNFill:"all",hideOverlayOnMouseOut:!0,legend:"onmouseover",stepPlot:!1,avoidMinZero:!1,xRangePad:0,yRangePad:null,drawAxesAtZero:!1,titleHeight:28,xLabelHeight:18,yLabelWidth:18,drawXAxis:!0,drawYAxis:!0,axisLineColor:"black",axisLineWidth:.3,gridLineWidth:.3,axisLabelColor:"black",axisLabelWidth:50,drawYGrid:!0,drawXGrid:!0,gridLineColor:"rgb(128,128,128)",interactionModel:null,animatedZooms:!1,showRangeSelector:!1,rangeSelectorHeight:40,rangeSelectorPlotStrokeColor:"#808FAB",rangeSelectorPlotFillColor:"#A7B1C4",showInRangeSelector:null,plotter:[e.Plotters.fillPlotter,e.Plotters.errorPlotter,e.Plotters.linePlotter],plugins:[],axes:{x:{pixelsPerLabel:70,axisLabelWidth:60,axisLabelFormatter:e.dateAxisLabelFormatter,valueFormatter:e.dateValueFormatter,drawGrid:!0,drawAxis:!0,independentTicks:!0,ticker:null},y:{axisLabelWidth:50,pixelsPerLabel:30,valueFormatter:e.numberValueFormatter,axisLabelFormatter:e.numberAxisLabelFormatter,drawGrid:!0,drawAxis:!0,independentTicks:!0,ticker:null},y2:{axisLabelWidth:50,pixelsPerLabel:30,valueFormatter:e.numberValueFormatter,axisLabelFormatter:e.numberAxisLabelFormatter,drawAxis:!0,drawGrid:!1,independentTicks:!1,ticker:null}}},e.HORIZONTAL=1,e.VERTICAL=2,e.PLUGINS=[],e.addedAnnotationCSS=!1,e.prototype.__old_init__=function(t,a,i,r){if(null!==i){for(var n=["Date"],s=0;s<i.length;s++)n.push(i[s])
e.update(r,{labels:n})}this.__init__(t,a,r)},e.prototype.__init__=function(t,a,i){if(/MSIE/.test(navigator.userAgent)&&!window.opera&&"undefined"!=typeof G_vmlCanvasManager&&"complete"!=document.readyState){var r=this
return void setTimeout(function(){r.__init__(t,a,i)},100)}if((null===i||void 0===i)&&(i={}),i=e.mapLegacyOptions_(i),"string"==typeof t&&(t=document.getElementById(t)),!t)return void console.error("Constructing dygraph with a non-existent div!")
this.isUsingExcanvas_="undefined"!=typeof G_vmlCanvasManager,this.maindiv_=t,this.file_=a,this.rollPeriod_=i.rollPeriod||e.DEFAULT_ROLL_PERIOD,this.previousVerticalX_=-1,this.fractions_=i.fractions||!1,this.dateWindow_=i.dateWindow||null,this.annotations_=[],this.zoomed_x_=!1,this.zoomed_y_=!1,t.innerHTML="",""===t.style.width&&i.width&&(t.style.width=i.width+"px"),""===t.style.height&&i.height&&(t.style.height=i.height+"px"),""===t.style.height&&0===t.clientHeight&&(t.style.height=e.DEFAULT_HEIGHT+"px",""===t.style.width&&(t.style.width=e.DEFAULT_WIDTH+"px")),this.width_=t.clientWidth||i.width||0,this.height_=t.clientHeight||i.height||0,i.stackedGraph&&(i.fillGraph=!0),this.user_attrs_={},e.update(this.user_attrs_,i),this.attrs_={},e.updateDeep(this.attrs_,e.DEFAULT_ATTRS),this.boundaryIds_=[],this.setIndexByName_={},this.datasetIndex_=[],this.registeredEvents_=[],this.eventListeners_={},this.attributes_=new VelChartOptions(this),this.createInterface_(),this.plugins_=[]
for(var n=e.PLUGINS.concat(this.getOption("plugins")),s=0;s<n.length;s++){var o,l=n[s]
o=void 0!==l.activate?l:new l
var h={plugin:o,events:{},options:{},pluginOptions:{}},d=o.activate(this)
for(var c in d)d.hasOwnProperty(c)&&(h.events[c]=d[c])
this.plugins_.push(h)}for(var s=0;s<this.plugins_.length;s++){var p=this.plugins_[s]
for(var c in p.events)if(p.events.hasOwnProperty(c)){var u=p.events[c],g=[p.plugin,u]
c in this.eventListeners_?this.eventListeners_[c].push(g):this.eventListeners_[c]=[g]}}this.createDragInterface_(),this.start_()},e.prototype.cascadeEvents_=function(t,a){if(!(t in this.eventListeners_))return!1
var i={dygraph:this,cancelable:!1,defaultPrevented:!1,preventDefault:function(){if(!i.cancelable)throw"Cannot call preventDefault on non-cancelable event."
i.defaultPrevented=!0},propagationStopped:!1,stopPropagation:function(){i.propagationStopped=!0}}
e.update(i,a)
var r=this.eventListeners_[t]
if(r)for(var n=r.length-1;n>=0;n--){var s=r[n][0],o=r[n][1]
if(o.call(s,i),i.propagationStopped)break}return i.defaultPrevented},e.prototype.getPluginInstance_=function(e){for(var t=0;t<this.plugins_.length;t++){var a=this.plugins_[t]
if(a.plugin instanceof e)return a.plugin}return null},e.prototype.isZoomed=function(e){if(null===e||void 0===e)return this.zoomed_x_||this.zoomed_y_
if("x"===e)return this.zoomed_x_
if("y"===e)return this.zoomed_y_
throw"axis parameter is ["+e+"] must be null, 'x' or 'y'."},e.prototype.toString=function(){var e=this.maindiv_,t=e&&e.id?e.id:e
return"[VelChart "+t+"]"},e.prototype.attr_=function(t,a){return DEBUG&&(void 0===e.OPTIONS_REFERENCE?console.error("Must include options reference JS for testing"):e.OPTIONS_REFERENCE.hasOwnProperty(t)||(console.error("VelCharts is using property "+t+", which has no entry in the VelCharts.OPTIONS_REFERENCE listing."),e.OPTIONS_REFERENCE[t]=!0)),a?this.attributes_.getForSeries(t,a):this.attributes_.get(t)},e.prototype.getOption=function(e,t){return this.attr_(e,t)},e.prototype.getNumericOption=function(e,t){return this.getOption(e,t)},e.prototype.getStringOption=function(e,t){return this.getOption(e,t)},e.prototype.getBooleanOption=function(e,t){return this.getOption(e,t)},e.prototype.getFunctionOption=function(e,t){return this.getOption(e,t)},e.prototype.getOptionForAxis=function(e,t){return this.attributes_.getForAxis(e,t)},e.prototype.optionsViewForAxis_=function(e){var t=this
return function(a){var i=t.user_attrs_.axes
return i&&i[e]&&i[e].hasOwnProperty(a)?i[e][a]:"x"===e&&"logscale"===a?!1:void 0!==t.user_attrs_[a]?t.user_attrs_[a]:(i=t.attrs_.axes,i&&i[e]&&i[e].hasOwnProperty(a)?i[e][a]:"y"==e&&t.axes_[0].hasOwnProperty(a)?t.axes_[0][a]:"y2"==e&&t.axes_[1].hasOwnProperty(a)?t.axes_[1][a]:t.attr_(a))}},e.prototype.rollPeriod=function(){return this.rollPeriod_},e.prototype.xAxisRange=function(){return this.dateWindow_?this.dateWindow_:this.xAxisExtremes()},e.prototype.xAxisExtremes=function(){var e=this.getNumericOption("xRangePad")/this.plotter_.area.w
if(0===this.numRows())return[0-e,1+e]
var t=this.rawData_[0][0],a=this.rawData_[this.rawData_.length-1][0]
if(e){var i=a-t
t-=i*e,a+=i*e}return[t,a]},e.prototype.yAxisRange=function(e){if(void 0===e&&(e=0),0>e||e>=this.axes_.length)return null
var t=this.axes_[e]
return[t.computedValueRange[0],t.computedValueRange[1]]},e.prototype.yAxisRanges=function(){for(var e=[],t=0;t<this.axes_.length;t++)e.push(this.yAxisRange(t))
return e},e.prototype.toDomCoords=function(e,t,a){return[this.toDomXCoord(e),this.toDomYCoord(t,a)]},e.prototype.toDomXCoord=function(e){if(null===e)return null
var t=this.plotter_.area,a=this.xAxisRange()
return t.x+(e-a[0])/(a[1]-a[0])*t.w},e.prototype.toDomYCoord=function(e,t){var a=this.toPercentYCoord(e,t)
if(null===a)return null
var i=this.plotter_.area
return i.y+a*i.h},e.prototype.toDataCoords=function(e,t,a){return[this.toDataXCoord(e),this.toDataYCoord(t,a)]},e.prototype.toDataXCoord=function(t){if(null===t)return null
var a=this.plotter_.area,i=this.xAxisRange()
if(this.attributes_.getForAxis("logscale","x")){var r=(t-a.x)/a.w,n=e.log10(i[0]),s=e.log10(i[1]),o=n+r*(s-n),l=Math.pow(e.LOG_SCALE,o)
return l}return i[0]+(t-a.x)/a.w*(i[1]-i[0])},e.prototype.toDataYCoord=function(t,a){if(null===t)return null
var i=this.plotter_.area,r=this.yAxisRange(a)
if(void 0===a&&(a=0),this.attributes_.getForAxis("logscale",a)){var n=(t-i.y)/i.h,s=e.log10(r[0]),o=e.log10(r[1]),l=o-n*(o-s),h=Math.pow(e.LOG_SCALE,l)
return h}return r[0]+(i.y+i.h-t)/i.h*(r[1]-r[0])},e.prototype.toPercentYCoord=function(t,a){if(null===t)return null
void 0===a&&(a=0)
var i,r=this.yAxisRange(a),n=this.attributes_.getForAxis("logscale",a)
if(n){var s=e.log10(r[0]),o=e.log10(r[1])
i=(o-e.log10(t))/(o-s)}else i=(r[1]-t)/(r[1]-r[0])
return i},e.prototype.toPercentXCoord=function(t){if(null===t)return null
var a,i=this.xAxisRange(),r=this.attributes_.getForAxis("logscale","x")
if(r===!0){var n=e.log10(i[0]),s=e.log10(i[1])
a=(e.log10(t)-n)/(s-n)}else a=(t-i[0])/(i[1]-i[0])
return a},e.prototype.numColumns=function(){return this.rawData_?this.rawData_[0]?this.rawData_[0].length:this.attr_("labels").length:0},e.prototype.numRows=function(){return this.rawData_?this.rawData_.length:0},e.prototype.getValue=function(e,t){return 0>e||e>this.rawData_.length?null:0>t||t>this.rawData_[e].length?null:this.rawData_[e][t]},e.prototype.createInterface_=function(){var t=this.maindiv_
this.graphDiv=document.createElement("div"),this.graphDiv.style.textAlign="left",this.graphDiv.style.position="relative",t.appendChild(this.graphDiv),this.canvas_=e.createCanvas(),this.canvas_.style.position="absolute",this.hidden_=this.createPlotKitCanvas_(this.canvas_),this.canvas_ctx_=e.getContext(this.canvas_),this.hidden_ctx_=e.getContext(this.hidden_),this.resizeElements_(),this.graphDiv.appendChild(this.hidden_),this.graphDiv.appendChild(this.canvas_),this.mouseEventElement_=this.createMouseEventElement_(),this.layout_=new VelChartLayout(this)
var a=this
this.mouseMoveHandler_=function(e){a.mouseMove_(e)},this.mouseOutHandler_=function(t){var i=t.target||t.fromElement,r=t.relatedTarget||t.toElement
e.isNodeContainedBy(i,a.graphDiv)&&!e.isNodeContainedBy(r,a.graphDiv)&&a.mouseOut_(t)},this.addAndTrackEvent(window,"mouseout",this.mouseOutHandler_),this.addAndTrackEvent(this.mouseEventElement_,"mousemove",this.mouseMoveHandler_),this.resizeHandler_||(this.resizeHandler_=function(e){a.resize()},this.addAndTrackEvent(window,"resize",this.resizeHandler_))},e.prototype.resizeElements_=function(){this.graphDiv.style.width=this.width_+"px",this.graphDiv.style.height=this.height_+"px"
var t=e.getContextPixelRatio(this.canvas_ctx_)
this.canvas_.width=this.width_*t,this.canvas_.height=this.height_*t,this.canvas_.style.width=this.width_+"px",this.canvas_.style.height=this.height_+"px",1!==t&&this.canvas_ctx_.scale(t,t)
var a=e.getContextPixelRatio(this.hidden_ctx_)
this.hidden_.width=this.width_*a,this.hidden_.height=this.height_*a,this.hidden_.style.width=this.width_+"px",this.hidden_.style.height=this.height_+"px",1!==a&&this.hidden_ctx_.scale(a,a)},e.prototype.destroy=function(){this.canvas_ctx_.restore(),this.hidden_ctx_.restore()
for(var t=this.plugins_.length-1;t>=0;t--){var a=this.plugins_.pop()
a.plugin.destroy&&a.plugin.destroy()}var i=function(e){for(;e.hasChildNodes();)i(e.firstChild),e.removeChild(e.firstChild)}
this.removeTrackedEvents_(),e.removeEvent(window,"mouseout",this.mouseOutHandler_),e.removeEvent(this.mouseEventElement_,"mousemove",this.mouseMoveHandler_),e.removeEvent(window,"resize",this.resizeHandler_),this.resizeHandler_=null,i(this.maindiv_)
var r=function(e){for(var t in e)"object"==typeof e[t]&&(e[t]=null)}
r(this.layout_),r(this.plotter_),r(this)},e.prototype.createPlotKitCanvas_=function(t){var a=e.createCanvas()
return a.style.position="absolute",a.style.top=t.style.top,a.style.left=t.style.left,a.width=this.width_,a.height=this.height_,a.style.width=this.width_+"px",a.style.height=this.height_+"px",a},e.prototype.createMouseEventElement_=function(){if(this.isUsingExcanvas_){var e=document.createElement("div")
return e.style.position="absolute",e.style.backgroundColor="white",e.style.filter="alpha(opacity=0)",e.style.width=this.width_+"px",e.style.height=this.height_+"px",this.graphDiv.appendChild(e),e}return this.canvas_},e.prototype.setColors_=function(){var t=this.getLabels(),a=t.length-1
this.colors_=[],this.colorsMap_={}
for(var i=this.getNumericOption("colorSaturation")||1,r=this.getNumericOption("colorValue")||.5,n=Math.ceil(a/2),s=this.getOption("colors"),o=this.visibility(),l=0;a>l;l++)if(o[l]){var h=t[l+1],d=this.attributes_.getForSeries("color",h)
if(!d)if(s)d=s[l%s.length]
else{var c=l%2?n+(l+1)/2:Math.ceil((l+1)/2),p=1*c/(1+a)
d=e.hsvToRGB(p,i,r)}this.colors_.push(d),this.colorsMap_[h]=d}},e.prototype.getColors=function(){return this.colors_},e.prototype.getPropertiesForSeries=function(e){for(var t=-1,a=this.getLabels(),i=1;i<a.length;i++)if(a[i]==e){t=i
break}return-1==t?null:{name:e,column:t,visible:this.visibility()[t-1],color:this.colorsMap_[e],axis:1+this.attributes_.axisForSeries(e)}},e.prototype.createRollInterface_=function(){this.roller_||(this.roller_=document.createElement("input"),this.roller_.type="text",this.roller_.style.display="none",this.graphDiv.appendChild(this.roller_))
var e=this.getBooleanOption("showRoller")?"block":"none",t=this.plotter_.area,a={position:"absolute",zIndex:10,top:t.y+t.h-25+"px",left:t.x+1+"px",display:e}
this.roller_.size="2",this.roller_.value=this.rollPeriod_
for(var i in a)a.hasOwnProperty(i)&&(this.roller_.style[i]=a[i])
var r=this
this.roller_.onchange=function(){r.adjustRoll(r.roller_.value)}},e.prototype.createDragInterface_=function(){var t={isZooming:!1,isPanning:!1,is2DPan:!1,dragStartX:null,dragStartY:null,dragEndX:null,dragEndY:null,dragDirection:null,prevEndX:null,prevEndY:null,prevDragDirection:null,cancelNextDblclick:!1,initialLeftmostDate:null,xUnitsPerPixel:null,dateRange:null,px:0,py:0,boundedDates:null,boundedValues:null,tarp:new e.IFrameTarp,initializeMouseDown:function(t,a,i){t.preventDefault?t.preventDefault():(t.returnValue=!1,t.cancelBubble=!0)
var r=e.findPos(a.canvas_)
i.px=r.x,i.py=r.y,i.dragStartX=e.dragGetX_(t,i),i.dragStartY=e.dragGetY_(t,i),i.cancelNextDblclick=!1,i.tarp.cover()},destroy:function(){var e=this
if((e.isZooming||e.isPanning)&&(e.isZooming=!1,e.dragStartX=null,e.dragStartY=null),e.isPanning){e.isPanning=!1,e.draggingDate=null,e.dateRange=null
for(var t=0;t<i.axes_.length;t++)delete i.axes_[t].draggingValue,delete i.axes_[t].dragValueRange}e.tarp.uncover()}},a=this.getOption("interactionModel"),i=this,r=function(e){return function(a){e(a,i,t)}}
for(var n in a)a.hasOwnProperty(n)&&this.addAndTrackEvent(this.mouseEventElement_,n,r(a[n]))
if(!a.willDestroyContextMyself){var s=function(e){t.destroy()}
this.addAndTrackEvent(document,"mouseup",s)}},e.prototype.drawZoomRect_=function(t,a,i,r,n,s,o,l){var h=this.canvas_ctx_
s==e.HORIZONTAL?h.clearRect(Math.min(a,o),this.layout_.getPlotArea().y,Math.abs(a-o),this.layout_.getPlotArea().h):s==e.VERTICAL&&h.clearRect(this.layout_.getPlotArea().x,Math.min(r,l),this.layout_.getPlotArea().w,Math.abs(r-l)),t==e.HORIZONTAL?i&&a&&(h.fillStyle="rgba(128,128,128,0.33)",h.fillRect(Math.min(a,i),this.layout_.getPlotArea().y,Math.abs(i-a),this.layout_.getPlotArea().h)):t==e.VERTICAL&&n&&r&&(h.fillStyle="rgba(128,128,128,0.33)",h.fillRect(this.layout_.getPlotArea().x,Math.min(r,n),this.layout_.getPlotArea().w,Math.abs(n-r))),this.isUsingExcanvas_&&(this.currentZoomRectArgs_=[t,a,i,r,n,0,0,0])},e.prototype.clearZoomRect_=function(){this.currentZoomRectArgs_=null,this.canvas_ctx_.clearRect(0,0,this.width_,this.height_)},e.prototype.doZoomX_=function(e,t){this.currentZoomRectArgs_=null
var a=this.toDataXCoord(e),i=this.toDataXCoord(t)
this.doZoomXDates_(a,i)},e.prototype.doZoomXDates_=function(e,t){var a=this.xAxisRange(),i=[e,t]
this.zoomed_x_=!0
var r=this
this.doAnimatedZoom(a,i,null,null,function(){r.getFunctionOption("zoomCallback")&&r.getFunctionOption("zoomCallback").call(r,e,t,r.yAxisRanges())})},e.prototype.doZoomY_=function(e,t){this.currentZoomRectArgs_=null
for(var a=this.yAxisRanges(),i=[],r=0;r<this.axes_.length;r++){var n=this.toDataYCoord(e,r),s=this.toDataYCoord(t,r)
i.push([s,n])}this.zoomed_y_=!0
var o=this
this.doAnimatedZoom(null,null,a,i,function(){if(o.getFunctionOption("zoomCallback")){var e=o.xAxisRange()
o.getFunctionOption("zoomCallback").call(o,e[0],e[1],o.yAxisRanges())}})},e.zoomAnimationFunction=function(e,t){var a=1.5
return(1-Math.pow(a,-e))/(1-Math.pow(a,-t))},e.prototype.resetZoom=function(){var e=!1,t=!1,a=!1
null!==this.dateWindow_&&(e=!0,t=!0)
for(var i=0;i<this.axes_.length;i++)void 0!==this.axes_[i].valueWindow&&null!==this.axes_[i].valueWindow&&(e=!0,a=!0)
if(this.clearSelection(),e){this.zoomed_x_=!1,this.zoomed_y_=!1
var r=this.rawData_[0][0],n=this.rawData_[this.rawData_.length-1][0]
if(!this.getBooleanOption("animatedZooms")){for(this.dateWindow_=null,i=0;i<this.axes_.length;i++)null!==this.axes_[i].valueWindow&&delete this.axes_[i].valueWindow
return this.drawGraph_(),void(this.getFunctionOption("zoomCallback")&&this.getFunctionOption("zoomCallback").call(this,r,n,this.yAxisRanges()))}var s=null,o=null,l=null,h=null
if(t&&(s=this.xAxisRange(),o=[r,n]),a){l=this.yAxisRanges()
var d=this.gatherDatasets_(this.rolledSeries_,null),c=d.extremes
for(this.computeYAxisRanges_(c),h=[],i=0;i<this.axes_.length;i++){var p=this.axes_[i]
h.push(null!==p.valueRange&&void 0!==p.valueRange?p.valueRange:p.extremeRange)}}var u=this
this.doAnimatedZoom(s,o,l,h,function(){u.dateWindow_=null
for(var e=0;e<u.axes_.length;e++)null!==u.axes_[e].valueWindow&&delete u.axes_[e].valueWindow
u.getFunctionOption("zoomCallback")&&u.getFunctionOption("zoomCallback").call(u,r,n,u.yAxisRanges())})}},e.prototype.doAnimatedZoom=function(t,a,i,r,n){var s,o,l=this.getBooleanOption("animatedZooms")?e.ANIMATION_STEPS:1,h=[],d=[]
if(null!==t&&null!==a)for(s=1;l>=s;s++)o=e.zoomAnimationFunction(s,l),h[s-1]=[t[0]*(1-o)+o*a[0],t[1]*(1-o)+o*a[1]]
if(null!==i&&null!==r)for(s=1;l>=s;s++){o=e.zoomAnimationFunction(s,l)
for(var c=[],p=0;p<this.axes_.length;p++)c.push([i[p][0]*(1-o)+o*r[p][0],i[p][1]*(1-o)+o*r[p][1]])
d[s-1]=c}var u=this
e.repeatAndCleanup(function(e){if(d.length)for(var t=0;t<u.axes_.length;t++){var a=d[e][t]
u.axes_[t].valueWindow=[a[0],a[1]]}h.length&&(u.dateWindow_=h[e]),u.drawGraph_()},l,e.ANIMATION_DURATION/l,n)},e.prototype.getArea=function(){return this.plotter_.area},e.prototype.eventToDomCoords=function(t){if(t.offsetX&&t.offsetY)return[t.offsetX,t.offsetY]
var a=e.findPos(this.mouseEventElement_),i=e.pageX(t)-a.x,r=e.pageY(t)-a.y
return[i,r]},e.prototype.findClosestRow=function(t){for(var a=1/0,i=-1,r=this.layout_.points,n=0;n<r.length;n++)for(var s=r[n],o=s.length,l=0;o>l;l++){var h=s[l]
if(e.isValidPoint(h,!0)){var d=Math.abs(h.canvasx-t)
a>d&&(a=d,i=h.idx)}}return i},e.prototype.findClosestPoint=function(t,a){for(var i,r,n,s,o,l,h,d=1/0,c=this.layout_.points.length-1;c>=0;--c)for(var p=this.layout_.points[c],u=0;u<p.length;++u)s=p[u],e.isValidPoint(s)&&(r=s.canvasx-t,n=s.canvasy-a,i=r*r+n*n,d>i&&(d=i,o=s,l=c,h=s.idx))
var g=this.layout_.setNames[l]
return{row:h,seriesName:g,point:o}},e.prototype.findStackedPoint=function(t,a){for(var i,r,n=this.findClosestRow(t),s=0;s<this.layout_.points.length;++s){var o=this.getLeftBoundary_(s),l=n-o,h=this.layout_.points[s]
if(!(l>=h.length)){var d=h[l]
if(e.isValidPoint(d)){var c=d.canvasy
if(t>d.canvasx&&l+1<h.length){var p=h[l+1]
if(e.isValidPoint(p)){var u=p.canvasx-d.canvasx
if(u>0){var g=(t-d.canvasx)/u
c+=g*(p.canvasy-d.canvasy)}}}else if(t<d.canvasx&&l>0){var f=h[l-1]
if(e.isValidPoint(f)){var u=d.canvasx-f.canvasx
if(u>0){var g=(d.canvasx-t)/u
c+=g*(f.canvasy-d.canvasy)}}}(0===s||a>c)&&(i=d,r=s)}}}var v=this.layout_.setNames[r]
return{row:n,seriesName:v,point:i}},e.prototype.mouseMove_=function(e){var t=this.layout_.points
if(void 0!==t&&null!==t){var a=this.eventToDomCoords(e),i=a[0],r=a[1],n=this.getOption("highlightSeriesOpts"),s=!1
if(n&&!this.isSeriesLocked()){var o
o=this.getBooleanOption("stackedGraph")?this.findStackedPoint(i,r):this.findClosestPoint(i,r),s=this.setSelection(o.row,o.seriesName)}else{var l=this.findClosestRow(i)
s=this.setSelection(l)}var h=this.getFunctionOption("highlightCallback")
h&&s&&h.call(this,e,this.lastx_,this.selPoints_,this.lastRow_,this.highlightSet_)}},e.prototype.getLeftBoundary_=function(e){if(this.boundaryIds_[e])return this.boundaryIds_[e][0]
for(var t=0;t<this.boundaryIds_.length;t++)if(void 0!==this.boundaryIds_[t])return this.boundaryIds_[t][0]
return 0},e.prototype.animateSelection_=function(t){var a=10,i=30
void 0===this.fadeLevel&&(this.fadeLevel=0),void 0===this.animateId&&(this.animateId=0)
var r=this.fadeLevel,n=0>t?r:a-r
if(0>=n)return void(this.fadeLevel&&this.updateSelection_(1))
var s=++this.animateId,o=this
e.repeatAndCleanup(function(e){o.animateId==s&&(o.fadeLevel+=t,0===o.fadeLevel?o.clearSelection():o.updateSelection_(o.fadeLevel/a))},n,i,function(){})},e.prototype.updateSelection_=function(t){this.cascadeEvents_("select",{selectedRow:this.lastRow_,selectedX:this.lastx_,selectedPoints:this.selPoints_})
var a,i=this.canvas_ctx_
if(this.getOption("highlightSeriesOpts")){i.clearRect(0,0,this.width_,this.height_)
var r=1-this.getNumericOption("highlightSeriesBackgroundAlpha")
if(r){var n=!0
if(n){if(void 0===t)return void this.animateSelection_(1)
r*=t}i.fillStyle="rgba(255,255,255,"+r+")",i.fillRect(0,0,this.width_,this.height_)}this.plotter_._renderLineChart(this.highlightSet_,i)}else if(this.previousVerticalX_>=0){var s=0,o=this.attr_("labels")
for(a=1;a<o.length;a++){var l=this.getNumericOption("highlightCircleSize",o[a])
l>s&&(s=l)}var h=this.previousVerticalX_
i.clearRect(h-s-1,0,2*s+2,this.height_)}if(this.isUsingExcanvas_&&this.currentZoomRectArgs_&&e.prototype.drawZoomRect_.apply(this,this.currentZoomRectArgs_),this.selPoints_.length>0){var d=this.selPoints_[0].canvasx
for(i.save(),a=0;a<this.selPoints_.length;a++){var c=this.selPoints_[a]
if(e.isOK(c.canvasy)){var p=this.getNumericOption("highlightCircleSize",c.name),u=this.getFunctionOption("drawHighlightPointCallback",c.name),g=this.plotter_.colors[c.name]
u||(u=e.Circles.DEFAULT),i.lineWidth=this.getNumericOption("strokeWidth",c.name),i.strokeStyle=g,i.fillStyle=g,u.call(this,this,c.name,i,d,c.canvasy,g,p,c.idx)}}i.restore(),this.previousVerticalX_=d}},e.prototype.setSelection=function(e,t,a){this.selPoints_=[]
var i=!1
if(e!==!1&&e>=0){e!=this.lastRow_&&(i=!0),this.lastRow_=e
for(var r=0;r<this.layout_.points.length;++r){var n=this.layout_.points[r],s=e-this.getLeftBoundary_(r)
if(s<n.length&&n[s].idx==e){var o=n[s]
null!==o.yval&&this.selPoints_.push(o)}else for(var l=0;l<n.length;++l){var o=n[l]
if(o.idx==e){null!==o.yval&&this.selPoints_.push(o)
break}}}}else this.lastRow_>=0&&(i=!0),this.lastRow_=-1
return this.selPoints_.length?this.lastx_=this.selPoints_[0].xval:this.lastx_=-1,void 0!==t&&(this.highlightSet_!==t&&(i=!0),this.highlightSet_=t),void 0!==a&&(this.lockedSet_=a),i&&this.updateSelection_(void 0),i},e.prototype.mouseOut_=function(e){this.getFunctionOption("unhighlightCallback")&&this.getFunctionOption("unhighlightCallback").call(this,e),this.getBooleanOption("hideOverlayOnMouseOut")&&!this.lockedSet_&&this.clearSelection()},e.prototype.clearSelection=function(){return this.cascadeEvents_("deselect",{}),this.lockedSet_=!1,this.fadeLevel?void this.animateSelection_(-1):(this.canvas_ctx_.clearRect(0,0,this.width_,this.height_),this.fadeLevel=0,this.selPoints_=[],this.lastx_=-1,this.lastRow_=-1,void(this.highlightSet_=null))},e.prototype.getSelection=function(){if(!this.selPoints_||this.selPoints_.length<1)return-1
for(var e=0;e<this.layout_.points.length;e++)for(var t=this.layout_.points[e],a=0;a<t.length;a++)if(t[a].x==this.selPoints_[0].x)return t[a].idx
return-1},e.prototype.getHighlightSeries=function(){return this.highlightSet_},e.prototype.isSeriesLocked=function(){return this.lockedSet_},e.prototype.loadedEvent_=function(e){this.rawData_=this.parseCSV_(e),this.cascadeDataDidUpdateEvent_(),this.predraw_()},e.prototype.addXTicks_=function(){var e
e=this.dateWindow_?[this.dateWindow_[0],this.dateWindow_[1]]:this.xAxisExtremes()
var t=this.optionsViewForAxis_("x"),a=t("ticker")(e[0],e[1],this.plotter_.area.w,t,this)
this.layout_.setXTicks(a)},e.prototype.getHandlerClass_=function(){var t
return t=this.attr_("dataHandler")?this.attr_("dataHandler"):this.fractions_?this.getBooleanOption("errorBars")?e.DataHandlers.FractionsBarsHandler:e.DataHandlers.DefaultFractionHandler:this.getBooleanOption("customBars")?e.DataHandlers.CustomBarsHandler:this.getBooleanOption("errorBars")?e.DataHandlers.ErrorBarsHandler:e.DataHandlers.DefaultHandler},e.prototype.predraw_=function(){var e=new Date
this.dataHandler_=new(this.getHandlerClass_()),this.layout_.computePlotArea(),this.computeYAxes_(),this.is_initial_draw_||(this.canvas_ctx_.restore(),this.hidden_ctx_.restore()),this.canvas_ctx_.save(),this.hidden_ctx_.save(),this.plotter_=new VelChartCanvasRenderer(this,this.hidden_,this.hidden_ctx_,this.layout_),this.createRollInterface_(),this.cascadeEvents_("predraw"),this.rolledSeries_=[null]
for(var t=1;t<this.numColumns();t++){var a=this.dataHandler_.extractSeries(this.rawData_,t,this.attributes_)
this.rollPeriod_>1&&(a=this.dataHandler_.rollingAverage(a,this.rollPeriod_,this.attributes_)),this.rolledSeries_.push(a)}this.drawGraph_()
var i=new Date
this.drawingTimeMs_=i-e},e.PointType=void 0,e.stackPoints_=function(e,t,a,i){for(var r=null,n=null,s=null,o=-1,l=function(t){if(!(o>=t))for(var a=t;a<e.length;++a)if(s=null,!isNaN(e[a].yval)&&null!==e[a].yval){o=a,s=e[a]
break}},h=0;h<e.length;++h){var d=e[h],c=d.xval
void 0===t[c]&&(t[c]=0)
var p=d.yval
isNaN(p)||null===p?"none"==i?p=0:(l(h),p=n&&s&&"none"!=i?n.yval+(s.yval-n.yval)*((c-n.xval)/(s.xval-n.xval)):n&&"all"==i?n.yval:s&&"all"==i?s.yval:0):n=d
var u=t[c]
r!=c&&(u+=p,t[c]=u),r=c,d.yval_stacked=u,u>a[1]&&(a[1]=u),u<a[0]&&(a[0]=u)}},e.prototype.gatherDatasets_=function(t,a){var i,r,n,s,o,l,h=[],d=[],c=[],p={},u=t.length-1
for(i=u;i>=1;i--)if(this.visibility()[i-1]){if(a){l=t[i]
var g=a[0],f=a[1]
for(n=null,s=null,r=0;r<l.length;r++)l[r][0]>=g&&null===n&&(n=r),l[r][0]<=f&&(s=r)
null===n&&(n=0)
for(var v=n,y=!0;y&&v>0;)v--,y=null===l[v][1]
null===s&&(s=l.length-1)
var _=s
for(y=!0;y&&_<l.length-1;)_++,y=null===l[_][1]
v!==n&&(n=v),_!==s&&(s=_),h[i-1]=[n,s],l=l.slice(n,s+1)}else l=t[i],h[i-1]=[0,l.length-1]
var x=this.attr_("labels")[i],m=this.dataHandler_.getExtremeYValues(l,a,this.getBooleanOption("stepPlot",x)),b=this.dataHandler_.seriesToPoints(l,x,h[i-1][0])
this.getBooleanOption("stackedGraph")&&(o=this.attributes_.axisForSeries(x),void 0===c[o]&&(c[o]=[]),e.stackPoints_(b,c[o],m,this.getBooleanOption("stackedGraphNaNFill"))),p[x]=m,d[i]=b}return{points:d,extremes:p,boundaryIds:h}},e.prototype.drawGraph_=function(){var e=new Date,t=this.is_initial_draw_
this.is_initial_draw_=!1,this.layout_.removeAllDatasets(),this.setColors_(),this.attrs_.pointSize=.5*this.getNumericOption("highlightCircleSize")
var a=this.gatherDatasets_(this.rolledSeries_,this.dateWindow_),i=a.points,r=a.extremes
this.boundaryIds_=a.boundaryIds,this.setIndexByName_={}
var n=this.attr_("labels")
n.length>0&&(this.setIndexByName_[n[0]]=0)
for(var s=0,o=1;o<i.length;o++)this.setIndexByName_[n[o]]=o,this.visibility()[o-1]&&(this.layout_.addDataset(n[o],i[o]),this.datasetIndex_[o]=s++)
this.computeYAxisRanges_(r),this.layout_.setYAxes(this.axes_),this.addXTicks_()
var l=this.zoomed_x_
if(this.zoomed_x_=l,this.layout_.evaluate(),this.renderGraph_(t),this.getStringOption("timingName")){var h=new Date
console.log(this.getStringOption("timingName")+" - drawGraph: "+(h-e)+"ms")}},e.prototype.renderGraph_=function(e){this.cascadeEvents_("clearChart"),this.plotter_.clear(),this.getFunctionOption("underlayCallback")&&this.getFunctionOption("underlayCallback").call(this,this.hidden_ctx_,this.layout_.getPlotArea(),this,this)
var t={canvas:this.hidden_,drawingContext:this.hidden_ctx_}
if(this.cascadeEvents_("willDrawChart",t),this.plotter_.render(),this.cascadeEvents_("didDrawChart",t),this.lastRow_=-1,this.canvas_.getContext("2d").clearRect(0,0,this.width_,this.height_),null!==this.getFunctionOption("drawCallback")&&this.getFunctionOption("drawCallback").call(this,this,e),e)for(this.readyFired_=!0;this.readyFns_.length>0;){var a=this.readyFns_.pop()
a(this)}},e.prototype.computeYAxes_=function(){var t,a,i,r,n
if(void 0!==this.axes_&&this.user_attrs_.hasOwnProperty("valueRange")===!1)for(t=[],i=0;i<this.axes_.length;i++)t.push(this.axes_[i].valueWindow)
for(this.axes_=[],a=0;a<this.attributes_.numAxes();a++)r={g:this},e.update(r,this.attributes_.axisOptions(a)),this.axes_[a]=r
if(n=this.attr_("valueRange"),n&&(this.axes_[0].valueRange=n),void 0!==t){var s=Math.min(t.length,this.axes_.length)
for(i=0;s>i;i++)this.axes_[i].valueWindow=t[i]}for(a=0;a<this.axes_.length;a++)if(0===a)r=this.optionsViewForAxis_("y"+(a?"2":"")),n=r("valueRange"),n&&(this.axes_[a].valueRange=n)
else{var o=this.user_attrs_.axes
o&&o.y2&&(n=o.y2.valueRange,n&&(this.axes_[a].valueRange=n))}},e.prototype.numAxes=function(){return this.attributes_.numAxes()},e.prototype.axisPropertiesForSeries=function(e){return this.axes_[this.attributes_.axisForSeries(e)]},e.prototype.computeYAxisRanges_=function(e){for(var t,a,i,r,n,s=function(e){return isNaN(parseFloat(e))},o=this.attributes_.numAxes(),l=0;o>l;l++){var h=this.axes_[l],d=this.attributes_.getForAxis("logscale",l),c=this.attributes_.getForAxis("includeZero",l),p=this.attributes_.getForAxis("independentTicks",l)
if(i=this.attributes_.seriesForAxis(l),t=!0,r=.1,null!==this.getNumericOption("yRangePad")&&(t=!1,r=this.getNumericOption("yRangePad")/this.plotter_.area.h),0===i.length)h.extremeRange=[0,1]
else{for(var u,g,f=1/0,v=-(1/0),y=0;y<i.length;y++)e.hasOwnProperty(i[y])&&(u=e[i[y]][0],null!==u&&(f=Math.min(u,f)),g=e[i[y]][1],null!==g&&(console.log(g),v=Math.max(g,v)))
c&&!d&&(f>0&&(f=0),0>v&&(v=0)),f==1/0&&(f=0),v==-(1/0)&&(v=1),a=v-f,0===a&&(0!==v?a=Math.abs(v):(v=1,a=1))
var _,x
if(d)if(t)_=v+r*a,x=f
else{var m=Math.exp(Math.log(a)*r)
_=v*m,x=f/m}else _=v+r*a,x=f-r*a,t&&!this.getBooleanOption("avoidMinZero")&&(0>x&&f>=0&&(x=0),_>0&&0>=v&&(_=0))
h.extremeRange=[x,_]}if(h.valueWindow)h.computedValueRange=[h.valueWindow[0],h.valueWindow[1]]
else if(h.valueRange){var b=s(h.valueRange[0])?h.extremeRange[0]:h.valueRange[0],C=s(h.valueRange[1])?h.extremeRange[1]:h.valueRange[1]
if(!t)if(h.logscale){var m=Math.exp(Math.log(a)*r)
b*=m,C/=m}else a=C-b,b-=a*r,C+=a*r
h.computedValueRange=[b,C]}else h.computedValueRange=h.extremeRange
if(p){h.independentTicks=p
var w=this.optionsViewForAxis_("y"+(l?"2":"")),A=w("ticker")
h.ticks=A(h.computedValueRange[0],h.computedValueRange[1],this.plotter_.area.h,w,this),n||(n=h)}}if(void 0===n)throw'Configuration Error: At least one axis has to have the "independentTicks" option activated.'
for(var l=0;o>l;l++){var h=this.axes_[l]
if(!h.independentTicks){for(var w=this.optionsViewForAxis_("y"+(l?"2":"")),A=w("ticker"),T=n.ticks,V=n.computedValueRange[1]-n.computedValueRange[0],E=h.computedValueRange[1]-h.computedValueRange[0],D=[],S=0;S<T.length;S++){var L=(T[S].v-n.computedValueRange[0])/V,P=h.computedValueRange[0]+L*E
D.push(P)}h.ticks=A(h.computedValueRange[0],h.computedValueRange[1],this.plotter_.area.h,w,this,D)}}},e.prototype.detectTypeFromString_=function(e){var t=!1,a=e.indexOf("-")
a>0&&"e"!=e[a-1]&&"E"!=e[a-1]||e.indexOf("/")>=0||isNaN(parseFloat(e))?t=!0:8==e.length&&e>"19700101"&&"20371231">e&&(t=!0),this.setXAxisOptions_(t)},e.prototype.setXAxisOptions_=function(t){t?(this.attrs_.xValueParser=e.dateParser,this.attrs_.axes.x.valueFormatter=e.dateValueFormatter,this.attrs_.axes.x.ticker=e.dateTicker,this.attrs_.axes.x.axisLabelFormatter=e.dateAxisLabelFormatter):(this.attrs_.xValueParser=function(e){return parseFloat(e)},this.attrs_.axes.x.valueFormatter=function(e){return e},this.attrs_.axes.x.ticker=e.numericTicks,this.attrs_.axes.x.axisLabelFormatter=this.attrs_.axes.x.valueFormatter)},e.prototype.parseCSV_=function(t){var a,i,r=[],n=e.detectLineDelimiter(t),s=t.split(n||"\n"),o=this.getStringOption("delimiter");-1==s[0].indexOf(o)&&s[0].indexOf("	")>=0&&(o="	")
var l=0
"labels"in this.user_attrs_||(l=1,this.attrs_.labels=s[0].split(o),this.attributes_.reparseSeries())
for(var h,d=0,c=!1,p=this.attr_("labels").length,u=!1,g=l;g<s.length;g++){var f=s[g]
if(d=g,0!==f.length&&"#"!=f[0]){var v=f.split(o)
if(!(v.length<2)){var y=[]
if(c||(this.detectTypeFromString_(v[0]),h=this.getFunctionOption("xValueParser"),c=!0),y[0]=h(v[0],this),this.fractions_)for(i=1;i<v.length;i++)a=v[i].split("/"),2!=a.length?(console.error('Expected fractional "num/den" values in CSV data but found a value \''+v[i]+"' on line "+(1+g)+" ('"+f+"') which is not of this form."),y[i]=[0,0]):y[i]=[e.parseFloat_(a[0],g,f),e.parseFloat_(a[1],g,f)]
else if(this.getBooleanOption("errorBars"))for(v.length%2!=1&&console.error("Expected alternating (value, stdev.) pairs in CSV data but line "+(1+g)+" has an odd number of values ("+(v.length-1)+"): '"+f+"'"),i=1;i<v.length;i+=2)y[(i+1)/2]=[e.parseFloat_(v[i],g,f),e.parseFloat_(v[i+1],g,f)]
else if(this.getBooleanOption("customBars"))for(i=1;i<v.length;i++){var _=v[i];/^ *$/.test(_)?y[i]=[null,null,null]:(a=_.split(";"),3==a.length?y[i]=[e.parseFloat_(a[0],g,f),e.parseFloat_(a[1],g,f),e.parseFloat_(a[2],g,f)]:console.warn('When using customBars, values must be either blank or "low;center;high" tuples (got "'+_+'" on line '+(1+g)))}else for(i=1;i<v.length;i++)y[i]=e.parseFloat_(v[i],g,f)
if(r.length>0&&y[0]<r[r.length-1][0]&&(u=!0),y.length!=p&&console.error("Number of columns in line "+g+" ("+y.length+") does not agree with number of labels ("+p+") "+f),0===g&&this.attr_("labels")){var x=!0
for(i=0;x&&i<y.length;i++)y[i]&&(x=!1)
if(x){console.warn("The VelCharts 'labels' option is set, but the first row of CSV data ('"+f+"') appears to also contain labels. Will drop the CSV labels and use the option labels.")
continue}}r.push(y)}}}return u&&(console.warn("CSV is out of order; order it correctly to speed loading."),r.sort(function(e,t){return e[0]-t[0]})),r},e.prototype.parseArray_=function(t){if(0===t.length)return console.error("Can't plot empty data set"),null
if(0===t[0].length)return console.error("Data set cannot contain an empty row"),null
var a
if(null===this.attr_("labels")){for(console.warn("Using default labels. Set labels explicitly via 'labels' in the options parameter"),this.attrs_.labels=["X"],a=1;a<t[0].length;a++)this.attrs_.labels.push("Y"+a)
this.attributes_.reparseSeries()}else{var i=this.attr_("labels")
if(i.length!=t[0].length)return console.error("Mismatch between number of labels ("+i+") and number of columns in array ("+t[0].length+")"),null}if(e.isDateLike(t[0][0])){this.attrs_.axes.x.valueFormatter=e.dateValueFormatter,this.attrs_.axes.x.ticker=e.dateTicker,this.attrs_.axes.x.axisLabelFormatter=e.dateAxisLabelFormatter
var r=e.clone(t)
for(a=0;a<t.length;a++){if(0===r[a].length)return console.error("Row "+(1+a)+" of data is empty"),null
if(null===r[a][0]||"function"!=typeof r[a][0].getTime||isNaN(r[a][0].getTime()))return console.error("x value in row "+(1+a)+" is not a Date"),null
r[a][0]=r[a][0].getTime()}return r}return this.attrs_.axes.x.valueFormatter=function(e){return e},this.attrs_.axes.x.ticker=e.numericTicks,this.attrs_.axes.x.axisLabelFormatter=e.numberAxisLabelFormatter,t},e.prototype.parseDataTable_=function(t){var a=function(e){var t=String.fromCharCode(65+e%26)
for(e=Math.floor(e/26);e>0;)t=String.fromCharCode(65+(e-1)%26)+t.toLowerCase(),e=Math.floor((e-1)/26)
return t},i=t.getNumberOfColumns(),r=t.getNumberOfRows(),n=t.getColumnType(0)
if("date"==n||"datetime"==n)this.attrs_.xValueParser=e.dateParser,this.attrs_.axes.x.valueFormatter=e.dateValueFormatter,this.attrs_.axes.x.ticker=e.dateTicker,this.attrs_.axes.x.axisLabelFormatter=e.dateAxisLabelFormatter
else{if("number"!=n)return console.error("only 'date', 'datetime' and 'number' types are supported for column 1 of DataTable input (Got '"+n+"')"),null
this.attrs_.xValueParser=function(e){return parseFloat(e)},this.attrs_.axes.x.valueFormatter=function(e){return e},this.attrs_.axes.x.ticker=e.numericTicks,this.attrs_.axes.x.axisLabelFormatter=this.attrs_.axes.x.valueFormatter}var s,o,l=[],h={},d=!1
for(s=1;i>s;s++){var c=t.getColumnType(s)
if("number"==c)l.push(s)
else if("string"==c&&this.getBooleanOption("displayAnnotations")){var p=l[l.length-1]
h.hasOwnProperty(p)?h[p].push(s):h[p]=[s],d=!0}else console.error("Only 'number' is supported as a dependent type with Gviz. 'string' is only supported if displayAnnotations is true")}var u=[t.getColumnLabel(0)]
for(s=0;s<l.length;s++)u.push(t.getColumnLabel(l[s])),this.getBooleanOption("errorBars")&&(s+=1)
this.attrs_.labels=u,i=u.length
var g=[],f=!1,v=[]
for(s=0;r>s;s++){var y=[]
if(void 0!==t.getValue(s,0)&&null!==t.getValue(s,0)){if("date"==n||"datetime"==n?y.push(t.getValue(s,0).getTime()):y.push(t.getValue(s,0)),this.getBooleanOption("errorBars"))for(o=0;i-1>o;o++)y.push([t.getValue(s,1+2*o),t.getValue(s,2+2*o)])
else{for(o=0;o<l.length;o++){var _=l[o]
if(y.push(t.getValue(s,_)),d&&h.hasOwnProperty(_)&&null!==t.getValue(s,h[_][0])){var x={}
x.series=t.getColumnLabel(_),x.xval=y[0],x.shortText=a(v.length),x.text=""
for(var m=0;m<h[_].length;m++)m&&(x.text+="\n"),x.text+=t.getValue(s,h[_][m])
v.push(x)}}for(o=0;o<y.length;o++)isFinite(y[o])||(y[o]=null)}g.length>0&&y[0]<g[g.length-1][0]&&(f=!0),g.push(y)}else console.warn("Ignoring row "+s+" of DataTable because of undefined or null first column.")}f&&(console.warn("DataTable is out of order; order it correctly to speed loading."),g.sort(function(e,t){return e[0]-t[0]})),this.rawData_=g,v.length>0&&this.setAnnotations(v,!0),this.attributes_.reparseSeries()},e.prototype.cascadeDataDidUpdateEvent_=function(){this.cascadeEvents_("dataDidUpdate",{})},e.prototype.start_=function(){var t=this.file_
if("function"==typeof t&&(t=t()),e.isArrayLike(t))this.rawData_=this.parseArray_(t),this.cascadeDataDidUpdateEvent_(),this.predraw_()
else if("object"==typeof t&&"function"==typeof t.getColumnRange)this.parseDataTable_(t),this.cascadeDataDidUpdateEvent_(),this.predraw_()
else if("string"==typeof t){var a=e.detectLineDelimiter(t)
if(a)this.loadedEvent_(t)
else{var i
i=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP")
var r=this
i.onreadystatechange=function(){4==i.readyState&&(200===i.status||0===i.status)&&r.loadedEvent_(i.responseText)},i.open("GET",t,!0),i.send(null)}}else console.error("Unknown data format: "+typeof t)},e.prototype.updateOptions=function(t,a){void 0===a&&(a=!1)
var i=t.file,r=e.mapLegacyOptions_(t)
"rollPeriod"in r&&(this.rollPeriod_=r.rollPeriod),"dateWindow"in r&&(this.dateWindow_=r.dateWindow,"isZoomedIgnoreProgrammaticZoom"in r||(this.zoomed_x_=null!==r.dateWindow)),"valueRange"in r&&!("isZoomedIgnoreProgrammaticZoom"in r)&&(this.zoomed_y_=null!==r.valueRange)
var n=e.isPixelChangingOptionList(this.attr_("labels"),r)
e.updateDeep(this.user_attrs_,r),this.attributes_.reparseSeries(),i?(this.cascadeEvents_("dataWillUpdate",{}),this.file_=i,a||this.start_()):a||(n?this.predraw_():this.renderGraph_(!1))},e.mapLegacyOptions_=function(e){var t={}
for(var a in e)e.hasOwnProperty(a)&&"file"!=a&&e.hasOwnProperty(a)&&(t[a]=e[a])
var i=function(e,a,i){t.axes||(t.axes={}),t.axes[e]||(t.axes[e]={}),t.axes[e][a]=i},r=function(a,r,n){void 0!==e[a]&&(console.warn("Option "+a+" is deprecated. Use the "+n+" option for the "+r+" axis instead. (e.g. { axes : { "+r+" : { "+n+" : ... } } } (see http://VelCharts.com/per-axis.html for more information."),i(r,n,e[a]),delete t[a])}
return r("xValueFormatter","x","valueFormatter"),r("pixelsPerXLabel","x","pixelsPerLabel"),r("xAxisLabelFormatter","x","axisLabelFormatter"),r("xTicker","x","ticker"),r("yValueFormatter","y","valueFormatter"),r("pixelsPerYLabel","y","pixelsPerLabel"),r("yAxisLabelFormatter","y","axisLabelFormatter"),r("yTicker","y","ticker"),r("drawXGrid","x","drawGrid"),r("drawXAxis","x","drawAxis"),r("drawYGrid","y","drawGrid"),r("drawYAxis","y","drawAxis"),r("xAxisLabelWidth","x","axisLabelWidth"),r("yAxisLabelWidth","y","axisLabelWidth"),t},e.prototype.resize=function(e,t){if(!this.resize_lock){this.resize_lock=!0,null===e!=(null===t)&&(console.warn("VelChart.resize() should be called with zero parameters or two non-NULL parameters. Pretending it was zero."),e=t=null)
var a=this.width_,i=this.height_
e?(this.maindiv_.style.width=e+"px",this.maindiv_.style.height=t+"px",this.width_=e,this.height_=t):(this.width_=this.maindiv_.clientWidth,this.height_=this.maindiv_.clientHeight),(a!=this.width_||i!=this.height_)&&(this.resizeElements_(),this.predraw_()),this.resize_lock=!1}},e.prototype.adjustRoll=function(e){this.rollPeriod_=e,this.predraw_()},e.prototype.visibility=function(){for(this.getOption("visibility")||(this.attrs_.visibility=[]);this.getOption("visibility").length<this.numColumns()-1;)this.attrs_.visibility.push(!0)
return this.getOption("visibility")},e.prototype.setVisibility=function(e,t){var a=this.visibility()
0>e||e>=a.length?console.warn("invalid series number in setVisibility: "+e):(a[e]=t,this.predraw_())},e.prototype.size=function(){return{width:this.width_,height:this.height_}},e.prototype.setAnnotations=function(t,a){return e.addAnnotationRule(),this.annotations_=t,this.layout_?(this.layout_.setAnnotations(this.annotations_),void(a||this.predraw_())):void console.warn("Tried to setAnnotations before dygraph was ready. Try setting them in a ready() block. See VelCharts.com/tests/annotation.html")},e.prototype.annotations=function(){return this.annotations_},e.prototype.getLabels=function(){var e=this.attr_("labels")
return e?e.slice():null},e.prototype.indexFromSetName=function(e){return this.setIndexByName_[e]},e.prototype.ready=function(e){this.is_initial_draw_?this.readyFns_.push(e):e.call(this,this)},e.addAnnotationRule=function(){if(!e.addedAnnotationCSS){var t="border: 1px solid black; background-color: white; text-align: center;",a=document.createElement("style")
a.type="text/css",document.getElementsByTagName("head")[0].appendChild(a)
for(var i=0;i<document.styleSheets.length;i++)if(!document.styleSheets[i].disabled){var r=document.styleSheets[i]
try{if(r.insertRule){var n=r.cssRules?r.cssRules.length:0
r.insertRule(".dygraphDefaultAnnotation { "+t+" }",n)}else r.addRule&&r.addRule(".dygraphDefaultAnnotation",t)
return void(e.addedAnnotationCSS=!0)}catch(s){}}console.warn("Unable to add default annotation CSS rule; display may be off.")}},"object"==typeof exports&&"undefined"!=typeof module&&(module.exports=e),e}()
!function(){"use strict"
function e(e){var t=a.exec(e)
if(!t)return null
var i=parseInt(t[1],10),r=parseInt(t[2],10),n=parseInt(t[3],10)
return t[4]?{r:i,g:r,b:n,a:parseFloat(t[4])}:{r:i,g:r,b:n}}VelChart.LOG_SCALE=10,VelChart.LN_TEN=Math.log(VelChart.LOG_SCALE),VelChart.log10=function(e){return Math.log(e)/VelChart.LN_TEN},VelChart.DOTTED_LINE=[2,2],VelChart.DASHED_LINE=[7,3],VelChart.DOT_DASH_LINE=[7,2,2,2],VelChart.getContext=function(e){return e.getContext("2d")},VelChart.addEvent=function(e,t,a){e.addEventListener?e.addEventListener(t,a,!1):(e[t+a]=function(){a(window.event)},e.attachEvent("on"+t,e[t+a]))},VelChart.prototype.addAndTrackEvent=function(e,t,a){VelChart.addEvent(e,t,a),this.registeredEvents_.push({elem:e,type:t,fn:a})},VelChart.removeEvent=function(e,t,a){if(e.removeEventListener)e.removeEventListener(t,a,!1)
else{try{e.detachEvent("on"+t,e[t+a])}catch(i){}e[t+a]=null}},VelChart.prototype.removeTrackedEvents_=function(){if(this.registeredEvents_)for(var e=0;e<this.registeredEvents_.length;e++){var t=this.registeredEvents_[e]
VelChart.removeEvent(t.elem,t.type,t.fn)}this.registeredEvents_=[]},VelChart.cancelEvent=function(e){return e=e?e:window.event,e.stopPropagation&&e.stopPropagation(),e.preventDefault&&e.preventDefault(),e.cancelBubble=!0,e.cancel=!0,e.returnValue=!1,!1},VelChart.hsvToRGB=function(e,t,a){var i,r,n
if(0===t)i=a,r=a,n=a
else{var s=Math.floor(6*e),o=6*e-s,l=a*(1-t),h=a*(1-t*o),d=a*(1-t*(1-o))
switch(s){case 1:i=h,r=a,n=l
break
case 2:i=l,r=a,n=d
break
case 3:i=l,r=h,n=a
break
case 4:i=d,r=l,n=a
break
case 5:i=a,r=l,n=h
break
case 6:case 0:i=a,r=d,n=l}}return i=Math.floor(255*i+.5),r=Math.floor(255*r+.5),n=Math.floor(255*n+.5),"rgb("+i+","+r+","+n+")"},VelChart.findPos=function(e){var t=0,a=0
if(e.offsetParent)for(var i=e;;){var r="0",n="0"
if(window.getComputedStyle){var s=window.getComputedStyle(i,null)
r=s.borderLeft||"0",n=s.borderTop||"0"}if(t+=parseInt(r,10),a+=parseInt(n,10),t+=i.offsetLeft,a+=i.offsetTop,!i.offsetParent)break
i=i.offsetParent}else e.x&&(t+=e.x),e.y&&(a+=e.y)
for(;e&&e!=document.body;)t-=e.scrollLeft,a-=e.scrollTop,e=e.parentNode
return{x:t,y:a}},VelChart.pageX=function(e){if(e.pageX)return!e.pageX||e.pageX<0?0:e.pageX
var t=document.documentElement,a=document.body
return e.clientX+(t.scrollLeft||a.scrollLeft)-(t.clientLeft||0)},VelChart.pageY=function(e){if(e.pageY)return!e.pageY||e.pageY<0?0:e.pageY
var t=document.documentElement,a=document.body
return e.clientY+(t.scrollTop||a.scrollTop)-(t.clientTop||0)},VelChart.dragGetX_=function(e,t){return VelChart.pageX(e)-t.px},VelChart.dragGetY_=function(e,t){return VelChart.pageY(e)-t.py},VelChart.isOK=function(e){return!!e&&!isNaN(e)},VelChart.isValidPoint=function(e,t){return e?null===e.yval?!1:null===e.x||void 0===e.x?!1:null===e.y||void 0===e.y?!1:isNaN(e.x)||!t&&isNaN(e.y)?!1:!0:!1},VelChart.floatFormat=function(e,t){var a=Math.min(Math.max(1,t||2),21)
return Math.abs(e)<.001&&0!==e?e.toExponential(a-1):e.toPrecision(a)},VelChart.zeropad=function(e){return 10>e?"0"+e:""+e},VelChart.DateAccessorsLocal={getFullYear:function(e){return e.getFullYear()},getMonth:function(e){return e.getMonth()},getDate:function(e){return e.getDate()},getHours:function(e){return e.getHours()},getMinutes:function(e){return e.getMinutes()},getSeconds:function(e){return e.getSeconds()},getMilliseconds:function(e){return e.getMilliseconds()},getDay:function(e){return e.getDay()},makeDate:function(e,t,a,i,r,n,s){return new Date(e,t,a,i,r,n,s)}},VelChart.DateAccessorsUTC={getFullYear:function(e){return e.getUTCFullYear()},getMonth:function(e){return e.getUTCMonth()},getDate:function(e){return e.getUTCDate()},getHours:function(e){return e.getUTCHours()},getMinutes:function(e){return e.getUTCMinutes()},getSeconds:function(e){return e.getUTCSeconds()},getMilliseconds:function(e){return e.getUTCMilliseconds()},getDay:function(e){return e.getUTCDay()},makeDate:function(e,t,a,i,r,n,s){return new Date(Date.UTC(e,t,a,i,r,n,s))}},VelChart.hmsString_=function(e,t,a){var i=VelChart.zeropad,r=i(e)+":"+i(t)
return a&&(r+=":"+i(a)),r},VelChart.dateString_=function(e,t){var a=VelChart.zeropad,i=t?VelChart.DateAccessorsUTC:VelChart.DateAccessorsLocal,r=new Date(e),n=i.getFullYear(r),s=i.getMonth(r),o=i.getDate(r),l=i.getHours(r),h=i.getMinutes(r),d=i.getSeconds(r),c=""+n,p=a(s+1),u=a(o),g=3600*l+60*h+d,f=c+"/"+p+"/"+u
return g&&(f+=" "+VelChart.hmsString_(l,h,d)),f},VelChart.round_=function(e,t){var a=Math.pow(10,t)
return Math.round(e*a)/a},VelChart.binarySearch=function(e,t,a,i,r){if((null===i||void 0===i||null===r||void 0===r)&&(i=0,r=t.length-1),i>r)return-1;(null===a||void 0===a)&&(a=0)
var n,s=function(e){return e>=0&&e<t.length},o=parseInt((i+r)/2,10),l=t[o]
return l==e?o:l>e?a>0&&(n=o-1,s(n)&&t[n]<e)?o:VelChart.binarySearch(e,t,a,i,o-1):e>l?0>a&&(n=o+1,s(n)&&t[n]>e)?o:VelChart.binarySearch(e,t,a,o+1,r):-1},VelChart.dateParser=function(e){var t,a
if((-1==e.search("-")||-1!=e.search("T")||-1!=e.search("Z"))&&(a=VelChart.dateStrToMillis(e),a&&!isNaN(a)))return a
if(-1!=e.search("-")){for(t=e.replace("-","/","g");-1!=t.search("-");)t=t.replace("-","/")
a=VelChart.dateStrToMillis(t)}else 8==e.length?(t=e.substr(0,4)+"/"+e.substr(4,2)+"/"+e.substr(6,2),a=VelChart.dateStrToMillis(t)):a=VelChart.dateStrToMillis(e)
return(!a||isNaN(a))&&console.error("Couldn't parse "+e+" as a date"),a},VelChart.dateStrToMillis=function(e){return new Date(e).getTime()},VelChart.update=function(e,t){if(void 0!==t&&null!==t)for(var a in t)t.hasOwnProperty(a)&&(e[a]=t[a])
return e},VelChart.updateDeep=function(e,t){function a(e){return"object"==typeof Node?e instanceof Node:"object"==typeof e&&"number"==typeof e.nodeType&&"string"==typeof e.nodeName}if(void 0!==t&&null!==t)for(var i in t)t.hasOwnProperty(i)&&(null===t[i]?e[i]=null:VelChart.isArrayLike(t[i])?e[i]=t[i].slice():a(t[i])?e[i]=t[i]:"object"==typeof t[i]?(("object"!=typeof e[i]||null===e[i])&&(e[i]={}),VelChart.updateDeep(e[i],t[i])):e[i]=t[i])
return e},VelChart.isArrayLike=function(e){var t=typeof e
return"object"!=t&&("function"!=t||"function"!=typeof e.item)||null===e||"number"!=typeof e.length||3===e.nodeType?!1:!0},VelChart.isDateLike=function(e){return"object"!=typeof e||null===e||"function"!=typeof e.getTime?!1:!0},VelChart.clone=function(e){for(var t=[],a=0;a<e.length;a++)VelChart.isArrayLike(e[a])?t.push(VelChart.clone(e[a])):t.push(e[a])
return t},VelChart.createCanvas=function(){var e=document.createElement("canvas"),t=/MSIE/.test(navigator.userAgent)&&!window.opera
return t&&"undefined"!=typeof G_vmlCanvasManager&&(e=G_vmlCanvasManager.initElement(e)),e},VelChart.getContextPixelRatio=function(e){try{var t=window.devicePixelRatio,a=e.webkitBackingStorePixelRatio||e.mozBackingStorePixelRatio||e.msBackingStorePixelRatio||e.oBackingStorePixelRatio||e.backingStorePixelRatio||1
return void 0!==t?t/a:1}catch(i){return 1}},VelChart.isAndroid=function(){return/Android/.test(navigator.userAgent)},VelChart.Iterator=function(e,t,a,i){t=t||0,a=a||e.length,this.hasNext=!0,this.peek=null,this.start_=t,this.array_=e,this.predicate_=i,this.end_=Math.min(e.length,t+a),this.nextIdx_=t-1,this.next()},VelChart.Iterator.prototype.next=function(){if(!this.hasNext)return null
for(var e=this.peek,t=this.nextIdx_+1,a=!1;t<this.end_;){if(!this.predicate_||this.predicate_(this.array_,t)){this.peek=this.array_[t],a=!0
break}t++}return this.nextIdx_=t,a||(this.hasNext=!1,this.peek=null),e},VelChart.createIterator=function(e,t,a,i){return new VelChart.Iterator(e,t,a,i)},VelChart.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}(),VelChart.repeatAndCleanup=function(e,t,a,i){var r,n=0,s=(new Date).getTime()
if(e(n),1==t)return void i()
var o=t-1
!function l(){n>=t||VelChart.requestAnimFrame.call(window,function(){var t=(new Date).getTime(),h=t-s
r=n,n=Math.floor(h/a)
var d=n-r,c=n+d>o
c||n>=o?(e(o),i()):(0!==d&&e(n),l())})}()}
var t={annotationClickHandler:!0,annotationDblClickHandler:!0,annotationMouseOutHandler:!0,annotationMouseOverHandler:!0,axisLabelColor:!0,axisLineColor:!0,axisLineWidth:!0,clickCallback:!0,drawCallback:!0,drawHighlightPointCallback:!0,drawPoints:!0,drawPointCallback:!0,drawXGrid:!0,drawYGrid:!0,fillAlpha:!0,gridLineColor:!0,gridLineWidth:!0,hideOverlayOnMouseOut:!0,highlightCallback:!0,highlightCircleSize:!0,interactionModel:!0,isZoomedIgnoreProgrammaticZoom:!0,labelsDiv:!0,labelsDivStyles:!0,labelsDivWidth:!0,labelsKMB:!0,labelsKMG2:!0,labelsSeparateLines:!0,labelsShowZeroValues:!0,legend:!0,panEdgeFraction:!0,pixelsPerYLabel:!0,pointClickCallback:!0,pointSize:!0,rangeSelectorPlotFillColor:!0,rangeSelectorPlotStrokeColor:!0,showLabelsOnHighlight:!0,showRoller:!0,strokeWidth:!0,underlayCallback:!0,unhighlightCallback:!0,zoomCallback:!0}
VelChart.isPixelChangingOptionList=function(e,a){var i={}
if(e)for(var r=1;r<e.length;r++)i[e[r]]=!0
var n=function(e){for(var a in e)if(e.hasOwnProperty(a)&&!t[a])return!0
return!1}
for(var s in a)if(a.hasOwnProperty(s))if("highlightSeriesOpts"==s||i[s]&&!a.series){if(n(a[s]))return!0}else if("series"==s||"axes"==s){var o=a[s]
for(var l in o)if(o.hasOwnProperty(l)&&n(o[l]))return!0}else if(!t[s])return!0
return!1},VelChart.Circles={DEFAULT:function(e,t,a,i,r,n,s){a.beginPath(),a.fillStyle=n,a.arc(i,r,s,0,2*Math.PI,!1),a.fill()}},VelChart.IFrameTarp=function(){this.tarps=[]},VelChart.IFrameTarp.prototype.cover=function(){for(var e=document.getElementsByTagName("iframe"),t=0;t<e.length;t++){var a=e[t],i=VelChart.findPos(a),r=i.x,n=i.y,s=a.offsetWidth,o=a.offsetHeight,l=document.createElement("div")
l.style.position="absolute",l.style.left=r+"px",l.style.top=n+"px",l.style.width=s+"px",l.style.height=o+"px",l.style.zIndex=999,document.body.appendChild(l),this.tarps.push(l)}},VelChart.IFrameTarp.prototype.uncover=function(){for(var e=0;e<this.tarps.length;e++)this.tarps[e].parentNode.removeChild(this.tarps[e])
this.tarps=[]},VelChart.detectLineDelimiter=function(e){for(var t=0;t<e.length;t++){var a=e.charAt(t)
if("\r"===a)return t+1<e.length&&"\n"===e.charAt(t+1)?"\r\n":a
if("\n"===a)return t+1<e.length&&"\r"===e.charAt(t+1)?"\n\r":a}return null},VelChart.isNodeContainedBy=function(e,t){if(null===t||null===e)return!1
for(var a=e;a&&a!==t;)a=a.parentNode
return a===t},VelChart.pow=function(e,t){return 0>t?1/Math.pow(e,-t):Math.pow(e,t)}
var a=/^rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(?:,\s*([01](?:\.\d+)?))?\)$/
VelChart.toRGB_=function(t){var a=e(t)
if(a)return a
var i=document.createElement("div")
i.style.backgroundColor=t,i.style.visibility="hidden",document.body.appendChild(i)
var r
return r=window.getComputedStyle?window.getComputedStyle(i,null).backgroundColor:i.currentStyle.backgroundColor,document.body.removeChild(i),e(r)},VelChart.isCanvasSupported=function(e){var t
try{t=e||document.createElement("canvas"),t.getContext("2d")}catch(a){var i=navigator.appVersion.match(/MSIE (\d\.\d)/),r=-1!=navigator.userAgent.toLowerCase().indexOf("opera")
return!i||i[1]<6||r?!1:!0}return!0},VelChart.parseFloat_=function(e,t,a){var i=parseFloat(e)
if(!isNaN(i))return i
if(/^ *$/.test(e))return null
if(/^ *nan *$/i.test(e))return NaN
var r="Unable to parse '"+e+"' as a number"
return void 0!==a&&void 0!==t&&(r+=" on line "+(1+(t||0))+" ('"+a+"') of CSV."),console.error(r),null}}(),function(){"use strict"
VelChart.GVizChart=function(e){this.container=e},VelChart.GVizChart.prototype.draw=function(e,t){this.container.innerHTML="",void 0!==this.date_graph&&this.date_graph.destroy(),this.date_graph=new VelChart(this.container,e,t)},VelChart.GVizChart.prototype.setSelection=function(e){var t=!1
e.length&&(t=e[0].row),this.date_graph.setSelection(t)},VelChart.GVizChart.prototype.getSelection=function(){var e=[],t=this.date_graph.getSelection()
if(0>t)return e
for(var a=this.date_graph.layout_.points,i=0;i<a.length;++i)e.push({row:t,column:i+1})
return e}}(),function(){"use strict"
var e=100
VelChart.Interaction={},VelChart.Interaction.maybeTreatMouseOpAsClick=function(e,t,a){a.dragEndX=VelChart.dragGetX_(e,a),a.dragEndY=VelChart.dragGetY_(e,a)
var i=Math.abs(a.dragEndX-a.dragStartX),r=Math.abs(a.dragEndY-a.dragStartY)
2>i&&2>r&&void 0!==t.lastx_&&-1!=t.lastx_&&VelChart.Interaction.treatMouseOpAsClick(t,e,a),a.regionWidth=i,a.regionHeight=r},VelChart.Interaction.startPan=function(e,t,a){var i,r
a.isPanning=!0
var n=t.xAxisRange()
if(t.getOptionForAxis("logscale","x")?(a.initialLeftmostDate=VelChart.log10(n[0]),a.dateRange=VelChart.log10(n[1])-VelChart.log10(n[0])):(a.initialLeftmostDate=n[0],a.dateRange=n[1]-n[0]),a.xUnitsPerPixel=a.dateRange/(t.plotter_.area.w-1),t.getNumericOption("panEdgeFraction")){var s=t.width_*t.getNumericOption("panEdgeFraction"),o=t.xAxisExtremes(),l=t.toDomXCoord(o[0])-s,h=t.toDomXCoord(o[1])+s,d=t.toDataXCoord(l),c=t.toDataXCoord(h)
a.boundedDates=[d,c]
var p=[],u=t.height_*t.getNumericOption("panEdgeFraction")
for(i=0;i<t.axes_.length;i++){r=t.axes_[i]
var g=r.extremeRange,f=t.toDomYCoord(g[0],i)+u,v=t.toDomYCoord(g[1],i)-u,y=t.toDataYCoord(f,i),_=t.toDataYCoord(v,i)
p[i]=[y,_]}a.boundedValues=p}for(a.is2DPan=!1,a.axes=[],i=0;i<t.axes_.length;i++){r=t.axes_[i]
var x={},m=t.yAxisRange(i),b=t.attributes_.getForAxis("logscale",i)
b?(x.initialTopValue=VelChart.log10(m[1]),x.dragValueRange=VelChart.log10(m[1])-VelChart.log10(m[0])):(x.initialTopValue=m[1],x.dragValueRange=m[1]-m[0]),x.unitsPerPixel=x.dragValueRange/(t.plotter_.area.h-1),a.axes.push(x),(r.valueWindow||r.valueRange)&&(a.is2DPan=!0)}},VelChart.Interaction.movePan=function(e,t,a){a.dragEndX=VelChart.dragGetX_(e,a),a.dragEndY=VelChart.dragGetY_(e,a)
var i=a.initialLeftmostDate-(a.dragEndX-a.dragStartX)*a.xUnitsPerPixel
a.boundedDates&&(i=Math.max(i,a.boundedDates[0]))
var r=i+a.dateRange
if(a.boundedDates&&r>a.boundedDates[1]&&(i-=r-a.boundedDates[1],r=i+a.dateRange),t.getOptionForAxis("logscale","x")?t.dateWindow_=[Math.pow(VelChart.LOG_SCALE,i),Math.pow(VelChart.LOG_SCALE,r)]:t.dateWindow_=[i,r],a.is2DPan)for(var n=a.dragEndY-a.dragStartY,s=0;s<t.axes_.length;s++){var o=t.axes_[s],l=a.axes[s],h=n*l.unitsPerPixel,d=a.boundedValues?a.boundedValues[s]:null,c=l.initialTopValue+h
d&&(c=Math.min(c,d[1]))
var p=c-l.dragValueRange
d&&p<d[0]&&(c-=p-d[0],p=c-l.dragValueRange),t.attributes_.getForAxis("logscale",s)?o.valueWindow=[Math.pow(VelChart.LOG_SCALE,p),Math.pow(VelChart.LOG_SCALE,c)]:o.valueWindow=[p,c]}t.drawGraph_(!1)},VelChart.Interaction.endPan=VelChart.Interaction.maybeTreatMouseOpAsClick,VelChart.Interaction.startZoom=function(e,t,a){a.isZooming=!0,a.zoomMoved=!1},VelChart.Interaction.moveZoom=function(e,t,a){a.zoomMoved=!0,a.dragEndX=VelChart.dragGetX_(e,a),a.dragEndY=VelChart.dragGetY_(e,a)
var i=Math.abs(a.dragStartX-a.dragEndX),r=Math.abs(a.dragStartY-a.dragEndY)
a.dragDirection=r/2>i?VelChart.VERTICAL:VelChart.HORIZONTAL,t.drawZoomRect_(a.dragDirection,a.dragStartX,a.dragEndX,a.dragStartY,a.dragEndY,a.prevDragDirection,a.prevEndX,a.prevEndY),a.prevEndX=a.dragEndX,a.prevEndY=a.dragEndY,a.prevDragDirection=a.dragDirection},VelChart.Interaction.treatMouseOpAsClick=function(e,t,a){for(var i=e.getFunctionOption("clickCallback"),r=e.getFunctionOption("pointClickCallback"),n=null,s=-1,o=Number.MAX_VALUE,l=0;l<e.selPoints_.length;l++){var h=e.selPoints_[l],d=Math.pow(h.canvasx-a.dragEndX,2)+Math.pow(h.canvasy-a.dragEndY,2)
!isNaN(d)&&(-1==s||o>d)&&(o=d,s=l)}var c=e.getNumericOption("highlightCircleSize")+2
if(c*c>=o&&(n=e.selPoints_[s]),n){var p={cancelable:!0,point:n,canvasx:a.dragEndX,canvasy:a.dragEndY},u=e.cascadeEvents_("pointClick",p)
if(u)return
r&&r.call(e,t,n)}var p={cancelable:!0,xval:e.lastx_,pts:e.selPoints_,canvasx:a.dragEndX,canvasy:a.dragEndY}
e.cascadeEvents_("click",p)||i&&i.call(e,t,e.lastx_,e.selPoints_)},VelChart.Interaction.endZoom=function(e,t,a){t.clearZoomRect_(),a.isZooming=!1,VelChart.Interaction.maybeTreatMouseOpAsClick(e,t,a)
var i=t.getArea()
if(a.regionWidth>=10&&a.dragDirection==VelChart.HORIZONTAL){var r=Math.min(a.dragStartX,a.dragEndX),n=Math.max(a.dragStartX,a.dragEndX)
r=Math.max(r,i.x),n=Math.min(n,i.x+i.w),n>r&&t.doZoomX_(r,n),a.cancelNextDblclick=!0}else if(a.regionHeight>=10&&a.dragDirection==VelChart.VERTICAL){var s=Math.min(a.dragStartY,a.dragEndY),o=Math.max(a.dragStartY,a.dragEndY)
s=Math.max(s,i.y),o=Math.min(o,i.y+i.h),o>s&&t.doZoomY_(s,o),a.cancelNextDblclick=!0}a.dragStartX=null,a.dragStartY=null},VelChart.Interaction.startTouch=function(e,t,a){e.preventDefault(),e.touches.length>1&&(a.startTimeForDoubleTapMs=null)
for(var i=[],r=0;r<e.touches.length;r++){var n=e.touches[r]
i.push({pageX:n.pageX,pageY:n.pageY,dataX:t.toDataXCoord(n.pageX),dataY:t.toDataYCoord(n.pageY)})}if(a.initialTouches=i,1==i.length)a.initialPinchCenter=i[0],a.touchDirections={x:!0,y:!0}
else if(i.length>=2){a.initialPinchCenter={pageX:.5*(i[0].pageX+i[1].pageX),pageY:.5*(i[0].pageY+i[1].pageY),dataX:.5*(i[0].dataX+i[1].dataX),dataY:.5*(i[0].dataY+i[1].dataY)}
var s=180/Math.PI*Math.atan2(a.initialPinchCenter.pageY-i[0].pageY,i[0].pageX-a.initialPinchCenter.pageX)
s=Math.abs(s),s>90&&(s=90-s),a.touchDirections={x:67.5>s,y:s>22.5}}a.initialRange={x:t.xAxisRange(),y:t.yAxisRange()}},VelChart.Interaction.moveTouch=function(e,t,a){a.startTimeForDoubleTapMs=null
var i,r=[]
for(i=0;i<e.touches.length;i++){var n=e.touches[i]
r.push({pageX:n.pageX,pageY:n.pageY})}var s,o=a.initialTouches,l=a.initialPinchCenter
s=1==r.length?r[0]:{pageX:.5*(r[0].pageX+r[1].pageX),pageY:.5*(r[0].pageY+r[1].pageY)}
var h={pageX:s.pageX-l.pageX,pageY:s.pageY-l.pageY},d=a.initialRange.x[1]-a.initialRange.x[0],c=a.initialRange.y[0]-a.initialRange.y[1]
h.dataX=h.pageX/t.plotter_.area.w*d,h.dataY=h.pageY/t.plotter_.area.h*c
var p,u
if(1==r.length)p=1,u=1
else if(r.length>=2){var g=o[1].pageX-l.pageX
p=(r[1].pageX-s.pageX)/g
var f=o[1].pageY-l.pageY
u=(r[1].pageY-s.pageY)/f}p=Math.min(8,Math.max(.125,p)),u=Math.min(8,Math.max(.125,u))
var v=!1
if(a.touchDirections.x&&(t.dateWindow_=[l.dataX-h.dataX+(a.initialRange.x[0]-l.dataX)/p,l.dataX-h.dataX+(a.initialRange.x[1]-l.dataX)/p],v=!0),a.touchDirections.y)for(i=0;1>i;i++){var y=t.axes_[i],_=t.attributes_.getForAxis("logscale",i)
_||(y.valueWindow=[l.dataY-h.dataY+(a.initialRange.y[0]-l.dataY)/u,l.dataY-h.dataY+(a.initialRange.y[1]-l.dataY)/u],v=!0)}if(t.drawGraph_(!1),v&&r.length>1&&t.getFunctionOption("zoomCallback")){var x=t.xAxisRange()
t.getFunctionOption("zoomCallback").call(t,x[0],x[1],t.yAxisRanges())}},VelChart.Interaction.endTouch=function(e,t,a){if(0!==e.touches.length)VelChart.Interaction.startTouch(e,t,a)
else if(1==e.changedTouches.length){var i=(new Date).getTime(),r=e.changedTouches[0]
a.startTimeForDoubleTapMs&&i-a.startTimeForDoubleTapMs<500&&a.doubleTapX&&Math.abs(a.doubleTapX-r.screenX)<50&&a.doubleTapY&&Math.abs(a.doubleTapY-r.screenY)<50?t.resetZoom():(a.startTimeForDoubleTapMs=i,a.doubleTapX=r.screenX,a.doubleTapY=r.screenY)}}
var t=function(e,t,a){return t>e?t-e:e>a?e-a:0},a=function(e,a){var i=VelChart.findPos(a.canvas_),r={left:i.x,right:i.x+a.canvas_.offsetWidth,top:i.y,bottom:i.y+a.canvas_.offsetHeight},n={x:VelChart.pageX(e),y:VelChart.pageY(e)},s=t(n.x,r.left,r.right),o=t(n.y,r.top,r.bottom)
return Math.max(s,o)}
VelChart.Interaction.defaultModel={mousedown:function(t,i,r){if(!t.button||2!=t.button){r.initializeMouseDown(t,i,r),t.altKey||t.shiftKey?VelChart.startPan(t,i,r):VelChart.startZoom(t,i,r)
var n=function(t){if(r.isZooming){var n=a(t,i)
e>n?VelChart.moveZoom(t,i,r):null!==r.dragEndX&&(r.dragEndX=null,r.dragEndY=null,i.clearZoomRect_())}else r.isPanning&&VelChart.movePan(t,i,r)},s=function(e){r.isZooming?null!==r.dragEndX?VelChart.endZoom(e,i,r):VelChart.Interaction.maybeTreatMouseOpAsClick(e,i,r):r.isPanning&&VelChart.endPan(e,i,r),VelChart.removeEvent(document,"mousemove",n),VelChart.removeEvent(document,"mouseup",s),r.destroy()}
i.addAndTrackEvent(document,"mousemove",n),i.addAndTrackEvent(document,"mouseup",s)}},willDestroyContextMyself:!0,touchstart:function(e,t,a){VelChart.Interaction.startTouch(e,t,a)},touchmove:function(e,t,a){VelChart.Interaction.moveTouch(e,t,a)},touchend:function(e,t,a){VelChart.Interaction.endTouch(e,t,a)},dblclick:function(e,t,a){if(a.cancelNextDblclick)return void(a.cancelNextDblclick=!1)
var i={canvasx:a.dragEndX,canvasy:a.dragEndY}
t.cascadeEvents_("dblclick",i)||e.altKey||e.shiftKey||t.resetZoom()}},VelChart.DEFAULT_ATTRS.interactionModel=VelChart.Interaction.defaultModel,VelChart.defaultInteractionModel=VelChart.Interaction.defaultModel,VelChart.endZoom=VelChart.Interaction.endZoom,VelChart.moveZoom=VelChart.Interaction.moveZoom,VelChart.startZoom=VelChart.Interaction.startZoom,VelChart.endPan=VelChart.Interaction.endPan,VelChart.movePan=VelChart.Interaction.movePan,VelChart.startPan=VelChart.Interaction.startPan,VelChart.Interaction.nonInteractiveModel_={mousedown:function(e,t,a){a.initializeMouseDown(e,t,a)},mouseup:VelChart.Interaction.maybeTreatMouseOpAsClick},VelChart.Interaction.dragIsPanInteractionModel={mousedown:function(e,t,a){a.initializeMouseDown(e,t,a),VelChart.startPan(e,t,a)},mousemove:function(e,t,a){a.isPanning&&VelChart.movePan(e,t,a)},mouseup:function(e,t,a){a.isPanning&&VelChart.endPan(e,t,a)}}}(),function(){"use strict"
VelChart.TickList=void 0,VelChart.Ticker=void 0,VelChart.numericLinearTicks=function(e,t,a,i,r,n){var s=function(e){return"logscale"===e?!1:i(e)}
return VelChart.numericTicks(e,t,a,s,r,n)},VelChart.numericTicks=function(e,t,a,i,r,n){var s,o,l,h,d=i("pixelsPerLabel"),c=[]
if(n)for(s=0;s<n.length;s++)c.push({v:n[s]})
else{if(i("logscale")){h=Math.floor(a/d)
var p=VelChart.binarySearch(e,VelChart.PREFERRED_LOG_TICK_VALUES,1),u=VelChart.binarySearch(t,VelChart.PREFERRED_LOG_TICK_VALUES,-1);-1==p&&(p=0),-1==u&&(u=VelChart.PREFERRED_LOG_TICK_VALUES.length-1)
var g=null
if(u-p>=h/4){for(var f=u;f>=p;f--){var v=VelChart.PREFERRED_LOG_TICK_VALUES[f],y=Math.log(v/e)/Math.log(t/e)*a,_={v:v}
null===g?g={tickValue:v,pixel_coord:y}:Math.abs(y-g.pixel_coord)>=d?g={tickValue:v,pixel_coord:y}:_.label="",c.push(_)}c.reverse()}}if(0===c.length){var x,m,b=i("labelsKMG2")
b?(x=[1,2,4,8,16,32,64,128,256],m=16):(x=[1,2,5,10,20,50,100],m=10)
var C,w,A,T,V=Math.ceil(a/d),E=Math.abs(t-e)/V,D=Math.floor(Math.log(E)/Math.log(m)),S=Math.pow(m,D)
for(o=0;o<x.length&&(C=S*x[o],w=Math.floor(e/C)*C,A=Math.ceil(t/C)*C,h=Math.abs(A-w)/C,T=a/h,!(T>d));o++);for(w>A&&(C*=-1),s=0;h>=s;s++)l=w+s*C,c.push({v:l})}}var L=i("axisLabelFormatter")
for(s=0;s<c.length;s++)void 0===c[s].label&&(c[s].label=L.call(r,c[s].v,0,i,r))
return c},VelChart.dateTicker=function(e,t,a,i,r,n){var s=VelChart.pickDateTickGranularity(e,t,a,i)
return s>=0?VelChart.getDateAxis(e,t,s,i,r):[]},VelChart.SECONDLY=0,VelChart.TWO_SECONDLY=1,VelChart.FIVE_SECONDLY=2,VelChart.TEN_SECONDLY=3,VelChart.THIRTY_SECONDLY=4,VelChart.MINUTELY=5,VelChart.TWO_MINUTELY=6,VelChart.FIVE_MINUTELY=7,VelChart.TEN_MINUTELY=8,VelChart.THIRTY_MINUTELY=9,VelChart.HOURLY=10,VelChart.TWO_HOURLY=11,VelChart.SIX_HOURLY=12,VelChart.DAILY=13,VelChart.TWO_DAILY=14,VelChart.WEEKLY=15,VelChart.MONTHLY=16,VelChart.QUARTERLY=17,VelChart.BIANNUAL=18,VelChart.ANNUAL=19,VelChart.DECADAL=20,VelChart.CENTENNIAL=21,VelChart.NUM_GRANULARITIES=22,VelChart.DATEFIELD_Y=0,VelChart.DATEFIELD_M=1,VelChart.DATEFIELD_D=2,VelChart.DATEFIELD_HH=3,VelChart.DATEFIELD_MM=4,VelChart.DATEFIELD_SS=5,VelChart.DATEFIELD_MS=6,VelChart.NUM_DATEFIELDS=7,VelChart.TICK_PLACEMENT=[],VelChart.TICK_PLACEMENT[VelChart.SECONDLY]={datefield:VelChart.DATEFIELD_SS,step:1,spacing:1e3},VelChart.TICK_PLACEMENT[VelChart.TWO_SECONDLY]={datefield:VelChart.DATEFIELD_SS,step:2,spacing:2e3},VelChart.TICK_PLACEMENT[VelChart.FIVE_SECONDLY]={datefield:VelChart.DATEFIELD_SS,step:5,spacing:5e3},VelChart.TICK_PLACEMENT[VelChart.TEN_SECONDLY]={datefield:VelChart.DATEFIELD_SS,step:10,spacing:1e4},VelChart.TICK_PLACEMENT[VelChart.THIRTY_SECONDLY]={datefield:VelChart.DATEFIELD_SS,step:30,spacing:3e4},VelChart.TICK_PLACEMENT[VelChart.MINUTELY]={datefield:VelChart.DATEFIELD_MM,step:1,spacing:6e4},VelChart.TICK_PLACEMENT[VelChart.TWO_MINUTELY]={datefield:VelChart.DATEFIELD_MM,step:2,spacing:12e4},VelChart.TICK_PLACEMENT[VelChart.FIVE_MINUTELY]={datefield:VelChart.DATEFIELD_MM,step:5,spacing:3e5},VelChart.TICK_PLACEMENT[VelChart.TEN_MINUTELY]={datefield:VelChart.DATEFIELD_MM,step:10,spacing:6e5},VelChart.TICK_PLACEMENT[VelChart.THIRTY_MINUTELY]={datefield:VelChart.DATEFIELD_MM,step:30,spacing:18e5},VelChart.TICK_PLACEMENT[VelChart.HOURLY]={datefield:VelChart.DATEFIELD_HH,step:1,spacing:36e5},VelChart.TICK_PLACEMENT[VelChart.TWO_HOURLY]={datefield:VelChart.DATEFIELD_HH,step:2,spacing:72e5},VelChart.TICK_PLACEMENT[VelChart.SIX_HOURLY]={datefield:VelChart.DATEFIELD_HH,step:6,spacing:216e5},VelChart.TICK_PLACEMENT[VelChart.DAILY]={datefield:VelChart.DATEFIELD_D,step:1,spacing:864e5},VelChart.TICK_PLACEMENT[VelChart.TWO_DAILY]={datefield:VelChart.DATEFIELD_D,step:2,spacing:1728e5},VelChart.TICK_PLACEMENT[VelChart.WEEKLY]={datefield:VelChart.DATEFIELD_D,step:7,spacing:6048e5},VelChart.TICK_PLACEMENT[VelChart.MONTHLY]={datefield:VelChart.DATEFIELD_M,step:1,spacing:2629817280},VelChart.TICK_PLACEMENT[VelChart.QUARTERLY]={datefield:VelChart.DATEFIELD_M,step:3,spacing:216e5*365.2524},VelChart.TICK_PLACEMENT[VelChart.BIANNUAL]={datefield:VelChart.DATEFIELD_M,step:6,spacing:432e5*365.2524},VelChart.TICK_PLACEMENT[VelChart.ANNUAL]={datefield:VelChart.DATEFIELD_Y,step:1,spacing:864e5*365.2524},VelChart.TICK_PLACEMENT[VelChart.DECADAL]={datefield:VelChart.DATEFIELD_Y,step:10,spacing:315578073600},VelChart.TICK_PLACEMENT[VelChart.CENTENNIAL]={datefield:VelChart.DATEFIELD_Y,step:100,spacing:3155780736e3},VelChart.PREFERRED_LOG_TICK_VALUES=function(){for(var e=[],t=-39;39>=t;t++)for(var a=Math.pow(10,t),i=1;9>=i;i++){var r=a*i
e.push(r)}return e}(),VelChart.pickDateTickGranularity=function(e,t,a,i){for(var r=i("pixelsPerLabel"),n=0;n<VelChart.NUM_GRANULARITIES;n++){var s=VelChart.numDateTicks(e,t,n)
if(a/s>=r)return n}return-1},VelChart.numDateTicks=function(e,t,a){var i=VelChart.TICK_PLACEMENT[a].spacing
return Math.round(1*(t-e)/i)},VelChart.getDateAxis=function(e,t,a,i,r){var n=i("axisLabelFormatter"),s=i("labelsUTC"),o=s?VelChart.DateAccessorsUTC:VelChart.DateAccessorsLocal,l=VelChart.TICK_PLACEMENT[a].datefield,h=VelChart.TICK_PLACEMENT[a].step,d=VelChart.TICK_PLACEMENT[a].spacing,c=new Date(e),p=[]
p[VelChart.DATEFIELD_Y]=o.getFullYear(c),p[VelChart.DATEFIELD_M]=o.getMonth(c),p[VelChart.DATEFIELD_D]=o.getDate(c),p[VelChart.DATEFIELD_HH]=o.getHours(c),p[VelChart.DATEFIELD_MM]=o.getMinutes(c),p[VelChart.DATEFIELD_SS]=o.getSeconds(c),p[VelChart.DATEFIELD_MS]=o.getMilliseconds(c)
var u=p[l]%h
a==VelChart.WEEKLY&&(u=o.getDay(c)),p[l]-=u
for(var g=l+1;g<VelChart.NUM_DATEFIELDS;g++)p[g]=g===VelChart.DATEFIELD_D?1:0
var f=[],v=o.makeDate.apply(null,p),y=v.getTime()
if(a<=VelChart.HOURLY)for(e>y&&(y+=d,v=new Date(y));t>=y;)f.push({v:y,label:n.call(r,v,a,i,r)}),y+=d,v=new Date(y)
else for(e>y&&(p[l]+=h,v=o.makeDate.apply(null,p),y=v.getTime());t>=y;)(a>=VelChart.DAILY||o.getHours(v)%h===0)&&f.push({v:y,label:n.call(r,v,a,i,r)}),p[l]+=h,v=o.makeDate.apply(null,p),y=v.getTime()
return f},VelChart&&VelChart.DEFAULT_ATTRS&&VelChart.DEFAULT_ATTRS.axes&&VelChart.DEFAULT_ATTRS.axes.x&&VelChart.DEFAULT_ATTRS.axes.y&&VelChart.DEFAULT_ATTRS.axes.y2&&(VelChart.DEFAULT_ATTRS.axes.x.ticker=VelChart.dateTicker,VelChart.DEFAULT_ATTRS.axes.y.ticker=VelChart.numericTicks,VelChart.DEFAULT_ATTRS.axes.y2.ticker=VelChart.numericTicks)}(),VelChart.Plugins={},VelChart.Plugins.Annotations=function(){"use strict"
var e=function(){this.annotations_=[]}
return e.prototype.toString=function(){return"Annotations Plugin"},e.prototype.activate=function(e){return{clearChart:this.clearChart,didDrawChart:this.didDrawChart}},e.prototype.detachLabels=function(){for(var e=0;e<this.annotations_.length;e++){var t=this.annotations_[e]
t.parentNode&&t.parentNode.removeChild(t),this.annotations_[e]=null}this.annotations_=[]},e.prototype.clearChart=function(e){this.detachLabels()},e.prototype.didDrawChart=function(e){var t=e.dygraph,a=t.layout_.annotated_points
if(a&&0!==a.length)for(var i=e.canvas.parentNode,r={position:"absolute",fontSize:t.getOption("axisLabelFontSize")+"px",zIndex:10,overflow:"hidden"},n=function(e,a,i){return function(r){var n=i.annotation
n.hasOwnProperty(e)?n[e](n,i,t,r):t.getOption(a)&&t.getOption(a)(n,i,t,r)}},s=e.dygraph.plotter_.area,o={},l=0;l<a.length;l++){var h=a[l]
if(!(h.canvasx<s.x||h.canvasx>s.x+s.w||h.canvasy<s.y||h.canvasy>s.y+s.h)){var d=h.annotation,c=6
d.hasOwnProperty("tickHeight")&&(c=d.tickHeight)
var p=document.createElement("div")
for(var u in r)r.hasOwnProperty(u)&&(p.style[u]=r[u])
d.hasOwnProperty("icon")||(p.className="dygraphDefaultAnnotation"),d.hasOwnProperty("cssClass")&&(p.className+=" "+d.cssClass)
var g=d.hasOwnProperty("width")?d.width:16,f=d.hasOwnProperty("height")?d.height:16
if(d.hasOwnProperty("icon")){var v=document.createElement("img")
v.src=d.icon,v.width=g,v.height=f,p.appendChild(v)}else h.annotation.hasOwnProperty("shortText")&&p.appendChild(document.createTextNode(h.annotation.shortText))
var y=h.canvasx-g/2
p.style.left=y+"px"
var _=0
if(d.attachAtBottom){var x=s.y+s.h-f-c
o[y]?x-=o[y]:o[y]=0,o[y]+=c+f,_=x}else _=h.canvasy-f-c
p.style.top=_+"px",p.style.width=g+"px",p.style.height=f+"px",p.title=h.annotation.text,p.style.color=t.colorsMap_[h.name],p.style.borderColor=t.colorsMap_[h.name],d.div=p,t.addAndTrackEvent(p,"click",n("clickHandler","annotationClickHandler",h,this)),t.addAndTrackEvent(p,"mouseover",n("mouseOverHandler","annotationMouseOverHandler",h,this)),t.addAndTrackEvent(p,"mouseout",n("mouseOutHandler","annotationMouseOutHandler",h,this)),t.addAndTrackEvent(p,"dblclick",n("dblClickHandler","annotationDblClickHandler",h,this)),i.appendChild(p),this.annotations_.push(p)
var m=e.drawingContext
if(m.save(),m.strokeStyle=t.colorsMap_[h.name],m.beginPath(),d.attachAtBottom){var x=_+f
m.moveTo(h.canvasx,x),m.lineTo(h.canvasx,x+c)}else m.moveTo(h.canvasx,h.canvasy),m.lineTo(h.canvasx,h.canvasy-2-c)
m.closePath(),m.stroke(),m.restore()}}},e.prototype.destroy=function(){this.detachLabels()},e}(),VelChart.Plugins.Axes=function(){"use strict"
var e=function(){this.xlabels_=[],this.ylabels_=[]}
return e.prototype.toString=function(){return"Axes Plugin"},e.prototype.activate=function(e){return{layout:this.layout,clearChart:this.clearChart,willDrawChart:this.willDrawChart}},e.prototype.layout=function(e){var t=e.dygraph
if(t.getOptionForAxis("drawAxis","y")){var a=t.getOptionForAxis("axisLabelWidth","y")+2*t.getOptionForAxis("axisTickSize","y")
e.reserveSpaceLeft(a)}if(t.getOptionForAxis("drawAxis","x")){var i
i=t.getOption("xAxisHeight")?t.getOption("xAxisHeight"):t.getOptionForAxis("axisLabelFontSize","x")+2*t.getOptionForAxis("axisTickSize","x"),e.reserveSpaceBottom(i)}if(2==t.numAxes()){if(t.getOptionForAxis("drawAxis","y2")){var a=t.getOptionForAxis("axisLabelWidth","y2")+2*t.getOptionForAxis("axisTickSize","y2")
e.reserveSpaceRight(a)}}else t.numAxes()>2&&t.error("Only two y-axes are supported at this time. (Trying to use "+t.numAxes()+")")},e.prototype.detachLabels=function(){function e(e){for(var t=0;t<e.length;t++){var a=e[t]
a.parentNode&&a.parentNode.removeChild(a)}}e(this.xlabels_),e(this.ylabels_),this.xlabels_=[],this.ylabels_=[]},e.prototype.clearChart=function(e){this.detachLabels()},e.prototype.willDrawChart=function(e){function t(e){return Math.round(e)+.5}function a(e){return Math.round(e)-.5}var i=e.dygraph
if(i.getOptionForAxis("drawAxis","x")||i.getOptionForAxis("drawAxis","y")||i.getOptionForAxis("drawAxis","y2")){var r,n,s,o,l,h=e.drawingContext,d=e.canvas.parentNode,c=i.width_,p=i.height_,u=function(e){return{position:"absolute",fontSize:i.getOptionForAxis("axisLabelFontSize",e)+"px",zIndex:10,color:i.getOptionForAxis("axisLabelColor",e),width:i.getOptionForAxis("axisLabelWidth",e)+"px",lineHeight:"normal",overflow:"hidden"}},g={x:u("x"),y:u("y"),y2:u("y2")},f=function(e,t,a){var i=document.createElement("div"),r=g["y2"==a?"y2":t]
for(var n in r)r.hasOwnProperty(n)&&(i.style[n]=r[n])
var s=document.createElement("div")
return s.className="dygraph-axis-label dygraph-axis-label-"+t+(a?" dygraph-axis-label-"+a:""),s.innerHTML=e,i.appendChild(s),i}
h.save()
var v=i.layout_,y=e.dygraph.plotter_.area,_=function(e){return function(t){return i.getOptionForAxis(t,e)}}
if(i.getOptionForAxis("drawAxis","y")){if(v.yticks&&v.yticks.length>0){var x=i.numAxes(),m=[_("y"),_("y2")]
for(l=0;l<v.yticks.length;l++){if(o=v.yticks[l],"function"==typeof o)return
n=y.x
var b=1,C="y1",w=m[0]
1==o[0]&&(n=y.x+y.w,b=-1,C="y2",w=m[1])
var A=w("axisLabelFontSize")
s=y.y+o[1]*y.h,r=f(o[2],"y",2==x?C:null)
var T=s-A/2
0>T&&(T=0),T+A+3>p?r.style.bottom="0":r.style.top=T+"px",0===o[0]?(r.style.left=y.x-w("axisLabelWidth")-w("axisTickSize")+"px",r.style.textAlign="right"):1==o[0]&&(r.style.left=y.x+y.w+w("axisTickSize")+"px",r.style.textAlign="left"),r.style.width=w("axisLabelWidth")+"px",d.appendChild(r),this.ylabels_.push(r)}var V=this.ylabels_[0],A=i.getOptionForAxis("axisLabelFontSize","y"),E=parseInt(V.style.top,10)+A
E>p-A&&(V.style.top=parseInt(V.style.top,10)-A/2+"px")}var D
if(i.getOption("drawAxesAtZero")){var S=i.toPercentXCoord(0);(S>1||0>S||isNaN(S))&&(S=0),D=t(y.x+S*y.w)}else D=t(y.x)
h.strokeStyle=i.getOptionForAxis("axisLineColor","y"),h.lineWidth=i.getOptionForAxis("axisLineWidth","y"),h.beginPath(),h.moveTo(D,a(y.y)),h.lineTo(D,a(y.y+y.h)),h.closePath(),h.stroke(),2==i.numAxes()&&(h.strokeStyle=i.getOptionForAxis("axisLineColor","y2"),h.lineWidth=i.getOptionForAxis("axisLineWidth","y2"),h.beginPath(),h.moveTo(a(y.x+y.w),a(y.y)),h.lineTo(a(y.x+y.w),a(y.y+y.h)),h.closePath(),h.stroke())}if(i.getOptionForAxis("drawAxis","x")){if(v.xticks){var w=_("x")
for(l=0;l<v.xticks.length;l++){o=v.xticks[l],n=y.x+o[0]*y.w,s=y.y+y.h,r=f(o[1],"x"),r.style.textAlign="center",r.style.top=s+w("axisTickSize")+"px"
var L=n-w("axisLabelWidth")/2
L+w("axisLabelWidth")>c&&(L=c-w("axisLabelWidth"),r.style.textAlign="right"),0>L&&(L=0,r.style.textAlign="left"),r.style.left=L+"px",r.style.width=w("axisLabelWidth")+"px",d.appendChild(r),this.xlabels_.push(r)}}h.strokeStyle=i.getOptionForAxis("axisLineColor","x"),h.lineWidth=i.getOptionForAxis("axisLineWidth","x"),h.beginPath()
var P
if(i.getOption("drawAxesAtZero")){var S=i.toPercentYCoord(0,0);(S>1||0>S)&&(S=1),P=a(y.y+S*y.h)}else P=a(y.y+y.h)
h.moveTo(t(y.x),P),h.lineTo(t(y.x+y.w),P),h.closePath(),h.stroke()}h.restore()}},e}(),VelChart.Plugins.ChartLabels=function(){"use strict"
var e=function(){this.title_div_=null,this.xlabel_div_=null,this.ylabel_div_=null,this.y2label_div_=null}
e.prototype.toString=function(){return"ChartLabels Plugin"},e.prototype.activate=function(e){return{layout:this.layout,didDrawChart:this.didDrawChart}}
var t=function(e){var t=document.createElement("div")
return t.style.position="absolute",t.style.left=e.x+"px",t.style.top=e.y+"px",t.style.width=e.w+"px",t.style.height=e.h+"px",t}
e.prototype.detachLabels_=function(){for(var e=[this.title_div_,this.xlabel_div_,this.ylabel_div_,this.y2label_div_],t=0;t<e.length;t++){var a=e[t]
a&&a.parentNode&&a.parentNode.removeChild(a)}this.title_div_=null,this.xlabel_div_=null,this.ylabel_div_=null,this.y2label_div_=null}
var a=function(e,t,a,i,r){var n=document.createElement("div")
n.style.position="absolute",1==a?n.style.left="0px":n.style.left=t.x+"px",n.style.top=t.y+"px",n.style.width=t.w+"px",n.style.height=t.h+"px",n.style.fontSize=e.getOption("yLabelWidth")-2+"px"
var s=document.createElement("div")
s.style.position="absolute",s.style.width=t.h+"px",s.style.height=t.w+"px",s.style.top=t.h/2-t.w/2+"px",s.style.left=t.w/2-t.h/2+"px",s.style.textAlign="center"
var o="rotate("+(1==a?"-":"")+"90deg)"
s.style.transform=o,s.style.WebkitTransform=o,s.style.MozTransform=o,s.style.OTransform=o,s.style.msTransform=o,void 0!==document.documentMode&&document.documentMode<9&&(s.style.filter="progid:DXImageTransform.Microsoft.BasicImage(rotation="+(1==a?"3":"1")+")",s.style.left="0px",s.style.top="0px")
var l=document.createElement("div")
return l.className=i,l.innerHTML=r,s.appendChild(l),n.appendChild(s),n}
return e.prototype.layout=function(e){this.detachLabels_()
var i=e.dygraph,r=e.chart_div
if(i.getOption("title")){var n=e.reserveSpaceTop(i.getOption("titleHeight"))
this.title_div_=t(n),this.title_div_.style.textAlign="center",this.title_div_.style.fontSize=i.getOption("titleHeight")-8+"px",this.title_div_.style.fontWeight="bold",this.title_div_.style.zIndex=10
var s=document.createElement("div")
s.className="dygraph-label dygraph-title",s.innerHTML=i.getOption("title"),this.title_div_.appendChild(s),r.appendChild(this.title_div_)}if(i.getOption("xlabel")){var o=e.reserveSpaceBottom(i.getOption("xLabelHeight"))
this.xlabel_div_=t(o),this.xlabel_div_.style.textAlign="center",this.xlabel_div_.style.fontSize=i.getOption("xLabelHeight")-2+"px"
var s=document.createElement("div")
s.className="dygraph-label dygraph-xlabel",s.innerHTML=i.getOption("xlabel"),this.xlabel_div_.appendChild(s),r.appendChild(this.xlabel_div_)}if(i.getOption("ylabel")){var l=e.reserveSpaceLeft(0)
this.ylabel_div_=a(i,l,1,"dygraph-label dygraph-ylabel",i.getOption("ylabel")),r.appendChild(this.ylabel_div_)}if(i.getOption("y2label")&&2==i.numAxes()){var h=e.reserveSpaceRight(0)
this.y2label_div_=a(i,h,2,"dygraph-label dygraph-y2label",i.getOption("y2label")),r.appendChild(this.y2label_div_)}},e.prototype.didDrawChart=function(e){var t=e.dygraph
this.title_div_&&(this.title_div_.children[0].innerHTML=t.getOption("title")),this.xlabel_div_&&(this.xlabel_div_.children[0].innerHTML=t.getOption("xlabel")),this.ylabel_div_&&(this.ylabel_div_.children[0].children[0].innerHTML=t.getOption("ylabel")),this.y2label_div_&&(this.y2label_div_.children[0].children[0].innerHTML=t.getOption("y2label"))},e.prototype.clearChart=function(){},e.prototype.destroy=function(){this.detachLabels_()},e}(),VelChart.Plugins.Grid=function(){"use strict"
var e=function(){}
return e.prototype.toString=function(){return"Gridline Plugin"},e.prototype.activate=function(e){return{willDrawChart:this.willDrawChart}},e.prototype.willDrawChart=function(e){function t(e){return Math.round(e)+.5}function a(e){return Math.round(e)-.5}var i,r,n,s,o=e.dygraph,l=e.drawingContext,h=o.layout_,d=e.dygraph.plotter_.area
if(o.getOptionForAxis("drawGrid","y")){for(var c=["y","y2"],p=[],u=[],g=[],f=[],v=[],n=0;n<c.length;n++)g[n]=o.getOptionForAxis("drawGrid",c[n]),g[n]&&(p[n]=o.getOptionForAxis("gridLineColor",c[n]),u[n]=o.getOptionForAxis("gridLineWidth",c[n]),v[n]=o.getOptionForAxis("gridLinePattern",c[n]),f[n]=v[n]&&v[n].length>=2)
for(s=h.yticks,l.save(),n=0;n<s.length;n++){var y=s[n][0]
g[y]&&(f[y]&&l.installPattern(v[y]),l.strokeStyle=p[y],l.lineWidth=u[y],i=t(d.x),r=a(d.y+s[n][1]*d.h),l.beginPath(),l.moveTo(i,r),l.lineTo(i+d.w,r),l.closePath(),l.stroke(),f[y]&&l.uninstallPattern())}l.restore()}if(o.getOptionForAxis("drawGrid","x")){s=h.xticks,l.save()
var v=o.getOptionForAxis("gridLinePattern","x"),f=v&&v.length>=2
for(f&&l.installPattern(v),l.strokeStyle=o.getOptionForAxis("gridLineColor","x"),l.lineWidth=o.getOptionForAxis("gridLineWidth","x"),n=0;n<s.length;n++)i=t(d.x+s[n][0]*d.w),r=a(d.y+d.h),l.beginPath(),l.moveTo(i,r),l.lineTo(i,d.y),l.closePath(),l.stroke()
f&&l.uninstallPattern(),l.restore()}},e.prototype.destroy=function(){},e}(),VelChart.Plugins.Legend=function(){"use strict"
var e=function(){this.legend_div_=null,this.is_generated_div_=!1}
e.prototype.toString=function(){return"Legend Plugin"}
var t
e.prototype.activate=function(e){var t,a=e.getOption("labelsDivWidth"),i=e.getOption("labelsDiv")
if(i&&null!==i)t="string"==typeof i||i instanceof String?document.getElementById(i):i
else{var r={position:"absolute",fontSize:"14px",zIndex:10,width:a+"px",top:"0px",left:e.size().width-a-2+"px",background:"white",lineHeight:"normal",textAlign:"left",overflow:"hidden"}
VelChart.update(r,e.getOption("labelsDivStyles")),t=document.createElement("div"),t.className="dygraph-legend"
for(var n in r)if(r.hasOwnProperty(n))try{t.style[n]=r[n]}catch(s){console.warn("You are using unsupported css properties for your browser in labelsDivStyles")}e.graphDiv.appendChild(t),this.is_generated_div_=!0}return this.legend_div_=t,this.one_em_width_=10,{select:this.select,deselect:this.deselect,predraw:this.predraw,didDrawChart:this.didDrawChart}}
var a=function(e){var t=document.createElement("span")
t.setAttribute("style","margin: 0; padding: 0 0 0 1em; border: 0;"),e.appendChild(t)
var a=t.offsetWidth
return e.removeChild(t),a},i=function(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}
return e.prototype.select=function(t){var a=t.selectedX,i=t.selectedPoints,r=t.selectedRow,n=t.dygraph.getOption("legend")
if("never"===n)return void(this.legend_div_.style.display="none")
if("follow"===n){var s=t.dygraph.plotter_.area,o=t.dygraph.getOption("labelsDivWidth"),l=t.dygraph.getOptionForAxis("axisLabelWidth","y"),h=i[0].x*s.w+20,d=i[0].y*s.h-20
h+o+1>window.scrollX+window.innerWidth&&(h=h-40-o-(l-s.x)),t.dygraph.graphDiv.appendChild(this.legend_div_),this.legend_div_.style.left=l+h+"px",this.legend_div_.style.top=d+"px"}var c=e.generateLegendHTML(t.dygraph,a,i,this.one_em_width_,r)
this.legend_div_.innerHTML=c,this.legend_div_.style.display=""},e.prototype.deselect=function(t){var i=t.dygraph.getOption("legend")
"always"!==i&&(this.legend_div_.style.display="none")
var r=a(this.legend_div_)
this.one_em_width_=r
var n=e.generateLegendHTML(t.dygraph,void 0,void 0,r,null)
this.legend_div_.innerHTML=n},e.prototype.didDrawChart=function(e){this.deselect(e)},e.prototype.predraw=function(e){if(this.is_generated_div_){e.dygraph.graphDiv.appendChild(this.legend_div_)
var t=e.dygraph.plotter_.area,a=e.dygraph.getOption("labelsDivWidth")
this.legend_div_.style.left=t.x+t.w-a-1+"px",this.legend_div_.style.top=t.y+"px",this.legend_div_.style.width=a+"px"}},e.prototype.destroy=function(){this.legend_div_=null},e.generateLegendHTML=function(e,a,r,n,s){if(e.getOption("showLabelsOnHighlight")!==!0)return""
var o,l,h,d,c,p=e.getLabels()
if(void 0===a){if("always"!=e.getOption("legend"))return""
for(l=e.getOption("labelsSeparateLines"),o="",h=1;h<p.length;h++){var u=e.getPropertiesForSeries(p[h])
u.visible&&(""!==o&&(o+=l?"<br/>":" "),c=e.getOption("strokePattern",p[h]),d=t(c,u.color,n),o+="<span style='font-weight: bold; color: "+u.color+";'>"+d+" "+i(p[h])+"</span>")}return o}var g=e.optionsViewForAxis_("x"),f=g("valueFormatter")
o=f.call(e,a,g,p[0],e,s,0),""!==o&&(o+=":")
var v=[],y=e.numAxes()
for(h=0;y>h;h++)v[h]=e.optionsViewForAxis_("y"+(h?1+h:""))
var _=e.getOption("labelsShowZeroValues")
l=e.getOption("labelsSeparateLines")
var x=e.getHighlightSeries()
for(h=0;h<r.length;h++){var m=r[h]
if((0!==m.yval||_)&&VelChart.isOK(m.canvasy)){l&&(o+="<br/>")
var u=e.getPropertiesForSeries(m.name),b=v[u.axis-1],C=b("valueFormatter"),w=C.call(e,m.yval,b,m.name,e,s,p.indexOf(m.name)),A=m.name==x?" class='highlight'":""
o+="<span"+A+"> <b><span style='color: "+u.color+";'>"+i(m.name)+"</span></b>:&#160;"+w+"</span>"}}return o},t=function(e,t,a){var i=/MSIE/.test(navigator.userAgent)&&!window.opera
if(i)return"&mdash;"
if(!e||e.length<=1)return'<div style="display: inline-block; position: relative; bottom: .5ex; padding-left: 1em; height: 1px; border-bottom: 2px solid '+t+';"></div>'
var r,n,s,o,l,h=0,d=0,c=[]
for(r=0;r<=e.length;r++)h+=e[r%e.length]
if(l=Math.floor(a/(h-e[0])),l>1){for(r=0;r<e.length;r++)c[r]=e[r]/a
d=c.length}else{for(l=1,r=0;r<e.length;r++)c[r]=e[r]/h
d=c.length+1}var p=""
for(n=0;l>n;n++)for(r=0;d>r;r+=2)s=c[r%c.length],o=r<e.length?c[(r+1)%c.length]:0,p+='<div style="display: inline-block; position: relative; bottom: .5ex; margin-right: '+o+"em; padding-left: "+s+"em; height: 1px; border-bottom: 2px solid "+t+';"></div>'
return p},e}(),VelChart.Plugins.RangeSelector=function(){"use strict"
var e=function(){this.isIE_=/MSIE/.test(navigator.userAgent)&&!window.opera,this.hasTouchInterface_="undefined"!=typeof TouchEvent,this.isMobileDevice_=/mobile|android/gi.test(navigator.appVersion),this.interfaceCreated_=!1}
return e.prototype.toString=function(){return"RangeSelector Plugin"},e.prototype.activate=function(e){return this.dygraph_=e,this.isUsingExcanvas_=e.isUsingExcanvas_,this.getOption_("showRangeSelector")&&this.createInterface_(),{layout:this.reserveSpace_,predraw:this.renderStaticLayer_,didDrawChart:this.renderInteractiveLayer_}},e.prototype.destroy=function(){this.bgcanvas_=null,this.fgcanvas_=null,this.leftZoomHandle_=null,this.rightZoomHandle_=null,this.iePanOverlay_=null},e.prototype.getOption_=function(e,t){return this.dygraph_.getOption(e,t)},e.prototype.setDefaultOption_=function(e,t){this.dygraph_.attrs_[e]=t},e.prototype.createInterface_=function(){this.createCanvases_(),this.isUsingExcanvas_&&this.createIEPanOverlay_(),this.createZoomHandles_(),this.initInteraction_(),this.getOption_("animatedZooms")&&(console.warn("Animated zooms and range selector are not compatible; disabling animatedZooms."),this.dygraph_.updateOptions({animatedZooms:!1},!0)),this.interfaceCreated_=!0,this.addToGraph_()},e.prototype.addToGraph_=function(){var e=this.graphDiv_=this.dygraph_.graphDiv
e.appendChild(this.bgcanvas_),e.appendChild(this.fgcanvas_),e.appendChild(this.leftZoomHandle_),e.appendChild(this.rightZoomHandle_)},e.prototype.removeFromGraph_=function(){var e=this.graphDiv_
e.removeChild(this.bgcanvas_),e.removeChild(this.fgcanvas_),e.removeChild(this.leftZoomHandle_),e.removeChild(this.rightZoomHandle_),this.graphDiv_=null},e.prototype.reserveSpace_=function(e){this.getOption_("showRangeSelector")&&e.reserveSpaceBottom(this.getOption_("rangeSelectorHeight")+4)},e.prototype.renderStaticLayer_=function(){this.updateVisibility_()&&(this.resize_(),this.drawStaticLayer_())},e.prototype.renderInteractiveLayer_=function(){this.updateVisibility_()&&!this.isChangingRange_&&(this.placeZoomHandles_(),this.drawInteractiveLayer_())},e.prototype.updateVisibility_=function(){var e=this.getOption_("showRangeSelector")
if(e)this.interfaceCreated_?this.graphDiv_&&this.graphDiv_.parentNode||this.addToGraph_():this.createInterface_()
else if(this.graphDiv_){this.removeFromGraph_()
var t=this.dygraph_
setTimeout(function(){t.width_=0,t.resize()},1)}return e},e.prototype.resize_=function(){function e(e,t,a){var i=VelChart.getContextPixelRatio(t)
e.style.top=a.y+"px",e.style.left=a.x+"px",e.width=a.w*i,e.height=a.h*i,e.style.width=a.w+"px",e.style.height=a.h+"px",1!=i&&t.scale(i,i)}var t=this.dygraph_.layout_.getPlotArea(),a=0
this.dygraph_.getOptionForAxis("drawAxis","x")&&(a=this.getOption_("xAxisHeight")||this.getOption_("axisLabelFontSize")+2*this.getOption_("axisTickSize")),this.canvasRect_={x:t.x,y:t.y+t.h+a+4,w:t.w,h:this.getOption_("rangeSelectorHeight")},e(this.bgcanvas_,this.bgcanvas_ctx_,this.canvasRect_),e(this.fgcanvas_,this.fgcanvas_ctx_,this.canvasRect_)},e.prototype.createCanvases_=function(){this.bgcanvas_=VelChart.createCanvas(),this.bgcanvas_.className="dygraph-rangesel-bgcanvas",this.bgcanvas_.style.position="absolute",this.bgcanvas_.style.zIndex=9,this.bgcanvas_ctx_=VelChart.getContext(this.bgcanvas_),this.fgcanvas_=VelChart.createCanvas(),this.fgcanvas_.className="dygraph-rangesel-fgcanvas",this.fgcanvas_.style.position="absolute",this.fgcanvas_.style.zIndex=9,this.fgcanvas_.style.cursor="default",this.fgcanvas_ctx_=VelChart.getContext(this.fgcanvas_)},e.prototype.createIEPanOverlay_=function(){this.iePanOverlay_=document.createElement("div"),this.iePanOverlay_.style.position="absolute",this.iePanOverlay_.style.backgroundColor="white",this.iePanOverlay_.style.filter="alpha(opacity=0)",this.iePanOverlay_.style.display="none",this.iePanOverlay_.style.cursor="move",this.fgcanvas_.appendChild(this.iePanOverlay_)},e.prototype.createZoomHandles_=function(){var e=new Image
e.className="dygraph-rangesel-zoomhandle",e.style.position="absolute",e.style.zIndex=10,e.style.visibility="hidden",e.style.cursor="col-resize",/MSIE 7/.test(navigator.userAgent)?(e.width=7,e.height=14,e.style.backgroundColor="white",e.style.border="1px solid #333333"):(e.width=9,e.height=16,e.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAQCAYAAADESFVDAAAAAXNSR0IArs4c6QAAAAZiS0dEANAAzwDP4Z7KegAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB9sHGw0cMqdt1UwAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAaElEQVQoz+3SsRFAQBCF4Z9WJM8KCDVwownl6YXsTmCUsyKGkZzcl7zkz3YLkypgAnreFmDEpHkIwVOMfpdi9CEEN2nGpFdwD03yEqDtOgCaun7sqSTDH32I1pQA2Pb9sZecAxc5r3IAb21d6878xsAAAAAASUVORK5CYII="),this.isMobileDevice_&&(e.width*=2,e.height*=2),this.leftZoomHandle_=e,this.rightZoomHandle_=e.cloneNode(!1)},e.prototype.initInteraction_=function(){var e,t,a,i,r,n,s,o,l,h,d,c,p,u,g=this,f=document,v=0,y=null,_=!1,x=!1,m=!this.isMobileDevice_&&!this.isUsingExcanvas_,b=new VelChart.IFrameTarp
e=function(e){var t=g.dygraph_.xAxisExtremes(),a=(t[1]-t[0])/g.canvasRect_.w,i=t[0]+(e.leftHandlePos-g.canvasRect_.x)*a,r=t[0]+(e.rightHandlePos-g.canvasRect_.x)*a
return[i,r]},t=function(e){return VelChart.cancelEvent(e),_=!0,v=e.clientX,y=e.target?e.target:e.srcElement,("mousedown"===e.type||"dragstart"===e.type)&&(VelChart.addEvent(f,"mousemove",a),VelChart.addEvent(f,"mouseup",i)),g.fgcanvas_.style.cursor="col-resize",b.cover(),!0},a=function(e){if(!_)return!1
VelChart.cancelEvent(e)
var t=e.clientX-v
if(Math.abs(t)<4)return!0
v=e.clientX
var a,i=g.getZoomHandleStatus_()
y==g.leftZoomHandle_?(a=i.leftHandlePos+t,a=Math.min(a,i.rightHandlePos-y.width-3),a=Math.max(a,g.canvasRect_.x)):(a=i.rightHandlePos+t,a=Math.min(a,g.canvasRect_.x+g.canvasRect_.w),a=Math.max(a,i.leftHandlePos+y.width+3))
var n=y.width/2
return y.style.left=a-n+"px",g.drawInteractiveLayer_(),m&&r(),!0},i=function(e){return _?(_=!1,b.uncover(),VelChart.removeEvent(f,"mousemove",a),VelChart.removeEvent(f,"mouseup",i),g.fgcanvas_.style.cursor="default",m||r(),!0):!1},r=function(){try{var t=g.getZoomHandleStatus_()
if(g.isChangingRange_=!0,t.isZoomed){var a=e(t)
g.dygraph_.doZoomXDates_(a[0],a[1])}else g.dygraph_.resetZoom()}finally{g.isChangingRange_=!1}},n=function(e){if(g.isUsingExcanvas_)return e.srcElement==g.iePanOverlay_
var t=g.leftZoomHandle_.getBoundingClientRect(),a=t.left+t.width/2
t=g.rightZoomHandle_.getBoundingClientRect()
var i=t.left+t.width/2
return e.clientX>a&&e.clientX<i},s=function(e){return!x&&n(e)&&g.getZoomHandleStatus_().isZoomed?(VelChart.cancelEvent(e),x=!0,v=e.clientX,"mousedown"===e.type&&(VelChart.addEvent(f,"mousemove",o),VelChart.addEvent(f,"mouseup",l)),!0):!1},o=function(e){if(!x)return!1
VelChart.cancelEvent(e)
var t=e.clientX-v
if(Math.abs(t)<4)return!0
v=e.clientX
var a=g.getZoomHandleStatus_(),i=a.leftHandlePos,r=a.rightHandlePos,n=r-i
i+t<=g.canvasRect_.x?(i=g.canvasRect_.x,r=i+n):r+t>=g.canvasRect_.x+g.canvasRect_.w?(r=g.canvasRect_.x+g.canvasRect_.w,i=r-n):(i+=t,r+=t)
var s=g.leftZoomHandle_.width/2
return g.leftZoomHandle_.style.left=i-s+"px",g.rightZoomHandle_.style.left=r-s+"px",g.drawInteractiveLayer_(),m&&h(),!0},l=function(e){return x?(x=!1,VelChart.removeEvent(f,"mousemove",o),VelChart.removeEvent(f,"mouseup",l),m||h(),!0):!1},h=function(){try{g.isChangingRange_=!0,g.dygraph_.dateWindow_=e(g.getZoomHandleStatus_()),g.dygraph_.drawGraph_(!1)}finally{g.isChangingRange_=!1}},d=function(e){if(!_&&!x){var t=n(e)?"move":"default"
t!=g.fgcanvas_.style.cursor&&(g.fgcanvas_.style.cursor=t)}},c=function(e){"touchstart"==e.type&&1==e.targetTouches.length?t(e.targetTouches[0])&&VelChart.cancelEvent(e):"touchmove"==e.type&&1==e.targetTouches.length?a(e.targetTouches[0])&&VelChart.cancelEvent(e):i(e)},p=function(e){"touchstart"==e.type&&1==e.targetTouches.length?s(e.targetTouches[0])&&VelChart.cancelEvent(e):"touchmove"==e.type&&1==e.targetTouches.length?o(e.targetTouches[0])&&VelChart.cancelEvent(e):l(e)},u=function(e,t){for(var a=["touchstart","touchend","touchmove","touchcancel"],i=0;i<a.length;i++)g.dygraph_.addAndTrackEvent(e,a[i],t)},this.setDefaultOption_("interactionModel",VelChart.Interaction.dragIsPanInteractionModel),this.setDefaultOption_("panEdgeFraction",1e-4)
var C=window.opera?"mousedown":"dragstart"
this.dygraph_.addAndTrackEvent(this.leftZoomHandle_,C,t),this.dygraph_.addAndTrackEvent(this.rightZoomHandle_,C,t),this.isUsingExcanvas_?this.dygraph_.addAndTrackEvent(this.iePanOverlay_,"mousedown",s):(this.dygraph_.addAndTrackEvent(this.fgcanvas_,"mousedown",s),this.dygraph_.addAndTrackEvent(this.fgcanvas_,"mousemove",d)),this.hasTouchInterface_&&(u(this.leftZoomHandle_,c),u(this.rightZoomHandle_,c),u(this.fgcanvas_,p))},e.prototype.drawStaticLayer_=function(){var e=this.bgcanvas_ctx_
e.clearRect(0,0,this.canvasRect_.w,this.canvasRect_.h)
try{this.drawMiniPlot_()}catch(t){console.warn(t)}var a=.5
this.bgcanvas_ctx_.lineWidth=1,e.strokeStyle="gray",e.beginPath(),e.moveTo(a,a),e.lineTo(a,this.canvasRect_.h-a),e.lineTo(this.canvasRect_.w-a,this.canvasRect_.h-a),e.lineTo(this.canvasRect_.w-a,a),e.stroke()},e.prototype.drawMiniPlot_=function(){var e=this.getOption_("rangeSelectorPlotFillColor"),t=this.getOption_("rangeSelectorPlotStrokeColor")
if(e||t){var a=this.getOption_("stepPlot"),i=this.computeCombinedSeriesAndLimits_(),r=i.yMax-i.yMin,n=this.bgcanvas_ctx_,s=.5,o=this.dygraph_.xAxisExtremes(),l=Math.max(o[1]-o[0],1e-30),h=(this.canvasRect_.w-s)/l,d=(this.canvasRect_.h-s)/r,c=this.canvasRect_.w-s,p=this.canvasRect_.h-s,u=null,g=null
n.beginPath(),n.moveTo(s,p)
for(var f=0;f<i.data.length;f++){var v=i.data[f],y=null!==v[0]?(v[0]-o[0])*h:NaN,_=null!==v[1]?p-(v[1]-i.yMin)*d:NaN;(a||null===u||Math.round(y)!=Math.round(u))&&(isFinite(y)&&isFinite(_)?(null===u?n.lineTo(y,p):a&&n.lineTo(y,g),n.lineTo(y,_),u=y,g=_):(null!==u&&(a?(n.lineTo(y,g),n.lineTo(y,p)):n.lineTo(u,p)),u=g=null))}if(n.lineTo(c,p),n.closePath(),e){var x=this.bgcanvas_ctx_.createLinearGradient(0,0,0,p)
x.addColorStop(0,"white"),x.addColorStop(1,e),this.bgcanvas_ctx_.fillStyle=x,n.fill()}t&&(this.bgcanvas_ctx_.strokeStyle=t,this.bgcanvas_ctx_.lineWidth=1.5,n.stroke())}},e.prototype.computeCombinedSeriesAndLimits_=function(){var e,t=this.dygraph_,a=this.getOption_("logscale"),i=t.numColumns(),r=t.getLabels(),n=Array(i),s=!1
for(e=1;i>e;e++){var o=this.getOption_("showInRangeSelector",r[e])
n[e]=o,null!==o&&(s=!0)}if(!s)for(e=0;e<n.length;e++)n[e]=!0
var l=[],h=t.dataHandler_,d=t.attributes_
for(e=1;e<t.numColumns();e++)if(n[e]){var c=h.extractSeries(t.rawData_,e,d)
t.rollPeriod()>1&&(c=h.rollingAverage(c,t.rollPeriod(),d)),l.push(c)}var p=[]
for(e=0;e<l[0].length;e++){for(var u=0,g=0,f=0;f<l.length;f++){var v=l[f][e][1]
null===v||isNaN(v)||(g++,u+=v)}p.push([l[0][e][0],u/g])}var y=Number.MAX_VALUE,_=-Number.MAX_VALUE
for(e=0;e<p.length;e++){var x=p[e][1]
null!==x&&isFinite(x)&&(!a||x>0)&&(y=Math.min(y,x),_=Math.max(_,x))}var m=.25
if(a)for(_=VelChart.log10(_),_+=_*m,y=VelChart.log10(y),e=0;e<p.length;e++)p[e][1]=VelChart.log10(p[e][1])
else{var b,C=_-y
b=C<=Number.MIN_VALUE?_*m:C*m,_+=b,y-=b}return{data:p,yMin:y,yMax:_}},e.prototype.placeZoomHandles_=function(){var e=this.dygraph_.xAxisExtremes(),t=this.dygraph_.xAxisRange(),a=e[1]-e[0],i=Math.max(0,(t[0]-e[0])/a),r=Math.max(0,(e[1]-t[1])/a),n=this.canvasRect_.x+this.canvasRect_.w*i,s=this.canvasRect_.x+this.canvasRect_.w*(1-r),o=Math.max(this.canvasRect_.y,this.canvasRect_.y+(this.canvasRect_.h-this.leftZoomHandle_.height)/2),l=this.leftZoomHandle_.width/2
this.leftZoomHandle_.style.left=n-l+"px",this.leftZoomHandle_.style.top=o+"px",this.rightZoomHandle_.style.left=s-l+"px",this.rightZoomHandle_.style.top=this.leftZoomHandle_.style.top,this.leftZoomHandle_.style.visibility="visible",this.rightZoomHandle_.style.visibility="visible"},e.prototype.drawInteractiveLayer_=function(){var e=this.fgcanvas_ctx_
e.clearRect(0,0,this.canvasRect_.w,this.canvasRect_.h)
var t=1,a=this.canvasRect_.w-t,i=this.canvasRect_.h-t,r=this.getZoomHandleStatus_()
if(e.strokeStyle="black",r.isZoomed){var n=Math.max(t,r.leftHandlePos-this.canvasRect_.x),s=Math.min(a,r.rightHandlePos-this.canvasRect_.x)
e.fillStyle="rgba(240, 240, 240, 0.6)",e.fillRect(0,0,n,this.canvasRect_.h),e.fillRect(s,0,this.canvasRect_.w-s,this.canvasRect_.h),e.beginPath(),e.moveTo(t,t),e.lineTo(n,t),e.lineTo(n,i),e.lineTo(s,i),e.lineTo(s,t),e.lineTo(a,t),e.stroke(),this.isUsingExcanvas_&&(this.iePanOverlay_.style.width=s-n+"px",this.iePanOverlay_.style.left=n+"px",this.iePanOverlay_.style.height=i+"px",this.iePanOverlay_.style.display="inline")}else e.beginPath(),e.moveTo(t,t),e.lineTo(t,i),e.lineTo(a,i),e.lineTo(a,t),e.stroke(),this.iePanOverlay_&&(this.iePanOverlay_.style.display="none")},e.prototype.getZoomHandleStatus_=function(){var e=this.leftZoomHandle_.width/2,t=parseFloat(this.leftZoomHandle_.style.left)+e,a=parseFloat(this.rightZoomHandle_.style.left)+e
return{leftHandlePos:t,rightHandlePos:a,isZoomed:t-1>this.canvasRect_.x||a+1<this.canvasRect_.x+this.canvasRect_.w}},e}(),VelChart.PLUGINS.push(VelChart.Plugins.Legend,VelChart.Plugins.Axes,VelChart.Plugins.RangeSelector,VelChart.Plugins.ChartLabels,VelChart.Plugins.Annotations,VelChart.Plugins.Grid),VelChart.OPTIONS_REFERENCE={xValueParser:{"default":"parseFloat() or Date.parse()*",labels:["CSV parsing"],type:"function(str) -> number",description:"A function which parses x-values (i.e. the dependent series). Must return a number, even when the values are dates. In this case, millis since epoch are used. This is used primarily for parsing CSV data. *=VelCharts is slightly more accepting in the dates which it will parse. See code for details."},stackedGraph:{"default":"false",labels:["Data Line display"],type:"boolean",description:"If set, stack series on top of one another rather than drawing them independently. The first series specified in the input data will wind up on top of the chart and the last will be on bottom. NaN values are drawn as white areas without a line on top, see stackedGraphNaNFill for details."},stackedGraphNaNFill:{"default":"all",labels:["Data Line display"],type:"string",description:'Controls handling of NaN values inside a stacked graph. NaN values are interpolated/extended for stacking purposes, but the actual point value remains NaN in the legend display. Valid option values are "all" (interpolate internally, repeat leftmost and rightmost value as needed), "inside" (interpolate internally only, use zero outside leftmost and rightmost value), and "none" (treat NaN as zero everywhere).'},pointSize:{"default":"1",labels:["Data Line display"],type:"integer",description:'The size of the dot to draw on each point in pixels (see drawPoints). A dot is always drawn when a point is "isolated", i.e. there is a missing point on either side of it. This also controls the size of those dots.'},labelsDivStyles:{"default":"null",labels:["Legend"],type:"{}",description:"Additional styles to apply to the currently-highlighted points div. For example, { 'fontWeight': 'bold' } will make the labels bold. In general, it is better to use CSS to style the .dygraph-legend class than to use this property."},drawPoints:{"default":"false",labels:["Data Line display"],type:"boolean",description:"Draw a small dot at each point, in addition to a line going through the point. This makes the individual data points easier to see, but can increase visual clutter in the chart. The small dot can be replaced with a custom rendering by supplying a <a href='#drawPointCallback'>drawPointCallback</a>."},drawGapEdgePoints:{"default":"false",labels:["Data Line display"],type:"boolean",description:"Draw points at the edges of gaps in the data. This improves visibility of small data segments or other data irregularities."},drawPointCallback:{"default":"null",labels:["Data Line display"],type:"function(g, seriesName, canvasContext, cx, cy, color, pointSize)",parameters:[["g","the reference graph"],["seriesName","the name of the series"],["canvasContext","the canvas to draw on"],["cx","center x coordinate"],["cy","center y coordinate"],["color","series color"],["pointSize","the radius of the image."],["idx","the row-index of the point in the data."]],description:"Draw a custom item when drawPoints is enabled. Default is a small dot matching the series color. This method should constrain drawing to within pointSize pixels from (cx, cy).  Also see <a href='#drawHighlightPointCallback'>drawHighlightPointCallback</a>"},height:{"default":"320",labels:["Overall display"],type:"integer",description:"Height, in pixels, of the chart. If the container div has been explicitly sized, this will be ignored."},zoomCallback:{"default":"null",labels:["Callbacks"],type:"function(minDate, maxDate, yRanges)",parameters:[["minDate","milliseconds since epoch"],["maxDate","milliseconds since epoch."],["yRanges","is an array of [bottom, top] pairs, one for each y-axis."]],description:"A function to call when the zoom window is changed (either by zooming in or out)."},pointClickCallback:{snippet:"function(e, point){<br>&nbsp;&nbsp;alert(point);<br>}","default":"null",labels:["Callbacks","Interactive Elements"],type:"function(e, point)",parameters:[["e","the event object for the click"],["point","the point that was clicked See <a href='#point_properties'>Point properties</a> for details"]],description:"A function to call when a data point is clicked. and the point that was clicked."},color:{"default":"(see description)",labels:["Data Series Colors"],type:"string",example:"red",description:"A per-series color definition. Used in conjunction with, and overrides, the colors option."},colors:{"default":"(see description)",labels:["Data Series Colors"],type:"array<string>",example:"['red', '#00FF00']",description:'List of colors for the data series. These can be of the form "#AABBCC" or "rgb(255,100,200)" or "yellow", etc. If not specified, equally-spaced points around a color wheel are used. Overridden by the \'color\' option.'},connectSeparatedPoints:{"default":"false",labels:["Data Line display"],type:"boolean",description:"Usually, when VelCharts encounters a missing value in a data series, it interprets this as a gap and draws it as such. If, instead, the missing values represents an x-value for which only a different series has data, then you'll want to connect the dots by setting this to true. To explicitly include a gap with this option set, use a value of NaN."},highlightCallback:{"default":"null",labels:["Callbacks"],type:"function(event, x, points, row, seriesName)",description:"When set, this callback gets called every time a new point is highlighted.",parameters:[["event","the JavaScript mousemove event"],["x","the x-coordinate of the highlighted points"],["points","an array of highlighted points: <code>[ {name: 'series', yval: y-value}, &hellip; ]</code>"],["row","integer index of the highlighted row in the data table, starting from 0"],["seriesName","name of the highlighted series, only present if highlightSeriesOpts is set."]]},drawHighlightPointCallback:{"default":"null",labels:["Data Line display"],type:"function(g, seriesName, canvasContext, cx, cy, color, pointSize)",parameters:[["g","the reference graph"],["seriesName","the name of the series"],["canvasContext","the canvas to draw on"],["cx","center x coordinate"],["cy","center y coordinate"],["color","series color"],["pointSize","the radius of the image."],["idx","the row-index of the point in the data."]],description:"Draw a custom item when a point is highlighted.  Default is a small dot matching the series color. This method should constrain drawing to within pointSize pixels from (cx, cy) Also see <a href='#drawPointCallback'>drawPointCallback</a>"},highlightSeriesOpts:{"default":"null",labels:["Interactive Elements"],type:"Object",description:"When set, the options from this object are applied to the timeseries closest to the mouse pointer for interactive highlighting. See also 'highlightCallback'. Example: highlightSeriesOpts: { strokeWidth: 3 }."},highlightSeriesBackgroundAlpha:{"default":"0.5",labels:["Interactive Elements"],type:"float",description:"Fade the background while highlighting series. 1=fully visible background (disable fading), 0=hiddden background (show highlighted series only)."},includeZero:{"default":"false",labels:["Axis display"],type:"boolean",description:"Usually, VelCharts will use the range of the data plus some padding to set the range of the y-axis. If this option is set, the y-axis will always include zero, typically as the lowest value. This can be used to avoid exaggerating the variance in the data"},rollPeriod:{"default":"1",labels:["Error Bars","Rolling Averages"],type:"integer &gt;= 1",description:"Number of days over which to average data. Discussed extensively above."},unhighlightCallback:{"default":"null",labels:["Callbacks"],type:"function(event)",parameters:[["event","the mouse event"]],description:"When set, this callback gets called every time the user stops highlighting any point by mousing out of the graph."},axisTickSize:{"default":"3.0",labels:["Axis display"],type:"number",description:"The size of the line to display next to each tick mark on x- or y-axes."},labelsSeparateLines:{"default":"false",labels:["Legend"],type:"boolean",description:"Put <code>&lt;br/&gt;</code> between lines in the label string. Often used in conjunction with <strong>labelsDiv</strong>."},xValueFormatter:{"default":"",labels:["Deprecated"],type:"",description:"Prefer axes: { x: { valueFormatter } }"},valueFormatter:{"default":"Depends on the type of your data.",labels:["Legend","Value display/formatting"],type:"function(num or millis, opts, seriesName, dygraph, row, col)",description:"Function to provide a custom display format for the values displayed on mouseover. This does not affect the values that appear on tick marks next to the axes. To format those, see axisLabelFormatter. This is usually set on a <a href='per-axis.html'>per-axis</a> basis. .",parameters:[["num_or_millis","The value to be formatted. This is always a number. For date axes, it's millis since epoch. You can call new Date(millis) to get a Date object."],["opts","This is a function you can call to access various options (e.g. opts('labelsKMB')). It returns per-axis values for the option when available."],["seriesName","The name of the series from which the point came, e.g. 'X', 'Y', 'A', etc."],["dygraph","The dygraph object for which the formatting is being done"],["row","The row of the data from which this point comes. g.getValue(row, 0) will return the x-value for this point."],["col","The column of the data from which this point comes. g.getValue(row, col) will return the original y-value for this point. This can be used to get the full confidence interval for the point, or access un-rolled values for the point."]]},pixelsPerYLabel:{"default":"",labels:["Deprecated"],type:"integer",description:"Prefer axes: { y: { pixelsPerLabel } }"},annotationMouseOverHandler:{"default":"null",labels:["Annotations"],type:"function(annotation, point, dygraph, event)",description:"If provided, this function is called whenever the user mouses over an annotation."},annotationMouseOutHandler:{"default":"null",labels:["Annotations"],type:"function(annotation, point, dygraph, event)",parameters:[["annotation","the annotation left"],["point","the point associated with the annotation"],["dygraph","the reference graph"],["event","the mouse event"]],description:"If provided, this function is called whenever the user mouses out of an annotation."},annotationClickHandler:{"default":"null",labels:["Annotations"],type:"function(annotation, point, dygraph, event)",parameters:[["annotation","the annotation left"],["point","the point associated with the annotation"],["dygraph","the reference graph"],["event","the mouse event"]],description:"If provided, this function is called whenever the user clicks on an annotation."},annotationDblClickHandler:{"default":"null",labels:["Annotations"],type:"function(annotation, point, dygraph, event)",parameters:[["annotation","the annotation left"],["point","the point associated with the annotation"],["dygraph","the reference graph"],["event","the mouse event"]],description:"If provided, this function is called whenever the user double-clicks on an annotation."},drawCallback:{"default":"null",labels:["Callbacks"],type:"function(dygraph, is_initial)",parameters:[["dygraph","The graph being drawn"],["is_initial","True if this is the initial draw, false for subsequent draws."]],description:"When set, this callback gets called every time the dygraph is drawn. This includes the initial draw, after zooming and repeatedly while panning."},labelsKMG2:{"default":"false",labels:["Value display/formatting"],type:"boolean",description:"Show k/M/G for kilo/Mega/Giga on y-axis. This is different than <code>labelsKMB</code> in that it uses base 2, not 10."},delimiter:{"default":",",labels:["CSV parsing"],type:"string",description:"The delimiter to look for when separating fields of a CSV file. Setting this to a tab is not usually necessary, since tab-delimited data is auto-detected."},axisLabelFontSize:{"default":"14",labels:["Axis display"],type:"integer",description:"Size of the font (in pixels) to use in the axis labels, both x- and y-axis."},underlayCallback:{"default":"null",labels:["Callbacks"],type:"function(context, area, dygraph)",parameters:[["context","the canvas drawing context on which to draw"],["area","An object with {x,y,w,h} properties describing the drawing area."],["dygraph","the reference graph"]],description:"When set, this callback gets called before the chart is drawn. It details on how to use this."},width:{"default":"480",labels:["Overall display"],type:"integer",description:"Width, in pixels, of the chart. If the container div has been explicitly sized, this will be ignored."},interactionModel:{"default":"...",labels:["Interactive Elements"],type:"Object",description:"TODO(konigsberg): document this"},ticker:{"default":"VelChart.dateTicker or VelChart.numericTicks",labels:["Axis display"],type:"function(min, max, pixels, opts, dygraph, vals) -> [{v: ..., label: ...}, ...]",parameters:[["min",""],["max",""],["pixels",""],["opts",""],["dygraph","the reference graph"],["vals",""]],description:"This lets you specify an arbitrary function to generate tick marks on an axis. The tick marks are an array of (value, label) pairs. The built-in functions go to great lengths to choose good tick marks so, if you set this option, you'll most likely want to call one of them and modify the result. See dygraph-tickers.js for an extensive discussion. This is set on a <a href='per-axis.html'>per-axis</a> basis."},xAxisLabelWidth:{"default":"",labels:["Deprecated"],type:"integer",description:"Prefer axes: { x: { axisLabelWidth } }"},xAxisHeight:{"default":"(null)",labels:["Axis display"],type:"integer",description:"Height, in pixels, of the x-axis. If not set explicitly, this is computed based on axisLabelFontSize and axisTickSize."},showLabelsOnHighlight:{"default":"true",labels:["Interactive Elements","Legend"],type:"boolean",description:"Whether to show the legend upon mouseover."},axis:{"default":"(none)",labels:["Axis display"],type:"string",description:"Set to either 'y1' or 'y2' to assign a series to a y-axis (primary or secondary). Must be set per-series."},pixelsPerXLabel:{"default":"",labels:["Deprecated"],type:"integer",description:"Prefer axes { x: { pixelsPerLabel } }"},pixelsPerLabel:{"default":"70 (x-axis) or 30 (y-axes)",labels:["Axis display","Grid"],type:"integer",description:"Number of pixels to require between each x- and y-label. Larger values will yield a sparser axis with fewer ticks. This is set on a <a href='per-axis.html'>per-axis</a> basis."},labelsDiv:{"default":"null",labels:["Legend"],type:"DOM element or string",example:"<code style='font-size: small'>document.getElementById('foo')</code>or<code>'foo'",description:"Show data labels in an external div, rather than on the graph.  This value can either be a div element or a div id."},fractions:{"default":"false",labels:["CSV parsing","Error Bars"],type:"boolean",description:'When set, attempt to parse each cell in the CSV file as "a/b", where a and b are integers. The ratio will be plotted. This allows computation of Wilson confidence intervals (see below).'},logscale:{"default":"false",labels:["Axis display"],type:"boolean",description:"When set for the y-axis or x-axis, the graph shows that axis in log scale. Any values less than or equal to zero are not displayed. Showing log scale with ranges that go below zero will result in an unviewable graph.\n\n Not compatible with showZero. connectSeparatedPoints is ignored. This is ignored for date-based x-axes."},strokeWidth:{"default":"1.0",labels:["Data Line display"],type:"float",example:"0.5, 2.0",description:"The width of the lines connecting data points. This can be used to increase the contrast or some graphs."},strokePattern:{"default":"null",labels:["Data Line display"],type:"array<integer>",example:"[10, 2, 5, 2]",description:"A custom pattern array where the even index is a draw and odd is a space in pixels. If null then it draws a solid line. The array should have a even length as any odd lengthed array could be expressed as a smaller even length array. This is used to create dashed lines."},strokeBorderWidth:{"default":"null",labels:["Data Line display"],type:"float",example:"1.0",description:"Draw a border around graph lines to make crossing lines more easily distinguishable. Useful for graphs with many lines."},strokeBorderColor:{"default":"white",labels:["Data Line display"],type:"string",example:"red, #ccffdd",description:"Color for the line border used if strokeBorderWidth is set."},wilsonInterval:{"default":"true",labels:["Error Bars"],type:"boolean",description:'Use in conjunction with the "fractions" option. Instead of plotting +/- N standard deviations, VelCharts will compute a Wilson confidence interval and plot that. This has more reasonable behavior for ratios close to 0 or 1.'},fillGraph:{"default":"false",labels:["Data Line display"],type:"boolean",description:"Should the area underneath the graph be filled? This option is not compatible with error bars. This may be set on a <a href='per-axis.html'>per-series</a> basis."},highlightCircleSize:{"default":"3",labels:["Interactive Elements"],type:"integer",description:"The size in pixels of the dot drawn over highlighted points."},gridLineColor:{"default":"rgb(128,128,128)",labels:["Grid"],type:"red, blue",description:"The color of the gridlines. This may be set on a per-axis basis to define each axis' grid separately."},gridLinePattern:{"default":"null",labels:["Grid"],type:"array<integer>",example:"[10, 2, 5, 2]",description:"A custom pattern array where the even index is a draw and odd is a space in pixels. If null then it draws a solid line. The array should have a even length as any odd lengthed array could be expressed as a smaller even length array. This is used to create dashed gridlines."},visibility:{"default":"[true, true, ...]",labels:["Data Line display"],type:"Array of booleans",description:"Which series should initially be visible? Once the VelChart has been constructed, you can access and modify the visibility of each series using the <code>visibility</code> and <code>setVisibility</code> methods."},valueRange:{"default":"Full range of the input is shown",labels:["Axis display"],type:"Array of two numbers",example:"[10, 110]",description:"Explicitly set the vertical range of the graph to [low, high]. This may be set on a per-axis basis to define each y-axis separately. If either limit is unspecified, it will be calculated automatically (e.g. [null, 30] to automatically calculate just the lower bound)"},labelsDivWidth:{"default":"250",labels:["Legend"],type:"integer",description:"Width (in pixels) of the div which shows information on the currently-highlighted points."},colorSaturation:{"default":"1.0",labels:["Data Series Colors"],type:"float (0.0 - 1.0)",description:"If <strong>colors</strong> is not specified, saturation of the automatically-generated data series colors."},yAxisLabelWidth:{"default":"",labels:["Deprecated"],type:"integer",description:"Prefer axes { y: { axisLabelWidth } }"},hideOverlayOnMouseOut:{"default":"true",labels:["Interactive Elements","Legend"],type:"boolean",description:"Whether to hide the legend when the mouse leaves the chart area."},yValueFormatter:{"default":"",labels:["Deprecated"],type:"",description:"Prefer axes: { y: { valueFormatter } }"},legend:{"default":"onmouseover",labels:["Legend"],type:"string",description:'When to display the legend. By default, it only appears when a user mouses over the chart. Set it to "always" to always display a legend of some sort. When set to "follow", legend follows highlighted points.'},labelsShowZeroValues:{"default":"true",labels:["Legend"],type:"boolean",description:"Show zero value labels in the labelsDiv."},stepPlot:{"default":"false",labels:["Data Line display"],type:"boolean",description:"When set, display the graph as a step plot instead of a line plot. This option may either be set for the whole graph or for single series."},labelsUTC:{"default":"false",labels:["Value display/formatting","Axis display"],type:"boolean",description:"Show date/time labels according to UTC (instead of local time)."},labelsKMB:{"default":"false",labels:["Value display/formatting"],type:"boolean",description:"Show K/M/B for thousands/millions/billions on y-axis."},rightGap:{"default":"5",labels:["Overall display"],type:"integer",description:"Number of pixels to leave blank at the right edge of the VelChart. This makes it easier to highlight the right-most data point."},avoidMinZero:{"default":"false",labels:["Deprecated"],type:"boolean",description:"Deprecated, please use yRangePad instead. When set, the heuristic that fixes the Y axis at zero for a data set with the minimum Y value of zero is disabled. \nThis is particularly useful for data sets that contain many zero values, especially for step plots which may otherwise have lines not visible running along the bottom axis."},drawAxesAtZero:{"default":"false",labels:["Axis display"],type:"boolean",description:"When set, draw the X axis at the Y=0 position and the Y axis at the X=0 position if those positions are inside the graph's visible area. Otherwise, draw the axes at the bottom or left graph edge as usual."},xRangePad:{"default":"0",labels:["Axis display"],type:"float",description:"Add the specified amount of extra space (in pixels) around the X-axis value range to ensure points at the edges remain visible."},yRangePad:{"default":"null",labels:["Axis display"],type:"float",description:"If set, add the specified amount of extra space (in pixels) around the Y-axis value range to ensure points at the edges remain visible. If unset, use the traditional Y padding algorithm."},xAxisLabelFormatter:{"default":"",labels:["Deprecated"],type:"",description:"Prefer axes { x: { axisLabelFormatter } }"},axisLabelFormatter:{"default":"Depends on the data type",labels:["Axis display"],type:"function(number or Date, granularity, opts, dygraph)",parameters:[["number or date","Either a number (for a numeric axis) or a Date object (for a date axis)"],["granularity","specifies how fine-grained the axis is. For date axes, this is a reference to the time granularity enumeration, defined in dygraph-tickers.js, e.g. VelChart.WEEKLY."],["opts","a function which provides access to various options on the dygraph, e.g. opts('labelsKMB')."],["dygraph","the referenced graph"]],description:"Function to call to format the tick values that appear along an axis. This is usually set on a <a href='per-axis.html'>per-axis</a> basis."},clickCallback:{snippet:"function(e, date_millis){<br>&nbsp;&nbsp;alert(new Date(date_millis));<br>}","default":"null",labels:["Callbacks"],type:"function(e, x, points)",parameters:[["e","The event object for the click"],["x","The x value that was clicked (for dates, this is milliseconds since epoch)"],["points","The closest points along that date. See <a href='#point_properties'>Point properties</a> for details."]],description:"A function to call when the canvas is clicked."},yAxisLabelFormatter:{"default":"",labels:["Deprecated"],type:"",description:"Prefer axes: { y: { axisLabelFormatter } }"},labels:{"default":'["X", "Y1", "Y2", ...]*',labels:["Legend"],type:"array<string>",description:"A name for each data series, including the independent (X) series. For CSV files and DataTable objections, this is determined by context. For raw data, this must be specified. If it is not, default values are supplied and a warning is logged."},dateWindow:{"default":"Full range of the input is shown",labels:["Axis display"],type:"Array of two numbers",example:"[<br>&nbsp;&nbsp;Date.parse('2006-01-01'),<br>&nbsp;&nbsp;(new Date()).valueOf()<br>]",description:"Initially zoom in on a section of the graph. Is of the form [earliest, latest], where earliest/latest are milliseconds since epoch. If the data for the x-axis is numeric, the values in dateWindow must also be numbers."},showRoller:{"default":"false",labels:["Interactive Elements","Rolling Averages"],type:"boolean",description:"If the rolling average period text box should be shown."},sigma:{"default":"2.0",labels:["Error Bars"],type:"float",description:"When errorBars is set, shade this many standard deviations above/below each point."},customBars:{"default":"false",labels:["CSV parsing","Error Bars"],type:"boolean",description:'When set, parse each CSV cell as "low;middle;high". Error bars will be drawn for each point between low and high, with the series itself going through middle.'},colorValue:{"default":"1.0",labels:["Data Series Colors"],type:"float (0.0 - 1.0)",description:"If colors is not specified, value of the data series colors, as in hue/saturation/value. (0.0-1.0, default 0.5)"},errorBars:{"default":"false",labels:["CSV parsing","Error Bars"],type:"boolean",description:"Does the data contain standard deviations? Setting this to true alters the input format (see above)."},displayAnnotations:{"default":"false",labels:["Annotations"],type:"boolean",description:"Only applies when VelCharts is used as a GViz chart. Causes string columns following a data series to be interpreted as annotations on points in that series. This is the same format used by Google's AnnotatedTimeLine chart."},panEdgeFraction:{"default":"null",labels:["Axis display","Interactive Elements"],type:"float",description:"A value representing the farthest a graph may be panned, in percent of the display. For example, a value of 0.1 means that the graph can only be panned 10% pased the edges of the displayed values. null means no bounds."},title:{labels:["Chart labels"],type:"string","default":"null",description:"Text to display above the chart. You can supply any HTML for this value, not just text. If you wish to style it using CSS, use the 'dygraph-label' or 'dygraph-title' classes."},titleHeight:{"default":"18",labels:["Chart labels"],type:"integer",description:"Height of the chart title, in pixels. This also controls the default font size of the title. If you style the title on your own, this controls how much space is set aside above the chart for the title's div."},xlabel:{labels:["Chart labels"],type:"string","default":"null",description:"Text to display below the chart's x-axis. You can supply any HTML for this value, not just text. If you wish to style it using CSS, use the 'dygraph-label' or 'dygraph-xlabel' classes."},xLabelHeight:{labels:["Chart labels"],type:"integer","default":"18",description:"Height of the x-axis label, in pixels. This also controls the default font size of the x-axis label. If you style the label on your own, this controls how much space is set aside below the chart for the x-axis label's div."},ylabel:{labels:["Chart labels"],type:"string","default":"null",description:"Text to display to the left of the chart's y-axis. You can supply any HTML for this value, not just text. If you wish to style it using CSS, use the 'dygraph-label' or 'dygraph-ylabel' classes. The text will be rotated 90 degrees by default, so CSS rules may behave in unintuitive ways. No additional space is set aside for a y-axis label. If you need more space, increase the width of the y-axis tick labels using the yAxisLabelWidth option. If you need a wider div for the y-axis label, either style it that way with CSS (but remember that it's rotated, so width is controlled by the 'height' property) or set the yLabelWidth option."},y2label:{labels:["Chart labels"],type:"string","default":"null",description:"Text to display to the right of the chart's secondary y-axis. This label is only displayed if a secondary y-axis is present. See <a href='http://VelCharts.com/tests/two-axes.html'>this test</a> for an example of how to do this. The comments for the 'ylabel' option generally apply here as well. This label gets a 'dygraph-y2label' instead of a 'dygraph-ylabel' class."},yLabelWidth:{labels:["Chart labels"],type:"integer","default":"18",description:"Width of the div which contains the y-axis label. Since the y-axis label appears rotated 90 degrees, this actually affects the height of its div."},isZoomedIgnoreProgrammaticZoom:{"default":"false",labels:["Zooming"],type:"boolean",description:"When this option is passed to updateOptions() along with either the <code>dateWindow</code> or <code>valueRange</code> options, the zoom flags are not changed to reflect a zoomed state. This is primarily useful for when the display area of a chart is changed programmatically and also where manual zooming is allowed and use is made of the <code>isZoomed</code> method to determine this."},drawXGrid:{"default":"true",labels:["Grid","Deprecated"],type:"boolean",description:"Use the per-axis option drawGrid instead. Whether to display vertical gridlines under the chart."},drawYGrid:{"default":"true",labels:["Grid","Deprecated"],type:"boolean",description:"Use the per-axis option drawGrid instead. Whether to display horizontal gridlines under the chart."},drawGrid:{"default":"true for x and y, false for y2",labels:["Grid"],type:"boolean",description:"Whether to display gridlines in the chart. This may be set on a per-axis basis to define the visibility of each axis' grid separately."},independentTicks:{"default":"true for y, false for y2",labels:["Axis display","Grid"],type:"boolean",description:"Only valid for y and y2, has no effect on x: This option defines whether the y axes should align their ticks or if they should be independent. Possible combinations: 1.) y=true, y2=false (default): y is the primary axis and the y2 ticks are aligned to the the ones of y. (only 1 grid) 2.) y=false, y2=true: y2 is the primary axis and the y ticks are aligned to the the ones of y2. (only 1 grid) 3.) y=true, y2=true: Both axis are independent and have their own ticks. (2 grids) 4.) y=false, y2=false: Invalid configuration causes an error."},drawXAxis:{"default":"true",labels:["Axis display"],type:"boolean",description:"Deprecated. Use axes : { x : { drawAxis } }."},drawYAxis:{"default":"true",labels:["Axis display"],type:"boolean",description:"Deprecated. Use axes : { y : { drawAxis } }."},drawAxis:{"default":"true for x and y, false for y2",labels:["Axis display"],type:"boolean",description:"Whether to draw the specified axis. This may be set on a per-axis basis to define the visibility of each axis separately. Setting this to false also prevents axis ticks from being drawn and reclaims the space for the chart grid/lines."},gridLineWidth:{"default":"0.3",labels:["Grid"],type:"float",description:"Thickness (in pixels) of the gridlines drawn under the chart. The vertical/horizontal gridlines can be turned off entirely by using the drawXGrid and drawYGrid options. This may be set on a per-axis basis to define each axis' grid separately."},axisLineWidth:{"default":"0.3",labels:["Axis display"],type:"float",description:"Thickness (in pixels) of the x- and y-axis lines."},axisLineColor:{"default":"black",labels:["Axis display"],type:"string",description:"Color of the x- and y-axis lines. Accepts any value which the HTML canvas strokeStyle attribute understands, e.g. 'black' or 'rgb(0, 100, 255)'."},fillAlpha:{"default":"0.15",labels:["Error Bars","Data Series Colors"],type:"float (0.0 - 1.0)",description:"Error bars (or custom bars) for each series are drawn in the same color as the series, but with partial transparency. This sets the transparency. A value of 0.0 means that the error bars will not be drawn, whereas a value of 1.0 means that the error bars will be as dark as the line for the series itself. This can be used to produce chart lines whose thickness varies at each point."},axisLabelColor:{"default":"black",labels:["Axis display"],type:"string",description:"Color for x- and y-axis labels. This is a CSS color string."
},axisLabelWidth:{"default":"50 (y-axis), 60 (x-axis)",labels:["Axis display","Chart labels"],type:"integer",description:"Width (in pixels) of the containing divs for x- and y-axis labels. For the y-axis, this also controls the width of the y-axis. Note that for the x-axis, this is independent from pixelsPerLabel, which controls the spacing between labels."},sigFigs:{"default":"null",labels:["Value display/formatting"],type:"integer",description:"By default, VelCharts displays numbers with a fixed number of digits after the decimal point. If you'd prefer to have a fixed number of significant figures, set this option to that number of sig figs. A value of 2, for instance, would cause 1 to be display as 1.0 and 1234 to be displayed as 1.23e+3."},digitsAfterDecimal:{"default":"2",labels:["Value display/formatting"],type:"integer",description:"Unless it's run in scientific mode (see the <code>sigFigs</code> option), VelCharts displays numbers with <code>digitsAfterDecimal</code> digits after the decimal point. Trailing zeros are not displayed, so with a value of 2 you'll get '0', '0.1', '0.12', '123.45' but not '123.456' (it will be rounded to '123.46'). Numbers with absolute value less than 0.1^digitsAfterDecimal (i.e. those which would show up as '0.00') will be displayed in scientific notation."},maxNumberWidth:{"default":"6",labels:["Value display/formatting"],type:"integer",description:"When displaying numbers in normal (not scientific) mode, large numbers will be displayed with many trailing zeros (e.g. 100000000 instead of 1e9). This can lead to unwieldy y-axis labels. If there are more than <code>maxNumberWidth</code> digits to the left of the decimal in a number, VelCharts will switch to scientific notation, even when not operating in scientific mode. If you'd like to see all those digits, set this to something large, like 20 or 30."},file:{"default":"(set when constructed)",labels:["Data"],type:"string (URL of CSV or CSV), GViz DataTable or 2D Array",description:"Sets the data being displayed in the chart. This can only be set when calling updateOptions; it cannot be set from the constructor. For a full description of valid data formats, see the <a href='http://VelCharts.com/data.html'>Data Formats</a> page."},timingName:{"default":"null",labels:["Debugging"],type:"string",description:"Set this option to log timing information. The value of the option will be logged along with the timimg, so that you can distinguish multiple VelCharts on the same page."},showRangeSelector:{"default":"false",labels:["Interactive Elements"],type:"boolean",description:"Show or hide the range selector widget."},rangeSelectorHeight:{"default":"40",labels:["Interactive Elements"],type:"integer",description:"Height, in pixels, of the range selector widget. This option can only be specified at VelChart creation time."},rangeSelectorPlotStrokeColor:{"default":"#808FAB",labels:["Interactive Elements"],type:"string",description:'The range selector mini plot stroke color. This can be of the form "#AABBCC" or "rgb(255,100,200)" or "yellow". You can also specify null or "" to turn off stroke.'},rangeSelectorPlotFillColor:{"default":"#A7B1C4",labels:["Interactive Elements"],type:"string",description:'The range selector mini plot fill color. This can be of the form "#AABBCC" or "rgb(255,100,200)" or "yellow". You can also specify null or "" to turn off fill.'},showInRangeSelector:{"default":"null",labels:["Interactive Elements"],type:"boolean",description:"Mark this series for inclusion in the range selector. The mini plot curve will be an average of all such series. If this is not specified for any series, the default behavior is to average all the series. Setting it for one series will result in that series being charted alone in the range selector."},animatedZooms:{"default":"false",labels:["Interactive Elements"],type:"boolean",description:"Set this option to animate the transition between zoom windows. Applies to programmatic and interactive zooms. Note that if you also set a drawCallback, it will be called several times on each zoom. If you set a zoomCallback, it will only be called after the animation is complete."},plotter:{"default":"[VelChartCanvasRenderer.Plotters.fillPlotter, VelChartCanvasRenderer.Plotters.errorPlotter, VelChartCanvasRenderer.Plotters.linePlotter]",labels:["Data Line display"],type:"array or function",description:"A function (or array of functions) which plot each data series on the chart. TODO(danvk): more details! May be set per-series."},axes:{"default":"null",labels:["Configuration"],type:"Object",description:"Defines per-axis options. Valid keys are 'x', 'y' and 'y2'. Only some options may be set on a per-axis basis. If an option may be set in this way, it will be noted on this page. See also documentation on <a href='http://VelCharts.com/per-axis.html'>per-series and per-axis options</a>."},series:{"default":"null",labels:["Series"],type:"Object",description:"Defines per-series options. Its keys match the y-axis label names, and the values are dictionaries themselves that contain options specific to that series. When this option is missing, it falls back on the old-style of per-series options comingled with global options."},plugins:{"default":"[]",labels:["Configuration"],type:"Array<plugin>",description:"Defines per-graph plugins. Useful for per-graph customization"},dataHandler:{"default":"(depends on data)",labels:["Data"],type:"VelChart.DataHandler",description:"Custom DataHandler. This is an advanced customization. See http://bit.ly/151E7Aq."}},function(){"use strict"
var e,t=function(e){window.console&&window.console.warn(e)},a=["type","default","description"],i=["Annotations","Axis display","Chart labels","CSV parsing","Callbacks","Data","Data Line display","Data Series Colors","Error Bars","Grid","Interactive Elements","Legend","Overall display","Rolling Averages","Series","Value display/formatting","Zooming","Debugging","Configuration","Deprecated"],r={}
for(e=0;e<i.length;e++)r[i[e]]=!0
for(var n in VelChart.OPTIONS_REFERENCE)if(VelChart.OPTIONS_REFERENCE.hasOwnProperty(n)){var s=VelChart.OPTIONS_REFERENCE[n]
for(e=0;e<a.length;e++)s.hasOwnProperty(a[e])?"string"!=typeof s[a[e]]&&t(n+"."+a[e]+" must be of type string"):t("Option "+n+' missing "'+a[e]+'" property')
var o=s.labels
if("object"!=typeof o)t('Option "'+n+'" is missing a "labels": [...] option')
else for(e=0;e<o.length;e++)r.hasOwnProperty(o[e])||t('Option "'+n+'" has label "'+o[e]+'", which is invalid.')}}(),VelChart.DataHandler=function(){},VelChart.DataHandlers={},function(){"use strict"
var e=VelChart.DataHandler
e.X=0,e.Y=1,e.EXTRAS=2,e.prototype.extractSeries=function(e,t,a){},e.prototype.seriesToPoints=function(t,a,i){for(var r=[],n=0;n<t.length;++n){var s=t[n],o=s[1],l=null===o?null:e.parseFloat(o),h={x:NaN,y:NaN,xval:e.parseFloat(s[0]),yval:l,name:a,idx:n+i}
r.push(h)}return this.onPointsCreated_(t,r),r},e.prototype.onPointsCreated_=function(e,t){},e.prototype.rollingAverage=function(e,t,a){},e.prototype.getExtremeYValues=function(e,t,a){},e.prototype.onLineEvaluated=function(e,t,a){},e.prototype.computeYInterpolation_=function(e,t,a){var i=t[1]-e[1],r=t[0]-e[0],n=i/r,s=(a-e[0])*n
return e[1]+s},e.prototype.getIndexesInWindow_=function(e,t){var a=0,i=e.length-1
if(t){for(var r=0,n=t[0],s=t[1];r<e.length-1&&e[r][0]<n;)a++,r++
for(r=e.length-1;r>0&&e[r][0]>s;)i--,r--}return i>=a?[a,i]:[0,e.length-1]},e.parseFloat=function(e){return null===e?NaN:e}}(),function(){"use strict"
VelChart.DataHandlers.DefaultHandler=function(){}
var e=VelChart.DataHandlers.DefaultHandler
e.prototype=new VelChart.DataHandler,e.prototype.extractSeries=function(e,t,a){for(var i=[],r=a.get("logscale"),n=0;n<e.length;n++){var s=e[n][0],o=e[n][t]
r&&0>=o&&(o=null),i.push([s,o])}return i},e.prototype.rollingAverage=function(e,t,a){t=Math.min(t,e.length)
var i,r,n,s,o,l=[]
if(1==t)return e
for(i=0;i<e.length;i++){for(s=0,o=0,r=Math.max(0,i-t+1);i+1>r;r++)n=e[r][1],null===n||isNaN(n)||(o++,s+=e[r][1])
o?l[i]=[e[i][0],s/o]:l[i]=[e[i][0],null]}return l},e.prototype.getExtremeYValues=function(e,t,a){for(var i,r=null,n=null,s=0,o=e.length-1,l=s;o>=l;l++)i=e[l][1],null===i||isNaN(i)||("string"==typeof i&&(i=parseFloat(i)),(null===n||i>n)&&(n=i),(null===r||r>i)&&(r=i))
return[r,n]}}(),function(){"use strict"
VelChart.DataHandlers.DefaultFractionHandler=function(){}
var e=VelChart.DataHandlers.DefaultFractionHandler
e.prototype=new VelChart.DataHandlers.DefaultHandler,e.prototype.extractSeries=function(e,t,a){for(var i,r,n,s,o,l,h=[],d=100,c=a.get("logscale"),p=0;p<e.length;p++)i=e[p][0],n=e[p][t],c&&null!==n&&(n[0]<=0||n[1]<=0)&&(n=null),null!==n?(s=n[0],o=n[1],null===s||isNaN(s)?h.push([i,s,[s,o]]):(l=o?s/o:0,r=d*l,h.push([i,r,[s,o]]))):h.push([i,null,[null,null]])
return h},e.prototype.rollingAverage=function(e,t,a){t=Math.min(t,e.length)
var i,r=[],n=0,s=0,o=100
for(i=0;i<e.length;i++){n+=e[i][2][0],s+=e[i][2][1],i-t>=0&&(n-=e[i-t][2][0],s-=e[i-t][2][1])
var l=e[i][0],h=s?n/s:0
r[i]=[l,o*h]}return r}}(),function(){"use strict"
VelChart.DataHandlers.BarsHandler=function(){VelChart.DataHandler.call(this)},VelChart.DataHandlers.BarsHandler.prototype=new VelChart.DataHandler
var e=VelChart.DataHandlers.BarsHandler
e.prototype.extractSeries=function(e,t,a){},e.prototype.rollingAverage=function(e,t,a){},e.prototype.onPointsCreated_=function(e,t){for(var a=0;a<e.length;++a){var i=e[a],r=t[a]
r.y_top=NaN,r.y_bottom=NaN,r.yval_minus=VelChart.DataHandler.parseFloat(i[2][0]),r.yval_plus=VelChart.DataHandler.parseFloat(i[2][1])}},e.prototype.getExtremeYValues=function(e,t,a){for(var i,r=null,n=null,s=0,o=e.length-1,l=s;o>=l;l++)if(i=e[l][1],null!==i&&!isNaN(i)){var h=e[l][2][0],d=e[l][2][1]
h>i&&(h=i),i>d&&(d=i),(null===n||d>n)&&(n=d),(null===r||r>h)&&(r=h)}return[r,n]},e.prototype.onLineEvaluated=function(e,t,a){for(var i,r=0;r<e.length;r++)i=e[r],i.y_top=VelChartLayout.calcYNormal_(t,i.yval_minus,a),i.y_bottom=VelChartLayout.calcYNormal_(t,i.yval_plus,a)}}(),function(){"use strict"
VelChart.DataHandlers.CustomBarsHandler=function(){}
var e=VelChart.DataHandlers.CustomBarsHandler
e.prototype=new VelChart.DataHandlers.BarsHandler,e.prototype.extractSeries=function(e,t,a){for(var i,r,n,s=[],o=a.get("logscale"),l=0;l<e.length;l++)i=e[l][0],n=e[l][t],o&&null!==n&&(n[0]<=0||n[1]<=0||n[2]<=0)&&(n=null),null!==n?(r=n[1],null===r||isNaN(r)?s.push([i,r,[r,r]]):s.push([i,r,[n[0],n[2]]])):s.push([i,null,[null,null]])
return s},e.prototype.rollingAverage=function(e,t,a){t=Math.min(t,e.length)
var i,r,n,s,o,l,h,d=[]
for(r=0,s=0,n=0,o=0,l=0;l<e.length;l++){if(i=e[l][1],h=e[l][2],d[l]=e[l],null===i||isNaN(i)||(r+=h[0],s+=i,n+=h[1],o+=1),l-t>=0){var c=e[l-t]
null===c[1]||isNaN(c[1])||(r-=c[2][0],s-=c[1],n-=c[2][1],o-=1)}o?d[l]=[e[l][0],1*s/o,[1*r/o,1*n/o]]:d[l]=[e[l][0],null,[null,null]]}return d}}(),function(){"use strict"
VelChart.DataHandlers.ErrorBarsHandler=function(){}
var e=VelChart.DataHandlers.ErrorBarsHandler
e.prototype=new VelChart.DataHandlers.BarsHandler,e.prototype.extractSeries=function(e,t,a){for(var i,r,n,s,o=[],l=a.get("sigma"),h=a.get("logscale"),d=0;d<e.length;d++)i=e[d][0],s=e[d][t],h&&null!==s&&(s[0]<=0||s[0]-l*s[1]<=0)&&(s=null),null!==s?(r=s[0],null===r||isNaN(r)?o.push([i,r,[r,r,r]]):(n=l*s[1],o.push([i,r,[r-n,r+n,s[1]]]))):o.push([i,null,[null,null,null]])
return o},e.prototype.rollingAverage=function(e,t,a){t=Math.min(t,e.length)
var i,r,n,s,o,l,h,d,c,p=[],u=a.get("sigma")
for(i=0;i<e.length;i++){for(o=0,d=0,l=0,r=Math.max(0,i-t+1);i+1>r;r++)n=e[r][1],null===n||isNaN(n)||(l++,o+=n,d+=Math.pow(e[r][2][2],2))
l?(h=Math.sqrt(d)/l,c=o/l,p[i]=[e[i][0],c,[c-u*h,c+u*h]]):(s=1==t?e[i][1]:null,p[i]=[e[i][0],s,[s,s]])}return p}}(),function(){"use strict"
VelChart.DataHandlers.FractionsBarsHandler=function(){}
var e=VelChart.DataHandlers.FractionsBarsHandler
e.prototype=new VelChart.DataHandlers.BarsHandler,e.prototype.extractSeries=function(e,t,a){for(var i,r,n,s,o,l,h,d,c=[],p=100,u=a.get("sigma"),g=a.get("logscale"),f=0;f<e.length;f++)i=e[f][0],n=e[f][t],g&&null!==n&&(n[0]<=0||n[1]<=0)&&(n=null),null!==n?(s=n[0],o=n[1],null===s||isNaN(s)?c.push([i,s,[s,s,s,o]]):(l=o?s/o:0,h=o?u*Math.sqrt(l*(1-l)/o):1,d=p*h,r=p*l,c.push([i,r,[r-d,r+d,s,o]]))):c.push([i,null,[null,null,null,null]])
return c},e.prototype.rollingAverage=function(e,t,a){t=Math.min(t,e.length)
var i,r,n,s,o=[],l=a.get("sigma"),h=a.get("wilsonInterval"),d=0,c=0,p=100
for(n=0;n<e.length;n++){d+=e[n][2][2],c+=e[n][2][3],n-t>=0&&(d-=e[n-t][2][2],c-=e[n-t][2][3])
var u=e[n][0],g=c?d/c:0
if(h)if(c){var f=0>g?0:g,v=c,y=l*Math.sqrt(f*(1-f)/v+l*l/(4*v*v)),_=1+l*l/c
i=(f+l*l/(2*c)-y)/_,r=(f+l*l/(2*c)+y)/_,o[n]=[u,f*p,[i*p,r*p]]}else o[n]=[u,0,[0,0]]
else s=c?l*Math.sqrt(g*(1-g)/c):1,o[n]=[u,p*g,[p*(g-s),p*(g+s)]]}return o}}()

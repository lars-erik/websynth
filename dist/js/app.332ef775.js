(function(e){function t(t){for(var n,r,o=t[0],c=t[1],l=t[2],p=0,h=[];p<o.length;p++)r=o[p],a[r]&&h.push(a[r][0]),a[r]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);u&&u(t);while(h.length)h.shift()();return i.push.apply(i,l||[]),s()}function s(){for(var e,t=0;t<i.length;t++){for(var s=i[t],n=!0,o=1;o<s.length;o++){var c=s[o];0!==a[c]&&(n=!1)}n&&(i.splice(t--,1),e=r(r.s=s[0]))}return e}var n={},a={app:0},i=[];function r(t){if(n[t])return n[t].exports;var s=n[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=e,r.c=n,r.d=function(e,t,s){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(s,n,function(t){return e[t]}.bind(null,n));return s},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=t,o=o.slice();for(var l=0;l<o.length;l++)t(o[l]);var u=c;i.push([0,"chunk-vendors"]),s()})({0:function(e,t,s){e.exports=s("56d7")},"0225":function(e,t,s){},"034f":function(e,t,s){"use strict";var n=s("c21b"),a=s.n(n);a.a},"56d7":function(e,t,s){"use strict";s.r(t);s("cadf"),s("551c"),s("097d");var n=s("2b0e"),a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"app"}},[s("h1",[e._v("I friggin' made a sequencer!")]),s("p",[e._v("Press space to toggle playing. Tick boxes to add notes. Drums are only two lower for now, kick and snare.")]),s("div",[s("label",[e._v("BPM Here")]),s("br"),s("input",{directives:[{name:"model",rawName:"v-model",value:e.tempo,expression:"tempo"}],staticClass:"tempo",attrs:{type:"range",min:"30",max:"240"},domProps:{value:e.tempo},on:{__r:function(t){e.tempo=t.target.value}}}),e._v("\n  "+e._s(e.tempo)+"\n  ")]),s("div",[s("label",[e._v("Synth 1")]),s("div",{staticClass:"row"},[s("synth",{attrs:{settings:e.synthSettings[0]}}),s("sequencer",{attrs:{beats:e.tracks[0],currentNote:e.playedNote}})],1)]),s("div",[s("label",[e._v("Synth 2")]),s("div",{staticClass:"row"},[s("synth",{attrs:{settings:e.synthSettings[1]}}),s("sequencer",{attrs:{beats:e.tracks[1],currentNote:e.playedNote}})],1)]),s("div",[s("label",[e._v("Drums")]),s("div",{staticClass:"row"},[s("sequencer",{attrs:{beats:e.tracks[2],currentNote:e.playedNote}})],1)])])},i=[],r=(s("c5f6"),function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"synth"},[s("div",{staticClass:"content"},[s("div",[s("label",[e._v("Shape:")]),s("select",{directives:[{name:"model",rawName:"v-model",value:e.settings.shape,expression:"settings.shape"}],on:{change:function(t){var s=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t});e.$set(e.settings,"shape",t.target.multiple?s:s[0])}}},[s("option",{attrs:{value:"sawtooth"}},[e._v("Saw")]),s("option",{attrs:{value:"sine"}},[e._v("Sine")]),s("option",{attrs:{value:"square"}},[e._v("Square")]),s("option",{attrs:{value:"triangle"}},[e._v("Triangle")])])]),s("div",[s("label",[e._v("Duration:")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.settings.duration,expression:"settings.duration"}],attrs:{type:"range",min:"0",max:"2",step:".05"},domProps:{value:e.settings.duration},on:{__r:function(t){e.$set(e.settings,"duration",t.target.value)}}}),e._v("\n            "+e._s(e.settings.duration)+"\n        ")]),s("div",[s("label",[e._v("Attack:")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.settings.attack,expression:"settings.attack"}],attrs:{type:"range",min:"0",max:"1",step:".01"},domProps:{value:e.settings.attack},on:{__r:function(t){e.$set(e.settings,"attack",t.target.value)}}}),e._v("\n            "+e._s(e.settings.attack)+"\n        ")]),s("div",[s("label",[e._v("Release:")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.settings.release,expression:"settings.release"}],attrs:{type:"range",min:"0",max:"1",step:".01"},domProps:{value:e.settings.release},on:{__r:function(t){e.$set(e.settings,"release",t.target.value)}}}),e._v("\n            "+e._s(e.settings.release)+"\n        ")]),s("div",[s("label",[e._v("Gain:")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.settings.gain,expression:"settings.gain"}],attrs:{type:"range",min:"0",max:"1",step:".01"},domProps:{value:e.settings.gain},on:{__r:function(t){e.$set(e.settings,"gain",t.target.value)}}}),e._v("\n            "+e._s(e.settings.gain)+"\n        ")]),s("div",[s("label",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.settings.enableLowpass,expression:"settings.enableLowpass"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.settings.enableLowpass)?e._i(e.settings.enableLowpass,null)>-1:e.settings.enableLowpass},on:{change:function(t){var s=e.settings.enableLowpass,n=t.target,a=!!n.checked;if(Array.isArray(s)){var i=null,r=e._i(s,i);n.checked?r<0&&e.$set(e.settings,"enableLowpass",s.concat([i])):r>-1&&e.$set(e.settings,"enableLowpass",s.slice(0,r).concat(s.slice(r+1)))}else e.$set(e.settings,"enableLowpass",a)}}}),e._v(" Lowpass")]),e._v("\n            "+e._s(e.settings.enableLowpass)+"\n        ")]),s("div",[s("label",[e._v("Cutoff:")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.settings.lowpassFreq,expression:"settings.lowpassFreq"}],attrs:{type:"range",min:"0",max:"10000",step:"10"},domProps:{value:e.settings.lowpassFreq},on:{__r:function(t){e.$set(e.settings,"lowpassFreq",t.target.value)}}})]),s("div",[s("label",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.settings.enableHighpass,expression:"settings.enableHighpass"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.settings.enableHighpass)?e._i(e.settings.enableHighpass,null)>-1:e.settings.enableHighpass},on:{change:function(t){var s=e.settings.enableHighpass,n=t.target,a=!!n.checked;if(Array.isArray(s)){var i=null,r=e._i(s,i);n.checked?r<0&&e.$set(e.settings,"enableHighpass",s.concat([i])):r>-1&&e.$set(e.settings,"enableHighpass",s.slice(0,r).concat(s.slice(r+1)))}else e.$set(e.settings,"enableHighpass",a)}}}),e._v(" Highpass")])]),s("div",[s("label",[e._v("Cutoff:")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.settings.highpassFreq,expression:"settings.highpassFreq"}],attrs:{type:"range",min:"0",max:"10000",step:"10"},domProps:{value:e.settings.highpassFreq},on:{__r:function(t){e.$set(e.settings,"highpassFreq",t.target.value)}}}),e._v("\n            "+e._s(e.settings.highpassFreq)+"\n        ")]),s("div",[s("label",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.settings.enableLfo,expression:"settings.enableLfo"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.settings.enableLfo)?e._i(e.settings.enableLfo,null)>-1:e.settings.enableLfo},on:{change:function(t){var s=e.settings.enableLfo,n=t.target,a=!!n.checked;if(Array.isArray(s)){var i=null,r=e._i(s,i);n.checked?r<0&&e.$set(e.settings,"enableLfo",s.concat([i])):r>-1&&e.$set(e.settings,"enableLfo",s.slice(0,r).concat(s.slice(r+1)))}else e.$set(e.settings,"enableLfo",a)}}}),e._v(" LFO")])]),s("div",[s("label",[e._v("Shape:")]),s("select",{directives:[{name:"model",rawName:"v-model",value:e.settings.lfoShape,expression:"settings.lfoShape"}],on:{change:function(t){var s=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t});e.$set(e.settings,"lfoShape",t.target.multiple?s:s[0])}}},[s("option",{attrs:{value:"square"}},[e._v("Square")]),s("option",{attrs:{value:"sine"}},[e._v("Sine")])])]),s("div",[s("label",[e._v("Frequency:")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.settings.lfoFreq,expression:"settings.lfoFreq"}],attrs:{type:"range",min:"0",max:"25",step:".01"},domProps:{value:e.settings.lfoFreq},on:{__r:function(t){e.$set(e.settings,"lfoFreq",t.target.value)}}}),e._v("\n            "+e._s(e.settings.lfoFreq)+"\n        ")])])])}),o=[],c={name:"synth",props:["settings"],data:function(){return{}},created:function(){}},l=c,u=(s("c9c9"),s("2877")),p=Object(u["a"])(l,r,o,!1,null,null,null);p.options.__file="Synth.vue";var h=p.exports,v=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"sequencer"},[e._l(e.beats,function(t,n){return s("span",{key:n,style:e.beatStyle(n)},e._l(e.freqs,function(t,a){return s("span",{key:a,style:e.freqStyle(n,a)},[s("label",{class:e.freqClass(n,a)},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.beats[n][a],expression:"beats[$bindex][$findex]"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.beats[n][a])?e._i(e.beats[n][a],null)>-1:e.beats[n][a]},on:{change:function(t){var s=e.beats[n][a],i=t.target,r=!!i.checked;if(Array.isArray(s)){var o=null,c=e._i(s,o);i.checked?c<0&&e.$set(e.beats[n],a,s.concat([o])):c>-1&&e.$set(e.beats[n],a,s.slice(0,c).concat(s.slice(c+1)))}else e.$set(e.beats[n],a,r)}}})])])}))}),s("pre",[e._v(e._s(e.currentNote))])],2)},g=[],d=[220,233.08,246.94,261.63,277.18,293.66,311.13,329.63,349.23,369.99,392,415.3,440],m={name:"sequencer",props:["beats","currentNote"],data:function(){return{freqs:d,debugOutput:""}},created:function(){},methods:{toggle:function(e,t){var s=this.beats[e].indexOf(t);s>-1?this.beats[e].splice(s,1):this.beats[e].push(t),n["a"].set(this,"debugOutput",JSON.stringify(this.beats)),n["a"].set(this.beats,e,this.beats[e])},beatStyle:function(e){return{position:"absolute",left:10+20*e+"px",width:"20px"}},freqStyle:function(e,t){return{position:"absolute",top:20*d.length-20*(t+1)+"px",width:"20px",height:"20px"}},freqClass:function(e,t){return this.beats[e][t]?e==this.currentNote?"active":"selected":""}}},f=m,b=(s("9ed1"),Object(u["a"])(f,v,g,!1,null,null,null));b.options.__file="Sequencer.vue";var x=b.exports,y=[220,233.08,246.94,261.63,277.18,293.66,311.13,329.63,349.23,369.99,392,415.3,440],_=25,w=.02,T={name:"app",data:function(){return{tempo:90,tracks:[[],[],[]],debugOutput:"",ctx:null,synthSettings:[{shape:"sawtooth",duration:2,attack:.1,release:.5,gain:.05,enableLowpass:!0,lowpassFreq:400,enableHighpass:!0,highpassFreq:2e3,enableLfo:!0,lfoFreq:4,lfoShape:"square"},{shape:"sine",duration:2,attack:.1,release:.5,gain:.05,enableLowpass:!0,lowpassFreq:400,enableHighpass:!0,highpassFreq:2e3,enableLfo:!1,lfoFreq:.5,lfoShape:"square"}],currentNote:0,playedNote:0,nextNoteTime:0,timer:null,playing:!0}},components:{Sequencer:x,Synth:h},created:function(){for(var e=0;e<this.tracks.length;e++)for(var t=0;t<64;t++){this.tracks[e][t]=[];for(var s=0;s<y.length;s++)this.tracks[e][t][s]=!1}this.ctx=new window.AudioContext,"suspended"===this.ctx.state&&this.ctx.resume(),this.scheduler(),window.addEventListener("keypress",this.togglePlay)},destroyed:function(){clearTimeout(this.timer),window.removeEventListener("keypress",this.togglePlay)},methods:{togglePlay:function(e){32===e.keyCode&&(this.playing?window.clearTimeout(this.timer):("suspended"===this.ctx.state&&this.ctx.resume(),this.currentNote=0,this.nextNoteTime=this.ctx.currentTime,this.scheduler()),this.playing=!this.playing)},nextNote:function(){var e=60/(4*this.tempo);this.nextNoteTime+=e,this.playedNote=this.currentNote,this.currentNote++,64===this.currentNote&&(this.currentNote=0)},scheduler:function(){var e=this;while(this.nextNoteTime<this.ctx.currentTime+w)this.saw(this.synthSettings[0],0),this.saw(this.synthSettings[1],1),this.bassDrum(),this.nextNote();this.timer=setTimeout(function(){return e.scheduler()},_)},saw:function(e,t){for(var s=this.tracks[t][this.currentNote]||[],n=0;n<y.length;n++)if(s[n]){var a=this.ctx.createOscillator();a.type=e.shape,a.frequency.value=y[n];var i=this.ctx.createGain();i.gain.cancelScheduledValues(this.ctx.currentTime),i.gain.setValueAtTime(1,this.ctx.currentTime);var r=this.ctx.createGain();r.gain.cancelScheduledValues(this.ctx.currentTime),r.gain.setValueAtTime(0,this.ctx.currentTime),r.gain.linearRampToValueAtTime(Number(e.gain),this.ctx.currentTime+Number(e.attack)),r.gain.linearRampToValueAtTime(0,this.ctx.currentTime+Number(e.duration)-Number(e.release));var o=this.ctx.createBiquadFilter();o.type="highpass",o.frequency.value=e.highpassFreq;var c=this.ctx.createBiquadFilter();c.type="lowpass",c.frequency.value=e.lowpassFreq;var l=[];if(e.enableLowpass&&l.push(a.connect(c).connect(i).connect(r)),e.enableHighpass&&l.push(a.connect(o).connect(i).connect(r)),0===l.length&&l.push(a.connect(i).connect(r)),e.enableLfo){var u=this.ctx.createOscillator();u.type=e.lfoShape,u.frequency.setValueAtTime(e.lfoFreq,this.ctx.currentTime),u.connect(i.gain),u.start(),u.stop(this.ctx.currentTime+Number(e.duration))}for(var p=0;p<l.length;p++)l[p].connect(this.ctx.destination);a.start(),a.stop(this.ctx.currentTime+Number(e.duration))}},bassDrum:function(){var e=this.tracks[2][this.currentNote]||[];if(e[y.indexOf(220)]){var t=this.ctx.createOscillator();t.frequency.value=80;var s=this.ctx.createGain();s.gain.cancelScheduledValues(this.ctx.currentTime),s.gain.setValueAtTime(0,this.ctx.currentTime),s.gain.linearRampToValueAtTime(4,this.ctx.currentTime+.005),s.gain.linearRampToValueAtTime(0,this.ctx.currentTime+.03),t.connect(s).connect(this.ctx.destination),t.start(),t.stop(this.ctx.currentTime+.05)}if(e[y.indexOf(233.08)]){for(var n=this.ctx.sampleRate,a=this.ctx.createBuffer(1,n,this.ctx.sampleRate),i=a.getChannelData(0),r=0;r<n;r++)i[r]=2*Math.random()-1;var o=this.ctx.createBufferSource();o.buffer=a;var c=this.ctx.createBiquadFilter();c.type="highpass",c.frequency.value=1e3,o.connect(c);var l=this.ctx.createGain();l.gain.setValueAtTime(1,this.ctx.currentTime),l.gain.exponentialRampToValueAtTime(.01,this.ctx.currentTime+.2),c.connect(l),l.connect(this.ctx.destination);var u=this.ctx.createOscillator();u.type="triangle",u.frequency.setValueAtTime(100,this.ctx.currentTime);var p=this.ctx.createGain();p.gain.setValueAtTime(.7,this.ctx.currentTime),p.gain.exponentialRampToValueAtTime(.01,this.ctx.currentTime+.1),u.connect(p),p.connect(this.ctx.destination),o.start(this.ctx.currentTime),u.start(this.ctx.currentTime),o.stop(this.ctx.currentTime+.2),u.stop(this.ctx.currentTime+.2)}}}},q=T,N=(s("034f"),Object(u["a"])(q,a,i,!1,null,null,null));N.options.__file="App.vue";var k=N.exports;n["a"].config.productionTip=!1,new n["a"]({render:function(e){return e(k)}}).$mount("#app")},"9ed1":function(e,t,s){"use strict";var n=s("0225"),a=s.n(n);a.a},"9f62":function(e,t,s){},c21b:function(e,t,s){},c9c9:function(e,t,s){"use strict";var n=s("9f62"),a=s.n(n);a.a}});
//# sourceMappingURL=app.332ef775.js.map
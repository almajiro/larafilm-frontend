import Vue from 'vue'
import videojs from 'video.js'

/*
import 'videojs-hls-quality-selector'
import 'videojs-quality-picker'
*/

console.log('file loaded')

var Plugin = videojs.getPlugin('plugin')
var larafilm = videojs.extend(Plugin, {
  constructor: function(player, options) {
    Plugin.call(this, player, options)

    var textDisplay = document.createElement('div')
    textDisplay.className = 'vjs-larafilm'
    player.el().appendChild(textDisplay)

    var infoDisplay = document.createElement('div')
    infoDisplay.className = 'vjs-info'
    textDisplay.appendChild(infoDisplay)

    var back = document.createElement('a')
    back.href = options.back
    back.className = 'vjs-back'
    back.innerHTML = '<i class="far fa-arrow-alt-circle-left"></i>'
    infoDisplay.appendChild(back)


    var title = document.createElement('p')
    title.classNmae = 'vjs-title'
    title.innerHTML = options.title
    infoDisplay.appendChild(title)

    if ('series' in options) {
      if (options.logo !== '') {
        var logo = document.createElement('img')
        logo.className = 'logo'
        logo.src = options.logo
        infoDisplay.appendChild(logo)
        console.log('logo set')
        console.log(options.logo)
      } else {
        var series = document.createElement('p')
        series.classNmae = 'vjs-season'
        series.innerHTML = options.series
        infoDisplay.appendChild(series)
      }
    }


    var time = document.createElement('p')
    time.classNmae = 'vjs-season'
    infoDisplay.appendChild(time)

    setInterval(function () {
      //var t = new Date(1970, 0, 1);
      //t.setSeconds(player.currentTime());
      time.innerHTML = parseInt(player.currentTime()) + '/' + parseInt(player.duration())
      //time.innerHTML = parseInt(t.toTimeString()) + '/' + parseInt(player.duration())

      var timeDisplay = document.getElementsByClassName("vjs-time-control");
      timeDisplay.innerHTML ='testing'
    }, 1000);

    var img = document.createElement('img')
    img.className = 'poster'
    img.src = options.poster
    textDisplay.appendChild(img)

    player.on('playing', function() {
      videojs.log(options.title)
    });

    var userActivity = false

    player.on('mousemove', function() {
      userActivity = true
      textDisplay.setAttribute('style', 'opacity: 1;')
    })

    setInterval(function() {

      // Check to see if the mouse has been moved
      if (userActivity) {

        // Reset the activity tracker
        userActivity = false;

        // In X seconds, if no more activity has occurred
        // the user will be considered inactive
        setTimeout(function() {
          // Protect against the case where the inactivity timeout can trigger
          // before the next user activity is picked up  by the
          // activityCheck loop.
          if (!userActivity && !player.paused()) {
            textDisplay.setAttribute('style', 'opacity: 0;')
          }
        }, 6000);
      }
    }, 50);
    player.on('pause', function () {
      console.log('paused')
      textDisplay.setAttribute('style', 'opacity: 1;')
    })



    console.log('larafilm')
  }
});

videojs.registerPlugin('larafilm', larafilm)

window.videojs = videojs

import '@videojs/http-streaming'
/*
require('videojs-hls-quality-selector')
require('videojs-quality-picker')
*/

//videojs.hlsQualitySelector()

const VueVideoPlayer = require('vue-video-player/src/index.js')
Vue.use(VueVideoPlayer)

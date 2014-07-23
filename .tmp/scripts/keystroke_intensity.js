(function() {
  var AudioElement, DELETE_KEY_CODE, INTERVAL_MILLISECONDS, MAX_ARRAY_FOR_GC, SLICING_ARRAY_LENGTH, TIME_FOR_BUFFER_MILLISECONDS, analyserNode, audioElements, checkRecent, context, func, play, recentAudio;

  TIME_FOR_BUFFER_MILLISECONDS = 70;

  SLICING_ARRAY_LENGTH = 10;

  INTERVAL_MILLISECONDS = 10;

  DELETE_KEY_CODE = 8;

  MAX_ARRAY_FOR_GC = 1000;

  context = new webkitAudioContext();

  analyserNode = context.createAnalyser();

  audioElements = [];

  recentAudio = [];

  AudioElement = (function() {
    function AudioElement(args) {
      this.timeDomainData = args.timeDomainData;
      this.freqData = args.freqData;
    }

    return AudioElement;

  })();

  (function($) {
    return $.fn.keystroke_intensity = function(config) {
      var defaults, options;
      defaults = {
        keytouch: function(e, volume) {
          return console.log(e, volume);
        },
        deleteKeyDown: function(e, volume) {
          return console.log(e, volume);
        }
      };
      options = $.extend(defaults, config);
      return $(this).on('keydown', function(e) {
        if (e.keyCode === DELETE_KEY_CODE) {
          setTimeout(function() {
            return options.deleteKeyDown(e, checkRecent());
          }, TIME_FOR_BUFFER_MILLISECONDS);
          return false;
        }
      }).on('keypress', function(e) {
        return setTimeout(function() {
          return options.keytouch(e, checkRecent());
        }, TIME_FOR_BUFFER_MILLISECONDS);
      });
    };
  })(jQuery);

  checkRecent = function() {
    var maxVolume, recentMaxVolumes;
    recentAudio = audioElements.slice(-SLICING_ARRAY_LENGTH);
    recentMaxVolumes = recentAudio.map(function(i) {
      return Math.max.apply(null, i.timeDomainData);
    });
    console.log(recentMaxVolumes);
    return maxVolume = Math.max.apply(null, recentMaxVolumes) - 127;
  };

  setInterval(function() {
    var freqData, timeDomainData;
    timeDomainData = new Uint8Array(analyserNode.fftSize);
    freqData = new Uint8Array(analyserNode.frequencyBinCount);
    analyserNode.getByteTimeDomainData(timeDomainData);
    analyserNode.getByteFrequencyData(freqData);
    audioElements.push(new AudioElement({
      timeDomainData: timeDomainData,
      freqData: freqData
    }));
    if (audioElements.length > MAX_ARRAY_FOR_GC) {
      return audioElements.splice(0, MAX_ARRAY_FOR_GC - SLICING_ARRAY_LENGTH);
    }
  }, INTERVAL_MILLISECONDS);

  func = function() {
    return console.log('You may use Chrome 35');
  };

  play = function() {
    return navigator.webkitGetUserMedia({
      video: false,
      audio: true
    }, function(stream) {
      var source;
      source = context.createMediaStreamSource(stream);
      return source.connect(analyserNode);
    }, function() {
      return func();
    });
  };

  play();

}).call(this);

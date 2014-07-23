TIME_FOR_BUFFER_MILLISECONDS = 70
SLICING_ARRAY_LENGTH = 10
INTERVAL_MILLISECONDS = 10
DELETE_KEY_CODE = 8
MAX_ARRAY_FOR_GC = 1000

context = new webkitAudioContext()
analyserNode = context.createAnalyser()
audioElements = []; recentAudio = [];

class AudioElement
  constructor: (args) ->
    @timeDomainData = args.timeDomainData
    @freqData = args.freqData

do ($=jQuery) ->
  $.fn.keystroke_intensity = (config) ->
    defaults =
      keytouch: (e, volume) -> console.log(e, volume)
      deleteKeyDown: (e, volume) -> console.log(e, volume)
    options = $.extend(defaults, config)
    $(this).on 'keydown', (e) ->
      if e.keyCode == DELETE_KEY_CODE
        setTimeout ->
          options.deleteKeyDown(e, checkRecent())
        , TIME_FOR_BUFFER_MILLISECONDS
        return false
    .on 'keypress', (e) ->
      setTimeout ->
        options.keytouch(e, checkRecent())
      , TIME_FOR_BUFFER_MILLISECONDS

checkRecent = () ->
  recentAudio = audioElements.slice(-SLICING_ARRAY_LENGTH)
  recentMaxVolumes = recentAudio.map (i) ->
    Math.max.apply null, i.timeDomainData
  console.log(recentMaxVolumes)
  maxVolume = Math.max.apply(null, recentMaxVolumes) - 127

setInterval ->
  timeDomainData = new Uint8Array analyserNode.fftSize
  freqData = new Uint8Array analyserNode.frequencyBinCount

  analyserNode.getByteTimeDomainData timeDomainData
  analyserNode.getByteFrequencyData freqData

  audioElements.push new AudioElement
    timeDomainData: timeDomainData,
    freqData: freqData

  if audioElements.length > MAX_ARRAY_FOR_GC
    audioElements.splice(0, MAX_ARRAY_FOR_GC - SLICING_ARRAY_LENGTH)
, INTERVAL_MILLISECONDS

func = () -> console.log('You may use Chrome 35')

play = () ->
  navigator.webkitGetUserMedia video:false, audio:true, (stream) ->
    source = context.createMediaStreamSource stream
    source.connect analyserNode
  , -> func()

play()

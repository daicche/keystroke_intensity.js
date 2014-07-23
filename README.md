## Keystroke intensity

You will get the `intensity` of keystroke in real time.

## Requirements
- Laptop with build-in microphone
- Google Chrome

## How it works
It regards the volume from microphone as intencity of keystroke.

## Demo
http://o.l0o0l.co
(In the page, please allow to use your microphone)

![](http://gyazo.l0o0l.co/img/2014-07-23/c20c02009ae19651db43cd6241e3aa67.png)


### Installation

```
<script src="/path/to/jquery.js"></script>
<script src="/path/to/keystroke_intensity.js"></script>

```

### Example of usage

```
<script type="text/javascript">

  // the simplest example
  $(window).keystroke_intensity() // => console.log `keystroke info`

  // you can use in your web app
  $('input').keystroke_intensity = {
    keytouch: function(e, volume) {
      // you can add some codes here
      console.log(String.fromCharCode(e.keyCode))
      console.log('volume:', volume)
      // and some functions
    },
    deleteKeyDown: function(e, volume){
      // you also do something here
      console.log('Delete key is pressed')
      console.log('volume:', volume)
    }
  }
</script>

```

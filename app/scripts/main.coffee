# here is sample

$('input').keystroke_intensity
  keytouch: (e, volume) ->
    char = String.fromCharCode(e.keyCode)

    console.log(char)
    console.log(volume)

    char_size = volume * 2 + 20
    char_with_size = "<span class='char' style='font-size:" +
                     char_size + "px;'>" +
                     char + "</span>"
    $('#chars').append(char_with_size)

  deleteKeyDown: (e, volume) ->
    if volume > 100
      $('.char').remove()
    else
      $('.char:last').remove()
    console.log(volume)
    e.preventDefault() # prevent browser from backing page

$('.text_input_area input')
.css(border: '2px solid #e74c3c')
.on 'focus', ->
  $(this).attr('placeholder', 'Type something')
    .css(border: '2px solid #5cb85c')
.on 'blur', ->
  $(this).attr('placeholder', 'Click here')
    .css(border: '2px solid #e74c3c')

$(document).ready ->
  $('.text_input_area input').focus()

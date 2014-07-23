(function() {
  $('input').keystroke_intensity({
    keytouch: function(e, volume) {
      var char, char_size, char_with_size;
      char = String.fromCharCode(e.keyCode);
      console.log(char);
      console.log(volume);
      char_size = volume * 2 + 20;
      char_with_size = "<span class='char' style='font-size:" + char_size + "px;'>" + char + "</span>";
      return $('#chars').append(char_with_size);
    },
    deleteKeyDown: function(e, volume) {
      if (volume > 100) {
        $('.char').remove();
      } else {
        $('.char:last').remove();
      }
      console.log(volume);
      return e.preventDefault();
    }
  });

  $('.text_input_area input').css({
    border: '2px solid #e74c3c'
  }).on('focus', function() {
    return $(this).attr('placeholder', 'Type something').css({
      border: '2px solid #5cb85c'
    });
  }).on('blur', function() {
    return $(this).attr('placeholder', 'Click here').css({
      border: '2px solid #e74c3c'
    });
  });

  $(document).ready(function() {
    return $('.text_input_area input').focus();
  });

}).call(this);

$(document).ready(function() {
  var initialTextCleared = false;
  
  if(location.hash != "") {
    initialTextCleared = true;
    $('#composeTextarea').val(decodeURI(location.hash.substr(1)));
  }
  
  function updatePreview() {
    var input = $('#composeTextarea').val();
    $('#previewArea').html(texify(input));
    location.hash = encodeURI(input);
  }
  
  $('#composeTextarea').keyup(function(e) {
    updatePreview();
  }).keyup();
  
  
  if(!initialTextCleared) {
    setTimeout("$('#composeTextarea').focus().select();", 50);
  }
    
  initTexbar(false, '#composeTextarea');
});

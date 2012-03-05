// initialize sound
soundManager.url = '/static/swf/';
soundManager.useFlashBlock = false;

soundManager.onready(function() {
  soundManager.createSound({
    id: 'notify',
    url: '/static/snd/sound_1.mp3'
  });
});

var pageTitle = "MathIM: LaTeX web-based chat";
function setChannelName(cN) {
  pageTitle = "MathIM: " + cN;
  $('#channelName').text(cN);
}

function addToLog(html, prepend) {
  if(prepend) {
    $('#chatLog').prepend(html);
  } else {
    $('#chatLog').append(html);
  }
  
  $('#chatLog').scrollTop($('#chatLog')[0].scrollHeight);
  
  if(soundManager && soundManager.ok()) {
    soundManager.play('notify');
  }
}

var timestampHidden = false;
function timestampSpan() {
  if (timestampHidden) {
    return "<span class='timestamp' style='display:none;'>";
  } else {
    return "<span class='timestamp'>";
  }
}

function sysMessage(timestamp, message, prepend) {
  var html = "<p class='message sysMessage'>" +
             timestampSpan() + timestamp + "</span> " +
             "* " + message + "</p>\n";
  
  addToLog(html, prepend);
}

function chatMessage(timestamp, nick, message, prepend) {
  var mathedMsg = mathFilter(message);
  var html = "<p class='message chatMessage'>" +
             timestampSpan() + timestamp + "</span> " +
             "&lt;" + nick + "&gt; " + mathedMsg + "</p>\n";
  
  addToLog(html, prepend);
  MathJax.Hub.Update();
}

function initializeTopButtons() {
  $('#btnTimestamps').click(function() {
    $('.timestamp').toggle();
    timestampHidden = !timestampHidden;
  });
  
  var userlistHidden = false;
  $('#btnUserlist').click(function() {
    if(userlistHidden) {
      $('#chatUserlist').show();
    } else {
      $('#chatUserlist').hide();
    }
    userlistHidden = !userlistHidden;
  });
}

function initializeChatInput() {
  var initialTextCleared = false;
  
  $('#composeTextarea').keypress(function(e) {
    initialTextCleared = true;
    
    var DOM_VK_RETURN = 13;
    
    if(e.which == DOM_VK_RETURN && !e.shiftKey) {
      if($('#composeTextarea').val() != "") {
        $('#composeSubmitBtn').click();
		MathJax.Hub.Update();
      }
      return false;
    }
  });
  
  $('#composeSubmitBtn').click(function() {
    setTimeout("$('#composeTextarea').val('').focus();", 10);
    MathJax.Hub.Update();
  });
  
  function updatePreview() {
    $('#previewArea').html(mathFilter($('#composeTextarea').val()));
  }
  
  $('#composeTextarea').keyup(function(e) {
    updatePreview();
    MathJax.Hub.Update();
  }).keyup(); // trigger to move input text over
  
  //$('#composeTextarea').focus().select();
  setTimeout("$('#composeTextarea').focus().select();", 50);
  initTexbar(true, '#composeTextarea');
}


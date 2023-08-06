$(function () {
  const socket = io();
  let username = "";

  $('#joinButton').click(function () {
    username = $('#input').val();
    if (username.trim() !== "") {
      $('#joinButton').hide();
      $('#sendButton').show();
      $('#input').attr('placeholder', 'Enter message');
      checkInput();
      $('#input').val('');
    }
  });

  function checkInput() {
    const message = $('#input').val().trim();
    if (message !== "") {
      $('#sendButton').prop('disabled', false);
    } else {
      $('#sendButton').prop('disabled', true);
    }
  }

  $('#sendButton').click(function () {
    sendMessage();
  });

  $('#input').keyup(checkInput);

  $('#input').keypress(function (event) {
    if (event.which === 13) {
      if ($('#joinButton').is(':visible')) {
        $('#joinButton').click();
      } else {
        sendMessage();
      }
    }
  });

  function sendMessage() {
    const message = username + ': ' + $('#input').val();
    if (message.trim() !== "") {
      socket.emit('chat message', message);
      $('#input').val('');
      checkInput();
    }
  }

  $(document).on('keydown', function (event) {
    if (event.which === 13 && $('#sendButton').prop('disabled')) {
      event.preventDefault();
    }
  });

  socket.on('chat message', function (msg) {
    $('#messages').append($('<li>').text(msg));
  });
});
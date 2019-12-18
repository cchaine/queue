ws = new WebSocket("ws://10.32.10.118:8001");
ws.onopen = function(event) {
	message = { command: "refresh" }
	ws.send(JSON.stringify(message));
}

ws.onmessage = function(event) {
  message = JSON.parse(event.data);
  if(message.command == "refresh") {
	list = []
	for(let i = 0; i < message.queue.length; i++) {
		list.push("<div class='entry " + (i == message.current ? "active" : "") + "'><label>" + message.queue[i] + "</label><div class='spacer'></div><button class='btn btn-outline-danger btn-sm' onclick='send_remove(" + i + ")'>Supprimer</button></div>");
	}
	document.getElementById("body").innerHTML = list.join("");
	
	current = message.queue[message.current]
	document.getElementById("current-name").innerHTML = current != undefined ? current : "Libre";
  }
}

ws.onclose = function(event) {
  document.location.reload(true);
}

function send_next() {
  message = { command : "next" };
  ws.send(JSON.stringify(message));
}

function send_new() {
  name = document.getElementById("name-input").value;
  message = { command : "new", name : name };
  ws.send(JSON.stringify(message));
}

function send_remove(index) {
	message = { command : "remove", index : index }
	ws.send(JSON.stringify(message));
}

$(document).ready(function() {
  $('#name-input').on('keyup', function() {
    let empty = false;

    $('#name-input').each(function() {
      empty = $(this).val().length == 0;
    });

    if (empty)
      $('#save').attr('disabled', 'disabled');
    else
      $('#save').attr('disabled', false);
  });
});
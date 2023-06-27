var socket_url = $('meta[name="socket-url"]').attr("content");
console.log(socket_url);
var socket = io(socket_url, {
    transports: ["websocket", "polling", "flashsocket"],
});
console.log(socket);
socket.on("connect", function () {
    console.log("Working good socket");
});

socket.on("message_receive", (data) => {
    var message = data.message;
    console.log(message);
    var chat_id = $(".chat-id").val();
    if (message.sender_id != 0) {
        if (chat_id == message.chat_id) {
            var user = message.user;
            // if (message.type == 'text') {
            var receiver_msg_type = `<p>` + message.text + `</p>`;
            // }
            var user_img = $(".chat-user-img").attr("src");
            var receiver_message =
                `<div class="incoming_msg mt-5 mb-3">
            <div class="incoming_msg_img"> <img src="` +
                user_img +
                `" alt=""> </div>
            <div class="received_msg">
              <div class="received_withd_msg">
                ` +
                receiver_msg_type +
                `
                <span class="time_date"> ` +
                formatAMPM(message.createdAt) +
                `</span>
                </div>
            </div>
          </div>`;
            $(".msg_history").append(receiver_message);
            var d = $(".msg_history");
            d.scrollTop(d.prop("scrollHeight"));
            get_current_chats(true, chat_id);
        } else {
            get_current_chats(false, chat_id);
        }
    }
});

socket.on("message_send", (data) => {
    console.log("message_send => " + data);
});

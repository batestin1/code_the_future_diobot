function autoScroolChatContainer(){
    $("#chat-container").animate({
    scrollTop: $('#chat-container')[0].scrollHeight - $('#chat-container')[0].clientHeight
    }, 1000);
}

function goRenderizeWidgetChatMessage(originUser, message) {
    let currentDate = new Date(); 
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes().toString();
    if (minutes.length === 1) {
        minutes = '0' + minutes;
    }
    let time = hours + ':' + minutes;

    if (originUser == 'bot') {
        var icon = 'robot';
        var color = 'dark';
    } else {
        var icon = 'person-fill';
        var color = 'success';
    }

    let messageWidget = `<div class="row">
                            <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                                <i class="bi bi-${icon} fs-2 text-${color}"></i>
                            </div>
                            <div class="col-xs-11 col-sm-11 col-md-3 col-lg-3 text-center">
                                <div class="badge bg-${color} bg-gradient text-wrap mt-3">
                                    ${message}
                                </div>
                                <p class="text-muted"><small>${time}</small></p>
                            </div>  
                        </div>`;

    $('#chat-container').append(messageWidget);

    autoScroolChatContainer();
}

function startLoading(){
    $("#input-question").val('Wait for the Dio Bot...').prop('readonly', true);
    $("#btn-send-question").prop('disabled', true);
}

function stopLoading(){
    $("#input-question").val('').prop('readonly', false);
    $("#btn-send-question").prop('disabled', false);
}

function goSendQuestion(question){
    if(question){
        goRenderizeWidgetChatMessage('user', question);
        startLoading();
        $.getJSON('/api', {
            user_input: question
        }, function(data) {
            goRenderizeWidgetChatMessage('bot', data);
            stopLoading();
        });
        return false;
    }
}

$( document ).ready(function() {
    //the initial bot message after two seconds
    setTimeout(goRenderizeWidgetChatMessage, 2000, 'bot', "Hi, I'm Dio Bot, how can I help you ?");
});

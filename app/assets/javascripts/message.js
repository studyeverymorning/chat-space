$(function() {
  function buildHTML(message){
    image = ( message.image ) ? `
    <img class= "lower-message__image" src=${message.image} >` : "";
    var html =
      `<div class="main__message__box" data-message-id= "${message.id}">
        <div class="main__message__box__top">
          <div class="main__message__box__top__name">
            ${message.user_name}
          </div>
          <div class="main__message__box__top__time">
            ${message.date}
          </div>
        </div>
        <div class="main__message__box__text">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>
        ${image}
      </div>`
    return html;
  }
   
  
  

  $('#new_message').on('submit',function(e) {
    e.preventDefault(); 
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
	  .done(function(data){
		  var html = buildHTML(data);
	  	$('.main__message').append(html);
      $('.main__message').animate({scrollTop: $('.main__message')[0].scrollHeight}, 'fast');//最新のメッセージが一番下に表示されようにスクロールする。
	  	$("#new_message")[0].reset();
	  	$(".main__footer__send-button").prop('disabled', false);
	  })
	  .fail(function(){
	    alert('メッセージの送信に失敗しました。');
    });
  });
  

  var reloadMessages = function () {
    
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      console.log("hello");
      var last_message_id = $('.main__message__box:last').data('message-id');
      
      $.ajax({
        url: "api/messages",
        data: { id: last_message_id },
        type: "GET",
        dataType: 'json'
      })
      .done(function(messages){
        
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML += buildHTML(message);         
        })
        $('.main__message').append(insertHTML);
        $('.main__message').animate({scrollTop: $('.main__message')[0].scrollHeight}, 'fast');//最新のメッセージが一番下に表示されようにスクロールする。
      })
      .fail(function(data){
        alert('自動更新に失敗しました。');
      });
    }  
  }
  setInterval(reloadMessages, 5000);//5000ミリ秒ごとにreloadMessagesという関数を実行し自動更新を行う。 
});

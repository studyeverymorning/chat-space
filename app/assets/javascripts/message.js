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
	  	$('.main__footer__text').val('');
	  	$(".main__footer__send-button").prop('disabled', false);
	  })
	  .fail(function(){
	    alert('error1');
    });
  });
  

  var reloadMessages = function () {
    
    if (window.location.href.match(/\/groups\/\d+\/messages/))
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
          insertHTML = buildHTML(message);         
        })
        $('.main__message').append(insertHTML);
        $('.main__message').animate({scrollTop: $('.main__message')[0].scrollHeight}, 'fast');//最新のメッセージが一番下に表示されようにスクロールする。
      })
      .fail(function(data){
        alert('error2');
      });
    
  }
  setInterval(reloadMessages, 5000);//5000ミリ秒ごとにreloadMessagesという関数を実行し自動更新を行う。
 
});

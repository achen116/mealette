$(document).ready(function(){

  $('body').on('swipeleft', function(){
    $('.next').trigger('click');
  });

  $('body').on('swiperight', function(){
    $('.prev').trigger('click');
  });

});

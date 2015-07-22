$(document).ready(function(){

  $('body').on('swipeleft', function(){
    $('.next').trigger('click');
  });
  $('body').on('swiperight', function(){
    $('.prev').trigger('click');
  });

  $('.filters').on('click', function(e){
    e.preventDefault();
  $('.ui.sidebar')
    .sidebar('setting', 'transition', 'overlay')
    .sidebar('toggle');
  });
});



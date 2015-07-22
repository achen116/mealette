$(document).ready(function(){

  $('.filters').on('click', function(e){
    e.preventDefault();

    $('.ui.sidebar')
    .sidebar('setting', 'transition', 'overlay')
    .sidebar('toggle');
  });
});



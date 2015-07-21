$(document).ready(function(){

  $('.filters').on('click', function(e){
    e.preventDefault();
    // console.log('success!!!!! DAT SHIT')
    $('.ui.sidebar')
    .sidebar('setting', 'transition', 'overlay')
    .sidebar('toggle')
;
  });
});



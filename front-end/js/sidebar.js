$(initialize);

function initialize(){
  toggleSideBar();
  $('img.menu').on("click", toggleSidebarImage)
}

function toggleSideBar(){
  $(".menu").on("click", function() {
    event.preventDefault();
    $('main').toggleClass("hidden");
  });
}

function toggleSidebarImage(){
  if ($('main').hasClass('hidden')){
    $('img.menu').addClass('menu-hidden')
  } else {
    $('img.menu').removeClass('menu-hidden')
  }
}
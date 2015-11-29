$(initialize);

function initialize(){
  $("body").on("submit", 'form#login', submitForm);
  $("body").on("submit", 'form#signup', submitForm);
  $('form#signup').on('submit', submitForm);
  $('#logout-link').on('click', logout);
  checkLoginState();
}

function currentUser(){
  var url = 'https://biliardino-api.herokuapp.com/api/users/'+getUserId()
  ajaxRequest('get', url, null, function(data){
    $('.username').html(data.user.local.fullname)
  });
}

function checkLoginState(){
  if(getToken()){
    return loggedInState();
  }else{
    return loggedOutState();
  }
}

function submitForm(){
  event.preventDefault();
  hideErrors();
  var method = $(this).attr("method");
  var url    = "https://biliardino-api.herokuapp.com/api"+ $(this).attr("action");
  var data   = $(this).serialize();
  data.lat = 51.520244
  data.lng = -0.072149

  return ajaxRequest(method, url, data, authenticationSuccessful)
}

function logout(){
  event.preventDefault();
  removeToken();
  checkLoginState();
}

function hideErrors(){
  return $('.alert').removeClass("show").addClass("hide") 
}

function displayErrors(data){
  return $('.alert').text(data).removeClass("hide").addClass("show") 
}

function loggedInState(){
  $('.logged-out').hide();
  $('.logged-in').show();
  currentUser()
}

function loggedOutState(){
  $('.logged-in').hide();
  $('.logged-out').show();
}

function authenticationSuccessful(data){
  if (data.token) setToken(data.token, data.user._id);
  return checkLoginState();
}

function setToken(token, user){
  window.localStorage.setItem("token", token);
  return window.localStorage.setItem("user", user);
}

function getToken(){
  return localStorage.getItem('token');
}

function getUserId(){
  return localStorage.getItem('user');
}

function removeToken(){
  return localStorage.clear();
}

function setRequestHeader(xhr, settings){
  var token = getToken();
  if(token) return xhr.setRequestHeader('Authorization', 'Bearer ' + token);
}

function ajaxRequest(method, url, data, callback){
  $.ajax({
    method: method,
    url: url,
    data: data,
    beforeSend: setRequestHeader
  }).done(function(data){
    if(callback) callback(data)
    $(this).parent().hide();
    $('body').removeClass('avgrund-active')

  }).fail(function(data){
    displayErrors(data.responseJSON.message);
  });
}
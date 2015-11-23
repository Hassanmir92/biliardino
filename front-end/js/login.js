$(initialize);

function initialize(){
  $('form').on('submit', submitForm);
  $('.logout-link').on('click', logout);
  checkLoginState();
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

  var method = $(this).attr("method");
  var url    = "http://localhost:3000/api"+ $(this).attr("action");
  var data   = $(this).serialize();
  console.log(data)

  return ajaxRequest(method, url, data, authenticationSuccessful)
}

function logout(){
  event.preventDefault();
  removeToken();
  checkLoginState();
}

// function hideErrors(){
//   return $('.alert').removeClass("show").addClass("hide") 
// }

// function displayErrors(data){
//   return $('.alert').text(data).removeClass("hide").addClass("show") 
// }

function loggedInState(){
  $('.logged-out').hide();
  $('.logged-in').show();
}

function loggedOutState(){
  $('.logged-in').hide();
  $('.logged-out').show();
}

function authenticationSuccessful(data){
  if (data.token) setToken(data.token);
  return checkLoginState();
}

function setToken(token){
  return window.localStorage.setItem("token", token);
}

function getToken(){
  return localStorage.getItem('token');
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
  }).fail(function(data){
    // displayErrors(data.responseJSON.message);
  });
}
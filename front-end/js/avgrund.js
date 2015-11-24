$(function(){
  $('#login-button').avgrund({
    height: 350,
    showClose: true,
    holderClass: 'login',
    showCloseText: 'close',
    closeByDocument: true,
    enableStackAnimation: true,
    onBlurContainer: ".blur",
    template: "<div class='hide alert alert-danger' role='alert'></div><h1>Login</h1><form id='login' action='/login' method='post'><input id='email' type='text' name='email' placeholder='Email'><input id='password' type='password' name='password' placeholder='Password'><input type='submit' value='Login'></form>"
  });
});
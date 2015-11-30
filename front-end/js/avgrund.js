$(function(){
  $('#super-secret-login').avgrund({
    height: 224,
    width: 250,
    showClose: true,
    holderClass: 'login',
    showCloseText: 'close',
    closeByDocument: true,
    enableStackAnimation: true,
    onBlurContainer: ".blur",
    template: "<div class='hide alert alert-danger' role='alert'></div><h1>Login</h1><form id='login' action='/login' method='post'><input id='email' type='text' name='email' placeholder='Email'><input id='password' type='password' name='password' placeholder='Password'><input type='submit' value='Login'></form>"
  });

  $('#super-secret-signup').avgrund({
    height: 224,
    width: 250,
    showClose: true,
    holderClass: 'signup',
    showCloseText: 'close',
    closeByDocument: true,
    enableStackAnimation: true,
    onBlurContainer: ".blur",
    template: "<div class='hide alert alert-danger' role='alert'></div><h1>Sign Up</h1><form id='signup' action='/register' method='post'><input id='signup_email' type='text' name='email' placeholder='Email'><input id='signup_password' name='password' type='password' placeholder='Password'><input type='submit' value='Signup'></form>"
  });
});
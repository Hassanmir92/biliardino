$(function(){
  $('#super-secret').avgrund({
    height: 202,
    showClose: true,
    holderClass: 'login',
    showCloseText: 'close',
    closeByDocument: true,
    enableStackAnimation: true,
    onBlurContainer: ".blur",
    template: "<div class='hide alert alert-danger' role='alert'></div><h1>Login</h1><form id='login' action='/login' method='post'><input id='email' type='text' name='email' placeholder='Email'><input id='password' type='password' name='password' placeholder='Password'><input type='submit' value='Login'></form>"
  });

  $('#signup-button').avgrund({
    height: 350,
    showClose: true,
    holderClass: 'signup',
    showCloseText: 'close',
    closeByDocument: true,
    enableStackAnimation: true,
    onBlurContainer: ".blur",
    template: "<div class='hide alert alert-danger' role='alert'></div><h1>Sign Up</h1><form id='signup' action='/register' method='post'><input id='signup_email' type='text' name='email' placeholder='Email'><input id='signup_password' name='password' type='password' placeholder='Password'><input id='signup_fullname' name='fullname' type='text' placeholder='Name'><input type='submit' value='Signup'></form>"
  });
});







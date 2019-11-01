$(document).ready(function(){
  console.log('masuk doc')

  if(!localStorage.getItem('token')){
    $("#home-page").hide()
    $(".login-wrap").show()
  } else {
    $(".login-wrap").hide()
    $("#home-page").show()
  }

    $('#register').submit(function(event){
      event.preventDefault()
      console.log('masuk register')
      manualSignUp()
    })

    $('#login').submit(function(event){
      event.preventDefault()
      console.log('masuk login')
      manualSignIn()
    })



});


function onSuccess(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method:"POST",
    url:"http://localhost:3000/users/googleSignIn",
    data: {id_token}
  })
  .done(function(response) {
    console.log('done');
    $(".login-wrap").hide()
    $('#home-page').show()
    localStorage.setItem('token', response.token)
  })
  .fail(function(jqXHR, textStatus, errorThrown){    
    console.log(textStatus);
    
  })
  .always(function() {
    console.log("complete");
    
  })
}
function onFailure(error) {
  console.log(error);
}
function renderButton() {
  gapi.signin2.render('my-signin2', {
    'scope': 'profile email',
    'width': 380,
    'height': 50,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onSuccess,
    'onfailure': onFailure
  });
}

function signOut() {
  if(gapi.auth2 !== undefined){
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
    localStorage.removeItem('token')
    $(".login-wrap").show()
    $('#home-page').hide()
  }

function manualSignUp() {

  const email = $('#email-signup').val()
  const pass = $('#pass-signup').val()
  console.log(email)
    $.ajax({
      method:"POST",
      url:"http://localhost:3000/users/manualSignUp",
      data: {
        email,
        pass
      }
    })
    .done(function(response) {
      console.log('done');
      localStorage.setItem('token', response.token)
      $(".login-wrap").hide()
      $("#home-page").show()

    })
    .fail(function(jqXHR, textStatus, errorThrown){    
      console.log(textStatus);
    })
    .always(function() {
      $('#user').val('')
       $('#email-signup').val('')
       $('#pass-signup').val('')
    })
    
}

function manualSignIn() {
  const email = $('#email-login').val()
  const pass = $('#pass-login').val()
  // console.log(email,pass)
  $.ajax({
    method:"POST",
    url:"http://localhost:3000/users/manualSignIn",
    data: {
      email,
      pass
    }
  })
  .done(function(response) {
    // console.log(response)
    console.log('done');
    $(".login-wrap").hide()
    $('#home-page').show()
    localStorage.setItem('token', response.token)
  })
  .fail(function(jqXHR, textStatus, errorThrown){    
    console.log(textStatus);
  })
  .always(function() {
    $("#email-login").val('')
    $("#pass-login").val('')
  })
  

}
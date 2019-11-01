// $(document).ready(function(){
//     console.log('masuk doc')
  
//     if(!localStorage.getItem('token')){
//       $("#homepage").hide()
//       $(".login-wrap").show()
//     } else {
//       $(".login-wrap").hide()
//       $("#homepage").show()
//     }
  
//       $('#register').submit(function(event){
//         event.preventDefault()
//         console.log('masuk register')
//         manualSignUp()
//       })
  
//       $('#login').submit(function(event){
//         event.preventDefault()
//         console.log('masuk login')
//         manualSignIn()
//       })
  
  
  
//   });
  
  
  function onSuccess(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    Swal.showLoading()
    $.ajax({
      method:"POST",
      url:"http://localhost:3000/users/googleSignIn",
      data: {id_token}
    })
    .done(function(response) {
      Swal.close()
      console.log('done');
      $(".login-wrap").hide()
      $("#nav").show()
      $('#homepage').show()
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
      'theme': 'light',
      'onsuccess': onSuccess,
      'onfailure': onFailure
    });
  }
  
  function signOut() {
    localStorage.removeItem('token')
    console.log('masuk sign out')
      $("#homepage").hide()
      $("#nav").hide()
      $('#cookie-page').hide()
      $('#detail-page').hide()
      $('#tarot-page').hide()
      
    $(".login-wrap").show()
    if(gapi.auth2 !== undefined){
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
    }
  }
  
  function manualSignUp() {
    Swal.showLoading()
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
        Swal.close()
        console.log('done');
        localStorage.setItem('token', response.token)
        $(".login-wrap").hide()
        $("#homepage").show()
  
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
    Swal.showLoading()
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
      Swal.close()
      // console.log(response)
      console.log('done');
      $(".login-wrap").hide()
      $("#nav").show()
      $('#homepage').show()
      localStorage.setItem('token', response.token)
    })
    .fail(function(err){
      Swal.close()
      let msg = err.responseJSON.errors
      let text = ""
      msg.forEach(el => {
        text += el + ', '
      });
      Swal.fire({
        type:'error',
        title: 'Oops....',
        text,
      })
    })
    .always(function() {
      $("#email-login").val('')
      $("#pass-login").val('')
    })
    
  
  }
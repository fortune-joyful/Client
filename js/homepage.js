const baseUrl = 'http://localhost:3000'

showAlert = (err) => {
  console.log(err)
}

seeDetail = (zodiac) => {
  console.log(zodiac)
}

getFortune = () => {
  $('#cookie-fortune').empty()
  $.ajax({
    url: `${baseUrl}/cookies/fortune`,
    method: 'get'
  })
    .done(({ fortune }) => {
      $('#cookie-fortune').append(fortune)
    })
    .fail(showAlert)
}

$(document).ready(function(){
  $('#cookie-page').hide()

  $('#fortune-cookie-button').click(() => {
    $('#homepage').hide()
    $('#cookie-page').show()
  })

  $('#crack-button').click(() => {
    getFortune()
  })

  $('.navbar-brand').click(() => {
    $('#tarot-page').hide()
    $('#cookie-page').hide()
    $('#homepage').show()
  })

  $('.tr-image').click( function (e){
    e.preventDefault()
    getCard()
  })

  $('#to-tarot-page').click( function(e){
    e.preventDefault()
    $('#homepage').hide()
    $('#tarot-page').show()
  })

})
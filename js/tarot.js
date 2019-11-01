function getCard(){
    $('#id-card-detail').html('')
    $.ajax({
        url: `${baseUrl}/tarots`
    })
    .done(({cards}) =>{
        const { name, desc, meaning_up, meaning_rev } = cards[0]

        let random = Math.round(Math.random()*1)
        let meaning = `
          <div class="tr-up">
                <p style="color: grey;" >${meaning_up}</p>
            </div>
            <div class="tr-down">
                <p>${meaning_rev}</p>
          </div>`

        let cardName = `<span style="transform: rotate(-180deg);" >${name}</span>`
        if(random) {
            cardName = `<span>${name}</span>`
            meaning = `
            <div class="tr-up">
                <p>${meaning_up}</p>
             </div>
             <div class="tr-down">
                <p style="color: rgba(87, 87, 87, 0.623);" >${meaning_rev}</p>
            </div>`
        }


        $('#id-card-detail').append(`
       
                <div class="tr-detail-img d-flex align-items-center justify-content-center">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQjNSfKVJv85GQoV9vLzR2p3d_Rhs4lT9nDRoAAd5TUim0L0tZv" alt="">
                        ${cardName}
                </div>
                <div class="tr-detail-content">
                    <h1>${name}</h1>
                    <p class="text-white">${desc.substring(0, 500)}</p>
                    <div class="tr-up-down">
                        <div class="d-flex justify-content-around align-items-start"> 
                            ${meaning}
                        </div>
                        <div class="tr-footer">
                            
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
            
        `)
    
    })
    .fail(err=>{
        console.log(err);
    })
}
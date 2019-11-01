function ramalanZodiac(event, day, zodiac) {
    // console.log(day, zodiac)
    event.preventDefault()
    $.ajax(`http://localhost:3000/horoscope/${day}/${zodiac}`, {
            method: "GET"
        })
        .done(respone => {
            // console.log(respone.data);
            $(".ramalan").empty()
            if (day === 'today') {
                $(".ramalan").append(`
                <p>${respone.date}-${respone.horoscope}</p>
                `)
            } else if (day === 'week') {
                $(".ramalan").append(`
                <p>${respone.week}-${respone.horoscope}</p>
                `)
            } else if (day === 'year') {
                $(".ramalan").append(`
                <p>${respone.year}-${respone.horoscope}</p>
                `)
            }
        })
        .fail(err => {
            console.log(err);
        })
}

function detailZodiac(event, zodiac) {
    event.preventDefault()
    $.ajax(`http://localhost:3000/detail/${zodiac}`, {
            method: "GET"
        })
        .done(respone => {
            // console.log(respone.data)
            let listMatch = [];
            for (let i = 0; i < respone[0].compatibility.length; i++) {
                if (respone[0].compatibility[i] == 'Aries' || respone[0].compatibility[i] == ' Aries') {
                    listMatch.push('Aries');
                } else if (respone[0].compatibility[i] == 'Aquarius' || respone[0].compatibility[i] == ' Aquarius') {
                    listMatch.push('Aquarius');
                } else if (respone[0].compatibility[i] == 'Cancer' || respone[0].compatibility[i] == ' Cancer') {
                    listMatch.push('Cancer');
                } else if (respone[0].compatibility[i] == 'Capricorn' || respone[0].compatibility[i] == ' Capricorn') {
                    listMatch.push('Capricorn');
                } else if (respone[0].compatibility[i] == 'Gemini' || respone[0].compatibility[i] == ' Gemini') {
                    listMatch.push('Gemini');
                } else if (respone[0].compatibility[i] == 'Leo' || respone[0].compatibility[i] == ' Leo') {
                    listMatch.push('Leo');
                } else if (respone[0].compatibility[i] == 'Libra' || respone[0].compatibility[i] == ' Libra') {
                    listMatch.push('Libra');
                } else if (respone[0].compatibility[i] == 'Pisces' || respone[0].compatibility[i] == ' Pisces') {
                    listMatch.push('Pisces');
                } else if (respone[0].compatibility[i] == 'Sagittarius' || respone[0].compatibility[i] == ' Sagittarius') {
                    listMatch.push('Sagittarius');
                } else if (respone[0].compatibility[i] == 'Scorpio' || respone[0].compatibility[i] == ' Scorpio') {
                    listMatch.push('Scorpio');
                } else if (respone[0].compatibility[i] == 'Taurus' || respone[0].compatibility[i] == ' Taurus') {
                    listMatch.push('Taurus');
                } else if (respone[0].compatibility[i] == 'Virgo' || respone[0].compatibility[i] == ' Virgo') {
                    listMatch.push('Virgo');
                }
            }
            // console.log(listMatch);
            $(".detail").empty()
            // console.log(respone)
            $(".detail").append(`
            <nav class="nav">
                <a class="nav-link hvr-underline-from-center animated fadeInRightBig" onclick="ramalanZodiac(event,'week','${respone[0].name}')" id="btn-yesterday" href="#" style="color: #D7119B;">Week</a>
                <a class="nav-link hvr-underline-from-center animated fadeInRightBig delay-2s" onclick="ramalanZodiac(event,'today','${respone[0].name}')" id="btn-today" href="#" style="color: #D7119B;">Today</a>
                <a class="nav-link hvr-underline-from-center animated fadeInRightBig delay-3s" onclick="ramalanZodiac(event,'year','${respone[0].name}')" id="btn-tommorow" href="#" style="color: #D7119B;">Year</a>
            </nav>
            <div class="jumbotron jumbotron-fluid" style="background-color: #FAACA8;
            background-image: linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%);">
                <div class="container">
                    <p class="ramalan"></p>
                </div>
            </div>
            <h2>${respone[0].name}</h2>
            <div id="accordion">
                <div class="card">
                    <div class="card-header" id="headingOne" style="background: #FBD3E9;  /* fallback for old browsers */
                    background: -webkit-linear-gradient(to right, #BB377D, #FBD3E9);  /* Chrome 10-25, Safari 5.1-6 */
                    background: linear-gradient(to right, #BB377D, #FBD3E9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */">
                        <h5 class="mb-0">
                        <button class="btn btn-link hvr-wobble-top" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style="text-decoration:none; color: white;">
                            Bad Traits
                        </button>
                        </h5>
                    </div>

                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                        <div class="card-body">
                            <ul>
                                <li>${respone[0].bad_traits[0]}</li>
                                <li>${respone[0].bad_traits[1]}</li>
                                <li>${respone[0].bad_traits[2]}</li>
                                <li>${respone[0].bad_traits[3]}</li>
                                <li>${respone[0].bad_traits[4]}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header" id="headingTwo" style="background: #FBD3E9;  /* fallback for old browsers */
                    background: -webkit-linear-gradient(to right, #BB377D, #FBD3E9);  /* Chrome 10-25, Safari 5.1-6 */
                    background: linear-gradient(to right, #BB377D, #FBD3E9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */">
                        <h5 class="mb-0">
                        <button class="btn btn-link collapsed hvr-wobble-top" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" style="text-decoration:none; color: white;">
                            Good Traits
                        </button>
                        </h5>
                    </div>
                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div class="card-body">
                            <ul>
                                <li>${respone[0].good_traits[0]}</li>
                                <li>${respone[0].good_traits[1]}</li>
                                <li>${respone[0].good_traits[2]}</li>
                                <li>${respone[0].good_traits[3]}</li>
                                <li>${respone[0].good_traits[4]}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            <div class="card">
                <div class="card-header" id="headingThree" style="background: #FBD3E9;  /* fallback for old browsers */
                background: -webkit-linear-gradient(to right, #BB377D, #FBD3E9);  /* Chrome 10-25, Safari 5.1-6 */
                background: linear-gradient(to right, #BB377D, #FBD3E9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */">
                    <h5 class="mb-0">
                    <button class="btn btn-link collapsed hvr-wobble-top" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" style="text-decoration:none; color: white;">
                        Favorites
                    </button>
                    </h5>
                </div>
                <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                    <div class="card-body">
                        <ul>
                            <li>${respone[0].favorites[0]}</li>
                            <li>${respone[0].favorites[1]}</li>
                            <li>${respone[0].favorites[2]}</li>
                            <li>${respone[0].favorites[3]}</li>
                            <li>${respone[0].favorites[4]}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
                 <div class="card bg-light mt-3" style="width: 18rem;">
                    <div class="card-header" style="background-color: #8EC5FC;
                        background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);"><h4 class="animated pulse infinite">Today's Matches</h4>
                    </div>
                    <div class="card-body text-center">
                    <h5 class="card-title" style="font-size: 13px;">${respone[0].compatibility}</h5>
                    <h6 class="card-subtitle mb-2 text-muted"></h6>
                        <a href="#" onclick="detailZodiac(event,'${listMatch[0]}')"><img src="../img/${listMatch[0]}.png" width="50" class="rounded-circle animated infinite bounce delay-2s"></a>
                        <a href="#" onclick="detailZodiac(event,'${listMatch[1]}')"><img src="../img/${listMatch[1]}.png" width="50" class="rounded-circle animated infinite bounce delay-2s"></a>
                        <a href="#" onclick="detailZodiac(event,'${listMatch[2]}')"><img src="../img/${listMatch[2]}.png" width="50" class="rounded-circle animated infinite bounce delay-2s"></a>
                        <a href="#" onclick="detailZodiac(event,'${listMatch[3]}')"><img src="../img/${listMatch[3]}.png" width="50" class="rounded-circle animated infinite bounce delay-2s"></a>
                </div>
                
            `)
        })
        .fail(err => {
            console.log(err);
        })
}
let tilausid = sessionStorage.getItem('tilaus');
console.log(tilausid);

function tuotteet() {
    let txt = sessionStorage.getItem('tilauskanta');
    let tilaukset = JSON.parse(txt);
    let tuotesisalto = '<table><tr><th>code</th><th>shelf_pos</th><th>comment</th><th>status</th></tr>';
    let tilaustiedot = '<br><br><h1>Tilaustiedot</h1><table>';
    let tuotetiedot = '<br><br><h1>Tuotetiedot</h1>';
    let status = '';
    console.log(tilaukset);
    for (i = 0; i < tilaukset.length; i++) {
        if (tilaukset[i]['orderid'] == tilausid) {
            console.log('tilausid on: ' + tilausid);
            let tuotteet = tilaukset[i]['products'];
            console.log(tuotteet);
            status = tilaukset[i]['status'];
            console.log(status);
            let vari = '';
            // tuotetaulukon lisäys
            for (j = 0; j < tuotteet.length; j++) {
                let z = tuotteet[j];
                switch (z['status']) {
                    /* case 'Ei kerätty':
                        vari = 'rgb(255, 175, 175)';
                        break; */
                    case 'Ei kerätty':
                        vari = 'rgb(255, 255, 175)';
                        break;
                    case 'Kerätty':
                        vari = 'rgb(175, 255, 175)';
                        break;
                }
                tuotesisalto += '<tr style="height: 50px"><td>' + tuotteet[j]['code'] + '</td>';
                tuotesisalto += '<td>' + tuotteet[j]['shelf_pos'] + '</td>';
                tuotesisalto += '<td><input type="text" id="arvo'+ j +'" style="width: 95%" value="' + tuotteet[j]['comment'] + '" onfocusout="lisaaKommentti('+ j +')"></td>';
                tuotesisalto += '<td><input type="button" style="height: 90%; width: 90%; background-color: ' + vari + '" value="' + tuotteet[j]['status'] + '" onclick="tuoteKeratty('+ j +')"></td></tr>';
                tuotetiedot += '<h2>Tuote ' + (j + 1) + '</h2><table>';
                // tuotetietojen lisäys
                for (let d in z) {
                    tuotetiedot += '<tr><td style="width: 20%">' + d + '</td><td>' + z[d] + '</td></tr>';
                }
                tuotetiedot += '</table><br>';
            }
            tuotesisalto += '</table>';
            // tilaustietojen lisäys
            for (let c in tilaukset[i]) {
                if (c != ['products']) {
                tilaustiedot += '<tr><td style="width: 20%">' + c + '</td><td>' + tilaukset[i][c] + '</td></tr>';
            }
        }
    }
}
    document.getElementById('teksti').innerHTML = 'Tämä on tuotesivu. Käyttäjätunnuksesi on ' + sessionStorage.getItem('username') + '. productid: ' + tilausid + ' - '+ status;
    document.getElementById('tuotetaulukko').innerHTML = tuotesisalto;
    document.getElementById('tuotetaulukko').innerHTML += tilaustiedot;
    document.getElementById('tuotetaulukko').innerHTML += tuotetiedot;
}

function lisaaKommentti(numero) {
    console.log(numero);
    console.log('hello world');
    let txt = sessionStorage.getItem('tilauskanta');
    let tilaukset = JSON.parse(txt);
    for (i = 0; i < tilaukset.length; i++) {
        if (tilaukset[i]['orderid'] == tilausid) {
            // for (j = 0; j < tilaukset[i]['products'].length; j++) {
                tilaukset[i]['products'][numero].comment = document.getElementById('arvo'+numero).value;
            console.log(tilaukset[i]['products'][numero].comment);
            document.getElementById('kommentti').innerHTML = 'Huomio lisätty.';
        }
    }
    txt = JSON.stringify(tilaukset);
    sessionStorage.setItem('tilauskanta', txt);
    tuotteet();
}

function aloitaTilaus() {
    let txt = sessionStorage.getItem('tilauskanta');
    let tilaukset = JSON.parse(txt);
    for (i = 0; i < tilaukset.length; i++) {
        if (tilaukset[i]['orderid'] == tilausid) {
            if (tilaukset[i]['status'] == 'Ei aloitettu') {
                //tähän väliin koodi joka suoritetaan jos aloitus onnistuu
                        tilaukset[i].status = 'Kesken';
                        console.log(tilaukset[i].status);
                txt = JSON.stringify(tilaukset);
                sessionStorage.setItem('tilauskanta', txt);
                document.getElementById('kommentti').innerHTML = 'Tilaus aloitettu.';
                tuotteet();
            }
            else {
                document.getElementById('kommentti').innerHTML = 'Et voi aloittaa tilausta.';
            }}}}

function keskeytaTilaus() {
    let txt = sessionStorage.getItem('tilauskanta');
    let tilaukset = JSON.parse(txt);
    for (i = 0; i < tilaukset.length; i++) {
        if (tilaukset[i]['orderid'] == tilausid) {
            if (tilaukset[i]['status'] == 'Kesken') {
            tilaukset[i].status = 'Ei aloitettu';
            console.log(tilaukset[i].status);
            for (j = 0; j < tilaukset[i]['products'].length; j++) {
                tilaukset[i]['products'][j].status = 'Ei kerätty';
            }
    txt = JSON.stringify(tilaukset);
    sessionStorage.setItem('tilauskanta', txt);
    document.getElementById('kommentti').innerHTML = 'Tilaus keskeytetty.';
    tuotteet();
}
else {
    document.getElementById('kommentti').innerHTML = 'Et voi keskeyttää tilausta.';
}}}}

function kuittaaTilaus() {
    let txt = sessionStorage.getItem('tilauskanta');
    let tilaukset = JSON.parse(txt);
    let n = 0;
    for (i = 0; i < tilaukset.length; i++) {
        if (tilaukset[i]['orderid'] == tilausid) {
            // kaikkien tuotteiden keräys tarkistus
            for (j = 0; j < tilaukset[i]['products'].length; j++) {
                if (tilaukset[i]['products'][j].status == 'Kerätty') {
                n ++;
                }
                if (n == tilaukset[i]['products'].length) {
                    tilaukset[i].status = 'Valmis';
                    console.log(tilaukset[i].status);
                    document.getElementById('kommentti').innerHTML = 'Tilaus kuitattu.';
                }
            else {
                document.getElementById('kommentti').innerHTML = 'Et voi kuitata tilausta.';
            }}}}
    txt = JSON.stringify(tilaukset);
    sessionStorage.setItem('tilauskanta', txt);
    tuotteet();
}

function tilausListaan() {
    window.location.href="tilaukset.html";
}

function tuoteKeratty(numero) {
    let txt = sessionStorage.getItem('tilauskanta');
    let tilaukset = JSON.parse(txt);
    for (i = 0; i < tilaukset.length; i++) {
        if (tilaukset[i]['orderid'] == tilausid) {
            if (tilaukset[i]['status'] == 'Kesken') {
                if (tilaukset[i]['products'][numero]['status'] == 'Ei kerätty') {
                    tilaukset[i]['products'][numero]['status'] = 'Kerätty';
                    document.getElementById('kommentti').innerHTML = 'Tuote merkitty kerätyksi.';
                }
                else if (tilaukset[i]['products'][numero]['status'] == 'Kerätty') {
                    tilaukset[i]['products'][numero]['status'] = 'Ei kerätty';
                    document.getElementById('kommentti').innerHTML = 'Tuote merkitty keräämättömäksi.';
                }
        } else {
            document.getElementById('kommentti').innerHTML = 'Et voi kerätä tuotteita.';
        }}
    }
    txt = JSON.stringify(tilaukset);
    sessionStorage.setItem('tilauskanta', txt);
    tuotteet();
}

function vieEtusivulle() {
    window.location.href="keruulista.html";
}

function logOutButton() {
    sessionStorage.removeItem('username');
    window.location.replace('login.html');
}
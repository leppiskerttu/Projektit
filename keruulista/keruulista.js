console.log("yo testi")
console.log("testi")
console.log("Rikun lisäys")
if (typeof(sessionStorage.getItem('tilauskanta')) != 'string') {
    noudaTilaukset();
}

function logInButton() {
    let userInfoJSON = '[{"username":"user1","password":"pass1"},{"username":"user2","password":"pass2"},{"username":"user3","password":"pass3"},{"username":"user4","password":"pass4"},{"username":"testuser","password":"testpass"}]'
    let userInfo = JSON.parse(userInfoJSON);
    let inputUser = document.getElementById('username').value;
    let inputPass = document.getElementById('password').value;
    for (i = 0; i < userInfo.length; i++) {
        let z = userInfo[i];
        if (inputUser == z['username'] && inputPass == z['password']) {
            console.log('Login onnistui');
            sessionStorage.setItem('username', inputUser);
            window.location.replace('keruulista.html');
        }
        else {
            document.getElementById('logintxt').innerHTML = 'Sisäänkirjautuminen epäonnistui.';
        }
    }
}

function test() {
    document.getElementById('teksti').innerHTML += ' Käyttäjätunnuksesi on ' + sessionStorage.getItem('username');
}

function logOutButton() {
    sessionStorage.removeItem('username');
    window.location.replace('login.html');
}

function vieTilausSivulle() {
    window.location.replace('tilaukset.html');
}
function vieValmiitTilausSivulle() {
    window.location.replace('valmiit_tilaukset.html');
}



function tuoteSivu(data) {
    sessionStorage.setItem('tilaus', data);
    window.location.href='tuotteet.html';
}

function noudaVainValmiitTilaukset() {
    sessionStorage.removeItem('tilaus');
    let txt = sessionStorage.getItem('tilauskanta');
    console.log(typeof(txt))
   /*
    console.log(txt.array.forEach(element => {
        forEach
    });(object => {
        console.log(object["status"])
    }));
    */

    let tilaukset = JSON.parse(txt);
    /*
    tilaukset.forEach(object => {
        console.log(object["status"])
    });
*/
    console.log(tilaukset)
    let vainValmiit = tilaukset.map(object => object["status"] === "Valmis")

    console.log(vainValmiit)

    let sisalto = 'Tilauslista:<table><tr><th>orderid</th><th>customerid</th><th>comment</th><th>deliverydate</th><th>status</th></tr>';
    for (i = 0; i < tilaukset.length; i++) {
        let z = tilaukset[i];
        if (vainValmiit[i] === true) {
        sisalto += '<tr style="height: 50px"><td><input type="button" value="'+ z['orderid'] +'" onclick=tuoteSivu('+ z['orderid'] +')></td>';
        sisalto += '<td>' + z['customerid'] + '</td>';
        sisalto += '<td>' + z['comment'] + '</td>';
        sisalto += '<td>' + z['deliverydate'] + '</td>';
        sisalto += '<td>' + z['status'] + '</td></tr>';
        }
    }
    sisalto += '</table>';
    console.log(tilaukset);
    document.getElementById('taulukko').innerHTML = sisalto;
}

function vieEtusivulle(){
    window.location.href='keruulista.html';
}

function vieHakuun() {
    window.location.href='Haku.html';
}

function noudaTilaukset() {
   
   fetch('https://cors-anywhere.herokuapp.com/http://www.cc.puv.fi/~e2102154/projekti/orderlist_test_2/data.json')
       .then(x => x.text())
       .then(y => haeTilaukset(y));
   
   function haeTilaukset(data) {
       let txt = data;
       let obj = JSON.parse(txt);
       console.log(obj);
       for (i = 0; i < obj.length; i++) {
           obj[i].status = 'Ei aloitettu';
           for (j = 0; j < obj[i]['products'].length; j++) {
           obj[i]['products'][j].comment = '';
           obj[i]['products'][j].status = 'Ei kerätty';
       }}
       txt = JSON.stringify(obj);
       sessionStorage.setItem('tilauskanta', txt);
   }}
/* function noudaTilaukset() {

 fetch('https://cors-anywhere.herokuapp.com/http://www.cc.puv.fi/~asa/json/project.json')
    .then(x => x.text())
    .then(y => haeTilaukset(y));

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
}} */

function tilausTaulukko() {
    sessionStorage.removeItem('tilaus');
    let txt = sessionStorage.getItem('tilauskanta');
    let tilaukset = JSON.parse(txt);
    let sisalto = '<table><tr><th>ord_id</th><th>cus_id</th><th>status</th><th>deliverydate</th><th>comment</th></tr>';
    let vari = '';
    for (i = 0; i < tilaukset.length; i++) {
        let z = tilaukset[i];
        switch (z['status']) {
            case 'Ei aloitettu':
                vari = 'rgb(255, 175, 175)';
                break;
            case 'Kesken':
                vari = 'rgb(255, 255, 175)';
                break;
            case 'Valmis':
                vari = 'rgb(175, 255, 175)';
                break;
        }
        sisalto += '<tr style="height: 50px"><td><input type="button" style="height: 90%; width: 90%; font-size: 20px; background-color: ' + vari + '" value="'+ z['orderid'] +'" onclick=tuoteSivu('+ z['orderid'] +')></td>';
        sisalto += '<td style="width: 1%">' + z['customerid'] + '</td>';
        sisalto += '<td style="width: 13%">' + z['status'] + '</td>';
        sisalto += '<td>' + z['deliverydate'] + '</td>';
        sisalto += '<td>' + z['comment'] + '</td></tr>';
    }
    sisalto += '</table>';
    console.log(tilaukset);
    document.getElementById('teksti').innerHTML += 'Tämä on tilaussivu. Käyttäjätunnuksesi on ' + sessionStorage.getItem('username');
    document.getElementById('taulukko').innerHTML = sisalto;
}

function tuoteSivu(data) {
    sessionStorage.setItem('tilaus', data);
    window.location.href='tuotteet.html';
}

function vieEtusivulle() {
    window.location.href="keruulista.html";
}

function vieValmiisiin() {
    window.location.href="valmiit_tilaukset.html";
}

function logOutButton() {
    sessionStorage.removeItem('username');
    window.location.replace('login.html');
}
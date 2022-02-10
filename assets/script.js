/*-----------------------------------------------------------------------------------------------------                        
-                                           GLOBAL VARIABLES                  
-----------------------------------------------------------------------------------------------------*/

const clientId = '03d8e475016f40709515ff7168828110';
const clientSecret = 'a5e76637ec5544bb88cdc130e089668d';
var token = "";
var genres = [];
var selectedGenre = "rock"; // needs to be replaced to clicked genre
var artistID = "";
var top10ArtistsNames = [];
var top10ArtistsImages = [];
var top10ArtistsPopularity = [];
var top10ArtistsGenre = [];
var top10ArtistsLink = [];

$(document).ready(function(){
    $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true, // Choose whether you can drag to open on touch screens,
      onOpen: function(el) { /* Do Stuff*/ }, // A function to be called when sideNav is opened
      onClose: function(el) { /* Do Stuff*/ }, // A function to be called when sideNav is closed
    }
  );
      $('.parallax').parallax();
          $('#demo-carousel').carousel();   
});

/*-----------------------------------------------------------------------------------------------------                        
-                                           FETCH FUNCTIONS                   
-----------------------------------------------------------------------------------------------------*/

const _getToken = async () => {

    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });
        // console.log(result.access_token);
    const data = await result.json();
//  console.log(data.access_token);
    token = data.access_token;
    _getGenres();
    _getArtists();
    }
    
const _getGenres = async () => {

    const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });
        
    const data = await result.json();
    console.log(data.categories.items);
    return data.categories.items;
}

const _getArtists = async (artistSelected) => {

    const result = await fetch('https://api.spotify.com/v1/search?q=genre:' + selectedGenre +'*&type=artist&market=US&limit=10', {
        method: 'GET',
        headers: {'Authorization' : 'Bearer ' + token},
        header: 'Content-Type : application/json' 
    });
    const data = await result.json();
    console.log(data.artists.items);
    //artistID = data.artists.items[0].id;
    for (i=0; i<10; i++) {

        top10ArtistsNames[i] = data.artists.items[i].name;
        top10ArtistsImages[i] = data.artists.items[i].images[0].url;
        top10ArtistsPopularity[i] = data.artists.items[i].popularity;
        top10ArtistsGenre[i] = data.artists.items[i].genres[0];
        top10ArtistsLink[i] = data.artists.items[i].external_urls.spotify;
        
    }
    console.log(top10ArtistsNames);   
    console.log(top10ArtistsImages);
    console.log(top10ArtistsPopularity);
    console.log(top10ArtistsGenre);
    console.log(top10ArtistsLink);
    await _getTracks();
    allocateImage(top10ArtistsImages[0]);
    return data.artists.items;
    
}

const _getTracks = async () => {
    const result = await fetch('https://api.spotify.com/v1/search?q=genre:' + selectedGenre + '*&type=track&market=US&limit=10', {
        methid: 'GET',
        headers: {'Authorization' : 'Bearer ' + token},
        header: 'Content-Type : application/json' 
    });
    const data = await result.json();
    console.log(data.tracks.items);
    return data.tracks.items;
}

const _getAlbums = async () => {
    const result = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums?market=US&limit=3', {
        methid: 'GET',
        headers: {'Authorization' : 'Bearer ' + token},
        header: 'Content-Type : application/json' 
    });
    const data = await result.json();
    console.log(data);
    return data;
}
_getToken();


/*-----------------------------------------------------------------------------------------------------                        
-                                           POPULATE HTML                    
-----------------------------------------------------------------------------------------------------*/
var classicRockDivEl = document.querySelector('#classic-rock-artists');
var hiphopDivEl = document.querySelector('#hiphop-artists');
var jazzDivEl = document.querySelector('#jazz-artists');
var classicalMusicDivEl = document.querySelector('#classical-music-artists');
var edmDivEl = document.querySelector('#edm-artists');
var popDivEl = document.querySelector('#pop-artists');
var rapDivEl = document.querySelector('#rap-artists');
var partyDivEl = document.querySelector('#party-artists');
var alternativeDivEl = document.querySelector('#alternative-artists');

var allocateImage = function (img) {
    var imgEl = document.createElement('img');
    imgEl.src = img;
    console.log(imgEl);
    classicRockDivEl.appendChild(imgEl);
}




var clickEventHandler = {
    
}
/*-----------------------------------------------------------------------------------------------------                        
-                                           QR Code                    
-----------------------------------------------------------------------------------------------------*/
document.getElementById('')

//function createQrCode() {
  var spotifyUrl = ''
  const qrCode = async () => {
    const result = await fetch('http://api.qrserver.com/v1/create-qr-code/?data="' + spotifyUrl + '"!&size=100x100', {
        method: 'GET',
    });
    
    console.log(result.url);
     var imgSrc = result.url
     document.getElementById("test").src = imgSrc;
  }
  qrCode();
/*-----------------------------------------------------------------------------------------------------                        
-                                           GLOBAL VARIABLES                  
-----------------------------------------------------------------------------------------------------*/

const clientId = '03d8e475016f40709515ff7168828110';
const clientSecret = 'a5e76637ec5544bb88cdc130e089668d';
var token = "";

var selectedGenre = "edm"; // needs to be replaced to clicked genre
var artistID = "";
var top10ArtistsNames = [];
var top10ArtistsImages = [];
var top10TrackImages = [];
var top10ArtistsPopularity = [];
var top10ArtistsGenre = [];
var top10ArtistsLink = [];
var top10trackImages = [];



$(document).ready(function(){
    $('.modal').modal();

    $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true, // Choose whether you can drag to open on touch screens,
      onOpen: function(el) { /* Do Stuff*/ }, // A function to be called when sideNav is opened
      onClose: function(el) { /* Do Stuff*/ }, // A function to be called when sideNav is closed
    });
    $('.parallax').parallax();
    $('#demo-carousel').carousel();   
});

/*-----------------------------------------------------------------------------------------------------                        
-                                           FETCH FUNCTIONS                   
-----------------------------------------------------------------------------------------------------*/
// Get token from spotify
const _getToken = async () => {

    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });
    const data = await result.json();
    token = data.access_token;
    }
// Get the top ten artist from spotify with selected genre
const _getArtists = async () => {

    const result = await fetch('https://api.spotify.com/v1/search?q=genre:' + selectedGenre +'*&type=artist&market=US&limit=10', {
        method: 'GET',
        headers: {'Authorization' : 'Bearer ' + token},
        header: 'Content-Type : application/json' 
    });
    const data = await result.json();
    console.log("ARTISTS")
    console.log(data.artists.items);
    //artistID = data.artists.items[0].id;
    for (i=0; i<10; i++) {

        top10ArtistsNames[i] = data.artists.items[i].name;
        top10ArtistsImages[i] = data.artists.items[i].images[0].url;
        top10ArtistsPopularity[i] = data.artists.items[i].popularity;
        top10ArtistsGenre[i] = data.artists.items[i].genres[0];
        top10ArtistsLink[i] = data.artists.items[i].external_urls.spotify;
        
    }
    for (i=0; i<10; i++) {
        allocateImage(top10ArtistsImages[i]);
    }
    
    return data.artists.items;
    
}
// Get top ten tracks from spotify with selected genre
const _getTracks = async () => {
    const result = await fetch('https://api.spotify.com/v1/search?q=genre:' + selectedGenre + '*&type=track&market=US&limit=10', {
        methid: 'GET',
        headers: {'Authorization' : 'Bearer ' + token},
        header: 'Content-Type : application/json' 
    });
    const data = await result.json();
    console.log("TRACKS");
    console.log(data.tracks.items);

    for (i=0; i<10; i++) {
        
        top10trackImages[i] = data.tracks.items[i].album.images[0].url;
  
    }

    for (i=0; i<10; i++) {
        
        allocateImageTracks(top10trackImages[i]);
    }
    return data.tracks.items;
}

/*-----------------------------------------------------------------------------------------------------                        
-                                           POPULATE HTML                    
-----------------------------------------------------------------------------------------------------*/
//Assign elements from the carrousel to variable
var artist1 = document.querySelector('#a1img');
var artist2 = document.querySelector('#a2img');
var artist3 = document.querySelector('#a3img');
var artist4 = document.querySelector('#a4img');
var artist5 = document.querySelector('#a5img');
var artist6 = document.querySelector('#a6img');
var artist7 = document.querySelector('#a7img');
var artist8 = document.querySelector('#a8img');
var artist9 = document.querySelector('#a9img');
var artist10 = document.querySelector('#a10img');
var track1 = document.querySelector('#t1img');
var track2 = document.querySelector('#t2img');
var track3 = document.querySelector('#t3img');
var track4 = document.querySelector('#t4img');
var track5 = document.querySelector('#t5img');
var track6 = document.querySelector('#t6img');
var track7 = document.querySelector('#t7img');
var track8 = document.querySelector('#t8img');
var track9 = document.querySelector('#t9img');
var track10 = document.querySelector('#t10img');
//Save elements variable into an array
var artistArr = [artist1, artist2, artist3, artist4, artist5, artist6, artist7, artist8, artist9, artist10];
var trackArr = [track1, track2, track3, track4, track5, track6, track7, track8, track9, track10];

var imageCounter = 0;
var imageCounter2 = 0;
// Functions to assign src from img tag
var allocateImage = function (img) {
    artistArr[i].src = img;
    imageCounter++;
}

var allocateImageTracks = function (img) {
    trackArr[i].src = img;
    imageCounter2++;
}
/*-----------------------------------------------------------------------------------------------------                        
-                                           GENRE SELECTION                    
-----------------------------------------------------------------------------------------------------*/

// Get user genre selection
$('.genre-selection').each(function() {
    $(".genre-section").on("click", function assignGenre() {
        $('.tops').css("display", "block");
    selectedGenre = $(this).attr('id');
    _getArtists();
    _getTracks();
    imageCounter = 0;
    imageCounter2 = 0;
    
    });
})
/*-----------------------------------------------------------------------------------------------------                        
-                                           QR Code                
-----------------------------------------------------------------------------------------------------*/

//function createQrCode(selectedGenre) 
var spotifyUrl = selectedGenre;
const qrCode = async () => {
  const result = await fetch('http://api.qrserver.com/v1/create-qr-code/?data="' + spotifyUrl + '"!&size=100x100', {
      method: 'GET',
  });
  console.log(result.url);
   var imgSrc = result.url
   document.getElementById("test").src = imgSrc;
      
}
//qrCode();


/*-----------------------------------------------------------------------------------------------------                        
-                                           MODAL               
-----------------------------------------------------------------------------------------------------*/
// Open modal for clicked elements in artist carrousel
$('#artistscarrousel').each(function() {
    $(".artistcontainer").on("click", function showArtistModal() {
        $(".modal").css("visibility", "visible");
    });
})
// Open modal for clicked elements in track carrousel
$('#trackscarrousel').each(function() {
    $(".trackcontainer").on("click", function showTrackModal() {
        $(".modal").css("visibility", "visible");
    });
})
// Close modal for clicked elements in both carrousels
$(".modal-close").on("click", function closeModal() {
    $(".modal").css("visibility", "hidden");
});



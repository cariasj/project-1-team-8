const clientId = '1dcbc3f0e7104a19991d59bf1d79366e';
const clientSecret = '384a4b3745b542fea7f47ab7180eede9';
var token = "";
var genres = [];
var selectedGenre = "rock";
var artistID = "";


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
    console.log(data.access_token);
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
    // console.log(data.categories.items);
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
    artistID = data.artists.items[artistSelected].id;
    console.log(artistID);
    _getTracks();
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

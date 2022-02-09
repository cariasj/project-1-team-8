const clientId = '1dcbc3f0e7104a19991d59bf1d79366e';
const clientSecret = '384a4b3745b542fea7f47ab7180eede9';
var token = "";


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
        
    }
    
const _getGenres = async () => {

    const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });
        
    const data = await result.json();
    console.log(data);

    return data.categories.items;
}



_getToken();
_getGenres();
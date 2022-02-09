const clientId = '5202aa42e7224b6a99e6a7aeb7c1a721';
const clientSecret = '049f97e36c0946d3acdb50ca7561fabc';

/*
const authToken = async () => {
  const config = {
       
        method: "POST",
        headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/x-www-form-urlencoded', 
        'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret) 
        },
        body: 'grant_type=client_credentials'
    }
    const result = await axios.post('https://accounts.spotify.com/api/token/', config)
    console.log(result);
}
authToken();   */

const getToken = async () => {

    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });
    
    const dataTok = await result.json();
    console.log(dataTok);
    return dataTok.access_token;
}

 const getGenres = async () => {
  const spotifyToken = await getToken();
    const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer' + spotifyToken}
    });
    console.log(result)
    const data = await result.json();
    console.log(data);
    //return data.categories.items;
}

//var SpotifyToken = getToken();
getGenres();

/*
const getAuth = async () => {

  
  const headers = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    auth: {
      username: clientId,
      password: clientSecret,
    },
  };
  const data = {
    grant_type: 'client_credentials',
  };

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      
      headers
    );
    console.log(response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.log(error);
  }
  getAuth();
}; */
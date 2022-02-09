const clientId = '3f914455b6564cae8175fea3e954fe95';
const clientSecret = '978bf3a93ce04a0a8c215560fe5cdd4b';

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

const clientId = '8b4a304cdf6a455696637805b9decb95';
const clientSecret = '1e098b0cf1844d9aabf0166fcd361699';


const getToken = async () => {

    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });
    
    const data = await result.json();
    console.log(data);
    return data.access_token;
}

const getGenres = async (token) => {

    const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });

    const data = await result.json();
    console.log(data);
    return data.categories.items;
}

getToken();
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
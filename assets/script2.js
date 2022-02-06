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
};
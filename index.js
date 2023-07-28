const axios = require('axios');
const geoip = require('geoip-lite')

// Function to get the external IP address
async function getExternalIP() {
    try {
      const response = await axios.get('https://api.ipify.org?format=json');
      return response.data.ip;
    } catch (error) {
      console.error('Error retrieving external IP:', error.message);
      return null;
    }
}

async function getEndpoint(latitude, longitude) {
    try {
        const response = await axios.get(`https://api.weather.gov/points/${latitude},${longitude}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getForecast(forecast) {
    try {
        const response = await axios.get(forecast);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function stuff() {
    const ip = await getExternalIP();

    console.log(ip);

    const geoLocation = geoip.lookup(ip);

    const latitude = geoLocation.ll[0];
    const longitude = geoLocation.ll[1];

    getEndpoint(latitude, longitude)
        .then(result => {
            console.log(result);
            getForecast(result.properties.forecast)
                .then(forecast => {
                    console.log(forecast);
                })
        })
}

stuff();
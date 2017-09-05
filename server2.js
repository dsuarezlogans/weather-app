const axios = require('axios');
const yargs = require('yargs');

const geocode = require('./geocode');
const weather = require('./weather');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'an address to fetch weather state.'
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

const encodedAddress = encodeURIComponent(argv.address),
      addressURL = `http://maps.oogleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(addressURL)
    .then(response => {
        if (response.data.status === 'ZERO_RESULTS') throw new Error('unable to find that address.');

        console.log(`Weather for: ${response.data.results[0].formatted_address}`);

        const   lng = response.data.results[0].geometry.location.lng,
                lat = response.data.results[0].geometry.location.lat;
                weatherURL = `https://api.darksky.net/forecast/ae413e1cfdd50f5def49b0139fb5d323/${lat},${lng}`;

        return axios.get(weatherURL);        
    })
    .then(response => {
        const   temperature = response.data.currently.temperature,
                apparentTemperature = response.data.currently.apparentTemperature,
                summary = response.data.currently.summary;

        console.log(`It's ${summary} with temp ${temperature}º but feels like ${apparentTemperature}º`);
    })
    .catch(e => {
        if (e.code === 'ENOTFOUND') return console.log('Unable to connect to API server.')

        console.log(e.message)
    });
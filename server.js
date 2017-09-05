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

// geocode.geocodeAddress(argv.address, (errorMessage, location) => {
//     if (errorMessage) return console.log(errorMessage);

//     weather.getWeather(location, (err, weather) => {
//         if (err) return console.log(err);
//         console.log(`Weather for: ${location.address}`);
//         console.log(`It's ${weather.summary} with temp ${weather.temperature}º but feels like ${weather.apparentTemperature}º`);
//     });
// });

geocode.geocodeAddress(argv.address)
    .then(location => {
        console.log(`Weather for: ${location.address}`)
        return weather.getWeather(location);
    })
    .then(weather => console.log(`It's ${weather.summary} with temp ${weather.temperature}º but feels like ${weather.apparentTemperature}º`))
    .catch(err => console.log(err));
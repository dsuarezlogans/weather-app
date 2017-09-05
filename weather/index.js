const request = require('request');

// const getWeather = (location, callback) => {
//     request.get({
//         url: `https://api.darksky.net/forecast/ae413e1cfdd50f5def49b0139fb5d323/${location.lat},${location.lng}`,
//         json: true
//     }, (err, res, body) => {
//         if (!err && res.statusCode == 200) {
//             callback(undefined, {
//                temperature: body.currently.temperature,
//                apparentTemperature: body.currently.apparentTemperature,
//                summary: body.currently.summary
//             });
//         } else {
//             callback('Unable to connect to forecast.io server.');
//         }

//     });
// };

const getWeather = (location) => {
    return new Promise((resolve, reject) => {
        request.get({
            url: `https://api.darksky.net/forecast/ae413e1cfdd50f5def49b0139fb5d323/${location.lat},${location.lng}`,
            json: true
        }, (err, res, body) => {
            if (!err && res.statusCode == 200) {
                
                resolve({
                    temperature: body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature,
                    summary: body.currently.summary
                });
            } else {
                reject('Unable to connect to forecast.io server.');
            }
        });
    });
};

module.exports.getWeather = getWeather;
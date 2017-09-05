const request = require('request');

// const geocodeAddress = (address, callback) => {

//     const encodedAddress = encodeURIComponent(address);

//     request.get({
//         url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
//         json: true
//     }, (err, res, body) => {
//         if (err) return callback('unabable to connect to google server.');
//         if (body.status === 'ZERO_RESULTS') return callback('unable to find that address.');

//         const location = {
//             lng: body.results[0].geometry.location.lng,
//             lat: body.results[0].geometry.location.lat,
//             address: body.results[0].formatted_address
//         }
//         callback(undefined, location)
//     });
// };

const geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        const encodedAddress = encodeURIComponent(address);

        request.get({
            url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
            json: true
        }, (err, res, body) => {
            if (err) return reject('unabable to connect to google server.');
            if (body.status === 'ZERO_RESULTS') return reject('unable to find that address.');
            
            const location = {
                lng: body.results[0].geometry.location.lng,
                lat: body.results[0].geometry.location.lat,
                address: body.results[0].formatted_address
            }
            resolve(location)
        });
    });
};

module.exports.geocodeAddress = geocodeAddress;
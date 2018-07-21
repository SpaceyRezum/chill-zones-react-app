var express = require('express');
var najax = require('najax');
var router = new express.Router();

router.get('/', function (req, res) {
    const newLocation = req.query;
    const googleAPIUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
    const googleAPIkey = '&key=' + process.env.GOOGLE_API_KEY;
    const url = googleAPIUrl + '?address=' + newLocation.name + '%20' + newLocation.address.replace(' ', '%20') + 'location=toronto' + googleAPIkey;
    najax.get(url).success(function (data) {
        var result = JSON.parse(data);
        res.json(result["results"][0]);
    }).error(function (err) {
        req.status(400).json(err);
    })
});

module.exports = router;

var Location = require('../api/locations/model');
var locationList = require('../assets/locations.json');
var mongoose = require('mongoose');
var najax = require('najax');
require('dotenv').config();

var googleAPIUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
var googleAPIkey = `&key=${process.env.GOOGLE_API_KEY}`;

mongoose.connect(process.env.MONGODB_SERVER);

Location.remove({})
	.then(function () {
		locationList.forEach(function (location, index) {
			var url = googleAPIUrl + location.lat + ',' + location.lon + googleAPIkey;
			najax.get(url).success(function (data) {
				var l = new Location();
				l.name = location.locationName;
				l.category = location.locationDesc;
				l.phone = location.phone;
				l.address = {
					lat: location.lat,
					lon: location.lon,
					street: '',
					city: '',
					postal_code: ''
				};

				var response = JSON.parse(data);
				response = response.results[0];

				if (response) {
					response.address_components.forEach(function (component) {
						if (component.types.includes('street_number')) {
							l.address.street = component.long_name + ' ';
						} else if (component.types.includes('route')) {
							l.address.street += component.long_name;
						} else if (component.types.includes('locality')) {
							l.address.city = component.long_name;
						} else if (component.types.includes('postal_code')) {
							l.address.postal_code += component.long_name;
						}
					});

					l.save(function (err, location) {
						if (err) {
							console.log("mongoose save error")
							console.log(err);
						}
						console.log("location number " + index + " was uploaded");
					});
				}
			}).error(function (err) {
				console.log("najax error");
				console.log(err);
			});
		});
	})
	.catch(function(err) {
		console.log("mongoose remove error");
		console.log(err);
	});
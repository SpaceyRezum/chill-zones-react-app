var Location = require('../api/locations/model');
var locationList = require('../assets/locations.json');
var najax = $ = require('najax');

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_SERVER);

var googleAPIUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='
var googleAPIkey = '&key=AIzaSyDZY5u6OOV3Xuh_EUp0sIML8maJTzakfyc'

Location.remove({})
.then(function() {
	locationList.forEach(function(location) {

		var url = googleAPIUrl + location.lat + ',' + location.lon + googleAPIkey;
			
		$.get(url, function(data) {

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
				
				response.address_components.forEach(function(component) {
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

				l.save();
			}
		});
	})
})
.then(function() {
  console.log("All locations are saved! Ctrl-C to exit.")
})
.catch(console.log);
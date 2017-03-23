var Location = require('../api/locations/model');
var locationList = require('../assets/locations.json');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/coolzones');

Location.remove({})
.then(function() {
	locationList.forEach(function(location) {
		var l = new Location();
		l.name = location.locationName;
		l.address = {};
		l.address.lat = location.lat;
		l.address.lon = location.lon;
		l.category = location.locationDesc;
		l.phone = location.phone;

		l.save();
	});
})
.then(function() {
  console.log("All locations are saved! Ctrl-C to exit.")
})
.catch(console.log);

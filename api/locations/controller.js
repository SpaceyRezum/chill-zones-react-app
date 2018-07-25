var Location = require('./model');
var najax = require('najax');

exports.index = function (req, res) {
  Location.find()
    .then(locations => {
      res.send(locations);
    });
}

exports.save = function (req, res) {
  var params = req.body;
  var apiUrl = 'https://maps.googleapis.com/maps/api/place/details/json?key=' + process.env.GOOGLE_API_KEY + '&placeid=' + params.placeId;
  najax.get(apiUrl).success(function (response) {
    var result = JSON.parse(response).result;
    var location = new Location({
      name: params.name,
      category: params.category,
      phone: result.formatted_phone_number ? result.formatted_phone_number : '',
      address: {
        lat: result.geometry.location.lat,
        lon: result.geometry.location.lng
      }
    });

    result.address_components.forEach(function (component) {
      if (component.types.includes('street_number')) {
        location.address.street = component.long_name + ' ';
      } else if (component.types.includes('route')) {
        location.address.street += component.long_name;
      } else if (component.types.includes('locality')) {
        location.address.city = component.long_name;
      } else if (component.types.includes('postal_code')) {
        location.address.postal_code += component.long_name;
      }
    });

    location.save()
    .then(res.status(200).json("Location updated successfully"))
    .catch(function (err) {
      console.log("mongoose save error");
      res.status(500).json(err);
    });
  }).error(function (err) {
    res.json(err)
  });
}

exports.show = function (req, res) {
  Location.findById(req.params.id)
    .then(location => res.send(location))
    .catch(err => {
      res.status(404);
      res.send("location not found");
    })
}

var Location = require('./model');

exports.index = function(req, res) {
  Location.find()
  .then(locations => res.send(locations))
}

exports.show = function(req, res) {
  Location.findById(req.params.id)
    .then(location => res.send(location))
    .catch(err => {
      res.status(404);
      res.send("location not found");
    })
}

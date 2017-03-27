var Post = require('./model');

exports.index = function(req, res) {
  Post.find()
  .then(locations => res.send(locations))
}

exports.show = function(req, res) {
  Post.findById(req.params.id)
    .then(location => res.send(location))
    .catch(err => {
      res.status(404);
      res.send("location not found");
    })
}

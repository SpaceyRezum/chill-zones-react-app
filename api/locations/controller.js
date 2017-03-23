var Post = require('./model');

exports.index = function(req, res) {
  Post.find()
  .then(posts => res.send(posts))
}

exports.show = function(req, res) {
  Post.findById(req.params.id)
    .then(post => res.send(post))
    .catch(err => {
      res.status(404);
      res.send("Post not found");
    })
}

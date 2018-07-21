var express = require('express');
var router = new express.Router();
var controller = require('./controller');

router.get('/', controller.index);
router.post('/', controller.save);
router.get('/:id', controller.show);

module.exports = router;

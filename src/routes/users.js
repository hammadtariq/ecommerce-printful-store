var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const a = listUser(req.body);
  res.json(a);
});

module.exports = router;

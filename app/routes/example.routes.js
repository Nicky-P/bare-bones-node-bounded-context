module.exports = (app) => {
  const example = require('../controllers/example.controller.js');

  var router = require('express').Router();
  app.use('/api/examples', router);

  router.post('/', example.create);

  router.get('/', example.findAll);
};

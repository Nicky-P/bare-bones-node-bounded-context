const db = require('../models');
const Examples = db.examples;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (req.body.userId == undefined) {
    res.status(400).send({
      message: 'Must supply a userId.',
    });
    return;
  }

  const example = {
    exampleText: req.body.exampleText,
    createdBy: req.body.userId,
    updatedBy: req.body.userId,
  };

  Examples.create(example)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the example.',
      });
    });
};

exports.findAll = (req, res) => {
  Examples.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retriving examples',
      });
    });
};

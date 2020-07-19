import { Request, Response } from 'express';
import db from '../models';
const Examples = db.examples;

export const create = (req: Request, res: Response) => {
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

export const findAll = (req: Request, res: Response) => {
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

import { Request, Response, NextFunction } from 'express';
import { createExampleResponseDec, getExamplesResponseDec } from '../routes/messages/exampleTypes';
import { assignDbResValidatorValues } from '../utils/helpers';
import db from '../models';
const Examples = db.examples;

export const create = (req: Request, res: Response, next: NextFunction) => {
  const example = {
    exampleText: req.body.exampleText,
    createdBy: req.body.userId,
    updatedBy: req.body.userId,
  };

  Examples.create(example)
    .then((data) => {
      assignDbResValidatorValues(res, data, createExampleResponseDec);
      next();
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the example.',
      });
    });
};

export const findAll = (req: Request, res: Response, next: NextFunction) => {
  Examples.findAll()
    .then((data) => {
      assignDbResValidatorValues(res, data, getExamplesResponseDec);
      next();
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retriving examples from the database',
      });
    });
};

import { Request, Response, NextFunction } from 'express';
import { createExampleResponseDec, getExamplesResponseDec } from '../routes/messages/exampleDb.types';
import { assignDbResValidatorValues } from '../utils/helpers';
import db from '../models';
const Examples = db.examples;

export async function create(req: Request, res: Response, next: NextFunction) {
  const example = {
    exampleText: req.body.exampleText,
    createdBy: req.body.userId,
    updatedBy: req.body.userId,
  };

  try {
    const data = await Examples.create(example);
    assignDbResValidatorValues(res, data, createExampleResponseDec);
    next();
  } catch (e) {
    res.status(500).send({
      message: e.message || 'Some error occurred while creating the example.',
    });
  }
}

export async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await Examples.findAll();
    assignDbResValidatorValues(res, data, getExamplesResponseDec);
    next();
  } catch (e) {
    res.status(500).send({
      message: e.message || 'Some error occurred while retriving examples from the database',
    });
  }
}

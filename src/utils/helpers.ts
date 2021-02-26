import * as D from 'io-ts/lib/Decoder';
import { Response } from 'express';
import { Model } from 'sequelize';

interface SimpleObject {
  [key: string]: any;
}

export const assignDbResValidatorValues = (res: Response, data: SimpleObject, decoder: D.Decoder<unknown, object>) => {
  const formatedData: SimpleObject = {};
  for (const property in data) {
    formatedData[property] = data[property] instanceof Model ? data[property].get({ plain: true }) : data[property];
  }

  res.locals.responseData = formatedData;
  res.locals.decoder = decoder;
};

export const assignEsResValidatorValues = (res: Response, data: any, decoder: D.Decoder<unknown, object>) => {
  res.locals.responseData = data;
  res.locals.decoder = decoder;
};

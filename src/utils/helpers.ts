import * as D from 'io-ts/lib/Decoder';
import { Response } from 'express';
import { Model } from 'sequelize';

interface SimpleObject {
  [key: string]: any;
}

export const assignDbResValidatorValues = (res: Response, data: SimpleObject, decoder: D.Decoder<unknown, object>) => {
  res.locals.responseData = data instanceof Model ? data.get({ plain: true }) : data;
  res.locals.decoder = decoder;
};

export const assignEsResValidatorValues = (res: Response, data: any, decoder: D.Decoder<unknown, object>) => {
  res.locals.responseData = data;
  res.locals.decoder = decoder;
};

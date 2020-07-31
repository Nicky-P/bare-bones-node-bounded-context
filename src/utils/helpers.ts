import * as D from 'io-ts/lib/Decoder';
import { Response } from 'express';
import { Model } from 'sequelize';

export const assignResValidatorValues = (res: Response, data: Model | Model[], decoder: D.Decoder<unknown, object>) => {
  res.locals.responseData = JSON.parse(JSON.stringify(data instanceof Model ? data.get({ plain: true }) : data));
  res.locals.decoder = decoder;
};

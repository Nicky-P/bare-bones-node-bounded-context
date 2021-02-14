import * as D from 'io-ts/lib/Decoder';
import { Response } from 'express';
import { Model } from 'sequelize';
import { SearchResponse } from '../controllers/exampleES.controller';

export const assignDbResValidatorValues = (res: Response, data: Model | Model[], decoder: D.Decoder<unknown, object>) => {
  res.locals.responseData = JSON.parse(JSON.stringify(data instanceof Model ? data.get({ plain: true }) : data));
  res.locals.decoder = decoder;
};

export const assignEsResValidatorValues = (res: Response, data: SearchResponse<any>, decoder: D.Decoder<unknown, object>) => {
  console.log(data.hits.hits);
  res.locals.responseData = JSON.parse(JSON.stringify(data.hits.hits.map(hit => hit._source)));
  res.locals.decoder = decoder;
};

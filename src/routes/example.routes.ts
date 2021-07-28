import { Application, Router, Request, Response, NextFunction } from 'express';
import * as dbController from '../controllers/v1/exampleDB.controller';
import { structureRequest, requestValidator, responseValidator } from '../utils/middleware';
import * as exampleDbTypes from './messages/v1/exampleDb.types';
import * as exampleEsTypes from './messages/v1/exampleEs.types';
import * as elasticController from '../controllers/v1/exampleEs.controller';

export default (app: Application) => {
  var router = Router();

  app.use(structureRequest);

  app.use('/api', router);

  router.post('/v1/examples', requestValidator(exampleDbTypes.createExampleRequestDec), dbController.create);

  router.get('/v1/examples', requestValidator(exampleDbTypes.emptyRequestDec), dbController.findAll);

  router.get('/v1/es/example-suggestion', requestValidator(exampleEsTypes.esExampleRequestDec), elasticController.getAll);

  app.use(responseValidator);

  app.use(function (req: Request, res: Response, next: NextFunction) {
    res.status(404).send(`Route: ${req.method} ${req.path} cannot be found.`);
  });
};

import { Application, Router, Request, Response, NextFunction } from 'express';
import * as dbController from '../controllers/exampleDB.controller';
import { structureRequest, requestValidator, responseValidator } from '../utils/middleware';
import * as exampleDbTypes from './messages/exampleDb.types';
import * as exampleEsTypes from './messages/exampleEs.types';
import * as elasticController from '../controllers/exampleEs.controller';

export default (app: Application) => {
  var router = Router();

  app.use(structureRequest);

  app.use('/api/examples', router);

  router.post('/', requestValidator(exampleDbTypes.createExampleRequestDec), dbController.create);

  router.get('/', requestValidator(exampleDbTypes.emptyRequestDec), dbController.findAll);

  router.get('/es/example-suggestion', requestValidator(exampleEsTypes.esExampleRequestDec), elasticController.getAll);

  app.use(responseValidator);

  app.use(function (req: Request, res: Response, next: NextFunction) {
    res.status(404).send(`Route: ${req.method} ${req.path} cannot be found.`);
  });
};

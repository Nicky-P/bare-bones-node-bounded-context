import { Application, Router, Request, Response, NextFunction } from 'express';
import * as exampleController from '../controllers/exampleDB.controller';
import { requestValidator, responseValidator } from '../utils/middleware';
import * as exampleTypes from '../routes/messages/exampleTypes';
import * as elasticController from '../controllers/exampleES.controller';

export default (app: Application) => {
  var router = Router();
  app.use('/api/examples', router);

  router.post('/', requestValidator(exampleTypes.createExampleRequestDec), exampleController.create);

  router.get('/', requestValidator(exampleTypes.emptyRequestDec), exampleController.findAll);

  router.get('/elasticSearch/', requestValidator(exampleTypes.emptyRequestDec), elasticController.getAll);

  app.use(responseValidator);

  app.use(function (req: Request, res: Response, next: NextFunction) {
    res.status(404).send(`Route: ${req.method} ${req.path} cannot be found.`);
  });
};

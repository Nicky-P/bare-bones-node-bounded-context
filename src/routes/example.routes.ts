import { Application, Router } from 'express';
import * as exampleController from '../controllers/example.controller';
import { requestValidator, responseValidator } from '../utils/middleware';
import * as exampleTypes from '../routes/messages/exampleTypes';

export default (app: Application) => {
  var router = Router();
  app.use('/api/examples', router);

  router.post('/', requestValidator(exampleTypes.createExampleRequestDec), exampleController.create);

  router.get('/', requestValidator(exampleTypes.emptyRequestDec), exampleController.findAll);

  app.use(responseValidator);
};

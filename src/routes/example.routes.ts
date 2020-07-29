import { Application, Router } from 'express';
import * as exampleController from '../controllers/example.controller';
import { validator } from '../utils/middleware';
import * as exampleTypes from '../routes/messages/exampleTypes';

export default (app: Application) => {
  var router = Router();
  app.use('/api/examples', router);

  router.post('/', validator(exampleTypes.createExampleRequestDec), exampleController.create);

  router.get('/', validator(exampleTypes.emptyRequestDec), exampleController.findAll);
};

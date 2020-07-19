import { Application, Router } from 'express';
import * as exampleController from '../controllers/example.controller';

export default (app: Application) => {
  var router = Router();
  app.use('/api/examples', router);

  router.post('/', exampleController.create);

  router.get('/', exampleController.findAll);
};

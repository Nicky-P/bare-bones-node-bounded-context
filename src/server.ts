import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './models';
import exmapleRoutes from './routes/example.routes';

const app: Application = express();

db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and re-sync db.');
});

var corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Bare Bones Node Bounded Context' });
});

exmapleRoutes(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

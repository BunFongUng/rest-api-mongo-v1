// load .env file.
require('dotenv').config();

// load modules
import express from 'express';

// load custom modules
import './configs/database';
import middlewares from './configs/middleware';
import errorHandlingMiddleware from './configs/error-handling-middleware';
import routes from './routes';

// console.log(routes);
// create the Express app
const app = express();

middlewares(app);

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
      message: 'Welcome to the REST API project!',
  });
});

// TODO setup your api routes here
app.use('/api/v1', routes);

// set up error handling middleware
errorHandlingMiddleware(app);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});

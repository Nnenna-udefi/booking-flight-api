const userRoutes = require('./userFlight');
const appRouter = (app, fs) => {
    // we've added in a default route here that handles empty routes
  // at the base API url
  app.get('/', (req, res) => {
    res.send('Welcome to the flight Api');
  });

  // run our user route module here to complete the wire up
  userRoutes(app, fs);
};

module.exports = appRouter;

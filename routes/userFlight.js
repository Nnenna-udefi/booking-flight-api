const userRoutes = (app, fs) => {

    // refactored helper methods
    const readFile = (
      callback,
      returnJson = false,
      filePath = dataPath,
      encoding = 'utf8'
    ) => {
      fs.readFile(filePath, encoding, (err, data) => {
        if (err) {
          throw err;
        }
  
        callback(returnJson ? JSON.parse(data) : data);
      });
    };
    const writeFile = (
      fileData,
      callback,
      filePath = dataPath,
      encoding = 'utf8'
    ) => {
      fs.writeFile(filePath, fileData, encoding, err => {
        if (err) {
          throw err;
        }
  
        callback();
      });
    };
      // variables
      const dataPath = './data/flight.json';
    
      // get all flights
      app.get('/flights', (req, res) => {
        readFile(data => {
          res.send(data);
        }, true);
      });
  
      // Get single flights
  //app.get('/flights/:id', (req, res) => {
  
    //readFile(data => {
      //const flightId = req.params['id'];
      //const { id } = req.params;
      //data[flightId] = req.body;
    //res.json(flightId.filter((ele) => ele.id === parseInt(id)));
    //res.send(data);
      // const flightId = req.params['id'];
      // data[flightId] = req.body;
      // res.json(flightId.filter((ele) => ele.id === parseInt(id)));
    //}, true);
    // const { id } = req.params;
    // res.json(flights.filter((ele) => ele.id === parseInt(id)));
  //});
  
      // Add /Book flight
  app.post('/flights', (req, res) => {
    readFile(data => {
      // Note: this needs to be more robust for production use. 
      // e.g. use a UUID or some kind of GUID for a unique ID value.
      const newFlight = Date.now().toString();
  
      // add the new flight
      data[newFlight] = req.body;
  
      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send('New Flight added');
      });
    }, true);
  });
  
  // Update/Edit flights
  app.put('/flights/:id', (req, res) => {
    readFile(data => {
      // add the new flight
      const flightId = req.params['id'];
      data[flightId] = req.body;
  
      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send(`Flights id:${flightId} updated`);
      });
    }, true);
  });
  // DELETE flight
  app.delete('/flights/:id', (req, res) => {
    readFile(data => {
      // add the new user
      const flightId = req.params['id'];
      delete data[flightId];
  
      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send(`Flights id:${flightId} removed`);
      });
    }, true);
  });
  
    };
    
    module.exports = userRoutes;
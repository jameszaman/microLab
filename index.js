const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.json({'Name': 'James'});
})


// Starting the server.
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running. 😁`);
});


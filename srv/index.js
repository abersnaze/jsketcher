const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const fs = require('fs');

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port http://localhost:${port}`));

app.use(express.static('dist'))

// create a route to POST uploads to.
const namePattern = /[a-z][a-z.]+/i
app.post('/upload/:userName/:fileName', (req, res) => {
  const userName = req.params.userName;
  if (!namePattern.test(userName)) {
    res.sendStatus(403);
  }
  const fileName = req.params.fileName;
  if (!namePattern.test(fileName)) {
    res.sendStatus(403);
  }

  fs.mkdirSync('uploads');
  fs.mkdirSync('uploads/' + userName);
  fs.writeFileSync('uploads/' + userName + '/' + fileName, req.body);
})

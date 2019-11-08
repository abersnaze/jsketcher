const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const fs = require('fs');
const getRawBody = require('raw-body')
var contentType = require('content-type')

app.use(express.static('dist'))
app.use(function (req, res, next) {
  getRawBody(req, {
    length: req.headers['content-length'],
    limit: '1mb',
    encoding: contentType.parse(req).parameters.charset
  }, function (err, string) {
    if (err) return next(err)
    req.text = string
    next()
  })
});
app.listen(port, () => console.log(`Listening on port http://localhost:${port}`));

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

  if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
  }
  if (!fs.existsSync('uploads/' + userName)) {
    fs.mkdirSync('uploads/' + userName);
  }
  fs.writeFileSync('uploads/' + userName + '/' + fileName, req.text);

  res.sendStatus(201);
})

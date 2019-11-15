const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const fs = require('fs');
const getRawBody = require('raw-body')
const contentType = require('content-type')
const os = require('os');

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

app.listen(port, () => {
  const ifaces = os.networkInterfaces();

  Object.values(ifaces).flat().forEach((iface) => {
    if ('IPv4' !== iface.family || iface.internal !== false || iface.netmask === '255.255.255.255') {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    console.log(`Listening on port http://${iface.address}:${port}`);
  });
});

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

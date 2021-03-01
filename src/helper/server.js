const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();
var cors = require('cors');

// app.use(bodyParser);
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());

let layout = {};


router.get('/layout', function (req, res) {
  // console.log(req.body);
  res.send(layout, 200)
});
router.post('/layout', function (req, res) {
  layout = req.body;
  res.send(layout, 200)

});
router.delete('/layout', function (req, res) {
  layout = {}
  res.send({}, 200)
});
router.post('/send_codes', function (req, res) {
  res.send(req.body, 200)
});

app.use('/api', router);
app.listen(3001);

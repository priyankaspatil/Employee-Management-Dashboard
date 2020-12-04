const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries');
const cors = require('cors');
const port = 3007;

// app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
});

// Employee(User) login/register api
app.get('/users', db.getUsers);
app.post('/users', db.checkUser);
app.post('/register', db.createUser);
app.put('/users/update/:username', db.updateUser);
app.delete('/deleteusers', db.deleteUser);

// Employee Details api
app.get('/empdetails', db.getEmpDetails);
app.post('/addempdetails', db.addEmpDetails);
app.delete('/deleteempdetails', db.deleteEmpDetails);
app.put('/updateempdetails/:empId', db.updateEmpDetails);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});

const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
const userRoute = require('./routes/user.route');
const app = express();
let port = 4000;
let initialize = require('./DB');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use('/user', userRoute);

const server = app.listen(port, function(){
    console.log('Listening on port ' + server.address().port);
});
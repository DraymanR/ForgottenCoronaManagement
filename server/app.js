const express = require('express');
const cors = require('cors');
require('dotenv').config();
const serverless = require('serverless-http');
const logger = require('./middlewares/logger');
// const logger = require('/middlewares/logger');
const errorMW = require('./middlewares/errors');
const member = require("./api/member");
const coronaData = require("./api/coronaData")
const auth = require("./api/auth");
const app = express();
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies to be sent with the request (if applicable)
  }));

app.use(express.json());
// app.use(express.urlencoded()) 
app.use('/auth', auth);
app.use('/member', member);
app.use('/corona-data',coronaData);
// const port = process.env.PORT || 3001;
// app.listen(port, () => {
//     console.log(`Server is up and running on port ${port}`);
// });
// app.listen(3001, () => {
//     console.log('server is up and running')
// });
module.exports.handler = serverless(app); // השתמש ב-handler
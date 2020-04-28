import { link } from "fs";

const http       = require('http');
const express    = require('express');

//Start Express-js
const app    = express();
const server = http.createServer(app);

//Load routes
const routes = require('./routes/');
const lib    = require('./lib/');

//Set middlewares
app.use(lib.allowCrossDomain);
app.get('/health', routes.health);
app.get('/test', routes.test);

app.listen(3000,()=>{
  lib.hello();
  console.log("Server started");
});
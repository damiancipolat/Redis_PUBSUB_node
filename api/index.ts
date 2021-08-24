const http:any    = require('http');
const express:any = require('express');
const bodyParser:any = require('body-parser');
const redis:any   = require("redis");

//Start Express-js
const app:any    = express();
const server:any = http.createServer(app);

//PORT.
const PORT:string = process.env.PORT||"8000";

//Create redis connection for read.
const client = redis.createClient({
  host: 'redis-server',
  port: 6379
});

//Create redis connection for publish.
const publisher = redis.createClient({
  host: 'redis-server',
  port: 6379
});

//Load routes
const {
  health,
  test,
  getKey,
  sendSms
} = require('./routes/');

const {
  allowCrossDomain,
  hello
} = require('./lib/');

//Set middlewares.
app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Set routes.
app.get('/health', health);
app.get('/test', test);
app.get('/key/:uuid',(req:any,res:any) => getKey(req,res,client));
app.post('/sms',(req:any,res:any) => sendSms(req,res,publisher));

app.listen(PORT,()=>{
  hello(PORT);
  console.log("Server started");
});
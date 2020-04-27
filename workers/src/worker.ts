const redis = require("redis");

const {
  onSubscribe,
  onMessage
} = require('./events');

//Define connections.
let subscriber:any;
let publisher:any;
let client:any;

try {  

  //We need to exclusive connection to use pub/sub.
  subscriber = redis.createClient();
  publisher  = redis.createClient();

  //This extra connection is to make updates.
  client = redis.createClient();  

  //Define events..
  subscriber.on("subscribe", onSubscribe);
  subscriber.on("message", (channel:string,message:string)=>onMessage(publisher, client, channel, message));

  //Subscribe.
  subscriber.subscribe("sms");
  subscriber.subscribe("sms_ok");
  subscriber.subscribe("sms_fail");

} catch(err){
  console.log('Error received', err);

  //On a critical error finish connections.
  subscriber.unsubscribe();
  subscriber.quit();
  publisher.quit();
  client.quit();

}
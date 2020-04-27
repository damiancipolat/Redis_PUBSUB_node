const redis = require("redis");

const {
  onSubscribe,
  onMessage
} = require('./events');

try {  

  //We need to exclusive connection to use pub/sub.
  const subscriber = redis.createClient();
  const publisher  = redis.createClient();

  //This extra connection is to make updates.
  const client = redis.createClient();
  
  //Define events..
  subscriber.on("subscribe", onSubscribe);
  subscriber.on("message", (channel:string,message:string)=>onMessage(publisher, client, channel, message));

  //Subscribe.
  subscriber.subscribe("sms");
  subscriber.subscribe("sms_ok");
  subscriber.subscribe("sms_fail");

} catch(err){
  console.log('Error received', err);
}
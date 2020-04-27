const redis = require("redis");

const {
  onSubscribe,
  onMessage
} = require('./events');

try {  

  const subscriber = redis.createClient();

  //Define events..
  subscriber.on("subscribe", onSubscribe);
  subscriber.on("message", onMessage);

  //Subscribe.
  subscriber.subscribe("sms");
  subscriber.subscribe("sms_ok");
  subscriber.subscribe("sms_fail");

} catch(err){
  console.log('Error received', err);
}
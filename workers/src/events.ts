//To fix TS-global-scope error.
export {};

const {
  readMap
} = require('./lib');

const {
  bindings
} = require('./channels');

//Redis events.
const onSubscribe = (channel:string, count:number)=>{
  console.log('Subscribed in channel:',channel);
};

const onMessage = async (channel:string, message:string)=>{

  console.log('MessageLog: channel',channel,'message',message);

  //Get the fucntion to process the message in the channel.
  const fn:any = readMap(bindings, channel);

  if (!fn)
    console.log('Message received in a unknow channel',channel);
  else  
    await fn(channel, message);

}

module.exports = {
  onSubscribe,
  onMessage
};
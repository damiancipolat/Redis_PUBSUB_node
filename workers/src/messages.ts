import { decode } from "punycode";

//To fix TS-global-scope error.
export {};

const {
  sendSMS
} = require('./service/sms');

const {
  decodeMessage
} = require('./lib');

//Subscribe events.
const newSMS = async (channel:string, message:string) => {
  
  //Decode the message.
  const msg = decodeMessage(message);
  
  //Validate the message.
  if (!(msg!=null&&msg.id&&msg.number&&msg.text))
      console.log('Bad message format:',message);

  //Send request.
  const result = await sendSMS(msg.number,msg.text);

  //Record in cache the operation status.
  console.log('SMS send result:',result);

  //recordStatus(msg.id,true);

};
  
const smsSendOk = (message:string) => {
  
};
  
const smsSendFail = (message:string) => {
  
};

module.exports = {
  newSMS,
  smsSendOk,
  smsSendFail
};
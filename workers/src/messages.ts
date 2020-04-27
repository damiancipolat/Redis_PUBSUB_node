//To fix TS-global-scope error.
export {};

const {
  sendSMS
} = require('./service/sms');

const {
  updateOrder,
  publishSuccess,
  publishFail
} = require('./service/orders');

const {
  decodeMessage
} = require('./lib');

//Subscribe events.
const newSMS = async (pub:any, client:any, channel:string, message:string) => {
  
  try{

    //Decode the message.
    const msg = decodeMessage(message);
    
    //Validate the message.
    if (!(msg!=null&&msg.uuid&&msg.number&&msg.text))
        console.log('Bad message format:',message);

    const {
      uuid,
      number,
      text
    } = msg;

    //Send request.
    const result = await sendSMS(uuid, number, text);
    console.log('SMS send result:',result);

    //Record in cache the operation status.  
    await updateOrder(client, uuid,'OK');
    
    //Publish in a queue.
    publishSuccess(client, uuid);

  } catch(err){

    //Detect sms sent exception.
    if (err&&err.status&&err.status==='SENT_ERROR')
      publishFail(client,err.uuid);

  }

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
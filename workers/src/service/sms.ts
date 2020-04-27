//To fix TS-global-scope error.
export {};

const config = require('config');
const fetch  = require('node-fetch');

//Get the urls.
const {
  sms_ok,
  sms_fail
} = config.get('services');

//Send a sms.
const sendSMS = async (phoneNumber:string, text:string)=>{

  console.log('SMS send to:',phoneNumber);

  //Make the request.
  const result = await fetch(sms_ok, { method: 'POST'});

  //If the request receive a fail throw an exception.
  if (result.status!=200)
    throw new Error('Error sending sms');

  //Fetch response.
  return await result.json();

};

module.exports = {
  sendSMS
};
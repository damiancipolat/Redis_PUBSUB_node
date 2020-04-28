export {};

const {
  getRandomInt,
  getOrder,
  publishSms
} = require('../service/');

//Mock endpoint.
const health = (req:any,res:any)=>{
  res.json({mode:"health"});
};

const test = (req:any,res:any)=>{
  res.json({
    mode:"test",
    value: getRandomInt(0,10)
  });
};

//Read from redis data about a key.
const getKey = async (req:any, res:any, client:any)=>{
  
  try {

    //Read from redis.
    const data = await getOrder(client,req.params.uuid);
    
    res.status(200).json({
      uuid:req.params.uuid,
      value:data
    });

  }catch(err){

    console.log('Error reading from redis',err);
    res.status(500).json({
      uuid:req.params.uuid,
      error:true,
      detail:err
    });

  }
  
};

//Create the message.
const buildSms = (number:string,text:string)=>{
    
  return {
    uuid: 'sms-'+new Date().getTime(),
    number,
    text
  };

}

//Receive the sms request and publish in redis.
const sendSms = async (req:any, res:any, publisher:any)=>{
  
  try {

    //Validate request.
    if (!(req.body&&req.body.number&&req.body.text)){
      
      res.status(400).json({
        detail:"Bad sms request."
      });
      
    }

    const {
      number,
      text
    } = req.body;

    //Publish into redis.
    const message:any = buildSms(number,text);
    const result:any  = publishSms(publisher,JSON.stringify(message));

    //Return if is success the publication.
    if (result)
      res.status(200).json(message);
    else
      res.status(500).json({uuid:1111,error:true});

  }catch(err){

    console.log('Error publishing from redis',err);
    res.status(500).json({
      error:'Error sending sms'
    });

  }
  
};

module.exports = {
  sendSms,
  health,
  test,
  getKey
};
//To fix TS-global-scope error.
export {};

interface Random{
  min:number,
  max:number
};

//Get random integer.
const getRandomInt = (values:Random)=>{
  return Math.floor(Math.random() * (values.max - values.min)) + values.min;
}

//Publish order success.
const publishSms = (client:any, message:string) => client.publish("sms", message);

//Update in redis the order by id.
const getOrder = (client:any, uuid:string)=>{
  
  return new Promise((resolve:any,reject:any)=>{

    client.get(uuid, (err:any, res:any)=>{

      if (err)
        reject(err);
      else
        resolve(res);

    });
    
  });

};

module.exports ={
  publishSms,
  getRandomInt,
  getOrder
};
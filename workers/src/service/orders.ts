//To fix TS-global-scope error.
export {};

//Update in redis the order by id.
const updateOrder = (client:any, uuid:string, status:string)=>{
  
  return new Promise((resolve:any,reject:any)=>{

    client.set(uuid,status, (err:any, res:any)=>{

      if (err)
        reject(err);
      else
        resolve(res);

    });
    
  });

};

//Publish order success.
const publishSuccess = (client:any, uuid:string) => client.publish("sms_ok", "success");

//Publish order fail.
const publishFail = (client:any, uuid:string) => client.publish("sms_fail", "fail");

module.exports = {
  publishFail,
  publishSuccess,
  updateOrder
};
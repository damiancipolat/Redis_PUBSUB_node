import type { 
  channelMapType, 
  channelType 
} from "../types";

/*
  Read the channel map and return the processor
  function by the channel name.
*/
const readMap = (map:channelMapType, key:string):any => {

  //Find the function in the channel.
  const fn:any = map.find((elem:channelType)=>elem&&elem.length>0&&elem[0]===key);

  return (fn&&fn.length>0)?fn[1]:null;

} 

//Receive a message and decode it.
const decodeMessage = (message:string):any=>{

  try{
    return JSON.parse(message);
  }catch(err){
    return null;
  }

}

module.exports = {
  readMap,
  decodeMessage
};

const service = require('../service/');

const health = (req:any,res:any)=>{
  res.json({mode:"health"});
};

const test = (req:any,res:any)=>{
  res.json({
    mode:"test",
    value: service.getRandomInt(0,10)
  });
};

module.exports = {
  health,
  test
};
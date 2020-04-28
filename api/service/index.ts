interface Random{
  min:number,
  max:number
};

const getRandomInt = (values:Random)=>{
  return Math.floor(Math.random() * (values.max - values.min)) + values.min;
}

module.exports ={
  getRandomInt
};
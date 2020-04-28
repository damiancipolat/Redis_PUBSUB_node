const hello = ()=>{
    console.log("Hello mock");
};

//Add CORS to middleware.
const allowCrossDomain = (req:any, res:any, next:any)=>{

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
    // Intercepts OPTIONS method
    if ('OPTIONS' === req.method)      
      res.sendStatus(200);
    else
      next();
  
}

module.exports ={
  hello,
  allowCrossDomain
};
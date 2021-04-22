const cors=(req, res, next) => {
    // Mọi domain
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
   
    // Domain nhất định
    // res.header("Access-Control-Allow-Origin", "https://freetuts.net");
   
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  };

module.exports= cors;
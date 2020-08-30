module.exports = function(app, db) {

  
  app.get('/api/login/:id/:password', (req, res) => {
    processData(res, "SELECT act_name, time_taken, coords FROM user where username == ? and password == ?",[req.params.id,req.params.password]);
  });

  app.get('/api/login/coords', (req, res) => {
    processData(res, "SELECT act_name, time_taken, coords FROM user ",[]);
  });
  

  
  
};

function processData(res, sql,values){
  db.serialize(function() {
    db.all(sql,values, 
      function(err, rows) {
        if(err){
          console.error(err);
          res.status(500).send(err);
        }
        else
          sendData(res, rows, err);
    });
  });
}

function sendData(res, data, err){
  res.setHeader("Access-Control-Allow-Origin","*");

  if(data[0])
    res.send(data);
  
  else{
    res.status(404).send("User not found");
  }
}
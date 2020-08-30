module.exports = function(app, db) {

  
  app.get('/api/login/:uname/:pword', (req, res) => {
    console.log('logging in');
    login(db,res, "SELECT act_name, time_taken, coords FROM user where username == ? and password == ?",[req.params.uname,req.params.pword]);
  });

  app.get('/api/login/coords', (req, res) => {
    processData(db,res, "SELECT act_name, time_taken, coords FROM user ",[]);
  });
  

  
  
};

function login(db,res, sql,values){
  db.serialize(function() {
    db.all(sql,values, 
      function(err, rows) {
        if(err){
          console.error(err);
          res.status(500).send(err);
        }
        else{
          if (rows.length > 0) {
            res.send({"Success":true});
          } else {
            res.send({"Success":false});
          }
         
        }
          
    });
  });
}

function processData(db,res, sql,values){
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
module.exports = function(app, db) {

  
  app.get('/api/login/:uname/:pword', (req, res) => {
    console.log('logging in');
    login(db,res, "SELECT username FROM user where username == ? and password == ?",[req.params.uname,req.params.pword]);
  });

  app.get('/api/getacts', (req, res) => {
    processData(db,res, "SELECT act_name, time_taken, lat, long FROM user ",[]);
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
        else {
          if (rows.length > 0) {
            res.send(rows);
          } else {
            res.send({"data": false});
          }
        }
          
    });
  });
}

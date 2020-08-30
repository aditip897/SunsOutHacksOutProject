module.exports = function (app, db) {


    app.post('/api/signup/', (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        var user = req.body;
        console.log(user);
        console.log('inserting');
        insertUser(user, db,res);
    });

    app.post('/api/act/', (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");

        var activity = req.body;
        insertAct(activity, db,res);

    });
};



function insertUser(user, db,res) {
    var userName = user.userName;
    var pword = user.pword;
    console.log(user);


    var sql = `insert into user (username, password) 
            VALUES 
            (?, ?);`;

    var values = [userName, pword];

    db.serialize(function () {
        db.run(sql, values, function (err) {
            if (err) {
                console.error(err);
                res.send({"success": false});
            }

            else{
                res.send({"success": true});
            }
                
        });
    });
}

function insertAct(act, db,res) {
    console.log(act);
    var userName = act.userName;
    var act_name  = act.actName;
    var time_taken = act.hrs+"hrs "+act.mins+"mins" ;
    var lat = act.lat;
    var long = act.long;
    

    var sql = `update user set act_name = ?, time_taken = ?, lat = ?, long = ?
            where username = ?;`;

    var values = [act_name, time_taken,lat, long, userName];

    db.serialize(function () {
        db.run(sql, values, function (err) {
            if (err) {
                console.error(err);
                res.send({"success": false});
            }

            else
            res.send({"success": true});
        });
    });
}


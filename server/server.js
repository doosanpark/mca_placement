var express = require('express');
var mysql = require('mysql');
var dbconfig = require('./database.js');
var connection = mysql.createConnection(dbconfig);
const cors = require('cors');
var app = express();

// configuration ===============================================================
app.set('port', process.env.PORT || 3001);
app.use(cors());


app.put('/setnewmember', function (req, res) {
    var data = '';

    req.on('data', function (chunk) {
        data += chunk;
    });
    req.on('end', function () {
            let sp = data.split("\"");
            connection.query('INSERT INTO MEMBERS (NAME) VALUES(?)', sp[3], function(err, rows, fields){
                if(err){
                    console.log("err", err);
                }
                else{
                    res.send("Input Succeed");
                }
            })
        }
    )
});

app.get('/getmembers', function (req, res) {


    connection.query('SELECT * from MEMBERS ORDER BY RAND()', function (err, rows, fields) {
        if (!err) {
            /*console.log('The solution is: ', rows);*/
            res.send(rows);
        } else {
            console.log('Error while performing Query.', err);
        }
    });

});

app.delete('/delete_member', function(req, res){
    var data = "";
    req.on('data', function (chunk) {
        data += chunk;
    });

    req.on('end', function () {
        let sp = data.split("\"")[2].split(":")[1].split("}")[0].split("\'")[0];
            console.log("데이터", sp);
        connection.query('DELETE FROM MEMBERS WHERE ID=(?)', sp, function(err, rows, fields){
            if(err){
                console.log("err", err);
            }
            else{
                res.send("Delete Succeed");
            }
        })
        }
    )

   /* */
});


app.get('/', function (req, res) {
    res.send('Root');
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
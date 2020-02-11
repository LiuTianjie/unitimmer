var express = require("express");
var querystring = require('querystring');
var mysql = require('mysql');
// post需要
var bodyParser = require("body-parser");
var app = express();
var https=require('https'),fs=require('fs');
var options={
	key:fs.readFileSync(''),
	cert:fs.readFileSync('')
};
// post需要
app.use(bodyParser.urlencoded({ extended: true }));

// 跨域
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// 配置数据库信息
var connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'unitimmer'
});

// 连接
connection.connect();

// 获取类型列表
app.get("/getType", function (req, res) {
	
  var sql = 'select * from card order by unitime desc';
  connection.query(sql , function (err, data) {
    if (err) {
      console.log(err);
    } else {
      var result = {
        "status": "200",
        "message": "success",
      }
      result.data = data;
      res.end(JSON.stringify(result));
    }
  });
});

// 添加类型
app.post("/addType", function (req, res) {
  var params = [req.body.unitime,req.body.content,req.body.image_url,req.body.photo_url,req.body.nickname];
  console.log(params);
  var sql = 'INSERT INTO card VALUES (?,?,?,?,?)'; 
  connection.query(sql, params, function (err, data) {
    if (err) {
      res.end('error')
    } else {
      var result = {
        "status": "200",
        "message": 'success',
      }
      res.end(JSON.stringify(result))
    }
  });
});

//删除型
app.post("/delType", function (req, res) {
  var params = req.body.unitime;
  console.log(params);
  var sql = 'DELETE FROM card WHERE unitime = ?'; 
  connection.query(sql, params, function (err, data) {
    if (err) {
      res.end('error')
    } else {
      var result = {
        "status": "200",
        "message": 'success',
      }
      res.end(JSON.stringify(result))
    }
  });
});
//获取七牛云token
app.get("/gettoken", function (req, res) {
	const qiniu = require("qiniu");
	//客户端调用接口，生成token
	let accessKey = '';
	let secretKey = '';
	let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
	let options = {
	  scope: 'nickname4th' //七牛资源目录
	};
	let putPolicy = new qiniu.rs.PutPolicy(options);
	let uploadToken = putPolicy.uploadToken(mac);
	console.log(uploadToken);
	res.end(JSON.stringify(uploadToken))
});

// app.listen(3000);
https.createServer(options,app).listen(3000);
console.log('3000 running');
var express = require('express');
var mysql = require('mysql');
var config = require('../views/config/config')
var connection = mysql.createConnection(config.db);
var router = express.Router();

var names = [
	"casey",
	"bob",
	"jim",
	"bill"
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signupProcess', (req,res,next)=>{
	var name = req.body.name
	var phone = req.body.phone
	var email = req.body.email
	insertQuery = `INSERT INTO user VALUES (2,?,?,?)`
	connection.query(insertQuery,[name,phone,email],(error,results)=>{
		if(error){
			throw error
		}else{
			res.redirect('/success')
		}
	})
})

router.get('/success', (req,res,next)=>{
	console.log(req.query)
	var id = req.query.id
	console.log(id)
	getQuery = 	`SELECT * FROM user`
	connection.query(getQuery, (error,results)=>{
		if(error){
			throw error
		}else{
			res.render('success', { name: results })
		}
	console.log(results)
	})
})

// router.get('/success', (req,res,next)=>{
// 	res.render('success',{names: names})
// })

module.exports = router;

var Db = require('mongodb').Db;



exports.index = function(req,res){
    var util = require('util');
    if (req.query.user !== undefined){
    	console.log("User query for "+ req.query.user  );
    	 Db.connect("mongodb://localhost:27017/move_v001", function(err, db) {
 		 	var acc = db.collection('account');
 		    acc.findOne({'profile.user': ''+req.query.user+''},function(err,item){
 		        if (item){
 		    		console.log("user id:  " + JSON.stringify(item) );
 		    		res.send("result  "+ JSON.stringify(item));
 		    	}
 		    	else {
 		    	  res.send("result  "+ JSON.stringify({msg: 'no results'}));
 		    	}
 		    });    
 		 });    
 			 
    }
    else {
    	console.log("invalid  query");
    	res.send("request received - invalid ");
    }
    
	 
};

exports.new = function(req,res){
   res.send("request received ");
};

exports.create = function(req,res){
      var new_account = {};
      
      if ( (req.body.email !== undefined) && 
           (req.body.user !== undefined) &&
           (req.body.pass !== undefined) ){
           
      		new_account.id = req.body.email;
      		new_account.profile = {};
      		new_account.profile.email = req.body.email;
      		new_account.profile.user = req.body.user;
      		new_account.profile.pass = req.body.pass;
      		new_account.profile.lastLogin = new Date();
      		new_account.profile.city = "Brooklyn";
      		new_account.profile.state = "NY";
      		new_account.last_checkin = {long: '324',lat:'34324'}; 
      		
      		console.log(require('util').inspect(new_account) );
      
      
      
      		 Db.connect("mongodb://localhost:27017/move_v001", function(err, db) {
 		        var acc = db.collection('account');
 		        acc.insert(new_account,{w:1}, function(err,result){
 		        	if (!err){
 						console.log("account Success");
 					}
 					else {
 				  		console.log("account Failed insert ");
 					}	
 		        });
 			 });    
      }
      else {
      	console.log("Invalid or incomplete request ");
      } 
      
      
      
       
     
 
    res.send("Request submitted");
};

exports.show = function(req,res){
	 res.send("request received ");
};

exports.destroy = function(req,res){  
  res.send("request received ");
};

exports.edit = function(req,res){
	 res.send("request received ");
};

exports.update = function(req,res){
	 res.send("request received ");
};


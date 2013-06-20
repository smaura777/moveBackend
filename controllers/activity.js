var Db = require('mongodb').Db;



exports.index = function(req,res){
    var util = require('util');
    if (req.query.id !== undefined){
    	console.log("User query for "+ req.query.id  );
    	 Db.connect("mongodb://localhost:27017/move_v001", function(err, db) {
 		 	var act = db.collection('activity');
 		    act.find({id : ''+req.query.id+''}).toArray(function(err, items) {
 		    	if (!err){
 		    	  // console.log( "content of result "+ require('util').inspect(items));
 		    	   console.log( "content of result "+ JSON.stringify(items));
 		    	   
 		    	   res.send(JSON.stringify(items));
 		    	}
 		    	else {
 		    	     console.log("fail mongo  query");
    	              res.send("fail mongo  query");
 		    	}
 		    	
 		    	
 		    });
 		 });    
 			 
    }
    else {
    	console.log("invalid  query");
    	res.send("request received - invalid ");
    }
    
	 
};


exports.indexJSON = function(req,res){
   var response = [{'title': 'Hello JSON world', 'subtitle':'This is a subtitle', 'description':'This is a blog post'},
      {'title': 'Hello 2 JSON world', 'subtitle':'This is a subtitle', 'description':'This is a blog post'}
   ];
   
   res.send(response);
};


exports.new = function(req,res){
   res.send("request received ");
};

exports.create = function(req,res){
      var new_activity = {};
      
      if ( (req.body.id !== undefined) && 
           (req.body.name !== undefined) &&
           (req.body.type !== undefined) ){
           
      		new_activity.id = req.body.id;
      		new_activity.activity = {};
      		new_activity.activity.name = req.body.name;
      		new_activity.activity.type = req.body.type;
      		new_activity.activity.date = new Date();
      		new_activity.activity.details = {};
      	
      		if (req.body.sport !== undefined)
      			new_activity.activity.details.name = req.body.sport;
      		
      		
      		if (req.body.weight !== undefined)
      			new_activity.activity.details.weight = req.body.weight;
      			
      			
      	    if (req.body.rep !== undefined)
      			new_activity.activity.details.rep = req.body.rep;		
      		
      		if (req.body.sets !== undefined)
      			new_activity.activity.details.sets = req.body.sets;		
      		
      		// running 	
      		
      		if (req.body.distance !== undefined)
      			new_activity.activity.details.distance = req.body.distance;		
      		
      		if (req.body.speed !== undefined)
      			new_activity.activity.details.speed = req.body.speed;		
      		
      		
      		console.log(require('util').inspect(new_activity) );
      
      		 Db.connect("mongodb://localhost:27017/move_v001", function(err, db) {
 		        var acc = db.collection('activity');
 		        acc.insert(new_activity,{w:1}, function(err,result){
 		        	if (!err){
 						console.log("activity Success");
 					}
 					else {
 				  		console.log("activity Failed insert ");
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


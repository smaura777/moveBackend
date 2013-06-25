var Db = require('mongodb').Db;



exports.index = function(req,res){
    console.log("activity list ....");
    var util = require('util');
    //if (req.query.id !== undefined){
    	console.log("User query for "+ req.query.id  );
    	 Db.connect("mongodb://localhost:27017/move_v001", function(err, db) {
 		 	var act = db.collection('activity');
 		    //act.find({id : ''+req.query.id+''}).toArray(function(err, items) {
 		     act.find().toArray(function(err, items) {
 		    	if (!err){
 		    	  // console.log( "content of result "+ require('util').inspect(items));
 		    	   console.log( "content of result "+ JSON.stringify(items));
 		    	   console.log("Array length: "+ items.length)
 		    	   res.set('Content-Type','application/json'); 
 		    	   res.send(JSON.stringify(items));
 		    	  
 		    	}
 		    	else {
 		    	     console.log("fail mongo  query");
    	              res.send("fail mongo  query");
 		    	}
 		    	
 		    	
 		    });
 		 });    
 			 
    //}
   /* else {
    	console.log("invalid  query");
    	res.send("request received - invalid ");
    }*/
    
	 
};


exports.indexJSON = function(req,res){
    console.log("activity list ....JSON ");
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
	 
	 if ( req.route.params['id'] !== undefined){
		console.log("Will delete activity with id " + req.route.params['id']);
		
		res.set('Content-Type','application/json');
		//var errorMessage = {'status': 200, 'message': "Will display activity with id " + req.route.params['id']}; 
		//res.send(errorMessage);
		
		 Db.connect("mongodb://localhost:27017/move_v001", function(err, db) {
		 	 var acc = db.collection('activity');
		 	  acc.find({"id":""+req.route.params['id']+""}).limit(1).toArray(function(err, items) {
		 	 	if (!err){
		 	 	   console.log( "content of result "+ JSON.stringify(items));
 		    	   console.log("Array length: "+ items.length)
 		    	   res.set('Content-Type','application/json'); 
 		    	   res.send(JSON.stringify(items));
		 	 	}
		 	 	else {
		 	 		console.log("Could not display item ");
		 	 	}
		 	 	
		 	 });
		 });
		
		
	}
	else {
		console.log("Missing ID in request");
		res.set('Content-Type','application/json');
		var errorMessage = {'status': 500, 'message':'Missing ID parameter in request'}; 
		res.send(errorMessage);
	}		

	 

};



exports.destroy = function(req,res){  
    
    console.log(" request id " +req.route.params['id']);
     
	if ( req.route.params['id'] !== undefined){
		console.log("Will delete activity with id " + req.route.params['id']);
		
		res.set('Content-Type','application/json');
		var errorMessage = {'status': 200, 'message': "Will delete activity with id " + req.route.params['id']}; 
		res.send(errorMessage);
		
		 Db.connect("mongodb://localhost:27017/move_v001", function(err, db) {
		 	 var acc = db.collection('activity');
		 	 acc.remove({'id':""+req.route.params['id']+""},function(err,result){
		 	 	if (!err){
		 	 		console.log("Item deleted");
		 	 	}
		 	 	else {
		 	 		console.log("Could not delete item ");
		 	 	}
		 	 	
		 	 });
		 });
		
		
	}
	else {
		console.log("Missing ID in request");
		res.set('Content-Type','application/json');
		var errorMessage = {'status': 500, 'message':'Missing ID parameter in request'}; 
		res.send(errorMessage);
	}		

};

exports.edit = function(req,res){
	 res.send("request to edit  received ");
};

exports.update = function(req,res){
	 console.log(" request id " +req.route.params['id']);
     
	if ( (req.route.params['id'] !== undefined) &&
	   (req.body.name !== undefined ) &&
	    (req.body.type !== undefined)  ){
	    
		console.log("Will update activity with id " + req.route.params['id']);
		
		res.set('Content-Type','application/json');
		var errorMessage = {'status': 200, 'message': "Will update activity with id " + req.route.params['id']}; 
		res.send(errorMessage);
		
		 Db.connect("mongodb://localhost:27017/move_v001", function(err, db) {
		 	 var acc = db.collection('activity');
		 	 acc.update({'id':""+req.route.params['id']+""}, {$set: {'activity.name':""+req.body.name+"",'activity.type':""+req.body.type+""} },
		 	  function(err,result){
		 	 	if (!err){
		 	 		console.log("Item updated");
		 	 	}
		 	 	else {
		 	 		console.log("Could not update item ");
		 	 	}
		 	 	
		 	 });
		 });
		
		
	}
	else {
		console.log("Missing ID in request");
		res.set('Content-Type','application/json');
		var errorMessage = {'status': 500, 'message':'Missing ID parameter in request'}; 
		res.send(errorMessage);
	}		

};


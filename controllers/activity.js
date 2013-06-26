var Db = require('mongodb').Db;



exports.index = function(req,res){
    console.log("activity list ....");
    var util = require('util');
    
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
           
      		new_activity.uid = req.body.id;
      		new_activity.name = req.body.name;
      		new_activity.type = req.body.type;
      		new_activity.date = new Date();
      		//new_activity.activity.details = {};
      	
      		
      		
      		if (req.body.weight !== undefined)
      			new_activity.weight = req.body.weight;	
      			
      	    if (req.body.reps !== undefined)
      			new_activity.reps = req.body.reps;		
      		
      		if (req.body.sets !== undefined)
      			new_activity.sets = req.body.sets;	
      			
      	     if (req.body.weight !== undefined)
      			new_activity.weight = req.body.weight;				
      		
      		if (req.body.distance !== undefined)
      			new_activity.distance = req.body.distance;		
      		
      		if (req.body.speed !== undefined)
      			new_activity.speed = req.body.speed;	
      			
      	    if (req.body.duration !== undefined)
      			new_activity.duration = req.body.duration;	
      		
      		if (req.body.heart_rate !== undefined)
      			new_activity.heart_rate = req.body.heart_rate;				
      		
      		
      		console.log(require('util').inspect(new_activity) );
      
      		 Db.connect("mongodb://localhost:27017/move_v001", function(err, db) {
 		        var acc = db.collection('activity');
 		        acc.insert(new_activity,{w:1}, function(err,result){
 		        	if (!err){
 						console.log("activity creation Success");
 					}
 					else {
 				  		console.log("activity creation Failed insert ");
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
    var  ObjectID = require('mongodb').ObjectID;
     
	if ( req.route.params['id'] !== undefined){
		console.log("Will delete activity with id " + req.route.params['id']);
		
		res.set('Content-Type','application/json');
		var errorMessage = {'status': 200, 'message': "Will delete activity with id " + req.route.params['id']}; 
		res.send(errorMessage);
		
		 Db.connect("mongodb://localhost:27017/move_v001", function(err, db) {
		 	 var acc = db.collection('activity');
		 	 acc.remove({'_id': ObjectID(req.route.params['id']) },function(err,result){
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
     var  ObjectID = require('mongodb').ObjectID;
     
	if ( (req.route.params['id'] !== undefined) &&
	   (req.body.name !== undefined ) &&
	    (req.body.type !== undefined)  ){    
		console.log("Will update activity with id " + req.route.params['id']);
		res.set('Content-Type','application/json');
		var updated_activity = {};
	    updated_activity.name =  req.body.name;
	    updated_activity.type = req.body.type;			
		
		    if (req.body.weight !== undefined)
      			updated_activity.weight = req.body.weight;	
      			
      	    if (req.body.reps !== undefined)
      			updated_activity.reps = req.body.reps;		
      		
      		if (req.body.sets !== undefined)
      			updated_activity.sets = req.body.sets;	
      			
      	     if (req.body.weight !== undefined)
      			updated_activity.weight = req.body.weight;				
      		
      		if (req.body.distance !== undefined)
      			updated_activity.distance = req.body.distance;		
      		
      		if (req.body.speed !== undefined)
      			updated_activity.speed = req.body.speed;	
      			
      	    if (req.body.duration !== undefined)
      			updated_activity.duration = req.body.duration;	
      		
      		if (req.body.heart_rate !== undefined)
      			updated_activity.heart_rate = req.body.heart_rate;		
	
		console.log(" Data to be Updated : \n\n  "+ require('util').inspect(updated_activity) );
		 Db.connect("mongodb://localhost:27017/move_v001", function(err, db) {
		 	 var acc = db.collection('activity');
		 	 acc.update({'_id': ObjectID(req.route.params['id'])}, {$set: updated_activity},
		 	  function(err,result){
		 	 	if (!err){
		 	 		console.log("Item updated");
					var successMessage = {'status': 200, 'message': "updated activity with id " + req.route.params['id']}; 
					res.send(successMessage);
		 	 	}
		 	 	else {
		 	 		console.log("Could not update item ");
		 	 		var errorMessage = {'status': 500, 'message': "failed to update activity with id " + req.route.params['id']}; 
					res.send(errorMessage);
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


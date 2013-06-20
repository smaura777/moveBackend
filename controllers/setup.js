var Db = require('mongodb').Db;

exports.index = function(req,res){
	 res.send("request received ");
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
      Db.connect("mongodb://localhost:27017/move_v001", function(err, db) {
 		if (!err){
 			console.log("We are connected !");
 			
 			var activity_col = db.collection('activity');
 			var goal_col = db.collection('goal');
 			var place_col = db.collection('place');
            var account_col =  db.collection('account');
            var checkins_col = db.collection('checkins');  
             
 			var now = new Date();
 			
 			var account_doc = {id: 'smaura@icloud.com', profile: { 
 				user: "swizzleMafia",
 				pass: "1492Columbus",
 				firstname: 'samuel',
 				lastname: 'maura',
 				email: 'smaura@icloud.com',
 				lastLogin:''+now+'',
 				city: "Brooklyn",
 				state : "NY",
 				country: "USA",
 				favorite_sport: "tennis",
 				bragging_rights: "80lbs lift"   
 				},
 				last_checkin: {long: "2131",lat:"343"} 
 			 };
 			
 			var activity_doc = {
 				id: 'smaura@icloud.com',
 				activity : {
 							  	name : "Jogging", 
 								type: "cardio", 
 								date: ''+now+'', 
 								terrain: "flat", 
 								treadmil: "No", 
 				                session_stat: { distance: "4", unit: "miles", duration: "20minutes" }
 				              
 				           }
 			};
 			
 			
 			var goal_doc = { 	id: 'smaura@icloud.com',
 			                   activity : {name : "Jogging", type: "cardio", date: ''+now+'', terrain: "flat", treadmil: "No", 
 				              session_stat: { distance: "4", unit: "miles", duration: "20minutes" }
 				              
 				           }
 			
 			};
 			
 			var place_doc = {
 				  	id: 'smaura@icloud.com',
 				  	place: "NYSC",
 				  	location: {long:"342",lat:"23234"},
 				  	city: "New York",
 				  	state: "NY",
 				  	country: "USA" ,
 				  	last_checkin: "10:30pm"
 				  	
 			};
 			
 			// Checkins 
 			
 			var checkin_doc = {
 						id: 'smaura@icloud.com',
 						location: {long:"342",lat:"23234"}
 			};
 			
 			
 			// Create account doc
 			account_col.insert(account_doc,{w:1},function(err,result){
 				if (!err){
 					console.log("account Success");
 				}
 				else {
 				  console.log("account Failed insert ");
 				}		
 			});
 			
 			
 			// Activity doc
 			activity_col.insert(activity_doc,{w:1},function(err,result){
 				if (!err){
 					console.log("activity Success");
 				}
 				else {
 				  console.log("activity Failed insert ");
 				}		
 			});
 			
 			// Goal doc
 			
 			goal_col.insert(goal_doc,{w:1},function(err,result){
 				if (!err){
 					console.log("Goal  Success");
 				}
 				else {
 				  console.log("Goal Failed insert ");
 				}		
 			});
 			
 			// Place doc
 			place_col.insert(place_doc,{w:1},function(err,result){
 				if (!err){
 					console.log("Place Success");
 				}
 				else {
 				  console.log("Place Failed insert ");
 				}		
 			});
 			
 			// checkin doc
 			checkins_col.insert(checkin_doc,{w:1},function(err,result){
 				if (!err){
 					console.log("checkin Success");
 				}
 				else {
 				  console.log("checkin  Failed insert ");
 				}		
 			});
 			
 		}
 		else {
 			console.log("Error connecting to mongodb database ");
 		}
 	});    
 
    res.send("Request submitted");
};

exports.show = function(req,res){
	 res.send("request received ");
};

exports.destroy = function(req,res){
	 console.log("WILL DELETE Database ...");
  Db.connect("mongodb://localhost:27017/move_v001", function(err, db) {
  
  		if (!err){
  			// Delete database 
  			db.dropDatabase(function(){
  				console.log("Database removed...");
  			});
  		}
  		
  }); // End Connect 
  
  res.send("request received ");
};

exports.edit = function(req,res){
	 res.send("request received ");
};

exports.update = function(req,res){
	 res.send("request received ");
};


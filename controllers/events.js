var Db = require('mongodb').Db;


var activity = {
	user     : "sam@google.com" ,
	 category  :  "Weight training",
	 date  : "...", 
	 details   :  {name: "Bench Presser", weight: "80", unit: "lbs", reps : "10", sets : "4" }
	
};

var goal = { 
   	user     : "sam@google.com" ,
   	 category  :  "Weight training",
	 date  : "..."
};

var gym = {
     	user     : "sam@google.com" ,
	checkin: "",
	checkout: "",
	location : ""
};

var question = {};

var tips = {};



var events = [{
            id : 1, 
            owner : "sam@google.com" ,
		    title  :  "this is Event One",
		  calendar : "default calendar",
		  organization : "google inc" ,
	  description  : "This is a hackathon event",
	     location  : "Home",
	   geolocation : {
	                   longitude : 10.5 ,
	                   latitude  :  44.5  
	                 },
	      allday   : "no",
	      duration : '12h',   
	          from : '10:30 PM', 
	            to : '10:30 AM',
	      reminder : "10m",   
	      availability: {
	      	  busy: "yes"
	      } 
	            
}];



/**
var calendar = 
		{ owner : "sam@google.com" 
		  name : "default calendar",
		  events : [event]
		}	
;

var users = [
	{
	      email : "sam@google.com",
	   password : "sandal",
	   username: "sam",
	   name : {
	    	first: "samuel",
	    	last:  "last"
	     } 
		
	}
];
**/


// Event listings

var dbList = [ 
	{db : 'gymapp', collections : ['gym','goal','activity'] },
    {db : 'gymapp_copy', collections : ['gym','goal','activity'] }
];



exports.settings = function(req,res){
	res.render('events/setup', {'title' : events[0].title});
}



 
 exports.setupDB = function(req,res){
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
 				activity : {name : "Jogging", type: "cardio", date: ''+now+'', terrain: "flat", treadmil: "No", 
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
 }
 

// Remove DB
exports.destroyDB = function(req,res){
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

exports.index = function(req,res){
	//res.send(events);
	res.render('events/index',{'title' : events[0].title});
};

exports.new = function(req,res){
  res.send("displaying event form ");
};

exports.create = function(req,res){
	var idx = parseInt(events.length + 1) ;
	
	console.log( "Event count " + events.length + " idx = " + idx + " (events.length + 1) = " + parseInt(events.length + 1) + " ");
	  
	events[events.length] = {
            id : idx, 
            owner : "sam@google.com" ,
		    title  :  req.body.title,
		  calendar : ((typeof req.body.calendar != undefined ) &&  (req.body.calendar !== "") ) ? req.body.calendar : "default calendar",
		  organization : "google inc" ,
	  description  : req.body.description,
	     location  : "Home",
	   geolocation : {
	                   longitude : 10.5 ,
	                   latitude  :  44.5  
	                 },
	      allday   : req.body.allday,
	      duration : '12h',   
	          from : '10:30 PM', 
	            to : '10:30 AM',
	      reminder : "10m",   
	      availability: {
	      	  busy: req.body.availability
	      } 
	            
    };
    console.log("Helloooo");
    console.log(events[idx - 1 ]);
    res.send("Event " + req.body.title  + " added with id " +  idx );
	
};

exports.show = function(req,res){
	var idx = parseInt(req.params.id) -1;

	if (!events[idx])
		res.send("There's no event with id " + req.params.id);
	else 
		res.send(events[idx]);	
};

exports.destroy = function(req,res){
	var idx =  parseInt(req.params.id) -1;
	
	if (!events[idx]){
		res.send("Event " + req.params.id + " does not exist ");
	}
	else {
	  delete events[idx];
	  console.log("Deleted " + req.params.id);
	  res.send("Deleted " + req.params.id);
	}
};

exports.edit = function(req,res){
	res.send("Displaying edit form ");
};

exports.update = function(req,res){
	var idx = parseInt(req.params.id) -1;
	
	if (!events[idx]){
		res.send("Event " + req.params.id + " does not exist ");
	}
	else {
	
	   events[idx] = {
             id : idx, 
            owner : "sam@google.com" ,
		    title  :  req.body.title,
		  calendar : "default calendar",
		  organization : "google inc" ,
	  description  : req.body.description,
	     location  : "Home",
	   geolocation : {
	                   longitude : 10.5 ,
	                   latitude  :  44.5  
	                 },
	      allday   : req.body.allday,
	      duration : '12h',   
	          from : '10:30 PM', 
	            to : '10:30 AM',
	      reminder : "10m",   
	      availability: {
	      	  busy: req.body.availability
	      } 
    };
    
    console.log(events[idx]);
    res.send("Event " + req.body.title  + "with id " + req.params.id + " updated. "  );
    }
};







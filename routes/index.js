
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};



// Calendar Events 

// Add an event = with a required category (appointment, meeting, conference call, video 
// conference, birthday, outing, date, reminder, restaurant reservation)
// repeat, audio reminder 
exports.createCalendarEntry = function(req,res){
	res.send('Entry created');
};
// Display events for any time: day/week/month/next or previous n months/month range [1-4]
exports.listCalendarEntry = function(req,res){
	res.send("<html><head><title>Roku 3</title></head><body><h2>Hello this is a list of calendar entries</h2></body></html>");
};
exports.updateCalendarEntry = function(req,res){};
exports.removeCalendarEntry = function(req,res){};

// Associate a reminder to a calendar event 
exports.createCalendarEventReminder = function(req,res){};
exports.listCalendarEventReminder = function(req,res){};
exports.updateCalendarEventReminder = function(req,res){};
exports.removeCalendarEventReminder = function(req,res){};



// Task list 

exports.createTaskList = function(req,res){};
exports.listTaskList = function(req,res){};
exports.updateTaskList = function(req,res){};
exports.removeTaskList = function(req,res){};

// Remind me every n time until items on that list are done - or when 
//(someone else finishes the items) , or when someone adds an item to the list
exports.createListReminder = function(req,res){};
exports.listListReminder = function(req,res){};
exports.updateListReminder = function(req,res){};
exports.removeListReminder = function(req,res){};



// Task 

exports.createTask = function(req,res){};
exports.listTask = function(req,res){};
exports.updateTask = function(req,res){};
exports.removeTask = function(req,res){};


// Associate a reminder to a calendar event 
exports.createTaskReminder = function(req,res){};
exports.listTaskReminder = function(req,res){};
exports.updateTasktReminder = function(req,res){};
exports.removeTaskReminder = function(req,res){};


// Alarms - flex time region - location awareness - 
// shared (wake up spouse or the kids - and let me know - feedback)
// Disable alarm or query user upon significant location change or adjust the alert time 
// to match  
exports.createAlarm  = function(req,res){};
exports.listAlarm    = function(req,res){};
exports.updateAlarm  = function(req,res){};
exports.removeAlarm  = function(req,res){};




// Holiday feed 
// WhatsOnTV feed
// Your schedule is free this sat - would you like to make a dentist appointment ... (yelp)

// Local event feed
// upcoming in movies, theaters, sports, weather,  
// keyword scan - dentist, vacation, restaurant, conference, lunch, movie, dinner,   
// New openings 






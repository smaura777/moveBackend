exports.mapRoute = function(app,prefix){
	
	var prefixObj = require('./controllers/' + prefix);
	prefix = "/" + prefix;
	
	// DB setup 
	/**
	app.get(prefix + '/setup',prefixObj.settings);
	app.post(prefix + '/setupdb',prefixObj.setupDB);
	app.del(prefix + '/removedb',prefixObj.destroyDB);
	**/
	
	console.log("prefix " + prefix);
	
	// index
	app.get(prefix,prefixObj.index);
	
	// json index
	
	app.get(prefix + '/json',prefixObj.indexJSON);
	
	// add - form 
	app.get(prefix + '/new',prefixObj.new);
	
	// show
	app.get(prefix + '/:id',prefixObj.show);
	
	// create
	app.post(prefix + '/create',prefixObj.create);
	
	// edit
	app.get(prefix + '/:id/edit',prefixObj.edit);
	
	// update
	app.put(prefix + '/:id',prefixObj.update);
	
	// destroy
    app.del(prefix + '/:id',prefixObj.destroy);	
};
﻿/**  * @fileOverview Code to run when the project first launches to do things like * init tables * @author Jeffrey Wallace * @created 11/12/2013 * * @name Wakalorie * @copyright (c) 2013 CoreBits DataWorks LLC * @license Released under the MIT license (included in distribution in MIT LICENSE.txt) */ var numRecs,	utl = require('utl'),	filePath = "",	importStream = "",	password = "",	admin = {},	err = false; //promote session to the admin group so we can work with restricted classes and methodscurrentSession().promoteWith("Admin");currentSession().promoteWith("User");//init error definitionsds.ErrDef.defineErrors();//If we're running in production, set Admin password to value stored in /import/pass.txtif (os.isLinux) { //for now we'll assume if we are on linux we're running production			// get the file path		filePath = ds.getModelFolder().path + "import/" + "pass.txt";				// open a text stream to the import file		try {			importStream = new TextStream(filePath, 'read');		} catch (errObj) {			err = true;			ds.ErrLog.serverCatch(errObj, "", "Could not set admin password");		} 				//get the password and close the file		if (!err) {			password = importStream.read(''); 			importStream.close(); 		}				//Get an admin user obj and set the password		if (!err) {			admin = directory.user('admin');			admin.setPassword(password);		}}	 //If no GenFoods recs, do the GenFood importnumRecs = ds.GenFoods.length;if(numRecs === 0) {	utl.importTabDelim("GenFoods", "GenFoods.txt", true, ["name", "calories"]);}if (self.close) {	self.close();}
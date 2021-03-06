/**
 * Author: Habib Naderi
 * Department of Computer Science, University of Auckland
 * 
 * This module contains a set of methods for storing test results in the database and file system. For drawing tests, the final image and
 * the title are saved in the file system. The title in stored in DB as well. Results for other tests are stored in DB only. For more
 * information about the structure of DB, refer to ''database design' document.
 */

module.exports = function (context) {
	var util = require("./utils.js")(context);
	var fs = require('fs');
	
	return {
		// stores results for picture completion test.
		savePicCompResults: function(results) {
			saveImage(PIC_COMP, results.screenNumber, results.image);
			savePicCompTitle(results.screenNumber, results.title);
		},
		
		// stores results for parallel lines test.		
		saveParLinesResults: function(results) {
			saveImage(PAR_LINES, results.screenNumber, results.image);
			saveParLinesTitle(results.screenNumber, results.title);
		},
		
		// stores results for picture construction test.		
		savePicConResults: function(results) {
			saveImage(PIC_CON, results.screenNumber, results.image);
			savePicConTitle(results.screenNumber, results.title);
		},		
		
		// stores users which have been participated in a test.		
		saveParticipants: function(testID, callback, args) {
			context.rdb.getParticipants(context.session.TeamID, saveTestParticipants, {teamID: context.session.TeamID, testID: testID, callback: callback, args:args});
		},
		
		// stores results for idea generation test.		
		saveIdeaGenResults: function(results) {
			context.db.saveIdeaGenResults(context.session.TeamID, results);
		},
		
		// stores results for alternative uses test.		
		saveAltUsesResults: function(results) {
			context.db.saveAltUsesResults(context.session.TeamID, results);
		},
		
		// stores results for design challenge test.		
		saveDesChalResults: function(results) {
			saveImage(DES_CHAL, results.screenNumber, results.image);
			saveDesChalTitle(results.screenNumber, results.title);
			
			// save description as title for screen '0'.
			saveDesChalTitle(0, results.description);
		},
		
		// removes results of a team. It is used for testing.
		removeResults: function() {
			context.db.getResultsPath(rmResultsFolder);
		}
		
		
	};
	
	function rmResultsFolder(resultsPath) {
		require('rimraf')(resultsPath+"/"+context.session.TeamID, function(err){
			if (err)
				throw err;
		});
	}

	function saveImage(testID, screenNumber, image) {
    	var b64string = image.replace(/^data:image\/png;base64,/,"");
    	var buf = new Buffer(b64string, 'base64');
    	saveResult(testID, screenNumber, buf, ".png");
	}
	
	function savePicCompTitle(screenNumber, title) {
    	saveResult(PIC_COMP, screenNumber, title, ".txt");
    	context.db.savePicCompResults(context.session.TeamID, {screenNumber: screenNumber, title:title, path: ""});
	}

	function savePicConTitle(screenNumber, title) {
    	saveResult(PIC_CON, screenNumber, title, ".txt");
    	context.db.savePicConResults(context.session.TeamID, {screenNumber: screenNumber, title:title, path: ""});
	}
	
	
	function saveParLinesTitle(screenNumber, title) {
    	saveResult(PAR_LINES, screenNumber, title, ".txt");
    	context.db.saveParLinesResults(context.session.TeamID, {screenNumber: screenNumber, title:title, path: ""});
	}

	function saveDesChalTitle(screenNumber, title) {
    	saveResult(DES_CHAL, screenNumber, title, ".txt");
    	context.db.saveDesChalResults(context.session.TeamID, {screenNumber: screenNumber, title:title, path: ""});
	}
	
	function saveResult(testID, screenNumber, data, ext) {
		context.db.getResultsPath(writeFile, {data: data, ext: ext, testID: testID, 
			screen: screenNumber});
	}
	
	function writeFile(path, args) {		
		var path = path+"/"+context.session.TeamID+"/"+utils.getTestLongName(args.testID);
		if (!fs.existsSync(path))
			fs.mkdirSync(path);
		fs.writeFile(path+"/"+args.screen+args.ext, args.data, 
				function(err) {if (err) throw err;});
	}
	
	function saveTestParticipants(participants, args) {		
		context.db.saveParticipants(args.teamID, args.testID, participants, args.callback, args.args);
	}
};
/**
 * New node file
 */

module.exports = 
{
		installHandlers: function(context) {
			var commons = require('./commons.js')(context);
			var utils = require('./utils')();
			var logger = require('./logger')(context);
			var results = require('./results')(context);
			
			utils.includeConstants('./javascript/backend/constants.js');
			
	        context.socket.on(GET_TEST_STATE_REQ, function() {
	        	context.rdb.getTeam(context.session.TeamID, sendTestState);
	        });
	        
	        function sendTestState(teamInfo) {
	        	context.channel.sendToUser(context.session.AccessCode, GET_TEST_STATE_RSP, teamInfo);
	        }
	        
	        context.socket.on(GET_SESSION_STATE_REQ, function() {
	        	context.channel.sendToUser(context.session.AccessCode, GET_SESSION_STATE_RSP, context.session);
	        });
	        
	        context.socket.on(GET_TRANSACTIONS_REQ, function() {
	        	commons.sendTransactions(PIC_CON);
	        });	        
	                
	        context.socket.on(PERM_REQ, function(op) {
	        	switch (op) {
	        	case LOAD_PICCON_TEST_PAGE:
	        		commons.checkAllReady(op, PIC_CON, setupTestTimer);
	        		break;
	        	case CREATE_BACKGROUND:
	        		context.rdb.setPicConBGCreator(context.session.TeamID, context.session.AccessCode, sendCreateBGRsp);
	        		break;
	        	case EDIT_TITLE:
	        		commons.checkEditTitle();
	        		break;
	        	}
	        });
	        
	        function setupTestTimer() {
	    	        commons.setupTestTime(PRAC_AREA, testComplete);
	        }
	        
	        function sendCreateBGRsp(creator) {
	        	if (creator == context.session.AccessCode) {
	        		context.channel.sendToUser(context.session.AccessCode, PERM_RSP, {decision:GRANTED});	        		
	        	} else {
	        		context.channel.sendToUser(context.session.AccessCode, PERM_RSP, {decision:DECLINED, info:creator});
	        	}
	        }
	                	        
	        context.socket.on(UPDATE_TITLE_MSG, function(title) {
	        	commons.handleUpdateTitleMsg(title);
	        });
	        
	        context.socket.on(PICCON_BG_CREATED_MSG, function(location) {
	        	context.rdb.setBGCreated(context.session.TeamID, true);
	        	context.channel.sendToTeam(context.session.TeamID, PICCON_BG_CREATED_MSG, location);	        	
	        });
	        
	        context.socket.on(MOVE_SHAPE_MSG, function(data) {
	        	commons.saveAndBroadcastTransaction(MOVE_SHAPE_MSG, PIC_CON, data);
	        });
	        
	        context.socket.on(ROTATE_SHAPE_MSG, function(data) {
	        	commons.saveAndBroadcastTransaction(ROTATE_SHAPE_MSG, PIC_CON, data);	        	
	        });
	        
	        context.socket.on(DRAW_MSG, function(dot) {
	        	commons.saveAndBroadcastTransaction(DRAW_MSG, PIC_CON, dot);
	        });
	        
	        context.socket.on(ERASE_MSG, function(dot) {
	        	commons.saveAndBroadcastTransaction(ERASE_MSG, PIC_CON, dot);
	        });
	             
	        context.socket.on(DISCONNECT_MSG, function() {
	        	commons.disconnectUser();
	        });	
	        
	        context.socket.on(IS_BACKEND_READY_REQ, function() {
	        	commons.sendIsBackendReadyRsp(READY);
	        });

	        context.socket.on(GET_RESULTS_RSP, function(res) {
	        	logger.debug("Results received ...");
	        	results.saveImage(res.image);
	        	results.saveTitle(res.title);
	        	
	        	logger.debg("Redirect team " + context.session.TeamID + " to ", utils.getTestName(PIC_COMP));
	        	channel.sendToTeam(context.session.TeamID, GOTO_MSG, utils.getInstructionURL(PIC_COMP));
	        });
	        	        	       	      
	        commons.sendBackendReadyMsg();	        
	        
	        function testComplete() {
	        	commons.sendTestComplete();
	        	commons.sendGetResultsReq();
	        }
	                       
	        logger.debug("Hanlders were installed for picture construction test.");
	        
	        // When we receive drawing information:
	        context.socket.on('mousedot', function(dot){
	            context.channel.sendToTeam(context.session.TeamID, 'mousedot', dot);
	            // Post to the database here:				
	            dot.drag ? context.db.drawDot(dot) : context.db.eraseDot(dot);				
	        });
	        
	        // When a client requests its session:
	        context.socket.on('requestSession', function() {
	            context.channel.sendToUser(context.session.AccessCode, 'sessionRequest', 
	            			    {sessionColor: utils.getUserColor(context.session.UserID), 
	            				 sessionGroup: context.session.TeamID,
	            				 sessionAccessCode: context.session.AccessCode,
	            				 sessionMinScreen: 2,
	            				 sessionMaxScreen: 2,
	            				 sessionScreen: 2,
	            				 sessionCollaborative: true,
	            				 sessionDrawable: "true",
	            				 sessionBackground: "../images/picturecompletion/TTCT_Fig_Parts_Figure_1.svg",
	            				 sessionNickName: context.session.Name});
	        });
		}		
};



			/*
			function readState(screenNumber, limit1, limit2){
				var stuff = connection.query('select * from transactions where transactions.screen = "'+ screenNumber +'" and transactions.group = "'+session.sessionGroup+'" limit '+limit1+', '+limit2, function(err, rows){
	                if(err) throw err;
	                for(var i = 0; i<rows.length; i++) {
	                    socket.emit('mousedot', {x:rows[i].xpoint, y:rows[i].ypoint, drag:rows[i].drag, rad:rows[i].radius, colour:rows[i].colour, owner:rows[i].owner, group:session.sessionGroup, screen:rows[i].screen});
	                }
	            });	
			}

	        function sendState(screenNumber) {
	            // connect to the database.
	            // emit each row element as a draw to specific socket - use socket.id.
				var rowNumber = 0;
				var stuff = connection.query('select * from transactions where transactions.screen = "'+ screenNumber +'" and transactions.group = "'+session.sessionGroup+'"', function(err, rows)
				//var stuff = connection.query('select * from transactions where transactions.screen = "'+ screenNumber +'" and transactions.group = "'+session.sessionGroup+'" limit 1000', function(err, rows)
				{
	                rowNumber = rows.length;
					console.log("row number = " + rowNumber);
					for(var i = 0; i<rowNumber; i=i+10) {
						setTimeout(readState(screenNumber, i, 10), 20*i);
					}
	            });	            
	        }
	        */	       	       
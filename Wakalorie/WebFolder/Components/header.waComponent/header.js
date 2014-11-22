/** 
 * @fileOverview Web Component: Header
 * @author Welsh Harris
 * @created 08/08/2013
 *
 * @name Wakalorie
 * @copyright (c) 2013 CoreBits DataWorks LLC
 * @license Released under the MIT license (included in distribution in MIT LICENSE.txt)
 */
 
 /*global WAKL:false */
 
(function Component (id) {
"use strict";
function constructor (id) {
var $comp = this;
this.name = 'loginDlg';
this.load = function (data) {
	
	//component API
    //=================================================================================================
	var cs = $comp.sources,
		cw = $comp.widgets,
		logoutBtn = cw.button1,
		helpBtn = cw.button2;
		
	/** attempt to login */
	function logout() {
		WAKL.auth.logout(after_Logout);
	}
	
	/** code to run after logging out */
	function after_Logout() {
		window.location = WAKL.CONST.PAGE_LOGIN;
	}


	//on load
    //=================================================================================================   
    
	//logout button clicked
	logoutBtn.addListener("click", function(event) {
		logout();
	});	
	
	//help button clicked
	helpBtn.addListener("click", function(event) {
		WAKL.tips.toggle();
	});	
	
	//only make the buttons visible if the user is logged in
	if (WAKL.auth.isLoggedIn() === true) {
		logoutBtn.show();
		helpBtn.show();
	} else {
		logoutBtn.hide();
		helpBtn.hide();
	}
	
};
}
return constructor;
})();

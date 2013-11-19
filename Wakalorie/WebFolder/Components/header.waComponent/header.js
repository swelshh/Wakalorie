
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	"use strict";
	
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'header';
	// @endregion// @endlock

	//-------------------------------------------------------------------------
	//Component API
	//-------------------------------------------------------------------------
	var logoutBtn = $$(getHtmlId("button1")),
		helpBtn = $$(getHtmlId("button2"));
	
	//init
	function initC() {
		
		//logout button clicked
		WAF.addListener(logoutBtn, "click", function(event) {
			logout();
		});	
		
		//help button clicked
		WAF.addListener(helpBtn, "click", function(event) {
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
	}
	
	//logout
	function logout() {
		WAKL.auth.logout(after_Logout);
	}
	
	//after logout
	function after_Logout() {
		window.location = WAKL.CONST.PAGE_LOGIN;
	}
		
	
	//--------------------
	//public API
	//--------------------
	this.initC = initC;
	
	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock

	// eventHandlers// @lock

	// @region eventManager// @startlock
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock

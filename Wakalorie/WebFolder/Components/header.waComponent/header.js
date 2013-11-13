
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
	var logoutBtn = $$(getHtmlId("button1"));
	
	//init
	function initC() {
		
		//logout button clicked
		WAF.addListener(logoutBtn, "click", function(event) {
			logout();
		});	
		
		//only make the logout button visible if the user is logged in
		if (WAKL.auth.isLoggedIn() === true) {
			logoutBtn.show();
		} else {
			logoutBtn.hide();
		}
	}
	
	//logout
	function logout() {
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

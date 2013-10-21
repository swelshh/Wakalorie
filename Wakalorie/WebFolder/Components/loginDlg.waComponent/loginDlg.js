
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	"use strict";
	
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'loginDlg';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock

	//-------------------------------------------------------------------------
	//Component API
	//-------------------------------------------------------------------------
	var emailFld = $$(getHtmlId("textField1")),
		passwordFld = $$(getHtmlId("textField2")),
		errorText = $$(getHtmlId("richText1")),
		loginBtn = $$(getHtmlId("button1"));

	//init
    function initC() {

        //attempt to login when user clicks the login button
        WAF.addListener(loginBtn, "click", function(event) {
            login();
        });
        
        //if the user clicks the return key we will go ahead and login
        $("#"+passwordFld.id).keydown(function (event) {
			if (event.which === 13) {
				login();
			}
		});
        
        //make the error text invisible
        errorText.hide();
    }

    //attempt to login
    function login() {
		var email = emailFld.getValue(),
			password = passwordFld.getValue();

		WAKL.auth.login(email, password, onAfterLogin);
    }

	//route the user to the app, or stay on the login screen depending
	//on whether the call to WAKL.auth.login() resulted in the user
	//authenticating or not
	function onAfterLogin(event) {
		if (event.result === true) {
			window.location = "/index";
		} else {
			errorText.show();
		}
	}

    //--------------------
    //public API
    //--------------------
    this.initC = initC;
	this.onAfterLogin = onAfterLogin;
    
	// eventHandlers// @lock

	// @region eventManager// @startlock
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock

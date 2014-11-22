/** 
 * @fileOverview Web Component: Login Dialog
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
		emailFld = cw.textField1,
		passwordFld = cw.textField2,
		errorText = cw.richText1,
		loginBtn = cw.button1;
		
	/** attempt to login */
    function login() {
		var email = emailFld.getValue(),
			password = passwordFld.getValue();

		WAKL.auth.login(email, password, onAfterLogin);
    }

	/** 
	 * Handle auth attempt
	 * route the user to the app, or stay on the login screen depending
	 * on whether the call to WAKL.auth.login() resulted in the user
	 * authenticating or not
	 * @param {object} event - object returned from the auth call
	 * @param {boolean} event.result - whether the auth call was successful in authenticating
	 */
	function onAfterLogin(event) {
		if (event.result === true) {
			window.location = WAKL.CONST.PAGE_APP;
		} else {
			errorText.show();
		}
	}


	//on load
    //=================================================================================================
    
	//attempt to login when user clicks the login button
    loginBtn.addListener("click", function(event) {
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

	
	//public API
    //=================================================================================================
	this.onAfterLogin = onAfterLogin;
	
};
}
return constructor;
})();

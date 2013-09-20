
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	"use strict";

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'genFoodAddDlg';
	// @endregion// @endlock

	//-------------------------------------------------------------------------
	//Component API
	//-------------------------------------------------------------------------
	var genFoodGrid = $$(getHtmlId("dataGrid1")),
		searchText = $$(getHtmlId("textField1")),
		cancelBtn = $$(getHtmlId("button1")),
		addToMyFoodsBtn = $$(getHtmlId("button2"));
		
	//init
	function initC() 
	{
		//search bar on keyup event
		WAF.addListener(searchText, "keyup", _.throttle(
				function(event) {
					search();
				}, 
				300, {leading: false})
			);
	
		//add to my foods button clicked
		WAF.addListener(addToMyFoodsBtn, "click", function(event) {
			add();
		});	
	
		//cancel button clicked
		WAF.addListener(cancelBtn, "click", function(event) {
			$comp.hide();  //close the component
		});

	}
	
	//open the component and set the focus
	function open() {
		$comp.show();
		searchText.focus();
	}
	
	//do a contains search when user types in the search bar
	function search() {
		var searchVal = "*"+searchText.getValue()+"*";
		sources.genFoods.query("name = :1", {
			params: [searchVal],
			onError: WAKL.err.handler
		});
	}	
	
	//add the selected food to the users's my food list
	function add() {
		var name = sources.genFoods.name,
			calories = sources.genFoods.calories;
		
		WAKL.foodGrid.add(name, calories);
		$comp.hide();  //close the component
	}
	
	//--------------------
	//public API
	//--------------------
	this.initC = initC;
	this.open = open;
	
	

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

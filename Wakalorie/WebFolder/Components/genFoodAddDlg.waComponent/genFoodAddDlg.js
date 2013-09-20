
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
	//*************************************************************************************************
	//  EVENT LISTENERS
	//*************************************************************************************************
		//search bar on keyup event
		WAF.addListener(searchText, "keyup", _.throttle(
				function(event) 
				{
					search();
				}, 
				300, {leading: false})
			);
		
	
		//"Cancel" button clicked
		WAF.addListener(cancelBtn, "click", function(event) 
		{
			$comp.hide();  //close the component
		});
	
	
		//"Add To My Foods" button clicked
		WAF.addListener(addToMyFoodsBtn, "click", function(event) 
		{
			//var name;  // <--- Have to figure out how to retrieve values from the selected row in a Grid
			//var calories;  // <--- Have to figure out how to retrieve values from the selected row in a Grid
			//WAKL.foodGrid.add()
			//$comp.hide();  //close the component
		});
	//*************************************************************************************************
		
		//load all the GenFoods records
		sources.GenFoods.allEntities({onError: WAKL.err.handler});
	}//End initC()
	
	
	
	//*************************************************************************************************
	//  CUSTOM FUNCTIONS
	//*************************************************************************************************
	//do a contains search when user types in the search bar
	function search() 
	{
		var searchVal = "*"+searchText.getValue()+"*";
		sources.GenFoods.query("name = :1",
		{
			params: [searchVal],
			onError: WAKL.err.handler
		});
	}// End search()	
	
	
	//open the component and set the focus
	function open() 
	{
		$comp.show();
		searchText.focus();
	}// End open()
	//*************************************************************************************************
	
	
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

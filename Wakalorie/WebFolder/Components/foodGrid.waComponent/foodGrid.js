/** 
 * @fileOverview Web Component: Food Grid
 * List of foods the user has added custom, or picked from the list of general foods. Has
 * buttons to let them add/delete from their list, and also a button to add a food from 
 * the list of general foods.
 * @author Welsh Harris
 * @created 08/08/2013
 *
 * @name Wakalorie
 * @copyright (c) 2013 CoreBits DataWorks LLC
 * @license Released under the MIT license (included in distribution in MIT LICENSE.txt)
 */
 
 /*global WAKL:false, _:false */
 
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
		foodGrid = cw.dataGrid1,
		addBtn = cw.imageButton1,
		deleteBtn = cw.imageButton3,
		genFoodBtn = cw.imageButton2,
		searchText = cw.textField1;
		
	/** delete the current food */
	function removeFood() {
		sources.userFood.removeCurrent({onError: WAKL.err.handler});
	}
	
	/** do a contains search when user types in the search bar */
	function search() {
		var searchVal = "*"+searchText.getValue()+"*";
		sources.userFood.query("name = :1", {
			params: [searchVal],
			onError: WAKL.err.handler
		});
	}
	
	/** 
	 * called from another component to add a new food 
	 * @param {string} name - Name of the food
	 * @param {number} calories - Calories for the food
	 */
	function add(name, calories) {
		sources.userFood.addNewElement();
		sources.userFood.name = name;
		sources.userFood.calories = calories;
		sources.userFood.save({onError: WAKL.err.handler});
		WAKL.qtyAddArea.setAndGotoQty();
	}


	//on load
    //=================================================================================================
    
	//add button click event
	addBtn.addListener("click", function(event) {
		WAKL.foodAddModDlg.add();
	});
	
	//gen food button click event
	genFoodBtn.addListener("click", function(event) {
		WAKL.genFoodAddDlg.open();
	});
	
	//delete button click event
	deleteBtn.addListener("click", function(event) {
		removeFood();
	});
	
	//grid onRowClick event
	WAF.addListener(foodGrid, "onRowClick", function(event) {
		WAKL.qtyAddArea.setAndGotoQty();
	});
	
	//grid onRowDblClick event
	WAF.addListener(foodGrid, "onRowDblClick", function(event) {
		WAKL.foodAddModDlg.modify();
	});
		
	//search bar on keyup event
	searchText.addListener("keyup", _.throttle(
		function(event) {
			search();
		}, 
		300, {leading: false})
	);
	
	//load all the user food entities
	sources.userFood.allEntities({onError: WAKL.err.handler});

	
	//public API
    //=================================================================================================
	this.add = add;
	
};
}
return constructor;
})();

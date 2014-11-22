/** 
 * @fileOverview Web Component: General Foods Dialog
 * Allows user to search a bunch of general foods from the FDA and add to their
 * list of foods.
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
this.name = 'genFoodAddDlg';
this.load = function (data) {
	
	//component API
    //=================================================================================================
	var cs = $comp.sources,
		cw = $comp.widgets,
		genFoodGrid = cw.dataGrid1,
		searchText = cw.textField1,
		cancelBtn = cw.button4,
		addToMyFoodsBtn = cw.button5;
	
	/** open the component and set the focus */
	function open() {
		$comp.show();
		searchText.setValue("");
		sources.genFood.allEntities({onError: WAKL.err.handler});
		
		//return key is like clicking the add button
		/* nevermind, some users aren't used to type ahead search and think they need to hit the return key to do a search
		$(document).on("keydown.genFoodAddDlg", function (event) {
			if (event.which === 13) {
				add();
			}
		});
		*/
	
		//start in the search bar
		searchText.focus();
	}
	
	/**do a contains search when user types in the search bar */
	function search() {
		var searchVal = searchText.getValue();

		sources.genFood.searchBar({
			arguments: [searchVal],
			onSuccess: function(event) {
				sources.genFood.setEntityCollection(event.result);
			},
			onError: WAKL.err.handler
		});
	}	
	
	/**add the selected food to the users's my food list */
	function add() {
		var name = sources.genFood.name,
			calories = sources.genFood.calories;
		
		//add the selected food to the user's list of foods
		if(sources.genFood.length !== 0) {
			WAKL.foodGrid.add(name, calories);
		}
		
		//turn off the event handler to make the return key like clicking the add button
		/* nevermind, some users aren't used to type ahead search and think they need to hit the return key to do a search
		$(document).off("keydown.genFoodAddDlg");
		*/
		
		//close the component
		$comp.hide();  
	}
		

	//on load
    //=================================================================================================
    
    //search bar on keyup event
	WAF.addListener(searchText, "keyup", _.throttle(
		function(event) {
			search();
		}, 
		300, {leading: false})
	);
	
	//grid onRowDblClick event
	WAF.addListener(genFoodGrid, "onRowDblClick", function(event) {
		add();
	});

	//add to my foods button clicked
	WAF.addListener(addToMyFoodsBtn, "click", function(event) {
		add();
	});	
	
	//cancel button clicked
	WAF.addListener(cancelBtn, "click", function(event) {
		$comp.hide();  //close the component
	});
	
	//public API
    //=================================================================================================
	this.open = open;
	
};
}
return constructor;
})();

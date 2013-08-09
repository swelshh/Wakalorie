/** 
 * @fileOverview Component with intermediate qty and add button for adding the selected food 
 *		in the my food grid to the grid of day foods
 * @author Welsh Harris
 * @created 08/08/2013
 *
 * @name Wakalorie
 * @copyright (c) 2013 CoreBits DataWorks LLC
 * @license Released under the MIT license (included in distribution in MIT LICENSE.txt)
 */
 
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	"use strict";
	
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'qtyAddArea';
	// @endregion// @endlock


	//-------------------------------------------------------------------------
	//Component API
	//-------------------------------------------------------------------------
	var qtyFld = $$(getHtmlId("textField1")),
		addBtn = $$(getHtmlId("button1")),
		foodSource = sources.food;

	//init
	function initC() {
		
		//add button click event
		WAF.addListener(addBtn, "click", function(event) {
			addFood();
		});
		
		//attach an even to the qty field so that if the user clicks the return key we will go ahead and save
		$("#"+qtyFld.id).keydown(function (event) {
			if (event.which === 13) {
				addFood();
			}
		});
	}
	
	//set qty to 1 and goto the qty var
	function setAndGotoQty() {
		qtyFld.setValue(1);
		qtyFld.focus();
		$("#"+qtyFld.id).select();//highlight so the user can just type a number
	}

	//add a food (get the food selected in the my foods grid and send to the day foods grid)
	function addFood() {
		var name = foodSource.name,
			qty = qtyFld.getValue(),
			totalCal = foodSource.calories * qty;

		WAKL.day.addFood(name, qty, totalCal);
	}
	
	//--------------------
	//public API
	//--------------------
	this.initC = initC;
	this.setAndGotoQty = setAndGotoQty;


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

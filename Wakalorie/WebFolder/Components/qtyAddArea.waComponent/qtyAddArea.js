/** 
 * @fileOverview Web Component: Qty Add Area
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
this.name = 'qtyAddArea';
this.load = function (data) {
	
	//component API
    //=================================================================================================
	var cs = $comp.sources,
		cw = $comp.widgets,
		qtyFld = cw.textField1,
		addBtn = cw.button1;
	
	/** set qty to 1 and goto the qty var */
	function setAndGotoQty() {
		qtyFld.setValue(1);
		qtyFld.focus();
		$("#"+qtyFld.id).select();//highlight so the user can just type a number
	}

	/**add a food (get the food selected in the my foods grid and send to the day foods grid) */
	function addFood() {
		var name = sources.userFood.name,
			qty = qtyFld.getValue(),
			totalCal = sources.userFood.calories * qty;

		WAKL.day.addFood(name, qty, totalCal);
	}
		

	//on load
    //=================================================================================================
    
    //add button click event
	addBtn.addListener("click", function(event) {
		addFood();
	});
	
	//attach an even to the qty field so that if the user clicks the return key we will go ahead and save
	$("#"+qtyFld.id).keydown(function (event) {
		if (event.which === 13) {
			addFood();
		}
	});
	
	
	//public API
    //=================================================================================================
	this.setAndGotoQty = setAndGotoQty;
	
};
}
return constructor;
})();

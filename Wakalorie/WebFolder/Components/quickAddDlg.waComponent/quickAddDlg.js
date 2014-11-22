/** 
 * @fileOverview Web Component: Quick Add Dialog
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
this.name = 'quickAddDlg';
this.load = function (data) {
	
	//component API
    //=================================================================================================
	var cs = $comp.sources,
		cw = $comp.widgets,
		caloriesFld = cw.textField2,
		descriptionFld = cw.textField1,
		cancelBtn = cw.button4,
		saveBtn = cw.button5;
		
	/** open the dialog to create a new food */
	function add() {
		sources.dayFoods.addNewElement();
		sources.dayFoods.day.set(sources.day);
		sources.dayFoods.qty = 1;
		descriptionFld.setValue("Quick Add");
		sources.dayFoods.totalCal = 0;
		$comp.show();
		$("#"+descriptionFld.id).select();//highlight so the user can just start typing
	}
	
	/** user clicked the save button */
	function save() {
		sources.dayFoods.save({
			onSuccess: WAKL.day.after_AddRemoveFood,
			onError: WAKL.err.handler
		});
		$comp.hide();
	}
	
	/** user clicked the cancel button */
	function cancel() {
		sources.dayFoods.removeCurrentReference();
		$comp.hide();
	}
	
	
	//on load
    //=================================================================================================
    
    //save button click event
	WAF.addListener(saveBtn, "click", function(event) {
		save();
	});
	
	//cancel button click event
	WAF.addListener(cancelBtn, "click", function(event) {
		cancel();
	});
	
	//attach an even to both fields so that if the user clicks the return key we will go ahead and save
	$("#"+caloriesFld.id+", "+"#"+descriptionFld.id).keydown(function (event) {
		if (event.which === 13) {
			sources.dayFoods.totalCal = caloriesFld.getValue(); //without this it won't recognize if the value changed
			sources.dayFoods.foodName = descriptionFld.getValue();
			save();
		}
	});
		
	
	//public API
    //=================================================================================================
	this.add = add;
	
};
}
return constructor;
})();

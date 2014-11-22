/** 
 * @fileOverview Web Component: User food add / modify dialog
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
this.name = 'foodAddModDlg';
this.load = function (data) {
	
	//component API
    //=================================================================================================
	var cs = $comp.sources,
		cw = $comp.widgets,
		titleText = cw.richText1,
		nameFld = cw.textField1,
		caloriesFld = cw.textField2,
		saveBtn = cw.button5,
		cancelBtn = cw.button4;
	
	/** open the dialog to create a new food */
	function add() {
		sources.userFood.addNewElement();
		$comp.show();
		titleText.setValue("New Food");
		nameFld.focus();
	}
	
	/** open the dialog to modify an existing food */
	function modify() {
		$comp.show();
		titleText.setValue("Edit Food");
		nameFld.focus();
	}
	
	/** save the food, go to the qty area and set to 1, close the dialog */
	function save() {
		sources.userFood.save({
			onSuccess: function(event) {
				$comp.hide();
				WAKL.qtyAddArea.setAndGotoQty();
			},
			onError: function(event) {
				cancel();
				WAKL.err.handler(event);
			}
		});
	}
	
	/** user clicked the cancel button */
	function cancel() {
		var isNew = sources.userFood.isNewElement();
		
		if (isNew) {
			sources.userFood.removeCurrentReference();
		}
		$comp.hide();
	}
		

	//on load
    //=================================================================================================
    
    //save button click event
	saveBtn.addListener("click", function(event) {
		save();
	});
	
	//cancel button click event
	cancelBtn.addListener("click", function(event) {
		cancel();
	});
	
	//attach an even to the calories field on the new food dialog so that if the user clicks the return key we will go ahead and save
	$("#"+caloriesFld.id).keydown(function (event) {
		if (event.which === 13) {
			sources.userFood.calories = caloriesFld.getValue(); //without this it won't recognize if the value changed
			save();
		}
	});
	
	//public API
    //=================================================================================================
	this.add = add;
	this.modify = modify;
	
};
}
return constructor;
})();

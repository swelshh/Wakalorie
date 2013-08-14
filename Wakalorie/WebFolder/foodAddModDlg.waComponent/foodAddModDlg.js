/** 
 * @fileOverview Component with dialog used to add or modify user foods 
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
	this.name = 'foodAddModDlg';
	// @endregion// @endlock


	//-------------------------------------------------------------------------
	//Component API
	//-------------------------------------------------------------------------
	var titleText = $$(getHtmlId("richText1")),
		nameFld = $$(getHtmlId("textField1")),
		caloriesFld = $$(getHtmlId("textField2")),
		saveBtn = $$(getHtmlId("button5")),
		cancelBtn = $$(getHtmlId("button4"));
	
	//init
	function initC() {
		
		//save button click event
		WAF.addListener(saveBtn, "click", function(event) {
			save();
		});
		
		//cancel button click event
		WAF.addListener(cancelBtn, "click", function(event) {
			cancel();
		});
		
		//attach an even to the calories field on the new food dialog so that if the user clicks the return key we will go ahead and save
		$("#"+caloriesFld.id).keydown(function (event) {
			if (event.which === 13) {
				sources.food.calories = caloriesFld.getValue(); //without this it won't recognize if the value changed
				save();
			}
		});
	}
	
	//open the dialog to create a new food
	function add() {
		sources.food.addNewElement();
		$comp.show();
		titleText.setValue("New Food");
		nameFld.focus();
	}
	
	//open the dialog to modify an existing food
	function modify() {
		$comp.show();
		titleText.setValue("Edit Food");
		nameFld.focus();
	}
	
	//user clicked the save button
	function save() {
		sources.food.save(async_save);
		$comp.hide();
	}
	
	//after saving set the qty to 1 and goto the qty var
	function async_save(event) {
		if (WAKL.err.async_ThereWasntAnError(event)) {
			WAKL.qtyAddArea.setAndGotoQty();
		}
	}
	
	//user clicked the cancel button
	function cancel() {
		var isNew = sources.food.isNewElement();
		
		if (isNew) {
			sources.food.removeCurrentReference();
		}
		$comp.hide();
	}
	
	//--------------------
	//public API
	//--------------------
	this.initC = initC;
	this.add = add;
	this.modify = modify;
	
	
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

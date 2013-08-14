
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	"use strict";
	
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'quickAddDlg';
	// @endregion// @endlock


	//-------------------------------------------------------------------------
	//Component API
	//-------------------------------------------------------------------------
	var caloriesFld = $$(getHtmlId("textField2")),
		descriptionFld = $$(getHtmlId("textField1")),
		cancelBtn = $$(getHtmlId("button4")),
		saveBtn = $$(getHtmlId("button5"));
		
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
		
		//attach an even to both fields so that if the user clicks the return key we will go ahead and save
		$("#"+caloriesFld.id+", "+"#"+descriptionFld.id).keydown(function (event) {
			if (event.which === 13) {
				sources.dayFoods.totalCal = caloriesFld.getValue(); //without this it won't recognize if the value changed
				sources.dayFoods.foodName = descriptionFld.getValue();
				save();
			}
		});
	}
	
	//open the dialog to create a new food
	function add() {
		sources.dayFoods.addNewElement();
		sources.dayFoods.day.set(sources.day);
		sources.dayFoods.qty = 1;
		descriptionFld.setValue("Quick Add");
		sources.dayFoods.totalCal = 0;
		$comp.show();
		$("#"+descriptionFld.id).select();//highlight so the user can just start typing
	}
	
	//user clicked the save button
	function save() {
		sources.dayFoods.save(WAKL.err.async_ErrCheckOnly);
		$comp.hide();
	}
	
	//user clicked the cancel button
	function cancel() {
		sources.dayFoods.removeCurrentReference();
		$comp.hide();
	}
	
	//--------------------
	//public API
	//--------------------
	this.initC = initC;
	this.add = add;
	

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

/** 
 * @fileOverview Component with date bar, today's weight, and today's food grid
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
	this.name = 'day';
	// @endregion// @endlock


	//-------------------------------------------------------------------------
	//Component API
	//-------------------------------------------------------------------------
	var prevDayBtn = $$(getHtmlId("imageButton2")),
		dateBarBtn = $$(getHtmlId("button2")),
		nextDayBtn = $$(getHtmlId("imageButton3")),
		weightFld = $$(getHtmlId("textField1")),
		quickAddBtn = $$(getHtmlId("button1")),
		deleteBtn = $$(getHtmlId("imageButton1")),
		totalCalText = $$(getHtmlId("richText3")),
		currentDay = moment();
		
	//init
	function initC() {
		
		//date bar prev day button click event
		WAF.addListener(prevDayBtn, "click", function(event) {
			prevDay();
		});
		
		//date bar next day button click event
		WAF.addListener(nextDayBtn, "click", function(event) {
			nextDay();
		});
		
		//weight attribute blur event
		WAF.addListener(weightFld, "blur", function(event) {
			saveDay();
		});
		
		//quick add button click event
		WAF.addListener(quickAddBtn, "click", function(event) {
			WAKL.quickAddDlg.add();
		});
		
		//delete button click event
		WAF.addListener(deleteBtn, "click", function(event) {
			removeFood();
		});
		
		//customize momentjs calendar for displaying day in our date bar
		moment.lang('en', {
			calendar : {
				lastDay : '[Yesterday]',
				sameDay : '[Today]',
				nextDay : '[Tomorrow]',
				lastWeek : '[last] dddd',
				nextWeek : '[next] dddd',
				sameElse : 'L'
			}
		});
		
		//load today
		updateDateBarBtnTitle();
		loadDay();
	}
	
	//load data for a particular day
	function loadDay() {
		var date = currentDay.toDate();
		sources.day.query("date = :1", {
			params:[date],
			onSuccess: async_loadDay,
			onError: WAKL.err.handler
		});
	}
	var loadDayDebounce = _.debounce(loadDay, 200);
	
	//if there is no day record for currentDay then create one
	//otherwise just get the total cal for the day and display it
	function async_loadDay(event) {
		if (sources.day.length === 0) {
			newDay();
		} else {
			totalCalText.setValue(sources.day.totalCal);
		}
	}
	
	//create a new day record and display it to the user
	function newDay() {
		totalCalText.setValue(0);
		sources.day.addNewElement();
		sources.day.date = currentDay.toDate();
		saveDay();
	}
	
	//save the current day
	function saveDay() {
		sources.day.save({onError: WAKL.err.handler});
	}
	
	//create a new food for the current day
	function addFood(name, qty, totalCal) {
		sources.dayFoods.addNewElement();
		sources.dayFoods.day.set(sources.day); 
		sources.dayFoods.foodName = name;
		sources.dayFoods.qty = qty;
		sources.dayFoods.totalCal = totalCal;
		sources.dayFoods.save({
			onSuccess: afterAddRemoveFood,
			onError: WAKL.err.handler
		});
	}
	
	//remove a food from the current day
	function removeFood() {
		sources.dayFoods.removeCurrent({
			onSuccess: afterAddRemoveFood,
			onError: WAKL.err.handler
		});
	}
	
	//after adding or removing a food we need to update the total cal for the day
	function afterAddRemoveFood(event) {
		sources.day.getTotalCal({
			onSuccess: function(event) {
				totalCalText.setValue(event.result);
			},
			onError: WAKL.err.handler
		});
	}
	
	//update the date bar day display
	function updateDateBarBtnTitle () {
		var dayDisplay = currentDay.calendar();
		dateBarBtn.setValue(dayDisplay);
	}
	
	//go to the prev day
	function prevDay () {
		currentDay.subtract("days", 1);
		updateDateBarBtnTitle();
		loadDayDebounce();
	}
	
	//go to the next day
	function nextDay () {
		currentDay.add("days", 1);
		updateDateBarBtnTitle();
		loadDayDebounce();
	}
	
	//--------------------
	//public API
	//--------------------
	this.initC = initC;
	this.addFood = addFood;
	
	
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

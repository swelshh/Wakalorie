/** 
 * @fileOverview Web Component: Day
 * Display the data for one day for the user, and a grid of what they've eaten on that day
 * @author Welsh Harris
 * @created 08/08/2013
 *
 * @name Wakalorie
 * @copyright (c) 2013 CoreBits DataWorks LLC
 * @license Released under the MIT license (included in distribution in MIT LICENSE.txt)
 */
 
 /*global WAKL:false, _:false, moment:false */
 
(function Component (id) {
"use strict";
function constructor (id) {
var $comp = this;
this.name = 'dayComp';
this.load = function (data) {
	
	//component API
    //=================================================================================================
	var cs = $comp.sources,
		cw = $comp.widgets,
		prevDayBtn = cw.imageButton1,
		dateBarBtn = cw.button1,
		nextDayBtn = cw.imageButton2,
		weightFld = cw.textField1,
		quickAddBtn = cw.button2,
		deleteBtn = cw.imageButton3,
		totalCalText = cw.richText3,
		datePickerDlg = cw.datePickerContainer,
		currentDay = moment();
		
	/** load data for a particular day */
	function loadDay() {
		var date = currentDay.toDate();
		sources.day.query("date = :1", {
			params:[date],
			onSuccess: after_loadDay,
			onError: WAKL.err.handler
		});
	}
	var loadDayDebounce = _.debounce(loadDay, 200);
	
	/** 
	 * if there is no day record for currentDay then create one
	 * otherwise just get the total cal for the day and display it
	 */
	function after_loadDay() {
		if (sources.day.length === 0) {
			newDay();
		} else {
			totalCalText.setValue(sources.day.totalCal);
		}
		
		WAKL.caloriesWeightsChart.processChart(sources.day.date);
	}
	
	/** create a new day record and display it to the user */
	function newDay() {
		totalCalText.setValue(0);
		sources.day.addNewElement();
		sources.day.date = currentDay.toDate();
		saveDay();
	}
	
	/** save the current day */
	function saveDay() {
		sources.day.save({onError: WAKL.err.handler});
		WAKL.caloriesWeightsChart.processChart(sources.day.date);
	}
	
	/** 
	 * create a new food for the current day 
	 * @param {string} name - of the food
 	 * @param {number} qty - of the food to add
 	 * @param {number} totalCal - of the food we are adding
	 */
	function addFood(name, qty, totalCal) {
		sources.dayFoods.addNewElement();
		sources.dayFoods.day.set(sources.day); 
		sources.dayFoods.foodName = name;
		sources.dayFoods.qty = qty;
		sources.dayFoods.totalCal = totalCal;
		sources.dayFoods.save({
			onSuccess: after_AddRemoveFood,
			onError: WAKL.err.handler
		});
	}
	
	/** remove a food from the current day */
	function removeFood() {
		sources.dayFoods.removeCurrent({
			onSuccess: after_AddRemoveFood,
			onError: WAKL.err.handler
		});
	}
	
	/** after adding or removing a food we need to update the total cal for the day */
	function after_AddRemoveFood() {
		sources.day.getTotalCal({
			onSuccess: function(event) {
				totalCalText.setValue(event.result);
				WAKL.caloriesWeightsChart.processChart(sources.day.date);
			},
			onError: WAKL.err.handler
		});
	}
	
	/** update the date bar day display */
	function updateDateBarBtnTitle () {
		var dayDisplay = currentDay.calendar();
		dateBarBtn.setValue(dayDisplay);
	}
	
	/** go to the prev day */
	function prevDay () {
		currentDay.subtract("days", 1);
		updateDateBarBtnTitle();
		loadDayDebounce();
	}
	
	/** go to the next day */
	function nextDay () {
		currentDay.add("days", 1);
		updateDateBarBtnTitle();
		loadDayDebounce();
	}

	//on load
    //=================================================================================================
    
    //display the prev day when user clicks the prev day button
	prevDayBtn.addListener("click", function(event) {
		prevDay();
	});
	
	//display the next day when user clicks the prev day button
	nextDayBtn.addListener("click", function(event) {
		nextDay();
	});
	
	//open the date picker dialog when the user clicks on the date bar button
	dateBarBtn.addListener("click", function(event) {
		datePickerDlg.show();
	});
	
	//save the day when the user changes the weight value
	weightFld.addListener("blur", function(event) {
		saveDay();
	});
	
	//open the quick add dialog when the user clicks the quick add button
	quickAddBtn.addListener("click", function(event) {
		WAKL.quickAddDlg.add();
	});
	
	//delete the currently selected food when the user clicks the delete button
	deleteBtn.addListener("click", function(event) {
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
	
	//setup the datePicker
	$("#"+datePickerDlg.id).datepicker({
		onSelect: function(date) {
			currentDay = moment(date);
			datePickerDlg.hide();
			updateDateBarBtnTitle();
			loadDay();
		},
		altFormat: "yy-mm-dd"
	});
	
	//load today
	updateDateBarBtnTitle();
	loadDay();
	
	//public API
    //=================================================================================================
	this.addFood = addFood;
	this.after_AddRemoveFood = after_AddRemoveFood;
	
};
}
return constructor;
})();

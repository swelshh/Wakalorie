/** 
 * @fileOverview Web Component: Calories Weights Chart
 * @author Jeffrey Wallace
 * @created 11/12/2013
 *
 * @name Wakalorie
 * @copyright (c) 2013 CoreBits DataWorks LLC
 * @license Released under the MIT license (included in distribution in MIT LICENSE.txt)
 */
 
(function Component (id) {

// Add the code that needs to be shared between components here

function constructor (id) {
	"use strict"

	// @region beginComponentDeclaration
	var $comp = this;
	this.name = 'caloriesWeightsChart';
	// @endregion

	


	this.load = function (data) {
		
		//-------------------------------------------------------------------------
		//Component API
		//-------------------------------------------------------------------------
		var myContainer = $$(getHtmlId('container1')),
			myComboBox = $$(getHtmlId('combobox1'));		
		
		function timeFrameChange() {
				processChart(sources.day.date);
		};
		
		
		function processChart(date){	
			var	targetDay = moment(date),
				numDaysToProcess = myComboBox.getValue(),
				from = targetDay.subtract('days',numDaysToProcess),
				fromDate = from.toDate(),			
				toDate = date;			
			
				ds.Day.query("date >= :1 AND date <= :2", 
					{params: [fromDate, toDate],
					 orderBy: "date asc",
				 	 onSuccess:function (event)
				 	 {
				 		//Build a calories array
						event.entityCollection.toArray("totalCal, weight",
						 {onSuccess: function(ev)
						  {
							async_pluck(ev.result);					
					  	  },
				 	  	  onError: WAKL.err.handler
					    });
				 	 },
				     onError: WAKL.err.handler
				    })	
		};
		
		
		
		function async_pluck(calWgtArray) {
				var caloriesArray = [],
					wgtsArray = [],
					numElemsToAdd,
					i,
					arraySize = calWgtArray.length;
				
				//Pluck out calories and weights
				caloriesArray = _.pluck(calWgtArray, 'totalCal');
				wgtsArray = _.pluck(calWgtArray, 'weight');			
			
				// Pad the front of the arrays if there isn't 7 days worth of data
				if(arraySize < 7)
				{
					numElemsToAdd = 7-arraySize;
					for (i=0; i<numElemsToAdd; i++)
					{
						caloriesArray.unshift(0);
						wgtsArray.unshift(0);
					}
				}
						  
				//Build the series for the jqPlot
				async_buildSeries(caloriesArray, wgtsArray);			
		};
		
		
		
		//Build up the two series for the jqPlot and call the drawChart function
		function async_buildSeries(caloriesArray, wgtsArray) {
			var series1 = [],
				series2 = [],
				date,
				cals,
				wgt,
				i,		
				numDaysToProcess = myComboBox.getValue(),	
				from,
				showMarkerValue = true;
			
			if (sources.day.date) {
				from = moment(sources.day.date).subtract('days',numDaysToProcess);
				
				for (i=0; i<=numDaysToProcess; i++)
				{				
					date = from.add('days',1).format("MMM Do");			
					cals = caloriesArray[i];
					wgt = wgtsArray[i];
					
					series1.push([date, cals]);
					series2.push([date, wgt]);			
				}
				
				if(numDaysToProcess==="30")//Turn off data points when in month view
				{
					showMarkerValue = false;
				}
				
				//Build our jqPlot
				drawChart(series1, series2, showMarkerValue);
					
			}
		};
		
		
		
		//Draw the chart with the data stored in series1 and series2 arrays
		function drawChart(series1, series2, showMarkerValue) {
		       	MyPlot = $.jqplot(myContainer.id, [series1, series2], {
		        	title: 'Calories vs Pounds',
		        	axesDefaults: {
		            		tickRenderer: $.jqplot.CanvasAxisTickRenderer, 
		            		tickOptions: {angle:35}
		            		},
		        	axes: {
		        			xaxis: {renderer: $.jqplot.CategoryAxisRenderer, tickInterval: 15},
		        			yaxis: {autoscale: true, label: 'Calories'},  
		        			y2axis: {autoscale: true, label: 'Lbs'}  	  
		        		  },
		        	seriesDefaults: {show: true, xaxis: 'xaxis', showMarker: showMarkerValue},
		            series: [{renderer: $.jqplot.BarRenderer},{yaxis: 'y2axis'}],
		            highlighter:{
		            	show: false 
		            	},
		            cursor: {
		            	show: false
		            	}
		            }
		 );
		
		    //Draw the chart.  The bools are for "clear" and "resetAxes"
		    //Find the documentation @ http://www.jqplot.com/docs/files/jqplot-core-js.html#jqPlot.replot
		    MyPlot.replot(true, true);
		};
		
		
		WAF.addListener(myComboBox, "change", function(event) {
		timeFrameChange();
		});		   		
		  
	  	processChart(new Date());
		
		
		 //--------------------
		 //public API
		 //--------------------
		this.processChart = processChart;  //<---This is public so it can be called by the PrevDay/Next

	// @region namespaceDeclaration
	// @endregion

	// eventHandlers

	// @region eventManager
	// @endregion

	};


}
return constructor;
})();

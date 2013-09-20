
//import the GenFoods data
var utl = require('utl');
importSummary = utl.importTabDelim("GenFoods", "GenFoods.txt", true, ["name", "calories"]);

importSummary;

//var myGenFood = ds.GenFoods.createEntity();
//myGenFood.name = "Test Food";
//myGenFood.calories = 1234;
//myGenFood.save();
//myGenFood;
/** 
 * @fileOverview methods for the GenFoods datastore class
 * @author Jeffrey Wallace
 * @created 09/19/2013
 *
 * @name Wakalorie
 * @copyright (c) 2013 CoreBits DataWorks LLC
 * @license Released under the MIT license (included in distribution in MIT LICENSE.txt)
 */
 
//-------------------------------------------------------------------------
//entity 
//-------------------------------------------------------------------------


//-------------------------------------------------------------------------
//collection 
//-------------------------------------------------------------------------


//-------------------------------------------------------------------------
//class 
//-------------------------------------------------------------------------
model.GenFoods.methods.searchBar = function (searchValue) {
	"use strict";
	
	var words = searchValue.split(" "),
		lastWord = words.pop(),
		coll_Temp = {},
		coll_Result = ds.GenFoods.createEntityCollection(),
		searchedByKeyword = false,
		queryString = "",
		i, len;
	
	//find by keyword (for all the words except the last word passed in)
	if (words.length > 0) {
		searchedByKeyword = true;
		
		//build up the query string
		for (i=0, len=words.length; i < len; i++) { 
			if (queryString === "") {
				queryString = "name %% " + words[i];
			} else {
				queryString += " and name %% " + words[i];
			}
		}
		
		//run the query
		coll_Result = ds.GenFoods.query(queryString);
		
	}
	
	//do a contains search using the last word passed in
	if(lastWord.length > 0) {
		coll_Temp = ds.GenFoods.query("name = :1", "*"+lastWord+"*");
		if (searchedByKeyword) {
			coll_Result = coll_Result.and(coll_Temp);
		} else {
			coll_Result.add(coll_Temp);
		}
	}
	
	//return the result
	return coll_Result;

}

model.GenFoods.methods.searchBar.scope ="public";
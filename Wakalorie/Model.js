 /** 
 * @fileOverview setup datastore
 * @author Welsh Harris
 * @created 07/20/2013
 *
 * @name Wakalorie
 * @copyright (c) 2013 CoreBits DataWorks LLC
 * @license Released under the MIT license (including in distribution in <MIT LICENSE.txt>
 */

model = new DataStoreCatalog();

//Day
include("ModelFolder/Day/Day-attributes.js");
include("ModelFolder/Day/Day-methods.js");

//Food
include("ModelFolder/Food/Food-attributes.js");
include("ModelFolder/Food/Food-methods.js");

//DayFood
include("ModelFolder/DayFood/DayFood-attributes.js");
include("ModelFolder/DayFood/DayFood-methods.js");


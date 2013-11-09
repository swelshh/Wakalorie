 /** 
 * @fileOverview setup datastore
 * @author Welsh Harris
 * @created 07/20/2013
 *
 * @name Wakalorie
 * @copyright (c) 2013 CoreBits DataWorks LLC
 * @license Released under the MIT license (included in distribution in MIT LICENSE.txt)
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

//GenFoods
include("ModelFolder/GenFoods/GenFoods-attributes.js");
include("ModelFolder/GenFoods/GenFoods-methods.js");

//User
include("ModelFolder/User/User-attributes.js");
include("ModelFolder/User/User-methods.js");


//ErrDef
include("ModelFolder/ErrDef/ErrDef-attributes.js");
include("ModelFolder/ErrDef/ErrDef-methods.js");


//ErrLog
include("ModelFolder/ErrLog/ErrLog-attributes.js");
include("ModelFolder/ErrLog/ErrLog-methods.js");

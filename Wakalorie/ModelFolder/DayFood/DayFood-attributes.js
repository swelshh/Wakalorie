﻿/**  * @fileOverview setup datastore class, attributes, events for DayFood * @author Welsh Harris * @created 07/20/2013 * * @name Wakalorie * @copyright (c) 2013 CoreBits DataWorks LLC * @license Released under the MIT license (included in distribution in (MIT LICENSE.txt) *///-------------------------------------------------------------------------//dataclass //-------------------------------------------------------------------------model.DayFood = new DataClass("DayFoods", "public");//-------------------------------------------------------------------------//storage//-------------------------------------------------------------------------model.DayFood.id = new Attribute("storage", "long", "key auto");model.DayFood.foodName = new Attribute("storage", "string");model.DayFood.qty = new Attribute("storage", "long");model.DayFood.totalCal = new Attribute("storage", "long");//-------------------------------------------------------------------------//calculated//-------------------------------------------------------------------------//-------------------------------------------------------------------------//alias//-------------------------------------------------------------------------//-------------------------------------------------------------------------//relatedEntity//-------------------------------------------------------------------------model.DayFood.day = new Attribute("relatedEntity", "Day", "Day");//-------------------------------------------------------------------------//relatedEntities//-------------------------------------------------------------------------//-------------------------------------------------------------------------//attribute event//-------------------------------------------------------------------------//-------------------------------------------------------------------------//datastore class event//-------------------------------------------------------------------------
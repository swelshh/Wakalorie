﻿/**  * @fileOverview General stuff for error handling * @author Welsh Harris * @created 08/08/2013 * * @name Wakalorie * @copyright (c) 2013 CoreBits DataWorks LLC * @license Released under the MIT license (included in distribution in MIT LICENSE.txt) *//** @namespace */var WAKL = WAKL || {};WAKL.err = (function() {	"use strict";		//handle errors	function handler(error) {		var errMsg = error[0].message;				//swh_todo: send this error to the server for logging, send along navigator.userAgent				if (errMsg === "SyntaxError: JSON.parse: unexpected end of data") {			alert("Cannot connect to the server");		} else {			alert(error[0].message);		}	}	//--------------------	//public API	//--------------------	return {		handler: handler	};	}());
const express = require('express');
const router = express.Router();

const jsf = require('json-schema-faker');
const util = require('util')
const chance = require('chance')
const faker = require('faker')
jsf.extend('chance', () => new chance.Chance());
jsf.extend('faker', () => faker);

var recentDays = 5;

var schema = {
	"type": "array",
	"minItems": 10,
	"maxItems": 20,
	"items": {
		"type": "object",
		"properties": {
		  "name": {
			"type": "string",
			"faker": "name.findName"
		  },
		  "date": {
			"type": "string",
			"faker": "date.recent"
		  },
		  "ratings" : {
			"type": "integer", 
			 "minimum": 1,
			   "maximum": 10
		  },
		  "readiness" : {
			  "type": "integer", 
			  "minimum":1,
			  "maximum":100
			  
		  },
		  "autonomy":
		  {
			  "type":"integer",
			  "minimum":1,
			  "maximum":100
		  }
		},
		"required": [
		  "name",
		  "date", 
		  "ratings",
		  "readiness",
		  "autonomy"
		 ]
		}
  };

/* GET home page. */
router.get('/', (req, res) => {

  jsf.resolve(schema).then(sample => {
  	   console.log(util.inspect(sample, 
  	   	{showHidden: false, depth: null}));
	   
	   res.render('projects', 
	  	{  projects:  sample });
  });

  
});

module.exports = router;

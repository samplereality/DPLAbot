var sys = require('util'),
    rest = require('restler');
var Twit = require('twit');
var inflection = require( 'inflection' );

// You need secret codes and tokens from dev.twitter.com Mkae sure your app is set up for Read/Write access
var T = new Twit({
  consumer_key:         '', 
  consumer_secret:      '',
  access_token:         '',
  access_token_secret:  ''
});

var statement = "";

// Let's build our arrays. introArray and checkArray add a bit of variation into the tweets
var introArray = ["Like ","Looking for ","Interested in ","Ever hear of ","Think you know ","Puzzled by ","Crazy about ","You know "];
var checkArray = ["? Then see ","? Check out ","? Better consider ","? Take a look at ","? You gotta see ","? Have a look at "];

// makeDPLA is the heart of the bot
function makeDPLA() {
// Now let's grab a random selection from the introArray and checkArray. Every time the makeDPLA function runs, it grabs different phrases from the arrays
var intro = introArray[Math.floor(Math.random() * introArray.length)];
var check = checkArray[Math.floor(Math.random() * checkArray.length)];

// DPLAbot uses the Wordnik API to grab a random noun. It then plugs that random noun--data[0].word--into a call to the DPLA API.
// You need two API keys for this two work: a Worknik API key and a DPLA API key.
rest.get('http://api.wordnik.com/v4/words.json/randomWords?minCorpusCount=10000&hasDictionaryDef=true&minDictionaryCount=10&includePartOfSpeech=noun,idiom&excludePartOfSpeech=proper-noun,proper-noun-plural,proper-noun-posessive,suffix,family-name,idiom,affix&limit=2&maxLength=30&api_key=YOUR_WORDNIK_APIKEY').on('complete', function(data, response){
	randomNoun = data[0].word;
	randomNoun = inflection.pluralize(randomNoun); // Pluralize the random noun 
	rest.get('http://api.dp.la/v2/items?q='+data[0].word+'&api_key=YOUR_DPLA_APIKEY').on('complete', function(data, response){
			var results = data.docs; // Grabs up to ten results from the DPLA
			var i = Math.floor(Math.random()*results.length); // Select a random number based on the number of results from DPLA
			itemTitle = data.docs[i].sourceResource.title; // Uses the random number to select a single item from the list of DPLA results

			// Sometimes the titles are too long for a tweet. Here we shorten them and add an ellipsis
			if (itemTitle.length > 100){
			  itemTitle = itemTitle.substr(0, 100) + "\u2026";
			  }
			else {itemTitle = itemTitle;
			  }
	
			itemURL = data.docs[i].isShownAt; // This is the source URL for the item
	
	// Now we build	the tweet, which is made up of an introductory phrase, the pluralized noun, another phrase, and the item title and URL	
	statement = intro + randomNoun + check + "\u201c" + itemTitle + "\u201d at " + itemURL;
	console.log(statement);
		    // tweet it!	
		T.post('statuses/update', {status: statement}, function(err, reply) {});

	});
	});
	

	
	}

// Create a tweet upon running dplabot.js
makeDPLA();

// Set up the timing for subsequent executions of makeDPLA. Here we run it every 87 minutes.

setInterval(function() {
  try {
    makeDPLA();
  }
 catch (e) {
    console.log(e);
  }
},1000*60*87);

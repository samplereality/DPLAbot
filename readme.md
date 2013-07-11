# DPLAbot

[@DPLAbot](http://www.twitter.com/DPLAbot) is a Twitter bot that tweets links to random items located in the vast collections of the [Digital Public Library of America](http://dp.la).

### Rationale

The Digital Public Library of America (DPLA) provides [a powerful API](http://dp.la/info/developers/codex/), which gives developers a number of ways to query and access the 2.5 million items in the DPLA collections. However, the API has no means of calling up totally random items. This bot is an attempt to infuse what we all love about libraries--serendipitous discovery--into the DPLA, by retrieving random items at regular intervals.

###Method
DPLAbot works by first coming up with a random noun and next searching the DPLA using that noun as a keyword. The result is a kind of "Surprise Me!" search function for the DPLA. 

The avatar for DPLAbot comes from an early test of the bot, in which the DPLA item ["Cat and kitten"](http://collections.si.edu/search/results.htm?q=record_ID%3Achndm_1949-49-35&repo=DPLA) was the random result.

DPLAbot relies on two APIs to work: 

1. Obviously, the DPLA API, which is free and open;
2. And the [Wordnik API](http://developer.wordnik.com/), which provides the "secret sauce"--the randomness--that powers DPLAbot.

To run or modify your own version of DPLAbot, you'll need keys to these two APIs. Insert them in the code in the appropriate places.

###Installation

DPLAbot runs on node.js, a server-side Javascript engine. In addition to node, the bot requires NPM and several dependencies, which you can install this way (on the command line):

    npm install restler
    npm install twit
    npm install inflection

Execute the bot with:

    node dplabot_beta.js




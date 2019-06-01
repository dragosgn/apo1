'use strict';

let https = require ('https');

// **********************************************

// Replace the accessKey string value with your valid access key.
let accessKey = '962f0474742a485d95d3477ac17279e2';

//https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/quickstarts/nodejs#SentimentAnalysis

// **********************************************


let uri = 'westcentralus.api.cognitive.microsoft.com';
let path_languages = '/text/analytics/v2.1/languages';
let path_sentiment = '/text/analytics/v2.1/sentiment';
let path_keyPhrases = '/text/analytics/v2.1/keyPhrases';

let response_handler = function (response) {
    let body = '';
    response.on ('data', function (d) {
        body += d;
    });
    response.on ('end', function () {
		let body_ = JSON.parse (body);
		let body__ = JSON.stringify (body_, null, '  ');
        console.log (body__);
    });
    response.on ('error', function (e) {
        console.log ('Error: ' + e.message);
    });
};

let get_language = function (documents) {
	let body = JSON.stringify (documents);

	let request_params = {
		method : 'POST',
		hostname : uri,
		path : path_languages,
		headers : {
			'Ocp-Apim-Subscription-Key' : accessKey,
		}
	};

	let req = https.request (request_params, response_handler);
	req.write (body);
	req.end ();
}


let get_sentiments = function (documents) {
	let body = JSON.stringify (documents);

	let request_params = {
		method : 'POST',
		hostname : uri,
		path : path_sentiment,
		headers : {
			'Ocp-Apim-Subscription-Key' : accessKey,
		}
	};

	let req = https.request (request_params, response_handler);
	req.write (body);
	req.end ();
}

let get_key_phrases = function (documents) {
	let body = JSON.stringify (documents);

	let request_params = {
		method : 'POST',
		hostname : uri,
		path : path_keyPhrases,
		headers : {
			'Ocp-Apim-Subscription-Key' : accessKey,
		}
	};

	let req = https.request (request_params, response_handler);
	req.write (body);
	req.end ();
}

let documents = { 'documents': [
	{ 'id': '1', 'language': 'de', 'text': 'Ich finde die Impfungen sind ein Verbrechen und müssen verboten werden.' },
	{ 'id': '2', 'language': 'de', 'text': 'Ich finde die Impfungen sind nicht immer notwendig und müssen mit Bedacht angewendet werden.' },
]};

get_sentiments (documents);

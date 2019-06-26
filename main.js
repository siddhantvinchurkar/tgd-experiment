/* This is the main JS file for this web app */

/* Global Variables */
var user = {};
var signedIn = false;
var db = null;
var currentUserDocId = null;
var returningUser = false;
var volumeStart = 1.0;
var volumeEnd = 0.1;
var low_volume = false;
var fulfillmentText = null;
var fulfillmentMessage = null;
var action = null;
var outputAudio = new Audio();
var google_auth_token = null;
var speechRecognitionAvailable = false;
window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
var speechRecognition = null;
var is_user_talking = false;
var modalElements = null;
var modalInstances = null;
var responseTextModal = null;
var os = [
	{ name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
	{ name: 'Windows', value: 'Win', version: 'NT' },
	{ name: 'iPhone', value: 'iPhone', version: 'OS' },
	{ name: 'iPad', value: 'iPad', version: 'OS' },
	{ name: 'Kindle', value: 'Silk', version: 'Silk' },
	{ name: 'Android', value: 'Android', version: 'Android' },
	{ name: 'PlayBook', value: 'PlayBook', version: 'OS' },
	{ name: 'BlackBerry', value: 'BlackBerry', version: '/' },
	{ name: 'Macintosh', value: 'Mac', version: 'OS X' },
	{ name: 'Linux', value: 'Linux', version: 'rv' },
	{ name: 'Palm', value: 'Palm', version: 'PalmOS' }
];
var browser = [
	{ name: 'Chrome', value: 'Chrome', version: 'Chrome' },
	{ name: 'Firefox', value: 'Firefox', version: 'Firefox' },
	{ name: 'Safari', value: 'Safari', version: 'Version' },
	{ name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
	{ name: 'Opera', value: 'Opera', version: 'Opera' },
	{ name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
	{ name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
];
var header = [
	navigator.platform,
	navigator.userAgent,
	navigator.appVersion,
	navigator.vendor,
	window.opera
];

/* Identity RegEx Function */
function matchItem(string, data) {
	var i = 0,
		j = 0,
		html = '',
		regex,
		regexv,
		match,
		matches,
		version;
	for (i = 0; i < data.length; i += 1) {
		regex = new RegExp(data[i].value, 'i');
		match = regex.test(string);
		if (match) {
			regexv = new RegExp(data[i].version + '[- /:;]([\d._]+)', 'i');
			matches = string.match(regexv);
			version = '';
			if (matches) {
				if (matches[1]) {
					matches = matches[1];
				}
			}
			if (matches) {
				matches = matches.split(/[._]+/);
				for (j = 0; j < matches.length; j += 1) {
					if (j === 0) {
						version += matches[j] + '.';
					}
					else {
						version += matches[j];
					}
				}
			}
			else {
				version = '0';
			}
			return {
				name: data[i].name,
				version: parseFloat(version)
			};
		}
	}
	return { name: 'unknown', version: 0 };
}

/* Retrieve device identity */
function getDeviceIdentity() {
	agent = header.join(' ');
	os = this.matchItem(agent, os);
	browser = this.matchItem(agent, browser);
}

/* Set Text Function */
function setText(line1, line2, line3) {

	document.getElementById('screen1').innerHTML = line1;
	document.getElementById('screen2').innerHTML = line2;
	document.getElementById('screen3').innerHTML = line3;

}

/* Volume Reduction Function */
function reduceVolume() {
	var interval1 = setInterval(function () { document.getElementById('background_music').volume = volumeStart; volumeStart -= 0.1; }, 100);
	volumeStart = 1.0;
	setTimeout(function () { clearInterval(interval1); }, 900);
	low_volume = true;
}

/* Volume Increment Function */
function increaseVolume() {
	var interval2 = setInterval(function () { document.getElementById('background_music').volume = volumeEnd; volumeEnd += 0.1; }, 100);
	volumeEnd = 0.1;
	setTimeout(function () { clearInterval(interval2); }, 900)
	low_volume = false;
}

/* Function to read a link */
function readLink(link) {
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", link, true);
	rawFile.onreadystatechange = function () {
		if (rawFile.readyState === 4) {
			if (rawFile.status === 200 || rawFile.status == 0) {
				google_auth_token = rawFile.responseText;
			}
		}
	}
	rawFile.send(null);
}

/* Dialogflow Request */
function flowRequest(userQuery) {
	$.ajax({
		type: "POST",
		url: "https://dialogflow.googleapis.com/v2/projects/tgd-experiment/agent/sessions/mySession1:detectIntent",
		async: true,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		headers: {
			"Authorization": "Bearer " + google_auth_token,
		},
		data: JSON.stringify({
			"queryInput": {
				"text": {
					"text": userQuery,
					"languageCode": "en-GB"
				}
			}
		}),
		success: function (data) {
			fulfillmentText = data.queryResult.fulfillmentText;
			fulfillmentMessage = data.queryResult.fulfillmentMessages[0].text.text[0];
			action = data.queryResult.action;
			outputAudio.src = 'data:audio/mp3;base64, ' + data.outputAudio;
			outputAudio.onloadedmetadata = () => {
				reduceVolume();
				setTimeout(function () { outputAudio.play(); }, 900);
				setTimeout(function () { increaseVolume(); }, (outputAudio.duration + 1) * 1000);
			}
			document.getElementById('response_text').innerHTML = fulfillmentText;
			responseTextModal.open();
			setTimeout(function () { responseTextModal.close(); }, (outputAudio.duration + 1) * 1000);
		},
		error: function (e) {
			console.log(e);
		}
	});
}

/* Animate Introduction Function */
function animateIntroduction() {

	flowRequest("osmanabad");
	$("#screen1").fadeIn(1000);
	setTimeout(function () { $("#screen2").fadeIn(1000); }, 1000);
	setTimeout(function () { $("#screen3").fadeIn(1000); }, 2000);
	setTimeout(function () { $("#screen1").fadeOut(1000); }, 6000);
	setTimeout(function () { $("#screen2").fadeOut(1000); }, 7000);
	setTimeout(function () { $("#screen3").fadeOut(1000); }, 8000);

}

/* Animate Brief Function */
function animateBrief() {

	setText('I\'m omnipresent; and right now, most of my knowledge comes from the people I interact with.', 'Use the mic button to talk to me.', 'I\'ll store your preferences if you sign in.');
	$("#screen1").fadeIn(1000);
	setTimeout(function () { $("#screen2").fadeIn(1000); }, 1000);
	setTimeout(function () { $("#mic").fadeIn(1000); }, 12000);
	setTimeout(function () { $(".vt-wrapper").fadeIn(1000); }, 12000);
	setTimeout(function () { $("#crocket").fadeIn(1000); }, 12000);
	setTimeout(function () { $('html, body').animate({ scrollTop: $("#mic").offset().top }, 4000); }, 13000);
	setTimeout(function () { $("#crocket").fadeOut(1000); }, 15000);
	setTimeout(function () { $("#screen3").fadeIn(1000); }, 7000);
	setTimeout(function () { $("#sign_in_button").fadeIn(1000); }, 12000);
	setTimeout(function () { $("#screen1").fadeOut(1000); }, 5000);
	setTimeout(function () { $("#screen2").fadeOut(1000); }, 6000);
	setTimeout(function () { $("#screen3").fadeOut(1000); }, 10000);

}

/* Animate Loading Functions */
function startLoading() {
	if (low_volume) increaseVolume();
	$("#load").fadeIn(1000);
	$('html, body').animate({ scrollTop: $("#load").offset().top }, 2000);
}

function stopLoading() {
	if (!low_volume) reduceVolume();
	$('html, body').animate({ scrollTop: $("#mic").offset().top }, 2000);
	$("#load").fadeOut(1000);
}

/* Sign In Function */
function signIn() {

	var provider = new firebase.auth.GoogleAuthProvider();
	if (!signedIn) {
		getDeviceIdentity();
		firebase.auth().signInWithPopup(provider).then(function (result) {
			user = result.user;
			var tempCounter = 0;
			db.collection('users').where('email', '==', user.email).get().then(function (querySnapshot) {
				querySnapshot.forEach((doc) => {
					currentUserDocId = doc.id;
					tempCounter++;
				});
				if (tempCounter < 1) {
					returningUser = false;
					db.collection('users').add({
						displayName: user.displayName,
						email: user.email,
						photoURL: user.photoURL
					}).then(function (doc) {
						currentUserDocId = doc.id;
					});
					db.collection('users').doc(currentUserDocId).collection('activity_logs').add({
						timestamp: new Date(),
						os_name: os.name,
						os_version: os.version,
						browser_name: browser.name,
						browser_version: browser.version
					});
				}
				else {
					returningUser = true;
					db.collection('users').doc(currentUserDocId).collection('activity_logs').add({
						timestamp: new Date(),
						os_name: os.name,
						os_version: os.version,
						browser_name: browser.name,
						browser_version: browser.version
					});
				}
			});
			signedIn = true;
			$("#sign_in_button").fadeOut(1000);
			setTimeout(function () {

				document.getElementById('sign_in_button').innerHTML = '<i class="material-icons right">exit_to_app</i>Sign Out';
				document.getElementById('username_profile').innerHTML = user.displayName + '<br />' + user.email;
				document.getElementById('username_profile').href = user.photoURL;

			}, 1000);
			setTimeout(function () { $("#sign_in_button").fadeIn(1000); }, 500);
			setTimeout(function () { $("#username_profile").fadeIn(1000); }, 500);
		}).catch(function (error) {
			signedIn = false;
			console.log(error);
		});
	}
	else {
		firebase.auth().signOut().then(function () {
			signedIn = false;
			$("#sign_in_button").fadeOut(1000);
			setTimeout(function () { document.getElementById('sign_in_button').innerHTML = '<i class="material-icons right">arrow_forward_ios</i>Sign In'; }, 1000);
			setTimeout(function () { $("#sign_in_button").fadeIn(1000); }, 500);
			setTimeout(function () { $("#username_profile").fadeOut(1000); }, 500);
		}).catch(function (error) {
			console.log(error);
		});
	}

}

/* Mic Function */
function mic() {
	if (!is_user_talking) {
		speechRecognition.start();
		is_user_talking = true;
		document.getElementById('miclink').classList.add('pulse');
		$("#listening").fadeIn(1000);
		$("#listening-text").fadeIn(1000);
	}
	else {
		speechRecognition.stop();
		is_user_talking = false;
		document.getElementById('miclink').classList.remove('pulse');
		$("#listening").fadeOut(1000);
		$("#listening-text").fadeOut(1000);
	}
}

/* Lottie Initializer Function */
function initilializeLottie(container, jsonFilePath) {
	lottie.loadAnimation({
		container: container,
		renderer: 'svg',
		loop: true,
		autoplay: true,
		path: jsonFilePath
	});
}

/* Lottie Setup Function */
function setupLottie() {
	initilializeLottie(crocket, 'animations/crocket.json');
	initilializeLottie(load, 'animations/load.json');
	initilializeLottie(listening, 'animations/listening.json');
	$(".lottie").fadeOut(1);
}

/* UI Initializer Function */
function initializeUIComponents() {
	modalElements = document.querySelectorAll('.modal');
	modalInstances = M.Modal.init(modalElements);
	responseTextModal = modalInstances[0];
}

/* Main Function */
function main() {

	/* Below is a storyline of the actions this app will perform */

	/* Initialize UI components */
	initializeUIComponents();

	// Setup Lottie
	setupLottie();

	// Introduce users to Marv (This takes 9 seconds)
	animateIntroduction();

	// Brief users about what they can do with Marv (This takes 16 seconds)
	setTimeout(function () { animateBrief(); }, 9000);

	// Set click listenrs
	setTimeout(function () {
		document.getElementById('sign_in_button').onclick = function () { signIn(); }
		document.getElementById('mic').onclick = function () { mic(); }
	}, 15000);

	// Handle Speech Recognition
	speechRecognition.onresult = function (data) {
		flowRequest(data.results[0][0].transcript);
	}
	speechRecognition.onerror = function (data) {
		console.log("Error occured during speech synthesis!\n\n" + data);
	}
	speechRecognition.onnomatch = function (data) {
		console.log("No match found during speech synthesis!\n\n" + data);
	}

}

/* Main thread */
window.onload = function () {

	/* Register a service worker */
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker
			.register('sw.js');
	}

	/* Initialize Firebase */
	firebase.initializeApp({
		apiKey: "AIzaSyB2R3EKvah0v7TXIJhmE-0Fyp0z0cqwUws",
		authDomain: "tgd-experiment.firebaseapp.com",
		databaseURL: "https://tgd-experiment.firebaseio.com",
		projectId: "tgd-experiment",
		storageBucket: "tgd-experiment.appspot.com",
		messagingSenderId: "262835571788",
		appId: "1:262835571788:web:014ae0235c5278c8"
	});

	/* Set the language */
	firebase.auth().languageCode = 'en-GB';

	/* Initialize Firestore */
	db = firebase.firestore();

	/* Register a Service Worker */
	if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');

	/* Load Google Authorization Token for the first time */
	readLink("https://gauth.hyperr.space/");

	/* Update Google Authorization Token every minute thereafter */
	setInterval(function () { readLink("https://gauth.hyperr.space/"); }, 60000);

	/* Configure AJAX requests */
	jQuery.ajaxPrefilter(function (options) {
		if (options.crossDomain && jQuery.support.cors) {
			options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
		}
	});

	/* Check if speech recognition is supported */
	if ('SpeechRecognition' in window) speechRecognitionAvailable = true; else speechRecognitionAvailable = false;

	/* Wait 1 second to load everything and then begin! */
	setTimeout(function () { if (speechRecognitionAvailable) { speechRecognition = new window.SpeechRecognition(); main(); } else { alert("Your machine does not support speech recognition!"); } }, 1000);

}


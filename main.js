/* This is the main JS file for this web app */

/* Global Variables */
var user = {};
var signedIn = false;
var db = '';
var currentUserDocId = '';
var returningUser = false;
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
				if(matches){
					if (matches[1]){
						matches = matches[1];
					}
				}
			if (matches) {
				matches = matches.split(/[._]+/);
				for (j = 0; j < matches.length; j += 1) {
					if(j === 0){
						version += matches[j] + '.';
					}
					else{
						version += matches[j];
					}
				}
			}
			else{
				version = '0';
			}
			return {
			name: data[i].name,
			version: parseFloat(version)
			};
		}
	}
	return {name: 'unknown', version: 0};
}

/* Retrieve device identity */
function getDeviceIdentity(){
	agent = header.join(' ');
	os = this.matchItem(agent, os);
	browser = this.matchItem(agent, browser);
}

/* Set Text Function */
function setText(line1, line2, line3){

	document.getElementById('screen1').innerHTML = line1;
	document.getElementById('screen2').innerHTML = line2;
	document.getElementById('screen3').innerHTML = line3;
	
}

/* Animate Introduction Function */
function animateIntroduction(){

	$("#screen1").fadeIn(1000);
	setTimeout(function(){$("#screen2").fadeIn(1000);}, 1000);
	setTimeout(function(){$("#screen3").fadeIn(1000);}, 2000);
	setTimeout(function(){$("#screen1").fadeOut(1000);}, 6000);
	setTimeout(function(){$("#screen2").fadeOut(1000);}, 7000);
	setTimeout(function(){$("#screen3").fadeOut(1000);}, 8000);
	
}

/* Animate Brief Function */
function animateBrief(){

	setText('I\'m omnipresent; and right now, most of my knowledge comes from people I interact with.', 'Use the mic button to talk to me.', 'I\'ll store your preferences if you sign in.');
	$("#screen1").fadeIn(1000);
	setTimeout(function(){$("#screen2").fadeIn(1000);}, 1000);
	setTimeout(function(){$("#mic").fadeIn(1000);}, 10000);
	setTimeout(function(){$(".vt-wrapper").fadeIn(1000);}, 10000);
	setTimeout(function(){$("#screen3").fadeIn(1000);}, 6000);
	setTimeout(function(){$("#sign_in_button").fadeIn(1000);}, 10000);
	setTimeout(function(){$("#screen1").fadeOut(1000);}, 4000);
	setTimeout(function(){$("#screen2").fadeOut(1000);}, 5000);
	setTimeout(function(){$("#screen3").fadeOut(1000);}, 9000);
	
}

/* Sign In Function */
function signIn(){

	var provider = new firebase.auth.GoogleAuthProvider();
	if(!signedIn){
		getDeviceIdentity();
		firebase.auth().signInWithPopup(provider).then(function(result){
			user = result.user;
			var tempCounter = 0;
			db.collection('users').where('email', '==', user.email).get().then(function(querySnapshot){
				querySnapshot.forEach((doc) => {
					currentUserDocId = doc.id;
					tempCounter++;
				});
				if(tempCounter < 1){
					returningUser = false;
					db.collection('users').add({
					displayName: user.displayName,
					email: user.email,
					photoURL: user.photoURL
					}).then(function(doc){
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
				else{
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
			setTimeout(function(){
			
				document.getElementById('sign_in_button').innerHTML = '<i class="material-icons right">exit_to_app</i>Sign Out';
				document.getElementById('username_profile').innerHTML = user.displayName + '<br />' + user.email;
				document.getElementById('username_profile').href = user.photoURL;
				
			}, 1000);
			setTimeout(function(){$("#sign_in_button").fadeIn(1000);}, 500);
			setTimeout(function(){$("#username_profile").fadeIn(1000);}, 500);
			}).catch(function(error){
				signedIn = false;
				console.log(error);
			});
	}
	else{
		firebase.auth().signOut().then(function() {
			signedIn = false;
			$("#sign_in_button").fadeOut(1000);
			setTimeout(function(){document.getElementById('sign_in_button').innerHTML = '<i class="material-icons right">arrow_forward_ios</i>Sign In';}, 1000);
			setTimeout(function(){$("#sign_in_button").fadeIn(1000);}, 500);
			setTimeout(function(){$("#username_profile").fadeOut(1000);}, 500);
		}).catch(function(error) {
			console.log(error);
		});
	}
	
}

/* Main Function */
function main(){

	/* Below is a storyline of the actions this app will perform */

	// Introduce users to Marv (This takes 9 seconds)
	animateIntroduction();
	
	// Brief users about what they can do with Marv (This takes 11 seconds)
	setTimeout(function(){animateBrief();}, 9000);
	
	// Set click listenrs
	setTimeout(function(){
		document.getElementById('sign_in_button').onclick = function(){signIn();}
		document.getElementById('mic').onclick = function(){mic();}
	}, 10000);

}

/* Main thread */
window.onload = function () {

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
	firebase.auth().languageCode = 'en';
	
	/* Initialize Firestore */
	db = firebase.firestore();

	/* Register a Service Worker */
	if('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');

	main();

}


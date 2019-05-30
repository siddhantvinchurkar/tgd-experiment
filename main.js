/* This is the main JS file for this web app */

/* Main Function */
function main(){

	/* Slowly fade the screen in */
	$("#screen").fadeIn(2000);

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

    // Register a Service Worker
	if('serviceWorker' in navigator) {
	    navigator.serviceWorker
            .register('sw.js')
            .then(function() { console.log("%cService Worker Registered!", "background:#222222; color:#BADA55;"); });
	}
	
	main();

}

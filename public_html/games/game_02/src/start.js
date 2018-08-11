var game = new Phaser.Game(1200, 640, Phaser.CANVAS);
var enablePWA = false;
var states = {
	'Boot': EPT.Boot,
	'Preloader': EPT.Preloader,
	'MainMenu': EPT.MainMenu,
	'Achievements': EPT.Achievements,
	'Story': EPT.Story,
	'Game': EPT.Game
};
for(var state in states) {
	game.state.add(state, states[state]);
}
game.state.start('Boot');

if(enablePWA) {
	// SERVICE WORKER
	if('serviceWorker' in navigator) {
		navigator.serviceWorker.register('./src/sw.j	s');
	};
	// NOTIFICATIONS TEMPLATE
	Notification.requestPermission().then(function(result) {
		if(result === 'granted') {
			exampleNotification();
		}
	});
	function exampleNotification() {
		// console.log('test >>>>>>>>>>>>>>>>>>>>>>>>>>>>>' + games.length);
		var randomItem = Math.floor(Math.random()*games.length);
		var notifTitle = games[randomItem].name;
		var notifBody = 'Created by ' + games[randomItem].author + '.';
		var notifImg = 'data/img/' + games[randomItem].slug + '.jpg';
		var options = {
			body: notifBody,
			icon: notifImg
		}
		var notif = new Notification(notifTitle, options);
		setTimeout(exampleNotification, 3000);
	}
}
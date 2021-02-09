let KJS_wordlist;
let KJS_wordlist_game = [];
let KJS_running = false;

function KJS_start() {
	KJS_wordlist_game = KJS_wordlist;
	KJS_running = true;
}

function KJS_stop() {
	KJS_wordlist_game = [];
	KJS_running = false;
}

function KJS_onTurn() {
	if (!KJS_running) return;
	let found = false;
	KJS_wordlist_game = KJS_wordlist_game.filter(value => {
		if (found || !value.startsWith(KJS_getCurrentCharacter())) return true;
		KJS_say(value);
		return false;
	});
}

function KJS_say(text) {
	var originalText = $("#Talk").val();
	$("#Talk").val(text);
	$("#ChatBtn")[0].click();
	$("#Talk").val(originalText);
}

function KJS_getCurrentCharacter() {
	return $(".jjo-display").val();
}

let KJS_inputvisible = false;
function KJS_loop() {
	if ($(".game-input").is(":hidden")) {
		KJS_inputvisible = false;
	} else {
		if (!KJS_inputvisible) KJS_onTurn();
		KJS_inputvisible = true;
	}
	requestAnimationFrame(KJS_loop);
}
requestAnimationFrame(KJS_loop);

var rawFile = new XMLHttpRequest();
rawFile.open("GET", "https://raw.githubusercontent.com/soshimee/KKuTu-Auto/master/wordlist.js", false);
rawFile.onreadystatechange = () => {
	if (rawFile.readyState === 4) {
		if (rawFile.status === 200 || rawFile.status == 0) {
			var allText = rawFile.responseText;
			eval(allText);
		}
	}
}
rawFile.send(null);
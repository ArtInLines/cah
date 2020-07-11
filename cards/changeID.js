const fs = require('fs');
const whiteCards = require('./whiteCards.json');
const blackCards = require('./blackCards.json');

function changeID(array, path) {
	for (let i = 0; i < array.length; i++) {
		array[i].id = i + 1;
	}

	const jsonArray = JSON.stringify(array);
	fs.writeFileSync(path, jsonArray);
}

changeID(whiteCards, './whiteCards.json');
changeID(blackCards, './blackCards.json');

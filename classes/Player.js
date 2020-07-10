// Player class:
// username - atcs as ID, so needs to be unique - names may not be only numbers/dates
// _cards - stored as an array of objects
// _points - vicotry points gained throughout the game
// get & set points
// get & set cards

class Player {
	constructor(username) {
		this.name = username;
		this._points = 0;
		this._cards = [];
		this._turn = false;
	}
	get points() {
		return this._points;
	}
	set points(x) {
		this._points = x;
	}
	get cards() {
		return this._cards;
	}
	set cards(cardsArray) {
		this._cards = cardsArray;
	}
	addCard(card) {
		this._cards.push(card);
	}
	get turn() {
		return this._turn;
	}
	set turn(bool) {
		this._turn = bool;
	}
}

module.exports = Player;

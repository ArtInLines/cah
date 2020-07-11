// Player class:
// username - atcs as ID, so needs to be unique - names may not be only numbers/dates
// _cards - stored as an array of objects
// _points - vicotry points gained throughout the game
// get & set points
// get & set cards

class Player {
	constructor(username) {
		this._name = username;
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
	get turn() {
		return this._turn;
	}
	set turn(bool) {
		this._turn = bool;
	}

	addCard(card) {
		card.player = this._name;
		this._cards.push(card);
	}
	addPoints(amount) {
		this._points += amount;
	}
	findCardByID(id) {
		for (let i = 0; i < this._cards.length; i++) {
			if (this._cards[i].id == id) return { cardObj: this._cards[i], index: i };
		}
	}
	findCardByIndex(index) {
		return this._cards[index];
	}
	playCard(id, index) {
		// if index isn't given and only ID is given
		if (index === undefined) index = findCardByID(id).index;
		return this._cards.splice(index, 1);
	}
}

module.exports = Player;

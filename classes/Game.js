class Game {
	constructor(gamename) {
		this._name = gamename;
		this._players = [];
		this.roundsAmount = 30;
		this.cardsAmount = 7;
		this._whiteCards = [];
		this._blackCards = [];
	}
	get players() {
		return this._players;
	}
	getSinglePlayer(playerName) {
		for (let i = 0; i < this._players.length; i++) {
			if (this._players[i].name === playerName) return { playerObj: playerEl, index: i };
		}
	}
	get whiteCards() {
		return this._whiteCards;
	}
	get blackCards() {
		return this._blackCards;
	}
	set players(playersArr) {
		this._players = playersArr;
	}
	set whiteCards(arr) {
		this._whiteCards = arr;
	}
	set blackCards(arr) {
		this._blackCards = arr;
	}
	addPlayer(playerObj) {
		this._players.push(playerObj);
	}
	shuffle(array) {
		let currentIndex = array.length,
			temporaryValue,
			randomIndex;
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}
	drawCards(cardsArray = this._whiteCards, cardsAmount = 1) {
		return cardsArray.splice(0, cardsAmount);
	}
	givePlayerCards(key, cardsArray, resetAllCards = false) {
		// If index of player is unknown
		if (isNaN(key)) {
			for (let i = 0; i < this._players.length; i++) {
				if (this._players[i].name === key) {
					if (resetAllCards) return (this._players[i].cards = cardsArray);
					for (let j = 0; j < cardsArray.length; j++) {
						this._players[i].addCard(cardsArray[j]);
					}
					return this._players[i].cards;
				}
			}
		}
		// If index of player is known
		else {
			if (resetAllCards) return (this._players[key].cards = cardsArray);
			for (let i = 0; i < cardsArray.length; i++) {
				this._players[key].addCard(cardsArray[i]);
			}
		}
	}
	startGame() {
		this._blackCards = this.shuffle(this._blackCards);
		this._whiteCards = this.shuffle(this._whiteCards);
		for (let i = 0; i < this._players.length; i++) {
			const drawnCards = this.drawCards(this._whiteCards, this.cardsAmount);
			this.givePlayerCards(i, drawnCards, false);
		}
	}
}

module.exports = Game;

const testGame = new Game('testGame');
testGame.whiteCards;

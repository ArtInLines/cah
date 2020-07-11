class Game {
	constructor(gamename, roundsNum = 30, cardsNum = 7) {
		this._name = gamename;
		this._players = [];
		this._roundsAmount = roundsNum;
		this._cardsAmount = cardsNum;
		this._whiteCards = [];
		this._blackCards = [];
		this._currentBlackCard = {};
	}
	get roundsAmount() {
		return this._roundsAmount;
	}
	set roundsAmount(x) {
		this._roundsAmount = x;
	}
	get cardsAmount() {
		return this._cardsAmount;
	}
	set cardsAmount(x) {
		this._cardsAmount = x;
	}
	get players() {
		return this._players;
	}
	set players(playersArr) {
		for (let i = 0; i < playersArr.length; i++) {
			playersArr[i].turn = false;
		}
		this._players = playersArr;
	}
	get whiteCards() {
		return this._whiteCards;
	}
	set whiteCards(arr) {
		this._whiteCards = arr;
	}
	get blackCards() {
		return this._blackCards;
	}
	set blackCards(arr) {
		this._blackCards = arr;
	}
	get currentBlackCard() {
		return this._currentBlackCard;
	}
	set currentBlackCard(cardObj) {
		this._currentBlackCard = cardObj;
	}

	addPlayer(playerObj) {
		playerObj.turn = false;
		this._players.push(playerObj);
	}

	getSinglePlayer(playerName) {
		for (let i = 0; i < this._players.length; i++) {
			if (this._players[i].name === playerName) return { playerObj: this._players[i], index: i };
		}
	}

	getStartPlayer() {
		for (let i = 0; i < this._players.length; i++) {
			if (this._players[i].turn) return { playerObj: this._players[i], index: i };
		}
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

	drawCards(cardsAmount = 1, cardsArray = this._whiteCards) {
		const cards = cardsArray.splice(0, cardsAmount);
		if (cardsAmount == 1) return cards[0];
		return cards;
	}

	givePlayerCards(key, cardsAmount = 1, resetAllCards = false) {
		// Get cards via drawing helper fucntion
		let cardsArray = this.drawCards(cardsAmount);

		// If index of player is unknown -- Name must be known
		if (isNaN(key)) {
			for (let i = 0; i < this._players.length; i++) {
				// Loop through players to find player with fitting key (name)
				if (this._players[i].name === key) {
					if (resetAllCards) return (this._players[i].cards = cardsArray);
					for (let j = 0; j < cardsArray.length; j++) {
						// Loop through array of cards to be added
						this._players[i].addCard(cardsArray[j]);
					}
					return this._players[i].cards;
				}
			}
		}
		// If index of player is known
		else {
			if (resetAllCards) return (this._players[key].cards = cardsArray);
			// Loop through array of cards to be added
			for (let i = 0; i < cardsArray.length; i++) {
				this._players[key].addCard(cardsArray[i]);
			}
			return this._players[key].cards;
		}
	}

	giveAllPlayersCards(resetAllCards = false) {
		// Loop through players
		for (let i = 0; i < this._players.length; i++) {
			// Get amount of cards needed to be drawn for player
			const neededCardsAmount = this._cardsAmount - this._players[i].cards.length;
			this.givePlayerCards(i, neededCardsAmount, resetAllCards);
		}
	}

	startNextTurn() {
		//Check who's turn it is rn and give it to the next player
		const currentStartPlayer = this.getStartPlayer();
		currentStartPlayer.playerObj.turn = false;
		// Check if player is last in players array
		let newStartPlayer;
		if (currentStartPlayer.index == this._players.length - 1) {
			newStartPlayer = this._players[0];
		} else {
			newStartPlayer = this._players[currentStartPlayer.index + 1];
		}
		newStartPlayer.turn = true;

		// Giving every player cards until they reach their limit of cards again
		this.giveAllPlayersCards();

		// Draw new black card
		this._currentBlackCard = this.drawCards(1, this._blackCards);
	}

	startGame() {
		// Shuffle cards
		this._blackCards = this.shuffle(this._blackCards);
		this._whiteCards = this.shuffle(this._whiteCards);

		// Give every player cards
		this.giveAllPlayersCards();

		// Randomize start player
		const randomPlayerIndex = Math.floor(Math.random() * this._players.length);
		this._players[randomPlayerIndex].turn = true;

		// Draw black card
		this._currentBlackCard = this.drawCards(1, this._blackCards);
	}
}

module.exports = Game;

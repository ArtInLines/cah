'use strict';

require('dotenv').config({ path: `${__dirname}/config/config.env` });
const colors = require('colors');
colors.setTheme({
	log: ['gray', 'italic', 'dim'],
	data: ['green', 'italic'],
	success: ['cyan', 'italic'],
	warn: ['yellow', 'bold'],
	error: ['red', 'italic', 'underline'],
});
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT;
const publicPath = `${__dirname}/public`;
app.use(express.json());
app.use('/assets', express.static(`${publicPath}/assets`));

// My own modules and classes and stuff
const whiteCards = require('./cards/whiteCards.json');
const blackCards = require('./cards/blackCards.json');
const Player = require('./classes/Player');
const Game = require('./classes/Game');

// Hashes
let games = {};
let players = {};

// Cards - Stored as an objects (JSON file for white cards and for black cards)
// White Cards:
// text: "", (text of the card)
// pack: "" (pack of the card, e.g.: "Game of Thrones")
// Black Cards:
// text: "",
// pack: "",
// amount: number (Amount of white cards that need to be played)

app.get('/', (req, res) => {
	res.sendFile(`${publicPath}/index.html`);
})
	.post('/check/:name', (req, res) => {
		let array;
		if (req.params.name == 'gamenames') array = games;
		else if (req.params.name == 'usernames') array = players;
		for (let i = 0; i < array.length; i++) {
			if (array[i].name == req.body.name) {
				console.log(false);
				res.json({ valid: false });
			}
		}
		console.log(true);
		res.json({ valid: true });
	})
	.post('/create/game', (req, res) => {
		const game = new Game({
			name: req.body.game.name,
			players: [req.body.player],
		});
		games;
	});

server.listen(PORT, console.log(`Server listening on port ${PORT}`.log));

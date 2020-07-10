'use strict';

const usernameInput = document.querySelector('#usernameInput');
const gamenameInput = document.querySelector('#gamenameInput');
const playeramountInput = document.querySelector('#playeramountInput');
const createGameBtn = document.querySelector('#createGameBtn');

/* 
usernameInput.addEventListener('change', async () => {
	const res = await sendReq('/check/usernames', { name: usernameInput.value });
	console.log(res);
});

gamenameInput.addEventListener('change', async () => {
	const res = await sendReq('/check/gamenames', { name: gamenameInput.value });
	console.log(res);
});
 */

createGameBtn.addEventListener('click', async () => {
	sendReq('/check/usernames', { name: usernameInput.value }).then((res) => {
		if (!res.valid) return;
	});
	sendReq('/check/gamenames', { name: gamenameInput.value }).then((res) => {
		if (!res.valid) return;
	});
	sendReq('/create/game', { game: { name: gamenameInput.value }, player: { name: usernameInput.value } });
});

async function sendReq(url = '/', data = {}, method = 'POST') {
	const req = await fetch(url, {
		method: method,
		redirect: 'follow',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	return req.json();
}

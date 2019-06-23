const fetch = require('node-fetch');
(async() => {
	try {
		const {
			SOURCE,
			TARGET,
			MTR_VALUE,
			MTR_NAME,
			STK,
			UA_STRING,
			ORIGIN,
			HOOK,
			MESSAGE,
			CHANNEL,
			FROM,
			EMOJI,
		} = process.env;

		const result = await fetch(SOURCE)
		const value = await result.text();

		await Promise.all([
			fetch(`${TARGET}/${value}`, {
				headers: {
					'user-agent': UA_STRING,
					'Origin': ORIGIN,
					[MTR_NAME]: MTR_VALUE
				}
			}),
			fetch(HOOK, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify({
					text: MESSAGE.replace('${value}', value),
					channel: CHANNEL,
					username: FROM,
					icon_emoji: EMOJI,
				}),
			})
		]);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
})();

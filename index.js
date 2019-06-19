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
		} = process.env;

		const result = await fetch(SOURCE)
		const value = await result.text();
		const response = await fetch(`${TARGET}/${value}`, {
			headers: {
				'user-agent': UA_STRING,
				'Origin': ORIGIN,
				[MTR_NAME]: MTR_VALUE
			}
		});
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
})();

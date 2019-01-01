const APIURL = 'https://api.lace.guide';
const AUTHCODE = "afjCEsnkK3bJ@#$dz%3JRTMtWJIAZs@Cc$Me*%!KkXpNR9G1MS$2xtfn5!FfGsy!caK5#kVd4l%ghDyFWp2jAVGaPYdAaerCDW9Snu0G#IOXVBIb*uCx5gt7O0&c1&tUg#G7Nd5nUHTQM7d32nzRlRa3D&WqWN9y&Bqe3SCv7C*mS4LFV5kM37wFbgDgvjELZI%mvx*v&a!w0Ie3XWy$Gdu6NJJUJ#eN^&Q!pCUVyWkZ9B7py8p^a*92r80iOrX3v@BSREqS^MEkx3$#2kUtP%#X5Oq!L*Ovg9Fg5$6xR0oX";

export const streamAndDetect = (image, callback) => {
	const reader = new FileReader();
	reader.readAsDataURL(image);
	reader.onloadend = () => {
		const base64image = reader.result.toString();
		console.log(JSON.stringify({base64image}));
		return fetch(`${APIURL}/stream/streamAndDetect`, {
			method: 'POST',
			headers: {
				'Content-Type':     'application/json',
				auth:               AUTHCODE,
			},
			body: JSON.stringify({base64image}),
		}).then(async (response) => {
			const json = await response.json();
			// TODO: Uncomment for production
			console.log(json);
			callback();
			return (json);
		}).catch((error) => {
			console.log(error);
		});
	}
};

export function retrieveAndVisualise() {
	return fetch(`${APIURL}/stream/retrieveAndVisualise`, {
		method: 'POST',
		headers: {
			'Content-Type':		'application/json',
			auth:				AUTHCODE,
		},
	}).then(async (response) => {
		const json = await response.json();
		console.log(json);
		return (json);
	}).catch((error) => {
		console.log(error);
	});
}

export const connectUser = (data) => {
	return fetch(`${APIURL}/auth/connectUser`, {
		method: 'POST',
		headers: {
			'Content-Type':     'application/json',
			auth:				AUTHCODE,
		},
		body: JSON.stringify(data),
	}).then(async (response) => {
		const json = await response.json();

		console.log(json);
		return (json);
	}).catch((error) => {
		console.log(error);
	});
};

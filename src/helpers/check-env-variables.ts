import 'server-only';

export const checkEnvVariables = () => {
	if (!process.env.API_URL) {
		throw new Error('API_URL is not defined');
	}

	// SESSION_SECRET
	if (!process.env.SESSION_SECRET) {
		throw new Error('SESSION_SECRET is not defined');
	}

};

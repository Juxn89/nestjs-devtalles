export const config = () => ({
	environment: process.env.NODE_ENV || 'env',
	serverPort: process.env.SERVER_PORT || '3500',
	mongoDB: process.env.MONGODB_CONNECTION || '',
	pokeApi: {
		baseURL: 'https://pokeapi.co/api/v2/',
		defaultLimit: process.env.POKEAPI_LIMIT || '5',
	},
});

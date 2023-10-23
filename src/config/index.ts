export const config = () => ({
	mongoDB: process.env.MONGODB_CONNECTION || '',
	pokeApiUrl: 'https://pokeapi.co/api/v2/',
});

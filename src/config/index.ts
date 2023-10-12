export const config = () => ({
	mongoDB: process.env.MONGODB_CONNECTION || '',
});

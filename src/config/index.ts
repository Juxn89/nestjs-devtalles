export const Config = Object.freeze({
	jwt: {
		secret: process.env.JWT_SECRET || ''
	}
})
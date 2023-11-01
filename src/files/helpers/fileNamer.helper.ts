import { randomUUID } from "crypto";

export const fileNamer = (req: Express.Request, file: Express.Multer.File, callback: Function) => {
	if(!file)
		return callback(new Error('File is empry'), false)

	const fileExtension = file.mimetype.split('/')[1];
	const fileName = `${randomUUID()}.${fileExtension}`

	callback(null, fileName)
}
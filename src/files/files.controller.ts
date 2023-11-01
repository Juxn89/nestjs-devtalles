import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express'

import { FilesService } from './files.service';
import { FileFilter, fileNamer } from './helpers/';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

	@Get('product/:imageName')
	findProductImages(
		@Res() res: Response,
		@Param('imageName') imageName: string
	) {
		const path = this.filesService.getStaticProductImage(imageName);

		res.sendFile(path)
	}

	@Post('product')
	@UseInterceptors(FileInterceptor('file', { 
		fileFilter: FileFilter,
		storage: diskStorage({ destination: './static/products', filename: fileNamer })
	}))
	uploadFile( @UploadedFile() file: Express.Multer.File ) {		
		if(!file)
			throw new BadRequestException(`Make sure that file is a image`)

		console.log(file)

		const secureURL = `${file.filename}`;

		return {
			file: file.originalname,
			secureURL
		};
	}
}

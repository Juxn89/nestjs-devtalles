import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express'

import { FilesService } from './files.service';
import { FileFilter, fileNamer } from './helpers/';

@Controller('files')
@ApiTags('Files')
export class FilesController {
  constructor(
		private readonly filesService: FilesService,
		private readonly configService: ConfigService
	) {}

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

		const secureURL = `${this.configService.get('HOST_API')}/files/product/${file.filename}`;

		return {
			file: file.originalname,
			secureURL
		};
	}
}

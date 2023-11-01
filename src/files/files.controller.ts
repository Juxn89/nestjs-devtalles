import { BadRequestException, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { FilesService } from './files.service';
import { FileFilter, fileNamer } from './helpers/';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

	@Post('product')
	@UseInterceptors(FileInterceptor('file', { 
		fileFilter: FileFilter,
		storage: diskStorage({ destination: './static/products', filename: fileNamer })
	}))
	uploadFile( @UploadedFile() file: Express.Multer.File ) {		
		if(!file)
			throw new BadRequestException(`Make sure that file is a image`)

		console.log(file)
		return {
			file: file.originalname
		};
	}
}

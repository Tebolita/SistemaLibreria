import { Controller, Post, UseInterceptors, UploadedFiles, Body, Param } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, basename } from 'path';
import * as fs from 'fs';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('uploadFiles')
  @UseInterceptors(FilesInterceptor('files', 10, {
    storage: diskStorage({
      destination:  `./public`,
      filename: (req, file, cb) => {
        const ext = extname(file.originalname);
        const filename = basename(file.originalname, extname(file.originalname));
        let formatPath;
        let fileNameNoCU;
        
        if (filename.includes("-")){
          formatPath ="/Avatar/" + filename.split("-")[0] + "/"
          fileNameNoCU = filename.split("-")[1]
        }
        if (filename.includes("Credential")) {
          formatPath ="/Credentials/ "
          fileNameNoCU = filename
        }
        if(!filename.includes("-") && !filename.includes("Credential")){
          formatPath ="/BucketLocal/" 
          fileNameNoCU = filename
        }




        const uploadPath = `./public${formatPath}`

        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
        }        
        cb(null, `${uploadPath.replace("./public","")}${fileNameNoCU}${ext}`);

      },
    }),
  }))
  uploadMultipleFiles(
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    return this.filesService.uploadMultipleFiles(files);
  }
}

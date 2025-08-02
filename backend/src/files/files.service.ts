import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FilesService {
  uploadMultipleFiles(files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No se recibieron archivos');
    }

    return {
      message: 'Archivos subidos con éxito',
      files: files.map((file) => ({
        originalName: file.originalname,
        fileName: file.filename,
        path: file.path,
      })),
    };
  }
}

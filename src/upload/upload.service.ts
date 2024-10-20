import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request } from 'express';
import { extname } from 'path';

@Injectable()
export class FileUploadInterceptor implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: (req: Request, file: Express.Multer.File, callback) => {
          // Jika file bertipe PDF, simpan di folder public/bkd
          if (file.mimetype === 'application/pdf') {
            callback(null, 'public/bkd');
          }
          // Jika file bertipe Excel, simpan di folder public/skp
          else if (
            file.mimetype ===
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          ) {
            callback(null, 'public/skp');
          } else {
            callback(new HttpException('Invalid file type', 400), null);
          }
        },
        filename: (req: Request, file: Express.Multer.File, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req: Request, file: Express.Multer.File, callback) => {
        // Validasi tipe file: hanya terima PDF untuk bkd dan Excel untuk skp
        if (file.fieldname === 'bkd' && file.mimetype !== 'application/pdf') {
          return callback(
            new BadRequestException('Only PDF files are allowed for BKD'),
            false,
          );
        }
        if (
          file.fieldname === 'skp' &&
          file.mimetype !==
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ) {
          return callback(
            new BadRequestException('Only Excel files are allowed for SKP'),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: 10 * 1024 * 1024, // Batasan ukuran file 5MB
      },
    };
  }
}

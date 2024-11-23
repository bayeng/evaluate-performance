import { HttpException } from '@nestjs/common';

export class ResponseHelper {
  statusCode: number;
  message: string;
  data: any;
  constructor(statusCode: number, message: string, data: any) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  static success(
    statusCode: number,
    message: string,
    data: any,
    totalData?: any,
  ) {
    return {
      statusCode: statusCode,
      message: message,
      data: data,
      totalData: totalData ?? null,
    };
  }

  static error(statusCode: number, message: string) {
    return new HttpException(
      {
        statusCode: statusCode,
        error: message,
      },
      statusCode,
    );
  }
}

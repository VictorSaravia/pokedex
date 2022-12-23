import { v4 as uuid } from 'uuid';

export const fileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: (error: Error, fileName: any) => void,
) => {
  if (!file) {
    return callback(new Error('File is empty'), false);
  }
  const mimetype = file.mimetype.split('/')[1];
  const name = `${uuid()}.${mimetype}`;
  callback(null, name);
};

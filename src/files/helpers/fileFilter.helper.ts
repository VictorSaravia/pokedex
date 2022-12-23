export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: (error: Error, type: boolean) => void,
) => {
  if (!file) {
    return callback(new Error('File is empty'), false);
  }
  const mimetype = file.mimetype.split('/')[1];
  const validExtensions = ['pdf', 'jpg', 'jpeg', 'png'];
  if (!validExtensions.includes(mimetype)) {
    return callback(new Error('File is not valid extensions'), false);
  }
  return callback(null, true);
};

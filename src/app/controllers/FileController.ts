import { Response } from 'express';
import File from '@models/File';

interface IFile {
  originalname: string;
  filename: string;
}

type FileRequest = {
  file: IFile; // or any other type
};

class FileController {
  constructor() {}

  async store(req: FileRequest, res: Response): Promise<Response> {
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({ name, path });

    return res.json(file);
  }
}

export default new FileController();

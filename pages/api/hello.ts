// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import vision from '@google-cloud/vision'
import formidable, { File } from 'formidable'
import { rmSync } from 'fs'

interface ResponseData {
  colors: Array<any> | null;
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const form = new formidable.IncomingForm({
    uploadDir: './public/uploads',
    keepExtensions: true,
  });
  const file: File = await new Promise((resolve, reject) => {
    form.parse(req, (err, _, files) => {
      if (err) return reject(err);
      resolve(files.file as File);
    });
  });

  const client = new vision.ImageAnnotatorClient();
  const [result] = await client.imageProperties(file.filepath);
  const props = result.imagePropertiesAnnotation;

  rmSync(file.filepath);
  res.status(200).json({
    colors: props?.dominantColors?.colors || null
  });
}

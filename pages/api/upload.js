import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await new Promise((resolve, reject) => {
      upload.single('image')(req, res, (err) => {
        if (err) {
          console.error('Error uploading image:', err);
          return reject({ error: 'Image upload failed' });
        }
        // File is uploaded successfully
        resolve('public/uploads/' + req.file.filename);
      });
    });


    res.status(200).json({ imageURL: req.file.filename });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

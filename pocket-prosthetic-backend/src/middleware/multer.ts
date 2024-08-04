import AWS from "aws-sdk";
import { Request } from "express";
import multer from "multer";
import multerS3 from "multer-s3";

const s3 = new AWS.S3({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY,
		secretAccessKey: process.env.AWS_SECRET_KEY,
	},
});

const storage = multerS3({
	s3: s3,
	bucket: process.env.S3_BUCKET_NAME,
	key: async (req: Request, file, cb) => {
		// Getting the base filename from the request body
		const baseFileName = req.url.split("/").at(-1);

		// Create the final file name with extension
		const fileName = `${baseFileName}`;

		// Pass the file name to the callback
		cb(null, fileName);
	},
});

const upload = multer({
	storage: storage,
});

export default upload;

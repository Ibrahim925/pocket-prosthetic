"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const s3 = new aws_sdk_1.default.S3({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    },
});
const storage = (0, multer_s3_1.default)({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    key: (req, file, cb) => __awaiter(void 0, void 0, void 0, function* () {
        // Getting the base filename from the request body
        const baseFileName = req.url.split("/").at(-1);
        console.log(baseFileName, file.mimetype, "fjksdfklsdjflksdjfklwefjsdklfjsdklfjsdlkfjsdk");
        // Create the final file name with extension
        const fileName = `${baseFileName}`;
        // Pass the file name to the callback
        cb(null, fileName);
    }),
});
const upload = (0, multer_1.default)({
    storage: storage,
});
exports.default = upload;
//# sourceMappingURL=multer.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const typeorm_1 = require("typeorm");
const feedback_model_1 = __importDefault(require("./models/feedback.model"));
const field_model_1 = __importDefault(require("./models/field.model"));
const form_model_1 = __importDefault(require("./models/form.model"));
const hospital_model_1 = __importDefault(require("./models/hospital.model"));
const request_model_1 = __importDefault(require("./models/request.model"));
const user_model_1 = __importDefault(require("./models/user.model"));
const MysqlDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [feedback_model_1.default, field_model_1.default, form_model_1.default, hospital_model_1.default, request_model_1.default, user_model_1.default],
    migrations: [],
    subscribers: [],
});
exports.default = MysqlDataSource;
//# sourceMappingURL=datasource.js.map
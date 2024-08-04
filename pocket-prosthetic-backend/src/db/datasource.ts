import "dotenv/config";
import { DataSource } from "typeorm";
import Feedback from "./models/feedback.model";
import Field from "./models/field.model";
import Form from "./models/form.model";
import Hospital from "./models/hospital.model";
import Request from "./models/request.model";
import User from "./models/user.model";

const MysqlDataSource = new DataSource({
	type: "mysql",
	host: process.env.DB_HOST,
	port: 3306,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	synchronize: true,
	logging: false,
	entities: [Feedback, Field, Form, Hospital, Request, User],
	migrations: [],
	subscribers: [],
});

export default MysqlDataSource;

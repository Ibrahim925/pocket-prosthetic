import { Router } from "express";
import { Repository } from "typeorm";
import { fields } from "../common/constants/fields";
import MysqlDataSource from "../db/datasource";
import Form from "../db/models/form.model";
import Request from "../db/models/request.model";
import User from "../db/models/user.model";

const router = Router();

const userSource: Repository<User> = MysqlDataSource.getRepository(User);
const requestSource: Repository<Request> =
	MysqlDataSource.getRepository(Request);

// Create a request
router.post("/", async (req, res) => {
	const toEmail: string = req.body.toEmail;
	const fromEmail: string = req.body.fromEmail;

	const toUser = await userSource.findOne({
		where: {
			email: toEmail,
		},
	});

	if (!toUser) {
		return res.status(404).send({
			error: "User does not exist",
			location: fields.USER_EMAIL,
		});
	}

	const fromUser = await userSource.findOne({
		where: {
			email: fromEmail,
		},
	});

	const newForm = new Form();
	newForm.done = false;
	await newForm.save();

	const newRequest = new Request();
	newRequest.to = toUser;
	newRequest.from = fromUser;
	newRequest.form = newForm;
	await newRequest.save();

	res.status(200).send({ newRequest });
});

// Read all incoming requests
router.get("/to/:id", async (req, res) => {
	let toId: number | string = req.params.id;
	toId = Number.parseInt(toId);

	const requests = await requestSource.find({
		where: {
			to: {
				id: toId,
			},
		},
	});

	res.status(200).send({ requests });
});

// Read all outgoing requests
router.get("/from/:id", async (req, res) => {
	let fromId: number | string = req.params.id;
	fromId = Number.parseInt(fromId);

	const requests = await requestSource.find({
		where: {
			from: {
				id: fromId,
			},
		},
	});

	res.status(200).send({ requests });
});

// Read one request
router.get("/:id", async (req, res) => {
	let id: number | string = req.params.id;
	id = Number.parseInt(id);

	const request = await requestSource.findOne({
		where: {
			id,
		},
	});

	res.status(200).send({ request });
});

// Delete a request
router.delete("/:id", async (req, res) => {
	let id: number | string = req.params.id;
	id = Number.parseInt(id);

	await requestSource.delete({
		id,
	});

	res.sendStatus(200);
});

export default router;

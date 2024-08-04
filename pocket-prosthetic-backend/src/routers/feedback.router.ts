import { Router } from "express";
import { Repository } from "typeorm";
import MysqlDataSource from "../db/datasource";
import Feedback from "../db/models/feedback.model";
import User from "../db/models/user.model";

const router = Router();

const userSource: Repository<User> = MysqlDataSource.getRepository(User);
const feedbackSource: Repository<Feedback> =
	MysqlDataSource.getRepository(Feedback);

// Create feedback
router.post("/", async (req, res) => {
	const newFeedback = new Feedback();

	newFeedback.score = req.body.score;
	newFeedback.notes = req.body.notes;
	newFeedback.created_by = await userSource.findOne({
		where: {
			id: req.body.created_by_id,
		},
	});

	await newFeedback.save();

	res.status(200).send({ newFeedback });
});

// Get all patient feedback
router.get("/patient/:id", async (req, res) => {
	let id: string | number = req.params.id;
	id = Number.parseInt(id);

	const feedback = await feedbackSource.find({
		where: {
			created_by: {
				id,
			},
		},
	});

	res.status(200).send({ feedback });
});

// Get one feedback
router.get("/:id", async (req, res) => {
	let id: string | number = req.params.id;
	id = Number.parseInt(id);

	const feedback = await feedbackSource.findOne({
		where: {
			id,
		},
	});

	res.status(200).send({ feedback });
});

// Delete feedback
router.delete("/:id", async (req, res) => {
	let id: string | number = req.params.id;
	id = Number.parseInt(id);

	await feedbackSource.delete({ id });

	res.sendStatus(200);
});

export default router;

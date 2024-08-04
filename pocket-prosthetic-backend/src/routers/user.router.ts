import { Router } from "express";
import { Repository } from "typeorm";
import { fields } from "../common/constants/fields";
import MysqlDataSource from "../db/datasource";
import Hospital from "../db/models/hospital.model";
import User from "../db/models/user.model";

const router = Router();

const userSource: Repository<User> = MysqlDataSource.getRepository(User);
const hospitalSource: Repository<Hospital> =
	MysqlDataSource.getRepository(Hospital);

// Log in
router.post("/login", async (req, res) => {
	const user = await userSource.findOne({
		where: {
			email: req.body.email,
		},
	});

	if (!user) {
		return res.status(404).send({
			error: "An account with this email does not exist",
			location: fields.USER_EMAIL,
		});
	}

	if (user.password === req.body.password) {
		res.status(200).send({ user });
	} else {
		res.status(403).send({
			error: "Incorrect password",
			location: fields.USER_PASSWORD,
		});
	}
});

// Invite a patient
router.post("/", async (req, res) => {
	const newUser = new User();

	newUser.first_name = req.body.firstName;
	newUser.last_name = req.body.lastName;
	newUser.email = req.body.email;
	newUser.password = req.body.password;
	newUser.activated = false;
	newUser.type = "PATIENT";

	const hospital = await hospitalSource.findOne({
		where: {
			id: req.body.hospitalId,
		},
	});
	newUser.hospital = hospital;

	await newUser.save();

	res.status(200).send({ newUser });
});

// Get all hospital employees (including admin)
router.get("/hospital/:hospital_id/employee", async (req, res) => {
	let hospital_id: string | number = req.params.hospital_id;
	hospital_id = Number.parseInt(hospital_id);

	const users = await userSource.find({
		where: [
			{
				type: "ADMIN",
				hospital: {
					id: hospital_id,
				},
			},
			{
				type: "EMPLOYEE",
				hospital: {
					id: hospital_id,
				},
			},
		],
	});

	res.status(200).send({ users });
});

// Get all hospital patients
router.get("/hospital/:hospital_id/patient", async (req, res) => {
	let hospital_id: string | number = req.params.hospital_id;
	hospital_id = Number.parseInt(hospital_id);

	const users = await userSource.find({
		where: {
			type: "PATIENT",
			hospital: {
				id: hospital_id,
			},
		},
	});

	res.status(200).send({ users });
});

// Get a specific user
router.get("/:id", async (req, res) => {
	let id: string | number = req.params.id;
	id = Number.parseInt(id);

	const user = await userSource.findOne({
		where: {
			id,
		},
	});

	res.status(200).send({ user });
});

// Update a user
router.patch("/:id", async (req, res) => {
	let id: string | number = req.params.id;
	id = Number.parseInt(id);

	const user = await userSource.findOne({
		where: {
			id,
		},
	});

	const validPassword = req.body.password === user.password;

	if (!validPassword)
		res.status(403).send({
			error: "Invalid password",
			location: fields.USER_PASSWORD,
		});

	if (req.body.newPassword) {
		user.password = req.body.newPassword;
	}

	if (req.body.email) {
		user.email = req.body.email;
	}

	await user.save();

	res.status(200).send({ user });
});

// Delete a user
router.delete("/:id", async (req, res) => {
	let id: string | number = req.params.id;
	id = Number.parseInt(id);
	await userSource.delete({ id });
	res.sendStatus(200);
});

export default router;

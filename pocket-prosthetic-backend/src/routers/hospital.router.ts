import { Router } from "express";
import { Repository } from "typeorm";
import MysqlDataSource from "../db/datasource";
import Hospital from "../db/models/hospital.model";

const router = Router();

const hospitalSource: Repository<Hospital> =
	MysqlDataSource.getRepository(Hospital);

// Read a hospital
router.get("/:id", async (req, res) => {
	let id: number | string = req.params.id;
	id = Number.parseInt(id);

	const hospital = await hospitalSource.findOne({
		where: {
			id,
		},
	});

	res.status(200).send({ hospital });
});

// Delete a hospital
router.get("/:id", async (req, res) => {
	let id: number | string = req.params.id;
	id = Number.parseInt(id);

	await hospitalSource.delete({
		id,
	});

	res.sendStatus(200);
});

export default router;

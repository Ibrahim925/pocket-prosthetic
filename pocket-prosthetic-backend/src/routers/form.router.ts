import csvStringify from "csv-stringify";
import { Router } from "express";
import { Repository } from "typeorm";
import MysqlDataSource from "../db/datasource";
import Field from "../db/models/field.model";
import Form from "../db/models/form.model";
import upload from "../middleware/multer";

const router = Router();

const formSource: Repository<Form> = MysqlDataSource.getRepository(Form);
const fieldSource: Repository<Field> = MysqlDataSource.getRepository(Field);

// Create a form field
router.post("/field", async (req, res) => {
	const field = new Field();

	field.type = req.body.type;
	field.label = req.body.label;
	field.value = "";

	const form = await formSource.findOne({
		where: {
			id: req.body.formId,
		},
	});

	field.form = form;

	await field.save();

	res.status(200).send({ field });
});

// Read a form
router.get("/:id", async (req, res) => {
	let id: string | number = req.params.id;
	id = Number.parseInt(id);

	const form = await formSource.findOne({
		where: {
			id,
		},
	});

	res.status(200).send({ form });
});

// Read all form fields
router.get("/:id/field", async (req, res) => {
	let id: string | number = req.params.id;
	id = Number.parseInt(id);

	const fields = await fieldSource.find({
		where: {
			form: {
				id,
			},
		},
	});

	res.status(200).send({ fields });
});

// Export all hospital forms to CSV
router.get("/:id/csv", async (req, res) => {
	let id: string | number = req.params.id;
	id = Number.parseInt(id);

	const form = await formSource.findOne({
		where: { id },
	});

	if (!form) {
		return res.status(404).send({ error: "Form not found" });
	}

	if (!form.done) {
		return res
			.status(500)
			.send({ error: "Form has not yet been completed" });
	}

	const fields = await fieldSource.find({
		where: { form: { id } },
	});

	const columns = ["label", "value"];
	const records = fields.map((field) => [field.label, field.value]);

	csvStringify.stringify(
		records,
		{ header: true, columns },
		(err, output) => {
			if (err) {
				return res.status(500).send({ error: "Error generating CSV" });
			}

			res.setHeader("Content-Type", "text/csv");
			res.setHeader(
				"Content-Disposition",
				`attachment; filename=form_${id}.csv`
			);
			res.status(200).send(output);
		}
	);
});

// Submit a form
router.post("/field/:id", async (req, res) => {
	let id: string | number = req.params.id;
	id = Number.parseInt(id);

	const form = await formSource.findOne({
		where: { id },
	});

	const fieldValues: { id: number; value: string }[] = req.body.fieldValues;

	for (const fieldValue of fieldValues) {
		const field = await fieldSource.findOne({
			where: {
				id: fieldValue.id,
			},
		});
		field.value = fieldValue.value;
		await field.save();
	}

	const fields = await fieldSource.find({
		where: {
			form: {
				id,
			},
		},
	});

	let done = true;
	for (const field of fields) {
		if (field.value === "") {
			done = false;
			break;
		}
	}

	form.done = done;

	await form.save();

	res.status(200).send({ form });
});

// Attach an upload
router.patch("/field/:id", upload.single("file"), async (req, res) => {
	let id: string | number = req.params.id;
	id = Number.parseInt(id);

	const field = await fieldSource.findOne({
		where: {
			id,
		},
	});

	field.value = (req.file as any).location;
	await field.save();

	res.status(200).send({ field });
});

// Delete a form
router.delete("/:id", async (req, res) => {
	let id: string | number = req.params.id;
	id = Number.parseInt(id);

	await formSource.delete({ id });

	res.sendStatus(200);
});

// Delete a field
router.delete("/field/:id", async (req, res) => {
	let id: string | number = req.params.id;
	id = Number.parseInt(id);

	await fieldSource.delete({ id });

	res.sendStatus(200);
});

export default router;

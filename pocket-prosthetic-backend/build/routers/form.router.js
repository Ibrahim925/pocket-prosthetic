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
const csv_stringify_1 = __importDefault(require("csv-stringify"));
const express_1 = require("express");
const datasource_1 = __importDefault(require("../db/datasource"));
const field_model_1 = __importDefault(require("../db/models/field.model"));
const form_model_1 = __importDefault(require("../db/models/form.model"));
const multer_1 = __importDefault(require("../middleware/multer"));
const router = (0, express_1.Router)();
const formSource = datasource_1.default.getRepository(form_model_1.default);
const fieldSource = datasource_1.default.getRepository(field_model_1.default);
// Create a form field
router.post("/field", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const field = new field_model_1.default();
    field.type = req.body.type;
    field.label = req.body.label;
    field.value = "";
    const form = yield formSource.findOne({
        where: {
            id: req.body.formId,
        },
    });
    field.form = form;
    yield field.save();
    res.status(200).send({ field });
}));
// Read a form
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    id = Number.parseInt(id);
    const form = yield formSource.findOne({
        where: {
            id,
        },
    });
    res.status(200).send({ form });
}));
// Read all form fields
router.get("/:id/field", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    id = Number.parseInt(id);
    const fields = yield fieldSource.find({
        where: {
            form: {
                id,
            },
        },
    });
    res.status(200).send({ fields });
}));
// Export all hospital forms to CSV
router.get("/:id/csv", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    id = Number.parseInt(id);
    const form = yield formSource.findOne({
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
    const fields = yield fieldSource.find({
        where: { form: { id } },
    });
    const columns = ["label", "value"];
    const records = fields.map((field) => [field.label, field.value]);
    csv_stringify_1.default.stringify(records, { header: true, columns }, (err, output) => {
        if (err) {
            return res.status(500).send({ error: "Error generating CSV" });
        }
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", `attachment; filename=form_${id}.csv`);
        res.status(200).send(output);
    });
}));
// Submit a form
router.post("/field/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    id = Number.parseInt(id);
    const form = yield formSource.findOne({
        where: { id },
    });
    const fieldValues = req.body.fieldValues;
    for (const fieldValue of fieldValues) {
        const field = yield fieldSource.findOne({
            where: {
                id: fieldValue.id,
            },
        });
        field.value = fieldValue.value;
        yield field.save();
    }
    const fields = yield fieldSource.find({
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
    yield form.save();
    res.status(200).send({ form });
}));
// Attach an upload
router.patch("/field/:id", multer_1.default.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    id = Number.parseInt(id);
    const field = yield fieldSource.findOne({
        where: {
            id,
        },
    });
    field.value = req.file.location;
    yield field.save();
    res.status(200).send({ field });
}));
// Delete a form
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    id = Number.parseInt(id);
    yield formSource.delete({ id });
    res.sendStatus(200);
}));
// Delete a field
router.delete("/field/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    id = Number.parseInt(id);
    yield fieldSource.delete({ id });
    res.sendStatus(200);
}));
exports.default = router;
//# sourceMappingURL=form.router.js.map
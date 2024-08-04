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
const express_1 = require("express");
const fields_1 = require("../common/constants/fields");
const datasource_1 = __importDefault(require("../db/datasource"));
const hospital_model_1 = __importDefault(require("../db/models/hospital.model"));
const user_model_1 = __importDefault(require("../db/models/user.model"));
const router = (0, express_1.Router)();
const userSource = datasource_1.default.getRepository(user_model_1.default);
const hospitalSource = datasource_1.default.getRepository(hospital_model_1.default);
// Log in
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userSource.findOne({
        where: {
            email: req.body.email,
        },
    });
    if (!user) {
        return res.status(404).send({
            error: "An account with this email does not exist",
            location: fields_1.fields.USER_EMAIL,
        });
    }
    if (user.password === req.body.password) {
        res.status(200).send({ user });
    }
    else {
        res.status(403).send({
            error: "Incorrect password",
            location: fields_1.fields.USER_PASSWORD,
        });
    }
}));
// Invite a patient
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new user_model_1.default();
    newUser.first_name = req.body.firstName;
    newUser.last_name = req.body.lastName;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.activated = false;
    newUser.type = "PATIENT";
    const hospital = yield hospitalSource.findOne({
        where: {
            id: req.body.hospitalId,
        },
    });
    newUser.hospital = hospital;
    yield newUser.save();
    res.status(200).send({ newUser });
}));
// Get all hospital employees (including admin)
router.get("/hospital/:hospital_id/employee", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let hospital_id = req.params.hospital_id;
    hospital_id = Number.parseInt(hospital_id);
    const users = yield userSource.find({
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
}));
// Get all hospital patients
router.get("/hospital/:hospital_id/patient", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let hospital_id = req.params.hospital_id;
    hospital_id = Number.parseInt(hospital_id);
    const users = yield userSource.find({
        where: {
            type: "PATIENT",
            hospital: {
                id: hospital_id,
            },
        },
    });
    res.status(200).send({ users });
}));
// Get a specific user
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    id = Number.parseInt(id);
    const user = yield userSource.findOne({
        where: {
            id,
        },
    });
    res.status(200).send({ user });
}));
// Update a user
router.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    id = Number.parseInt(id);
    const user = yield userSource.findOne({
        where: {
            id,
        },
    });
    const validPassword = req.body.password === user.password;
    if (!validPassword)
        res.status(403).send({
            error: "Invalid password",
            location: fields_1.fields.USER_PASSWORD,
        });
    if (req.body.newPassword) {
        user.password = req.body.newPassword;
    }
    if (req.body.email) {
        user.email = req.body.email;
    }
    yield user.save();
    res.status(200).send({ user });
}));
// Delete a user
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    id = Number.parseInt(id);
    yield userSource.delete({ id });
    res.sendStatus(200);
}));
exports.default = router;
//# sourceMappingURL=user.router.js.map
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
const form_model_1 = __importDefault(require("../db/models/form.model"));
const request_model_1 = __importDefault(require("../db/models/request.model"));
const user_model_1 = __importDefault(require("../db/models/user.model"));
const router = (0, express_1.Router)();
const userSource = datasource_1.default.getRepository(user_model_1.default);
const requestSource = datasource_1.default.getRepository(request_model_1.default);
// Create a request
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const toEmail = req.body.toEmail;
    const fromEmail = req.body.fromEmail;
    const toUser = yield userSource.findOne({
        where: {
            email: toEmail,
        },
    });
    if (!toUser) {
        return res.status(404).send({
            error: "User does not exist",
            location: fields_1.fields.USER_EMAIL,
        });
    }
    const fromUser = yield userSource.findOne({
        where: {
            email: fromEmail,
        },
    });
    const newForm = new form_model_1.default();
    newForm.done = false;
    yield newForm.save();
    const newRequest = new request_model_1.default();
    newRequest.to = toUser;
    newRequest.from = fromUser;
    newRequest.form = newForm;
    yield newRequest.save();
    res.status(200).send({ newRequest });
}));
// Read all incoming requests
router.get("/to/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let toId = req.params.id;
    toId = Number.parseInt(toId);
    const requests = yield requestSource.find({
        where: {
            to: {
                id: toId,
            },
        },
    });
    res.status(200).send({ requests });
}));
// Read all outgoing requests
router.get("/from/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let fromId = req.params.id;
    fromId = Number.parseInt(fromId);
    const requests = yield requestSource.find({
        where: {
            from: {
                id: fromId,
            },
        },
    });
    res.status(200).send({ requests });
}));
// Read one request
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    id = Number.parseInt(id);
    const request = yield requestSource.findOne({
        where: {
            id,
        },
    });
    res.status(200).send({ request });
}));
// Delete a request
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    id = Number.parseInt(id);
    yield requestSource.delete({
        id,
    });
    res.sendStatus(200);
}));
exports.default = router;
//# sourceMappingURL=request.router.js.map
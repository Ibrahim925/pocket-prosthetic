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
const datasource_1 = __importDefault(require("../db/datasource"));
const feedback_model_1 = __importDefault(require("../db/models/feedback.model"));
const user_model_1 = __importDefault(require("../db/models/user.model"));
const router = (0, express_1.Router)();
const userSource = datasource_1.default.getRepository(user_model_1.default);
const feedbackSource = datasource_1.default.getRepository(feedback_model_1.default);
// Create feedback
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newFeedback = new feedback_model_1.default();
    newFeedback.score = req.body.score;
    newFeedback.notes = req.body.notes;
    newFeedback.created_by = yield userSource.findOne({
        where: {
            id: req.body.created_by_id,
        },
    });
    yield newFeedback.save();
    res.status(200).send({ newFeedback });
}));
// Get all patient feedback
router.get("/patient/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    id = Number.parseInt(id);
    const feedback = yield feedbackSource.find({
        where: {
            created_by: {
                id,
            },
        },
    });
    res.status(200).send({ feedback });
}));
// Get one feedback
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    id = Number.parseInt(id);
    const feedback = yield feedbackSource.findOne({
        where: {
            id,
        },
    });
    res.status(200).send({ feedback });
}));
// Delete feedback
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    id = Number.parseInt(id);
    yield feedbackSource.delete({ id });
    res.sendStatus(200);
}));
exports.default = router;
//# sourceMappingURL=feedback.router.js.map
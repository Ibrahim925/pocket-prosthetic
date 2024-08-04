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
const hospital_model_1 = __importDefault(require("../db/models/hospital.model"));
const router = (0, express_1.Router)();
const hospitalSource = datasource_1.default.getRepository(hospital_model_1.default);
// Read a hospital
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    id = Number.parseInt(id);
    const hospital = yield hospitalSource.findOne({
        where: {
            id,
        },
    });
    res.status(200).send({ hospital });
}));
// Delete a hospital
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    id = Number.parseInt(id);
    yield hospitalSource.delete({
        id,
    });
    res.sendStatus(200);
}));
exports.default = router;
//# sourceMappingURL=hospital.router.js.map
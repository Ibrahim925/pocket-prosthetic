"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
require("./db/configure-db");
const feedback_router_1 = __importDefault(require("./routers/feedback.router"));
const form_router_1 = __importDefault(require("./routers/form.router"));
const hospital_router_1 = __importDefault(require("./routers/hospital.router"));
const request_router_1 = __importDefault(require("./routers/request.router"));
const user_router_1 = __importDefault(require("./routers/user.router"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send(200);
});
app.use("/user", user_router_1.default);
app.use("/hospital", hospital_router_1.default);
app.use("/request", request_router_1.default);
app.use("/form", form_router_1.default);
app.use("/feedback", feedback_router_1.default);
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
//# sourceMappingURL=index.js.map
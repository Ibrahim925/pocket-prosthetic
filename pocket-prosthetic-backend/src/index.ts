import cors from "cors";
import "dotenv/config";
import express from "express";
import "./db/configure-db";
import feedbackRouter from "./routers/feedback.router";
import formRouter from "./routers/form.router";
import hospitalRouter from "./routers/hospital.router";
import requestRouter from "./routers/request.router";
import userRouter from "./routers/user.router";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send(200);
});

app.use("/user", userRouter);
app.use("/hospital", hospitalRouter);
app.use("/request", requestRouter);
app.use("/form", formRouter);
app.use("/feedback", feedbackRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

import "dotenv/config";
import cors from "cors";
import express from "express";

import mailRoute from "./Routes/Mail.mjs";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api", mailRoute);

app.get("/", (req, res) => {
    return res.json({ message: "Server Started And Running Properly" });
});

app.listen(port, () => {
    console.log(`Server Running On http://localhost:${port}/`);
});

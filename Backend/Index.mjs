import "dotenv/config";
import cors from "cors";
import express from "express";

import syncData from "./Database.mjs";
import mailRoute from "./Routes/Mail.mjs";
import adminRoute from "./Routes/Admin.mjs";

const app = express();
const port = process.env.PORT;

syncData();

app.use(cors());
app.use(express.json());

app.use("/api", mailRoute);
app.use("/api/admin", adminRoute);

app.get("/", (req, res) => {
    return res.json({ message: "Server Started And Running Properly" });
});

app.listen(port, () => {
    console.log(`Server Running On http://localhost:${port}/`);
});

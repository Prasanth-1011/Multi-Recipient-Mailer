import { Router } from "express";

import Admin from "../Models/Admin.mjs";
import History from "../Models/History.mjs";

const router = Router();

router.get("/mails", async (req, res) => {
    try {
        const history = await History.find().select("_id subject text mails");

        if (history.length === 0)
            return res.status(404).json({ message: "No Mails Record Stored" });

        return res.status(200).json({
            history,
            message: "Mail History Record Fetched Successfully!",
        });
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: "Can't Fetch Data From Server",
        });
    }
});

router.get("/mail/:id", async (req, res) => {
    try {
        const mail = await History.findById(req.params.id);

        if (!mail)
            return res.status(404).json({ message: "Mail Record Not Found" });

        return res.status(200).json({
            mail,
            message: "Mail Record Fetched Successfully!",
        });
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: "Can't Fetch Data From Server",
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { mail, password } = req.body;
        const user = await Admin.findOne({ mail: mail });

        if (!user)
            return res.status(400).json({ message: "Invalid Credentials!" });

        const checkPassword = await user.comparePassword(password);
        if (!checkPassword)
            return res.status(400).json({ message: "Invalid Credentials!" });

        return res.status(200).json({ message: "Login Successful!" });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
});

router.post("/register", async (req, res) => {
    const { name, mail, password } = req.body;
    if (!name || !mail || !password)
        return res
            .status(400)
            .json({ message: "Fill Value For All The Fields" });

    try {
        const exist = await Admin.findOne();
        if (!exist) {
            const admin = {
                name,
                mail,
                password,
            };
            await Admin.create(admin);
            return res
                .status(201)
                .json({ message: "Admin Registered Successfully!" });
        } else {
            return res.status(400).json({
                message: "Only One Admin Can Be Registered!",
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

export default router;

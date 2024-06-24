import express from "express";
import { getProfil, profil } from "../controllers/profilController.js";
import { upload } from "../middleware/saveImg.js";

const updateRouter= express.Router();

updateRouter
.route("/")
.put(upload.single("file"), profil)
updateRouter
.route("/:email")
.get(getProfil)

export default updateRouter
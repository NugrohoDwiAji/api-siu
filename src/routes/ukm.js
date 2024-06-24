import express from "express";
const ukmRouter = express.Router();

import { createUkm, getAllUkm, getDetailUkmByName, updateDetailUkm } from "../controllers/ukmController.js";
import { upload } from "../middleware/saveImg.js";

ukmRouter
.route("/")
.post(upload.single("file"),createUkm)
.get(getAllUkm)
ukmRouter
.route("/:nama")
.put(upload.single("ukmimg"),updateDetailUkm)
.get(getDetailUkmByName)


export default ukmRouter
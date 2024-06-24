import express from 'express'
import { createProker, deleteProker, getProker, getProkerbyId, updateProker } from '../controllers/prokerController.js';

const prokerRouter = express.Router();


prokerRouter
.route("/")
prokerRouter
.route("/:nama")
.get(getProker)
.post(createProker)
prokerRouter
.route("/:id_proker/:nama")
.delete(deleteProker)
.get(getProkerbyId)
.put(updateProker)



export default prokerRouter
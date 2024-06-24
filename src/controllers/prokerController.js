import { db } from "../../database/connection.js";
import { response } from "../components/response.js";

// Get Proker
export const getProker = (req, res) => {
  const namaUkm = req.params.nama.replace(/\s+/g, "").toLowerCase();
  const sql = `SELECT * FROM tb_proker_${namaUkm}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result) {
      response(200, result, "Succses", res);
    }
  });
};

// Get Proker by id

export const getProkerbyId = (req, res) => {
  let { id_proker, nama } = req.params;
  nama = nama.replace(/\s+/g, "").toLowerCase();
  const sql = `SELECT * FROM tb_proker_${nama} WHERE id_proker = ${id_proker}`;
  db.query(sql, (err, result) => {
    if (err) {
      response(500, err, "internal server eror", res);
    } else {
      response(200, result, "oke", res);
    }
  });
};

// create
export const createProker = (req, res) => {
  const namaUkm = req.params.nama.replace(/\s+/g, "").toLowerCase();
  const { nama, waktu, deskripsi } = req.body;
  const sql = `INSERT INTO tb_proker_${namaUkm} (nama, waktu, deskripsi) VALUES (?, ?, ?)`;
  db.query(sql, [nama, waktu, deskripsi], (err, result) => {
    if (err) response(500, err, "internal server eror", res);
    if (result?.affectedRows) {
      response(201, "Succes", "Succesfull", res);
    }
  });
};

// update
export const updateProker = (req, res) => {
  let { id_proker, nama } = req.params;
  nama = nama.replace(/\s+/g, "").toLowerCase();
  const { namaProker, waktu, deskripsi } = req.body;
  const sql = `UPDATE tb_proker_${nama} SET nama = ?, waktu = ?, deskripsi = ? WHERE id_proker = ?  `;
  db.query(sql, [namaProker, waktu, deskripsi, id_proker], (err, result) => {
    if (err) {
      response(500, err, "Internal Server Eror", res);
    } else if(result?.affectedRows) {
      response(200, result.message, "Update SuccesFull", res);
    }
  });
};

// Delete

export const deleteProker = (req, res) => {
  const { id_proker, nama } = req.params;
  const namaproker = nama.replace(/\s+/g, "").toLowerCase();
  const sql = `DELETE FROM tb_proker_${namaproker} WHERE id_proker = ${id_proker}`;
  db.query(sql, (err, result) => {
    if (err) {
      response(500, err, " Internal Server Eror", res);
    } else {
      response(200, "Delete", "Delete Succes", res);
    }
  });
};

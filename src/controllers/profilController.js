import express from "express";
import { db } from "../../database/connection.js";
import { response } from "../components/response.js";


export const profil = (req,res) => {
  const file = req.file.filename;
  const url= `${req.protocol}://${req.get("host")}/img/${file}`
  const { email, nama, nim, prodi, angkatan, noTlp} = req.body;
  const sql1 = `UPDATE tb_userprofil SET nama = "${nama}", nim = "${nim}", prodi = "${prodi}", angkatan="${angkatan}", noTlp = ${noTlp}, foto = "${file}", url = "${url}" WHERE email = "${email}"`;
  const sql2 = `UPDATE tb_users SET nama = "${nama}" WHERE email = "${email}"`;

  db.query(sql1, (err, result) => {
    if (err) response(500, "invalid", "code eror", res);
    db.query(sql2, (err, result) => {
      if (err) response(500, "invalid", "Code 2 Eror", res);
      if (result?.affectedRows) {
        const data = {
          usSecces: result.affectedRows,
          message: result.message,
        };
        response(200, data, "Update Succesfull", res);
      }
    });
  });
};

export const getProfil = (req, res) =>{
  const email  = req.params.email;
  const sql = `SELECT * from tb_userprofil WHERE email='${email}'`
  if(!email){
    response(400, "invalid data", "cek kembali", res)
  }else{
    db.query(sql, (err, result)=>{
      if(err) throw err;
      response(200, result,"OK",res)
    })
  }
}

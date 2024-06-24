import { response } from "../components/response.js";
import { db } from "../../database/connection.js";
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
dotenv.config()
import bcrypt from 'bcrypt'

const login = (req, res) => {
  const { email , password } = req.body;
  const sql1 = `SELECT nama, email, role, password FROM tb_users where email = "${email}"`;
  if (!email || !password) {
    response(400, "data not found", "Priksa kembali input", res);
  } else {
    db.query(sql1, (err, data) => {
      if (data.length===0) {
        response(400, "Login failed", "Priksa Kembali Email dan Password", res);
      }else{
        console.log(data)
        if(email === data[0].email ){
          bcrypt.compare(password,data[0].password, function(err, result){
            if (result) {
              req.session.result = data;
              const nama = data[0].nama
              const email = data[0].email
              const role = data[0].role
              const expiresIn= 60 * 1
              const accessToken = jwt.sign({nama, email, role}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: expiresIn
              })
              response(200,accessToken,"berhasil login", res) 
            } else {
              response(400, err, "Masukan email dan password dengan benar", res)
            }
          })
        }else{
            response(400, "Invalid", "Masukan email dan password dengan benar", res)
        }
      }
    });
  }
};

export {login}

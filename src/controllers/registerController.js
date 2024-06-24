import { response } from "../components/response.js";
import { db } from "../../database/connection.js";
import regValid from "../validation/register.js";
import bcrypt from "bcrypt"


const signUp = async (req, res) => {
  const hasil = await regValid(req.body);
  const { nama, email } = hasil.data;
  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(hasil.data.password, salt, function(err, hash){
      
      const sql = `INSERT INTO tb_users (nama, email, password, role) VALUES ("${nama}","${email}","${hash}","user")`;
      const sql3 = `INSERT INTO tb_userprofil (email, nama) VALUES ("${email}","${nama}")`;
      if (hasil.message.length > 0) {
        response(400, "invalid", hasil.message[0], res);
      } else {
        const sql2 = `SELECT nama, email, password FROM tb_users where email = "${email}"`;
        db.query(sql2, (err, result) => {
          if (result[0]?.email === hasil.data.email) {
            response(400, "email is already", "Email Telah Di Gunakan", res);
          } else { 
            db.query(sql3, (err, result) => {
              if (err) {
                response(500, "invalid", "Code 1 Eror", res)
              }else{
                db.query(sql, (err, result) => {
                  if (err) response(500, "invalid", "Code Eror", res);
                  if (result?.affectedRows) {
                    const data = {
                      usSucces: result.affectedRows,
                      id: result.insertId,
                    };
                    response(200, data, "Succes Full, Silahkan Login!", res);
                  }
                });
              };
            });
          }
        });
      }
    })
  })
  
};

export { signUp };

import { db } from "../../database/connection.js";
import { response } from "../components/response.js";

const checkTable = (Table) => {
  const namatb = Table.replace(/\s+/g, "");
  try {
    const sql = ` SELECT COUNT(*) AS count 
            FROM information_schema.tables 
            WHERE table_schema = 'db_siu' 
            AND table_name = 'tb_proker_${namatb}'`;

    const sql2 = `CREATE TABLE tb_proker_${namatb} (id_proker INT AUTO_INCREMENT PRIMARY KEY, nama VARCHAR(255) NOT NULL, waktu Date, deskripsi TEXT)`;
    db.query(sql, (err, result) => {
      if (err) res.send(err);
      if (result[0].count !== 0) {
        console.log("ada");
      } else {
        db.query(sql2, (err, result) => {
          if (err) throw err;
          if (result) {
            console.log(result);
          }
        });
      }
    });
  } catch (error) {
    console.log("Eror");
  }
};

// Create
export const createUkm = (req, res) => {
  const { nama, deskripsi } = req.body;
  const namatb= nama.replace(/\s+/g, '')
  const namatable = namatb.toLowerCase();
  const file = req.file.filename;
  const link = `/detailUkm/${namatable}`;
  const logo = `${req.protocol}://${req.get("host")}/img/${file}`;
  const sql =
    "INSERT INTO tb_ukm (nama, deskripsi, logo, link) VALUES (?, ?, ?, ?)";
  const sql2 = "INSERT INTO tb_detailukm (id_ukm, nama_proker) VALUES (?, ?)";
  db.query(sql, [nama, deskripsi, logo, link], (err, result) => {
    if (err) throw err;
    if (result?.insertId) {
      checkTable(nama);
      const id = result.insertId;
      db.query(sql2, [id,`tb_proker_${namatable}` ], (err, result) => {
        if (err) {
          response(500, err, "code eror", res);
        } else {
          response(201, result, "succses", res);
        }
      });
    }
  });
};

// updateDetailUkm
export const updateDetailUkm = (req, res) => {
  const file = req.file.filename;
  const img = `${req.protocol}://${req.get("host")}/img/${file}`;
  const { tentang, visi } = req.body;
  const id = req.params.nama
  const sql =
    "UPDATE tb_detailukm SET img = ?, visi = ?, tentang = ? WHERE id_ukm = ?";

  db.query(sql, [img, visi, tentang, id], (err, result) => {
    if (err) response(500, "invalid", "code eror", res);
    if (result?.affectedRows) {
      response(200, result, "Update Succesfull", res);
    }
  });
};

// Get All Ukm
export const getAllUkm = (req, res) => {
  const sql = "SELECT * FROM tb_ukm";
  db.query(sql, (err, result) => {
    if (err) {
      response(500, err, "Insternal Server Eror", res);
    } else {
      response(200, result, "OK", res);
    }
  });
};

// Get Ukm by name
export const getDetailUkmByName = (req, res) => {
  const nama = req.params.nama;
  const sql = `SELECT tb_detailukm.*, tb_ukm.nama FROM tb_detailukm INNER JOIN tb_ukm ON tb_detailukm.id_ukm = tb_ukm.id WHERE tb_ukm.nama = "${nama}";`;
  db.query(sql, (err, result) => {
    if (err) {
      response(500, "Eror", "Internal Server Eror", res);
    } else {
      response(200, result, "OKE", res);
    }
  });
};



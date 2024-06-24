import { db } from "../../database/connection";

exports.getAllKegiatan = (req, res) => {
    const sql = 'SELECT * FROM kegiatan';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

exports.getKegiatanById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM kegiatan WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(result);
    });
};

exports.createKegiatan = (req, res) => {
    const { nama_kegiatan, tentang, visi, misi } = req.body;
    const sql = 'INSERT INTO kegiatan (nama_kegiatan, tentang, visi, misi) VALUES (?, ?, ?, ?)';
    db.query(sql, [nama_kegiatan, tentang, visi, misi], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Kegiatan created successfully', id: result.insertId });
    });
};

exports.updateKegiatan = (req, res) => {
    const { id } = req.params;
    const { nama_kegiatan, tentang, visi, misi } = req.body;
    const sql = 'UPDATE kegiatan SET nama_kegiatan = ?, tentang = ?, visi = ?, misi = ? WHERE id = ?';
    db.query(sql, [nama_kegiatan, tentang, visi, misi, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Kegiatan updated successfully' });
    });
};

exports.deleteKegiatan = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM kegiatan WHERE id = ?';
    db.query(sql, [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Kegiatan deleted successfully' });
    });
};

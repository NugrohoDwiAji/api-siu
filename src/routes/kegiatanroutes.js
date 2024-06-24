const express = require('express');
const router = express.Router();
const kegiatanController = require('../controllers/kegiatanController');

router.get('/kegiatan', kegiatanController.getAllKegiatan);
router.get('/kegiatan/:id', kegiatanController.getKegiatanById);
router.post('/kegiatan', kegiatanController.createKegiatan);
router.put('/kegiatan/:id', kegiatanController.updateKegiatan);
router.delete('/kegiatan/:id', kegiatanController.deleteKegiatan);

module.exports = router;
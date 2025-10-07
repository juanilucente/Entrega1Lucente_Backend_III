const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { ensureAuthenticated, ensureAdminOrSelf } = require('../middlewares/auth');

// Crear usuario (registro) - abierto
router.post('/', userController.createUser);

// Rutas protegidas: obtener, actualizar, borrar
router.get('/:id', ensureAuthenticated, ensureAdminOrSelf, userController.getUser);
router.put('/:id', ensureAuthenticated, ensureAdminOrSelf, userController.updateUser);
router.delete('/:id', ensureAuthenticated, ensureAdminOrSelf, userController.deleteUser);

module.exports = router;
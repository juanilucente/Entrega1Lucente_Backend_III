const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket.controller');
const { ensureAuthenticated } = require('../middlewares/auth');

router.post('/', ensureAuthenticated, ticketController.createTicket);

module.exports = router;
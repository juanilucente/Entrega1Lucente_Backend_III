const TicketService = require('../services/ticket.service');

exports.createTicket = async (req, res) => {
  try {
    const user = req.user || {};
    const { items, amount } = req.body;
    if(!user || !user.id) return res.status(401).json({ error: 'Unauthorized' });
    const ticket = await TicketService.createTicket({ userId: user.id, amount, items });
    return res.status(201).json({ ticket });
  } catch(err){
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};
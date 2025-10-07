
const { v4: uuidv4 } = require('uuid');

class TicketService {
  static async createTicket({ userId, amount, items }) {
    
    return {
      id: uuidv4(),
      userId,
      amount,
      items,
      createdAt: new Date()
    };
  }
}

module.exports = TicketService;
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const {
      id,
      name,
      street,
      street_number,
      complement,
      neighborhood,
      state,
      city,
      zip_code,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      street,
      street_number,
      complement,
      neighborhood,
      state,
      city,
      zip_code,
    });
  }

  async update(req, res) {
    const { id: recipientId } = req.params;

    const recipient = await Recipient.findByPk(recipientId);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found.' });
    }

    await recipient.update(req.body);

    const {
      id,
      name,
      street,
      street_number,
      complement,
      neighborhood,
      state,
      city,
      zip_code,
    } = await Recipient.findByPk(recipientId);

    return res.json({
      id,
      name,
      street,
      street_number,
      complement,
      neighborhood,
      state,
      city,
      zip_code,
    });
  }
}

export default new RecipientController();

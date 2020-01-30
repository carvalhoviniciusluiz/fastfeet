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

    const user = await Recipient.findByPk(recipientId);

    if (!user) {
      return res.status(400).json({ error: 'User not found.' });
    }

    await user.update(req.body);

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

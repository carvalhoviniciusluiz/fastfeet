import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    const { page = 1, per_page = 20 } = req.query;

    const couriers = await Deliveryman.findAll({
      where: {
        canceled_at: null,
      },
      order: ['name'],
      attributes: ['id', 'name', 'avatar_id', 'email'],
      limit: per_page,
      offset: (page - 1) * per_page,
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });
    return res.json(couriers);
  }

  async store(req, res) {
    const { id, name, email } = await Deliveryman.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const { id: deliverymanId } = req.params;

    const deliveryman = await Deliveryman.findByPk(deliverymanId);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found.' });
    }

    await deliveryman.update(req.body);

    const { id, name, email, avatar } = await Deliveryman.findByPk(
      deliverymanId,
      {
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url'],
          },
        ],
      }
    );

    return res.json({
      id,
      name,
      email,
      avatar,
    });
  }

  async delete(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    deliveryman.canceled_at = new Date();

    await deliveryman.save();

    return res.json(deliveryman);
  }
}

export default new DeliverymanController();

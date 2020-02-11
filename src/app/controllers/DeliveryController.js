import Order from '../models/Order';
import File from '../models/File';
import Recipient from '../models/Recipient';

class DeliveryController {
  async index(req, res) {
    const { page = 1, per_page = 20 } = req.query;

    const orders = await Order.findAll({
      where: {
        canceled_at: null,
        end_date: null,
        deliveryman_id: req.params.id,
      },
      order: ['product'],
      attributes: ['id', 'product', 'start_date'],
      limit: per_page,
      offset: (page - 1) * per_page,
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'street_number',
            'complement',
            'neighborhood',
            'state',
            'city',
            'zip_code',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });
    return res.json(orders);
  }
}

export default new DeliveryController();

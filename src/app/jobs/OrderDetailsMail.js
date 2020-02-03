import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class OrderDetailsMail {
  get key() {
    return 'OrderDetailsMail';
  }

  async handle({ data }) {
    const {
      order: { deliveryman, recipient, product, start_date },
    } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Novo produto liberado',
      template: 'order-details',
      context: {
        deliveryman: deliveryman.name,
        product,
        recipient: recipient.name,
        message: `O produto "${product}" já está disponível para a retirada.`,
        address: `
          ${recipient.street},
          ${recipient.street_number},
          ${recipient.neighborhood},
          ${recipient.zip_code} ${recipient.city} - ${recipient.state}`,
        complement: recipient.complement,
        start_date: format(
          parseISO(start_date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new OrderDetailsMail();

import * as Yup from 'yup';
import Plan from '../models/Plan';

class RegistrationManagementController {
  async store(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const plan = await Plan.findByPk(req.body.plan_id);
    
    const { price, duration } = plan;
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + duration);

    const totalPrice = calculateTotalPrice(duration, price);
    
    return res.json({ ok: 'ok' });
  }

  static calculateTotalPrice(duration, price) {
    return duration*price;
  }
}

export default new RegistrationManagementController();

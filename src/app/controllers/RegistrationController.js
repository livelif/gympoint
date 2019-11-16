import * as Yup from 'yup';
import Plan from '../models/Plan';
import InformationMail from '../jobs/InformationMail';
import Queue from '../../lib/Queue';
import Student from '../models/Student';

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

    const totalPrice = RegistrationManagementController.calculateTotalPrice(
      duration,
      price
    );
    const student = await Student.findByPk(req.userId);

    Queue.add(InformationMail.key, {
      student,
    });

    return res.json({ ok: 'ok' });
  }

  static calculateTotalPrice(duration, price) {
    return duration*price;
  }
}

export default new RegistrationManagementController();

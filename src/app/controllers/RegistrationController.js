import * as Yup from 'yup';
import Plan from '../models/Plan';
import InformationMail from '../jobs/InformationMail';
import Queue from '../../lib/Queue';
import Student from '../models/Student';
import Registration from '../models/Registration';
import User from '../models/User';

class RegistrationManagementController {
  async store(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await User.isAdmin(req.userId))) {
      return res.status(400).json({ error: "User isn't admin" });
    }

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    if (await Registration.userHavePlan(req.params.id)) {
      return res.status(400).json({ error: 'User already have plan' });
    }

    const { plan_id } = req.body;
    const plan = await Plan.findByPk(plan_id);

    const { price } = plan;
    const duration = Number(plan.duration);
    const startDate = new Date(req.body.start_date);
    const endDate = new Date(req.body.start_date);
    endDate.setMonth(startDate.getMonth() + duration);

    const totalPrice = RegistrationManagementController.calculateTotalPrice(
      duration,
      price
    );
    const student = await Student.findByPk(req.params.id);

    Queue.add(InformationMail.key, {
      student,
    });

    const registration = await Registration.create({
      student_id: student.id,
      plan_id,
      start_date: startDate,
      end_date: endDate,
      price: totalPrice,
    });

    return res.json({ registration });
  }

  async index(req, res) {
    const plans = await Registration.getRegisterOfStudent(req.params.id);

    return res.json(plans);
  }

  async update(req, res) {
    if (!(await User.isAdmin(req.userId))) {
      return res.status(400).json({ error: "User isn't admin" });
    }

    const registration = await Registration.getRegisterOfStudent(req.userId);
    const planId = req.body.plan_id;
    const plan = await Plan.findByPk(planId);

    const { price } = plan;
    const duration = Number(plan.duration);
    const startDate = new Date(req.body.start_date);
    const endDate = new Date(req.body.start_date);
    endDate.setMonth(startDate.getMonth() + duration);

    const totalPrice = RegistrationManagementController.calculateTotalPrice(
      duration,
      price
    );

    const updatedRegistration = await registration.update({
      price: totalPrice,
      end_date: endDate,
      start_date: startDate,
      plan_id: planId,
    });

    return res.json(updatedRegistration);
  }

  static calculateTotalPrice(duration, price) {
    return duration * price;
  }

  static addMonthsUTC(date, months) {
    return new Date(date.setMonth(date.getMonth() + months));
  }
}

export default new RegistrationManagementController();

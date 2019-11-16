import * as Yup from 'yup';
import User from '../models/User';

import Plan from '../models/Plan';

class PlanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      price: Yup.number().required(),
      duration: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    if (!(await User.isAdmin(req.userId))) {
      return res.status(400).json({ error: "User isn't admin" });
    }
    const { title, price, duration } = req.body;
    const plan = await Plan.create({
      title,
      price,
      duration,
    });

    return res.json(plan);
  }

  async index(req, res) {
    if (!(await User.isAdmin(req.userId))) {
      return res.status(400).json({ error: "User isn't admin" });
    }
    const plans = await Plan.findAll();
    return res.json(plans);
  }

  async delete(req, res) {
    if (!(await User.isAdmin(req.userId))) {
      return res.status(400).json({ error: "User isn't admin" });
    }
    const { id } = req.params;
    await Plan.destroy({
      where: {
        id,
      },
    });
    return res.json({ message: 'Plan deleted with sucess' });
  }
}

export default new PlanController();

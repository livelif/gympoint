import * as Yup from 'yup';
import User from '../models/User';

class PlanController {
  async store(req, res) {
    const schema = Yup.object().schema({
      title: Yup.string().required(),
      price: Yup.number().required(),
      duration: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    if (!(await User.isAdmin(req.userId))) {
      return res.status(400).json({ error: "User isn't admin" });
    }

    return res.json({ ok: 'ok' });
  }
}

export default new PlanController();

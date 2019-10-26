import User from '../models/User';

class UserController {
  async store(req, res) {
    const { nome, email } = await User.create(req.body);

    return res.json({
      nome,
      email,
    });
  }
}

export default new UserController();

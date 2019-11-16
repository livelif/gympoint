import Student from '../models/Student';
import User from '../models/User';

class StudentController {
  async store(req, res) {
    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(400).json({ error: 'error' });
    }
    try {
      const student = await Student.create({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        weight: req.body.weight,
        height: req.body.height,
        userId: req.userId,
      });
      return res.json({ student });
    } catch (err) {
      return res.json({ error: `Invalid studant, error: ${err}` });
    }
  }
}

export default new StudentController();
